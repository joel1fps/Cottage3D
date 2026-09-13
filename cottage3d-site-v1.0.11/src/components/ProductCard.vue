<script setup>
import AddToQuoteButton from './AddToQuoteButton.vue'
import { ArrowUpRight } from '@lucide/vue'
import { motion } from 'motion-v'

const props = defineProps({ product: { type: Object, required: true } })
</script>

<template>
  <motion.article
    class="product-card"
    layout
    :initial="{ opacity: 0, scale: 0.97, y: 14 }"
    :animate="{ opacity: 1, scale: 1, y: 0 }"
    :exit="{ opacity: 0, scale: 0.96, y: -8 }"
    :transition="{ layout: { duration: 0.42, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.24 }, scale: { duration: 0.3 }, y: { duration: 0.3 } }"
  >
    <RouterLink :to="`/produto/${product.slug}`" class="product-media" data-cursor="VER">
      <img :src="product.image" :alt="product.name" loading="lazy" />
      <span class="product-category">{{ product.category }}</span>
      <span class="media-arrow"><ArrowUpRight :size="19" /></span>
    </RouterLink>
    <div class="product-info">
      <div>
        <p class="product-eyebrow">{{ product.eyebrow }}</p>
        <RouterLink :to="`/produto/${product.slug}`" class="product-name">{{ product.name }}</RouterLink>
        <span class="product-price">{{ product.priceLabel }}</span>
      </div>
      <AddToQuoteButton :product="product" />
    </div>
  </motion.article>
</template>
