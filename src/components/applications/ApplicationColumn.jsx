import ApplicationCard from './ApplicationCard';

const ApplicationColumn = ({
  title,
  statusKey,
  applications = [],
  emptyMessage = 'No applications found.',
  onCardClick,
}) => {
  return (
    <div className="flex min-h-75 flex-col rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full bg-slate-400"
            aria-hidden="true"
          />
          <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
        </div>

        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
          {applications.length}
        </span>
      </div>

      {applications.length > 0 ? (
        <div className="space-y-3" data-status={statusKey}>
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