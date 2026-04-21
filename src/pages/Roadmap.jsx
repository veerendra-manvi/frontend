import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import useProgressStore from '../store/useProgressStore';
import { 
  Lock, 
  CheckCircle2, 
  ChevronRight, 
  Circle,
  Play,
  Trophy,
  Coffee,
  Globe,
  Settings,
  Cpu,
  Layers,
  Zap,
  Layout,
  FileCode,
  Share2,
  Activity,
  Target
} from 'lucide-react';
import { 
  Card, 
  SectionTitle, 
  ProgressBar, 
  Badge, 
  PrimaryButton 
} from '../components/ui';

import { modules as MODULES_DATA } from '../data/curriculum/modules';
import { lessons as LESSONS_DATA } from '../data/curriculum/lessons';

// Internal Icon Resolver to avoid dynamic mapping and ensure production safety
const ModuleIcon = ({ iconId, className }) => {
  switch (iconId) {
    case 'coffee': return <Coffee className={className} />;
    case 'layout': return <Layout className={className} />;
    case 'settings': return <Settings className={className} />;
    case 'layers': return <Layers className={className} />;
    case 'zap': return <Zap className={className} />;
    case 'circle': return <Circle className={className} />;
    case 'globe': return <Globe className={className} />;
    case 'cpu': return <Cpu className={className} />;
    case 'share2': return <Share2 className={className} />;
    case 'file-code': return <FileCode className={className} />;
    case 'trophy': return <Trophy className={className} />;
    default: return <Coffee className={className} />;
  }
};

