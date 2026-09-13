<script setup>
import { Box, Layers3, Sparkles } from '@lucide/vue'
import logo from '../assets/cottage3d-logo.png'
</script>

<template>
  <section class="page-hero">
    <div class="container about-hero-grid">
      <div>
        <p class="eyebrow">Cottage 3D</p>
        <h1>CRIATIVIDADE<br /><span>QUE GANHA FORMA.</span></h1>
      </div>
      <img :src="logo" alt="Logo Cottage 3D" class="about-logo" />
    </div>
  </section>

  <section class="about-content section-pad">
    <div class="container about-grid">
      <div class="about-main-copy">
        <span class="section-index">01</span>
        <h2>Da tela para as mãos.</h2>
        <p>A Cottage 3D trabalha com impressão 3D para transformar modelos digitais em peças físicas, desde colecionáveis até itens personalizados.</p>
        <p>Este site foi pensado para mostrar o portfólio real da marca, facilitar pedidos e organizar solicitações de orçamento sem preencher informações que ainda precisam ser combinadas com o cliente.</p>
      </div>
      <div class="about-pillars">
        <article><Box :size="24" /><strong>Impressão 3D</strong><p>Peças físicas produzidas a partir de modelos digitais.</p></article>
        <article><Layers3 :size="24" /><strong>Personalização</strong><p>Projetos adaptados à ideia e à necessidade de cada pedido.</p></article>
        <article><Sparkles :size="24" /><strong>Portfólio visual</strong><p>Produtos apresentados com foco em acabamento, forma e presença.</p></article>
      </div>
    </div>
  </section>
</template>
