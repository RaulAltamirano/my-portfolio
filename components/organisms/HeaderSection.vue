<template>
  <Motion
    :initial="{ opacity: 0, x: 30 }"
    :animate="{ opacity: 1, x: 0 }"
    :transition="{ duration: 0.8, delay: 0.2 }"
    tag="div"
    class="text-left"
  >
    <Motion
      :initial="{ scale: 0.95, opacity: 0 }"
      :animate="{ scale: 1, opacity: 1 }"
      :transition="{ duration: 0.6, delay: 0.3 }"
      tag="div"
      class="inline-flex items-center px-4 py-2 backdrop-blur-sm rounded-full border shadow-lg mb-8 transition-all duration-300"
      :class="[
        isDark 
          ? 'bg-slate-800/90 border-slate-600/50 shadow-slate-900/30' 
          : 'bg-white/90 border-slate-200/50 shadow-slate-200/30'
      ]"
    >
      <span
        class="text-sm font-semibold uppercase tracking-wider bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300"
        :class="[
          isDark 
            ? `${colors.from} ${colors.to} opacity-90` 
            : `${colors.from} ${colors.to}`
        ]"
      >
        {{ category }}
      </span>
    </Motion>

    <Motion
      :initial="{ opacity: 0, x: 30 }"
      :animate="{ opacity: 1, x: 0 }"
      :transition="{ duration: 0.8, delay: 0.4 }"
      tag="h2"
      class="text-4xl sm:text-5xl lg:text-6xl font-black mb-8 leading-[1.1] tracking-tight transition-colors duration-300"
      :class="[
        isDark 
          ? 'text-white' 
          : 'text-slate-900'
      ]"
    >
      {{ title }}
      <span
        class="block bg-clip-text text-transparent transition-all duration-300"
        :class="[
          isDark 
            ? `bg-gradient-to-r ${colors.from} ${colors.to} opacity-95` 
            : `bg-gradient-to-r ${colors.from} ${colors.to}`
        ]"
      >
        {{ subtitle }}
      </span>
    </Motion>

    <Motion
      v-if="description"
      :initial="{ opacity: 0, x: 30 }"
      :animate="{ opacity: 1, x: 0 }"
      :transition="{ duration: 0.8, delay: 0.6 }"
      tag="p"
      class="text-lg sm:text-xl lg:text-2xl font-normal leading-relaxed transition-colors duration-300"
      :class="[
        isDark 
          ? 'text-slate-200' 
          : 'text-slate-600'
      ]"
    >
      {{ description }}
    </Motion>
  </Motion>
</template>

<script setup lang="ts">
import { Motion } from '@motionone/vue'
import type { PropType } from 'vue'

// Importar el composable de dark mode
const { isDark } = useDarkMode()

const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, default: '' },
  colors: {
    type: Object as PropType<{ from: string; to: string }>,
    required: true
  }
})
</script>

<style scoped>
/* Animaciones suaves para el header fijo */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
  }
}
</style> 