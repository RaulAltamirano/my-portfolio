<template>
  <section 
    id="experience"
    class="py-24 px-6 sm:px-8 lg:px-12 bg-white dark:bg-slate-900 border-t border-slate-200/50 dark:border-slate-800/50"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Header de sección -->
      <HeaderSection
        :title="title"
        :subtitle="subtitle"
        :category="category"
        :description="description"
        :colors="colors"
      />
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
  </section>
</template>

<script setup lang="ts">
import ExperienceCard from '~/components/organisms/ExperienceCard.vue'
import type { Experience } from '~/types'
import { Motion } from '@motionone/vue'
import HeaderSection from '~/components/organisms/HeaderSection.vue'

const props = defineProps<{
  title: string
  subtitle: string
  category: string
  description: string
  experiences: Experience[]
  colors: { from: string; to: string }
}>()
</script>
