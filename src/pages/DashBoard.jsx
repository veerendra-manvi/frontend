import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Flame, 
  Zap, 
  CheckCircle2, 
  Play, 
  Trophy, 
  Clock, 
  ArrowRight,
  TrendingUp,
  Star,
  BookOpen,
  ChevronRight,
  Target,
  AlertTriangle,
  Brain,
  RotateCcw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { 
  Card, 
  SectionTitle, 
  ProgressBar, 
  Badge, 
  PrimaryButton 
} from '../components/ui';
import useProgressStore from '../store/useProgressStore';
import StatisticCard from '../components/ui/StatisticCard';

import { modules as MODULES_DATA } from '../data/curriculum/modules';
import { lessons as LESSONS_DATA } from '../data/curriculum/lessons';
import { getLevelInfo, ACHIEVEMENTS } from '../utils/motivation';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { 
    xp, 
    streak, 
    completedLessons, 
    quizScores, 
    lastOpenedLesson,
    achievements,
    weeklyGoal 
  } = useProgressStore();

  const levelInfo = useMemo(() => getLevelInfo(xp), [xp]);

  const stats = {
    xp: xp,
    streak: streak,
    lessonsCompleted: completedLessons.length,
    currentLevel: levelInfo.title,
    nextLevelXP: xp > 3000 ? 6000 : (xp > 1500 ? 3000 : 1500)
  };

  const moduleProgressList = useMemo(() => {
     return MODULES_DATA.map(module => {
        const moduleLessons = LESSONS_DATA.filter(l => l.moduleId === module.id);
        const completedCount = moduleLessons.filter(l => completedLessons.includes(l.slug)).length;
        const progress = moduleLessons.length > 0 ? Math.round((completedCount / moduleLessons.length) * 100) : 0;
        return {
           title: module.title,
           progress,
           lessons: moduleLessons.length
        };
     }).slice(0, 4);
  }, [completedLessons]);

  const recentQuizzes = Object.entries(quizScores).map(([id, data]) => ({
    id,
    title: data.title || id.replace(/-/g, ' ').toUpperCase(),
    score: data.score,
    total: data.total,
    date: data.date || 'Recently'
  })).reverse().slice(0, 3);

  const resumeLesson = useMemo(() => {
    if (!lastOpenedLesson) return null;
    return LESSONS_DATA.find(l => l.slug === lastOpenedLesson);
  }, [lastOpenedLesson]);

  const recommendedLessons = useMemo(() => {
    return LESSONS_DATA
      .filter(l => !completedLessons.includes(l.slug))
      .slice(0, 3);
  }, [completedLessons]);

  const analytics = useMemo(() => {
    // 1. Identify Weak Areas
    const categoryPerformance = {};
    Object.entries(quizScores).forEach(([quizId, data]) => {
      const lesson = LESSONS_DATA.find(l => l.quizId === quizId);
      if (lesson) {
        if (!categoryPerformance[lesson.moduleId]) {
          categoryPerformance[lesson.moduleId] = { total: 0, scored: 0, count: 0 };
        }
        categoryPerformance[lesson.moduleId].total += data.total;
        categoryPerformance[lesson.moduleId].scored += data.score;
        categoryPerformance[lesson.moduleId].count += 1;
      }
    });

    const weakAreas = Object.entries(categoryPerformance)
      .map(([moduleId, stats]) => ({
        id: moduleId,
        title: MODULES_DATA.find(m => m.id === moduleId)?.title || moduleId,
        percentage: Math.round((stats.scored / stats.total) * 100)
      }))
      .filter(area => area.percentage < 75)
      .sort((a, b) => a.percentage - b.percentage);

    // 2. Recovery Path
    const recoveryLessons = LESSONS_DATA.filter(l => 
      weakAreas.some(wa => wa.id === l.moduleId) && !completedLessons.includes(l.slug)
    ).slice(0, 2);

    return { weakAreas, recoveryLessons };
  }, [quizScores, completedLessons]);

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      
      {/* 1. Welcome & Resume Section */}
      <div className="relative">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-brand-primary/10 blur-[100px] rounded-full opacity-50 pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <Badge variant="ghost" className="bg-brand-primary/10 text-brand-primary border-none px-4 py-1.5 uppercase font-black tracking-widest text-[10px]">
              Platform Statistics Overview
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-black text-white tracking-tight leading-none">
              Welcome back, <span className="text-brand-primary drop-shadow-[0_0_15px_rgba(248,152,32,0.3)]">{user?.fullName?.split(' ')[0] || 'Visionary'}</span>!
            </h1>
            <p className="text-slate-500 font-medium tracking-wide text-lg">Your progress is compounding. <span className="text-white">{streak} day streak</span> maintained.</p>
          </div>
          
          <div className="flex gap-4">
             <button onClick={() => navigate('/roadmap')} className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold transition-all border border-white/5 flex items-center gap-2">
                <Map size={18} />
                <span>View Roadmap</span>
             </button>
             <button onClick={() => navigate('/quiz-arena')} className="px-6 py-3 bg-brand-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-brand-primary/20 hover:scale-105 active:scale-95">
                Join Arena
             </button>
          </div>
        </div>
      </div>
        
      {/* Quick Access & Daily Challenge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
           {resumeLesson ? (
            <Card className="p-8 bg-gradient-to-br from-brand-primary/20 via-brand-primary/5 to-transparent border-brand-primary/30 flex flex-col md:flex-row items-center justify-between group cursor-pointer h-full relative overflow-hidden backdrop-blur-sm" 
                  onClick={() => navigate(`/lesson/${resumeLesson.slug}`)}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 blur-3xl rounded-full" />
              <div className="flex items-center gap-8 mb-6 md:mb-0 relative z-10">
                 <div className="w-20 h-20 rounded-[2.5rem] bg-brand-primary flex items-center justify-center text-white shadow-2xl shadow-brand-primary/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <Play size={40} fill="currentColor" className="ml-1" />
                 </div>
                 <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-8 h-[1px] bg-brand-primary" />
                      <p className="text-[10px] font-black uppercase text-brand-primary tracking-[0.3em] text-glow-sm">Resume Mission</p>
                    </div>
                    <h4 className="text-white font-black text-3xl tracking-tight leading-tight">{resumeLesson.title}</h4>
                    <p className="text-slate-400 text-sm mt-3 font-medium flex items-center gap-2">
                       <Clock size={14} className="text-brand-primary" />
                       Pick up exactly where you left off
                    </p>
                 </div>
              </div>
              <div className="flex items-center gap-3 px-8 py-4 bg-dark-bg/40 rounded-2xl group-hover:bg-brand-primary group-hover:text-white transition-all border border-white/10 backdrop-blur-md shadow-2xl relative z-10">
                <span className="text-xs font-black uppercase tracking-widest">Continue</span>
                <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </Card>
          ) : (
            <Card className="p-12 text-center flex flex-col items-center justify-center h-full bg-white/2 border-dashed border-2 border-white/10 group hover:border-brand-primary/50 transition-all">
               <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-slate-800 mb-6 group-hover:text-brand-primary transition-colors">
                  <BookOpen size={40} />
               </div>
               <h4 className="text-2xl font-black text-white italic mb-2">Ready to embark?</h4>
               <p className="text-slate-500 max-w-sm mx-auto mb-8">You haven't started any lessons yet. Dive into the fundamentals and earn your first XP.</p>
               <PrimaryButton onClick={() => navigate('/roadmap')} className="px-12 py-4">Start Your Journey</PrimaryButton>
            </Card>
          )}
        </div>

        <div className="lg:col-span-4">
          <Card className="p-8 bg-[#1a1c2e]/80 backdrop-blur-xl border-indigo-500/20 relative overflow-hidden group cursor-pointer h-full border hover:border-indigo-500 transition-all flex flex-col justify-between">
             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-45 transition-transform duration-700">
                <Zap size={80} className="text-indigo-400" />
             </div>
             <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-start">
                   <Badge variant="ghost" className="bg-indigo-500/10 text-indigo-400 border-none uppercase font-black tracking-widest text-[9px] px-3 py-1">Daily Quest</Badge>
                   <span className="text-rose-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-1 animate-pulse">
                      <Clock size={12} /> 14h Left
                   </span>
                </div>
                <h4 className="text-2xl font-bold text-white leading-tight italic decoration-indigo-500/30 underline underline-offset-4">Can you explain the difference between Final, Finally, and Finalize?</h4>
                <div className="flex items-center gap-3 pt-4">
                   <div className="flex -space-x-2">
                      {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full border border-dark-bg bg-indigo-500/50" />)}
                   </div>
                   <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">128 Architects Attempted</span>
                </div>
             </div>
             <div className="relative z-10 pt-8 border-t border-white/5 flex items-center justify-between">
                <div className="flex flex-col">
                   <span className="text-indigo-400 font-black text-lg">+50</span>
                   <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Target XP</span>
                </div>
                <button className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-black uppercase tracking-[0.1em] text-[10px] rounded-xl shadow-xl shadow-indigo-500/20 transition-all hover:scale-110 active:scale-95">
                   Accept Challenge
                </button>
             </div>
          </Card>
        </div>
      </div>

      {/* 2. Stats Grid (Improved Responsiveness: 2-column on mobile) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatisticCard 
          label="Total XP" 
          value={xp.toLocaleString()} 
          nextGoal={stats.nextLevelXP} 
          progress={(xp / stats.nextLevelXP) * 100}
          colorClass="border-b-brand-primary"
        />
        
        <StatisticCard 
          label="Day Streak" 
          value={`${streak} 🔥`}
          colorClass="border-b-rose-500"
        />

        <StatisticCard 
          label="Lessons Done" 
          value={completedLessons.length}
          colorClass="border-b-emerald-500"
        />

        <StatisticCard 
          label="Skill Level" 
          value={stats.currentLevel}
          colorClass="border-b-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (2/3) */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* 3. Recommended Next Lesson */}
          <section>
            <SectionTitle title="Recommended Next Steps" subtitle="Hand-picked path based on your journey." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {recommendedLessons.map((lesson) => (
                <Card key={lesson.slug} 
                      onClick={() => navigate(`/lesson/${lesson.slug}`)}
                      className="p-6 hover:bg-white/5 cursor-pointer group transition-all">
                  <div className="flex justify-between items-start mb-4">
                     <Badge variant="ghost" className="opacity-50">{lesson.moduleId}</Badge>
                     <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg group-hover:bg-indigo-500 group-hover:text-white transition-all">
                        <BookOpen size={16} />
                     </div>
                  </div>
                  <h4 className="text-white font-bold mb-4">{lesson.title}</h4>
                  <div className="flex items-center justify-between">
                     <span className="text-xs text-slate-500 font-bold">{lesson.duration}</span>
                     <span className="text-brand-primary text-xs font-black uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                        Start <ArrowRight size={14} />
                     </span>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* 4. Progress by Module */}
          <section>
            <SectionTitle title="Course Master Hub" subtitle="Your tactical journey through the Java ecosystem." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {moduleProgressList.map((module) => (
                <Card key={module.title} className="p-8 hover:bg-white/5 group border-white/5 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform">
                    <CheckCircle2 size={48} className="text-brand-primary" />
                  </div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="font-black text-xl text-white group-hover:text-brand-primary transition-colors tracking-tight italic">{module.title}</h4>
                      <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-loose">{module.lessons} Modules</span>
                    </div>
                    <Badge variant={module.progress === 100 ? 'success' : 'ghost'} className="px-3 py-1 text-[9px] uppercase font-black">
                      {module.progress === 100 ? 'Mastered' : 'Active'}
                    </Badge>
                  </div>
                  <ProgressBar progress={module.progress} showLabel={false} height="h-2" color={module.progress === 100 ? 'bg-emerald-500' : 'bg-brand-primary'} />
                  <div className="flex justify-between mt-4 text-[10px] font-black uppercase text-slate-600 tracking-[0.2em]">
                    <span>{module.progress === 100 ? 'Rank: Java Master' : 'Deployment Status'}</span>
                    <span className={module.progress === 100 ? 'text-emerald-500' : 'text-slate-400'}>{module.progress}%</span>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column (1/3) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* 5. Weekly Goals */}
          <section>
            <SectionTitle title="Weekly High-Value Target" className="mb-6" />
            <Card className="p-8 bg-[#0f111a] border-brand-primary/20 relative overflow-hidden shadow-2xl backdrop-blur-md">
               <div className="absolute -top-4 -right-4 p-8 opacity-10 rotate-12">
                  <Target size={120} className="text-brand-primary" />
               </div>
               <div className="flex justify-between items-center mb-6 relative z-10">
                  <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em]">Operational Readiness</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-white">{weeklyGoal.current}</span>
                    <span className="text-slate-700">/</span>
                    <span className="text-xs font-black text-slate-500">{weeklyGoal.target}</span>
                  </div>
               </div>
               <h4 className="text-white font-black text-lg mb-6 leading-tight italic">Deliver 5 code-complete lessons to unlock "Java Vanguard" status.</h4>
               <ProgressBar progress={(weeklyGoal.current / weeklyGoal.target) * 100} showLabel={false} height="h-3" />
               <div className="flex items-center justify-between mt-6 relative z-10">
                  <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">{weeklyGoal.target - weeklyGoal.current > 0 ? `${weeklyGoal.target - weeklyGoal.current} lessons remaining` : 'Operation Success!'}</p>
                  <TrendingUp size={16} className="text-emerald-500" />
               </div>
            </Card>
          </section>

          {/* 6. Achievements */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <SectionTitle title="Hall of Glory" />
              <button className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-brand-primary transition-colors">View All</button>
            </div>
            <div className="grid grid-cols-4 gap-4">
               {ACHIEVEMENTS.map((ach) => {
                 const isUnlocked = achievements.includes(ach.id);
                 const Icon = ach.icon;
                 return (
                   <div 
                     key={ach.id}
                     title={ach.title + ": " + ach.description}
                     className={`aspect-square rounded-[1.25rem] flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 ${isUnlocked ? 'bg-brand-primary/10 text-brand-primary shadow-xl shadow-brand-primary/10 border-2 border-brand-primary/40' : 'bg-white/2 text-slate-800 border border-white/5 grayscale'}`}
                   >
                      <Icon size={24} strokeWidth={isUnlocked ? 2.5 : 1.5} />
                   </div>
                 );
               })}
            </div>
          </section>

          {/* 7. Recent Quizzes */}
          <section>
            <SectionTitle title="Battle Logs" className="mb-6" />
            <div className="space-y-4">
              {recentQuizzes.length > 0 ? recentQuizzes.map((quiz) => (
                <Card key={quiz.id} className="p-5 flex items-center justify-between group bg-white/2 border-white/5 hover:bg-white/5 transition-all border-l-4 border-l-transparent hover:border-l-brand-primary">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-all shadow-inner">
                      <Trophy size={20} />
                    </div>
                    <div>
                      <h5 className="text-white text-sm font-black truncate max-w-[140px] italic">{quiz.title}</h5>
                      <p className="text-slate-600 text-[9px] font-black uppercase tracking-widest mt-1">{quiz.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-black text-base tabular-nums">{quiz.score}/{quiz.total}</p>
                    <p className="text-[9px] text-brand-primary font-black uppercase tracking-tighter">Points Earned</p>
                  </div>
                </Card>
              )) : (
                <Card className="p-12 text-center bg-white/1 border-dashed border-2 border-white/5 rounded-[2.5rem]">
                   <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-slate-700 mx-auto mb-6">
                      <Zap size={32} />
                   </div>
                   <p className="text-white font-bold text-sm mb-2">No Battle Logs Detected</p>
                   <p className="text-slate-600 text-[10px] font-medium leading-relaxed italic">Enter the Arena to test your knowledge and record your first victory.</p>
                </Card>
              )}
            </div>
          </section>

          {/* 8. Intelligence Center (Adaptive Recommendations) */}
          <section>
            <SectionTitle title="Adaptive Engine" className="mb-6" />
            <Card className="bg-[#0b0d12] border-indigo-500/10 p-10 space-y-10 relative overflow-hidden shadow-2xl rounded-[3rem]">
               <div className="absolute top-0 right-0 p-10 opacity-5">
                  <Brain size={100} className="text-indigo-400" />
               </div>
               
               {/* Weak Areas */}
               <div className="space-y-6 relative z-10">
                  <h5 className="text-[10px] font-black uppercase text-rose-500 tracking-[0.3em] flex items-center gap-2">
                     <AlertTriangle size={14} /> Critical Weak Areas
                  </h5>
                  <div className="space-y-5">
                     {analytics.weakAreas.length > 0 ? analytics.weakAreas.map(area => (
                       <div key={area.id} className="space-y-3">
                          <div className="flex justify-between text-xs font-black text-white">
                             <span className="italic">{area.title}</span>
                             <span className="text-rose-500 tabular-nums">{area.percentage}% Proficiency</span>
                          </div>
                          <ProgressBar progress={area.percentage} showLabel={false} height="h-1.5" color="bg-rose-500" trackingColor="bg-rose-500/10" />
                       </div>
                     )) : (
                        <div className="p-8 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl text-center space-y-4">
                           <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mx-auto">
                              <Star size={24} fill="currentColor" />
                           </div>
                           <div>
                             <p className="text-white font-bold text-xs">Peak Performance</p>
                             <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic mt-1">No critical vulnerabilities detected in your runtime knowledge.</p>
                           </div>
                        </div>
                     )}
                  </div>
               </div>

               {/* Recovery Path */}
               <div className="space-y-4 pt-6 border-t border-white/5 relative z-10">
                  <h5 className="text-[10px] font-black uppercase text-emerald-500 tracking-[0.2em] flex items-center gap-2">
                     <RotateCcw size={14} /> Recovery Path
                  </h5>
                  <div className="space-y-2">
                     {analytics.recoveryLessons.map(lesson => (
                       <button 
                         key={lesson.slug}
                         onClick={() => navigate(`/lesson/${lesson.slug}`)}
                         className="w-full p-4 bg-white/2 hover:bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between group transition-all"
                       >
                          <div className="flex items-center gap-3">
                             <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                <Play size={12} fill="currentColor" />
                             </div>
                             <span className="text-xs text-white font-bold">{lesson.title}</span>
                          </div>
                          <ChevronRight size={14} className="text-slate-700" />
                       </button>
                     ))}
                  </div>
               </div>

               {/* Improvement Path */}
               <div className="p-5 bg-indigo-500/10 rounded-[2rem] border border-indigo-500/20 text-center">
                  <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Estimated Improvement</p>
                  <p className="text-white font-black text-xl">+45% <span className="text-slate-500 text-sm font-bold">score boost</span></p>
                  <p className="text-[9px] text-slate-500 mt-2 font-bold uppercase tracking-tighter">Based on tactical recovery completion</p>
               </div>
            </Card>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;