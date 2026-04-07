// ==========================
// GSAP y ScrollTrigger
// ==========================
gsap.registerPlugin(ScrollTrigger);


// ==========================
// ANIMACIÓN DE ENTRADA DEL LOGO (fade-in desde abajo)
// ==========================
let logoAnimated = false;

function animateLogo() {

  if (logoAnimated) return;
  logoAnimated = true;

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
    delay: 0.4
  });

}


// ==========================
// LOGO ANIMADO (ScrollTrigger)
// ==========================
const leftCol = document.querySelector('.column.left');
const logo = document.querySelector('.logo');

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

// ==========================
// CURSOR PERSONALIZADO
// ==========================
const circle = document.querySelector('.cursor');
const links = document.querySelectorAll('a');

gsap.set(circle, { xPercent: -50, yPercent: -50 });

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
// FLOATING WORDS CON REPULSIÓN + FADE SECUENCIAL
// ==========================
const floatingWords = document.querySelectorAll(".floating-words span");
const container = document.querySelector(".floating-words .words-container");
const placed = [];
const padding = 5;

if (floatingWords.length > 0 && container) {
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

    placed.push({ x, y, width: word.offsetWidth, height: word.offsetHeight });
    word.dataset.origX = x;
    word.dataset.origY = y;
    gsap.set(word, { x, y, opacity: 0, yPercent: 10 });

    // Fade in secuencial
    gsap.to(word, {
      opacity: 1,
      yPercent: 0,
      duration: 0.6,
      delay: index * 0.20,
      ease: "power2.out"
    });
  });

  const repelDistance = 150;
  const repelStrength = 0.6;

  window.addEventListener("mousemove", e => {
    floatingWords.forEach(word => {
      const origX = +word.dataset.origX;
      const origY = +word.dataset.origY;
      const rect = word.getBoundingClientRect();
      const dx = rect.left + rect.width / 2 - e.clientX;
      const dy = rect.top + rect.height / 2 - e.clientY;
      const dist = Math.hypot(dx, dy);

      if (dist < repelDistance) {
        const force = (1 - dist / repelDistance) * repelStrength;
        gsap.to(word, {
          x: origX + Math.cos(Math.atan2(dy, dx)) * force * 50,
          y: origY + Math.sin(Math.atan2(dy, dx)) * force * 50,
          duration: 0.3
        });
      } else {
        gsap.to(word, { x: origX, y: origY, duration: 0.5 });
      }
    });
  });
}

// ==========================
// ANIMACIÓN DEL SEPARADOR (dibujado al cargar)
// ==========================
function animateSeparator() {
  const separator = document.querySelector('.separator');
  if (!separator) return;

  // Asegurar que empiece con altura 0
  gsap.set(separator, { height: 0 });

  // Animar hasta la altura completa del contenedor padre
  gsap.to(separator, {
    height: '96.5%',
    duration: 1.2,
    ease: 'power2.inOut',
    delay: 0.3
  });
}

// ==========================
// ANIMACIÓN DE LOS HR (dibujado horizontal al cargar)
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
      delay: 0.4 + (index * 0.15)
    });
  });
}



// ==========================
// ANIMACIÓN PROYECTOS
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
const sobreMiBtn = document.querySelector(".nav-link[href='#sobre-mi']");
const closePanelBtn = rightPanel ? rightPanel.querySelector(".close-panel") : null;
const aboutBlocks = document.querySelectorAll(".about-block, .column.right hr");
const projectLinks = document.querySelectorAll("[data-project]");
const projectDetails = document.querySelectorAll(".project-detail");

let panelOpen = false;

function openPanel() {
  if (panelOpen || !rightPanel) return;
  panelOpen = true;
  gsap.to(rightPanel, { right: 0, duration: 0.3 });
  document.body.style.overflow = "hidden";
}

function closePanel() {
  if (!panelOpen || !rightPanel) return;
  panelOpen = false;
  gsap.to(rightPanel, { right: "-100%", duration: 0.3 });
  document.body.style.overflow = "";
}

if (sobreMiBtn) {
  sobreMiBtn.addEventListener("click", e => {
    e.preventDefault();
    showCV();
  });
}

if (closePanelBtn) {
  closePanelBtn.addEventListener("click", () => {
    closePanel();
    projectDetails.forEach(d => d.hidden = true);
    aboutBlocks.forEach(el => el.style.display = "");
  });
}

