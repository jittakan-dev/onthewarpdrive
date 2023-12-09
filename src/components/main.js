// const sections = document.querySelectorAll(".content-section");

// let scrolling = false;
// let startY;

// window.addEventListener("wheel", handleScroll, { passive: true });
// window.addEventListener("touchstart", onTouchStart, { passive: true });
// window.addEventListener("touchmove", onTouchMove, { passive: true });

// function handleScroll(e) {
//   if (scrolling) return;
//   const scrollDirection = e.deltaY > 0 ? 1 : -1;
//   scroll(scrollDirection);
// }

// function onTouchStart(e) {
//   if (scrolling) return;
//   startY = e.touches[0].clientY;
// }

// function onTouchMove(e) {
//   if (scrolling) return;
//   const deltaY = (e.touches[0].clientY - startY) * 0.1;
//   const scrollDirection = deltaY > 0 ? 1 : -1;
//   scroll(scrollDirection);
// }

// function scroll(scrollDirection) {
//   let nearestSectionIndex = -1;
//   let minDistance = Number.MAX_VALUE;

//   sections.forEach((section, index) => {
//     const rect = section.getBoundingClientRect();
//     const distance = Math.abs(rect.top);

//     if (scrollDirection === 1 && rect.top > 0 && distance < minDistance) {
//       nearestSectionIndex = index;
//       minDistance = distance;
//     } else if (
//       scrollDirection === -1 &&
//       rect.top < 0 &&
//       distance < minDistance
//     ) {
//       nearestSectionIndex = index;
//       minDistance = distance;
//     }
//   });

//   if (nearestSectionIndex !== -1) {
//     const targetSection = sections[nearestSectionIndex];
//     const targetOffset =
//       targetSection.getBoundingClientRect().top + window.scrollY;

//     const duration = 300;
//     const start = window.scrollY;
//     const startTime = performance.now();

//     scrolling = true;

//     function scrollAnimation() {
//       const now = performance.now();
//       const elapsed = now - startTime;
//       const progress = Math.min(1, elapsed / duration);

//       window.scrollTo(0, start + progress * (targetOffset - start));

//       if (progress < 1) {
//         requestAnimationFrame(scrollAnimation);
//       } else {
//         scrolling = false;
//       }
//     }

//     requestAnimationFrame(scrollAnimation);
//   }
// }
/*--------------------*/
const sections = document.querySelectorAll(".content-section");

// function setViewportSize(element) {
//   const viewportWidth =
//     window.innerWidth || document.documentElement.clientWidth;
//   const viewportHeight =
//     window.innerHeight || document.documentElement.clientHeight;

//   element.style.width = viewportWidth + "px";
//   element.style.height = viewportHeight + "px";
// }

// sections.forEach((section) => {
//   setViewportSize(section);

//   window.addEventListener("resize", () => {
//     setViewportSize(section);
//   });
// });

let scrolling = false;

window.addEventListener(
  "wheel",
  function (e) {
    if (scrolling) return;
    const scrollDirection = e.deltaY > 0 ? 1 : -1;
    let nearestSectionIndex = -1;
    let minDistance = Number.MAX_VALUE;
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const distance = Math.abs(rect.top);

      if (scrollDirection === 1 && rect.top > 0 && distance < minDistance) {
        nearestSectionIndex = index;
        minDistance = distance;
      } else if (
        scrollDirection === -1 &&
        rect.top < 0 &&
        distance < minDistance
      ) {
        nearestSectionIndex = index;
        minDistance = distance;
      }
    });

    if (nearestSectionIndex !== -1) {
      const targetSection = sections[nearestSectionIndex];
      const targetOffset =
        targetSection.getBoundingClientRect().top + window.scrollY;

      const duration = 300;
      const start = window.scrollY;
      const startTime = performance.now();

      scrolling = true;

      function scroll() {
        const now = performance.now();
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);

        window.scrollTo(0, start + progress * (targetOffset - start));

        if (progress < 1) {
          requestAnimationFrame(scroll);
        } else {
          scrolling = false;
        }
      }
      requestAnimationFrame(scroll);
    }
  },
  { passive: true }
);

// let scrolling = false;
// let startY;

// window.addEventListener("wheel", handleScroll, { passive: true });
// window.addEventListener("touchstart", onTouchStart, { passive: true });
// window.addEventListener("touchmove", onTouchMove, { passive: true });

// function handleScroll(e) {
//   if (scrolling) return;
//   const scrollDirection = e.deltaY > 0 ? 1 : -1;
//   scroll(scrollDirection);
// }

// function onTouchStart(e) {
//   if (scrolling) return;
//   startY = e.touches[0].clientY;
// }

// function onTouchMove(e) {
//   if (scrolling) return;
//   const deltaY = (e.touches[0].clientY - startY) * 0.1;
//   const scrollDirection = deltaY > 0 ? 1 : -1;
//   scroll(scrollDirection);
// }

// function scroll(scrollDirection) {
//   let nearestSectionIndex = -1;
//   let minDistance = Number.MAX_VALUE;

//   sections.forEach((section, index) => {
//     const rect = section.getBoundingClientRect();
//     const distance = Math.abs(rect.top);

//     if (scrollDirection === 1 && rect.top > 0 && distance < minDistance) {
//       nearestSectionIndex = index;
//       minDistance = distance;
//     } else if (
//       scrollDirection === -1 &&
//       rect.top < 0 &&
//       distance < minDistance
//     ) {
//       nearestSectionIndex = index;
//       minDistance = distance;
//     }
//   });

//   if (nearestSectionIndex !== -1) {
//     const targetSection = sections[nearestSectionIndex];
//     const targetOffset =
//       targetSection.getBoundingClientRect().top + window.scrollY;

//     const duration = 300;
//     const start = window.scrollY;
//     const startTime = performance.now();

//     scrolling = true;

//     function scrollAnimation() {
//       const now = performance.now();
//       const elapsed = now - startTime;
//       const progress = Math.min(1, elapsed / duration);

//       window.scrollTo(0, start + progress * (targetOffset - start));

//       if (progress < 1) {
//         requestAnimationFrame(scrollAnimation);
//       } else {
//         scrolling = false;
//       }
//     }

//     requestAnimationFrame(scrollAnimation);
//   }
// }
