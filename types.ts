
export interface Profile {
  name: string;
  role: string;
  bio: string;
  email: string;
  location: string;
  github: string;
  linkedin: string;
  avatarUrl: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  logo?: string;
  responsibilities?: string;
  environment?: string;
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  image: string;
}

export interface Skill {
  category: string;
  name: string;
  level: number; // 1-100
}

export interface Education {
  school: string;
  degree: string;
  year: string;
  gpa?: string;
  activities?: string;
  achievements?: string;
}

export interface PortfolioData {
  profile: Profile;
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  education: Education[];
}
