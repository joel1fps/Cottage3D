<script setup>
import { computed, ref } from 'vue'
import { Copy, Check, Upload } from '@lucide/vue'
import WhatsAppIcon from '../components/WhatsAppIcon.vue'
import { getWhatsAppUrl } from '../utils/whatsapp'

const form = ref({
  name: '',
  type: '',
  size: '',
  colors: '',
  description: '',
})
const fileName = ref('')
const copied = ref(false)

const message = computed(() => [
  'Olá, Cottage 3D! 👋',
  'Quero solicitar um orçamento para uma peça personalizada.',
  '',
  '*DETALHES DA IDEIA*',
  form.value.name ? `Nome: ${form.value.name}` : null,
  form.value.type ? `Tipo de peça: ${form.value.type}` : null,
  form.value.size ? `Tamanho aproximado: ${form.value.size}` : null,
  form.value.colors ? `Cores desejadas: ${form.value.colors}` : null,
  form.value.description ? `Descrição: ${form.value.description}` : null,
  fileName.value ? `Referência selecionada: ${fileName.value} (vou anexar na conversa)` : null,
  '',
  'Podem me informar as possibilidades, o valor e o prazo de produção?',
].filter((line) => line !== null).join('\n'))

const whatsappUrl = computed(() => getWhatsAppUrl(message.value))

function handleFile(event) {
  fileName.value = event.target.files?.[0]?.name ?? ''
}

async function copyRequest() {
  await navigator.clipboard.writeText(message.value)
  copied.value = true
  window.setTimeout(() => (copied.value = false), 1800)
}
</script>

<template>
  <section class="page-hero">
    <div class="container custom-hero-grid">
      <div>
        <p class="eyebrow">Personalizados</p>
        <h1>UMA IDEIA.<br /><span>UMA PEÇA SÓ SUA.</span></h1>
      </div>
      <p class="page-lead">Descreva o que você quer produzir. Ao finalizar, o site prepara a mensagem e abre o WhatsApp com todos os detalhes preenchidos.</p>
    </div>
  </section>

  <section class="custom-form-section section-pad">
    <div class="container custom-form-grid">
      <div class="custom-intro">
        <span class="section-index">01</span>
        <h2>Conte o que você precisa.</h2>
        <p>Preencha apenas o que já souber. Os detalhes que faltarem podem ser definidos diretamente com a Cottage 3D pelo WhatsApp.</p>
        <div class="custom-notes">
          <div><strong>Referência</strong><span>Foto, desenho ou arquivo que ajude a explicar sua ideia.</span></div>
          <div><strong>Dimensões</strong><span>Informe apenas se já tiver uma medida aproximada.</span></div>
          <div><strong>Cores</strong><span>Descreva as cores desejadas ou deixe para decidir no atendimento.</span></div>
        </div>
      </div>

      <form class="custom-form" @submit.prevent>
        <label>
          <span>Seu nome</span>
          <input v-model="form.name" type="text" autocomplete="name" placeholder="Seu nome" />
        </label>
        <label>
          <span>Tipo de peça</span>
          <select v-model="form.type">
            <option value="">Selecione</option>
            <option>Colecionável</option>
            <option>Chaveiro</option>
            <option>Decoração</option>
            <option>Letra ou nome personalizado</option>
            <option>Outro</option>
          </select>
        </label>
        <div class="form-row">
          <label>
            <span>Tamanho aproximado</span>
            <input v-model="form.size" type="text" placeholder="Ex.: 20 cm" />
          </label>
          <label>
            <span>Cores</span>
            <input v-model="form.colors" type="text" placeholder="Ex.: preto e branco" />
          </label>
        </div>
        <label>
          <span>Descreva a ideia</span>
          <textarea v-model="form.description" rows="6" placeholder="Explique como você imagina a peça..."></textarea>
        </label>
        <label class="file-field">
          <Upload :size="19" />
          <span>{{ fileName || 'Selecionar arquivo de referência' }}</span>
          <input type="file" accept="image/*,.stl,.obj,.3mf,.pdf" @change="handleFile" />
        </label>
        <p class="form-help">Por segurança, o navegador não consegue anexar o arquivo automaticamente no WhatsApp. Se selecionar uma referência, o nome dela entra na mensagem e você a anexa na conversa após abrir o WhatsApp.</p>

        <div class="message-preview compact-preview">
          <span>Prévia da mensagem</span>
          <pre>{{ message }}</pre>
        </div>

        <a :href="whatsappUrl" target="_blank" rel="noreferrer" class="button button-whatsapp form-submit">
          <WhatsAppIcon :size="19" /> Finalizar pelo WhatsApp
        </a>
        <button class="button button-ghost form-submit" type="button" @click="copyRequest">
          <Check v-if="copied" :size="18" />
          <Copy v-else :size="18" />
          {{ copied ? 'Mensagem copiada' : 'Copiar mensagem' }}
        </button>
      </form>
    </div>
  </section>
</template>
