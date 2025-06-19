<script setup lang="ts">
import { defineProps } from 'vue'
import { ArrowTopRightOnSquareIcon as ExternalLinkIcon, BuildingLibraryIcon as GithubIcon, PhotoIcon, CodeBracketIcon } from '@heroicons/vue/24/outline'
import type { Project } from '~/types';
import { Motion } from '@motionone/vue'

const props = defineProps<{
  project: Project
}>()

</script>

<template>
  <Motion
    :initial="{ opacity: 0, y: 32, scale: 0.97 }"
    :animate="{ opacity: 1, y: 0, scale: 1 }"
    :transition="{ duration: 0.6 }"
    tag="div"
    class="group relative flex flex-col bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700/60 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-blue-400/30 dark:hover:border-blue-500/40"
  >
    <!-- Imagen o Placeholder -->
    <div class="relative h-44 sm:h-52 w-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
      <img
        v-if="project.imageUrl"
        :src="project.imageUrl"
        :alt="project.title"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <div v-else class="w-full h-full flex items-center justify-center bg-slate-200 dark:bg-slate-700">
        <PhotoIcon class="w-12 h-12 text-slate-400 dark:text-slate-500" />
      </div>
      
      <!-- Overlay de enlaces -->
      <div
        class="absolute inset-0 flex items-end justify-end p-4 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <div class="flex gap-3">
          <a
            v-if="project.githubUrl"
            :href="project.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver código en GitHub"
            class="text-slate-200 hover:text-white focus-visible:ring-2 focus-visible:ring-blue-400 rounded-full transition"
            tabindex="0"
          >
            <CodeBracketIcon class="w-5 h-5" aria-hidden="true" />
          </a>
          <a
            v-if="project.demoUrl"
            :href="project.demoUrl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver demo"
            class="text-slate-200 hover:text-white focus-visible:ring-2 focus-visible:ring-blue-400 rounded-full transition"
            tabindex="0"
          >
            <ExternalLinkIcon class="w-5 h-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>

    <!-- Contenido -->
    <div class="flex flex-col flex-grow p-5">
      <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {{ project.title }}
      </h3>
      <p class="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed line-clamp-3">
        {{ project.description }}
      </p>

      <!-- Tecnologías -->
      <div class="mt-auto flex flex-wrap gap-2">
        <span
          v-for="tech in project.technologies"
          :key="tech"
          class="px-2 py-0.5 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full transition-colors group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-300"
        >
          {{ tech }}
        </span>
      </div>
    </div>
  </Motion>
</template>

