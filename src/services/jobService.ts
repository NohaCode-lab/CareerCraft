import { ParsedJobDescription, CandidateMatchAnalysis } from '../types';

export const SAMPLE_JOB: ParsedJobDescription = {
  id: 'job_sample_01',
  title: 'Principal AI Infrastructure & Systems Engineer',
  company: 'ScaleAI Tech Labs',
  location: 'San Francisco, CA (Remote Allowed)',
  rawText: `We are looking for a Principal AI Infrastructure Engineer to lead the architecture of our next-generation AI Gateway and multi-agent workflow platform. 

Key Responsibilities:
- Design and deploy production-grade LLM proxies with fallback routing (OpenRouter, Ollama, Anthropic).
- Architect stateful multi-agent workflows using LangGraph and Python/TypeScript.
- Establish AI Observability, tracking OpenTelemetry traces, token budgets, and cost metrics.
- Implement strict Guardrails for prompt injection prevention and Zod/Pydantic output schema validation.

Requirements:
- 5+ years experience in Full-Stack AI & Infrastructure Development (React, TypeScript, Node.js, Python).
- Deep expertise in LLM Orchestration, LangGraph, and LiteLLM gateway patterns.
- Strong knowledge of PostgreSQL, Supabase RLS, Docker, Redis, and CI/CD pipelines.
- Experience with OpenTelemetry, Prometheus, and Grafana monitoring.`,
  seniority: 'Staff / Lead',
  requiredSkills: [
    'TypeScript', 'React 18', 'AI Gateway Architecture', 'LiteLLM',
    'LangGraph', 'Python', 'OpenTelemetry', 'Zod Guardrails', 'PostgreSQL'
  ],
  niceToHaveSkills: [
    'Ollama Local Models', 'Prometheus & Grafana', 'Docker Compose', 'Redis'
  ],
  keyResponsibilities: [
    'Architect centralized AI Gateway proxy policies.',
    'Build stateful LangGraph workflows.',
    'Set up OpenTelemetry & LLM cost tracking dashboards.'
  ],
  technologies: [
    'React', 'Vite', 'TypeScript', 'LangGraph', 'LiteLLM', 'OpenRouter', 'Ollama', 'Docker'
  ]
};

export class JobService {
  public getSampleJob(): ParsedJobDescription {
    return SAMPLE_JOB;
  }

  public analyzeMatch(resumeSkills: string[], job: ParsedJobDescription): CandidateMatchAnalysis {
    const matched = job.requiredSkills.filter(s => resumeSkills.some(rs => rs.toLowerCase().includes(s.toLowerCase())));
    const missing = job.requiredSkills.filter(s => !resumeSkills.some(rs => rs.toLowerCase().includes(s.toLowerCase())));

    return {
      matchId: 'mtch_901',
      overallScore: 94,
      skillsMatchScore: 92,
      experienceMatchScore: 96,
      matchedSkills: matched,
      missingCriticalSkills: missing.length > 0 ? missing : ['Distributed Tracing Circuit Breakers'],
      missingNiceToHaveSkills: ['Redis Task Queues'],
      matchExplanation: 'Extremely strong candidate match (94%). High alignment in React/TypeScript, AI Gateway architectures, LiteLLM model routing, and LangGraph workflow orchestration.',
      tailoredResumeBullets: [
        {
          original: 'Built stateful multi-agent pipelines using LangGraph for automated document synthesis.',
          tailored: 'Architected stateful LangGraph multi-agent graphs with typed state boundaries and Zod validation, scaling execution throughput by 3x.',
          rationale: 'Emphasizes typing boundaries and Zod schema enforcement specified in ScaleAI Job Description.'
        },
        {
          original: 'Architected centralized AI Gateway routing framework supporting hybrid OpenRouter cloud models.',
          tailored: 'Engineered production AI Gateway routing policy layer using LiteLLM & OmniRoute patterns, achieving zero-downtime provider fallback.',
          rationale: 'Directly aligns with target responsibility: "Design and deploy production-grade LLM proxies".'
        }
      ],
      suggestedCoverLetter: `Dear Hiring Team at ScaleAI Tech Labs,\n\nI am writing to express my strong interest in the Principal AI Infrastructure & Systems Engineer position. With extensive experience architecting stateful multi-agent workflows using LangGraph, building zero-trust AI Gateway routing proxies with LiteLLM, and establishing comprehensive OpenTelemetry metrics, I am eager to contribute to your platform's reliability and AI infrastructure.`
    };
  }
}

export const jobService = new JobService();
