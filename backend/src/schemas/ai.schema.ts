import { z } from 'zod';

export const aiMessageSchema = z.object({
  role: z.enum(['system', 'user', 'assistant']),
  content: z.string().min(1, 'Message content cannot be empty').max(15000, 'Message exceeds 15,000 character limit'),
});

export const chatCompletionRequestSchema = z.object({
  task: z.string().min(1, 'Task description is required'),
  modelAlias: z.enum(['career-fast', 'career-reasoning', 'career-private']).optional().default('career-fast'),
  messages: z.array(aiMessageSchema).min(1, 'At least one message is required').max(20, 'Maximum 20 messages per request'),
  temperature: z.number().min(0).max(2).optional().default(0.7),
  maxTokens: z.number().int().min(1).max(4000).optional().default(1000),
  metadata: z.record(z.unknown()).optional(),
});

export const generateInterviewQuestionsSchema = z.object({
  resumeText: z.string().min(1, 'Resume text is required').max(20000),
  jobDescription: z.string().min(1, 'Job description is required').max(20000),
  category: z.enum(['all', 'behavioral', 'technical', 'situational', 'hr', 'company']).optional().default('all'),
  questionCount: z.number().int().min(1).max(10).optional().default(4),
});

export const generatePersonalizedAnswerSchema = z.object({
  resumeText: z.string().min(1, 'Resume text is required').max(20000),
  questionText: z.string().min(1, 'Question text is required').max(1000),
});

export const evaluateInterviewAnswerSchema = z.object({
  questionText: z.string().min(1, 'Question text is required').max(1000),
  userAnswer: z.string().min(1, 'User answer is required').max(5000),
});

export type ChatCompletionRequestDto = z.infer<typeof chatCompletionRequestSchema>;
export type GenerateInterviewQuestionsDto = z.infer<typeof generateInterviewQuestionsSchema>;
export type GeneratePersonalizedAnswerDto = z.infer<typeof generatePersonalizedAnswerSchema>;
export type EvaluateInterviewAnswerDto = z.infer<typeof evaluateInterviewAnswerSchema>;
