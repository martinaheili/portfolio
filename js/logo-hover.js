
  document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('mrtna-logo-container');
    const svg = container.querySelector('svg');
    if (!svg) return;

    // Configuración: padding extra alrededor de cada letra (en píxeles)
    const HOVER_PADDING = 20;

    // Seleccionar todos los grupos de letras (hijos directos del SVG que no sean defs)
    const letterGroups = Array.from(svg.children).filter(child => 
      child.tagName === 'g' && child.id !== 'defs'
    );

    letterGroups.forEach(group => {
      // Buscar default y alt
      let defaultEl = group.querySelector('[id*="default"]');
      let altEl = group.querySelector('[id*="alt"]');
      if (!altEl) altEl = group.querySelector('.st2');
      if (!defaultEl || !altEl) return;

      // Estado inicial: default visible, alt oculto
      defaultEl.style.display = '';
      altEl.style.display = 'none';

      // Calcular el bounding box de TODOS los elementos dentro del grupo (letra)
      // Esto nos da el área real que ocupa la letra
      let bBox;
      try {
        bBox = group.getBBox();
      } catch(e) {
        // Si falla (por ejemplo, elementos sin geometría), lo ignoramos
        return;
      }

      // Crear un rectángulo transparente que envuelva la letra + padding
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', bBox.x - HOVER_PADDING);
      rect.setAttribute('y', bBox.y - HOVER_PADDING);
      rect.setAttribute('width', bBox.width + HOVER_PADDING * 2);
      rect.setAttribute('height', bBox.height + HOVER_PADDING * 2);
      rect.setAttribute('fill', 'transparent');
      rect.setAttribute('stroke', 'none');
      rect.setAttribute('pointer-events', 'visible');
      rect.setAttribute('class', 'hover-area');

      // Insertar el rectángulo DETRÁS de la letra (primer hijo)
      group.insertBefore(rect, group.firstChild);

      // Hacer que los elementos originales no capturen eventos (para que el rect sea el único)
      const allPaths = group.querySelectorAll('path, g');
      allPaths.forEach(el => {
        el.setAttribute('pointer-events', 'none');
      });

      // Asignar eventos hover al rectángulo
      rect.addEventListener('mouseenter', () => {
        defaultEl.style.display = 'none';
        altEl.style.display = '';
      });
      rect.addEventListener('mouseleave', () => {
        defaultEl.style.display = '';
        altEl.style.display = 'none';
      });
    });
  });
