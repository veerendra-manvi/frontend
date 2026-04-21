import React, { useState } from 'react';
import { Terminal, Copy } from 'lucide-react';
import { SectionTitle, PrimaryButton } from '../ui';

const CodeLab = ({ data }) => {
  const [codeTab, setCodeTab] = useState('code');
  const [showOutput, setShowOutput] = useState(false);

  return (
    <section className="space-y-8">
      <SectionTitle title="Code Lab" subtitle="Try it out yourself." />
      <div className="bg-[#1e1e2e] rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
         <div className="px-6 py-4 bg-[#181825] border-b border-white/5 flex justify-between items-center">
            <div className="flex p-0.5 bg-white/5 rounded-lg">
               <button 
                 onClick={() => setCodeTab('code')}
                 className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-wider transition-all ${codeTab === 'code' ? 'bg-[#1e1e2e] text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
               >
                 Source
               </button>
               <button 
                 onClick={() => setCodeTab('explanation')}
                 className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-wider transition-all ${codeTab === 'explanation' ? 'bg-[#1e1e2e] text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
               >
                 Explain
               </button>
            </div>
            <div className="flex gap-3">
               <button className="p-2 text-slate-500 hover:text-white transition-colors"><Copy size={16} /></button>
               <PrimaryButton onClick={() => setShowOutput(true)} className="py-1 px-4 text-[10px] font-black uppercase">Run Code</PrimaryButton>
            </div>
         </div>
         
         <div className="min-h-[300px]">
            {codeTab === 'code' ? (
              <pre className="p-8 text-[15px] font-mono leading-relaxed overflow-x-auto m-0 animate-in fade-in duration-300">
                 <code className="text-brand-secondary">
                    {data.code.java}
                 </code>
              </pre>
            ) : (
              <div className="p-8 space-y-6 animate-in slide-in-from-left-4 duration-300">
                 {data.code.explanationSteps.map((step, i) => (
                   <div key={i} className="flex gap-6 items-start group">
                      <div className="py-1 px-3 bg-brand-primary/10 text-brand-primary font-mono text-[10px] rounded-md border border-brand-primary/20 shrink-0">Line {i+1}</div>
                      <div className="space-y-1">
                         <p className="text-white font-mono text-sm group-hover:text-brand-primary transition-colors">{step.line}</p>
                         <p className="text-slate-500 text-xs font-medium">{step.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
            )}
         </div>

         {showOutput && (
           <div className="p-8 bg-black border-t border-white/10 animate-in slide-in-from-bottom-10 duration-500">
              <p className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-600 mb-4 tracking-widest">
                 <Terminal size={12} /> Execution Output
              </p>
              <pre className="text-emerald-500 font-mono text-lg m-0">
                 {data.code.output}
              </pre>
           </div>
         )}
      </div>
    </section>
  );
};

export default CodeLab;
