const preLoader = document.querySelector(".pre-loader");
const otwdLoader = document.querySelector(".otwd-loader");
const otwdCircles = document.querySelectorAll(".otwd-circle");
const OTWDColorLogo = document.querySelector(".OTWDColorLogo");
const progressBar = document.querySelector(".progressbar .progress");
const subPre = document.querySelectorAll(".sub-pre");
const navHeader = document.getElementById("nav-header");
const mainBody = document.getElementById("main-body");

let intervalIds = [];
let circleIntervals = [];
let subPreIntervals = [];

var navigationStart = performance.timing.navigationStart;
var loadEventEnd = performance.timing.loadEventEnd;

var EstimatedTime = -(loadEventEnd - navigationStart);
var timeInSeconds = parseInt((EstimatedTime / 1000) % 60) * 100;

function animateValue(element, start, end, duration) {
  var range = end - start;
  var current = start;
  var increment = range > 0 ? 1 : -1;
  var stepTime = Math.abs(Math.floor(duration / range));

  var timer = setInterval(function () {
    current += increment;
    element.textContent = current + "%";
    document.querySelector(".progress").style.width = current + "%";
    if (current == end) {
      clearInterval(timer);
    }
  }, stepTime);
}

animateValue(progressBar, 0, 100, timeInSeconds);

function animateCircles() {
  otwdCircles.forEach((circle, index) => {
    const intervalId = setInterval(() => {
      circle.style.width = circle.style.height = "200%";
    }, index * 200);
    circleIntervals.push(intervalId);
  });
}

function animateCirclesEnd() {
  subPre.forEach((subPre, index) => {
    const intervalId = setInterval(() => {
      subPre.style.top = "-20%";
      subPre.style.height = "100vh";
    }, index * 600);
    subPreIntervals.push(intervalId);
  });
}

function clearAllIntervals() {
  circleIntervals.forEach((intervalId) => {
    clearInterval(intervalId);
  });
  subPreIntervals.forEach((intervalId) => {
    clearInterval(intervalId);
  });
}

const firstIntervalId = setInterval(() => {
  clearInterval(firstIntervalId);
  animateCircles();
  progressBar.style.color = "rgba(99, 99, 99, 0)";
  const secondIntervalId = setInterval(() => {
    clearInterval(secondIntervalId);
    document.querySelector(".progressbar").style.height = 0;
    document.querySelector(".progressbar").style.border = "none";
    progressBar.style.height = 0;

    const thirdIntervalId = setInterval(() => {
      clearInterval(thirdIntervalId);
      preLoader.style.backgroundColor = "black";
      navHeader.style.display = mainBody.style.display = "block";
      const fourthIntervalId = setInterval(() => {
        clearInterval(fourthIntervalId);
        preLoader.classList.add("fade-out");

        const fifthIntervalId = setInterval(() => {
          clearInterval(fifthIntervalId);
          animateCirclesEnd();
          clearAllIntervals();
          preLoader.addEventListener(
            "transitionend",
            () => {
              preLoader.style.display = "none";
            },
            { once: true }
          );
        }, 900);
      }, 1200);
    }, 1400);
  }, 1000);
}, timeInSeconds + 500);

// function onDocumentReadyStateChange() {
//   switch (document.readyState) {
//     case "loading":
//     case "interactive":
//     case "complete":
//       if (document.readyState === "complete") animateCircles();
//       break;
//   }
// }
// document.addEventListener("readystatechange", onDocumentReadyStateChange);
