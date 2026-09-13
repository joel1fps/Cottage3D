<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
const emit = defineEmits(['done'])
const phase = ref('closed')
let lineTimer, openTimer, doneTimer
function finish() {
  document.body.classList.remove('is-loading')
  emit('done')
}
onMounted(() => {
  document.querySelector('#boot-cover')?.remove()
  document.body.classList.add('is-loading')
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { finish(); return }
  lineTimer = window.setTimeout(() => { phase.value = 'line' }, 100)
  openTimer = window.setTimeout(() => { phase.value = 'opening' }, 850)
  doneTimer = window.setTimeout(finish, 1750)
})
onBeforeUnmount(() => {
  clearTimeout(lineTimer); clearTimeout(openTimer); clearTimeout(doneTimer)
  document.body.classList.remove('is-loading')
})
</script>

<template>
  <div :class="['entry-reveal', phase]" role="status" aria-label="Carregando Cottage 3D">
    <div class="entry-panel entry-left"></div>
    <div class="entry-panel entry-right"></div>
    <div class="entry-line" aria-hidden="true"></div>
  </div>
</template>
