document.addEventListener("DOMContentLoaded", () => {
  const otwdHubButton = document.getElementById("otwdHubButton");
  const writeUsButton = document.getElementById("writeUsButton");
  const hubGroup = document.getElementById("hubGroup");
  const formGroup = document.getElementById("formGroup");
  const contactScroll = document.querySelector(".form-hub-slide-group");

  otwdHubButton.addEventListener("click", () =>
    scrollToElement(hubGroup, contactScroll)
  );
  writeUsButton.addEventListener("click", () =>
    scrollToElement(formGroup, contactScroll)
  );
});

const OTWDScrollable = document.querySelector(".about-container");
const scrollToLeftButton = document.getElementById("AboutToLeft");
const scrollToRightButton = document.getElementById("AboutToRight");
const aboutContainer = document.querySelector(".about-container");
const aboutContent = document.querySelector(".about-content");

let isSectionDragging = false;
let startX,
  scrollLeft,
  momentumScrollTimeout,
  isScrollAtBottom = false;

OTWDScrollable.addEventListener("mousedown", startDrag);
OTWDScrollable.addEventListener("mouseleave", startMomentumScroll);
OTWDScrollable.addEventListener("mouseup", startMomentumScroll);
OTWDScrollable.addEventListener("mousemove", handleMouseMove);

// Commented out touch event listeners
// OTWDScrollable.addEventListener("touchstart", startDrag);
// OTWDScrollable.addEventListener("touchmove", handleTouchMove);
// document.addEventListener("touchend", startMomentumScroll);

scrollToLeftButton.addEventListener("click", () => scrollTo(0));
scrollToRightButton.addEventListener("click", () =>
  scrollTo(aboutContent.offsetWidth)
);

OTWDScrollable.addEventListener("wheel", handleWheel);

aboutContainer.addEventListener("scroll", handleScroll);

function scrollToElement(targetElement, scrollContainer) {
  const targetRect = targetElement.getBoundingClientRect();
  const containerRect = scrollContainer.getBoundingClientRect();
  const yOffset = targetRect.top - containerRect.top;
  scrollContainer.style.scrollBehavior = "smooth";
  scrollContainer.style.transform = `translateY(-${yOffset}px)`;
  otwdHubButton.classList.toggle("contactTypeButtonActive");
  writeUsButton.classList.toggle("contactTypeButtonActive");
}

function startDrag(e) {
  isSectionDragging = true;
  startX = e.pageX || e.touches[0].pageX;
  scrollLeft = OTWDScrollable.scrollLeft;
  OTWDScrollable.classList.add("grabbing");
  clearTimeout(momentumScrollTimeout);
}

function handleMouseMove(e) {
  if (!isSectionDragging) return;
  e.preventDefault();
  const x = e.pageX || e.touches[0].pageX;
  OTWDScrollable.scrollLeft = scrollLeft - (x - startX);
}

// Commented out touch event handling
// function handleTouchMove(e) {
//   if (!isSectionDragging) return;
//   e.preventDefault();
//   const x = e.touches[0].pageX;
//   OTWDScrollable.scrollLeft = scrollLeft - (x - startX);
// }

function startMomentumScroll() {
  isSectionDragging = false;
  OTWDScrollable.classList.remove("grabbing");
}

function scrollTo(leftPosition) {
  OTWDScrollable.scrollTo({ left: leftPosition, behavior: "smooth" });
}

function handleWheel(event) {
  OTWDScrollable.scrollBy({ left: event.deltaY < 0 ? -30 : 30 });
}

function handleScroll() {
  const leftBorderPosition = aboutContent.getBoundingClientRect().left;
  const scrollDirection = leftBorderPosition > 0 ? "up" : "down";
  isScrollAtBottom =
    aboutContainer.scrollHeight - aboutContainer.scrollTop ===
    aboutContainer.clientHeight;

  if (leftBorderPosition > 0 && scrollDirection === "up" && isScrollAtBottom) {
    aboutContainer.removeEventListener("wheel", preventDefaultScroll);
  } else {
    aboutContainer.addEventListener("wheel", preventDefaultScroll);
  }
}

function preventDefaultScroll(event) {
  event.preventDefault();
  // aboutContainer.scrollBy({ left: event.deltaY < 0 ? -30 : 30 });
}
