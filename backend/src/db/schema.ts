export interface DbUser {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface DbResume {
  id: string;
  userId: string;
  rawText: string;
  parsedSkills: string[];
  atsScore: number;
  createdAt: string;
}

export interface DbJob {
  id: string;
  userId: string;
  title: string;
  company: string;
  location: string;
  description: string;
  status: 'saved' | 'applied' | 'interviewing' | 'rejected' | 'offered';
  createdAt: string;
}

export interface DbInterviewSession {
  id: string;
  userId: string;
  jobId?: string;
  jobTitle?: string;
  readinessScore: number;
  completedAt: string;
}

export interface DbInterviewQuestion {
  id: string;
  sessionId: string;
  category: 'technical' | 'behavioral' | 'situational' | 'hr' | 'company';
  difficulty: 'easy' | 'medium' | 'hard';
  questionText: string;
  reason: string;
}

export interface DbInterviewAnswer {
  id: string;
  questionId: string;
  userAnswer: string;
  starSituation?: string;
  starTask?: string;
  starAction?: string;
  starResult?: string;
  answerText?: string;
}

export interface DbInterviewEvaluation {
  id: string;
  answerId: string;
  overallScore: number;
  relevance: number;
  clarity: number;
  structure: number;
  technicalAccuracy: number;
  jobAlignment: number;
  feedback: string[];
  improvements: string[];
}
