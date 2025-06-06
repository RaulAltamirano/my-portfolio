<template>
  <div class="relative hidden lg:block">
    <ClientOnly>
      <Motion
        :initial="{ opacity: 0, scale: 0.9 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 0.8, delay: 1 }"
        tag="div"
        class="relative w-full aspect-square"
      >
        <!-- Enhanced Neural Network Background -->
        <div class="absolute inset-0">
          <canvas ref="neuralCanvas" class="absolute inset-0 w-full h-full opacity-40 dark:opacity-30"></canvas>
          <canvas ref="particleCanvas" class="absolute inset-0 w-full h-full opacity-30 dark:opacity-20"></canvas>
          
          <!-- Neural Connections SVG Layer -->
          <svg class="absolute inset-0 w-full h-full" style="pointer-events: none;">
            <defs>
              <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color: #3B82F6; stop-opacity: 0.3">
                  <animate attributeName="stop-opacity" values="0.3;0.5;0.3" dur="3s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" style="stop-color: #06B6D4; stop-opacity: 0.3">
                  <animate attributeName="stop-opacity" values="0.3;0.5;0.3" dur="3s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" style="stop-color: #3B82F6; stop-opacity: 0.3">
                  <animate attributeName="stop-opacity" values="0.3;0.5;0.3" dur="3s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
              
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feFlood flood-color="#3B82F6" flood-opacity="0.5" result="glowColor">
                  <animate attributeName="flood-opacity" values="0.5;0.8;0.5" dur="2s" repeatCount="indefinite" />
                </feFlood>
                <feComposite in="glowColor" in2="coloredBlur" operator="in" result="softGlow"/>
                <feMerge>
                  <feMergeNode in="softGlow"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            <!-- Neural Paths -->
            <g class="neural-paths">
              <path
                v-for="(connection, index) in neuralConnections"
                :key="index"
                :d="connection.path"
                class="neural-path"
                :class="{ 'active-path': connection.isActive }"
                :style="{
                  strokeDasharray: connection.length,
                  strokeDashoffset: connection.offset,
                  animationDelay: `${index * 0.2}s`,
                  filter: connection.isActive ? 'url(#glow)' : 'none',
                  stroke: connection.isActive ? 'url(#activeNeuralGradient)' : 'url(#neuralGradient)'
                }"
              >
                <circle
                  r="2"
                  class="neural-node"
                  :style="{
                    animationDelay: `${index * 0.2}s`,
                    filter: connection.isActive ? 'url(#glow)' : 'none'
                  }"
                >
                  <animateMotion
                    :dur="`${3 + index * 0.5}s`"
                    repeatCount="indefinite"
                    :path="connection.path"
                  >
                    <animate
                      attributeName="r"
                      values="1;2;1"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </animateMotion>
                </circle>
              </path>
            </g>
          </svg>
        </div>

        <!-- Tech Cards Container -->
        <div 
          class="absolute inset-0 transform-gpu"
          :style="{ transform: `perspective(1000px) rotateX(${tiltY * 0.1}deg) rotateY(${tiltX * 0.1}deg)` }"
        >
          <div 
            v-for="(tech, index) in techStack" 
            :key="tech.name"
            class="absolute transform-gpu transition-all duration-700"
            :style="{
              left: `${tech.position.x}%`,
              top: `${tech.position.y}%`,
              transform: `translate(-50%, -50%) scale(${1 + Math.sin(Date.now() / 1000 + index) * 0.05})`,
              zIndex: tech.zIndex
            }"
            @mouseenter="activateTechCard(index)"
            @mouseleave="deactivateTechCard(index)"
          >
            <Motion
              :initial="{ scale: 0.9, opacity: 0 }"
              :animate="{ scale: 1, opacity: 1 }"
              :transition="{ duration: 0.5, delay: index * 0.1 }"
              :whileHover="{ scale: 1.05 }"
              class="relative group"
            >
              <!-- Card Glow Effect -->
              <div 
                class="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-blue-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"
                :class="{ 'animate-pulse-slow': tech.isActive }"
              ></div>
              
              <!-- Card Container with Glassmorphism -->
              <div 
                class="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-6 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-500 border border-slate-200/50 dark:border-slate-700/50"
                :class="{ 
                  'ring-2 ring-blue-500/50 dark:ring-blue-400/50': tech.isActive,
                  'group-hover:bg-white/90 dark:group-hover:bg-slate-800/90': true
                }"
              >
                <!-- Neural Pattern Background -->
                <div class="absolute inset-0 overflow-hidden rounded-2xl opacity-10">
                  <div class="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,_var(--tw-gradient-stops))] from-blue-500 via-cyan-500 to-blue-500 animate-spin-slow"></div>
                  <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent animate-pulse-slow"></div>
                </div>
                
                <!-- Tech Icon with Rings -->
                <div class="relative">
                  <div class="absolute inset-0">
                    <div 
                      v-for="i in 3" 
                      :key="i"
                      class="absolute inset-0 rounded-full border border-blue-500/20 dark:border-blue-400/20"
                      :style="{
                        transform: `scale(${1 + i * 0.2})`,
                        animationDelay: `${i * 0.2}s`
                      }"
                      :class="{ 'animate-ping-slow': tech.isActive }"
                    ></div>
                  </div>
                  <img 
                    :src="tech.icon" 
                    :alt="tech.name"
                    class="relative w-16 h-16 object-contain transform-gpu group-hover:scale-110 transition-transform duration-500"
                    :class="{ 'animate-float': tech.isActive }"
                  />
                </div>
              </div>
            </Motion>
          </div>
        </div>
      </Motion>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Motion } from '@motionone/vue'
