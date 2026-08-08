import { tracer, Span } from '../telemetry/tracer.js';

export interface TelemetryReport {
  status: string;
  activeSpanCount: number;
  recentSpans: Span[];
}

export class TelemetryService {
  public getTelemetryReport(): TelemetryReport {
    const spans = tracer.getRecentSpans();
    return {
      status: 'healthy',
      activeSpanCount: spans.length,
      recentSpans: spans,
    };
  }
}

export const telemetryService = new TelemetryService();
