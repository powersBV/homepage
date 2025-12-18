"use client";

import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/098c92ed-a44b-4fe3-bd76-b15f37e46396',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/providers/Providers.tsx:7',message:'Providers component render',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'E'})}).catch(()=>{});
  // #endregion
  
  return (
    <AuthProvider>
      {/* #region agent log */}
      {(() => { fetch('http://127.0.0.1:7243/ingest/098c92ed-a44b-4fe3-bd76-b15f37e46396',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/providers/Providers.tsx:12',message:'Rendering AuthProvider children',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'E'})}).catch(()=>{}); return null; })()}
      {/* #endregion */}
      {children}
    </AuthProvider>
  );
};
