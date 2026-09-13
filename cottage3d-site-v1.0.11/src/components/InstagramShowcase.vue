<script setup>
import { ref, onMounted } from 'vue'
import { ArrowUpRight } from '@lucide/vue'
import { motion } from 'motion-v'
import InstagramIcon from './InstagramIcon.vue'
import logo from '../assets/cottage3d-logo.png'
import { siteConfig } from '../config/site'

const loading = ref(true)

onMounted(() => {
  window.setTimeout(() => {
    loading.value = false
  }, 1250)
})
</script>

<template>
  <motion.a
    :href="siteConfig.instagramUrl"
    class="instagram-showcase"
    target="_blank"
    rel="noreferrer"
    aria-label="Abrir Instagram da Cottage 3D"
    :whileHover="{ y: -5 }"
    :whilePress="{ scale: 0.99 }"
    :transition="{ type: 'spring', stiffness: 320, damping: 26 }"
  >
    <template v-if="loading">
      <div class="instagram-skeleton" aria-label="Carregando perfil do Instagram">
        <div class="skeleton-cover shimmer"></div>
        <div class="skeleton-body">
          <div class="skeleton-avatar shimmer"></div>
          <div class="skeleton-lines">
            <span class="shimmer"></span>
            <span class="shimmer short"></span>
          </div>
          <div class="skeleton-text shimmer"></div>
          <div class="skeleton-text shimmer medium"></div>
          <div class="skeleton-button shimmer"></div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="instagram-cover">
        <span>INSTAGRAM</span>
        <InstagramIcon :size="24" />
      </div>
      <div class="instagram-profile-body">
        <div class="instagram-profile-top">
          <div class="instagram-avatar">
            <img :src="logo" alt="Cottage 3D" />
          </div>
          <span class="instagram-open"><ArrowUpRight :size="18" /></span>
        </div>
        <strong>Cottage 3D</strong>
        <span class="instagram-handle">{{ siteConfig.instagramHandle }}</span>
        <p>Impressão 3D, peças personalizadas, colecionáveis e bastidores da produção.</p>
        <div class="instagram-follow">Ver perfil no Instagram <ArrowUpRight :size="16" /></div>
      </div>
    </template>
  </motion.a>
</template>
