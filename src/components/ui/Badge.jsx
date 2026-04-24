const badgeVariants = {
  default: 'border border-white/10 bg-slate-800/70 text-slate-300',
  success: 'border border-emerald-400/20 bg-emerald-500/10 text-emerald-300',
  warning: 'border border-amber-400/20 bg-amber-500/10 text-amber-300',
  danger: 'border border-red-400/20 bg-red-500/10 text-red-300',
  info: 'border border-sky-400/20 bg-sky-500/10 text-sky-300',
  violet: 'border border-violet-400/20 bg-violet-500/10 text-violet-300',
};

const badgeSizes = {
  sm: 'px-2.5 py-0.5 text-xs',
  md: 'px-3 py-1 text-xs',
  lg: 'px-3.5 py-1.5 text-sm',
};

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const variantClass = badgeVariants[variant] || badgeVariants.default;
  const sizeClass = badgeSizes[size] || badgeSizes.md;

  return (
    <span
      className={[
        'inline-flex items-center justify-center rounded-full font-semibold',
        variantClass,
        sizeClass,
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
};

export default Badge;