import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const modalSizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

const Modal = ({
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
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={[
              'w-full rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/30',
              sizeClass,
            ].join(' ')}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <h2
                id="modal-title"
                className="text-lg font-semibold text-white"
              >
                {title}
              </h2>

              <button
                type="button"
                onClick={onClose}
                className="rounded-xl p-2 text-slate-400 transition hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-6 py-5 text-slate-300">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;