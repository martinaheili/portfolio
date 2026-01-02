// ==========================
// GSAP y ScrollTrigger
// ==========================
gsap.registerPlugin(ScrollTrigger);

// ======= LOGO ANIMADO =======
gsap.registerPlugin(ScrollTrigger);

const leftCol = document.querySelector('.column.left');
const logo = document.querySelector('.logo');

gsap.fromTo(
  logo,
  {
    scale: 1,
    y: 0
  },
  {
    scale: 100 / (window.innerWidth * 1), // escala exacta al tamaño final
    y: -20,                                   // ajuste fino vertical
    ease: "none",
    scrollTrigger: {
      trigger: leftCol,
      scroller: leftCol,
      start: "top top",
      end: "+=220",
      scrub: 0.6
    }
  }
);

// ======= PROYECTOS AL ENTRAR EN VIEWPORT =======
gsap.utils.toArray('.project-card').forEach(card => {
  gsap.from(card, {
    opacity: 0,
    y: 40,
    duration: 0.7,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: card,
      start: 'top 85%',                  // cuando el card llega al 85% de la columna
      scroller: leftCol,                 // scroll independiente de la columna
      toggleActions: 'play none none none'
    }
  });
});

// ==========================
// CURSOR PERSONALIZADO
// ==========================
const circle = document.querySelector('.cursor');
const links = document.querySelectorAll('a');

gsap.set(circle, { xPercent: -50, yPercent: -50 });

// Movimiento suave del cursor
window.addEventListener("mousemove", e => {
  gsap.to(circle, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.35,
    ease: "power2.out"
  });
});

// Hover sobre links: solo escala
function linkAnimIn() {
  gsap.to(circle, { duration: 0.3, scale: 1.8 });
}
function linkAnimOut() {
  gsap.to(circle, { duration: 0.3, scale: 1 });
}

links.forEach(link => {
  link.addEventListener('mouseover', linkAnimIn);
  link.addEventListener('mouseout', linkAnimOut);
});