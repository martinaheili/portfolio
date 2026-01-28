gsap.registerPlugin(ScrollTrigger);

const galleryWrapper = document.querySelector(".right-gallery");
const gallery = document.querySelector(".project-gallery");

if (gallery && galleryWrapper) {

  const totalScroll = gallery.scrollWidth - galleryWrapper.clientWidth;

  // ============================
  // SCROLL VERTICAL → HORIZONTAL
  // ============================
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const progress = scrollTop / maxScroll;
    galleryWrapper.scrollLeft = progress * totalScroll;
  });

  // ============================
  // SCROLL CON RUEDA / TRACKPAD SOBRE GALERÍA
  // ============================
  galleryWrapper.addEventListener("wheel", e => {
    e.preventDefault();
    const speed = 1.5;
    galleryWrapper.scrollLeft += e.deltaY * speed;
  }, { passive: false });

  // ============================
  // SWIPE TÁCTIL
  // ============================
  let startX = 0;
  let startY = 0;
  let isScrolling = false;

  galleryWrapper.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isScrolling = true;
  }, { passive: true });

  galleryWrapper.addEventListener("touchmove", e => {
    if (!isScrolling) return;

    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;

    const diffX = startX - x;
    const diffY = startY - y;

    // Solo si el movimiento es principalmente horizontal
    if (Math.abs(diffX) > Math.abs(diffY)) {
      e.preventDefault();
      galleryWrapper.scrollLeft += diffX;
      startX = x;
    }
  }, { passive: false });

  galleryWrapper.addEventListener("touchend", () => {
    isScrolling = false;
  });

  // ============================
  // GSAP opcional: efecto sutil
  // ============================
  const trigger = ScrollTrigger.create({
    trigger: galleryWrapper,
    start: "top top",
    end: () => `+=${totalScroll * 0.5}`,
    scrub: 0.5,
    onUpdate: self => {
      if (!galleryWrapper.matches(":hover")) {
        galleryWrapper.scrollLeft = self.progress * totalScroll;
      }
    }
  });

  galleryWrapper.addEventListener("mouseenter", () => trigger.disable());
  galleryWrapper.addEventListener("mouseleave", () => trigger.enable());
}