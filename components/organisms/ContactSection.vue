<template>
  <section 
    id="contact"
    class="relative py-24 px-6 sm:px-8 lg:px-12 overflow-hidden"
    :class="[
      'bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-950/50',
      'border-t border-slate-200/50 dark:border-slate-800/50'
    ]"
  >
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-500/5 to-cyan-500/5 dark:from-blue-500/10 dark:to-cyan-500/10 blur-3xl transform rotate-12"></div>
      <div class="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-purple-500/5 to-blue-500/5 dark:from-purple-500/10 dark:to-blue-500/10 blur-3xl transform -rotate-12"></div>
    </div>

    <div class="relative max-w-7xl mx-auto">
      <!-- Section Header -->
      <Motion
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.2, easing: spring({ stiffness: 100, damping: 15 }) }"
        tag="div"
        class="text-center mb-20"
      >
        <Motion
          :initial="{ scale: 0.95, opacity: 0 }"
          :animate="{ scale: 1, opacity: 1 }"
          :transition="{ duration: 0.5, delay: 0.2, easing: spring({ stiffness: 100, damping: 15 }) }"
          tag="div"
          class="inline-flex items-center px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-200/50 dark:border-slate-700/50 shadow-lg shadow-slate-200/20 dark:shadow-slate-900/20 mb-6"
        >
          <span class="text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent uppercase tracking-wider">
            {{ category }}
          </span>
        </Motion>

        <Motion
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 0.4, easing: spring({ stiffness: 100, damping: 15 }) }"
          tag="h2"
          class="text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight"
        >
          {{ title }}
          <span class="block bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
            {{ subtitle }}
          </span>
        </Motion>

        <Motion
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 0.6, easing: spring({ stiffness: 100, damping: 15 }) }"
          tag="p"
          class="text-xl lg:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-normal leading-relaxed mb-12"
        >
          {{ description }}
        </Motion>
      </Motion>

      <!-- Contact Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <!-- Contact Form -->
        <Motion
          :initial="{ opacity: 0, x: -20 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.6, delay: 0.8, easing: spring({ stiffness: 100, damping: 15 }) }"
          tag="div"
          class="relative group"
        >
          <div class="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
          <div class="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-700/50">
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div class="space-y-4">
                <div class="relative">
                  <label for="name" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Nombre
                  </label>
                  <div class="relative">
                    <input
                      id="name"
                      v-model="form.name"
                      type="text"
                      required
                      class="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      :class="[
                        'placeholder-slate-400 dark:placeholder-slate-500',
                        'hover:border-blue-200 dark:hover:border-blue-800',
                        'focus:shadow-lg focus:shadow-blue-500/20 dark:focus:shadow-blue-500/10'
                      ]"
                      placeholder="Tu nombre"
                    />
                    <div class="absolute inset-0 rounded-lg transition duration-200 pointer-events-none ring-1 ring-inset ring-slate-200/50 dark:ring-slate-700/50 group-hover:ring-blue-200/50 dark:group-hover:ring-blue-800/50"></div>
                  </div>
                </div>

                <div class="relative">
                  <label for="email" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Email
                  </label>
                  <div class="relative">
                    <input
                      id="email"
                      v-model="form.email"
                      type="email"
                      required
                      class="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      :class="[
                        'placeholder-slate-400 dark:placeholder-slate-500',
                        'hover:border-blue-200 dark:hover:border-blue-800',
                        'focus:shadow-lg focus:shadow-blue-500/20 dark:focus:shadow-blue-500/10'
                      ]"
                      placeholder="tu@email.com"
                    />
                    <div class="absolute inset-0 rounded-lg transition duration-200 pointer-events-none ring-1 ring-inset ring-slate-200/50 dark:ring-slate-700/50 group-hover:ring-blue-200/50 dark:group-hover:ring-blue-800/50"></div>
                  </div>
                </div>

                <div class="relative">
                  <label for="message" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Mensaje
                  </label>
                  <div class="relative">
                    <textarea
                      id="message"
                      v-model="form.message"
                      required
                      rows="4"
                      class="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                      :class="[
                        'placeholder-slate-400 dark:placeholder-slate-500',
                        'hover:border-blue-200 dark:hover:border-blue-800',
                        'focus:shadow-lg focus:shadow-blue-500/20 dark:focus:shadow-blue-500/10'
                      ]"
                      placeholder="Tu mensaje..."
                    ></textarea>
                    <div class="absolute inset-0 rounded-lg transition duration-200 pointer-events-none ring-1 ring-inset ring-slate-200/50 dark:ring-slate-700/50 group-hover:ring-blue-200/50 dark:group-hover:ring-blue-800/50"></div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                class="relative w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                :disabled="isSubmitting"
                :class="[
                  'hover:from-blue-700 hover:to-cyan-700',
                  'focus:shadow-lg focus:shadow-blue-500/20 dark:focus:shadow-blue-500/10',
                  'before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-blue-400 before:to-cyan-400 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-20'
                ]"
              >
                <span class="relative flex items-center justify-center">
                  <span v-if="!isSubmitting">Enviar mensaje</span>
                  <span v-else class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </span>
                </span>
              </button>
            </form>
          </div>
        </Motion>

        <!-- Contact Info -->
        <Motion
          :initial="{ opacity: 0, x: 20 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.6, delay: 1.0, easing: spring({ stiffness: 100, damping: 15 }) }"
          tag="div"
          class="space-y-8"
        >
          <!-- Contact Info Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Motion
              v-for="(card, index) in contactCards"
              :key="card.title"
              :initial="{ opacity: 0, y: 20 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.5, delay: 1.2 + (index * 0.1), easing: spring({ stiffness: 100, damping: 15 }) }"
              tag="div"
              class="group relative"
              :class="card.class"
            >
              <div class="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-1000"></div>
              <div class="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 dark:hover:shadow-blue-500/10">
                <div class="flex items-center space-x-4">
                  <div class="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg transition-transform duration-300 group-hover:scale-110">
                    <component 
                      :is="card.icon" 
                      class="w-6 h-6 text-blue-600 dark:text-blue-400 transition-colors duration-300 group-hover:text-blue-700 dark:group-hover:text-blue-300" 
                    />
                  </div>
                  <div>
                    <h3 class="text-sm font-medium text-slate-500 dark:text-slate-400">{{ card.title }}</h3>
                    <component 
                      :is="card.content" 
                      :href="card.href"
                      :class="[
                        'text-base font-semibold text-slate-900 dark:text-white',
                        'transition-colors duration-300',
                        card.href ? 'hover:text-blue-600 dark:hover:text-blue-400' : ''
                      ]"
                    />
                  </div>
                </div>
              </div>
            </Motion>
          </div>

          <!-- Social Links -->
          <Motion
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.5, delay: 1.4, easing: spring({ stiffness: 100, damping: 15 }) }"
            tag="div"
            class="group relative"
          >
            <div class="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-1000"></div>
            <div class="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 dark:hover:shadow-blue-500/10">
              <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">Conecta conmigo</h3>
              <div class="flex flex-wrap gap-4">
                <Motion
                  v-for="(social, index) in socialLinks"
                  :key="social.name"
                  :initial="{ opacity: 0, scale: 0.9 }"
                  :animate="{ opacity: 1, scale: 1 }"
                  :transition="{ duration: 0.3, delay: 1.6 + (index * 0.1), easing: spring({ stiffness: 100, damping: 15 }) }"
                  tag="a"
                  :href="social.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group/social relative"
                  :aria-label="social.name"
                >
                  <div class="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-0 group-hover/social:opacity-20 transition duration-300"></div>
                  <div class="relative p-3 bg-white/50 dark:bg-slate-900/50 rounded-lg text-slate-600 dark:text-slate-400 transition-all duration-300 transform hover:scale-110 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/30">
                    <component :is="social.icon" class="w-6 h-6" />
                  </div>
                </Motion>
              </div>
            </div>
          </Motion>
        </Motion>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Motion } from '@motionone/vue'
