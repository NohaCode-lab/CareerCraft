const SectionHeader = ({
  title,
  description,
  action,
  align = 'default',
  className = '',
}) => {
  const alignment =
    align === 'center'
      ? 'items-center text-center'
      : 'items-start text-left';

  return (
    <div
      className={[
        'mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between',
        className,
      ].join(' ')}
    >
      <div className={['flex flex-col gap-1', alignment].join(' ')}>
        <h2 className="text-xl font-semibold text-white">
          {title}
        </h2>

        {description && (
          <p className="text-sm text-slate-400 max-w-xl">
            {description}
          </p>
        )}
      </div>

      {action && (
        <div className="flex items-center">
          {action}
        </div>
      )}
    </div>
  );
};

export default SectionHeader;