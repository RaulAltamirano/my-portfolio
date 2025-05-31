import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useScroll } from '@vueuse/core'

export interface NavigationItem {
  name: string
  href: string
  icon: any
}

export function useNavigation(navigation: NavigationItem[]) {
  // State
  const isDark = ref(false)
  const isMobileMenuOpen = ref(false)
  const activeSection = ref('')
  const { y: scrollY } = useScroll(window)

  // Computed
  const isScrolled = computed(() => scrollY.value > 20)

  // Navigation variants for animations
  const navVariants = {
    initial: {
      y: -100,
      opacity: 0,
    },
    enter: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      y: -100,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  // Methods
  const toggleDarkMode = () => {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark')
  }

  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
    if (isMobileMenuOpen.value) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }

  const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
    document.body.style.overflow = ''
  }

  const handleNavClick = (href: string) => {
    activeSection.value = href
    closeMobileMenu()
    
    // Smooth scroll to section
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  const isCurrentSection = (href: string) => {
    return activeSection.value === href
  }

  // Intersection Observer for active section
  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSection.value = `#${entry.target.id}`
      }
    })
  }

  // Lifecycle
  onMounted(() => {
    // Initialize dark mode
    isDark.value = document.documentElement.classList.contains('dark')

    // Setup intersection observer
    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    })

    navigation.forEach((item) => {
      const element = document.querySelector(item.href)
      if (element) {
        observer.observe(element)
      }
    })

    // Cleanup
    onUnmounted(() => {
      observer.disconnect()
      document.body.style.overflow = ''
    })
  })

  return {
    isDark,
    isMobileMenuOpen,
    isScrolled,
    activeSection,
    toggleDarkMode,
    toggleMobileMenu,
    closeMobileMenu,
    handleNavClick,
    isCurrentSection,
    navVariants,
  }
} 