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
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in duration-700">
      
      <LessonHeader data={lesson} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-20">
          
          <ModeSwitcher viewMode={viewMode} setViewMode={setViewMode} />

          <ExplanationSection viewMode={viewMode} data={lesson} />

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

        {/* Sticky Sidebar */}
        <SidebarProgress 
          data={lesson}
          checkedSections={checkedSections}
          onToggleSection={handleToggleSection}
          onFinish={() => {
            useProgressStore.getState().completeLesson(slug);
            analytics.trackCompletion('LESSON', slug);
            alert('Lesson Completed! 200 XP Earned.');
          }}
        />

      </div>
    </div>
  );
};

export default LessonExperience;
