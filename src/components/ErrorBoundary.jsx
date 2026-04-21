import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { PrimaryButton } from './ui';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Tactical Error Captured:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-dark-bg flex items-center justify-center p-8">
           <div className="max-w-md w-full text-center space-y-8 animate-in fade-in duration-700">
              <div className="w-24 h-24 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto border border-rose-500/20">
                 <AlertCircle size={48} />
              </div>
              <div className="space-y-2">
                 <h2 className="text-3xl font-black text-white italic">Anomaly Detected.</h2>
                 <p className="text-slate-500 font-medium"> something went wrong in the JVM interface. We've logged the error and are ready to recover.</p>
              </div>
              <PrimaryButton 
                onClick={() => window.location.reload()} 
                className="w-full h-16 bg-rose-500 hover:bg-rose-600 border-none shadow-xl shadow-rose-500/20 gap-3"
              >
                 <RotateCcw size={20} /> Reinitialize Platform
              </PrimaryButton>
           </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
