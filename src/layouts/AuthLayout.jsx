import { motion } from 'framer-motion';
import FloatingDots from '../components/common/FloatingDots';
import FloatingShapes from '../components/common/FloatingShapes';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-grid-large opacity-10" />
      <div className="absolute inset-0 bg-radial-glow" />
      <FloatingDots />
      <FloatingShapes />

      <div className="relative z-10 min-h-screen flex">
        {/* Left panel - hidden on mobile */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="hidden lg:flex lg:w-[55%] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 via-olive-900/10 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-between p-12">
            {/* Top: Logo */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-olive via-teal-600 to-teal-400 flex items-center justify-center shadow-olive-soft">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16M9 4v16M15 4v16" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">MeasureApp</span>
            </motion.div>

            {/* Center: Feature highlights */}
            <div className="space-y-8 max-w-md">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                  Precision at <br />
                  <span className="text-gradient">your fingertips</span>
                </h2>
                <p className="text-gray-400 text-base leading-relaxed">
                  Convert units across length, weight, temperature, and volume with
                  beautiful, real-time calculations.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="flex gap-6"
              >
                {[
                  { label: 'Accuracy', value: '99.9%' },
                  { label: 'Categories', value: '4+' },
                  { label: 'Speed', value: '<50ms' },
                ].map((stat, i) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-xl font-bold text-teal-400">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Bottom: Decorative element */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex items-center gap-3"
            >
              <div className="flex -space-x-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-moss bg-gradient-to-br from-teal-600/40 to-olive-600/40"
                  />
                ))}
              </div>
              <div>
                <p className="text-sm text-gray-300 font-medium">10,000+ conversions</p>
                <p className="text-xs text-gray-500">trusted by professionals</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right panel: Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full lg:w-[45%] flex items-center justify-center p-6 sm:p-12"
        >
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="flex items-center gap-3 mb-8 lg:hidden"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-olive via-teal-600 to-teal-400 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16M9 4v16M15 4v16" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white">MeasureApp</span>
            </motion.div>
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
