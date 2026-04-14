
const ProgressBar = ({ value = 0, className = '' }) => {
  const safeValue = Math.min(Math.max(value, 0), 100);

  return (
    <div className={['w-full', className].join(' ')}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700">Progress</span>
        <span className="text-sm text-slate-500">{safeValue}%</span>
      </div>

      <div className="h-3 w-full rounded-full bg-slate-200">
        <div
          className="h-3 rounded-full bg-indigo-600 transition-all duration-300"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;