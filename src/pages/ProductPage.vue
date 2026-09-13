<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Minus, Plus, ShoppingBag } from '@lucide/vue'
import WhatsAppIcon from '../components/WhatsAppIcon.vue'
import AnimatedNumber from '../components/AnimatedNumber.vue'
import { products } from '../data/products'
import { useQuoteStore } from '../stores/quote'
import { getWhatsAppUrl } from '../utils/whatsapp'

const route = useRoute()
const router = useRouter()
const quote = useQuoteStore()
const quantity = ref(1)
const selectedImage = ref('')

const product = computed(() => products.find((item) => item.slug === route.params.slug))
const productImages = computed(() => product.value?.images?.length ? product.value.images : product.value ? [product.value.image] : [])

const whatsappMessage = computed(() => {
  if (!product.value) return ''
  return [
    'Olá, Cottage 3D! 👋',
    `Tenho interesse em *${product.value.name}*.`,
    `Quantidade: ${quantity.value}`,
    '',
    'Podem me informar o valor, disponibilidade, opções e prazo de produção?',
  ].join('\n')
})

const whatsappUrl = computed(() => getWhatsAppUrl(whatsappMessage.value))

watch(product, (value) => {
  if (!value) {
    router.replace('/catalogo')
    return
  }
  quantity.value = 1
  selectedImage.value = value.images?.[0] || value.image
  document.title = `${value.name} | Cottage 3D`
}, { immediate: true })

function addToQuote() {
  if (!product.value) return
  quote.add(product.value, quantity.value)
}
</script>

<template>
  <section v-if="product" class="product-page section-pad">
    <div class="container">
      <RouterLink to="/catalogo" class="back-link"><ArrowLeft :size="17" /> Voltar ao catálogo</RouterLink>
      <div class="product-detail-grid">
        <div class="product-detail-media">
          <div class="product-main-image" data-cursor="FOTO">
            <img :src="selectedImage" :alt="product.name" />
          </div>
          <div v-if="productImages.length > 1" class="product-thumbnails" aria-label="Galeria do produto">
            <button
              v-for="(image, index) in productImages"
              :key="image"
              type="button"
              :class="{ active: selectedImage === image }"
              :aria-label="`Ver foto ${index + 1} de ${product.name}`"
              @click="selectedImage = image"
            >
              <img :src="image" :alt="`${product.name} — foto ${index + 1}`" />
            </button>
          </div>
          <div class="media-caption">
            <span>COTTAGE 3D</span>
            <span>{{ product.category }}</span>
          </div>
        </div>

        <div class="product-detail-copy">
          <p class="eyebrow">{{ product.eyebrow }}</p>
          <h1>{{ product.name }}</h1>
          <div class="detail-price">{{ product.priceLabel }}</div>
          <p class="detail-description">{{ product.description }}</p>

          <div class="detail-specs">
            <div v-for="detail in product.details" :key="detail"><span></span>{{ detail }}</div>
          </div>

          <div class="quantity-row">
            <span>Quantidade</span>
            <div class="quantity-control">
              <button type="button" aria-label="Diminuir quantidade" @click="quantity = Math.max(1, quantity - 1)"><Minus :size="17" /></button>
              <strong><AnimatedNumber :value="quantity" /></strong>
              <button type="button" aria-label="Aumentar quantidade" @click="quantity++"><Plus :size="17" /></button>
            </div>
          </div>

          <a :href="whatsappUrl" class="button button-whatsapp detail-add" target="_blank" rel="noreferrer" data-cursor="PEDIR">
            <WhatsAppIcon :size="19" /> Pedir este item no WhatsApp
          </a>
          <button class="button button-ghost detail-instagram" type="button" @click="addToQuote">
            <ShoppingBag :size="18" /> Adicionar a um orçamento com mais itens
          </button>

          <p class="detail-note">O WhatsApp abre com o produto e a quantidade preenchidos. O valor final é confirmado no atendimento.</p>
        </div>
      </div>
    </div>
  </section>
</template>
