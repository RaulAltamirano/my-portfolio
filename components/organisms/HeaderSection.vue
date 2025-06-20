<template>
  <Motion
    :initial="{ opacity: 0, y: 20 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.6, delay: 0.2, stiffness: 100, damping: 15 }"
    tag="div"
    class="text-center mb-16 sm:mb-20 lg:mb-24 max-w-4xl mx-auto"
  >
    <Motion
      :initial="{ scale: 0.95, opacity: 0 }"
      :animate="{ scale: 1, opacity: 1 }"
      :transition="{ duration: 0.5, delay: 0.2, stiffness: 100, damping: 15 }"
      tag="div"
      class="inline-flex items-center px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-200/50 dark:border-slate-700/50 shadow-lg shadow-slate-200/20 dark:shadow-slate-900/20 mb-6"
    >
      <span
        class="text-sm font-semibold uppercase tracking-wider"
        :class="`${colors.from} ${colors.to} bg-gradient-to-r bg-clip-text text-transparent`"
      >
        {{ category }}
      </span>
    </Motion>

    <Motion
      :initial="{ opacity: 0, y: 20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.6, delay: 0.4, stiffness: 100, damping: 15 }"
      tag="h2"
      class="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tight"
    >
      {{ title }}
      <span
        class="block bg-clip-text text-transparent"
        :class="`bg-gradient-to-r ${colors.from} via-purple-600 ${colors.to}`"
      >
        {{ subtitle }}
      </span>
    </Motion>

    <Motion
      v-if="description"
      :initial="{ opacity: 0, y: 20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.6, delay: 0.6, stiffness: 100, damping: 15 }"
      tag="p"
      class="text-lg sm:text-xl lg:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-normal leading-relaxed mt-6"
    >
      {{ description }}
    </Motion>
  </Motion>
</template>

<script setup lang="ts">
import { Motion } from '@motionone/vue'
import type { PropType } from 'vue'

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