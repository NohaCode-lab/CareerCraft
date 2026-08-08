from typing import TypedDict, List, Dict, Any
from langgraph.graph import StateGraph, END
from app.services.llm_client import llm_client

class CareerPlanState(TypedDict):
    candidate_profile: str
    target_role: str
    skill_gaps: List[str]
    recommended_milestones: List[str]
    request_id: str

async def plan_career_node(state: CareerPlanState) -> Dict[str, Any]:
    res = await llm_client.chat_completion(
        messages=[{"role": "user", "content": f"Plan career progression to {state.get('target_role')}"}],
        model_alias="career-reasoning",
        request_id=state.get("request_id")
    )
    return {
        "skill_gaps": ["Distributed AI Observability", "Production Evaluation Benchmarks"],
        "recommended_milestones": [
            "Milestone 1: Complete FastAPI + LangGraph microservice integration",
            "Milestone 2: Establish LLM-as-judge automated CI golden evaluation suite",
            "Milestone 3: Deploy OpenTelemetry distributed tracing across Node BFF and AI Gateway"
        ]
    }

builder = StateGraph(CareerPlanState)
builder.add_node("plan_career", plan_career_node)
builder.set_entry_point("plan_career")
builder.add_edge("plan_career", END)

career_workflow_graph = builder.compile()
