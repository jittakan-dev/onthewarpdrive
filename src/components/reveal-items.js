// reveal-items.js

const revealItems = document.querySelectorAll(".reveal-item");
let lastScrollPos = window.scrollY;

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2
  );
}

function revealElement(index) {
  if (index < revealItems.length) {
    revealItems[index].style.opacity = 1;
    revealItems[index].style.transform = "translateY(0)";
  }
}

function handleScroll() {
  const currentScrollPos = window.scrollY;
  const scrollDirection = currentScrollPos > lastScrollPos ? "down" : "up";

  for (let i = 0; i < revealItems.length; i++) {
    if (isElementInViewport(revealItems[i])) {
      if (scrollDirection === "down") {
        revealElement(i);
      } else {
        revealItems[i].style.opacity = 0;
        revealItems[i].style.transform = "translateY(30px)";
      }
    }
  }

  lastScrollPos = currentScrollPos;
}
window.addEventListener("scroll", handleScroll);
