// src/components/services/atsService.js

const SECTION_WEIGHTS = {
  summary: 0.2,
  experience: 0.35,
  education: 0.2,
  skills: 0.25,
};

const MIN_SUMMARY_LENGTH = 80;
const MIN_SKILLS_COUNT = 5;

const isNonEmptyString = (val) =>
  typeof val === 'string' && val.trim().length > 0;

const getSummaryScore = (summary) => {
  if (!isNonEmptyString(summary)) return 0;
  const len = summary.trim().length;
  if (len >= MIN_SUMMARY_LENGTH) return 1;
  return Math.min(len / MIN_SUMMARY_LENGTH, 1);
};

const getArrayScore = (arr, minItems = 1) => {
  if (!Array.isArray(arr) || arr.length === 0) return 0;
  if (arr.length >= minItems) return 1;
  return arr.length / minItems;
};

const getSkillsScore = (skills) => {
  if (!Array.isArray(skills) || skills.length === 0) return 0;
  if (skills.length >= MIN_SKILLS_COUNT) return 1;
  return skills.length / MIN_SKILLS_COUNT;
};

export const analyzeResume = (cvData = {}) => {
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

  const completedSections = [];
  const missingSections = [];

  if (summaryScore > 0) completedSections.push('summary');
  else missingSections.push('summary');

  if (experienceScore > 0) completedSections.push('experience');
  else missingSections.push('experience');

  if (educationScore > 0) completedSections.push('education');
  else missingSections.push('education');

  if (skillsScore > 0) completedSections.push('skills');
  else missingSections.push('skills');

  const suggestions = [];

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