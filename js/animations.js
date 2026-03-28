document.addEventListener("DOMContentLoaded", () => {

  const greeting = document.querySelector(".contact-greeting");
  const subtext = document.querySelector(".contact-subtext");
  const profile = document.querySelector(".editable-wrapper");

  const tl = gsap.timeline({
    defaults: { ease: "power3.out" }
  });

  // primero saludo

  tl.from(greeting, {
    y: 50,
    opacity: 0,
    duration: 0.8
  });

  // luego frase

  tl.from(subtext, {
    y: 50,
    opacity: 0,
    duration: 0.8
  }, "+=0.3");

  // finalmente bloque imagen + handles estilo figma

  tl.from(profile, {
    y: 30,
    opacity: 0,
    scale: 0.8,
    duration: 0.8
  }, "+=0.8");

});





const wrapper = document.querySelector('.editable-wrapper')
const image = wrapper.querySelector('.editable-photo')

/*
sync inicial seguro
usa tamaño visible actual (no tamaño natural)
*/

window.addEventListener('load', () => {

  wrapper.style.height = image.offsetHeight + 'px'

})

/*
resize
*/

interact('.editable-wrapper').resizable({

  edges: {
    top: '.tl, .tr',
    left: '.tl, .bl',
    bottom: '.bl, .br',
    right: '.tr, .br'
  },

  listeners: {

    move(event) {

      let target = event.target
      let image = target.querySelector('.editable-photo')

      let x = parseFloat(target.getAttribute('data-x')) || 0
      let y = parseFloat(target.getAttribute('data-y')) || 0

      target.style.width = event.rect.width + 'px'
      target.style.height = event.rect.height + 'px'

      image.style.width = "100%"
      image.style.height = "100%"

      x += event.deltaRect.left
      y += event.deltaRect.top

      target.style.transform =
        `translate(${x}px, ${y}px)`

      target.setAttribute('data-x', x)
      target.setAttribute('data-y', y)

    }

  }

})

/*
drag tipo figma
*/

interact('.editable-wrapper').draggable({

  listeners: {

    move(event) {

      let target = event.target

      let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
      let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

      target.style.transform =
        `translate(${x}px, ${y}px)`

      target.setAttribute('data-x', x)
      target.setAttribute('data-y', y)

    }

  }

})




const form = document.getElementById('contactForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const action = form.action;

  try {
    const response = await fetch(action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      // Reemplaza el formulario por mensaje de éxito
      const rightCol = document.querySelector('.column.right');
      rightCol.innerHTML = `
        <div class="contact-success">
          <img src="media/sticker.png" class="success-sticker" alt="Éxito">
          <p class="success-text">¡Muchas gracias por tu mensaje!</p>
          <p class="success-subtext">Ya estamos en contacto ;)</p>
        </div>
      `;
    } else {
      alert('Ocurrió un error, intenta nuevamente.');
    }
  } catch (error) {
    alert('Ocurrió un error de red, intenta nuevamente.');
  }
});