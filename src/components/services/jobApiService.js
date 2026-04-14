
import { mockJobs } from '../data/mockJobs';

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

export const fetchJobs = async (filters = {}) => {
  const { query = '', location = '', remote = false, employmentType = '', seniority = '' } = filters;

  const filteredJobs = mockJobs.filter((job) => {
    const matchesQuery =
      query === '' ||
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase());

    const matchesLocation =
      location === '' || job.location.toLowerCase().includes(location.toLowerCase());

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
  });

  return Promise.resolve(filteredJobs.map(normalizeJob));
};