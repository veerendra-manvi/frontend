import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  BookOpen, 
  Code2, 
  Trophy, 
  User, 
  LogOut, 
  ChevronLeft,
  Menu,
  Coffee
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Map, label: 'Java Roadmap', path: '/roadmap' },
    { icon: BookOpen, label: 'Lessons', path: '/lessons' },
    { icon: Code2, label: 'Practice', path: '/practice' },
    { icon: Trophy, label: 'Quiz Arena', path: '/quiz-arena' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  const sidebarClasses = `
    fixed top-0 left-0 h-full bg-dark-sidebar border-r border-dark-border z-50 transition-all duration-300 ease-in-out
    ${isCollapsed ? 'w-20' : 'w-64'}
    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
  `;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={sidebarClasses}>
        {/* Logo Section */}
        <div className={`flex items-center h-16 px-6 border-b border-dark-border ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="p-2 bg-brand-primary/10 rounded-xl group">
              <Coffee className="w-6 h-6 text-brand-primary group-hover:scale-110 transition-transform" />
            </div>
            {!isCollapsed && (
              <span className="font-bold text-lg tracking-tight whitespace-nowrap bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                JavaMastery
              </span>
            )}
          </div>
          
          {/* Collapse Toggle for Desktop */}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="p-4 space-y-2">
          {!isCollapsed && (
            <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Main Menu
            </p>
          )}
          
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-4 px-3 py-2.5 rounded-xl transition-all duration-200 group
                ${isActive 
                  ? 'bg-brand-primary/10 text-brand-primary' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                }
              `}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <span className="font-medium text-sm whitespace-nowrap">{item.label}</span>
              )}
              {isCollapsed && (
                <div className="fixed left-20 bg-dark-sidebar border border-dark-border px-3 py-1.5 rounded-md text-xs opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-[60]">
                  {item.label}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer Section */}
        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-dark-border bg-dark-sidebar/50 backdrop-blur-md">
          <button 
            onClick={handleLogout}
            className={`
              flex items-center gap-4 w-full px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors
              ${isCollapsed ? 'justify-center' : ''}
            `}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium text-sm">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
