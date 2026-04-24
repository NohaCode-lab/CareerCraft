const loaderSizes = {
  sm: 'h-6 w-6 border-2',
  md: 'h-10 w-10 border-4',
  lg: 'h-14 w-14 border-4',
};

const Loader = ({
  text = 'Loading...',
  size = 'md',
  fullScreen = false,
}) => {
  const sizeClass = loaderSizes[size] || loaderSizes.md;

  return (
    <div
      className={[
        'flex flex-col items-center justify-center gap-4 text-center',
        fullScreen ? 'min-h-screen' : 'py-8',
      ].join(' ')}
      role="status"
      aria-live="polite"
    >
      <div
        className={[
          'animate-spin rounded-full border-slate-700 border-t-indigo-400',
          sizeClass,
        ].join(' ')}
        aria-hidden="true"
      />

      {text && (
        <p className="text-sm font-medium text-slate-400">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;