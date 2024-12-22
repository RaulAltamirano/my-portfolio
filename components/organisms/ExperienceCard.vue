<template>
  <div class="experience-card" v-if="experience">
    <div 
      class="group relative rounded-xl p-6 border transition-all duration-300 hover:shadow-lg"
      :class="[
        isDark 
          ? 'bg-slate-800/40 border-slate-700/40 hover:border-slate-600/60 hover:bg-slate-800/60' 
          : 'bg-white/60 border-slate-200/40 hover:border-slate-300/60 hover:bg-white/80'
      ]"
    >
      <!-- Indicador de tiempo sutil -->
      <div 
        class="absolute left-0 top-0 bottom-0 w-0.5 rounded-full transition-all duration-300"
        :class="[
          sectionColors.from === 'from-orange-500' 
            ? 'bg-gradient-to-b from-orange-400/60 to-yellow-400/60' 
            : 'bg-gradient-to-b from-blue-400/60 to-purple-400/60'
        ]"
      ></div>
      
      <!-- Contenido principal -->
      <div class="ml-4">
        <!-- Header con posición y empresa -->
        <div class="mb-4">
          <div class="flex items-start justify-between mb-2">
            <div>
              <h3 
                class="text-xl font-semibold mb-1 transition-colors duration-300"
                :class="[
                  isDark ? 'text-white' : 'text-slate-900'
                ]"
              >
                {{ experience.position }}
              </h3>
              <p 
                class="text-base font-medium transition-colors duration-300"
                :class="[
                  sectionColors.from === 'from-orange-500'
                    ? 'text-orange-600 dark:text-orange-400'
                    : 'text-blue-600 dark:text-blue-400'
                ]"
              >
                {{ experience.company }}
              </p>
            </div>
            
            <!-- Fecha -->
            <span 
              class="text-sm font-medium transition-colors duration-300"
              :class="[
                isDark ? 'text-slate-500' : 'text-slate-600'
              ]"
            >
              {{ experience.startDate }} - {{ experience.endDate || 'Presente' }}
            </span>
          </div>
        </div>
        
        <!-- Descripción -->
        <div class="mb-5">
          <p 
            class="leading-relaxed text-sm transition-colors duration-300"
            :class="[
              isDark ? 'text-slate-400' : 'text-slate-600'
            ]"
          >
            {{ experience.description }}
          </p>
        </div>
        
        <!-- Logros con diseño minimalista -->
        <div class="space-y-2">
          <div 
            v-for="(achievement, index) in experience.achievements" 
            :key="index"
            class="flex items-start gap-3 achievement-item opacity-0"
            :style="{
              animationDelay: `${150 + (index * 80)}ms`,
              animation: 'fadeInUp 0.5s ease-out forwards'
            }"
          >
            <div 
              class="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 transition-colors duration-300"
              :class="[
                sectionColors.from === 'from-orange-500'
                  ? 'bg-orange-400/70'
                  : 'bg-blue-400/70'
              ]"
            ></div>
            <p 
              class="text-sm leading-relaxed transition-colors duration-300"
              :class="[
                isDark ? 'text-slate-400' : 'text-slate-600'
              ]"
            >
              {{ achievement }}
            </p>
          </div>
        </div>
        
        <!-- Tecnologías utilizadas -->
        <div v-if="experience.technologies && experience.technologies.length > 0" class="mt-4 pt-4 border-t">
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="tech in experience.technologies" 
              :key="tech"
              class="px-2 py-1 text-xs font-medium rounded-md transition-all duration-300"
              :class="[
                isDark 
                  ? 'bg-slate-700/50 text-slate-300 border border-slate-600/50' 
                  : 'bg-slate-100 text-slate-700 border border-slate-200'
              ]"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
      
      <!-- Efecto hover sutil -->
      <div 
        class="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 pointer-events-none"
        :class="[
          sectionColors.from === 'from-orange-500'
            ? 'group-hover:opacity-100 bg-gradient-to-br from-orange-400/3 to-yellow-400/3'
            : 'group-hover:opacity-100 bg-gradient-to-br from-blue-400/3 to-purple-400/3'
        ]"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Experience } from '~/types';

// Importar el composable de dark mode
const { isDark } = useDarkMode()

const props = defineProps<{
  experience: Experience | null
  sectionColors: { from: string; to: string }
}>()

// Keyframes for fadeInUp animation
const fadeInUpKeyframes = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(15px);
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
/* Add prefers-reduced-motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .achievement-item {
    animation-name: none !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    opacity: 1 !important;
    transform: none !important;
  }
}

/* Fallback keyframes */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Performance optimizations */
.experience-card {
  will-change: transform, box-shadow;
  backface-visibility: hidden;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
