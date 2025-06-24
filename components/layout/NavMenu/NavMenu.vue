<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
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
  colors: {
    from: string
    to: string
    base: string
  }
}

// State management - Usar el composable useDarkMode
const { isDark, toggleDarkMode: toggleTheme } = useDarkMode()
const isMobileMenuOpen = ref(false)
const currentHash = ref('#home')
const isScrolled = ref(false)
const currentSection = ref<SectionNames>('Home')
const isTransitioning = ref(false)
const previousSection = ref<SectionNames>('Home')
const transitionDirection = ref<'forward' | 'backward'>('forward')
const isTogglingMode = ref(false)

// Navigation items with enhanced metadata and colors
const navigation: NavigationItem[] = [
  { 
    name: 'Home', 
    href: '#home', 
    icon: HomeIcon,
    colors: { from: 'from-blue-600', to: 'to-cyan-500', base: 'blue' }
  },
  { 
    name: 'Skills', 
    href: '#skills', 
    icon: AcademicCapIcon,
    colors: { from: 'from-emerald-600', to: 'to-teal-500', base: 'emerald' }
  },
  { 
    name: 'Projects', 
    href: '#projects', 
    icon: BriefcaseIcon,
    colors: { from: 'from-purple-600', to: 'to-pink-500', base: 'purple' }
  },
  { 
    name: 'Experience', 
    href: '#experience', 
    icon: SparklesIcon,
    colors: { from: 'from-orange-600', to: 'to-red-500', base: 'orange' }
  },
  { 
    name: 'Contact', 
    href: '#contact', 
    icon: PhoneIcon,
    colors: { from: 'from-indigo-600', to: 'to-blue-500', base: 'indigo' }
  }
]

// Computed current colors
const currentColors = computed(() => {
  const currentItem = navigation.find(item => item.name === currentSection.value)
  return currentItem?.colors || navigation[0].colors
})

// Helper function to get color classes with improved dark mode support
const getColorClasses = (baseColor: string, variant: 'text' | 'bg' | 'border' = 'text') => {
  const colorMap = {
    blue: {
      text: isDark.value ? 'text-blue-400' : 'text-blue-600',
      bg: isDark.value ? 'bg-blue-900/30' : 'bg-blue-50',
      border: 'border-blue-500'
    },
    emerald: {
      text: isDark.value ? 'text-emerald-400' : 'text-emerald-600',
      bg: isDark.value ? 'bg-emerald-900/30' : 'bg-emerald-50',
      border: 'border-emerald-500'
    },
    purple: {
      text: isDark.value ? 'text-purple-400' : 'text-purple-600',
      bg: isDark.value ? 'bg-purple-900/30' : 'bg-purple-50',
      border: 'border-purple-500'
    },
    orange: {
      text: isDark.value ? 'text-orange-400' : 'text-orange-600',
      bg: isDark.value ? 'bg-orange-900/30' : 'bg-orange-50',
      border: 'border-orange-500'
    },
    indigo: {
      text: isDark.value ? 'text-indigo-400' : 'text-indigo-600',
      bg: isDark.value ? 'bg-indigo-900/30' : 'bg-indigo-50',
      border: 'border-indigo-500'
    }
  }
  
  return colorMap[baseColor as keyof typeof colorMap]?.[variant] || colorMap.blue[variant]
}

// Intersection Observer for section detection
let observer: IntersectionObserver | null = null

const setupIntersectionObserver = () => {
  if (!process.client) return

  // Limpiar observer anterior si existe
  if (observer) {
    observer.disconnect()
    observer = null
  }

  observer = new IntersectionObserver(
    (entries) => {
      // Encontrar la sección con mayor intersección (más visible)
      let maxRatio = 0
      let mostVisibleSection: Element | null = null
      
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio
          mostVisibleSection = entry.target
        }
      })
      
      if (mostVisibleSection && maxRatio > 0.1) { // Solo cambiar si hay al menos 10% de visibilidad
        const sectionId = (mostVisibleSection as HTMLElement).id
        const sectionName = navigation.find(item => 
          item.href === `#${sectionId}`
        )?.name
        
        if (sectionName) {
          currentSection.value = sectionName
          currentHash.value = `#${sectionId}`
        }
      }
    },
    {
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0], // Múltiples thresholds para mejor detección
      rootMargin: '-10% 0px -10% 0px' // Margen más conservador
    }
  )

  // Observe all sections
  navigation.forEach(item => {
    const element = document.querySelector(item.href)
    if (element && observer) {
      observer.observe(element)
    }
  })
}

