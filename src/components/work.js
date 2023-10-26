const workTypes = document.querySelectorAll(".work-menu-types div");
const appList = document.querySelector(".work-list-container .app-list");
const appListItem = document.querySelector(".app-list-item");
const appListItems = document.querySelectorAll(".app-list-item");
const AppLeftArrow = document.getElementById("AppLeftArrow");
const AppRightArrow = document.getElementById("AppRightArrow");
const totalWorkSpan = document.querySelector(".total-app");
const currentWorkSpan = document.querySelector(".current-app");
/*----------------------------------CHANGE TAB------------------------------------*/
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
/*----------------------------------CHANGE TAB------------------------------------*/
/*----------------------------------DRAG SCROLL------------------------------------*/
let isSectionDragging = false;
let startX;

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
});

appList.addEventListener("mouseleave", () => {
  if (isSectionDragging) {
    snapToItem();
    isSectionDragging = false;
  }
});

appList.addEventListener("mouseup", () => {
  if (isSectionDragging) {
    snapToItem();
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
/*----------------------------------DRAG SCROLL------------------------------------*/
/*----------------------------------MAIN SCROLL------------------------------------*/
appList.addEventListener("scroll", () => {
  const currentWork = updateCurrentWork();
  const totalWork = updateTotalWork();

  AppLeftArrow.classList.remove("moreWork", "noMoreWork");
  AppRightArrow.classList.remove("moreWork", "noMoreWork");

  if (currentWork === 1) {
    AppLeftArrow.classList.add("noMoreWork");
    AppRightArrow.classList.add("moreWork");
  } else if (currentWork > 1 && currentWork < totalWork) {
    AppLeftArrow.classList.add("moreWork");
    AppRightArrow.classList.add("moreWork");
  } else if (currentWork === totalWork) {
    AppLeftArrow.classList.add("moreWork");
    AppRightArrow.classList.add("noMoreWork");
  }
});
/*----------------------------------MAIN SCROLL------------------------------------*/
/*----------------------------------CLICK SCROLL------------------------------------*/
AppLeftArrow.addEventListener("click", () => {
  const itemWidth = appListItem.offsetWidth;
  const currentScrollLeft = appList.scrollLeft;
  const newScrollLeft = Math.max(currentScrollLeft - itemWidth, 0);
  appList.scrollTo({
    left: newScrollLeft,
    behavior: "smooth",
  });
});
AppRightArrow.addEventListener("click", () => {
  const itemWidth = appListItem.offsetWidth;
  const currentScrollLeft = appList.scrollLeft;
  const newScrollLeft = Math.min(
    currentScrollLeft + itemWidth,
    appList.scrollWidth - appList.clientWidth
  );
  appList.scrollTo({
    left: newScrollLeft,
    behavior: "smooth",
  });
});
/*----------------------------------CLICK SCROLL------------------------------------*/
/*----------------------------------CURRENT WORK n UPDATE WORK------------------------------------*/
function updateCurrentWork() {
  const itemWidth = appList.clientWidth;
  const currentScrollLeft = appList.scrollLeft;
  let currentWork = Math.ceil(currentScrollLeft / itemWidth) + 1;
  const totalWork = appListItems.length;
  if (isNaN(currentWork) || currentWork <= 0) {
    currentWork = 1;
  }
  if (currentWork > totalWork) {
    currentWork = totalWork;
  }
  currentWorkSpan.textContent = currentWork;
  return currentWork;
}
function updateTotalWork() {
  const totalWork = appListItems.length;
  totalWorkSpan.textContent = totalWork;
  return totalWork;
}
updateTotalWork();
/*----------------------------------CURRENT WORK n UPDATE WORK------------------------------------*/
