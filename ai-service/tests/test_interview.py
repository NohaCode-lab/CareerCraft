import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.config import settings

client = TestClient(app)

HEADERS = {"X-Internal-Service-Token": settings.INTERNAL_SERVICE_TOKEN or "careercraft_internal_secret_token_2026"}

def test_generate_interview_questions_success():
    payload = {
        "resume_text": "Senior Frontend Developer with 4 years React, TypeScript, Fastify and Node.js experience.",
        "job_description": "We are seeking a Lead Frontend Engineer to build robust React/TypeScript applications with Node.js Fastify backend APIs.",
        "category": "technical",
        "question_count": 3
    }
    response = client.post("/workflows/interview/questions", json=payload, headers=HEADERS)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "questions" in data["data"]
    assert len(data["data"]["questions"]) >= 1
    assert data["data"]["questions"][0]["category"] in ["technical", "behavioral", "situational", "hr"]

def test_generate_star_answer_success():
    payload = {
        "resume_text": "Experienced fullstack developer with React and Fastify BFF experience.",
        "question_text": "How do you optimize slow API calls?"
    }
    response = client.post("/workflows/interview/answer", json=payload, headers=HEADERS)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["framework"] == "STAR"
    assert "situation" in data["data"]
    assert "action" in data["data"]

def test_evaluate_interview_answer_success():
    payload = {
        "question_text": "How do you handle API performance issues?",
        "user_answer": "I profile endpoint latency using Pino logs, optimize database queries, implement Fastify rate limiting, and cache responses."
    }
    response = client.post("/workflows/interview/evaluate", json=payload, headers=HEADERS)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "overallScore" in data["data"]
    assert data["data"]["overallScore"] >= 50
