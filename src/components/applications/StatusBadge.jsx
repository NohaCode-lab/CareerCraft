const statusStyles = {
  applied: 'border-blue-200 bg-blue-100 text-blue-700',
  reviewing: 'border-amber-200 bg-amber-100 text-amber-700',
  interview: 'border-violet-200 bg-violet-100 text-violet-700',
  offer: 'border-emerald-200 bg-emerald-100 text-emerald-700',
  rejected: 'border-rose-200 bg-rose-100 text-rose-700',
  default: 'border-slate-200 bg-slate-100 text-slate-700',
};

const normalizeStatus = (status) => {
  const normalizedStatus = String(status || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-');

  const statusMap = {
    applied: 'applied',
    reviewing: 'reviewing',
    review: 'reviewing',
    'in-review': 'reviewing',
    interview: 'interview',
    interviewing: 'interview',
    offer: 'offer',
    offered: 'offer',
    rejected: 'rejected',
    rejection: 'rejected',
  };

  return statusMap[normalizedStatus] || 'default';
};

const formatStatusLabel = (status) => {
  if (!status || status === 'default') {
    return 'Unknown';
  }

  return status
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const StatusBadge = ({ status = 'default', className = '' }) => {
  const normalizedStatus = normalizeStatus(status);
  const badgeStyle = statusStyles[normalizedStatus] || statusStyles.default;

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${badgeStyle} ${className}`}
    >
      {formatStatusLabel(normalizedStatus)}
    </span>
  );
};

export default StatusBadge;