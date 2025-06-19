<template>
  <Motion
    ref="cardRef"
    class="skill-card h-full perspective-1000"
    :class="{ 
      'reduce-motion': prefersReducedMotion,
      'skill-card--hover': isHovered,
      [`skill-card--${props.level.toLowerCase()}`]: true
    }"
    v-bind="motionProps"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Enhanced 3D card structure -->
    <div
      class="group relative flex h-full transform-gpu flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl transition-all duration-500 ease-out hover:border-white/30 dark:bg-slate-800/20 dark:backdrop-blur-xl"
      :style="{
        '--card-scale': isHovered ? 1.02 : 1,
        '--card-rotate-x': isHovered ? 2 : 0,
        '--card-rotate-y': isHovered ? 2 : 0,
        '--card-y': isHovered ? -4 : 0,
        '--card-glow': isHovered ? '0 0 30px rgba(255, 255, 255, 0.15)' : '0 0 20px rgba(255, 255, 255, 0.1)',
        '--card-depth': isHovered ? '20px' : '0px'
      }"
    >
      <!-- Enhanced 3D layers -->
      <div class="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-white/5 dark:from-white/10 dark:via-white/5 dark:to-white/0 rounded-2xl transition-all duration-500 transform-gpu" :style="{ transform: `translateZ(calc(var(--card-depth) * 0.5))` }"></div>
      <div class="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-pink-400/10 rounded-2xl mix-blend-overlay transition-all duration-500 transform-gpu" :style="{ transform: `translateZ(calc(var(--card-depth) * 0.3))` }"></div>
      
      <!-- Animated border with depth -->
      <div 
        class="absolute inset-0 rounded-2xl border border-white/20 transition-all duration-500 transform-gpu"
        :class="{ 'border-white/40': isHovered }"
        :style="{ transform: `translateZ(calc(var(--card-depth) * 0.8))` }"
      ></div>
      
      <!-- Content container with enhanced 3D positioning -->
      <div class="relative z-10 flex flex-col flex-grow items-center text-center transition-all duration-500 transform-gpu" :style="{ transform: `translateZ(var(--card-depth))` }">
        <!-- Icon with enhanced floating animation -->
        <div 
          ref="iconRef" 
          class="mb-4 transform-gpu transition-all duration-500"
          :class="{ 'animate-float-enhanced': !prefersReducedMotion }"
        >
          <div 
            class="p-3 rounded-full backdrop-blur-sm transition-all duration-500 transform-gpu"
            :class="{
              'bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-400/20 dark:to-purple-400/20': !isHovered,
              'bg-gradient-to-br from-blue-500/30 to-purple-500/30 dark:from-blue-400/30 dark:to-purple-400/30': isHovered
            }"
            :style="{ transform: `translateZ(calc(var(--card-depth) * 1.2))` }"
          >
            <template v-if="props.logo">
              <img :src="props.logo" :alt="props.name" class="w-10 h-10 object-contain" />
            </template>
            <template v-else>
              <component 
                :is="`heroicons-outline:${props.icon}`" 
                class="w-8 h-8 text-white dark:text-white/90 transform-gpu transition-all duration-500"
                :class="{ 'scale-110 rotate-3': isHovered }"
              />
            </template>
          </div>
        </div>

        <!-- Title with enhanced gradient and depth -->
        <h3 
          class="text-xl font-semibold mb-2 transition-all duration-500 transform-gpu"
          :class="{
            'bg-gradient-to-r from-white to-white/80 dark:from-white dark:to-white/80 bg-clip-text text-transparent': !isHovered,
            'bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-300 dark:to-purple-300 bg-clip-text text-transparent': isHovered
          }"
          :style="{ transform: `translateZ(calc(var(--card-depth) * 1.1))` }"
        >
          {{ props.name }}
        </h3>

        <!-- Enhanced level indicator with 3D progress -->
        <div 
          class="w-full max-w-[120px] h-1.5 rounded-full overflow-hidden mb-4 transition-all duration-500 transform-gpu"
          :class="{
            'bg-white/10': !isHovered,
            'bg-white/20': isHovered
          }"
          :style="{ transform: `translateZ(calc(var(--card-depth) * 0.9))` }"
        >
          <div 
            ref="progressRef"
            class="h-full rounded-full transform-gpu transition-all duration-500"
            :class="{
              'bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400': !isHovered,
              'bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-300 dark:to-purple-300': isHovered
            }"
            :style="{ 
              width: `${getLevelPercentage(props.level)}%`,
              transform: `translateZ(calc(var(--card-depth) * 1.1))`
            }"
          ></div>
        </div>

        <!-- Enhanced level badge with depth -->
        <div 
          class="px-3 py-1 rounded-full text-sm font-medium transition-all duration-500 transform-gpu"
          :class="{
            'bg-white/10 text-white/80': !isHovered,
            'bg-white/20 text-white': isHovered
          }"
          :style="{ transform: `translateZ(calc(var(--card-depth) * 1.2))` }"
        >
          {{ props.level }}
        </div>
      </div>

      <!-- Enhanced hover effect with depth -->
      <div 
        class="absolute inset-0 opacity-0 transition-all duration-500 transform-gpu"
        :class="{ 'opacity-100': isHovered }"
        :style="{ transform: `translateZ(calc(var(--card-depth) * 0.4))` }"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-pink-400/10 rounded-2xl mix-blend-overlay"></div>
      </div>
    </div>
  </Motion>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import type { Skill } from '~/types'
