import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Layers, 
  Bookmark, 
  Search, 
  LogOut, 
  BookOpen,
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

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
    { icon: <Layers size={20} />, label: 'Categories', path: '/categories' },
    { icon: <Bookmark size={20} />, label: 'Bookmarks', path: '/bookmarks' },
    { icon: <Search size={20} />, label: 'Search', path: '/search' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Coffee className="logo-icon" />
        <span>JavaMastery</span>
      </div>
      
      <nav className="sidebar-nav">
        <span className="sidebar-section">Main Menu</span>
        {menuItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}

        <div className="sidebar-upgrade-card">
          <Trophy size={24} className="upgrade-icon" />
          <h4>Go Pro!</h4>
          <p>Get unlimited access to all Java tracks.</p>
          <button className="upgrade-btn">Upgrade Now</button>
        </div>
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="sidebar-logout">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
