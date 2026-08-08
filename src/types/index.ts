// CareerCraft Domain Types & Schemas

export type ProviderType = 'OpenRouter' | 'Ollama' | 'DirectOpenAI';
export type ModelTier = 'High-Reasoning' | 'Fast-Local' | 'Balanced';
export type GuardrailStatus = 'PASSED' | 'FLAGGED' | 'REJECTED';

export interface AIGatewayProviderStatus {
  provider: ProviderType;
  name: string;
  endpoint: string;
  status: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
  latencyMs: number;
  modelsAvailable: string[];
  activeModel: string;
  isLocal: boolean;
  costPer1kTokensUsd: number;
}

export interface TelemetryTrace {
  id: string;
  timestamp: string;
  workflowName: string;
  stepName: string;
  providerUsed: ProviderType;
  modelUsed: string;
  latencyMs: number;
  promptTokens: number;
  completionTokens: number;
  estimatedCostUsd: number;
  fallbackOccurred: boolean;
  guardrailStatus: GuardrailStatus;
}

export interface ParsedResume {
  id: string;
  fileName: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  targetTitle: string;
  summary: string;
  skills: {
    technical: string[];
    soft: string[];
    tools: string[];
  };
  experience: Array<{
    company: string;
    role: string;
    dates: string;
    bullets: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  atsScore: {
    overall: number; // 0-100
    formatScore: number;
    keywordMatchScore: number;
    brevityScore: number;
    impactMetricScore: number;
    criticalIssues: string[];
  };
}

export interface ParsedJobDescription {
  id: string;
  title: string;
  company: string;
  location: string;
  rawText: string;
  seniority: 'Junior' | 'Mid' | 'Senior' | 'Staff / Lead';
  requiredSkills: string[];
  niceToHaveSkills: string[];
  keyResponsibilities: string[];
  technologies: string[];
}

export interface CandidateMatchAnalysis {
  matchId: string;
  overallScore: number; // 0-100
  skillsMatchScore: number;
  experienceMatchScore: number;
  matchedSkills: string[];
  missingCriticalSkills: string[];
  missingNiceToHaveSkills: string[];
  matchExplanation: string;
  tailoredResumeBullets: Array<{
    original: string;
    tailored: string;
    rationale: string;
  }>;
  suggestedCoverLetter: string;
}

export interface CareerRoadmapNode {
  id: string;
  skillName: string;
  category: 'Core Requirement' | 'Competitive Advantage' | 'Emerging Tech';
  priority: 'P0 - Essential' | 'P1 - High' | 'P2 - Optional';
  currentProficiency: number; // 0-100
  targetProficiency: number;  // 0-100
  recommendedAction: string;
  resources: Array<{ title: string; url: string; duration: string }>;
}

export interface MockInterviewQuestion {
  id: string;
  question: string;
  category: 'System Design' | 'Behavioral' | 'Architecture' | 'AI Engineering';
  difficulty: 'Medium' | 'Hard' | 'Staff Level';
  idealAnswerHighlights: string[];
  userAnswer?: string;
  feedback?: {
    score: number;
    strengths: string[];
    improvements: string[];
    suggestedAnswer: string;
  };
}

export interface LangGraphStepState {
  stepId: string;
  nodeName: string;
  status: 'PENDING' | 'EXECUTING' | 'COMPLETED' | 'FAILED';
  inputSnippet: string;
  outputSnippet: string;
  durationMs: number;
}
