<template>
  <footer
    class="w-full border-t backdrop-blur-xl transition-all duration-300"
    :class="[
      isDark 
        ? 'border-slate-700/20 bg-slate-900/80' 
        : 'border-slate-200/20 bg-white/80'
    ]"
    role="contentinfo"
  >
    <div class="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Contacto -->
        <div>
          <h3 
            class="text-sm font-semibold tracking-wider uppercase mb-4 transition-colors duration-300"
            :class="[
              isDark ? 'text-slate-300' : 'text-slate-400'
            ]"
          >
            Contacto
          </h3>
          <ul class="space-y-3">
            <li v-for="contact in contacts" :key="contact.name">
              <a
                :href="contact.href"
                class="flex items-center gap-2 text-base px-2 py-1 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2"
                :class="[
                  isDark 
                    ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-800/50 focus:ring-blue-400/50' 
                    : 'text-slate-500 hover:text-blue-600 hover:bg-slate-100/50 focus:ring-blue-500/50'
                ]"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span v-if="contact.icon">
                  <component :is="contact.icon" class="w-5 h-5" />
                </span>
                <span>{{ contact.name }}</span>
              </a>
            </li>
          </ul>
        </div>
        <!-- Enlaces -->
        <div>
          <h3 
            class="text-sm font-semibold tracking-wider uppercase mb-4 transition-colors duration-300"
            :class="[
              isDark ? 'text-slate-300' : 'text-slate-400'
            ]"
          >
            Enlaces
          </h3>
          <ul class="space-y-3">
            <li v-for="link in links" :key="link.name">
              <NuxtLink
                :to="link.href"
                class="text-base px-2 py-1 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2"
                :class="[
                  isDark 
                    ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-800/50 focus:ring-blue-400/50' 
                    : 'text-slate-500 hover:text-blue-600 hover:bg-slate-100/50 focus:ring-blue-500/50'
                ]"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <!-- Redes Sociales -->
        <div>
          <h3 
            class="text-sm font-semibold tracking-wider uppercase mb-4 transition-colors duration-300"
            :class="[
              isDark ? 'text-slate-300' : 'text-slate-400'
            ]"
          >
            Redes Sociales
          </h3>
          <ul class="space-y-3">
            <li v-for="social in socials" :key="social.name">
              <a
                :href="social.href"
                class="flex items-center gap-2 text-base px-2 py-1 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2"
                :class="[
                  isDark 
                    ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-800/50 focus:ring-blue-400/50' 
                    : 'text-slate-500 hover:text-blue-600 hover:bg-slate-100/50 focus:ring-blue-500/50'
                ]"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span v-if="social.icon">
                  <component :is="social.icon" class="w-5 h-5" />
                </span>
                <span>{{ social.name }}</span>
                <svg class="w-4 h-4 ml-1" viewBox="0 0 24 24"><path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div 
        class="mt-10 border-t pt-8 transition-colors duration-300"
        :class="[
          isDark ? 'border-slate-700' : 'border-slate-200'
        ]"
      >
        <p 
          class="text-base text-center transition-colors duration-300"
          :class="[
            isDark ? 'text-slate-500' : 'text-slate-400'
          ]"
        >
          &copy; {{ year }} Raul Altamirano. Todos los derechos reservados.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  EnvelopeIcon,
  LinkIcon,
  UserCircleIcon,
  ArrowTopRightOnSquareIcon,
  AtSymbolIcon,
  GlobeAltIcon,
  DocumentTextIcon
} from '@heroicons/vue/24/outline'

// Importar el composable de dark mode
const { isDark } = useDarkMode()

const year = new Date().getFullYear()

const contacts = [
  { name: 'Email', href: 'mailto:contacto@raulaltamirano.com', icon: EnvelopeIcon },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/raulaltamirano', icon: LinkIcon },
  { name: 'GitHub', href: 'https://github.com/RaulAltamirano', icon: UserCircleIcon }
]

const links = [
  { name: 'Términos de servicio', href: '/terms' },
  { name: 'Política de privacidad', href: '/privacy' }
]

const socials = [
  { name: 'Twitter', href: 'https://twitter.com/raulaltamirano', icon: AtSymbolIcon },
  { name: 'Instagram', href: 'https://instagram.com/raulaltamirano', icon: GlobeAltIcon },
  { name: 'Medium', href: 'https://medium.com/@raulaltamirano', icon: DocumentTextIcon }
]
</script>

<style scoped>
.backdrop-blur-xl {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

/* Hover effects mejorados */
a:hover,
.nuxt-link-active {
  transform: translateX(2px);
}

/* Focus states mejorados */
a:focus-visible,
.nuxt-link-active:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px currentColor;
  border-radius: 0.5rem;
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
  
  a:hover,
  .nuxt-link-active {
    transform: none;
  }
}

/* Performance optimizations */
footer {
  will-change: background-color, border-color;
  backface-visibility: hidden;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
