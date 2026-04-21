import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import GlobalSearch from './GlobalSearch';
import FeedbackWidget from './FeedbackWidget';

const AppLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-brand-primary/30">
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      <Sidebar 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div 
        className={`
          flex flex-col min-h-screen transition-all duration-300 ease-in-out
          ${isCollapsed ? 'lg:pl-20' : 'lg:pl-64'}
        `}
      >
        <Navbar 
          setIsMobileOpen={setIsMobileOpen} 
          onSearchOpen={() => setIsSearchOpen(true)}
        />

        <main className="flex-1 p-4 md:p-8 lg:p-10">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Outlet />
          </div>
        </main>

        <footer className="p-8 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} JavaMastery. Built for Champions.
        </footer>
      </div>

      <FeedbackWidget />
    </div>
  );
};

export default AppLayout;
