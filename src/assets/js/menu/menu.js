export function initMenu(
  
) {
  /* ==================== header scroll ==================== */

  const header = document.querySelector('.header');

  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  /* ==================== active link menu ==================== */

  const links = document.querySelectorAll('.nav-link');

  const currentPath =
    window.location.pathname
      .replace('/eldas_2.0', '')
      .replace(/\/$/, '') || '/';

  links.forEach(link => {
    const linkPath = link
    .getAttribute('href')
    .replace('/eldas_2.0', '')

    if (linkPath === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

document.addEventListener('click', e => {
  const link = e.target.closest('[data-link]')

  if (!link) return

  e.preventDefault()

  const url = link.getAttribute('href')

  history.pushState({}, '', url)

  window.location.reload()
})