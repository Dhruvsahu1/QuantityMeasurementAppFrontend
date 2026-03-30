import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Input = forwardRef(function Input({ label, error, icon: Icon, className = '', ...props }, ref) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Icon className="w-4 h-4 text-gray-500" />
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white placeholder-gray-500 transition-all duration-200 focus:outline-none input-glow focus:border-teal-500/50',
            Icon && 'pl-10',
            error && 'border-red-500/50 focus:border-red-500/50',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
});

export default Input;
