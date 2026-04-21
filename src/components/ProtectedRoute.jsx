import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2, Zap } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  const { user, loading, isSlow, authError } = useAuth();

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
                 {isSlow ? "Waking server..." : "Synchronizing..."}
              </h2>
              <p className="text-slate-600 text-[9px] font-bold uppercase tracking-widest italic animate-pulse">
                 {isSlow ? "Backend initializing on production cluster" : "Verifying neural identity"}
              </p>
           </div>

           {isSlow && (
              <div className="pt-8 px-6 max-w-xs mx-auto">
                 <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-primary animate-progress-loop shadow-[0_0_10px_#f89820]" />
                 </div>
                 <p className="mt-4 text-[8px] text-slate-700 font-bold uppercase tracking-tighter">
                    Request relayed to Render nodes. Single retry active.
                 </p>
              </div>
           )}
        </div>
      </div>
    );
  }

  // Final check: If loading finished and we STILL have no user
  // This means the token was actually invalid or the server is truly dead
  if (!user) {
    console.warn("Auth check finalized with no user. Redirecting to login.");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
