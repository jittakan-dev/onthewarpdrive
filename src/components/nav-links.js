// nav-links.js

const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const targetOffset = targetSection.getBoundingClientRect().top;
      const initialOffset = window.scrollY;
      const difference = targetOffset;
      const minDuration = 200; // Minimum duration (in milliseconds)
      const maxDuration = 1000; // Maximum duration (in milliseconds)

      // Adjust the exponent value for the desired curve
      const exponent = 0.9;

      const distance = Math.abs(difference);
      const duration = Math.min(
        maxDuration,
        minDuration + Math.pow(distance, exponent)
      );

      let startTime = null;

      function scrollStep(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const fraction = Math.min(progress / duration, 1);
        const interpolatedOffset = initialOffset + difference * fraction;
        window.scrollTo(0, interpolatedOffset);

        if (progress < duration) {
          requestAnimationFrame(scrollStep);
        }
      }

      requestAnimationFrame(scrollStep);
    }
  });
});
