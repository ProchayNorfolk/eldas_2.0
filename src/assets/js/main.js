import '../scss/style.scss'

/* ================== Handlebars ================== */
import Handlebars from 'handlebars'
/* ================== PARTIALS ================== */
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

/* ================== LAYOUT ================== */
import layout from '/src/templates/layouts/main.hbs?raw'

const layoutTemplate = Handlebars.compile(layout)

/* ================== PAGES ================== */
const pages = import.meta.glob(
  '/src/templates/pages/**/*.hbs',
  {
    query: '?raw',
    import: 'default',
    eager: true
  }
)

/* ================== ROUTING ================== */
const rawPath = window.location.pathname
const path = rawPath.replace(/\/$/, '')
let pageName = path.replace('/', '') || 'index'

// if (path === '/about') pageName = 'about'
// if (path === '/portfolio') pageName = 'portfolio'
// if (path === '/pages') pageName = 'pages'
// if (path === '/blog') pageName = 'blog'
// if (path === '/contact') pageName = 'contact'

// шукаємо сторінку
const pageEntry = Object.entries(pages).find(([key]) =>
  key.endsWith(`${pageName}.hbs`)
)

const page = pageEntry ? pageEntry[1] : null

/* ================== RENDER ================== */
if (!page) {
  console.error('❌ Page not found:', pageName)
} else {
  const pageTemplate = Handlebars.compile(page)
  const pageHTML = pageTemplate({})

  const finalHTML = layoutTemplate({
    body: pageHTML
  })

  document.querySelector('#app').innerHTML = finalHTML
}
/* ================== end Handlebars ================== */

/* ================== підключення menu.js slider.js tabs.js ================== */
import { initMenu } from './menu/menu.js';
// import { initSlider } from './slider/slider.js';
// import { initTabs } from './tabs/tabs.js';


document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  // initSlider();
  // initTabs();
  
});
/* ================== end підключення ================== */












