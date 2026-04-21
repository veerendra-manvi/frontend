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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-2">
          <h1 className="text-4xl font-black text-white tracking-tight">
            Welcome back, <span className="text-brand-primary">{user?.fullName?.split(' ')[0] || 'Visionary'}</span>!
          </h1>
          <p className="text-slate-500 font-medium tracking-wide">You're making incredible progress. Your current streak is {streak} days.</p>
        </div>
        
        {resumeLesson && (
          <Card className="p-6 bg-gradient-to-br from-brand-primary/20 to-transparent border-brand-primary/20 flex items-center justify-between group cursor-pointer" 
                onClick={() => navigate(`/lesson/${resumeLesson.slug}`)}>
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-brand-primary flex items-center justify-center text-white shadow-lg shadow-brand-primary/40 group-hover:scale-110 transition-transform">
                  <Flame size={24} fill="currentColor" />
               </div>
               <div>
                  <p className="text-[10px] font-black uppercase text-brand-primary tracking-widest mb-0.5 text-glow-sm">Resume Learning</p>
                  <h4 className="text-white font-bold text-sm tracking-tight">{resumeLesson.title}</h4>
               </div>
            </div>
            <ChevronRight size={20} className="text-brand-primary group-hover:translate-x-2 transition-transform" />
          </Card>
        )}
      </div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <SectionTitle title="Core Modules" subtitle="Your journey through the Java ecosystem." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {moduleProgressList.map((module) => (
                <Card key={module.title} className="p-6 hover:bg-white/5 group border-white/5">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-bold text-white group-hover:text-brand-primary transition-colors">{module.title}</h4>
                    <span className="text-[11px] text-slate-500 font-bold">{module.lessons} Lessons</span>
                  </div>
                  <ProgressBar progress={module.progress} showLabel={false} height="h-1.5" />
                  <div className="flex justify-between mt-3 text-[10px] font-black uppercase text-slate-600 tracking-widest">
                    <span>{module.progress === 100 ? 'Mastered' : 'Progress'}</span>
                    <span>{module.progress}%</span>
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
            <SectionTitle title="Weekly Mission" className="mb-6" />
            <Card className="p-6 bg-[#0f111a] border-brand-primary/20 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Target size={64} className="text-brand-primary" />
               </div>
               <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Training Progress</span>
                  <Badge variant="primary">{weeklyGoal.current}/{weeklyGoal.target}</Badge>
               </div>
               <h4 className="text-white font-bold text-sm mb-4">Complete 5 Lessons this week.</h4>
               <ProgressBar progress={(weeklyGoal.current / weeklyGoal.target) * 100} showLabel={false} height="h-2" />
               <p className="text-[10px] text-slate-600 font-bold mt-4 uppercase tracking-[0.2em]">{weeklyGoal.target - weeklyGoal.current > 0 ? `${weeklyGoal.target - weeklyGoal.current} more to reach goal` : 'Goal Smashed!'}</p>
            </Card>
          </section>

          {/* 6. Achievements */}
          <section>
            <SectionTitle title="Hall of Fame" className="mb-6" />
            <div className="grid grid-cols-4 gap-3">
               {ACHIEVEMENTS.map((ach) => {
                 const isUnlocked = achievements.includes(ach.id);
                 const Icon = ach.icon;
                 return (
                   <div 
                     key={ach.id}
                     title={ach.title + ": " + ach.description}
                     className={`aspect-square rounded-2xl flex items-center justify-center transition-all ${isUnlocked ? 'bg-brand-primary/20 text-brand-primary shadow-lg shadow-brand-primary/10 border border-brand-primary/30' : 'bg-white/5 text-slate-800 border border-white/5 grayscale'}`}
                   >
                      <Icon size={24} />
                   </div>
                 );
               })}
            </div>
          </section>

          {/* 7. Recent Quizzes */}
          <section>
            <SectionTitle title="Recent Arena" className="mb-6" />
            <div className="space-y-4">
              {recentQuizzes.length > 0 ? recentQuizzes.map((quiz) => (
                <Card key={quiz.id} className="p-4 flex items-center justify-between group bg-white/2 border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-all">
                      <Trophy size={18} />
                    </div>
                    <div>
                      <h5 className="text-white text-xs font-bold truncate max-w-[150px]">{quiz.title}</h5>
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-tighter">{quiz.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-black text-sm">{quiz.score}/{quiz.total}</p>
                    <p className="text-[9px] text-slate-600 font-bold">POINTS</p>
                  </div>
                </Card>
              )) : (
                <Card className="p-8 text-center bg-white/2 border-dashed border-white/10">
                   <p className="text-slate-600 text-xs italic">No battle logs yet. Start a quiz!</p>
                </Card>
              )}
            </div>
          </section>

          {/* 8. Intelligence Center (Adaptive Recommendations) */}
          <section>
            <SectionTitle title="Intelligence Center" className="mb-6" />
            <Card className="bg-[#12141f] border-indigo-500/20 p-8 space-y-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Brain size={80} className="text-indigo-400" />
               </div>
               
               {/* Weak Areas */}
               <div className="space-y-4 relative z-10">
                  <h5 className="text-[10px] font-black uppercase text-indigo-400 tracking-[0.2em] flex items-center gap-2">
                     <AlertTriangle size={14} /> Attention Required
                  </h5>
                  <div className="space-y-3">
                     {analytics.weakAreas.length > 0 ? analytics.weakAreas.map(area => (
                       <div key={area.id} className="space-y-2">
                          <div className="flex justify-between text-xs font-bold text-white">
                             <span>{area.title}</span>
                             <span className="text-rose-500">{area.percentage}% Proficiency</span>
                          </div>
                          <ProgressBar progress={area.percentage} showLabel={false} height="h-1" />
                       </div>
                     )) : (
                       <p className="text-xs text-slate-500 italic">No critical weak areas detected. Outstanding work!</p>
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