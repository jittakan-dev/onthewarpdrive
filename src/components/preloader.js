const preLoader = document.querySelector(".pre-loader");
const otwdLoader = document.querySelector(".otwd-loader");
const OTWDColorLogo = document.querySelector(".OTWDColorLogo");
const otwdCircles = document.querySelectorAll(".otwd-circle");
const fadeElements = document.querySelectorAll(".fade-element");
const navHeader = document.getElementById("nav-header");
const mainBody = document.getElementById("main-body");

let stopAnimation = false;

function neonAnimate(elements, animationClass, stop = false) {
  if (stop) {
    stopAnimation = true;
    return;
  }
  elements.forEach((element) => {
    const randomDelay = Math.random() * 2 + 1;
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
function animateCirclesEnd() {
  otwdCircles.forEach((circle, index) => {
    setTimeout(() => {
      preLoader.style.backgroundColor = "rgba(249, 241, 227, 0)";
      circle.style.top = "-50%";
      circle.style.left = "10%";
      circle.style.width = circle.style.height = "0%";
    }, index * 400);
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
        animateCirclesEnd();
        setTimeout(() => {
          preLoader.classList.add("fade-out");
          preLoader.addEventListener(
            "transitionend",
            () => {
              preLoader.style.display = "none";
            },
            { once: true }
          );
        }, 900);
      }, 1400);
    }, 1900);
  }, 2300);
});

console.log("Document is in the preload state.");
