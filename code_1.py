
# Import required libraries
from gbprimepay import GBPrimePay
import hashlib
from base64 import b64encode
from io import BytesIO
from enum import Enum
from decimal import Decimal
import threading
import pytesseract
import cv2
import requests
import json
import http.client
from pyotp import TOTP
import pyotp
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import models
from django.contrib.auth.models import User
from cryptography.fernet import Fernet
from django.utils import timezone
import time

# ----------------------------------------------------- OTP
# Quality requirement
# 1.Store Secrets Securely
# 2.Rate Limiting
# 3.Secure User Session
# 4.Lockout Policy

# Encryption and Decryption Helper Functions


class SecurityHelper:
    @staticmethod
    def encrypt_secret(secret, key):
        f = Fernet(key)
        encrypted_secret = f.encrypt(secret.encode())
        return encrypted_secret

    @staticmethod
    def decrypt_secret(encrypted_secret, key):
        f = Fernet(key)
        decrypted_secret = f.decrypt(encrypted_secret).decode()
        return decrypted_secret

# Create OTPuser model + getter and setter secret


class OTPUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    otp_secret_encrypted = models.BinaryField()
    encryption_key = models.BinaryField()
    last_failed_attempt = models.DateTimeField(null=True, blank=True)
    failed_attempt_count = models.PositiveIntegerField(default=0)
    locked_out_until = models.DateTimeField(null=True, blank=True)

    # getter with decrypt and setter with encrypt
    def set_otp_secret(self, secret):
        key = Fernet.generate_key()
        self.encryption_key = key
        self.otp_secret_encrypted = SecurityHelper.encrypt_secret(secret, key)
        self.failed_attempt_count = 0
        self.last_failed_attempt = None
        self.locked_out_until = None

    def get_otp_secret(self):
        return SecurityHelper.decrypt_secret(self.otp_secret_encrypted, self.encryption_key)

# Generate OTP Secret:


def generate_otp_secret(request):
    user = request.user
    otp_secret = pyotp.random_base32()

    # Encrypt the OTP secret + securely store
    encrypted_secret = SecurityHelper.encrypt_secret(
        otp_secret, user.password)  # Use user's password as the encryption key

    otp_user, created = OTPUser.objects.get_or_create(
        user=user, defaults={'otp_secret_encrypted': encrypted_secret})

    if not created:
        # Update encrypted OTP secret
        otp_user.otp_secret_encrypted = encrypted_secret
        otp_user.save()

    return otp_secret

# Rate Limiting with Token Bucket Algorithm


class TokenBucket:
    def __init__(self, capacity, fill_rate):
        self.capacity = capacity
        self.tokens = capacity
        self.last_update = time.time()
        self.fill_rate = fill_rate

    def consume(self, tokens):
        current_time = time.time()
        if current_time > self.last_update:
            self.tokens = min(self.capacity, self.tokens +
                              (current_time - self.last_update) * self.fill_rate)
            self.last_update = current_time
        if tokens <= self.tokens:
            self.tokens -= tokens
            return True
        return False

# OTP Setup View:


class OTPSetupView(APIView):
    MAX_ATTEMPTS_PER_PERIOD = 3  # Maximum attempts allowed per rate limit period
    RATE_LIMIT_PERIOD = timezone.timedelta(
        minutes=1)  # Rate limiting period in minutes

    rate_limit_bucket = TokenBucket(
        capacity=MAX_ATTEMPTS_PER_PERIOD, fill_rate=1.0/RATE_LIMIT_PERIOD.total_seconds())

    def get(self, request):
        user = request.user
        if not self.rate_limit_bucket.consume(1):
            return Response({'message': 'Rate limit exceeded.'}, status=429)

        otp_secret = generate_otp_secret(request)
        otp_url = pyotp.totp.TOTP(otp_secret).provisioning_uri(
            user.username, issuer_name="XXXX")
        # Return otp_url to the user (for setup)
        return Response({'otp_url': otp_url})


