document.addEventListener("DOMContentLoaded", function () {
  const preLoader = document.querySelector(".pre-loader");
  const mainGroup = document.querySelector(".main-group");
  const mainLoader = document.querySelector(".main-loader");
  const lineLoader = document.querySelector(".line-loader");
  const percentLoader = document.querySelector(".percent-loader");

  // Use the Performance API to track page load progress
  const totalResources = performance.getEntriesByType("resource").length;
  let loadedResources = 0;

  function updateLoader() {
    loadedResources++;

    // Calculate the percentage
    const percent = Math.min((loadedResources / totalResources) * 100, 100);

    mainLoader.style.width = percent + "%";
    percentLoader.textContent = percent.toFixed(0) + "%";

    if (percent < 100) {
      window.requestAnimationFrame(updateLoader);
    } else {
      setTimeout(function () {
        percentLoader.style.transform = "translateY(150%)";
        setTimeout(function () {
          percentLoader.style.opacity = 0;
          lineLoader.style.height = "0";
          setTimeout(function () {
            percentLoader.style.display = "none";
          }, 200);
        }, 300);
      }, 400);

      setTimeout(function () {
        lineLoader.style.backgroundColor = "#171717";
        mainGroup.style.height = "100vh";
        lineLoader.style.height = "100vh";
      }, 900);

      setTimeout(function () {
        preLoader.style.transition = "opacity 0.5s";
        preLoader.style.opacity = 0;
        setTimeout(function () {
          preLoader.style.display = "none";
        }, 1000);
      }, 1500);
    }
  }

  // Start the loader when the page is loaded
  window.addEventListener("load", function () {
    updateLoader();
  });
});
