<template>
  <div
    class="project-card-simple group relative flex flex-col w-full h-full min-h-[20rem] max-h-[22rem] min-w-[18rem] max-w-[22rem] rounded-xl border transition-all duration-300 overflow-hidden select-none"
    :class="[
      isDark 
        ? 'bg-slate-900/90 border-slate-700/40' 
        : 'bg-white/80 border-white/20',
      isCentered ? 'z-20 ring-1 ring-purple-400/30' : 'z-10',
      'hover:border-purple-400 dark:hover:border-purple-500'
    ]"
    tabindex="0"
  >
    <!-- Imagen del proyecto -->
    <div class="relative h-40 w-full overflow-hidden rounded-t-xl flex items-center justify-center bg-gradient-to-br" :class="isDark ? 'from-slate-800 to-slate-900' : 'from-slate-100 to-slate-200'">
      <img
        v-if="imageUrl"
        :src="imageUrl"
        :alt="title"
        class="w-full h-full object-cover"
        loading="lazy"
      />
      <PhotoIcon v-else class="w-10 h-10" :class="isDark ? 'text-slate-500' : 'text-slate-400'" />
      <div class="absolute top-2 right-2 flex gap-2 z-10">
        <a v-if="githubUrl" :href="githubUrl" target="_blank" rel="noopener noreferrer" aria-label="Ver código en GitHub" class="p-1 rounded bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-purple-100 dark:hover:bg-purple-700/80 transition" tabindex="0">
          <CodeBracketIcon class="w-4 h-4" aria-hidden="true" />
        </a>
        <a v-if="demoUrl" :href="demoUrl" target="_blank" rel="noopener noreferrer" aria-label="Ver demo" class="p-1 rounded bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-purple-100 dark:hover:bg-purple-700/80 transition" tabindex="0">
          <ExternalLinkIcon class="w-4 h-4" aria-hidden="true" />
        </a>
      </div>
    </div>
    <!-- Contenido -->
    <div class="flex flex-col flex-grow p-4 text-center gap-2">
      <h3 class="text-lg font-bold truncate" :class="isDark ? 'text-white' : 'text-slate-900'">{{ title }}</h3>
      <p class="text-xs leading-relaxed line-clamp-3" :class="isDark ? 'text-slate-300' : 'text-slate-600'">{{ description }}</p>
      <div class="flex flex-wrap gap-1 justify-center mt-auto">
        <span v-for="(tech, techIndex) in technologies.slice(0, 3)" :key="tech" class="px-2 py-0.5 text-[11px] rounded-full" :class="isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-700'">{{ tech }}</span>
        <span v-if="technologies.length > 3" class="px-2 py-0.5 text-[11px] rounded-full" :class="isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-700'">+{{ technologies.length - 3 }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PhotoIcon, CodeBracketIcon, ArrowTopRightOnSquareIcon as ExternalLinkIcon } from '@heroicons/vue/24/outline'
import type { Project } from '../../types/index'
import { toRefs } from 'vue'
import { useDarkMode } from '../../composables/useDarkMode'

const props = defineProps<Project & { isCentered?: boolean }>()
const { isCentered = false } = toRefs(props)
const { isDark } = useDarkMode()
</script>

<style scoped>
.project-card-simple {
  min-height: 20rem;
  max-height: 22rem;
  min-width: 18rem;
  max-width: 22rem;
  width: 100%;
  box-sizing: border-box;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, opacity;
  backface-visibility: hidden;
  border-radius: 1rem;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 