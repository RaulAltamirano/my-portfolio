<template>
  <Motion
    :initial="{ opacity: 0, scale: 0.96, y: 24 }"
    :animate="{
      opacity: 1,
      scale: isCentered ? 1.08 : 1,
      y: isCentered ? -10 : 0
    }"
    :transition="{ duration: 0.6 }"
    :whileHover="{
      scale: isCentered ? 1.16 : 1.08,
      y: isCentered ? -24 : -10,
      boxShadow: isDark 
        ? '0 12px 36px 0 rgba(52, 211, 153, 0.25), 0 2px 0 0 #10b981' 
        : '0 12px 36px 0 rgba(16, 185, 129, 0.18), 0 2px 0 0 #059669',
      filter: 'brightness(1.04) saturate(1.1)'
    }"
    :whileFocus="{
      scale: isCentered ? 1.16 : 1.08,
      y: isCentered ? -24 : -10,
      boxShadow: isDark 
        ? '0 12px 36px 0 rgba(52, 211, 153, 0.25), 0 2px 0 0 #10b981' 
        : '0 12px 36px 0 rgba(16, 185, 129, 0.18), 0 2px 0 0 #059669',
      filter: 'brightness(1.04) saturate(1.1)'
    }"
    class="skill-card group relative flex flex-col items-center justify-center w-full h-full min-h-[20rem] max-h-[20rem] min-w-[18rem] max-w-[24rem] backdrop-blur-md rounded-2xl border shadow-lg transition-all duration-500 ease-out overflow-hidden select-none"
    :class="[
      isDark 
        ? 'bg-slate-900/90 border-slate-700/40' 
        : 'bg-white/80 border-white/20',
      {
        'ring-4 shadow-emerald-200 dark:shadow-emerald-900': isCentered,
        'z-20': isCentered,
        'z-10': !isCentered,
        'hover:border-emerald-600 dark:hover:border-emerald-400': true
      },
      isCentered 
        ? isDark 
          ? 'ring-emerald-500/50' 
          : 'ring-emerald-400/40'
        : ''
    ]"
    style="box-sizing: border-box;"
    tabindex="0"
  >
    <!-- Glow effect when centered -->
    <Motion
      v-if="isCentered"
      :initial="{ opacity: 0, scale: 0.9 }"
      :animate="{ opacity: 0.7, scale: 1.18 }"
      :transition="{ duration: 0.5 }"
      class="absolute -inset-2 rounded-3xl blur-2xl pointer-events-none animate-pulse"
      :class="[
        isDark 
          ? 'bg-gradient-to-br from-emerald-500/25 via-teal-500/20 to-emerald-300/12' 
          : 'bg-gradient-to-br from-emerald-400/30 via-teal-400/20 to-emerald-200/10'
      ]"
      style="z-index:1;pointer-events:none;"
    />
    <!-- Glow sutil en hover/focus -->
    <Motion
      :initial="{ opacity: 0, scale: 0.95 }"
      :whileHover="{ opacity: 0.18, scale: 1.10 }"
      :whileFocus="{ opacity: 0.18, scale: 1.10 }"
      :transition="{ duration: 0.4 }"
      class="absolute -inset-4 rounded-3xl blur-2xl pointer-events-none"
      :class="[
        isDark 
          ? 'bg-gradient-to-br from-emerald-500/30 via-teal-500/20 to-emerald-300/15' 
          : 'bg-gradient-to-br from-emerald-400/40 via-teal-400/20 to-emerald-200/10'
      ]"
      style="z-index:1;pointer-events:none;"
    />
    <!-- Content container -->
    <div class="relative z-10 flex flex-col items-center justify-center w-full h-full px-0 py-0 text-center gap-2">
      <!-- Logo/Icono sin card -->
      <Motion
        :whileHover="{ rotate: 8, scale: 1.15 }"
        :whileFocus="{ rotate: 8, scale: 1.15 }"
        :transition="{ duration: 0.4 }"
        class="mb-2 flex justify-center items-center w-full"
      >
        <div class="skill-logo-container">
          <template v-if="props.logo">
            <img 
              :src="props.logo" 
              :alt="props.name" 
              class="skill-logo-img"
            />
          </template>
          <template v-else>
            <component 
              :is="`heroicons-outline:${props.icon}`" 
              class="skill-logo-icon"
              :class="[
                isDark ? 'text-emerald-400' : 'text-emerald-600'
              ]"
            />
          </template>
        </div>
      </Motion>
      <!-- Title -->
      <Motion
        :initial="{ opacity: 0, y: 10 }"
        :animate="{ opacity: 1, y: 0 }"
        :whileHover="{ scale: 1.04, y: -2 }"
        :whileFocus="{ scale: 1.04, y: -2 }"
        :transition="{ duration: 0.4, delay: 0.1 }"
        class="mb-1 w-full px-2"
      >
        <h3 
          class="text-lg font-bold transition-colors duration-500 truncate w-full text-center"
          :class="[
            isDark 
              ? 'text-white group-hover:text-emerald-400' 
              : 'text-slate-900 group-hover:text-emerald-600'
          ]"
        >
          {{ props.name }}
        </h3>
      </Motion>
      <!-- Level indicator -->
      <Motion
        :initial="{ opacity: 0, scaleX: 0 }"
        :animate="{ opacity: 1, scaleX: 1 }"
        :transition="{ duration: 0.6, delay: 0.2 }"
        class="w-full max-w-[100px] mb-1"
      >
        <div 
          class="w-full h-1.5 rounded-full overflow-hidden"
          :class="[
            isDark ? 'bg-slate-700/80' : 'bg-slate-200/80'
          ]"
        >
          <Motion
            :initial="{ width: 0 }"
            :animate="{ width: `${getLevelPercentage(props.level)}%` }"
            :transition="{ duration: 1, delay: 0.4 }"
            class="h-full rounded-full relative"
            :class="[
              isDark ? 'bg-emerald-400' : 'bg-emerald-500'
            ]"
          >
            <!-- Glow/acento al final de la barra -->
            <span
              class="absolute right-0 top-0 h-full w-2 rounded-r-full opacity-60"
              :class="[
                isDark ? 'bg-emerald-300' : 'bg-emerald-200'
              ]"
              v-if="getLevelPercentage(props.level) > 10"
            />
          </Motion>
        </div>
      </Motion>
      <!-- Level badge -->
      <Motion
        :initial="{ opacity: 0, y: 10 }"
        :animate="{ opacity: 1, y: 0 }"
        :whileHover="{ scale: 1.08, y: -2 }"
        :whileFocus="{ scale: 1.08, y: -2 }"
        :transition="{ duration: 0.4, delay: 0.3 }"
        class="px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-300"
        :class="[
          isDark 
            ? 'bg-gradient-to-r from-emerald-400/15 to-teal-400/15 border-emerald-400/30 text-emerald-300' 
            : 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/20 text-emerald-700'
        ]"
      >
        {{ props.level }}
      </Motion>
    </div>
    <!-- Hover border effect -->
    <Motion
      :initial="{ opacity: 0, scale: 0.95 }"
      :whileHover="{ opacity: 1, scale: 1 }"
      :whileFocus="{ opacity: 1, scale: 1 }"
      :transition="{ duration: 0.3 }"
      class="absolute inset-0 rounded-2xl border-2 border-transparent pointer-events-none transition-all duration-300"
      :class="[
        isDark 
          ? 'group-hover:border-emerald-400' 
          : 'group-hover:border-emerald-600'
      ]"
      style="z-index:2;pointer-events:none;"
    />
    <!-- Glow extra en hover -->
    <Motion
      :initial="{ opacity: 0, scale: 0.95 }"
      :whileHover="{ opacity: 0.13, scale: 1.12 }"
      :whileFocus="{ opacity: 0.13, scale: 1.12 }"
      :transition="{ duration: 0.4 }"
      class="absolute -inset-4 rounded-3xl blur-2xl pointer-events-none"
      :class="[
        isDark 
          ? 'bg-gradient-to-br from-emerald-500/25 via-teal-500/20 to-emerald-300/12' 
          : 'bg-gradient-to-br from-emerald-400/30 via-teal-400/20 to-emerald-200/10'
      ]"
      style="z-index:1;pointer-events:none;"
    />
  </Motion>
