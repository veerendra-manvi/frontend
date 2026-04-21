import React from 'react';
import { Clock, ChevronRight } from 'lucide-react';
import { Card, Badge, ProgressBar } from '../ui';

const LessonHeader = ({ data }) => {
  return (
    <header className="mb-10 p-8 md:p-12 rounded-[3rem] bg-gradient-to-br from-brand-primary/20 via-transparent to-brand-secondary/5 border border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full -mr-64 -mt-64 blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 space-y-8">
        <div className="flex flex-wrap items-center gap-3 text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 italic">
           {data.path.split(' > ').map((p, i, arr) => (
             <React.Fragment key={p}>
               <span className={i === arr.length - 1 ? 'text-brand-primary' : ''}>{p}</span>
               {i < arr.length - 1 && <ChevronRight className="w-[10px] h-[10px]" />}
             </React.Fragment>
           ))}
        </div>
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-4">
               <Badge variant="primary" className="px-4 py-1 italic font-black uppercase tracking-widest">{data.difficulty}</Badge>
               <div className="flex items-center gap-2 text-slate-500 text-xs font-black uppercase tracking-widest italic ml-2">
                  <Clock className="w-[16px] h-[16px] text-brand-primary" /> {data.time}
               </div>
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[1.05] italic underline decoration-white/5 decoration-8 underline-offset-[16px]">
              {data.title}
            </h1>
          </div>
          
          <Card className="w-full lg:w-80 bg-white/2 backdrop-blur-2xl border-white/5 p-8 rounded-[2rem] shadow-2xl relative group overflow-hidden">
             <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="flex justify-between items-center mb-4 relative z-10">
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] italic">System Mastery</span>
                <span className="text-brand-primary font-black italic">{data.progress}%</span>
             </div>
             <ProgressBar progress={data.progress} showLabel={false} height="h-2.5" />
             <div className="mt-4 text-[8px] font-black text-slate-600 uppercase tracking-widest text-center italic">Deployment Readiness</div>
          </Card>
        </div>
      </div>
    </header>
  );
};

export default LessonHeader;
