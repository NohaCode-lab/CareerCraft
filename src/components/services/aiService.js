const DEFAULT_CANDIDATE_NAME = 'Candidate';
const DEFAULT_ROLE_NAME = 'the role';
const DEFAULT_COMPANY_NAME = 'the company';

const DEFAULT_CAREER_SUGGESTIONS = [
  'Update your resume summary to match your target role.',
  'Track follow-up dates after each application.',
  'Highlight measurable impact in project descriptions.',
];

const createSuccessResponse = (data) => ({
  success: true,
  data,
  error: null,
});

const createErrorResponse = (message) => ({
  success: false,
  data: null,
  error: message,
});

const normalizeText = (value, fallback) => {
  if (typeof value !== 'string') {
    return fallback;
  }

  const trimmedValue = value.trim();
  return trimmedValue || fallback;
};

export const generateCoverLetter = async ({
  fullName,
  jobTitle,
  companyName,
} = {}) => {
  try {
    const safeFullName = normalizeText(fullName, DEFAULT_CANDIDATE_NAME);
    const safeJobTitle = normalizeText(jobTitle, DEFAULT_ROLE_NAME);
    const safeCompanyName = normalizeText(companyName, DEFAULT_COMPANY_NAME);

    const coverLetter = `Dear Hiring Team,

I am excited to apply for ${safeJobTitle} at ${safeCompanyName}. My background, problem-solving mindset, and commitment to continuous improvement make me confident in my ability to contribute meaningfully to your team.

I enjoy building clean, user-focused digital experiences and continuously improving my technical and professional skills. I would welcome the opportunity to discuss how I can add value to your organization.

Sincerely,
${safeFullName}`;

    return createSuccessResponse(coverLetter);
  } catch (error) {
    return createErrorResponse(
      error instanceof Error
        ? error.message
        : 'Failed to generate cover letter.'
    );
  }
};

export const getCareerSuggestions = async () => {
  try {
    return createSuccessResponse(DEFAULT_CAREER_SUGGESTIONS);
  } catch (error) {
    return createErrorResponse(
      error instanceof Error
        ? error.message
        : 'Failed to get career suggestions.'
    );
  }
};