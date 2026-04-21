import React from 'react';

const ProgressBar = ({ progress = 0, showLabel = true, height = 'h-3' }) => {
  const percentage = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-end mb-2">
          <span className="text-sm font-medium text-slate-300">Progress</span>
          <span className="text-sm font-bold text-brand-primary">{percentage}%</span>
        </div>
      )}
      <div className={`w-full bg-white/5 border border-white/5 rounded-full overflow-hidden ${height}`}>
        <div 
          className="h-full bg-gradient-to-r from-brand-primary to-orange-400 rounded-full transition-all duration-1000 ease-out relative"
          style={{ width: `${percentage}%` }}
        >
          {/* Subtle shine effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50" />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
