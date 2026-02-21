document.addEventListener("DOMContentLoaded", () => {
  const greeting = document.querySelector(".contact-greeting");
  const subtext = document.querySelector(".contact-subtext");
  const profile = document.querySelector(".profile-photo");

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // Aparece primero el "hola,"
  tl.from(greeting, {
    y: 50,
    opacity: 0,
    duration: 0.8
  });

  // Luego la frase con un pequeño delay
  tl.from(subtext, {
    y: 50,
    opacity: 0,
    duration: 0.8
  }, "+=0.3"); // delay de 0.3s tras el greeting

  // Finalmente la foto, un poco después de la frase
  tl.from(profile, {
    y: 30,
    opacity: 0,
    scale: 0.8,
    duration: 0.8
  }, "+=0.8"); // 0.2s después de que aparezca la frase
});




