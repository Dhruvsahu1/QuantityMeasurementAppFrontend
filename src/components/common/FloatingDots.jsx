import { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function FloatingDots() {
  const dots = useMemo(() => {
    const colors = ['#2A9D8F', '#6B8A3E', '#D4C09A', '#6EC9B9', '#8BA54A'];
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.8,
      duration: Math.random() * 12 + 12,
      delay: Math.random() * 6,
      opacity: Math.random() * 0.25 + 0.03,
      color: colors[i % colors.length],
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size,
            opacity: dot.opacity,
            backgroundColor: dot.color,
          }}
          animate={{
            y: [0, -25, 0],
            x: [0, 8, -8, 0],
            opacity: [dot.opacity, dot.opacity * 1.8, dot.opacity],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            delay: dot.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
