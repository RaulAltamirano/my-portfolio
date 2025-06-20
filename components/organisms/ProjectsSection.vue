<template>
  <section 
    id="projects"
    class="relative py-24 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-slate-50/50 to-transparent dark:from-slate-900/50 border-t border-slate-200/50 dark:border-slate-800/50"
  >
    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Background Network Pattern (for light mode) -->
      <div class="absolute inset-0 pointer-events-none -z-10 dark:hidden">
        <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path 
            d="M0,0 L100,100" 
            stroke="rgba(156, 183, 255, 0.1)" 
            stroke-width="1"
            fill="none"
          />
          <path 
            d="M0,100 L100,0" 
            stroke="rgba(156, 183, 255, 0.1)" 
            stroke-width="1"
            fill="none"
          />
        </svg>
      </div>

      <!-- Header de sección -->
      <HeaderSection
        :title="title"
        :subtitle="subtitle"
        :category="category"
        :description="description"
        :colors="colors"
      />

      <!-- Projects Grid with Dynamic Effects -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 relative">
        <Motion
          v-for="(project, index) in projects" 
          :key="project.id"
          :initial="{ opacity: 0, y: 50, scale: 0.95 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :transition="{ duration: 0.6, delay: 0.1 * index }"
          tag="div"
          class="group relative overflow-hidden rounded-xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all duration-300 ease-out"
        >
          <div 
            class="relative overflow-hidden rounded-xl"
            :class="{
              'ring-2 ring-blue-500/20': isHovered[index],
              'ring-2 ring-purple-500/20': isFocused[index]
            }"
            @mouseenter="handleHover(index)"
            @mouseleave="handleHover(null)"
            @focus="handleFocus(index)"
            @blur="handleFocus(null)"
          >
            <ProjectCard :project="project" />
          </div>
        </Motion>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Project } from '~/types'
import { Motion } from '@motionone/vue'
import ProjectCard from '~/components/organisms/ProjectCard.vue'
import HeaderSection from '~/components/organisms/HeaderSection.vue'

const props = defineProps<{
  title: string
  subtitle: string
  category: string
  description: string
  projects: Project[]
  colors: { from: string; to: string }
}>()

// State for hover and focus effects
const isHovered = ref<(number | null)[]>(Array(props.projects.length).fill(null))
const isFocused = ref<(number | null)[]>(Array(props.projects.length).fill(null))

const handleHover = (index: number | null) => {
  isHovered.value = Array(props.projects.length).fill(null)
  if (index !== null) {
    isHovered.value[index] = index
  }
}

const handleFocus = (index: number | null) => {
  isFocused.value = Array(props.projects.length).fill(null)
  if (index !== null) {
    isFocused.value[index] = index
  }
}
</script>

<style scoped>
/* Subtle glow effect for description */
p {
  position: relative;
}

p::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(156, 183, 255, 0.1), rgba(139, 92, 246, 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
}

p:hover::after {
  opacity: 1;
}

/* Smooth transitions for all elements */
section {
  will-change: transform, opacity;
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  section {
    background: linear-gradient(to bottom, rgba(15, 23, 42, 0.5), transparent);
  }
  
  p::after {
    background: linear-gradient(135deg, rgba(147, 197, 253, 0.1), rgba(168, 85, 247, 0.1));
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  section {
    animation: none !important;
    transition: none !important;
  }
}
</style>
