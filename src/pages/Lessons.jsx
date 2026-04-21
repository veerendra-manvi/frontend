import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { ChevronLeft, ChevronRight, CheckCircle, Code as CodeIcon, HelpCircle, Book } from 'lucide-react';

const Lessons = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await api.get(`/learning/lessons/topic/${topicId}`);
        setLessons(response.data);
      } catch (error) {
        console.error('Failed to fetch lessons', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLessons();
  }, [topicId]);

  if (isLoading) return <div className="loading-spinner">Loading lessons...</div>;
  
  if (lessons.length === 0) return (
    <div className="no-content">
      <HelpCircle size={48} />
      <h2>No lessons found for this topic.</h2>
      <Link to="/categories" className="back-btn">Back to Categories</Link>
    </div>
  );

  const currentLesson = lessons[currentLessonIndex];
  const isLastLesson = currentLessonIndex === lessons.length - 1;

  const nextLesson = () => {
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
    <div className="lesson-viewer fade-in">
      <div className="lesson-layout">
        <aside className="lesson-sidebar">
          <h3>Topic Lessons</h3>
          <ul className="lesson-list">
            {lessons.map((lesson, index) => (
              <li 
                key={lesson.id} 
                className={`lesson-item ${index === currentLessonIndex ? 'active' : ''} ${index < currentLessonIndex ? 'completed' : ''}`}
                onClick={() => setCurrentLessonIndex(index)}
              >
                <div className="lesson-indicator">
                  {index < currentLessonIndex ? <CheckCircle size={14} /> : <span>{index + 1}</span>}
                </div>
                <span className="lesson-title">{lesson.title}</span>
              </li>
            ))}
          </ul>
          
          <div className="sidebar-quiz-box">
             <HelpCircle size={32} />
             <p>Ready to test your knowledge?</p>
             <Link to={`/quiz/${topicId}`} className="sidebar-quiz-btn">Take Quiz</Link>
          </div>
        </aside>

        <main className="lesson-main">
          <div className="glass-card lesson-content">
            <header className="lesson-header">
              <div className="lesson-badge">Lesson {currentLessonIndex + 1} of {lessons.length}</div>
              <h1>{currentLesson.title}</h1>
            </header>

            <section className="theory-section">
              <div className="theory-content" dangerouslySetInnerHTML={{ __html: currentLesson.content }}></div>
            </section>

            {currentLesson.codeSnippet && (
              <section className="code-section">
                <div className="code-header">
                  <CodeIcon size={16} />
                  <span>Code Example</span>
                </div>
                <pre>
                  <code>{currentLesson.codeSnippet}</code>
                </pre>
              </section>
            )}

            <div className="lesson-nav-buttons">
              <button 
                className="nav-btn prev" 
                onClick={prevLesson} 
                disabled={currentLessonIndex === 0}
              >
                <ChevronLeft size={20} />
                <span>Previous</span>
              </button>
              
              <button className="nav-btn next" onClick={nextLesson}>
                <span>{isLastLesson ? 'Take Quiz' : 'Next Lesson'}</span>
                {isLastLesson ? <HelpCircle size={20} /> : <ChevronRight size={20} />}
              </button>
            </div>
          </div>
        </main>
      </div>

      <style>{`
        .lesson-layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 32px;
          align-items: start;
        }
        
        .lesson-sidebar {
          position: sticky;
          top: 100px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius);
          padding: 24px;
        }
        
        .lesson-sidebar h3 {
          font-size: 16px;
          margin-bottom: 20px;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .lesson-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 32px;
        }
        
        .lesson-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px;
          border-radius: 8px;
          cursor: pointer;
          transition: var(--transition);
        }
        
        .lesson-item:hover {
          background: rgba(255, 255, 255, 0.03);
        }
        
        .lesson-item.active {
          background: rgba(248, 152, 32, 0.08);
          color: var(--primary);
        }
        
        .lesson-indicator {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          color: var(--text-secondary);
        }
        
        .lesson-item.active .lesson-indicator {
          border-color: var(--primary);
          color: var(--primary);
        }
        
        .lesson-item.completed .lesson-indicator {
          background: #22c55e;
          border-color: #22c55e;
          color: white;
        }
        
        .lesson-title {
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .sidebar-quiz-box {
          background: rgba(83, 130, 161, 0.1);
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          border: 1px solid rgba(83, 130, 161, 0.2);
        }
        
        .sidebar-quiz-box p {
          font-size: 13px;
          margin: 12px 0 16px;
          color: var(--text-secondary);
        }
        
        .sidebar-quiz-btn {
          display: block;
          background: var(--secondary);
          color: white;
          padding: 8px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
        }
        
        .lesson-main {
          min-height: 500px;
        }
        
        .lesson-content {
          padding: 40px;
        }
        
        .lesson-badge {
          display: inline-block;
          background: rgba(248, 152, 32, 0.1);
          color: var(--primary);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 16px;
        }
        
        .lesson-header h1 {
          font-size: 32px;
          margin-bottom: 32px;
        }
        
        .theory-section {
          font-size: 16px;
          line-height: 1.8;
          color: #d1d5db;
          margin-bottom: 40px;
        }
        
        .theory-content p { margin-bottom: 20px; }
        
        .code-section {
          margin-bottom: 40px;
        }
        
        .code-header {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #161b22;
          padding: 10px 16px;
          border-radius: 8px 8px 0 0;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
          border: 1px solid var(--border-color);
          border-bottom: none;
        }
        
        .code-section pre {
          border-radius: 0 0 8px 8px;
          margin: 0;
        }
        
        .lesson-nav-buttons {
          display: flex;
          justify-content: space-between;
          padding-top: 32px;
          border-top: 1px solid var(--border-color);
        }
        
        .nav-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          border-radius: 10px;
          font-weight: 700;
          background: var(--bg-dark);
          color: white;
          border: 1px solid var(--border-color);
          transition: var(--transition);
        }
        
        .nav-btn:hover:not(:disabled) {
          border-color: var(--primary);
          color: var(--primary);
        }
        
        .nav-btn.next {
          background: var(--primary);
          border-color: var(--primary);
          color: white;
        }
        
        .nav-btn.next:hover {
          background: var(--primary-hover);
        }
        
        .nav-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 1024px) {
          .lesson-layout {
            grid-template-columns: 1fr;
          }
          .lesson-sidebar {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Lessons;
