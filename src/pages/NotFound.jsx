import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';
import { PrimaryButton } from '../components/ui';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-8">
       <div className="max-w-lg w-full text-center space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="relative">
             <div className="text-[180px] font-black leading-none text-white/5 select-none">404</div>
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary animate-pulse shadow-2xl shadow-brand-primary/20">
                   <Compass size={64} />
                </div>
             </div>
          </div>
          
          <div className="space-y-4">
             <h1 className="text-4xl font-black text-white italic">Object Not Found.</h1>
             <p className="text-slate-500 font-medium max-w-sm mx-auto">
                The content you're looking for doesn't exist in the Javamastery classpath. Let's get you back to the main thread.
             </p>
          </div>

          <PrimaryButton 
            onClick={() => navigate('/')} 
            className="px-12 h-16 gap-3"
          >
             <Home size={20} /> Back to Dashboard
          </PrimaryButton>
       </div>
    </div>
  );
};

export default NotFound;
