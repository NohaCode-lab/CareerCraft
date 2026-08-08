import time
import uuid
from typing import Dict, Any, List, Optional
from contextlib import contextmanager

class TelemetrySpan:
    def __init__(self, name: str, parent_trace_id: Optional[str] = None, attributes: Optional[Dict[str, Any]] = None):
        self.name = name
        self.trace_id = parent_trace_id or f"trace_{uuid.uuid4().hex[:16]}"
        self.span_id = f"span_{uuid.uuid4().hex[:8]}"
        self.start_time = time.time()
        self.duration_ms = 0.0
        self.attributes = attributes or {}
        self.status = "OK"

    def finish(self, status: str = "OK"):
        self.duration_ms = round((time.time() - self.start_time) * 1000, 2)
        self.status = status

    def to_dict(self) -> Dict[str, Any]:
        return {
            "name": self.name,
            "trace_id": self.trace_id,
            "span_id": self.span_id,
            "duration_ms": self.duration_ms,
            "status": self.status,
            "attributes": self.attributes
        }

class OpenTelemetryTracer:
    def __init__(self):
        self.active_spans: List[Dict[str, Any]] = []

    @contextmanager
    def start_span(self, name: str, traceparent: Optional[str] = None, attributes: Optional[Dict[str, Any]] = None):
        trace_id = None
        if traceparent and traceparent.startswith("00-"):
            parts = traceparent.split("-")
            if len(parts) >= 2:
                trace_id = parts[1]

        span = TelemetrySpan(name, parent_trace_id=trace_id, attributes=attributes)
        try:
            yield span
            span.finish("OK")
        except Exception as exc:
            span.finish(f"ERROR: {str(exc)}")
            raise
        finally:
            self.active_spans.append(span.to_dict())
            if len(self.active_spans) > 100:
                self.active_spans = self.active_spans[-100:]

    def get_recent_spans(self) -> List[Dict[str, Any]]:
        return self.active_spans

otel_tracer = OpenTelemetryTracer()
