const bar = document.querySelector(".fixed-bar");
const cta = document.querySelector(".footer-cta");
const icons = document.querySelector(".social-icons");
const logoLink = document.querySelector(".nav-links a");

const initialWidth = "25vw";
const initialLeft = "25%";
const initialHeight = 40;

const threshold = 20;
const sideMargin = 15;

let expanded = false;

function getExpandedHeight() {
  return window.innerHeight * 0.5;
}

function updateBar() {
  const scrollTop = leftCol.scrollTop;
  const scrollEnd = leftCol.scrollHeight - leftCol.clientHeight;
  const colRect = leftCol.getBoundingClientRect();

  if (scrollTop >= scrollEnd - threshold) {
    if (!expanded) {
      expanded = true;

      // expandir rectángulo
      gsap.to(bar, {
        width: colRect.width - sideMargin * 2,
        left: colRect.left + sideMargin,
        height: getExpandedHeight(),
        duration: 0.6,
        ease: "power2.out"
      });

      // mostrar iconos
      gsap.to(icons, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.4,
        ease: "power2.out",
        delay: 0.1
      });

      // mostrar CTA
      gsap.to(cta, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.4,
        ease: "power2.out",
        delay: 0.15
      });
    }
  } else {
    if (expanded) {
      expanded = false;

      // volver a estado inicial
      gsap.to(bar, {
        width: initialWidth,
        left: initialLeft,
        height: initialHeight,
        duration: 0.4,
        ease: "power2.out"
      });

      // ocultar iconos
      gsap.to(icons, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.2,
        ease: "power2.in"
      });

      // ocultar CTA
      gsap.to(cta, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.2,
        ease: "power2.in"
      });
    }
  }
}

leftCol.addEventListener("scroll", updateBar);
window.addEventListener("resize", updateBar);

// scroll to top desde el logo
logoLink.addEventListener("click", (e) => {
  e.preventDefault();
  leftCol.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});