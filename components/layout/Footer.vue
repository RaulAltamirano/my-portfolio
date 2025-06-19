<template>
  <footer
    class="w-full border-t border-gray-200/20 dark:border-gray-700/20 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 transition-all duration-300"
    role="contentinfo"
  >
    <div class="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Contacto -->
        <div>
          <h3 class="text-sm font-semibold text-gray-400 dark:text-gray-300 tracking-wider uppercase mb-4">
            Contacto
          </h3>
          <ul class="space-y-3">
            <li v-for="contact in contacts" :key="contact.name">
              <a
                :href="contact.href"
                class="flex items-center gap-2 text-base text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50"
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
          <h3 class="text-sm font-semibold text-gray-400 dark:text-gray-300 tracking-wider uppercase mb-4">
            Enlaces
          </h3>
          <ul class="space-y-3">
            <li v-for="link in links" :key="link.name">
              <NuxtLink
                :to="link.href"
                class="text-base text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <!-- Redes Sociales -->
        <div>
          <h3 class="text-sm font-semibold text-gray-400 dark:text-gray-300 tracking-wider uppercase mb-4">
            Redes Sociales
          </h3>
          <ul class="space-y-3">
            <li v-for="social in socials" :key="social.name">
              <a
                :href="social.href"
                class="flex items-center gap-2 text-base text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50"
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
      <div class="mt-10 border-t border-gray-200 dark:border-slate-700 pt-8">
        <p class="text-base text-gray-400 dark:text-slate-500 text-center">
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

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
</style>
