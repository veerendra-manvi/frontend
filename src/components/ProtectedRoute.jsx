import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2, Zap, AlertCircle, RefreshCw } from 'lucide-react';
import { PrimaryButton } from './ui';

const ProtectedRoute = ({ children }) => {
  const { user, loading, isSlow, authError, fetchUser } = useAuth();

  // 1. App-level Synchronizing State
  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#08090e] flex items-center justify-center z-50">
        <div className="space-y-8 text-center animate-in fade-in duration-700">
           <div className="relative flex justify-center">
              <Loader2 className="w-20 h-20 text-brand-primary animate-spin opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <Zap className={`w-8 h-8 text-brand-primary transition-all duration-1000 ${isSlow ? 'animate-pulse scale-125 opacity-100' : 'opacity-20'}`} />
              </div>
           </div>
           
           <div className="space-y-3">
              <h2 className="text-white font-black uppercase tracking-[0.4em] text-[11px] italic">
                 {isSlow ? "Waking production cluster..." : "Synchronizing..."}
              </h2>
              <p className="text-slate-600 text-[9px] font-bold uppercase tracking-widest italic animate-pulse">
                 Establishment of secure handshake in progress
              </p>
           </div>
        </div>
      </div>
    );
  }

  // 2. Unreachable State (Token exists but sync keeps failing)
  // We check if we have a token but NO user object
  const hasToken = !!localStorage.getItem("token");
  if (!user && hasToken) {
    return (
      <div className="fixed inset-0 bg-[#08090e] flex items-center justify-center z-50 p-8">
        <div className="max-w-md w-full bg-white/2 border border-white/5 p-12 rounded-[3rem] text-center space-y-8 animate-in zoom-in-95 duration-500">
           <div className="w-24 h-24 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto text-rose-500 shadow-2xl shadow-rose-500/20">
              <AlertCircle className="w-[48px] h-[48px]" />
           </div>
           <div className="space-y-4">
              <h1 className="text-2xl font-black text-white italic">Neural Link Interrupted</h1>
              <p className="text-slate-500 text-sm font-medium italic leading-relaxed">
                 The production hub is currently unreachable. Your access tokens are intact, but we cannot synchronize your progress.
              </p>
           </div>
           
           <div className="bg-rose-500/5 px-6 py-4 rounded-2xl border border-rose-500/10">
              <p className="text-[10px] text-rose-400 font-black uppercase tracking-widest leading-loose"> Error: {authError || "Network Handshake Refused"}</p>
           </div>

           <div className="flex flex-col gap-4">
              <PrimaryButton onClick={() => window.location.reload()} className="w-full h-16 rounded-2xl gap-3">
                 <RefreshCw className="w-[18px] h-[18px]" /> Attempt Reconnection
              </PrimaryButton>
              <button 
                onClick={() => { localStorage.removeItem("token"); window.location.href = "/login"; }}
                className="text-[10px] font-black text-slate-700 uppercase tracking-widest hover:text-white transition-colors"
              >
                Reset Access Node (Log Out)
              </button>
           </div>
        </div>
      </div>
    );
  }

  // 3. Unauthorized State (No user and no token)
  if (!user) {
    console.warn("Unauthorized state detected. Redirecting to access control.");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
