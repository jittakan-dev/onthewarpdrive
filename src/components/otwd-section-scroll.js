// JavaScript
document.addEventListener("DOMContentLoaded", function () {
  const otwdHubButton = document.getElementById("otwdHubButton");
  const writeUsButton = document.getElementById("writeUsButton");
  const contactusForm = document.querySelector(".contactus-hub-group");
  const hubGroup = document.querySelector(".hub-group");
  const formGroup = document.querySelector(".form-group");

  otwdHubButton.addEventListener("click", function () {
    const hubGroupRect = hubGroup.getBoundingClientRect();
    const contactusScroll = document.querySelector(".contactus-scroll");
    const contactusScrollRect = contactusScroll.getBoundingClientRect();

    const yOffset = hubGroupRect.top - contactusScrollRect.top;
    contactusScroll.style.scrollBehavior = "smooth";
    contactusScroll.style.transform = `translateY(-${yOffset}px)`;
    otwdHubButton.classList.add("contactusTypeButtonActive");
    writeUsButton.classList.remove("contactusTypeButtonActive");
  });

  writeUsButton.addEventListener("click", function () {
    const formGroupRect = formGroup.getBoundingClientRect();
    const contactusScroll = document.querySelector(".contactus-scroll");
    const contactusScrollRect = contactusScroll.getBoundingClientRect();

    const yOffset = formGroupRect.top - contactusScrollRect.top;
    contactusScroll.style.scrollBehavior = "smooth";
    contactusScroll.style.transform = `translateY(-${yOffset}px)`;
    writeUsButton.classList.add("contactusTypeButtonActive");
    otwdHubButton.classList.remove("contactusTypeButtonActive");
  });
});

//-------------START SCROLL n DRAG OTWD---------------//
const scrollableDiv = document.querySelector(".about-main-container");
const scrollToLeftButton = document.getElementById("AboutToLeft");
const scrollToRightButton = document.getElementById("AboutToRight");

let isSectionDragging = false;
let startX;
let scrollLeft;
let momentumScrollTimeout;

//---------------------------------------------------------------------- Grab events
scrollableDiv.addEventListener("mousedown", (e) => {
  isSectionDragging = true;
  startX = e.pageX - scrollableDiv.offsetLeft;
  scrollLeft = scrollableDiv.scrollLeft;
  scrollableDiv.classList.add("grabbing");
  clearTimeout(momentumScrollTimeout);
});

scrollableDiv.addEventListener("mouseleave", () => {
  if (isSectionDragging) {
    startMomentumScroll();
  }
});

scrollableDiv.addEventListener("mouseup", () => {
  if (isSectionDragging) {
    startMomentumScroll();
  }
});

scrollableDiv.addEventListener("mousemove", (e) => {
  if (!isSectionDragging) return;
  e.preventDefault();
  const x = e.pageX - scrollableDiv.offsetLeft;
  const walk = x - startX; // Adjust this multiplier for scroll speed
  scrollableDiv.scrollLeft = scrollLeft - walk;
});

//---------------------------------------------------------------------- Touch events
scrollableDiv.addEventListener("touchstart", (e) => {
  isSectionDragging = true;
  startX = e.touches[0].pageX - scrollableDiv.offsetLeft;
  scrollLeft = scrollableDiv.scrollLeft;
  scrollableDiv.classList.add("grabbing");
  clearTimeout(momentumScrollTimeout);
});

scrollableDiv.addEventListener("touchmove", (e) => {
  if (!isSectionDragging) return;
  e.preventDefault();
  const x = e.touches[0].pageX - scrollableDiv.offsetLeft;
  const walk = x - startX; // Adjust this multiplier for scroll speed
  scrollableDiv.scrollLeft = scrollLeft - walk;
});

document.addEventListener("touchend", () => {
  if (isSectionDragging) {
    startMomentumScroll();
  }
});

//---------------------------------------------------------------------- Click events
scrollToLeftButton.addEventListener("click", () => {
  scrollableDiv.scrollTo({
    left: 0,
    behavior: "smooth",
  });
});

scrollToRightButton.addEventListener("click", () => {
  const childWidth = document.querySelector(".about-content").offsetWidth;
  scrollableDiv.scrollTo({
    left: childWidth,
    behavior: "smooth",
  });
});

function startMomentumScroll() {
  isSectionDragging = false;
  scrollableDiv.classList.remove("grabbing");
  // const targetScrollLeft = scrollableDiv.scrollLeft;
  // momentumScrollTimeout = setTimeout(() => {
  //   scrollableDiv.scrollTo({
  //     left: targetScrollLeft,
  //     behavior: "smooth",
  //   });
  // }, 2000);
}
//-------------END SCROLL n DRAG OTWD---------------//
