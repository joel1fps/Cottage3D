import { createRouter, createWebHistory } from 'vue-router'
import { coverWithPixels, revealPixelCurtain } from '../utils/pixelCurtain'

const HomePage = () => import('../pages/HomePage.vue')
const CatalogPage = () => import('../pages/CatalogPage.vue')
const ProductPage = () => import('../pages/ProductPage.vue')
const CustomPage = () => import('../pages/CustomPage.vue')
const AboutPage = () => import('../pages/AboutPage.vue')
const ContactPage = () => import('../pages/ContactPage.vue')
const QuotePage = () => import('../pages/QuotePage.vue')
const NotFoundPage = () => import('../pages/NotFoundPage.vue')

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/catalogo', name: 'catalog', component: CatalogPage },
    { path: '/produto/:slug', name: 'product', component: ProductPage },
    { path: '/personalizados', name: 'custom', component: CustomPage },
    { path: '/sobre', name: 'about', component: AboutPage },
    { path: '/contato', name: 'contact', component: ContactPage },
    { path: '/orcamento', name: 'quote', component: QuotePage },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage },
  ],
})

const navigationOrder = ['/', '/catalogo', '/personalizados', '/sobre', '/contato']

router.beforeEach(async (to, from) => {
  const toIndex = navigationOrder.indexOf(to.path)
  const fromIndex = navigationOrder.indexOf(from.path)

  if (toIndex !== -1 && fromIndex !== -1 && toIndex !== fromIndex) {
    to.meta.transition = toIndex > fromIndex ? 'page-next' : 'page-prev'
  } else {
    to.meta.transition = 'page-soft'
  }

  // The initial page load uses the dedicated loading overlay. Pixel curtains
  // are reserved for real page changes, not search/filter query updates.
  if (from.name && to.path !== from.path) {
    await coverWithPixels()
  }
})

router.afterEach((to) => {
  const names = {
    home: 'Cottage 3D | Impressões 3D',
    catalog: 'Catálogo | Cottage 3D',
    custom: 'Personalizados | Cottage 3D',
    about: 'Sobre | Cottage 3D',
    contact: 'Contato | Cottage 3D',
    quote: 'Orçamento | Cottage 3D',
    'not-found': 'Página não encontrada | Cottage 3D',
  }
  document.title = names[to.name] ?? 'Cottage 3D | Impressões 3D'

  requestAnimationFrame(() => {
    revealPixelCurtain()
  })
})


router.onError(() => {
  revealPixelCurtain()
})

export default router
