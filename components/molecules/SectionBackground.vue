<template>
  <div 
    class="absolute inset-0 pointer-events-none overflow-hidden"
    :class="sectionClass"
  >
    <!-- Section-specific gradient overlay -->
    <Motion
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :transition="{ duration: 0.8, delay: 0.2 }"
      class="absolute inset-0"
    >
      <div 
        class="absolute inset-0"
        :style="{
          background: sectionGradient,
          opacity: 0.1
        }"
      />
    </Motion>

    <!-- Floating elements specific to section -->
    <Motion
      v-for="(element, index) in sectionElements"
      :key="`section-element-${index}`"
      :initial="{ opacity: 0, scale: 0, y: 20 }"
      :animate="{ 
        opacity: element.opacity, 
        scale: element.scale,
        y: element.y,
        x: element.x
      }"
      :transition="{ 
        duration: 1.5 + index * 0.3, 
        delay: 0.5 + index * 0.1,
        easing: 'ease-out'
      }"
      class="absolute rounded-full blur-xl"
      :style="{
        width: `${element.size}px`,
        height: `${element.size}px`,
        background: element.gradient
      }"
    />

    <!-- Animated border effect -->
    <Motion
      :initial="{ scaleX: 0 }"
      :animate="{ scaleX: 1 }"
      :transition="{ duration: 1.2, delay: 0.8, easing: 'ease-out' }"
      class="absolute bottom-0 left-0 right-0 h-px origin-left"
      :style="{
        background: borderGradient
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Motion } from '@motionone/vue'
import { useDarkMode } from '~/composables/useDarkMode'

// Dark mode composable
const { isDark } = useDarkMode()

// Props
interface Props {
  section: 'hero' | 'skills' | 'projects' | 'experience' | 'contact'
  variant?: 'primary' | 'secondary' | 'accent'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary'
})

// Section-specific configurations
const sectionConfigs = {
  hero: {
    gradient: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
    borderGradient: 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.5) 50%, transparent 100%)',
    elements: [
      { x: '20%', y: '30%', size: 80, scale: 1, opacity: 0.3, gradient: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)' },
      { x: '80%', y: '70%', size: 60, scale: 0.8, opacity: 0.2, gradient: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)' }
    ]
  },
  skills: {
    gradient: 'radial-gradient(circle at 30% 70%, rgba(34, 197, 94, 0.12) 0%, transparent 70%)',
    borderGradient: 'linear-gradient(90deg, transparent 0%, rgba(34, 197, 94, 0.5) 50%, transparent 100%)',
    elements: [
      { x: '10%', y: '60%', size: 70, scale: 1.1, opacity: 0.25, gradient: 'radial-gradient(circle, rgba(34, 197, 94, 0.18) 0%, transparent 70%)' },
      { x: '90%', y: '20%', size: 50, scale: 0.9, opacity: 0.15, gradient: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)' }
    ]
  },
  projects: {
    gradient: 'radial-gradient(circle at 70% 30%, rgba(168, 85, 247, 0.12) 0%, transparent 70%)',
    borderGradient: 'linear-gradient(90deg, transparent 0%, rgba(168, 85, 247, 0.5) 50%, transparent 100%)',
    elements: [
      { x: '15%', y: '40%', size: 65, scale: 1, opacity: 0.22, gradient: 'radial-gradient(circle, rgba(168, 85, 247, 0.16) 0%, transparent 70%)' },
      { x: '85%', y: '80%', size: 55, scale: 0.85, opacity: 0.18, gradient: 'radial-gradient(circle, rgba(236, 72, 153, 0.14) 0%, transparent 70%)' }
    ]
  },
  experience: {
    gradient: 'radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.12) 0%, transparent 70%)',
    borderGradient: 'linear-gradient(90deg, transparent 0%, rgba(236, 72, 153, 0.5) 50%, transparent 100%)',
    elements: [
      { x: '25%', y: '25%', size: 75, scale: 1.05, opacity: 0.24, gradient: 'radial-gradient(circle, rgba(236, 72, 153, 0.17) 0%, transparent 70%)' },
      { x: '75%', y: '60%', size: 45, scale: 0.9, opacity: 0.16, gradient: 'radial-gradient(circle, rgba(244, 63, 94, 0.13) 0%, transparent 70%)' }
    ]
  },
  contact: {
    gradient: 'radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.12) 0%, transparent 70%)',
    borderGradient: 'linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.5) 50%, transparent 100%)',
    elements: [
      { x: '30%', y: '80%', size: 70, scale: 1, opacity: 0.23, gradient: 'radial-gradient(circle, rgba(6, 182, 212, 0.16) 0%, transparent 70%)' },
      { x: '70%', y: '40%', size: 60, scale: 0.95, opacity: 0.19, gradient: 'radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, transparent 70%)' }
    ]
  }
}

// Computed properties
const sectionClass = computed(() => {
  return `section-${props.section}-background`
})

const sectionGradient = computed(() => {
  return sectionConfigs[props.section].gradient
})

const borderGradient = computed(() => {
  return sectionConfigs[props.section].borderGradient
})

const sectionElements = computed(() => {
  return sectionConfigs[props.section].elements
})
</script>

<style scoped>
/* Section-specific styles */
.section-hero-background {
  z-index: 1;
}

.section-skills-background {
  z-index: 1;
}

.section-projects-background {
  z-index: 1;
}

.section-experience-background {
  z-index: 1;
}

.section-contact-background {
  z-index: 1;
}

/* Performance optimizations */
.absolute {
  will-change: transform, opacity;
  backface-visibility: hidden;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .absolute * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .absolute {
    opacity: 0.3 !important;
  }
}
</style> 