// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  vite: {
    plugins: [
      tailwindcss(),
    ],
    optimizeDeps: {
      include: [
        '@motionone/vue'
      ]
    }
  },
  css: [
  '~/assets/css/tailwind.css',
    '~/assets/css/animations.css'
  ],
  
  modules: [
    '@nuxtjs/color-mode' // Módulo para el modo oscuro
  ],

  // Plugins
  plugins: [
    '~/plugins/scroll-reveal.client.ts',
    '~/plugins/animations.ts'
    // '~/plugins/motion.ts' // Descomenta si es necesario después de probar
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
  }
  // La sección 'darkMode' incorrecta ha sido eliminada.
})
