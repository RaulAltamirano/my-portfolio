<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 transition-all duration-500">
    <ClientOnly>
      <NuxtLoadingIndicator 
        color="#3b82f6" 
        :height="3"
        class="!fixed !top-0 !left-0 !right-0 !z-50" 
      />
    </ClientOnly>
    
    <!-- Header with modern navigation -->
    <header class="fixed top-0 w-full z-40 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-700/50 transition-all duration-300">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <NavMenu />
      </div>
    </header>

    <!-- Main content with smooth page transitions -->
    <main class="pt-20">
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

    <!-- Footer with container -->
    <footer class="mt-20 border-t border-slate-200/50 dark:border-slate-700/50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <Footer />
      </div>
    </footer>
    
    <ScrollToTop />
    
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#app'

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

<style>
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
}

::-webkit-scrollbar-track {
  background:rgb(0, 0, 0)
}

::-webkit-scrollbar-thumb {
  background: #94a3b8;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}

/* Selection style */
::selection {
  background: #3b82f6;
  color: white;
}

/* Focus styles */
:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>
