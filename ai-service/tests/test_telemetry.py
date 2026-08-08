import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.config import settings
from app.telemetry.tracer import otel_tracer

client = TestClient(app)
HEADERS = {"X-Internal-Service-Token": settings.INTERNAL_SERVICE_TOKEN or "careercraft_internal_secret_token_2026"}

def test_opentelemetry_span_generation():
    with otel_tracer.start_span("test_workflow_span", traceparent="00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01", attributes={"workflow": "test"}) as span:
        assert span.trace_id == "4bf92f3577b34da6a3ce929d0e0e4736"

    recent = otel_tracer.get_recent_spans()
    assert len(recent) > 0
    assert recent[-1]["name"] == "test_workflow_span"
    assert recent[-1]["trace_id"] == "4bf92f3577b34da6a3ce929d0e0e4736"

def test_telemetry_traces_endpoint():
    response = client.get("/telemetry/traces", headers=HEADERS)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "spans" in data["data"]
