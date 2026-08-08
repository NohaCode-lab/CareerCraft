import { describe, it, expect } from 'vitest';
import { evaluationService } from '../../services/evaluationService';

describe('CareerCraft Phase 7 — AI Evaluation Benchmark Suite', () => {
  it('1. Benchmark execution returns 100% Factuality Score and PASS status', async () => {
    const report = await evaluationService.runBenchmark();

    expect(report.benchmarkStatus).toBe('PASS');
    expect(report.averageFactualityScore).toBe(100.0);
    expect(report.averageOverallQualityScore).toBeGreaterThanOrEqual(85.0);
    expect(report.passRatePercentage).toBe(100.0);
  });
});
