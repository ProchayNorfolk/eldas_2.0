export function initMenu() {
  const header = document.querySelector('.header');

  if (!header) return;

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
}

/* ==================== mobile menu ==================== */

/* ================== end mobile menu ================== */