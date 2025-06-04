<template>
  <nav 
    v-motion
    :initial="navVariants.initial"
    :enter="navVariants.enter"
    class="fixed top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-sm transition-colors duration-300"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 md:h-20">
        <NuxtLink 
          to="/" 
          class="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-emerald-500/50 rounded-lg p-1.5 transition-all duration-300 hover:bg-slate-50/50 dark:hover:bg-slate-800/50"
        >
          <div class="relative">
            <div class="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-emerald-500/95 via-teal-500/95 to-cyan-500/95 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 transform group-hover:scale-105 group-hover:rotate-2 transition-all duration-500 ease-out">
              <svg class="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m-4 4l4 4-4 4"/>
              </svg>
            </div>
            <div class="absolute inset-0 w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"></div>
          </div>
          <div class="hidden sm:block">
            <div class="font-display font-bold text-lg md:text-xl text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300 tracking-tight">
              Raul Altamirano
            </div>
            <div class="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase mt-0.5">
              Frontend Developer
            </div>
          </div>
        </NuxtLink>

        <div class="hidden md:flex items-center space-x-4">
          <div class="flex items-center space-x-1.5 bg-slate-50/90 dark:bg-slate-800/90 rounded-2xl p-1.5 backdrop-blur-sm shadow-sm border border-slate-200/50 dark:border-slate-700/50">
            <NuxtLink 
              v-for="item in navigation" 
              :key="item.name"
              :to="item.href"
              class="nav-link relative px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ease-out group focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              :class="[
                isCurrentSection(item.href) ? 
                  'text-white bg-gradient-to-r from-emerald-500/95 to-cyan-500/95 shadow-md shadow-emerald-500/20' : 
                  'text-slate-700 dark:text-slate-300 hover:text-white',
                'transform hover:scale-[1.02]'
              ]"
              @click="handleNavClick(item.href)"
            >
              <span class="relative z-10 flex items-center space-x-2">
                <component 
                  :is="getNavIcon(item.name)" 
                  class="w-4 h-4 transition-all duration-300 ease-out" 
                  :class="[
                    isCurrentSection(item.href) ? 'text-white scale-110' : 'text-slate-600 dark:text-slate-400 group-hover:text-white',
                    'group-hover:scale-110 group-hover:rotate-12'
                  ]"
                />
                <span class="font-medium">{{ item.name }}</span>
              </span>
              <div 
                v-if="!isCurrentSection(item.href)"
                class="absolute inset-0 bg-gradient-to-r from-emerald-500/95 to-cyan-500/95 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform scale-95 group-hover:scale-100"
              ></div>
              <div 
                v-if="isCurrentSection(item.href)"
                class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-sm shadow-emerald-500/50"
              ></div>
            </NuxtLink>
          </div>
          
          <div class="w-px h-8 bg-gradient-to-b from-transparent via-slate-200/80 dark:via-slate-700/80 to-transparent mx-4"></div>
          
          <button 
            @click="toggleDarkMode"
            class="relative p-2.5 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-emerald-500/50 border border-slate-200/50 dark:border-slate-700/50"
            aria-label="Toggle dark mode"
          >
            <div class="relative w-5 h-5">
              <svg v-if="isDark" 
                class="w-5 h-5 text-amber-400 transform group-hover:rotate-180 transition-transform duration-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
              <svg v-else 
                class="w-5 h-5 text-slate-600 dark:text-slate-400 transform group-hover:rotate-180 transition-transform duration-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
              </svg>
            </div>
          </button>
          
          <NuxtLink 
            to="#contact"
            class="relative inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500/95 via-teal-500/95 to-cyan-500/95 rounded-xl hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 transform hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-500 shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 group overflow-hidden focus:outline-none focus:ring-2 focus:ring-emerald-500/50 border border-emerald-500/20"
            @click="handleNavClick('#contact')"
          >
            <span class="relative z-10 flex items-center space-x-2">
              <div class="relative w-5 h-5 transition-transform duration-300 group-hover:scale-110">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
              </div>
              <span>Let's Talk</span>
            </span>
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
          </NuxtLink>
        </div>

        <button 
          @click="toggleMobileMenu"
          class="md:hidden relative p-2.5 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-emerald-500/50 border border-slate-200/50 dark:border-slate-700/50"
          aria-label="Toggle mobile menu"
        >
          <div class="relative w-6 h-6">
            <svg v-if="!isMobileMenuOpen" class="w-6 h-6 text-slate-600 dark:text-slate-400 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg v-else class="w-6 h-6 text-slate-600 dark:text-slate-400 transform rotate-90 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </div>
        </button>
      </div>

      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform -translate-y-4 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-4 opacity-0"
      >
        <div 
          v-if="isMobileMenuOpen" 
          class="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-xl"
        >
          <div class="px-4 py-6 space-y-3">
            <div class="space-y-1.5">
              <NuxtLink 
                v-for="(item, index) in navigation" 
                :key="item.name"
                :to="item.href"
                @click="closeMobileMenu"
                class="flex items-center justify-between group font-medium py-3.5 px-4 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 border border-transparent hover:border-slate-200/50 dark:hover:border-slate-700/50"
                :class="isCurrentSection(item.href) ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' : 'text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-50/80 dark:hover:bg-slate-800/80'"
                :style="{ transitionDelay: `${index * 50}ms` }"
              >
                <div class="flex items-center space-x-3">
                  <component :is="getNavIcon(item.name)" class="w-5 h-5" />
                  <span class="text-base font-medium">{{ item.name }}</span>
                </div>
                <svg class="w-5 h-5 text-slate-400 group-hover:text-emerald-500 transform group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </NuxtLink>
            </div>
            
            <div class="h-px bg-gradient-to-r from-transparent via-slate-200/80 dark:via-slate-700/80 to-transparent my-4"></div>
            
            <div class="flex items-center justify-between">
              <button 
                @click="toggleDarkMode"
                class="flex items-center space-x-3 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium py-2.5 px-4 rounded-xl hover:bg-slate-50/80 dark:hover:bg-slate-800/80 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-emerald-500/50 border border-slate-200/50 dark:border-slate-700/50"
              >
                <div class="relative">
                  <svg v-if="isDark" class="w-5 h-5 text-amber-400 transform group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                  <svg v-else class="w-5 h-5 transform group-hover:-rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                  </svg>
                </div>
                <span>{{ isDark ? 'Light Mode' : 'Dark Mode' }}</span>
              </button>
              
              <NuxtLink 
                to="#contacto"
                @click="closeMobileMenu"
                class="relative inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500/95 to-cyan-500/95 rounded-xl hover:from-emerald-600 hover:to-cyan-600 transform hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-emerald-500/20 group overflow-hidden focus:outline-none focus:ring-2 focus:ring-emerald-500/50 border border-emerald-500/20"
              >
                <span class="relative z-10 flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                  <span>Contactar</span>
                </span>
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { 
  HomeIcon, 
  AcademicCapIcon,
  BriefcaseIcon,
  SparklesIcon,
  PhoneIcon 
} from '@heroicons/vue/24/outline'
import { spring } from '@motionone/dom'
import { useScroll } from '@vueuse/core'

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' }
]

