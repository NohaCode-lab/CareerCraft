
import React, { useMemo } from 'react';
import ApplicationColumn from './ApplicationColumn';

// الحالات الأساسية
const STATUSES = [
  { key: 'applied', label: 'Applied' },
  { key: 'reviewing', label: 'Reviewing' },
  { key: 'interview', label: 'Interview' },
  { key: 'offer', label: 'Offer' },
  { key: 'rejected', label: 'Rejected' },
];

const ApplicationBoard = ({ applications = [], onCardClick }) => {
  // تقسيم البيانات حسب الحالة
  const groupedApplications = useMemo(() => {
    const groups = {};

    STATUSES.forEach((status) => {
      groups[status.key] = [];
    });

    applications.forEach((app) => {
      const statusKey = app.status?.toLowerCase() || 'applied';

      if (!groups[statusKey]) {
        groups[statusKey] = [];
      }

      groups[statusKey].push(app);
    });

    return groups;
  }, [applications]);

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      {STATUSES.map((status) => (
        <ApplicationColumn
          key={status.key}
          title={status.label}
          applications={groupedApplications[status.key] || []}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  );
};

export default ApplicationBoard;