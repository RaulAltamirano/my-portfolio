<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useColorMode } from '#imports'
import { 
  HomeIcon, 
  AcademicCapIcon, 
  BriefcaseIcon, 
  SparklesIcon, 
  PhoneIcon,
  SunIcon,
  MoonIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

// Types and interfaces
type SectionNames = 'Home' | 'Skills' | 'Projects' | 'Experience' | 'Contact'

interface NavigationItem {
  name: SectionNames
  href: string
  icon: any
}

// State management
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const isMobileMenuOpen = ref(false)
const currentHash = ref('#home')
const isScrolled = ref(false)

// Navigation items with enhanced metadata
const navigation: NavigationItem[] = [
  { name: 'Home', href: '#home', icon: HomeIcon },
  { name: 'Skills', href: '#skills', icon: AcademicCapIcon },
  { name: 'Projects', href: '#projects', icon: BriefcaseIcon },
  { name: 'Experience', href: '#experience', icon: SparklesIcon },
  { name: 'Contact', href: '#contact', icon: PhoneIcon }
]

// Scroll handling
const handleScroll = () => {
  if (process.client) {
    isScrolled.value = window.scrollY > 20
  }
}

// Methods
const toggleDarkMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleNavClick = (href: string) => {
  if (process.client) {
    window.location.hash = href
    requestAnimationFrame(() => {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        closeMobileMenu()
      }
    })
  }
}

const updateHash = () => {
  if (process.client) {
    currentHash.value = window.location.hash || '#home'
  }
}

const isCurrentSection = (href: string) => currentHash.value === href

// Lifecycle hooks
onMounted(() => {
  if (process.client) {
    updateHash()
    window.addEventListener('hashchange', updateHash)
    window.addEventListener('scroll', handleScroll)
  }
})

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('hashchange', updateHash)
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>

