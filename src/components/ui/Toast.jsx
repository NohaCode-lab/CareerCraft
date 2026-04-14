
const toastStyles = {
  info: 'border-sky-200 bg-sky-50 text-sky-700',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  warning: 'border-amber-200 bg-amber-50 text-amber-700',
  error: 'border-red-200 bg-red-50 text-red-700',
};

const Toast = ({ message, type = 'info', onClose }) => {
  return (
    <div
      className={[
        'flex items-start justify-between gap-4 rounded-2xl border px-4 py-3 shadow-sm',
        toastStyles[type] || toastStyles.info,
      ].join(' ')}
    >
      <p className="text-sm font-medium">{message}</p>

      <button
        type="button"
        onClick={onClose}
        className="rounded-md p-1 text-current transition hover:bg-white/50"
        aria-label="Close toast"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;