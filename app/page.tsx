"use client";

import React, { useState, useRef } from 'react';
import { DesktopEnvironment } from '@/components/desktop';
import { WelcomeModal } from '@/components/desktop/WelcomeModal';

export default function Home() {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/098c92ed-a44b-4fe3-bd76-b15f37e46396',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/page.tsx:7',message:'Home component entry',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  
  const [showWelcome, setShowWelcome] = useState(true);
  const openWindowRef = useRef<((id: string, type: string, title: string, options?: { width?: number; height?: number }) => void) | null>(null);
  
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/098c92ed-a44b-4fe3-bd76-b15f37e46396',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/page.tsx:11',message:'State initialized',data:{showWelcome},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion

  const handleGetStarted = () => {
    setShowWelcome(false);
  };

  const handleShowWelcome = () => {
    setShowWelcome(true);
  };

  const handleOpenDemo = () => {
    if (openWindowRef.current) {
      openWindowRef.current('demo', 'demo', 'Demo Video', { width: 1400, height: 750 });
    }
  };

  const handleOpenExtractionDemo = () => {
    if (openWindowRef.current) {
      openWindowRef.current('demo-extraction', 'demo-extraction', 'Sample Extraction', { width: 1600, height: 900 });
    }
  };

  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/098c92ed-a44b-4fe3-bd76-b15f37e46396',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/page.tsx:31',message:'Before render return',data:{showWelcome},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  
  try {
    return (
      <>
        {/* #region agent log */}
        {(() => { fetch('http://127.0.0.1:7243/ingest/098c92ed-a44b-4fe3-bd76-b15f37e46396',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/page.tsx:35',message:'Rendering DesktopEnvironment',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{}); return null; })()}
        {/* #endregion */}
        <DesktopEnvironment 
          onShowWelcome={handleShowWelcome}
          onWindowManagerReady={(openWindow) => {
            // #region agent log
            fetch('http://127.0.0.1:7243/ingest/098c92ed-a44b-4fe3-bd76-b15f37e46396',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/page.tsx:38',message:'WindowManager ready callback',data:{hasOpenWindow:!!openWindow},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
            // #endregion
            openWindowRef.current = openWindow;
          }}
        />
        {/* #region agent log */}
        {(() => { fetch('http://127.0.0.1:7243/ingest/098c92ed-a44b-4fe3-bd76-b15f37e46396',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/page.tsx:45',message:'Rendering WelcomeModal',data:{isOpen:showWelcome},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{}); return null; })()}
        {/* #endregion */}
        <WelcomeModal 
          isOpen={showWelcome} 
          onClose={() => setShowWelcome(false)}
          onGetStarted={handleGetStarted}
          onOpenDemo={handleOpenDemo}
          onOpenExtractionDemo={handleOpenExtractionDemo}
        />
      </>
    );
  } catch (error) {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/098c92ed-a44b-4fe3-bd76-b15f37e46396',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/page.tsx:56',message:'Error in Home render',data:{error:error instanceof Error ? error.message : String(error)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    throw error;
  }
}
