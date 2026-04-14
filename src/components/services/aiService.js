
export const generateCoverLetter = async ({ fullName, jobTitle, companyName }) => {
  const safeFullName = fullName || 'Candidate';
  const safeJobTitle = jobTitle || 'the role';
  const safeCompanyName = companyName || 'the company';

  return Promise.resolve(
    `Dear Hiring Team,

I am excited to apply for ${safeJobTitle} at ${safeCompanyName}. My background, problem-solving mindset, and commitment to continuous improvement make me confident in my ability to contribute meaningfully to your team.

I enjoy building clean, user-focused digital experiences and continuously improving my technical and professional skills. I would welcome the opportunity to discuss how I can add value to your organization.

Sincerely,
${safeFullName}`
  );
};

export const getCareerSuggestions = async () => {
  return Promise.resolve([
    'Update your resume summary to match your target role.',
    'Track follow-up dates after each application.',
    'Highlight measurable impact in project descriptions.',
  ]);
};