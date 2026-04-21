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
      const response = await api.get('/api/bookmarks/me');
      setBookmarks(response.data);
    } catch (error) {
      console.error('Failed to fetch bookmarks', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeBookmark = async (topicId) => {
    try {
      await api.delete(`/api/bookmarks/${topicId}`);
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
        <div className="flex flex-col items-center justify-center p-20 bg-dark-sidebar/40 border border-white/5 rounded-[3rem] text-center space-y-8 animate-in fade-in zoom-in duration-500">
           <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center text-slate-700 relative">
              <Bookmark size={48} className="relative z-10" />
              <div className="absolute inset-0 bg-brand-primary/10 blur-2xl rounded-full scale-150 opacity-50" />
           </div>
           <div className="space-y-2">
              <h2 className="text-3xl font-black text-white italic">Your library is silent.</h2>
              <p className="text-slate-500 font-medium max-w-sm">Start bookmarking challenging topics to build your personalized study deck and master Java faster.</p>
           </div>
           <Link to="/categories" className="px-10 py-4 bg-brand-primary text-white rounded-2xl font-black uppercase tracking-widest hover:scale-110 active:scale-95 transition-all shadow-xl shadow-brand-primary/20">
             Explore Chapters
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
