// ==========================
// GSAP y ScrollTrigger
// ==========================
gsap.registerPlugin(ScrollTrigger);

// ==========================
// LOGO ANIMADO
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
  gsap.set(word, { x, y });
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

// ==========================
// ANIMACIÓN PROYECTOS
// ==========================
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

// ==========================
// PANEL DERECHO
// ==========================
const rightPanel = document.querySelector(".column.right");
const sobreMiBtn = document.querySelector(".nav-link[href='#sobre-mi']");
const closePanelBtn = rightPanel.querySelector(".close-panel");
const aboutBlocks = document.querySelectorAll(".about-block, .column.right hr");
const projectLinks = document.querySelectorAll("[data-project]");
const projectDetails = document.querySelectorAll(".project-detail");

let panelOpen = false;

function openPanel() {
  if (panelOpen) return;
  panelOpen = true;
  gsap.to(rightPanel, { right: 0, duration: 0.3 });
  document.body.style.overflow = "hidden";
}

function closePanel() {
  if (!panelOpen) return;
  panelOpen = false;
  gsap.to(rightPanel, { right: "-100%", duration: 0.3 });
  document.body.style.overflow = "";
}

sobreMiBtn.addEventListener("click", e => {
  e.preventDefault();
  showCV();
});

closePanelBtn.addEventListener("click", () => {
  closePanel();
  projectDetails.forEach(d => d.hidden = true);
  aboutBlocks.forEach(el => el.style.display = "");
});

rightPanel.addEventListener("click", e => e.stopPropagation());

// ==========================
// PROJECT DETAIL (FIX DRIFT)
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
// VOLVER AL CV
// ==========================
function showCV() {
  projectDetails.forEach(d => d.hidden = true);
  aboutBlocks.forEach(el => el.style.display = "");
  if (window.innerWidth <= 820) openPanel();
}


// AUDIO MOOD - PLAY / PAUSE
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

  // Al terminar el audio, reset icono y clase
  audio.addEventListener('ended', () => {
    btn.classList.remove('playing');
    icon.classList.remove('bi-pause-fill');
    icon.classList.add('bi-play-fill');
  });
});

