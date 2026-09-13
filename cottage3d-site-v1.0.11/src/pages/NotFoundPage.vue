<script setup>
import { ArrowLeft } from '@lucide/vue'
</script>

<template>
  <section class="not-found section-pad">
    <div class="container">
      <span>404</span>
      <h1>Essa página não ganhou forma.</h1>
      <p>Volte para o início ou explore o catálogo da Cottage 3D.</p>
      <RouterLink to="/" class="button button-primary"><ArrowLeft :size="18" /> Voltar ao início</RouterLink>
    </div>
  </section>
</template>
