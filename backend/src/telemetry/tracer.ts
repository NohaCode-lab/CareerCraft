import { randomBytes } from 'crypto';

export interface Span {
  name: string;
  traceId: string;
  spanId: string;
  durationMs: number;
  status: string;
  attributes: Record<string, unknown>;
}

export class FastifyTracer {
  private activeSpans: Span[] = [];

  public createTraceParent(): { traceparent: string; traceId: string; spanId: string } {
    const traceId = randomBytes(16).toString('hex');
    const spanId = randomBytes(8).toString('hex');
    const traceparent = `00-${traceId}-${spanId}-01`;
    return { traceparent, traceId, spanId };
  }

  public recordSpan(name: string, traceId: string, durationMs: number, status = 'OK', attributes: Record<string, unknown> = {}) {
    const spanId = randomBytes(8).toString('hex');
    const span: Span = {
      name,
      traceId,
      spanId,
      durationMs: Math.round(durationMs * 100) / 100,
      status,
      attributes,
    };
    this.activeSpans.push(span);
    if (this.activeSpans.length > 100) {
      this.activeSpans = this.activeSpans.slice(-100);
    }
    return span;
  }

  public getRecentSpans(): Span[] {
    return this.activeSpans;
  }
}

export const tracer = new FastifyTracer();
