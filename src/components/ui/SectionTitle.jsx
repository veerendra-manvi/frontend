import React from 'react';

const SectionTitle = ({ title, subtitle, className = '' }) => {
  return (
    <div className={`mb-8 ${className}`}>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1.5 h-8 bg-brand-primary rounded-full shadow-[0_0_8px_rgba(248,152,32,0.6)]" />
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="text-slate-400 text-sm md:text-base ml-4.5">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
