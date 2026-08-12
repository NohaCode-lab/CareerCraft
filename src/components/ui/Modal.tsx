import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div;

type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

interface ModalProps {
  isOpen: boolean;
  title: string;
  children?: React.ReactNode;
  onClose: () => void;
  size?: ModalSize;
}

const modalSizes: Record<ModalSize, string> = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  children,
  onClose,
  size = 'md',
}) => {
  const sizeClass = modalSizes[size] || modalSizes.md;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={onClose}
        >
          <MotionDiv
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={[
              'w-full rounded-3xl border border-theme bg-surface text-theme-primary shadow-2xl shadow-slate-900/10 dark:shadow-black/30',
              sizeClass,
            ].join(' ')}
            onClick={(event: React.MouseEvent) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-theme px-6 py-4">
              <h2
                id="modal-title"
                className="text-lg font-semibold text-theme-primary"
              >
                {title}
              </h2>

              <button
                type="button"
                onClick={onClose}
                className="rounded-xl p-2 text-theme-secondary transition hover:bg-slate-100 hover:text-theme-primary dark:hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-6 py-5 text-theme-secondary">
              {children}
            </div>
          </MotionDiv>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