if (rightPanel) {
  rightPanel.addEventListener("click", e => e.stopPropagation());
}

// ==========================
// PROJECT DETAIL 
// ==========================
function animateProjectGallery() {
  gsap.utils.toArray('.project-detail:not([hidden]) img').forEach(img => {
    gsap.fromTo(img, { opacity: 0, y: 60 }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: img,
        start: 'top 90%',
        scroller: rightPanel
      }
    });
  });
}

projectLinks.forEach(link => {
  link.addEventListener("click", e => {
    const project = link.dataset.project;
    const projectPage = project + ".html";

    if (window.innerWidth <= 820) {
      window.location.href = projectPage;
      return;
    }

    e.preventDefault();

    projectDetails.forEach(d => d.hidden = true);

    const active = document.querySelector(
      `.project-detail[data-project="${project}"]`
    );
    if (!active) return;

    active.hidden = false;
    aboutBlocks.forEach(el => el.style.display = "none");
    if (window.innerWidth <= 1024) openPanel();
    animateProjectGallery();
  });
});

// ==========================
// SCRAMBLE TÍTULOS PROYECTO
// ==========================
document.querySelectorAll(".project-title .scramble-text").forEach(span => {
  const original = span.innerText;
  let interval;

  span.parentElement.addEventListener("mouseenter", () => {
    let i = 0;
    clearInterval(interval);
    interval = setInterval(() => {
      span.innerText = original
        .split("")
        .map((_, idx) =>
          idx < i ? original[idx] : letters[Math.floor(Math.random() * letters.length)]
        )
        .join("");

      i += 1 / 1.3;
      if (i >= original.length) {
        clearInterval(interval);
        span.innerText = original;
      }
    }, 20);
  });

  span.parentElement.addEventListener("click", () => {
    const href = span.parentElement.getAttribute("href");
    if (href) window.location.href = href;
  });
});

// ==========================
// BOTONES EXPANDIR PROYECTO (FIX)
// ==========================
document.querySelectorAll('.project-expand').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const href = btn.getAttribute('href');
    if (href) window.location.href = href;
  });
});

// ==========================
// VOLVER AL CV
// ==========================
function showCV() {
  projectDetails.forEach(d => d.hidden = true);
  aboutBlocks.forEach(el => el.style.display = "");
  if (window.innerWidth <= 820) openPanel();
}

// ==========================
// AUDIO MOOD - PLAY / PAUSE
// ==========================
document.querySelectorAll('.project-audio').forEach(wrapper => {
  const btn = wrapper.querySelector('.audio-play');
  const audio = wrapper.querySelector('audio');
  const icon = btn.querySelector('i');

  btn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      btn.classList.add('playing');
      icon.classList.remove('bi-play-fill');
      icon.classList.add('bi-pause-fill');
    } else {
      audio.pause();
      btn.classList.remove('playing');
      icon.classList.remove('bi-pause-fill');
      icon.classList.add('bi-play-fill');
    }
  });

  audio.addEventListener('ended', () => {
    btn.classList.remove('playing');
    icon.classList.remove('bi-pause-fill');
    icon.classList.add('bi-play-fill');
  });
});



// ==========================
// ANIMACIÓN DEL TÍTULO DE CONTACTO
// ==========================
let contactTitleAnimated = false;

function animateContactTitle() {
  if (contactTitleAnimated) return;
  contactTitleAnimated = true;

  if (!document.body.classList.contains('contact-page')) return;
  
  const greeting = document.querySelector('.contact-greeting');
  const subtext = document.querySelector('.contact-subtext');
  
  if (!greeting || !subtext) return;

  // Estado inicial
  gsap.set([greeting, subtext], { 
    opacity: 0, 
    y: 40 
  });

  // Timeline secuencial
  const tl = gsap.timeline({ delay: 0.3 });
  tl.to(greeting, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power2.out'
  })
  .to(subtext, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power2.out'
  }, '-=0.3');
}



// ==========================
// ANIMACIÓN DEL EDITABLE WRAPPER (fade-in)
// ==========================
let editableWrapperAnimated = false;

function animateEditableWrapper() {
  if (editableWrapperAnimated) return;
  editableWrapperAnimated = true;

  if (!document.body.classList.contains('contact-page')) return;
  
  const wrapper = document.querySelector('.editable-wrapper');
  if (!wrapper) return;
  
  // Estado inicial
  gsap.set(wrapper, { opacity: 0 });
  
  // Fade-in suave
  gsap.to(wrapper, {
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
    delay: 0.5 // aparece un poco después del título
  });
}


