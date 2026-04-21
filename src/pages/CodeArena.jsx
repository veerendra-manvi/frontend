import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Play, 
  CheckCircle2, 
  Clock, 
  Brain, 
  ChevronRight, 
  Lightbulb, 
  Code,
  Flame,
  Award,
  Database,
  Layers,
  Zap,
  Info,
  RotateCcw,
  Eye
} from 'lucide-react';
import { 
  Card, 
  SectionTitle, 
  Badge, 
  PrimaryButton, 
  SecondaryButton,
  ProgressBar
} from '../components/ui';
import useProgressStore from '../store/useProgressStore';
import { codingChallenges } from '../data/coding/challenges';

const CodeArena = () => {
  const { solvedChallenges, solveChallenge, streak } = useProgressStore();
  const [activeChallenge, setActiveChallenge] = useState(codingChallenges[0]);
  const [code, setCode] = useState(activeChallenge?.starterCode || '');
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState(null);

  const handleRun = () => {
    setIsRunning(true);
    setOutput(null);
    setTimeout(() => {
      setIsRunning(false);
      setOutput({ success: true, message: "Compilation Successful. All test cases passed!" });
      solveChallenge(activeChallenge.id);
    }, 1500);
  };

  const currentStatus = useMemo(() => {
    return solvedChallenges.includes(activeChallenge.id) ? 'Solved' : 'Open';
  }, [solvedChallenges, activeChallenge]);

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-20">
      
      {/* 1. Hero Header */}
      <header className="p-8 lg:p-12 bg-dark-sidebar border border-white/5 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[100px] rounded-full" />
         <div className="flex items-center gap-6 relative z-10">
            <div className="w-20 h-20 rounded-3xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shadow-xl shadow-brand-primary/10">
               <Terminal size={40} />
            </div>
            <div className="space-y-1">
               <h1 className="text-4xl font-black text-white tracking-tight italic">Code <span className="text-brand-primary">Arena</span>.</h1>
               <p className="text-slate-500 font-medium">Solve the toughest Java algorithmic challenges.</p>
            </div>
         </div>
         <div className="flex gap-8 relative z-10">
            <div className="text-center">
               <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Solved</p>
               <h4 className="text-2xl font-black text-white">{solvedChallenges.length}</h4>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
               <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">XP Points</p>
               <h4 className="text-2xl font-black text-brand-primary">{solvedChallenges.length * 500}</h4>
            </div>
         </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 min-h-[800px]">
         
         {/* 2. Left Panel: Challenge List (350px) */}
         <div className="lg:w-[380px] space-y-6">
            <SectionTitle title="Missions" className="px-2" />
            <div className="space-y-3 overflow-y-auto max-h-[800px] pr-2 custom-scrollbar">
               {codingChallenges.map((challenge) => (
                 <Card 
                   key={challenge.id}
                   onClick={() => { setActiveChallenge(challenge); setCode(challenge.starterCode); setShowHint(false); setShowSolution(false); setOutput(null); }}
                   className={`p-5 cursor-pointer transition-all border-l-4 ${activeChallenge.id === challenge.id ? 'bg-brand-primary/5 border-l-brand-primary' : 'hover:bg-white/5 border-l-transparent'}`}
                 >
                    <div className="flex justify-between items-start mb-3">
                       <Badge variant="ghost" className="text-[9px] border-white/10 uppercase tracking-widest font-black opacity-50">{challenge.category}</Badge>
                       {solvedChallenges.includes(challenge.id) && <CheckCircle2 size={16} className="text-emerald-500" />}
                    </div>
                    <h4 className="text-white font-bold text-sm mb-1">{challenge.title}</h4>
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                       <span>{challenge.difficulty}</span>
                       <span className="text-brand-primary">+{challenge.xp} XP</span>
                    </div>
                 </Card>
               ))}
            </div>
         </div>

         {/* 3. Main Panel: Content + Editor */}
         <div className="flex-1 flex flex-col gap-6">
            <Card className="flex-1 p-0 flex flex-col border-white/5 overflow-hidden">
               {/* Tab Header */}
               <div className="flex items-center justify-between p-4 bg-white/2 border-b border-white/5 px-8">
                  <div className="flex gap-8">
                     <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest border-b-2 border-brand-primary pb-4 -mb-4">Description</span>
                     <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest cursor-not-allowed">Solutions</span>
                     <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest cursor-not-allowed">Submissions</span>
                  </div>
                  <div className="flex gap-4">
                     <SecondaryButton onClick={() => setShowHint(!showHint)} className="py-2.5 px-4 text-xs bg-white/5 border-none">
                        <Lightbulb size={14} className="mr-2" /> Hint
                     </SecondaryButton>
                     <PrimaryButton onClick={handleRun} disabled={isRunning} className="py-2.5 px-8 text-xs bg-brand-primary border-none shadow-lg shadow-brand-primary/20">
                        {isRunning ? 'Compiling...' : 'Run Code'} <Play size={14} className="ml-2 fill-current" />
                     </PrimaryButton>
                  </div>
               </div>

               <div className="flex-1 flex flex-col xl:flex-row min-h-0">
                  {/* Left: Problem Text */}
                  <div className="w-full xl:w-[450px] p-8 lg:p-10 overflow-y-auto custom-scrollbar border-r border-white/5 bg-white/1">
                     <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-tight">{activeChallenge.title}</h2>
                     <p className="text-slate-400 font-medium leading-relaxed mb-10">{activeChallenge.prompt}</p>
                     
                     <div className="space-y-10">
                        <div className="space-y-4">
                           <h5 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] flex items-center gap-2"><Zap size={14} /> Examples</h5>
                           {activeChallenge.examples.map((ex, i) => (
                             <div key={i} className="p-5 bg-black/40 rounded-2xl border border-white/5 space-y-2">
                                <div className="flex justify-between text-xs font-mono"><span className="text-slate-500">Input:</span> <span className="text-white">{ex.input}</span></div>
                                <div className="flex justify-between text-xs font-mono"><span className="text-slate-500">Output:</span> <span className="text-brand-primary">{ex.output}</span></div>
                             </div>
                           ))}
                        </div>

                        <div className="space-y-4">
                           <h5 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] flex items-center gap-2"><Lock size={14} /> Constraints</h5>
                           <ul className="space-y-2">
                              {activeChallenge.constraints.map((c, i) => (
                                <li key={i} className="text-xs text-slate-500 font-bold flex items-center gap-3">
                                   <div className="w-1 h-1 rounded-full bg-slate-700" /> {c}
                                </li>
                              ))}
                           </ul>
                        </div>

                        <AnimatePresence>
                           {showHint && (
                              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-brand-primary/5 border border-brand-primary/20 rounded-2xl flex gap-4">
                                 <Lightbulb className="text-brand-primary shrink-0" />
                                 <p className="text-xs text-brand-primary/90 font-medium italic leading-relaxed">{activeChallenge.hint}</p>
                              </motion.div>
                           )}
                        </AnimatePresence>
                     </div>
                  </div>

                  {/* Right: Code Editor (Mock) */}
                  <div className="flex-1 flex flex-col bg-dark-bg/40">
                     <div className="flex-1 p-6 relative">
                        <div className="absolute top-8 right-8 flex gap-2">
                           <button onClick={() => setCode(activeChallenge.starterCode)} title="Reset" className="p-2 bg-white/5 rounded-lg text-slate-600 hover:text-white transition-all"><RotateCcw size={16}/></button>
                           <button onClick={() => setShowSolution(!showSolution)} title="Solution" className="p-2 bg-white/5 rounded-lg text-slate-600 hover:text-white transition-all"><Eye size={16}/></button>
                        </div>
                        <div className="flex items-center gap-3 mb-6 text-slate-700 font-black tracking-widest text-[10px] uppercase">
                           <Code size={14} /> Solution.java
                        </div>
                        <textarea 
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          className="w-full h-full bg-transparent border-none outline-none text-brand-primary font-mono text-sm leading-relaxed custom-scrollbar resize-none selection:bg-brand-primary/20"
                          spellCheck="false"
                        />
                     </div>

                     {/* Output Terminal */}
                     <div className="h-[250px] bg-black/80 border-t border-white/5 p-6 font-mono">
                        <h6 className="text-[9px] font-black uppercase text-slate-600 tracking-[0.3em] mb-4 flex items-center gap-2"><Terminal size={14}/> Console Output</h6>
                        <div className="overflow-y-auto h-full space-y-2 pb-10">
                           {isRunning ? (
                              <p className="text-emerald-500 animate-pulse text-xs">🚀 Compiling Solution...</p>
                           ) : output ? (
                              <div className="space-y-4">
                                 <p className="text-emerald-500 font-bold text-xs">✓ {output.message}</p>
                                 <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                                    <p className="text-emerald-400 text-xs font-bold flex items-center gap-2 italic"><Award size={14} /> Challenge Decoded! +500 XP granted.</p>
                                 </div>
                              </div>
                           ) : (
                              <p className="text-slate-800 italic text-xs">Run your solution to see the results here.</p>
                           )}
                           
                           {showSolution && (
                              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 pt-6 border-t border-white/5">
                                 <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest mb-4">Official Solution</p>
                                 <div className="p-4 bg-brand-primary/5 border border-brand-primary/10 rounded-xl text-slate-400 text-xs leading-relaxed">
                                    <pre className="whitespace-pre-wrap">{activeChallenge.solution}</pre>
                                 </div>
                                 <div className="mt-4 p-4 border-l-2 border-slate-700 bg-white/2">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 italic">Mechanism</p>
                                    <p className="text-[11px] text-slate-600 leading-relaxed">{activeChallenge.explanation}</p>
                                 </div>
                              </motion.div>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            </Card>
         </div>

         {/* 4. Right Panel: Stats (300px) */}
         <div className="lg:w-[320px] space-y-8">
            <section>
               <SectionTitle title="Momentum" className="mb-6" />
               <Card className="p-8 text-center bg-gradient-to-br from-rose-500/20 to-transparent border-rose-500/20">
                  <Flame size={48} className="mx-auto text-rose-500 mb-4 fill-rose-500/30" />
                  <h3 className="text-3xl font-black text-white mb-2">{streak} Days</h3>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest uppercase">Consistency Streak</p>
               </Card>
            </section>

            <section>
               <SectionTitle title="Analysis" className="mb-6" />
               <Card className="p-6 bg-indigo-500/10 border-indigo-500/10">
                  <div className="flex items-center gap-3 mb-6">
                     <Brain className="text-indigo-400" />
                     <h4 className="text-white font-bold text-sm">Strategic Focus</h4>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
                     You are excelling in <span className="text-emerald-500 font-bold">Arrays</span>, but we recommend more practice in <span className="text-brand-secondary font-bold">Logic</span> and <span className="text-indigo-400 font-bold">Collections</span>.
                  </p>
                  <SecondaryButton className="w-full text-[10px] font-black uppercase tracking-widest border-indigo-500/20 text-indigo-400">View Weak Topics</SecondaryButton>
               </Card>
            </section>

            <section>
               <SectionTitle title="Leaderboard" className="mb-6" />
               <Card className="p-6 border-white/5">
                  <div className="space-y-4">
                     {[1, 2, 3].map(i => (
                       <div key={i} className="flex items-center justify-between group">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold text-slate-500 group-hover:bg-brand-primary group-hover:text-white transition-all">#{i}</div>
                             <span className="text-xs font-bold text-white">Dev_Runner_{i}</span>
                          </div>
                          <span className="text-[10px] font-black text-slate-700">12k XP</span>
                       </div>
                     ))}
                  </div>
               </Card>
            </section>
         </div>

      </div>
    </div>
  );
};

export default CodeArena;
