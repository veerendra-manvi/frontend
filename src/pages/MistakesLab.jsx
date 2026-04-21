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
  CheckCircle2,
  XCircle,
  Lightbulb,
  Activity,
  Target
} from 'lucide-react';
import { 
  Card, 
  SectionTitle, 
  Badge, 
  PrimaryButton 
} from '../components/ui';
import { javaMistakes } from '../data/mistakes/content';

const MistakesLab = () => {
  const [activeMistake, setActiveMistake] = useState(null);

  return (
    <div className="space-y-12 pb-24 p-6 lg:p-12 max-w-7xl mx-auto">
      
      {/* 1. Header Section */}
      <header className="relative p-12 lg:p-24 bg-dark-sidebar/40 border-2 border-white/5 rounded-[4rem] overflow-hidden shadow-2xl">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/5 blur-[120px] rounded-full -mr-48 -mt-48 pointer-events-none" />
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">
            <div className="space-y-8 max-w-2xl text-center md:text-left">
               <div className="flex items-center gap-4 justify-center md:justify-start">
                  <Badge variant="ghost" className="text-rose-500 bg-rose-500/10 border-rose-500/20 px-6 py-2 uppercase font-black tracking-[0.3em] text-[10px] italic">Vulnerability Analysis</Badge>
                  <div className="h-px w-20 bg-rose-500/20 hidden md:block" />
               </div>
               <h1 className="text-6xl lg:text-8xl font-black text-white leading-none italic tracking-tighter">
                  The <span className="text-rose-500 underline decoration-rose-500/20 decoration-[16px] underline-offset-8">Mistakes</span> Lab.
               </h1>
               <p className="text-slate-400 text-xl font-bold italic leading-relaxed">
                  Elite developers are defined by their error recovery. Master the <span className="text-white">50 most critical</span> Java pitfalls detected in production clusters.
               </p>
            </div>
            <div className="relative group">
               <div className="absolute inset-0 bg-rose-500/20 blur-[100px] rounded-full group-hover:scale-150 transition-all duration-1000 opacity-60" />
               <div className="relative p-12 bg-[#0b0d12] border-2 border-white/10 rounded-[3.5rem] shadow-3xl group-hover:border-rose-500/40 transition-all duration-700">
                  <Bug className="w-[120px] h-[120px] text-rose-500 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
               </div>
            </div>
         </div>
      </header>

      {/* 2. Risks Grid */}
      <section>
         <div className="flex items-center gap-6 mb-16 px-6">
            <div className="px-6 py-2 bg-rose-500/10 text-rose-500 text-[10px] font-black uppercase tracking-[0.4em] w-fit rounded-full border-2 border-rose-500/20 italic">Critical Vulnerabilities</div>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {javaMistakes.map((mistake) => (
              <motion.div
                key={mistake.id}
                whileHover={{ y: -12 }}
                transition={{ type: 'spring', damping: 20 }}
              >
                <Card className="h-full p-0 overflow-hidden border-2 border-white/5 bg-white/2 group cursor-pointer rounded-[3rem] hover:bg-white/5 hover:border-rose-500/20 shadow-2xl transition-all duration-500 flex flex-col" onClick={() => setActiveMistake(mistake)}>
                   <div className="p-8 border-b-2 border-white/5 flex justify-between items-center bg-white/1 relative z-20">
                      <div className="flex gap-4">
                         {mistake.tags.map(t => <span key={t} className="text-[8px] font-black uppercase text-slate-700 tracking-[0.3em] italic">{t}</span>)}
                      </div>
                      <Badge 
                        variant={mistake.severity === 'Critical' ? 'success' : 'primary'} 
                        className={mistake.severity === 'Critical' ? 'bg-rose-500/10 text-rose-500 border-none px-4 py-1.5 font-black uppercase italic tracking-widest text-[9px]' : 'px-4 py-1.5 font-black uppercase italic tracking-widest text-[9px]'}
                      >
                         {mistake.severity} RISK
                      </Badge>
                   </div>
                   
                   <div className="p-10 space-y-8 flex-1 flex flex-col relative z-20">
                      <h3 className="text-2xl font-black text-white group-hover:text-rose-500 transition-colors uppercase tracking-tight italic leading-tight underline decoration-white/5 decoration-4 group-hover:decoration-rose-500/20 underline-offset-8">{mistake.title}</h3>
                      
                      <div className="p-6 bg-black/40 rounded-[2rem] border-2 border-white/5 font-mono text-sm overflow-hidden text-rose-400 group-hover:bg-black/60 transition-colors relative">
                         <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform"><AlertTriangle className="w-[48px] h-[48px]" /></div>
                         <div className="flex items-center gap-3 mb-4 text-[10px] uppercase font-black text-slate-700 tracking-[0.4em] italic leading-none">
                            <XCircle className="w-[14px] h-[14px] text-rose-500" /> Buggy Pattern
                         </div>
                         <pre className="whitespace-pre-wrap italic font-bold leading-relaxed">{mistake.buggy.slice(0, 100)}...</pre>
                      </div>

                      <div className="flex items-center justify-between pt-8 border-t border-white/5 mt-auto">
                         <span className="text-[9px] font-black text-slate-700 uppercase tracking-[0.4em] flex items-center gap-3 italic">
                            <Info className="w-[16px] h-[16px] text-brand-primary" /> Analysis Void
                         </span>
                         <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-800 group-hover:bg-rose-500 group-hover:text-white transition-all shadow-xl border border-white/5 group-hover:rotate-6">
                            <ChevronRight className="w-[20px] h-[20px]" />
                         </div>
                      </div>
                   </div>
                </Card>
              </motion.div>
            ))}
         </div>
      </section>

      {/* 3. Detailed Neural Reveal Modal */}
      <AnimatePresence>
         {activeMistake && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6 lg:p-12">
               <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                 onClick={() => setActiveMistake(null)}
                 className="absolute inset-0 bg-black/95 backdrop-blur-[100px]"
              />
               
               <motion.div 
                 initial={{ scale: 0.9, y: 100, opacity: 0 }}
                 animate={{ scale: 1, y: 0, opacity: 1 }}
                 exit={{ scale: 0.9, y: 100, opacity: 0 }}
                 className="relative w-full max-w-6xl bg-[#08090e] border-2 border-white/10 rounded-[4rem] shadow-[0_0_100px_rgba(244,63,94,0.15)] overflow-hidden p-12 lg:p-24 max-h-[90vh] overflow-y-auto custom-scrollbar"
               >
                  <button onClick={() => setActiveMistake(null)} className="absolute top-12 right-12 p-4 bg-white/2 hover:bg-rose-500/10 text-slate-700 hover:text-rose-500 transition-all rounded-[1.5rem] border-2 border-white/5 hover:border-rose-500/20 active:scale-90">
                     <XCircle className="w-[32px] h-[32px]" />
                  </button>

                  <div className="space-y-16">
                     <div className="space-y-6">
                        <div className="flex items-center gap-6">
                           <Badge variant="primary" className="bg-rose-500/10 text-rose-500 border-2 border-rose-500/20 px-6 py-2 uppercase font-black tracking-[0.3em] text-[10px] italic shadow-xl">Root Cause Analysis</Badge>
                           <div className="h-0.5 flex-1 bg-white/5" />
                        </div>
                        <h2 className="text-4xl lg:text-7xl font-black text-white italic tracking-tighter leading-none underline decoration-white/5 decoration-8 underline-offset-[12px]">{activeMistake.title}</h2>
                     </div>

                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div className="space-y-8">
                           <div className="p-10 bg-rose-500/5 border-2 border-rose-500/20 rounded-[3rem] relative overflow-hidden group shadow-2xl">
                              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-125 transition-transform duration-1000"><Bug className="w-[100px] h-[100px] text-rose-500" /></div>
                              <h4 className="text-rose-500 font-black text-[11px] uppercase tracking-[0.4em] mb-10 flex items-center gap-3 italic"><XCircle className="w-[18px] h-[18px]"/> The Critical Failure</h4>
                              <div className="p-8 bg-black/60 rounded-[2rem] border-2 border-white/5 font-mono text-[15px] text-rose-400 mb-10 shadow-inner group-hover:bg-black/80 transition-colors">
                                 <pre className="whitespace-pre-wrap italic font-bold">{activeMistake.buggy}</pre>
                              </div>
                              <p className="text-[15px] text-slate-400 font-bold leading-relaxed italic border-t-2 border-rose-500/10 pt-10">
                                 {activeMistake.failReason}
                              </p>
                           </div>
                        </div>

                        <div className="space-y-8">
                           <div className="p-10 bg-emerald-500/5 border-2 border-emerald-500/20 rounded-[3rem] relative overflow-hidden group shadow-2xl">
                              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-125 transition-transform duration-1000"><ShieldCheck className="w-[100px] h-[100px] text-emerald-500" /></div>
                              <h4 className="text-emerald-500 font-black text-[11px] uppercase tracking-[0.4em] mb-10 flex items-center gap-3 italic"><CheckCircle2 className="w-[18px] h-[18px]"/> The Elite Protocol</h4>
                              <div className="p-8 bg-black/60 rounded-[2rem] border-2 border-white/5 font-mono text-[15px] text-emerald-400 mb-10 font-black shadow-inner group-hover:bg-black/80 transition-colors">
                                 <pre className="whitespace-pre-wrap font-black">{activeMistake.fix}</pre>
                              </div>
                              <div className="p-8 bg-white/2 border-2 border-white/5 rounded-[2rem] flex gap-6 items-start shadow-xl relative overflow-hidden group/tip">
                                 <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover/tip:opacity-100 transition-opacity" />
                                 <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-500 border border-emerald-500/20 shadow-xl group-hover/tip:rotate-12 transition-all"><Lightbulb className="w-[24px] h-[24px]" /></div>
                                 <div className="space-y-2 relative z-10">
                                    <p className="text-[10px] font-black uppercase text-emerald-500 tracking-[0.4em] italic mb-3">Architect Directive</p>
                                    <p className="text-[13px] text-slate-500 leading-relaxed font-bold italic">{activeMistake.tip}</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="pt-16 border-t-2 border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
                        <div className="flex gap-6">
                           <div className="px-8 py-3 bg-white/2 rounded-[1.5rem] border-2 border-white/5 text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] flex items-center gap-3 italic shadow-xl">
                              <Zap className="w-[16px] h-[16px] text-brand-primary" fill="currentColor" /> System impact: HIGH
                           </div>
                           <div className="px-8 py-3 bg-white/2 rounded-[1.5rem] border-2 border-white/5 text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] flex items-center gap-3 italic shadow-xl">
                              <Terminal className="w-[16px] h-[16px] text-brand-secondary" /> Runtime Defense: ARMED
                           </div>
                        </div>
                        <PrimaryButton onClick={() => setActiveMistake(null)} className="h-16 px-16 text-[10px] font-black uppercase tracking-[0.3em] italic rounded-[2rem] shadow-2xl shadow-brand-primary/40 active:scale-95 transition-all">Analysis Synchronized</PrimaryButton>
                     </div>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>

      {/* Decorative Branding */}
      <div className="fixed bottom-0 right-10 p-12 opacity-5 pointer-events-none select-none">
         <Target className="w-[450px] h-[450px] text-white" />
      </div>
      <div className="fixed top-24 left-10 p-20 opacity-5 pointer-events-none select-none">
         <Activity className="w-[300px] h-[300px] text-white -rotate-12" />
      </div>
    </div>
  );
};

export default MistakesLab;
