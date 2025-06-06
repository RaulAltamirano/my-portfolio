components/ScrollAnimation.vue
<template>
  <div
    ref="scrollElement"
    :class="computedClasses"
    :style="initialStyles"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { gsap as GSAP } from 'gsap'
import { useMounted } from '~/composables/useMounted'

const { isMounted } = useMounted()

// Wait for GSAP to be initialized
const gsapInstance = ref<GSAP | null>(null)

// Initialize GSAP when the component mounts
onMounted(() => {
  if (typeof window !== 'undefined') {
    const gsap = window.gsap
    if (gsap) {
      gsapInstance.value = gsap
      gsap.registerPlugin(ScrollTrigger)
    }
  }
})

// Definición de tipos para mejor intellisense
interface ScrollAnimationProps {
  direction?: 'left' | 'right' | 'up' | 'down'
  className?: string
  delay?: number
  duration?: number
  distance?: number
  threshold?: string
  easing?: string
  once?: boolean
  disabled?: boolean
}

// Props con valores por defecto
const props = withDefaults(defineProps<ScrollAnimationProps>(), {
  direction: 'up',
  delay: 0,
  duration: 0.8,
  distance: 50,
  threshold: 'top 80%',
  easing: 'power2.inOut',
  once: false,
  disabled: false
})

// Emits para comunicación con el componente padre
const emit = defineEmits<{
  animationStart: []
  animationComplete: []
}>()

// Referencias reactivas
const scrollElement = ref<HTMLElement | null>(null)
const mediaQueryListener = ref<EventListener | null>(null)

// Función para actualizar preferencias de movimiento
const updateMotionPreference = () => {
  if (typeof window === 'undefined') return
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) {
    cleanupAnimation()
    const element = scrollElement.value
    if (element) {
      element.style.opacity = '1'
      element.style.transform = 'none'
    }
  } else {
    initializeAnimation()
  }
}

// Función para manejar cambios en preferencias de movimiento
const handleMotionPreferenceChange = () => {
  updateMotionPreference()
}

// Computed para clases CSS dinámicas
const computedClasses = computed(() => {
  const classes = [props.className]
  return classes.filter(Boolean)
})

// Estilos iniciales para evitar FOUC
const initialStyles = computed(() => {
  if (props.disabled) {
    return {}
  }
  
  return {
    opacity: '0',
    transform: getInitialTransform()
  }
})

// Función para obtener la transformación inicial
const getInitialTransform = (): string => {
  const transform = []
  
  switch (props.direction) {
    case 'left':
      transform.push(`translateX(${props.distance}px)`) // Movimiento desde la derecha
      break
    case 'right':
      transform.push(`translateX(-${props.distance}px)`) // Movimiento desde la izquierda
      break
    case 'up':
      transform.push(`translateY(${props.distance}px)`) // Movimiento desde abajo
      break
    case 'down':
      transform.push(`translateY(-${props.distance}px)`) // Movimiento desde arriba
      break
  }
  
  return transform.join(' ')
}

// Función para inicializar las animaciones
const initializeAnimation = () => {
  if (!isMounted.value || props.disabled) return

  if (scrollElement.value && gsapInstance.value) {
    gsapInstance.value.from(scrollElement.value, {
      opacity: 0,
      y: props.direction === 'up' ? props.distance : props.direction === 'down' ? -props.distance : 0,
      x: props.direction === 'left' ? props.distance : props.direction === 'right' ? -props.distance : 0,
      duration: props.duration,
      ease: props.easing,
      delay: props.delay,
      scrollTrigger: {
        trigger: scrollElement.value,
        start: props.threshold,
        onEnter: () => emit('animationStart'),
        onLeaveBack: () => emit('animationComplete'),
        once: props.once,
        markers: false,
        toggleActions: 'play none none reverse'
      }
    })
  }
}

// Limpiar animación cuando el componente se desmonte
const cleanupAnimation = () => {
  if (scrollElement.value && gsapInstance.value) {
    const animations = gsapInstance.value.getTweensOf(scrollElement.value)
    animations.forEach((tween) => {
      tween.kill()
    })
  }
}

// Inicializar animación cuando el componente se monte
onMounted(() => {
  initializeAnimation()
})

// Limpiar animación cuando el componente se desmonte
onUnmounted(() => {
  if (scrollElement.value) {
    const animations = gsap.getTweensOf(scrollElement.value)
    animations.forEach(tween => tween.kill())
  }
})

// Watchers para cambios en props
watch(() => props.disabled, (newValue) => {
  if (newValue) {
    cleanupAnimation()
    const element = scrollElement.value
    if (element) {
      element.style.opacity = '1'
      element.style.transform = 'none'
    }
  } else {
    initializeAnimation()
  }
})

// Lifecycle hooks
onMounted(() => {
  if (typeof window !== 'undefined') {
    updateMotionPreference()
    
    // Configurar listener para cambios en motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    mediaQueryListener.value = handleMotionPreferenceChange
    mediaQuery.addEventListener('change', mediaQueryListener.value)
    
    // Inicializar animación
    initializeAnimation()
  }
})

onUnmounted(() => {
  cleanupAnimation()
  
  // Limpiar listener de media query
  if (mediaQueryListener.value) {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    mediaQuery.removeEventListener('change', mediaQueryListener.value)
  }
})
</script>

<style scoped>
.scroll-animation-element {
  transition: transform 0.3s ease-in-out;
}

.animation-visible {
  opacity: 1 !important;
  transform: none !important;
}

/* Optimización para animaciones suaves */
.scroll-animation-element * {
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

/* Fallback para navegadores sin soporte */
@media (prefers-reduced-motion: reduce) {
  .scroll-animation-element {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
</style>