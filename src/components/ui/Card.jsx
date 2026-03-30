import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export default function Card({ children, className = '', hover = false, glow = false, ...props }) {
  const glowClass = glow === 'teal' ? 'glow-teal' : glow ? 'glow-olive' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={hover ? { y: -4, transition: { duration: 0.25, ease: 'easeOut' } } : {}}
      className={cn(
        'glass-card p-6 transition-shadow duration-300',
        glowClass,
        hover && 'cursor-pointer hover:shadow-glass-lg',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
