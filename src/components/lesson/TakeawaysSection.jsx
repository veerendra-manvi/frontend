import React from 'react';
import { CheckCircle2, BookmarkCheck } from 'lucide-react';
import { Card } from '../ui';

const TakeawaysSection = ({ data }) => {
  return (
    <section>
       <Card className="bg-emerald-500/5 border-emerald-500/10 p-12 rounded-[3rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><BookmarkCheck className="w-[100px] h-[100px]" /></div>
          <h3 className="text-3xl font-black text-white mb-10 flex items-center gap-4 italic tracking-tight underline decoration-emerald-500/20 decoration-8 underline-offset-8">
             <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 shadow-xl shadow-emerald-500/10"><CheckCircle2 className="text-emerald-500 w-[24px] h-[24px]" /></div> Core Extraction
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
             {data.takeaways.map((task, i) => (
               <div key={i} className="flex gap-6 text-slate-300 font-bold italic group/item">
                  <div className="mt-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500/40 group-hover/item:bg-emerald-500 transition-colors shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
                  <p className="leading-relaxed group-hover/item:text-white transition-colors">{task}</p>
               </div>
             ))}
          </div>
          <div className="mt-12 pt-8 border-t border-emerald-500/10 text-center">
             <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] italic">Knowledge Segment Fully Processed</span>
          </div>
       </Card>
    </section>
  );
};

export default TakeawaysSection;
