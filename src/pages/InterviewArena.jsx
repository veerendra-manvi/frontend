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
  Coffee
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

const iconMap = {
  Coffee: Coffee,
  Layers: Layers,
  Database: Database,
  Cpu: Cpu,
  Zap: Zap,
  Terminal: Terminal
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
    <div className="space-y-12 pb-20 max-w-7xl mx-auto">
      
      {/* 1. Hero Header */}
      <header className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-brand-primary/20 via-brand-secondary/10 to-transparent border border-white/5 p-12 lg:p-20">
         <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 blur-[120px] -mr-32 -mt-32" />
         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <Badge variant="primary" className="px-4 py-1.5 uppercase font-black tracking-[0.2em]">Prep Environment</Badge>
               <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight">
                  Java <span className="text-brand-primary italic">Interview</span> Arena.
               </h1>
               <p className="text-slate-400 text-lg max-w-md font-medium leading-relaxed">
                  Bridge the gap between syntax and employment. Master 500+ high-frequency Java interview questions with expert insights.
               </p>
               <div className="flex gap-6 pt-4">
                  <div className="flex flex-col">
                     <span className="text-3xl font-black text-white">{masteredQuestions.length}</span>
                     <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Mastered</span>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div className="flex flex-col">
                     <span className="text-3xl font-black text-brand-primary">+{masteredQuestions.length * 50}</span>
                     <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Mastery XP</span>
                  </div>
               </div>
            </div>
            
            <div className="hidden lg:flex justify-center">
               <div className="relative">
                  <div className="absolute inset-0 bg-brand-primary/20 blur-3xl rounded-full" />
                  <div className="relative bg-dark-sidebar border border-white/10 p-10 rounded-[2.5rem] shadow-2xl">
                     <Brain size={120} className="text-brand-primary animate-pulse" />
                  </div>
               </div>
            </div>
         </div>
      </header>

      {/* 2. Categories Grid */}
      <section>
         <SectionTitle title="Knowledge Spheres" subtitle="Select a category to begin your tactical practice." />
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {categoryStats.map((cat) => {
               const Icon = iconMap[cat.icon];
               return (
                 <Card 
                   key={cat.id} 
                   onClick={() => setSelectedCategory(cat)}
                   className="p-8 hover:bg-white/5 cursor-pointer group relative overflow-hidden transition-all duration-500"
                 >
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform">
                       <Icon size={100} />
                    </div>
                    
                    <div className="flex justify-between items-start mb-8 relative z-10">
                       <div className={`p-4 rounded-2xl bg-white/5 text-slate-400 group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-all`}>
                          <Icon size={32} />
                       </div>
                       <Badge variant={cat.difficulty === 'Expert' ? 'success' : 'primary'}>{cat.difficulty}</Badge>
                    </div>

                    <div className="relative z-10">
                       <h3 className="text-2xl font-bold text-white mb-2">{cat.title}</h3>
                       <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-8">{cat.total} Questions</p>
                       
                       <div className="space-y-3">
                          <div className="flex justify-between text-[10px] font-black text-slate-600 uppercase tracking-widest">
                             <span>Mastery</span>
                             <span className="text-brand-primary">{cat.progress}%</span>
                          </div>
                          <ProgressBar progress={cat.progress} showLabel={false} height="h-1.5" />
                       </div>
                    </div>
                 </Card>
               );
            })}
         </div>
      </section>

      {/* 3. Practice Modal */}
      <AnimatePresence>
         {selectedCategory && (
           <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedCategory(null)}
                className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              />
              
              <motion.div 
                initial={{ scale: 0.9, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 50, opacity: 0 }}
                className="relative w-full max-w-4xl bg-dark-bg border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[700px]"
              >
                 {/* Sidebar Progress */}
                 <div className="w-full md:w-80 bg-white/2 border-r border-white/5 p-8 flex flex-col">
                    <div className="flex items-center gap-3 mb-10">
                       <div className="p-2 bg-brand-primary/10 rounded-lg text-brand-primary"><Award size={20}/></div>
                       <h4 className="text-white font-bold">{selectedCategory.title}</h4>
                    </div>
                    
                    <div className="flex-1 space-y-2 overflow-y-auto custom-scrollbar">
                       {currentQuestions.map((q, i) => (
                         <button 
                           key={q.id}
                           onClick={() => { setActiveQuestionIndex(i); setShowAnswer(false); }}
                           className={`w-full p-4 rounded-2xl flex items-center gap-3 transition-all ${activeQuestionIndex === i ? 'bg-brand-primary text-white shadow-xl shadow-brand-primary/20' : 'text-slate-500 hover:bg-white/5'}`}
                         >
                            <span className="text-xs font-black">Q{i + 1}</span>
                            <span className="flex-1 text-left text-xs font-bold truncate">{q.question}</span>
                            {masteredQuestions.includes(q.id) && <CheckCircle2 size={14} className={activeQuestionIndex === i ? 'text-white' : 'text-emerald-500'} />}
                         </button>
                       ))}
                    </div>

                    <PrimaryButton onClick={() => setSelectedCategory(null)} className="mt-8 bg-white/5 border-none text-slate-400 hover:text-white">Exit Arena</PrimaryButton>
                 </div>

                 {/* Main Content Area */}
                 <div className="flex-1 p-10 lg:p-16 overflow-y-auto custom-scrollbar flex flex-col">
                    {currentQ ? (
                       <div className="space-y-10 flex-1">
                          <div className="space-y-4">
                             <div className="flex items-center gap-3">
                                <Badge variant="primary" className="bg-brand-primary/10 text-brand-primary border-none">QUESTION {activeQuestionIndex + 1}</Badge>
                                <div className="h-px flex-1 bg-white/5" />
                             </div>
                             <h2 className="text-3xl font-bold text-white leading-tight">{currentQ.question}</h2>
                          </div>

                          <div className="space-y-8">
                             {!showAnswer ? (
                               <button 
                                 onClick={() => setShowAnswer(true)}
                                 className="w-full p-10 border-2 border-dashed border-white/5 rounded-3xl group hover:border-brand-primary/40 hover:bg-brand-primary/5 transition-all text-center"
                               >
                                  <Eye className="mx-auto text-slate-700 group-hover:text-brand-primary mb-4" size={32} />
                                  <p className="text-slate-500 font-black uppercase text-xs tracking-widest">Unlock Expert Answer</p>
                               </button>
                             ) : (
                               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                                  <div className="p-8 bg-white/5 rounded-3xl border-l-4 border-l-brand-primary">
                                     <h5 className="text-brand-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4">The Verdict</h5>
                                     <p className="text-lg text-white font-medium leading-relaxed">{currentQ.answer}</p>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                     <div className="space-y-3">
                                        <h6 className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-widest"><Info size={16} className="text-brand-primary" /> Mechanism</h6>
                                        <p className="text-xs text-slate-400 leading-relaxed italic">"{currentQ.explanation}"</p>
                                     </div>
                                     <div className="space-y-3">
                                        <h6 className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-widest"><Brain size={16} className="text-brand-secondary" /> Follow-up</h6>
                                        <p className="text-xs text-slate-400 leading-relaxed font-bold border border-white/5 p-4 rounded-xl">{currentQ.followUp}</p>
                                     </div>
                                  </div>
                               </motion.div>
                             )}
                          </div>
                       </div>
                    ) : (
                       <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                          <Trophy size={80} className="text-slate-800" />
                          <div className="space-y-2">
                             <h3 className="text-2xl font-black text-white">Zone Cleared!</h3>
                             <p className="text-slate-500">You've reached the end of this tactical track.</p>
                          </div>
                       </div>
                    )}

                    {/* Footer Controls */}
                    {currentQ && (
                       <div className="pt-10 border-t border-white/5 mt-10 flex items-center justify-between">
                          <button 
                            onClick={() => toggleMastered(currentQ.id)}
                            className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${masteredQuestions.includes(currentQ.id) ? 'bg-emerald-500 text-white' : 'bg-white/5 text-slate-500 hover:text-white'}`}
                          >
                             {masteredQuestions.includes(currentQ.id) ? <CheckCircle2 size={16} /> : <div className="w-4 h-4 border-2 border-current rounded-full" />}
                             {masteredQuestions.includes(currentQ.id) ? 'Mastered' : 'Mark as Mastered'}
                          </button>
                          <PrimaryButton onClick={handleNext} className="gap-2 px-10">Next Question <ChevronRight size={18} /></PrimaryButton>
                       </div>
                    )}
                 </div>
              </motion.div>
           </div>
         )}
      </AnimatePresence>
    </div>
  );
};

export default InterviewArena;
