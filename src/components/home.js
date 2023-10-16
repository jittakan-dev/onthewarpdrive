const stack = document.querySelectorAll(".stacked-div");
const scrollContainer = document.querySelector(".whale-scrollbar");
const scrollbarHandle = document.querySelector(".whale-scrollbar-handle");

let isWhaleDragging = false;

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

    const scrollPercentage =
      (newLeft / (scrollContainer.clientWidth - scrollbarHandle.clientWidth)) *
      100;
    const numDivsToShow = Math.ceil(
      (scrollPercentage / 100) * (stack.length + 1)
    );
    stack.forEach((div, index) => {
      if (index < numDivsToShow - 1) {
        div.style.left = "0";
      } else {
        div.style.left = "-100%";
      }
    });
  }

  function onMouseUp() {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }
});

scrollbarHandle.addEventListener("touchstart", (e) => {
  e.preventDefault();
  isWhaleDragging = true;

  const startX = e.touches[0].clientX;
  const handleLeft = scrollbarHandle.offsetLeft;

  document.addEventListener("touchmove", onTouchMove);
  document.addEventListener("touchend", onTouchEnd);

  function onTouchMove(e) {
    if (!isWhaleDragging) return;
    const dx = e.touches[0].clientX - startX;
    const newLeft = Math.min(
      Math.max(handleLeft + dx, 0),
      scrollContainer.clientWidth - scrollbarHandle.clientWidth
    );
    scrollbarHandle.style.left = newLeft + "px";

    const scrollPercentage =
      (newLeft / (scrollContainer.clientWidth - scrollbarHandle.clientWidth)) *
      100;
    const numDivsToShow = Math.ceil(
      (scrollPercentage / 100) * (stack.length + 1)
    );
    stack.forEach((div, index) => {
      if (index < numDivsToShow - 1) {
        div.style.left = "0";
      } else {
        div.style.left = "-100%";
      }
    });
  }

  function onTouchEnd() {
    isWhaleDragging = false;
    document.removeEventListener("touchmove", onTouchMove);
    document.removeEventListener("touchend", onTouchEnd);
  }
});

// Prevent scrolling and zooming while touching the scrollbar
scrollbarHandle.addEventListener("touchstart", (e) => {
  e.preventDefault();
});

// Prevent touchmove events from triggering scroll behavior on the page
scrollContainer.addEventListener("touchmove", (e) => {
  e.preventDefault();
});
