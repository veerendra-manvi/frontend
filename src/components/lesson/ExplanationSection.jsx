import React from 'react';
import { Lightbulb, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { Card, SectionTitle } from '../ui';

const ExplanationSection = ({ viewMode, data }) => {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {viewMode === 'beginner' ? (
        <div className="space-y-10">
          <SectionTitle title="The Family Connection" subtitle="Inheritance in simple terms." />
          <p className="text-xl text-slate-300 leading-relaxed font-black mx-auto max-w-4xl italic tracking-tight">
             "{data.beginner.explanation}"
          </p>
          <Card className="bg-brand-primary/5 border-brand-primary/10 p-10 rounded-[2.5rem] group relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-8 opacity-5"><Lightbulb className="w-[80px] h-[80px]" /></div>
              <div className="flex gap-8 items-start relative z-10">
                 <div className="p-4 bg-brand-primary/10 rounded-2xl h-fit border border-brand-primary/20 group-hover:scale-110 transition-transform shadow-xl shadow-brand-primary/10">
                    <Lightbulb className="text-brand-primary w-[32px] h-[32px]" />
                 </div>
                 <div className="space-y-4">
                    <h4 className="text-white font-black text-xl italic tracking-tight underline decoration-brand-primary/20 decoration-4 underline-offset-8">Real-World Analogy</h4>
                    <p className="text-slate-400 leading-relaxed font-medium italic">
                       {data.beginner.analogy}
                    </p>
                 </div>
              </div>
          </Card>
          <div className="p-8 bg-white/2 rounded-[2rem] border border-white/5 relative overflow-hidden group">
             <div className="absolute inset-0 bg-brand-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
             <h4 className="text-slate-500 font-black text-[10px] mb-4 uppercase tracking-[0.3em] flex items-center gap-2 italic"><Info className="w-[14px] h-[14px] text-brand-secondary" /> Why this matters</h4>
             <p className="text-slate-300 font-bold italic tracking-tight leading-relaxed">{data.beginner.whyItMatters}</p>
          </div>
        </div>
      ) : (
        <div className="space-y-12">
          <SectionTitle title="Technical Architecture" subtitle="For precision-driven developers." />
          <div className="relative">
             <div className="absolute -left-8 top-0 bottom-0 w-2 bg-brand-secondary/20 rounded-full" />
             <p className="text-xl text-slate-300 leading-relaxed font-black italic tracking-tighter pl-4">
                {data.developer.technical}
             </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-6">
                <h4 className="flex items-center gap-3 text-emerald-500 font-black text-[10px] uppercase tracking-[0.3em] italic">
                   <CheckCircle2 className="w-[16px] h-[16px]" /> Protocol Standards
                </h4>
                <ul className="space-y-4">
                   {data.developer.bestPractices.map((p, i) => (
                     <li key={i} className="flex gap-4 text-slate-400 text-sm font-medium italic group hover:text-white transition-colors">
                        <span className="text-emerald-500/30 selection:bg-none font-black">#</span> {p}
                     </li>
                   ))}
                </ul>
             </div>
             <div className="space-y-6">
                <h4 className="flex items-center gap-3 text-rose-500 font-black text-[10px] uppercase tracking-[0.3em] italic">
                   <AlertTriangle className="w-[16px] h-[16px]" /> System Risks
                </h4>
                <ul className="space-y-4">
                   {data.developer.commonMistakes.map((p, i) => (
                     <li key={i} className="flex gap-4 text-slate-400 text-sm font-medium italic group hover:text-white transition-colors">
                        <span className="text-rose-500/30 selection:bg-none font-black underline decoration-rose-500/20">!</span> {p}
                     </li>
                   ))}
                </ul>
             </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ExplanationSection;
