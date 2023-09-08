// menu.js

document.addEventListener("DOMContentLoaded", function () {
  const menuButtonClick = document.querySelector("#menu-button-click");
  const navMenu = document.getElementById("menu-section");
  const navLinks = navMenu.querySelectorAll("nav a");

  menuButtonClick.addEventListener("click", function () {
    this.classList.toggle("menu-active");
    navMenu.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navMenu.classList.remove("active");
      menuButtonClick.classList.remove("menu-active");
    });
  });
});
