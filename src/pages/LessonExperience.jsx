import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';

// Data
import { lessonData } from '../data/lessons';
import { practiceData } from '../data/practice';
import useProgressStore from '../store/useProgressStore';
import { analytics } from '../services/AnalyticsService';

// Components
import LessonHeader from '../components/lesson/LessonHeader';
import ModeSwitcher from '../components/lesson/ModeSwitcher';
import ExplanationSection from '../components/lesson/ExplanationSection';
import VisualizationSection from '../components/lesson/VisualizationSection';
import CodeLab from '../components/lesson/CodeLab';
import PracticeSection from '../components/lesson/PracticeSection';
import MiniQuiz from '../components/lesson/MiniQuiz';
import TakeawaysSection from '../components/lesson/TakeawaysSection';
import SidebarProgress from '../components/lesson/SidebarProgress';
import LessonNavigation from '../components/lesson/LessonNavigation';
import { Target, Activity } from 'lucide-react';

const LessonExperience = () => {
  const { slug } = useParams();
  const setLastOpened = useProgressStore((state) => state.setLastOpened);
  
  // Resolve data
  const lesson = useMemo(() => lessonData[slug] || lessonData['inheritance'], [slug]);
  const challenges = useMemo(() => practiceData[slug] || [], [slug]);

  const [viewMode, setViewMode] = useState('beginner');

  // Track progression
  React.useEffect(() => {
    if (slug) {
      setLastOpened(slug);
      analytics.trackLessonOpen(slug);
      window.scrollTo(0, 0);
    }
  }, [slug, setLastOpened]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [vizStep, setVizStep] = useState(0);
  const [checkedSections, setCheckedSections] = useState({});

  const handleNextViz = () => {
    setVizStep((prev) => (prev + 1) % (lesson.vizSteps?.length || 1));
  };

  const handleResetViz = () => {
    setVizStep(0);
    setIsPlaying(false);
  };

  const handleToggleSection = (id) => {
    setCheckedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-[1700px] mx-auto px-6 lg:p-12 pb-32 animate-in fade-in slide-in-from-bottom-10 duration-1000 relative">
      
      {/* Decorative Background Elements */}
      <div className="fixed top-20 right-0 p-12 opacity-5 pointer-events-none select-none">
         <Target className="w-[500px] h-[500px] text-white" />
      </div>
      <div className="fixed bottom-20 left-0 p-24 opacity-5 pointer-events-none select-none">
         <Activity className="w-[300px] h-[300px] text-white rotate-45" />
      </div>

      <LessonHeader data={lesson} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-20 relative z-10">
        
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-32">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
             <div className="space-y-4">
                <div className="px-6 py-2 bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-[0.4em] w-fit rounded-full border-2 border-brand-primary/20 italic">Tactical Deployment</div>
                <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">Perspective Node</h2>
             </div>
             <ModeSwitcher viewMode={viewMode} setViewMode={setViewMode} />
          </div>

          <div className="relative group">
             <div className="absolute -left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-primary/40 to-transparent rounded-full hidden lg:block" />
             <ExplanationSection viewMode={viewMode} data={lesson} />
          </div>

          <VisualizationSection 
            data={lesson}
            viewMode={viewMode}
            vizStep={vizStep}
            isPlaying={isPlaying}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onNext={handleNextViz}
            onReset={handleResetViz}
          />

          <CodeLab data={lesson} />

          <PracticeSection challenges={challenges} />

          <MiniQuiz data={lesson} />

          <TakeawaysSection data={lesson} />

          <LessonNavigation />
        </div>

        {/* Sticky Tactical Sidebar */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit">
           <SidebarProgress 
             data={lesson}
             checkedSections={checkedSections}
             onToggleSection={handleToggleSection}
             onFinish={() => {
               useProgressStore.getState().completeLesson(slug);
               analytics.trackCompletion('LESSON', slug);
               alert('System Integrity Verified: Lesson Synchronized. +200 Neural XP Secured.');
             }}
           />
        </div>

      </div>
    </div>
  );
};

export default LessonExperience;