// Scroll handling
const handleScroll = () => {
  if (process.client) {
    isScrolled.value = window.scrollY > 20
    
    // Fallback: detectar sección actual por posición de scroll
    const sections = navigation.map(item => ({
      ...item,
      element: document.querySelector(item.href) as HTMLElement
    })).filter(item => item.element)
    
    if (sections.length > 0) {
      const scrollPosition = window.scrollY + window.innerHeight / 2
      let currentSectionByScroll = sections[0]
      
      sections.forEach(section => {
        const rect = section.element.getBoundingClientRect()
        const elementTop = rect.top + window.scrollY
        const elementBottom = elementTop + rect.height
        
        if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
          currentSectionByScroll = section
        }
      })
      
      if (currentSectionByScroll.name !== currentSection.value) {
        currentSection.value = currentSectionByScroll.name
        currentHash.value = currentSectionByScroll.href
      }
    }
  }
}

// Methods - Mejorar el toggle del dark mode
const toggleDarkMode = () => {
  isTogglingMode.value = true
  toggleTheme()
  setTimeout(() => { isTogglingMode.value = false }, 400)
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
      const element = document.querySelector(href) as HTMLElement
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

// --- Accesibilidad y UX ---
// Referencia al menú móvil para click fuera
const mobileMenuRef = ref<HTMLElement | null>(null)

// Cerrar menú móvil con Esc y click fuera
const handleKeydown = (e: KeyboardEvent) => {
  if (isMobileMenuOpen.value && e.key === 'Escape') {
    closeMobileMenu()
  }
}
const handleClickOutside = (e: MouseEvent) => {
  if (isMobileMenuOpen.value && mobileMenuRef.value && !mobileMenuRef.value.contains(e.target as Node)) {
    closeMobileMenu()
  }
}

// --- Mejoras de accesibilidad ---
const handleNavKeydown = (e: KeyboardEvent, href: string) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    handleNavClick(href)
  }
}

// Lifecycle hooks
onMounted(() => {
  if (process.client) {
    updateHash()
    window.addEventListener('hashchange', updateHash)
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('keydown', handleKeydown)
    document.addEventListener('mousedown', handleClickOutside)
    setTimeout(() => {
      setupIntersectionObserver()
    }, 200)
    
    // Verificación adicional después de 1 segundo
    setTimeout(() => {
      const skillsSection = document.querySelector('#skills')
      if (!skillsSection) {
        setupIntersectionObserver()
      }
    }, 1000)
  }
})

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('hashchange', updateHash)
    window.removeEventListener('scroll', handleScroll)
    document.removeEventListener('keydown', handleKeydown)
    document.removeEventListener('mousedown', handleClickOutside)
    if (observer) {
      observer.disconnect()
    }
  }
})
</script>

