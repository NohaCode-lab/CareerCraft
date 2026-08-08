import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.config import settings
from app.evaluation.llm_judge import llm_judge

client = TestClient(app)
HEADERS = {"X-Internal-Service-Token": settings.INTERNAL_SERVICE_TOKEN or "careercraft_internal_secret_token_2026"}

@pytest.mark.asyncio
async def test_llm_judge_golden_dataset_evaluation():
    samples = llm_judge.load_golden_dataset()
    assert len(samples) >= 4, "Golden benchmark dataset should contain reference samples."

    mock_ai_outputs = [
        {
            "parsed_skills": ["React 19", "TypeScript", "Vite", "REST APIs"],
            "ats_score": 85,
            "optimizations": ["Engineered React web apps."],
            "factuality_passed": True
        },
        {
            "parsed_skills": ["Fastify", "Node.js", "Zod", "Pino"],
            "ats_score": 88,
            "optimizations": ["Built Fastify Node.js microservices."],
            "factuality_passed": True
        },
        {
            "parsed_skills": ["Python", "FastAPI", "Pydantic", "LangGraph"],
            "ats_score": 90,
            "optimizations": ["Architected stateful LangGraph workflows."],
            "factuality_passed": True
        },
        {
            "parsed_skills": ["Web Development"],
            "ats_score": 45,
            "optimizations": ["Assisted with web development."],
            "factuality_passed": True
        }
    ]

    report = await llm_judge.run_full_benchmark(mock_ai_outputs)

    assert report["benchmark_status"] == "PASS"
    assert report["average_factuality_score"] == 100.0
    assert report["average_overall_quality_score"] >= 85.0
    assert report["pass_rate_percentage"] == 100.0

def test_evaluation_benchmark_endpoint():
    response = client.post("/evaluation/benchmark", headers=HEADERS)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["benchmark_status"] == "PASS"
    assert data["data"]["average_factuality_score"] == 100.0
