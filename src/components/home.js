const worldCore = document.querySelector(".world-core");
const worldBallon = document.querySelector(".world-balloon");
const worldBallonImg = document.querySelector(".world-balloon img");
const worldBear = document.querySelector(".world-bear");
const worldLighthouse = document.querySelector(".world-lighthouse");
const circle_0 = document.querySelector(".balloon-effect-circle-0");
const circle_1 = document.querySelector(" .balloon-effect-circle-1");
const circle_2 = document.querySelector(".balloon-effect-circle-2");
const circle_3 = document.querySelector(".balloon-effect-circle-3");
const lb0 = document.querySelector(".lb0");
const lb1 = document.querySelector(".lb1");
const lb2 = document.querySelector(".lb2");
const lb3 = document.querySelector(".lb3");
const weDo = document.querySelectorAll(".we-do");
const weAre = document.querySelectorAll(".we-are");
const weGuide = document.querySelectorAll(".we-guide");
const weLayer1 = document.querySelector(".we-layer-1");
const weLayer2 = document.querySelector(".we-layer-2");
const worldSubText = document.querySelector(".world-sub-text");
const moreDetailA = document.querySelectorAll(".world-base-more-detail a");

document.addEventListener("DOMContentLoaded", function () {
  setLayersHeight();
  const baseColor = "#070707";
  const targetColor = "#343a40";
  const world = document.getElementById("world");
  for (let i = 1; i <= 7; i++) {
    const circle = document.createElement("div");
    circle.className = "circle circle-" + i;
    circle.style.top = 60 - i * 20 + "%";
    circle.style.width = 20 + i * 50 + "dvh";
    circle.style.height = 20 + i * 50 + "dvh";
    circle.style.backgroundColor = adjustColor(baseColor, targetColor, i / 10);
    circle.style.zIndex = 8 - i;
    world.appendChild(circle);
  }
});

window.addEventListener("resize", setLayersHeight);

function changeInAnimation() {
  circle_0.style.animation = "pulse-bold 1.2s ease-out infinite";
  circle_1.style.animation = "pulse-bold 1.7s ease-out infinite";
  circle_2.style.animation = "pulse-bold 2.2s ease-out infinite";
  circle_3.style.animation = "pulse-bold 2.5s ease-out infinite";
  worldBallonImg.style.filter =
    "drop-shadow(-1rem 0 6rem #6c757d) brightness(130%)";
}
function changeOutAnimation() {
  circle_0.style.animation = "pulse 2s ease-out infinite";
  circle_1.style.animation = "pulse 3s ease-out infinite";
  circle_2.style.animation = "pulse 3.5s ease-out infinite";
  circle_3.style.animation = "pulse 4s ease-out infinite";
  worldBallonImg.style.filter =
    "drop-shadow(0rem 0rem 0.2rem rgba(42, 42, 41, 0.5)) brightness(90%)";
}

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
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}
let isRotationAllowed = false;

function rotateWorld(degrees, index) {
  const balloonEffect = document.querySelector(".balloon-effect");
  var buttons = document.querySelectorAll(".world-button-group div");
  buttons.forEach(function (button) {
    button.classList.remove("worldActive");
  });
  var activeButton = buttons[index - 1];
  activeButton.classList.add("worldActive");

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
    weGuide.forEach((weGuide, index) => {
      setTimeout(() => {
        weGuide.style.transform = "translatey(100%)";
      }, index * 20);
    });
    setTimeout(() => {
      worldBear.style.visibility = "hidden";
      worldBear.style.opacity = 0;
      worldLighthouse.style.visibility = "hidden";
      worldLighthouse.style.opacity = 0;
      setTimeout(() => {
        lb0.style.animation = "none";
        lb1.style.animation = "none";
        lb2.style.animation = "none";
        lb3.style.animation = "none";
      }, 400);
    }, 400);

    if (isRotationAllowed) {
      setTimeout(() => {
        worldBallon.style.transform = "rotate(40deg)";
        setTimeout(() => {
          worldBallon.style.transform = "rotate(-50deg)";
          setTimeout(() => {
            worldBallon.style.transform = "rotate(0deg)";
            setTimeout(() => {
              balloonEffect.style.opacity = 1;
            }, 200);
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
    weGuide.forEach((weGuide, index) => {
      setTimeout(() => {
        weGuide.style.transform = "translatey(100%)";
      }, index * 20);
    });
    balloonEffect.style.opacity = 0;
    setTimeout(() => {
      worldLighthouse.style.visibility = "hidden";
      worldLighthouse.style.opacity = 0;
      setTimeout(() => {
        lb0.style.animation = "none";
        lb1.style.animation = "none";
        lb2.style.animation = "none";
        lb3.style.animation = "none";
      }, 400);
    }, 400);
    worldBallon.style.transform = "rotate(45deg)";
    setTimeout(() => {
      worldBallon.style.transform = "rotate(-45deg)";
      setTimeout(() => {
        worldBallon.style.transform = "rotate(0deg)";
        setTimeout(() => {
          worldBear.style.visibility = "visible";
          worldBear.style.opacity = 1;
        }, 900);
      }, 400);
    }, 400);
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
    weGuide.forEach((weGuide, index) => {
      setTimeout(() => {
        weGuide.style.transform = "translatey(-200%)";
      }, index * 20);
    });
    balloonEffect.style.opacity = 0;
    setTimeout(() => {
      worldBear.style.visibility = "hidden";
      worldBear.style.opacity = 0;
    }, 400);
    worldBallon.style.transform = "rotate(45deg)";
    setTimeout(() => {
      worldBallon.style.transform = "rotate(-45deg)";
      setTimeout(() => {
        worldBallon.style.transform = "rotate(0deg)";
        setTimeout(() => {
          setTimeout(() => {
            lb0.style.animation = "laser 6s infinite";
            lb1.style.animation = "laser 6.5s infinite";
            lb2.style.animation = " laser 7s infinite";
            lb3.style.animation = "laser 7.5s infinite";
          }, 50);
          worldLighthouse.style.visibility = "visible";
          worldLighthouse.style.opacity = 1;
        }, 1000);
      }, 400);
    }, 400);
  }
  setTimeout(() => {
    worldCore.style.transform = "rotate(" + degrees + "deg)";
  }, 100);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function updateBearGrid() {
  shuffleArray(spans);

  const bearGrid = document.getElementById("bearGrid");
  bearGrid.innerHTML = "";

  spans.forEach((span, index) => {
    const bearGridItem = document.createElement("div");
    bearGridItem.classList.add("bear-grid-item");
    bearGridItem.innerHTML = span;
    bearGridItem.style.opacity = 1;
    bearGridItem.style.animationDelay = index * 0.5 + "s";
    bearGrid.appendChild(bearGridItem);
  });
  setTimeout(updateBearGrid, 1000);
}
const spans = [
  "<span><i class='fa-solid fa-glasses'></i></span>",
  "<span><i class='fa-solid fa-mobile-screen-button'></i></span>",
  "<span><i class='fa-solid fa-globe'></i></span>",
  "<span><i class='fa-solid fa-chart-line'></i></span>",
  "<span><i class='fa-solid fa-mug-hot'></i></span>",
  "<span><i class='fa-regular fa-hand-point-right bear-next' onclick='rotateWorld(250,3)'></i></span>",
];

updateBearGrid();
