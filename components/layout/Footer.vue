<template>
  <footer class="bg-white dark:bg-slate-900">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-sm font-semibold text-gray-400 dark:text-gray-300 tracking-wider uppercase">
            Contacto
          </h3>
          <ul class="mt-4 space-y-4">
            <li v-for="contact in contacts" :key="contact.name">
              <a
                :href="contact.href"
                class="text-base text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                {{ contact.name }}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-sm font-semibold text-gray-400 dark:text-gray-300 tracking-wider uppercase">
            Enlaces
          </h3>
          <ul class="mt-4 space-y-4">
            <li v-for="link in links" :key="link.name">
              <NuxtLink
                :to="link.href"
                class="text-base text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-sm font-semibold text-gray-400 dark:text-gray-300 tracking-wider uppercase">
            Redes Sociales
          </h3>
          <ul class="mt-4 space-y-4">
            <li v-for="social in socials" :key="social.name">
              <a
                :href="social.href"
                class="text-base text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                target="_blank"
              >
                {{ social.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-8 border-t border-gray-200 dark:border-slate-700 pt-8">
        <p class="text-base text-gray-400 dark:text-slate-500 text-center">
          &copy; {{ new Date().getFullYear() }} Raul Altamirano. Todos los derechos reservados.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
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
</script>
