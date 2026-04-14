
const StatCard = ({ label, value, icon: Icon, hint }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </p>

          {hint ? (
            <p className="mt-2 text-sm text-slate-500">{hint}</p>
          ) : null}
        </div>

        {Icon ? (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <Icon className="h-6 w-6" />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default StatCard;