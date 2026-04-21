import { Menu, Search, Bell, Flame, Activity } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import useProgressStore from '../../store/useProgressStore';
import { getLevelInfo } from '../../utils/motivation';

const Navbar = ({ setIsMobileOpen, onSearchOpen }) => {
  const { user } = useAuth();
  const { xp, streak } = useProgressStore();
  const levelInfo = getLevelInfo(xp);

  return (
    <header className="sticky top-0 z-30 w-full h-20 border-b border-white/5 bg-dark-bg/60 backdrop-blur-3xl shadow-2xl">
      <div className="flex items-center justify-between h-full px-6 lg:px-12">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsMobileOpen(prev => !prev)}
            className="lg:hidden p-2.5 text-slate-500 hover:text-white hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-white/10"
          >
            <Menu className="w-[24px] h-[24px]" />
          </button>

          <div 
            onClick={onSearchOpen}
            className="hidden md:flex items-center gap-4 px-6 py-3 bg-white/2 border border-white/5 rounded-2xl w-72 lg:w-[450px] group hover:border-brand-primary/40 cursor-pointer transition-all shadow-inner"
          >
            <Search className="w-[18px] h-[18px] text-slate-600 group-hover:text-brand-primary transition-colors" />
            <input 
              type="text" 
              readOnly
              placeholder="Query System Archive... (CMD+K)" 
              className="bg-transparent border-none outline-none text-[13px] text-white placeholder:text-slate-600 w-full cursor-pointer font-black italic tracking-tight"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-rose-500/5 border border-rose-500/10 rounded-2xl shadow-xl shadow-rose-500/5 group hover:bg-rose-500/10 transition-colors">
             <Flame className="w-[16px] h-[16px] text-rose-500 fill-rose-500 group-hover:animate-bounce" />
             <span className="text-xs font-black text-rose-500 tracking-tighter italic">{streak} DAY STREAK</span>
          </div>

          <button className="relative p-3 text-slate-600 hover:text-white hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-white/10">
            <Bell className="w-[20px] h-[20px]" />
            <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-brand-primary rounded-full border-2 border-dark-bg animate-pulse"></span>
          </button>

          <div className="flex items-center gap-6 pl-4 md:pl-8 border-l border-white/5 h-10">
            <div className="hidden sm:flex flex-col items-end">
              <div className="flex items-center gap-2">
                 <Activity className="w-[10px] h-[10px] text-emerald-500 animate-pulse" />
                 <span className="text-sm font-black text-white leading-none italic tracking-tight underline decoration-white/5 decoration-4">
                   {user?.fullName?.split(' ')[0] || 'JavaMaster'}
                 </span>
              </div>
              <span className={`text-[9px] font-black uppercase tracking-[0.2em] mt-2 ${levelInfo.color} italic`}>
                {levelInfo.title}
              </span>
            </div>
            
            <div className="relative group">
               <div className="absolute inset-0 bg-brand-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-secondary p-[2px] transition-transform group-hover:scale-105 active:scale-95 cursor-pointer relative z-10 shadow-2xl`}>
                 <div className="w-full h-full rounded-[13px] bg-dark-bg flex items-center justify-center text-brand-primary font-black uppercase italic text-lg border border-white/5">
                   {user?.fullName?.charAt(0) || 'J'}
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
