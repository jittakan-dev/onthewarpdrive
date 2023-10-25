const preLoader = document.querySelector(".pre-loader");
const otwdLoader = document.querySelector(".otwd-loader");
const otwdCircles = document.querySelectorAll(".otwd-circle");
const flashLOGO = document.getElementById("flashLOGO");
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
function getRandomPercentage() {
  return Math.floor(Math.random() * 31) + 10 + "%"; // Random value between 10% and 50%
}
function getRandomDelay() {
  return Math.random() * 50; // Random delay between 0ms and 1000ms (1 second)
}
function animateCirclesEnd() {
  subPre.forEach((subPre, index) => {
    const topValue = getRandomPercentage();
    const delay = getRandomDelay();

    setTimeout(() => {
      subPre.style.top = topValue;
      subPre.style.height = "100vh";
    }, index * 5 + delay); // Combine the interval delay and the random delay
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
  const secondIntervalId = setInterval(() => {
    clearInterval(secondIntervalId);
    progressBar.style.color = "rgba(99, 99, 99, 0)";
    document.querySelector(".progressbar").style.height = 0;
    document.querySelector(".progressbar").style.border = "none";
    progressBar.style.height = 0;
    const thirdIntervalId = setInterval(() => {
      clearInterval(thirdIntervalId);
      flashLOGO.style.borderColor = "#212529";
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
