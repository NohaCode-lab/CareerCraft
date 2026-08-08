import { DbInterviewSession, DbInterviewQuestion, DbInterviewAnswer, DbInterviewEvaluation } from '../db/schema.js';

export interface FullInterviewSessionData {
  session: DbInterviewSession;
  questions: DbInterviewQuestion[];
  answers: DbInterviewAnswer[];
  evaluations: DbInterviewEvaluation[];
}

export class InterviewRepository {
  private sessions: Map<string, DbInterviewSession> = new Map();
  private questions: Map<string, DbInterviewQuestion[]> = new Map();
  private answers: Map<string, DbInterviewAnswer[]> = new Map();
  private evaluations: Map<string, DbInterviewEvaluation[]> = new Map();

  constructor() {
    // Seed initial mock session for demo candidate
    const defaultSessionId = 'sess_demo_01';
    const defaultUserId = 'usr_demo_01';

    this.sessions.set(defaultSessionId, {
      id: defaultSessionId,
      userId: defaultUserId,
      jobTitle: 'Senior Frontend Engineer (React/TypeScript)',
      readinessScore: 82,
      completedAt: new Date().toISOString(),
    });

    this.questions.set(defaultSessionId, [
      {
        id: 'q_demo_01',
        sessionId: defaultSessionId,
        category: 'technical',
        difficulty: 'medium',
        questionText: 'How do you prevent unnecessary re-renders in React 19?',
        reason: 'Directly matches target job requirements.',
      },
    ]);

    this.answers.set(defaultSessionId, [
      {
        id: 'ans_demo_01',
        questionId: 'q_demo_01',
        userAnswer: 'I profile component renders, memoize expensive calculations with useMemo, and split component trees.',
        starSituation: 'Web app had latency issues during rapid state updates.',
        starTask: 'Optimize component rendering pipeline.',
        starAction: 'Refactored context state and code-split heavy chunks.',
        starResult: 'Reduced render cycle time by 45%.',
      },
    ]);

    this.evaluations.set('ans_demo_01', [
      {
        id: 'eval_demo_01',
        answerId: 'ans_demo_01',
        overallScore: 85,
        relevance: 88,
        clarity: 82,
        structure: 86,
        technicalAccuracy: 85,
        jobAlignment: 89,
        feedback: ['Strong technical structure.'],
        improvements: ['Include quantifiable metrics.'],
      },
    ]);
  }

  public async saveSession(data: FullInterviewSessionData): Promise<DbInterviewSession> {
    this.sessions.set(data.session.id, data.session);
    this.questions.set(data.session.id, data.questions);
    this.answers.set(data.session.id, data.answers);

    for (const evalItem of data.evaluations) {
      const existing = this.evaluations.get(evalItem.answerId) || [];
      existing.push(evalItem);
      this.evaluations.set(evalItem.answerId, existing);
    }

    return data.session;
  }

  public async getSessionById(sessionId: string): Promise<FullInterviewSessionData | null> {
    const session = this.sessions.get(sessionId);
    if (!session) return null;

    return {
      session,
      questions: this.questions.get(sessionId) || [],
      answers: this.answers.get(sessionId) || [],
      evaluations: Array.from(this.evaluations.values()).flat(),
    };
  }

  public async getUserInterviewHistory(userId: string): Promise<DbInterviewSession[]> {
    const userSessions: DbInterviewSession[] = [];
    for (const session of this.sessions.values()) {
      if (session.userId === userId) {
        userSessions.push(session);
      }
    }
    return userSessions;
  }
}

export const interviewRepository = new InterviewRepository();
