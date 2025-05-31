<template>
  <div class="absolute inset-0 z-0 pointer-events-none">
    <!-- Floating Elements with Parallax -->
    <div v-for="(element, index) in floatingElements" :key="index" 
         class="absolute"
         :style="{
           left: `${element.x}px`,
           top: `${element.y}px`,
           transform: `translate(${element.startX}px, ${element.startY}px)`
         }">
      <div class="w-16 h-16 rounded-full blur-2xl bg-gradient-to-r" :class="element.color"></div>
    </div>
    
    <!-- Enhanced GSAP Background Container -->
    <div 
      ref="backgroundContainer"
      class="absolute right-0 top-0 w-1/2 h-full overflow-hidden pointer-events-auto"
      style="clip-path: polygon(20% 0, 100% 0, 100% 100%, 0% 100%)"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <!-- Particles and cursor glow will be created here dynamically -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'

// Register GSAP plugins
gsap.registerPlugin(CustomEase)

// Custom ease for smoother animations
const customEase = CustomEase.create("custom", "M0,0 C0.126,0.382 0.288,0.618 0.4,0.7 0.512,0.782 0.644,0.882 0.7,0.95 0.756,1.018 0.826,1.1 1,1")

// Background elements refs
const backgroundContainer = ref<HTMLElement | null>(null)
const particles = ref<HTMLElement[]>([])
const cursorGlow = ref<HTMLElement | null>(null)
const isHovering = ref(false)

// Mouse position and velocity for advanced interactions
const mouseX = ref(0)
const mouseY = ref(0)
const mouseVelocity = ref({ x: 0, y: 0 })
const lastMousePosition = ref({ x: 0, y: 0 })
const mouseTrail = ref<{ x: number; y: number; scale: number }[]>([])

// Particle system configuration
const particleConfig = {
  count: 30,
  baseSize: 2,
  hoverSize: 4,
  baseSpeed: 0.5,
  hoverSpeed: 1.5,
  connectionDistance: 100,
  repulsionStrength: 0.5,
  attractionStrength: 0.2
}

// Floating elements with improved motion
const floatingElements = ref([
  { startX: -50, startY: -50, x: 200, y: 100, color: 'from-gray-500/[.2] to-gray-400/[.2]' },
  { startX: 100, startY: -100, x: 300, y: 200, color: 'from-gray-600/[.2] to-gray-500/[.2]' },
  { startX: -100, startY: 200, x: -200, y: 300, color: 'from-gray-700/[.2] to-gray-600/[.2]' },
  { startX: 150, startY: 150, x: 400, y: 400, color: 'from-gray-800/[.2] to-gray-700/[.2]' }
])

// Create cursor glow effect
const createCursorGlow = (): void => {
  if (!backgroundContainer.value) return;
  
  cursorGlow.value = document.createElement('div');
  cursorGlow.value.className = 'absolute w-32 h-32 rounded-full pointer-events-none opacity-0 transition-opacity duration-300';
  cursorGlow.value.style.background = 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(6, 182, 212, 0.1) 50%, transparent 70%)';
  cursorGlow.value.style.filter = 'blur(20px)';
  backgroundContainer.value.appendChild(cursorGlow.value);
}

// Create particles with advanced properties
const createParticles = (): void => {
  if (!backgroundContainer.value) return;
  
  backgroundContainer.value.innerHTML = '';
  particles.value = [];
  mouseTrail.value = Array(5).fill({ x: 0, y: 0, scale: 1 });
  
  // Create cursor glow
  createCursorGlow();
  
  // Create particles
  for (let i = 0; i < particleConfig.count; i++) {
    const particle: HTMLElement = document.createElement('div');
    const size = Math.random() * particleConfig.baseSize + 1;
    
    particle.className = 'absolute rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm transition-all duration-300';
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Add data attributes for GSAP animations
    particle.dataset.index = i.toString();
    particle.dataset.baseX = (Math.random() * 100).toString();
    particle.dataset.baseY = (Math.random() * 100).toString();
    
    backgroundContainer.value.appendChild(particle);
    particles.value.push(particle);
    
    // Initial position and animation
    gsap.set(particle, {
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: Math.random() * 0.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.2,
      rotation: Math.random() * 360
    });
  }
}

// Advanced particle animation with physics
const animateParticles = (): void => {
  particles.value.forEach((particle: HTMLElement, index: number): void => {
    const baseX = parseFloat(particle.dataset.baseX || '0');
    const baseY = parseFloat(particle.dataset.baseY || '0');
    
    // Create a timeline for each particle
    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      delay: index * 0.1
    });
    
    tl.to(particle, {
      x: `+=${(Math.random() - 0.5) * 30}`,
      y: `+=${(Math.random() - 0.5) * 30}`,
      rotation: `+=${(Math.random() - 0.5) * 180}`,
      duration: 2 + Math.random() * 2,
      ease: customEase
    });
    
    // Store timeline for cleanup
    particle.dataset.timeline = tl.toString();
  });
}

