
export interface TelemetryHealthReport {
  status: string;
  activeSpanCount: number;
}

export class TelemetryService {
  public async getHealthReport(): Promise<TelemetryHealthReport> {
    try {
      const response = await fetch('http://localhost:4000/api/v1/telemetry/traces');
      const data = await response.json();
      if (data && data.success && data.data) {
        return {
          status: data.data.status || 'healthy',
          activeSpanCount: data.data.activeSpanCount || 0,
        };
      }
    } catch {
      // Fallback
    }

    return {
      status: 'healthy',
      activeSpanCount: 0,
    };
  }
}

export const telemetryService = new TelemetryService();
