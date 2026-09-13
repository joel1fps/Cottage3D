<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Search, X } from '@lucide/vue'
import { AnimatePresence, LayoutGroup, motion } from 'motion-v'
import ProductCard from '../components/ProductCard.vue'
import RevealOnScroll from '../components/RevealOnScroll.vue'
import AnimatedNumber from '../components/AnimatedNumber.vue'
import { categories, products } from '../data/products'

const route = useRoute()
const router = useRouter()
const activeCategory = ref(categories.includes(route.query.categoria) ? route.query.categoria : 'Todos')
const search = ref('')

watch(
  () => route.query.categoria,
  (category) => {
    activeCategory.value = categories.includes(category) ? category : 'Todos'
  }
)

function selectCategory(category) {
  activeCategory.value = category
  const query = { ...route.query }
  if (category === 'Todos') delete query.categoria
  else query.categoria = category
  router.replace({ query })
}

const filteredProducts = computed(() => {
  const term = search.value.trim().toLocaleLowerCase('pt-BR')
  return products.filter((product) => {
    const matchesCategory = activeCategory.value === 'Todos' || product.category === activeCategory.value
    const matchesSearch = !term || `${product.name} ${product.category}`.toLocaleLowerCase('pt-BR').includes(term)
    return matchesCategory && matchesSearch
  })
})
</script>

<template>
  <section class="page-hero compact-page-hero">
    <div class="container">
      <RevealOnScroll :distance="18">
        <p class="eyebrow">Catálogo Cottage 3D</p>
        <h1>Peças reais.<br /><span>Sem catálogo genérico.</span></h1>
        <p class="page-lead">Explore os produtos apresentados pela Cottage 3D e adicione os que interessam ao seu orçamento.</p>
      </RevealOnScroll>
    </div>
  </section>

  <section class="catalog-section section-pad">
    <div class="container">
      <RevealOnScroll :distance="20">
        <div class="catalog-toolbar">
          <div class="search-box">
            <Search :size="18" />
            <input v-model="search" type="search" placeholder="Buscar no catálogo" aria-label="Buscar no catálogo" />
            <button v-if="search" type="button" aria-label="Limpar busca" @click="search = ''"><X :size="17" /></button>
          </div>
          <LayoutGroup id="catalog-filters">
            <div class="filter-pills" aria-label="Filtrar por categoria">
              <button
                v-for="category in categories"
                :key="category"
                type="button"
                :class="{ active: activeCategory === category }"
                @click="selectCategory(category)"
              >
                <motion.span
                  v-if="activeCategory === category"
                  layoutId="active-catalog-filter"
                  class="filter-active-bg"
                  :transition="{ type: 'spring', stiffness: 430, damping: 34 }"
                />
                <span class="filter-label">{{ category }}</span>
              </button>
            </div>
          </LayoutGroup>
        </div>
      </RevealOnScroll>

      <div class="catalog-meta">
        <span><AnimatedNumber :value="filteredProducts.length" /> {{ filteredProducts.length === 1 ? 'peça' : 'peças' }}</span>
        <span>Valores sob consulta</span>
      </div>

      <LayoutGroup id="catalog-products">
        <motion.div layout class="catalog-results-wrap" :style="{ position: 'relative' }">
          <motion.div layout class="product-grid" :style="{ position: 'relative' }">
            <AnimatePresence mode="popLayout" :initial="false">
              <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            <motion.div
              v-if="!filteredProducts.length"
              key="empty-state"
              layout
              class="empty-state"
              :initial="{ opacity: 0, y: 12 }"
              :animate="{ opacity: 1, y: 0 }"
              :exit="{ opacity: 0, y: -8 }"
            >
              <strong>Nenhuma peça encontrada.</strong>
              <p>Tente outro termo ou categoria.</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </div>
  </section>
</template>
