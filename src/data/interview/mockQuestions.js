// ==============================
// Interview Questions
// ==============================

export const mockQuestions = [
  {
    id: 'mq-1',
    category: 'technical',
    topic: 'React',
    difficulty: 'easy',
    question: 'What is React and why is it used?',
    answer:
      'React is a JavaScript library for building user interfaces. It allows developers to create reusable components and efficiently update the UI using a virtual DOM.',
    tips: [
      'Mention components',
      'Mention reusability',
      'Mention virtual DOM briefly',
    ],
  },
  {
    id: 'mq-2',
    category: 'technical',
    topic: 'JavaScript',
    difficulty: 'medium',
    question: 'What is the difference between var, let, and const?',
    answer:
      'var is function-scoped and can be redeclared. let is block-scoped and can be reassigned. const is block-scoped and cannot be reassigned after declaration.',
    tips: [
      'Focus on scope',
      'Mention reassignment',
      'Avoid overcomplicating the explanation',
    ],
  },
  {
    id: 'mq-3',
    category: 'technical',
    topic: 'CSS',
    difficulty: 'easy',
    question: 'What is the difference between Flexbox and Grid?',
    answer:
      'Flexbox is mainly for one-dimensional layouts, while Grid is designed for two-dimensional layouts with rows and columns.',
    tips: [
      'Say one-dimensional vs two-dimensional',
      'Give a simple layout example',
    ],
  },
  {
    id: 'mq-4',
    category: 'behavioral',
    topic: 'General',
    difficulty: 'medium',
    question: 'Tell me about yourself.',
    answer:
      'I am a motivated frontend developer with a strong interest in building responsive and user-friendly web applications. I enjoy learning modern technologies and improving both design and functionality.',
    tips: [
      'Keep it concise',
      'Focus on career direction',
      'End with what you are looking for',
    ],
  },
];