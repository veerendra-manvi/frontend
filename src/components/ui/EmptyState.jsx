import React from 'react';
import { Ghost, RefreshCcw } from 'lucide-react';
import { SecondaryButton } from './index';

export const EmptyState = ({ title, message, icon: Icon = Ghost, actionLabel, onAction }) => (
  <div className="flex flex-col items-center justify-center p-20 text-center space-y-6 bg-white/2 border-2 border-dashed border-white/5 rounded-[3rem]">
    <div className="p-8 bg-white/5 rounded-full text-slate-700">
       <Icon size={64} />
    </div>
    <div className="space-y-2 max-w-sm">
       <h3 className="text-2xl font-black text-white">{title}</h3>
       <p className="text-slate-500 font-medium">{message}</p>
    </div>
    {actionLabel && (
      <SecondaryButton onClick={onAction} className="mt-4 gap-2">
         <RefreshCcw size={16} /> {actionLabel}
      </SecondaryButton>
    )}
  </div>
);
