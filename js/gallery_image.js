// ==========================
// GALERÍA IMÁGENES — MODAL
// ==========================
const galleryImages = document.querySelectorAll('.right-gallery .project-gallery img');
const modal = document.querySelector('.image-modal');
const modalImg = modal.querySelector('img');
const closeBtn = modal.querySelector('.close-modal');
const arrowLeft = modal.querySelector('.arrow.left');
const arrowRight = modal.querySelector('.arrow.right');

let currentIndex = 0;

// Abrir modal con la imagen clickeada
galleryImages.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;
    modalImg.src = img.src;
    modal.style.display = 'flex';
  });
});

// Cerrar modal
closeBtn.addEventListener('click', () => modal.style.display = 'none');
modal.addEventListener('click', e => {
  if (e.target === modal) modal.style.display = 'none';
});

// Navegación con flechas del modal
arrowLeft.addEventListener('click', e => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  modalImg.src = galleryImages[currentIndex].src;
});

arrowRight.addEventListener('click', e => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % galleryImages.length;
  modalImg.src = galleryImages[currentIndex].src;
});

// Navegación con teclado
window.addEventListener('keydown', e => {
  if (modal.style.display !== 'flex') return;

  if (e.key === 'Escape') {
    modal.style.display = 'none';
  }

  if (e.key === 'ArrowLeft') {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    modalImg.src = galleryImages[currentIndex].src;
  }

  if (e.key === 'ArrowRight') {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    modalImg.src = galleryImages[currentIndex].src;
  }
});

// ==========================
// ANIMACIÓN IMÁGENES GALERÍA
// ==========================
const rightCol = document.querySelector('.right-gallery');
const galleryImgs = gsap.utils.toArray('.right-gallery .project-gallery img');

const isDesktop = window.innerWidth > 820;
const scrollerEl = isDesktop ? rightCol : window;

galleryImgs.forEach(img => {
  gsap.set(img, { opacity: 0, y: 60 });

  gsap.to(img, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: img,
      start: 'top 85%',
      scroller: isDesktop ? rightCol : undefined,
      once: true
    }
  });
});

// 🔑 SOLO EN DESKTOP: forzar últimas imágenes
if (isDesktop && rightCol) {
  rightCol.addEventListener('scroll', () => {
    const scrollBottom =
      rightCol.scrollTop + rightCol.clientHeight >= rightCol.scrollHeight - 5;

    if (scrollBottom) {
      galleryImgs.forEach(img => {
        if (gsap.getProperty(img, "opacity") === 0) {
          gsap.to(img, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out"
          });
        }
      });
    }
  });
}

// ==========================
// SCRAMBLE NEXT PROJECT
// ==========================
(() => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  document.querySelectorAll(".scramble-link .scramble-text").forEach(span => {
    const original = span.innerText;
    let interval = null;

    span.parentElement.addEventListener("mouseenter", () => {
      let i = 0;
      clearInterval(interval);

      interval = setInterval(() => {
        span.innerText = original
          .split("")
          .map((char, idx) =>
            idx < i ? original[idx] : letters[Math.floor(Math.random() * letters.length)]
          )
          .join("");

        i += 1 / 2.2;

        if (i >= original.length) {
          clearInterval(interval);
          span.innerText = original;
        }
      }, 20);
    });

    span.parentElement.addEventListener("mouseleave", () => {
      clearInterval(interval);
      span.innerText = original;
    });
  });
})();

// ==========================
// AUDIO MOOD — PLAY / PAUSE
// ==========================
(() => {
  const wrapper = document.querySelector('.project-audio');
  if (!wrapper) return;

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
})();