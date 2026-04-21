import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import './Breadcrumb.css';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="breadcrumb fade-in">
      <Link to="/" className="breadcrumb-item home">
        <Home size={16} />
        <span>Dashboard</span>
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight size={14} className="breadcrumb-separator" />
          {item.path ? (
            <Link to={item.path} className="breadcrumb-item">
              {item.label}
            </Link>
          ) : (
            <span className="breadcrumb-item active">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
