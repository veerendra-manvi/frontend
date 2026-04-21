import React from 'react';

const Badge = ({ children, variant = 'primary', className = '' }) => {
  const variants = {
    primary: 'bg-brand-primary/10 text-brand-primary border-brand-primary/20',
    secondary: 'bg-brand-secondary/10 text-brand-secondary border-brand-secondary/20',
    success: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    danger: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
    ghost: 'bg-white/5 text-slate-400 border-white/10'
  };

  return (
    <span className={`
      px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase tracking-wider
      ${variants[variant]} ${className}
    `}>
      {children}
    </span>
  );
};

export default Badge;
