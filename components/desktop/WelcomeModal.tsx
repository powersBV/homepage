"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, X, Play } from 'lucide-react';
import { PlatformStack } from './PlatformStack';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGetStarted: () => void;
  onOpenDemo?: () => void;
  onOpenExtractionDemo?: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose, onGetStarted, onOpenDemo, onOpenExtractionDemo }) => {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/098c92ed-a44b-4fe3-bd76-b15f37e46396',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/desktop/WelcomeModal.tsx:17',message:'WelcomeModal render',data:{isOpen},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
  // #endregion
  
  const handleTrySampleDemo = () => {
    onClose();
    onOpenDemo?.();
  };

  const handleViewSampleExtraction = () => {
    onClose();
    onOpenExtractionDemo?.();
  };

  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/098c92ed-a44b-4fe3-bd76-b15f37e46396',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/desktop/WelcomeModal.tsx:28',message:'Before WelcomeModal return',data:{isOpen},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
  // #endregion

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[200]"
            onClick={onClose}
          />
          
          {/* Modal Window - Centered */}
          <div className="fixed inset-0 z-[201] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-[1000px] h-[800px] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Window Chrome */}
              <div className="h-full bg-bv-dark rounded-xl shadow-2xl overflow-hidden flex flex-col border border-gray-700/50">
                {/* Title Bar */}
                <div className="h-10 bg-black/60 border-b border-gray-700/50 flex items-center justify-between px-4 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={onClose}
                        className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
                        aria-label="Close"
                      />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                      <Image src="/logo/icon.png" alt="" width={16} height={16} />
                      <span className="text-sm text-gray-400">Welcome to BuildVision</span>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-6 h-6 rounded hover:bg-white/10 flex items-center justify-center text-gray-500 hover:text-white transition-colors"
                    aria-label="Close"
                  >
                    <X size={14} />
                  </button>
                </div>
                
                {/* Content - No scrolling needed */}
                <div className="flex-1 flex flex-col overflow-hidden">
                  {/* Section 1 - Hero */}
                  <div className="px-8 pt-8 pb-6 shrink-0">
                    <div className="flex items-center gap-2 mb-4">
                      <Image src="/logo/icon.png" alt="BuildVision" width={32} height={32} />
                      <span className="font-bold text-white text-xl">BuildVision</span>
                        </div>
                    <h1 className="text-3xl font-bold text-white mb-3">
                      Stop decoding equipment schedules manually.
                        </h1>
                    <p className="text-lg text-gray-400 mb-6">
                      BuildVision extracts equipment decisions from construction drawings and structures them for procurement.
                    </p>
                    <div className="flex items-center gap-3">
                              <button
                        onClick={handleTrySampleDemo}
                        className="px-6 py-3 bg-bv-primary hover:bg-bv-primary/90 text-white font-semibold rounded-lg flex items-center gap-2 transition-colors"
                      >
                        <Play size={18} />
                        Try Sample Demo
                              </button>
                          <button
                            onClick={onGetStarted}
                        className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-medium rounded-lg flex items-center gap-2 transition-colors"
                          >
                        Sign Up Free
                        <ArrowRight size={18} />
                          </button>
                    </div>
                  </div>
                  
                  {/* Section 2 - Five Authorities Visualization */}
                  <div className="flex-1 min-h-0 px-8 py-2 flex items-center justify-center">
                    <div className="w-full h-full flex items-center justify-center">
                      <PlatformStack />
                    </div>
                  </div>
                  
                  {/* Section 3 - Bottom CTA */}
                  <div className="px-8 pb-8 pt-4 shrink-0 border-t border-gray-700/30">
                    <div className="flex items-center justify-between">
                      <p className="text-gray-400">See how it works</p>
                        <button
                        onClick={handleViewSampleExtraction}
                        className="px-6 py-3 bg-bv-primary/10 hover:bg-bv-primary/20 border border-bv-primary/30 text-bv-primary font-medium rounded-lg flex items-center gap-2 transition-colors"
                        >
                        View Sample Extraction
                          <ArrowRight size={18} />
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
