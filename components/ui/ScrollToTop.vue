<template>
  <button
    v-if="isVisible"
    @click="scrollToTop"
    class="fixed bottom-4 right-4 bg-indigo-600 text-white rounded-full p-2 shadow-lg hover:bg-indigo-700 transition-colors duration-200 z-50"
    aria-label="Volver arriba"
  >
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)

const handleScroll = () => {
  isVisible.value = window.scrollY > 300
}

const scrollToTop = () => {
  if (!process.client) return
  
  try {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  } catch (error) {
    console.error('Error scrolling to top:', error)
    // Fallback to instant scroll if smooth scroll fails
    window.scrollTo(0, 0)
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
