import { computed } from 'vue'

export const useDarkMode = () => {
  const colorMode = useColorMode()
  
  const isDark = computed(() => colorMode.value === 'dark')
  const isLight = computed(() => colorMode.value === 'light')
  const isSystem = computed(() => colorMode.value === 'system')
  
  const toggleDarkMode = () => {
    colorMode.preference = isDark.value ? 'light' : 'dark'
  }
  
  const setDarkMode = () => {
    colorMode.preference = 'dark'
  }
  
  const setLightMode = () => {
    colorMode.preference = 'light'
  }
  
  const setSystemMode = () => {
    colorMode.preference = 'system'
  }
  
  return {
    colorMode,
    isDark,
    isLight,
    isSystem,
    toggleDarkMode,
    setDarkMode,
    setLightMode,
    setSystemMode
  }
} 