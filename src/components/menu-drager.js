// menu-drager.js

const menuDrager = document.querySelector(".menu-drager");
const menuDragerClick = menuDrager.querySelector(".menu-drager-click");
const menuButton = document.querySelector(".menu-button");
const menuButtonClick = document.querySelector(".menu-button-click");
const sections = document.querySelectorAll("section");

let isDragging = false;

menuDrager.addEventListener("mousedown", startDrag);
menuDrager.addEventListener("touchstart", startDrag);

function startDrag(e) {
  e.preventDefault(); // Prevent default touch behavior

  isDragging = true;

  const menuDragerRect = menuDrager.getBoundingClientRect();
  const menuButtonRect = menuButton.getBoundingClientRect();

  const offsetX = menuDragerRect.width / 2;
  const offsetY = menuDragerRect.height / 2;

  menuDrager.classList.add("grabbing");

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
    movemenuDrager(e.clientX, e.clientY);
  }

  function handleTouchMove(e) {
    const touch = e.touches[0];
    movemenuDrager(touch.clientX, touch.clientY);
  }

  function movemenuDrager(clientX, clientY) {
    if (isDragging) {
      const newX = clientX - offsetX - menuButtonRect.width / 2;
      const newY = clientY - offsetY - menuButtonRect.height / 2;

      menuButton.style.left = `${newX}px`;
      menuButton.style.top = `${newY}px`;

      // Check which section the menu button is currently in
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
    menuDrager.classList.remove("grabbing");
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

menuDrager.addEventListener("mouseup", () => {
  isDragging = false;
});

menuDrager.addEventListener("touchend", () => {
  isDragging = false;
});

menuDrager.addEventListener("mouseover", () => {
  const activeSection = getActiveSection();
  if (activeSection) {
    menuDrager.querySelector(".menu-drager-click").style.backgroundColor =
      "#db460c";
  }
});

menuDrager.addEventListener("mouseout", () => {
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
  if (sectionId === "home") {
    menuDrager.style.backgroundColor = "#EBEBEB";
    menuButtonClick.style.backgroundColor = "#EBEBEB";
    menuButton.style.backgroundColor = "#EBEBEB";
    menuDragerClick.style.backgroundColor = "#171717";
  } else if (sectionId === "work") {
    menuDrager.style.backgroundColor = "#171717";
    menuButtonClick.style.backgroundColor = "#171717";
    menuButton.style.backgroundColor = "#171717";
    menuDragerClick.style.backgroundColor = "#EBEBEB";
  } else if (sectionId === "about") {
    menuDrager.style.backgroundColor = "#313232";
    menuButtonClick.style.backgroundColor = "#313232";
    menuButton.style.backgroundColor = "#313232";
    menuDragerClick.style.backgroundColor = "#bebebe";
  }
}
