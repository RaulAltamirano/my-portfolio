import { defineNuxtPlugin } from 'nuxt/app'
import { Motion } from '@motionone/vue'

export default defineNuxtPlugin((nuxtApp: any) => {
  // Registrar el componente Motion globalmente
  nuxtApp.vueApp.component('Motion', Motion)

  // Configuración adicional para desarrollo
  if (process.dev) {
    console.log('Motion plugin initialized')
  }
})
