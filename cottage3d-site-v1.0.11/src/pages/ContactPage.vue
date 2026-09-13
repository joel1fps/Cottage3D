<script setup>
import { MapPin, ArrowUpRight } from '@lucide/vue'
import Instagram from '../components/InstagramIcon.vue'
import WhatsAppIcon from '../components/WhatsAppIcon.vue'
import { siteConfig } from '../config/site'
import { getWhatsAppUrl } from '../utils/whatsapp'

const contactMessage = 'Olá, Cottage 3D! 👋 Vim pelo site e gostaria de falar sobre uma impressão 3D.'
const whatsappUrl = getWhatsAppUrl(contactMessage)
</script>

<template>
  <section class="page-hero compact-page-hero">
    <div class="container">
      <p class="eyebrow">Contato</p>
      <h1>FALE COM A<br /><span>COTTAGE 3D.</span></h1>
      <p class="page-lead">Pedidos, orçamentos, disponibilidade, tamanho, cor e personalizados são atendidos diretamente pelo WhatsApp.</p>
    </div>
  </section>

  <section class="contact-section section-pad">
    <div class="container contact-grid">
      <a :href="whatsappUrl" target="_blank" rel="noreferrer" class="contact-card contact-card-primary">
        <WhatsAppIcon :size="27" />
        <div><span>WhatsApp</span><strong>Iniciar atendimento</strong></div>
        <ArrowUpRight :size="22" />
      </a>
      <a :href="siteConfig.instagramUrl" target="_blank" rel="noreferrer" class="contact-card">
        <Instagram :size="26" />
        <div><span>Instagram</span><strong>{{ siteConfig.instagramHandle }}</strong></div>
        <ArrowUpRight :size="22" />
      </a>
      <div class="contact-card">
        <MapPin :size="26" />
        <div><span>Localização</span><strong>{{ siteConfig.location }}</strong></div>
      </div>
    </div>
  </section>
</template>
