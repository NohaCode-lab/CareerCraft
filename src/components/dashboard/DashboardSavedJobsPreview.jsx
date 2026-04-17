import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Button from '../ui/Button';
import EmptyState from '../ui/EmptyState';
import { useJobs } from '../../hooks/useJobs';

const DashboardSavedJobsPreview = () => {
  const navigate = useNavigate();
  const { savedJobs = [] } = useJobs();

  const previewJobs = useMemo(() => savedJobs.slice(0, 4), [savedJobs]);

  if (!previewJobs.length) {
    return (
      <Card
        className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg"
        aria-label="Saved jobs preview"
      >
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-white">Saved Jobs</h2>
        </div>

        <EmptyState
          title="No saved jobs yet"
          description="Bookmark jobs you like and they will appear here."
          actionLabel="Browse Jobs"
          onAction={() => navigate('/job-search')}
        />
      </Card>
    );
  }

  return (
    <Card
      className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg"
      aria-label="Saved jobs preview"
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Saved Jobs</h2>
          <p className="mt-1 text-sm text-slate-400">
            A quick look at your bookmarked roles.
          </p>
        </div>

        <Button
          variant="secondary"
          onClick={() => navigate('/saved-jobs')}
          aria-label="View all saved jobs"
        >
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {previewJobs.map((job, index) => {
          const title = job.title || 'Untitled Job';
          const company = job.company || 'Unknown Company';
          const location = job.location || 'Location not specified';

          return (
            <div
              key={job.id || `${title}-${company}-${index}`}
              className="rounded-2xl border border-white/10 bg-slate-800/60 p-4"
            >
              <h3 className="text-base font-semibold text-white">{title}</h3>
              <p className="mt-1 text-sm text-slate-400">{company}</p>
              <p className="mt-2 text-xs text-slate-500">{location}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default DashboardSavedJobsPreview;