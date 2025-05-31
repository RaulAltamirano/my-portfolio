<template>
  <div class="relative w-full h-[400px] bg-gradient-to-br from-slate-50 via-slate-50/95 to-slate-100 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-800 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/10 dark:shadow-slate-800/10">
    <!-- Background gradient overlay -->
    <div class="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-blue-500/10 dark:from-violet-400/5 dark:to-blue-400/5"></div>

    <!-- Grid layout -->
    <div class="grid grid-cols-12 gap-6 p-6">
      <!-- Stats Card -->
      <div class="col-span-12 md:col-span-4">
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
          class="relative bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10 dark:hover:shadow-violet-400/10 hover:scale-[1.02]"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="text-sm font-medium text-slate-500 dark:text-slate-400">Projects</div>
            <div class="flex items-center space-x-2">
              <button
                class="p-1.5 rounded-full bg-violet-500/10 dark:bg-violet-400/10 text-violet-500 dark:text-violet-400 hover:bg-violet-500/20 dark:hover:bg-violet-400/20 transition-colors duration-200"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
          </div>
          <div class="text-3xl font-bold text-slate-900 dark:text-white">12</div>
          <div class="text-sm text-slate-500 dark:text-slate-400 mt-2">Active Projects</div>
        </div>
      </div>

      <!-- Skills Overview -->
      <div class="col-span-12 md:col-span-4">
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
          class="relative bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10 dark:hover:shadow-violet-400/10 hover:scale-[1.02]"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="text-sm font-medium text-slate-500 dark:text-slate-400">Skills</div>
            <div class="flex items-center space-x-2">
              <button
                class="p-1.5 rounded-full bg-violet-500/10 dark:bg-violet-400/10 text-violet-500 dark:text-violet-400 hover:bg-violet-500/20 dark:hover:bg-violet-400/20 transition-colors duration-200"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </button>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div
              v-for="skill in skills"
              :key="skill.name"
              class="flex items-center space-x-2 text-sm"
            >
              <div class="w-2 h-2 rounded-full bg-violet-500 dark:bg-violet-400"></div>
              <span>{{ skill.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="col-span-12 md:col-span-4">
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }"
          class="relative bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10 dark:hover:shadow-violet-400/10 hover:scale-[1.02]"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="text-sm font-medium text-slate-500 dark:text-slate-400">Recent Activity</div>
            <div class="flex items-center space-x-2">
              <button
                class="p-1.5 rounded-full bg-violet-500/10 dark:bg-violet-400/10 text-violet-500 dark:text-violet-400 hover:bg-violet-500/20 dark:hover:bg-violet-400/20 transition-colors duration-200"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </button>
            </div>
          </div>
          <div class="space-y-3">
            <div
              v-for="activity in activities"
              :key="activity.id"
              class="flex items-center space-x-3"
            >
              <div class="w-2 h-2 rounded-full bg-violet-500 dark:bg-violet-400"></div>
              <div class="flex-1">
                <div class="text-sm font-medium text-slate-900 dark:text-white">{{ activity.title }}</div>
                <div class="text-xs text-slate-500 dark:text-slate-400">{{ activity.time }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Motion } from '@motionone/vue'

const skills = [
  { name: 'Vue.js' },
  { name: 'Nuxt.js' },
  { name: 'TypeScript' },
  { name: 'Tailwind CSS' },
  { name: 'GSAP' },
  { name: 'Framer Motion' }
]

const activities = [
  { id: 1, title: 'Completed Vue 3 project', time: '2 hours ago' },
  { id: 2, title: 'Updated portfolio design', time: '5 hours ago' },
  { id: 3, title: 'Added new skill section', time: '1 day ago' }
]
</script>

<style>
@supports (backdrop-filter: blur(0)) {
  .backdrop-blur-xl {
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }
}
</style>
