export const defaultCV = {
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

export const createExperienceItem = () => ({
  id: createId(),
  role: '',
  company: '',
  duration: '',
  description: '',
});

export const createEducationItem = () => ({
  id: createId(),
  degree: '',
  school: '',
  year: '',
});

export const createLanguageItem = () => ({
  id: createId(),
  name: '',
  level: '',
});

export const createProjectItem = () => ({
  id: createId(),
  title: '',
  description: '',
  link: '',
});

export const getSafeArray = (value) => {
  return Array.isArray(value) ? value : [];
};
