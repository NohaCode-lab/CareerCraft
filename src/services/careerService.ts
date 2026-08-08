import { CareerRoadmapNode, MockInterviewQuestion } from '../types';

export const SAMPLE_ROADMAP: CareerRoadmapNode[] = [
  {
    id: 'rd_01',
    skillName: 'AI Gateway Circuit Breakers & Resiliency Patterns',
    category: 'Core Requirement',
    priority: 'P0 - Essential',
    currentProficiency: 82,
    targetProficiency: 98,
    recommendedAction: 'Implement stateful sliding-window rate limiters & failure threshold circuit breakers on LiteLLM proxy.',
    resources: [
      { title: 'Enterprise AI Gateway Resilience Whitepaper', url: '#', duration: '2 hrs' },
      { title: 'LiteLLM Fallback & Circuit Breaker Guide', url: '#', duration: '1.5 hrs' }
    ]
  },
  {
    id: 'rd_02',
    skillName: 'LangGraph Stateful Branching & Subgraphs',
    category: 'Core Requirement',
    priority: 'P0 - Essential',
    currentProficiency: 88,
    targetProficiency: 98,
    recommendedAction: 'Build nested agent subgraphs for parallel evaluation and anti-hallucination validation.',
    resources: [
      { title: 'LangGraph Advanced Multi-Agent Patterns', url: '#', duration: '3 hrs' }
    ]
  },
  {
    id: 'rd_03',
    skillName: 'OpenTelemetry Distributed Tracing for LLM Calls',
    category: 'Competitive Advantage',
    priority: 'P1 - High',
    currentProficiency: 75,
    targetProficiency: 95,
    recommendedAction: 'Connect OpenTelemetry spans across BFF Node services and Python LangGraph runners.',
    resources: [
      { title: 'OTel Instrumentation for GenAI', url: '#', duration: '2 hrs' }
    ]
  }
];

export const SAMPLE_INTERVIEW_QUESTIONS: MockInterviewQuestion[] = [
  {
    id: 'q_101',
    question: 'How do you design a zero-downtime AI Gateway routing policy that falls back from OpenRouter Cloud models to Ollama Local models during a 429 rate limit?',
    category: 'AI Engineering',
    difficulty: 'Staff Level',
    idealAnswerHighlights: [
      'Universal OpenAPI request normalization using LiteLLM model proxies.',
      'Exponential backoff with jitter on 429 and 503 HTTP status codes.',
      'Circuit breaker pattern pausing cloud routing when error rates exceed threshold.',
      'Stateful token budget tracking preventing local model memory overflow.'
    ],
    userAnswer: 'I would use a LiteLLM proxy boundary on the backend that inspects HTTP response status codes. On a 429, it catches the error before reaching the user and retries with exponential backoff. If retries fail, it triggers a fallback policy to route the payload to the local Ollama instance (qwen2.5:7b).',
    feedback: {
      score: 95,
      strengths: [
        'Accurately highlighted HTTP status code inspection and backend proxy isolation.',
        'Correctly identified seamless fallback from OpenRouter to Ollama without client failure.'
      ],
      improvements: [
        'Explicitly mention circuit breakers to avoid overwhelming the cloud endpoint once rate limits clear.',
        'Mention payload state formatting when local model context windows differ from cloud models.'
      ],
      suggestedAnswer: 'A robust design places LiteLLM behind a BFF policy layer. Requests first check tenant quotas. On a 429 rate limit or 5xx outage, the gateway catches the exception, evaluates circuit breaker status, and triggers a fallback node routing to Ollama (e.g. qwen2.5). Token cost and fallback events are emitted to OpenTelemetry for observability.'
    }
  },
  {
    id: 'q_102',
    question: 'Explain how you enforce deterministic JSON schemas and anti-hallucination guardrails on non-deterministic LLM outputs in a LangGraph node.',
    category: 'Architecture',
    difficulty: 'Hard',
    idealAnswerHighlights: [
      'Zod / Pydantic schema validation at the output node boundary.',
      'Retry nodes with error context if JSON parsing fails on first attempt.',
      'Cross-referencing extracted facts against original input resume text.',
      'Deterministic fallback parser if all AI attempts fail.'
    ]
  }
];

export class CareerService {
  public getRoadmap(): CareerRoadmapNode[] {
    return SAMPLE_ROADMAP;
  }

  public getInterviewQuestions(): MockInterviewQuestion[] {
    return SAMPLE_INTERVIEW_QUESTIONS;
  }
}

export const careerService = new CareerService();
