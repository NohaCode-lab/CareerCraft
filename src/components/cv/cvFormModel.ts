import { CVEducation, CVExperience, CVLanguage, CVProject } from "../../types";

export interface CVDataModel {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  skills: string;
  experience: CVExperience[];
  education: CVEducation[];
  languages: CVLanguage[];
  projects: CVProject[];
}

export const defaultCV: CVDataModel = {
  fullName: '',
  title: '',
  email: '',
  phone: '',
  location: '',
  summary: '',
  skills: '',
  experience: [],
  education: [],
  languages: [],
  projects: [],
};

const createId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()}`;
};

export const createExperienceItem = (): CVExperience => ({
  id: createId(),
  role: '',
  company: '',
  duration: '',
  description: '',
});

export const createEducationItem = (): CVEducation => ({
  id: createId(),
  degree: '',
  institution: '',
  year: '',
});

export const createLanguageItem = (): CVLanguage => ({
  id: createId(),
  language: '',
  proficiency: '',
});

export const createProjectItem = (): CVProject => ({
  id: createId(),
  name: '',
  description: '',
  link: '',
});

export const getSafeArray = <T,>(value: T[] | unknown): T[] => {
  return Array.isArray(value) ? (value as T[]) : [];
};
