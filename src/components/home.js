const worldCore = document.querySelector(".world-core");
const worldCoreImg = document.querySelector(".world-object-img");
const weDo = document.querySelectorAll(".we-do");
const weAre = document.querySelectorAll(".we-are");
const wePoint = document.querySelectorAll(".we-point");
const weLayer1 = document.querySelector(".we-layer-1");
const weLayer2 = document.querySelector(".we-layer-2");
const worldSubText = document.querySelector(".world-sub-text");

document.addEventListener("DOMContentLoaded", function () {
  setLayersHeight();
  const baseColor = "#000000";
  const targetColor = "#212529";
  const world = document.getElementById("world");
  for (let i = 1; i <= 7; i++) {
    const circle = document.createElement("div");
    circle.className = "circle circle-" + i;
    circle.style.top = 60 - i * 20 + "%";
    circle.style.width = 20 + i * 50 + "dvh";
    circle.style.height = 20 + i * 50 + "dvh";
    circle.style.backgroundColor = adjustColor(baseColor, targetColor, i / 10);
    circle.style.zIndex = 96 - i;
    world.appendChild(circle);
  }
});
window.addEventListener("resize", setLayersHeight);

function setLayersHeight() {
  weLayer1.style.height = weDo[0].clientHeight + "px";
  weLayer2.style.height = weDo[1].clientHeight + "px";
  worldSubText.style.height = weDo[2].clientHeight + "px";
}

function adjustColor(startColor, endColor, percentage) {
  const start = hexToRgb(startColor);
  const end = hexToRgb(endColor);

  const r = Math.round(start.r + percentage * (end.r - start.r));
  const g = Math.round(start.g + percentage * (end.g - start.g));
  const b = Math.round(start.b + percentage * (end.b - start.b));

  return `rgb(${r}, ${g}, ${b})`;
}

function hexToRgb(hex) {
  // Remove the hash, parse hexadecimal values, and return an object
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}
let isRotationAllowed = false;

function rotateWorld(degrees, index) {
  var buttons = document.querySelectorAll(".world-button-group div > i");
  buttons.forEach(function (button) {
    button.classList.remove("active");
  });

  var activeButton = buttons[index - 1];
  activeButton.classList.add("active");

  if (index == 1) {
    weDo.forEach((weDo, index) => {
      setTimeout(() => {
        weDo.style.transform = "translatey(0)";
      }, index * 20);
    });
    weAre.forEach((weAre, index) => {
      setTimeout(() => {
        weAre.style.transform = "translatey(100%)";
      }, index * 20);
    });
    wePoint.forEach((wePoint, index) => {
      setTimeout(() => {
        wePoint.style.transform = "translatey(100%)";
      }, index * 20);
    });
    if (isRotationAllowed) {
      setTimeout(() => {
        worldCoreImg.style.transform = "rotate(40deg)";
        setTimeout(() => {
          worldCoreImg.style.transform = "rotate(-50deg)";
          setTimeout(() => {
            worldCoreImg.style.transform = "rotate(0deg)";
            isRotationAllowed = false;
          }, 500);
        }, 720);
      }, 700);
    }
  } else if (index == 2) {
    isRotationAllowed = true;
    weDo.forEach((weDo, index) => {
      setTimeout(() => {
        weDo.style.transform = "translatey(-150%)";
      }, index * 20);
    });
    weAre.forEach((weAre, index) => {
      setTimeout(() => {
        weAre.style.transform = "translatey(-100%)";
      }, index * 20);
    });
    wePoint.forEach((wePoint, index) => {
      setTimeout(() => {
        wePoint.style.transform = "translatey(100%)";
      }, index * 20);
    });
  } else if (index == 3) {
    isRotationAllowed = true;
    weDo.forEach((weDo, index) => {
      setTimeout(() => {
        weDo.style.transform = "translatey(-150%)";
      }, index * 20);
    });
    weAre.forEach((weAre, index) => {
      setTimeout(() => {
        weAre.style.transform = "translatey(-200%)";
      }, index * 20);
    });
    wePoint.forEach((wePoint, index) => {
      setTimeout(() => {
        wePoint.style.transform = "translatey(-200%)";
      }, index * 20);
    });
  }
  setTimeout(() => {
    worldCore.style.transform = "rotate(" + degrees + "deg)";
  }, 100);
}
