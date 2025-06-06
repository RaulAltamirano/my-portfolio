<template>
  <footer class="bg-white dark:bg-slate-900">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Motion
            :initial="{ opacity: 0, y: 20 }"
            :visible-once="{ opacity: 1, y: 0 }"
            :transition="{ type: 'spring', stiffness: 100, damping: 15, delay: 0.1 }"
          >
            <h3 class="text-sm font-semibold text-gray-400 dark:text-gray-300 tracking-wider uppercase">
              Contacto
            </h3>
          </Motion>
          <ul class="mt-4 space-y-4">
            <li v-for="(contact, index) in contacts" :key="contact.name">
              <Motion
                :initial="{ opacity: 0, y: 20 }"
                :visible-once="{ opacity: 1, y: 0 }"
                :transition="{ type: 'spring', stiffness: 100, damping: 15, delay: 0.1 + (index * 0.1) }"
              >
                <a
                  :href="contact.href"
                  class="text-base text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  @mouseenter="startHoverAnimation($event)"
                  @mouseleave="stopHoverAnimation($event)"
                >
                  {{ contact.name }}
                </a>
              </Motion>
            </li>
          </ul>
        </div>
        <div>
          <Motion
            :initial="{ opacity: 0, y: 20 }"
            :visible-once="{ opacity: 1, y: 0 }"
            :transition="{ type: 'spring', stiffness: 100, damping: 15, delay: 0.2 }"
          >
            <h3 class="text-sm font-semibold text-gray-400 dark:text-gray-300 tracking-wider uppercase">
              Enlaces
            </h3>
          </Motion>
          <ul class="mt-4 space-y-4">
            <li v-for="(link, index) in links" :key="link.name">
              <Motion
                :initial="{ opacity: 0, y: 20 }"
                :visible-once="{ opacity: 1, y: 0 }"
                :transition="{ type: 'spring', stiffness: 100, damping: 15, delay: 0.2 + (index * 0.1) }"
              >
                <NuxtLink
                  :to="link.href"
                  class="text-base text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  @mouseenter="startHoverAnimation($event)"
                  @mouseleave="stopHoverAnimation($event)"
                >
                  {{ link.name }}
                </NuxtLink>
              </Motion>
            </li>
          </ul>
        </div>
        <div>
          <Motion
            :initial="{ opacity: 0, y: 20 }"
            :visible-once="{ opacity: 1, y: 0 }"
            :transition="{ type: 'spring', stiffness: 100, damping: 15, delay: 0.3 }"
          >
            <h3 class="text-sm font-semibold text-gray-400 dark:text-gray-300 tracking-wider uppercase">
              Redes Sociales
            </h3>
          </Motion>
          <ul class="mt-4 space-y-4">
            <li v-for="(social, index) in socials" :key="social.name">
              <Motion
                :initial="{ opacity: 0, y: 20 }"
                :visible-once="{ opacity: 1, y: 0 }"
                :transition="{ type: 'spring', stiffness: 100, damping: 15, delay: 0.3 + (index * 0.1) }"
              >
                <a
                  :href="social.href"
                  class="text-base text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 flex items-center gap-2"
                  target="_blank"
                  @mouseenter="startHoverAnimation($event)"
                  @mouseleave="stopHoverAnimation($event)"
                >
                  {{ social.name }}
                  <span class="inline-block w-4 h-4">
                    <svg class="w-full h-full" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
                    </svg>
                  </span>
                </a>
              </Motion>
            </li>
          </ul>
        </div>
      </div>
      <Motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{ opacity: 1, y: 0 }"
        :transition="{ type: 'spring', stiffness: 100, damping: 15, delay: 0.4 }"
      >
        <div class="mt-8 border-t border-gray-200 dark:border-slate-700 pt-8">
          <p class="text-base text-gray-400 dark:text-slate-500 text-center">
            &copy; {{ new Date().getFullYear() }} Raul Altamirano. Todos los derechos reservados.
          </p>
        </div>
      </Motion>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const contacts = [
  { name: 'Email', href: 'mailto:contacto@raulaltamirano.com' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/raulaltamirano' },
  { name: 'GitHub', href: 'https://github.com/RaulAltamirano' }
]

const links = [
  { name: 'Términos de servicio', href: '/terms' },
  { name: 'Política de privacidad', href: '/privacy' }
]

const socials = [
  { name: 'Twitter', href: 'https://twitter.com/raulaltamirano' },
  { name: 'Instagram', href: 'https://instagram.com/raulaltamirano' },
  { name: 'Medium', href: 'https://medium.com/@raulaltamirano' }
]

const startHoverAnimation = (event: MouseEvent) => {
  const element = event.currentTarget as HTMLElement
  const timeline = gsap.timeline()
  
  timeline
    .to(element, {
      scale: 1.02,
      duration: 0.2,
      ease: 'power1.out'
    })
    .to(element, {
      scale: 1,
      duration: 0.3,
      ease: 'power1.in'
    }, '-=0.1')
}

const stopHoverAnimation = (event: MouseEvent) => {
  const element = event.currentTarget as HTMLElement
  gsap.to(element, {
    scale: 1,
    duration: 0.2,
    ease: 'power1.out'
  })
}
</script>
