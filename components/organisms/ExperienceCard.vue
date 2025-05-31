<template>
  <div class="experience-card">
    <div class="relative">
      <!-- Línea temporal -->
      <div class="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600 hidden md:block"></div>
      <div class="absolute left-0 top-8 w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-slate-900 hidden md:block transform -translate-x-1.5"></div>
      
      <!-- Contenido -->
      <div class="md:ml-12 bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 group">
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
          <div>
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {{ experience.position }}
            </h3>
            <p class="text-lg font-medium text-blue-600 dark:text-blue-400 mb-2">
              {{ experience.company }}
            </p>
          </div>
          <span class="inline-flex items-center px-4 py-2 text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full whitespace-nowrap">
            {{ experience.period }}
          </span>
        </div>
        
        <p class="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
          {{ experience.description }}
        </p>
        
        <!-- Logros -->
        <div class="space-y-3">
          <h4 class="font-semibold text-slate-900 dark:text-white mb-3">Logros destacados:</h4>
          <div 
            v-for="(achievement, index) in experience.achievements" 
            :key="index"
            class="flex items-start gap-3 achievement-item opacity-0"
            :style="{
              animationDelay: `${200 + (index * 100)}ms`,
              animation: 'fadeInUp 0.6s ease-out forwards'
            }"
          >
            <div class="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
              {{ achievement }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Experience } from '~/types';

const props = defineProps<{
  experience: Experience | null
}>()

// Keyframes for fadeInUp animation (if not already global)
// If these keyframes are already in a global stylesheet and 'fadeInUp' works, this part is not needed.
// Otherwise, define them here or ensure they are globally available.
const fadeInUpKeyframes = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

if (typeof document !== 'undefined' && !document.getElementById('experience-card-animations')) {
  const styleSheet = document.createElement("style");
  styleSheet.id = 'experience-card-animations';
  styleSheet.type = "text/css";
  styleSheet.innerText = fadeInUpKeyframes;
  document.head.appendChild(styleSheet);
}

</script>

<style scoped>
/* Add prefers-reduced-motion for internal animations */
@media (prefers-reduced-motion: reduce) {
  .achievement-item {
    animation-name: none !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    opacity: 1 !important; /* Ensure it's visible */
    transform: none !important; /* Reset any transform */
  }
}

/* Ensure fadeInUp animation is defined if not globally available */
/* This is a fallback if the JS injection for keyframes is not preferred or doesn't work in all contexts */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
