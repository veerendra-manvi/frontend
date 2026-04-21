import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../services/api';
import { Search, PlayCircle, ExternalLink, Activity, Target, Zap } from 'lucide-react';
import { Badge, Card, PrimaryButton } from '../components/ui';
import { EmptyState } from '../components/ui/EmptyState';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('keyword') || '';
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query) {
      handleSearch();
    }
  }, [query]);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/api/search/topics?keyword=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error('Search failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-page fade-in max-w-7xl mx-auto space-y-16 pb-24 p-6 lg:p-12">
      <header className="space-y-6">
        <div className="flex items-center gap-4">
           <div className="px-6 py-2 bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-[0.4em] w-fit rounded-full border-2 border-brand-primary/20 italic">Intelligence Query</div>
           <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>
        <h1 className="text-5xl lg:text-8xl font-black text-white italic tracking-tighter leading-none uppercase">Scanner Matches<br/><span className="text-brand-primary underline decoration-brand-primary/20 decoration-8 underline-offset-8">"{query}"</span>.</h1>
        <p className="text-slate-400 font-bold italic text-xl">{results.length} synchronized knowledge clusters identified in the archive.</p>
      </header>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-8 text-center">
           <div className="w-20 h-20 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin shadow-2xl" />
           <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.5em] italic animate-pulse">Scanning Neural Paths...</p>
        </div>
      ) : results.length === 0 ? (
        <div className="max-w-4xl mx-auto py-12">
           <EmptyState 
             title="No Synchronization Matches"
             message={`Your query for "${query}" did not trigger any architectural matches. Try core vectors like "Collections", "Streams", or "JVM".`}
             iconId="search"
             actionLabel="Explore Category Grid"
             onAction={() => window.location.href = '/categories'}
           />
        </div>
      ) : (
        <div className="results-list space-y-8">
          {results.map((topic) => (
            <Card key={topic.id} className="relative group overflow-hidden bg-white/2 border-2 border-white/5 p-10 lg:p-12 rounded-[3.5rem] hover:bg-white/5 hover:border-brand-primary/30 transition-all duration-700 flex flex-col md:flex-row justify-between items-center group shadow-3xl">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700"><Zap className="w-[120px] h-[120px] text-white" /></div>
              
              <div className="flex-1 space-y-6 relative z-10">
                <div className="flex items-center gap-4">
                   <Badge variant="ghost" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-700 bg-white/5 border-none px-4 py-1.5 italic group-hover:text-brand-primary transition-colors leading-none">Topic Detected</Badge>
                   <div className="h-0.5 w-12 bg-white/5" />
                </div>
                <h3 className="text-3xl font-black text-white italic tracking-tighter leading-none group-hover:text-brand-primary transition-colors">{topic.title}</h3>
                <p className="text-slate-500 font-bold text-lg leading-relaxed max-w-3xl italic group-hover:text-slate-400 transition-colors">{topic.description}</p>
                <div className="flex gap-4">
                  <span className="text-[10px] font-black text-brand-primary/40 uppercase tracking-[0.3em] italic">#NeuralVector</span>
                  <span className="text-[10px] font-black text-slate-800 uppercase tracking-[0.3em] italic">#QuerySynchronized</span>
                </div>
              </div>

              <Link to={`/lessons/${topic.id}`} className="mt-10 md:mt-0 relative z-10">
                 <PrimaryButton className="px-12 py-5 text-[10px] font-black uppercase tracking-[0.3em] italic rounded-[2rem] shadow-2xl shadow-brand-primary/40 active:scale-95 transition-all group flex items-center gap-4">
                    Initialize Module
                    <ExternalLink className="w-[20px] h-[20px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                 </PrimaryButton>
              </Link>
            </Card>
          ))}
        </div>
      )}

      {/* Decorative Branding */}
      <div className="fixed bottom-0 right-10 p-12 opacity-5 pointer-events-none select-none">
         <Target className="w-[450px] h-[450px] text-white" />
      </div>
      <div className="fixed top-24 left-10 p-20 opacity-5 pointer-events-none select-none">
         <Activity className="w-[300px] h-[300px] text-white -rotate-12" />
      </div>
    </div>
  );
};

export default SearchResults;
