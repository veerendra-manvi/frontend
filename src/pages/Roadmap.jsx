import React, { useMemo } from 'react';
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
  FileCode
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
        const prevCompleted = prevModuleLessons.every(l => completedLessons.includes(l.slug));
        
        if (progress === 100) status = "completed";
        else if (prevCompleted) status = "current";
        else status = "locked";
      }

      return { 
        ...module, 
        status, 
        progress,
        lessons: moduleLessons.map(l => ({
          ...l,
          completed: completedLessons.includes(l.slug)
        }))
      };
    });
  }, [completedLessons]);
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <SectionTitle 
        title="Java Mastery Roadmap" 
        subtitle="Your personalized journey to becoming a world-class Java Engineer."
        className="text-center md:text-left mb-16"
      />

      <div className="relative">
        {/* Continuous Center Line (Desktop) */}
        <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-primary/40 to-transparent lg:-translate-x-1/2 -z-10 rounded-full" />

        {/* Roadmap Items */}
        <div className="space-y-12">
          {roadmapWithProgress.map((module, index) => {
            const isLeft = index % 2 === 0;
            const isLocked = module.status === "locked";
            const isCompleted = module.status === "completed";
            const isCurrent = module.status === "current";

            return (
              <div 
                key={module.title} 
                className={`flex flex-col lg:flex-row items-center w-full gap-8 lg:gap-0 ${isLeft ? '' : 'lg:flex-row-reverse'}`}
              >
                {/* Content Card Side */}
                <div className={`w-full lg:w-5/12 ${isLeft ? 'lg:pr-12' : 'lg:pl-12'}`}>
                  <Card 
                    className={`
                      relative group transition-all duration-300
                      ${isLocked ? 'opacity-50 grayscale hover:grayscale-0' : 'hover:border-brand-primary/40'}
                      ${isCurrent ? 'ring-2 ring-brand-primary ring-offset-4 ring-offset-dark-bg' : ''}
                    `}
                  >
                    {isLocked && (
                      <div className="absolute top-4 right-4 text-slate-600">
                        <Lock size={18} />
                      </div>
                    )}
                    {isCompleted && (
                      <div className="absolute top-4 right-4 text-emerald-500">
                        <CheckCircle2 size={18} />
                      </div>
                    )}

                    <div className="flex gap-4 mb-4">
                      <div className={`
                        p-3 rounded-2xl flex-shrink-0 transition-all duration-300
                        ${isCompleted ? 'bg-emerald-500/10 text-emerald-500' : 'bg-brand-primary/10 text-brand-primary'}
                        ${isLocked ? 'bg-white/5 text-slate-500' : ''}
                      `}>
                        <module.icon size={28} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{module.title}</h3>
                        <p className="text-slate-500 text-xs font-medium">{module.description}</p>
                      </div>
                    </div>

                    {!isLocked && (
                      <div className="space-y-3 pt-2">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-500 tracking-widest">
                           <span>Progress</span>
                           <span className={isCompleted ? 'text-emerald-500' : 'text-brand-primary'}>{module.progress}%</span>
                        </div>
                        <ProgressBar 
                          progress={module.progress} 
                          showLabel={false} 
                          height="h-1.5" 
                        />
                        
                                   <span className={lesson.completed ? 'text-slate-400' : 'text-slate-300 font-semibold'}>{lesson.title}</span>
                                 </div>
                                 <ChevronRight size={14} className="text-slate-600 opacity-0 group-hover/lesson:opacity-100 transition-opacity" />
                              </div>
                            ))}
                            {module.lessons.length > 3 && (
                              <p className="text-[10px] text-slate-500 font-bold uppercase pt-1 tracking-widest">+ {module.lessons.length - 3} more lessons</p>
                            )}
                         </div>
                      </div>
                    )}

                    {isLocked && (
                      <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/5 text-center text-[10px] uppercase font-black text-slate-600 tracking-widest">
                         Unlock after completing {MODULES_DATA[index-1]?.title}
                      </div>
                    )}
                  </Card>
                </div>

                {/* Center Node Side */}
                <div className="relative z-10">
                   <div className={`
                    w-16 h-16 rounded-full border-4 border-dark-bg flex items-center justify-center transition-all duration-500 shadow-xl
                    ${isCompleted ? 'bg-emerald-500 text-white' : 'bg-brand-primary text-white'}
                    ${isLocked ? 'bg-slate-800 text-slate-500' : ''}
                    ${isCurrent ? 'scale-125 ring-8 ring-brand-primary/10' : ''}
                   `}>
                      {isCompleted ? <CheckCircle2 size={24} /> : (isLocked ? <Lock size={20} /> : <Play size={20} fill="white" />)}
                   </div>
                </div>

                {/* Spacer Side */}
                <div className="hidden lg:block lg:w-5/12" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Completion Trophy Card */}
      <div className="mt-20 pt-10 border-t border-white/5">
        <Card className="text-center py-12 bg-gradient-to-br from-brand-primary/10 to-transparent border-brand-primary/20 overflow-hidden relative group">
           <div className="absolute -left-10 -bottom-10 opacity-5 group-hover:scale-110 transition-transform">
              <Trophy size={200} />
           </div>
           <Badge variant="primary" className="mb-4">Grand Finale</Badge>
           <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Master Java Developer</h2>
           <p className="text-slate-400 max-w-lg mx-auto mb-8 font-medium">
             Complete all modules to unlock your Professional Certification and become eligible for placement assistance.
           </p>
           <PrimaryButton className="px-12 py-4 text-lg">Claim Your Certificate</PrimaryButton>
        </Card>
      </div>

    </div>
  );
};

export default Roadmap;
