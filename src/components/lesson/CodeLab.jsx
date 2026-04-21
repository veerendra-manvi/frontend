import React, { useState } from 'react';
import { Terminal, Copy, Play } from 'lucide-react';
import { SectionTitle, PrimaryButton } from '../ui';

const CodeLab = ({ data }) => {
  const [codeTab, setCodeTab] = useState('code');
  const [showOutput, setShowOutput] = useState(false);

  return (
    <section className="space-y-10">
      <SectionTitle title="Tactical Code Lab" subtitle="Test the implementation logic in real-time." />
      <div className="bg-[#0b0d12] rounded-[2.5rem] border-2 border-white/5 overflow-hidden shadow-2xl relative group">
         <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
         <div className="px-8 py-5 bg-white/2 border-bottom border-white/5 flex justify-between items-center relative z-10">
            <div className="flex p-1 bg-white/5 rounded-xl border border-white/5">
               <button 
                 onClick={() => setCodeTab('code')}
                 className={`px-6 py-2 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] transition-all italic ${codeTab === 'code' ? 'bg-[#181825] text-white shadow-xl' : 'text-slate-600 hover:text-slate-300'}`}
               >
                 Source Engine
               </button>
               <button 
                 onClick={() => setCodeTab('explanation')}
                 className={`px-6 py-2 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] transition-all italic ${codeTab === 'explanation' ? 'bg-[#181825] text-white shadow-xl' : 'text-slate-600 hover:text-slate-300'}`}
               >
                 Line Analysis
               </button>
            </div>
            <div className="flex gap-4 items-center">
               <button className="p-3 text-slate-600 hover:text-brand-primary transition-all hover:scale-110"><Copy className="w-[18px] h-[18px]" /></button>
               <PrimaryButton onClick={() => setShowOutput(true)} className="py-2.5 px-6 text-[10px] font-black uppercase tracking-widest italic rounded-xl shadow-xl shadow-brand-primary/20">
                  <Play className="w-[14px] h-[14px] mr-2" fill="currentColor" /> Run Instance
               </PrimaryButton>
            </div>
         </div>
         
         <div className="min-h-[350px] relative z-10 bg-black/20">
            {codeTab === 'code' ? (
              <pre className="p-10 text-[15px] font-mono leading-relaxed overflow-x-auto m-0 animate-in fade-in duration-500">
                 <code className="text-brand-secondary selection:bg-brand-primary/20">
                    {data.code.java}
                 </code>
              </pre>
            ) : (
              <div className="p-10 space-y-6 animate-in slide-in-from-left-4 duration-500">
                 {data.code.explanationSteps.map((step, i) => (
                   <div key={i} className="flex gap-8 items-start group">
                      <div className="py-1 px-4 bg-brand-primary/5 text-brand-primary font-mono text-[9px] font-black rounded-lg border border-brand-primary/10 shrink-0 italic">L0{i+1}</div>
                      <div className="space-y-2">
                         <p className="text-white font-mono text-sm group-hover:text-brand-primary transition-colors italic font-bold">{step.line}</p>
                         <p className="text-slate-500 text-[11px] font-black uppercase tracking-widest italic">{step.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
            )}
         </div>

         <AnimatePresence>
            {showOutput && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="p-10 bg-black border-t-2 border-white/5 relative overflow-hidden backdrop-blur-xl">
                 <div className="absolute top-0 right-0 p-8 opacity-5"><Terminal className="w-[100px] h-[100px] text-white" /></div>
                 <div className="flex justify-between items-center mb-6">
                    <p className="flex items-center gap-3 text-[10px] font-black uppercase text-brand-primary tracking-[0.3em] italic">
                       <Terminal className="w-[16px] h-[16px]" /> Console logs
                    </p>
                    <button onClick={() => setShowOutput(false)} className="text-[9px] font-black text-slate-800 uppercase tracking-widest italic hover:text-white transition-colors">Clear output</button>
                 </div>
                 <pre className="text-emerald-500 font-mono text-xl m-0 italic drop-shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                    {data.code.output}
                 </pre>
              </motion.div>
            )}
         </AnimatePresence>
      </div>
    </section>
  );
};

export default CodeLab;
