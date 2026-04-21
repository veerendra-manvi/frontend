import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="content-area">
          <Outlet />
        </div>
      </div>
      
      <style>{`
        .app-layout {
          display: flex;
          min-height: 100vh;
        }
        .content-area {
          max-width: 1200px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
};

export default Layout;
