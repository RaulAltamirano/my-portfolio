import ScrollReveal from 'scrollreveal'

export default defineNuxtPlugin((nuxtApp) => {
  const sr = ScrollReveal({
    reset: false,
    distance: '60px',
    duration: 800,
    delay: 200,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    mobile: true,
    viewFactor: 0.2
  })

  nuxtApp.vueApp.provide('scrollReveal', sr)

  return {
    provide: {
      scrollReveal: sr
    }
  }
})
