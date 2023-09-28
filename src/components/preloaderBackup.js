document.addEventListener("DOMContentLoaded", function () {
  const preLoader = document.querySelector(".pre-loader");
  const mainGroup = document.querySelector(".main-group");
  const mainLoader = document.querySelector(".main-loader");
  const lineLoader = document.querySelector(".line-loader");
  const percentLoader = document.querySelector(".percent-loader");

  let assetsToLoad = 0;
  let assetsLoaded = 0;

  // Function to update the loader progress
  function updateLoader() {
    assetsLoaded++;
    const percent = (assetsLoaded / assetsToLoad) * 100;
    mainLoader.style.width = percent + "%";
    percentLoader.textContent = Math.round(percent) + "%";
    console.log(percent + "--" + assetsToLoad + "--" + assetsLoaded);

    if (percent >= 100) {
      setTimeout(() => {
        percentLoader.style.transform = "translateY(150%)";
        setTimeout(() => {
          percentLoader.style.opacity = 0;
          lineLoader.style.height = "0";
          setTimeout(() => {
            percentLoader.style.display = "none";
          }, 200);
        }, 300);
      }, 400);

      setTimeout(() => {
        lineLoader.style.backgroundColor = "#171717";
        mainGroup.style.height = "100vh";
        lineLoader.style.height = "100vh";

        // Add a delay before starting element transitions
        setTimeout(() => {
          // Select elements that you want to animate
          const elementsToAnimate = document.querySelectorAll(
            ".element-to-animate"
          );

          // Apply the desired transitions
          elementsToAnimate.forEach((element) => {
            element.style.opacity = 1;
            element.style.transform = "translateY(0)";
          });
        }, 1000); // Adjust the delay time as needed
      }, 900);

      setTimeout(() => {
        preLoader.style.transition = "opacity 0.5s";
        preLoader.style.opacity = 0;
        setTimeout(() => {
          preLoader.style.display = "none";
        }, 1000);
      }, 1500);
    }
  }

  // Function to load assets
  function loadAsset(url, type) {
    const asset = new Image();
    asset.src = url;

    asset.onload = () => {
      updateLoader();
    };

    asset.onerror = () => {
      updateLoader();
    };
  }

  // List of assets to load
  const assets = [
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css",
    "styles/preload.css",
    "styles/menu.css",
    "styles/home.css",
    "styles/work.css",
    "styles/about.css",
  ];

  assetsToLoad = assets.length;
  console.log(assetsToLoad + "XX");
  // Load each asset
  assets.forEach((asset) => {
    loadAsset(asset);
  });
});
