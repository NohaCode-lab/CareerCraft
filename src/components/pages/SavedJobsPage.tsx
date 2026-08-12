import React from 'react';
import PageHeader from '../layout/PageHeader';
import SavedJobCard from '../jobs/SavedJobCard';
import EmptyState from '../ui/EmptyState';
import useJobs from '../../hooks/useJobs';
import useLanguage from '../../hooks/useLanguage';
import { t } from '../../utils/i18n';

const SavedJobsPage: React.FC = () => {
  const { language } = useLanguage();
  const { savedJobs = [], unsaveJob, applyJob, selectJob } = useJobs();

  return (
    <div className="space-y-8">
      <PageHeader
        title={t('savedJobs', language)}
        description={t('savedJobsDesc', language)}
      />

      {savedJobs.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {savedJobs.map((job) => (
            <SavedJobCard
              key={job.id}
              job={job}
              onUnsave={unsaveJob}
              onApply={applyJob}
              onSelect={selectJob}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title={t('noSavedJobsYet', language)}
          description={t('noSavedJobsDesc', language)}
        />
      )}
    </div>
  );
};

export default SavedJobsPage;
