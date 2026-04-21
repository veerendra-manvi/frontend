import React from 'react';
import { Sparkles, Zap } from 'lucide-react';
import useProgressStore from '../../store/useProgressStore';

const XPToast = () => {
    const { showXPToast, recentXPChange } = useProgressStore();

    if (!showXPToast) return null;

    return (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] pointer-events-none animate-in fade-in slide-in-from-bottom-10 duration-500">
            <div className="bg-brand-primary/90 backdrop-blur-xl border-2 border-white/20 px-8 py-4 rounded-[2rem] shadow-[0_0_40px_rgba(248,152,32,0.4)] flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-primary shadow-xl animate-bounce">
                    <Sparkles className="w-[20px] h-[20px]" />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase text-white/60 tracking-widest leading-none">Neural Gain</span>
                    <span className="text-2xl font-black text-white italic tracking-tighter leading-tight mt-1">
                        +{recentXPChange} <span className="text-sm font-bold text-white/80">XP</span>
                    </span>
                </div>
                <div className="ml-4 pl-4 border-l border-white/20">
                    <div className="flex items-center gap-2">
                        <Zap className="w-[14px] h-[14px] text-white animate-pulse" />
                        <span className="text-[9px] font-black text-white uppercase tracking-widest">Network Verified</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default XPToast;
