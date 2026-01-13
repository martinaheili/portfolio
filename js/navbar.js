const bar = document.querySelector(".fixed-bar");

const initialWidth = "25vw";
const initialLeft = "25%";
const initialHeight = 40; // px REAL

const threshold = 20;
const sideMargin = 15;

function getExpandedHeight() {
  return window.innerHeight * 0.6; // 60vh
}

function updateBar() {
  const scrollTop = leftCol.scrollTop;
  const scrollEnd = leftCol.scrollHeight - leftCol.clientHeight;

  if (scrollTop >= scrollEnd - threshold) {
    gsap.to(bar, {
      width: `calc(100vw - ${sideMargin * 2}px)`,
      left: `${sideMargin}px`,
      height: getExpandedHeight(),
      duration: 0.6,
      ease: "power2.out"
    });
  } else {
    gsap.to(bar, {
      width: initialWidth,
      left: initialLeft,
      height: initialHeight,
      duration: 0.4,
      ease: "power2.out"
    });
  }
}

leftCol.addEventListener("scroll", updateBar);
window.addEventListener("resize", updateBar);