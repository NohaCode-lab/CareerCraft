const cardVariants = {
  default: 'border border-white/10 bg-slate-900/70 backdrop-blur',
  solid: 'border border-white/10 bg-slate-900',
  outline: 'border border-white/10 bg-transparent',
};

const Card = ({
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