import react from 'assets/techlogos/atom.png'
import docker from 'assets/techlogos/icons8-docker-240.png'
import nodejs from 'assets/techlogos/node-js.png'
import nestjs from 'assets/techlogos/icons8-nestjs-logo-480.png'
import vue from 'assets/techlogos/icons8-vue.js-96.png'
import tailwind from 'assets/techlogos/icons8-tailwindcss-480.png'

// Props for mouse tilt effect
const props = defineProps<{
  tiltX: number
  tiltY: number
}>()

// Neural network animation
const neuralCanvas = ref<HTMLCanvasElement | null>(null)
let neuralAnimationFrame: number | undefined
let neuralParticles: Particle[] = []

// Particle system for background
const particleCanvas = ref<HTMLCanvasElement | null>(null)
let particleAnimationFrame: number | undefined
let backgroundParticles: Particle[] = []

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  color: string
  type: 'network' | 'neural'
  life: number
  maxLife: number
}

interface ControlPoint {
  x: number
  y: number
}

interface TechStackItem {
  name: string
  icon: string
  position: { x: number; y: number }
  zIndex: number
  isActive: boolean
  connections: number[]
  pulsePhase: number
}

// Enhanced tech stack data with active state and connection info
const techStack = ref<TechStackItem[]>([
  { 
    name: 'React', 
    icon: react, 
    position: { x: 20, y: 30 }, 
    zIndex: 6,
    isActive: false,
    connections: [] as number[],
    pulsePhase: Math.random() * Math.PI * 2
  },
  { 
    name: 'Vue', 
    icon: vue, 
    position: { x: 80, y: 40 }, 
    zIndex: 5,
    isActive: false,
    connections: [] as number[],
    pulsePhase: Math.random() * Math.PI * 2
  },
  { 
    name: 'Next.js', 
    icon: nestjs, 
    position: { x: 40, y: 70 }, 
    zIndex: 4,
    isActive: false,
    connections: [] as number[],
    pulsePhase: Math.random() * Math.PI * 2
  },
  { 
    name: 'Docker', 
    icon: docker, 
    position: { x: 70, y: 20 }, 
    zIndex: 3,
    isActive: false,
    connections: [] as number[],
    pulsePhase: Math.random() * Math.PI * 2
  },
  { 
    name: 'Node.js', 
    icon: nodejs, 
    position: { x: 30, y: 50 }, 
    zIndex: 2,
    isActive: false,
    connections: [] as number[],
    pulsePhase: Math.random() * Math.PI * 2
  },
  { 
    name: 'Tailwind', 
    icon: tailwind,
    position: { x: 60, y: 60 }, 
    zIndex: 1,
    isActive: false,
    connections: [] as number[],
    pulsePhase: Math.random() * Math.PI * 2
  }
])

// Enhanced neural connections state
const neuralConnections = ref<Array<{
  path: string
  length: number
  offset: number
  isActive: boolean
  sourceIndex: number
  targetIndex: number
}>>([])

// Enhanced card interaction handlers
const activateTechCard = (index: number) => {
  const tech = techStack.value[index]
  tech.isActive = true
  tech.zIndex = 10
  
  // Activate connected paths with ripple effect
  tech.connections.forEach((connIndex, i) => {
    setTimeout(() => {
      neuralConnections.value[connIndex].isActive = true
    }, i * 100)
  })

  // Activate connected cards with delay
  tech.connections.forEach((connIndex, i) => {
    const connectedTechIndex = neuralConnections.value[connIndex].sourceIndex === index
      ? neuralConnections.value[connIndex].targetIndex
      : neuralConnections.value[connIndex].sourceIndex
    
    setTimeout(() => {
      techStack.value[connectedTechIndex].zIndex = 9 - i
    }, i * 150)
  })
}

