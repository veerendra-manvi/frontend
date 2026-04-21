import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map, Zap, Bookmark, User } from 'lucide-react';

const BottomNav = () => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-dark-bg/80 backdrop-blur-xl border-t border-white/5 px-4 pb-safe">
      <div className="flex items-center justify-around h-16">
        
        <NavLink to="/" className={({ isActive }) => `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-brand-primary' : 'text-slate-500'}`}>
          <LayoutDashboard className="w-5 h-5 focus:animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest">Home</span>
        </NavLink>

        <NavLink to="/roadmap" className={({ isActive }) => `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-brand-primary' : 'text-slate-500'}`}>
          <Map className="w-5 h-5 focus:animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest">Roadmap</span>
        </NavLink>

        <NavLink to="/code-arena" className={({ isActive }) => `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-brand-primary' : 'text-slate-500'}`}>
          <Zap className="w-5 h-5 focus:animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest">Arena</span>
        </NavLink>

        <NavLink to="/bookmarks" className={({ isActive }) => `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-brand-primary' : 'text-slate-500'}`}>
          <Bookmark className="w-5 h-5 focus:animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest">Saved</span>
        </NavLink>

        <NavLink to="/dashboard" className={({ isActive }) => `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-brand-primary' : 'text-slate-500'}`}>
          <User className="w-5 h-5 focus:animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest">Profile</span>
        </NavLink>

      </div>
    </nav>
  );
};

export default BottomNav;
