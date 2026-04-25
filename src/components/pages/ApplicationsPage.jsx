import { useMemo, useState } from 'react';
import PageHeader from '../layout/PageHeader';

import ApplicationBoard from '../applications/ApplicationBoard';
import ApplicationDetailsModal from '../applications/ApplicationDetailsModal';

import useApplications from '../../hooks/useApplications';

const ApplicationsPage = () => {
  const { applications = [] } = useApplications();

  const [selectedApplication, setSelectedApplication] = useState(null);

  const safeApplications = useMemo(() => {
    return Array.isArray(applications) ? applications : [];
  }, [applications]);

  const handleCardClick = (application) => {
    if (!application) return;
    setSelectedApplication(application);
  };

  const handleCloseModal = () => {
    setSelectedApplication(null);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Applications"
        description="Organize your job applications, track statuses, and manage follow-ups efficiently."
      />

      <section
        className="space-y-4"
        aria-labelledby="applications-board-heading"
      >
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2
              id="applications-board-heading"
              className="text-lg font-semibold text-white"
            >
              Application Pipeline
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Review your active opportunities and monitor each stage of your job search.
            </p>
          </div>

          {/* Stats */}
          <div className="text-sm text-slate-400">
            {safeApplications.length} applications
          </div>
        </div>

        {safeApplications.length > 0 ? (
          <ApplicationBoard
            applications={safeApplications}
            onCardClick={handleCardClick}
          />
        ) : (
          <div className="rounded-3xl border border-dashed border-white/10 bg-white/3 p-6 text-center text-sm text-slate-400">
            No applications yet. Start tracking your job applications.
          </div>
        )}
      </section>

      <ApplicationDetailsModal
        isOpen={Boolean(selectedApplication)}
        application={selectedApplication}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ApplicationsPage;