<template>
  <section 
    id="home"
    class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50/95 via-gray-50/95 to-gray-100 dark:from-gray-900/95 dark:via-gray-900/95 dark:to-gray-800 pt-20 md:pt-24 motion-safe:animate-fade-in"
    role="region"
    aria-label="Hero section with introduction and brand showcase"
  >


    <!-- Content Container -->
    <div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Content Column -->
        <div class="relative space-y-8">
          <!-- Role Badge -->
          <Motion
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6, delay: 0.2 }"
            class="inline-flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full bg-gradient-to-r from-gray-800/10 to-gray-900/10 dark:from-gray-100/10 dark:to-gray-200/10 text-gray-700 dark:text-gray-300 border border-gray-200/20 dark:border-gray-700/20 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span>{{ role }}</span>
          </Motion>

          <!-- Name with 3D Effect -->
          <Motion
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6, delay: 0.4 }"
            tag="h1"
            class="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight relative"
          >
            <span 
              class="relative inline-block transform-gpu hover:scale-105 transition-transform duration-500"
              :style="{ 
                transform: `perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`,
                'will-change': 'transform'
              }"
              @mousemove="handleTilt"
              @mouseleave="resetTilt"
            >
              {{ name }}
            </span>
          </Motion>

          <!-- Description with Typing Effect -->
          <Motion
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6, delay: 0.6 }"
            tag="p"
            class="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed font-medium max-w-2xl transition-colors duration-300"
          >
            <span class="typing-text">{{ description }}</span>
          </Motion>

          <!-- Action Buttons -->
          <Motion
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6, delay: 0.8 }"
            tag="div"
            class="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <a
              href="#projects"
              class="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden backdrop-blur-sm hover:backdrop-blur-lg"
            >
              <span class="relative z-10 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                Ver Proyectos
                <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <div class="absolute inset-0 bg-gradient-to-r from-gray-500/[.1] to-gray-400/[.1] transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 transition-colors duration-300"></div>
            </a>

            <a
              href="#contact"
              class="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <span class="relative z-10 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                Contactar
                <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <div class="absolute inset-0 bg-gradient-to-r from-gray-100/[.2] to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 transition-colors duration-300"></div>
            </a>
          </Motion>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2">
      <ClientOnly>
        <Motion
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ delay: 1.5, duration: 0.8 }"
          tag="div"
          class="flex flex-col items-center space-y-2"
        >
          <span class="text-sm text-gray-500 dark:text-gray-400">Explora más</span>
          <div class="relative px-6 py-3 bg-white/[.9] dark:bg-gray-900/[.9] backdrop-blur-sm rounded-lg border border-gray-200/[.3] dark:border-gray-700/[.3] transition-colors duration-300">
            <div class="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full p-1">
              <div class="w-1.5 h-1.5 bg-gradient-to-b from-blue-600 to-cyan-600 rounded-full mx-auto animate-scroll"></div>
            </div>
          </div>
        </Motion>
      </ClientOnly>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Motion } from '@motionone/vue'
import BackgroundEffect from '~/components/molecules/BackgroundEffect.vue'

// Props
const props = defineProps<{
  role: string
  name: string
  description: string
}>()

// Mouse tilt effect
const tiltX = ref(0)
const tiltY = ref(0)

const handleTilt = (e: MouseEvent) => {
  const { clientX, clientY } = e
  const { innerWidth, innerHeight } = window
  
  tiltX.value = ((clientX / innerWidth) - 0.5) * 20
  tiltY.value = ((clientY / innerHeight) - 0.5) * -20
}

const resetTilt = () => {
  tiltX.value = 0
  tiltY.value = 0
}
</script>

<style>
/* Add prefers-reduced-motion support */
@media (prefers-reduced-motion: reduce) {
  .motion-safe\:animate-fade-in {
    animation: none !important;
  }
  
  .animate-scroll {
    animation: none !important;
  }
}

/* Add smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Add will-change optimization */
.typing-text {
  will-change: transform;
}
</style>

<style scoped>
/* Glassmorphism and Motion Effects */
.glass-effect {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.glass-effect:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

/* Scroll Indicator Animation */
@keyframes scroll {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(10px);
    opacity: 0;
  }
}

.animate-scroll {
  animation: scroll 2s infinite;
}

/* Dark Mode Overrides */
@media (prefers-color-scheme: dark) {
  .glass-effect {
    background: rgba(0, 0, 0, 0.1);
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  .glass-effect:hover {
    background: rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.2);
  }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .animate-scroll {
    animation: none;
  }
}
</style>


