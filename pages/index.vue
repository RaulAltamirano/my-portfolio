<template>
  <div>
    <HeroSection 
      :role="role"
      :name="name"
      :description="description"
      :actionButtons="actionButtons"
      :typewriterTexts="typewriterTexts"
      :scrollText="scrollText"
    />
    <SkillsSection
      v-motion
      :initial="{ opacity: 0, y: 100, scale: 0.95 }"
      :visibleOnce="{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: 'spring',
          damping: 20,
          stiffness: 100,
          delay: 100,
          duration: 800
        }
      }" 
      :title="skillsTitle"
      :subtitle="skillsSubtitle"
      :category="skillsCategory"
      :description="description"
      :skills="skills"
    />
    <ProjectsSection
      v-motion
      :initial="{ opacity: 0, x: -100, rotate: -5 }"
      :visibleOnce="{
        opacity: 1,
        x: 0,
        rotate: 0,
        transition: {
          type: 'spring',
          damping: 15,
          stiffness: 100,
          delay: 200,
          duration: 1000
        }
      }" 
      :title="projectsTitle"
      :subtitle="projectsSubtitle"
      :category="projectsCategory"
      :description="projectsDescription"
      :projects="projects"
    />
    <ExperienceSection
      v-motion
      :initial="{ opacity: 0, y: 100, scale: 0.9 }"
      :visibleOnce="{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: 'spring',
          damping: 25,
          stiffness: 100,
          delay: 300,
          duration: 1200
        }
      }" 
      :title="experienceTitle"
      :subtitle="experienceSubtitle"
      :category="experienceCategory"
      :description="experienceDescription"
      :experiences="experiences"
    />
    <ContactSection
      v-motion
      :initial="{ opacity: 0, y: 50, blur: 10 }"
      :visibleOnce="{
        opacity: 1,
        y: 0,
        blur: 0,
        transition: {
          type: 'spring',
          damping: 20,
          stiffness: 100,
          delay: 400,
          duration: 1000
        }
      }"
      :title="contactTitle"
      :subtitle="contactSubtitle"
      :category="contactCategory"
      :description="contactDescription"
    />
  </div>
</template>

<script setup lang="ts">
import HeroSection from '~/components/organisms/HeroSection.vue'
import SkillsSection from '~/components/organisms/SkillsSection.vue'
import ProjectsSection from '~/components/organisms/ProjectsSection.vue'
import ExperienceSection from '~/components/organisms/ExperienceSection.vue'
import ContactSection from '~/components/organisms/ContactSection.vue'
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

</script>

<style scoped>
/* Estilos específicos de la página si son necesarios en el futuro */
</style>

   