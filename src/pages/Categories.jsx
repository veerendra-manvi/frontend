import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Breadcrumb from '../components/Breadcrumb';
import { ChevronRight, Code, Database, Globe, Smartphone, Coffee, Layout } from 'lucide-react';

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

  const getIcon = (name) => {
    const n = name.toLowerCase();
    if (n.includes('web')) return <Globe size={28} />;
    if (n.includes('data')) return <Database size={28} />;
    if (n.includes('mobile')) return <Smartphone size={28} />;
    if (n.includes('spring') || n.includes('backend')) return <Coffee size={28} />;
    return <Code size={28} />;
  };

  if (isLoading) return <div className="loading-spinner">Loading categories...</div>;

  return (
    <div className="categories fade-in">
      <Breadcrumb items={[{ label: 'Categories' }]} />

      <header className="page-header">
        <div className="title-with-badge">
          <span className="badge">Explore</span>
          <h1>Learning Paths</h1>
        </div>
        <p className="subtitle">Select a category to begin your specialized Java journey.</p>
      </header>

      <div className="categories-grid">
        {categories.map((category) => (
          <Link 
            key={category.id} 
            to={`/topics/${category.id}`} 
            className="glass-card category-card"
          >
            <div className="category-glow"></div>
            <div className="category-icon-wrapper">
              {getIcon(category.name)}
            </div>
            <div className="category-content">
              <h3>{category.name}</h3>
              <p>{category.description || `Master ${category.name} with structured lessons and practical challenges.`}</p>
              
              <div className="category-meta">
                <span className="topic-count">Explore Topics</span>
                <ChevronRight className="arrow-icon" size={18} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        .page-header { margin-bottom: 48px; }
        .title-with-badge { display: flex; flex-direction: column; gap: 8px; }
        .page-header h1 { font-size: 36px; font-weight: 800; letter-spacing: -1px; margin: 0; }
        .subtitle { color: var(--text-secondary); font-size: 16px; margin-top: 12px; }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 24px;
        }
        
        .category-card {
          display: flex;
          align-items: flex-start;
          gap: 24px;
          padding: 32px;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, var(--bg-card) 0%, #1c212e 100%);
        }

        .category-glow {
          position: absolute;
          top: -100px;
          right: -100px;
          width: 200px;
          height: 200px;
          background: var(--primary);
          filter: blur(80px);
          opacity: 0.05;
          transition: var(--transition);
        }

        .category-card:hover .category-glow {
          opacity: 0.15;
          transform: scale(1.5);
        }
        
        .category-icon-wrapper {
          width: 64px;
          height: 64px;
          background: rgba(248, 152, 32, 0.08);
          color: var(--primary);
          border: 1px solid rgba(248, 152, 32, 0.2);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: var(--transition);
        }

        .category-card:hover .category-icon-wrapper {
          transform: rotate(-5deg) scale(1.1);
          background: var(--primary);
          color: white;
          border-color: var(--primary);
          box-shadow: 0 8px 16px rgba(248, 152, 32, 0.3);
        }
        
        .category-content { flex: 1; }
        .category-content h3 { font-size: 22px; margin-bottom: 10px; font-weight: 700; }
        .category-content p { font-size: 14px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 20px; }
        
        .category-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--primary);
          font-weight: 700;
          font-size: 14px;
        }

        .arrow-icon { transition: var(--transition); }
        .category-card:hover .arrow-icon { transform: translateX(5px); }

        @media (max-width: 640px) {
          .categories-grid { grid-template-columns: 1fr; }
          .category-card { padding: 24px; gap: 16px; }
          .category-icon-wrapper { width: 48px; height: 48px; }
        }
      `}</style>
    </div>
  );
};

export default Categories;