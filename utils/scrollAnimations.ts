import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

// Registrar el plugin solo en el cliente
if (process.client) {
  gsap.registerPlugin(ScrollTrigger)
}

// Función para verificar si estamos en el cliente
const isClient = typeof window !== 'undefined'

// Función para obtener prefers-reduced-motion
const getPrefersReducedMotion = () => {
  if (!isClient) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Función para crear un ScrollTrigger con configuración común
const createScrollTrigger = (trigger: string | Element, options = {}) => {
  return ScrollTrigger.create({
    trigger,
    start: 'top 80%',
    toggleActions: 'play pause reverse pause',
    ...options
  })
}

export const initScrollAnimations = () => {
  if (!isClient) return

  // Verificar preferencias de movimiento reducido
  const prefersReducedMotion = getPrefersReducedMotion()
  if (prefersReducedMotion) return

  // Crear un contexto para las animaciones de sección
  const sectionContext = gsap.context(() => {
    // Animación de entrada para secciones
    gsap.utils.toArray<HTMLElement>('[data-scroll-section]').forEach((section) => {
      const sectionName = section.getAttribute('data-scroll-section')
      
      // Crear un timeline para la sección
      const tl = gsap.timeline({
        scrollTrigger: createScrollTrigger(section, {
          onEnter: () => {
            section.classList.add('section-visible')
            // Activar animaciones de elementos dentro de la sección
            gsap.utils.toArray<HTMLElement>('[data-scroll-element]', section).forEach((element) => {
              element.classList.add('element-visible')
            })
          },
          onLeaveBack: () => {
            section.classList.remove('section-visible')
            // Desactivar animaciones de elementos dentro de la sección
            gsap.utils.toArray<HTMLElement>('[data-scroll-element]', section).forEach((element) => {
              element.classList.remove('element-visible')
            })
          }
        })
      })

      // Animación inicial de la sección
      tl.from(section, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out'
      })
    })

    // Animación de elementos dentro de secciones
    gsap.utils.toArray<HTMLElement>('[data-scroll-element]').forEach((element) => {
      const section = element.closest('[data-scroll-section]')
      if (!section) return

      const index = Array.from(section.querySelectorAll('[data-scroll-element]')).indexOf(element)
      const delay = index * 0.1

      gsap.from(element, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out',
        delay,
        scrollTrigger: createScrollTrigger(element, {
          containerAnimation: ScrollTrigger.getById(section.id),
          toggleActions: 'play none none reverse'
        })
      })
    })

    // Animación de texto en onda para párrafos
    gsap.utils.toArray<HTMLElement>('.animate-wave-reveal').forEach((element) => {
      const section = element.closest('[data-scroll-section]')
      if (!section) return

      const letters = element.textContent?.split('') || []
      element.textContent = ''
      
      letters.forEach((letter, index) => {
        const span = document.createElement('span')
        span.textContent = letter
        span.style.display = 'inline-block'
        span.style.opacity = '0'
        span.style.transform = 'translateY(20px)'
        
        element.appendChild(span)

        gsap.to(span, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: index * 0.05,
          ease: 'power2.out',
          scrollTrigger: createScrollTrigger(element, {
            containerAnimation: ScrollTrigger.getById(section.id)
          })
        })
      })
    })
  })

  // Limpiar animaciones cuando el componente se desmonte
  return () => {
    sectionContext.revert()
  }
}

// Inicializar animaciones cuando el DOM esté listo
if (isClient) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations)
  } else {
    initScrollAnimations()
  }
}

// Exportar función para limpiar animaciones
export const cleanupScrollAnimations = () => {
  if (!isClient) return
  
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  gsap.globalTimeline.clear()
}
