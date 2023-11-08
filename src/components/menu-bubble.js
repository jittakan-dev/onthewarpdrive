let isDragging = false;
let menuBubbleRect;
let menuButtonRect;
let viewportRect;

menuBubble.addEventListener("mousedown", startDrag);
menuBubble.addEventListener("touchstart", startDrag);

function startDrag(e) {
  e.preventDefault();

  isDragging = true;

  menuBubbleRect = menuBubble.getBoundingClientRect();
  menuButtonRect = menuButton.getBoundingClientRect();
  viewportRect = {
    top: 0,
    left: 0,
    right: window.innerWidth,
    bottom: window.innerHeight,
  };

  const offsetX = menuBubbleRect.width / 2;
  const offsetY = menuBubbleRect.height / 2;

  menuBubble.classList.add("grabbing");

  if (e.type === "mousedown") {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  } else if (e.type === "touchstart") {
    document.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    document.addEventListener("touchend", handleTouchEnd);
  }

  function handleMouseMove(e) {
    moveMenuBubble(e.clientX, e.clientY);
  }

  function handleTouchMove(e) {
    const touch = e.touches[0];
    moveMenuBubble(touch.clientX, touch.clientY);
  }

  function moveMenuBubble(clientX, clientY) {
    if (isDragging) {
      let newX = clientX - offsetX - menuButtonRect.width / 2;
      let newY = clientY - offsetY - menuButtonRect.height / 2;

      // Ensure the menuBubble stays within the viewport
      newX = Math.max(
        viewportRect.left,
        Math.min(viewportRect.right - menuBubbleRect.width * 1.77, newX)
      );
      newY = Math.max(
        viewportRect.top,
        Math.min(viewportRect.bottom - menuBubbleRect.height * 1.5, newY)
      );

      menuButton.style.left = `${newX}px`;
      menuButton.style.top = `${newY}px`;

      // Check if the menuBubble is within a section and update colors if needed
      sections.forEach((section) => {
        const sectionRect = section.getBoundingClientRect();
        if (
          clientX >= sectionRect.left &&
          clientX <= sectionRect.right &&
          clientY >= sectionRect.top &&
          clientY <= sectionRect.bottom
        ) {
          updateColors(section.id);
        }
      });
    }
  }

  function handleMouseUp() {
    endDrag();
  }

  function handleTouchEnd() {
    endDrag();
  }

  function endDrag() {
    isDragging = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
    menuBubble.classList.remove("grabbing");
  }
}

window.addEventListener("scroll", () => {
  const menuButtonRect = menuButton.getBoundingClientRect();
  sections.forEach((section) => {
    const sectionRect = section.getBoundingClientRect();
    if (
      sectionRect.top < menuButtonRect.bottom &&
      sectionRect.bottom > menuButtonRect.top
    ) {
      updateColors(section.id);
    }
  });
});

menuBubble.addEventListener("mouseup", () => {
  isDragging = false;
});

menuBubble.addEventListener("touchend", () => {
  isDragging = false;
});

menuBubble.addEventListener("mouseover", () => {
  const activeSection = getActiveSection();
  if (activeSection) {
    menuBubble.querySelector(".bubble-handle-button").style.backgroundColor =
      "#db460c";
  }
});

menuBubble.addEventListener("mouseout", () => {
  const activeSection = getActiveSection();
  if (activeSection) {
    updateColors(activeSection);
  }
});

function getActiveSection() {
  const menuButtonRect = menuButton.getBoundingClientRect();
  for (const section of sections) {
    const sectionRect = section.getBoundingClientRect();
    if (
      sectionRect.top < menuButtonRect.bottom &&
      sectionRect.bottom > menuButtonRect.top
    ) {
      return section.id;
    }
  }
  return null;
}

function updateColors(sectionId) {
  hiddenMenuLinks.forEach((link) => {
    link.classList.remove("bubbleLinkActive");
  });
  dotGroupLinks.forEach((link) => {
    link.classList.remove("navLinkActive");
  });
  if (sectionId === "home") {
    menuBubble.style.backgroundColor = "#EBEBEB";
    menuButtonClick.style.backgroundColor = "#EBEBEB";
    menuButton.style.backgroundColor = "#EBEBEB";
    menuBubbleClick.style.backgroundColor = "#212529";
    hiddenMenuLinks[0].classList.add("bubbleLinkActive");
    dotGroupLinks[0].classList.add("navLinkActive");
  } else if (sectionId === "work") {
    menuBubble.style.backgroundColor = "#02757b"; //01874b
    menuButtonClick.style.backgroundColor = "#02757b";
    menuButton.style.backgroundColor = "#02757b";
    menuBubbleClick.style.backgroundColor = "#bebebe";
    hiddenMenuLinks[1].classList.add("bubbleLinkActive");
    dotGroupLinks[1].classList.add("navLinkActive");
  } else if (sectionId === "about") {
    menuBubble.style.backgroundColor = "#02757b";
    menuButtonClick.style.backgroundColor = "#02757b";
    menuButton.style.backgroundColor = "#02757b";
    menuBubbleClick.style.backgroundColor = "#bebebe";
    hiddenMenuLinks[2].classList.add("bubbleLinkActive");
    dotGroupLinks[2].classList.add("navLinkActive");
  }
}
// dotGroupLinks.forEach((link) => {
//   link.style.backgroundColor = "#039fa8";
// });
// if (sectionId === "home") {
//   menuBubble.style.backgroundColor = "#EBEBEB";
//   menuButtonClick.style.backgroundColor = "#EBEBEB";
//   menuButton.style.backgroundColor = "#EBEBEB";
//   menuBubbleClick.style.backgroundColor = "#171717";
//   hiddenMenuLinks[0].classList.add("bubbleLinkActive"); // Add active class to HOME link
//   dotGroupLinks[0].style.backgroundColor = "#039fa8";
//   dotGroupLinks[1].style.backgroundColor = "#2e8b57";
//   dotGroupLinks[2].style.backgroundColor = "#2e8b57";
// } else if (sectionId === "work") {
//   menuBubble.style.backgroundColor = "#171717";
//   menuButtonClick.style.backgroundColor = "#171717";
//   menuButton.style.backgroundColor = "#171717";
//   menuBubbleClick.style.backgroundColor = "#EBEBEB";
//   hiddenMenuLinks[1].classList.add("bubbleLinkActive");
//   dotGroupLinks[1].style.backgroundColor = "#039fa8";
//   dotGroupLinks[2].style.backgroundColor = "#2e8b57";
//   dotGroupLinks[0].style.backgroundColor = "#2e8b57";
// } else if (sectionId === "about") {
//   menuBubble.style.backgroundColor = "#039fa8";
//   menuButtonClick.style.backgroundColor = "#039fa8";
//   menuButton.style.backgroundColor = "#039fa8";
//   menuBubbleClick.style.backgroundColor = "#bebebe";
//   hiddenMenuLinks[2].classList.add("bubbleLinkActive");
//   dotGroupLinks[2].style.backgroundColor = "#039fa8";
//   dotGroupLinks[1].style.backgroundColor = "#2e8b57";
//   dotGroupLinks[0].style.backgroundColor = "#2e8b57";
// }
