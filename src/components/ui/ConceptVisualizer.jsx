import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft,
  Info,
  Database,
  Zap,
} from 'lucide-react';
import { Card, Badge } from './index';

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
    <Card className="p-0 border-white/5 bg-[#0b0d12] overflow-hidden shadow-2xl rounded-[3rem]">
      {/* 1. Canvas Area */}
      <div className="aspect-video relative bg-[#06070a] flex items-center justify-center overflow-hidden border-b-2 border-white/5">
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
            className="absolute bottom-10 left-10 right-10 p-6 bg-dark-bg/80 backdrop-blur-3xl rounded-[2rem] border border-white/10 shadow-2xl z-20"
          >
             <div className="flex gap-6 items-center">
                <div className="p-3 bg-brand-primary/10 rounded-xl border border-brand-primary/20 shadow-xl shadow-brand-primary/10">
                   <Info className="w-[18px] h-[18px] text-brand-primary" />
                </div>
                <div>
                   <p className="text-[9px] font-black uppercase text-slate-500 tracking-[0.2em] mb-1 italic">Procedure Log</p>
                   <p className="text-sm text-slate-300 font-bold leading-relaxed italic">{currentStepData.desc}</p>
                </div>
             </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. Controls & Timeline */}
      <div className="p-8 md:p-12 bg-dark-sidebar/40">
         <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-4">
               <button onClick={onReset} className="p-4 bg-white/5 rounded-2xl text-slate-600 hover:text-white transition-all shadow-xl hover:bg-white/10"><RotateCcw className="w-[20px] h-[20px]" /></button>
               <button onClick={onPrev} className="p-4 bg-white/5 rounded-2xl text-slate-600 hover:text-white transition-all shadow-xl hover:bg-white/10"><ChevronLeft className="w-[20px] h-[20px]" /></button>
               <button 
                 onClick={() => isPlaying ? onPause() : onPlay()}
                 className={`p-6 rounded-3xl transition-all shadow-2xl active:scale-95 ${isPlaying ? 'bg-white/10 text-white border-2 border-white/10' : 'bg-brand-primary text-white shadow-brand-primary/20 border-2 border-brand-primary'}`}
               >
                 {isPlaying ? <Pause className="w-[32px] h-[32px]" /> : <Play className="w-[32px] h-[32px]" fill="white" />}
               </button>
               <button onClick={onNext} className="p-4 bg-white/5 rounded-2xl text-slate-600 hover:text-white transition-all shadow-xl hover:bg-white/10"><ChevronRight className="w-[20px] h-[20px]" /></button>
            </div>

            <div className="flex-1 max-w-sm w-full space-y-4">
               <div className="flex justify-between text-[9px] font-black uppercase text-slate-600 tracking-[0.2em] px-2 italic">
                  <span>Progress Vector</span>
                  <span className="text-brand-primary">Phase {currentStep + 1} / {steps.length}</span>
               </div>
               <div className="flex gap-2.5">
                  {steps.map((_, i) => (
                    <motion.div 
                      key={i} 
                      className="h-2 rounded-full bg-white/5 flex-1 relative overflow-hidden"
                      whileHover={{ scaleY: 1.5 }}
                    >
                       <motion.div 
                        initial={false}
                        animate={{ width: i <= currentStep ? '100%' : '0%' }}
                        className={`absolute inset-0 ${i === currentStep ? 'bg-brand-primary shadow-[0_0_10px_#f89820]' : 'bg-brand-primary/30'}`}
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
  <div className="flex flex-col items-center gap-12">
    <motion.div 
      animate={{ scale: step === 0 ? 1.05 : 1, opacity: step >= 0 ? 1 : 0 }}
      className="p-8 bg-brand-primary/5 border-2 border-brand-primary/40 rounded-[2rem] w-56 relative shadow-2xl backdrop-blur-xl"
    >
      <Badge variant="primary" className="absolute -top-3 -right-3 px-3 py-1 italic font-black uppercase tracking-widest shadow-xl">Super</Badge>
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><Database className="w-[48px] h-[48px]" /></div>
      <p className="text-white font-black text-center mb-6 italic tracking-tight underline decoration-brand-primary/20 decoration-4 underline-offset-8 text-lg">Vehicle</p>
      <div className="space-y-3 opacity-60">
        <div className={`h-2 w-full rounded-full transition-colors duration-700 ${step >= 3 ? 'bg-brand-primary shadow-lg shadow-brand-primary/20' : 'bg-slate-800'}`} />
        <div className="h-2 w-3/4 rounded-full bg-slate-800" />
      </div>
    </motion.div>

    {step >= 1 && (
      <motion.div initial={{ height: 0 }} animate={{ height: 60 }} className="w-1 bg-brand-primary relative">
         <div className="absolute bottom-0 left-1/2 -track-x-1/2 w-4 h-4 border-l-2 border-b-2 border-brand-primary -rotate-45 -translate-x-[7.5px]" />
         <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -right-20 top-1/2 -translate-y-1/2 text-[9px] font-black uppercase text-brand-primary tracking-widest bg-[#06070a] px-2 italic">extends</motion.span>
      </motion.div>
    )}

    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: step >= 2 ? 0 : 20, opacity: step >= 2 ? 1 : 0 }}
      className="p-8 bg-brand-secondary/5 border-2 border-brand-secondary/40 rounded-[2rem] w-56 relative shadow-2xl backdrop-blur-xl"
    >
      <Badge variant="secondary" className="absolute -top-3 -right-3 px-3 py-1 italic font-black uppercase tracking-widest shadow-xl">Sub</Badge>
      <p className="text-white font-black text-center mb-6 italic tracking-tight text-lg">ElectricCar</p>
      <div className="space-y-3">
        <motion.div animate={{ opacity: step >= 3 ? 1 : 0.2 }} className="h-2 w-full rounded-full bg-brand-primary shadow-lg" />
        <div className="h-2 w-1/2 rounded-full bg-brand-secondary shadow-lg shadow-brand-secondary/10" />
      </div>
      {step >= 3 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-[8px] font-black text-center text-emerald-500 uppercase tracking-widest italic animate-pulse">Methods Inherited</motion.div>}
    </motion.div>
  </div>
);

/* --- 2. Stack & Heap --- */
const StackHeapVisual = ({ step }) => (
  <div className="grid grid-cols-2 gap-24 w-full max-w-2xl px-12">
    <div className="space-y-6">
      <Badge variant="ghost" className="mx-auto block w-fit italic font-black tracking-widest text-[9px] uppercase border-white/5 opacity-40">JVM Stack</Badge>
      <div className="h-72 border-2 border-white/5 bg-white/2 rounded-[2.5rem] p-8 flex flex-col-reverse gap-4 overflow-hidden relative shadow-2xl">
         {['main()', 'doAuth()'].map((v, i) => (
           <motion.div 
            key={v}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: step > i ? 0 : -100, opacity: step > i ? 1 : 0, scale: step === i + 1 ? 1.05 : 1 }}
            className={`p-4 rounded-2xl border-l-[6px] font-mono text-xs font-black italic tracking-tighter ${i === 0 ? 'bg-orange-500/10 border-orange-500 text-orange-400' : 'bg-cyan-500/10 border-cyan-500 text-cyan-400'}`}
           >
              {v}
              {step >= 3 && i === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 mt-3 items-center">
                  <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span className="text-[8px] text-rose-500 font-black uppercase tracking-widest">ref ptr</span>
                </motion.div>
              )}
           </motion.div>
         ))}
      </div>
    </div>

    <div className="space-y-6">
      <Badge variant="ghost" className="mx-auto block w-fit italic font-black tracking-widest text-[9px] uppercase border-white/5 opacity-40">System Heap</Badge>
      <div className="h-72 border-2 border-white/5 bg-white/2 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
         <AnimatePresence>
            {step >= 2 && (
              <motion.div 
                id="heap-obj"
                initial={{ scale: 0, opacity: 0, rotate: -45 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                className="w-28 h-28 rounded-[2rem] bg-brand-primary/5 border-4 border-brand-primary/40 flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_80px_rgba(248,152,32,0.2)] group"
              >
                 <div className="absolute inset-0 bg-brand-primary/10 animate-pulse rounded-[2rem]" />
                 <Database className="w-[40px] h-[40px] text-brand-primary group-hover:scale-110 transition-transform" />
              </motion.div>
            )}
         </AnimatePresence>
         {step >= 3 && (
           <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 140, opacity: 1 }} className="absolute顶-[45%] right-[55%] h-0.5 bg-rose-500/50 -rotate-[15deg] blur-[0.5px]">
              <div className="absolute right-0 w-3 h-3 bg-rose-500 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.8)] -mt-1.2" />
           </motion.div>
         )}
      </div>
    </div>
  </div>
);

