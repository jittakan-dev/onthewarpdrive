// preloader.js

window.addEventListener("load", function () {
  setTimeout(function () {
    // Hide the preloader when all page resources are loaded
    const header = document.querySelector("header");
    const main = document.querySelector("main");
    const preloader = document.querySelector("#preloader");
    header.style.display = "block";
    main.style.display = "block";
    preloader.style.display = "none";
  }, 2); // 2000 milliseconds (2 seconds)
});
