import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Brain, 
  ChevronRight, 
  CheckCircle2, 
  Lock, 
  Play, 
  Info,
  X,
  Eye,
  Award,
  Database,
  Cpu,
  Layers,
  Terminal,
  Zap,
  Coffee,
  Activity,
  Target
} from 'lucide-react';
import { 
  Card, 
  SectionTitle, 
  ProgressBar, 
  Badge, 
  PrimaryButton, 
  SecondaryButton 
} from '../components/ui';
import useProgressStore from '../store/useProgressStore';
import { interviewCategories, interviewQuestions } from '../data/interview/questions';

const CategoryIcon = ({ iconId, className }) => {
  switch (iconId) {
    case 'Coffee': return <Coffee className={className} />;
    case 'Layers': return <Layers className={className} />;
    case 'Database': return <Database className={className} />;
    case 'Cpu': return <Cpu className={className} />;
    case 'Zap': return <Zap className={className} />;
    case 'Terminal': return <Terminal className={className} />;
    default: return <Coffee className={className} />;
  }
};

const InterviewArena = () => {
  const { masteredQuestions, toggleMastered } = useProgressStore();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const categoryStats = useMemo(() => {
    return interviewCategories.map(cat => {
      const qInCat = interviewQuestions.filter(q => q.categoryId === cat.id);
      const masteredInCat = qInCat.filter(q => masteredQuestions.includes(q.id));
      return {
        ...cat,
        total: qInCat.length,
        mastered: masteredInCat.length,
        progress: qInCat.length > 0 ? Math.round((masteredInCat.length / qInCat.length) * 100) : 0
      };
    });
  }, [masteredQuestions]);

  const currentQuestions = useMemo(() => {
    if (!selectedCategory) return [];
    return interviewQuestions.filter(q => q.categoryId === selectedCategory.id);
  }, [selectedCategory]);

  const currentQ = currentQuestions[activeQuestionIndex];

  const handleNext = () => {
    setShowAnswer(false);
    if (activeQuestionIndex < currentQuestions.length - 1) {
      setActiveQuestionIndex(prev => prev + 1);
    } else {
      setSelectedCategory(null);
      setActiveQuestionIndex(0);
    }
  };

  return (
    <div className="space-y-12 pb-24 p-6 lg:p-12 max-w-7xl mx-auto">
      
      {/* 1. Hero Header */}
      <header className="relative overflow-hidden rounded-[4rem] bg-gradient-to-br from-brand-primary/20 via-brand-secondary/5 to-transparent border-2 border-white/5 p-12 lg:p-24 shadow-2xl">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/5 blur-[150px] -mr-48 -mt-48 pointer-events-none" />
         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8 text-center lg:text-left">
               <div className="flex items-center gap-4 justify-center lg:justify-start">
                  <Badge variant="primary" className="px-6 py-2 uppercase font-black tracking-[0.3em] bg-brand-primary/10 text-brand-primary border-brand-primary/20 italic text-[10px]">Strategic Preparation</Badge>
                  <div className="h-px w-20 bg-brand-primary/20 hidden lg:block" />
               </div>
               <h1 className="text-6xl lg:text-8xl font-black text-white leading-none italic tracking-tighter">
                  Interview <span className="text-brand-primary underline decoration-brand-primary/20 decoration-[16px] underline-offset-[12px]">Arena</span>.
               </h1>
               <p className="text-slate-400 text-xl max-w-lg font-bold leading-relaxed italic mx-auto lg:mx-0">
                  Execute high-fidelity interview simulations. Master 500+ synchronized knowledge units to achieve <span className="text-white">Professional Deployment Readiness</span>.
               </p>
               <div className="flex gap-16 pt-8 justify-center lg:justify-start">
                  <div className="flex flex-col text-center lg:text-left">
                     <span className="text-5xl font-black text-white tabular-nums tracking-tighter">{masteredQuestions.length}</span>
                     <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em] italic mt-2">Neural Nodes Synchronized</span>
                  </div>
                  <div className="w-px h-16 bg-white/5" />
                  <div className="flex flex-col text-center lg:text-left">
                     <span className="text-5xl font-black text-brand-primary tabular-nums tracking-tighter">+{masteredQuestions.length * 50}</span>
                     <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em] italic mt-2">Influence Points Acquired</span>
                  </div>
               </div>
            </div>
            
            <div className="hidden lg:flex justify-center">
               <div className="relative group">
                  <div className="absolute inset-0 bg-brand-primary/20 blur-[100px] rounded-full group-hover:scale-150 transition-all duration-1000 opacity-60" />
                  <div className="relative bg-[#0b0d12] border-2 border-white/10 p-16 rounded-[4.5rem] shadow-3xl group-hover:border-brand-primary/40 transition-all duration-700">
                     <Brain className="w-[160px] h-[160px] text-brand-primary animate-pulse group-hover:scale-110 transition-transform" />
                  </div>
               </div>
            </div>
         </div>
      </header>

      {/* 2. Knowledge Spheres Grid */}
      <section>
         <div className="flex items-center gap-6 mb-16 px-6">
            <div className="px-6 py-2 bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-[0.4em] w-fit rounded-full border-2 border-brand-primary/20 italic">Intelligence Spheres</div>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {categoryStats.map((cat) => {
               return (
                 <Card 
                   key={cat.id} 
                   onClick={() => setSelectedCategory(cat)}
                   className="p-10 bg-white/2 hover:bg-white/5 cursor-pointer group relative overflow-hidden transition-all duration-700 rounded-[3rem] border-2 border-white/5 hover:border-brand-primary/30 hover:-translate-y-4 shadow-3xl flex flex-col h-full"
                 >
                    <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-125 transition-transform duration-700 pointer-events-none">
                       <CategoryIcon iconId={cat.icon} className="w-[120px] h-[120px]" />
                    </div>
                    
                    <div className="flex justify-between items-start mb-12 relative z-10">
                       <div className={`p-5 rounded-2xl bg-white/2 text-slate-800 group-hover:bg-brand-primary group-hover:text-white transition-all duration-500 border-2 border-white/5 group-hover:border-brand-primary shadow-xl group-hover:rotate-6`}>
                          <CategoryIcon iconId={cat.icon} className="w-[36px] h-[36px]" />
                       </div>
                       <Badge variant={cat.difficulty === 'Expert' ? 'success' : 'primary'} className="px-5 py-1.5 italic font-black uppercase tracking-widest text-[9px] shadow-xl">{cat.difficulty} PROTOCOL</Badge>
                    </div>

                    <div className="relative z-10 flex-1">
                       <h3 className="text-3xl font-black text-white mb-3 italic tracking-tighter group-hover:text-brand-primary transition-colors">{cat.title}</h3>
                       <p className="text-[11px] text-slate-700 font-black uppercase tracking-[0.3em] mb-12 italic">{cat.total} Operational Units Identified</p>
                       
                       <div className="space-y-5 pt-8 border-t border-white/5">
                          <div className="flex justify-between text-[10px] font-black text-slate-800 uppercase tracking-[0.4em] italic">
                             <span>Synchronization Status</span>
                             <span className="text-brand-primary font-black">{cat.progress}%</span>
                          </div>
                          <ProgressBar progress={cat.progress} showLabel={false} height="h-3" />
                       </div>
                    </div>
                 </Card>
               );
            })}
         </div>
      </section>

      {/* 3. Neural Simulation Overlay */}
      <AnimatePresence>
         {selectedCategory && (
           <div className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-12 overflow-hidden">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedCategory(null)}
                className="absolute inset-0 bg-black/95 backdrop-blur-[100px]"
              />
              
              <motion.div 
                initial={{ scale: 0.9, y: 100, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 100, opacity: 0 }}
                className="relative w-full max-w-6xl bg-[#08090e] border-2 border-white/10 rounded-[4rem] shadow-[0_0_100px_rgba(248,152,32,0.15)] overflow-hidden flex flex-col md:flex-row h-[85vh]"
              >
                 {/* Sidebar Navigation */}
                 <div className="w-full md:w-96 bg-white/2 border-r-2 border-white/5 p-12 flex flex-col backdrop-blur-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none rotate-45"><Activity className="w-[150px] h-[150px] text-white" /></div>
                    <div className="flex items-center gap-5 mb-16 relative z-10">
                       <div className="p-4 bg-brand-primary/10 rounded-2xl text-brand-primary border-2 border-brand-primary/20 shadow-xl shadow-brand-primary/5"><Award className="w-[24px] h-[24px]"/></div>
                       <div className="flex flex-col">
                          <h4 className="text-white font-black italic tracking-tighter text-lg leading-tight uppercase">{selectedCategory.title}</h4>
                          <span className="text-[9px] font-black text-slate-700 uppercase tracking-[0.3em] mt-1">Simulated Session</span>
                       </div>
                    </div>
                    
                    <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar pr-4 relative z-10">
                       {currentQuestions.map((q, i) => (
                         <button 
                           key={q.id}
                           onClick={() => { setActiveQuestionIndex(i); setShowAnswer(false); }}
                           className={`w-full p-6 rounded-[2rem] flex items-center gap-5 transition-all border-2 relative h-20 overflow-hidden group ${activeQuestionIndex === i ? 'bg-brand-primary border-brand-primary text-white shadow-[0_20px_40px_rgba(248,152,32,0.3)] scale-[1.05]' : 'text-slate-500 bg-white/1 border-white/5 hover:bg-white/5 hover:border-white/10'}`}
                         >
                            <span className={`text-[11px] font-black italic shrink-0 ${activeQuestionIndex === i ? 'text-white' : 'text-slate-800'}`}>0{i + 1}</span>
                            <span className="flex-1 text-left text-xs font-black truncate italic tracking-tight">{q.question}</span>
                            {masteredQuestions.includes(q.id) && (
                              <div className={`p-1 rounded-md border ${activeQuestionIndex === i ? 'bg-white/20 border-white/40' : 'bg-emerald-500/10 border-emerald-500/30'}`}>
                                <CheckCircle2 className={`w-[14px] h-[14px] ${activeQuestionIndex === i ? 'text-white' : 'text-emerald-500'}`} />
                              </div>
                            )}
                         </button>
                       ))}
                    </div>

                    <button onClick={() => setSelectedCategory(null)} className="mt-12 w-full p-5 bg-white/2 border-2 border-white/5 text-slate-800 font-black uppercase text-[10px] tracking-[0.4em] italic rounded-[2rem] hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/20 transition-all active:scale-95">Termimate Simulation</button>
                 </div>

                 {/* Questions Engine */}
                 <div className="flex-1 p-12 lg:p-24 overflow-y-auto custom-scrollbar flex flex-col bg-gradient-to-br from-black/40 to-transparent">
                    <AnimatePresence mode="wait">
                       <motion.div 
                         key={activeQuestionIndex}
                         initial={{ opacity: 0, x: 100 }}
                         animate={{ opacity: 1, x: 0 }}
                         exit={{ opacity: 0, x: -100 }}
                         className="flex-1 flex flex-col"
                         transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                       >
                          {currentQ ? (
                             <div className="space-y-16 flex-1">
                                <div className="space-y-8">
                                   <div className="flex items-center gap-6">
                                      <Badge variant="primary" className="bg-brand-primary/10 text-brand-primary border-2 border-brand-primary/20 px-6 py-2 italic font-black uppercase tracking-[0.3em] text-[10px]">OPERATIONAL PROMPT 0{activeQuestionIndex + 1}</Badge>
                                      <div className="h-0.5 flex-1 bg-white/5 rounded-full" />
                                   </div>
                                   <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight italic tracking-tighter drop-shadow-2xl">{currentQ.question}</h2>
                                </div>

                                <div className="space-y-16">
                                   {!showAnswer ? (
                                     <button 
                                       onClick={() => setShowAnswer(true)}
                                       className="w-full p-20 lg:p-32 border-4 border-dashed border-white/5 rounded-[4rem] group hover:border-brand-primary/30 hover:bg-brand-primary/5 transition-all text-center relative overflow-hidden group shadow-inner"
                                     >
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(248,152,32,0.05)_0%,transparent_70%)] pointer-events-none" />
                                        <div className="relative z-10">
                                           <div className="p-8 bg-white/5 rounded-full w-fit mx-auto mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-2xl">
                                              <Eye className="text-slate-800 group-hover:text-brand-primary w-[64px] h-[64px] transition-all" />
                                           </div>
                                           <p className="text-slate-700 font-black uppercase text-[12px] tracking-[0.4em] group-hover:text-brand-primary transition-colors italic">Decrypt Tactical Intel</p>
                                        </div>
                                     </button>
                                   ) : (
                                     <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-16">
                                        <div className="p-12 lg:p-16 bg-white/2 rounded-[4rem] border-l-[12px] border-brand-primary shadow-3xl relative overflow-hidden group">
                                           <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform duration-1000"><Zap className="w-[150px] h-[150px] text-white" /></div>
                                           <h5 className="text-brand-primary text-[11px] font-black uppercase tracking-[0.4em] mb-10 italic flex items-center gap-3">
                                              <Zap className="w-[18px] h-[18px] fill-brand-primary/20" /> Strategic Solution Node
                                           </h5>
                                           <p className="text-2xl lg:text-3xl text-white font-bold leading-relaxed italic drop-shadow-lg pr-12">{currentQ.answer}</p>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                           <div className="space-y-6">
                                              <h6 className="flex items-center gap-4 text-white font-black text-[11px] uppercase tracking-[0.3em] italic group"><div className="p-2 bg-brand-primary/10 rounded-lg"><Info className="w-[18px] h-[18px] text-brand-primary" /></div> Logic Framework</h6>
                                              <p className="text-[15px] text-slate-500 leading-relaxed font-bold italic border-l-4 border-white/5 pl-8">"{currentQ.explanation}"</p>
                                           </div>
                                           <div className="space-y-6">
                                              <h6 className="flex items-center gap-4 text-white font-black text-[11px] uppercase tracking-[0.3em] italic group"><div className="p-2 bg-brand-secondary/10 rounded-lg"><Target className="w-[18px] h-[18px] text-brand-secondary" /></div> Adaptive Follow-up</h6>
                                              <div className="text-[12px] text-slate-400 leading-relaxed font-black border-2 border-white/5 bg-white/1 p-8 rounded-[2rem] italic tracking-tight shadow-xl">
                                                 {currentQ.followUp}
                                              </div>
                                           </div>
                                        </div>
                                     </motion.div>
                                   )}
                                </div>
                             </div>
                          ) : (
                             <div className="flex-1 flex flex-col items-center justify-center text-center space-y-12">
                                <div className="p-16 bg-white/2 rounded-full border-2 border-white/5 shadow-3xl">
                                   <Trophy className="w-[120px] h-[120px] text-brand-primary/10" />
                                </div>
                                <div className="space-y-4">
                                   <h3 className="text-5xl font-black text-white italic tracking-tighter">SIMULATION_COMPLETE</h3>
                                   <p className="text-brand-primary font-black text-xl uppercase tracking-[0.4em] italic">Full Dominance Detected</p>
                                </div>
                             </div>
                          )}

                          {currentQ && (
                             <div className="pt-16 border-t-2 border-white/5 mt-20 flex items-center justify-between gap-10 sticky bottom-0 bg-[#08090e]/80 backdrop-blur-3xl p-6 rounded-[3rem]">
                                <button 
                                  onClick={() => toggleMastered(currentQ.id)}
                                  className={`flex items-center gap-5 px-10 py-5 rounded-3xl text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-[0_20px_50px_rgba(0,0,0,0.5)] active:scale-95 ${masteredQuestions.includes(currentQ.id) ? 'bg-emerald-500 text-white shadow-emerald-500/30 border-2 border-emerald-400' : 'bg-white/5 text-slate-800 border-2 border-white/10 hover:text-white hover:bg-white/10 hover:border-white/20'}`}
                                >
                                   {masteredQuestions.includes(currentQ.id) ? <CheckCircle2 className="w-[20px] h-[20px]" /> : <div className="w-5 h-5 border-4 border-slate-900 rounded-full" />}
                                   <span className="italic">{masteredQuestions.includes(currentQ.id) ? 'Influence Synced' : 'Sync Knowledge'}</span>
                                </button>
                                <PrimaryButton onClick={handleNext} className="h-20 px-16 rounded-[2rem] text-xs font-black uppercase tracking-[0.3em] italic shadow-2xl shadow-brand-primary/40">
                                   <span className="flex items-center gap-4">
                                      Next Simulation <ChevronRight className="w-[24px] h-[24px]" />
                                   </span>
                                </PrimaryButton>
                             </div>
                          )}
                       </motion.div>
                    </AnimatePresence>
                 </div>
              </motion.div>
           </div>
         )}
      </AnimatePresence>

      {/* Background Decor */}
      <div className="fixed bottom-0 right-10 p-12 opacity-5 pointer-events-none select-none">
         <Target className="w-[450px] h-[450px] text-white" />
      </div>
      <div className="fixed top-24 left-10 p-20 opacity-5 pointer-events-none select-none">
         <Activity className="w-[300px] h-[300px] text-white rotate-12" />
      </div>
    </div>
  );
};

export default InterviewArena;
