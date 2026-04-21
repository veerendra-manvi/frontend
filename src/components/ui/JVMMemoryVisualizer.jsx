import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, 
  ArrowRight, 
  Zap, 
  Trash2, 
  RotateCcw, 
  Info,
  GraduationCap,
  Hammer,
  Brain
} from 'lucide-react';
import { Card, Badge, PrimaryButton, SecondaryButton } from './index';

const JVMMemoryVisualizer = () => {
  const [viewMode, setViewMode] = useState('beginner');
  const [stack, setStack] = useState([{ id: 'frame-1', method: 'main()', vars: [] }]);
  const [heap, setHeap] = useState([]);
  const [refs, setRefs] = useState({}); // { varId: heapObjId }
  const [status, setStatus] = useState("JVM initialized. Stack 'main()' frame created.");

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
    
    setHeap(prev => [...prev, { id: objId, label: 'UserObj', isGarbage: false }]);
    
    setStack(prev => {
      const next = [...prev];
      const topFrame = { ...next[next.length - 1] };
      topFrame.vars = [...topFrame.vars, { id: varId, name: `u${topFrame.vars.length + 1}` }];
      next[next.length - 1] = topFrame;
      return next;
    });

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
    <Card className="min-h-[750px] flex flex-col p-0 border-white/5 bg-[#0b0d12] overflow-hidden rounded-[3rem] shadow-2xl">
      
      {/* 1. Dashboard Controls */}
      <div className="p-8 md:p-12 bg-dark-sidebar/40 border-b border-white/5 space-y-8">
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
               <SecondaryButton onClick={createObject} className="px-6 py-3 text-[10px] font-black uppercase tracking-widest italic border-white/10 rounded-xl">new Object()</SecondaryButton>
               <SecondaryButton onClick={callMethod} className="px-6 py-3 text-[10px] font-black uppercase tracking-widest italic border-white/10 rounded-xl">callMethod()</SecondaryButton>
               <SecondaryButton onClick={popFrame} className="px-6 py-3 text-[10px] font-black uppercase tracking-widest italic border-white/10 rounded-xl">return;</SecondaryButton>
               <button onClick={GC} className="p-3 bg-brand-primary/10 border-2 border-brand-primary/20 rounded-xl text-brand-primary hover:bg-brand-primary/20 transition-all shadow-xl shadow-brand-primary/10 group">
                  <Trash2 className="w-[22px] h-[22px] group-hover:rotate-12 transition-transform" />
               </button>
               <button onClick={resetJVM} className="p-3 bg-white/5 border-2 border-white/5 rounded-xl text-slate-600 hover:text-white hover:border-white/10 transition-all">
                  <RotateCcw className="w-[22px] h-[22px]" />
               </button>
            </div>
         </div>

         <div className="flex items-center gap-6 bg-black/40 p-6 rounded-[2rem] border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500 shrink-0 border border-emerald-500/20 shadow-xl shadow-emerald-500/10">
               <Zap className="w-[22px] h-[22px]" fill="currentColor" />
            </div>
            <p className="text-emerald-500/80 font-mono text-sm tracking-wide italic font-medium">{status}</p>
         </div>
      </div>

      {/* 3. Memory Visualizers */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/5">
         
         {/* STACK COLUMN */}
         <div className="bg-[#05060a] p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(248,152,32,0.03)_0%,transparent_50%)]" />
            <Badge variant="ghost" className="mb-10 opacity-30 uppercase tracking-[0.3em] font-black text-[9px] italic border-none bg-white/5">LIFO JVM STACK</Badge>
            <div className="flex flex-col-reverse justify-start gap-8 h-full max-w-xs mx-auto relative z-10">
               <AnimatePresence>
                  {stack.map((frame, idx) => (
                    <motion.div 
                      key={frame.id}
                      initial={{ y: -50, scale: 0.9, opacity: 0 }}
                      animate={{ y: 0, scale: 1, opacity: 1 }}
                      exit={{ x: -100, opacity: 0 }}
                      className={`p-8 rounded-[2.5rem] border-2 shadow-2xl relative transition-all duration-500 ${idx === stack.length - 1 ? 'border-brand-primary bg-brand-primary/5 shadow-brand-primary/10' : 'border-white/5 bg-white/1'}`}
                    >
                       <div className="flex justify-between items-start mb-6">
                          <h4 className="font-black text-white text-base italic tracking-tight">{frame.method}</h4>
                          <span className="text-[8px] font-black uppercase text-slate-700 italic border border-white/5 px-2 py-0.5 rounded-full">Frame {idx + 1}</span>
                       </div>
                       <div className="space-y-3">
                          {frame.vars.map(v => (
                            <div key={v.id} className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5 group hover:border-brand-primary/20 transition-all">
                               <span className="text-[10px] font-bold text-slate-500 italic uppercase tracking-widest"><span className="text-brand-primary">ref</span> {v.name}</span>
                               <ArrowRight className={`w-[16px] h-[16px] transition-all duration-700 ${refs[v.id] ? 'text-brand-primary translate-x-1' : 'text-slate-800'}`} />
                            </div>
                          ))}
                          {frame.vars.length === 0 && <p className="text-[9px] text-slate-800 font-black uppercase tracking-widest text-center py-4 italic line-through opacity-40">empty local scope</p>}
                       </div>
                       {idx === stack.length - 1 && (
                         <div className="absolute -top-3 left-1/2 -track-x-1/2 bg-brand-primary text-white px-3 py-1 rounded-full text-[8px] font-black uppercase italic tracking-widest">Active Thread</div>
                       )}
                    </motion.div>
                  ))}
               </AnimatePresence>
            </div>
         </div>

         {/* HEAP COLUMN */}
         <div className="bg-[#06070a] p-12 relative overflow-hidden border-l border-white/5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(248,152,32,0.03)_0%,transparent_50%)]" />
            <Badge variant="ghost" className="mb-10 opacity-30 uppercase tracking-[0.3em] font-black text-[9px] italic border-none bg-white/5">DYNAMIC MANAGED HEAP</Badge>
            <div className="flex flex-wrap items-start justify-center gap-10 p-12 h-full border-2 border-dashed border-white/5 rounded-[3.5rem] relative z-10 bg-black/20">
               <AnimatePresence>
                  {heap.map(obj => (
                    <motion.div 
                      key={obj.id}
                      initial={{ scale: 0, rotate: -20, opacity: 0 }}
                      animate={{ 
                        scale: 1, 
                        rotate: obj.isGarbage ? 12 : 0,
                        opacity: obj.isGarbage ? 0.2 : 1,
                        backgroundColor: obj.isGarbage ? 'rgba(244,63,94,0.05)' : 'rgba(248,152,32,0.1)',
                        borderColor: obj.isGarbage ? 'rgba(244,63,94,0.3)' : '#f89820'
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="w-28 h-28 rounded-[2rem] border-2 flex flex-col items-center justify-center gap-2 p-5 relative group shadow-2xl transition-all duration-700"
                    >
                       {obj.isGarbage && (
                         <div className="absolute inset-0 flex items-center justify-center text-rose-500/40 animate-pulse">
                            <Trash2 className="w-[40px] h-[40px]" />
                         </div>
                       )}
                       <Database className={`w-[28px] h-[28px] transition-colors ${obj.isGarbage ? 'text-rose-500' : 'text-brand-primary'}`} />
                       <span className={`text-[9px] font-black uppercase tracking-widest italic ${obj.isGarbage ? 'text-rose-500' : 'text-white'}`}>{obj.label}</span>
                       <div className="text-[8px] font-black font-mono text-slate-700 mt-1">@0x{obj.id.slice(-4).toUpperCase()}</div>
                       
                       {!obj.isGarbage && (
                         <div className="absolute -top-2 -right-2 w-5 h-5 bg-emerald-500 rounded-full border-2 border-[#06070a] flex items-center justify-center shadow-lg">
                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                         </div>
                       )}
                    </motion.div>
                  ))}
               </AnimatePresence>
               {heap.length === 0 && (
                 <div className="flex flex-col items-center justify-center mt-24 space-y-6 opacity-10">
                    <Brain className="w-[80px] h-[80px] text-slate-800" />
                    <div className="text-slate-800 font-black uppercase text-xl tracking-[0.3em] italic">Heap Empty</div>
                 </div>
               )}
            </div>
         </div>
      </div>

      {/* 4. Education Footer */}
      <div className="p-10 bg-dark-sidebar/40 border-t border-white/5">
         <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1 space-y-6">
               <h5 className="flex items-center gap-3 text-white font-black text-xs uppercase tracking-[0.2em] italic">
                  <Info className="w-[20px] h-[20px] text-brand-primary" /> Architecture Intelligence
               </h5>
               <div className="border-l-4 border-white/5 pl-8 italic">
                  {viewMode === 'beginner' ? (
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">
                       Think of the **Stack** as your CPU's active workspace (what processing is happening *now*?) and the **Heap** as a shared long-term storage unit. Your stack frame doesn't hold the heavy objects—it just holds "memory pointers" (references) that locate the object in the heap.
                    </p>
                  ) : (
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">
                       The **JVM Stack** is thread-private, storing activation records for each method. The **Heap** is a global memory pool for class instances, managed by the **Garbage Collector** using root-reachability algorithms to reclaim unreferenced memory.
                    </p>
                  )}
               </div>
            </div>
            <div className="w-full md:w-80 grid grid-cols-2 gap-4">
               <div className="bg-white/2 p-6 border border-white/5 rounded-3xl text-center flex flex-col justify-center border-b-4 border-b-brand-primary/20">
                  <span className="text-[10px] font-black uppercase text-slate-600 tracking-widest block mb-2 italic">Active Threads</span>
                  <p className="text-2xl font-black text-white tabular-nums">01</p>
               </div>
               <div className="bg-white/2 p-6 border border-white/5 rounded-3xl text-center flex flex-col justify-center border-b-4 border-b-rose-500/20">
                  <span className="text-[10px] font-black uppercase text-slate-600 tracking-widest block mb-2 italic">Marked For GC</span>
                  <p className="text-2xl font-black text-rose-500 tabular-nums">{heap.filter(o => o.isGarbage).length}</p>
               </div>
            </div>
         </div>
      </div>

    </Card>
  );
};

export default JVMMemoryVisualizer;
