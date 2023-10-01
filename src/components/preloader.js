const preLoader = document.querySelector(".pre-loader");
const navHeader = document.getElementById("nav-header");
const mainBody = document.getElementById("main-body");
const otwdLoader = document.querySelector(".otwd-loader");
const fadeElements = document.querySelectorAll(".fade-element");
const otwdCircles = document.querySelectorAll(".otwd-circle");

function applyRandomAnimation(stop = false) {
  if (stop) {
    stopAnimation = true;
    return;
  }

  fadeElements.forEach((element) => {
    const randomDelay = Math.random() * 3 + 1;
    setTimeout(() => {
      if (stopAnimation) return;
      element.classList.toggle("neon");
      applyRandomAnimation();
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

let stopAnimation = false;

function onDocumentReadyStateChange() {
  switch (document.readyState) {
    case "loading":
    case "interactive":
    case "complete":
      applyRandomAnimation();
      if (document.readyState === "complete") animateCircles();
      break;
  }
}

document.addEventListener("readystatechange", onDocumentReadyStateChange);

window.addEventListener("load", () => {
  setTimeout(() => {
    applyRandomAnimation();
    setTimeout(() => {
      animateCircles();
      setTimeout(() => {
        applyRandomAnimation(true);
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
