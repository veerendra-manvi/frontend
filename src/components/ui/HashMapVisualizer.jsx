import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, 
  Zap, 
  Search, 
  PlusCircle, 
  AlertTriangle, 
  Info,
  Maximize,
  RotateCcw,
  Play,
  Pause,
  ChevronRight,
  GraduationCap,
  Hammer,
  Brain
} from 'lucide-react';
import { Card, Badge, PrimaryButton, SecondaryButton } from './index';

const HashMapVisualizer = () => {
  const [viewMode, setViewMode] = useState('beginner'); // 'beginner' | 'developer'
  const [keyInput, setKeyInput] = useState('');
  const [valInput, setValInput] = useState('');
  const [buckets, setBuckets] = useState(() => Array(4).fill([]).map(() => []));
  const [capacity, setCapacity] = useState(4);
  const [entryCount, setEntryCount] = useState(0); // Renamed from size to avoid conflict with future icon size props
  const [status, setStatus] = useState('Ready for input');
  const [activeStep, setActiveStep] = useState(null); // 'hashing' | 'indexing' | 'placing' | 'finding' | 'rehashing'
  const [hashResult, setHashResult] = useState(null);
  const [targetIndex, setTargetIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [foundPath, setFoundPath] = useState(null); // { bucket: number, index: number }

  const loadFactor = entryCount / capacity;
  const showResizeWarning = loadFactor >= 0.75;

  const simulateHash = (key) => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash = ((hash << 5) - hash) + key.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
  };

  const handlePut = async () => {
    if (!keyInput) return;
    setIsPlaying(true);
    setStatus(`Calculating Hash for "${keyInput}"...`);
    setActiveStep('hashing');
    
    const h = simulateHash(keyInput);
    setHashResult(h);
    await new Promise(r => setTimeout(r, 1000));
    
    const idx = h % capacity;
    setTargetIndex(idx);
    setStatus(`Mapping Hash ${h} to Index ${idx} (hash % capacity)...`);
    setActiveStep('indexing');
    await new Promise(r => setTimeout(r, 1000));

    setActiveStep('placing');
    setStatus(`Checking for collisions at Index ${idx}...`);
    await new Promise(r => setTimeout(r, 800));

    setBuckets(prev => {
      const next = [...prev];
      const existing = next[idx].findIndex(node => node.key === keyInput);
      if (existing !== -1) {
        next[idx][existing] = { key: keyInput, val: valInput || 'val' };
        setStatus(`Key "${keyInput}" exists! Overwriting value.`);
      } else {
        next[idx] = [...next[idx], { key: keyInput, val: valInput || 'val' }];
        if (next[idx].length > 1) setStatus(`Collision detected! Using chaining.`);
        else setStatus(`Placed "${keyInput}" in empty bucket.`);
      }
      return next;
    });
    
    setEntryCount(prev => prev + 1);
    setIsPlaying(false);
    setActiveStep(null);
    setKeyInput('');
    setValInput('');
  };

  const handleGet = async () => {
    if (!keyInput) return;
    setIsPlaying(true);
    setStatus(`Searching for "${keyInput}"...`);
    
    const h = simulateHash(keyInput);
    const idx = h % capacity;
    setTargetIndex(idx);
    setActiveStep('hashing');
    await new Promise(r => setTimeout(r, 800));
    
    setActiveStep('indexing');
    await new Promise(r => setTimeout(r, 800));

    const bucket = buckets[idx];
    const nodeIdx = bucket.findIndex(n => n.key === keyInput);
    
    if (nodeIdx !== -1) {
       for(let i=0; i<=nodeIdx; i++) {
          setFoundPath({ bucket: idx, index: i });
          setStatus(`Scanning bucket chain... ${i+1}`);
          await new Promise(r => setTimeout(r, 500));
       }
       setStatus(`SUCCESS: Found "${keyInput}" -> "${bucket[nodeIdx].val}"`);
    } else {
       setStatus(`ERROR: Key "${keyInput}" not found in bucket ${idx}.`);
    }
    
    setIsPlaying(false);
    setActiveStep(null);
    setTimeout(() => { setFoundPath(null); setTargetIndex(null); }, 3000);
  };

  const handleResize = async () => {
    setIsPlaying(true);
    setStatus("Load Factor > 0.75! Triggering Resize & Rehash...");
    setActiveStep('rehashing');
    await new Promise(r => setTimeout(r, 1500));
    
    const oldBuckets = buckets.flat();
    const newCap = capacity * 2;
    const newBuckets = Array(newCap).fill([]).map(() => []);

    for (const node of oldBuckets) {
      const h = simulateHash(node.key);
      const idx = h % newCap;
      newBuckets[idx].push(node);
      setBuckets([...newBuckets]);
      setStatus(`Rehashing "${node.key}" to new Index ${idx}...`);
      await new Promise(r => setTimeout(r, 400));
    }

    setCapacity(newCap);
    setBuckets(newBuckets);
    setStatus(`Resize Complete! Capacity is now ${newCap}.`);
    setIsPlaying(false);
    setActiveStep(null);
  };

  return (
    <Card className="min-h-[700px] flex flex-col p-0 border-white/5 bg-[#0b0d12] overflow-hidden rounded-[3rem] shadow-2xl">
      
      {/* 1. Controller Bar */}
      <div className="p-8 md:p-12 border-b border-white/5 bg-dark-sidebar/40 space-y-10">
         <div className="flex flex-wrap justify-between items-center gap-10">
            <div className="flex p-1.5 bg-white/5 rounded-2xl w-fit border border-white/5">
               <button onClick={() => setViewMode('beginner')} className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 italic ${viewMode === 'beginner' ? 'bg-brand-primary text-white shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}>
                  <GraduationCap className="w-[16px] h-[16px]"/> Conceptual
               </button>
               <button onClick={() => setViewMode('developer')} className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 italic ${viewMode === 'developer' ? 'bg-brand-secondary text-white shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}>
                  <Hammer className="w-[16px] h-[16px]"/> Developer
               </button>
            </div>
            
            <div className="flex items-center gap-4">
               <div className="relative group">
                  <input 
                    value={keyInput} onChange={e => setKeyInput(e.target.value)}
                    placeholder="KEY" className="w-28 bg-black/40 border-2 border-white/5 rounded-xl px-4 py-2.5 text-brand-primary font-mono text-sm outline-none focus:border-brand-primary/40 transition-all italic" 
                  />
                  <div className="absolute -top-2 left-3 bg-[#0b0d12] px-1 text-[8px] font-black text-slate-700 tracking-tighter italic">VARIABLE</div>
               </div>
               <div className="relative group">
                  <input 
                    value={valInput} onChange={e => setValInput(e.target.value)}
                    placeholder="VAL" className="w-28 bg-black/40 border-2 border-white/5 rounded-xl px-4 py-2.5 text-white font-mono text-sm outline-none focus:border-brand-primary/40 transition-all italic" 
                  />
                  <div className="absolute -top-2 left-3 bg-[#0b0d12] px-1 text-[8px] font-black text-slate-700 tracking-tighter italic">LITERAL</div>
               </div>
               <PrimaryButton onClick={handlePut} disabled={isPlaying} className="px-8 py-3 text-[10px] font-black uppercase tracking-widest">PUT()</PrimaryButton>
               <SecondaryButton onClick={handleGet} disabled={isPlaying} className="px-8 py-3 text-[10px] font-black uppercase tracking-widest border-white/10 italic">GET()</SecondaryButton>
               {showResizeWarning && (
                 <button onClick={handleResize} disabled={isPlaying} className="p-3 bg-rose-500/10 border-2 border-rose-500/40 rounded-xl text-rose-500 animate-pulse shadow-xl shadow-rose-500/20">
                    <Maximize className="w-[20px] h-[20px]" />
                 </button>
               )}
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 p-6 bg-black/40 rounded-[2rem] border border-white/5 flex items-center gap-6 overflow-hidden relative group">
               <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
               <div className="p-3 bg-brand-primary/10 rounded-2xl text-brand-primary shrink-0 animate-pulse border border-brand-primary/20">
                  <Info className="w-[22px] h-[22px]" />
               </div>
               <p className="text-slate-300 font-bold text-sm tracking-wide italic">{status}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 bg-white/2 rounded-3xl border border-white/5 text-center flex flex-col justify-center border-b-4 border-b-brand-primary/20 transition-all hover:bg-white/5">
                  <p className="text-[9px] font-black uppercase text-slate-600 tracking-widest mb-1 italic">Load Factor</p>
                  <p className={`text-2xl font-black tabular-nums transition-colors ${loadFactor >= 0.75 ? 'text-rose-500' : 'text-emerald-500'}`}>{loadFactor.toFixed(2)}</p>
               </div>
               <div className="p-4 bg-white/2 rounded-3xl border border-white/5 text-center flex flex-col justify-center border-b-4 border-b-white/10 transition-all hover:bg-white/5">
                  <p className="text-[9px] font-black uppercase text-slate-600 tracking-widest mb-1 italic">Buckets</p>
                  <p className="text-2xl font-black text-white tabular-nums">{capacity}</p>
               </div>
            </div>
         </div>
      </div>

      {/* 3. Visualizer Canvas Area */}
      <div className="flex-1 relative bg-[#06070a] p-12 overflow-x-auto min-w-full">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(248,152,32,0.05)_0%,transparent_60%)]" />
         
         <div className="relative z-10 flex flex-nowrap gap-12 h-full">
            {buckets.map((bucket, bIdx) => (
              <div key={bIdx} className="flex flex-col items-center gap-6">
                 <Badge variant="ghost" className="text-[9px] font-black text-slate-700 bg-white/2 uppercase tracking-tighter italic border-white/5">Zone @0x{bIdx.toString(16).toUpperCase()}</Badge>
                 
                 <div className={`
                    w-48 min-h-[180px] border-2 rounded-[2.5rem] p-4 flex flex-col gap-4 transition-all duration-700
                    ${targetIndex === bIdx ? 'border-brand-primary bg-brand-primary/5 shadow-2xl scale-105 shadow-brand-primary/10' : 'border-white/5 bg-white/1'}
                 `}>
                    <AnimatePresence>
                       {bucket.map((node, nIdx) => (
                         <motion.div 
                           key={node.key}
                           initial={{ scale: 0.8, opacity: 0, y: -20 }}
                           animate={{ 
                             scale: 1, 
                             opacity: 1, 
                             y: 0,
                             borderColor: (foundPath && foundPath.bucket === bIdx && foundPath.index === nIdx) ? '#f89820' : 'rgba(255,255,255,0.03)',
                             backgroundColor: (foundPath && foundPath.bucket === bIdx && foundPath.index === nIdx) ? 'rgba(248,152,32,0.1)' : 'rgba(255,255,255,0.02)'
                           }}
                           className="p-5 border-[2px] rounded-[1.5rem] shadow-2xl flex flex-col gap-2 relative group overflow-hidden"
                         >
                            <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-20 transition-opacity">
                               <Database className="w-[32px] h-[32px]" />
                            </div>
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-brand-primary italic">Node Entry</span>
                            <span className="text-xs font-bold text-white truncate italic"><span className="text-slate-600">Key :</span> {node.key}</span>
                            <span className="text-xs font-black text-slate-400 truncate italic"><span className="text-slate-600">Val :</span> {node.val}</span>
                            
                            {nIdx < bucket.length - 1 && (
                              <div className="absolute -bottom-5 left-1/2 -ml-px w-0.5 h-5 bg-gradient-to-b from-brand-primary to-transparent opacity-40 shadow-xl" />
                            )}
                         </motion.div>
                       ))}
                    </AnimatePresence>
                    {bucket.length === 0 && (
                      <div className="h-full flex items-center justify-center opacity-10">
                         <Database className="w-[48px] h-[48px] text-slate-800" />
                      </div>
                    )}
                 </div>
              </div>
            ))}
         </div>

         <AnimatePresence>
            {activeStep === 'hashing' && (
              <motion.div initial={{ y: 50, scale: 0.9, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: -50, scale: 0.9, opacity: 0 }}
                className="absolute top-1/4 left-1/2 -translate-x-1/2 z-30 p-12 bg-dark-bg/80 border-2 border-brand-primary rounded-[3rem] shadow-[0_0_120px_rgba(248,152,32,0.3)] backdrop-blur-3xl text-center min-w-[300px]"
              >
                 <div className="absolute inset-0 bg-brand-primary/10 animate-pulse rounded-[3rem]" />
                 <div className="relative z-10">
                    <Zap className="mx-auto text-brand-primary mb-6 animate-bounce w-[64px] h-[64px]"/>
                    <h3 className="text-4xl font-black text-white italic mb-2 tracking-tighter underline decoration-brand-primary/20 decoration-8 underline-offset-8">HASHING</h3>
                    <p className="text-brand-primary font-mono text-3xl font-black tracking-widest">{hashResult}</p>
                    <p className="text-[9px] text-slate-500 font-black uppercase mt-4 tracking-[0.3em] italic">Calculating Memory Pointer</p>
                 </div>
              </motion.div>
            )}
         </AnimatePresence>
      </div>

      {/* 4. Footer Education Panel */}
      <div className="p-10 border-t border-white/5 bg-dark-sidebar/40">
         {viewMode === 'beginner' ? (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-in fade-in slide-in-from-bottom-5">
              <div className="space-y-6">
                 <h5 className="flex items-center gap-3 text-white font-black text-xs uppercase tracking-[0.2em] italic">
                    <GraduationCap className="w-[20px] h-[20px] text-brand-primary"/> Tactical Overview
                 </h5>
                 <p className="text-sm text-slate-400 leading-relaxed font-medium italic border-l-4 border-white/5 pl-8">
                    A HashMap is like a high-density tactical warehouse. When you "PUT" a book (key/value), we use a **Hash Function** to decrypt a destination shelf index. If shelves collide, we use **Chaining** to maintain data integrity without overwriting.
                 </p>
              </div>
              <div className="space-y-6">
                 <h5 className="flex items-center gap-3 text-white font-black text-xs uppercase tracking-[0.2em] italic">
                    <RotateCcw className="w-[20px] h-[20px] text-brand-secondary"/> Retrieval Logic
                 </h5>
                 <p className="text-sm text-slate-400 leading-relaxed font-medium italic border-l-4 border-white/5 pl-8">
                    Dominance in retrieval! Instead of scanning the entire warehouse, we use the hash to teleport directly to the specific shelf (O(1) complexity).
                 </p>
              </div>
           </div>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-5">
              <div className="p-8 bg-white/2 rounded-[2rem] border border-white/5 relative group overflow-hidden">
                 <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                 <h6 className="text-[9px] font-black uppercase text-brand-primary tracking-[0.3em] mb-6 italic underline decoration-brand-primary/20">Asymptotic Complexity</h6>
                 <div className="space-y-4">
                    <div className="flex justify-between text-xs italic font-bold"><span className="text-slate-500">Average Case:</span> <span className="text-emerald-500">O(1)</span></div>
                    <div className="flex justify-between text-xs italic font-bold"><span className="text-slate-500">Hash Collision:</span> <span className="text-rose-500">O(n)</span></div>
                 </div>
              </div>
              <div className="p-8 bg-white/2 rounded-[2rem] border border-white/5 relative group overflow-hidden">
                 <div className="absolute inset-0 bg-brand-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                 <h6 className="text-[9px] font-black uppercase text-brand-secondary tracking-[0.3em] mb-6 italic underline decoration-brand-secondary/20">Memory Layout</h6>
                 <p className="text-[11px] text-slate-400 leading-relaxed font-medium italic">
                    Java 8+ optimization: Singly linked lists are converted to **Balanced Red-Black Trees** after 8 nodes in a single bucket to ensure O(log n) worst-case stability.
                 </p>
              </div>
              <div className="p-8 bg-white/2 rounded-[2rem] border border-white/5 relative group overflow-hidden">
                 <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                 <h6 className="text-[9px] font-black uppercase text-brand-primary tracking-[0.3em] mb-6 italic underline decoration-brand-primary/20">Binary Resize</h6>
                 <p className="text-[11px] text-slate-400 leading-relaxed font-medium italic">
                    Threshold: **0.75 (Default)**. Upon reaching load capacity, the table doubles in size and a deep rehash of all existing nodes occurs to redistibute data.
                 </p>
              </div>
           </div>
         )}
      </div>

    </Card>
  );
};

export default HashMapVisualizer;
