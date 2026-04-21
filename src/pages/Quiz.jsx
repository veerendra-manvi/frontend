import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { CheckCircle2, ChevronRight, HelpCircle, RefreshCcw, Trophy, Target, Activity, Zap } from 'lucide-react';
import { Badge, ProgressBar, Card, PrimaryButton } from '../components/ui';

const Quiz = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await api.get(`/api/quiz/topic/${topicId}`);
        setQuestions(response.data);
      } catch (error) {
        console.error('Failed to fetch quiz', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuiz();
  }, [topicId]);

  const handleOptionSelect = (questionId, option) => {
    if (isSubmitted) return;
    setSelectedOptions({ ...selectedOptions, [questionId]: option });
  };

  const handleSubmit = async () => {
    if (Object.keys(selectedOptions).length < questions.length) {
      alert('Operational Error: Please complete every assessment node before transmission.');
      return;
    }

    try {
      const response = await api.post('/api/quiz/submit', {
        topicId,
        answers: selectedOptions
      });
      setScore(response.data.score);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to submit quiz', error);
    }
  };

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
       <div className="w-16 h-16 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" />
       <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.3em] italic animate-pulse">Accessing Evaluation Cluster...</p>
    </div>
  );
  
  if (questions.length === 0) return (
    <div className="flex flex-col items-center justify-center py-24 text-center space-y-8">
       <div className="p-10 bg-white/2 rounded-full border-2 border-white/5"><HelpCircle className="w-[80px] h-[80px] text-slate-800" /></div>
       <div className="space-y-4">
          <h2 className="text-3xl font-black text-white italic tracking-tighter">DATA UNAVAILABLE</h2>
          <p className="text-slate-500 font-bold italic tracking-wide">No evaluation units detected for this knowledge cluster.</p>
       </div>
       <PrimaryButton onClick={() => navigate('/categories')} className="px-10 py-4 font-black uppercase italic tracking-widest text-xs">Return to Grid</PrimaryButton>
    </div>
  );

  if (isSubmitted) {
    const percentage = Math.round((score / (questions.length * 10)) * 100);
    return (
      <div className="quiz-result fade-in py-12 p-6 lg:p-12">
        <Card className="result-card bg-dark-sidebar/40 border-2 border-white/5 rounded-[4rem] p-12 lg:p-24 text-center space-y-12 relative overflow-hidden max-w-4xl mx-auto shadow-3xl">
          <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none -mr-20 -mt-20"><Trophy className="w-[400px] h-[400px] text-white" /></div>
          <div className="w-32 h-32 bg-brand-primary/10 border-2 border-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-10 shadow-3xl shadow-brand-primary/10 relative z-10 hover:scale-110 transition-transform duration-700">
             <Trophy className="w-[64px] h-[64px] text-brand-primary group-hover:rotate-12 transition-transform" />
          </div>
          <div className="space-y-4 relative z-10">
             <h1 className="text-5xl lg:text-8xl font-black text-white italic tracking-tighter leading-none uppercase">Sequence<br/><span className="text-brand-primary underline decoration-brand-primary/20 decoration-8 underline-offset-8">Synchronized</span></h1>
          </div>
          <div className="score-display flex flex-col items-center relative z-10 bg-white/2 py-10 rounded-[3rem] border-2 border-white/5 shadow-inner">
            <span className="text-8xl lg:text-9xl font-black text-white tabular-nums tracking-tighter drop-shadow-3xl">{score}</span>
            <span className="text-slate-700 font-black uppercase tracking-[0.4em] text-[10px] mt-4 italic">NEURAL XP SECURED / {questions.length * 10} LIMIT</span>
          </div>
          <p className="text-slate-400 font-bold italic text-lg leading-relaxed max-w-xl mx-auto relative z-10">
             Synchronization successful. Node dominance increased by <span className="text-white underline decoration-brand-primary decoration-4 underline-offset-4">{percentage}%</span>. Data integrity verified against global JRE standards.
          </p>
          <div className="result-actions flex flex-wrap gap-8 justify-center pt-12 relative z-10">
            <PrimaryButton className="px-16 py-6 text-[10px] font-black uppercase tracking-[0.3em] italic rounded-[2rem] shadow-2xl shadow-brand-primary/40 active:scale-95 transition-all" onClick={() => navigate('/categories')}>
              Map Next Track
            </PrimaryButton>
            <button className="px-12 py-6 bg-white/2 hover:bg-white/5 text-slate-800 hover:text-white border-2 border-white/5 hover:border-white/10 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] italic transition-all flex items-center gap-4 active:scale-95 shadow-xl" onClick={() => window.location.reload()}>
              <RefreshCcw className="w-[20px] h-[20px]" /> Re-Evaluate Node
            </button>
          </div>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="quiz-container max-w-5xl mx-auto space-y-12 pb-24 p-6 lg:p-12">
      <header className="space-y-8">
         <div className="flex justify-between items-end">
            <div className="space-y-4">
               <div className="flex items-center gap-4">
                  <Badge variant="ghost" className="bg-brand-primary/10 text-brand-primary border-2 border-brand-primary/20 px-6 py-2 italic font-black uppercase tracking-[0.3em] text-[10px]">Neural Assessment Module</Badge>
                  <div className="h-px w-20 bg-brand-primary/20" />
               </div>
               <h1 className="text-5xl lg:text-7xl font-black text-white italic tracking-tighter leading-none underline decoration-white/5 decoration-8 underline-offset-8">Evaluation Cluster</h1>
            </div>
            <div className="text-right hidden md:block">
               <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.5em] italic leading-none">NODE {currentQuestionIndex + 1} OF 0{questions.length}</p>
            </div>
         </div>
         <ProgressBar progress={((currentQuestionIndex + 1) / questions.length) * 100} showLabel={false} height="h-3" />
      </header>

      <Card className="quiz-card bg-dark-sidebar/40 border-2 border-white/5 rounded-[4rem] p-10 lg:p-20 shadow-3xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none group-hover:scale-125 transition-transform duration-1000">
           <HelpCircle className="w-[150px] h-[150px] text-white" />
        </div>
        
        <div className="question-header mb-16 relative z-10 pr-24">
           <h2 className="text-3xl lg:text-5xl font-black text-white leading-tight italic tracking-tighter drop-shadow-xl">{currentQuestion.text}</h2>
        </div>

        <div className="options-grid grid gap-5 relative z-10">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOptions[currentQuestion.id] === option;
            return (
              <div 
                key={idx} 
                className={`flex items-center gap-8 p-8 rounded-[2rem] border-2 transition-all cursor-pointer group/opt relative overflow-hidden h-24 ${isSelected ? 'bg-brand-primary border-brand-primary shadow-[0_20px_40px_rgba(248,152,32,0.3)] scale-[1.02]' : 'bg-white/1 border-white/5 hover:border-white/10 hover:bg-white/2'}`}
                onClick={() => handleOptionSelect(currentQuestion.id, option)}
              >
                <div className={`absolute inset-0 bg-white/5 opacity-0 group-hover/opt:opacity-100 transition-opacity pointer-events-none`} />
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black italic text-sm transition-all border-2 ${isSelected ? 'bg-white/20 border-white/40 text-white' : 'bg-white/5 border-white/10 text-slate-800 group-hover/opt:border-white/20'}`}>
                   {String.fromCharCode(65 + idx)}
                </div>
                <p className={`flex-1 font-bold italic tracking-tight text-lg transition-colors ${isSelected ? 'text-white' : 'text-slate-500 group-hover/opt:text-slate-300'}`}>{option}</p>
                <div className={`transition-all duration-500 ${isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                  <CheckCircle2 className="w-[32px] h-[32px] text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="quiz-footer pt-16 border-t-2 border-white/5 mt-16 flex flex-col sm:flex-row justify-between items-center gap-10 relative z-10">
          <button 
            className="w-full sm:w-auto px-10 py-5 bg-white/2 border-2 border-white/5 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.4em] text-slate-800 hover:text-white hover:border-white/10 disabled:opacity-20 transition-all italic active:scale-95 shadow-xl" 
            onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
            disabled={currentQuestionIndex === 0}
          >
            Reverse Vector
          </button>
          
          {isLastQuestion ? (
            <PrimaryButton className="w-full sm:w-auto h-20 px-16 text-xs font-black uppercase tracking-[0.3em] italic rounded-[2rem] shadow-2xl shadow-brand-primary/40 active:scale-95 transition-all" onClick={handleSubmit}>
              Transmit Sequence
            </PrimaryButton>
          ) : (
            <button 
              className={`w-full sm:w-auto h-20 px-12 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.4em] italic flex items-center justify-center gap-4 group transition-all active:scale-95 shadow-2xl ${selectedOptions[currentQuestion.id] ? 'bg-white/10 text-white border-2 border-white/20 hover:bg-brand-primary hover:border-brand-primary hover:shadow-brand-primary/20' : 'bg-white/2 text-slate-900 border-2 border-white/5 cursor-not-allowed opacity-40'}`} 
              onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
              disabled={!selectedOptions[currentQuestion.id]}
            >
              Next Segment
              <ChevronRight className="w-[24px] h-[24px] group-hover:translate-x-2 transition-transform" />
            </button>
          )}
        </div>
      </Card>

      {/* Decorative Branding */}
      <div className="fixed bottom-0 left-0 p-12 opacity-5 pointer-events-none select-none">
         <Target className="w-[400px] h-[400px] text-white" />
      </div>
      <div className="fixed top-24 right-0 p-20 opacity-5 pointer-events-none select-none">
         <Activity className="w-[300px] h-[300px] text-white rotate-45" />
      </div>
    </div>
  );
};

export default Quiz;
