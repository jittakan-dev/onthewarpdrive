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
  const itemWidth = workListContainer.clientWidth;

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

/*------------------*/
workListContainer.addEventListener("scroll", () => {
  const firstChild = workListItem.firstElementChild;
  if (firstChild && workListContainer.scrollLeft <= firstChild.clientWidth) {
    workLeftArrow.classList.remove("moreWork");
    workLeftArrow.classList.add("noMoreWork");
  } else {
    workLeftArrow.classList.remove("noMoreWork");
    workLeftArrow.classList.add("moreWork");
  }

  const lastChild = workListItem.lastElementChild;
  if (
    lastChild &&
    workListContainer.scrollLeft >=
      workListContainer.scrollWidth -
        workListContainer.clientWidth -
        lastChild.clientWidth
  ) {
    workRightArrow.classList.remove("moreWork");
    workRightArrow.classList.add("noMoreWork");
  } else {
    workRightArrow.classList.remove("noMoreWork");
    workRightArrow.classList.add("moreWork");
  }
});

workLeftArrow.addEventListener("click", () => {
  const itemWidth = workListItem.offsetWidth;
  const currentScrollLeft = workListContainer.scrollLeft;

  const newScrollLeft = Math.max(currentScrollLeft - itemWidth, 0);

  workListContainer.scrollTo({
    left: newScrollLeft,
    behavior: "smooth",
  });
  updateCurrentWork();
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
  updateCurrentWork();
});

function updateCurrentWork() {
  const itemWidth = workListContainer.clientWidth;
  const currentScrollLeft = workListContainer.scrollLeft;
  const currentWork = Math.ceil(currentScrollLeft / itemWidth) + 1; // Add 1 to convert from 0-based index to 1-based index
  const currentWorkSpan = document.querySelector(".current-work");
  const workListItems = document.querySelectorAll(".work-list-item");
  const totalWork = workListItems.length;
  if (currentWork > totalWork) {
    currentWork = totalWork;
  } else {
    currentWorkSpan.textContent = currentWork;
  }
}

workListContainer.addEventListener("scroll", updateCurrentWork);
updateCurrentWork();

const totalWorkSpan = document.querySelector(".total-work");
function updateTotalWork() {
  const workListItems = document.querySelectorAll(".work-list-item");
  const totalWork = workListItems.length;
  totalWorkSpan.textContent = totalWork;
}
updateTotalWork();
