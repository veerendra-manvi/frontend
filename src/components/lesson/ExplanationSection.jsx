import React from 'react';
import { Lightbulb, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Card, SectionTitle } from '../ui';

const ExplanationSection = ({ viewMode, data }) => {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {viewMode === 'beginner' ? (
        <div className="space-y-8">
          <SectionTitle title="The Family Connection" subtitle="Inheritance in simple terms." />
          <p className="text-xl text-slate-300 leading-relaxed font-medium">
             {data.beginner.explanation}
          </p>
          <Card className="bg-brand-primary/5 border-brand-primary/20 p-8 group">
             <div className="flex gap-6">
                <div className="p-4 bg-brand-primary/10 rounded-2xl h-fit group-hover:scale-110 transition-transform">
                   <Lightbulb className="text-brand-primary w-8 h-8" />
                </div>
                <div className="space-y-3">
                   <h4 className="text-white font-bold text-lg">Real-World Analogy</h4>
                   <p className="text-slate-400 leading-relaxed font-medium">
                      {data.beginner.analogy}
                   </p>
                </div>
             </div>
          </Card>
          <div className="p-6 bg-slate-400/5 rounded-2xl border-l-4 border-slate-400/20">
             <h4 className="text-white font-bold text-sm mb-2 uppercase tracking-widest opacity-60">Why this matters</h4>
             <p className="text-slate-300 font-medium">{data.beginner.whyItMatters}</p>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <SectionTitle title="Technical Architecture" subtitle="For precision-driven developers." />
          <p className="text-xl text-slate-300 leading-relaxed font-semibold">
             {data.developer.technical}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-4">
                <h4 className="flex items-center gap-2 text-emerald-500 font-bold text-sm uppercase tracking-widest">
                   <CheckCircle2 size={16} /> Best Practices
                </h4>
                <ul className="space-y-3">
                   {data.developer.bestPractices.map((p, i) => (
                     <li key={i} className="flex gap-3 text-slate-400 text-sm font-medium">
                        <span className="text-emerald-500/50 selection:bg-none">•</span> {p}
                     </li>
                   ))}
                </ul>
             </div>
             <div className="space-y-4">
                <h4 className="flex items-center gap-2 text-rose-500 font-bold text-sm uppercase tracking-widest">
                   <AlertTriangle size={16} /> Common Pitfalls
                </h4>
                <ul className="space-y-3">
                   {data.developer.commonMistakes.map((p, i) => (
                     <li key={i} className="flex gap-3 text-slate-400 text-sm font-medium">
                        <span className="text-rose-500/50">•</span> {p}
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
