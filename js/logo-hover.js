document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('mrtna-logo-container');
  const svg = container.querySelector('svg');
  if (!svg) return;

  const HOVER_PADDING = 20;
  const letterGroups = Array.from(svg.children).filter(child =>
    child.tagName === 'g' && child.id !== 'defs'
  );

  // Preparar todas las letras
  const letters = [];
  letterGroups.forEach(group => {
    let defaultEl = group.querySelector('[id*="default"]');
    let altEl = group.querySelector('[id*="alt"]');
    if (!altEl) altEl = group.querySelector('.st2');
    if (!defaultEl || !altEl) return;

    defaultEl.style.display = '';
    altEl.style.display = 'none';

    // Bounding box y rectángulo para hover
    let bBox;
    try { bBox = group.getBBox(); } catch(e) { return; }

    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', bBox.x - HOVER_PADDING);
    rect.setAttribute('y', bBox.y - HOVER_PADDING);
    rect.setAttribute('width', bBox.width + HOVER_PADDING * 2);
    rect.setAttribute('height', bBox.height + HOVER_PADDING * 2);
    rect.setAttribute('fill', 'transparent');
    rect.setAttribute('stroke', 'none');
    rect.setAttribute('pointer-events', 'visible');
    rect.setAttribute('class', 'hover-area');
    group.insertBefore(rect, group.firstChild);

    const allPaths = group.querySelectorAll('path, g');
    allPaths.forEach(el => el.setAttribute('pointer-events', 'none'));

    // Hover desktop
    rect.addEventListener('mouseenter', () => {
      defaultEl.style.display = 'none';
      altEl.style.display = '';
    });
    rect.addEventListener('mouseleave', () => {
      defaultEl.style.display = '';
      altEl.style.display = 'none';
    });

    letters.push({ defaultEl, altEl });
  });

  // Loop “pseudo-random” para mobile
  if (window.matchMedia('(hover: none)').matches && letters.length) {
    // Orden fijo que parezca aleatorio
    const order = letters.map((_, i) => i).sort(() => Math.random() - 0.5);
    let current = 0;

    const interval = 1000; // cambiar cada 2s
    const loop = () => {
      // Reset todas las letras antes de cambiar la actual
      letters.forEach(({ defaultEl, altEl }) => {
        defaultEl.style.display = '';
        altEl.style.display = 'none';
      });

      const { defaultEl, altEl } = letters[order[current]];
      defaultEl.style.display = 'none';
      altEl.style.display = '';

      current = (current + 1) % letters.length;
      setTimeout(loop, interval);
    };
    setTimeout(loop, interval);
  }
});