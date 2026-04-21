import React from 'react';

export const PrimaryButton = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`
        relative px-6 py-2.5 bg-brand-primary text-white font-semibold rounded-xl
        hover:bg-brand-primary/90 hover:shadow-[0_0_20px_-5px_rgba(248,152,32,0.5)]
        active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-2 overflow-hidden group ${className}
      `}
      {...props}
    >
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
      {children}
    </button>
  );
};

export const SecondaryButton = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`
        px-6 py-2.5 bg-white/5 text-white font-semibold rounded-xl border border-dark-border
        hover:bg-white/10 hover:border-white/20 active:scale-95 transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
