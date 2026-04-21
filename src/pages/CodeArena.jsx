import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Play, 
  CheckCircle2, 
  Brain, 
  ChevronRight, 
  Lightbulb, 
  Code,
  Flame,
  Award,
  Zap,
  Lock,
  RotateCcw,
  Eye,
  Activity,
  Cpu,
  Target
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
      setOutput({ success: true, message: "System Integrity Verified. Simulation passed." });
      solveChallenge(activeChallenge.id);
    }, 1500);
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-24 p-6 lg:p-12">
      
      {/* 1. Hero Header */}
      <header className="p-10 lg:p-16 bg-dark-sidebar border-2 border-white/5 rounded-[3.5rem] flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden shadow-2xl">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 blur-[120px] rounded-full -mr-32 -mt-32 pointer-events-none" />
         <div className="flex items-center gap-10 relative z-10">
            <div className="w-24 h-24 rounded-[2rem] bg-brand-primary/10 border-2 border-brand-primary/20 flex items-center justify-center text-brand-primary shadow-2xl shadow-brand-primary/10 group">
               <Terminal className="w-[48px] h-[48px] group-hover:scale-110 transition-transform" />
            </div>
            <div className="space-y-3">
               <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter leading-none">Code <span className="text-brand-primary underline decoration-brand-primary/20 decoration-8 underline-offset-8">Arena</span>.</h1>
               <p className="text-slate-400 font-bold italic tracking-wide max-w-lg">Initialize algorithmic combat sequences. Solve elite Java challenges to expand your neural influence.</p>
            </div>
         </div>
         <div className="flex gap-12 relative z-10 bg-white/2 p-8 rounded-[2.5rem] border-2 border-white/5 backdrop-blur-2xl shadow-3xl">
            <div className="text-center group">
               <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] mb-3 group-hover:text-emerald-500 transition-colors italic">Missions Synchronized</p>
               <h4 className="text-4xl font-black text-white tabular-nums tracking-tighter">{solvedChallenges.length}</h4>
            </div>
            <div className="w-px h-16 bg-white/5 self-center" />
            <div className="text-center group">
               <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] mb-3 group-hover:text-brand-primary transition-colors italic">Neural Influence XP</p>
               <h4 className="text-4xl font-black text-white tabular-nums tracking-tighter">{solvedChallenges.length * 500}</h4>
            </div>
         </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-10 min-h-[900px]">
         
         {/* 2. Left Panel: Mission Clusters */}
         <div className="lg:w-[420px] space-y-8">
            <div className="flex items-center gap-4 px-4">
               <div className="px-5 py-1.5 bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-[0.3em] w-fit rounded-full border border-brand-primary/20 italic">Mission Clusters</div>
               <div className="h-px flex-1 bg-white/5" />
            </div>
            <div className="space-y-4 overflow-y-auto max-h-[900px] pr-3 custom-scrollbar">
               {codingChallenges.map((challenge) => (
                 <Card 
                   key={challenge.id}
                   onClick={() => { setActiveChallenge(challenge); setCode(challenge.starterCode); setShowHint(false); setShowSolution(false); setOutput(null); }}
                   className={`p-6 cursor-pointer transition-all border-2 rounded-[2rem] relative group overflow-hidden ${activeChallenge.id === challenge.id ? 'border-brand-primary bg-brand-primary/5 shadow-2xl shadow-brand-primary/5 scale-[1.02]' : 'hover:bg-white/5 border-white/5'}`}
                 >
                    <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex justify-between items-start mb-6 relative z-10">
                       <Badge variant="ghost" className="text-[9px] border-white/5 bg-white/5 uppercase tracking-widest font-black opacity-30 px-3 py-1 italic rounded-lg leading-none">{challenge.category}</Badge>
                       {solvedChallenges.includes(challenge.id) && (
                         <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                            <CheckCircle2 className="w-[12px] h-[12px] text-emerald-500" />
                         </div>
                       )}
                    </div>
                    <h4 className="text-xl font-black text-white mb-2 italic tracking-tight group-hover:text-brand-primary transition-colors">{challenge.title}</h4>
                    <div className="flex items-center justify-between text-[10px] font-black tracking-[0.2em] italic relative z-10">
                       <span className={challenge.difficulty === 'Pro' ? 'text-rose-500' : 'text-slate-600'}>{challenge.difficulty} TIER</span>
                       <span className="text-brand-primary">+{challenge.xp} UNITS</span>
                    </div>
                 </Card>
               ))}
            </div>
         </div>

         {/* 3. Main Panel: Processing Unit */}
         <div className="flex-1 flex flex-col gap-8">
            <Card className="flex-1 p-0 flex flex-col border-2 border-white/5 overflow-hidden rounded-[3.5rem] bg-[#0b0d12] shadow-3xl">
               <div className="flex items-center justify-between p-6 bg-white/2 border-b-2 border-white/5 px-10 relative z-20">
                  <div className="flex gap-10">
                     <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em] border-b-4 border-brand-primary pb-6 -mb-6 italic">Tactical Briefing</span>
                     <span className="text-[10px] font-black text-slate-800 uppercase tracking-[0.3em] pb-6 -mb-6 italic cursor-not-allowed">Neural Logs</span>
                  </div>
                  <div className="flex gap-6 items-center">
                     <button onClick={() => setShowHint(!showHint)} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all flex items-center gap-2 italic">
                        <Lightbulb className="w-[16px] h-[16px]" /> Reveal Data
                     </button>
                     <PrimaryButton onClick={handleRun} disabled={isRunning} className="py-3 px-10 text-[10px] font-black uppercase tracking-[0.2em] italic bg-brand-primary border-none shadow-2xl shadow-brand-primary/30 rounded-2xl active:scale-95 transition-all">
                        <span className="flex items-center gap-3">
                           {isRunning ? 'Broadcasting...' : 'Execute Logic'} <Play className="w-[16px] h-[16px]" fill="currentColor" />
                        </span>
                     </PrimaryButton>
                  </div>
               </div>

               <div className="flex-1 flex flex-col xl:flex-row min-h-0 relative z-10">
                  <div className="w-full xl:w-[480px] p-10 lg:p-12 overflow-y-auto custom-scrollbar border-r-2 border-white/5 bg-[#08090e] shadow-inner">
                     <div className="space-y-12">
                        <div className="space-y-4">
                           <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic underline decoration-white/5 decoration-8 underline-offset-8">{activeChallenge.title}</h2>
                           <p className="text-slate-400 font-bold italic leading-relaxed text-sm border-l-4 border-white/10 pl-6">{activeChallenge.prompt}</p>
                        </div>
                        
                        <div className="space-y-6">
                           <h5 className="text-[10px] font-black uppercase text-slate-700 tracking-[0.4em] flex items-center gap-3 italic"><Zap className="w-[16px] h-[16px] text-brand-primary" /> Operational Matrix</h5>
                           <div className="grid gap-4">
                              {activeChallenge.examples.map((ex, i) => (
                                <div key={i} className="p-6 bg-black/40 rounded-[1.5rem] border-2 border-white/5 space-y-4 shadow-xl group hover:border-brand-primary/20 transition-all">
                                   <div className="flex justify-between items-center text-[10px] font-mono tracking-tighter"><span className="text-slate-700 font-black italic">INPUT_VECTOR</span> <span className="text-white font-black">{ex.input}</span></div>
                                   <div className="flex justify-between items-center text-[10px] font-mono tracking-tighter"><span className="text-slate-700 font-black italic">OUTPUT_TARGET</span> <span className="text-brand-primary font-black">{ex.output}</span></div>
                                </div>
                              ))}
                           </div>
                        </div>

                        <div className="space-y-6">
                           <h5 className="text-[10px] font-black uppercase text-slate-700 tracking-[0.4em] flex items-center gap-3 italic"><Lock className="w-[16px] h-[16px] text-rose-500" /> Operational Constraints</h5>
                           <ul className="space-y-4">
                              {activeChallenge.constraints.map((c, i) => (
                                <li key={i} className="text-[11px] text-slate-600 font-black flex items-center gap-4 uppercase tracking-[0.2em] italic">
                                   <div className="w-2.5 h-2.5 rounded-full bg-brand-primary/20 border border-brand-primary/40 shadow-[0_0_10px_rgba(248,152,32,0.2)]" /> {c}
                                </li>
                              ))}
                           </ul>
                        </div>

                        <AnimatePresence>
                           {showHint && (
                              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-8 bg-brand-primary/5 border-2 border-brand-primary/20 rounded-[2rem] flex gap-6 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
                                 <div className="absolute top-0 right-0 p-4 opacity-5"><Lightbulb className="w-[60px] h-[60px]" /></div>
                                 <Lightbulb className="w-[28px] h-[28px] text-brand-primary shrink-0 group-hover:animate-pulse" />
                                 <p className="text-[13px] text-brand-primary font-black italic tracking-tight leading-relaxed">{activeChallenge.hint}</p>
                              </motion.div>
                           )}
                        </AnimatePresence>
                     </div>
                  </div>

                  {/* Processing Unit (Editor) */}
                  <div className="flex-1 flex flex-col bg-[#05060a]/60">
                     <div className="flex-1 p-10 relative">
                        <div className="absolute top-10 right-10 flex gap-4 z-30">
                           <button onClick={() => setCode(activeChallenge.starterCode)} title="Reset Unit" className="p-3.5 bg-white/5 rounded-2xl text-slate-700 hover:text-white transition-all border-2 border-white/5 hover:border-white/10 shadow-2xl"><RotateCcw className="w-[20px] h-[20px]"/></button>
                           <button onClick={() => setShowSolution(!showSolution)} title="Reveal Algorithm" className="p-3.5 bg-white/5 rounded-2xl text-slate-700 hover:text-white transition-all border-2 border-white/5 hover:border-white/10 shadow-2xl"><Eye className="w-[20px] h-[20px]"/></button>
                        </div>
                        <div className="flex items-center gap-4 mb-8 text-slate-800 font-black italic tracking-[0.4em] text-[10px] uppercase">
                           <Code className="w-[18px] h-[18px] text-brand-primary" /> LogicExecutor.java
                        </div>
                        <textarea 
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          className="w-full h-[calc(100%-60px)] bg-transparent border-none outline-none text-brand-primary font-mono text-[15px] italic font-bold leading-relaxed custom-scrollbar resize-none selection:bg-brand-primary/20 placeholder:text-slate-800"
                          spellCheck="false"
                          placeholder="// Initialize your logic sequence here..."
                        />
                     </div>

                     {/* Log Interface */}
                     <div className="h-[300px] bg-black border-t-2 border-white/5 p-10 font-mono relative overflow-hidden backdrop-blur-3xl shadow-inner">
                        <div className="absolute inset-0 bg-brand-primary/2 opacity-[0.02] pointer-events-none" />
                        <div className="flex justify-between items-center mb-6 relative z-10">
                           <h6 className="text-[10px] font-black uppercase text-slate-700 tracking-[0.4em] flex items-center gap-3 italic">
                              <Activity className="w-[16px] h-[16px] text-emerald-500 animate-pulse" /> Runtime Logs
                           </h6>
                           <div className="flex items-center gap-3 text-[9px] font-black text-slate-800 uppercase italic">
                              <Cpu className="w-[14px] h-[14px]" /> THREAD_MAIN @ 0x82A
                           </div>
                        </div>
                        <div className="overflow-y-auto h-full space-y-4 pb-16 custom-scrollbar relative z-10">
                           {isRunning ? (
                              <p className="text-brand-primary animate-pulse text-[13px] italic font-black tracking-widest uppercase">Initializing VM Cluster & Broadcasting Solution...</p>
                           ) : output ? (
                              <div className="space-y-6">
                                 <p className="text-emerald-500 font-black text-[13px] italic uppercase tracking-widest drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">✓ STATUS_OK: {output.message}</p>
                                 <div className="p-8 bg-emerald-500/5 border-2 border-emerald-500/20 rounded-[2.5rem] flex items-center gap-8 shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-125 transition-transform"><Award className="w-[60px] h-[60px] text-emerald-500" /></div>
                                    <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-500 border-2 border-emerald-500/20 shadow-xl shadow-emerald-500/10 relative z-10">
                                       <Award className="w-[32px] h-[32px]" />
                                    </div>
                                    <div className="relative z-10">
                                       <p className="text-emerald-500 text-xl font-black italic tracking-tighter uppercase leading-none">Cluster Decoded</p>
                                       <p className="text-[10px] text-emerald-500/40 font-black uppercase tracking-[0.3em] italic mt-2">+500 NEURAL XP SECURED</p>
                                    </div>
                                 </div>
                              </div>
                           ) : (
                              <p className="text-slate-800 italic text-xs font-black uppercase tracking-[0.3em] opacity-40">System Idle. Pending combat sequence...</p>
                           )}
                           
                           <AnimatePresence>
                             {showSolution && (
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-12 pt-8 border-t-2 border-white/5 pb-10">
                                   <p className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em] mb-6 italic underline decoration-brand-primary/20 decoration-4 underline-offset-8">Authoritative Algorithm Node</p>
                                   <div className="p-8 bg-brand-primary/5 border-2 border-brand-primary/10 rounded-[2.5rem] text-slate-400 text-sm leading-relaxed font-mono italic shadow-2xl">
                                      <pre className="whitespace-pre-wrap">{activeChallenge.solution}</pre>
                                   </div>
                                </motion.div>
                             )}
                           </AnimatePresence>
                        </div>
                     </div>
                  </div>
               </div>
            </Card>
         </div>

         {/* 4. Right Panel: Operational Stats */}
         <div className="lg:w-[360px] space-y-10">
            <section>
               <div className="flex items-center gap-3 px-2 mb-6">
                  <Activity className="w-[14px] h-[14px] text-rose-500" />
                  <h4 className="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] italic">Combat Pulse</h4>
               </div>
               <Card className="p-10 text-center bg-gradient-to-br from-rose-500/20 via-black/40 to-transparent border-2 border-rose-500/20 rounded-[3rem] group relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-150 transition-all duration-1000">
                     <Flame className="w-[120px] h-[120px] text-rose-500 animate-pulse" />
                  </div>
                  <div className="relative z-10">
                     <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border-2 border-rose-500/20 shadow-xl shadow-rose-500/5 group-hover:scale-110 transition-all">
                        <Flame className="text-rose-500 fill-rose-500/30 w-[32px] h-[32px]" />
                     </div>
                     <h3 className="text-5xl font-black text-white mb-2 tabular-nums italic tracking-tighter drop-shadow-xl">{streak} Days</h3>
                     <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em] italic">Active Synchrony</p>
                  </div>
               </Card>
            </section>

            <section>
               <div className="flex items-center gap-3 px-2 mb-6 text-indigo-500">
                  <Brain className="w-[14px] h-[14px]" />
                  <h4 className="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] italic">Strategic Focus</h4>
               </div>
               <Card className="p-10 bg-indigo-500/5 border-2 border-indigo-500/10 rounded-[3rem] shadow-2xl relative group overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:scale-125 transition-transform"><Brain className="w-[80px] h-[80px]" /></div>
                  <p className="text-[13px] text-slate-400 font-bold leading-relaxed mb-10 italic relative z-10">
                     Architectural analysis identifies excellence in <span className="text-emerald-500">Synchronized Systems</span>. Recommendation: optimize <span className="text-brand-primary">Asymptotic Efficiency</span>.
                  </p>
                  <SecondaryButton className="w-full text-[9px] font-black uppercase tracking-[0.3em] italic border-indigo-500/20 text-indigo-400 py-4 rounded-2xl hover:bg-indigo-500/10 transition-all relative z-10 shadow-xl">Analyze Weak Vectors</SecondaryButton>
               </Card>
            </section>

            <section>
               <div className="flex items-center gap-3 px-2 mb-6 text-brand-secondary">
                  <Target className="w-[14px] h-[14px]" />
                  <h4 className="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] italic">Elite Rankings</h4>
               </div>
               <Card className="p-8 border-2 border-white/5 bg-white/2 rounded-[3rem] shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none"><Target className="w-[100px] h-[100px]" /></div>
                  <div className="space-y-6 relative z-10">
                     {[1, 2, 3].map(i => (
                       <div key={i} className="flex items-center justify-between group cursor-pointer hover:translate-x-2 transition-transform">
                          <div className="flex items-center gap-4">
                             <div className="w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center text-[10px] font-black text-slate-700 group-hover:bg-brand-primary group-hover:text-white transition-all border-2 border-white/5 group-hover:border-brand-primary/40 shadow-xl italic tracking-tighter">NODE_{i}</div>
                             <span className="text-sm font-black text-white italic tracking-tight group-hover:text-brand-primary transition-colors">Architect_{i+102}</span>
                          </div>
                          <span className="text-[10px] font-black text-slate-800 tracking-widest tabular-nums italic">12.4K XP</span>
                       </div>
                     ))}
                  </div>
               </Card>
            </section>
         </div>

      </div>

      {/* Decorative Branding */}
      <div className="fixed bottom-0 left-0 p-12 opacity-5 pointer-events-none select-none">
         <Target className="w-[400px] h-[400px] text-white" />
      </div>
    </div>
  );
};

export default CodeArena;
