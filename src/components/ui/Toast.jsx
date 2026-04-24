import { AlertCircle, CheckCircle2, Info, TriangleAlert, X } from 'lucide-react';

const toastStyles = {
  info: {
    container: 'border-sky-400/20 bg-sky-500/10 text-sky-300',
    icon: Info,
  },
  success: {
    container: 'border-emerald-400/20 bg-emerald-500/10 text-emerald-300',
    icon: CheckCircle2,
  },
  warning: {
    container: 'border-amber-400/20 bg-amber-500/10 text-amber-300',
    icon: TriangleAlert,
  },
  error: {
    container: 'border-red-400/20 bg-red-500/10 text-red-300',
    icon: AlertCircle,
  },
};

const Toast = ({ message, type = 'info', onClose }) => {
  const toast = toastStyles[type] || toastStyles.info;
  const Icon = toast.icon;

  return (
    <div
      className={[
        'flex items-start justify-between gap-4 rounded-2xl border px-4 py-3 shadow-lg shadow-black/20 backdrop-blur-sm',
        toast.container,
      ].join(' ')}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 h-5 w-5 shrink-0" />

        <p className="text-sm font-medium leading-6">
          {message}
        </p>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1 text-current transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
          aria-label="Close toast"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default Toast;