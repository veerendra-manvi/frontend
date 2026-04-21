import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PrimaryButton, SecondaryButton } from '../ui';

const LessonNavigation = () => {
  return (
    <nav className="flex justify-between items-center pt-20 border-t border-white/5">
        <SecondaryButton className="px-8 py-4 text-sm">
           <ChevronLeft size={20} /> Previous
        </SecondaryButton>
        <div className="hidden sm:flex items-center gap-2 text-slate-600 font-black text-[10px] uppercase tracking-[0.2em]">
           Step 04 / 12
        </div>
        <PrimaryButton className="px-12 py-4 text-sm font-black shadow-2xl shadow-brand-primary/30">
           Next Lesson <ChevronRight size={20} />
        </PrimaryButton>
    </nav>
  );
};

export default LessonNavigation;
