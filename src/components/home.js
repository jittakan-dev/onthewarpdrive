const worldCore = document.querySelector(".world-core");
const worldBallon = document.querySelector(".world-balloon");
const worldBallonImg = document.querySelector(".world-balloon img");
const arrowSignImg = document.querySelector(".arrow-sign img");
const worldBear = document.querySelector(".world-bear");
const worldBearSparkle = document.querySelector(".world-bear-sparkle");
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

function changeInBalloon() {
  circle_0.style.animation = "pulse-bold 1.2s ease-out infinite";
  circle_1.style.animation = "pulse-bold 1.7s ease-out infinite";
  circle_2.style.animation = "pulse-bold 2.2s ease-out infinite";
  circle_3.style.animation = "pulse-bold 2.5s ease-out infinite";
  worldBallonImg.style.filter =
    "drop-shadow(-1rem 0 6rem #288A8F) brightness(130%)";
}
function changeOutBalloon() {
  circle_0.style.animation = "pulse 2s ease-out infinite";
  circle_1.style.animation = "pulse 3s ease-out infinite";
  circle_2.style.animation = "pulse 3.5s ease-out infinite";
  circle_3.style.animation = "pulse 4s ease-out infinite";
  worldBallonImg.style.filter =
    "drop-shadow(0rem 0rem 0.2rem rgba(40, 138, 143, 0.2)) brightness(90%)";
}
// function changeInArrow() {
//   arrowSignImg.style.filter =
//     "drop-shadow(0.1rem 0.1rem 0.5rem rgba(159, 238, 180, 0.7)) brightness(130%)";
// }
// function changeOutArrow() {
//   arrowSignImg.style.filter =
//     "drop-shadow(-0.25rem 0.25rem 0.2rem rgba(32, 32, 32, 0.8))";
// }
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
      worldBearSparkle.style.visibility = "hidden";
      worldBearSparkle.style.opacity = 0;
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
          setTimeout(() => {
            worldBearSparkle.style.visibility = "visible";
            worldBearSparkle.style.opacity = 1;
            meteor();
          }, 500);
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
      worldBearSparkle.style.visibility = "hidden";
      worldBearSparkle.style.opacity = 0;
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
        }, 1200);
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

  const bearGrid = document.querySelector(".bear-grid");
  bearGrid.innerHTML = "";

  spans.forEach((span, index) => {
    const bearGridItem = document.createElement("div");
    bearGridItem.classList.add("bear-grid-item");
    bearGridItem.innerHTML = span;
    bearGridItem.style.opacity = 1;
    bearGridItem.style.animationDelay = index * 0.5 + "s";
    bearGrid.appendChild(bearGridItem);
  });
  setTimeout(updateBearGrid, 1500);
}
const spans = [
  "<span><i class='fa-solid fa-glasses'></i></span>",
  "<span><i class='fa-solid fa-mobile-screen-button'></i></span>",
  "<span><i class='fa-solid fa-globe'></i></span>",
  "<span><i class='fa-solid fa-chart-line'></i></span>",
  "<span><i class='fa-solid fa-mug-hot'></i></span>",
  "<span><i class='fa-regular fa-hand-point-right bear-next' onclick='rotateWorld(250,3)'></i></span>",
];

function meteor() {
  let amount = 70;
  let container = document.querySelector(".world-bear-sparkle");
  let count = 0;
  while (count < amount) {
    let drop = document.createElement("div");
    drop.className = "droplet";
    let size = Math.random() * 5;
    let posX = Math.floor(Math.random() * container.offsetWidth);
    let delay = Math.random() * -20;
    let duration = Math.random() * 5;
    drop.style.width = 0.1 + size + "px";
    drop.style.left = posX + "px";
    drop.style.animationDelay = delay + "s";
    drop.style.animationDuration = 3 + duration + "s";
    container.appendChild(drop);
    count++;
  }
}

updateBearGrid();
