import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  X, 
  BookOpen, 
  ChevronRight, 
  Layers, 
  Terminal 
} from 'lucide-react';
import { lessons as LESSONS_DATA } from '../../data/curriculum/lessons';
import { Badge } from '../ui';
import { analytics } from '../../services/AnalyticsService';

const GlobalSearch = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
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
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />
      
      <motion.div 
        initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
        className="relative w-full max-w-2xl bg-[#0d0f1a] border border-white/10 rounded-[2.5rem] shadow-2xl shadow-black overflow-hidden"
      >
        <div className="flex items-center gap-4 p-8 border-b border-white/5">
           <Search className="w-[24px] h-[24px] text-brand-primary" />
           <input 
             autoFocus
             value={query}
             onChange={(e) => setQuery(e.target.value)}
             placeholder="Search patterns, modules, or difficulty..."
             className="flex-1 bg-transparent border-none outline-none text-white text-xl placeholder:text-slate-700 italic font-medium"
           />
           <button onClick={onClose} className="p-2.5 hover:bg-white/5 rounded-full transition-colors text-slate-500 hover:text-white">
              <X className="w-[20px] h-[20px]" />
           </button>
        </div>

        <div className="max-h-[450px] overflow-y-auto custom-scrollbar">
           {results.length > 0 ? (
             <div className="p-6 grid grid-cols-1 gap-2">
                {results.map((lesson) => (
                   <button 
                     key={lesson.slug}
                     onClick={() => handleResultClick(lesson.slug)}
                     className="flex items-center gap-6 p-5 rounded-[2rem] hover:bg-white/5 text-left transition-all group relative overflow-hidden"
                   >
                      <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all border border-brand-primary/10">
                         <BookOpen className="w-[22px] h-[22px]" />
                      </div>
                      <div className="flex-1">
                         <h4 className="text-white font-black text-base italic mb-1 group-hover:text-brand-primary transition-colors">{lesson.title}</h4>
                         <div className="flex gap-4 items-center">
                            <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest italic">{lesson.moduleId}</span>
                            <div className="w-1 h-1 rounded-full bg-slate-700" />
                            <span className={`text-[10px] font-black uppercase tracking-widest italic ${lesson.difficulty === 'Beginner' ? 'text-emerald-500' : 'text-brand-secondary'}`}>{lesson.difficulty}</span>
                         </div>
                      </div>
                      <ChevronRight className="w-[20px] h-[20px] text-slate-700 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 group-hover:text-brand-primary" />
                   </button>
                ))}
             </div>
           ) : query.length >= 2 ? (
             <div className="p-24 text-center space-y-6">
                <div className="w-20 h-20 bg-white/2 rounded-full flex items-center justify-center mx-auto border border-white/5">
                   <Layers className="w-[32px] h-[32px] text-slate-800" />
                </div>
                <p className="text-slate-600 font-black uppercase tracking-widest text-[10px] italic">Tactical Void. No clusters identified.</p>
             </div>
           ) : (
             <div className="p-12 text-center text-slate-700">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] leading-loose italic">
                   Global Search Engine v1.0<br/>
                   <span className="text-slate-800 font-medium">Query "hashmap", "streams", or "collection"</span>
                </p>
             </div>
           )}
        </div>

        <div className="p-6 bg-white/2 border-t border-white/5 flex justify-between items-center px-10">
           <span className="text-[9px] font-black text-slate-800 uppercase tracking-widest italic">Core Research Node</span>
           <div className="flex gap-6">
              <span className="flex items-center gap-2 text-[9px] font-black text-slate-600 uppercase tracking-widest italic"><Terminal className="w-[12px] h-[12px] text-brand-primary"/> Execute</span>
              <span className="flex items-center gap-2 text-[9px] font-black text-slate-600 uppercase tracking-widest italic"><X className="w-[12px] h-[12px] text-rose-500"/> Terminate</span>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GlobalSearch;
