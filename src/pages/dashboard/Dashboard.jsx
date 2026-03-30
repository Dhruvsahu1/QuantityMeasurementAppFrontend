import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRightLeft,
  Ruler,
  Weight,
  Thermometer,
  Droplets,
  TrendingUp,
  Clock,
  User,
  Zap,
  Sparkles,
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Toast from '../../components/ui/Toast';
import CountUp from '../../components/common/CountUp';
import measurementService from '../../services/measurementService';
import { useAuth } from '../../hooks/useAuth';
import { UNIT_CATEGORIES } from '../../utils/constants';

const categoryIcons = {
  LENGTH: Ruler,
  WEIGHT: Weight,
  TEMPERATURE: Thermometer,
  VOLUME: Droplets,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Dashboard() {
  const { user } = useAuth();
  const [category, setCategory] = useState('LENGTH');
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('FEET');
  const [toUnit, setToUnit] = useState('CENTIMETERS');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });
  const [conversions, setConversions] = useState(0);

  const currentUnits = UNIT_CATEGORIES[category]?.units || [];

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    const units = UNIT_CATEGORIES[cat]?.units || [];
    if (units.length >= 2) {
      setFromUnit(units[0].value);
      setToUnit(units[1].value);
    }
    setResult(null);
  };

  const handleConvert = async () => {
    if (!value || isNaN(parseFloat(value))) {
      setToast({ visible: true, message: 'Please enter a valid number', type: 'error' });
      return;
    }
    if (fromUnit === toUnit) {
      setToast({ visible: true, message: 'Please select different units', type: 'error' });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const data = await measurementService.convert(value, fromUnit, toUnit);
      setResult(data);
      setConversions((prev) => prev + 1);
      setToast({ visible: true, message: 'Conversion successful!', type: 'success' });
    } catch (error) {
      const message = error.response?.data?.message || 'Conversion failed. Please try again.';
      setToast({ visible: true, message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    setResult(null);
  };

  const getUnitLabel = (unitValue) => {
    return currentUnits.find((u) => u.value === unitValue)?.label || unitValue;
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-6xl mx-auto"
    >
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onClose={() => setToast((prev) => ({ ...prev, visible: false }))}
      />

      {/* Header */}
      <motion.div variants={itemVariants} className="mb-2">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Welcome back, <span className="text-gradient">{user?.fullName || user?.email || 'User'}</span>
            </h1>
            <p className="text-gray-400 mt-1.5 text-sm sm:text-base">Convert measurements with precision and ease</p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full glass-subtle"
          >
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span className="text-sm text-gray-300 font-medium">Pro Account</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Card hover glow="teal" className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center border border-teal-500/15">
              <TrendingUp className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                <CountUp end={conversions} decimals={0} />
              </p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Total Conversions</p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        >
          <Card hover className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-olive/10 flex items-center justify-center border border-olive/15">
              <Zap className="w-5 h-5 text-olive-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {result ? (
                  <CountUp end={result.resultValue || 0} />
                ) : (
                  <span className="text-gray-600">--</span>
                )}
              </p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Last Result</p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        >
          <Card hover className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sand/10 flex items-center justify-center border border-sand/15">
              <User className="w-5 h-5 text-sand-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-white truncate max-w-[140px]">
                {user?.fullName || user?.email || 'User'}
              </p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Account</p>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Category Selection */}
      <motion.div variants={itemVariants}>
        <Card>
          <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-gradient-to-b from-teal-400 to-olive-400 rounded-full" />
            Select Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(UNIT_CATEGORIES).map(([key, cat]) => {
              const Icon = categoryIcons[key];
              const isActive = category === key;
              return (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleCategoryChange(key)}
                  className={`group relative flex flex-col items-center gap-2.5 p-4 rounded-xl border transition-all duration-300 overflow-hidden ${
                    isActive
                      ? 'bg-teal-500/[0.08] border-teal-500/20 text-teal-400'
                      : 'bg-white/[0.02] border-white/[0.06] text-gray-400 hover:text-white hover:bg-white/[0.05] hover:border-white/10'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="category-bg"
                      className="absolute inset-0 bg-gradient-to-br from-teal-500/[0.06] to-olive-500/[0.04]"
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                  <Icon className={`w-6 h-6 relative z-10 transition-colors ${isActive ? 'text-teal-400' : 'text-gray-500 group-hover:text-gray-300'}`} />
                  <span className="text-sm font-medium relative z-10">{cat.label}</span>
                </motion.button>
              );
            })}
          </div>
        </Card>
      </motion.div>

      {/* Conversion Form */}
      <motion.div variants={itemVariants}>
        <Card glow="teal">
          <h2 className="text-base font-semibold text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-5 bg-gradient-to-b from-teal-400 to-olive-400 rounded-full" />
            Convert
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
            <div className="space-y-4">
              <Input
                label="Value"
                type="number"
                placeholder="Enter value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <Select
                label="From"
                options={currentUnits}
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
              />
            </div>

            <div className="flex justify-center py-2">
              <motion.button
                whileHover={{ scale: 1.15, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={swapUnits}
                className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-500 hover:text-teal-400 hover:border-teal-500/30 hover:bg-teal-500/[0.06] transition-all duration-300"
              >
                <ArrowRightLeft className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="space-y-4">
              <Select
                label="To"
                options={currentUnits}
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
              />
              <div className="h-[52px]" />
            </div>
          </div>

          <div className="mt-6">
            <Button
              onClick={handleConvert}
              loading={loading}
              className="w-full"
              size="lg"
              icon={ArrowRightLeft}
            >
              Convert
            </Button>
          </div>

          {/* Result */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', bounce: 0.2 }}
              className="mt-6 p-6 rounded-xl bg-gradient-to-br from-teal-500/[0.06] via-transparent to-olive-500/[0.04] border border-teal-500/15"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Result</p>
              </div>
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl sm:text-4xl font-bold text-white">
                  <CountUp end={result.resultValue || 0} duration={800} />
                </span>
                <span className="text-lg text-teal-400 font-semibold">
                  {result.resultUnit || getUnitLabel(toUnit)}
                </span>
              </div>
              {result.resultString && (
                <p className="text-sm text-gray-500 mt-3">{result.resultString}</p>
              )}
              {!result.resultString && (
                <p className="text-sm text-gray-500 mt-3">
                  {value} {getUnitLabel(fromUnit)} = {result.resultValue} {result.resultUnit || getUnitLabel(toUnit)}
                </p>
              )}
            </motion.div>
          )}

          {/* Error Display */}
          {result && result.error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 rounded-xl bg-red-500/[0.06] border border-red-500/15"
            >
              <p className="text-sm text-red-400">{result.errorMessage || 'An error occurred during conversion.'}</p>
            </motion.div>
          )}
        </Card>
      </motion.div>

      {/* Quick Reference */}
      <motion.div variants={itemVariants}>
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1 h-5 bg-gradient-to-b from-olive-400 to-sand-400 rounded-full" />
            <h2 className="text-base font-semibold text-white">Quick Reference</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {currentUnits.map((unit, i) => (
              <motion.div
                key={unit.value}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.08] hover:bg-white/[0.03] transition-all duration-200"
              >
                <div className="w-6 h-6 rounded-md bg-olive/10 flex items-center justify-center flex-shrink-0">
                  <Ruler className="w-3.5 h-3.5 text-olive-400/60" />
                </div>
                <span className="text-sm text-gray-400">{unit.label}</span>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
