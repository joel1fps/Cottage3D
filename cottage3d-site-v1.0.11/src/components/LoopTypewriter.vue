<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  text: { type: String, required: true },
  accentFrom: { type: String, default: '' },
  typeSpeed: { type: Number, default: 46 },
  eraseSpeed: { type: Number, default: 18 },
  holdTime: { type: Number, default: 1500 },
  restartDelay: { type: Number, default: 420 },
})

const count = ref(0)
const direction = ref('typing')
let timer = 0
let reducedMotion = false

const visibleText = computed(() => props.text.slice(0, count.value))
const accentIndex = computed(() => {
  if (!props.accentFrom) return props.text.length
  const index = props.text.indexOf(props.accentFrom)
  return index === -1 ? props.text.length : index
})
const normalText = computed(() => visibleText.value.slice(0, accentIndex.value))
const accentText = computed(() => visibleText.value.slice(accentIndex.value))

function schedule(delay, fn) {
  window.clearTimeout(timer)
  timer = window.setTimeout(fn, delay)
}

function run() {
  if (reducedMotion) {
    count.value = props.text.length
    return
  }

  if (direction.value === 'typing') {
    if (count.value < props.text.length) {
      schedule(props.typeSpeed, () => {
        count.value += 1
        run()
      })
      return
    }

    schedule(props.holdTime, () => {
      direction.value = 'erasing'
      run()
    })
    return
  }

  if (count.value > 0) {
    schedule(props.eraseSpeed, () => {
      count.value -= 1
      run()
    })
    return
  }

  schedule(props.restartDelay, () => {
    direction.value = 'typing'
    run()
  })
}

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  run()
})

onBeforeUnmount(() => window.clearTimeout(timer))
</script>

<template>
  <span class="loop-typewriter" :aria-label="text">
    <span aria-hidden="true">{{ normalText }}</span><em v-if="accentText" aria-hidden="true">{{ accentText }}</em><i aria-hidden="true" class="loop-typewriter-caret"></i>
  </span>
</template>
