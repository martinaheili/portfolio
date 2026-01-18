// ==========================
// GSAP y ScrollTrigger
// ==========================
gsap.registerPlugin(ScrollTrigger);

// ======= LOGO ANIMADO =======
const leftCol = document.querySelector('.column.left');
const logo = document.querySelector('.logo');

gsap.fromTo(
  logo,
  { scale: 1, y: 0 },
  {
    scale: 100 / (window.innerWidth * 1),
    y: 0,
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
  gsap.to(circle, { x: e.clientX, y: e.clientY, duration: 0.35, ease: "power2.out" });
});

function linkAnimIn() { gsap.to(circle, { duration: 0.3, scale: 1.8 }); }
function linkAnimOut() { gsap.to(circle, { duration: 0.3, scale: 1 }); }

links.forEach(link => {
  link.addEventListener('mouseover', linkAnimIn);
  link.addEventListener('mouseout', linkAnimOut);
});

// ==========================
// SCRAMBLE TEXT NAVBAR
// ==========================
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const navLinks = document.querySelectorAll(".nav-link span");

navLinks.forEach(span => {
  const originalText = span.innerText;
  let interval = null;

  span.parentElement.addEventListener("mouseenter", () => {
    let iteration = 0;
    clearInterval(interval);

    interval = setInterval(() => {
      span.innerText = originalText
        .split("")
        .map((char, index) => index < iteration ? originalText[index] : letters[Math.floor(Math.random() * letters.length)])
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
// FLOATING WORDS CON REPULSIÓN
// ==========================
const floatingWords = document.querySelectorAll(".floating-words span");
const container = document.querySelector(".floating-words .words-container");
const placed = [];
const padding = 5;

floatingWords.forEach(word => {
  let x, y, safe;
  do {
    x = Math.random() * (container.clientWidth - word.offsetWidth);
    y = Math.random() * (container.clientHeight - word.offsetHeight);
    safe = true;
    for (let pos of placed) {
      if (x < pos.x + pos.width + padding &&
          x + word.offsetWidth + padding > pos.x &&
          y < pos.y + pos.height + padding &&
          y + word.offsetHeight + padding > pos.y) {
        safe = false;
        break;
      }
    }
  } while (!safe);

  placed.push({ x, y, width: word.offsetWidth, height: word.offsetHeight });
  word.dataset.origX = x;
  word.dataset.origY = y;
  gsap.set(word, { x, y });
});

const repelDistance = 150;
const repelStrength = 0.6;

window.addEventListener("mousemove", e => {
  floatingWords.forEach(word => {
    const origX = parseFloat(word.dataset.origX);
    const origY = parseFloat(word.dataset.origY);
    const rect = word.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = centerX - e.clientX;
    const deltaY = centerY - e.clientY;
    const distance = Math.sqrt(deltaX*deltaX + deltaY*deltaY);

    if (distance < repelDistance) {
      const force = (1 - distance / repelDistance) * repelStrength;
      const angle = Math.atan2(deltaY, deltaX);
      const repelX = Math.cos(angle) * force * 50;
      const repelY = Math.sin(angle) * force * 50;
      gsap.to(word, { x: origX + repelX, y: origY + repelY, duration: 0.3, ease: "power2.out" });
    } else {
      gsap.to(word, { x: origX, y: origY, duration: 0.5, ease: "power2.out" });
    }
  });
});

// ======= ANIMACIÓN DE PROYECTOS AL ENTRAR EN VIEWPORT
gsap.utils.toArray('.project-link').forEach(link => {
  gsap.from(link, {
    opacity: 0,
    y: 60,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: link,
      start: 'top 85%',
      scroller: leftCol,
      toggleActions: 'play reverse play reverse'
    }
  });
});

// ==========================
// PANEL DERECHO / SOBRE MI
// ==========================
const rightPanel = document.querySelector(".column.right");
const sobreMiBtn = document.querySelector(".nav-link[href='#sobre-mi']");
const closePanelBtn = rightPanel.querySelector(".close-panel");
const projectDetail = document.getElementById("project-detail");
const aboutBlocks = document.querySelectorAll(".about-block, .column.right hr");
const projectLinks = document.querySelectorAll("[data-project]");

let panelOpen = false;

function openPanel() {
  if (!panelOpen) {
    panelOpen = true;
    gsap.to(rightPanel, { right: 0, duration: 0.3, ease: "power2.out" });
    document.body.style.overflow = "hidden";
  }
}

function closePanel() {
  if (panelOpen) {
    panelOpen = false;
    gsap.to(rightPanel, { right: "-100%", duration: 0.3, ease: "power2.in" });
    document.body.style.overflow = "";
  }
}

// Abrir panel en móviles al click sobre "Sobre mí"
sobreMiBtn.addEventListener("click", e => {
  e.preventDefault();
  showCV();
});

// Cerrar panel con la cruz
closePanelBtn.addEventListener("click", () => {
  closePanel();
  projectDetail.hidden = true;
  aboutBlocks.forEach(el => el.style.display = "");
});

// Cerrar al click fuera del panel
document.addEventListener("click", e => {
  if (panelOpen && window.innerWidth <= 820) {
    if (!rightPanel.contains(e.target) && !sobreMiBtn.contains(e.target)) {
      closePanel();
    }
  }
});
rightPanel.addEventListener("click", e => e.stopPropagation());

// ==========================
// PROJECT DETAIL TOGGLE
// ==========================
function animateProjectGallery() {
  const imgs = gsap.utils.toArray('.project-detail .project-gallery img');
  imgs.forEach(img => {
    if (img.scrollTrigger) img.scrollTrigger.kill();
    gsap.fromTo(img,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: img,
          start: 'top 90%',
          scroller: rightPanel,
          toggleActions: 'play reverse play reverse'
        }
      }
    );
  });
}

projectLinks.forEach(link => {
  link.addEventListener("click", e => {
    const projectPage = link.dataset.project + ".html"; // genera el enlace real

    if (window.innerWidth <= 820) {
      // Redirige directo a la página en pantallas pequeñas
      window.location.href = projectPage;
      return;
    }

    // Para pantallas grandes, comportamiento normal
    e.preventDefault();
    projectDetail.hidden = false;
    aboutBlocks.forEach(el => el.style.display = "none");
    if (window.innerWidth <= 1024) openPanel();
    animateProjectGallery();
  });
});


// ==========================
// SCRAMBLE TEXT TITULOS DE PROYECTO
// ==========================
const projectLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const projectTitles = document.querySelectorAll(".project-title .scramble-text");

projectTitles.forEach(span => {
  const originalText = span.innerText;
  let interval = null;

  // Hover scramble
  span.parentElement.addEventListener("mouseenter", () => {
    let iteration = 0;
    clearInterval(interval);

    interval = setInterval(() => {
      span.innerText = originalText
        .split("") // seguimos por letra
        .map((char, index) => index < iteration ? originalText[index] : projectLetters[Math.floor(Math.random() * projectLetters.length)])
        .join("");

      iteration += 1 / 1.3;

      if (iteration >= originalText.length) {
        clearInterval(interval);
        span.innerText = originalText;
      }
    }, 20);
  });

  // Mantener clicable
  span.parentElement.addEventListener("click", () => {
    const href = span.parentElement.getAttribute("href");
    if (href) window.location.href = href;
  });
});

// ==========================
// FUNCION PARA VOLVER AL CV
// ==========================
function showCV() {
  projectDetail.hidden = true;
  aboutBlocks.forEach(el => el.style.display = "");
  if (window.innerWidth <= 820) openPanel();
}


