import mockJobs, { Job } from '../data/jobs/mockJobs';

export interface JobFilters {
  query?: string;
  location?: string;
  remote?: boolean;
  employmentType?: string;
  seniority?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error: string | null;
}

const createSuccessResponse = <T,>(data: T): ApiResponse<T> => ({
  success: true,
  data,
  error: null,
});

const createErrorResponse = <T,>(message: string, fallbackData: T): ApiResponse<T> => ({
  success: false,
  data: fallbackData,
  error: message,
});

const normalizeText = (value: unknown): string => {
  if (typeof value !== 'string') {
    return '';
  }
  return value.trim().toLowerCase();
};

const normalizeJob = (job: Job): Job => ({
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

const matchesFilters = (job: Job, filters: JobFilters): boolean => {
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
  const matchesSeniority = seniority === '' || job.seniority === seniority;

  return (
    matchesQuery &&
    matchesLocation &&
    matchesRemote &&
    matchesEmploymentType &&
    matchesSeniority
  );
};

export const fetchJobs = async (filters: JobFilters = {}): Promise<ApiResponse<Job[]>> => {
  try {
    const filteredJobs = (mockJobs as Job[])
      .filter((job) => matchesFilters(job, filters))
      .map(normalizeJob);

    return createSuccessResponse(filteredJobs);
  } catch (error) {
    return createErrorResponse(
      error instanceof Error ? error.message : 'Failed to fetch jobs.',
      []
    );
  }
};
