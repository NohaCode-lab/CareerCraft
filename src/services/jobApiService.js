import { mockJobs } from "../components/data/jobs/mockJobs";
const createSuccessResponse = (data) => ({
  success: true,
  data,
  error: null,
});

const createErrorResponse = (message) => ({
  success: false,
  data: [],
  error: message,
});

const normalizeText = (value) => {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim().toLowerCase();
};

const normalizeJob = (job) => ({
  id: job.id,
  title: job.title,
  company: job.company,
  location: job.location,
  remote: job.remote,
  employmentType: job.employmentType,
  seniority: job.seniority,
  salaryRange: job.salaryRange,
  description: job.description,
  postedAt: job.postedAt,
  applyUrl: job.applyUrl,
});

const matchesFilters = (job, filters) => {
  const {
    query = '',
    location = '',
    remote = false,
    employmentType = '',
    seniority = '',
  } = filters;

  const normalizedQuery = normalizeText(query);
  const normalizedLocation = normalizeText(location);

  const matchesQuery =
    normalizedQuery === '' ||
    normalizeText(job.title).includes(normalizedQuery) ||
    normalizeText(job.company).includes(normalizedQuery);

  const matchesLocation =
    normalizedLocation === '' ||
    normalizeText(job.location).includes(normalizedLocation);

  const matchesRemote = !remote || job.remote === true;
  const matchesEmploymentType =
    employmentType === '' || job.employmentType === employmentType;
  const matchesSeniority =
    seniority === '' || job.seniority === seniority;

  return (
    matchesQuery &&
    matchesLocation &&
    matchesRemote &&
    matchesEmploymentType &&
    matchesSeniority
  );
};

export const fetchJobs = async (filters = {}) => {
  try {
    const filteredJobs = mockJobs
      .filter((job) => matchesFilters(job, filters))
      .map(normalizeJob);

    return createSuccessResponse(filteredJobs);
  } catch (error) {
    return createErrorResponse(
      error instanceof Error
        ? error.message
        : 'Failed to fetch jobs.'
    );
  }
};