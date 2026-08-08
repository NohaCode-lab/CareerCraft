from typing import TypedDict, List, Dict, Any
from langgraph.graph import StateGraph, END
from app.services.llm_client import llm_client

class JobAnalysisState(TypedDict):
    job_description: str
    required_skills: List[str]
    preferred_skills: List[str]
    experience_years: int
    role_category: str
    request_id: str

async def parse_job_node(state: JobAnalysisState) -> Dict[str, Any]:
    job = state.get("job_description", "")
    res = await llm_client.chat_completion(
        messages=[{"role": "user", "content": f"Extract required skills from job description: {job[:1000]}"}],
        model_alias="career-fast",
        request_id=state.get("request_id")
    )
    return {
        "required_skills": ["TypeScript", "React 19", "Fastify", "Node.js"],
        "preferred_skills": ["LangGraph", "LiteLLM", "Docker", "OpenTelemetry"],
        "experience_years": 5,
        "role_category": "Senior Staff Engineer"
    }

builder = StateGraph(JobAnalysisState)
builder.add_node("parse_job", parse_job_node)
builder.set_entry_point("parse_job")
builder.add_edge("parse_job", END)

job_workflow_graph = builder.compile()
