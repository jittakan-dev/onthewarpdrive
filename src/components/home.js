// JavaScript code for pushing and popping divs
const stack = document.querySelectorAll(".stacked-div");
const scrollContainer = document.querySelector(".whale-scrollbar");
const scrollbarHandle = document.querySelector(".whale-scrollbar-handle");

function updateScrollbar() {
  const numPushedDivs = document.querySelectorAll(".stacked-div.pushed").length;
  const totalDivs = stack.length + numPushedDivs;
  const scrollPercentage = (numPushedDivs / totalDivs) * 100;
  scrollbarHandle.style.left = scrollPercentage + "%";
}

scrollbarHandle.addEventListener("mousedown", (e) => {
  e.preventDefault();

  const startX = e.clientX;
  const handleLeft = scrollbarHandle.offsetLeft;

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);

  function onMouseMove(e) {
    const dx = e.clientX - startX;
    const newLeft = Math.min(
      Math.max(handleLeft + dx, 0),
      scrollContainer.clientWidth - scrollbarHandle.clientWidth
    );
    scrollbarHandle.style.left = newLeft + "px";

    // Update the stack based on the scrollbar position
    const scrollPercentage =
      (newLeft / (scrollContainer.clientWidth - scrollbarHandle.clientWidth)) *
      100;
    const numDivsToShow = Math.ceil(
      (scrollPercentage / 100) * (stack.length + 1)
    ); // Plus one for the initially pushed div (div1)
    stack.forEach((div, index) => {
      if (index < numDivsToShow - 1) {
        div.style.left = "0";
        div.classList.add("pushed");
      } else {
        div.style.left = "-100%";
        div.classList.remove("pushed");
      }
    });
  }

  function onMouseUp() {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }
});