# Define rate limiting and lockout policy parameters
MAX_FAILED_ATTEMPTS = 3  # Maximum failed attempts before lockout
LOCKOUT_DURATION = timezone.timedelta(
    minutes=15)  # Lockout duration in minutes

# Verify OTP:


class OTPVerifier:
    @staticmethod
    def rate_limit_exceeded(otp_user):
        if otp_user.last_failed_attempt is not None:
            lockout_end_time = otp_user.last_failed_attempt + LOCKOUT_DURATION
            if timezone.now() < lockout_end_time:
                return True
        return False

    @staticmethod
    def rate_limit_user(user):
        now = timezone.now()
        start_of_period = now - OTPSetupView.RATE_LIMIT_PERIOD
        recent_attempts = OTPUser.objects.filter(
            user=user,
            last_failed_attempt__gte=start_of_period,
        )
        return recent_attempts.count() >= OTPSetupView.MAX_ATTEMPTS_PER_PERIOD

    @staticmethod
    def verify_otp(user, otp_value):
        try:
            otp_user = OTPUser.objects.get(user=user)
            if OTPVerifier.rate_limit_exceeded(otp_user):
                return False  # Rate limit exceeded, don't attempt OTP verification

            if OTPVerifier.rate_limit_user(user):
                return False  # User exceeded rate limit

            totp = TOTP(otp_user.get_otp_secret())
            if totp.verify(otp_value):
                otp_user.failed_attempt_count = 0
                otp_user.locked_out_until = None
                otp_user.save()
                return True
        except OTPUser.DoesNotExist:
            pass  # User does not exist or does not have an OTP setup

        otp_user.failed_attempt_count += 1
        otp_user.last_failed_attempt = timezone.now()
        if otp_user.failed_attempt_count >= MAX_FAILED_ATTEMPTS:
            otp_user.locked_out_until = timezone.now() + LOCKOUT_DURATION
        otp_user.save()
        return False


# ----------------------------------------------------- capture id card


# Initialize the camera
cap = cv2.VideoCapture(0)

# Define the expected ROI for the ID card
roi_id_card = (0, 0, 640, 480)  # Example values, adjust as needed

# Define the ROI for the bottom-right section
roi_bottom_right = (roi_id_card[2] * 0.6, roi_id_card[1] + roi_id_card[3] * 0.8,
                    roi_id_card[2] * 0.8 - roi_id_card[2] * 0.6, roi_id_card[3] - roi_id_card[3] * 0.8)

# Define the ROI for the top-middle section
roi_top_middle = (roi_id_card[2] * 0.4, roi_id_card[1] + roi_id_card[3] * 0.1, roi_id_card[2]
                  * 0.8 - roi_id_card[2] * 0.4, roi_id_card[3] * 0.8 - roi_id_card[3] * 0.1)


def process_frame(frame):
    # Convert the frame to grayscale
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Function to process a specific ROI and extract content
    def process_roi(roi):
        x, y, width, height = roi
        cropped = gray[y:y+height, x:x+width]
        blurred = cv2.GaussianBlur(cropped, (5, 5), 0)
        extracted_text = pytesseract.image_to_string(blurred, config='--psm 6')
        return extracted_text.strip()

    # Extract text from the bottom-right section
    text_bottom_right = process_roi(roi_bottom_right)
    print("Date of expiry:", text_bottom_right)

    # Extract number from the top-middle section
    identification_number = process_roi(roi_top_middle)
    print("Identification Number:", identification_number)


# Start a separate thread for processing frames
thread = threading.Thread(target=process_frame, args=(cap.read()[1],))
thread.daemon = True
thread.start()

while True:
    if cv2.waitKey(1) & 0xFF == 27:  # Press the 'Esc' key to exit
        break

# Release the camera and close all OpenCV windows
cap.release()
cv2.destroyAllWindows()


# ----------------------------------------------------- updateDopaStatus
# http.client

