<script setup>
import ScrollRevealSection from '../components/ScrollRevealSection.vue'
import { computed } from 'vue'
import { ArrowDown, ArrowRight, Sparkles } from '@lucide/vue'
import { motion } from 'motion-v'
import SectionHeading from '../components/SectionHeading.vue'
import ProductCard from '../components/ProductCard.vue'
import RevealOnScroll from '../components/RevealOnScroll.vue'
import InstagramShowcase from '../components/InstagramShowcase.vue'
import MagneticFilings from '../components/MagneticFilings.vue'
import LoopTypewriter from '../components/LoopTypewriter.vue'
import { products } from '../data/products'
import logo from '../assets/cottage3d-logo.png'

const featured = computed(() => products.filter((product) => product.featured).slice(0, 4))
const heroProducts = [
  products.find((product) => product.id === 'charizard'),
  products.find((product) => product.id === 'homem-aranha'),
  products.find((product) => product.id === 'letra-personalizada'),
]
</script>

<template>
  <div class="home-page">
    <section class="hero section-dark">
      <div class="hero-grid-bg"></div>
      <MagneticFilings class="hero-magnetic-filings" :columns="22" :rows="10" />
      <div class="container hero-layout">
        <div class="hero-copy">
          <motion.div
            class="hero-kicker"
            :initial="{ opacity: 0, y: 18 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.55, delay: 0.08 }"
          >
            <span class="status-dot"></span>
            Impressões 3D • Teresina, Piauí
          </motion.div>

          <motion.h1
            :initial="{ opacity: 0, y: 28, filter: 'blur(8px)' }"
            :animate="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
            :transition="{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }"
          >
            DO DIGITAL<br />
            <span>PARA O REAL.</span>
          </motion.h1>

          <motion.p
            class="hero-description"
            :initial="{ opacity: 0, y: 18 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.65, delay: 0.22 }"
          >
            Colecionáveis, peças personalizadas e objetos em impressão 3D apresentados com uma experiência visual feita para a Cottage 3D.
          </motion.p>

          <motion.div
            class="hero-actions"
            :initial="{ opacity: 0, y: 16 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6, delay: 0.3 }"
          >
            <RouterLink to="/catalogo" class="button button-primary" data-cursor="VER">Explorar catálogo <ArrowRight :size="18" /></RouterLink>
            <RouterLink to="/personalizados" class="button button-ghost" data-cursor="CRIAR">Criar peça personalizada</RouterLink>
          </motion.div>
        </div>

        <motion.div
          class="hero-showcase"
          aria-label="Produtos Cottage 3D"
          :initial="{ opacity: 0, scale: 0.965, x: 24 }"
          :animate="{ opacity: 1, scale: 1, x: 0 }"
          :transition="{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }"
        >
          <div class="hero-card hero-card-main">
            <img :src="heroProducts[0].image" :alt="heroProducts[0].name" />
            <div class="hero-card-label">
              <span>COLECIONÁVEL</span>
              <strong>{{ heroProducts[0].name }}</strong>
            </div>
          </div>

          <div class="hero-card hero-card-small hero-card-a">
            <img :src="heroProducts[1].image" :alt="heroProducts[1].name" />
          </div>

          <div class="hero-card hero-card-small hero-card-b">
            <img :src="heroProducts[2].image" :alt="heroProducts[2].name" />
          </div>

          <div class="hero-brand-disc">
            <img :src="logo" alt="" />
          </div>
        </motion.div>
      </div>

      <div class="container hero-bottom">
        <a href="#home-content" class="scroll-down-cue" aria-label="Rolar para o conteúdo">
          <span>SCROLL DOWN</span>
          <span class="scroll-down-track"><motion.i :animate="{ y: [0, 8, 0] }" :transition="{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }"><ArrowDown :size="16" /></motion.i></span>
        </a>
        <span>01 / 05</span>
      </div>
    </section>

    <ScrollRevealSection id="home-content" class="statement-section">
      <div class="container">
        <RevealOnScroll>
          <div class="statement-grid">
            <span class="statement-index">01</span>
            <p class="statement-typewriter"><LoopTypewriter text="Ideias deixam de ser apenas digitais quando ganham volume, textura e presença." accent-from="volume, textura e presença." /></p>
          </div>
        </RevealOnScroll>
      </div>
    </ScrollRevealSection>

    <ScrollRevealSection class="catalog-preview section-pad">
      <div class="container">
        <RevealOnScroll>
          <SectionHeading
            index="02"
            eyebrow="Seleção Cottage 3D"
            title="Peças que já saíram da tela."
            text="Produtos reais da Cottage 3D. Valores, tamanhos e disponibilidade são definidos no orçamento."
          />
        </RevealOnScroll>
        <RevealOnScroll :delay="0.08" :amount="0.08">
          <div class="product-grid home-product-grid">
            <ProductCard v-for="product in featured" :key="product.id" :product="product" />
          </div>
        </RevealOnScroll>
        <RevealOnScroll :delay="0.12">
          <div class="section-action">
            <RouterLink to="/catalogo" class="text-link">Ver catálogo completo <ArrowRight :size="17" /></RouterLink>
          </div>
        </RevealOnScroll>
      </div>
    </ScrollRevealSection>

    <ScrollRevealSection class="experience-section section-pad">
      <div class="container experience-grid">
        <RevealOnScroll className="experience-visual-reveal" :distance="34">
          <div class="experience-visual">
            <div class="olive-panel">
              <img :src="products.find((product) => product.id === 'zoro').image" alt="Zoro — One Piece" />
            </div>
            <div class="visual-tag"><Sparkles :size="16" /> PRODUÇÃO EM 3D</div>
          </div>
        </RevealOnScroll>
        <RevealOnScroll :delay="0.08" :distance="30">
          <div class="experience-copy">
            <span class="section-index">03</span>
            <p class="eyebrow">Experiência</p>
            <h2>Escolha. Personalize. Peça.</h2>
            <p>
              O catálogo mostra as peças já produzidas e abre caminho para encomendas personalizadas. Nada de produtos genéricos ou nomes de demonstração: o site trabalha com o portfólio real da Cottage 3D.
            </p>
            <div class="steps-list">
              <div><span>01</span><strong>Encontre uma peça</strong><p>Navegue por colecionáveis, chaveiros e personalizados.</p></div>
              <div><span>02</span><strong>Adicione ao orçamento</strong><p>Monte sua lista sem preço inventado.</p></div>
              <div><span>03</span><strong>Finalize pelo WhatsApp</strong><p>Cor, tamanho, disponibilidade, prazo e valor são confirmados no atendimento.</p></div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </ScrollRevealSection>

    <ScrollRevealSection class="custom-cta section-pad">
      <div class="container">
        <RevealOnScroll>
          <div class="custom-cta-inner">
            <div>
              <span class="section-index">04</span>
              <p class="eyebrow">Sob medida</p>
              <h2>Tem uma ideia que ainda não existe no catálogo?</h2>
            </div>
            <div>
              <p>Envie a referência e descreva o que você quer transformar em uma peça física.</p>
              <RouterLink to="/personalizados" class="button button-light">Solicitar personalizado <ArrowRight :size="18" /></RouterLink>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </ScrollRevealSection>

    <ScrollRevealSection class="social-section section-pad">
      <div class="container social-grid">
        <RevealOnScroll>
          <SectionHeading index="05" eyebrow="Acompanhe" title="Bastidores, peças e novidades." />
        </RevealOnScroll>
        <RevealOnScroll :delay="0.08" :distance="24">
          <InstagramShowcase />
        </RevealOnScroll>
      </div>
    </ScrollRevealSection>


  </div>
</template>
