import React, { memo } from 'react';
import { Card, ProgressBar } from './index';

const StatisticCard = ({ label, value, progress, nextGoal, colorClass }) => (
  <Card className={`flex flex-col gap-1 p-6 border-b-4 ${colorClass}`}>
    <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{label}</span>
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-black text-white">{value}</span>
      {nextGoal && <span className="text-xs text-slate-600 font-bold">/ {nextGoal}</span>}
    </div>
    {progress !== undefined && (
      <ProgressBar progress={progress} showLabel={false} height="h-1 mt-2" />
    )}
  </Card>
);

export default memo(StatisticCard);
