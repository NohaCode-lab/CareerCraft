
import React from 'react';
import ApplicationCard from './ApplicationCard';

const ApplicationColumn = ({
  title,
  applications = [],
  emptyMessage = 'No applications found.',
  onCardClick,
}) => {
  return (
    <div className="flex min-h-75 flex-col rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600">
          {applications.length}
        </span>
      </div>

      {applications.length > 0 ? (
        <div className="space-y-3">
          {applications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              onClick={onCardClick}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-4 text-center">
          <p className="text-sm text-slate-500">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
};

export default ApplicationColumn;