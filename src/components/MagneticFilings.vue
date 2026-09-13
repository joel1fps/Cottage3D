<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  columns: { type: Number, default: 16 },
  rows: { type: Number, default: 8 },
})

const root = ref(null)
const filings = ref([])
const total = props.columns * props.rows
let frame = 0
let lastEvent = null
let enabled = false

function update() {
  frame = 0
  if (!root.value || !lastEvent) return
  const rect = root.value.getBoundingClientRect()
  const x = lastEvent.clientX - rect.left
  const y = lastEvent.clientY - rect.top
  const cellW = rect.width / props.columns
  const cellH = rect.height / props.rows

  filings.value.forEach((element, index) => {
    if (!element) return
    const col = index % props.columns
    const row = Math.floor(index / props.columns)
    const cx = (col + 0.5) * cellW
    const cy = (row + 0.5) * cellH
    const angle = Math.atan2(y - cy, x - cx) * (180 / Math.PI)
    const distance = Math.hypot(x - cx, y - cy)
    const intensity = Math.max(0.34, 1 - distance / Math.max(rect.width, rect.height))
    element.style.transform = `rotate(${angle}deg) scaleX(${0.82 + intensity * 0.34})`
    element.style.opacity = String(0.25 + intensity * 0.58)
  })
}

function handlePointer(event) {
  if (!root.value) return
  const rect = root.value.getBoundingClientRect()
  const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom
  if (!inside) {
    if (lastEvent) reset()
    lastEvent = null
    return
  }
  lastEvent = event
  if (!frame) frame = requestAnimationFrame(update)
}

function reset() {
  filings.value.forEach((element, index) => {
    if (!element) return
    const col = index % props.columns
    const row = Math.floor(index / props.columns)
    element.style.transform = `rotate(${(col * 17 + row * 11) % 180}deg) scaleX(.9)`
    element.style.opacity = '.32'
  })
}

onMounted(() => {
  reset()
  enabled = window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!enabled || !root.value) return
  window.addEventListener('pointermove', handlePointer, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', handlePointer)
  cancelAnimationFrame(frame)
})
</script>

<template>
  <div ref="root" class="magnetic-filings" aria-hidden="true" :style="{ '--filing-cols': columns, '--filing-rows': rows }">
    <span
      v-for="index in total"
      :key="index"
      :ref="(element) => { if (element) filings[index - 1] = element }"
      class="magnetic-filing"
    />
  </div>
</template>
