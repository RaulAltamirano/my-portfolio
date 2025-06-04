// plugins/animations.client.ts
import { defineNuxtPlugin } from '#app'
import { Motion as MotionPlugin } from '@motionone/vue'

export default defineNuxtPlugin((nuxtApp) => {
  // Solo ejecutar en el cliente
  if (process.client) {
    // Registro de Motion plugin
    nuxtApp.vueApp.use(MotionPlugin)
    
    // Importación dinámica de GSAP para evitar problemas de SSR
    const initializeGSAP = async () => {
      try {
        // Importación dinámica de módulos GSAP
        const { gsap } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        
        // Registro del plugin
        gsap.registerPlugin(ScrollTrigger)
        
        // Configuración de preferencias de movimiento reducido
        const getPrefersReducedMotion = (): boolean => {
          return window.matchMedia('(prefers-reduced-motion: reduce)').matches
        }
        
        // Configuración reactiva basada en preferencias del usuario
        const createAnimationConfig = () => {
          const reducedMotion = getPrefersReducedMotion()
          return {
            duration: reducedMotion ? 0 : 0.8,
            ease: reducedMotion ? 'none' : 'power2.inOut',
            delay: reducedMotion ? 0 : 0.1,
            immediateRender: !reducedMotion
          }
        }
        
        // Timeline principal con configuración optimizada
        const masterTimeline = gsap.timeline({
          paused: true,
          defaults: createAnimationConfig()
        })
        
        // Utilidades de animación comunes
        const animationUtils = {
          // Animación de entrada fade
          fadeIn: (target: string | Element, options = {}) => {
            return gsap.fromTo(target, 
              { opacity: 0, y: 30 },
              { 
                opacity: 1, 
                y: 0, 
                ...createAnimationConfig(),
                ...options 
              }
            )
          },
          
          // Animación de salida fade
          fadeOut: (target: string | Element, options = {}) => {
            return gsap.to(target, {
              opacity: 0,
              y: -30,
              ...createAnimationConfig(),
              ...options
            })
          },
          
          // Animación de escala
          scaleIn: (target: string | Element, options = {}) => {
            return gsap.fromTo(target,
              { scale: 0.8, opacity: 0 },
              { 
                scale: 1, 
                opacity: 1,
                ...createAnimationConfig(),
                ...options 
              }
            )
          },
          
          // Animación de deslizamiento
          slideIn: (target: string | Element, direction = 'left', options = {}) => {
            const directions = {
              left: { x: -100 },
              right: { x: 100 },
              up: { y: -100 },
              down: { y: 100 }
            }
            
            return gsap.fromTo(target,
              { 
                ...directions[direction as keyof typeof directions], 
                opacity: 0 
              },
              {
                x: 0,
                y: 0,
                opacity: 1,
                ...createAnimationConfig(),
                ...options
              }
            )
          },
          
          // Animación de stagger para múltiples elementos
          staggerAnimation: (targets: string | Element[], options = {}) => {
            return gsap.fromTo(targets,
              { opacity: 0, y: 50 },
              {
                opacity: 1,
                y: 0,
                stagger: getPrefersReducedMotion() ? 0 : 0.1,
                ...createAnimationConfig(),
                ...options
              }
            )
          },
          
          // Scroll trigger helper
          createScrollTrigger: (target: string | Element, animation: gsap.core.Tween, options = {}) => {
            if (getPrefersReducedMotion()) {
              // Si hay preferencia de movimiento reducido, ejecutar inmediatamente
              animation.progress(1)
              return null
            }
            
            return ScrollTrigger.create({
              trigger: target,
              start: 'top 80%',
              end: 'bottom 20%',
              animation,
              toggleActions: 'play none none reverse',
              ...options
            })
          }
        }
        
        // Manejo de cambios en preferencias de accesibilidad
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        mediaQuery.addEventListener('change', () => {
          // Actualizar configuraciones globales cuando cambien las preferencias
          gsap.globalTimeline.clear()
          ScrollTrigger.refresh()
        })
        
        // Cleanup automático en navegación
        const cleanup = () => {
          ScrollTrigger.killAll()
          gsap.killTweensOf('*')
        }
        
        // Registro de cleanup en el router de Nuxt
        nuxtApp.hook('page:transition:finish', cleanup)
        
        // Exponer utilidades en el contexto de la aplicación
        return nuxtApp.provide('animations', {
          gsap,
          ScrollTrigger,
          timeline: masterTimeline,
          config: createAnimationConfig,
          utils: animationUtils,
          getPrefersReducedMotion,
          cleanup
        })
        
      } catch (error) {
        console.warn('Error inicializando GSAP:', error)
        // Fallback sin animaciones
        return nuxtApp.provide('animations', {
          gsap: null,
          ScrollTrigger: null,
          timeline: null,
          config: () => ({}),
          utils: {},
          getPrefersReducedMotion: () => true,
          cleanup: () => {}
        })
      }
    }
    
    // Inicialización asíncrona
    initializeGSAP()
  }
})

// types/animations.d.ts - Tipado TypeScript

// Composable para usar en componentes Vue
// composables/useAnimations.ts
// export const useAnimations = () => {
//   const { $animations } = useNuxtApp()
  
//   // Verificar disponibilidad antes de usar
//   const isAvailable = computed(() => !!$animations?.gsap)
  
//   // Wrapper seguro para animaciones
//   const safeAnimate = (animationFn: () => void) => {
//     if (isAvailable.value) {
//       animationFn()
//     }
//   }
  
//   return {
//     animations: $animations,
//     isAvailable,
//     safeAnimate
//   }
// }