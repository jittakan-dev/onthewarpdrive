// JavaScript
const aboutContainer = document.querySelector(".about-container");
const aboutContent = document.querySelector(".about-content");
const aboutToLeft = document.getElementById("AboutToLeft");
const aboutToRight = document.getElementById("AboutToRight");
const otwdHubButton = document.getElementById("otwdHubButton");
const writeUsButton = document.getElementById("writeUsButton");
const hubGroup = document.getElementById("hubGroup");
const formGroup = document.getElementById("formGroup");

document.addEventListener("DOMContentLoaded", function () {
  otwdHubButton.addEventListener("click", function () {
    const hubGroupRect = hubGroup.getBoundingClientRect();
    const contactScroll = document.querySelector(".form-hub-slide-group");
    const contactScrollRect = contactScroll.getBoundingClientRect();

    const yOffset = hubGroupRect.top - contactScrollRect.top;
    contactScroll.style.scrollBehavior = "smooth";
    contactScroll.style.transform = `translateY(-${yOffset}px)`;
    otwdHubButton.classList.add("contactTypeButtonActive");
    writeUsButton.classList.remove("contactTypeButtonActive");
  });

  writeUsButton.addEventListener("click", function () {
    const formGroupRect = formGroup.getBoundingClientRect();
    const contactScroll = document.querySelector(".form-hub-slide-group");
    const contactScrollRect = contactScroll.getBoundingClientRect();

    const yOffset = formGroupRect.top - contactScrollRect.top;
    contactScroll.style.scrollBehavior = "smooth";
    contactScroll.style.transform = `translateY(-${yOffset}px)`;
    writeUsButton.classList.add("contactTypeButtonActive");
    otwdHubButton.classList.remove("contactTypeButtonActive");
  });
});

aboutToLeft.addEventListener("click", () => {
  aboutContainer.scrollTo({
    left: 0,
    behavior: "smooth",
  });
});

aboutToRight.addEventListener("click", () => {
  aboutContainer.scrollTo({
    left: aboutContent.offsetWidth,
    behavior: "smooth",
  });
});
