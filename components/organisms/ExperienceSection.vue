<template>
  <section 
    id="experience"
    class="py-20 px-6 sm:px-8 lg:px-12 border-t transition-colors duration-300"
    :class="[
      isDark ? 'border-slate-800/30' : 'border-slate-200/30'
    ]"
  >
    
    <div class="max-w-6xl mx-auto">
      <!-- Header de sección -->
      <HeaderSection
        :title="title"
        :subtitle="subtitle"
        :category="category"
        :description="description"
        :colors="colors"
        animation-on-scroll="fade-up"
      />
      <!-- Grid de experiencias -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-16">
        <div
          v-for="(experience, index) in experiences"
          :key="experience?.id"
        >
          <ExperienceCard
            :experience="experience"
            :section-colors="colors"
            :stagger-index="index"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ExperienceCard from '~/components/organisms/ExperienceCard.vue'
import type { Experience } from '~/types'
import HeaderSection from '~/components/organisms/HeaderSection.vue'
import SectionBackground from '~/components/molecules/SectionBackground.vue'

// Importar el composable de dark mode
const { isDark } = useDarkMode()

const props = defineProps<{
  title: string
  subtitle: string
  category: string
  description: string
  experiences: Experience[]
  colors: { from: string; to: string }
}>()
</script>
