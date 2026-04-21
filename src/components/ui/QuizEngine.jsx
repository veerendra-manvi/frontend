import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  RotateCcw, 
  Trophy, 
  Zap,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { Card, Badge, PrimaryButton, SecondaryButton, ProgressBar } from './index';
import useProgressStore from '../../store/useProgressStore';

const QuizEngine = ({ quizId, questions = [], onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [results, setResults] = useState({}); 
  const [activeQuestionSet, setActiveQuestionSet] = useState(questions);
  const [isFinished, setIsFinished] = useState(false);
  const [isRetryingIncorrect, setIsRetryingIncorrect] = useState(false);

  const storageKey = `quiz-progress-${quizId}`;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const data = JSON.parse(saved);
      if (data.isFinished && !isRetryingIncorrect) {
        setIsFinished(true);
        setResults(data.results || {});
      }
    }
  }, [quizId, storageKey, isRetryingIncorrect]);

  const saveProgress = (finalResults, finished = false) => {
    localStorage.setItem(storageKey, JSON.stringify({
      results: finalResults,
      isFinished: finished,
      timestamp: new Date().getTime()
    }));
  };

  const currentQuestion = activeQuestionSet[currentIndex];

  const handleSelect = (index) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const saveQuizScore = useProgressStore((state) => state.saveQuizScore);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const newResults = { ...results, [currentQuestion.id]: isCorrect };
    
    setResults(newResults);
    setShowFeedback(true);
    saveProgress(newResults, false);
  };

  const handleNext = () => {
    if (currentIndex < activeQuestionSet.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
      const correctCount = Object.values(results).filter(Boolean).length;
      saveQuizScore(quizId, correctCount, questions.length);
      saveProgress(results, true);
      if (onComplete) {
        onComplete({ score: correctCount, total: questions.length, results });
      }
    }
  };

  const handleFullRetry = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setResults({});
    setIsFinished(false);
    setActiveQuestionSet(questions);
    setIsRetryingIncorrect(false);
    localStorage.removeItem(storageKey);
  };

  const handleRetryIncorrect = () => {
    const incorrectQuestions = questions.filter(q => !results[q.id]);
    if (incorrectQuestions.length > 0) {
      setActiveQuestionSet(incorrectQuestions);
      setCurrentIndex(0);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setIsFinished(false);
      setIsRetryingIncorrect(true);
    }
  };

  if (isFinished) {
    const correctCount = Object.values(results).filter(Boolean).length;
    const percentage = Math.round((correctCount / questions.length) * 100);
    const xpEarned = correctCount * 50;

    return (
      <Card className="text-center py-12 px-8 bg-gradient-to-br from-[#12151e] to-transparent border-brand-primary/20 animate-in zoom-in-95 duration-500 rounded-[3rem]">
         <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-brand-primary/20 blur-2xl rounded-full animate-pulse" />
            <div className="relative bg-brand-primary/10 border-2 border-brand-primary/50 w-full h-full rounded-3xl flex items-center justify-center">
               <Trophy className="w-[40px] h-[40px] text-brand-primary" />
            </div>
         </div>
         
         <h2 className="text-4xl font-black text-white mb-2 italic tracking-tighter">Quiz Results</h2>
         <p className="text-slate-500 mb-10 font-medium italic">Topic Mastery: {percentage}%</p>

         <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
               <span className="text-[10px] font-black uppercase text-slate-600 tracking-widest block mb-2 italic">Accuracy</span>
               <h4 className="text-3xl font-black text-emerald-500 tabular-nums">{correctCount}<span className="text-slate-500 text-lg">/{questions.length}</span></h4>
            </div>
            <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
               <span className="text-[10px] font-black uppercase text-slate-600 tracking-widest block mb-2 italic">XP Earned</span>
               <h4 className="text-3xl font-black text-brand-primary flex items-center justify-center gap-1 tabular-nums">
                  <Zap className="w-[20px] h-[20px]" fill="currentColor" /> {xpEarned}
               </h4>
            </div>
         </div>

         <div className="space-y-4">
            <PrimaryButton onClick={handleFullRetry} className="w-full py-5 font-black uppercase tracking-widest text-xs shadow-xl shadow-brand-primary/20">
               <RotateCcw className="w-[16px] h-[16px]" /> Full Retake
            </PrimaryButton>
            {correctCount < questions.length && (
              <SecondaryButton onClick={handleRetryIncorrect} className="w-full py-5 border-brand-secondary/30 text-brand-secondary font-black uppercase tracking-widest text-xs">
                 <AlertCircle className="w-[16px] h-[16px]" /> Retry Incorrect Only
              </SecondaryButton>
            )}
         </div>
      </Card>
    );
  }

  return (
    <Card className="p-0 border-white/5 bg-[#0b0d12] overflow-hidden shadow-2xl rounded-[3rem]">
      <div className="bg-white/5 px-8 py-5 border-b border-white/5 flex justify-between items-center">
         <div className="flex items-center gap-4">
            <div className="p-2 bg-brand-primary/10 rounded-xl text-brand-primary border border-brand-primary/20">
               <HelpCircle className="w-[18px] h-[18px]" />
            </div>
            <div>
               <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] italic">Quiz Protocol</h4>
               <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Question {currentIndex + 1} of {activeQuestionSet.length}</p>
            </div>
         </div>
         {isRetryingIncorrect && <Badge variant="secondary" className="animate-pulse italic">Correction Mode</Badge>}
      </div>
      <ProgressBar progress={((currentIndex + 1) / activeQuestionSet.length) * 100} showLabel={false} height="h-1.5" />

      <div className="p-8 md:p-12">
         <AnimatePresence mode="wait">
            <motion.div 
              key={`${isRetryingIncorrect ? 'retry' : 'full'}-${currentIndex}`}
              initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}
              className="space-y-10"
            >
               <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight italic">
                  {currentQuestion.question}
               </h3>

               <div className="grid grid-cols-1 gap-4">
                  {currentQuestion.options.map((option, i) => {
                    const isSelected = selectedAnswer === i;
                    const isCorrect = i === currentQuestion.correctAnswer;
                    
                    let styles = "bg-white/2 border-white/5 text-slate-400 hover:border-white/10 hover:bg-white/4";
                    if (isSelected) styles = "bg-brand-primary/10 border-brand-primary text-brand-primary shadow-[0_0_20px_rgba(248,152,32,0.1)]";
                    if (showFeedback) {
                       if (isCorrect) styles = "bg-emerald-500/10 border-emerald-500 text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.1)]";
                       else if (isSelected) styles = "bg-rose-500/10 border-rose-500 text-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.1)]";
                    }

                    return (
                      <button 
                        key={i} 
                        onClick={() => handleSelect(i)}
                        className={`p-6 rounded-[1.5rem] border-2 text-left font-bold transition-all flex items-center justify-between group ${styles}`}
                      >
                         <span className="pr-4 italic">{option}</span>
                         <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${isSelected ? 'bg-current border-current' : 'border-white/10 group-hover:border-white/20'}`}>
                            {showFeedback && isCorrect && <CheckCircle2 className="w-[14px] h-[14px] text-dark-bg" />}
                            {showFeedback && isSelected && !isCorrect && <XCircle className="w-[14px] h-[14px] text-dark-bg" />}
                         </div>
                      </button>
                    );
                  })}
               </div>
            </motion.div>
         </AnimatePresence>

         <div className="mt-12 flex flex-col md:flex-row gap-6 pt-10 border-t border-white/5 relative">
            <AnimatePresence>
               {showFeedback ? (
                 <motion.div 
                   initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                   className="flex-1 space-y-6"
                 >
                    <div className="flex gap-4 p-6 bg-white/3 rounded-3xl border border-white/10 relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-4 opacity-5"><Brain className="w-[64px] h-[64px]" /></div>
                       <div className="p-2.5 bg-brand-primary/10 rounded-xl h-fit text-brand-primary border border-brand-primary/20"><AlertCircle className="w-[18px] h-[18px]" /></div>
                       <div>
                          <p className="text-[10px] font-black uppercase text-brand-primary tracking-widest mb-2 italic">Neural Insight</p>
                          <p className="text-sm text-slate-400 font-medium leading-relaxed italic">{currentQuestion.explanation}</p>
                       </div>
                    </div>
                    <PrimaryButton onClick={handleNext} className="w-full md:w-auto px-12 py-4 shadow-xl shadow-brand-primary/20">
                       <span className="flex items-center gap-2">
                          {currentIndex === activeQuestionSet.length - 1 ? 'Evaluate System' : 'Next Tactical'} <ChevronRight className="w-[18px] h-[18px]" />
                       </span>
                    </PrimaryButton>
                 </motion.div>
               ) : (
                 <div className="flex-1 flex justify-end">
                    <PrimaryButton 
                      disabled={selectedAnswer === null}
                      onClick={handleSubmit} 
                      className="w-full md:w-auto px-12 py-4 font-black uppercase tracking-widest text-xs shadow-xl shadow-brand-primary/20"
                    >
                       Analyze Vector
                    </PrimaryButton>
                 </div>
               )}
            </AnimatePresence>
         </div>
      </div>
    </Card>
  );
};

export default QuizEngine;
