import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, ThumbsUp, ThumbsDown, AlertCircle, Lightbulb } from 'lucide-react';
import { analytics } from '../../services/AnalyticsService';

const FeedbackWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState('type'); // type, form, success
  const [feedbackType, setFeedbackType] = useState('');
  const [message, setMessage] = useState('');

  const submit = () => {
    analytics.submitFeedback({ type: feedbackType, message, path: window.location.pathname });
    setStep('success');
    setTimeout(() => {
      setIsOpen(false);
      setStep('type');
      setMessage('');
    }, 2000);
  };

  return (
    <div className="fixed bottom-10 right-10 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-80 bg-dark-sidebar border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden p-8"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors">
               <X size={20} />
            </button>

            {step === 'type' && (
              <div className="space-y-6">
                 <div>
                    <h4 className="text-white font-black text-lg mb-1">Feedback.</h4>
                    <p className="text-slate-500 text-xs font-medium">Help us sharpen the Javamastery experience.</p>
                 </div>
                 <div className="space-y-2">
                    <button onClick={() => { setFeedbackType('helpful'); setStep('form'); }} className="w-full p-4 bg-white/2 hover:bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4 transition-all group text-left">
                       <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all"><ThumbsUp size={16} /></div>
                       <span className="text-xs text-white font-bold">This is helpful!</span>
                    </button>
                    <button onClick={() => { setFeedbackType('issue'); setStep('form'); }} className="w-full p-4 bg-white/2 hover:bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4 transition-all group text-left">
                       <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all"><AlertCircle size={16} /></div>
                       <span className="text-xs text-white font-bold">Report an issue</span>
                    </button>
                    <button onClick={() => { setFeedbackType('suggestion'); setStep('form'); }} className="w-full p-4 bg-white/2 hover:bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4 transition-all group text-left">
                       <div className="p-2 bg-brand-primary/10 rounded-lg text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all"><Lightbulb size={16} /></div>
                       <span className="text-xs text-white font-bold">Suggest a topic</span>
                    </button>
                 </div>
              </div>
            )}

            {step === 'form' && (
              <div className="space-y-6">
                 <h4 className="text-white font-black text-lg">Detail.</h4>
                 <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us more..."
                    className="w-full h-32 bg-black/40 border border-white/5 rounded-2xl p-4 text-xs text-white outline-none focus:border-brand-primary transition-all resize-none"
                 />
                 <button 
                   onClick={submit}
                   disabled={!message}
                   className="w-full py-4 bg-brand-primary text-white rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50"
                 >
                    Send Feedback <Send size={14} />
                 </button>
                 <button onClick={() => setStep('type')} className="w-full text-center text-[10px] font-black text-slate-600 uppercase tracking-widest hover:text-white transition-colors">Back</button>
              </div>
            )}

            {step === 'success' && (
              <div className="py-12 text-center space-y-4">
                 <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ThumbsUp size={32} />
                 </div>
                 <h4 className="text-white font-black text-xl italic underline decoration-emerald-500/20">Received.</h4>
                 <p className="text-slate-500 text-xs font-medium px-4">Thank you for helping us build the best Java platform.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-brand-primary text-white rounded-full flex items-center justify-center shadow-2xl shadow-brand-primary/20 relative z-[110]"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageSquare size={28} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default FeedbackWidget;
