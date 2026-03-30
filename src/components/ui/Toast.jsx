import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useEffect } from 'react';

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

const colors = {
  success: 'border-teal-500/20 bg-teal-500/[0.08]',
  error: 'border-red-500/20 bg-red-500/[0.08]',
  info: 'border-teal-500/20 bg-teal-500/[0.08]',
};

const iconColors = {
  success: 'text-teal-400',
  error: 'text-red-400',
  info: 'text-teal-400',
};

export default function Toast({ message, type = 'info', visible, onClose, duration = 4000 }) {
  const Icon = icons[type];

  useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -20, x: '-50%' }}
          className="fixed top-6 left-1/2 z-50"
        >
          <div className={`flex items-center gap-3 px-5 py-3 rounded-xl border backdrop-blur-2xl shadow-glass ${colors[type]}`}>
            <Icon className={`w-5 h-5 ${iconColors[type]}`} />
            <span className="text-sm text-white">{message}</span>
            <button onClick={onClose} className="ml-2 text-gray-400 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
