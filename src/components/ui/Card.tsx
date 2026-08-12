import React from 'react';

type CardVariant = 'default' | 'solid' | 'outline';

interface CardProps {
  children?: React.ReactNode;
  variant?: CardVariant;
  className?: string;
}

const cardVariants: Record<CardVariant, string> = {
  default: 'border border-theme bg-surface text-theme-primary backdrop-blur',
  solid: 'border border-theme bg-surface-elevated text-theme-primary',
  outline: 'border border-theme bg-transparent text-theme-primary',
};

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  return (
    <div
      className={[
        'rounded-3xl p-6 shadow-lg shadow-slate-200/50 dark:shadow-black/20 transition',
        cardVariants[variant] || cardVariants.default,
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
};

export default Card;
