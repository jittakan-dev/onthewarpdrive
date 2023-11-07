// JavaScript
const aboutContainer = document.querySelector(".about-container");
const aboutContent = document.querySelector(".about-content");
const aboutToLeft = document.getElementById("AboutToLeft");
const aboutToRight = document.getElementById("AboutToRight");
const otwdHubButton = document.getElementById("otwdHubButton");
const writeUsButton = document.getElementById("writeUsButton");
const hubGroup = document.getElementById("hubGroup");
const formGroup = document.getElementById("formGroup");

otwdHubButton.addEventListener("click", function () {
  otwdHubButton.classList.add("contactTypeButtonActive");
  writeUsButton.classList.remove("contactTypeButtonActive");
  const hubGroupRect = hubGroup.getBoundingClientRect();
  const contactScroll = document.querySelector(".form-hub-slide-group");
  const contactScrollRect = contactScroll.getBoundingClientRect();

  const yOffset = hubGroupRect.top - contactScrollRect.top;
  contactScroll.style.scrollBehavior = "smooth";
  contactScroll.style.transform = `translateY(-${yOffset}px)`;
});

writeUsButton.addEventListener("click", function () {
  writeUsButton.classList.add("contactTypeButtonActive");
  otwdHubButton.classList.remove("contactTypeButtonActive");
  const formGroupRect = formGroup.getBoundingClientRect();
  const contactScroll = document.querySelector(".form-hub-slide-group");
  const contactScrollRect = contactScroll.getBoundingClientRect();

  const yOffset = formGroupRect.top - contactScrollRect.top;
  contactScroll.style.scrollBehavior = "smooth";
  contactScroll.style.transform = `translateY(-${yOffset}px)`;
});
// Add touchstart event listeners
otwdHubButton.addEventListener("touchstart", function () {
  otwdHubButton.classList.add("contactTypeButtonActive");
  writeUsButton.classList.remove("contactTypeButtonActive");
  const hubGroupRect = hubGroup.getBoundingClientRect();
  const contactScroll = document.querySelector(".form-hub-slide-group");
  const contactScrollRect = contactScroll.getBoundingClientRect();

  const yOffset = hubGroupRect.top - contactScrollRect.top;
  contactScroll.style.scrollBehavior = "smooth";
  contactScroll.style.transform = `translateY(-${yOffset}px)`;
});

writeUsButton.addEventListener("touchstart", function () {
  writeUsButton.classList.add("contactTypeButtonActive");
  otwdHubButton.classList.remove("contactTypeButtonActive");
  const formGroupRect = formGroup.getBoundingClientRect();
  const contactScroll = document.querySelector(".form-hub-slide-group");
  const contactScrollRect = contactScroll.getBoundingClientRect();

  const yOffset = formGroupRect.top - contactScrollRect.top;
  contactScroll.style.scrollBehavior = "smooth";
  contactScroll.style.transform = `translateY(-${yOffset}px)`;
});

aboutToLeft.addEventListener("click", () => {
  aboutContainer.scrollTo({
    left: 0,
    behavior: "smooth",
  });
});

aboutToRight.addEventListener("click", () => {
  aboutContainer.scrollTo({
    left: aboutContent.offsetWidth + 2, //browser gap error
    behavior: "smooth",
  });
});
