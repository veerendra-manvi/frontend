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
  Coffee,
  Zap,
  Target
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarClasses = `
    fixed top-0 left-0 h-full bg-dark-sidebar border-r border-white/5 z-50 transition-all duration-500 ease-in-out shadow-[10px_0_30px_rgba(0,0,0,0.5)]
    ${isCollapsed ? 'w-20' : 'w-72'}
    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
  `;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-xl"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={sidebarClasses}>
        {/* Logo Section */}
        <div className={`flex items-center h-24 px-6 border-b border-white/5 bg-dark-bg/20 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <div className="flex items-center gap-4 overflow-hidden">
            <div className="p-3 bg-brand-primary/10 rounded-2xl group border border-brand-primary/20 shadow-lg shadow-brand-primary/5">
              <Coffee className="w-[24px] h-[24px] text-brand-primary group-hover:rotate-12 transition-transform" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-tighter italic text-white leading-none">
                  JAVA<span className="text-brand-primary">MASTERY</span>
                </span>
                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-700 mt-1 italic">Production Hub</span>
              </div>
            )}
          </div>
          
          {!isCollapsed && (
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 hover:bg-white/5 rounded-xl text-slate-700 hover:text-white transition-all border border-transparent hover:border-white/10"
            >
              <ChevronLeft className="w-[20px] h-[20px]" />
            </button>
          )}
        </div>

        {/* Navigation Section */}
        <nav className="p-5 space-y-3 mt-4">
          {!isCollapsed && (
            <p className="px-4 pb-4 text-[9px] font-black uppercase tracking-[0.3em] text-slate-700 italic flex items-center gap-2">
               <Zap className="w-[12px] h-[12px]" /> Primary Protocol
            </p>
          )}
          
          <NavLink to="/" className={({ isActive }) => `flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 relative group ${isActive ? 'bg-brand-primary/10 text-brand-primary shadow-xl shadow-brand-primary/5' : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'}`}>
            <LayoutDashboard className="w-[20px] h-[20px] flex-shrink-0" />
            {!isCollapsed && <span className="text-sm font-bold italic tracking-tight">System Dashboard</span>}
            {isCollapsed && <div className="absolute left-full ml-4 px-3 py-1 bg-dark-sidebar border border-white/10 rounded-lg text-xs font-bold text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">Dashboard</div>}
          </NavLink>

          <NavLink to="/roadmap" className={({ isActive }) => `flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 relative group ${isActive ? 'bg-brand-primary/10 text-brand-primary shadow-xl shadow-brand-primary/5' : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'}`}>
            <Map className="w-[20px] h-[20px] flex-shrink-0" />
            {!isCollapsed && <span className="text-sm font-bold italic tracking-tight">Intelligence Map</span>}
            {isCollapsed && <div className="absolute left-full ml-4 px-3 py-1 bg-dark-sidebar border border-white/10 rounded-lg text-xs font-bold text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">Roadmap</div>}
          </NavLink>

          <NavLink to="/lessons" className={({ isActive }) => `flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 relative group ${isActive ? 'bg-brand-primary/10 text-brand-primary shadow-xl shadow-brand-primary/5' : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'}`}>
            <BookOpen className="w-[20px] h-[20px] flex-shrink-0" />
            {!isCollapsed && <span className="text-sm font-bold italic tracking-tight">Module Archive</span>}
            {isCollapsed && <div className="absolute left-full ml-4 px-3 py-1 bg-dark-sidebar border border-white/10 rounded-lg text-xs font-bold text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">Lessons</div>}
          </NavLink>

          <NavLink to="/practice" className={({ isActive }) => `flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 relative group ${isActive ? 'bg-brand-primary/10 text-brand-primary shadow-xl shadow-brand-primary/5' : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'}`}>
            <Code2 className="w-[20px] h-[20px] flex-shrink-0" />
            {!isCollapsed && <span className="text-sm font-bold italic tracking-tight">Combat Arena</span>}
            {isCollapsed && <div className="absolute left-full ml-4 px-3 py-1 bg-dark-sidebar border border-white/10 rounded-lg text-xs font-bold text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">Practice</div>}
          </NavLink>

          <NavLink to="/quiz-arena" className={({ isActive }) => `flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 relative group ${isActive ? 'bg-brand-primary/10 text-brand-primary shadow-xl shadow-brand-primary/5' : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'}`}>
            <Trophy className="w-[20px] h-[20px] flex-shrink-0" />
            {!isCollapsed && <span className="text-sm font-bold italic tracking-tight">Elite Quizzes</span>}
            {isCollapsed && <div className="absolute left-full ml-4 px-3 py-1 bg-dark-sidebar border border-white/10 rounded-lg text-xs font-bold text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">Quizzes</div>}
          </NavLink>

          {!isCollapsed && (
            <p className="px-4 pt-8 pb-4 text-[9px] font-black uppercase tracking-[0.3em] text-slate-700 italic flex items-center gap-2">
               <Target className="w-[12px] h-[12px]" /> Personal Cluster
            </p>
          )}

          <NavLink to="/profile" className={({ isActive }) => `flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 relative group ${isActive ? 'bg-brand-primary/10 text-brand-primary shadow-xl shadow-brand-primary/5' : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'}`}>
            <User className="w-[20px] h-[20px] flex-shrink-0" />
            {!isCollapsed && <span className="text-sm font-bold italic tracking-tight">Identity Node</span>}
            {isCollapsed && <div className="absolute left-full ml-4 px-3 py-1 bg-dark-sidebar border border-white/10 rounded-lg text-xs font-bold text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">Profile</div>}
          </NavLink>

        </nav>

        {/* Footer Section */}
        <div className="absolute bottom-0 left-0 w-full p-6 border-t border-white/5 bg-dark-sidebar/40 backdrop-blur-3xl">
          <button 
            onClick={handleLogout}
            className={`flex items-center gap-4 w-full px-4 py-4 rounded-2xl text-rose-500/80 hover:text-rose-500 hover:bg-rose-500/10 transition-all font-black uppercase text-[10px] tracking-[0.2em] italic ${isCollapsed ? 'justify-center' : ''}`}
          >
            <LogOut className="w-[20px] h-[20px] flex-shrink-0" />
            {!isCollapsed && <span>Deauthenticate</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
