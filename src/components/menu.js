const menuSection = document.getElementById("menu-section");
const navLinks = menuSection.querySelectorAll("nav a");
const menuBubble = document.querySelector(".bubble-handle");
const menuBubbleClick = menuBubble.querySelector(".bubble-handle-button");
const menuButton = document.querySelector(".bubble-button");
const menuButtonClick = document.querySelector(".bubble-button-hamburger");

document.addEventListener("DOMContentLoaded", function () {
  menuButtonClick.addEventListener("click", function () {
    this.classList.toggle("menu-active");
    menuSection.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Add scroll-behavior: smooth; when a navigation link is clicked
      document.documentElement.style.scrollBehavior = "smooth";
      document.body.style.scrollBehavior = "smooth";

      menuSection.classList.remove("active");
      menuButtonClick.classList.remove("menu-active");

      // Remove scroll-behavior: smooth; when scrolling is finished
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = "";
        document.body.style.scrollBehavior = "";
      }, 1000); // Adjust the duration as needed
    });
  });

  const scrollToSection = (targetId) => {
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const targetOffset = targetSection.getBoundingClientRect().top;
      const initialOffset = window.scrollY;
      const difference = targetOffset;
      const minDuration = 400;
      const maxDuration = 700;
      const exponent = 0.7;

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
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href");
      scrollToSection(targetId);
    });
  });
});
