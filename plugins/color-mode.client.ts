import { defineNuxtPlugin } from '#app'
import { useColorMode } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  const colorMode = useColorMode()

  // Asegurar que el color-mode se inicialice correctamente
  if (process.client) {
    // Verificar si hay una preferencia guardada
    const savedMode = localStorage.getItem('nuxt-color-mode')
    if (savedMode) {
      colorMode.preference = savedMode
    }

    // Observar cambios en el color-mode
    watch(() => colorMode.value, (newValue) => {
      // Actualizar el meta theme-color
      document.querySelector('meta[name="theme-color"]')?.setAttribute(
        'content',
        newValue === 'dark' ? '#1e293b' : '#ffffff'
      )
    }, { immediate: true })
  }
}) 