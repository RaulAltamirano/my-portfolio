<template>
  <section 
    id="experience"
    class="py-20 px-6 sm:px-8 lg:px-12 border-t transition-colors duration-300"
    :class="[
      isDark ? 'border-slate-800/30' : 'border-slate-200/30'
    ]"
  >
    <!-- Section Background -->
    <SectionBackground section="experience" />
    
    <div class="max-w-6xl mx-auto">
      <!-- Header de sección -->
      <HeaderSection
        :title="title"
        :subtitle="subtitle"
        :category="category"
        :description="description"
        :colors="colors"
      />
      <!-- Grid de experiencias -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-16">
        <Motion
          v-for="(experience, index) in experiences" 
          :key="experience?.id"
          :initial="{ opacity: 0, y: 30 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5, delay: 0.1 * index }"
          tag="div"
        >
          <ExperienceCard 
            :experience="experience" 
            :section-colors="colors"
          />
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
