<script setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Menu, X, Search, ShoppingBag, ChevronDown, ArrowRight } from '@lucide/vue'
import { AnimatePresence, motion } from 'motion-v'
import logo from '../assets/cottage3d-logo.png'
import { useQuoteStore } from '../stores/quote'
import AnimatedNumber from './AnimatedNumber.vue'
import { products } from '../data/products'

const open = ref(false)
const menuButton = ref(null)
const mobileNav = ref(null)
function handleEscape(event) {
  if (event.key === 'Escape' && open.value) {
    open.value = false
    menuButton.value?.focus()
  }
}
function handleOutside(event) {
  if (open.value && !event.target.closest('.site-header')) open.value = false
}
function handleResize() { if (window.innerWidth > 980) closeMenus() }
onMounted(() => {
  document.addEventListener('keydown', handleEscape)
  document.addEventListener('pointerdown', handleOutside)
  window.addEventListener('resize', handleResize)
})
onBeforeUnmount(() => {
  window.clearTimeout(closeTimer)
  document.removeEventListener('keydown', handleEscape)
  document.removeEventListener('pointerdown', handleOutside)
  window.removeEventListener('resize', handleResize)
})
watch(open, async (value) => {
  if (value) {
    megaOpen.value = false
    await nextTick()
    mobileNav.value?.querySelector('a')?.focus({ preventScroll: true })
  }
})
const megaOpen = ref(false)
let closeTimer

const route = useRoute()
const quote = useQuoteStore()
watch(() => route.fullPath, closeMenus)

const links = [
  ['Personalizados', '/personalizados'],
  ['Sobre', '/sobre'],
  ['Contato', '/contato'],
]

const featured = products.find((product) => product.id === 'charizard')

function openMega() {
  window.clearTimeout(closeTimer)
  megaOpen.value = true
}

function scheduleCloseMega() {
  closeTimer = window.setTimeout(() => {
    megaOpen.value = false
  }, 140)
}

function closeMenus() {
  open.value = false
  megaOpen.value = false
}
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <a href="/" class="brand" aria-label="Cottage 3D — recarregar início" @click="closeMenus">
        <img :src="logo" alt="Cottage 3D" class="brand-logo" />
        <span class="brand-wordmark">COTTAGE 3D</span>
      </a>

      <nav class="desktop-nav" aria-label="Principal">
        <div class="catalog-nav-trigger" @mouseenter="openMega" @mouseleave="scheduleCloseMega">
          <RouterLink
            to="/catalogo"
            :class="{ active: route.path.startsWith('/catalogo') }"
            @focus="openMega"
            @click="megaOpen = false"
          >
            Catálogo <ChevronDown :size="14" :class="['nav-chevron', { rotated: megaOpen }]" />
          </RouterLink>
        </div>

        <RouterLink
          v-for="([label, href]) in links"
          :key="href"
          :to="href"
          :class="{ active: route.path.startsWith(href) }"
          @mouseenter="megaOpen = false"
        >
          {{ label }}
        </RouterLink>
      </nav>

      <div class="header-actions">
        <RouterLink to="/catalogo" class="icon-button desktop-only" aria-label="Buscar no catálogo" @mouseenter="megaOpen = false">
          <Search :size="18" />
        </RouterLink>
        <RouterLink to="/orcamento" class="quote-button" aria-label="Abrir orçamento" @mouseenter="megaOpen = false">
          <ShoppingBag :size="18" />
          <span class="desktop-only">Orçamento</span>
          <span v-if="quote.totalItems" class="quote-count"><AnimatedNumber :value="quote.totalItems" /></span>
        </RouterLink>
        <button ref="menuButton" class="menu-button" type="button" :aria-expanded="open" :aria-label="open ? 'Fechar menu' : 'Abrir menu'" aria-controls="mobile-navigation" @click="open = !open">
          <X v-if="open" :size="24" />
          <Menu v-else :size="24" />
        </button>
      </div>
    </div>

    <AnimatePresence>
      <motion.div
        v-if="megaOpen"
        key="mega-menu"
        class="mega-menu-wrap desktop-only"
        :initial="{ opacity: 0, y: -10, clipPath: 'inset(0 0 100% 0)' }"
        :animate="{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }"
        :exit="{ opacity: 0, y: -8, clipPath: 'inset(0 0 100% 0)' }"
        :transition="{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }"
        @mouseenter="openMega"
        @mouseleave="scheduleCloseMega"
      >
        <div class="container mega-menu">
          <div class="mega-column mega-intro">
            <span class="mega-label">CATÁLOGO</span>
            <h3>Explore o que já saiu da tela.</h3>
            <p>Peças reais da Cottage 3D, organizadas para você encontrar rápido e pedir orçamento pelo WhatsApp.</p>
            <RouterLink to="/catalogo" class="mega-all" @click="closeMenus">Ver catálogo completo <ArrowRight :size="16" /></RouterLink>
          </div>

          <div class="mega-column">
            <span class="mega-label">CATEGORIAS</span>
            <RouterLink to="/catalogo?categoria=Colecionáveis" @click="closeMenus">Colecionáveis <span>→</span></RouterLink>
            <RouterLink to="/catalogo?categoria=Personalizados" @click="closeMenus">Personalizados <span>→</span></RouterLink>
            <RouterLink to="/catalogo?categoria=Chaveiros" @click="closeMenus">Chaveiros <span>→</span></RouterLink>
          </div>

          <div class="mega-column">
            <span class="mega-label">POR ONDE COMEÇAR</span>
            <RouterLink to="/personalizados" @click="closeMenus">Criar peça sob medida <span>→</span></RouterLink>
            <RouterLink to="/orcamento" @click="closeMenus">Montar orçamento <span>→</span></RouterLink>
            <RouterLink to="/contato" @click="closeMenus">Falar com a Cottage 3D <span>→</span></RouterLink>
          </div>

          <RouterLink :to="`/produto/${featured.slug}`" class="mega-featured" @click="closeMenus">
            <img :src="featured.image" :alt="featured.name" />
            <div>
              <span>EM DESTAQUE</span>
              <strong>{{ featured.name }}</strong>
            </div>
          </RouterLink>
        </div>
      </motion.div>
    </AnimatePresence>

    <transition name="menu-fade">
      <div v-if="open" id="mobile-navigation" class="mobile-nav-wrap">
        <nav ref="mobileNav" class="container mobile-nav" aria-label="Menu móvel">
          <RouterLink to="/catalogo" @click="open = false">Catálogo</RouterLink>
          <RouterLink v-for="([label, href]) in links" :key="href" :to="href" @click="open = false">
            {{ label }}
          </RouterLink>
          <RouterLink to="/orcamento" @click="open = false">Orçamento</RouterLink>
        </nav>
      </div>
    </transition>
  </header>
</template>
