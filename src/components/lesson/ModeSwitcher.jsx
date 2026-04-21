import React from 'react';
import { GraduationCap, Hammer } from 'lucide-react';

const ModeSwitcher = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex p-1.5 bg-white/5 rounded-[1.5rem] w-fit border border-white/5 shadow-2xl">
       <button 
         onClick={() => setViewMode('beginner')}
         className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 italic ${viewMode === 'beginner' ? 'bg-brand-primary text-white shadow-xl shadow-brand-primary/20' : 'text-slate-500 hover:text-slate-300'}`}
       >
         <GraduationCap className="w-[18px] h-[18px]" /> Conceptual
       </button>
       <button 
         onClick={() => setViewMode('developer')}
         className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 italic ${viewMode === 'developer' ? 'bg-brand-secondary text-white shadow-xl shadow-brand-secondary/20' : 'text-slate-500 hover:text-slate-300'}`}
       >
         <Hammer className="w-[18px] h-[18px]" /> Developer
       </button>
    </div>
  );
};

export default ModeSwitcher;
