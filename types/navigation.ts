import type { Component, ComputedRef, Ref } from 'vue'

export type SectionName = 'Home' | 'About' | 'Projects' | 'Skills' | 'Contact'

export interface NavigationItem {
  name: SectionName
  href: string
  icon: Component
}

export interface NavigationState {
  isDark: ComputedRef<boolean>
  isMobileMenuOpen: Ref<boolean>
  isScrolled: ComputedRef<boolean>
  activeSection: Ref<string>
  navigation: NavigationItem[]
}

export interface NavigationMethods {
  toggleDarkMode: () => void
  toggleMobileMenu: (event?: MouseEvent) => void
  closeMobileMenu: () => void
  handleNavClick: (href: string) => void
  isCurrentSection: (href: string) => boolean
}

export interface NavigationMotion {
  navVariants: {
    initial: Record<string, any>
    enter: Record<string, any>
    exit: Record<string, any>
  }
}

export type UseNavigationReturn = NavigationState & NavigationMethods & NavigationMotion 