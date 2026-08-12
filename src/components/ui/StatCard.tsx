import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title?: string;
  label?: string;
  value?: string | number;
  description?: string;
  hint?: string;
  icon?: LucideIcon;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
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
        'group rounded-3xl border border-theme bg-surface p-5 shadow-lg shadow-slate-200/50 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-400/30 hover:shadow-xl dark:shadow-black/20',
        className,
      ].join(' ')}
      aria-label={`${displayTitle || 'Statistic'}: ${value}`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {/* Title */}
          <p className="text-sm font-medium text-theme-secondary">
            {displayTitle}
          </p>

          {/* Value */}
          <p className="mt-3 text-3xl font-bold tracking-tight text-theme-primary">
            {value}
          </p>

          {/* Description */}
          {displayDescription && (
            <p className="mt-2 text-sm leading-6 text-theme-muted">
              {displayDescription}
            </p>
          )}
        </div>

        {/* Icon */}
        {Icon && (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-indigo-200 bg-indigo-50 text-indigo-600 transition duration-300 group-hover:scale-105 dark:border-indigo-400/20 dark:bg-indigo-500/10 dark:text-indigo-300">
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
