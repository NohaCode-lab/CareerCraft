export const sampleCVData = {
  personalInfo: {
    fullName: 'Noha Ahmed',
    jobTitle: 'Frontend Developer',
    email: 'noha.ahmed@example.com',
    phone: '+20 100 000 0000',
    location: 'Cairo, Egypt',
    linkedin: 'https://linkedin.com/in/noha-ahmed',
    github: 'https://github.com/noha-ahmed',
    portfolio: 'https://noha-portfolio.dev',
  },

  summary:
    'Motivated Frontend Developer with strong foundations in HTML, CSS, JavaScript, React, responsive design, and UI implementation. Experienced in building portfolio-ready web interfaces, reusable components, and clean user experiences. Interested in international frontend opportunities, especially in Germany and Europe.',

  experience: [
    {
      id: 'exp-1',
      role: 'Frontend Developer Trainee',
      company: 'Tech Learning Studio',
      location: 'Remote',
      startDate: '2025-01',
      endDate: '2025-06',
      current: false,
      description: [
        'Built responsive web pages using HTML, CSS, JavaScript, and modern layout techniques.',
        'Created reusable UI sections to improve consistency, maintainability, and development speed.',
        'Practiced React component architecture, state management basics, and clean project structure.',
      ],
    },
  ],

  education: [
    {
      id: 'edu-1',
      degree: "Bachelor's Degree in English",
      institution: 'Higher Institute of Languages, Sheraton, Heliopolis',
      location: 'Egypt',
      startDate: '2018-09',
      endDate: '2022-06',
    },
  ],

  skills: [
    'HTML5',
    'CSS3',
    'JavaScript',
    'React',
    'Responsive Design',
    'Tailwind CSS',
    'Git',
    'GitHub',
    'Figma',
    'UI/UX Basics',
  ],

  projects: [
    {
      id: 'proj-1',
      title: 'CareerCraft',
      description:
        'A SaaS-style career assistant app for ATS-friendly CV building, job tracking, AI-powered guidance, and interview preparation.',
      technologies: ['React', 'Vite', 'Tailwind CSS'],
      link: 'https://example.com/careercraft',
    },
    {
      id: 'proj-2',
      title: 'Mangata & Gallo Website',
      description:
        'A responsive jewelry website with modern sections, polished product presentation, and elegant visual design.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      link: 'https://example.com/mangata-gallo',
    },
  ],

  languages: [
    { id: 'lang-1', name: 'Arabic', level: 'Native' },
    { id: 'lang-2', name: 'English', level: 'Fluent' },
  ],

  certifications: [
    {
      id: 'cert-1',
      title: 'Meta Front-End Development',
      issuer: 'Coursera',
      year: '2025',
    },
  ],

  preferences: {
    targetRole: 'Frontend Developer',
    targetLocations: ['Germany', 'Netherlands', 'Remote'],
    relocationOpen: true,
  },
};