import { Menu, Search, Bell, Ghost, Flame } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import useProgressStore from '../../store/useProgressStore';
import { getLevelInfo } from '../../utils/motivation';

const Navbar = ({ setIsMobileOpen, onSearchOpen }) => {
  const { user } = useAuth();
  const { xp, streak } = useProgressStore();
  const levelInfo = getLevelInfo(xp);

  return (
    <header className="sticky top-0 z-30 w-full h-16 border-b border-dark-border bg-dark-bg/80 backdrop-blur-xl">
      <div className="flex items-center justify-between h-full px-4 lg:px-8">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileOpen(prev => !prev)}
            className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Search Bar - Hidden on mobile, visible on desktop */}
          <div 
            onClick={onSearchOpen}
            className="hidden md:flex items-center gap-3 px-4 py-2 bg-white/5 border border-dark-border rounded-xl w-64 lg:w-96 group hover:border-brand-primary/50 cursor-pointer transition-all"
          >
            <Search className="w-4 h-4 text-slate-500 group-hover:text-brand-primary transition-colors" />
            <input 
              type="text" 
              readOnly
              placeholder="Search (CMD+K)..." 
              className="bg-transparent border-none outline-none text-sm text-white placeholder:text-slate-500 w-full cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Day Streak */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-rose-500/10 border border-rose-500/20 rounded-full">
             <Flame size={14} className="text-rose-500 fill-rose-500" />
             <span className="text-xs font-black text-rose-500">{streak}</span>
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-brand-primary rounded-full border-2 border-dark-bg"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-2 md:pl-4 border-l border-dark-border">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-semibold text-white leading-none">
                {user?.fullName || 'Java Enthusiast'}
              </span>
              <span className={`text-[10px] font-black uppercase tracking-wider mt-1 ${levelInfo.color}`}>
                {levelInfo.title}
              </span>
            </div>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary p-[1px]`}>
              <div className="w-full h-full rounded-[11px] bg-dark-bg flex items-center justify-center text-brand-primary font-bold">
                {user?.fullName?.charAt(0) || 'J'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
