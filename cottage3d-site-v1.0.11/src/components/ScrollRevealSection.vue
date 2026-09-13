<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

defineOptions({ inheritAttrs: false })
const content = ref(null)
const height = ref(0)
const viewport = ref(0)
function measure() {
  viewport.value = window.innerHeight
  height.value = Math.ceil(content.value.getBoundingClientRect().height)
}
let observer
onMounted(() => {
  observer = new ResizeObserver(measure)
  window.addEventListener('resize', measure)
  observer.observe(content.value)
})
onBeforeUnmount(() => { observer?.disconnect(); window.removeEventListener('resize', measure) })
</script>

<template>
  <div :class="['scroll-reveal', { 'is-measured': height, 'is-tall': height > viewport }]" :style="{ '--reveal-height': `${height}px` }">
    <div class="scroll-reveal-track">
      <section ref="content" v-bind="$attrs" class="scroll-reveal-content"><slot /></section>
    </div>
  </div>
</template>
