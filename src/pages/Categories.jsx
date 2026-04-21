import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Breadcrumb from '../components/Breadcrumb';
import { ChevronRight, Code, Database, Globe, Smartphone, Coffee, Zap } from 'lucide-react';

const CategoryIcon = ({ name, className }) => {
  const n = name.toLowerCase();
  if (n.includes('web')) return <Globe className={className} />;
  if (n.includes('data')) return <Database className={className} />;
  if (n.includes('mobile')) return <Smartphone className={className} />;
  if (n.includes('spring') || n.includes('backend')) return <Coffee className={className} />;
  return <Code className={className} />;
};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/api/learning/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
       <div className="w-16 h-16 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" />
       <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.3em] italic animate-pulse">Scanning Neural Paths...</p>
    </div>
  );

  return (
    <div className="categories fade-in p-6 lg:p-12 max-w-7xl mx-auto">
      <Breadcrumb items={[{ label: 'Categories' }]} />

      <header className="mb-20 space-y-6 relative">
        <div className="flex items-center gap-4">
           <div className="px-6 py-1.5 bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-[0.3em] w-fit rounded-full border border-brand-primary/20 italic">
              Neural Network
           </div>
           <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>
        <h1 className="text-5xl md:text-8xl font-black text-white italic tracking-tighter leading-none">Learning Paths</h1>
        <p className="text-slate-400 font-bold italic max-w-3xl leading-relaxed">
           Initialize your specialized Java journey. Every path is optimized for <span className="text-white underline decoration-brand-primary decoration-4 underline-offset-8">Production Excellence</span>. Select a knowledge cluster to begin.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link 
            key={category.id} 
            to={`/topics/${category.id}`} 
            className="group relative overflow-hidden bg-white/2 border border-white/5 rounded-[3rem] p-10 transition-all duration-500 hover:bg-white/5 hover:border-brand-primary/30 hover:-translate-y-3 shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/10 rounded-full -mr-16 -mt-16 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <div className="w-20 h-20 bg-brand-primary/10 border-2 border-brand-primary/20 rounded-[1.5rem] flex items-center justify-center text-brand-primary mb-10 group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary transition-all duration-500 shadow-xl shadow-brand-primary/5 group-hover:shadow-brand-primary/20">
              <CategoryIcon name={category.name} className="w-[32px] h-[32px] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
            </div>
            
            <div className="space-y-4 mb-10">
              <h3 className="text-2xl font-black text-white italic group-hover:text-brand-primary transition-colors">{category.name}</h3>
              <p className="text-[13px] text-slate-500 font-medium italic leading-relaxed group-hover:text-slate-400 transition-colors">
                 {category.description || `Master ${category.name} with structured lessons and practical challenges.`}
              </p>
            </div>
            
            <div className="flex items-center gap-3 pt-8 border-t border-white/5 text-brand-primary font-black uppercase text-[10px] tracking-widest italic group-hover:gap-5 transition-all">
              <span>Initialize Map</span>
              <ChevronRight className="w-[18px] h-[18px]" />
            </div>
          </Link>
        ))}
      </div>

      {/* Decorative Branding */}
      <div className="fixed bottom-0 right-10 p-12 opacity-5 pointer-events-none select-none">
         <Zap className="w-[400px] h-[400px] text-white" />
      </div>

    </div>
  );
};

export default Categories;