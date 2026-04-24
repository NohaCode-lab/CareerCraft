const progressVariants = {
  default: 'bg-indigo-500',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
};

const progressSizes = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
};

const ProgressBar = ({
  value = 0,
  label = 'Progress',
  showLabel = true,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const safeValue = Math.min(Math.max(Number(value) || 0, 0), 100);

  const variantClass = progressVariants[variant] || progressVariants.default;
  const sizeClass = progressSizes[size] || progressSizes.md;

  return (
    <div className={['w-full', className].join(' ')}>
      {showLabel && (
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-300">{label}</span>
          <span className="text-sm font-semibold text-white">
            {safeValue}%
          </span>
        </div>
      )}

      <div
        className={[
          'w-full overflow-hidden rounded-full bg-slate-800',
          sizeClass,
        ].join(' ')}
        role="progressbar"
        aria-valuenow={safeValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className={[
            'h-full rounded-full transition-all duration-500 ease-out',
            variantClass,
          ].join(' ')}
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;