import type { Project, Experience, Skill, TypewriterText } from '~/types'

export interface ContentData {
  role: string
  name: string
  description: string
  typewriterTexts: string[]
  skills: {
    title: string
    subtitle: string
    category: string
    colors: {
      from: string
      to: string
    }
  }
  projects: {
    title: string
    subtitle: string
    category: string
    description: string
    colors: {
      from: string
      to: string
    }
  }
  experience: {
    title: string
    subtitle: string
    category: string
    description: string
    colors: {
      from: string
      to: string
    }
  }
  contact: {
    title: string
    subtitle: string
    category: string
    description: string
    colors: {
      from: string
      to: string
    }
  }
  scrollText: string
}

export const useContent = () => {
  const content = ref<ContentData>({
    role: 'Full Stack Developer',
    name: 'Raul Altamirano',
    description: 'Experienced developer with a passion for creating modern web applications',
    typewriterTexts: [
      'Desarrollador Full Stack',
      'Especialista en Vue.js',
      'Arquitecto de Software',
      'Entusiasta de la Tecnología'
    ],
    skills: {
      title: 'Skills',
      subtitle: 'Technical Expertise',
      category: 'Development',
      colors: {
        from: 'from-violet-600',
        to: 'to-blue-600'
      }
    },
    projects: {
      title: 'Projects',
      subtitle: 'Featured Work',
      category: 'Portfolio',
      description: 'Explore my latest projects and case studies',
      colors: {
        from: 'from-emerald-500',
        to: 'to-cyan-500'
      }
    },
    experience: {
      title: 'Experience',
      subtitle: 'Professional Journey',
      category: 'Career',
      description: 'My professional background and achievements',
      colors: {
        from: 'from-orange-500',
        to: 'to-yellow-400'
      }
    },
    contact: {
      title: 'Contacto',
      subtitle: 'Hablemos de tu proyecto',
      category: 'Conectemos',
      description: '¿Tienes un proyecto en mente? Estoy aquí para ayudarte a hacerlo realidad. Envíame un mensaje y conversemos sobre cómo podemos trabajar juntos.',
      colors: {
        from: 'from-pink-600',
        to: 'to-red-500'
      }
    },
    scrollText: 'Scroll to explore',
  })

  return {
    content,
    role: computed(() => content.value.role),
    name: computed(() => content.value.name),
    description: computed(() => content.value.description),
    typewriterTexts: computed(() => content.value.typewriterTexts),
    skillsTitle: computed(() => content.value.skills.title),
    skillsSubtitle: computed(() => content.value.skills.subtitle),
    skillsCategory: computed(() => content.value.skills.category),
    projectsTitle: computed(() => content.value.projects.title),
    projectsSubtitle: computed(() => content.value.projects.subtitle),
    projectsCategory: computed(() => content.value.projects.category),
    projectsDescription: computed(() => content.value.projects.description),
    experienceTitle: computed(() => content.value.experience.title),
    experienceSubtitle: computed(() => content.value.experience.subtitle),
    experienceCategory: computed(() => content.value.experience.category),
    experienceDescription: computed(() => content.value.experience.description),
    contactTitle: computed(() => content.value.contact.title),
    contactSubtitle: computed(() => content.value.contact.subtitle),
    contactCategory: computed(() => content.value.contact.category),
    contactDescription: computed(() => content.value.contact.description),
    scrollText: computed(() => content.value.scrollText),
    skillsColors: computed(() => content.value.skills.colors),
    projectsColors: computed(() => content.value.projects.colors),
    experienceColors: computed(() => content.value.experience.colors),
    contactColors: computed(() => content.value.contact.colors)
  }
}
