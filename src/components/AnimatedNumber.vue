<script setup>
import { computed, ref, watch } from 'vue'
import { AnimatePresence, motion } from 'motion-v'

const props = defineProps({
  value: { type: Number, required: true },
  minWidth: { type: String, default: '1ch' },
})

const direction = ref(1)
watch(
  () => props.value,
  (next, previous) => {
    direction.value = next >= previous ? 1 : -1
  },
)

const numberStyle = computed(() => ({ minWidth: props.minWidth }))
</script>

<template>
  <span class="animated-number" :style="numberStyle" aria-live="polite">
    <AnimatePresence mode="popLayout" :initial="false">
      <motion.span
        :key="value"
        class="animated-number-value"
        :initial="{ opacity: 0, y: direction * 14, scale: 0.88 }"
        :animate="{ opacity: 1, y: 0, scale: 1 }"
        :exit="{ opacity: 0, y: direction * -14, scale: 0.88 }"
        :transition="{ type: 'spring', stiffness: 520, damping: 34, mass: 0.7 }"
      >
        {{ value }}
      </motion.span>
    </AnimatePresence>
  </span>
</template>
