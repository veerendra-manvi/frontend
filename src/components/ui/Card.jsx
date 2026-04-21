import React from 'react';

const Card = ({ children, className = '', hoverable = true, ...props }) => {
  return (
    <div
      className={`
        bg-dark-card border border-dark-border rounded-2xl p-6 
        ${hoverable ? 'hover:border-brand-primary/30 hover:shadow-2xl hover:shadow-brand-primary/5 transition-all duration-300' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