const isMobileMenuOpen = ref(false)
const isDark = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  if (process.client) {
    document.documentElement.classList.toggle('dark', isDark.value)
    localStorage.setItem('darkMode', isDark.value.toString())
  }
}
const currentHash = ref('#inicio')

// Función para manejar el clic en la navegación
const handleNavClick = (href: string) => {
  if (process.client) {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
      window.location.hash = href
    }
  }
}

// Función mejorada para actualizar el hash
const updateHash = () => {
  if (process.client) {
    const hash = window.location.hash || '#home'
    currentHash.value = hash
    
    // Actualizar la clase activa en el menú
    const navLinks = document.querySelectorAll('.nav-link')
    navLinks.forEach(link => {
      const href = link.getAttribute('href')
      if (href === hash) {
        link.classList.add('active')
      } else {
        link.classList.remove('active')
      }
    })
  }
}

// Watcher para actualizar el hash cuando cambia
const hashListener = () => {
  updateHash()
}

onMounted(() => {
  if (process.client) {
    updateHash() // Actualizar inicialmente
    window.addEventListener('hashchange', hashListener)
    
    // Setup intersection observer for sections
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target
          // Add v-motion class to trigger animation
          section.classList.add('v-motion-enter')
        }
      })
    }, {
      threshold: 0.1,
      rootMargin: '-50px'
    })

    // Observe all sections
    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section)
    })

    // Cleanup
    onUnmounted(() => {
      observer.disconnect()
    })
  }
})

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('hashchange', hashListener)
  }
})

