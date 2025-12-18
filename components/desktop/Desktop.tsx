"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useWindowManager, WindowManagerProvider } from './WindowManagerContext';
import { MenuBar } from './MenuBar';
import { Dock } from './Dock';
import { WindowLayer } from './WindowLayer';
import { SnapPreview } from './SnapPreview';
import { ToastProvider } from '@/contexts/ToastContext';
import { SnapProvider } from '@/contexts/SnapContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { ToastContainer } from '@/components/ui/ToastContainer';
import { MobileNotice } from '@/components/ui/MobileNotice';
import { hasSeenWelcome } from '@/lib/welcome';

type ViewportSize = 'mobile' | 'tablet' | 'desktop';

// Inner component that uses the window manager context
const DesktopInner: React.FC = () => {
  const { 
    unfocusAllWindows, 
    openWindow, 
    windows, 
    getOpenWindows, 
    focusWindow, 
    closeWindow 
  } = useWindowManager();
  const { user } = useAuth();
  const initializedRef = useRef(false);

  // Initialize windows on mount
  useEffect(() => {
    // Only run once on mount
    if (initializedRef.current || windows.length > 0) return;
    initializedRef.current = true;

    // Logged-in user: persona-specific window
    if (user) {
      switch (user.icp) {
        case 'buyer':
          openWindow('extract', 'extract', 'New Extraction', { 
            width: 560, 
            height: 480, 
            centered: true 
          });
          break;
        case 'seller':
          openWindow('incoming-rfqs', 'incoming-rfqs', 'Incoming RFQs', { 
            width: 600, 
            height: 500, 
            centered: true 
          });
          break;
        case 'maker':
          openWindow('demand-signals', 'demand-signals', 'Demand Signals', { 
            width: 600, 
            height: 520, 
            centered: true 
          });
          break;
        default:
          openWindow('extract', 'extract', 'New Extraction', { 
            width: 560, 
            height: 480, 
            centered: true 
          });
      }
      return;
    }

    // First-time visitor: Welcome + Extract
    if (!hasSeenWelcome()) {
      openWindow('extract', 'extract', 'New Extraction', { 
        width: 560, 
        height: 480, 
        centered: true 
      });
      openWindow('welcome', 'welcome', 'Welcome to BuildVision', { 
        width: 640, 
        height: 560, 
        centered: true,
        notMinimizable: true
      });
    } else {
      // Returning visitor: just Extract
      openWindow('extract', 'extract', 'New Extraction', { 
        width: 560, 
        height: 480, 
        centered: true 
      });
    }
  }, [user, openWindow, windows.length]);

  const handleDesktopClick = () => {
    unfocusAllWindows();
  };

  return (
    <div className="h-screen w-screen bg-neutral-50 flex flex-col font-sans">
      {/* Menu Bar */}
      <MenuBar />
      
      {/* Desktop Surface */}
      <main 
        className="flex-1 relative overflow-hidden"
        onClick={handleDesktopClick}
        role="main"
        aria-label="Desktop environment"
      >
        {/* Snap Preview Overlay */}
        <SnapPreview />
        
        {/* Windows render here */}
        <WindowLayer />
      </main>
      
      {/* Dock */}
      <Dock
        items={[]}
        openWindows={getOpenWindows().map(w => ({ 
          id: w.id, 
          title: w.title, 
          isMinimized: w.isMinimized 
        }))}
        onWindowClick={focusWindow}
        onWindowClose={closeWindow}
      />
    </div>
  );
};

// Responsive wrapper component
const ResponsiveDesktop: React.FC = () => {
  const [viewportSize, setViewportSize] = useState<ViewportSize>('desktop');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const checkViewport = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setViewportSize('mobile');
      } else if (width < 1024) {
        setViewportSize('tablet');
      } else {
        setViewportSize('desktop');
      }
    };

    // Debounce resize handler
    let timeoutId: NodeJS.Timeout;
    const debouncedCheck = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkViewport, 100);
    };

    checkViewport();
    window.addEventListener('resize', debouncedCheck);

    return () => {
      window.removeEventListener('resize', debouncedCheck);
      clearTimeout(timeoutId);
    };
  }, []);

  // Show loading state during SSR
  if (!isClient) {
    return (
      <div className="h-screen w-screen bg-neutral-50 flex items-center justify-center">
        <div className="animate-pulse text-neutral-400">Loading...</div>
      </div>
    );
  }

  // Show mobile notice for small screens
  if (viewportSize === 'mobile') {
    return <MobileNotice />;
  }

  return (
    <AuthProvider>
      <ToastProvider>
        <SnapProvider>
          <WindowManagerProvider>
            <DesktopInner />
            <ToastContainer />
          </WindowManagerProvider>
        </SnapProvider>
      </ToastProvider>
    </AuthProvider>
  );
};

// Main export
export const Desktop: React.FC = () => {
  return <ResponsiveDesktop />;
};
