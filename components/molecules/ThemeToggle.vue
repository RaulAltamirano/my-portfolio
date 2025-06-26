<template>
  <button
    @click="toggleDarkMode"
    class="relative p-3 rounded-xl transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-500 dark:focus-visible:outline-purple-400"
    :class="[
      isDark 
        ? 'text-gray-300 hover:text-purple-400 hover:bg-purple-500/10' 
        : 'text-gray-700 hover:text-purple-600 hover:bg-purple-500/10',
      isToggling ? 'animate-pulse' : ''
    ]"
    :aria-label="isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
    :tabindex="0"
  >
    <div class="relative z-10">
      <SunIcon v-if="isDark" class="w-6 h-6 transform transition-transform duration-300 hover:rotate-45" />
      <MoonIcon v-else class="w-6 h-6 transform transition-transform duration-300 hover:rotate-45" />
    </div>
    
    <!-- Hover glow effect -->
    <div 
      class="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"
      :class="[
        isDark 
          ? 'bg-purple-500/5' 
          : 'bg-purple-500/10'
      ]"
    />
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'

const { isDark, toggleDarkMode } = useDarkMode()
const isToggling = ref(false)

const handleToggle = () => {
  isToggling.value = true
  toggleDarkMode()
  setTimeout(() => { isToggling.value = false }, 400)
}
</script>

<style scoped>
/* Custom animations */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .animate-pulse {
    animation: none;
  }
}
</style> 