export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  imageUrl: string;
  order?: number;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  description: string;
  technologies: string[];
  achievements: string[];
}

export interface Skill {
  id: string;
  technologies: string[];
  name: string;
  category: string;
  level: 'basic' | 'intermediate' | 'advanced';
  icon: 'code' | 'database' | 'puzzle' | 'sparkles' | 'academic-cap' | 'beaker' | 'light-bulb' | 'pencil-square';
}

export interface TypewriterText {
  text: string;
  delay?: number;
  duration?: number;
}