const deactivateTechCard = (index: number) => {
  const tech = techStack.value[index]
  tech.isActive = false
  tech.zIndex = techStack.value.length - index
  
  // Deactivate connected paths with fade effect
  tech.connections.forEach((connIndex, i) => {
    setTimeout(() => {
      neuralConnections.value[connIndex].isActive = false
    }, i * 50)
  })

  // Reset connected cards z-index
  tech.connections.forEach((connIndex) => {
    const connectedTechIndex = neuralConnections.value[connIndex].sourceIndex === index
      ? neuralConnections.value[connIndex].targetIndex
      : neuralConnections.value[connIndex].sourceIndex
    
    techStack.value[connectedTechIndex].zIndex = techStack.value.length - connectedTechIndex
  })
}

// Enhanced neural connections generation with organic curves
const generateNeuralConnections = () => {
  const connections: Array<{
    path: string
    length: number
    offset: number
    isActive: boolean
    sourceIndex: number
    targetIndex: number
  }> = []
  
  techStack.value.forEach((tech1, i) => {
    techStack.value.slice(i + 1).forEach((tech2, j) => {
      const dx = tech1.position.x - tech2.position.x
      const dy = tech1.position.y - tech2.position.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance < 40) {
        // Create organic curved path
        const midX = (tech1.position.x + tech2.position.x) / 2
        const midY = (tech1.position.y + tech2.position.y) / 2
        const curveOffset = Math.sin(tech1.pulsePhase + tech2.pulsePhase) * 15
        
        // Generate path with multiple control points
        const controlPoints: ControlPoint[] = []
        const numPoints = 3
        for (let k = 0; k < numPoints; k++) {
          const t = (k + 1) / (numPoints + 1)
          const offset = Math.sin(t * Math.PI) * curveOffset
          controlPoints.push({
            x: tech1.position.x + (tech2.position.x - tech1.position.x) * t,
            y: tech1.position.y + (tech2.position.y - tech1.position.y) * t + offset
          })
        }
        
        // Build SVG path
        let path = `M ${tech1.position.x}% ${tech1.position.y}%`
        controlPoints.forEach((point, k) => {
          const nextPoint = controlPoints[k + 1] || { x: tech2.position.x, y: tech2.position.y }
          const cpX = point.x + (nextPoint.x - point.x) * 0.5
          const cpY = point.y + (nextPoint.y - point.y) * 0.5
          path += ` Q ${point.x}% ${point.y}%, ${cpX}% ${cpY}%`
        })
        path += ` L ${tech2.position.x}% ${tech2.position.y}%`
        
        const length = Math.floor(distance * 2.5)
        
        connections.push({
          path,
          length,
          offset: Math.random() * length,
          isActive: false,
          sourceIndex: i,
          targetIndex: i + j + 1
        })
        
        // Store connection indices
        techStack.value[i].connections.push(connections.length - 1)
        techStack.value[i + j + 1].connections.push(connections.length - 1)
      }
    })
  })
  
  neuralConnections.value = connections
}

