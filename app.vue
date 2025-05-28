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

    <!-- Scroll to top with animation -->
    <ScrollToTop />
    
    <!-- Custom cursor for desktop -->
    <div 
      ref="cursor" 
      class="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference opacity-0 transition-all duration-300 lg:opacity-100"
      :class="{ 'scale-150': isCursorActive }"
    >
      <div class="w-full h-full bg-white rounded-full scale-0 transition-transform duration-200"></div>
    </div>
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

// Custom cursor for desktop
const cursor = ref<HTMLElement>()
const isCursorActive = ref(false)

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

onMounted(() => {
  if (process.client && window.innerWidth >= 1024) {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursor.value) {
        cursor.value.style.left = e.clientX - 12 + 'px'
        cursor.value.style.top = e.clientY - 12 + 'px'
      }
    }

    const handleMouseEnter = () => {
      if (cursor.value) {
        isCursorActive.value = true
        cursor.value.querySelector('div')?.classList.add('scale-100')
      }
    }

    const handleMouseLeave = () => {
      if (cursor.value) {
        isCursorActive.value = false
        cursor.value.querySelector('div')?.classList.remove('scale-100')
      }
    }

    // Enhanced cursor interactions
    const handleClick = () => {
      if (cursor.value) {
        cursor.value.classList.add('scale-75')
        setTimeout(() => {
          cursor.value?.classList.remove('scale-75')
        }, 150)
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('click', handleClick)
    
    // Add cursor effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, [tabindex]:not([tabindex="-1"])')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    onUnmounted(() => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('click', handleClick)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    })
  }
})
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
  background: transparent;
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
