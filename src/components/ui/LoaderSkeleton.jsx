import React from 'react';

const LoaderSkeleton = ({ className = '', variant = 'rect' }) => {
  const baseClasses = "animate-pulse bg-white/5 rounded-xl";
  
  const variants = {
    rect: "w-full h-32",
    circle: "w-12 h-12 rounded-full",
    text: "w-3/4 h-4 rounded-full",
    heading: "w-1/2 h-8 rounded-full"
  };

  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`} />
  );
};

export default LoaderSkeleton;
