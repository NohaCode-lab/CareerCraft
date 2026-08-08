import { describe, it, expect } from 'vitest';
import { interviewPersistenceService } from '../../services/interviewPersistenceService';

describe('CareerCraft Phase 9 — Session Persistence Suite', () => {
  it('1. Fetches interview session history for active user', async () => {
    const history = await interviewPersistenceService.getHistory('usr_demo_01');
    expect(history.length).toBeGreaterThan(0);
    expect(history[0].userId).toBe('usr_demo_01');
  });
});
