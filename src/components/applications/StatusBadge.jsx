
import React from 'react';

const statusStyles = {
  applied: 'bg-blue-100 text-blue-700 border-blue-200',
  reviewing: 'bg-amber-100 text-amber-700 border-amber-200',
  interview: 'bg-violet-100 text-violet-700 border-violet-200',
  offer: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  rejected: 'bg-rose-100 text-rose-700 border-rose-200',
  default: 'bg-slate-100 text-slate-700 border-slate-200',
};

const formatStatusLabel = (status) => {
  if (!status) return 'Unknown';

  return status
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const StatusBadge = ({ status = 'default', className = '' }) => {
  const normalizedStatus = String(status).trim().toLowerCase();
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