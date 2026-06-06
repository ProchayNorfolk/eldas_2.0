import '../scss/style.scss'

/* ==================================================
   HANDELBARS
================================================== */
import Handlebars from 'handlebars'

/* ==================================================
   PARTIALS
================================================== */
const partials = import.meta.glob(
  '/src/templates/partials/**/*.hbs',
  {
    query: '?raw',
    import: 'default',
    eager: true
  }
)

Object.entries(partials).forEach(([path, content]) => {
  const name = path.split('/').pop().replace('.hbs', '')
  Handlebars.registerPartial(name, content)
})

/* ==================================================
   MAIN LAYOUT
================================================== */
import layout from '/src/templates/layouts/main.hbs?raw'

const layoutTemplate = Handlebars.compile(layout)

/* ==================================================
   PAGES
================================================== */
const pages = import.meta.glob(
  '/src/templates/pages/**/*.hbs',
  {
    query: '?raw',
    import: 'default',
    eager: true
  }
)

/* ==================================================
   COMPONENTS
================================================== */
import { initMenu } from './menu/menu.js'
// import { initSlider } from './slider/slider.js'
// import { initTabs } from './tabs/tabs.js'

/* ==================================================
   ROUTER
   Визначаємо поточну сторінку по URL
================================================== */
function renderPage() {
  const rawPath = window.location.pathname

  const path = rawPath
    .replace('/eldas_2.0', '')
    .replace(/\/$/, '')

  let pageName

  if (
    path === '' ||
    path === '/' ||
    path === '/index.html'
  ) {
    pageName = 'index'
  } else {
    pageName = path.replace('/', '')
  }

  console.log({
    rawPath,
    path,
    pageName
  })

  /* ================================================
     ПОШУК ПОТРІБНОЇ СТОРІНКИ
  ================================================ */
  const pageEntry = Object.entries(pages).find(([key]) =>
    key.endsWith(`${pageName}.hbs`)
  )

  const page = pageEntry ? pageEntry[1] : null

  if (!page) {
    console.error('❌ Page not found:', pageName)
    return
  }

  /* ================================================
     КОМПІЛЯЦІЯ СТОРІНКИ
  ================================================ */
  const pageTemplate = Handlebars.compile(page)
  const pageHTML = pageTemplate({})

  /* ================================================
     ВСТАВКА СТОРІНКИ В MAIN LAYOUT
  ================================================ */
  const finalHTML = layoutTemplate({
    body: pageHTML
  })

  document.querySelector('#app').innerHTML = finalHTML

  /* ================================================
     ІНІЦІАЛІЗАЦІЯ КОМПОНЕНТІВ ПІСЛЯ РЕНДЕРУ
  ================================================ */
  initMenu()

  // initSlider()
  // initTabs()
}

/* ==================================================
   ПЕРШИЙ РЕНДЕР
================================================== */
renderPage()

/* ==================================================
   SPA НАВІГАЦІЯ
   Спрацьовує після history.pushState()
================================================== */
window.addEventListener('spa:navigate', () => {
  renderPage()
})

/* ==================================================
   КНОПКИ БРАУЗЕРА
   Назад / Вперед
================================================== */
window.addEventListener('popstate', () => {
  renderPage()
})