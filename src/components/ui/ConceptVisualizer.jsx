import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft,
  Info,
  Layers,
  Cpu,
  Grid,
  Database,
  Zap,
  ArrowRight
} from 'lucide-react';
import { Card, Badge, PrimaryButton } from './index';

const ConceptVisualizer = ({ 
  conceptType = 'inheritance', 
  steps = [], 
  currentStep = 0, 
  isPlaying = false,
  onPlay, 
  onPause, 
  onNext, 
  onPrev,
  onReset 
}) => {
  
  const currentStepData = steps[currentStep] || { title: 'Ready', desc: 'Click play to start simulation.' };

  const renderVisual = () => {
    switch (conceptType) {
      case 'inheritance': return <InheritanceVisual step={currentStep} />;
      case 'stackHeap': return <StackHeapVisual step={currentStep} />;
      case 'arrayList': return <ArrayListVisual step={currentStep} />;
      case 'hashMap': return <HashMapVisual step={currentStep} />;
      case 'streams': return <StreamsVisual step={currentStep} />;
      default: return <div className="text-slate-500 font-mono text-sm">Visualizer for {conceptType} pending...</div>;
    }
  };

  return (
    <Card className="p-0 border-white/5 bg-[#0b0d12] overflow-hidden shadow-2xl">
      {/* 1. Canvas Area */}
      <div className="aspect-video relative bg-[#06070a] flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(248,152,32,0.03)_0%,transparent_70%)]" />
        
        <div className="relative z-10 w-full h-full p-10 flex items-center justify-center">
           {renderVisual()}
        </div>

        {/* Step Info Overlay */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentStep}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="absolute bottom-6 left-6 right-6 p-4 bg-dark-bg/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl z-20"
          >
             <div className="flex gap-4">
                <div className="p-2 bg-brand-primary/10 rounded-lg h-fit">
                   <Info size={16} className="text-brand-primary" />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">{currentStepData.title}</p>
                   <p className="text-sm text-slate-300 font-medium leading-relaxed">{currentStepData.desc}</p>
                </div>
             </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. Controls & Timeline */}
      <div className="p-6 md:p-8 bg-dark-sidebar/40">
         <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
               <button onClick={onReset} className="p-3 bg-white/5 rounded-xl text-slate-500 hover:text-white transition-all"><RotateCcw size={20} /></button>
               <button onClick={onPrev} className="p-3 bg-white/5 rounded-xl text-slate-500 hover:text-white transition-all"><ChevronLeft size={20} /></button>
               <button 
                 onClick={() => isPlaying ? onPause() : onPlay()}
                 className={`p-5 rounded-2xl transition-all shadow-lg ${isPlaying ? 'bg-white/10 text-white' : 'bg-brand-primary text-white shadow-brand-primary/20'}`}
               >
                 {isPlaying ? <Pause size={28} /> : <Play size={28} fill="white" />}
               </button>
               <button onClick={onNext} className="p-3 bg-white/5 rounded-xl text-slate-500 hover:text-white transition-all"><ChevronRight size={20} /></button>
            </div>

            <div className="flex-1 max-w-sm w-full space-y-3">
               <div className="flex justify-between text-[10px] font-black uppercase text-slate-600 tracking-widest px-1">
                  <span>Progress Timeline</span>
                  <span>Step {currentStep + 1} / {steps.length}</span>
               </div>
               <div className="flex gap-2">
                  {steps.map((_, i) => (
                    <motion.div 
                      key={i} 
                      className="h-2 rounded-full bg-white/5 flex-1 relative overflow-hidden"
                      whileHover={{ scaleY: 1.5 }}
                    >
                       <motion.div 
                        initial={false}
                        animate={{ width: i <= currentStep ? '100%' : '0%' }}
                        className={`absolute inset-0 ${i === currentStep ? 'bg-brand-primary animate-pulse' : 'bg-brand-primary/40'}`}
                       />
                    </motion.div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </Card>
  );
};

/* --- 1. Inheritance --- */
const InheritanceVisual = ({ step }) => (
  <div className="flex flex-col items-center gap-10">
    {/* Superclass */}
    <motion.div 
      animate={{ scale: step === 0 ? 1.1 : 1, opacity: step >= 0 ? 1 : 0 }}
      className="p-6 bg-brand-primary/10 border-2 border-brand-primary rounded-2xl w-48 relative shadow-2xl"
    >
      <Badge variant="primary" className="absolute -top-3 -right-3">Super</Badge>
      <p className="text-white font-black text-center mb-4">Vehicle</p>
      <div className="space-y-2 opacity-60">
        <div className={`h-1.5 w-full rounded-full transition-colors ${step >= 3 ? 'bg-brand-primary' : 'bg-slate-700'}`} />
        <div className="h-1.5 w-3/4 rounded-full bg-slate-700" />
      </div>
    </motion.div>

    {/* Extends Arrow */}
    {step >= 1 && (
      <motion.div initial={{ height: 0 }} animate={{ height: 60 }} className="w-1 bg-brand-primary relative">
         <div className="absolute bottom-0 left-1/2 -track-x-1/2 w-4 h-4 border-l-2 border-b-2 border-brand-primary -rotate-45 -translate-x-[7.5px]" />
         <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -right-16 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase text-brand-primary">extends</motion.span>
      </motion.div>
    )}

    {/* Subclass */}
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: step >= 2 ? 0 : 20, opacity: step >= 2 ? 1 : 0 }}
      className="p-6 bg-brand-secondary/10 border-2 border-brand-secondary rounded-2xl w-48 relative"
    >
      <Badge variant="secondary" className="absolute -top-3 -right-3">Sub</Badge>
      <p className="text-white font-black text-center mb-4">ElectricCar</p>
      <div className="space-y-2">
        <motion.div animate={{ opacity: step >= 3 ? 1 : 0.2 }} className="h-1.5 w-full rounded-full bg-brand-primary" />
        <div className="h-1.5 w-1/2 rounded-full bg-brand-secondary" />
      </div>
      {step >= 3 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-[9px] font-bold text-center text-emerald-500 uppercase">Inherited methods active</motion.div>}
    </motion.div>
  </div>
);

/* --- 2. Stack & Heap --- */
const StackHeapVisual = ({ step }) => (
  <div className="grid grid-cols-2 gap-20 w-full max-w-xl">
    <div className="space-y-4">
      <Badge variant="ghost" className="mx-auto block w-fit">Thread Stack</Badge>
      <div className="h-64 border-2 border-white/5 bg-white/5 rounded-3xl p-6 flex flex-col-reverse gap-4 overflow-hidden relative">
         {['main()', 'doAuth()'].map((v, i) => (
           <motion.div 
            key={v}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: step > i ? 0 : -100, opacity: step > i ? 1 : 0, scale: step === i + 1 ? 1.05 : 1 }}
            className={`p-3 rounded-xl border-l-4 font-mono text-xs font-bold ${i === 0 ? 'bg-orange-500/10 border-orange-500 text-orange-400' : 'bg-cyan-500/10 border-cyan-500 text-cyan-400'}`}
           >
              {v}
              {step >= 3 && i === 1 && <motion.div className="flex gap-2 mt-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" /><span className="text-[9px] text-rose-500">ref ptr</span></motion.div>}
           </motion.div>
         ))}
      </div>
    </div>

    <div className="space-y-4">
      <Badge variant="ghost" className="mx-auto block w-fit">Managed Heap</Badge>
      <div className="h-64 border-2 border-white/5 bg-white/5 rounded-3xl relative overflow-hidden">
         <AnimatePresence>
            {step >= 2 && (
              <motion.div 
                id="heap-obj"
                initial={{ scale: 0, opacity: 0, rotate: -45 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                className="w-24 h-24 rounded-3xl bg-brand-primary/20 border-4 border-brand-primary flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_50px_rgba(248,152,32,0.2)]"
              >
                 <Database size={32} className="text-brand-primary" />
              </motion.div>
            )}
         </AnimatePresence>
         {/* Reference Line */}
         {step >= 3 && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-[45%] right-[55%] w-32 h-0.5 bg-rose-500 -rotate-12 blur-[1px]">
              <div className="absolute right-0 w-2 h-2 bg-rose-500 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
           </motion.div>
         )}
      </div>
    </div>
  </div>
);

