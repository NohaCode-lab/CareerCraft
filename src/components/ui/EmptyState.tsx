import React from 'react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div;

interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  action,
  icon,
}) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center rounded-3xl border border-theme bg-surface p-10 text-center shadow-lg shadow-slate-200/50 backdrop-blur dark:shadow-black/20"
    >
      {/* Icon */}
      {icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-white/5 dark:text-indigo-300">
          {icon}
        </div>
      )}

      {/* Title */}
      <h3 className="text-lg font-semibold text-theme-primary">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-2 max-w-md text-sm leading-6 text-theme-secondary">
        {description}
      </p>

      {/* Action */}
      {action && <div className="mt-6">{action}</div>}
    </MotionDiv>
  );
};

export default EmptyState;
