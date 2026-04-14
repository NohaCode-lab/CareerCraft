
const badgeVariants = {
  default: 'bg-slate-100 text-slate-700',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-700',
  info: 'bg-sky-100 text-sky-700',
};

const Badge = ({ children, variant = 'default', className = '' }) => {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
        badgeVariants[variant] || badgeVariants.default,
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
};

export default Badge;