import gsap from 'gsap'
import { Motion } from '@motionone/vue'

const props = defineProps<Skill>()

// Animation properties
const cardRef = ref<HTMLElement | null>(null)
const iconRef = ref<HTMLElement | null>(null)
const progressRef = ref<HTMLElement | null>(null)
const isHovered = ref(false)

// GSAP timelines
const hoverTimeline = ref<gsap.core.Timeline | null>(null)
const progressTimeline = ref<gsap.core.Timeline | null>(null)

// Motion states with enhanced animations
const motionProps = {
  initial: { 
    opacity: 0,
    scale: 0.95,
    y: 20,
    rotateX: -5,
    rotateY: -2
  },
  enter: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    transition: {
      duration: 0.8,
      easing: [0.4, 0, 0.2, 1],
      stagger: 0.1
    }
  }
}

// Get level percentage for progress bar
const getLevelPercentage = (level: string) => {
  const levels = {
    'beginner': 25,
    'intermediate': 50,
    'advanced': 75,
    'expert': 100
  }
  return levels[level.toLowerCase() as keyof typeof levels] || 50
}

// Enhanced hover handlers
const handleMouseEnter = () => {
  isHovered.value = true
  
  if (hoverTimeline.value) {
    hoverTimeline.value.play()
  }

  // Enhanced parallax effect on icon
  if (iconRef.value) {
    gsap.to(iconRef.value, {
      y: -4,
      rotate: 5,
      scale: 1.1,
      duration: 0.4,
      ease: "power2.out",
      transformOrigin: "center center"
    })
  }
}

const handleMouseLeave = () => {
  isHovered.value = false
  
  if (hoverTimeline.value) {
    hoverTimeline.value.reverse()
  }

  // Reset icon position
  if (iconRef.value) {
    gsap.to(iconRef.value, {
      y: 0,
      rotate: 0,
      scale: 1,
      duration: 0.4,
      ease: "power2.out"
    })
  }
}

