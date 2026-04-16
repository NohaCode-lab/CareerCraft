
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Button from '../ui/Button';
import EmptyState from '../ui/EmptyState';
import Badge from '../ui/Badge';
import { useApplications } from '../../hooks/useApplications';

const DashboardRecentApplications = () => {
  const navigate = useNavigate();
  const { applications = [] } = useApplications();

  const recentApplications = useMemo(() => {
    return [...applications]
      .sort((a, b) => new Date(b.appliedAt || b.date || 0) - new Date(a.appliedAt || a.date || 0))
      .slice(0, 5);
  }, [applications]);

  if (!recentApplications.length) {
    return (
      <Card className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-white">Recent Applications</h2>
        </div>

        <EmptyState
          title="No applications yet"
          description="Start tracking your job applications to see them here."
          actionLabel="Go to Applications"
          onAction={() => navigate('/applications')}
        />
      </Card>
    );
  }

  return (
    <Card className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Recent Applications</h2>
          <p className="mt-1 text-sm text-slate-400">
            Your latest tracked applications.
          </p>
        </div>

        <Button variant="secondary" onClick={() => navigate('/applications')}>
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {recentApplications.map((application) => (
          <div
            key={application.id}
            className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-800/60 p-4 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h3 className="text-base font-semibold text-white">
                {application.role || application.title || 'Untitled Role'}
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                {application.company || 'Unknown Company'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Badge>{application.status || 'Pending'}</Badge>
              <span className="text-xs text-slate-500">
                {application.appliedAt || application.date || 'No date'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DashboardRecentApplications;