document.addEventListener("readystatechange", (event) => {
  const preLoader = document.querySelector(".pre-loader");
  const mainGroup = document.querySelector(".main-group");
  const mainLoader = document.querySelector(".main-loader");
  const lineLoader = document.querySelector(".line-loader");
  const percentLoader = document.querySelector(".percent-loader");
  const navHeader = document.getElementById("nav-header");
  const mainBody = document.getElementById("main-body");

  let percent = 0;

  function updateLoader() {
    mainLoader.style.width = percent + "%";
    percentLoader.textContent = percent + "%";

    if (percent < 100) {
      percent++;
      window.webkitRequestAnimationFrame(updateLoader);
      if (percent <= 30 || event.target.readyState === "loading") {
        percentLoader.style.color = "#06686d";
      } else if (
        (percent > 30 && percent <= 60) ||
        event.target.readyState === "loading"
      ) {
        percentLoader.style.color = "#d5321f";
      } else if (event.target.readyState === "interactive") {
        percentLoader.style.color = "#d5321f";
      }
    } else if (percent === 100 && event.target.readyState !== "complete") {
      percentLoader.style.color = "black";
      percentLoader.textContent = "xxx";
    } else if (percent === 100 && event.target.readyState === "complete") {
      percentLoader.style.color = "black";
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
        navHeader.style.display = "block";
        mainBody.style.display = "block";
        setTimeout(function () {
          preLoader.style.display = "none";
        }, 1000);
      }, 1500);
    }
  }

  setTimeout(updateLoader, 0);
});
