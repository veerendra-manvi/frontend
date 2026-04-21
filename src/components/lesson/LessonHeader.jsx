import React from 'react';
import { Clock, ChevronRight } from 'lucide-react';
import { Card, Badge, ProgressBar } from '../ui';

const LessonHeader = ({ data }) => {
  return (
    <header className="mb-10 p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-brand-primary/20 via-transparent to-brand-secondary/5 border border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full -mr-64 -mt-64 blur-[100px]" />
      
      <div className="relative z-10 space-y-6">
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
           {data.path.split(' > ').map((p, i, arr) => (
             <React.Fragment key={p}>
               <span className={i === arr.length - 1 ? 'text-brand-primary' : ''}>{p}</span>
               {i < arr.length - 1 && <ChevronRight size={10} />}
             </React.Fragment>
           ))}
        </div>
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-3">
               <Badge variant="primary">{data.difficulty}</Badge>
               <div className="flex items-center gap-1.5 text-slate-400 text-sm font-semibold ml-2">
                  <Clock size={16} /> {data.time}
               </div>
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-[1.1]">
              {data.title}
            </h1>
          </div>
          
          <Card className="w-full lg:w-72 bg-dark-bg/60 backdrop-blur-xl border-white/10 p-6">
             <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Progress</span>
                <span className="text-brand-primary font-bold">{data.progress}%</span>
             </div>
             <ProgressBar progress={data.progress} showLabel={false} height="h-2" />
          </Card>
        </div>
      </div>
    </header>
  );
};

export default LessonHeader;
