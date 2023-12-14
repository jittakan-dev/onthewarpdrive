const menuSection = document.querySelector(".menu-section");
const hiddenMenuLinks = document.querySelectorAll(".right-menu a");
const dotGroupLinks = document.querySelectorAll(".nav-dot-group a");
const menuBubble = document.querySelector(".bubble-handle");
const menuBubbleClick = menuBubble.querySelector(".bubble-handle-button");
const menuButton = document.querySelector(".bubble-button");
const menuButtonClick = document.querySelector(".bubble-button-hamburger");

document.addEventListener("DOMContentLoaded", function () {
  const smoothScroll = () => {
    document.documentElement.style.scrollBehavior = "smooth";
    document.body.style.scrollBehavior = "smooth";
  };

  const resetScrollBehavior = () => {
    document.documentElement.style.scrollBehavior = "";
    document.body.style.scrollBehavior = "";
  };

  const toggleMenu = () => {
    menuButtonClick.classList.toggle("menu-active");
    menuSection.classList.toggle("active");
  };

  const scrollToTarget = (targetId) => {
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      const targetOffset = targetSection.getBoundingClientRect().top;
      const initialOffset = window.scrollY;
      const difference = targetOffset;
      const minDuration = 400;
      const maxDuration = 700;
      const exponent = 0.5;
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

  menuButtonClick.addEventListener("click", toggleMenu);

  [...hiddenMenuLinks, ...dotGroupLinks].forEach((link) => {
    link.addEventListener("click", (event) => {
      smoothScroll();
      menuSection.classList.remove("active");
      menuButtonClick.classList.remove("menu-active");
      event.preventDefault();
      const targetId = link.getAttribute("href");
      scrollToTarget(targetId);
      setTimeout(resetScrollBehavior, 1000);
    });
  });
});
