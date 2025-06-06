<template>
  <div
    ref="element"
    :class="[
      'scroll-animation',
      { 'is-visible': isVisible },
      { 'prefers-reduced-motion': prefersReducedMotion }
    ]"
    :data-scroll-element="true"
    :style="computedStyle"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import type { CSSProperties } from 'vue'

// Registrar el plugin solo en el cliente
if (process.client) {
  gsap.registerPlugin(ScrollTrigger)
}

interface Props {
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale' | 'rotate'
  distance?: number
  duration?: number
  delay?: number
  threshold?: number
  easing?: string
  once?: boolean
  className?: string
  stagger?: number
  staggerChildren?: boolean
  scrub?: boolean | number
  markers?: boolean
  pin?: boolean
  pinSpacing?: boolean
  start?: string
  end?: string
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'up',
  distance: 30,
  duration: 0.8,
  delay: 0,
  threshold: 0.2,
  easing: 'power2.out',
  once: false,
  className: '',
  stagger: 0,
  staggerChildren: false,
  scrub: false,
  markers: false,
  pin: false,
  pinSpacing: true,
  start: 'top 80%',
  end: 'bottom 20%'
})

const element = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const prefersReducedMotion = ref(false)

// Calcular el estilo inicial basado en la dirección
const computedStyle = computed<CSSProperties>(() => {
  if (prefersReducedMotion.value) return {}

  const transformMap = {
    up: `translateY(${props.distance}px)`,
    down: `translateY(-${props.distance}px)`,
    left: `translateX(${props.distance}px)`,
    right: `translateX(-${props.distance}px)`,
    fade: 'none',
    scale: 'scale(0.8)',
    rotate: 'rotate(10deg)'
  }

  const initialTransform = transformMap[props.direction]
  const initialOpacity = props.direction === 'fade' ? 0 : 1

  return {
    opacity: initialOpacity,
    transform: initialTransform,
    willChange: 'transform, opacity' as const,
    backfaceVisibility: 'hidden' as const,
    transformStyle: 'preserve-3d' as const,
    perspective: '1000px' as const
  }
})

// Verificar preferencias de movimiento reducido
const checkPrefersReducedMotion = () => {
  prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Inicializar la animación
const initAnimation = () => {
  if (!element.value || prefersReducedMotion.value) return

  const section = element.value.closest('[data-scroll-section]')
  if (!section) return

  // Configurar la animación base
  const animationVars: {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
    rotation?: number;
    duration: number;
    delay: number;
    ease: string;
    paused: boolean;
    onStart: () => void;
    onComplete: () => void;
  } = {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    rotation: 0,
    duration: props.duration,
    delay: props.delay,
    ease: props.easing,
    paused: true,
    onStart: () => {
      isVisible.value = true
      element.value?.classList.add('is-animating')
    },
    onComplete: () => {
      element.value?.classList.remove('is-animating')
      if (props.once) {
        const trigger = ScrollTrigger.getById(section.id)
        if (trigger) {
          trigger.kill()
        }
      }
    }
  }

  // Ajustar la animación según la dirección
  switch (props.direction) {
    case 'scale':
      animationVars.scale = 1
      break
    case 'rotate':
      animationVars.rotation = 0
      break
    case 'fade':
      delete animationVars.y
      delete animationVars.x
      break
  }

  const animation = gsap.to(element.value, animationVars)

  // Configurar ScrollTrigger
  const triggerVars = {
    trigger: element.value,
    start: props.start,
    end: props.end,
    toggleActions: props.once ? 'play none none none' : 'play pause reverse pause',
    onEnter: () => animation.play(),
    onLeave: () => {
      if (!props.once) {
        animation.reverse()
        isVisible.value = false
      }
    },
    onEnterBack: () => {
      if (!props.once) {
        animation.play()
        isVisible.value = true
      }
    },
    onLeaveBack: () => {
      if (!props.once) {
        animation.reverse()
        isVisible.value = false
      }
    },
    markers: props.markers,
    pin: props.pin,
    pinSpacing: props.pinSpacing,
    scrub: props.scrub
  }

  // Añadir stagger si está configurado
  if (props.staggerChildren && element.value.children.length > 0) {
    gsap.set(element.value.children, { opacity: 0, y: props.distance })
    gsap.to(element.value.children, {
      opacity: 1,
      y: 0,
      duration: props.duration,
      stagger: props.stagger,
      ease: props.easing,
      scrollTrigger: triggerVars
    })
  } else {
    ScrollTrigger.create(triggerVars)
  }
}

onMounted(() => {
  checkPrefersReducedMotion()
  initAnimation()

  // Escuchar cambios en las preferencias de movimiento
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', checkPrefersReducedMotion)
})

onUnmounted(() => {
  // Limpiar listeners y animaciones
  window.matchMedia('(prefers-reduced-motion: reduce)').removeEventListener('change', checkPrefersReducedMotion)
  if (element.value) {
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === element.value) {
        trigger.kill()
      }
    })
  }
})
</script>

<style scoped>
.scroll-animation {
  opacity: 0;
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  transition: opacity 0.3s ease-out;
  transform-origin: center center;
}

.scroll-animation.prefers-reduced-motion {
  opacity: 1;
  transform: none !important;
  transition: none;
}

.scroll-animation.is-visible {
  opacity: 1;
}

.scroll-animation.is-animating {
  pointer-events: none;
}

/* Mejorar el rendimiento de las animaciones */
.scroll-animation {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  contain: content;
}
</style> 