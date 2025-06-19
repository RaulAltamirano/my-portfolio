<template>
  <section 
    id="experience"
    class="py-24 px-6 sm:px-8 lg:px-12 bg-white dark:bg-slate-900 border-t border-slate-200/50 dark:border-slate-800/50"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Header de sección -->
      <div class="text-center mb-20">
        <Motion
          :initial="{ opacity: 0, y: 50 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6 }"
          tag="div"
          class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50 rounded-full border border-blue-200/50 dark:border-blue-800/50 mb-6"
        >
          <span class="text-sm font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider">
            {{ category }}
          </span>
        </Motion>

        <Motion
          :initial="{ opacity: 0, y: 50 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6 }"
          tag="h2"
          class="text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight"
        >
          {{ title }}
          <span class="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            {{ subtitle }}
          </span>
        </Motion>

        <Motion
          :initial="{ opacity: 0, y: 50 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6 }"
          tag="p"
          class="text-xl lg:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-normal leading-relaxed"
        >
          {{ description }}
        </Motion>

        <!-- Grid de experiencias -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          <Motion
            v-for="(experience, index) in experiences" 
            :key="experience?.id"
            :initial="{ opacity: 0, y: 50 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6, delay: 0.1 * index }"
            tag="div"
          >
            <ExperienceCard :experience="experience" />
          </Motion>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ExperienceCard from '~/components/organisms/ExperienceCard.vue'
import type { Experience } from '~/types'
import { Motion } from '@motionone/vue'

const props = defineProps<{
  title: string
  subtitle: string
  category: string
  description: string
  experiences: Experience[]
}>()
</script>
