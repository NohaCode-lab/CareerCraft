import React from 'react';

type CardVariant = 'default' | 'solid' | 'outline';

interface CardProps {
  children?: React.ReactNode;
  variant?: CardVariant;
  className?: string;
}

const cardVariants: Record<CardVariant, string> = {
  default: 'border border-white/10 bg-slate-900/70 backdrop-blur',
  solid: 'border border-white/10 bg-slate-900',
  outline: 'border border-white/10 bg-transparent',
};

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  return (
    <div
      className={[
        'rounded-3xl p-6 shadow-lg shadow-black/20 transition',
        cardVariants[variant] || cardVariants.default,
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
};

export default Card;