import { spring } from '@motionone/dom'
import { EnvelopeIcon, MapPinIcon } from '@heroicons/vue/24/outline'

// Props
const props = defineProps<{
  title: string
  subtitle: string
  category: string
  description: string
  email: string
  location: string
  socialLinks: Array<{
    name: string
    url: string
    icon: any
  }>
}>()

// Form state
const form = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)

// Computed contact cards
const contactCards = computed(() => [
  {
    title: 'Email',
    icon: EnvelopeIcon,
    content: 'a',
    href: `mailto:${props.email}`,
    class: 'hover:-translate-y-1'
  },
  {
    title: 'Ubicación',
    icon: MapPinIcon,
    content: 'p',
    class: 'hover:-translate-y-1'
  }
])

// Form submission handler
const handleSubmit = async () => {
  try {
    isSubmitting.value = true
    // Implement your form submission logic here
    // For example, using a service like EmailJS or your own backend API
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
    form.value = { name: '', email: '', message: '' }
    // Show success message
  } catch (error) {
    // Handle error
    console.error('Error submitting form:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* Add any component-specific styles here */
@supports (backdrop-filter: blur(1px)) {
  .backdrop-blur-sm {
    backdrop-filter: blur(8px);
  }
}

/* Optimize animations for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  .transform,
  .transition-all,
  .transition-colors,
  .transition-opacity,
  .transition-transform {
    transition: none !important;
  }
  
  .animate-spin {
    animation: none !important;
  }
}
</style>