const isCurrentSection = (href: string) => {
  return currentHash.value === href
}

// Función para obtener el ícono de cada sección
type SectionNames = 'Home' | 'Skills' | 'Projects' | 'Experience' | 'Contact';
const getNavIcon = (sectionName: SectionNames) => {
  const icons = {
    'Home': HomeIcon,
    'Skills': AcademicCapIcon,
    'Projects': BriefcaseIcon,
    'Experience': SparklesIcon,
    'Contact': PhoneIcon
  }
  return icons[sectionName] || HomeIcon
}

onMounted(() => {
  if (process.client) {
    const savedDarkMode = localStorage.getItem('darkMode')
    isDark.value = savedDarkMode === 'true'
    document.documentElement.classList.toggle('dark', isDark.value)
  }
})

// Add scroll animations
const { y: scrollY } = useScroll(window)

// Define motion variants
const navVariants = {
  initial: { y: -100, opacity: 0 },
  enter: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.8,
      easing: spring({ damping: 15, stiffness: 100 })
    }
  }
}

const sectionVariants = {
  initial: { opacity: 0, y: 50 },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      easing: spring({ damping: 15, stiffness: 100 }),
      delay: 0.2
    }
  }
}

onMounted(() => {
  if (process.client) {
    updateHash() // Update initially
    window.addEventListener('hashchange', hashListener)
    
    // Setup intersection observer for sections
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target
          // Add v-motion class to trigger animation
          section.classList.add('v-motion-enter')
        }
      })
    }, {
      threshold: 0.1,
      rootMargin: '-50px'
    })

    // Observe all sections
    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section)
    })

    // Cleanup
    onUnmounted(() => {
      observer.disconnect()
    })
  }
})
</script>

<style scoped>
/* Efectos de hover personalizados mejorados */
.nav-link {
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link:hover::before {
  transform: translateX(100%);
}

.nav-link.active {
  transform: scale(1.02);
  box-shadow: 0 4px 12px -2px rgba(16, 185, 129, 0.2);
}

/* Animación para el indicador de sección actual */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
  50% {
    opacity: 0.5;
    transform: translateX(-50%) scale(1.5);
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px; /* Adjust based on your nav height */
}

/* Transiciones mejoradas */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Efecto de brillo en hover */
.nav-link:hover {
  text-shadow: 0 0 8px rgba(16, 185, 129, 0.2);
}

/* Transición suave para el modo oscuro */
.dark {
  transition: background-color 0.5s ease, color 0.5s ease;
}

/* Accesibilidad para prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .nav-link,
  .nav-link:hover,
  .nav-link.active,
  section,
  section:target,
  .transition-all,
  .transform,
  .animate-pulse,
  .group-hover\:scale-110,
  .group-hover\:rotate-12,
  .group-hover\:translate-x-1,
  .group-hover\:rotate-180,
  .group-hover\:-rotate-12,
  .group-hover\:scale-105,
  .group-hover\:rotate-2,
  .group-hover\:translate-y-0\.5,
  .group-hover\:translate-x-full {
    transition: none !important;
    animation: none !important;
    transform: none !important;
  }
}

/* Mejoras de accesibilidad para focus */
:focus-visible {
  /* outline: 2px solid theme('colors.emerald.500'); */
  outline-offset: 2px;
}

/* Mejoras de contraste para modo oscuro */

/* Mejoras de espaciado táctil para móviles */
@media (max-width: 768px) {
  .nav-link,
  button {
    min-height: 44px;
    min-width: 44px;
  }
}

/* Add transition for nav items */
.nav-link {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Add hover effect for nav items */
.nav-link:hover {
  transform: translateY(-2px);
}
</style>