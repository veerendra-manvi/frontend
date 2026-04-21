import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  RotateCcw, 
  Trophy, 
  HelpCircle,
  BarChart3
} from 'lucide-react';
import { Card, Badge, PrimaryButton, SecondaryButton, ProgressBar } from './index';

const QuizCard = ({ questions = [], onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];
  
  const handleSelect = (index) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
      if (onComplete) onComplete(score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0));
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsFinished(false);
  };

  if (!questions || questions.length === 0) return null;

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <Card className="text-center py-12 px-8 max-w-lg mx-auto bg-gradient-to-br from-brand-primary/10 to-transparent animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_rgba(248,152,32,0.2)]">
          <Trophy size={48} className="text-brand-primary" />
        </div>
        <h2 className="text-3xl font-black text-white mb-2">Quiz Complete!</h2>
        <p className="text-slate-500 mb-8 font-medium">You've mastered the fundamentals here.</p>
        
        <div className="flex justify-between items-center bg-white/5 p-6 rounded-2xl mb-8 border border-white/5">
           <div className="text-left">
              <p className="text-[10px] font-black uppercase text-slate-600 tracking-widest mb-1">Final Score</p>
              <h3 className="text-4xl font-black text-white">{percentage}%</h3>
           </div>
           <div className="text-right">
              <p className="text-[10px] font-black uppercase text-slate-600 tracking-widest mb-1">Accuracy</p>
              <h3 className="text-2xl font-bold text-emerald-500">{score} / {questions.length}</h3>
           </div>
        </div>

        <div className="flex gap-4">
           <SecondaryButton onClick={handleRetry} className="flex-1 py-4">
              <RotateCcw size={18} /> Retry Quiz
           </SecondaryButton>
           <PrimaryButton className="flex-1 py-4" onClick={() => window.history.back()}>
              Continue Learning
           </PrimaryButton>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-0 border-white/5 bg-[#12151e] overflow-hidden shadow-2xl relative">
      {/* 1. Header & Progress */}
      <div className="bg-white/5 px-6 py-4 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-3">
           <HelpCircle size={18} className="text-brand-primary" />
           <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Question {currentIndex + 1} of {questions.length}</span>
        </div>
        <Badge variant="ghost" className="flex items-center gap-1.5">
           <BarChart3 size={12} /> Score: {score}
        </Badge>
      </div>
      <ProgressBar progress={((currentIndex + 1) / questions.length) * 100} showLabel={false} height="h-1" />

      {/* 2. Question Area */}
      <div className="p-8 md:p-12 space-y-10">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="space-y-8"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
               {currentQuestion.question}
            </h3>

            <div className="grid grid-cols-1 gap-4">
               {currentQuestion.options.map((option, i) => {
                 const isCorrect = i === currentQuestion.correctAnswer;
                 const isSelected = selectedAnswer === i;
                 
                 let variantClass = "bg-white/5 border-white/5 text-slate-400 hover:border-white/20";
                 if (isSelected) variantClass = "bg-brand-primary/10 border-brand-primary text-brand-primary";
                 if (showFeedback) {
                    if (isCorrect) variantClass = "bg-emerald-500/10 border-emerald-500 text-emerald-500";
                    if (isSelected && !isCorrect) variantClass = "bg-rose-500/10 border-rose-500 text-rose-500";
                    else if (isSelected && isCorrect) variantClass = "bg-emerald-500/10 border-emerald-500 text-emerald-500";
                 }

                 return (
                   <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className={`
                      relative p-5 md:p-6 rounded-2xl border-2 text-left font-semibold transition-all duration-200 flex items-center justify-between group
                      ${variantClass}
                    `}
                   >
                     <span className="pr-8">{option}</span>
                     <div className="flex gap-2">
                        {showFeedback && isCorrect && <CheckCircle2 size={24} className="text-emerald-500" />}
                        {showFeedback && isSelected && !isCorrect && <XCircle size={24} className="text-rose-500" />}
                        {!showFeedback && (
                          <div className={`w-6 h-6 rounded-full border-2 transition-all ${isSelected ? 'bg-brand-primary border-brand-primary scale-110' : 'border-white/10 group-hover:border-white/30'}`} />
                        )}
                     </div>
                   </button>
                 );
               })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 3. Feedback and Explanation */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mt-8 p-6 bg-white/5 rounded-2xl border-l-4 border-l-brand-primary overflow-hidden"
            >
               <div className="flex gap-4">
                  <div className="p-2 bg-brand-primary/10 rounded-lg h-fit">
                     <CheckCircle2 size={16} className="text-brand-primary" />
                  </div>
                  <div className="space-y-4">
                     <div>
                        <h4 className="text-white font-bold text-sm mb-1 uppercase tracking-widest">Why is this correct?</h4>
                        <p className="text-slate-400 text-sm leading-relaxed font-medium">
                           {currentQuestion.explanation}
                        </p>
                     </div>
                     <PrimaryButton onClick={handleNext} className="w-full sm:w-auto">
                        {currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                        <ChevronRight size={18} />
                     </PrimaryButton>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Submit Button (Only before feedback) */}
        {!showFeedback && (
          <div className="pt-4 flex justify-end">
             <PrimaryButton 
              disabled={selectedAnswer === null}
              onClick={handleSubmit}
              className="w-full md:w-auto px-12 py-4 shadow-xl shadow-brand-primary/20"
             >
                Submit Answer
             </PrimaryButton>
          </div>
        )}
      </div>
    </Card>
  );
};

export default QuizCard;
