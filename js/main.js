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
    y: 0,                                   // ajuste fino vertical
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



// ==========================
// SCRAMBLE TEXT NAVBAR (PURE JS)
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
        .map((char, index) => {
          if (index < iteration) return originalText[index];
          return letters[Math.floor(Math.random() * letters.length)];
        })
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

// Posicionamos las palabras sin solaparse y guardamos su posición original
floatingWords.forEach(word => {
  let x, y, safe;
  do {
    x = Math.random() * (container.clientWidth - word.offsetWidth);
    y = Math.random() * (container.clientHeight - word.offsetHeight);
    safe = true;
    for (let pos of placed) {
      if (
        x < pos.x + pos.width + padding &&
        x + word.offsetWidth + padding > pos.x &&
        y < pos.y + pos.height + padding &&
        y + word.offsetHeight + padding > pos.y
      ) {
        safe = false;
        break;
      }
    }
  } while (!safe);

  placed.push({ x, y, width: word.offsetWidth, height: word.offsetHeight });

  // Guardamos posición original en dataset
  word.dataset.origX = x;
  word.dataset.origY = y;

  gsap.set(word, { x, y });
});

// REPULSIÓN AL MOUSE
const repelDistance = 150;  // distancia de efecto
const repelStrength = 0.6;  // intensidad (0.1 a 1)

window.addEventListener("mousemove", e => {
  floatingWords.forEach(word => {
    const origX = parseFloat(word.dataset.origX);
    const origY = parseFloat(word.dataset.origY);

    const rect = word.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = centerX - e.clientX;
    const deltaY = centerY - e.clientY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance < repelDistance) {
      const force = (1 - distance / repelDistance) * repelStrength;
      const angle = Math.atan2(deltaY, deltaX);
      const repelX = Math.cos(angle) * force * 50; // ajusta máximo desplazamiento
      const repelY = Math.sin(angle) * force * 50;

      gsap.to(word, { x: origX + repelX, y: origY + repelY, duration: 0.3, ease: "power2.out" });
    } else {
      gsap.to(word, { x: origX, y: origY, duration: 0.5, ease: "power2.out" });
    }
  });
});






// ======= ANIMACIÓN DE PROYECTOS AL ENTRAR EN VIEWPORT (replay al hacer scroll) =======
gsap.utils.toArray('.project-link').forEach(link => {
  gsap.from(link, {
    opacity: 0,
    y: 60, // baja desde más abajo
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: link,
      start: 'top 85%',
      scroller: leftCol,
      toggleActions: 'play reverse play reverse' // permite que la animación se repita al entrar/salir
    }
  });
});





// ABRIR Y CERRAR PANEL "SOBRE MÍ" EN MÓVIL
const rightPanel = document.querySelector(".column.right");
const sobreMiBtn = document.querySelector(".nav-link[href='#sobre-mi']");
const closePanelBtn = rightPanel.querySelector(".close-panel");

let panelOpen = false;

// Función para abrir panel
function openPanel() {
  if (!panelOpen) {
    panelOpen = true;
    gsap.to(rightPanel, { right: 0, duration: 0.3, ease: "power2.out" });
    document.body.style.overflow = "hidden"; // opcional: bloquea scroll del body mientras el panel esté abierto
  }
}

// Función para cerrar panel
function closePanel() {
  if (panelOpen) {
    panelOpen = false;
    gsap.to(rightPanel, { right: "-100%", duration: 0.3, ease: "power2.in" });
    document.body.style.overflow = ""; // desbloquea scroll
  }
}

// Abrir panel al click sobre "Sobre mí" en móviles
sobreMiBtn.addEventListener("click", (e) => {
  if (window.innerWidth <= 820) {
    e.preventDefault();
    openPanel();
  }
});

// Cerrar panel al click en la cruz
closePanelBtn.addEventListener("click", closePanel);

// Cerrar panel al click fuera del panel
document.addEventListener("click", (e) => {
  if (panelOpen && window.innerWidth <= 820) {
    // si el click no es dentro del panel ni sobre el botón "Sobre mí"
    if (!rightPanel.contains(e.target) && !sobreMiBtn.contains(e.target)) {
      closePanel();
    }
  }
});

// Evitar que clicks dentro del panel cierren al propagarse
rightPanel.addEventListener("click", (e) => e.stopPropagation());