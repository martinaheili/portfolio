document.addEventListener("DOMContentLoaded", () => {

const greeting =
document.querySelector(".contact-greeting");

const subtext =
document.querySelector(".contact-subtext");

const clock =
document.querySelector(".static-clock-container");

const profile =
document.querySelector(".editable-wrapper");


const mm = gsap.matchMedia();


/*
DESKTOP timeline original
*/

mm.add("(min-width: 821px)", () => {

const tl = gsap.timeline({
defaults:{ease:"power3.out"}
});

tl.from(greeting,{
y:50,
opacity:0,
duration:0.8
});

tl.from(subtext,{
y:50,
opacity:0,
duration:0.8
},"+=0.3");

tl.from(profile,{
y:30,
opacity:0,
scale:0.8,
duration:0.8
},"+=0.3");

});


/*
MOBILE timeline nuevo
*/

mm.add("(max-width: 820px)", () => {

  const tl = gsap.timeline({
    defaults: {ease:"power3.out"}
  });

  // 1️⃣ Greeting + subtext
  tl.from([greeting, subtext], {
    y:40,
    opacity:0,
    duration:0.9,
    stagger:0.08
  });

  // 2️⃣ Reloj
  tl.from(clock, {
    y:40,
    opacity:0,
    scale:0.95,
    duration:0.8
  }, "+=0.2"); // pequeño delay tras el texto

  // 3️⃣ Foto
  tl.from(profile, {
    y:30,
    opacity:0,
    scale:0.8,
    duration:0.8
  }, "+=0.8"); // pequeño delay tras el reloj

});

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




// ============================================
// MANEJO DE FORMULARIOS (Desktop y Móvil)
// ============================================

// Función para mostrar el mensaje de éxito en la columna derecha (desktop)
function showSuccessMessage() {
  const rightCol = document.querySelector('.column.right');
  if (rightCol) {
    rightCol.innerHTML = `
      <div class="contact-success">
        <img src="media/sticker.png" class="success-sticker" alt="Éxito">
        <p class="success-text">¡Muchas gracias por tu mensaje!</p>
        <p class="success-subtext">Ya estamos en contacto ;)</p>
      </div>
    `;
  }
}

// Función para mostrar el mensaje de éxito en el contenedor móvil
function showMobileSuccessMessage() {
  const mobileFormWrapper = document.querySelector('.mobile-form-wrapper');
  if (mobileFormWrapper) {
    mobileFormWrapper.innerHTML = `
      <div class="contact-success">
        <img src="media/sticker.png" class="success-sticker" alt="Éxito">
        <p class="success-text">¡Muchas gracias por tu mensaje!</p>
        <p class="success-subtext">Ya estamos en contacto ;)</p>
      </div>
    `;
  }
}

// Función genérica para enviar el formulario
async function submitForm(form, isMobile = false) {
  const data = new FormData(form);
  const action = form.action;

  try {
    const response = await fetch(action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      if (isMobile) {
        showMobileSuccessMessage();
      } else {
        showSuccessMessage();
      }
    } else {
      alert('Ocurrió un error, intenta nuevamente.');
    }
  } catch (error) {
    alert('Ocurrió un error de red, intenta nuevamente.');
  }
}

// Manejar el formulario de desktop
const desktopForm = document.getElementById('contactForm');
if (desktopForm) {
  desktopForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await submitForm(desktopForm, false);
  });
}

// Manejar el formulario móvil
const mobileForm = document.getElementById('contactFormMobile');
if (mobileForm) {
  mobileForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await submitForm(mobileForm, true);
  });
}