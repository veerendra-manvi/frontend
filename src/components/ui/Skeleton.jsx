import React from 'react';

export const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={`animate-pulse rounded-md bg-white/5 ${className}`}
      {...props}
    />
  );
};

export const CardSkeleton = () => (
  <div className="space-y-4 p-6 border border-white/5 rounded-[2.5rem]">
    <Skeleton className="h-12 w-12 rounded-2xl" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  </div>
);

export const ChartSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-[200px] w-full rounded-3xl" />
  </div>
);
