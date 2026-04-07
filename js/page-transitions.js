document.addEventListener("DOMContentLoaded", () => {

  const overlay = document.querySelector(".page-transition-overlay")
  if (!overlay) return

  let rows, cols
  let cells

  function getGridConfig(width) {

    if (width < 480) {
      return { rows: 8, cols: 2 }
    }

    if (width < 768) {
      return { rows: 9, cols: 3 }
    }

    if (width < 1024) {
      return { rows: 8, cols: 4 }
    }

    return { rows: 8, cols: 6 }

  }

  function buildGrid(rows, cols) {

    const total = rows * cols

    overlay.style.gridTemplateColumns = `repeat(${cols}, 1fr)`

    overlay.innerHTML = ""

    for (let i = 0; i < total; i++) {

      const cell = document.createElement("div")

      overlay.appendChild(cell)

    }

    cells = overlay.querySelectorAll("div")

  }

  function animateEntry() {

    if (typeof gsap === "undefined") return

    gsap.set(cells, {
      scaleY: 1
    })

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

  const initialConfig = getGridConfig(window.innerWidth)

  buildGrid(initialConfig.rows, initialConfig.cols)

  requestAnimationFrame(() => {

    animateEntry()

  })

  window.addEventListener("resize", () => {

    const newConfig = getGridConfig(window.innerWidth)

    const currentCells = overlay.children.length

    const expectedCells = newConfig.rows * newConfig.cols

    if (currentCells !== expectedCells) {

      buildGrid(newConfig.rows, newConfig.cols)

    }

  })

})