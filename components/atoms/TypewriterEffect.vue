<template>
  <div class="typewriter-container">
    <span
      :class="['typewriter-text', { 'typing': isTyping }]"
      :style="{ minHeight: '1.5em' }"
    >
      {{ displayText }}
    </span>
    <span 
      class="cursor" 
      :class="{ 
        'blink': !isTyping,
        'typing-cursor': isTyping 
      }"
    >
      |
    </span>
  </div>
</template>

<script setup lang="ts">
import type { TypewriterText } from '~/types';

interface Props {
  texts: TypewriterText[]
}

const props = defineProps<Props>()

const displayText = ref('')
const currentIndex = ref(0)
const isTyping = ref(true)

onMounted(() => {
  console.log('TypewriterEffect mounted with texts:', props.texts)
  startTypewriter()
})

const startTypewriter = () => {
  typeText()
}

const typeText = async () => {
  const currentText = props.texts[currentIndex.value]
  isTyping.value = true
  
  // Escribir texto
  for (let i = 0; i <= currentText.text.length; i++) {
    displayText.value = currentText.text.slice(0, i)
    await sleep(currentText.duration ?? 10) // Velocidad de escritura
  }
  
  isTyping.value = false
  await sleep(currentText.delay ?? 2000) // Tiempo de pausa
  
  // Borrar texto
  for (let i = currentText.text.length; i >= 0; i--) {
    displayText.value = currentText.text.slice(0, i)
    await sleep(50) // Velocidad de borrado
  }
  
  currentIndex.value = (currentIndex.value + 1) % props.texts.length
  typeText()
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
</script>

<style scoped>
.typewriter-container {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
}

.typewriter-text {
  font-weight: 500;
  color: #1e293b;
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  letter-spacing: -0.01em;
  line-height: 1.4;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.cursor {
  color: #3b82f6;
  font-weight: bold;
  margin-left: 0.25rem;
  font-size: 1.1em;
  position: relative;
  top: -1px;
  transition: all 0.15s ease-out;
}

.cursor.blink {
  animation: gentleBlink 1.2s infinite ease-in-out;
}

.cursor.typing-cursor {
  animation: typingPulse 0.8s infinite ease-in-out;
}

/* Animaciones más suaves y profesionales */
@keyframes gentleBlink {
  0%, 45% { 
    opacity: 1; 
    transform: scaleY(1);
  }
  50%, 95% { 
    opacity: 0.2; 
    transform: scaleY(0.9);
  }
  100% { 
    opacity: 1; 
    transform: scaleY(1);
  }
}

@keyframes typingPulse {
  0%, 100% { 
    opacity: 1; 
    transform: scaleY(1) scaleX(1);
  }
  50% { 
    opacity: 0.7; 
    transform: scaleY(1.1) scaleX(0.9);
  }
}

/* Mejoras responsive */
@media (max-width: 640px) {
  .typewriter-text {
    font-size: 0.875rem;
    line-height: 1.5;
  }
  
  .cursor {
    margin-left: 0.125rem;
    font-size: 1em;
  }
}

/* Modo oscuro mejorado */
@media (prefers-color-scheme: dark) {
  .typewriter-text {
    color: #f8fafc;
  }
  
  .cursor {
    color: #60a5fa;
  }
}

/* Estados de accesibilidad */
@media (prefers-reduced-motion: reduce) {
  .cursor.blink,
  .cursor.typing-cursor {
    animation: none;
  }
  
  .cursor {
    opacity: 1;
  }
}
</style>