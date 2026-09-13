<script setup>
import { computed, ref } from 'vue'
import { Copy, Check, Minus, Plus, Trash2, ArrowRight } from '@lucide/vue'
import WhatsAppIcon from '../components/WhatsAppIcon.vue'
import { useQuoteStore } from '../stores/quote'
import { getWhatsAppUrl } from '../utils/whatsapp'

const quote = useQuoteStore()
const customer = ref({ name: '', notes: '' })
const copied = ref(false)

const message = computed(() => {
  const lines = [
    'Olá, Cottage 3D!',
    'Quero solicitar um orçamento para os itens abaixo:',
    '',
    '*PEDIDO*',
  ]

  quote.items.forEach((item) => lines.push(`• ${item.quantity}x ${item.name}`))

  if (customer.value.name || customer.value.notes) {
    lines.push('', '*DADOS DO PEDIDO*')
    if (customer.value.name) lines.push(`Nome: ${customer.value.name}`)
    if (customer.value.notes) lines.push(`Detalhes / observações: ${customer.value.notes}`)
  }

  lines.push('', 'Podem me informar o valor final, prazo de produção e disponibilidade?')
  return lines.join('\n')
})

const whatsappUrl = computed(() => getWhatsAppUrl(message.value))

async function copyQuote() {
  await navigator.clipboard.writeText(message.value)
  copied.value = true
  window.setTimeout(() => (copied.value = false), 1800)
}
</script>

<template>
  <section class="page-hero compact-page-hero">
    <div class="container">
      <p class="eyebrow">Orçamento</p>
      <h1>SEU PEDIDO,<br /><span>PRONTO PARA ENVIAR.</span></h1>
      <p class="page-lead">Revise os itens, descreva os detalhes e envie tudo em uma mensagem pronta pelo WhatsApp.</p>
    </div>
  </section>

  <section class="quote-page section-pad">
    <div class="container quote-grid">
      <div class="quote-items">
        <div v-if="quote.items.length" class="quote-list">
          <article v-for="item in quote.items" :key="item.id" class="quote-item">
            <img :src="item.image" :alt="item.name" />
            <div class="quote-item-copy">
              <RouterLink :to="`/produto/${item.slug}`">{{ item.name }}</RouterLink>
              <span>Sob consulta</span>
            </div>
            <div class="quantity-control compact">
              <button type="button" @click="quote.setQuantity(item.id, item.quantity - 1)"><Minus :size="15" /></button>
              <strong>{{ item.quantity }}</strong>
              <button type="button" @click="quote.setQuantity(item.id, item.quantity + 1)"><Plus :size="15" /></button>
            </div>
            <button class="remove-item" type="button" :aria-label="`Remover ${item.name}`" @click="quote.remove(item.id)"><Trash2 :size="17" /></button>
          </article>
          <button class="clear-button" type="button" @click="quote.clear">Limpar orçamento</button>
        </div>
        <div v-else class="empty-state quote-empty">
          <strong>Seu orçamento está vazio.</strong>
          <p>Adicione produtos do catálogo para montar a solicitação.</p>
          <RouterLink to="/catalogo" class="button button-primary">Ir para o catálogo <ArrowRight :size="18" /></RouterLink>
        </div>
      </div>

      <aside v-if="quote.items.length" class="quote-summary">
        <p class="eyebrow">Finalizar pelo WhatsApp</p>
        <h2>{{ quote.totalItems }} {{ quote.totalItems === 1 ? 'item selecionado' : 'itens selecionados' }}</h2>
        <label><span>Seu nome</span><input v-model="customer.name" type="text" autocomplete="name" placeholder="Seu nome" /></label>
        <label><span>Detalhes do pedido</span><textarea v-model="customer.notes" rows="5" placeholder="Ex.: cor desejada, tamanho aproximado, acabamento, data em que precisa..."></textarea></label>

        <div class="message-preview">
          <span>Mensagem pronta</span>
          <pre>{{ message }}</pre>
        </div>

        <a :href="whatsappUrl" target="_blank" rel="noreferrer" class="button button-whatsapp summary-action">
          <WhatsAppIcon :size="19" /> Enviar orçamento no WhatsApp
        </a>
        <button class="button button-ghost summary-action" type="button" @click="copyQuote">
          <Check v-if="copied" :size="18" /><Copy v-else :size="18" />
          {{ copied ? 'Mensagem copiada' : 'Copiar mensagem' }}
        </button>
        <p class="summary-note">O WhatsApp abre com o texto acima preenchido automaticamente. Você ainda pode editar a mensagem antes de enviar.</p>
      </aside>
    </div>
  </section>
</template>
