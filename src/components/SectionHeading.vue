<script setup>
defineProps({
  index: { type: String, default: '01' },
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  text: { type: String, default: '' },
})
</script>

<template>
  <div class="section-heading">
    <div class="section-index">{{ index }}</div>
    <div>
      <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
      <h2>{{ title }}</h2>
      <p v-if="text" class="section-copy">{{ text }}</p>
    </div>
  </div>
</template>
