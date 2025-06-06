<template>
  <NuxtLink
    to="/"
    class="relative inline-flex items-center space-x-2.5 px-2 py-1.5 rounded-xl transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-primary-light/50 group"
    :class="[
      isScrolled ? 
        'hover:bg-slate-100/80 dark:hover:bg-slate-800/80' : 
        'hover:bg-white/80 dark:hover:bg-slate-800/80',
      'transform hover:scale-[1.02] hover:-translate-y-0.5',
      'motion-safe:hover:shadow-lg motion-safe:hover:shadow-primary-light/10'
    ]"
  >
    <!-- Logo icon with improved transitions -->
    <Motion
      :whileHover="{ scale: 1.1, rotate: 12 }"
      :whileTap="{ scale: 0.95 }"
      :transition="{ duration: 0.3, easing: [0.16, 1, 0.3, 1] }"
      class="relative z-10"
    >
      <div class="relative w-8 h-8">
        <!-- Neural gradient background -->
        <div 
          class="absolute inset-0 rounded-lg bg-gradient-to-br from-primary-light via-primary-dark to-primary-light opacity-90"
          :class="[
            isDark ? 'shadow-lg shadow-primary-light/20' : 'shadow-lg shadow-primary-light/10'
          ]"
        >
          <!-- Neural gradient overlay -->
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
          <div class="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,_var(--tw-gradient-stops))] from-transparent via-white/5 to-transparent animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <!-- Shine effect -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
        </div>

        <!-- Logo icon -->
        <svg
          class="relative z-10 w-6 h-6 mx-auto mt-1 text-white filter drop-shadow-sm"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>

        <!-- Glow effect -->
        <div 
          class="absolute -inset-1 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          :class="[
            isDark ? 'bg-primary-light/20' : 'bg-primary-light/10'
          ]"
        ></div>
      </div>
    </Motion>

    <!-- Brand text with improved typography -->
    <div class="relative z-10">
      <h1 
        class="text-lg font-bold tracking-tight"
        :class="[
          isDark ? 'text-white' : 'text-slate-900',
          'bg-gradient-to-r from-primary-light via-primary-dark to-primary-light bg-clip-text text-transparent'
        ]"
      >
        {{ brandName }}
      </h1>
      <p 
        class="text-xs font-medium tracking-wide"
        :class="[
          isDark ? 'text-slate-400' : 'text-slate-600'
        ]"
      >
        {{ brandTitle }}
      </p>
    </div>

    <!-- Enhanced hover effects -->
    <div 
      class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out"
      :class="[
        isDark ? 
          'bg-gradient-to-br from-slate-800/80 to-slate-900/80' : 
          'bg-gradient-to-br from-white/80 to-slate-100/80'
      ]"
    >
      <!-- Neural gradient overlay -->
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
      <div class="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,_var(--tw-gradient-stops))] from-transparent via-white/5 to-transparent animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <!-- Shine effect -->
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
    </div>

    <!-- Focus ring effect -->
    <div 
      class="absolute inset-0 rounded-xl ring-2 ring-primary-light/0 group-focus-visible:ring-primary-light/50 transition-all duration-300"
      :class="[
        isDark ? 'ring-primary-light/30' : 'ring-primary-light/20'
      ]"
    ></div>

    <!-- Glow effect -->
    <div 
      class="absolute -inset-1 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      :class="[
        isDark ? 'bg-primary-light/10' : 'bg-primary-light/5'
      ]"
    ></div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { Motion } from '@motionone/vue'

defineProps<{
  brandName: string
  brandTitle: string
  isDark: boolean
  isScrolled: boolean
}>()
</script>

<style scoped>
/* Custom animations */
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  a {
    transition: none !important;
    transform: none !important;
  }
  
  .motion-safe\:hover\:shadow-lg:hover {
    box-shadow: none !important;
  }

  .animate-spin-slow {
    animation: none !important;
  }
}

/* Touch device optimizations */
@media (hover: none) {
  a:hover {
    transform: none;
  }
  
  a:hover .group-hover\:opacity-100 {
    opacity: 0;
  }

  a:hover .group-hover\:translate-x-full {
    transform: none;
  }
}

/* Mobile optimizations */
@media (max-width: 768px) {
  a {
    padding: 0.5rem;
  }

  .text-lg {
    font-size: 1rem;
  }

  .text-xs {
    font-size: 0.625rem;
  }
}
</style> 