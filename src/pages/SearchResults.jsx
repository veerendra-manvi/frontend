import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../services/api';
import { Search, PlayCircle, ExternalLink } from 'lucide-react';

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
    <div className="search-page fade-in">
      <header className="page-header">
        <h1>Search Results</h1>
        <p>{results.length} topics found for "{query}"</p>
      </header>

      {isLoading ? (
        <div className="loading-spinner">Searching...</div>
      ) : results.length === 0 ? (
        <div className="no-results glass-card">
          <Search size={48} className="text-secondary" style={{ opacity: 0.2 }} />
          <h2>No topics found.</h2>
          <p>Try searching for core Java keywords like "Collections", "OOP", or "Streams".</p>
        </div>
      ) : (
        <div className="results-list">
          {results.map((topic) => (
            <div key={topic.id} className="glass-card result-item">
              <div className="result-content">
                <span className="badge">Topic Result</span>
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
                <div className="result-tags">
                  <span className="tag">#Java</span>
                  <span className="tag">#Programming</span>
                </div>
              </div>
              <Link to={`/lessons/${topic.id}`} className="view-btn">
                <span>View Lessons</span>
                <ExternalLink size={16} />
              </Link>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .results-list { display: flex; flex-direction: column; gap: 20px; }
        .result-item { display: flex; justify-content: space-between; align-items: center; padding: 30px; }
        .result-content { flex: 1; }
        .result-content h3 { margin: 8px 0; font-size: 20px; }
        .result-content p { color: var(--text-secondary); font-size: 14px; max-width: 600px; margin-bottom: 16px; }
        .result-tags { display: flex; gap: 10px; }
        .tag { font-size: 11px; font-weight: 700; color: var(--primary); background: rgba(248, 152, 32, 0.1); padding: 2px 8px; border-radius: 4px; }
        .view-btn { display: flex; align-items: center; gap: 10px; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-color); padding: 12px 24px; border-radius: 10px; font-weight: 600; transition: var(--transition); }
        .view-btn:hover { background: var(--primary); color: white; border-color: var(--primary); }
        .no-results { text-align: center; padding: 60px; }
      `}</style>
    </div>
  );
};

export default SearchResults;
