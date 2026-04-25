import { useMemo, useState } from 'react';
import PageHeader from '../layout/PageHeader';
import JobList from '../jobs/JobList';
import JobFilters from '../jobs/JobFilters';
import SavedJobCard from '../jobs/SavedJobCard';
import useJobs from '../../hooks/useJobs';

const initialFilters = {
  search: '',
  country: '',
  seniority: '',
  workMode: '',
  employmentType: '',
  savedOnly: false,
  appliedOnly: false,
};

const JobSearchPage = () => {
  const {
    jobs = [],
    savedJobs = [],
    saveJob,
    unsaveJob,
    applyJob,
    selectJob,
  } = useJobs();

  const [filters, setFilters] = useState(initialFilters);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const searchValue = filters.search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        job.title?.toLowerCase().includes(searchValue) ||
        job.company?.toLowerCase().includes(searchValue) ||
        job.location?.toLowerCase().includes(searchValue);

      const matchesCountry =
        !filters.country || job.country === filters.country;

      const matchesSeniority =
        !filters.seniority || job.seniority === filters.seniority;

      const matchesWorkMode =
        !filters.workMode || job.workMode === filters.workMode;

      const matchesEmploymentType =
        !filters.employmentType ||
        job.employmentType === filters.employmentType;

      const matchesSaved = !filters.savedOnly || job.isSaved;
      const matchesApplied = !filters.appliedOnly || job.isApplied;

      return (
        matchesSearch &&
        matchesCountry &&
        matchesSeniority &&
        matchesWorkMode &&
        matchesEmploymentType &&
        matchesSaved &&
        matchesApplied
      );
    });
  }, [jobs, filters]);

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Job Search"
        description="Search for roles, filter opportunities, and discover jobs that match your goals."
      />

      <div className="grid gap-6 xl:grid-cols-12">
        <section className="space-y-4 xl:col-span-3" aria-label="Job filters">
          <JobFilters
            filters={filters}
            onChange={setFilters}
            onReset={resetFilters}
          />
        </section>

        <section className="space-y-4 xl:col-span-6" aria-label="Available jobs">
          <JobList
            jobs={filteredJobs}
            onSave={saveJob}
            onApply={applyJob}
            onSelect={selectJob}
          />
        </section>

        <section className="space-y-4 xl:col-span-3" aria-label="Saved jobs">
          <div>
            <h2 className="text-lg font-semibold text-white">Saved Jobs</h2>
            <p className="mt-1 text-sm text-slate-400">
              Quickly access jobs you saved earlier.
            </p>
          </div>

          <div className="space-y-3">
            {savedJobs.length > 0 ? (
              savedJobs.map((job) => (
                <SavedJobCard
                  key={job.id}
                  job={job}
                  onUnsave={unsaveJob}
                  onApply={applyJob}
                  onSelect={selectJob}
                />
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 bg-slate-800/40 p-4 text-sm text-slate-400">
                No saved jobs yet.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default JobSearchPage;