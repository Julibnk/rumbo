/**
 * Scroll-triggered animations usando Intersection Observer
 * Respeta prefers-reduced-motion
 */

export function initScrollAnimations() {
  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    // Si el usuario prefiere menos movimiento, mostrar todo inmediatamente
    document.querySelectorAll('.scroll-animate').forEach((el) => {
      el.classList.add('animate-in');
    });
    return;
  }

  // Configurar Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  // Observar todos los elementos con clase .scroll-animate
  document.querySelectorAll('.scroll-animate').forEach((el) => {
    observer.observe(el);
  });
}

// Auto-init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
  initScrollAnimations();
}
