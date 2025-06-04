<template>
  <div >
    <HeroSection 
      :role="role"
      :name="name"
      :description="description"
      :actionButtons="actionButtons"
      :typewriterTexts="typewriterTexts"
      :scrollText="scrollText"
      class="section-hero"
    />
    <SkillsSection
      class="section-skills"
      :title="skillsTitle"
      :subtitle="skillsSubtitle"
      :category="skillsCategory"
      :description="description"
      :skills="skills"
    />
    <ProjectsSection
      class="section-projects"
      :title="projectsTitle"
      :subtitle="projectsSubtitle"
      :category="projectsCategory"
      :description="projectsDescription"
      :projects="projects"
    />
    <ExperienceSection
      class="section-experience"
      :title="experienceTitle"
      :subtitle="experienceSubtitle"
      :category="experienceCategory"
      :description="experienceDescription"
      :experiences="experiences"
    />
    <ContactSection
      class="section-contact"
      :title="contactTitle"
      :subtitle="contactSubtitle"
      :category="contactCategory"
      :description="contactDescription"
    />
    <ScrollAnimation
    direction="up"
    :distance="60"
    :duration="1.2"
    :delay="0.2"
    threshold="top 70%"
    :once="true"
    @animation-start="handleAnimationStart"
    @animation-complete="handleAnimationComplete"
  >
    <div class="mi-contenido">
      <h2>Título animado</h2>
      <p>Contenido que aparece con animación</p>
    </div>
  </ScrollAnimation>
  </div>
</template>

<script setup lang="ts">
import HeroSection from '~/components/organisms/HeroSection.vue'
import SkillsSection from '~/components/organisms/SkillsSection.vue'
import ProjectsSection from '~/components/organisms/ProjectsSection.vue'
import ExperienceSection from '~/components/organisms/ExperienceSection.vue'
import ContactSection from '~/components/organisms/ContactSection.vue'
import ScrollAnimation from '~/components/atoms/ScrollAnimation.vue'
import type { Project, Experience, Skill, TypewriterText } from '~/types'
import { useMounted } from '~/composables/useMounted'

import { useContent } from '~/composables/useContent'

// Content
const { 
  role, 
  name, 
  description, 
  skillsTitle, 
  skillsSubtitle, 
  skillsCategory, 
  projectsTitle, 
  projectsSubtitle, 
  projectsCategory, 
  projectsDescription, 
  experienceTitle, 
  experienceSubtitle, 
  experienceCategory, 
  experienceDescription,
  contactTitle,
  contactSubtitle,
  contactCategory,
  contactDescription,
  scrollText 
} = useContent()

// Data
const projects = ref<Project[]>([
  {
    id: '1',
    title: 'Proyecto 1',
    description: 'Descripción del proyecto 1',
    technologies: ['Vue.js', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/proyecto1',
    demoUrl: 'https://proyecto1.com',
    imageUrl: '/projects/proyecto1.png',
    order: 1
  },
  {
    id: '2',
    title: 'Proyecto 2',
    description: 'Descripción del proyecto 2',
    technologies: ['Nuxt.js', 'Supabase', 'Pinia'],
    githubUrl: 'https://github.com/proyecto2',
    demoUrl: 'https://proyecto2.com',
    imageUrl: '/projects/proyecto2.png',
    order: 2
  }
])

const experiences = ref<Experience[]>([
  {
    id: '1',
    company: 'Empresa 1',
    position: 'Desarrollador Full Stack Senior',
    startDate: '2022-01-01',
    endDate: null,
    description: 'Lideré el desarrollo de aplicaciones web escalables utilizando Vue.js y Nuxt.js',
    technologies: ['Vue.js', 'Nuxt.js', 'TypeScript'],
    achievements: [
      'Implementación de arquitectura microservicios',
      'Optimización de rendimiento',
      'Liderazgo técnico'
    ]
  },
  {
    id: '2',
    company: 'Empresa 2',
    position: 'Desarrollador Frontend',
    startDate: '2020-01-01',
    endDate: '2022-01-01',
    description: 'Desarrollo de interfaces de usuario modernas y responsivas',
    technologies: ['Vue.js', 'TypeScript', 'Tailwind CSS'],
    achievements: [
      'Implementación de patrones de diseño',
      'Optimización de rendimiento',
      'Mantenimiento de código'
    ]
  }
])

const skills = ref<Skill[]>([
  {
    id: '1',
    name: 'Vue.js',
    category: 'Frontend',
    level: 'advanced',
    icon: 'code',
    technologies: []
  },
  {
    id: '2',
    name: 'TypeScript',
    category: 'Backend',
    level: 'advanced',
    icon: 'academic-cap',
    technologies: []
  },
  {
    id: '3',
    name: 'Python',
    category: 'Backend',
    level: 'expert',
    icon: 'code-bracket',
    technologies: []
  },
  {
    id: '4',
    name: 'Tailwind CSS',
    category: 'Frontend',
    level: 'expert',
    icon: 'paint-brush',
    technologies: []
  },
  {
    id: '5',
    name: 'NestJS',
    category: 'Backend',
    level: 'advanced',
    icon: 'server',
    technologies: []
  },
  {
    id: '6',
    name: 'React',
    category: 'Frontend',
    level: 'advanced',
    icon: 'cube',
    technologies: []
  },
  {
    id: '7',
    name: 'Svelte',
    category: 'Frontend',
    level: 'intermediate',
    icon: 'bolt',
    technologies: []
  },
  {
    id: '8',
    name: 'Django',
    category: 'Backend',
    level: 'advanced',
    icon: 'server-stack',
    technologies: []
  },
  {
    id: '9',
    name: 'Docker',
    category: 'DevOps',
    level: 'intermediate',
    icon: 'cube-transparent',
    technologies: []
  },
  {
    id: '10',
    name: 'Node.js',
    category: 'Backend',
    level: 'advanced',
    icon: 'server',
    technologies: []
  },
  {
    id: '11',
    name: 'PostgreSQL',
    category: 'Database',
    level: 'intermediate',
    icon: 'database',
    technologies: []
  },
  {
    id: '12',
    name: 'Git',
    category: 'DevOps',
    level: 'expert',
    icon: 'code-branch',
    technologies: []
  }
])

const typewriterTexts = ref<TypewriterText[]>([
  { text: 'Desarrollador Frontend', delay: 100, duration: 200 },
  { text: 'Ingeniero de Software', delay: 100, duration: 200 },
  { text: 'Arquitecto de Sistemas', delay: 100, duration: 200 }
])

// Action buttons
const actionButtons = ref([
  { text: 'Ver CV', link: '#cv' },
  { text: 'Contacto', link: '#contacto' }
])

// Composables
const { isMounted } = useMounted()
const handleAnimationStart = () => {
  console.log('Animación iniciada')
}

const handleAnimationComplete = () => {
  console.log('Animación completada')
}

</script>

<style scoped>
/* Estilos específicos de la página si son necesarios en el futuro */
</style>

   