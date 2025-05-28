// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  vite: {    plugins: [      tailwindcss(),    ],  },
  css: [
  '~/assets/css/tailwind.css'
],
  // Plugins
  plugins: [
    '~/plugins/scroll-reveal.client.ts'
  ],

  // Componentes globales
  components: [
    '~/components',
    '~/components/layout',
    '~/components/ui'
  ],

  // Configuración de build
  build: {
    transpile: ['gsap', '@heroicons/vue']
  },

  // Configuración de app
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  // Configuración de dark mode
  darkMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light'
  }
})