/* --- 3. ArrayList --- */
const ArrayListVisual = ({ step }) => (
  <div className="flex flex-col items-center gap-16 w-full">
    <div className="flex gap-3">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.div 
          key={i}
          animate={{ 
            backgroundColor: step > i ? 'rgba(248,152,32,0.1)' : 'rgba(255,255,255,0.01)',
            borderColor: step > i ? 'rgba(248,152,32,0.6)' : 'rgba(255,255,255,0.03)',
            y: step === i + 1 ? -10 : 0
          }}
          className="w-16 h-16 border-2 rounded-2xl flex items-center justify-center text-white font-black italic shadow-2xl transition-all"
        >
           {step > i ? '0x' + (100 + i) : ''}
        </motion.div>
      ))}
    </div>
    <AnimatePresence>
      {step >= 6 && (
        <motion.div 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          className="relative flex gap-1.5 p-6 bg-white/2 border-2 border-brand-secondary/20 rounded-[2rem] shadow-xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-brand-secondary/5 pointer-events-none" />
          {[0,1,2,3,4,5,6,7,8,9].map(i => <div key={i} className={`w-10 h-10 border-2 rounded-xl transition-all duration-700 ${i < 6 ? 'bg-brand-secondary/20 border-brand-secondary/40' : 'border-white/5 bg-white/1 scale-90'}`} />)}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-black text-brand-secondary uppercase tracking-[0.2em] italic bg-[#06070a] px-3">Capacity Resized (x1.5 Expansion)</div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

/* --- 4. HashMap --- */
const HashMapVisual = ({ step }) => (
  <div className="grid grid-cols-4 gap-12 max-w-2xl">
     {[0,1,2,3].map(i => (
       <div key={i} className="space-y-6 flex flex-col items-center">
          <Badge variant="ghost" className="text-[8px] font-black opacity-30 border-none bg-white/5 italic">SLOT_{i}</Badge>
          <div className="h-16 w-16 bg-white/2 border-2 border-white/5 rounded-[1.5rem] flex items-center justify-center text-slate-800 font-black italic shadow-xl">0x{i}</div>
          <div className="flex flex-col gap-3 items-center">
             {(step > i) && (
               <motion.div 
                 initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: 0 }}
                 className="w-14 h-14 bg-brand-primary/10 border-2 border-brand-primary/40 rounded-xl text-[9px] flex flex-col items-center justify-center text-white font-black italic shadow-xl"
               >
                 <span className="text-slate-500 text-[7px] mb-1">NODE</span>
                 K:{i}01
               </motion.div>
             )}
             {(step >= 5 && i === 1) && (
               <>
                 <div className="h-6 w-0.5 bg-slate-800 shadow-xl" />
                 <motion.div 
                   initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                   className="w-14 h-14 bg-rose-500/10 border-2 border-rose-500/40 rounded-xl text-[9px] flex flex-col items-center justify-center text-white font-black italic shadow-xl"
                 >
                   <span className="text-rose-500/50 text-[7px] mb-1">COLLIDE</span>
                   LINKED
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
       <div className="flex gap-6">
          {items.map((v, i) => (
            <motion.div 
              key={i} 
              animate={{ 
                opacity: (step >= 2 && v < 30) ? 0.1 : 1, 
                y: (step >= 2 && v < 30) ? 40 : 0,
                scale: (step >= 1 && i === 0 && step < 4) ? 1.2 : 1
              }}
              className="w-16 h-16 rounded-[1.5rem] bg-white/5 flex items-center justify-center border-2 border-white/5 text-white font-black italic text-lg shadow-2xl shadow-black/50"
            >
              {v}
            </motion.div>
          ))}
       </div>
       
       <div className="flex flex-col items-center gap-8">
          <AnimatePresence>
            {step >= 1 && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="flex flex-col items-center">
                 <div className="h-10 w-0.5 bg-slate-800" />
                 <div className="px-10 py-3.5 bg-brand-primary/10 border-2 border-brand-primary/20 rounded-full flex items-center gap-3 text-brand-primary text-[10px] font-black uppercase tracking-widest italic shadow-xl shadow-brand-primary/10">
                    <Zap className="w-[16px] h-[16px]" fill="currentColor" /> filter(n &gt; 25)
                 </div>
              </motion.div>
            )}
            
            {step >= 2 && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="flex flex-col items-center">
                  <div className="h-10 w-0.5 bg-slate-800" />
                  <div className="px-10 py-3.5 bg-brand-secondary/10 border-2 border-brand-secondary/20 rounded-full flex items-center gap-3 text-brand-secondary text-[10px] font-black uppercase tracking-widest italic shadow-xl shadow-brand-secondary/10">
                    <Zap className="w-[16px] h-[16px]" fill="currentColor" /> map(n * 2)
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
       </div>

       <AnimatePresence>
          {step >= 3 && (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex gap-6">
               {[60, 80, 100].map((v, i) => (
                  <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 rounded-[1.5rem] bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-500 font-black italic text-lg shadow-2xl shadow-emerald-500/10 underline decoration-emerald-500/20">{v}</motion.div>
               ))}
            </motion.div>
          )}
       </AnimatePresence>
    </div>
  );
};

export default ConceptVisualizer;
