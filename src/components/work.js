const workTypes = document.querySelectorAll(".work-menu-types div");
const appList = document.querySelector(".work-list-container .app-list");
const workListItem = document.querySelector(".app-list-item");
const AppLeftArrow = document.getElementById("AppLeftArrow");
const AppRightArrow = document.getElementById("AppRightArrow");

let isSectionDragging = false;
let startX;
let scrollLeft;
let momentumScrollTimeout;

const snapToItem = () => {
  const itemWidth = appList.clientWidth;
  const nearestItem = Math.round(appList.scrollLeft / itemWidth) * itemWidth;
  appList.scrollTo({
    left: nearestItem,
    behavior: "smooth",
  });
};

appList.addEventListener("mousedown", (e) => {
  isSectionDragging = true;
  startX = e.pageX - appList.offsetLeft;
  scrollLeft = appList.scrollLeft;
  appList.classList.add("grabbing");
});

appList.addEventListener("mouseleave", () => {
  if (isSectionDragging) {
    snapToItem();
    appList.classList.remove("grabbing");
    isSectionDragging = false;
  }
});

appList.addEventListener("mouseup", () => {
  if (isSectionDragging) {
    snapToItem();
    appList.classList.remove("grabbing");
    isSectionDragging = false;
  }
});

appList.addEventListener("mousemove", (e) => {
  if (!isSectionDragging) return;
  e.preventDefault();
  const x = e.pageX - appList.offsetLeft;
  const walk = x - startX;
  appList.scrollLeft = scrollLeft - walk;
});

/*------------------*/
appList.addEventListener("scroll", () => {
  const firstChild = workListItem.firstElementChild;
  if (firstChild && appList.scrollLeft <= firstChild.clientWidth) {
    AppLeftArrow.classList.remove("moreWork");
    AppLeftArrow.classList.add("noMoreWork");
  } else {
    AppLeftArrow.classList.remove("noMoreWork");
    AppLeftArrow.classList.add("moreWork");
  }

  const lastChild = workListItem.lastElementChild;
  if (
    lastChild &&
    appList.scrollLeft >=
      appList.scrollWidth - appList.clientWidth - lastChild.clientWidth
  ) {
    AppRightArrow.classList.remove("moreWork");
    AppRightArrow.classList.add("noMoreWork");
  } else {
    AppRightArrow.classList.remove("noMoreWork");
    AppRightArrow.classList.add("moreWork");
  }
});

AppLeftArrow.addEventListener("click", () => {
  const itemWidth = workListItem.offsetWidth;
  const currentScrollLeft = appList.scrollLeft;

  const newScrollLeft = Math.max(currentScrollLeft - itemWidth, 0);

  appList.scrollTo({
    left: newScrollLeft,
    behavior: "smooth",
  });
  updateCurrentWork();
});

AppRightArrow.addEventListener("click", () => {
  const itemWidth = workListItem.offsetWidth;
  const currentScrollLeft = appList.scrollLeft;

  const newScrollLeft = Math.min(
    currentScrollLeft + itemWidth,
    appList.scrollWidth - appList.clientWidth
  );

  appList.scrollTo({
    left: newScrollLeft,
    behavior: "smooth",
  });
  updateCurrentWork();
});

function updateCurrentWork() {
  const itemWidth = appList.clientWidth;
  const currentScrollLeft = appList.scrollLeft;
  let currentWork = Math.ceil(currentScrollLeft / itemWidth) + 1;
  const currentWorkSpan = document.querySelector(".current-work");
  const workListItems = document.querySelectorAll(".app-list-item");
  const totalWork = workListItems.length;

  if (isNaN(currentWork) || currentWork <= 0) {
    currentWork = 1;
  }

  if (currentWork > totalWork) {
    currentWork = totalWork;
  }

  currentWorkSpan.textContent = currentWork;
}

appList.addEventListener("scroll", updateCurrentWork);
updateCurrentWork();

const totalWorkSpan = document.querySelector(".total-work");
function updateTotalWork() {
  const workListItems = document.querySelectorAll(".app-list-item");
  const totalWork = workListItems.length;
  totalWorkSpan.textContent = totalWork;
}
updateTotalWork();

function changeTab(tabIndex) {
  const tabs = document.querySelectorAll(".work-menu-types div");
  const tabContents = document.querySelectorAll(".work-list-container > div");

  tabs.forEach((tab, index) => {
    if (index + 1 === tabIndex) {
      tab.classList.add("workTypeActive");
      tabContents[index].style.display = "flex";
    } else {
      tab.classList.remove("workTypeActive");
      tabContents[index].style.display = "none";
    }
  });
}
