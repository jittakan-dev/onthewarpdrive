// export function neonAnimate(elements, animationClass, stop = false) {
//   if (stop) {
//     stopAnimation = true;
//     return;
//   }
//   elements.forEach((element) => {
//     const randomDelay = Math.random() * 3 + 1;
//     setTimeout(() => {
//       if (stopAnimation) return;
//       element.classList.toggle(animationClass);
//       neonAnimate(elements, animationClass);
//     }, randomDelay * 500);
//   });
// }