/* --- 3. ArrayList --- */
const ArrayListVisual = ({ step }) => (
  <div className="flex flex-col items-center gap-12 w-full">
    <div className="flex gap-2">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.div 
          key={i}
          animate={{ 
            backgroundColor: step > i ? 'rgba(248,152,32,0.15)' : 'rgba(255,255,255,0.02)',
            borderColor: step > i ? 'rgba(248,152,32,1)' : 'rgba(255,255,255,0.05)',
            x: (step >= 2 && i >= 1) ? 0 : 0
          }}
          className="w-14 h-14 border-2 rounded-xl flex items-center justify-center text-white font-bold"
        >
           {step > i ? 'D' : ''}
        </motion.div>
      ))}
    </div>
    {step >= 6 && (
      <motion.div 
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="flex gap-1"
      >
        {[0,1,2,3,4,5,6,7,8,9].map(i => <div key={i} className={`w-10 h-10 border-2 rounded-lg border-brand-secondary/30 ${i < 6 ? 'bg-brand-secondary/10' : ''}`} />)}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-black text-brand-secondary uppercase">Capacity Resized (1.5x)</div>
      </motion.div>
    )}
  </div>
);

/* --- 4. HashMap --- */
const HashMapVisual = ({ step }) => (
  <div className="grid grid-cols-4 gap-8">
     {[0,1,2,3].map(i => (
       <div key={i} className="space-y-4">
          <div className="h-14 w-14 bg-white/5 border-2 border-white/10 rounded-2xl flex items-center justify-center text-slate-500 font-bold">{i}</div>
          <div className="flex flex-col gap-2 items-center">
             {(step > i) && (
               <motion.div 
                 initial={{ scale: 0 }} animate={{ scale: 1 }}
                 className="w-12 h-12 bg-brand-primary/20 border-2 border-brand-primary rounded-xl text-[10px] flex items-center justify-center text-white font-bold"
               >
                 Key:{i}
               </motion.div>
             )}
             {(step >= 5 && i === 1) && (
               <>
                 <div className="h-4 w-0.5 bg-slate-700" />
                 <motion.div 
                   initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                   className="w-12 h-12 bg-rose-500/20 border-2 border-rose-500 rounded-xl text-[10px] flex items-center justify-center text-white font-bold"
                 >
                   COLLsn
                 </motion.div>
               </>
             )}
          </div>
       </div>
     ))}
  </div>
);

