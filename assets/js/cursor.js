export function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  
  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  }, { passive: true });

  const render = () => {
    ringX += (mouseX - ringX) * 0.1;
    ringY += (mouseY - ringY) * 0.1;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);

  document.querySelectorAll('[data-magnetic]').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const pullX = (mouseX - centerX) * 0.2;
      const pullY = (mouseY - centerY) * 0.2;
      gsap.to(el, { x: pullX, y: pullY, duration: 0.3 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'power2.out' });
    });
  });

  const hoverElements = document.querySelectorAll('a, button, .skill-card, .project-card, [data-magnetic]');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.classList.add('hovering');
      gsap.to(dot, { scale: 0, duration: 0.2 });
    });
    el.addEventListener('mouseleave', () => {
      ring.classList.remove('hovering');
      gsap.to(dot, { scale: 1, duration: 0.2 });
    });
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = 0;
    ring.style.opacity = 0;
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = 1;
    ring.style.opacity = 1;
  });

  window.addEventListener('mousedown', () => {
    gsap.to(dot, { scale: 0.5, duration: 0.1 });
  });
  window.addEventListener('mouseup', () => {
    gsap.to(dot, { scale: 1, duration: 0.1 });
  });
}
