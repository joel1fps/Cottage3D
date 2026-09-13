<script setup>
import { ShoppingBag, ArrowRight } from '@lucide/vue'
import { useQuoteStore } from '../stores/quote'
import AnimatedNumber from './AnimatedNumber.vue'

const quote = useQuoteStore()
</script>

<template>
  <transition name="dock">
    <RouterLink v-if="quote.totalItems" to="/orcamento" class="quote-dock" data-cursor="ORÇAR">
      <span class="quote-dock-icon"><ShoppingBag :size="19" /></span>
      <span>
        <strong><AnimatedNumber :value="quote.totalItems" /> {{ quote.totalItems === 1 ? 'item' : 'itens' }}</strong>
        <small>finalizar no WhatsApp</small>
      </span>
      <ArrowRight :size="18" />
    </RouterLink>
  </transition>
</template>
