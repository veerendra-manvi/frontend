import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import Breadcrumb from '../components/Breadcrumb';
import { Bookmark, PlayCircle, Clock, Trophy, Zap, Search } from 'lucide-react';
import { EmptyState } from '../components/ui/EmptyState';

const Topics = () => {
  const { categoryId } = useParams();
  const [topics, setTopics] = useState([]);
  const [categoryName, setCategoryName] = useState('Category');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topicsRes = await api.get(`/api/learning/topics/category/${categoryId}`);
        setTopics(topicsRes.data);

        const catsRes = await api.get('/api/learning/categories');
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
      await api.post(`/api/bookmarks/${topicId}`);
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

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
       <div className="w-16 h-16 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" />
       <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.3em] italic animate-pulse">Initializing Topic Archive...</p>
    </div>
  );

  return (
    <div className="topics fade-in p-6 lg:p-12 max-w-7xl mx-auto">
      <Breadcrumb 
        items={[
          { label: 'Categories', path: '/categories' },
          { label: categoryName }
        ]} 
      />

      <header className="mb-16 space-y-6">
        <div className="flex items-center gap-4">
           <div className="px-6 py-1.5 bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-[0.3em] w-fit rounded-full border border-brand-primary/20 italic">
              {categoryName}
           </div>
           <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter leading-none">Available Modules</h1>
        <p className="text-slate-400 font-bold italic max-w-3xl leading-relaxed">
           Explore the core architecture of <span className="text-brand-primary underline underline-offset-4 decoration-current">{categoryName}</span>. Select a knowledge vector to begin your mastery sequence.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {topics.length === 0 ? (
          <div className="col-span-full">
            <EmptyState 
              title="Tactical Void"
              message={`Our senior architects are currently documenting the ${categoryName} cluster. No accessible modules identified.`}
              iconId="book"
              actionLabel="Return to Central Categories"
              onAction={() => window.location.href = '/categories'}
            />
          </div>
        ) : (
          topics.map((topic) => (
            <div key={topic.id} className="relative group overflow-hidden bg-white/2 border border-white/5 rounded-[2.5rem] p-8 transition-all duration-500 hover:bg-white/5 hover:border-brand-primary/20 hover:-translate-y-2 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              <div className="flex justify-between items-center mb-10 relative z-10">
                <div 
                  className="px-4 py-1 rounded-lg border-2 text-[9px] font-black uppercase tracking-widest italic" 
                  style={{ borderColor: `${getDifficultyColor(topic.difficulty)}30`, color: getDifficultyColor(topic.difficulty), backgroundColor: `${getDifficultyColor(topic.difficulty)}05` }}
                >
                  {topic.difficulty || 'Beginner'}
                </div>
                <button 
                  className="p-3 rounded-xl bg-white/5 text-slate-600 hover:text-brand-primary hover:bg-brand-primary/10 transition-all border border-transparent hover:border-brand-primary/20 active:scale-90" 
                  onClick={(e) => handleBookmark(e, topic.id)}
                >
                  <Bookmark className="w-[18px] h-[18px]" />
                </button>
              </div>
              
              <div className="space-y-4 mb-10 relative z-10">
                <h3 className="text-2xl font-black text-white italic group-hover:text-brand-primary transition-colors">{topic.title}</h3>
                <p className="text-sm text-slate-500 italic leading-relaxed line-clamp-3 font-medium">
                   {topic.description || 'Master the concepts with interactive lessons and real-world examples.'}
                </p>
              </div>

              <div className="flex items-center justify-between pt-8 border-t border-white/5 relative z-10">
                <div className="flex gap-6">
                  <div className="flex items-center gap-2.5 text-[9px] font-black uppercase text-slate-600 tracking-widest italic">
                    <Clock className="w-[14px] h-[14px] text-brand-primary" />
                    <span>45m</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[9px] font-black uppercase text-slate-600 tracking-widest italic">
                    <Trophy className="w-[14px] h-[14px] text-brand-primary" />
                    <span>100 XP</span>
                  </div>
                </div>
                <Link to={`/lessons/${topic.id}`} className="p-3.5 bg-brand-primary rounded-2xl text-white shadow-xl shadow-brand-primary/20 hover:scale-110 active:scale-95 transition-all">
                  <PlayCircle className="w-[22px] h-[22px]" fill="currentColor" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Decorative Elements */}
      <div className="fixed bottom-0 right-0 p-12 opacity-5 pointer-events-none select-none">
         <Search className="w-[300px] h-[300px] text-white" />
      </div>

    </div>
  );
};

export default Topics;
