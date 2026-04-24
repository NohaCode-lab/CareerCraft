import PageHeader from '../layout/PageHeader';
import JobList from '../jobs/JobList';
import JobFilters from '../jobs/JobFilters';
import SavedJobCard from '../jobs/SavedJobCard';
import useJobs from '../../hooks/useJobs';

const JobSearchPage = () => {
  const { jobs = [], savedJobs = [] } = useJobs();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Job Search"
        description="Search for roles, filter opportunities, and discover jobs that match your goals."
      />

      <div className="grid gap-6 xl:grid-cols-12">
        {/* Filters */}
        <section
          className="space-y-4 xl:col-span-3"
          aria-label="Job filters"
        >
          <JobFilters />
        </section>

        {/* Job List */}
        <section
          className="space-y-4 xl:col-span-6"
          aria-label="Available jobs"
        >
          <JobList jobs={jobs} />
        </section>

        {/* Saved Jobs */}
        <section
          className="space-y-4 xl:col-span-3"
          aria-label="Saved jobs"
        >
          <div>
            <h2 className="text-lg font-semibold text-white">
              Saved Jobs
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Quickly access jobs you saved earlier.
            </p>
          </div>

          <div className="space-y-3">
            {savedJobs.length > 0 ? (
              savedJobs.map((job) => (
                <SavedJobCard key={job.id} job={job} />
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