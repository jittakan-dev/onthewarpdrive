// window.addEventListener("load", function () {
//   const preLoader = document.getElementById("pre-loader");
//   const loaderText = document.getElementById("loader-text");
//   const loaderBar = document.getElementById("loader-bar");

//   // Simulate loading with a timer (you can replace this with actual loading logic)
//   let percentage = 0;
//   const interval = setInterval(function () {
//     percentage += 1;
//     loaderText.textContent = `Loading... ${percentage}%`;
//     loaderBar.style.width = `${percentage}%`;

//     if (percentage >= 100) {
//       clearInterval(interval);
//       setTimeout(function () {
//         preLoader.style.display = "none";
//       }, 500); // Hide pre-loader after a delay (adjust as needed)
//     }
//   }, 50); // Adjust the interval as needed
// });
