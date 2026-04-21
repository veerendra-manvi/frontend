import React from 'react';
import { GraduationCap, Hammer } from 'lucide-react';

const ModeSwitcher = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex p-1.5 bg-white/5 rounded-2xl w-fit">
       <button 
         onClick={() => setViewMode('beginner')}
         className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${viewMode === 'beginner' ? 'bg-brand-primary text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
       >
         <GraduationCap size={18} /> Beginner Mode
       </button>
       <button 
         onClick={() => setViewMode('developer')}
         className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${viewMode === 'developer' ? 'bg-brand-secondary text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
       >
         <Hammer size={18} /> Developer Mode
       </button>
    </div>
  );
};

export default ModeSwitcher;
