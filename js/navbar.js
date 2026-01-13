const bar = document.querySelector(".fixed-bar");
const cta = document.querySelector(".footer-cta");

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

      // animación del rectángulo
      gsap.to(bar, {
        width: colRect.width - sideMargin * 2,
        left: colRect.left + sideMargin,
        height: getExpandedHeight(),
        duration: 0.6,
        ease: "power2.out"
      });

      // animación de opacidad del texto
      gsap.to(cta, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  } else {
    if (expanded) {
      expanded = false;

      // volver al estado inicial del rectángulo
      gsap.to(bar, {
        width: initialWidth,
        left: initialLeft,
        height: initialHeight,
        duration: 0.4,
        ease: "power2.out"
      });

      // desaparecer el texto suavemente
      gsap.to(cta, {
        opacity: 0,
        duration: 0,
        ease: "power2.in"
      });
    }
  }
}

leftCol.addEventListener("scroll", updateBar);
window.addEventListener("resize", updateBar);



// scroll to top
const logoLink = document.querySelector(".nav-links a"); // selecciona el <a> que envuelve al logo

logoLink.addEventListener("click", (e) => {
  e.preventDefault(); // evita el comportamiento por defecto

  leftCol.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});