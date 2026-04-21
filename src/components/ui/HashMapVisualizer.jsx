import React, { useState, useEffect, useMemo } from 'react';
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
  Hammer
} from 'lucide-react';
import { Card, Badge, PrimaryButton, SecondaryButton } from './index';

const HashMapVisualizer = () => {
  const [viewMode, setViewMode] = useState('beginner'); // 'beginner' | 'developer'
  const [keyInput, setKeyInput] = useState('');
  const [valInput, setValInput] = useState('');
  const [buckets, setBuckets] = useState(() => Array(4).fill([]));
  const [capacity, setCapacity] = useState(4);
  const [size, setSize] = useState(0);
  const [status, setStatus] = useState('Ready for input');
  const [activeStep, setActiveStep] = useState(null); // 'hashing' | 'indexing' | 'placing' | 'finding' | 'rehashing'
  const [hashResult, setHashResult] = useState(null);
  const [targetIndex, setTargetIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [foundPath, setFoundPath] = useState(null); // { bucket: number, index: number }

  const loadFactor = size / capacity;
  const showResizeWarning = loadFactor >= 0.75;

  // Simple Hash Function Simulation
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
    
    setSize(prev => prev + 1);
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
    <Card className="min-h-[700px] flex flex-col p-0 border-white/5 bg-[#0b0d12] overflow-hidden">
      
      {/* 1. Controller Bar */}
      <div className="p-6 md:p-8 border-b border-white/5 bg-dark-sidebar/40 space-y-6">
         <div className="flex flex-wrap justify-between items-center gap-6">
            <div className="flex p-1.5 bg-white/5 rounded-2xl w-fit">
               <button onClick={() => setViewMode('beginner')} className={`px-6 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${viewMode === 'beginner' ? 'bg-brand-primary text-white shadow-lg' : 'text-slate-400'}`}>
                  <GraduationCap size={16}/> Beginner
               </button>
               <button onClick={() => setViewMode('developer')} className={`px-6 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${viewMode === 'developer' ? 'bg-brand-secondary text-white shadow-lg' : 'text-slate-400'}`}>
                  <Hammer size={16}/> Developer
               </button>
            </div>
            
            <div className="flex items-center gap-4">
               <input 
                 value={keyInput} onChange={e => setKeyInput(e.target.value)}
                 placeholder="KEY" className="w-24 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white font-mono text-sm outline-none focus:border-brand-primary/40" 
               />
               <input 
                 value={valInput} onChange={e => setValInput(e.target.value)}
                 placeholder="VAL" className="w-24 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white font-mono text-sm outline-none focus:border-brand-primary/40" 
               />
               <PrimaryButton onClick={handlePut} disabled={isPlaying} className="px-6 py-2.5 text-xs font-black uppercase tracking-wider">PUT</PrimaryButton>
               <SecondaryButton onClick={handleGet} disabled={isPlaying} className="px-6 py-2.5 text-xs font-black uppercase tracking-wider">GET</SecondaryButton>
               {showResizeWarning && (
                 <button onClick={handleResize} disabled={isPlaying} className="p-2.5 bg-rose-500/20 border-2 border-rose-500 rounded-xl text-rose-500 animate-bounce">
                    <Maximize size={20} />
                 </button>
               )}
            </div>
         </div>

         {/* 2. Logic Status Display */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 p-5 bg-white/5 rounded-[1.5rem] border border-white/5 flex items-center gap-4 overflow-hidden">
               <div className="p-3 bg-brand-primary/10 rounded-xl text-brand-primary shrink-0 animate-pulse">
                  <Info size={20} />
               </div>
               <p className="text-slate-300 font-bold text-sm tracking-wide">{status}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                  <p className="text-[10px] font-black uppercase text-slate-600 tracking-widest mb-1">Load Factor</p>
                  <p className={`text-xl font-black ${loadFactor >= 0.75 ? 'text-rose-500' : 'text-emerald-500'}`}>{loadFactor.toFixed(2)}</p>
               </div>
               <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                  <p className="text-[10px] font-black uppercase text-slate-600 tracking-widest mb-1">Capacity</p>
                  <p className="text-xl font-black text-white">{capacity}</p>
               </div>
            </div>
         </div>
      </div>

      {/* 3. Visualizer Canvas Area */}
      <div className="flex-1 relative bg-[#06070a] p-10 overflow-x-auto min-w-full">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(248,152,32,0.03)_0%,transparent_60%)]" />
         
         <div className="relative z-10 flex flex-nowrap gap-8 h-full">
            {buckets.map((bucket, bIdx) => (
              <div key={bIdx} className="flex flex-col items-center gap-4">
                 <div className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Bucket {bIdx}</div>
                 
                 <div className={`
                    w-40 min-h-[160px] border-2 rounded-3xl p-3 flex flex-col gap-3 transition-all duration-300
                    ${targetIndex === bIdx ? 'border-brand-primary bg-brand-primary/5 shadow-2xl scale-105' : 'border-white/5 bg-white/2'}
                 `}>
                    <AnimatePresence>
                       {bucket.map((node, nIdx) => (
                         <motion.div 
                           key={node.key}
                           initial={{ scale: 0, opacity: 0, y: -20 }}
                           animate={{ 
                             scale: 1, 
                             opacity: 1, 
                             y: 0,
                             borderColor: (foundPath && foundPath.bucket === bIdx && foundPath.index === nIdx) ? '#f89820' : 'rgba(255,255,255,0.05)',
                             backgroundColor: (foundPath && foundPath.bucket === bIdx && foundPath.index === nIdx) ? 'rgba(248,152,32,0.1)' : 'rgba(255,255,255,0.03)'
                           }}
                           className="p-4 border-[1.5px] rounded-2xl shadow-xl flex flex-col gap-1 relative group"
                         >
                            <span className="text-[10px] font-black uppercase tracking-tighter text-slate-600">Entry</span>
                            <span className="text-xs font-bold text-white truncate"><span className="text-brand-primary">K:</span> {node.key}</span>
                            <span className="text-xs font-bold text-slate-400 truncate"><span className="text-slate-600">V:</span> {node.val}</span>
                            
                            {/* Chaining Indicator */}
                            {nIdx < bucket.length - 1 && (
                              <div className="absolute -bottom-4 left-1/2 -track-x-1/2 w-0.5 h-4 bg-slate-700" />
                            )}
                         </motion.div>
                       ))}
                    </AnimatePresence>
                    {bucket.length === 0 && (
                      <div className="h-full flex items-center justify-center opacity-20"><Database size={32} className="text-slate-800" /></div>
                    )}
                 </div>
              </div>
            ))}
         </div>

         {/* Hashing Visual Pipeline Overlay */}
         <AnimatePresence>
            {activeStep === 'hashing' && (
              <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }}
                className="absolute top-1/4 left-1/2 -translate-x-1/2 z-30 p-8 bg-dark-bg/90 border-2 border-brand-primary rounded-[2.5rem] shadow-[0_0_100px_rgba(248,152,32,0.3)] backdrop-blur-xl text-center"
              >
                 <Zap className="mx-auto text-brand-primary mb-4 animate-bounce" size={48}/>
                 <h3 className="text-4xl font-black text-white italic mb-2">HASHING</h3>
                 <p className="text-brand-primary font-mono text-2xl font-black">{hashResult}</p>
              </motion.div>
            )}
         </AnimatePresence>
      </div>

      {/* 4. Footer Education Panel */}
      <div className="p-8 border-t border-white/5 bg-dark-sidebar/20">
         {viewMode === 'beginner' ? (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-5">
              <div className="space-y-4">
                 <h5 className="flex items-center gap-2 text-white font-bold uppercase tracking-widest"><GraduationCap size={18} className="text-brand-primary"/> What's Happening?</h5>
                 <p className="text-sm text-slate-400 leading-relaxed">
                    A HashMap is like a giant library. When you "PUT" a book (key/value), we use a **Hash Function** to decide which shelf (bucket) it goes on. If a shelf is full, we use a **Chain** to hang the book below others.
                 </p>
              </div>
              <div className="space-y-4">
                 <h5 className="flex items-center gap-2 text-white font-bold uppercase tracking-widest"><RotateCcw size={18} className="text-brand-secondary"/> Why use Hashes?</h5>
                 <p className="text-sm text-slate-400 leading-relaxed">
                    It makes finding things incredibly fast! Instead of searching every shelf, we just jump straight to the shelf index calculated from the key.
                 </p>
              </div>
           </div>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-5">
              <div className="p-6 bg-white/2 rounded-2xl border border-white/5">
                 <h6 className="text-[10px] font-black uppercase text-brand-primary tracking-[0.2em] mb-4">Complexity</h6>
                 <div className="space-y-2">
                    <div className="flex justify-between text-xs"><span className="text-slate-500">Average:</span> <span className="text-emerald-500 font-bold">O(1)</span></div>
                    <div className="flex justify-between text-xs"><span className="text-slate-500">Worst Case:</span> <span className="text-rose-500 font-bold">O(n)</span></div>
                 </div>
              </div>
              <div className="p-6 bg-white/2 rounded-2xl border border-white/5">
                 <h6 className="text-[10px] font-black uppercase text-brand-secondary tracking-[0.2em] mb-4">Collisions</h6>
                 <p className="text-[11px] text-slate-400 leading-relaxed">
                    Using **Singly Linked Lists** for chaining. Java 8+ converts long chains to **Balanced Trees** after 8 nodes to maintain O(log n).
                 </p>
              </div>
              <div className="p-6 bg-white/2 rounded-2xl border border-white/5">
                 <h6 className="text-[10px] font-black uppercase text-brand-primary tracking-[0.2em] mb-4">Rehashing</h6>
                 <p className="text-[11px] text-slate-400 leading-relaxed">
                    When load factor reaches 0.75, capacity doubles and every entry is rehashed for better distribution.
                 </p>
              </div>
           </div>
         )}
      </div>

    </Card>
  );
};

export default HashMapVisualizer;
