import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Tipos para mejor type safety
interface ScrollTriggerConfig {
  start: string
  end: string
  scrub: number | boolean
  markers: boolean
  toggleActions: string
}

interface ScrollerProxy {
  scrollTop: (value?: number) => number
  getBoundingClientRect: () => DOMRect
  pinType: string
}

// Configuración centralizada
const SCROLL_TRIGGER_CONFIG: ScrollTriggerConfig = {
  start: 'top top',
  end: 'bottom bottom',
  scrub: 1,
  markers: false,
  toggleActions: 'play none none reverse'
}

// Clase para manejo robusto de ScrollTrigger
class ScrollTriggerManager {
  private static instance: ScrollTriggerManager | null = null
  private isInitialized = false
  private cleanupFunctions: (() => void)[] = []

  private constructor() {}

  static getInstance(): ScrollTriggerManager {
    if (!ScrollTriggerManager.instance) {
      ScrollTriggerManager.instance = new ScrollTriggerManager()
    }
    return ScrollTriggerManager.instance
  }

  private safeScrollTo(value: number): void {
    try {
      // Validación del valor antes de usar scrollTo
      if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
        console.warn('Invalid scroll value provided:', value)
        return
      }

      // Usar la sintaxis correcta de scrollTo
      window.scrollTo({
        top: Math.max(0, value),
        behavior: 'auto'
      })
    } catch (error) {
      console.error('Error in scrollTo:', error)
      // Fallback usando scrollTop
      try {
        document.documentElement.scrollTop = Math.max(0, value)
      } catch (fallbackError) {
        console.error('Fallback scrollTo also failed:', fallbackError)
      }
    }
  }

  private createScrollerProxy(): ScrollerProxy {
    return {
      scrollTop: (value?: number): number => {
        if (value !== undefined) {
          this.safeScrollTo(value)
        }
        return window.pageYOffset || document.documentElement.scrollTop || 0
      },
      getBoundingClientRect: (): DOMRect => ({
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
        right: window.innerWidth,
        bottom: window.innerHeight,
        x: 0,
        y: 0,
        toJSON: () => ({})
      } as DOMRect),
      pinType: 'fixed'
    }
  }

  private registerPlugin(): boolean {
    try {
      if (!gsap.plugins.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger)
      }
      return true
    } catch (error) {
      console.error('Failed to register ScrollTrigger plugin:', error)
      return false
    }
  }

  private configureDefaults(): void {
    try {
      ScrollTrigger.defaults(SCROLL_TRIGGER_CONFIG)
    } catch (error) {
      console.error('Failed to set ScrollTrigger defaults:', error)
    }
  }

  private killExistingTriggers(): void {
    try {
      const triggers = ScrollTrigger.getAll()
      triggers.forEach((trigger, index) => {
        try {
          trigger.kill()
        } catch (error) {
          console.error(`Error killing trigger ${index}:`, error)
        }
      })
    } catch (error) {
      console.error('Error getting existing triggers:', error)
    }
  }

  private setupScrollerProxy(): void {
    try {
      ScrollTrigger.scrollerProxy(window, this.createScrollerProxy())
    } catch (error) {
      console.error('Error setting up scroller proxy:', error)
    }
  }

  private setupCleanupListeners(): void {
    const cleanup = () => {
      this.cleanup()
    }

    // Múltiples eventos para asegurar limpieza
    const events = ['beforeunload', 'unload', 'pagehide']
    events.forEach(event => {
      window.addEventListener(event, cleanup, { once: true })
    })

    // Guardar función de limpieza
    this.cleanupFunctions.push(() => {
      events.forEach(event => {
        window.removeEventListener(event, cleanup)
      })
    })
  }

  public initialize(): boolean {
    if (this.isInitialized) {
      console.warn('ScrollTrigger already initialized')
      return true
    }

    try {
      // Verificar si estamos en el cliente
      if (typeof window === 'undefined') {
        console.warn('ScrollTrigger can only be initialized on client side')
        return false
      }

      // Registrar plugin
      if (!this.registerPlugin()) {
        return false
      }

      // Configurar defaults
      this.configureDefaults()

      // Limpiar triggers existentes
      this.killExistingTriggers()

      // Habilitar ScrollTrigger
      ScrollTrigger.enable()

      // Configurar proxy
      this.setupScrollerProxy()

      // Configurar limpieza
      this.setupCleanupListeners()

      this.isInitialized = true
      console.log('ScrollTrigger initialized successfully')
      return true

    } catch (error) {
      console.error('Failed to initialize ScrollTrigger:', error)
      return false
    }
  }

  public cleanup(): void {
    try {
      // Ejecutar funciones de limpieza
      this.cleanupFunctions.forEach(cleanup => {
        try {
          cleanup()
        } catch (error) {
          console.error('Error in cleanup function:', error)
        }
      })

      // Limpiar triggers
      this.killExistingTriggers()

      // Limpiar proxy
      ScrollTrigger.scrollerProxy(window, null)

      // Refrescar ScrollTrigger
      ScrollTrigger.refresh()

      this.isInitialized = false
      this.cleanupFunctions = []

    } catch (error) {
      console.error('Error during cleanup:', error)
    }
  }

  public refresh(): void {
    try {
      if (this.isInitialized) {
        ScrollTrigger.refresh()
      }
    } catch (error) {
      console.error('Error refreshing ScrollTrigger:', error)
    }
  }

  public isReady(): boolean {
    return this.isInitialized
  }
}

// Plugin de Nuxt optimizado
export default defineNuxtPlugin(() => {
  if (process.client) {
    const manager = ScrollTriggerManager.getInstance()
    const success = manager.initialize()

    if (!success) {
      console.error('Failed to initialize ScrollTrigger plugin')
    }

    // Proporcionar acceso global al manager
    return {
      provide: {
        scrollTriggerManager: manager
      }
    }
  }
})

// Composable para uso en componentes
export const useScrollTrigger = () => {
  if (process.client) {
    const manager = ScrollTriggerManager.getInstance()
    
    return {
      manager,
      refresh: () => manager.refresh(),
      cleanup: () => manager.cleanup(),
      isReady: () => manager.isReady()
    }
  }

  return {
    manager: null,
    refresh: () => {},
    cleanup: () => {},
    isReady: () => false
  }
}