</template>

<script setup lang="ts">
import { Motion } from '@motionone/vue'
import type { Skill } from '~/types'
import { toRefs } from 'vue'

// Importar el composable de dark mode
const { isDark } = useDarkMode()

const props = defineProps<Skill & { isCentered?: boolean }>()
const { isCentered = false } = toRefs(props)

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
</script>

<style scoped>
.skill-card {
  min-height: 20rem;
  max-height: 20rem;
  min-width: 18rem;
  max-width: 24rem;
  width: 100%;
  box-sizing: border-box;
  transform: translateY(0);
  transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
  border-radius: 1rem;
}

.skill-card * {
  box-sizing: border-box;
}

/* Logo/Icono contenedor */
.skill-logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 0.75rem;
  overflow: hidden;
  background: rgba(255,255,255,0.04);
  margin: 0 auto;
}

.skill-logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  aspect-ratio: 1/1;
  border-radius: 0.75rem;
  filter: drop-shadow(0 1px 2px rgba(16,185,129,0.10));
  transition: all 0.3s;
}

.skill-logo-icon {
  width: 3rem;
  height: 3rem;
  display: block;
  margin: 0 auto;
  aspect-ratio: 1/1;
  transition: all 0.3s;
}

/* Glassmorphism */
.backdrop-blur-md {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* Performance optimizations */
.skill-card {
  will-change: transform, box-shadow;
  backface-visibility: hidden;
}

/* Efecto de elevación y escala al hover/focus */
.group:hover,
.group:focus-within {
  transform: scale(1.03);
  z-index: 2;
}

/* Transiciones suaves */
.group {
  transition: box-shadow 0.3s cubic-bezier(.4,0,.2,1), transform 0.3s cubic-bezier(.4,0,.2,1);
}

/* Responsive y performance */
@media (max-width: 768px) {
  .backdrop-blur-md {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .skill-card,
  .skill-card * {
    transition: none !important;
    animation: none !important;
  }
}
</style>
