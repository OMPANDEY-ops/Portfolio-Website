export interface ContactInfo {
  email: string;
  phone: string;
  github: string;
  linkedin: string;
}

export interface Education {
  school: string;
  degree: string;
  dates: string;
  detail?: string;
  location?: string;
  cgpa?: number | string;
  percentage?: number | string;
}

export interface TechStackCategory {
  Languages: string[];
  'AI / ML': string[];
  'Web & Backend': string[];
  Cybersecurity: string[];
  'Tools & Platforms': string[];
}

export interface SubProject {
  name: string;
  github: string;
  description: string;
}

export interface Project {
  name: string;
  github: string | null;
  stack: string[];
  description: string;
  projects?: SubProject[];
  note?: string;
}

export interface Certification {
  name: string;
  date: string;
}

export interface Extracurricular {
  role: string;
  dates: string;
  description: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  location: string;
  contact: ContactInfo;
  education: Education[];
  techStack: TechStackCategory;
  projects: Project[];
  certifications: Certification[];
  extracurriculars: Extracurricular[];
}

export type AvatarState =
  | 'idle'
  | 'waving'
  | 'talking'
  | 'walking'
  | 'sitting_down'
  | 'seated_idle'
  | 'seated_talking'
  | 'standing_up';

export type ActiveSection =
  | 'home'
  | 'about'
  | 'tech-stack'
  | 'projects'
  | 'certifications'
  | 'literature'
  | 'contact';

export interface SpeechLine {
  id: string;
  text: string;
  section: ActiveSection;
}
