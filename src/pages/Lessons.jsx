import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { ChevronLeft, ChevronRight, CheckCircle, Code as CodeIcon, HelpCircle, BookOpen, Activity, Play } from 'lucide-react';
import { EmptyState } from '../components/ui/EmptyState';
import { Card, Badge, PrimaryButton, ProgressBar } from '../components/ui';
import useProgressStore from '../store/useProgressStore';

const Lessons = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Monitor store changes for UI reactivity
  const completedLessons = useProgressStore((state) => state.completedLessons);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await api.get(`/api/learning/lessons/topic/${topicId}`);
        setLessons(response.data);
      } catch (error) {
        console.error('Failed to fetch lessons', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLessons();
  }, [topicId]);

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
       <div className="w-16 h-16 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" />
       <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.3em] italic animate-pulse">Initializing Knowledge Archive...</p>
    </div>
  );
  
  if (lessons.length === 0) return (
    <div className="max-w-4xl mx-auto py-24 px-6">
      <EmptyState 
        title="Knowledge Archive Inaccessible"
        message="Our architectural specialists are currently synchronizing the documentation for this node. Check fallback clusters."
        iconId="ghost"
        actionLabel="Back to Categories"
        onAction={() => navigate('/categories')}
      />
    </div>
  );
  
  const currentLesson = lessons[currentLessonIndex];
  const isLastLesson = currentLessonIndex === lessons.length - 1;

  const nextLesson = () => {
    // 🛡️ Trigger completion logic
    useProgressStore.getState().completeLesson(currentLesson.id, currentLesson.title);

    if (!isLastLesson) {
      setCurrentLessonIndex(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      navigate(`/quiz/${topicId}`);
    }
  };

  const prevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="lesson-viewer fade-in pb-24 p-6 lg:p-12 max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Sidebar: Knowledge Structure */}
        <aside className="lg:col-span-3 space-y-8 sticky top-28 bg-[#0b0d12] border-2 border-white/5 rounded-[3rem] p-10 hidden lg:block shadow-2xl">
          <div className="flex items-center gap-3 mb-10">
             <div className="p-3 bg-brand-primary/10 rounded-xl text-brand-primary border border-brand-primary/20 italic"><BookOpen className="w-[20px] h-[20px]" /></div>
             <h3 className="text-sm font-black text-white italic tracking-[0.1em] uppercase">Module Structure</h3>
          </div>
          
          <ul className="space-y-4">
            {lessons.map((lesson, index) => (
              <li 
                key={lesson.id} 
                className={`p-5 rounded-2xl flex items-center gap-4 cursor-pointer transition-all border-2 group ${index === currentLessonIndex ? 'bg-brand-primary border-brand-primary text-white shadow-2xl shadow-brand-primary/20 scale-[1.05]' : 'text-slate-600 bg-white/1 border-white/5 hover:bg-white/5 hover:border-white/10'}`}
                onClick={() => setCurrentLessonIndex(index)}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black italic text-[10px] border-2 transition-all ${
                  index === currentLessonIndex 
                    ? 'bg-white/20 border-white/30 text-white' 
                    : completedLessons.includes(lesson.id)
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' 
                      : 'bg-white/5 border-white/10'
                }`}>
                  {completedLessons.includes(lesson.id) ? <CheckCircle className="w-[14px] h-[14px]" /> : <span>0{index + 1}</span>}
                </div>
                <span className="flex-1 text-xs font-black truncate italic transition-colors group-hover:text-white leading-none">{lesson.title}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-12 p-10 bg-indigo-500/5 rounded-[2.5rem] border-2 border-indigo-500/10 text-center space-y-8 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:scale-125 transition-transform"><Activity className="w-[100px] h-[100px] text-white" /></div>
             <div className="w-16 h-16 bg-indigo-500/10 border-2 border-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 mx-auto shadow-xl group-hover:rotate-12 transition-transform">
                <HelpCircle className="w-[32px] h-[32px]" />
             </div>
             <div className="space-y-2">
                <p className="font-black text-white italic tracking-tighter text-lg leading-tight">Assessment Protocol Ready</p>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] italic">Validate knowledge node</p>
             </div>
             <Link to={`/quiz/${topicId}`} className="block w-full py-4 bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-[0.2em] italic text-[10px] shadow-2xl shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all">Launch Quiz</Link>
          </div>
        </aside>

        {/* Main Processing Hub */}
        <main className="lg:col-span-9 space-y-12">
          <Card className="p-12 lg:p-20 bg-dark-sidebar/40 border-2 border-white/5 rounded-[4rem] relative overflow-hidden shadow-3xl">
            <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none -mr-20 -mt-20"><Activity className="w-[400px] h-[400px] text-white" /></div>
            
            <header className="mb-16 space-y-8">
              <div className="flex items-center gap-6">
                 <div className="px-6 py-2 bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-[0.3em] w-fit rounded-full border-2 border-brand-primary/20 italic">
                   Archival Segment 0{currentLessonIndex + 1} of 0{lessons.length}
                 </div>
                 <div className="h-0.5 flex-1 bg-white/5 rounded-full" />
              </div>
              <h1 className="text-4xl lg:text-7xl font-black text-white italic tracking-tighter leading-tight drop-shadow-2xl underline decoration-white/5 decoration-8 underline-offset-8 decoration-dotted">{currentLesson.title}</h1>
            </header>

            <section className="mb-16">
              <div className="theory-content text-slate-300 leading-relaxed text-xl font-bold italic tracking-tight space-y-8 prose prose-invert max-w-none prose-p:mb-8 prose-li:mb-4 prose-strong:text-white" dangerouslySetInnerHTML={{ __html: currentLesson.content }}></div>
            </section>

            {currentLesson.codeSnippet && (
              <section className="mb-16 overflow-hidden rounded-[2.5rem] border-2 border-white/5 shadow-2xl">
                <div className="bg-white/2 px-10 py-5 flex items-center justify-between border-b-2 border-white/5">
                   <div className="flex items-center gap-4">
                     <div className="p-2.5 bg-brand-primary/10 rounded-xl text-brand-primary"><CodeIcon className="w-[20px] h-[20px]" /></div>
                     <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-700 italic">Code Foundation Architecture</span>
                   </div>
                   <span className="text-[9px] font-black text-slate-800 uppercase tracking-widest italic">Java JRE_17_RUNTIME</span>
                </div>
                <div className="p-10 bg-black/60 relative group">
                   <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                   <div className="absolute top-10 right-10 flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/40" />
                      <div className="w-3 h-3 rounded-full bg-brand-primary/40" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/40" />
                   </div>
                   <pre className="font-mono text-[15px] text-brand-primary font-bold italic leading-relaxed overflow-x-auto relative z-10 selection:bg-brand-primary/20">
                     <code>{currentLesson.codeSnippet}</code>
                   </pre>
                </div>
              </section>
            )}

            <div className="pt-12 border-t-2 border-white/5 flex flex-col sm:flex-row justify-between items-center gap-8">
              <button 
                className="w-full sm:w-auto flex items-center justify-center gap-5 px-10 py-5 bg-white/2 border-2 border-white/5 rounded-[2rem] text-slate-700 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-black uppercase tracking-[0.3em] text-[10px] italic shadow-2xl active:scale-95"
                onClick={prevLesson} 
                disabled={currentLessonIndex === 0}
              >
                <ChevronLeft className="w-[24px] h-[24px] group-hover:-translate-x-2 transition-transform" />
                Previous Segment
              </button>
              
              <PrimaryButton onClick={nextLesson} className="w-full sm:w-auto h-20 px-16 rounded-[2rem] text-xs font-black uppercase tracking-[0.4em] italic shadow-2xl shadow-brand-primary/40 group active:scale-95">
                <span className="flex items-center gap-4">
                   {isLastLesson ? 'Initialize Quiz' : 'Finalize Segment'} 
                   {isLastLesson ? <HelpCircle className="w-[24px] h-[24px]" /> : <ChevronRight className="w-[24px] h-[24px] group-hover:translate-x-2 transition-transform" />}
                </span>
              </PrimaryButton>
            </div>
          </Card>
        </main>
      </div>

      {/* Decorative Branding */}
      <div className="fixed bottom-0 right-10 p-12 opacity-5 pointer-events-none select-none">
         <Play className="w-[400px] h-[400px] text-white rotate-12" />
      </div>
    </div>
  );
};

export default Lessons;
