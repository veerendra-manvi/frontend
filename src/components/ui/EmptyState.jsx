import React from 'react';
import { Ghost, RefreshCcw, Search, BookOpen, Bookmark, Trophy } from 'lucide-react';
import { SecondaryButton } from './index';

const EmptyStateIcon = ({ iconId, className }) => {
  switch (iconId) {
    case 'search': return <Search className={className} />;
    case 'book': return <BookOpen className={className} />;
    case 'bookmark': return <Bookmark className={className} />;
    case 'trophy': return <Trophy className={className} />;
    case 'ghost': return <Ghost className={className} />;
    default: return <Ghost className={className} />;
  }
};

export const EmptyState = ({ title, message, iconId = 'ghost', actionLabel, onAction }) => (
  <div className="flex flex-col items-center justify-center p-20 text-center space-y-6 bg-white/2 border-2 border-dashed border-white/5 rounded-[3rem]">
    <div className="p-8 bg-white/5 rounded-full text-slate-700">
       <EmptyStateIcon iconId={iconId} className="w-[64px] h-[64px]" />
    </div>
    <div className="space-y-2 max-w-sm">
       <h3 className="text-2xl font-black text-white italic">{title}</h3>
       <p className="text-slate-500 font-medium">{message}</p>
    </div>
    {actionLabel && (
      <SecondaryButton onClick={onAction} className="mt-4 gap-2">
         <RefreshCcw className="w-[16px] h-[16px]" /> {actionLabel}
      </SecondaryButton>
    )}
  </div>
);
