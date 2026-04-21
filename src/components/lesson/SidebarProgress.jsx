import React from 'react';
import { Trophy, Check, Info } from 'lucide-react';
import { Card, PrimaryButton, SecondaryButton } from '../ui';

const SidebarProgress = ({ data, checkedSections, onToggleSection, onFinish }) => {
  return (
    <aside className="lg:col-span-4 hidden lg:block">
       <div className="sticky top-28 space-y-6">
          <Card className="border-white/10">
             <div className="flex items-center justify-between mb-8">
                <div>
                   <h4 className="font-bold text-white leading-tight">Lesson Master</h4>
                   <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Status Overview</p>
                </div>
                <Trophy size={24} className="text-brand-primary" />
             </div>
             
             <div className="space-y-2 mb-10">
                {data.sidebarSteps.map((step) => (
                  <button 
                    key={step.id} 
                    onClick={() => onToggleSection(step.id)}
                    className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all text-left group"
                  >
                     <div className={`
                        w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all
                        ${checkedSections[step.id] ? 'bg-emerald-500 border-emerald-500' : 'border-white/10 group-hover:border-white/20'}
                     `}>
                         {checkedSections[step.id] && <Check size={14} className="text-white" />}
                     </div>
                     <span className={`text-sm font-semibold ${checkedSections[step.id] ? 'text-slate-300 line-through decoration-slate-600' : 'text-slate-500 group-hover:text-slate-300'}`}>
                        {step.label}
                     </span>
                  </button>
                ))}
             </div>
             
             <PrimaryButton onClick={onFinish} className="w-full py-5 text-sm font-black tracking-widest uppercase shadow-xl shadow-brand-primary/20">
                Finish Lesson
             </PrimaryButton>
          </Card>

          <Card className="bg-info/5 border-info/20">
             <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <Info size={16} className="text-brand-secondary" /> Need Help?
             </h4>
             <p className="text-xs text-slate-500 leading-relaxed mb-6">
                Join the community to discuss this topic with other Java students and mentors.
             </p>
             <SecondaryButton className="w-full text-[10px] py-1.5 border-brand-secondary/30 text-brand-secondary hover:bg-brand-secondary/10">
                Join Discord Server
             </SecondaryButton>
          </Card>
       </div>
    </aside>
  );
};

export default SidebarProgress;
