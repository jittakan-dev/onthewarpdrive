const workTypes = document.querySelectorAll(".work-menu-types div");
const workListContainer = document.querySelector(".work-list");
const workListItem = document.querySelector(".work-list-item");
const workLeftArrow = document.getElementById("WorkLeftArrow");
const workRightArrow = document.getElementById("WorkRightArrow");

workTypes.forEach((item) => {
  item.addEventListener("click", () => {
    workTypes.forEach((item) => item.classList.remove("active"));
    item.classList.add("active");
  });
});

let isSectionDragging = false;
let startX;
let scrollLeft;
let momentumScrollTimeout;

const snapToItem = () => {
  const itemWidth = workListContainer.clientWidth / 2;

  const nearestItem =
    Math.round(workListContainer.scrollLeft / itemWidth) * itemWidth;

  workListContainer.scrollTo({
    left: nearestItem,
    behavior: "smooth",
  });
};

workListContainer.addEventListener("mousedown", (e) => {
  isSectionDragging = true;
  startX = e.pageX - workListContainer.offsetLeft;
  scrollLeft = workListContainer.scrollLeft;
  workListContainer.classList.add("grabbing");
});

workListContainer.addEventListener("mouseleave", () => {
  if (isSectionDragging) {
    snapToItem();
    workListContainer.classList.remove("grabbing");
    isSectionDragging = false;
  }
});

workListContainer.addEventListener("mouseup", () => {
  if (isSectionDragging) {
    snapToItem();
    workListContainer.classList.remove("grabbing");
    isSectionDragging = false;
  }
});

workListContainer.addEventListener("mousemove", (e) => {
  if (!isSectionDragging) return;
  e.preventDefault();
  const x = e.pageX - workListContainer.offsetLeft;
  const walk = x - startX;
  workListContainer.scrollLeft = scrollLeft - walk;
});

// workListContainer.addEventListener("touchstart", (e) => {
//   isSectionDragging = true;
//   startX = e.touches[0].pageX - workListContainer.offsetLeft;
//   scrollLeft = workListContainer.scrollLeft;
//   workListContainer.classList.add("grabbing");
// });

// workListContainer.addEventListener("touchmove", (e) => {
//   if (!isSectionDragging) return;
//   e.preventDefault();
//   const x = e.touches[0].pageX - workListContainer.offsetLeft;
//   const walk = x - startX;
//   workListContainer.scrollLeft = scrollLeft - walk;
// });

// workListContainer.addEventListener("touchend", () => {
//   if (isSectionDragging) {
//     snapToItem();
//     workListContainer.classList.remove("grabbing");
//     isSectionDragging = false;
//   }
// });
workLeftArrow.addEventListener("click", () => {
  const itemWidth = workListItem.offsetWidth;
  const currentScrollLeft = workListContainer.scrollLeft;

  const newScrollLeft = Math.max(currentScrollLeft - itemWidth, 0);

  workListContainer.scrollTo({
    left: newScrollLeft,
    behavior: "smooth",
  });
});

workRightArrow.addEventListener("click", () => {
  const itemWidth = workListItem.offsetWidth;
  const currentScrollLeft = workListContainer.scrollLeft;

  const newScrollLeft = Math.min(
    currentScrollLeft + itemWidth,
    workListContainer.scrollWidth - workListContainer.clientWidth
  );

  workListContainer.scrollTo({
    left: newScrollLeft,
    behavior: "smooth",
  });
});
