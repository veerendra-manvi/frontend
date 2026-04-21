import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Layers, 
  Bookmark, 
  Search, 
  LogOut, 
  Coffee,
  Trophy
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Coffee className="logo-icon w-[24px] h-[24px]" />
        <span>JavaMastery</span>
      </div>
      
      <nav className="sidebar-nav">
        <span className="sidebar-section">Main Menu</span>
        
        <NavLink 
          to="/" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <LayoutDashboard className="w-[20px] h-[20px]" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink 
          to="/categories" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <Layers className="w-[20px] h-[20px]" />
          <span>Categories</span>
        </NavLink>

        <NavLink 
          to="/bookmarks" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <Bookmark className="w-[20px] h-[20px]" />
          <span>Bookmarks</span>
        </NavLink>

        <NavLink 
          to="/search" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <Search className="w-[20px] h-[20px]" />
          <span>Search</span>
        </NavLink>

        <div className="sidebar-upgrade-card">
          <Trophy className="upgrade-icon w-[24px] h-[24px]" />
          <h4>Go Pro!</h4>
          <p>Get unlimited access to all Java tracks.</p>
          <button className="upgrade-btn">Upgrade Now</button>
        </div>
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="sidebar-logout">
          <LogOut className="w-[20px] h-[20px]" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
