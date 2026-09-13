<script setup>
import { motion } from 'motion-v'

const props = defineProps({
  delay: { type: Number, default: 0 },
  distance: { type: Number, default: 28 },
  amount: { type: Number, default: 0.18 },
  className: { type: String, default: '' },
})
</script>

<template>
  <motion.div
    :class="['reveal-on-scroll', props.className]"
    :initial="{ opacity: 0, y: props.distance, filter: 'blur(8px)' }"
    :whileInView="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
    :inViewOptions="{ once: true, amount: props.amount, margin: '0px 0px -70px 0px' }"
    :transition="{ duration: 0.72, delay: props.delay, ease: [0.22, 1, 0.36, 1] }"
  >
    <slot />
  </motion.div>
</template>
