//----------------------------//
const workTypes = document.querySelectorAll(".work-menu-types div");
workTypes.forEach((item) => {
  item.addEventListener("click", () => {
    workTypes.forEach((item) => item.classList.remove("active"));
    item.classList.add("active");
  });
});
//----------------------------//
const workListScrollable = document.querySelector(".work-list-container");
const workMenuContainer = document.querySelector(".work-menu-container");
const workListItems = document.querySelectorAll(".work-list-item");
const firstWorkListItem = workListItems[0];
const lastWorkListItem = workListItems[workListItems.length - 1];

let touchStartY = null;

workListScrollable.addEventListener("wheel", (event) => {
  const scrollTop = workListScrollable.scrollTop;
  const scrollHeight = workListScrollable.scrollHeight;
  const clientHeight = workListScrollable.clientHeight;

  const firstItemTop = firstWorkListItem.offsetTop;
  const lastItemBottom =
    lastWorkListItem.offsetTop + lastWorkListItem.clientHeight;

  if (scrollTop === 0 && event.deltaY < 0) {
    workListScrollable.removeEventListener("wheel", preventDefaultScroll);
  } else if (scrollTop + clientHeight >= scrollHeight - 1 && event.deltaY > 0) {
    workListScrollable.removeEventListener("wheel", preventDefaultScroll);
  } else {
    event.preventDefault();
    workListScrollable.scrollBy({
      top: event.deltaY < 0 ? -30 : 30,
    });
  }
});

function preventDefaultScroll(event) {
  event.preventDefault();
}

// Detect touchstart for mobile/touchpad
workListScrollable.addEventListener("touchstart", (event) => {
  touchStartY = event.touches[0].clientY;
});

// Detect touchmove for mobile/touchpad
workListScrollable.addEventListener("touchmove", (event) => {
  if (touchStartY === null) {
    return;
  }

  const touchMoveY = event.touches[0].clientY;
  const deltaY = touchMoveY - touchStartY;

  const scrollTop = workListScrollable.scrollTop;
  const scrollHeight = workListScrollable.scrollHeight;
  const clientHeight = workListScrollable.clientHeight;

  const firstItemTop = firstWorkListItem.offsetTop;
  const lastItemBottom =
    lastWorkListItem.offsetTop + lastWorkListItem.clientHeight;

  if (scrollTop === 0 && deltaY < 0) {
    workListScrollable.removeEventListener("touchmove", preventDefaultScroll);
  } else if (scrollTop + clientHeight >= scrollHeight - 1 && deltaY > 0) {
    workListScrollable.removeEventListener("touchmove", preventDefaultScroll);
  } else {
    event.preventDefault();
    workListScrollable.scrollBy({
      top: deltaY < 0 ? -30 : 30,
    });
  }

  touchStartY = null;
});

// Give focus to the parent container when scrolling is allowed
workListScrollable.addEventListener("scroll", () => {
  const scrollTop = workListScrollable.scrollTop;
  if (
    scrollTop === 0 ||
    scrollTop + workListScrollable.clientHeight >=
      workListScrollable.scrollHeight
  ) {
    workMenuContainer.focus();
  }
});
