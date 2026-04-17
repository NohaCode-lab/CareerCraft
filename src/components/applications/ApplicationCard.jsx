import StatusBadge from './StatusBadge';

const ApplicationCard = ({ application, onClick }) => {
  if (!application) return null;

  const {
    jobTitle,
    role,
    company,
    location,
    status,
    appliedDate,
    appliedAt,
  } = application;

  const displayTitle = jobTitle || role || 'Untitled Role';
  const displayDate = appliedDate || appliedAt;

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
            {company || 'Unknown Company'}
          </p>
        </div>

        <StatusBadge status={status} />
      </div>

      {/* Body */}
      <div className="mt-3 space-y-1 text-xs text-slate-500">
        {location && <p>{location}</p>}

        {displayDate && (
          <p>
            Applied:{' '}
            {new Date(displayDate).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default ApplicationCard;