conn = http.client.HTTPSConnection("xxx-xxx-xxx.cloudfunctions.net")
payload = ''
headers = {
    'User-Agent': 'Apidog/1.0.0 (https://apidog.com)',
    'Content-Type': 'application/json'
}
conn.request("POST", "/updateDopaStatus", payload, headers)
res = conn.getresponse()
data = res.read()
print(data.decode("utf-8"))

# Requests

url = "https://xxx-xxx-xxx.cloudfunctions.net/updateDopaStatus"

payload = ""
headers = {
    'User-Agent': 'Apidog/1.0.0 (https://apidog.com)',
    'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)

# POST /updateDopaStatus
# pid string  required
# Example: เลขบัตรประชาชน 13 หลัก
# firstName string required
# Example: ชื่อภาษาไทยเท่านั้น
# lastName string required
# Example: นามสกุลภาษาไทยเท่านั้น
# birthDay string required
# Example: YYYYMMDD
# laser string required
# Example: LaserID หลังบัตรประชาชนไม่ต้องใส่
# uid string required Example: Firebase user uid

# {
#   "pid": "เลขบัตรประชาชน 13 หลัก",
#   "firstName": "ชื่อภาษาไทยเท่านั้น",
#   "lastName": "นามสกุลภาษาไทยเท่านั้น",
#   "birthDay": "YYYYMMDD",
#   "laser": "LaserID หลังบัตรประชาชนไม่ต้องใส่",
#   "uid": "Firebase user uid"
# }
# search results matching criteria
# HTTP Code: 200
# Content Type : JSON

# isError  boolean required
# code integer required
# errorMessage string required
# desc string required
# dopa_check_status boolean required

# Example:
# {
#   "dopa_status_raw": {
#     "isError": true,
#     "code": 0,
#     "errorMessage": "string",
#     "desc": "string"
#   },
#   "dopa_check_status": true
# }

# ----------------------------------------------------- QR CODE
# Constants


class Constants:
    PAYLOAD_FORMAT_INDICATOR = "01"
    STATIC_QR_CODE = "11"
    DYNAMIC_QR_CODE = "12"
    DEFAULT_CURRENCY_CODE = "764"
    DEFAULT_COUNTRY_CODE = "TH"
    DEFAULT_COUNTRY_CODE_TEL = "66"
    CREDIT_TRANSFER_DATA_FIELD_ID = 29
    CREDIT_TRANSFER_ACQUIRER_ID = "A000000677010111"
    BILL_PAYMENT_DATA_FIELD_ID = 30
    BILL_PAYMENT_DATA_ACQUIRER_ID = "A000000677010112"
    oneHundred = Decimal("100.00")

    def __init__(self):
        pass


# Helper


class Helper:
    def __init__(self):
        pass

    @staticmethod
    def crc16(buffer):
        crc = 0xFFFF
        for b in buffer:
            crc = ((crc >> 8) | (crc << 8)) & 0xffff
            crc ^= (b & 0xff)
            crc ^= (crc & 0xff) >> 4
            crc ^= (crc << 12) & 0xffff
            crc ^= (crc & 0xFF) << 5
        crc &= 0xffff
        result = hex(crc).upper()[2:]
        return ("0000" + result).rjust(4, '0')

    @staticmethod
    def validateLength(name, data, maxLength):
        if len(data) > maxLength:
            raise ValueError(f"{name} must not be more than {
                             maxLength} char(s).")

    @staticmethod
    def validateNumeric(name, data):
        if not data.isdigit():
            raise ValueError(f"{name} must contain only numbers.")

    @staticmethod
    def validateAlphanumeric(name, data):
        if not data.isalnum():
            raise ValueError(
                f"{name} must contain only numbers and English characters.")

    @staticmethod
    def validateAmount(amount):
        if amount < Decimal(0):
            raise ValueError("Amount must be a positive number.")
        if Helper.countDecimalPlace(amount) > 2:
            raise ValueError(
                "Amount must be in two-digit decimal place format.")

    @staticmethod
    def countDecimalPlace(bigDecimal):
        string = bigDecimal.normalize().to_eng_string()
        index = string.find('.')
        return 0 if index < 0 else len(string) - index - 1


# QR Generate

MONEY_FORMAT = "{:.2f}"


class PromptPayQR:
    def __init__(self, builder):
        if isinstance(builder.selectPromptPayTypeBuilder.selectPromptPayType, Builder.SelectPromptPayTypeBuilder.CreditTransferBuilder):
            self.paymentField = CREDIT_TRANSFER_DATA_FIELD_ID
            self.acquirerId = CREDIT_TRANSFER_ACQUIRER_ID
            creditTransferBuilder = builder.selectPromptPayTypeBuilder.selectPromptPayType
            self.mobileNumber = creditTransferBuilder.mobileNumber
            self.nationalId = creditTransferBuilder.nationalId
            self.eWalletId = creditTransferBuilder.eWalletId
            self.amount = creditTransferBuilder.amount
            self.outputType = OutputType.PROMPTPAY
        else:
            self.paymentField = BILL_PAYMENT_DATA_FIELD_ID
            self.acquirerId = BILL_PAYMENT_DATA_ACQUIRER_ID
            billPaymentBuilder = builder.selectPromptPayTypeBuilder.selectPromptPayType
            self.billerId = billPaymentBuilder.billerId
            self.ref1 = billPaymentBuilder.ref1
            self.ref2 = billPaymentBuilder.ref2
            self.ref3 = billPaymentBuilder.ref3
            self.amount = billPaymentBuilder.amount
            self.outputType = builder.outputType
        self.usageType = builder.usageType
        self.currencyCode = builder.currencyCode
        self.countryCode = builder.countryCode

    def generateContent(self):
        if self.outputType == OutputType.BOT3:
            return self.generateBOT()
        else:
            return self.generatePromptPayQR()

    def generateQRCodeImage(self, text, width, height):
        qr = QRCode(
            version=1,
            error_correction=constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(text)
        qr.make(fit=True)

        img = qr.make_image(fill_color="black", back_color="white")
        img = img.resize((width, height))
        buffer = BytesIO()
        img.save(buffer, format="PNG")
        return buffer.getvalue()

    def generateBOT(self):
        result = f"|{self.billerId}\n{self.ref1}\n"
        if self.ref2:
            result += self.ref2 + "\n"
        if self.amount is not None:
            result += f"{self.amount * oneHundred: .0f}"
        else:
            result += "0"
        return result

    def generatePromptPayQR(self):
        result = self.generateField(0, PAYLOAD_FORMAT_INDICATOR)
        result += self.generateField(1, self.usageType)

        content = self.generateField(0, self.acquirerId)
        if self.paymentField == 29:
            if self.mobileNumber:
                if self.mobileNumber.startswith("0"):
                    self.mobileNumber = self.mobileNumber[1:]
                content += self.generateField(1, "00" +
                                              DEFAULT_COUNTRY_CODE_TEL + self.mobileNumber)
            elif self.nationalId:
                content += self.generateField(2, self.nationalId)
            elif self.eWalletId:
                content += self.generateField(3, self.eWalletId)
        elif self.paymentField == 30:
            content += self.generateField(1, self.billerId)
            content += self.generateField(2, self.ref1)
            if self.ref2:
                content += self.generateField(3, self.ref2)
        result += self.generateField(self.paymentField, content)
        result += self.generateField(53, self.currencyCode)
        if self.amount is not None:
            result += self.generateField(54, MONEY_FORMAT.format(self.amount))
        result += self.generateField(58, self.countryCode)
        if self.ref3:
            result += self.generateField(62, self.generateField(7, self.ref3))
        result += "6304"
        result += crc16(result.encode())
        return result

    def generateField(self, fieldId, content):
        return f"{fieldId: 02d}{len(content): 02d}{content}"

    def draw(self, width, height, file):
        with open(file, "wb") as f:
            f.write(self.generateQRCodeImage(
                self.generateContent(), width, height))

    def drawToBase64(self, width, height):
        image_data = self.generateQRCodeImage(
            self.generateContent(), width, height)
        base64_image = b64encode(image_data).decode('utf-8')
        return base64_image


class OutputType(Enum):
    BOT3 = 1
    PROMPTPAY = 2


class Builder:
    def __init__(self):
        self.usageType = None
        self.currencyCode = DEFAULT_CURRENCY_CODE
        self.countryCode = DEFAULT_COUNTRY_CODE
        self.selectPromptPayTypeBuilder = Builder.SelectPromptPayTypeBuilder()
        self.outputType = OutputType.PROMPTPAY

    def currencyCode(self, currencyCode):
        validateNumeric("Currency Code", currencyCode)
        validateLength("Currency Code", currencyCode, 3)
        self.currencyCode = currencyCode
        return self

    def countryCode(self, countryCode):
        validateLength("Country Code", countryCode, 2)
        self.countryCode = countryCode.upper()
        return self

    def staticQR(self):
        self.usageType = STATIC_QR_CODE
        self.outputType = OutputType.PROMPTPAY
        return self.selectPromptPayTypeBuilder

    def dynamicQR(self):
        self.usageType = DYNAMIC_QR_CODE
        self.outputType = OutputType.PROMPTPAY
        return self.selectPromptPayTypeBuilder

    def bot(self):
        self.outputType = OutputType.BOT3
        return self.selectPromptPayTypeBuilder


class SelectPromptPayType:

    class SelectPromptPayTypeBuilder:
        class BillPaymentBuilderBillerId:

            def billerId(self, billerId):
                validateNumeric("Biller ID", billerId)
                validateLength("Biller ID", billerId, 15)
                self.billerId = billerId
                return self

        class BillPaymentBuilderRef1:

            def ref1(self, ref1):
                validateAlphanumeric("Reference 1", ref1)
                validateLength("Reference 1", ref1, 15)
                self.ref1 = ref1
                return self

        class BillPaymentBuilderOptionalDetail:

            def amount(self, amount):
                validateLength("Amount", MONEY_FORMAT.format(amount), 13)
                validateAmount(amount)
                amount = amount.quantize(Decimal("0.01"))
                self.amount = amount
                return self

            def ref2(self, ref2):
                validateAlphanumeric("Reference 2", ref2)
                validateLength("Reference 2", ref2, 20)
                self.ref2 = ref2
                return self

            def ref3(self, ref3):
                validateAlphanumeric("Reference 3", ref3)
                validateLength("Terminal ID/Reference 3", ref3, 26)
                self.ref3 = ref3
                return self

        class CreditTransferBuilderIdentifier:

            def mobileNumber(self, mobileNumber):
                validateNumeric("Mobile Number", mobileNumber)
                validateLength("Mobile Number", mobileNumber, 10)
                self.mobileNumber = mobileNumber
                return self

            def nationalId(self, nationalId):
                validateNumeric("National ID/Tax ID", nationalId)
                validateLength("National ID/Tax ID", nationalId, 13)
                self.nationalId = nationalId
                return self

            def eWalletId(self, eWalletId):
                validateNumeric("E-Wallet ID", eWalletId)
                validateLength("E-Wallet ID", eWalletId, 15)
                self.eWalletId = eWalletId
                return self

        class CreditTransferBuilderAmount:

            def amount(self, amount):
                validateLength("Amount", MONEY_FORMAT.format(amount), 13)
                validateAmount(amount)
                amount = amount.quantize(Decimal("0.01"))
                self.amount = amount
                return self

        class BuildReady:

            def build(self):
                return PromptPayQR(self.builder)

    def billPayment(self):
        self.builder = Builder.SelectPromptPayTypeBuilder.BillPaymentBuilderBillerId()
        self.selectPromptPayType = self.builder
        return self.builder

    def creditTransfer(self):
        if self.outputType != OutputType.PROMPTPAY:
            raise ValueError(
                "Credit Transfer is only reserved for PromptPay QR.")
        self.builder = Builder.SelectPromptPayTypeBuilder.CreditTransferBuilder()
        self.selectPromptPayType = self.builder
        return self.builder

# -------------------------------------------------------- qr GBPrimePay


class GBPrimePay:
    def __init__(self, env='production'):
        self.url = 'https://api.gbprimepay.com' if env == 'production' else 'https://api.globalprimepay.com'
        self.token = None
        self.public_key = None
        self.secret_key = None
        self.isToken = True

    def parse_data(self, data):
        fields = ''
        index = 0
        for key, value in data.items():
            index += 1
            fields += f'{key}={requests.utils.quote(value)}'
            if index != len(data):
                fields += '&'

        if self.isToken:
            fields += f'&token={requests.utils.quote(self.token)}'
        else:
            fields += f'&publicKey={self.public_key}'
            concatstring = data['amount'] + data['referenceNo'] + \
                data['responseUrl'] + data['backgroundUrl']
            checksum = hashlib.new('sha256', concatstring.encode()).hexdigest()
            fields += f'&checksum={checksum}'

        return fields

    def request(self, path, data):
        fields = self.parse_data(data)
        headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        response = requests.post(self.url + path, data=fields, headers=headers)
        return response.text

    def promptpay(self, data, token, mode='qrcode'):
        self.isToken = True
        self.token = token
        if mode == 'qrcode':
            path = '/v3/qrcode'
        else:
            path = '/v3/qrcode/text'
        response = self.request(path, data)
        if mode == 'qrcode':
            return 'data:image/png;base64,' + response
        else:
            return response

    def truewallet(self, data, public_key, secret_key):
        self.isToken = False
        self.public_key = public_key
        self.secret_key = secret_key
        response = self.request('/v2/trueWallet', data)
        return response

    def linepay(self, data, public_key, secret_key):
        self.isToken = False
        self.public_key = public_key
        self.secret_key = secret_key
        response = self.request('/v2/linepay', data)
        return response

    def shopeepay(self, data, public_key, secret_key):
        self.isToken = False
        self.public_key = public_key
        self.secret_key = secret_key
        response = self.request('/v1/shopeePay', data)
        return response


# webhook
white_list = [
    '203.151.205.45',
    '203.151.205.33',
    '18.143.213.62',
    '13.215.225.183',
    '54.254.171.101',
    '18.141.54.201',
    '54.151.232.117',
    '54.255.79.153'
]

if request.remote_addr in white_list:
    with open("resp-log.json", "w") as resp_file:
        json_str = request.data.decode("utf-8")
        resp_file.write(json_str + "\n")
        json_obj = json.loads(json_str)
        # You can add your database queries here if needed.
        resp_file.write(json_obj)
else:
    response = "Access Denied"
    return response

# usage

token = "TOKEN"
# public_key = "PUBLIC_KEY"
# secret_key = "SECRET_KEY"

gbprimepay = GBPrimePay()
qrcode = gbprimepay.promptpay({
    'amount': '10.00',
    'referenceNo': 'PP1234',
    'backgroundUrl': 'https://xxxx'
}, token)

print('<img src="' + qrcode + '">')

# Uncomment and modify the following lines for other payment methods if needed.
# truewallet_response = gbprimepay.truewallet({
#     'amount': '10.00',
#     'referenceNo': 'TW1234',
#     'backgroundUrl': 'https://xxxx',
#     'responseUrl': 'https://xxxx',
#     'customerTelephone': '0600000000',
# }, public_key, secret_key)
# print(truewallet_response)

# linepay_response = gbprimepay.linepay({
#     'amount': '10.00',
#     'referenceNo': 'LP1234',
#     'detail': 'test',
#     'responseUrl': 'https://xxxx',
#     'backgroundUrl': 'https://xxxx',
# }, public_key, secret_key)
# print(linepay_response)

# shopeepay_response = gbprimepay.shopeepay({
#     'amount': '10.00',
#     'referenceNo': 'SP1234',
#     'responseUrl': 'https://xxxx',
#     'backgroundUrl': 'https://xxxx',
# }, public_key, secret_key)
# print(shopeepay_response)
