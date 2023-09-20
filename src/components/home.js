const sections = document.querySelectorAll(".content-section");

let scrolling = false;

window.addEventListener(
  "wheel",
  function (e) {
    if (scrolling) return; // If already scrolling, ignore additional wheel events

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

      const duration = 300; // Adjust the duration as needed
      const start = window.scrollY;
      const startTime = performance.now();

      scrolling = true; // Mark as scrolling

      function scroll() {
        const now = performance.now();
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);

        window.scrollTo(0, start + progress * (targetOffset - start));

        if (progress < 1) {
          requestAnimationFrame(scroll);
        } else {
          scrolling = false; // Mark as not scrolling when the animation is done
        }
      }

      requestAnimationFrame(scroll);
    }
  },
  { passive: true }
);
