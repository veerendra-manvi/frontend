import React from 'react';
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
  RotateCcw,
  Map,
  Shield,
  Activity
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

const DashBoard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { 
    xp, 
    streak, 
    completedLessons, 
    quizScores,
    weeklyGoal 
  } = useProgressStore();

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      
      {/* 1. Welcome & Header Action Section */}
      <div className="relative">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-brand-primary/10 blur-[100px] rounded-full opacity-50 pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <Badge variant="ghost" className="bg-brand-primary/10 text-brand-primary border-none px-4 py-1.5 uppercase font-black tracking-widest text-[10px]">
              Platform Intelligence Activated
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-none">
              Welcome back, <span className="text-brand-primary drop-shadow-[0_0_15px_rgba(248,152,32,0.3)]">{user?.fullName?.split(' ')[0] || 'Architect'}</span>!
            </h1>
            <p className="text-slate-500 font-medium tracking-wide text-lg">Your progress is compounding. <span className="text-white">{streak} day streak</span> maintained.</p>
          </div>
          
          <div className="flex gap-4">
             <button onClick={() => navigate('/roadmap')} className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold transition-all border border-white/5 flex items-center gap-2">
                <Map className="w-[18px] h-[18px]" />
                <span>View Roadmap</span>
             </button>
             <button onClick={() => navigate('/quiz-arena')} className="px-6 py-3 bg-brand-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-brand-primary/20 hover:scale-105 active:scale-95">
                Join Arena
             </button>
          </div>
        </div>
      </div>

      {/* 2. Top Tier Navigation Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
            <Card className="p-8 bg-gradient-to-br from-brand-primary/20 via-brand-primary/5 to-transparent border-brand-primary/30 flex flex-col md:flex-row items-center justify-between group cursor-pointer h-full relative overflow-hidden backdrop-blur-sm shadow-2xl shadow-brand-primary/5" 
                  onClick={() => navigate(`/roadmap`)}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 blur-3xl rounded-full" />
              <div className="flex items-center gap-8 mb-6 md:mb-0 relative z-10">
                 <div className="w-20 h-20 rounded-[2.5rem] bg-brand-primary flex items-center justify-center text-white shadow-2xl shadow-brand-primary/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <Play className="w-[40px] h-[40px] ml-1" fill="currentColor" />
                 </div>
                 <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-8 h-[1px] bg-brand-primary" />
                      <p className="text-[10px] font-black uppercase text-brand-primary tracking-[0.3em] text-glow-sm">Next Mission</p>
                    </div>
                    <h4 className="text-white font-black text-3xl tracking-tight leading-tight italic">Fundamentals of JVM</h4>
                    <p className="text-slate-400 text-sm mt-3 font-medium flex items-center gap-2">
                       <Clock className="w-[14px] h-[14px] text-brand-primary" />
                       Pick up exactly where you left off
                    </p>
                 </div>
              </div>
              <div className="flex items-center gap-3 px-8 py-4 bg-dark-bg/40 rounded-2xl group-hover:bg-brand-primary group-hover:text-white transition-all border border-white/10 backdrop-blur-md shadow-2xl relative z-10">
                <span className="text-xs font-black uppercase tracking-widest">Continue</span>
                <ChevronRight className="w-[20px] h-[20px] group-hover:translate-x-2 transition-transform" />
              </div>
            </Card>
        </div>

        <div className="lg:col-span-4">
          <Card className="p-8 bg-[#1a1c2e]/80 backdrop-blur-xl border-indigo-500/20 relative overflow-hidden group cursor-pointer h-full border hover:border-indigo-500 transition-all flex flex-col justify-between">
             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-45 transition-transform duration-700">
                <Zap className="w-[80px] h-[80px] text-indigo-400" />
             </div>
             <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-start">
                   <Badge variant="ghost" className="bg-indigo-500/10 text-indigo-400 border-none uppercase font-black tracking-widest text-[9px] px-3 py-1">Daily Quest</Badge>
                   <span className="text-rose-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-1 animate-pulse">
                      <Clock className="w-[12px] h-[12px]" /> 14h Left
                   </span>
                </div>
                <h4 className="text-2xl font-bold text-white leading-tight italic decoration-indigo-500/30 underline underline-offset-4">Logic of Concurrency</h4>
                <p className="text-slate-500 text-xs font-medium">Earn double bonus XP today by mastering threads.</p>
             </div>
             <div className="relative z-10 pt-8 border-t border-white/5 flex items-center justify-between">
                <div className="flex flex-col">
                   <span className="text-indigo-400 font-black text-lg">+100</span>
                   <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Bonus XP</span>
                </div>
                <button className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-black uppercase tracking-[0.1em] text-[10px] rounded-xl shadow-xl shadow-indigo-500/20 transition-all hover:scale-110 active:scale-95">
                   Accept Challenge
                </button>
             </div>
          </Card>
        </div>
      </div>

      {/* 3. Global Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatisticCard 
          label="Total XP" 
          value={xp.toLocaleString()} 
          progress={(xp / 3000) * 100}
          nextGoal={3000}
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
          value="Senior Dev"
          colorClass="border-b-indigo-500"
        />
      </div>

      {/* 4. Main Activity Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Hub (Progress & Hubs) */}
        <div className="lg:col-span-8 space-y-12">
            
            <section>
              <SectionTitle title="Course Master Hub" subtitle="Your tactical journey through the Java ecosystem." />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                
                {/* Module 1 */}
                <Card className="p-8 hover:bg-white/5 group border-white/5 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform">
                    <CheckCircle2 className="w-[48px] h-[48px] text-brand-primary" />
                  </div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="font-black text-xl text-white group-hover:text-brand-primary transition-colors tracking-tight italic">Java Syntax Essentials</h4>
                      <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-loose">12 Modules</span>
                    </div>
                    <Badge variant="ghost" className="px-3 py-1 text-[9px] uppercase font-black">Active</Badge>
                  </div>
                  <ProgressBar progress={65} showLabel={false} height="h-2" />
                  <div className="flex justify-between mt-4 text-[10px] font-black uppercase text-slate-600 tracking-[0.2em]">
                    <span>Deployment Status</span>
                    <span className="text-slate-400">65%</span>
                  </div>
                </Card>

                {/* Module 2 */}
                <Card className="p-8 hover:bg-white/5 group border-white/5 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform">
                    <CheckCircle2 className="w-[48px] h-[48px] text-emerald-500" />
                  </div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="font-black text-xl text-white group-hover:text-brand-primary transition-colors tracking-tight italic">OOP Architecture</h4>
                      <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-loose">8 Modules</span>
                    </div>
                    <Badge variant="success" className="px-3 py-1 text-[9px] uppercase font-black">Mastered</Badge>
                  </div>
                  <ProgressBar progress={100} showLabel={false} height="h-2" />
                  <div className="flex justify-between mt-4 text-[10px] font-black uppercase text-slate-600 tracking-[0.2em]">
                    <span>Rank: Java Master</span>
                    <span className="text-emerald-500">100%</span>
                  </div>
                </Card>

                {/* Module 3 */}
                <Card className="p-8 hover:bg-white/5 group border-white/5 transition-all duration-300 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform">
                    <Activity className="w-[48px] h-[48px] text-indigo-500" />
                  </div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="font-black text-xl text-white group-hover:text-brand-primary transition-colors tracking-tight italic">Functional Chains</h4>
                      <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-loose">15 Modules</span>
                    </div>
                    <Badge variant="ghost" className="px-3 py-1 text-[9px] uppercase font-black">35% Ready</Badge>
                  </div>
                  <ProgressBar progress={35} showLabel={false} height="h-2" />
                  <div className="flex justify-between mt-4 text-[10px] font-black uppercase text-slate-600 tracking-[0.2em]">
                    <span>Pending Integration</span>
                    <span className="text-slate-400">35%</span>
                  </div>
                </Card>

                {/* Module 4 */}
                <Card className="p-8 hover:bg-white/5 group border-white/5 transition-all duration-300 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform">
                    <Activity className="w-[48px] h-[48px] text-rose-500" />
                  </div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="font-black text-xl text-white group-hover:text-brand-primary transition-colors tracking-tight italic">Async Workflows</h4>
                      <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-loose">5 Modules</span>
                    </div>
                    <Badge variant="ghost" className="px-3 py-1 text-[9px] uppercase font-black">Not Started</Badge>
                  </div>
                  <ProgressBar progress={0} showLabel={false} height="h-2" />
                  <div className="flex justify-between mt-4 text-[10px] font-black uppercase text-slate-600 tracking-[0.2em]">
                    <span>Offline</span>
                    <span className="text-slate-400">0%</span>
                  </div>
                </Card>
              </div>
            </section>
        </div>

        {/* Right Hub (Sidebar Data) */}
        <div className="lg:col-span-4 space-y-8">
            
            {/* Weekly Target */}
            <section>
              <SectionTitle title="Weekly High-Value Target" className="mb-6" />
              <Card className="p-8 bg-[#0f111a] border-brand-primary/20 relative overflow-hidden shadow-2xl backdrop-blur-md">
                 <div className="absolute -top-4 -right-4 p-8 opacity-10 rotate-12">
                    <Target className="w-[120px] h-[120px] text-brand-primary" />
                 </div>
                 <div className="flex justify-between items-center mb-6 relative z-10">
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em]">Operational Readiness</span>
                    <div className="flex items-center gap-2 text-white font-black text-xs">
                      {weeklyGoal.current} / {weeklyGoal.target}
                    </div>
                 </div>
                 <h4 className="text-white font-black text-lg mb-6 leading-tight italic">Deliver 5 code-complete lessons to unlock "Java Vanguard" status.</h4>
                 <ProgressBar progress={(weeklyGoal.current / weeklyGoal.target) * 100} showLabel={false} height="h-3" />
                 <div className="flex items-center justify-between mt-6 relative z-10">
                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">{weeklyGoal.target - weeklyGoal.current > 0 ? `${weeklyGoal.target - weeklyGoal.current} left` : 'Operation Success!'}</p>
                    <TrendingUp className="w-[16px] h-[16px] text-emerald-500" />
                 </div>
              </Card>
            </section>

            {/* Achievements - ENFORCED STATIC RENDERING */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <SectionTitle title="Hall of Glory" />
                <button className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-brand-primary transition-colors">View All</button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                 <div className="aspect-square rounded-[1.25rem] flex items-center justify-center transition-all duration-500 hover:scale-110 bg-brand-primary/10 text-brand-primary shadow-xl border-2 border-brand-primary/40">
                    <Star className="w-[24px] h-[24px] stroke-[2.5px]" />
                 </div>
                 <div className="aspect-square rounded-[1.25rem] flex items-center justify-center transition-all duration-500 hover:scale-110 bg-brand-primary/10 text-brand-primary shadow-xl border-2 border-brand-primary/40">
                    <Flame className="w-[24px] h-[24px] stroke-[2.5px]" />
                 </div>
                 <div className="aspect-square rounded-[1.25rem] flex items-center justify-center transition-all duration-500 hover:scale-110 bg-white/2 text-slate-800 border border-white/5 grayscale">
                    <Trophy className="w-[24px] h-[24px] stroke-[1.5px]" />
                 </div>
                 <div className="aspect-square rounded-[1.25rem] flex items-center justify-center transition-all duration-500 hover:scale-110 bg-white/2 text-slate-800 border border-white/5 grayscale">
                    <Shield className="w-[24px] h-[24px] stroke-[1.5px]" />
                 </div>
              </div>
            </section>

            {/* Battle Logs */}
            <section>
              <SectionTitle title="Battle Logs" className="mb-6" />
              <div className="space-y-4">
                <Card className="p-5 flex items-center justify-between group bg-white/2 border-white/5 hover:bg-white/5 transition-all border-l-4 border-l-emerald-500">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500/10 transition-all shadow-inner">
                        <Trophy className="w-[20px] h-[20px]" />
                      </div>
                      <div>
                        <h5 className="text-white text-sm font-black truncate max-w-[140px] italic">JVM Core Quiz</h5>
                        <p className="text-slate-600 text-[9px] font-black uppercase tracking-widest mt-1">2 hours ago</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-black text-base tabular-nums">10/10</p>
                      <p className="text-[9px] text-brand-primary font-black uppercase tracking-tighter italic">Perfect Log</p>
                    </div>
                </Card>

                <Card className="p-5 flex items-center justify-between group bg-white/2 border-white/5 hover:bg-white/5 transition-all border-l-4 border-l-transparent hover:border-l-brand-primary">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-all shadow-inner">
                        <Trophy className="w-[20px] h-[20px]" />
                      </div>
                      <div>
                        <h5 className="text-white text-sm font-black truncate max-w-[140px] italic">Streams API Battle</h5>
                        <p className="text-slate-600 text-[9px] font-black uppercase tracking-widest mt-1">Yesterday</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-black text-base tabular-nums">7/10</p>
                      <p className="text-[9px] text-brand-primary font-black uppercase tracking-tighter">Points Earned</p>
                    </div>
                </Card>
              </div>
            </section>

            {/* Adaptive Engine */}
            <section>
              <SectionTitle title="Adaptive Engine" className="mb-6" />
              <Card className="bg-[#0b0d12] border-indigo-500/10 p-10 space-y-10 relative overflow-hidden shadow-2xl rounded-[3rem]">
                 <div className="absolute top-0 right-0 p-10 opacity-5">
                    <Brain className="w-[100px] h-[100px] text-indigo-400" />
                 </div>
                 
                 {/* Weak Areas */}
                 <div className="space-y-6 relative z-10">
                    <h5 className="text-[10px] font-black uppercase text-rose-500 tracking-[0.3em] flex items-center gap-2">
                       <AlertTriangle className="w-[14px] h-[14px]" /> Intelligence Alert
                    </h5>
                    <div className="space-y-5">
                        <div className="space-y-3">
                            <div className="flex justify-between text-xs font-black text-white">
                                <span className="italic">Concurrent Exceptions</span>
                                <span className="text-rose-500 tabular-nums">42% Proficiency</span>
                            </div>
                            <ProgressBar progress={42} showLabel={false} height="h-1.5" />
                        </div>
                    </div>
                 </div>

                 {/* Recovery Path */}
                 <div className="space-y-6 pt-10 border-t border-white/5 relative z-10">
                    <h5 className="text-[10px] font-black uppercase text-emerald-500 tracking-[0.3em] flex items-center gap-2">
                       <RotateCcw className="w-[14px] h-[14px]" /> Recovery Path
                    </h5>
                    <button 
                         onClick={() => navigate(`/roadmap`)}
                         className="w-full p-5 bg-white/2 hover:bg-white/5 rounded-3xl border border-white/5 flex items-center justify-between group transition-all"
                    >
                          <div className="flex items-center gap-4">
                             <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-inner">
                                <Play className="w-[12px] h-[12px]" fill="currentColor" />
                             </div>
                             <span className="text-sm text-white font-black italic">Thread Synchronization Lab</span>
                          </div>
                          <ChevronRight className="w-[14px] h-[14px] text-slate-700" />
                    </button>
                 </div>
              </Card>
            </section>

        </div>
      </div>
    </div>
  );
};

export default DashBoard;