import React from 'react';
import { Trophy, Check, Info } from 'lucide-react';
import { Card, PrimaryButton, SecondaryButton } from '../ui';

const SidebarProgress = ({ data, checkedSections, onToggleSection, onFinish }) => {
  return (
    <aside className="lg:col-span-4 hidden lg:block">
       <div className="sticky top-28 space-y-6">
          <Card className="border-white/5 bg-dark-sidebar/40 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
             <div className="absolute inset-0 bg-brand-primary/5 opacity-5 pointer-events-none" />
             <div className="flex items-center justify-between mb-10 relative z-10">
                <div>
                   <h4 className="font-black text-white leading-tight italic tracking-tight">Lesson Master</h4>
                   <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] mt-1 italic">Tactical Overview</p>
                </div>
                <div className="p-2.5 bg-brand-primary/10 rounded-xl border border-brand-primary/20 text-brand-primary">
                   <Trophy className="w-[20px] h-[20px]" />
                </div>
             </div>
             
             <div className="space-y-3 mb-12 relative z-10">
                {data.sidebarSteps.map((step) => (
                  <button 
                    key={step.id} 
                    onClick={() => onToggleSection(step.id)}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all text-left group border border-transparent hover:border-white/5"
                  >
                     <div className={`
                        w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all
                        ${checkedSections[step.id] ? 'bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-500/20' : 'border-white/10 group-hover:border-white/20'}
                     `}>
                          {checkedSections[step.id] && <Check className="w-[14px] h-[14px] text-white" />}
                     </div>
                     <span className={`text-[13px] font-bold italic tracking-tight transition-colors ${checkedSections[step.id] ? 'text-slate-600 line-through decoration-slate-700' : 'text-slate-400 group-hover:text-slate-200'}`}>
                        {step.label}
                     </span>
                  </button>
                ))}
             </div>
             
             <PrimaryButton onClick={onFinish} className="w-full py-5 text-[10px] font-black tracking-widest uppercase shadow-xl shadow-brand-primary/20 italic rounded-2xl">
                Commit Module
             </PrimaryButton>
          </Card>

          <Card className="bg-white/2 border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden group">
             <div className="absolute inset-0 bg-brand-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
             <h4 className="text-white font-black mb-4 flex items-center gap-3 italic tracking-tight">
                <div className="p-2 bg-brand-secondary/10 rounded-lg text-brand-secondary border border-brand-secondary/20"><Info className="w-[16px] h-[16px]" /></div> Deployment Aid
             </h4>
             <p className="text-[11px] text-slate-500 leading-relaxed mb-8 italic font-medium">
                Connect with the JavaMastery network to optimize your learning vector with expert mentors.
             </p>
             <SecondaryButton className="w-full text-[9px] py-3.5 border-white/10 text-slate-400 hover:text-white hover:border-brand-secondary/40 font-black uppercase tracking-widest italic rounded-xl">
                Access Intelligence Network
             </SecondaryButton>
          </Card>
       </div>
    </aside>
  );
};

export default SidebarProgress;
