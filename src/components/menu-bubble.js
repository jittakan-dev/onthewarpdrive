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
  const colors = {
    home: { bubble: "#EBEBEB", click: "#212529" },
    work: { bubble: "#02757b", click: "#bebebe" },
    about: { bubble: "#02757b", click: "#bebebe" },
  };
  hiddenMenuLinks.forEach((link) => link.classList.remove("bubbleLinkActive"));
  dotGroupLinks.forEach((link) => link.classList.remove("navLinkActive"));
  const { bubble, click } = colors[sectionId] || colors.home;
  menuBubble.style.backgroundColor = bubble;
  menuButtonClick.style.backgroundColor = bubble;
  menuButton.style.backgroundColor = bubble;
  menuBubbleClick.style.backgroundColor = click;
  const index = Math.max(0, ["home", "work", "about"].indexOf(sectionId));
  hiddenMenuLinks[index].classList.add("bubbleLinkActive");
  dotGroupLinks[index].classList.add("navLinkActive");
}
