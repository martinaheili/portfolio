document.addEventListener("DOMContentLoaded", () => {

  const overlay = document.querySelector(".page-transition-overlay")
  if (!overlay) return

  // Definir filas y columnas según ancho de pantalla
  let rows, cols
  const screenWidth = window.innerWidth

  if (screenWidth < 480) {
    rows = 8
    cols = 2
  } else if (screenWidth < 768) {
    rows = 9
    cols = 3
  } else if (screenWidth < 1024) {
    rows = 8
    cols = 4
  } else {
    rows = 8
    cols = 6
  }

  const total = rows * cols
  overlay.style.gridTemplateColumns = `repeat(${cols}, 1fr)`

  // Crear celdas si no existen
  if (!overlay.children.length) {
    for (let i = 0; i < total; i++) {
      const cell = document.createElement("div")
      overlay.appendChild(cell)
    }
  }

  const cells = overlay.querySelectorAll("div")

  // Animación de entrada “fake” que ocurre siempre al cargar la página
  function animateEntry() {
    gsap.set(cells, { scaleY: 1 })
    gsap.to(cells, {
      scaleY: 0,
      duration: 0.5,
      stagger: {
        amount: 0.4,
        from: "random"
      },
      ease: "power4.inOut"
    })
  }

  // Ejecutamos la animación al cargar la página
  window.addEventListener("load", () => {
    animateEntry()
  })

  // Para que también sea responsive al cambiar tamaño de ventana
  window.addEventListener("resize", () => {
    let newRows, newCols
    const newWidth = window.innerWidth

    if (newWidth < 480) {
      newRows = 8
      newCols = 2
    } else if (newWidth < 768) {
      newRows = 9
      newCols = 3
    } else if (newWidth < 1024) {
      newRows = 8
      newCols = 4
    } else {
      newRows = 8
      newCols = 6
    }

    overlay.style.gridTemplateColumns = `repeat(${newCols}, 1fr)`

    // Ajustar cantidad de celdas si cambia significativamente
    const newTotal = newRows * newCols
    if (newTotal !== overlay.children.length) {
      overlay.innerHTML = ""
      for (let i = 0; i < newTotal; i++) {
        const cell = document.createElement("div")
        overlay.appendChild(cell)
      }
    }
  })

})