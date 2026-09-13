<script setup>
import { RouterLink } from 'vue-router'
import { motion } from 'motion-v'
import logo from '../assets/cottage3d-logo.png'
import { ArrowUpRight } from '@lucide/vue'
import Instagram from './InstagramIcon.vue'
import WhatsAppIcon from './WhatsAppIcon.vue'
import { siteConfig } from '../config/site'
import { getWhatsAppUrl } from '../utils/whatsapp'

const whatsappUrl = getWhatsAppUrl('Olá, Cottage 3D! 👋 Vim pelo site e gostaria de fazer um orçamento.')
</script>

<template>
  <motion.footer
    class="site-footer"
    :initial="{ opacity: 0, y: 42, filter: 'blur(8px)' }"
    :whileInView="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
    :inViewOptions="{ once: true, amount: 0.12 }"
    :transition="{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }"
  >
    <div class="container footer-grid">
      <div class="footer-brand">
        <img :src="logo" alt="Cottage 3D" />
        <div>
          <strong>COTTAGE 3D</strong>
          <p>Do digital para o real.</p>
        </div>
      </div>

      <div class="footer-links">
        <RouterLink to="/catalogo">Catálogo</RouterLink>
        <RouterLink to="/personalizados">Personalizados</RouterLink>
        <RouterLink to="/sobre">Sobre</RouterLink>
        <RouterLink to="/contato">Contato</RouterLink>
      </div>

      <div class="footer-social">
        <span>{{ siteConfig.location }}</span>
        <a :href="whatsappUrl" target="_blank" rel="noreferrer">
          <WhatsAppIcon :size="18" />
          WhatsApp
          <ArrowUpRight :size="15" />
        </a>
        <a :href="siteConfig.instagramUrl" target="_blank" rel="noreferrer">
          <Instagram :size="18" />
          {{ siteConfig.instagramHandle }}
          <ArrowUpRight :size="15" />
        </a>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>© {{ new Date().getFullYear() }} Cottage 3D.</span>
      <span>Impressão 3D • Personalização • Colecionáveis</span>
    </div>
  </motion.footer>
</template>
