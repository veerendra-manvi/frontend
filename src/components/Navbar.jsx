import React from 'react';
import { User, Bell, Search as SearchIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-search">
        <SearchIcon size={18} className="search-icon" />
        <input type="text" placeholder="Search for Java topics..." />
      </div>
      
      <div className="navbar-actions">
        <button className="nav-btn">
          <Bell size={20} />
          <span className="dot"></span>
        </button>
        
        <div className="user-profile">
          <div className="user-info">
            <span className="user-name">{user?.username || 'Learner'}</span>
            <span className="user-rank">Pro Member</span>
          </div>
          <div className="user-avatar">
            <User size={20} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
