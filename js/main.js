// ==========================
// GSAP y ScrollTrigger
// ==========================
gsap.registerPlugin(ScrollTrigger);


// ==========================
// ESPERAR SOLO AL DOM (NO IMÁGENES)
// ==========================
document.addEventListener("DOMContentLoaded", () => {


// ==========================
// ANIMACIÓN DE ENTRADA DEL LOGO
// ==========================
function animateLogo() {

  const logo = document.querySelector('.logo');
  if (!logo) return;

  gsap.set(logo, {
    opacity: 0,
    y: 30
  });

  gsap.to(logo, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power2.out',
    delay: 0.2
  });

}


// ==========================
// LOGO SCALE SCROLL
// ==========================
const leftCol = document.querySelector('.column.left');
const logo = document.querySelector('.logo');

if (logo && leftCol) {

  gsap.fromTo(
    logo,
    { scale: 1 },
    {
      scale: 100 / window.innerWidth,
      ease: "none",
      scrollTrigger: {
        trigger: leftCol,
        scroller: leftCol,
        start: "top top",
        end: "+=200",
        scrub: 0.6
      }
    }
  );

}


// ==========================
// CURSOR PERSONALIZADO
// ==========================
const circle = document.querySelector('.cursor');

if (circle) {

  const links = document.querySelectorAll('a');

  gsap.set(circle, {
    xPercent: -50,
    yPercent: -50
  });

  window.addEventListener("mousemove", e => {

    gsap.to(circle, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.35,
      ease: "power2.out"
    });

  });

  links.forEach(link => {

    link.addEventListener('mouseenter', () =>
      gsap.to(circle, { scale: 1.8, duration: 0.3 })
    );

    link.addEventListener('mouseleave', () =>
      gsap.to(circle, { scale: 1, duration: 0.3 })
    );

  });

}


// ==========================
// SCRAMBLE TEXT NAVBAR
// ==========================
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

document.querySelectorAll(".nav-link span").forEach(span => {

  const originalText = span.innerText;
  let interval = null;

  span.parentElement.addEventListener("mouseenter", () => {

    let iteration = 0;

    clearInterval(interval);

    interval = setInterval(() => {

      span.innerText = originalText
        .split("")
        .map((_, i) =>
          i < iteration
            ? originalText[i]
            : letters[Math.floor(Math.random() * letters.length)]
        )
        .join("");

      iteration += 1 / 3;

      if (iteration >= originalText.length) {

        clearInterval(interval);
        span.innerText = originalText;

      }

    }, 20);

  });

});


// ==========================
// FLOATING WORDS
// ==========================
const floatingWords = document.querySelectorAll(".floating-words span");
const container = document.querySelector(".floating-words .words-container");

if (floatingWords.length > 0 && container) {

  const placed = [];
  const padding = 5;

  floatingWords.forEach((word, index) => {

    let x, y, safe;

    do {

      x = Math.random() * (container.clientWidth - word.offsetWidth);
      y = Math.random() * (container.clientHeight - word.offsetHeight);

      safe = !placed.some(pos =>
        x < pos.x + pos.width + padding &&
        x + word.offsetWidth + padding > pos.x &&
        y < pos.y + pos.height + padding &&
        y + word.offsetHeight + padding > pos.y
      );

    } while (!safe);

    placed.push({
      x,
      y,
      width: word.offsetWidth,
      height: word.offsetHeight
    });

    word.dataset.origX = x;
    word.dataset.origY = y;

    gsap.set(word, {
      x,
      y,
      opacity: 0,
      yPercent: 10
    });

    gsap.to(word, {
      opacity: 1,
      yPercent: 0,
      duration: 0.6,
      delay: index * 0.2,
      ease: "power2.out"
    });

  });

}


// ==========================
// SEPARATOR
// ==========================
function animateSeparator() {

  const separator = document.querySelector('.separator');
  if (!separator) return;

  gsap.set(separator, { height: 0 });

  gsap.to(separator, {
    height: '96.5%',
    duration: 1.2,
    ease: 'power2.inOut',
    delay: 0.2
  });

}


// ==========================
// HR LINES
// ==========================
function animateHorizontalRules() {

  const hrElements = document.querySelectorAll('.column.right hr');
  if (!hrElements.length) return;

  hrElements.forEach((hr, index) => {

    gsap.set(hr, { width: 0 });

    gsap.to(hr, {
      width: '100%',
      duration: 0.8,
      ease: 'power2.inOut',
      delay: 0.3 + (index * 0.15)
    });

  });

}


// ==========================
// PROYECTOS
// ==========================
if (leftCol) {

  gsap.utils.toArray('.project-link').forEach(link => {

    gsap.from(link, {
      opacity: 0,
      y: 60,
      duration: 0.8,
      scrollTrigger: {
        trigger: link,
        start: 'top 85%',
        scroller: leftCol
      }
    });

  });

}


// ==========================
// PANEL DERECHO
// ==========================
const rightPanel = document.querySelector(".column.right");

if (rightPanel) {

  const sobreMiBtn = document.querySelector(".nav-link[href='#sobre-mi']");
  const closePanelBtn = rightPanel.querySelector(".close-panel");
  const aboutBlocks = document.querySelectorAll(".about-block, .column.right hr");
  const projectLinks = document.querySelectorAll("[data-project]");
  const projectDetails = document.querySelectorAll(".project-detail");

  let panelOpen = false;

  function openPanel() {

    if (panelOpen) return;

    panelOpen = true;

    gsap.to(rightPanel, {
      right: 0,
      duration: 0.3
    });

    document.body.style.overflow = "hidden";

  }

  function closePanel() {

    if (!panelOpen) return;

    panelOpen = false;

    gsap.to(rightPanel, {
      right: "-100%",
      duration: 0.3
    });

    document.body.style.overflow = "";

  }

}


// ==========================
// EJECUTAR ANIMACIONES
// ==========================
animateLogo();
animateSeparator();
animateHorizontalRules();
animateContactTitle();
animateEditableWrapper();
animateFormImage();
animateScrollLines();
animateStaticClock();
animateMobileForm();


// ==========================
// REFRESH FINAL CRÍTICO
// ==========================
ScrollTrigger.refresh();


});