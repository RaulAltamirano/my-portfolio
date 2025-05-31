<script setup lang="ts">
import { defineProps } from 'vue'
import { ArrowTopRightOnSquareIcon as ExternalLinkIcon, BuildingLibraryIcon as GithubIcon, PhotoIcon } from '@heroicons/vue/24/outline'
import type { Project } from '~/types';

const props = defineProps<{
  project: Project
}>()

</script>

<template>
  <div class="group relative flex flex-col h-full bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl border border-transparent hover:border-blue-500/30 dark:hover:border-blue-600/40 transition-all duration-300 group-hover:scale-[1.02]">
    <!-- Imagen del proyecto o Placeholder -->
    <div class="relative h-48 sm:h-56 w-full">
      <img 
        v-if="project.imageUrl"
        :src="project.imageUrl" 
        :alt="project.title"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <div v-else class="w-full h-full flex items-center justify-center bg-slate-200 dark:bg-slate-700">
        <PhotoIcon class="w-16 h-16 text-slate-400 dark:text-slate-500" />
      </div>
      
      <!-- Overlay con enlaces -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
        <div class="flex gap-3">
          <a 
            v-if="project.githubUrl"
            :href="project.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
            class="text-slate-300 hover:text-white transform hover:scale-110 transition-all duration-200"
          >
            <GithubIcon class="w-5 h-5" />
          </a>
          <a 
            v-if="project.demoUrl"
            :href="project.demoUrl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Live demo"
            class="text-slate-300 hover:text-white transform hover:scale-110 transition-all duration-200"
          >
            <ExternalLinkIcon class="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>

    <!-- Contenido del proyecto -->
    <div class="p-6 flex flex-col flex-grow">
      <h3 class="text-xl font-semibold text-slate-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
        {{ project.title }}
      </h3>
      <p class="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed flex-grow">
        {{ project.description }}
      </p>

      <!-- Tecnologías -->
      <div class="mt-auto pt-2 flex flex-wrap gap-2">
        <span
          v-for="tech in project.technologies"
          :key="tech"
          class="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors duration-200"
        >
          {{ tech }}
        </span>
      </div>
    </div>
  </div>
</template>