/* --- 5. Streams --- */
const StreamsVisual = ({ step }) => {
  const items = [10, 20, 30, 40, 50];
  return (
    <div className="flex flex-col items-center gap-12">
       <div className="flex gap-4">
          {items.map((v, i) => (
            <motion.div 
              key={i} 
              animate={{ opacity: (step >= 2 && v < 30) ? 0.2 : 1, y: (step >= 2 && v < 30) ? 20 : 0 }}
              className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 text-white font-bold"
            >
              {v}
            </motion.div>
          ))}
       </div>
       {step >= 1 && (
         <div className="flex flex-col items-center">
            <div className="h-10 w-0.5 bg-slate-800" />
            <div className="px-8 py-3 bg-brand-primary/10 border-2 border-brand-primary rounded-full flex items-center gap-2 text-brand-primary text-[10px] font-black uppercase">
               <Zap size={14} /> filter(n {'>'} 25)
            </div>
            {step >= 2 && <div className="h-10 w-0.5 bg-slate-800" />}
         </div>
       )}
       {step >= 2 && (
         <div className="flex flex-col items-center">
             <div className="px-8 py-3 bg-brand-secondary/10 border-2 border-brand-secondary rounded-full flex items-center gap-2 text-brand-secondary text-[10px] font-black uppercase">
               <Zap size={14} /> map(n * 2)
            </div>
            {step >= 3 && <div className="h-10 w-0.5 bg-slate-800" />}
         </div>
       )}
       {step >= 3 && (
         <div className="flex gap-4">
            {[60, 80, 100].map((v, i) => (
               <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-12 h-12 rounded-xl bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-500 font-bold">{v}</motion.div>
            ))}
         </div>
       )}
    </div>
  );
};

export default ConceptVisualizer;
