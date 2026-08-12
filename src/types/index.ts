// CareerCraft Domain Types & Schemas

export type ProviderType = 'OpenRouter' | 'Ollama' | 'DirectOpenAI';
export type ModelTier = 'High-Reasoning' | 'Fast-Local' | 'Balanced';
export type GuardrailStatus = 'PASSED' | 'FLAGGED' | 'REJECTED';

export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
}

export interface Job {
  id: string | number;
  title: string;
  company: string;
  location?: string;
  country?: string;
  remote?: boolean;
  workMode?: string;
  employmentType?: string;
  seniority?: string;
  salaryRange?: SalaryRange | string;
  skills?: string[];
  matchScore?: number;
  visaSponsorship?: boolean;
  featured?: boolean;
  postedAt?: string;
  postedBy?: string;
  applyUrl?: string;
  source?: string;
  sourceName?: string;
  description?: string;
  requirements?: string[];
  isSaved?: boolean;
  isApplied?: boolean;
}

export interface Application {
  id: string | number;
  jobId?: string | number;
  title: string;
  company: string;
  status: string;
  createdAt?: string;
  appliedAt?: string;
  date?: string;
  role?: string;
  location?: string;
  notes?: string;
  salary?: string;
}

export interface CVExperience {
  id?: string;
  company: string;
  role: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  duration?: string;
  year?: string;
  description?: string;
  bullets?: string[];
}

export interface CVEducation {
  id?: string;
  institution: string;
  degree: string;
  field?: string;
  year?: string;
  startDate?: string;
  endDate?: string;
  grade?: string;
  details?: string;
}

export interface CVProject {
  id?: string;
  name: string;
  role?: string;
  description?: string;
  bullets?: string[];
  technologies?: string[];
  link?: string;
  github?: string;
}

export interface CVLanguage {
  id?: string;
  language: string;
  proficiency: string;
}

export interface CVCertification {
  id?: string;
  name: string;
  issuer: string;
  date?: string;
  link?: string;
}

export interface CVData {
  fullName?: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  title?: string;
  summary?: string;
  skills?: string[] | string;
  experience?: CVExperience[];
  education?: CVEducation[];
  projects?: CVProject[];
  languages?: CVLanguage[];
  certifications?: CVCertification[];
}

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
