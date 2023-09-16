const sections = document.querySelectorAll(".content-section");
let touchStartY = null;

window.addEventListener(
  "wheel",
  function (e) {
    e.preventDefault();

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
      sections[nearestSectionIndex].scrollIntoView({
        behavior: "smooth",
      });
    }
  },
  { passive: false }
);

// Add touch event handling
window.addEventListener("touchstart", function (e) {
  touchStartY = e.touches[0].clientY;
});

window.addEventListener("touchmove", function (e) {
  if (touchStartY === null) {
    return;
  }

  const touchEndY = e.touches[0].clientY;
  const deltaY = touchEndY - touchStartY;
  touchStartY = touchEndY;

  let nearestSectionIndex = -1;
  let minDistance = Number.MAX_VALUE;

  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    const distance = Math.abs(rect.top);

    if (deltaY > 0 && rect.top > 0 && distance < minDistance) {
      nearestSectionIndex = index;
      minDistance = distance;
    } else if (deltaY < 0 && rect.top < 0 && distance < minDistance) {
      nearestSectionIndex = index;
      minDistance = distance;
    }
  });

  if (nearestSectionIndex !== -1) {
    sections[nearestSectionIndex].scrollIntoView({
      behavior: "smooth",
    });
  }
});

window.addEventListener("touchend", function () {
  touchStartY = null;
});
