const preLoader = document.querySelector(".pre-loader");
const navHeader = document.getElementById("nav-header");
const mainBody = document.getElementById("main-body");
const otwdLoader = document.querySelector(".otwd-loader");
const otwdCircles = document.querySelectorAll(".otwd-circle");
const fadeElements = document.querySelectorAll(".fade-element");

/*FOR FILE .SVG*/
// const otwdSvg = document.getElementById("otwd-svg-id");
// const otwdSvgDocument = otwdSvg.contentDocument;
// const fadeElements = otwdSvgDocument.querySelectorAll(".fade-element");
/*FOR FILE .SVG*/
let stopAnimation = false;

function neonAnimate(elements, animationClass, stop = false) {
  if (stop) {
    stopAnimation = true;
    return;
  }
  elements.forEach((element) => {
    const randomDelay = Math.random() * 3 + 1;
    setTimeout(() => {
      if (stopAnimation) return;
      element.classList.toggle(animationClass);
      neonAnimate(elements, animationClass);
    }, randomDelay * 500);
  });
}

function animateCircles() {
  otwdCircles.forEach((circle, index) => {
    setTimeout(() => {
      circle.style.width = circle.style.height = "200%";
    }, index * 200);
  });
}

function onDocumentReadyStateChange() {
  switch (document.readyState) {
    case "loading":
    case "interactive":
    case "complete":
      neonAnimate(fadeElements, "neon", false);
      if (document.readyState === "complete") animateCircles();
      break;
  }
}
document.addEventListener("readystatechange", onDocumentReadyStateChange);

window.addEventListener("load", () => {
  setTimeout(() => {
    neonAnimate(fadeElements, "neon", false);
    setTimeout(() => {
      animateCircles();
      setTimeout(() => {
        neonAnimate(fadeElements, "neon", true);
        navHeader.style.display = mainBody.style.display = "block";
        setTimeout(() => {
          preLoader.classList.add("fade-out");
          preLoader.addEventListener(
            "transitionend",
            () => {
              preLoader.style.display = "none";
            },
            { once: true }
          );
        }, 1000);
      }, 1500);
    }, 2000);
  }, 2400);
});

console.log("Document is in the preload state.");
