import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map, Zap, Bookmark, User } from 'lucide-react';

const BottomNav = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Home', path: '/' },
    { icon: Map, label: 'Roadmap', path: '/roadmap' },
    { icon: Zap, label: 'Arena', path: '/code-arena' },
    { icon: Bookmark, label: 'Saved', path: '/bookmarks' },
    { icon: User, label: 'Profile', path: '/dashboard' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-dark-bg/80 backdrop-blur-xl border-t border-white/5 px-4 pb-safe">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex flex-col items-center gap-1 transition-all
              ${isActive ? 'text-brand-primary' : 'text-slate-500 hover:text-slate-300'}
            `}
          >
            <item.icon size={20} className={({ isActive }) => isActive ? 'animate-pulse' : ''} />
            <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
            {/* Active Indicator Dot */}
             <NavLink 
               to={item.path} 
               className={({ isActive }) => `w-1 h-1 rounded-full bg-brand-primary transition-all mt-0.5 ${isActive ? 'opacity-100' : 'opacity-0'}`}
             />
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
