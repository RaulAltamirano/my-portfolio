<template>
  <div 
    class="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    :class="isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950' : 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50'"
  >
    <div class="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-900/5 dark:to-gray-50/5" />
  </div>
</template>

<script setup lang="ts">
import { useDarkMode } from '~/composables/useDarkMode'

const { isDark } = useDarkMode()
</script>

<style scoped>
/* Smooth transitions for dark mode */
:deep(*) {
  transition: background-color 0.3s ease;
}

/* Performance optimizations */
.fixed {
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .fixed * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .fixed {
    background: rgba(0, 0, 0, 0.1) !important;
  }
}

/* Print styles */
@media print {
  .fixed {
    display: none !important;
  }
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .fixed {
    transform: translateZ(0);
  }
}
</style>