from fastapi import FastAPI, Header, HTTPException, Depends, status
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from app.config import settings
from app.workflows.resume_graph import resume_workflow_graph
from app.workflows.job_graph import job_workflow_graph
from app.workflows.career_graph import career_workflow_graph
from app.workflows.interview_graph import interview_workflow_graph
from app.evaluation.llm_judge import llm_judge
from app.telemetry.tracer import otel_tracer

app = FastAPI(
    title="CareerCraft AI Workflow Service",
    description="Python + FastAPI + LangGraph Multi-Agent AI Workflow Microservice",
    version="1.0.0"
)

def verify_internal_token(x_internal_service_token: Optional[str] = Header(None)):
    if settings.INTERNAL_SERVICE_TOKEN and x_internal_service_token != settings.INTERNAL_SERVICE_TOKEN:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing internal service token"
        )
    return x_internal_service_token

class ResumeOptimizeDto(BaseModel):
    input_resume: str = Field(..., min_length=1, max_length=20000)
    job_description: str = Field(..., min_length=1, max_length=20000)

class JobAnalyzeDto(BaseModel):
    job_description: str = Field(..., min_length=1, max_length=20000)

class CareerPlanDto(BaseModel):
    candidate_profile: str = Field(..., min_length=1, max_length=20000)
    target_role: str = Field(..., min_length=1, max_length=500)

class InterviewQuestionsDto(BaseModel):
    resume_text: str = Field(..., min_length=1, max_length=20000)
    job_description: str = Field(..., min_length=1, max_length=20000)
    category: Optional[str] = Field("all", max_length=50)
    question_count: Optional[int] = Field(4, ge=1, le=10)

class InterviewAnswerDto(BaseModel):
    resume_text: str = Field(..., min_length=1, max_length=20000)
    question_text: str = Field(..., min_length=1, max_length=1000)

class InterviewEvaluateDto(BaseModel):
    question_text: str = Field(..., min_length=1, max_length=1000)
    user_answer: str = Field(..., min_length=1, max_length=5000)

@app.get("/health")
def liveness():
    return {"status": "ok", "service": "careercraft-ai-service", "version": "1.0.0"}

@app.get("/health/ready")
def readiness():
    return {
        "status": "ready",
        "service": "careercraft-ai-service",
        "checks": {"api": "healthy", "langgraph": "active", "litellm_gateway": settings.LITELLM_URL}
    }

@app.post("/workflows/resume/optimize", dependencies=[Depends(verify_internal_token)])
async def optimize_resume(dto: ResumeOptimizeDto, x_request_id: Optional[str] = Header(None), traceparent: Optional[str] = Header(None)):
    with otel_tracer.start_span("optimize_resume_workflow", traceparent=traceparent, attributes={"workflow": "resume"}):
        initial_state = {
            "input_resume": dto.input_resume,
            "job_description": dto.job_description,
            "parsed_skills": [],
            "ats_score": 0,
            "optimizations": [],
            "factuality_passed": True,
            "errors": [],
            "request_id": x_request_id or "req_ai_service_01"
        }

        result = await resume_workflow_graph.ainvoke(initial_state)

        if result.get("errors"):
            raise HTTPException(status_code=400, detail={"code": "WORKFLOW_VALIDATION_ERROR", "errors": result["errors"]})

        return {
            "success": True,
            "data": {
                "ats_score": result["ats_score"],
                "parsed_skills": result["parsed_skills"],
                "optimizations": result["optimizations"],
                "factuality_passed": result["factuality_passed"]
            },
            "meta": {"request_id": x_request_id, "workflow": "LangGraph Resume Optimization"}
        }

@app.post("/workflows/job/analyze", dependencies=[Depends(verify_internal_token)])
async def analyze_job(dto: JobAnalyzeDto, x_request_id: Optional[str] = Header(None), traceparent: Optional[str] = Header(None)):
    with otel_tracer.start_span("analyze_job_workflow", traceparent=traceparent, attributes={"workflow": "job"}):
        initial_state = {
            "job_description": dto.job_description,
            "required_skills": [],
            "preferred_skills": [],
            "experience_years": 0,
            "role_category": "",
            "request_id": x_request_id or "req_ai_service_02"
        }

        result = await job_workflow_graph.ainvoke(initial_state)
        return {"success": True, "data": result, "meta": {"request_id": x_request_id, "workflow": "LangGraph Job Analysis"}}

