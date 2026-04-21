import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading, authError } = useAuth();

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#08090e] flex items-center justify-center z-50">
        <div className="space-y-8 text-center animate-in fade-in duration-700">
           <div className="relative">
              <div className="w-20 h-20 border-4 border-brand-primary/10 border-t-brand-primary rounded-full animate-spin mx-auto" />
              <div className="absolute inset-0 bg-brand-primary/5 blur-2xl rounded-full animate-pulse" />
           </div>
           <div className="space-y-3">
              <p className="text-white font-black uppercase tracking-[0.4em] text-[10px] italic">Synchronizing Neural Node...</p>
              <p className="text-slate-600 text-[9px] font-bold uppercase tracking-widest italic">Authenticating with Production Hub</p>
           </div>
           {/* Fallback info shown only if taking too long */}
           <div className="pt-10 transition-opacity duration-1000 opacity-40">
              <p className="text-[8px] text-slate-800 font-medium italic">Establishing encrypted handshake with backend.onrender.com</p>
           </div>
        </div>
      </div>
    );
  }

  // If loading finished but no user, or if there was a critical timeout/error
  if (!user) {
    console.warn("ProtectedRoute: No authenticated user session found. Redirecting to login.");
    if (authError) {
      console.error("Auth Failure Reason:", authError);
    }
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
