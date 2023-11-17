const sections = document.querySelectorAll(".content-section");

let scrolling = false;
let startY;

function handleScroll(e) {
  if (scrolling) return;
  const scrollDirection = e.deltaY > 0 ? 1 : -1;
  let nearestSectionIndex = -1;
  let minDistance = Number.MAX_VALUE;

  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    const distance = Math.abs(rect.top);

    if (
      (scrollDirection === 1 && rect.top > 0 && distance < minDistance) ||
      (scrollDirection === -1 && rect.top < 0 && distance < minDistance)
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

    function scroll() {
      const now = performance.now();
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);

      window.scrollTo(0, start + progress * (targetOffset - start));

      if (progress < 1) {
        requestAnimationFrame(scroll);
      } else {
        scrolling = false;
      }
    }

    requestAnimationFrame(scroll);
  }
}

function handleTouchStart(e) {
  startY = e.touches[0].clientY;
}

function handleTouchMove(e) {
  const deltaY = e.touches[0].clientY - startY;
  startY = e.touches[0].clientY;

  const syntheticEvent = new WheelEvent("wheel", { deltaY });
  handleScroll(syntheticEvent);
}

window.addEventListener("wheel", handleScroll, { passive: true });
window.addEventListener("touchstart", handleTouchStart, { passive: true });
window.addEventListener("touchmove", handleTouchMove, { passive: true });
