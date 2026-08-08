import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)
TOKEN_HEADER = {"X-Internal-Service-Token": "sk-careercraft-internal-token"}

def test_liveness():
    res = client.get("/health")
    assert res.status_code == 200
    assert res.json()["status"] == "ok"

def test_readiness():
    res = client.get("/health/ready")
    assert res.status_code == 200
    assert res.json()["status"] == "ready"

def test_workflow_unauthorized_without_token():
    res = client.post("/workflows/resume/optimize", json={"input_resume": "Resume", "job_description": "Job"})
    assert res.status_code == 401

def test_resume_workflow_success():
    payload = {
        "input_resume": "Senior Frontend Developer with 6 years experience in React, TypeScript, and Node.js.",
        "job_description": "Looking for Senior Frontend Engineer skilled in React, TypeScript, and Fastify."
    }
    res = client.post("/workflows/resume/optimize", json=payload, headers=TOKEN_HEADER)
    assert res.status_code == 200
    data = res.json()
    assert data["success"] is True
    assert data["data"]["ats_score"] >= 40
    assert data["data"]["factuality_passed"] is True
    assert len(data["data"]["optimizations"]) > 0

def test_job_workflow_success():
    payload = {"job_description": "Senior Staff Engineer with React, TypeScript, and LangGraph skills."}
    res = client.post("/workflows/job/analyze", json=payload, headers=TOKEN_HEADER)
    assert res.status_code == 200
    data = res.json()
    assert data["success"] is True
    assert "TypeScript" in data["data"]["required_skills"]

def test_career_workflow_success():
    payload = {"candidate_profile": "Staff Software Engineer", "target_role": "AI Systems Architect"}
    res = client.post("/workflows/career/plan", json=payload, headers=TOKEN_HEADER)
    assert res.status_code == 200
    data = res.json()
    assert data["success"] is True
    assert len(data["data"]["recommended_milestones"]) > 0
