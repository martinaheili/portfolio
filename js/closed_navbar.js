const bar = document.querySelector(".fixed-bar");
const cta = document.querySelector(".footer-cta");
const icons = document.querySelector(".social-icons");
const logoLink = document.querySelector(".nav-links a");

// Función que devuelve los valores iniciales según resolución
function getBarInitialSizes() {
  const widthScreen = window.innerWidth;

  if (widthScreen <= 480) {
    return { width: "90vw", left: "4.2%", height: 50 };
  } else if (widthScreen <= 820) {
    return { width: "60vw", left: "20%", height: 50 };
  } else if (widthScreen >= 1025 && widthScreen <= 1920) {
    return { width: "30vw", left: "22%", height: 40 };
  } else if (widthScreen >= 1921 && widthScreen <= 2560) {
    return { width: "28vw", left: "22%", height: 55 };
  } else if (widthScreen >= 2561 && widthScreen <= 3440) {
    return { width: "30vw", left: "20%", height: 55 };
  } else if (widthScreen > 3440) {
    return { width: "35vw", left: "18%", height: 70 };
  } else {
    return { width: "30vw", left: "22%", height: 40 };
  }
}

// Inicializamos la barra con los tamaños correctos
function setInitialBar() {
  const initialSizes = getBarInitialSizes();

  gsap.set(bar, {
    width: initialSizes.width,
    left: initialSizes.left,
    height: initialSizes.height
  });

  // CTA siempre oculto en contact
  gsap.set(cta, {
    opacity: 0,
    pointerEvents: "none"
  });

  // iconos siempre ocultos en contact
  gsap.set(icons, {
    opacity: 0,
    pointerEvents: "none"
  });
}

// Resize mantiene proporciones responsive
window.addEventListener("resize", () => {
  setInitialBar();
});

// Scroll to top desde el logo
logoLink.addEventListener("click", (e) => {
  if (
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname === "/"
  ) {
    e.preventDefault();
    leftCol.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    window.location.href = "index.html";
  }
});

// Set inicial al cargar la página
window.addEventListener("load", () => {
  setInitialBar();
});