<template>
  <nav 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[
      isScrolled 
        ? 'py-2 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 shadow-lg' 
        : 'py-4 backdrop-blur-md bg-white/60 dark:bg-gray-900/60',
      'border-b border-gray-200/20 dark:border-gray-700/20'
    ]"
    role="navigation"
    aria-label="Main navigation"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-12">
        <!-- Logo/Brand -->
        <div class="flex-shrink-0">
          <NuxtLink 
            to="#home" 
            class="relative group inline-flex items-center space-x-2"
            @click="handleNavClick('#home')"
            aria-label="Go to home section"
          >
            <!-- Neural network logo background -->
            <div 
              class="relative w-8 h-8 rounded-lg overflow-hidden"
              :class="[
                isDark 
                  ? 'bg-gradient-to-br from-blue-600/20 to-cyan-500/20' 
                  : 'bg-gradient-to-br from-blue-600/10 to-cyan-500/10'
              ]"
            >
              <!-- Animated neural network overlay -->
              <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
              <div class="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,_var(--tw-gradient-stops))] from-transparent via-white/5 to-transparent animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <!-- Logo icon -->
              <div class="relative z-10 flex items-center justify-center h-full">
                <HomeIcon class="w-5 h-5" :class="isDark ? 'text-blue-400' : 'text-blue-600'" />
              </div>
            </div>

            <!-- Brand text -->
            <span 
              class="text-lg font-bold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
              :class="[
                isDark ? 'group-hover:from-blue-400 group-hover:to-cyan-400' : 'group-hover:from-blue-700 group-hover:to-cyan-600'
              ]"
            >
              Portfolio
            </span>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex md:items-center md:space-x-1">
          <template v-for="item in navigation" :key="item.name">
            <button
              :class="[
                'group relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                isCurrentSection(item.href)
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
              ]"
              @click="handleNavClick(item.href)"
              :aria-current="isCurrentSection(item.href) ? 'page' : undefined"
            >
              <div class="flex items-center space-x-2">
                <component 
                  :is="item.icon" 
                  class="w-5 h-5 transition-transform duration-200"
                  :class="[
                    isCurrentSection(item.href)
                      ? 'text-blue-600 dark:text-blue-400 transform scale-110'
                      : 'text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400 group-hover:scale-110'
                  ]"
                />
                <span>{{ item.name }}</span>
              </div>
              
              <!-- Active indicator with enhanced animation -->
              <div 
                v-if="isCurrentSection(item.href)"
                class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transform scale-x-100 transition-transform duration-200"
              />
              <div 
                v-else
                class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
              />

              <!-- Hover glow effect -->
              <div 
                class="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                :class="[
                  isDark 
                    ? 'bg-blue-500/5' 
                    : 'bg-blue-500/10'
                ]"
              />
            </button>
          </template>

          <!-- Theme Toggle with enhanced animation -->
          <button
            @click="toggleDarkMode"
            class="relative ml-4 p-2 rounded-lg transition-all duration-200"
            :class="[
              isDark 
                ? 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/10' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-500/10'
            ]"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <div class="relative z-10">
              <SunIcon v-if="isDark" class="w-5 h-5 transform transition-transform duration-200 hover:rotate-45" />
              <MoonIcon v-else class="w-5 h-5 transform transition-transform duration-200 hover:rotate-45" />
            </div>
            
            <!-- Hover glow effect -->
            <div 
              class="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-200"
              :class="[
                isDark 
                  ? 'bg-blue-500/5' 
                  : 'bg-blue-500/10'
              ]"
            />
          </button>
        </div>

        <!-- Mobile menu button with enhanced animation -->
        <div class="flex md:hidden">
          <button
            @click="toggleMobileMenu"
            class="relative p-2 rounded-lg transition-all duration-200"
            :class="[
              isDark 
                ? 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/10' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-500/10'
            ]"
            :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
            :aria-expanded="isMobileMenuOpen"
          >
            <div class="relative z-10">
              <Bars3Icon 
                v-if="!isMobileMenuOpen" 
                class="w-6 h-6 transform transition-transform duration-200 hover:scale-110" 
              />
              <XMarkIcon 
                v-else 
                class="w-6 h-6 transform transition-transform duration-200 hover:scale-110" 
              />
            </div>
            
            <!-- Hover glow effect -->
            <div 
              class="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-200"
              :class="[
                isDark 
                  ? 'bg-blue-500/5' 
                  : 'bg-blue-500/10'
              ]"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu with enhanced transitions -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden absolute top-full left-0 right-0 backdrop-blur-xl border-b border-gray-200/20 dark:border-gray-700/20"
        :class="[
          isDark 
            ? 'bg-gray-900/95' 
            : 'bg-white/95'
        ]"
      >
        <div class="px-2 pt-2 pb-3 space-y-1">
          <template v-for="item in navigation" :key="item.name">
            <button
              :class="[
                'w-full flex items-center px-3 py-2 rounded-lg text-base font-medium transition-all duration-200',
                isCurrentSection(item.href)
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
              ]"
              @click="handleNavClick(item.href)"
              :aria-current="isCurrentSection(item.href) ? 'page' : undefined"
            >
              <component 
                :is="item.icon" 
                class="w-5 h-5 mr-3 transition-transform duration-200"
                :class="[
                  isCurrentSection(item.href)
                    ? 'text-blue-600 dark:text-blue-400 transform scale-110'
                    : 'text-gray-500 dark:text-gray-400 group-hover:scale-110'
                ]"
              />
              {{ item.name }}
            </button>
          </template>

          <!-- Mobile Theme Toggle -->
          <button
            @click="toggleDarkMode"
            class="w-full flex items-center px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
            :class="[
              isDark 
                ? 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/10' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-500/10'
            ]"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <SunIcon v-if="isDark" class="w-5 h-5 mr-3" />
            <MoonIcon v-else class="w-5 h-5 mr-3" />
            {{ isDark ? 'Light Mode' : 'Dark Mode' }}
          </button>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
/* Custom animations */
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}

/* Enhanced glassmorphism effect */
.backdrop-blur-xl {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.backdrop-blur-md {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  .backdrop-blur-xl,
  .backdrop-blur-md {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}

/* Touch device optimizations */
@media (hover: none) {
  .backdrop-blur-xl,
  .backdrop-blur-md {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
  
  .group:hover .group-hover\:opacity-100 {
    opacity: 0;
  }
  
  .group:hover .group-hover\:scale-110 {
    transform: none;
  }
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .backdrop-blur-xl,
  .backdrop-blur-md {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}

/* Performance optimizations */
nav {
  will-change: transform, opacity, backdrop-filter;
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* Smooth scrolling for the entire page */
html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
</style>