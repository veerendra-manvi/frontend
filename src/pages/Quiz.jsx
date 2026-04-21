import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { CheckCircle2, ChevronRight, HelpCircle, RefreshCcw, Trophy } from 'lucide-react';

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
      alert('Please answer all questions!');
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

  if (isLoading) return <div className="loading-spinner">Loading quiz...</div>;
  if (questions.length === 0) return <div>No quiz available for this topic.</div>;

  if (isSubmitted) {
    return (
      <div className="quiz-result fade-in">
        <div className="glass-card result-card">
          <Trophy size={64} className="primary-color result-icon" />
          <h1>Quiz Completed!</h1>
          <div className="score-display">
            <span className="score-num">{score}</span>
            <span className="score-total">/ {questions.length * 10}</span>
          </div>
          <p>Great job! You have successfully completed the assessment for this topic.</p>
          <div className="result-actions">
            <button className="action-btn primary" onClick={() => navigate('/categories')}>
              Explore More Topics
            </button>
            <button className="action-btn secondary" onClick={() => window.location.reload()}>
              <RefreshCcw size={18} />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="quiz-container fade-in">
      <header className="page-header">
         <div className="quiz-progress">
           <div className="progress-info">
             <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
             <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete</span>
           </div>
           <div className="progress-track">
             <div 
               className="progress-fill" 
               style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
             ></div>
           </div>
         </div>
      </header>

      <div className="glass-card quiz-card">
        <div className="question-header">
           <HelpCircle className="question-icon" />
           <h2>{currentQuestion.text}</h2>
        </div>

        <div className="options-grid">
          {currentQuestion.options.map((option, idx) => (
            <div 
              key={idx} 
              className={`option-card ${selectedOptions[currentQuestion.id] === option ? 'selected' : ''}`}
              onClick={() => handleOptionSelect(currentQuestion.id, option)}
            >
              <div className="option-letter">{String.fromCharCode(65 + idx)}</div>
              <p>{option}</p>
              <div className="option-check">
                <CheckCircle2 size={20} />
              </div>
            </div>
          ))}
        </div>

        <div className="quiz-footer">
          <button 
            className="quiz-nav-btn prev" 
            onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          
          {isLastQuestion ? (
            <button className="quiz-submit-btn" onClick={handleSubmit}>
              Submit Quiz
            </button>
          ) : (
            <button 
              className="quiz-nav-btn next" 
              onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
              disabled={!selectedOptions[currentQuestion.id]}
            >
              Next Question
              <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>

      <style>{`
        .quiz-container { max-width: 800px; margin: 0 auto; }
        
        .quiz-progress { margin-bottom: 40px; }
        
        .progress-info {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 12px;
        }
        
        .progress-track {
          height: 8px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          background: var(--primary);
          transition: width 0.3s ease;
        }
        
        .quiz-card { padding: 40px; }
        
        .question-header {
          display: flex;
          gap: 20px;
          margin-bottom: 40px;
        }
        
        .question-icon { color: var(--primary); flex-shrink: 0; margin-top: 5px; }
        
        .question-header h2 { font-size: 22px; line-height: 1.4; }
        
        .options-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 40px;
        }
        
        .option-card {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          cursor: pointer;
          transition: var(--transition);
        }
        
        .option-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(248, 152, 32, 0.3);
        }
        
        .option-card.selected {
          border-color: var(--primary);
          background: rgba(248, 152, 32, 0.1);
        }
        
        .option-letter {
          width: 32px;
          height: 32px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: var(--text-secondary);
        }
        
        .option-card.selected .option-letter {
          background: var(--primary);
          color: white;
        }
        
        .option-card p { flex: 1; font-weight: 500; font-size: 15px; }
        
        .option-check { color: var(--primary); opacity: 0; transition: var(--transition); }
        
        .option-card.selected .option-check { opacity: 1; }
        
        .quiz-footer {
          display: flex;
          justify-content: space-between;
          padding-top: 32px;
          border-top: 1px solid var(--border-color);
        }
        
        .quiz-nav-btn, .quiz-submit-btn {
          padding: 12px 24px;
          border-radius: 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: var(--transition);
        }
        
        .quiz-nav-btn { background: transparent; color: var(--text-secondary); border: 1px solid var(--border-color); }
        .quiz-nav-btn:hover:not(:disabled) { color: var(--primary); border-color: var(--primary); }
        
        .quiz-submit-btn { background: var(--primary); color: white; }
        .quiz-submit-btn:hover { background: var(--primary-hover); transform: translateY(-2px); }
        
        /* Results Styling */
        .result-card { text-align: center; padding: 60px; max-width: 600px; margin: 40px auto; }
        .result-icon { margin-bottom: 24px; }
        .score-display { margin: 24px 0; }
        .score-num { font-size: 64px; font-weight: 800; color: var(--primary); }
        .score-total { font-size: 24px; color: var(--text-secondary); font-weight: 600; }
        .result-actions { display: flex; gap: 16px; justify-content: center; margin-top: 40px; }
        .action-btn { padding: 14px 28px; border-radius: 12px; font-weight: 700; display: flex; align-items: center; gap: 8px; }
        .action-btn.primary { background: var(--primary); color: white; }
        .action-btn.secondary { background: var(--glass-bg); color: var(--text-primary); border: 1px solid var(--border-color); }
      `}</style>
    </div>
  );
};

export default Quiz;
