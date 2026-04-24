import PageHeader from '../layout/PageHeader';
import SavedJobCard from '../jobs/SavedJobCard';
import EmptyState from '../ui/EmptyState';
import useJobs from '../../hooks/useJobs';

const SavedJobsPage = () => {
  const { savedJobs = [] } = useJobs();

  const safeSavedJobs = Array.isArray(savedJobs) ? savedJobs : [];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Saved Jobs"
        description="Review the jobs you saved and move the best opportunities into your application workflow."
      />

      <section
        className="space-y-4"
        aria-labelledby="saved-jobs-heading"
      >
        <div>
          <h2
            id="saved-jobs-heading"
            className="text-lg font-semibold text-white"
          >
            Your Saved Opportunities
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Keep your favorite jobs organized and ready for action.
          </p>
        </div>

        {safeSavedJobs.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {safeSavedJobs.map((job) => (
              <SavedJobCard
                key={job.id}
                job={job}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No saved jobs yet"
            description="Start saving interesting opportunities from the job search page."
          />
        )}
      </section>
    </div>
  );
};

export default SavedJobsPage;