import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Bookmark, PlayCircle, Trash2, Library, Zap } from 'lucide-react';
import { Badge } from '../components/ui';

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

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
       <div className="w-16 h-16 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" />
       <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.3em] italic animate-pulse">Accessing Encrypted Data...</p>
    </div>
  );

  return (
    <div className="bookmarks fade-in p-6 lg:p-12 max-w-7xl mx-auto pb-20">
      <header className="mb-20 space-y-6">
        <div className="flex items-center gap-4">
           <div className="px-6 py-1.5 bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-[0.3em] w-fit rounded-full border border-brand-primary/20 italic">
              Reference Library
           </div>
           <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>
        <h1 className="text-5xl md:text-8xl font-black text-white italic tracking-tighter leading-none">Your Bookmarks</h1>
        <p className="text-slate-400 font-bold italic max-w-3xl leading-relaxed">
           Initialize high-priority study vectors. Return to tagged modules for <span className="text-white underline decoration-brand-primary decoration-4 underline-offset-8">Deep System Analysis</span> and architectural mastery.
        </p>
      </header>

      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-24 bg-white/2 border border-white/5 rounded-[4rem] text-center space-y-12 animate-in fade-in zoom-in duration-700 relative overflow-hidden shadow-2xl">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(248,152,32,0.05)_0%,transparent_70%)] pointer-events-none" />
           <div className="w-32 h-32 rounded-[2.5rem] bg-white/5 flex items-center justify-center text-slate-700 relative group overflow-hidden border border-white/10 shadow-2xl transition-transform hover:scale-105 duration-700">
              <Bookmark className="w-[56px] h-[56px] relative z-10 group-hover:scale-110 group-hover:text-brand-primary transition-all duration-700" />
              <div className="absolute inset-0 bg-brand-primary/10 blur-[40px] rounded-full scale-150 opacity-20 group-hover:opacity-60 transition-opacity" />
           </div>
           <div className="space-y-4 relative z-10">
              <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">Library Silent</h2>
              <p className="text-slate-500 font-bold italic max-w-sm mx-auto uppercase tracking-widest text-[10px]">Start tagging challenging clusters to build your personalized study deck.</p>
           </div>
           <Link to="/categories" className="px-12 py-5 bg-brand-primary text-white rounded-[2rem] font-black uppercase tracking-[0.2em] italic hover:scale-110 active:scale-95 transition-all shadow-2xl shadow-brand-primary/30 relative z-10 text-xs">
              Explore Neural Clusters
           </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookmarks.map((topic) => (
            <div key={topic.id} className="relative group overflow-hidden bg-white/2 border border-white/5 rounded-[3rem] p-10 transition-all duration-500 hover:bg-white/5 hover:border-brand-primary/30 hover:-translate-y-3 shadow-2xl flex flex-col h-full">
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform pointer-events-none">
                 <Bookmark className="w-[100px] h-[100px] text-brand-primary" />
              </div>
              
              <div className="flex justify-between items-start mb-10 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 bg-brand-primary/10 rounded-2xl text-brand-primary border border-brand-primary/20 shadow-xl shadow-brand-primary/5 group-hover:bg-brand-primary group-hover:text-white group-hover:rotate-6 transition-all duration-500">
                     <Bookmark className="w-[20px] h-[20px]" />
                  </div>
                  <h3 className="text-2xl font-black text-white italic tracking-tight group-hover:text-brand-primary transition-colors leading-none">{topic.title}</h3>
                </div>
                <button 
                  className="p-3 bg-white/5 rounded-2xl text-slate-700 hover:text-rose-500 hover:bg-rose-500/10 transition-all border border-transparent hover:border-rose-500/20 active:scale-90" 
                  onClick={() => removeBookmark(topic.id)}
                  title="Deprioritize"
                >
                  <Trash2 className="w-[20px] h-[20px]" />
                </button>
              </div>
              
              <p className="text-[13px] text-slate-500 font-medium italic leading-relaxed mb-12 flex-1 group-hover:text-slate-400 transition-colors">
                {topic.description || 'Saved for high-priority architectural analysis.'}
              </p>

              <div className="pt-8 border-t border-white/5 relative z-10">
                <Link to={`/lessons/${topic.id}`} className="flex items-center justify-between group/btn text-brand-primary font-black uppercase tracking-[0.2em] text-[10px] italic hover:gap-5 transition-all w-fit">
                  <span className="flex items-center gap-3">Resume Execution <PlayCircle className="w-[18px] h-[18px]" /></span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Decorative Elements */}
      <div className="fixed bottom-0 right-0 p-12 opacity-5 pointer-events-none select-none">
         <Library className="w-[300px] h-[300px] text-white" />
      </div>
      <div className="fixed top-20 left-1/2 -translate-x-1/2 p-20 opacity-[0.02] pointer-events-none select-none">
         <Zap className="w-[600px] h-[600px] text-white" />
      </div>
    </div>
  );
};

export default Bookmarks;
