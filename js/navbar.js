const bar = document.querySelector(".fixed-bar");
const cta = document.querySelector(".footer-cta");
const icons = document.querySelector(".social-icons");
const logoLink = document.querySelector(".nav-links a");

const threshold = 20;
const sideMargin = 15;

let expanded = false;

// Función que devuelve altura expandida
function getExpandedHeight() {
  return window.innerHeight * 0.5;
}

// Función que devuelve los valores iniciales según resolución
function getBarInitialSizes() {
  const widthScreen = window.innerWidth;

  if (widthScreen <= 480) {
    // móviles muy pequeños: barra casi completa
    return { width: "90vw", left: "4.2%", height: 50 };
  } else if (widthScreen <= 820) {
    // tablets / móviles grandes
    return { width: "60vw", left: "20%", height: 50 };
  } else if (widthScreen >= 1025 && widthScreen <= 1920) {
    // Full HD y laptops
    return { width: "30vw", left: "22%", height: 40 };
  } else if (widthScreen >= 1921 && widthScreen <= 2560) {
    // 2K / pantallas grandes
    return { width: "28vw", left: "22%", height: 55 };
  } else if (widthScreen >= 2561 && widthScreen <= 3440) {
    // ultrawide 21:9
    return { width: "30vw", left: "20%", height: 55 };
  } else if (widthScreen > 3440) {
    // 4K
    return { width: "35vw", left: "18%", height: 70 };
  } else {
    // fallback
    return { width: "30vw", left: "22%", height: 40 };
  }
}

function updateBar() {
  const scrollTop = leftCol.scrollTop;
  const scrollEnd = leftCol.scrollHeight - leftCol.clientHeight;
  const colRect = leftCol.getBoundingClientRect();

  const initialSizes = getBarInitialSizes();

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
    if (expanded) expanded = false;

    // volver a estado inicial según resolución
    gsap.to(bar, {
      width: initialSizes.width,
      left: initialSizes.left,
      height: initialSizes.height,
      duration: 0.4,
      ease: "power2.out"
    });

    // ocultar iconos
    gsap.to(icons, {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.1
    });

    // ocultar CTA
    gsap.to(cta, {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.1
    });
  }
}

// Inicializamos la barra con los tamaños correctos
function setInitialBar() {
  const initialSizes = getBarInitialSizes();

  // Configuramos barra
  gsap.set(bar, {
    width: initialSizes.width,
    left: initialSizes.left,
    height: initialSizes.height
  });

  // Aseguramos que los iconos y CTA estén ocultos y no interactúen
  gsap.set(icons, {
    opacity: 0,
    pointerEvents: "none"
  });

  gsap.set(cta, {
    opacity: 0,
    pointerEvents: "none"
  });
}

// Listeners
leftCol.addEventListener("scroll", updateBar);
window.addEventListener("resize", () => {
  setInitialBar();
  updateBar();
});

// Scroll to top desde el logo
logoLink.addEventListener("click", (e) => {
  e.preventDefault();
  leftCol.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Set inicial al cargar la página
window.addEventListener("load", () => {
  setInitialBar();
  updateBar();
});