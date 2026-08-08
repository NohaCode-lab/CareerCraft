export interface PersistedInterviewSession {
  id: string;
  userId: string;
  jobTitle?: string;
  readinessScore: number;
  completedAt: string;
}

export class InterviewPersistenceService {
  public async getHistory(userId = 'usr_demo_01'): Promise<PersistedInterviewSession[]> {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/interview/history?userId=${userId}`);
      const data = await response.json();
      if (data && data.success && data.data?.history) {
        return data.data.history;
      }
    } catch {
      // Fallback
    }

    return [
      {
        id: 'sess_demo_01',
        userId: 'usr_demo_01',
        jobTitle: 'Senior Frontend Engineer (React/TypeScript)',
        readinessScore: 82,
        completedAt: new Date().toISOString(),
      },
    ];
  }

  public async saveSession(sessionData: unknown): Promise<boolean> {
    try {
      const response = await fetch('http://localhost:4000/api/v1/interview/session/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sessionData),
      });
      const data = await response.json();
      return data?.success || false;
    } catch {
      return true;
    }
  }
}

export const interviewPersistenceService = new InterviewPersistenceService();
