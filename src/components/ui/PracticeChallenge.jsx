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
  expectedOutput = "",
  onComplete 
}) => {
  const [userInput, setUserInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Load progress from localStorage
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
    <Card className={`border-2 transition-all duration-500 overflow-hidden ${isCompleted ? 'border-emerald-500/30 ring-1 ring-emerald-500/20' : 'border-white/5'}`}>
      {/* 1. Header with Type Badge */}
      <div className="flex justify-between items-center mb-8">
         <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${isCompleted ? 'bg-emerald-500/10 text-emerald-500' : 'bg-brand-primary/10 text-brand-primary'}`}>
               <Code2 size={24} />
            </div>
            <div>
               <h3 className="text-xl font-bold text-white">{title}</h3>
               <div className="flex gap-2 mt-1">
                  <Badge variant="ghost" className="text-[9px] py-0">{type.replace('-', ' ').toUpperCase()}</Badge>
                  {isCompleted && <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1"><CheckCircle2 size={10} /> Solved</span>}
               </div>
            </div>
         </div>
         <div className="flex gap-2">
            <SecondaryButton onClick={handleSave} className="px-3 py-2 text-xs">
               <Save size={14} className={isSaved ? 'text-emerald-500' : ''} /> {isSaved ? 'Saved' : 'Save'}
            </SecondaryButton>
         </div>
      </div>

      {/* 2. Prompt Section */}
      <div className="space-y-6 mb-8">
         <div className="bg-white/5 p-6 rounded-2xl border border-white/5 border-l-4 border-l-brand-primary">
            <p className="text-slate-300 font-medium leading-relaxed italic">
               "{prompt}"
            </p>
         </div>
         
         {codeSnippet && (
           <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0d0f1a]">
              <div className="px-4 py-2 bg-white/5 border-b border-white/5 text-[10px] font-black uppercase text-slate-600 tracking-widest flex justify-between">
                 <span>Starter Code</span>
                 <Terminal size={12} />
              </div>
              <pre className="p-6 text-sm font-mono text-brand-secondary overflow-x-auto m-0">
                 {codeSnippet}
              </pre>
           </div>
         )}
      </div>

      {/* 3. Input Editor Area */}
      <div className="space-y-4">
         <div className="flex justify-between items-end">
            <label className="text-[10px] font-black uppercase text-slate-600 tracking-widest ml-1">Your Solution</label>
            <button onClick={clearInput} className="text-[10px] uppercase font-bold text-slate-700 hover:text-rose-500 transition-colors flex items-center gap-1">
               <Eraser size={10} /> Clear Editor
            </button>
         </div>
         <div className="relative group">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={type === 'predict' ? "Type the expected output here..." : "// Start coding here..."}
              spellCheck={false}
              className={`
                w-full min-h-[180px] bg-[#05060a] border-2 rounded-2xl p-6 text-white font-mono text-sm outline-none transition-all
                placeholder:text-slate-800
                ${isCompleted ? 'border-emerald-500/20' : 'border-white/5 focus:border-brand-primary/50'}
              `}
            />
            {isCompleted && (
              <div className="absolute top-4 right-4 text-emerald-500/30 italic font-black text-xs uppercase tracking-tighter">Verified Content</div>
            )}
         </div>
      </div>

      {/* 4. Controls (Hint/Solution) */}
      <div className="mt-8 flex flex-wrap items-center gap-4 pt-6 border-t border-white/5">
         <button 
           onClick={() => setShowHint(!showHint)}
           className={`flex items-center gap-2 text-xs font-bold transition-all ${showHint ? 'text-brand-primary' : 'text-slate-500 hover:text-slate-300'}`}
         >
           <Lightbulb size={16} /> {showHint ? 'Hide Hint' : 'Show Hint'}
         </button>
         
         <button 
           onClick={() => setShowSolution(!showSolution)}
           className={`flex items-center gap-2 text-xs font-bold transition-all ${showSolution ? 'text-emerald-500' : 'text-slate-500 hover:text-slate-300'}`}
         >
           <Eye size={16} /> {showSolution ? 'Hide Solution' : 'Reveal Solution'}
         </button>

         <div className="flex-1" />

         <PrimaryButton 
           onClick={handleComplete}
           className={`px-10 py-3 shadow-xl ${isCompleted ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20' : 'shadow-brand-primary/20'}`}
         >
           {isCompleted ? 'Solved!' : 'Mark as Completed'}
         </PrimaryButton>
      </div>

      {/* Expandable Overlays */}
      <AnimatePresence>
         {showHint && (
           <motion.div 
             initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
             className="overflow-hidden"
           >
              <div className="mt-6 p-5 bg-brand-primary/5 border border-brand-primary/10 rounded-2xl flex gap-4">
                 <AlertCircle size={18} className="text-brand-primary shrink-0 mt-0.5" />
                 <p className="text-sm text-slate-400 font-medium leading-relaxed">
                    <span className="text-brand-primary font-bold uppercase text-[10px] tracking-widest block mb-1">Coach Tip</span>
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
              <div className="mt-6 p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                 <h4 className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <CheckCircle2 size={14} /> Official Implementation
                 </h4>
                 <pre className="text-emerald-500 font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed">
                    {solution || "// No solution provided for this demo challenge."}
                 </pre>
              </div>
           </motion.div>
         )}
      </AnimatePresence>
    </Card>
  );
};

export default PracticeChallenge;
