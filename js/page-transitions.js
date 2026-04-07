window.addEventListener("load", () => {

  const overlay = document.querySelector(".page-transition-overlay")
  if (!overlay) return

  const cells = overlay.querySelectorAll("div")

  // Detectar columnas según ancho pantalla
  let cols

  const screenWidth = window.innerWidth

  if (screenWidth < 480) {
    cols = 2
  } else if (screenWidth < 768) {
    cols = 3
  } else if (screenWidth < 1024) {
    cols = 4
  } else {
    cols = 6
  }

  overlay.style.gridTemplateColumns = `repeat(${cols}, 1fr)`

  function animateEntry() {

    gsap.set(cells, {
      scaleY: 1,
      transformOrigin: "top"
    })

    gsap.to(cells, {
      scaleY: 0,
      duration: 0.5,
      stagger: {
        amount: 0.4,
        from: "random"
      },
      ease: "power4.inOut",

      onComplete: () => {

        if (typeof window.onTransitionComplete === "function") {
          window.onTransitionComplete()
        }

      }
    })

  }

  animateEntry()


  // Ajuste responsive si cambia tamaño ventana

  window.addEventListener("resize", () => {

    let newCols

    const newWidth = window.innerWidth

    if (newWidth < 480) {
      newCols = 2
    } else if (newWidth < 768) {
      newCols = 3
    } else if (newWidth < 1024) {
      newCols = 4
    } else {
      newCols = 6
    }

    overlay.style.gridTemplateColumns = `repeat(${newCols}, 1fr)`

  })

})