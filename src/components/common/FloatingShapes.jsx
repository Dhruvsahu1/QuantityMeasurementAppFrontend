import { motion } from 'framer-motion';

export default function FloatingShapes() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Teal glow - top right */}
      <motion.div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(42,157,143,0.12) 0%, rgba(42,157,143,0.03) 50%, transparent 70%)' }}
        animate={{
          y: [0, -30, 0],
          x: [0, 15, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Olive glow - left */}
      <motion.div
        className="absolute top-1/4 -left-40 w-[450px] h-[450px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(107,138,62,0.1) 0%, rgba(107,138,62,0.03) 50%, transparent 70%)' }}
        animate={{
          y: [0, 25, 0],
          x: [0, -15, 0],
          scale: [1, 0.92, 1],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Teal accent - bottom right */}
      <motion.div
        className="absolute bottom-16 right-1/4 w-[350px] h-[350px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(42,157,143,0.08) 0%, rgba(107,138,62,0.04) 50%, transparent 70%)' }}
        animate={{
          y: [0, -20, 0],
          x: [0, 12, 0],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Sand accent - center */}
      <motion.div
        className="absolute top-2/3 left-1/3 w-[300px] h-[300px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(212,192,154,0.06) 0%, rgba(212,192,154,0.02) 50%, transparent 70%)' }}
        animate={{
          y: [0, 18, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Small teal orb - top left area */}
      <motion.div
        className="absolute top-[15%] left-[20%] w-[200px] h-[200px] rounded-full blur-2xl"
        style={{ background: 'radial-gradient(circle, rgba(42,157,143,0.06) 0%, transparent 60%)' }}
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
        }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </div>
  );
}
