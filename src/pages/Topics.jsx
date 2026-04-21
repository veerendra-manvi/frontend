import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import Breadcrumb from '../components/Breadcrumb';
import { BookOpen, Bookmark, ChevronLeft, PlayCircle, Star, Clock, Trophy } from 'lucide-react';

const Topics = () => {
  const { categoryId } = useParams();
  const [topics, setTopics] = useState([]);
  const [categoryName, setCategoryName] = useState('Category');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch topics
        const topicsRes = await api.get(`/learning/topics/category/${categoryId}`);
        setTopics(topicsRes.data);

        // Fetch categories to find the name of the current one
        const catsRes = await api.get('/learning/categories');
        const currentCat = catsRes.data.find(c => c.id.toString() === categoryId);
        if (currentCat) setCategoryName(currentCat.name);
      } catch (error) {
        console.error('Failed to fetch topics data', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [categoryId]);

  const handleBookmark = async (e, topicId) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await api.post(`/bookmarks/${topicId}`);
      // In a real app, I'd update the local state to show it's bookmarked
      alert('Topic added to your bookmarks!');
    } catch (error) {
      console.error('Failed to bookmark', error);
    }
  };

  const getDifficultyColor = (difficulty) => {
    const diff = (difficulty || 'Beginner').toLowerCase();
    if (diff === 'advanced') return '#ef4444';
    if (diff === 'intermediate') return '#f89820';
    return '#22c55e';
  };

  if (isLoading) return <div className="loading-spinner">Loading topics...</div>;

  return (
    <div className="topics fade-in">
      <Breadcrumb 
        items={[
          { label: 'Categories', path: '/categories' },
          { label: categoryName }
        ]} 
      />

      <header className="page-header">
        <div className="title-section">
          <span className="badge">{categoryName}</span>
          <h1>Available Topics</h1>
          <p>Curated list of modules for {categoryName}. Pick one to start your session.</p>
        </div>
      </header>

      <div className="topics-grid">
        {topics.length === 0 ? (
          <div className="no-content glass-card">
            <BookOpen size={48} className="text-secondary" style={{ opacity: 0.1 }} />
            <h3>No topics available yet.</h3>
            <p>Check back later for new content in this category.</p>
            <Link to="/categories" className="back-btn">Back to Categories</Link>
          </div>
        ) : (
          topics.map((topic) => (
            <div key={topic.id} className="glass-card topic-card">
              <div className="topic-card-header">
                <div 
                  className="difficulty-badge" 
                  style={{ borderColor: getDifficultyColor(topic.difficulty), color: getDifficultyColor(topic.difficulty) }}
                >
                  {topic.difficulty || 'Beginner'}
                </div>
                <button 
                  className="bookmark-icon-btn" 
                  onClick={(e) => handleBookmark(e, topic.id)}
                >
                  <Bookmark size={18} />
                </button>
              </div>
              
              <div className="topic-card-body">
                <h3>{topic.title}</h3>
                <p>{topic.description || 'Master the concepts with interactive lessons and real-world examples.'}</p>
              </div>

              <div className="topic-card-footer">
                <div className="topic-stats">
                  <div className="stat">
                    <Clock size={14} />
                    <span>45m</span>
                  </div>
                  <div className="stat">
                    <Trophy size={14} />
                    <span>100 XP</span>
                  </div>
                </div>
                <Link to={`/lessons/${topic.id}`} className="learn-btn">
                  <span>Start Learning</span>
                  <PlayCircle size={18} />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`
        .page-header { margin-bottom: 40px; }
        .page-header h1 { font-size: 32px; font-weight: 800; margin: 8px 0; }
        .page-header p { color: var(--text-secondary); max-width: 600px; }

        .topics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }

        .topic-card {
          padding: 28px;
          display: flex;
          flex-direction: column;
          height: 100%;
          border: 1px solid var(--border-color);
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, transparent 100%);
        }

        .topic-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .difficulty-badge {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          padding: 3px 10px;
          border: 1px solid;
          border-radius: 6px;
          letter-spacing: 0.5px;
        }

        .bookmark-icon-btn {
          background: transparent;
          color: var(--text-secondary);
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
        }

        .bookmark-icon-btn:hover {
          color: var(--primary);
          background: rgba(248, 152, 32, 0.1);
        }

        .topic-card-body { flex: 1; margin-bottom: 24px; }
        .topic-card-body h3 { font-size: 20px; font-weight: 700; margin-bottom: 10px; }
        .topic-card-body p { font-size: 14px; color: var(--text-secondary); line-height: 1.6; }

        .topic-card-footer {
          border-top: 1px solid var(--border-color);
          padding-top: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .topic-stats { display: flex; gap: 16px; }
        .stat { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--text-secondary); font-weight: 500; }

        .learn-btn {
          background: var(--primary);
          color: white;
          padding: 10px 18px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: var(--transition);
        }

        .learn-btn:hover {
          background: var(--primary-hover);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(248, 152, 32, 0.3);
        }

        .no-content { text-align: center; padding: 60px; }
        .back-btn { display: inline-block; margin-top: 20px; color: var(--primary); font-weight: 600; }
      `}</style>
    </div>
  );
};

export default Topics;
