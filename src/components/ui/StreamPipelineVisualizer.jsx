import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Filter, 
  Zap, 
  CheckCircle2, 
  RotateCcw, 
  GraduationCap,
  Hammer,
  Play
} from 'lucide-react';
import { Card, Badge, PrimaryButton, SecondaryButton } from './index';

const StreamPipelineVisualizer = () => {
  const [viewMode, setViewMode] = useState('beginner');
  const [source] = useState([1, 2, 3, 4, 5, 6]);
  const [activeItem, setActiveItem] = useState(null); // { val: number, id: string }
  const [activeStage, setActiveStage] = useState(null); // -1 (source), 0 (filter), 1 (map), 2 (collect)
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("Stream ready. Source loaded.");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Configuration
  const STAGES = [
    { type: 'FILTER', label: 'filter(n > 3)', logic: (n) => n > 3 },
    { type: 'MAP', label: 'map(n * 10)', logic: (n) => n * 10 }
  ];

  const resetStream = () => {
    setActiveItem(null);
    setActiveStage(null);
    setResults([]);
    setIsPlaying(false);
    setIsProcessing(false);
    setStatus("Stream pipeline reset.");
  };

  const processNextItem = async (index) => {
    if (index >= source.length) {
      setStatus("Terminal operation 'collect()' finished.");
      setIsProcessing(false);
      setIsPlaying(false);
      return;
    }

    const val = source[index];
    setActiveItem({ val, id: `item-${index}-${Date.now()}` });
    
    // 1. Entering Pipeline (Source)
    setActiveStage(-1);
    setStatus(`Source: Extracting element ${val}...`);
    await new Promise(r => setTimeout(r, 800));

    // 2. Filter Stage
    setActiveStage(0);
    const passes = STAGES[0].logic(val);
    setStatus(`Intermediate: ${STAGES[0].label} -> ${passes ? 'KEEP' : 'DISCARD'}`);
    await new Promise(r => setTimeout(r, 1000));

    if (!passes) {
      setActiveItem(null);
      if (isPlaying) processNextItem(index + 1);
      return;
    }

    // 3. Map Stage
    setActiveStage(1);
    const mapped = STAGES[1].logic(val);
    setActiveItem(prev => ({ ...prev, val: mapped }));
    setStatus(`Intermediate: ${STAGES[1].label} -> result ${mapped}`);
    await new Promise(r => setTimeout(r, 1000));

    // 4. Collect Stage
    setActiveStage(2);
    setStatus(`Terminal: collect() adding ${mapped} to result list.`);
    setResults(prev => [...prev, mapped]);
    await new Promise(r => setTimeout(r, 600));

    setActiveItem(null);
    if (isPlaying) processNextItem(index + 1);
  };

  const startAutoPlay = () => {
    setIsPlaying(true);
    setIsProcessing(true);
    processNextItem(0);
  };

  return (
    <Card className="min-h-[700px] flex flex-col p-0 border-white/5 bg-[#0b0d12] overflow-hidden rounded-[3rem] shadow-2xl">
      
      {/* 1. Header Controls */}
      <div className="p-10 border-b border-white/5 bg-dark-sidebar/40 space-y-8">
         <div className="flex flex-wrap justify-between items-center gap-10">
            <div className="flex p-1.5 bg-white/5 rounded-2xl border border-white/5">
                <button onClick={() => setViewMode('beginner')} className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all flex items-center gap-2 italic tracking-widest ${viewMode === 'beginner' ? 'bg-brand-primary text-white shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}>
                  <GraduationCap className="w-[16px] h-[16px]"/> Conceptual
               </button>
               <button onClick={() => setViewMode('developer')} className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all flex items-center gap-2 italic tracking-widest ${viewMode === 'developer' ? 'bg-brand-secondary text-white shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}>
                  <Hammer className="w-[16px] h-[16px]"/> Developer
               </button>
            </div>
            
            <div className="flex items-center gap-4">
               <PrimaryButton onClick={startAutoPlay} disabled={isProcessing} className="px-10 py-3.5 text-[10px] font-black uppercase tracking-widest shadow-xl shadow-brand-primary/20 italic">
                  <Play className="w-[16px] h-[16px] mr-3" fill="currentColor" /> Start Pipeline
               </PrimaryButton>
               <SecondaryButton onClick={resetStream} className="p-3.5 bg-white/5 border-2 border-white/5 rounded-xl hover:text-white transition-all">
                  <RotateCcw className="w-[18px] h-[18px]" />
               </SecondaryButton>
            </div>
         </div>

         <div className="p-6 bg-black/40 border-2 border-white/5 rounded-[2rem] flex items-center gap-6 relative group overflow-hidden">
            <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="p-3 bg-brand-primary/10 rounded-2xl text-brand-primary border border-brand-primary/20 shadow-xl shadow-brand-primary/10 group-hover:animate-pulse">
               <Zap className="w-[20px] h-[20px]" fill="currentColor" />
            </div>
            <p className="text-slate-300 font-mono text-sm italic tracking-wide font-medium">{status}</p>
         </div>
      </div>

      {/* 2. Pipeline Canvas Area */}
      <div className="flex-1 relative bg-[#06070a] flex items-center overflow-x-auto p-16">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(248,152,32,0.04)_0%,transparent_70%)]" />
         
         <div className="relative z-10 flex items-center gap-12 w-full min-w-[1100px]">
             
             {/* STAGE: SOURCE */}
             <div className="flex flex-col items-center gap-6">
                <Badge variant="ghost" className="opacity-20 text-[9px] font-black tracking-[0.2em] italic border-none bg-white/5 uppercase">Data Array</Badge>
                <div className={`w-44 min-h-[320px] border-2 rounded-[3rem] p-6 bg-white/2 flex flex-col gap-3 items-center justify-start transition-all duration-700 ${activeStage === -1 ? 'border-brand-primary bg-brand-primary/5 shadow-2xl' : 'border-white/5'}`}>
                   {source.map((n, i) => (
                     <div key={i} className="w-14 h-14 rounded-2xl bg-white/5 border-2 border-white/5 flex items-center justify-center text-white font-black text-base italic shadow-lg">
                        {n}
                     </div>
                   ))}
                </div>
             </div>

             <ArrowRight className="text-slate-800 w-[32px] h-[32px]" />

             {/* STAGE: FILTER */}
             <div className="flex flex-col items-center gap-6">
                <Badge variant="ghost" className="opacity-20 text-[9px] font-black tracking-[0.2em] italic border-none bg-white/5 uppercase">Intermediate</Badge>
                <div className={`w-64 h-72 border-2 rounded-[3.5rem] p-8 flex flex-col items-center justify-center gap-6 transition-all duration-700 ${activeStage === 0 ? 'border-brand-primary bg-brand-primary/5 shadow-2xl scale-110 shadow-brand-primary/10' : 'border-white/5 bg-white/1'}`}>
                   <div className={`p-6 rounded-3xl border-2 transition-all duration-500 ${activeStage === 0 ? 'bg-brand-primary/10 border-brand-primary/40 text-brand-primary' : 'bg-white/5 border-white/5 text-slate-700'}`}>
                      <Filter className="w-[40px] h-[40px]" />
                   </div>
                   <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] italic text-center leading-relaxed underline decoration-brand-primary/20 decoration-4 underline-offset-8">FILTER(N &gt; 3)</h4>
                </div>
             </div>

             <ArrowRight className="text-slate-800 w-[32px] h-[32px]" />

             {/* STAGE: MAP */}
             <div className="flex flex-col items-center gap-6">
                <Badge variant="ghost" className="opacity-20 text-[9px] font-black tracking-[0.2em] italic border-none bg-white/5 uppercase">Intermediate</Badge>
                <div className={`w-64 h-72 border-2 rounded-[3.5rem] p-8 flex flex-col items-center justify-center gap-6 transition-all duration-700 ${activeStage === 1 ? 'border-brand-secondary bg-brand-secondary/5 shadow-2xl scale-110 shadow-brand-secondary/10' : 'border-white/5 bg-white/1'}`}>
                   <div className={`p-6 rounded-3xl border-2 transition-all duration-500 ${activeStage === 1 ? 'bg-brand-secondary/10 border-brand-secondary/40 text-brand-secondary' : 'bg-white/5 border-white/5 text-slate-700'}`}>
                      <Zap className="w-[40px] h-[40px]" />
                   </div>
                   <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] italic text-center leading-relaxed underline decoration-brand-secondary/20 decoration-4 underline-offset-8">MAP(N * 10)</h4>
                </div>
             </div>

             <ArrowRight className="text-slate-800 w-[32px] h-[32px]" />

             {/* STAGE: COLLECT */}
             <div className="flex flex-col items-center gap-6">
                <Badge variant="ghost" className="opacity-20 text-[9px] font-black tracking-[0.2em] italic border-none bg-white/5 uppercase">Terminal</Badge>
                <div className={`w-48 min-h-[320px] border-2 rounded-[3rem] p-6 flex flex-col gap-4 items-center justify-start transition-all duration-700 ${activeStage === 2 ? 'border-emerald-500 bg-emerald-500/5 shadow-2xl shadow-emerald-500/10' : 'border-white/5 bg-white/1'}`}>
                   <div className={`p-3 rounded-full border-2 transition-all duration-500 ${activeStage === 2 ? 'bg-emerald-500 text-dark-bg border-emerald-500' : 'bg-white/5 border-white/5 text-slate-800'}`}>
                      <CheckCircle2 className="w-[32px] h-[32px]" />
                   </div>
                   {results.map((n, i) => (
                     <motion.div initial={{ scale: 0, y: 10 }} animate={{ scale: 1, y: 0 }} key={i} className="w-full py-4 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-2xl text-center text-emerald-500 font-black italic shadow-xl">
                        {n}
                     </motion.div>
                   ))}
                </div>
             </div>

             {/* MOVING ITEM OVERLAY */}
             <AnimatePresence>
                {activeItem && (
                  <motion.div 
                    key={activeItem.id}
                    initial={{ x: 0, opacity: 0, scale: 0.5 }}
                    animate={{ 
                       x: (activeStage === -1) ? 100 : (activeStage === 0) ? 310 : (activeStage === 1) ? 580 : 850,
                       opacity: 1,
                       scale: activeStage === 0 || activeStage === 1 ? 1.3 : 1
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                    className="absolute left-24 z-30 w-20 h-20 bg-brand-primary rounded-[1.5rem] shadow-[0_0_60px_rgba(248,152,32,0.5)] flex items-center justify-center text-white text-2xl font-black italic border-4 border-white/20"
                  >
                     <div className="absolute inset-0 bg-white/10 animate-pulse rounded-[1.5rem]" />
                     <span className="relative z-10">{activeItem.val}</span>
                  </motion.div>
                )}
             </AnimatePresence>
         </div>
      </div>

      {/* 3. Education Footer */}
      <div className="p-12 border-t border-white/5 bg-dark-sidebar/40">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-6">
               <h5 className="flex items-center gap-3 text-white font-black text-xs uppercase tracking-[0.2em] italic">
                  <GraduationCap className="w-[20px] h-[20px] text-brand-primary" /> Logic Visualization
               </h5>
               <div className="border-l-4 border-white/5 pl-8 italic">
                  {viewMode === 'beginner' ? (
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">
                       Think of this like a **Factory Conveyor Belt**. The source items are moved one by one through specialized machines. The **Filter** machine discards any parts that don't match specifications, the **Map** machine modifies the parts, and the **Collect** bin stores the finished product.
                    </p>
                  ) : (
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">
                       Java Streams utilize **Lazy Execution**. Intermediate operations (filter, map) are not executed until the Terminal operation (collect, find) is invoked. This visualizer demonstrates the **internal per-element transversal**, optimizing memory by processing one element through the entire pipeline at a time.
                    </p>
                  )}
               </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
               <div className="p-8 bg-white/2 rounded-[2rem] border border-white/5 flex flex-col justify-center border-b-4 border-b-brand-primary/20 hover:bg-white/5 transition-all">
                  <h6 className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 italic">Pipeline efficiency</h6>
                  <p className="text-sm text-white font-black italic">1-Pass Sequential</p>
               </div>
               <div className="p-8 bg-white/2 rounded-[2rem] border border-white/5 flex flex-col justify-center border-b-4 border-b-brand-secondary/20 hover:bg-white/5 transition-all">
                  <h6 className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 italic">Architecture</h6>
                  <p className="text-sm text-brand-secondary font-black italic">Functional Paradigms</p>
               </div>
            </div>
         </div>
      </div>
    </Card>
  );
};

export default StreamPipelineVisualizer;
