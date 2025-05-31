<template>
  <div class="relative">

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
      :email="contactEmail"
      :location="contactLocation"
      :socialLinks="contactSocialLinks"
    />
  </div>
</template>

<script setup lang="ts">
import HeroSection from '~/components/organisms/HeroSection.vue'
import SkillsSection from '~/components/organisms/SkillsSection.vue'
import ProjectsSection from '~/components/organisms/ProjectsSection.vue'
import ExperienceSection from '~/components/organisms/ExperienceSection.vue'
import ContactSection from '~/components/organisms/ContactSection.vue'
import BackgroundEffect from '~/components/molecules/BackgroundEffect.vue'
import type { Project, Experience, Skill, TypewriterText } from '~/types'
import { useMounted } from '~/composables/useMounted'

import { useContent } from '~/composables/useContent'

// Content
const { 
  role, 
  name, 
  description, 
  typewriterTexts,
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
    icon: 'code',
    technologies: []
  },
  {
    id: '3',
    name: 'Python',
    category: 'Backend',
    level: 'advanced',
    icon: 'code',
    technologies: []
  },
  {
    id: '4',
    name: 'Tailwind CSS',
    category: 'Frontend',
    level: 'advanced',
    icon: 'pencil-square',
    technologies: []
  },
  {
    id: '5',
    name: 'NestJS',
    category: 'Backend',
    level: 'advanced',
    icon: 'code',
    technologies: []
  },
  {
    id: '6',
    name: 'React',
    category: 'Frontend',
    level: 'advanced',
    icon: 'puzzle',
    technologies: []
  },
  {
    id: '7',
    name: 'Svelte',
    category: 'Frontend',
    level: 'intermediate',
    icon: 'sparkles',
    technologies: []
  },
  {
    id: '8',
    name: 'Django',
    category: 'Backend',
    level: 'advanced',
    icon: 'code',
    technologies: []
  },
  {
    id: '9',
    name: 'Docker',
    category: 'DevOps',
    level: 'intermediate',
    icon: 'puzzle',
    technologies: []
  },
  {
    id: '10',
    name: 'Node.js',
    category: 'Backend',
    level: 'advanced',
    icon: 'code',
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
    level: 'advanced',
    icon: 'code',
    technologies: []
  }
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

const contactEmail = ref('contact@example.com')
const contactLocation = ref('Madrid, España')
const contactSocialLinks = ref([
  {
    name: 'GitHub',
    url: 'https://github.com/yourusername',
    icon: 'github'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    icon: 'linkedin'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/yourusername',
    icon: 'twitter'
  }
])

</script>

<style scoped>
/* Estilos específicos de la página si son necesarios en el futuro */
</style>

   