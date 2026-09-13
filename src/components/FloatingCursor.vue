<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const visible = ref(false)
const targeted = ref(false)
const label = ref('')
const cursor = ref(null)

let pointerX = -100
let pointerY = -100
let currentX = -100
let currentY = -100
let raf = 0
let enabled = false

function tick() {
  if (visible.value) {
    const target = getTarget(document.elementFromPoint(pointerX, pointerY))
    targeted.value = Boolean(target)
    label.value = getLabel(target)
  }
  currentX += (pointerX - currentX) * 0.2
  currentY += (pointerY - currentY) * 0.2

  if (cursor.value) {
    cursor.value.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
  }

  raf = requestAnimationFrame(tick)
}

function getTarget(element) {
  return element?.closest?.('a[href^="/produto/"]') || null
}

function getLabel(target) {
  return target ? 'ABRIR' : ''
}

function handleMove(event) {
  pointerX = event.clientX
  pointerY = event.clientY
  visible.value = true

  const target = getTarget(event.target)
  targeted.value = Boolean(target)
  label.value = getLabel(target)
}

function handleLeave() {
  visible.value = false
  targeted.value = false
}

onMounted(() => {
  enabled = window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!enabled) return

  document.documentElement.classList.add('floating-cursor-enabled')
  window.addEventListener('pointermove', handleMove, { passive: true })
  document.addEventListener('mouseleave', handleLeave)
  raf = requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  document.documentElement.classList.remove('floating-cursor-enabled')
  window.removeEventListener('pointermove', handleMove)
  document.removeEventListener('mouseleave', handleLeave)
  cancelAnimationFrame(raf)
})
</script>

<template>
  <div ref="cursor" :class="['floating-cursor', { visible, targeted }]" aria-hidden="true">
    <span class="floating-target-corner corner-tl"></span>
    <span class="floating-target-corner corner-tr"></span>
    <span class="floating-target-corner corner-br"></span>
    <span class="floating-target-corner corner-bl"></span>
    <span class="floating-target-dot"></span>

    <svg class="floating-cursor-ring" viewBox="0 0 100 100">
      <defs>
        <path id="cursor-circle" d="M50,50 m-34,0 a34,34 0 1,1 68,0 a34,34 0 1,1 -68,0" />
      </defs>
      <text>
        <textPath href="#cursor-circle" startOffset="0%">COTTAGE 3D • COTTAGE 3D • </textPath>
      </text>
    </svg>

    <span v-if="label" class="floating-cursor-center">{{ label }}</span>
  </div>
</template>
