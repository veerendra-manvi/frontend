import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, 
  Database, 
  ArrowRight, 
  Zap, 
  Trash2, 
  Cpu, 
  Play, 
  Pause, 
  RotateCcw, 
  StepForward,
  Info,
  GraduationCap,
  Hammer
} from 'lucide-react';
import { Card, Badge, PrimaryButton, SecondaryButton } from './index';

const JVMMemoryVisualizer = () => {
  const [viewMode, setViewMode] = useState('beginner');
  const [stack, setStack] = useState([{ id: 'frame-1', method: 'main()', vars: [] }]);
  const [heap, setHeap] = useState([]);
  const [refs, setRefs] = useState({}); // { varId: heapObjId }
  const [status, setStatus] = useState("JVM initialized. Stack 'main()' frame created.");
  const [isPlaying, setIsPlaying] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const GC = () => {
    setStatus("Running Mark-and-Sweep Garbage Collector...");
    const reachableHeapIds = new Set(Object.values(refs));
    setHeap(prev => prev.map(obj => ({
      ...obj,
      isGarbage: !reachableHeapIds.has(obj.id)
    })));

    setTimeout(() => {
      setHeap(prev => prev.filter(obj => reachableHeapIds.has(obj.id)));
      setStatus("GC cleared unreachable objects from Heap.");
    }, 1500);
  };

  const createObject = () => {
    const objId = `obj-${Date.now()}`;
    const varId = `var-${Date.now()}`;
    
    // 1. New object in heap
    setHeap(prev => [...prev, { id: objId, label: 'UserObj', isGarbage: false }]);
    
    // 2. New variable in current (top) stack frame
    setStack(prev => {
      const next = [...prev];
      const topFrame = { ...next[next.length - 1] };
      topFrame.vars = [...topFrame.vars, { id: varId, name: `u${topFrame.vars.length + 1}` }];
      next[next.length - 1] = topFrame;
      return next;
    });

    // 3. Create reference
    setRefs(prev => ({ ...prev, [varId]: objId }));
    setStatus("New Object allocated on Heap. Reference created on Stack.");
  };

  const callMethod = () => {
    const frameId = `frame-${Date.now()}`;
    setStack(prev => [...prev, { id: frameId, method: 'doWork()', vars: [] }]);
    setStatus("New Stack Frame pushed for 'doWork()'. Local scope initialized.");
  };

  const popFrame = () => {
    if (stack.length <= 1) return;
    const dyingFrame = stack[stack.length - 1];
    setStack(prev => prev.slice(0, -1));
    
    // Cleanup refs from that frame
    setRefs(prev => {
       const next = { ...prev };
       dyingFrame.vars.forEach(v => delete next[v.id]);
       return next;
    });
    setStatus("Method 'doWork()' returned. Stack frame popped. Local references lost.");
  };

  const resetJVM = () => {
    setStack([{ id: 'frame-1', method: 'main()', vars: [] }]);
    setHeap([]);
    setRefs({});
    setStatus("JVM Reset. Memory cleared.");
  };

  return (
    <Card className="min-h-[750px] flex flex-col p-0 border-white/5 bg-[#0b0d12] overflow-hidden">
      
      {/* 1. Dashboard Controls */}
      <div className="p-6 md:p-8 bg-dark-sidebar/40 border-b border-white/5 space-y-6">
         <div className="flex flex-wrap justify-between items-center gap-6">
            <div className="flex p-1 bg-white/5 rounded-2xl">
               <button onClick={() => setViewMode('beginner')} className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${viewMode === 'beginner' ? 'bg-brand-primary text-white shadow-lg' : 'text-slate-400'}`}>
                  <GraduationCap size={16}/> Beginner
               </button>
               <button onClick={() => setViewMode('developer')} className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${viewMode === 'developer' ? 'bg-brand-secondary text-white shadow-lg' : 'text-slate-400'}`}>
                  <Hammer size={16}/> Developer
               </button>
            </div>
            
            <div className="flex items-center gap-3">
               <SecondaryButton onClick={createObject} className="px-4 py-2 text-xs font-black uppercase">new Object()</SecondaryButton>
               <SecondaryButton onClick={callMethod} className="px-4 py-2 text-xs font-black uppercase">callMethod()</SecondaryButton>
               <SecondaryButton onClick={popFrame} className="px-4 py-2 text-xs font-black uppercase tracking-tighter">return</SecondaryButton>
               <button onClick={GC} className="p-2.5 bg-brand-primary/10 border border-brand-primary/30 rounded-xl text-brand-primary hover:bg-brand-primary/20 transition-all">
                  <Trash2 size={20} />
               </button>
               <button onClick={resetJVM} className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-500 hover:text-white">
                  <RotateCcw size={20} />
               </button>
            </div>
         </div>

         {/* 2. Status Terminal */}
         <div className="flex items-center gap-4 bg-black/40 p-4 rounded-2xl border border-white/5">
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500 shrink-0">
               <Zap size={18} fill="currentColor" />
            </div>
            <p className="text-emerald-500/80 font-mono text-sm tracking-wide">{status}</p>
         </div>
      </div>

      {/* 3. Memory Visualizers */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/5">
         
         {/* STACK COLUMN */}
         <div className="bg-[#05060a] p-10 relative overflow-hidden">
            <Badge variant="ghost" className="mb-6 opacity-40 uppercase tracking-[0.3em] font-black">JVM STACK</Badge>
            <div className="flex flex-col-reverse justify-start gap-6 h-full max-w-xs mx-auto">
               <AnimatePresence>
                  {stack.map((frame, idx) => (
                    <motion.div 
                      key={frame.id}
                      initial={{ y: -50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ x: -100, opacity: 0 }}
                      className={`p-6 rounded-[2rem] border-2 shadow-2xl relative ${idx === stack.length - 1 ? 'border-brand-primary bg-brand-primary/5' : 'border-white/5 bg-white/1'}`}
                    >
                       <div className="flex justify-between items-start mb-4">
                          <h4 className="font-bold text-white text-sm">{frame.method}</h4>
                          <span className="text-[9px] font-black uppercase text-slate-600">Frame {idx + 1}</span>
                       </div>
                       <div className="space-y-2">
                          {frame.vars.map(v => (
                            <div key={v.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 group">
                               <span className="text-xs font-mono text-slate-400">ref <span className="text-brand-primary">{v.name}</span></span>
                               <ArrowRight size={14} className={`transition-all duration-500 ${refs[v.id] ? 'text-brand-primary translate-x-2' : 'text-slate-800'}`} />
                            </div>
                          ))}
                          {frame.vars.length === 0 && <p className="text-[10px] text-slate-700 italic text-center py-2 line-through">empty local scope</p>}
                       </div>
                    </motion.div>
                  ))}
               </AnimatePresence>
            </div>
         </div>

         {/* HEAP COLUMN */}
         <div className="bg-[#06070a] p-10 relative overflow-hidden border-l border-white/5">
            <Badge variant="ghost" className="mb-6 opacity-40 uppercase tracking-[0.3em] font-black">MANAGED HEAP</Badge>
            <div className="flex flex-wrap items-start justify-center gap-6 p-10 h-full border-2 border-dashed border-white/5 rounded-[3rem]">
               <AnimatePresence>
                  {heap.map(obj => (
                    <motion.div 
                      key={obj.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: 1, 
                        opacity: obj.isGarbage ? 0.3 : 1,
                        rotate: obj.isGarbage ? 10 : 0,
                        backgroundColor: obj.isGarbage ? 'rgba(244,63,94,0.1)' : 'rgba(248,152,32,0.1)',
                        borderColor: obj.isGarbage ? 'rgba(244,63,94,0.5)' : '#f89820'
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="w-24 h-24 rounded-3xl border-2 flex flex-col items-center justify-center gap-2 p-4 relative group"
                    >
                       {obj.isGarbage && (
                         <div className="absolute inset-0 flex items-center justify-center text-rose-500 animate-pulse">
                            <Trash2 size={32} />
                         </div>
                       )}
                       <Database size={24} className={obj.isGarbage ? 'text-rose-500' : 'text-brand-primary'} />
                       <span className={`text-[10px] font-bold uppercase tracking-widest ${obj.isGarbage ? 'text-rose-500' : 'text-white'}`}>{obj.label}</span>
                       <div className="text-[10px] font-mono text-slate-500">@{obj.id.slice(-4)}</div>
                    </motion.div>
                  ))}
               </AnimatePresence>
               {heap.length === 0 && <div className="text-slate-800 font-black uppercase text-xl opacity-20 mt-20 italic">No Objects Allocated</div>}
            </div>
         </div>
      </div>

      {/* 4. Education Footer */}
      <div className="p-8 bg-dark-sidebar/40 border-t border-white/5">
         <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1 space-y-4">
               <h5 className="flex items-center gap-2 text-white font-bold uppercase tracking-widest">
                  <Info size={16} className="text-brand-primary" /> Key Insight
               </h5>
               {viewMode === 'beginner' ? (
                 <p className="text-sm text-slate-400 leading-relaxed font-medium">
                    Think of the **Stack** as your brain's workspace (what are you doing *now*?) and the **Heap** as a giant storage unit. Your brain doesn't hold the actual "stuff", it just holds "tags" (references) that tell you where the stuff is in storage.
                 </p>
               ) : (
                 <p className="text-sm text-slate-400 leading-relaxed font-medium">
                    The **JVM Stack** is private to each thread and stores frames. Each frame contains local variables, operand stacks, and dynamic linking info. The **Heap** is a shared area for all class instances and arrays, managed by the **Garbage Collector**.
                 </p>
               )}
            </div>
            <div className="w-full md:w-80 grid grid-cols-2 gap-4">
               <Card className="bg-white/5 p-4 border-white/5 text-center flex flex-col justify-center">
                  <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest block mb-1">Threads</span>
                  <p className="text-xl font-black text-white">01</p>
               </Card>
               <Card className="bg-white/5 p-4 border-white/5 text-center flex flex-col justify-center">
                  <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest block mb-1">Marked</span>
                  <p className="text-xl font-black text-rose-500">{heap.filter(o => o.isGarbage).length}</p>
               </Card>
            </div>
         </div>
      </div>

    </Card>
  );
};

export default JVMMemoryVisualizer;
