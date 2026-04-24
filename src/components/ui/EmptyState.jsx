import { motion } from 'framer-motion';

const EmptyState = ({
  title,
  description,
  action,
  icon,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-slate-900/70 p-10 text-center shadow-lg shadow-black/20 backdrop-blur"
    >
      {/* Icon */}
      {icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-slate-300">
          {icon}
        </div>
      )}

      {/* Title */}
      <h3 className="text-lg font-semibold text-white">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
        {description}
      </p>

      {/* Action */}
      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  );
};

export default EmptyState;