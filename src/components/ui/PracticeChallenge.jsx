import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Lightbulb, 
  Eye, 
  CheckCircle2, 
  Save, 
  AlertCircle,
  Terminal,
  Eraser
} from 'lucide-react';
import { Card, Badge, PrimaryButton, SecondaryButton } from './index';
import useProgressStore from '../../store/useProgressStore';

const PracticeChallenge = ({ 
  challengeId = "default-challenge", 
  type = "predict", 
  title = "Challenge", 
  prompt = "", 
  codeSnippet = "",
  hint = "",
  solution = "",
  onComplete 
}) => {
  const [userInput, setUserInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`practice-${challengeId}`);
    if (saved) {
      const data = JSON.parse(saved);
      setUserInput(data.input || '');
      setIsCompleted(data.completed || false);
    }
  }, [challengeId]);

  const completePractice = useProgressStore((state) => state.completePractice);

  const handleSave = () => {
    const data = { input: userInput, completed: isCompleted };
    localStorage.setItem(`practice-${challengeId}`, JSON.stringify(data));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleComplete = () => {
    setIsCompleted(true);
    completePractice(challengeId);
    if (onComplete) onComplete(userInput);
    handleSave();
  };

  const clearInput = () => {
    if (window.confirm("Are you sure you want to clear your code?")) {
      setUserInput('');
    }
  };

  return (
    <Card className={`border-2 transition-all duration-500 overflow-hidden rounded-[2.5rem] bg-dark-sidebar/20 ${isCompleted ? 'border-emerald-500/30 ring-1 ring-emerald-500/20 shadow-2xl shadow-emerald-500/10' : 'border-white/5 shadow-xl'}`}>
      <div className="flex justify-between items-center mb-8">
         <div className="flex items-center gap-4">
            <div className={`p-3.5 rounded-2xl border ${isCompleted ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-brand-primary/10 text-brand-primary border-brand-primary/20'}`}>
               <Code2 className="w-[24px] h-[24px]" />
            </div>
            <div>
               <h3 className="text-xl font-black text-white italic tracking-tight">{title}</h3>
               <div className="flex gap-2 mt-1">
                  <Badge variant="ghost" className="text-[9px] py-0 italic font-black uppercase tracking-widest bg-white/5 border-none">{type.replace('-', ' ')}</Badge>
                  {isCompleted && <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1.5"><CheckCircle2 className="w-[10px] h-[10px]" /> Solved</span>}
               </div>
            </div>
         </div>
         <div className="flex gap-2">
            <SecondaryButton onClick={handleSave} className="px-5 py-2.5 text-[10px] font-black uppercase tracking-widest border-white/10 bg-white/5 hover:bg-white/10 rounded-xl">
               <Save className={`w-[14px] h-[14px] mr-2 ${isSaved ? 'text-emerald-500' : ''}`} /> {isSaved ? 'Syncing...' : 'Sync'}
            </SecondaryButton>
         </div>
      </div>

      <div className="space-y-6 mb-8">
         <div className="bg-white/2 p-6 rounded-2xl border border-white/5 border-l-4 border-l-brand-primary">
            <p className="text-slate-300 font-medium leading-relaxed italic text-sm">
               "{prompt}"
            </p>
         </div>
         
         {codeSnippet && (
           <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40">
              <div className="px-6 py-3 bg-white/5 border-b border-white/5 text-[10px] font-black uppercase text-slate-600 tracking-widest flex justify-between items-center">
                 <span className="italic">Scenario Archetype</span>
                 <Terminal className="w-[12px] h-[12px] text-brand-primary" />
              </div>
              <pre className="p-6 text-sm font-mono text-brand-secondary overflow-x-auto m-0">
                 {codeSnippet}
              </pre>
           </div>
         )}
      </div>

      <div className="space-y-4">
         <div className="flex justify-between items-end px-1">
            <label className="text-[9px] font-black uppercase text-slate-700 tracking-widest italic">Input Terminal</label>
            <button onClick={clearInput} className="text-[9px] uppercase font-black text-slate-700 hover:text-rose-500 transition-all flex items-center gap-1.5">
               <Eraser className="w-[10px] h-[10px]" /> Purge Code
            </button>
         </div>
         <div className="relative group">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={type === 'predict' ? "// Type the expected output here..." : "// Design your solution here..."}
              spellCheck={false}
              className={`
                w-full min-h-[180px] bg-black/60 border-2 rounded-2xl p-6 text-brand-primary font-mono text-sm outline-none transition-all
                placeholder:text-slate-800 placeholder:italic
                ${isCompleted ? 'border-emerald-500/20' : 'border-white/5 focus:border-brand-primary/50'}
              `}
            />
            {isCompleted && (
              <div className="absolute bottom-4 right-4 text-emerald-500/20 italic font-black text-[10px] uppercase tracking-[0.2em] pointer-events-none">Verified Instance</div>
            )}
         </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-6 pt-8 border-t border-white/5 relative z-10">
         <button 
           onClick={() => setShowHint(!showHint)}
           className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${showHint ? 'text-brand-primary' : 'text-slate-600 hover:text-slate-400'}`}
         >
           <Lightbulb className="w-[16px] h-[16px]" /> {showHint ? 'Hide Logic' : 'Access Logic'}
         </button>
         
         <button 
           onClick={() => setShowSolution(!showSolution)}
           className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${showSolution ? 'text-emerald-500' : 'text-slate-600 hover:text-slate-400'}`}
         >
           <Eye className="w-[16px] h-[16px]" /> {showSolution ? 'Hide Schema' : 'Reveal Schema'}
         </button>

         <div className="flex-1" />

         <PrimaryButton 
           onClick={handleComplete}
           className={`px-12 py-3.5 shadow-xl text-xs font-black uppercase tracking-widest rounded-xl transition-all ${isCompleted ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20 border-none' : 'shadow-brand-primary/20 hover:scale-105 active:scale-95'}`}
         >
           {isCompleted ? 'Unit Mastered' : 'Commit Development'}
         </PrimaryButton>
      </div>

      <AnimatePresence>
         {showHint && (
           <motion.div 
             initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
             className="overflow-hidden"
           >
              <div className="mt-8 p-6 bg-brand-primary/5 border border-brand-primary/10 rounded-2xl flex gap-4 relative overflow-hidden backdrop-blur-md">
                 <div className="absolute top-0 right-0 p-4 opacity-5"><Lightbulb className="w-[64px] h-[64px]" /></div>
                 <div className="p-2.5 bg-brand-primary/10 rounded-xl h-fit text-brand-primary border border-brand-primary/20"><AlertCircle className="w-[18px] h-[18px]" /></div>
                 <p className="text-sm text-slate-400 font-medium leading-relaxed italic">
                    <span className="text-brand-primary font-black uppercase text-[10px] tracking-[0.3em] block mb-2 underline decoration-brand-primary/20 decoration-4 underline-offset-4">Architect Insight</span>
                    {hint || "Think about the scope of the variables and the order of execution."}
                 </p>
              </div>
           </motion.div>
         )}

         {showSolution && (
           <motion.div 
             initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
             className="overflow-hidden"
           >
              <div className="mt-8 p-8 bg-emerald-500/5 border border-emerald-500/10 rounded-[2rem] relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-6 opacity-5"><CheckCircle2 className="w-[80px] h-[80px]" /></div>
                 <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-3 italic">
                    <CheckCircle2 className="w-[14px] h-[14px]" /> Final Implementation Schema
                 </h4>
                 <pre className="text-emerald-500 font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed bg-black/20 p-6 rounded-2xl border border-emerald-500/5">
                    {solution || "// No solution provided for this tactical cluster."}
                 </pre>
              </div>
           </motion.div>
         )}
      </AnimatePresence>
    </Card>
  );
};

export default PracticeChallenge;
