const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  isLoading = false,
  className = '',
  ...props
}) => {
  const isDisabled = disabled || isLoading;

  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-60';

  const variantClasses = {
    primary:
      'bg-indigo-600 text-white shadow-lg shadow-indigo-950/20 hover:bg-indigo-700',
    secondary:
      'border border-white/10 bg-slate-800/70 text-slate-200 hover:bg-slate-800',
    outline:
      'border border-white/10 bg-transparent text-slate-200 hover:bg-white/5',
    ghost:
      'bg-transparent text-slate-300 hover:bg-white/5 hover:text-white',
    danger:
      'bg-red-600 text-white shadow-lg shadow-red-950/20 hover:bg-red-700',
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-5 py-3 text-base',
  };

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={[
        baseClasses,
        variantClasses[variant] || variantClasses.primary,
        sizeClasses[size] || sizeClasses.md,
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      aria-disabled={isDisabled}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

export default Button;