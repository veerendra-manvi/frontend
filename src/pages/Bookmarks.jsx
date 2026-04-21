import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Bookmark, PlayCircle, Trash2 } from 'lucide-react';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const response = await api.get('/bookmarks/me');
      setBookmarks(response.data);
    } catch (error) {
      console.error('Failed to fetch bookmarks', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeBookmark = async (topicId) => {
    try {
      await api.delete(`/bookmarks/${topicId}`);
      setBookmarks(bookmarks.filter(b => b.id !== topicId));
    } catch (error) {
      console.error('Failed to remove bookmark', error);
    }
  };

  if (isLoading) return <div className="loading-spinner">Loading bookmarks...</div>;

  return (
    <div className="bookmarks fade-in">
      <header className="page-header">
        <h1>Your Bookmarks</h1>
        <p>Return to the topics you want to master.</p>
      </header>

      {bookmarks.length === 0 ? (
        <div className="no-content glass-card">
           <Bookmark size={48} className="text-secondary" style={{ opacity: 0.2 }} />
           <h2>No bookmarked topics yet.</h2>
           <p>Topics you bookmark will appear here for easy access.</p>
           <Link to="/categories" className="start-btn" style={{ maxWidth: '200px', margin: '24px auto' }}>
             Browse Topics
           </Link>
        </div>
      ) : (
        <div className="topics-grid">
          {bookmarks.map((topic) => (
            <div key={topic.id} className="glass-card topic-card">
              <div className="topic-header">
                <div className="topic-title-wrapper">
                  <Bookmark className="primary-color" size={16} />
                  <h3>{topic.title}</h3>
                </div>
                <button 
                  className="remove-btn" 
                  onClick={() => removeBookmark(topic.id)}
                  title="Remove from bookmarks"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              
              <p className="topic-desc">{topic.description || 'Saved for later learning.'}</p>

              <div className="topic-footer">
                <Link to={`/lessons/${topic.id}`} className="start-btn">
                  <span>Continue Learning</span>
                  <PlayCircle size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .topic-title-wrapper { display: flex; align-items: center; gap: 10px; }
        .remove-btn { background: transparent; color: #ef4444; opacity: 0.6; transition: var(--transition); padding: 8px; border-radius: 8px; }
        .remove-btn:hover { background: rgba(239, 68, 68, 0.1); opacity: 1; }
        .topic-desc { font-size: 14px; color: var(--text-secondary); margin-bottom: 24px; min-height: 40px; }
        .no-content { text-align: center; padding: 60px; }
        .no-content h2 { margin: 20px 0 10px; }
      `}</style>
    </div>
  );
};

export default Bookmarks;