// GSAP animations
onMounted(() => {
  if (!cardRef.value || !iconRef.value || !progressRef.value) return

  // Enhanced hover timeline with improved easing
  hoverTimeline.value = gsap.timeline({ paused: true })
    .to(cardRef.value, {
      scale: 1.02,
      y: -4,
      rotateX: 2,
      rotateY: 2,
      duration: 0.4,
      ease: "power2.out",
      transformOrigin: "center center"
    })
    .to(iconRef.value, {
      scale: 1.1,
      rotate: 5,
      duration: 0.4,
      ease: "power2.out",
      transformOrigin: "center center"
    }, '-=0.2')

  // Enhanced progress bar animation with improved easing
  progressTimeline.value = gsap.timeline({ paused: true })
    .fromTo(progressRef.value,
      { width: 0 },
      { 
        width: `${getLevelPercentage(props.level)}%`,
        duration: 1.2,
        ease: "power2.inOut",
        transformOrigin: "left center"
      }
    )

  // Play progress animation with delay
  setTimeout(() => {
    if (progressTimeline.value) {
      progressTimeline.value.play()
    }
  }, 200)
})

// Cleanup
onUnmounted(() => {
  if (hoverTimeline.value) {
    hoverTimeline.value.kill()
  }
  if (progressTimeline.value) {
    progressTimeline.value.kill()
  }
})

// Accessibility
const prefersReducedMotion = computed(() => {
  if (process.client) {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }
  return false
})
</script>

<style scoped>
.skill-card {
  --card-scale: 1;
  --card-rotate-x: 0;
  --card-rotate-y: 0;
  --card-y: 0;
  --card-glow: 0 0 20px rgba(255, 255, 255, 0.1);
  --card-depth: 0px;
  transform: translate3d(0, 0, 0);
  will-change: transform, opacity;
  transform-style: preserve-3d;
}

.perspective-1000 {
  perspective: 1000px;
}

.transform-gpu {
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  will-change: transform, opacity;
  transform-style: preserve-3d;
}

@keyframes float-enhanced {
  0%, 100% {
    transform: translateY(0) translateZ(0) rotate(0);
  }
  50% {
    transform: translateY(-8px) translateZ(10px) rotate(1deg);
  }
}

.animate-float-enhanced {
  animation: float-enhanced 6s ease-in-out infinite;
}

/* Enhanced glass effect with 3D transforms */
.skill-card > div {
  box-shadow: var(--card-glow);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transform: 
    scale(var(--card-scale))
    translateY(var(--card-y))
    rotateX(var(--card-rotate-x))
    rotateY(var(--card-rotate-y))
    translateZ(var(--card-depth));
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

/* Level-specific styles with enhanced depth */
.skill-card--beginner > div {
  --card-glow: 0 0 20px rgba(59, 130, 246, 0.1);
  --card-depth: 5px;
}

.skill-card--intermediate > div {
  --card-glow: 0 0 20px rgba(139, 92, 246, 0.1);
  --card-depth: 10px;
}

.skill-card--advanced > div {
  --card-glow: 0 0 20px rgba(236, 72, 153, 0.1);
  --card-depth: 15px;
}

.skill-card--expert > div {
  --card-glow: 0 0 20px rgba(16, 185, 129, 0.1);
  --card-depth: 20px;
}

/* Enhanced hover states with depth */
.skill-card--hover > div {
  --card-glow: 0 0 30px rgba(255, 255, 255, 0.15);
  --card-depth: calc(var(--card-depth) * 1.5);
}

/* Accessibility and performance optimizations */
@media (prefers-reduced-motion: reduce) {
  .animate-float-enhanced {
    animation: none;
  }
  
  .skill-card > div {
    transition: none;
    transform: none !important;
  }
}

/* Performance optimizations */
.skill-card {
  contain: content;
  transform-style: preserve-3d;
  will-change: transform, opacity;
}

/* Dark mode adjustments with enhanced depth */
.dark .skill-card > div {
  --card-glow: 0 0 20px rgba(255, 255, 255, 0.05);
  --card-depth: calc(var(--card-depth) * 0.8);
}

/* Accessibility */
.reduce-motion {
  animation: none !important;
  transition: none !important;
}

.reduce-motion * {
  animation: none !important;
  transition: none !important;
}

/* Optimized hover transitions with hardware acceleration */
@media (hover: hover) {
  .skill-card {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform, opacity;
  }
}
</style>
