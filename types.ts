
export enum SkillLevel {
  BEGINNER = 'Débutant',
  INTERMEDIATE = 'Intermédiaire',
  ADVANCED = 'Avancé'
}

export enum SkillCategory {
  TECHNICAL = 'Technique',
  AI_ML = 'IA/ML',
  PROJECT_MGMT = 'Gestion de Projet'
}

export interface Skill {
  id: string;
  name: string;
  level: SkillLevel;
  category: SkillCategory;
}

export interface HeroTag {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  badge: string;
  shortDescription: string;
  problem: string;
  solution: string;
  technologies: string[];
  impact: string;
  timeline: string;
  link?: string;
  imageUrl?: string;
}

export interface Profile {
  name: string;
  title: string;
  photoUrl: string;
  bio: string;
  approach: string;
  email: string;
  linkedin: string;
  github: string;
  highlights: string[];
  heroTags: HeroTag[];
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  skills: Skill[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}
