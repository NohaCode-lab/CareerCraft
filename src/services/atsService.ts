export interface CvData {
  summary?: string;
  experience?: Array<{ title?: string; company?: string; description?: string }>;
  education?: Array<{ degree?: string; institution?: string }>;
  skills?: string[];
}

export interface AtsAnalysisResult {
  score: number;
  completedSections: string[];
  missingSections: string[];
  suggestions: string[];
}

const SECTION_WEIGHTS = {
  summary: 0.2,
  experience: 0.35,
  education: 0.2,
  skills: 0.25,
};

const MIN_SUMMARY_LENGTH = 80;
const MIN_SKILLS_COUNT = 5;

const isNonEmptyString = (val: unknown): val is string =>
  typeof val === 'string' && val.trim().length > 0;

const getSummaryScore = (summary?: string): number => {
  if (!isNonEmptyString(summary)) return 0;
  const len = summary.trim().length;
  if (len >= MIN_SUMMARY_LENGTH) return 1;
  return Math.min(len / MIN_SUMMARY_LENGTH, 1);
};

const getArrayScore = (arr?: unknown[], minItems = 1): number => {
  if (!Array.isArray(arr) || arr.length === 0) return 0;
  if (arr.length >= minItems) return 1;
  return arr.length / minItems;
};

const getSkillsScore = (skills?: string[]): number => {
  if (!Array.isArray(skills) || skills.length === 0) return 0;
  if (skills.length >= MIN_SKILLS_COUNT) return 1;
  return skills.length / MIN_SKILLS_COUNT;
};

export const analyzeResume = (cvData: CvData = {}): AtsAnalysisResult => {
  const summaryScore = getSummaryScore(cvData.summary);
  const experienceScore = getArrayScore(cvData.experience, 1);
  const educationScore = getArrayScore(cvData.education, 1);
  const skillsScore = getSkillsScore(cvData.skills);

  const weightedScore =
    summaryScore * SECTION_WEIGHTS.summary +
    experienceScore * SECTION_WEIGHTS.experience +
    educationScore * SECTION_WEIGHTS.education +
    skillsScore * SECTION_WEIGHTS.skills;

  const score = Math.round(weightedScore * 100);

  const completedSections: string[] = [];
  const missingSections: string[] = [];

  if (summaryScore > 0) completedSections.push('summary');
  else missingSections.push('summary');

  if (experienceScore > 0) completedSections.push('experience');
  else missingSections.push('experience');

  if (educationScore > 0) completedSections.push('education');
  else missingSections.push('education');

  if (skillsScore > 0) completedSections.push('skills');
  else missingSections.push('skills');

  const suggestions: string[] = [];

  if (summaryScore < 1) {
    suggestions.push(
      'Write a stronger professional summary with at least 80 characters focusing on your impact.'
    );
  }

  if (experienceScore < 1) {
    suggestions.push(
      'Add at least one experience with clear responsibilities and measurable results.'
    );
  }

  if (educationScore < 1) {
    suggestions.push(
      'Include your educational background with relevant details.'
    );
  }

  if (skillsScore < 1) {
    suggestions.push(
      `Add more skills (aim for at least ${MIN_SKILLS_COUNT}) relevant to your target role.`
    );
  }

  return {
    score,
    completedSections,
    missingSections,
    suggestions,
  };
};

export const calculateCosineSimilarity = (textA = '', textB = ''): number => {
  const tokenize = (text: string): string[] =>
    text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter((w) => w.length > 1);

  const wordsA = tokenize(textA);
  const wordsB = tokenize(textB);

  if (wordsA.length === 0 || wordsB.length === 0) return 0;

  const freqA: Record<string, number> = {};
  const freqB: Record<string, number> = {};
  const vocab = new Set([...wordsA, ...wordsB]);

  wordsA.forEach((w) => (freqA[w] = (freqA[w] || 0) + 1));
  wordsB.forEach((w) => (freqB[w] = (freqB[w] || 0) + 1));

  let dotProduct = 0;
  let magA = 0;
  let magB = 0;

  vocab.forEach((word) => {
    const countA = freqA[word] || 0;
    const countB = freqB[word] || 0;
    dotProduct += countA * countB;
    magA += countA * countA;
    magB += countB * countB;
  });

  if (magA === 0 || magB === 0) return 0;
  return dotProduct / (Math.sqrt(magA) * Math.sqrt(magB));
};
