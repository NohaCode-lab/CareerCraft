import React, { useMemo } from 'react';
import ApplicationColumn from './ApplicationColumn';
import { Application } from '../../hooks/useApplications';
import useLanguage from '../../hooks/useLanguage';
import { translations } from '../../config/translations';

const STATUSES = [
  { key: 'applied', label: 'Applied', tKey: 'statusApplied' },
  { key: 'reviewing', label: 'Reviewing', tKey: 'statusReviewing' },
  { key: 'interview', label: 'Interview', tKey: 'statusInterview' },
  { key: 'offer', label: 'Offer', tKey: 'statusOffer' },
  { key: 'rejected', label: 'Rejected', tKey: 'statusRejected' },
];

const normalizeStatus = (status?: string): string => {
  const normalizedStatus = status?.trim().toLowerCase();

  const statusMap: Record<string, string> = {
    applied: 'applied',
    reviewing: 'reviewing',
    review: 'reviewing',
    interview: 'interview',
    interviewing: 'interview',
    offer: 'offer',
    offered: 'offer',
    rejected: 'rejected',
    rejection: 'rejected',
  };

  return statusMap[normalizedStatus || ''] || 'applied';
};

interface ApplicationBoardProps {
  applications?: Application[];
  onCardClick?: (application: Application) => void;
}

const ApplicationBoard: React.FC<ApplicationBoardProps> = ({ applications = [], onCardClick }) => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  const groupedApplications = useMemo(() => {
    const groups = STATUSES.reduce((accumulator, status) => {
      accumulator[status.key] = [];
      return accumulator;
    }, {} as Record<string, Application[]>);

    applications.forEach((application) => {
      const statusKey = normalizeStatus(application.status);
      if (groups[statusKey]) {
        groups[statusKey].push(application);
      }
    });

    return groups;
  }, [applications]);

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
      {STATUSES.map((status) => {
        const title = (t as any)[status.tKey] || status.label;

        return (
          <ApplicationColumn
            key={status.key}
            title={title}
            statusKey={status.key}
            applications={groupedApplications[status.key]}
            onCardClick={onCardClick}
          />
        );
      })}
    </div>
  );
};

export default ApplicationBoard;
