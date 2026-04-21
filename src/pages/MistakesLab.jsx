import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bug, 
  ShieldCheck, 
  AlertTriangle, 
  ChevronRight, 
  RotateCcw, 
  Terminal, 
  Zap, 
  Info,
  Code,
  CheckCircle2,
  XCircle,
  Lightbulb
} from 'lucide-react';
import { 
  Card, 
  SectionTitle, 
  Badge, 
  PrimaryButton, 
  SecondaryButton 
} from '../components/ui';
import { javaMistakes } from '../data/mistakes/content';

const MistakesLab = () => {
  const [activeMistake, setActiveMistake] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="space-y-12 pb-20 max-w-7xl mx-auto">
      
      {/* 1. Header Section */}
      <header className="relative p-12 lg:p-20 bg-dark-sidebar/40 border border-white/5 rounded-[3rem] overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(244,63,94,0.05)_0%,transparent_50%)]" />
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-6 max-w-2xl text-center md:text-left">
               <Badge variant="ghost" className="text-rose-500 bg-rose-500/10 border-rose-500/20 px-6 py-2 uppercase font-black tracking-widest">Risk Analysis Lab</Badge>
               <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight underline decoration-rose-500/30 decoration-8 underline-offset-8">
                  The <span className="text-rose-500">Mistakes</span> Lab.
               </h1>
               <p className="text-slate-400 text-lg font-medium leading-relaxed">
                  Senior developers aren't people who don't make mistakes—they're people who know exactly how to fix them. Master the 50 most common Java pitfalls.
               </p>
            </div>
            <div className="relative">
               <div className="absolute inset-0 bg-rose-500/20 blur-3xl rounded-full animate-pulse" />
               <div className="relative p-10 bg-dark-bg border border-white/10 rounded-[2.5rem] shadow-2xl">
                  <Bug size={100} className="text-rose-500" />
               </div>
            </div>
         </div>
      </header>

      {/* 2. Mistakes Grid */}
      <section>
         <SectionTitle title="Critical Vulnerabilities" subtitle="Analyze the buggy code, then reveal the professional fix." />
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {javaMistakes.map((mistake) => (
              <motion.div
                key={mistake.id}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', damping: 15 }}
              >
                <Card className="h-full p-0 overflow-hidden border-white/5 bg-white/2 group cursor-pointer" onClick={() => setActiveMistake(mistake)}>
                   <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/2">
                      <div className="flex gap-2">
                         {mistake.tags.map(t => <span key={t} className="text-[9px] font-black uppercase text-slate-500 tracking-widest">{t}</span>)}
                      </div>
                      <Badge 
                        variant={mistake.severity === 'Critical' ? 'success' : 'primary'} 
                        className={mistake.severity === 'Critical' ? 'bg-rose-500/10 text-rose-500 border-none' : ''}
                      >
                         {mistake.severity}
                      </Badge>
                   </div>
                   
                   <div className="p-8 space-y-6">
                      <h3 className="text-xl font-bold text-white group-hover:text-rose-500 transition-colors uppercase tracking-tight">{mistake.title}</h3>
                      
                      <div className="p-5 bg-black/40 rounded-2xl border border-white/5 font-mono text-sm overflow-hidden text-rose-400/80">
                         <div className="flex items-center gap-2 mb-3 text-[10px] uppercase font-black text-slate-700 tracking-widest">
                            <XCircle size={12} className="text-rose-500" /> Buggy Pattern
                         </div>
                         <pre className="whitespace-pre-wrap">{mistake.buggy.slice(0, 100)}...</pre>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                         <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2">
                            <Info size={14} /> Knowledge Gap
                         </span>
                         <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-500 group-hover:bg-brand-primary group-hover:text-white transition-all">
                            <ChevronRight size={18} />
                         </div>
                      </div>
                   </div>
                </Card>
              </motion.div>
            ))}
         </div>
      </section>

      {/* 3. Detailed Reveal Modal */}
      <AnimatePresence>
         {activeMistake && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
               <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                 onClick={() => { setActiveMistake(null); setIsFlipped(false); }}
                 className="absolute inset-0 bg-black/90 backdrop-blur-xl"
               />
               
               <motion.div 
                 initial={{ scale: 0.9, y: 50, opacity: 0 }}
                 animate={{ scale: 1, y: 0, opacity: 1 }}
                 exit={{ scale: 0.9, y: 50, opacity: 0 }}
                 className="relative w-full max-w-4xl bg-dark-bg border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden p-10 lg:p-16"
               >
                  <button onClick={() => setActiveMistake(null)} className="absolute top-10 right-10 text-slate-500 hover:text-white transition-colors">
                     <XCircle size={32} />
                  </button>

                  <div className="space-y-12">
                     <div className="space-y-2">
                        <Badge variant="primary" className="bg-rose-500/10 text-rose-500 border-none uppercase font-black tracking-widest">Detailed Analysis</Badge>
                        <h2 className="text-4xl font-black text-white italic">{activeMistake.title}</h2>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* THE BUG */}
                        <div className="space-y-6">
                           <div className="p-8 bg-rose-500/5 border border-rose-500/20 rounded-[2.5rem] relative overflow-hidden group">
                              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform"><Bug size={48} className="text-rose-500" /></div>
                              <h4 className="text-rose-500 font-black text-[10px] uppercase tracking-[0.2em] mb-6 flex items-center gap-2"><XCircle size={14}/> The Pitfall</h4>
                              <div className="p-4 bg-black/40 rounded-2xl border border-white/5 font-mono text-sm text-rose-400 mb-6">
                                 <pre className="whitespace-pre-wrap">{activeMistake.buggy}</pre>
                              </div>
                              <p className="text-sm text-slate-400 font-medium leading-relaxed italic border-t border-rose-500/10 pt-6">
                                 {activeMistake.failReason}
                              </p>
                           </div>
                        </div>

                        {/* THE FIX */}
                        <div className="space-y-6">
                           <div className="p-8 bg-emerald-500/5 border border-emerald-500/20 rounded-[2.5rem] relative overflow-hidden group">
                              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform"><ShieldCheck size={48} className="text-emerald-500" /></div>
                              <h4 className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.2em] mb-6 flex items-center gap-2"><CheckCircle2 size={14}/> The Fix</h4>
                              <div className="p-4 bg-black/40 rounded-2xl border border-white/5 font-mono text-sm text-emerald-400 mb-6 font-bold">
                                 <pre className="whitespace-pre-wrap">{activeMistake.fix}</pre>
                              </div>
                              <div className="p-6 bg-white/2 border border-white/5 rounded-2xl flex gap-4 items-start">
                                 <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500"><Lightbulb size={18} /></div>
                                 <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase text-emerald-500 tracking-widest">Coach Tip</p>
                                    <p className="text-xs text-slate-400 leading-relaxed font-medium">{activeMistake.tip}</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex gap-4">
                           <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                              <Zap size={14} className="text-brand-primary" /> Memory Impact: High
                           </div>
                           <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                              <Terminal size={14} className="text-brand-secondary" /> Runtime Safety
                           </div>
                        </div>
                        <PrimaryButton onClick={() => setActiveMistake(null)} className="px-10">Analysis Complete</PrimaryButton>
                     </div>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>
    </div>
  );
};

export default MistakesLab;