@app.post("/workflows/career/plan", dependencies=[Depends(verify_internal_token)])
async def plan_career(dto: CareerPlanDto, x_request_id: Optional[str] = Header(None), traceparent: Optional[str] = Header(None)):
    with otel_tracer.start_span("plan_career_workflow", traceparent=traceparent, attributes={"workflow": "career"}):
        initial_state = {
            "candidate_profile": dto.candidate_profile,
            "target_role": dto.target_role,
            "skill_gaps": [],
            "recommended_milestones": [],
            "request_id": x_request_id or "req_ai_service_03"
        }

        result = await career_workflow_graph.ainvoke(initial_state)
        return {"success": True, "data": result, "meta": {"request_id": x_request_id, "workflow": "LangGraph Career Plan"}}

@app.post("/workflows/interview/questions", dependencies=[Depends(verify_internal_token)])
async def generate_interview_questions(dto: InterviewQuestionsDto, x_request_id: Optional[str] = Header(None), traceparent: Optional[str] = Header(None)):
    with otel_tracer.start_span("interview_questions_workflow", traceparent=traceparent, attributes={"workflow": "interview_questions"}):
        initial_state = {
            "resume_text": dto.resume_text,
            "job_description": dto.job_description,
            "category": dto.category or "all",
            "question_count": dto.question_count or 4,
            "user_answer": None,
            "question_text": None,
            "questions": [],
            "personalized_answer": None,
            "evaluation": None,
            "readiness_report": None,
            "factuality_passed": True,
            "errors": [],
            "request_id": x_request_id or "req_ai_service_04"
        }

        result = await interview_workflow_graph.ainvoke(initial_state)
        return {"success": True, "data": {"questions": result["questions"]}, "meta": {"request_id": x_request_id, "workflow": "LangGraph Interview Questions"}}

@app.post("/workflows/interview/answer", dependencies=[Depends(verify_internal_token)])
async def generate_interview_answer(dto: InterviewAnswerDto, x_request_id: Optional[str] = Header(None), traceparent: Optional[str] = Header(None)):
    with otel_tracer.start_span("interview_answer_workflow", traceparent=traceparent, attributes={"workflow": "interview_star"}):
        initial_state = {
            "resume_text": dto.resume_text,
            "job_description": "",
            "category": "technical",
            "question_count": 1,
            "user_answer": None,
            "question_text": dto.question_text,
            "questions": [],
            "personalized_answer": None,
            "evaluation": None,
            "readiness_report": None,
            "factuality_passed": True,
            "errors": [],
            "request_id": x_request_id or "req_ai_service_05"
        }

        result = await interview_workflow_graph.ainvoke(initial_state)
        return {"success": True, "data": result.get("personalized_answer"), "meta": {"request_id": x_request_id, "workflow": "LangGraph STAR Answer"}}

@app.post("/workflows/interview/evaluate", dependencies=[Depends(verify_internal_token)])
async def evaluate_interview_answer(dto: InterviewEvaluateDto, x_request_id: Optional[str] = Header(None), traceparent: Optional[str] = Header(None)):
    with otel_tracer.start_span("interview_evaluate_workflow", traceparent=traceparent, attributes={"workflow": "interview_eval"}):
        initial_state = {
            "resume_text": "",
            "job_description": "",
            "category": "technical",
            "question_count": 1,
            "user_answer": dto.user_answer,
            "question_text": dto.question_text,
            "questions": [],
            "personalized_answer": None,
            "evaluation": None,
            "readiness_report": None,
            "factuality_passed": True,
            "errors": [],
            "request_id": x_request_id or "req_ai_service_06"
        }

        result = await interview_workflow_graph.ainvoke(initial_state)
        return {"success": True, "data": result.get("evaluation"), "meta": {"request_id": x_request_id, "workflow": "LangGraph Answer Evaluation"}}

@app.post("/evaluation/benchmark", dependencies=[Depends(verify_internal_token)])
async def run_evaluation_benchmark(x_request_id: Optional[str] = Header(None), traceparent: Optional[str] = Header(None)):
    with otel_tracer.start_span("evaluation_benchmark_workflow", traceparent=traceparent, attributes={"workflow": "benchmark"}):
        report = await llm_judge.run_full_benchmark([])
        return {"success": True, "data": report, "meta": {"request_id": x_request_id, "workflow": "LLM-as-a-Judge Benchmark"}}

@app.get("/telemetry/traces", dependencies=[Depends(verify_internal_token)])
def get_telemetry_traces():
    return {"success": True, "data": {"spans": otel_tracer.get_recent_spans()}}
