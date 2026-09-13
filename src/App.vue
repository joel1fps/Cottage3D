<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import ScrollRevealSection from './components/ScrollRevealSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import QuoteDock from './components/QuoteDock.vue'
import LoadingOverlay from './components/LoadingOverlay.vue'
import FloatingCursor from './components/FloatingCursor.vue'

const loading = ref(true)

</script>

<template>
  <div class="site-shell">
    <LoadingOverlay v-if="loading" @done="loading = false" />
    <FloatingCursor />
    <SiteHeader />
    <main class="route-stage">
      <RouterView v-slot="{ Component, route: currentRoute }">
        <Transition :name="currentRoute.meta.transition || 'page-soft'" mode="out-in" appear>
          <div :key="currentRoute.fullPath" class="route-page">
            <component :is="Component" />
          </div>
        </Transition>
      </RouterView>
    </main>
    <ScrollRevealSection><SiteFooter /></ScrollRevealSection>
    <QuoteDock />
  </div>
</template>
