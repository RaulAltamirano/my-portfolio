<template>
  <div >
    <ClientOnly>
      <NuxtLoadingIndicator 
        color="#3b82f6" 
        :height="3"
        
      />
    </ClientOnly>
    
    <LayoutHeader />
    
    <main >
      <NuxtPage v-slot="{ Component }">
        <Transition
          name="page"
          mode="out-in"
          @before-leave="beforeLeave"
          @enter="enter"
          @after-enter="afterEnter"
        >
          <component :is="Component" />
        </Transition>
      </NuxtPage>
    </main>

    <LayoutFooter />
    
    <ScrollToTop />
  </div>
</template>

<script setup lang="ts">

import LayoutHeader from '~/components/layout/NavMenu.vue'
import LayoutFooter from '~/components/layout/Footer.vue'

// SEO optimization
useHead({
  title: 'Raul Altamirano - Desarrollador Full Stack Senior',
  meta: [
    { name: 'description', content: 'Desarrollador Full Stack Senior especializado en Vue.js, Nuxt.js, Node.js y arquitecturas escalables. Portfolio de proyectos innovadores y soluciones tecnológicas.' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
    { name: 'theme-color', content: '#3b82f6' },
    { property: 'og:title', content: 'Raul Altamirano - Desarrollador Full Stack Senior' },
    { property: 'og:description', content: 'Portfolio profesional con proyectos innovadores y experiencia en desarrollo web moderno' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap' }
  ]
})

// Page transitions
const beforeLeave = (el: Element) => {
  // Add your pre-leave animation logic
}

const enter = (el: Element, done: () => void) => {
  // Add your enter animation logic
  done()
}

const afterEnter = (el: Element) => {
  // Add your post-enter animation logic
}
</script>

<style scoped>
/* Global styles and transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease-out;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.5);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.7);
}
</style>

