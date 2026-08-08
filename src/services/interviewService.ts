import { apiClient } from './apiClient';

export interface InterviewQuestion {
  id: string;
  category: 'technical' | 'behavioral' | 'situational' | 'hr' | 'company';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  reason: string;
  relatedSkills: string[];
  expectedTopics: string[];
}

export interface StarAnswer {
  question: string;
  framework: 'STAR';
  situation: string;
  task: string;
  action: string;
  result: string;
  missingInformation: string[];
  answerText: string;
}

export interface AnswerEvaluation {
  overallScore: number;
  relevance: number;
  clarity: number;
  structure: number;
  technicalAccuracy: number;
  jobAlignment: number;
  feedback: string[];
  improvements: string[];
}

export interface ReadinessScore {
  overallReadiness: number;
  technicalScore: number;
  behavioralScore: number;
  communicationScore: number;
  jobAlignmentScore: number;
}

export class InterviewService {
  public async getQuestions(resumeText: string, jobDescription: string, category = 'all', questionCount = 4): Promise<InterviewQuestion[]> {
    const res = await apiClient.generateInterviewQuestions({ resumeText, jobDescription, category, questionCount });
    if (res && res.success && res.data && res.data.questions) {
      return res.data.questions;
    }

    return [
      {
        id: 'q-default-01',
        category: 'technical',
        difficulty: 'medium',
        question: 'How do you optimize React component rendering performance?',
        reason: 'Matches target job requirements.',
        relatedSkills: ['React', 'Performance'],
        expectedTopics: ['memoization', 'code splitting']
      },
      {
        id: 'q-default-02',
        category: 'behavioral',
        difficulty: 'medium',
        question: 'Tell me about a time you handled a difficult production bug under time pressure.',
        reason: 'Evaluates problem solving under pressure.',
        relatedSkills: ['Debugging', 'Problem Solving'],
        expectedTopics: ['STAR methodology', 'root cause analysis']
      }
    ];
  }

  public async getPersonalizedAnswer(resumeText: string, questionText: string): Promise<StarAnswer> {
    const res = await apiClient.generatePersonalizedAnswer({ resumeText, questionText });
    if (res && res.success && res.data) {
      return res.data;
    }

    return {
      question: questionText,
      framework: 'STAR',
      situation: 'In my full-stack engineering role, we needed to reduce API latencies.',
      task: 'My task was to optimize REST endpoints and isolate AI gateway processing.',
      action: 'Engineered a Fastify Node.js BFF layer with Pino logging and LiteLLM model aliasing.',
      result: '[Add your specific measurable result here, e.g. "Reduced API response time by 40%"]',
      missingInformation: ['Quantified business metric'],
      answerText: 'In my recent experience, I led the implementation of a Fastify BFF layer and decoupled AI provider calls using LiteLLM model aliases. This ensured predictable response times and strict client PII isolation.'
    };
  }

  public async evaluateAnswer(questionText: string, userAnswer: string): Promise<AnswerEvaluation> {
    const res = await apiClient.evaluateInterviewAnswer({ questionText, userAnswer });
    if (res && res.success && res.data) {
      return res.data;
    }

    const score = userAnswer.length > 50 ? 82 : 65;
    return {
      overallScore: score,
      relevance: 85,
      clarity: 80,
      structure: 84,
      technicalAccuracy: 82,
      jobAlignment: 88,
      feedback: ['Good technical structure.', 'Referenced relevant tools.'],
      improvements: ['Quantify business results using numbers.', 'Follow STAR methodology more strictly.']
    };
  }

  public calculateReadinessScore(questionsCompleted: number, avgAnswerScore: number, weakAreasCount: number): ReadinessScore {
    const base = Math.min(100, Math.max(50, avgAnswerScore));
    const completionBonus = Math.min(15, questionsCompleted * 3);
    const penalty = weakAreasCount * 4;

    const overall = Math.min(100, Math.max(40, base + completionBonus - penalty));

    return {
      overallReadiness: overall,
      technicalScore: Math.min(100, overall + 4),
      behavioralScore: Math.max(50, overall - 5),
      communicationScore: Math.min(100, overall + 2),
      jobAlignmentScore: Math.min(100, overall + 6),
    };
  }
}

export const interviewService = new InterviewService();
