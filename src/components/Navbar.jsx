import React from 'react';
import { User, Bell, Search as SearchIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-search">
        <SearchIcon className="search-icon w-[18px] h-[18px]" />
        <input type="text" placeholder="Search for Java topics..." />
      </div>
      
      <div className="navbar-actions">
        <button className="nav-btn">
          <Bell className="w-[20px] h-[20px]" />
          <span className="dot"></span>
        </button>
        
        <div className="user-profile">
          <div className="user-info">
            <span className="user-name italic">{user?.fullName?.split(' ')[0] || 'Learner'}</span>
            <span className="user-rank uppercase text-[9px] font-black tracking-widest text-brand-primary">Pro Member</span>
          </div>
          <div className="user-avatar bg-brand-primary/10 border border-brand-primary/20 rounded-xl">
            <User className="w-[20px] h-[20px] text-brand-primary" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
