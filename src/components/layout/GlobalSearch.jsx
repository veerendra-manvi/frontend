import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { lessons as LESSONS_DATA } from '../../data/curriculum/lessons';
import { Card, Badge } from '../ui';
import { analytics } from '../../services/AnalyticsService';

const GlobalSearch = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (query.length > 3) {
      const timer = setTimeout(() => {
        analytics.trackSearch(query);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [query]);

  const results = useMemo(() => {
    if (!query || query.length < 2) return [];
    
    const lowerQuery = query.toLowerCase();
    return LESSONS_DATA.filter(lesson => 
      lesson.title.toLowerCase().includes(lowerQuery) ||
      lesson.moduleId.toLowerCase().includes(lowerQuery) ||
      lesson.difficulty.toLowerCase().includes(lowerQuery)
    ).slice(0, 6);
  }, [query]);

  const handleResultClick = (slug) => {
    navigate(`/lesson/${slug}`);
    onClose();
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-32 px-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
        className="relative w-full max-w-2xl bg-[#0d0f1a] border border-white/10 rounded-[2.5rem] shadow-2xl shadow-black overflow-hidden"
      >
        <div className="flex items-center gap-4 p-6 border-b border-white/5">
           <Search size={24} className="text-brand-primary" />
           <input 
             autoFocus
             value={query}
             onChange={(e) => setQuery(e.target.value)}
             placeholder="Search lessons, modules, or difficulty..."
             className="flex-1 bg-transparent border-none outline-none text-white text-xl placeholder:text-slate-700"
           />
           <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <X size={20} className="text-slate-500" />
           </button>
        </div>

        <div className="max-h-[450px] overflow-y-auto custom-scrollbar">
           {results.length > 0 ? (
             <div className="p-4 grid grid-cols-1 gap-2">
                {results.map((lesson) => (
                  <button 
                    key={lesson.slug}
                    onClick={() => handleResultClick(lesson.slug)}
                    className="flex items-center gap-5 p-4 rounded-3xl hover:bg-white/5 text-left transition-all group"
                  >
                     <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
                        <BookOpen size={20} />
                     </div>
                     <div className="flex-1">
                        <h4 className="text-white font-bold text-sm mb-1">{lesson.title}</h4>
                        <div className="flex gap-3 items-center">
                           <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{lesson.moduleId}</span>
                           <div className="w-1 h-1 rounded-full bg-slate-700" />
                           <span className={`text-[10px] font-black uppercase tracking-widest ${lesson.difficulty === 'Beginner' ? 'text-emerald-500' : 'text-brand-secondary'}`}>{lesson.difficulty}</span>
                        </div>
                     </div>
                     <ChevronRight size={18} className="text-slate-700 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </button>
                ))}
             </div>
           ) : query.length >= 2 ? (
             <div className="p-20 text-center space-y-4">
                <Layers size={48} className="mx-auto text-slate-800" />
                <p className="text-slate-600 font-bold italic">No magic here... Try another search term!</p>
             </div>
           ) : (
             <div className="p-12 text-center text-slate-600">
                <p className="text-xs font-black uppercase tracking-widest leading-loose">
                   Search Tips:<br/>
                   <span className="text-slate-700 italic">"hashmap", "intermediate", "basics"</span>
                </p>
             </div>
           )}
        </div>

        <div className="p-4 bg-white/2 border-t border-white/5 flex justify-between items-center px-8">
           <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Search Engine v1.0</span>
           <div className="flex gap-4">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600"><Terminal size={12}/> Select</span>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600"><X size={12}/> Close</span>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GlobalSearch;
