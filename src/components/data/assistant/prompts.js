// ==============================
// AI Assistant Quick Prompts
// ==============================

export const assistantPrompts = [
  {
    id: 'improve-cv',
    title: 'Improve my CV',
    description: 'Get clear suggestions to strengthen your CV content, structure, and ATS compatibility.',
    category: 'cv',
    priority: 'high',
    prompt:
      'Review my CV and suggest improvements for clarity, structure, impact, keyword relevance, and ATS optimization.',
  },
  {
    id: 'job-fit',
    title: 'Find matching roles',
    description: 'Identify roles that match your profile, skills, and career goals.',
    category: 'jobs',
    priority: 'high',
    prompt:
      'Analyze my profile and suggest the most relevant frontend job opportunities based on my skills, experience, and target locations.',
  },
  {
    id: 'interview-help',
    title: 'Prepare interview answers',
    description: 'Practice stronger answers for behavioral, HR, and technical interview questions.',
    category: 'interview',
    priority: 'medium',
    prompt:
      'Help me practice interview questions and improve my answers using clear structure, examples, and the STAR method where appropriate.',
  },
  {
    id: 'cover-letter',
    title: 'Write a cover letter',
    description: 'Generate a tailored cover letter for a specific frontend role.',
    category: 'letters',
    priority: 'high',
    prompt:
      'Create a professional cover letter tailored to a frontend developer position, highlighting relevant skills, projects, and motivation.',
  },
];