// ==========================
// ANIMACIÓN DEL FORM IMAGE (fade-in desde la derecha)
// ==========================
function animateFormImage() {
  // Solo ejecutar en la página de contacto
  if (!document.body.classList.contains('contact-page')) return;
  
  const formImage = document.querySelector('.form-image');
  if (!formImage) return;
  
  // Configurar estado inicial
  gsap.set(formImage, { 
    opacity: 0, 
    x: 30  // viene desde la derecha
  });
  
  // Animación de entrada
  gsap.to(formImage, {
    opacity: 1,
    x: 0,
    duration: 0.6,
    ease: 'power2.out',
    delay: 1.6 // aparece después del título y la foto
  });
}


// ==========================
// ANIMACIÓN DE SCROLL LINES (aparecen con scroll)
// ==========================
function animateScrollLines() {
  // Solo ejecutar en la página de contacto
  if (!document.body.classList.contains('contact-page')) return;
  
  const scrollLines = document.querySelectorAll('.scroll-line');
  if (!scrollLines.length) return;
  
  // Configurar estado inicial de todas las líneas
  gsap.set(scrollLines, { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  });
  
  // Crear ScrollTrigger para cada línea
  scrollLines.forEach((line, index) => {
    gsap.to(line, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: line,
        scroller: leftCol, // el scroll es en la columna izquierda
        start: 'top 100%',  // cuando la línea llega al 85% del viewport
        toggleActions: 'play none none none',
      }
    });
  });
}


// ==========================
// ANIMACIÓN DEL STATIC CLOCK (aparece con scroll en móvil/tablet)
// ==========================
function animateStaticClock() {
  // Solo ejecutar en la página de contacto
  if (!document.body.classList.contains('contact-page')) return;
  
  const clockContainer = document.querySelector('.static-clock-container');
  if (!clockContainer) return;
  
  // Verificar si el elemento está visible en la pantalla actual (solo en breakpoints donde display no es none)
  const isVisible = window.getComputedStyle(clockContainer).display !== 'none';
  if (!isVisible) return;
  
  // Configurar estado inicial
  gsap.set(clockContainer, { 
    opacity: 0, 
    scale: 0.9,
    y: 20
  });
  
  // Animar con ScrollTrigger
  gsap.to(clockContainer, {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 0.7,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: clockContainer,
      scroller: leftCol,
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  });
}



// ==========================
// ANIMACIÓN DEL MOBILE FORM WRAPPER (fade-up con scroll)
// ==========================
function animateMobileForm() {
  // Solo ejecutar en la página de contacto
  if (!document.body.classList.contains('contact-page')) return;
  
  const mobileFormWrapper = document.querySelector('.mobile-form-wrapper');
  if (!mobileFormWrapper) return;
  
  // Verificar si el elemento está visible en la pantalla actual (solo en breakpoints donde display no es none)
  const isVisible = window.getComputedStyle(mobileFormWrapper).display !== 'none';
  if (!isVisible) return;
  
  // Configurar estado inicial - FADE UP (opacity 0 + desplazado hacia abajo)
  gsap.set(mobileFormWrapper, { 
    opacity: 0, 
    y: 40,      // desplazado 40px hacia abajo
    scale: 0.98 // ligeramente más pequeño para efecto más suave
  });
  
  // Animar con ScrollTrigger cuando aparece en pantalla
  gsap.to(mobileFormWrapper, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: mobileFormWrapper,
      scroller: '.column.left', // el scroll es en la columna izquierda
      start: 'top 85%',         // cuando el wrapper llega al 85% del viewport
      toggleActions: 'play none none none'
    }
  });
}


// ==========================
// ANIMACIONES DE ENTRADA (independientes de transición)
// ==========================

function runEntryAnimations() {
  animateLogo();
  animateSeparator();
  animateHorizontalRules();
  animateContactTitle();
  animateEditableWrapper();
  animateFormImage();
  animateScrollLines();
  animateStaticClock();
  animateMobileForm();
}

// Ejecutar al cargar la página directamente
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", runEntryAnimations);
} else {
  runEntryAnimations();
}

// Mantener compatibilidad con transición entre páginas
window.onTransitionComplete = runEntryAnimations;