const Roadmap = () => {
  const { completedLessons } = useProgressStore();

  const roadmapWithProgress = useMemo(() => {
    return MODULES_DATA.map((module, i) => {
      const moduleLessons = LESSONS_DATA.filter(l => l.moduleId === module.id);
      const completedModuleLessons = moduleLessons.filter(l => completedLessons.includes(l.slug));
      
      const progress = moduleLessons.length > 0 
        ? Math.round((completedModuleLessons.length / moduleLessons.length) * 100) 
        : 0;

      let status = "locked";
      if (i === 0) status = progress === 100 ? "completed" : "current";
      else {
        const prevModule = MODULES_DATA[i-1];
        const prevModuleLessons = LESSONS_DATA.filter(l => l.moduleId === prevModule.id);
        const prevCompleted = prevModuleLessons.length > 0 && prevModuleLessons.every(l => completedLessons.includes(l.slug));
        
        if (progress === 100) status = "completed";
        else if (prevCompleted) status = "current";
        else status = "locked";
      }

      return { 
        ...module, 
        status, 
        progress,
        lessonsArray: moduleLessons.map(l => ({
          ...l,
          completed: completedLessons.includes(l.slug)
        }))
      };
    });
  }, [completedLessons]);

  return (
    <div className="max-w-6xl mx-auto py-20 px-6 lg:px-12">
      <header className="mb-24 space-y-6 text-center lg:text-left">
         <div className="flex items-center gap-4 justify-center lg:justify-start">
            <div className="px-6 py-1.5 bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-[0.3em] w-fit rounded-full border border-brand-primary/20 italic">
               Operational Vector
            </div>
            <div className="h-px w-24 bg-gradient-to-r from-brand-primary/20 to-transparent hidden lg:block" />
         </div>
         <h1 className="text-5xl md:text-8xl font-black text-white italic tracking-tighter leading-none">Intelligence Map</h1>
         <p className="text-slate-400 font-bold italic max-w-3xl leading-relaxed mx-auto lg:mx-0">
            Your personalized progression neural net. Initialize and complete every synchronized module to reach <span className="text-white underline decoration-brand-primary decoration-4 underline-offset-8 font-black">Level 10 Senior Tier</span>.
         </p>
      </header>

      <div className="relative">
        <div className="absolute left-10 lg:left-1/2 top-0 bottom-0 w-1.5 bg-gradient-to-b from-brand-primary/20 via-brand-primary/5 to-transparent lg:-translate-x-1/2 -z-10 rounded-full" />

        <div className="space-y-24 lg:space-y-32">
          {roadmapWithProgress.map((module, index) => {
            const isLeft = index % 2 === 0;
            const isLocked = module.status === "locked";
            const isCompleted = module.status === "completed";
            const isCurrent = module.status === "current";

            return (
              <div 
                key={module.id} 
                className={`flex flex-col lg:flex-row items-center w-full gap-12 lg:gap-0 ${isLeft ? '' : 'lg:flex-row-reverse'}`}
              >
                <div className={`w-full lg:w-5/12 ${isLeft ? 'lg:pr-20' : 'lg:pl-20'}`}>
                  <Card 
                    className={`relative group transition-all duration-700 rounded-[3rem] p-10 border-2 ${isLocked ? 'opacity-30 grayscale blur-sm hover:blur-none hover:opacity-80' : 'hover:border-brand-primary/40 shadow-2xl'} ${isCurrent ? 'border-brand-primary bg-brand-primary/5 shadow-brand-primary/10' : 'border-white/5 bg-white/2'}`}
                  >
                    <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[3rem] pointer-events-none" />
                    
                    {isLocked && (
                      <div className="absolute -top-4 -right-4 p-4 bg-dark-bg border-2 border-white/10 rounded-full text-slate-700 shadow-xl z-20">
                        <Lock className="w-[18px] h-[18px]" />
                      </div>
                    )}
                    {isCompleted && (
                      <div className="absolute -top-4 -right-4 p-4 bg-emerald-500 border-2 border-emerald-400 rounded-full text-white shadow-xl z-20 shadow-emerald-500/20">
                        <CheckCircle2 className="w-[18px] h-[18px]" />
                      </div>
                    )}

                    <div className="flex gap-8 mb-10 relative z-10">
                      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-700 border-2 shadow-xl ${isCompleted ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500 shadow-emerald-500/5' : 'bg-brand-primary/10 border-brand-primary/30 text-brand-primary shadow-brand-primary/5'} ${isLocked ? 'bg-black/20 border-white/5 text-slate-800' : 'group-hover:rotate-6 group-hover:scale-110'}`}>
                        <ModuleIcon iconId={module.iconId} className="w-[32px] h-[32px]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-black text-white mb-2 italic tracking-tight group-hover:text-brand-primary transition-colors">{module.title}</h3>
                        <p className="text-slate-500 text-[11px] font-black uppercase tracking-widest italic">{module.description}</p>
                      </div>
                    </div>

                    {!isLocked && (
                      <div className="space-y-6 pt-4 relative z-10">
                        <div className="flex justify-between items-center text-[9px] font-black uppercase text-slate-700 tracking-[0.3em] italic">
                           <span>Operational Mastery</span>
                           <span className={isCompleted ? 'text-emerald-500' : 'text-brand-primary'}>{module.progress}%</span>
                        </div>
                        <ProgressBar progress={module.progress} showLabel={false} height="h-2.5" />
                        
                        <div className="mt-10 space-y-3">
                           <div className="text-[8px] font-black text-slate-800 uppercase tracking-widest mb-4 italic">Segment Units</div>
                           {module.lessonsArray?.slice(0, 4).map((lesson) => (
                             <div key={lesson.slug} className="flex items-center justify-between group/lesson py-3.5 px-4 rounded-2xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/5 cursor-pointer">
                                <div className="flex items-center gap-4">
                                  {lesson.completed ? (
                                    <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                                       <CheckCircle2 className="w-[12px] h-[12px] text-emerald-500 font-bold" />
                                    </div>
                                  ) : (
                                    <Circle className="w-[20px] h-[20px] text-slate-800 group-hover/lesson:text-brand-primary transition-colors" />
                                  )}
                                  <span className={`text-[13px] italic tracking-tight font-bold ${lesson.completed ? 'text-slate-700 line-through' : 'text-slate-400 group-hover/lesson:text-white'}`}>{lesson.title}</span>
                                </div>
                                <ChevronRight className="w-[16px] h-[16px] text-brand-primary opacity-0 group-hover/lesson:opacity-100 group-hover/lesson:translate-x-1 transition-all" />
                             </div>
                           ))}
                        </div>
                      </div>
                    )}

                    {isLocked && (
                      <div className="mt-8 p-6 bg-black/40 rounded-3xl border border-white/5 text-center text-[10px] uppercase font-black text-slate-700 tracking-[0.3em] italic">
                         Protocol Locked until Node_{index} synchronized
                      </div>
                    )}
                  </Card>
                </div>

                <div className="relative z-10">
                   <div className={`w-20 h-20 rounded-full border-8 border-dark-bg flex items-center justify-center transition-all duration-700 shadow-2xl relative group/node ${isCompleted ? 'bg-emerald-500 text-white' : 'bg-brand-primary text-white shadow-brand-primary/20'} ${isLocked ? 'bg-[#151821] text-slate-800 border-white/5' : ''} ${isCurrent ? 'scale-150 ring-[15px] ring-brand-primary/10' : ''}`}>
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/node:opacity-10 transition-opacity rounded-full" />
                      {isCompleted ? <CheckCircle2 className="w-[28px] h-[28px]" /> : (isLocked ? <Lock className="w-[24px] h-[24px]" /> : <Play className="w-[24px] h-[24px]" fill="white" />)}
                   </div>
                </div>

                <div className="hidden lg:block lg:w-5/12" />
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-40 pt-20 border-t border-white/5">
        <Card className="text-center py-24 bg-gradient-to-br from-brand-primary/20 via-black/40 to-transparent border-brand-primary/30 rounded-[4rem] overflow-hidden relative group shadow-3xl">
           <div className="absolute top-1/2 left-1/2 -track-x-1/2 -track-y-1/2 p-20 opacity-5 group-hover:scale-125 transition-all duration-1000">
              <Trophy className="w-[400px] h-[400px] text-white" />
           </div>
           <div className="relative z-10 space-y-8">
              <div className="flex justify-center flex-col items-center">
                 <Badge variant="primary" className="mb-6 px-6 py-2 italic font-black uppercase tracking-[0.3em] text-[10px]">Grand Objective</Badge>
                 <h2 className="text-4xl md:text-7xl font-black text-white italic tracking-tighter leading-none mb-4">MASTER ARCHITECT</h2>
              </div>
              <p className="text-slate-400 max-w-2xl mx-auto font-bold italic leading-relaxed text-lg">
                 Synchronize all <span className="text-white">12 Knowledge Clusters</span> to reconstruct the final certification node and finalize your deployment eligibility.
              </p>
              <PrimaryButton className="px-16 py-6 text-[12px] font-black uppercase tracking-[0.2em] italic rounded-[2rem] shadow-2xl shadow-brand-primary/40 hover:scale-110 active:scale-95 transition-all">
                 Begin Final Sequence
              </PrimaryButton>
           </div>
        </Card>
      </div>

      {/* Background Decor */}
      <div className="fixed top-1/4 right-0 p-12 opacity-5 pointer-events-none select-none">
         <Target className="w-[500px] h-[500px] text-white" />
      </div>
      <div className="fixed bottom-1/4 left-10 p-12 opacity-5 pointer-events-none select-none">
         <Activity className="w-[300px] h-[300px] text-white rotate-45" />
      </div>
    </div>
  );
};

export default Roadmap;
