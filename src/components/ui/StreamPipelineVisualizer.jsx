import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Filter, 
  Zap, 
  CheckCircle2, 
  XCircle, 
  Play, 
  Pause, 
  RotateCcw, 
  StepForward,
  Info,
  GraduationCap,
  Hammer,
  Layers
} from 'lucide-react';
import { Card, Badge, PrimaryButton, SecondaryButton } from './index';

const StreamPipelineVisualizer = () => {
  const [viewMode, setViewMode] = useState('beginner');
  const [source, setSource] = useState([1, 2, 3, 4, 5, 6]);
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
    <Card className="min-h-[700px] flex flex-col p-0 border-white/5 bg-[#0b0d12] overflow-hidden">
      
      {/* 1. Header Controls */}
      <div className="p-8 border-b border-white/5 bg-dark-sidebar/40 space-y-6">
         <div className="flex flex-wrap justify-between items-center gap-6">
            <div className="flex p-1 bg-white/5 rounded-2xl">
               <button onClick={() => setViewMode('beginner')} className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${viewMode === 'beginner' ? 'bg-brand-primary text-white shadow-lg' : 'text-slate-400'}`}>
                  <GraduationCap size={16}/> Beginner
               </button>
               <button onClick={() => setViewMode('developer')} className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${viewMode === 'developer' ? 'bg-brand-secondary text-white shadow-lg' : 'text-slate-400'}`}>
                  <Hammer size={16}/> Developer
               </button>
            </div>
            
            <div className="flex items-center gap-4">
               <PrimaryButton onClick={startAutoPlay} disabled={isProcessing} className="px-8 py-3 text-xs font-black uppercase shadow-xl shadow-brand-primary/20">
                  <Play size={16} fill="white" className="mr-2" /> Start Pipeline
               </PrimaryButton>
               <SecondaryButton onClick={resetStream} className="p-3">
                  <RotateCcw size={18} />
               </SecondaryButton>
            </div>
         </div>

         {/* Status Bar */}
         <div className="p-4 bg-black/40 border border-white/5 rounded-2xl flex items-center gap-4">
            <div className="p-2 bg-brand-primary/10 rounded-lg text-brand-primary">
               <Zap size={18} fill="currentColor" />
            </div>
            <p className="text-slate-300 font-mono text-sm">{status}</p>
         </div>
      </div>

      {/* 2. Pipeline Canvas Area */}
      <div className="flex-1 relative bg-[#06070a] flex items-center overflow-x-auto p-12">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(248,152,32,0.02)_0%,transparent_70%)]" />
         
         <div className="relative z-10 flex items-center gap-10 w-full min-w-[1000px]">
             
             {/* STAGE: SOURCE */}
             <div className="flex flex-col items-center gap-4">
                <Badge variant="ghost" className="opacity-30">SOURCE</Badge>
                <div className={`w-40 min-h-[300px] border-2 rounded-[2.5rem] p-4 bg-white/2 flex flex-col gap-3 items-center justify-start ${activeStage === -1 ? 'border-brand-primary bg-brand-primary/5' : 'border-white/5'}`}>
                   {source.map((n, i) => (
                     <div key={i} className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white font-bold text-sm">
                        {n}
                     </div>
                   ))}
                </div>
             </div>

             <ArrowRight className="text-slate-800" size={32} />

             {/* STAGE: FILTER */}
             <div className="flex flex-col items-center gap-4">
                <Badge variant="ghost" className="opacity-30">INTERMEDIATE</Badge>
                <div className={`w-56 h-64 border-2 rounded-[2.5rem] p-6 flex flex-col items-center justify-center gap-4 transition-all duration-500 ${activeStage === 0 ? 'border-brand-primary bg-brand-primary/5 shadow-2xl scale-105' : 'border-white/5 bg-white/2'}`}>
                   <div className="p-4 bg-white/5 rounded-2xl text-slate-400"><Filter size={32} /></div>
                   <h4 className="text-xs font-black text-white uppercase tracking-widest">{STAGES[0].label}</h4>
                </div>
             </div>

             <ArrowRight className="text-slate-800" size={32} />

             {/* STAGE: MAP */}
             <div className="flex flex-col items-center gap-4">
                <Badge variant="ghost" className="opacity-30">INTERMEDIATE</Badge>
                <div className={`w-56 h-64 border-2 rounded-[2.5rem] p-6 flex flex-col items-center justify-center gap-4 transition-all duration-500 ${activeStage === 1 ? 'border-brand-secondary bg-brand-secondary/5 shadow-2xl scale-105' : 'border-white/5 bg-white/2'}`}>
                   <div className="p-4 bg-white/5 rounded-2xl text-slate-400"><Zap size={32} /></div>
                   <h4 className="text-xs font-black text-white uppercase tracking-widest">{STAGES[1].label}</h4>
                </div>
             </div>

             <ArrowRight className="text-slate-800" size={32} />

             {/* STAGE: COLLECT */}
             <div className="flex flex-col items-center gap-4">
                <Badge variant="ghost" className="opacity-30">TERMINAL</Badge>
                <div className={`w-48 min-h-[300px] border-2 rounded-[2.5rem] p-5 flex flex-col gap-3 items-center justify-start transition-all duration-500 ${activeStage === 2 ? 'border-emerald-500 bg-emerald-500/5 shadow-2xl' : 'border-white/5 bg-white/2'}`}>
                   <CheckCircle2 size={32} className="text-emerald-500 mb-2" />
                   {results.map((n, i) => (
                     <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} key={i} className="w-full py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center text-emerald-500 font-black">
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
                    initial={{ x: 0, opacity: 0 }}
                    animate={{ 
                       x: (activeStage === -1) ? 100 : (activeStage === 0) ? 300 : (activeStage === 1) ? 550 : 800,
                       opacity: 1,
                       scale: activeStage === 0 || activeStage === 1 ? 1.2 : 1
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                    className="absolute left-20 z-30 w-16 h-16 bg-brand-primary rounded-2xl shadow-[0_0_40px_rgba(248,152,32,0.4)] flex items-center justify-center text-white text-xl font-black border-2 border-white/20"
                  >
                     {activeItem.val}
                  </motion.div>
                )}
             </AnimatePresence>
         </div>
      </div>

      {/* 3. Education Footer */}
      <div className="p-10 border-t border-white/5 bg-dark-sidebar/40">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
               <h5 className="flex items-center gap-2 text-white font-bold uppercase tracking-widest">
                  <GraduationCap size={18} className="text-brand-primary" /> Mechanism Insight
               </h5>
               {viewMode === 'beginner' ? (
                 <p className="text-sm text-slate-400 leading-relaxed font-medium">
                    Think of this like a **Factory Conveyor Belt**. The source items are moved one by one through machines. The **Filter** machine blocks small numbers, the **Map** machine changes their shape, and the **Collect** bin catches the winners at the end.
                 </p>
               ) : (
                 <p className="text-sm text-slate-400 leading-relaxed font-medium">
                    Java Streams use **Lazy Evaluation**. Intermediate operations (filter/map) are not executed until the Terminal operation (collect) is called. This visualizer demonstrates the **per-element flow**, which is how Java internally processes the pipeline to minimize overhead.
                 </p>
               )}
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="p-6 bg-white/2 rounded-3xl border border-white/5">
                  <h6 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Efficiency</h6>
                  <p className="text-xs text-white font-bold">1-Pass Traversal</p>
               </div>
               <div className="p-6 bg-white/2 rounded-3xl border border-white/5">
                  <h6 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Type</h6>
                  <p className="text-xs text-brand-secondary font-bold">Intermediate Ops</p>
               </div>
            </div>
         </div>
      </div>
    </Card>
  );
};

export default StreamPipelineVisualizer;
