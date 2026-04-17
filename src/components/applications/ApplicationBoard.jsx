import { useMemo } from 'react';
import ApplicationColumn from './ApplicationColumn';

const STATUSES = [
  { key: 'applied', label: 'Applied' },
  { key: 'reviewing', label: 'Reviewing' },
  { key: 'interview', label: 'Interview' },
  { key: 'offer', label: 'Offer' },
  { key: 'rejected', label: 'Rejected' },
];

const normalizeStatus = (status) => {
  const normalizedStatus = status?.trim().toLowerCase();

  const statusMap = {
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

  return statusMap[normalizedStatus] || 'applied';
};

const ApplicationBoard = ({ applications = [], onCardClick }) => {
  const groupedApplications = useMemo(() => {
    const groups = STATUSES.reduce((accumulator, status) => {
      accumulator[status.key] = [];
      return accumulator;
    }, {});

    applications.forEach((application) => {
      const statusKey = normalizeStatus(application.status);
      groups[statusKey].push(application);
    });

    return groups;
  }, [applications]);

  return (
    <div className="grid gap-4 xl:grid-cols-5">
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