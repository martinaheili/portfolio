// ==========================
// NAVBAR INVERTIDO — ESTÁTICA (SIN EXPANSIÓN)
// ==========================

const barInv = document.querySelector(".fixed-bar");
const ctaInv = document.querySelector(".footer-cta");
const iconsInv = document.querySelector(".social-icons");

// Columna izquierda (texto)
const leftTextCol = document.querySelector(".left-text");

const sideMarginInv = 15;

// --------------------------
// ALTURA BASE SEGÚN RESOLUCIÓN
// --------------------------
function getBarBaseHeight() {
  const w = window.innerWidth;

  if (w <= 480) return 50;
  if (w <= 820) return 50;
  if (w <= 1920) return 40;
  if (w <= 2560) return 55;
  return 70;
}

// --------------------------------------
// POSICIONAR BARRA CENTRADA EN LA COLUMNA
// --------------------------------------
function positionBarInv() {
  if (!barInv || !leftTextCol) return;

  const colRect = leftTextCol.getBoundingClientRect();
  const height = getBarBaseHeight();

  gsap.set(barInv, {
    width: colRect.width - sideMarginInv * 2,
    left: colRect.left + sideMarginInv,
    height
  });

  // CTA e iconos siempre ocultos en estas páginas
  if (iconsInv) {
    gsap.set(iconsInv, {
      opacity: 0,
      pointerEvents: "none"
    });
  }

  if (ctaInv) {
    gsap.set(ctaInv, {
      opacity: 0,
      pointerEvents: "none"
    });
  }
}

// ------------------------------------------------
// SOLO INTERCEPTAR LINKS INTERNOS (#)
// El logo (index.html) queda libre
// ------------------------------------------------
document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    leftTextCol.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});

// --------------------------
// INIT
// --------------------------
window.addEventListener("load", positionBarInv);
window.addEventListener("resize", positionBarInv);