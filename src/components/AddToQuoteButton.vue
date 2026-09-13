<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { ShoppingBag, Check } from '@lucide/vue'
import { useQuoteStore } from '../stores/quote'

const props = defineProps({ product: { type: Object, required: true } })
const quote = useQuoteStore()
const busy = ref(false)
const added = ref(false)
const quantity = computed(() => quote.items.find(item => item.id === props.product.id)?.quantity || 0)
let resetTimer, flyingImage, flight

async function add(event) {
  if (busy.value) return
  busy.value = true
  added.value = false
  clearTimeout(resetTimer)
  // Commit immediately: navigation or interrupted motion must never lose the item.
  quote.add(props.product)
  const basket = document.querySelector('.site-header .quote-button')
  const source = event.currentTarget.closest('.product-card')?.querySelector('.product-media img')
  try {
    if (basket && source && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const from = source.getBoundingClientRect()
      const to = basket.getBoundingClientRect()
      const sx = from.left + from.width / 2, sy = Math.max(80, Math.min(innerHeight - 80, from.top + from.height / 2))
      const dx = to.left + to.width / 2 - sx, dy = to.top + to.height / 2 - sy
      flyingImage = document.createElement('img')
      flyingImage.src = props.product.image
      flyingImage.className = 'quote-flying-product'
      flyingImage.alt = ''
      flyingImage.setAttribute('aria-hidden', 'true')
      flyingImage.style.left = `${sx - 40}px`
      flyingImage.style.top = `${sy - 40}px`
      document.body.appendChild(flyingImage)
      const frames = Array.from({ length: 31 }, (_, index) => {
        const t = index / 30
        return { transform: `translate(${dx * t}px, ${dy * t - Math.sin(Math.PI * t) * Math.min(180, Math.abs(dx) * .3 + 60)}px) scale(${1 - t * .75}) rotate(${t * 18}deg)`, opacity: t < .85 ? 1 : (1 - t) / .15, offset: t }
      })
      flight = flyingImage.animate(frames, { duration: 650, easing: 'cubic-bezier(.4,0,.7,1)', fill: 'forwards' })
      await flight.finished
      basket.animate([{ transform: 'scale(1)' }, { transform: 'scale(.88) rotate(-5deg)' }, { transform: 'scale(1.12) rotate(3deg)' }, { transform: 'scale(1)' }], { duration: 420 })
    }
  } catch { /* Cancelling the visual flight does not undo the addition. */ }
  finally {
    flyingImage?.remove()
    flyingImage = null
    busy.value = false
    added.value = true
    resetTimer = window.setTimeout(() => { added.value = false }, 1600)
  }
}
onBeforeUnmount(() => { clearTimeout(resetTimer); flight?.cancel(); flyingImage?.remove() })
</script>

<template>
  <button type="button" class="basket-add-button" :class="{ added }" :disabled="busy" :aria-label="`Adicionar ${product.name} ao orçamento`" @click="add">
    <Check v-if="added" :size="18" aria-hidden="true" />
    <ShoppingBag v-else :size="18" aria-hidden="true" />
    <span aria-live="polite">{{ busy ? 'Enviando…' : added ? 'Adicionado' : 'Adicionar ao orçamento' }}</span>
    <span v-if="quantity" class="basket-button-count" :aria-label="`${quantity} no orçamento`">{{ quantity }}</span>
  </button>
</template>
