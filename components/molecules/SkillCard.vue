
<template>
  <div class="skill-card h-full">
    <div
      class="group relative flex h-full transform flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl transition-shadow transition-colors transition-transform duration-300 ease-in-out hover:shadow-2xl group-hover:scale-[1.02] dark:border-slate-700 dark:bg-slate-800 sm:p-6 hover:border-blue-500/30 dark:hover:border-blue-600/40"
    >
      <!-- Gradiente de fondo animado -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/10 dark:via-indigo-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-25 transition-opacity duration-300 rounded-2xl"
      ></div>

      <div class="relative z-10 flex flex-col flex-grow">
        <!-- Icono y Título -->
        <div class="flex items-start mb-4">
          <div
            class="mr-4 flex-shrink-0 p-2 bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 rounded-lg transition-colors duration-300"
          >
            <component :is="`heroicons-outline:${props.icon}`" class="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300" />
          </div>
          <div>
            <h3
              class="text-lg font-semibold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
            >
              {{ props.name }}
            </h3>
            <!-- Nivel -->
            <p class="text-sm text-slate-500 dark:text-slate-400">
              Nivel: <span class="font-medium">{{ props.level.charAt(0).toUpperCase() + props.level.slice(1) }}</span>
            </p>
          </div>
        </div>

        <!-- Categoría (al final) -->
        <div class="mt-auto pt-4">
          <span
            class="px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200"
          >
            {{ props.category }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Skill } from '~/types'

const props = defineProps<Skill>()
</script>