<template>
  <nav 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="[
      isScrolled 
        ? 'py-2 backdrop-blur-xl shadow-lg' 
        : 'py-4 backdrop-blur-md',
      isDark 
        ? isScrolled 
          ? 'bg-slate-900/90 border-slate-700/30' 
          : 'bg-slate-900/70 border-slate-700/20'
        : isScrolled 
          ? 'bg-white/90 border-slate-200/30' 
          : 'bg-white/70 border-slate-200/20',
      'border-b'
    ]"
    role="navigation"
    aria-label="Navegación principal"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-12">
        <!-- Logo/Brand -->
        <div class="flex-shrink-0">
          <NuxtLink 
            to="#home" 
            class="relative group inline-flex items-center space-x-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 rounded-lg"
            @click="handleNavClick('#home')"
            tabindex="0"
            @keydown="(e: KeyboardEvent) => handleNavKeydown(e, '#home')"
          >
            <!-- Personalized logo background -->
            <div 
              class="relative w-10 h-10 rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-105"
              :class="[
                isDark 
                  ? 'bg-gradient-to-br from-blue-500/30 to-cyan-400/30 ring-1 ring-blue-400/40' 
                  : 'bg-gradient-to-br from-blue-600/20 to-cyan-500/20 ring-1 ring-blue-500/30'
              ]"
            >
              <!-- Animated background overlay -->
              <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
              <div class="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,_var(--tw-gradient-stops))] from-transparent via-white/5 to-transparent animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <!-- Personalized initials -->
              <div class="relative z-10 flex items-center justify-center h-full">
                <span 
                  class="text-sm font-bold tracking-wider transition-all duration-300"
                  :class="`bg-gradient-to-r ${currentColors.from} ${currentColors.to} bg-clip-text text-transparent`"
                >
                  JD
                </span>
              </div>
            </div>

            <!-- Brand text with name -->
            <div class="flex flex-col items-start">
              <span 
                class="text-lg font-bold tracking-tight transition-all duration-300"
                :class="`bg-gradient-to-r ${currentColors.from} ${currentColors.to} bg-clip-text text-transparent`"
              >
                Juan Doe
              </span>
              <span 
                class="text-xs font-medium tracking-wide transition-all duration-300"
                :class="[
                  isDark ? 'text-slate-300' : 'text-slate-600'
                ]"
              >
                Full Stack Developer
              </span>
            </div>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex md:items-center md:space-x-1">
          <template v-for="item in navigation" :key="item.name">
            <button
              :class="[
                'group relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500',
                isCurrentSection(item.href)
                  ? getColorClasses(item.colors.base, 'text')
                  : isDark 
                    ? 'text-slate-300 hover:text-white' 
                    : 'text-slate-700 hover:text-slate-900'
              ]"
              @click="handleNavClick(item.href)"
              :aria-current="isCurrentSection(item.href) ? 'page' : undefined"
              :tabindex="0"
              @keydown="e => handleNavKeydown(e, item.href)"
            >
              <div class="flex items-center space-x-2">
                <component 
                  :is="item.icon" 
                  class="w-5 h-5 transition-all duration-300"
                  :class="[
                    isCurrentSection(item.href)
                      ? `${getColorClasses(item.colors.base, 'text')} transform scale-110`
                      : isDark 
                        ? 'text-slate-400 group-hover:text-slate-200 group-hover:scale-110' 
                        : 'text-slate-500 group-hover:text-slate-700 group-hover:scale-110'
                  ]"
                />
                <span>{{ item.name }}</span>
              </div>
              
              <!-- Active indicator with dynamic colors -->
              <div 
                v-if="isCurrentSection(item.href)"
                class="absolute bottom-0 left-0 right-0 h-0.5 rounded-full transform scale-x-100 transition-all duration-300"
                :class="`bg-gradient-to-r ${item.colors.from} ${item.colors.to}`"
              />
              <div 
                v-else
                class="absolute bottom-0 left-0 right-0 h-0.5 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"
                :class="`bg-gradient-to-r ${item.colors.from} ${item.colors.to}`"
              />

              <!-- Simple hover effect -->
              <div 
                class="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                :class="[
                  isDark 
                    ? 'bg-slate-800/60' 
                    : 'bg-slate-100/80'
                ]"
              />
            </button>
          </template>

          <!-- Theme Toggle with enhanced animation -->
          <button
            @click="toggleDarkMode"
            class="relative ml-4 p-2 rounded-lg transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
            :class="[
              isDark 
                ? 'text-slate-300 hover:text-blue-400 hover:bg-blue-500/15' 
                : 'text-slate-700 hover:text-blue-600 hover:bg-blue-500/15',
              isTogglingMode ? 'animate-pulse' : ''
            ]"
            :aria-label="isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
            :tabindex="0"
          >
            <div class="relative z-10">
              <SunIcon v-if="isDark" class="w-5 h-5 transform transition-transform duration-300 hover:rotate-45" />
              <MoonIcon v-else class="w-5 h-5 transform transition-transform duration-300 hover:rotate-45" />
            </div>
            
            <!-- Hover glow effect -->
            <div 
              class="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"
              :class="[
                isDark 
                  ? 'bg-blue-500/10' 
                  : 'bg-blue-500/15'
              ]"
            />
          </button>
        </div>

        <!-- Mobile menu button with enhanced animation -->
        <div class="flex md:hidden">
          <button
            @click="toggleMobileMenu"
            class="relative p-2 rounded-lg transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
            :class="[
              isDark 
                ? 'text-slate-300 hover:text-blue-400 hover:bg-blue-500/15' 
                : 'text-slate-700 hover:text-blue-600 hover:bg-blue-500/15'
            ]"
            :aria-label="isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'"
            :aria-expanded="isMobileMenuOpen"
            :tabindex="0"
          >
            <div class="relative z-10">
              <Bars3Icon 
                v-if="!isMobileMenuOpen" 
                class="w-6 h-6 transform transition-transform duration-300 hover:scale-110" 
              />
              <XMarkIcon 
                v-else 
                class="w-6 h-6 transform transition-transform duration-300 hover:scale-110" 
              />
            </div>
            
            <!-- Hover glow effect -->
            <div 
              class="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"
              :class="[
                isDark 
                  ? 'bg-blue-500/10' 
                  : 'bg-blue-500/15'
              ]"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu with enhanced transitions -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isMobileMenuOpen"
        ref="mobileMenuRef"
        class="md:hidden absolute top-full left-0 right-0 backdrop-blur-xl border-b shadow-xl focus:outline-none"
        :class="[
          isDark 
            ? 'bg-slate-900/95 border-slate-700/30' 
            : 'bg-white/95 border-slate-200/30'
        ]"
        tabindex="0"
      >
        <div class="px-2 pt-2 pb-3 space-y-1">
          <template v-for="item in navigation" :key="item.name">
            <button
              :class="[
                'w-full flex items-center px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500',
                isCurrentSection(item.href)
                  ? `${getColorClasses(item.colors.base, 'text')} ${getColorClasses(item.colors.base, 'bg')}`
                  : isDark 
                    ? 'text-slate-300 hover:text-white hover:bg-slate-800/60' 
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              ]"
              @click="handleNavClick(item.href)"
              :aria-current="isCurrentSection(item.href) ? 'page' : undefined"
              :tabindex="0"
              @keydown="e => handleNavKeydown(e, item.href)"
            >
              <component 
                :is="item.icon" 
                class="w-5 h-5 mr-3 transition-all duration-300"
                :class="[
                  isCurrentSection(item.href)
                    ? `${getColorClasses(item.colors.base, 'text')} transform scale-110`
                    : isDark 
                      ? 'text-slate-400' 
                      : 'text-slate-500'
                ]"
              />
              {{ item.name }}
            </button>
          </template>

          <!-- Mobile Theme Toggle -->
          <button
            @click="toggleDarkMode"
            class="w-full flex items-center px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
            :class="[
              isDark 
                ? 'text-slate-300 hover:text-white hover:bg-slate-800/60' 
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50',
              isTogglingMode ? 'animate-pulse' : ''
            ]"
            :aria-label="isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
            :tabindex="0"
          >
            <SunIcon v-if="isDark" class="w-5 h-5 mr-3" />
            <MoonIcon v-else class="w-5 h-5 mr-3" />
            {{ isDark ? 'Modo claro' : 'Modo oscuro' }}
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

/* Enhanced focus states for accessibility */
button:focus-visible,
a:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
  border-radius: 0.5rem;
}
</style>