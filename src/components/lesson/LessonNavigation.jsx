import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PrimaryButton, SecondaryButton } from '../ui';

const LessonNavigation = () => {
  return (
    <nav className="flex justify-between items-center pt-20 border-t border-white/5">
        <SecondaryButton className="px-8 py-4 text-[10px] font-black uppercase tracking-widest italic border-white/10 rounded-2xl">
           <ChevronLeft className="w-[18px] h-[18px] mr-2" /> Sector Previous
        </SecondaryButton>
        <div className="hidden sm:flex items-center gap-2 text-slate-800 font-black text-[10px] uppercase tracking-[0.3em] italic">
           Sequence 04 / 12
        </div>
        <PrimaryButton className="px-12 py-4 text-[10px] font-black uppercase tracking-widest italic shadow-xl shadow-brand-primary/20 rounded-2xl">
           Next Objective <ChevronRight className="w-[18px] h-[18px] ml-2" />
        </PrimaryButton>
    </nav>
  );
};

export default LessonNavigation;
