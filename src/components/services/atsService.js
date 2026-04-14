
const REQUIRED_SECTIONS = ['summary', 'experience', 'education', 'skills'];

export const analyzeResume = (cvData = {}) => {
  const completedSections = REQUIRED_SECTIONS.filter((section) => {
    const value = cvData[section];

    if (Array.isArray(value)) {
      return value.length > 0;
    }

    return Boolean(value);
  });

  const score = Math.round((completedSections.length / REQUIRED_SECTIONS.length) * 100);

  const missingSections = REQUIRED_SECTIONS.filter(
    (section) => !completedSections.includes(section)
  );

  return {
    score,
    completedSections,
    missingSections,
    suggestions: missingSections.map(
      (section) => `Add or improve your ${section} section for a stronger ATS score.`
    ),
  };
};