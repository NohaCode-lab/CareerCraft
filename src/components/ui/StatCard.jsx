const StatCard = ({
  title,
  label,
  value = 0,
  description,
  hint,
  icon: Icon,
  className = '',
}) => {
  const displayTitle = title || label;
  const displayDescription = description || hint;

  return (
    <div
      className={[
        'group rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-lg shadow-black/20 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-400/30 hover:shadow-xl',
        className,
      ].join(' ')}
      aria-label={`${displayTitle || 'Statistic'}: ${value}`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {/* Title */}
          <p className="text-sm font-medium text-slate-400">
            {displayTitle}
          </p>

          {/* Value */}
          <p className="mt-3 text-3xl font-bold tracking-tight text-white">
            {value}
          </p>

          {/* Description */}
          {displayDescription && (
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {displayDescription}
            </p>
          )}
        </div>

        {/* Icon */}
        {Icon && (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-300 transition duration-300 group-hover:scale-105 group-hover:bg-indigo-500/15">
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;