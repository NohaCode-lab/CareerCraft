import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
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

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700',
    secondary:
      'border border-theme bg-surface text-theme-primary hover:bg-slate-100 dark:hover:bg-slate-800',
    outline:
      'border border-theme bg-transparent text-theme-primary hover:bg-slate-100 dark:hover:bg-white/5',
    ghost:
      'bg-transparent text-theme-secondary hover:bg-slate-100 hover:text-theme-primary dark:hover:bg-white/5',
    danger:
      'bg-red-600 text-white shadow-lg shadow-red-600/20 hover:bg-red-700',
  };

  const sizeClasses: Record<ButtonSize, string> = {
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
