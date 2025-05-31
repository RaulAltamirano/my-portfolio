<template>
  <section 
    id="skills"
    class="relative min-h-screen py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    :class="[
      'bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950',
      'border-t border-slate-200 dark:border-slate-800'
    ]"
    :data-reduce-motion="prefersReducedMotion"
  >
    <!-- Dynamic Background Elements -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-violet-500/5 to-blue-500/5 dark:from-violet-500/10 dark:to-blue-500/10 blur-3xl transform rotate-12"></div>
      <div class="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-purple-500/5 to-blue-500/5 dark:from-purple-500/10 dark:to-blue-500/10 blur-3xl transform -rotate-12"></div>
    </div>

    <div class="relative max-w-7xl mx-auto">
      <!-- Header Section -->
      <Motion
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 100, damping: 15 }"
        tag="div"
        class="text-center mb-16 sm:mb-20 lg:mb-24 max-w-4xl mx-auto"
      >
        <Motion
          :initial="{ scale: 0.95, opacity: 0 }"
          :animate="{ scale: 1, opacity: 1 }"
          :transition="{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 100, damping: 15 }"
          tag="div"
          class="inline-flex items-center px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-200/50 dark:border-slate-700/50 shadow-lg shadow-slate-200/20 dark:shadow-slate-900/20 mb-6"
        >
          <span class="text-sm font-semibold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent uppercase tracking-wider">
            {{ category }}
          </span>
        </Motion>

        <Motion
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 0.4, type: 'spring', stiffness: 100, damping: 15 }"
          tag="h2"
          class="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tight"
        >
          {{ title }}
          <span class="block bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            {{ subtitle }}
          </span>
        </Motion>

        <Motion
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 0.6, type: 'spring', stiffness: 100, damping: 15 }"
          tag="p"
          class="text-lg sm:text-xl lg:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-normal leading-relaxed mt-6"
        >
          {{ description }}
        </Motion>
      </Motion>

      <!-- Skills Grid -->
      <div class="relative py-20">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          <Motion
            v-for="(skill, index) in skills"
            :key="skill.id"
            :initial="{ opacity: 0, y: 40, scale: 0.95 }"
            :animate="{ opacity: 1, y: 0, scale: 1 }"
            :transition="{ 
              duration: 0.6, 
              delay: 0.8 + (index * 0.1), 
              type: 'spring', 
              stiffness: 100, 
              damping: 15 
            }"
            tag="div"
            class="group relative"
            :class="[
              'transform-gpu transition-all duration-300',
              'hover:-translate-y-2 hover:shadow-xl',
              'hover:shadow-violet-500/10 dark:hover:shadow-violet-500/20'
            ]"
            @mouseenter="handleSkillHover(index, true)"
            @mouseleave="handleSkillHover(index, false)"
          >
            <!-- Glassmorphism Overlay -->
            <div class="absolute -inset-1 bg-gradient-to-r from-violet-500/5 to-blue-500/5 dark:from-violet-500/10 dark:to-blue-500/10 rounded-xl blur-sm opacity-0 group-hover:opacity-20 transition duration-300"></div>
            
            <!-- Skill Card Container -->
            <div class="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg transition-all duration-300">
              <SkillCard 
                v-bind="skill"
                :data-skill-level="skill.level.toLowerCase()"
                class="h-full"
              />
            </div>
          </Motion>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Motion } from '@motionone/vue'
import SkillCard from '~/components/molecules/SkillCard.vue'
import type { Skill } from '~/types'

// Props
const props = defineProps<{
  title: string
  subtitle: string
  category: string
  description: string
  skills: Skill[]
}>()

// Accessibility
const prefersReducedMotion = computed(() => {
  if (process.client) {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }
  return false
})
</script>

<style scoped>
/* Base styles */
.transform-gpu {
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  will-change: transform, opacity;
}

/* Accessibility */
[data-reduce-motion="true"] * {
  animation: none !important;
  transition: none !important;
}

/* Skill card hover effects */
.group {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.3s ease;
}

.group:hover {
  transform: translateY(-0.5rem) scale(1.01);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
              0 8px 10px -6px rgb(0 0 0 / 0.1);
  opacity: 0.95;
}

/* Dark mode optimizations */
.dark .group:hover {
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.3),
              0 8px 10px -6px rgb(0 0 0 / 0.3);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .grid {
    gap: 1rem;
  }
  
  .group {
    transform: translate3d(0, 0, 0);
  }
}

/* Glassmorphism support */
@supports (backdrop-filter: blur(1px)) {
  .backdrop-blur-sm {
    backdrop-filter: blur(8px);
  }
}

/* Motion-safe styles */
@media (prefers-reduced-motion: reduce) {
  .group {
    transition: none !important;
  }
}
</style>
