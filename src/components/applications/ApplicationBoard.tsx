import React, { useMemo } from 'react';
import ApplicationColumn from './ApplicationColumn';
import { Application } from '../../hooks/useApplications';

const STATUSES = [
  { key: 'applied', label: 'Applied' },
  { key: 'reviewing', label: 'Reviewing' },
  { key: 'interview', label: 'Interview' },
  { key: 'offer', label: 'Offer' },
  { key: 'rejected', label: 'Rejected' },
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
      {STATUSES.map((status) => (
        <ApplicationColumn
          key={status.key}
          title={status.label}
          statusKey={status.key}
          applications={groupedApplications[status.key]}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  );
};

export default ApplicationBoard;