// Update mouse trail effect
const updateMouseTrail = (): void => {
  if (!cursorGlow.value) return;
  
  // Update trail positions
  for (let i = mouseTrail.value.length - 1; i > 0; i--) {
    mouseTrail.value[i] = { ...mouseTrail.value[i - 1] };
  }
  mouseTrail.value[0] = { x: mouseX.value, y: mouseY.value, scale: isHovering.value ? 1.5 : 1 };
  
  // Animate cursor glow
  gsap.to(cursorGlow.value, {
    x: mouseX.value,
    y: mouseY.value,
    scale: isHovering.value ? 1.5 : 1,
    opacity: isHovering.value ? 0.8 : 0.4,
    duration: 0.3,
    ease: 'power2.out'
  });
}

// Enhanced mouse movement handler with velocity
const handleMouseMove = (e: MouseEvent): void => {
  if (!backgroundContainer.value) return;
  
  const rect = backgroundContainer.value.getBoundingClientRect();
  const newX = ((e.clientX - rect.left) / rect.width) * 100;
  const newY = ((e.clientY - rect.top) / rect.height) * 100;
  
  // Calculate velocity
  mouseVelocity.value = {
    x: newX - lastMousePosition.value.x,
    y: newY - lastMousePosition.value.y
  };
  
  mouseX.value = newX;
  mouseY.value = newY;
  lastMousePosition.value = { x: newX, y: newY };
  
  // Update particles based on mouse position and velocity
  particles.value.forEach((particle: HTMLElement): void => {
    const particleX = parseFloat(particle.dataset.baseX || '0');
    const particleY = parseFloat(particle.dataset.baseY || '0');
    
    // Calculate distance from mouse
    const dx = mouseX.value - particleX;
    const dy = mouseY.value - particleY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Apply force based on distance
    if (distance < particleConfig.connectionDistance) {
      const force = (1 - distance / particleConfig.connectionDistance) * particleConfig.repulsionStrength;
      const angle = Math.atan2(dy, dx);
      
      gsap.to(particle, {
        x: `+=${Math.cos(angle) * force * 20}`,
        y: `+=${Math.sin(angle) * force * 20}`,
        scale: isHovering.value ? particleConfig.hoverSize : particleConfig.baseSize,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  });
  
  updateMouseTrail();
}

// Handle hover state
const handleMouseEnter = (): void => {
  isHovering.value = true;
  if (cursorGlow.value) {
    gsap.to(cursorGlow.value, {
      scale: 1.5,
      opacity: 0.8,
      duration: 0.3,
      ease: 'power2.out'
    });
  }
}

const handleMouseLeave = (): void => {
  isHovering.value = false;
  if (cursorGlow.value) {
    gsap.to(cursorGlow.value, {
      scale: 1,
      opacity: 0.4,
      duration: 0.3,
      ease: 'power2.out'
    });
  }
}

// Animation frame for smooth updates
let animationFrame: number;
const updateAnimation = (): void => {
  updateMouseTrail();
  animationFrame = requestAnimationFrame(updateAnimation);
}

// Add parallax effect to floating elements
const handleScroll = () => {
  const scrollY = window.scrollY
  floatingElements.value.forEach(element => {
    element.x += scrollY * 0.1
    element.y += scrollY * 0.15
  })
}

// Lifecycle hooks
onMounted(() => {
  createParticles();
  animateParticles();
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('scroll', handleScroll);
  animationFrame = requestAnimationFrame(updateAnimation);
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('scroll', handleScroll);
  cancelAnimationFrame(animationFrame);
  
  // Cleanup GSAP animations
  particles.value.forEach(particle => {
    const timeline = particle.dataset.timeline;
    if (timeline) {
      gsap.getById(timeline)?.kill();
    }
    gsap.killTweensOf(particle);
  });
  
  if (cursorGlow.value) {
    gsap.killTweensOf(cursorGlow.value);
  }
})
</script>

<style scoped>
/* Enhanced GSAP Background Styles */
.absolute.right-0 {
  background: linear-gradient(135deg, 
    rgba(59, 130, 246, 0.05) 0%, 
    rgba(6, 182, 212, 0.05) 50%,
    rgba(59, 130, 246, 0.02) 100%
  );
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
}

.absolute.right-0:hover {
  background: linear-gradient(135deg, 
    rgba(59, 130, 246, 0.08) 0%, 
    rgba(6, 182, 212, 0.08) 50%,
    rgba(59, 130, 246, 0.04) 100%
  );
}

/* Particle styles */
.absolute.rounded-full {
  will-change: transform, opacity;
  transform-origin: center center;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

/* Cursor glow styles */
.absolute.w-32.h-32 {
  will-change: transform, opacity;
  transform-origin: center center;
  mix-blend-mode: screen;
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .absolute.rounded-full,
  .absolute.w-32.h-32 {
    transition: none;
  }
}
</style> 