import { ParsedResume } from '../types';

export const SAMPLE_RESUME: ParsedResume = {
  id: 'res_sample_01',
  fileName: 'Alex_Noham_Principal_AI_Architect_Resume.pdf',
  fullName: 'Alex Noham',
  email: 'alex.noham@engineering.io',
  phone: '+1 (555) 234-8900',
  location: 'San Francisco, CA (Hybrid / Remote)',
  targetTitle: 'Principal AI Engineer / Systems Architect',
  summary: 'Senior Full-Stack & AI Infrastructure Engineer with 7+ years of experience engineering high-throughput web applications, stateful multi-agent workflows, and resilient LLM proxies. Expert in React/TypeScript, LangGraph, LiteLLM gateway patterns, Supabase, and cloud/local hybrid AI routing.',
  skills: {
    technical: [
      'TypeScript', 'React 18', 'Vite', 'Node.js', 'Python',
      'LangGraph', 'LiteLLM', 'OpenRouter', 'Ollama',
      'PostgreSQL', 'Supabase RLS', 'Redis', 'Docker Compose',
      'OpenTelemetry', 'Prometheus', 'Grafana', 'Zod Guardrails'
    ],
    soft: [
      'AI System Architecture', 'Production Reliability', 'Cross-functional Leadership', 'Technical Mentorship'
    ],
    tools: [
      'Git', 'GitHub Actions', 'SonarCloud', 'Vitest', 'Playwright', 'Vercel'
    ]
  },
  experience: [
    {
      company: 'Antigravity AI Systems Lab',
      role: 'Senior Staff AI Engineer',
      dates: '2024 - Present',
      bullets: [
        'Architected centralized AI Gateway routing framework supporting hybrid OpenRouter cloud models and local Ollama instances, reducing token latency by 45%.',
        'Built stateful multi-agent pipelines using LangGraph for automated document synthesis, processing over 120,000 requests monthly with 99.95% uptime.',
        'Enforced strict Zod schema output validation and anti-hallucination guardrails, boosting schema pass rates from 84% to 99.4%.'
      ]
    },
    {
      company: 'Enterprise Cloud Technologies',
      role: 'Lead Full-Stack Engineer',
      dates: '2021 - 2024',
      bullets: [
        'Spearheaded modern React 18 micro-frontend design system with custom HSL token aesthetics and dark glassmorphic components.',
        'Designed real-time telemetry streaming pipeline integrating OpenTelemetry, Prometheus, and Grafana to track LLM cost and latency metrics.'
      ]
    }
  ],
  education: [
    {
      degree: 'B.S. Computer Science & Artificial Intelligence',
      institution: 'University of California, Berkeley',
      year: '2021'
    }
  ],
  atsScore: {
    overall: 92,
    formatScore: 96,
    keywordMatchScore: 90,
    brevityScore: 94,
    impactMetricScore: 88,
    criticalIssues: [
      'Quantify quantifiable metrics in bullet 2 of 2021 experience.',
      'Add target keywords: "Distributed Tracing" and "Circuit Breaker Pattern".'
    ]
  }
};

export class ResumeService {
  public getSampleResume(): ParsedResume {
    return SAMPLE_RESUME;
  }

  public analyzeText(rawText: string): ParsedResume {
    // Returns structured parsed resume with updated scoring simulation
    return {
      ...SAMPLE_RESUME,
      fileName: 'User_Uploaded_Resume.pdf',
      summary: rawText.slice(0, 200) + '...',
      atsScore: {
        overall: 88,
        formatScore: 90,
        keywordMatchScore: 86,
        brevityScore: 92,
        impactMetricScore: 84,
        criticalIssues: [
          'Add explicit Cloud AI Gateway keywords.',
          'Format bullet impact statistics consistently.'
        ]
      }
    };
  }
}

export const resumeService = new ResumeService();