// Enhanced particle system with improved performance
const initParticleSystem = () => {
  const canvas = particleCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d', { alpha: true })
  if (!ctx) return

  const resizeCanvas = () => {
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`
  }

  const createParticles = () => {
    backgroundParticles = []
    const particleCount = Math.min(150, Math.floor((canvas.width * canvas.height) / 10000))
    
    for (let i = 0; i < particleCount; i++) {
      backgroundParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.5 ? '#3B82F6' : '#06B6D4',
        type: 'neural',
        life: Math.random() * 100,
        maxLife: 100
      })
    }
  }

  const animateParticles = () => {
    if (!ctx || !canvas) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    const time = performance.now() / 1000
    
    backgroundParticles.forEach(particle => {
      // Update particle life
      particle.life = (particle.life + 1) % particle.maxLife
      const lifeRatio = particle.life / particle.maxLife
      
      // Update position with smooth acceleration
      particle.vx += (Math.random() - 0.5) * 0.01
      particle.vy += (Math.random() - 0.5) * 0.01
      
      // Limit velocity
      const maxSpeed = 0.5
      const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy)
      if (speed > maxSpeed) {
        particle.vx = (particle.vx / speed) * maxSpeed
        particle.vy = (particle.vy / speed) * maxSpeed
      }
      
      particle.x += particle.vx
      particle.y += particle.vy
      
      // Smooth opacity transition
      particle.opacity = Math.sin(lifeRatio * Math.PI) * 0.5 + 0.2

      // Bounce off edges
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.vx *= -0.8
        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
      }
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.vy *= -0.8
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))
      }

      // Draw particle
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
      
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.radius * 2
      )
      gradient.addColorStop(0, `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`)
      gradient.addColorStop(1, `${particle.color}00`)
      
      ctx.fillStyle = gradient
      ctx.shadowBlur = 8
      ctx.shadowColor = particle.color
      ctx.fill()
      ctx.shadowBlur = 0

      // Draw connections
      backgroundParticles.forEach(otherParticle => {
        const dx = particle.x - otherParticle.x
        const dy = particle.y - otherParticle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 50) {
          const opacity = (1 - distance / 50) * 0.3 * Math.min(particle.opacity, otherParticle.opacity)
          
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(otherParticle.x, otherParticle.y)
          
          const connectionGradient = ctx.createLinearGradient(
            particle.x, particle.y,
            otherParticle.x, otherParticle.y
          )
          connectionGradient.addColorStop(0, `${particle.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`)
          connectionGradient.addColorStop(1, `${otherParticle.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`)
          
          ctx.strokeStyle = connectionGradient
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      })
    })

    particleAnimationFrame = requestAnimationFrame(animateParticles)
  }

  // Initialize
  resizeCanvas()
  createParticles()
  animateParticles()

  // Handle resize with debounce
  let resizeTimeout: number
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = window.setTimeout(() => {
      resizeCanvas()
      createParticles()
    }, 250)
  })
}

// Update tech stack positions
const updateTechStack = () => {
  const time = Date.now() / 1000
  
  techStack.value.forEach((tech, index) => {
    // Update pulse phase
    tech.pulsePhase += 0.01
    
    // Calculate floating effect
    const floatOffset = Math.sin(time + tech.pulsePhase) * 0.5
    
    // Update position with subtle movement
    tech.position.x += Math.sin(time * 0.5 + index) * 0.02
    tech.position.y += Math.cos(time * 0.5 + index) * 0.02
    
    // Keep positions within bounds
    tech.position.x = Math.max(10, Math.min(90, tech.position.x))
    tech.position.y = Math.max(10, Math.min(90, tech.position.y))
  })
  
  // Regenerate connections periodically
  if (Math.floor(time) % 5 === 0) {
    generateNeuralConnections()
  }
  
  requestAnimationFrame(updateTechStack)
}

// Lifecycle hooks
onMounted(() => {
  initParticleSystem()
  updateTechStack()
  generateNeuralConnections()
})

onBeforeUnmount(() => {
  if (neuralAnimationFrame) cancelAnimationFrame(neuralAnimationFrame)
  if (particleAnimationFrame) cancelAnimationFrame(particleAnimationFrame)
})
</script>

<style scoped>
/* Enhanced Neural Network Animations */
.neural-path {
  fill: none;
  stroke-width: 1.5;
  stroke-linecap: round;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: dash 20s linear infinite;
  will-change: stroke-dashoffset, filter, stroke-width;
}

.neural-path.active-path {
  stroke-width: 2.5;
  filter: url(#glow);
  animation: dash 10s linear infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: -1000;
  }
}

.neural-node {
  fill: #3B82F6;
  filter: url(#glow);
  animation: pulse 2s ease-in-out infinite;
  will-change: transform, opacity;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.5);
    opacity: 1;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) scale(1) rotate(0deg);
  }
  50% {
    transform: translateY(-5px) scale(1.05) rotate(2deg);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
  will-change: transform;
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
    filter: blur(8px);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.05);
    filter: blur(12px);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
  will-change: transform, opacity, filter;
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
  will-change: transform;
}

@keyframes ping-slow {
  0%, 100% {
    transform: scale(1);
    opacity: 0.2;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.4;
  }
}

.animate-ping-slow {
  animation: ping-slow 3s ease-in-out infinite;
  will-change: transform, opacity;
}

/* Performance optimizations */
@media (prefers-reduced-motion: reduce) {
  .neural-path,
  .neural-node,
  .animate-float,
  .animate-pulse-slow,
  .animate-spin-slow,
  .animate-ping-slow {
    animation: none !important;
    transition: none !important;
  }
}

/* Hardware acceleration hints */
.transform-gpu {
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
  will-change: transform;
}

/* Mobile optimizations */
@media (max-width: 1024px) {
  .neural-path {
    stroke-width: 1;
  }
  
  .neural-node {
    r: 1.5;
  }
}
</style> 