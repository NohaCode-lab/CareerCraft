import { describe, it, expect } from 'vitest';
import { telemetryService } from '../../services/telemetryService';

describe('CareerCraft Phase 8 — OpenTelemetry Tracing Suite', () => {
  it('1. Telemetry health report returns healthy status', async () => {
    const report = await telemetryService.getHealthReport();
    expect(report.status).toBe('healthy');
    expect(report.activeSpanCount).toBeGreaterThanOrEqual(0);
  });
});
