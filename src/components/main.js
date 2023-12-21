const sections = document.querySelectorAll(".content-section");

let scrolling = false;

function handleScroll(e) {
  if (scrolling) return;
  const scrollDirection = e.deltaY > 0 ? 1 : -1;
  let nearestSectionIndex = -1;
  let minDistance = Number.MAX_VALUE;
  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    const distance = Math.abs(rect.top);

    if (scrollDirection === 1 && rect.top > 0 && distance < minDistance) {
      nearestSectionIndex = index;
      minDistance = distance;
    } else if (
      scrollDirection === -1 &&
      rect.top < 0 &&
      distance < minDistance
    ) {
      nearestSectionIndex = index;
      minDistance = distance;
    }
  });

  if (nearestSectionIndex !== -1) {
    const targetSection = sections[nearestSectionIndex];
    const targetOffset =
      targetSection.getBoundingClientRect().top + window.scrollY;

    const duration = 300;
    const start = window.scrollY;
    const startTime = performance.now();

    scrolling = true;

    const bodyStyle = window.getComputedStyle(document.body);
    const overflowY = bodyStyle.getPropertyValue("overflow-y");
  }
}

window.addEventListener("wheel", handleScroll, { passive: true });

window.addEventListener("resize", function () {
  handleScroll();
});

document.addEventListener("DOMContentLoaded", function () {
  const sectionSpaceTop = document.querySelector(".section-space-top");
  const sectionSpaceBottom = document.querySelector(".section-space-bottom");
  for (let i = 0; i < 100; i++) {
    const spaceItem = document.createElement("div");
    spaceItem.classList.add("space-item");
    sectionSpaceTop.appendChild(spaceItem);
  }
  for (let i = 0; i < 100; i++) {
    const spaceItem = document.createElement("div");
    spaceItem.classList.add("space-item");
    sectionSpaceBottom.appendChild(spaceItem);
  }
  window.addEventListener("scroll", function () {
    const scrollTop = window.scrollY;
    const maxScroll = document.body.clientHeight - window.innerHeight;

    const scrollPercentage1 = (scrollTop / maxScroll) * 500;

    const scrollPercentage2 = ((scrollTop - maxScroll / 2) / maxScroll) * 600;

    const color1 = "#012325";
    const color2 = "#01464a";
    const color3 = "#013b3e";
    const color4 = "#012f31";

    const color5 = "#01464a";
    const color6 = "#013b3e";
    const color7 = "#012f31";
    const color8 = "#012325";

    const gradient1 = `linear-gradient(170deg, ${color1} ${
      scrollPercentage1 / 4
    }%, ${color2} ${scrollPercentage1 / 3}%, ${color3} ${
      scrollPercentage1 / 2
    }%, ${color4} ${scrollPercentage1}%)`;

    sectionSpaceTop.style.background = gradient1;
    sectionSpaceTop.style.backgroundSize = "100% 100%";
    sectionSpaceTop.style.animation = "gradientAnimation 5s ease infinite";

    const gradient2 = `linear-gradient(4deg,${color8} ${
      scrollPercentage2 / 3.5
    }%, ${color7} ${scrollPercentage2 / 3}%, ${color6} ${
      scrollPercentage2 / 2.5
    }%, ${color5} ${scrollPercentage2 / 2}%)`;

    sectionSpaceBottom.style.background = gradient2;
    sectionSpaceBottom.style.backgroundSize = "100% 100%";
    sectionSpaceBottom.style.animation = "gradientAnimation 5s ease infinite";
  });
});
