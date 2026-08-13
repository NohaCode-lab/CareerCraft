import React from 'react';
import useLanguage from '../../hooks/useLanguage';
import { t } from '../../utils/i18n';
import StatusBadge from './StatusBadge';
import { Application } from '../../hooks/useApplications';

interface ApplicationCardProps {
  application: Application;
  onClick?: (application: Application) => void;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application, onClick }) => {
  const { language } = useLanguage();
  if (!application) return null;

  const {
    jobTitle,
    role,
    company,
    location,
    status,
    appliedDate,
    appliedAt,
  } = (application as unknown as Record<string, unknown>) || {};

  const displayTitle = (jobTitle || role || application.title || 'Untitled Role') as string;
  const displayDate = (appliedDate || appliedAt || application.createdAt || '') as string | number | Date;

  return (
    <div
      onClick={() => onClick && onClick(application)}
      className="cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md hover:border-slate-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            {displayTitle}
          </h3>

          <p className="mt-1 text-sm text-slate-600">
            {(company as string) || 'Unknown Company'}
          </p>
        </div>

        <StatusBadge status={typeof status === 'string' ? status : undefined} />
      </div>

      {/* Body */}
      <div className="mt-3 space-y-1 text-xs text-slate-500">
        {typeof location === 'string' && <p>{location}</p>}

        {Boolean(displayDate) && (
          <p>
            {t('statusApplied', language)}:{' '}
            {new Date(displayDate as string | number | Date).toLocaleDateString(
              language === 'ar' ? 'ar-SA' : language === 'de' ? 'de-DE' : 'en-US'
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default ApplicationCard;
