import { describe, it, expect } from 'vitest';
import { interviewService } from '../../services/interviewService';

describe('CareerCraft AI Interview Service & Readiness Calculations', () => {
  it('1. Calculates readiness score correctly based on completions and average scores', () => {
    const readiness = interviewService.calculateReadinessScore(5, 80, 1);

    expect(readiness.overallReadiness).toBeGreaterThanOrEqual(60);
    expect(readiness.overallReadiness).toBeLessThanOrEqual(100);
    expect(readiness.technicalScore).toBeGreaterThan(0);
    expect(readiness.jobAlignmentScore).toBeGreaterThan(0);
  });

  it('2. Fallback questions structure returns valid categories', async () => {
    const questions = await interviewService.getQuestions('Sample resume', 'Sample job', 'technical', 2);

    expect(questions.length).toBeGreaterThan(0);
    expect(questions[0].category).toBeDefined();
    expect(questions[0].question).toBeDefined();
  });

  it('3. Personalized STAR answer returns situation, task, action, result framework', async () => {
    const starAnswer = await interviewService.getPersonalizedAnswer('Resume text', 'How do you handle API performance?');

    expect(starAnswer.framework).toBe('STAR');
    expect(starAnswer.situation).toBeDefined();
    expect(starAnswer.task).toBeDefined();
    expect(starAnswer.action).toBeDefined();
    expect(starAnswer.result).toBeDefined();
  });

  it('4. Answer evaluation returns coaching scores and improvement suggestions', async () => {
    const evaluation = await interviewService.evaluateAnswer('How do you test code?', 'I write Vitest and Pytest integration tests.');

    expect(evaluation.overallScore).toBeGreaterThan(50);
    expect(evaluation.feedback.length).toBeGreaterThan(0);
    expect(evaluation.improvements.length).toBeGreaterThan(0);
  });
});
