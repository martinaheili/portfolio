// Contact page - interactividad para la foto editable
document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector('.editable-wrapper');
  if (!wrapper) return;
  
  const image = wrapper.querySelector('.editable-photo');
  
  // Configuración inicial: asegurar tamaño correcto
  const initSize = () => {
    if (!wrapper.style.width || wrapper.style.width === '200px') {
      wrapper.style.width = image.offsetWidth + 'px';
      wrapper.style.height = image.offsetHeight + 'px';
    }
    image.style.width = '100%';
    image.style.height = '100%';
  };
  
  // Esperar a que cargue la imagen
  if (image.complete) {
    initSize();
  } else {
    image.addEventListener('load', initSize);
  }
  
  // Resize con interact.js - CORREGIDO para handles derechas
  interact('.editable-wrapper').resizable({
    edges: {
      top: '.tl',
      left: '.tl',
      bottom: '.bl',
      right: '.tr',
      topLeft: '.tl',
      topRight: '.tr',
      bottomLeft: '.bl',
      bottomRight: '.br'
    },
    
    listeners: {
      move(event) {
        let target = event.target;
        let img = target.querySelector('.editable-photo');
        
        // Añadir clase para pausar animación
        target.classList.add('resizing');
        
        let x = parseFloat(target.getAttribute('data-x')) || 0;
        let y = parseFloat(target.getAttribute('data-y')) || 0;
        
        let newWidth = event.rect.width;
        let newHeight = event.rect.height;
        
        // Limitar tamaño mínimo
        newWidth = Math.max(newWidth, 50);
        newHeight = Math.max(newHeight, 50);
        
        target.style.width = newWidth + 'px';
        target.style.height = newHeight + 'px';
        
        // Ajustar posición según qué borde se está moviendo
        if (event.edges.left) {
          x += event.deltaRect.left;
        }
        if (event.edges.top) {
          y += event.deltaRect.top;
        }
        
        target.style.transform = `translate(${x}px, ${y}px)`;
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
        
        img.style.width = '100%';
        img.style.height = '100%';
      },
      
      end(event) {
        event.target.classList.remove('resizing');
      }
    }
  });
  
  // Drag con interact.js
  interact('.editable-wrapper').draggable({
    listeners: {
      move(event) {
        let target = event.target;
        target.classList.add('dragging');
        
        let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
        let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
        
        target.style.transform = `translate(${x}px, ${y}px)`;
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
      },
      
      end(event) {
        event.target.classList.remove('dragging');
      }
    }
  });
});

// Formulario
const form = document.getElementById('contactForm');
if (form) {
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
      } else {
        alert('Ocurrió un error, intenta nuevamente.');
      }
    } catch (error) {
      alert('Ocurrió un error de red, intenta nuevamente.');
    }
  });
}