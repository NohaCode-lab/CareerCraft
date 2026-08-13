import React from 'react';
import StatusBadge from './StatusBadge';
import { Application } from '../../hooks/useApplications';
import useLanguage from '../../hooks/useLanguage';
import { t } from '../../utils/i18n';

interface ApplicationDetailsModalProps {
  isOpen: boolean;
  application: Application | null;
  onClose: () => void;
}

const ApplicationDetailsModal: React.FC<ApplicationDetailsModalProps> = ({ isOpen, application, onClose }) => {
  const { language } = useLanguage();
  if (!isOpen || !application) {
    return null;
  }

  const {
    title,
    jobTitle,
    role,
    company,
    location,
    status,
    appliedDate,
    appliedAt,
    createdAt,
    notes,
    jobType,
    employmentType,
    salary,
  } = (application as unknown as Record<string, unknown>) || {};

  const displayTitle = (title || jobTitle || role || 'Untitled Role') as string;
  const displayDate = (appliedDate || appliedAt || createdAt) as string | number | Date | undefined;
  const displayJobType = (jobType || employmentType || t('notSpecified', language)) as string;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl"
        onClick={(event: React.MouseEvent) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {displayTitle}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {(company as string) || 'Unknown Company'}
            </p>
          </div>

          <StatusBadge status={typeof status === 'string' ? status : undefined} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              {t('locationLabel', language)}
            </p>
            <p className="mt-2 text-sm text-slate-800">
              {(location as string) || t('notSpecified', language)}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              {t('appliedDateLabel', language)}
            </p>
            <p className="mt-2 text-sm text-slate-800">
              {displayDate
                ? new Date(displayDate).toLocaleDateString(language === 'ar' ? 'ar-SA' : language === 'de' ? 'de-DE' : 'en-US')
                : t('notSpecified', language)}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              {t('jobTypeLabel', language)}
            </p>
            <p className="mt-2 text-sm text-slate-800">{displayJobType}</p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              {t('salaryLabel', language)}
            </p>
            <p className="mt-2 text-sm text-slate-800">
              {(salary as string) || t('notSpecified', language)}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {t('notesLabel', language)}
          </p>
          <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-700">
            {(notes as string) || t('noNotesAvailable', language)}
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            {t('close', language)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailsModal;
