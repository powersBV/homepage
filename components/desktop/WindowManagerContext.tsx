"use client";

import React, { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';
import { Tool } from '@/lib/tools-data';

// Window state interface
export interface WindowState {
  id: string;
  type: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  isFocused: boolean;
  zIndex: number;
  tool?: Tool;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  centered?: boolean;
  notResizable?: boolean;
  notClosable?: boolean;
  notMinimizable?: boolean;
  titleBarExtra?: React.ReactNode;
}

// Window manager context interface
interface WindowManagerContextType {
  windows: WindowState[];
  activeWindowId: string | null;
  
  // Window actions
  openWindow: (id: string, type: string, title: string, options?: { 
    tool?: Tool; 
    width?: number; 
    height?: number; 
    x?: number; 
    y?: number;
    centered?: boolean;
    notResizable?: boolean;
    notClosable?: boolean;
    notMinimizable?: boolean;
    titleBarExtra?: React.ReactNode;
  }) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  unfocusAllWindows: () => void;
  minimizeAll: () => void;
  cycleWindows: () => void;
  
  // Getters
  getWindow: (id: string) => WindowState | undefined;
  getOpenWindows: () => WindowState[];
  getVisibleWindows: () => WindowState[];
  getMinimizedWindows: () => WindowState[];
  isWindowOpen: (id: string) => boolean;
  isWindowFocused: (id: string) => boolean;
}

// Create the context
const WindowManagerContext = createContext<WindowManagerContextType | undefined>(undefined);

// Provider component
export const WindowManagerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/098c92ed-a44b-4fe3-bd76-b15f37e46396',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/desktop/WindowManagerContext.tsx:55',message:'WindowManagerProvider mount',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
  // #endregion
  
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const zIndexCounter = useRef(100);
  
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/098c92ed-a44b-4fe3-bd76-b15f37e46396',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/desktop/WindowManagerContext.tsx:60',message:'WindowManagerProvider state initialized',data:{windowsCount:windows.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
  // #endregion

  // Open a new window or focus existing one
  const openWindow = useCallback((
    id: string, 
    type: string, 
    title: string, 
    options?: { 
      tool?: Tool; 
      width?: number; 
      height?: number; 
      x?: number; 
      y?: number;
      centered?: boolean;
      notResizable?: boolean;
      notClosable?: boolean;
      notMinimizable?: boolean;
      titleBarExtra?: React.ReactNode;
    }
  ) => {
    setWindows(prev => {
      const existing = prev.find(w => w.id === id);
      if (existing) {
        // Window exists - bring to front and restore if minimized
        zIndexCounter.current++;
        const newZIndex = zIndexCounter.current;
        setActiveWindowId(id);
        return prev.map(w => ({
          ...w,
          isOpen: w.id === id ? true : w.isOpen,
          isMinimized: w.id === id ? false : w.isMinimized,
          isFocused: w.id === id,
          zIndex: w.id === id ? newZIndex : w.zIndex,
        }));
      }
      
      // Create new window
      zIndexCounter.current++;
      const newZIndex = zIndexCounter.current;
      setActiveWindowId(id);
      
      // Calculate position if centered
      let finalX = options?.x;
      let finalY = options?.y;
      
      if (options?.centered && typeof window !== 'undefined') {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const width = options.width || 800;
        const height = options.height || 500;
        finalX = (viewportWidth - width) / 2;
        finalY = (viewportHeight - height) / 2;
      }
      
      return [
        ...prev.map(w => ({ ...w, isFocused: false })),
        {
          id,
          type,
          title,
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          isFocused: true,
          zIndex: newZIndex,
          ...options,
          x: finalX,
          y: finalY,
        },
      ];
    });
  }, []);

  // Close a window
  const closeWindow = useCallback((id: string) => {
    setWindows(prev => {
      const remaining = prev.filter(w => w.id !== id);
      
      // If we closed the active window, activate the next highest z-index window
      if (activeWindowId === id && remaining.length > 0) {
        const highestZWindow = remaining.reduce((max, w) => 
          w.isOpen && !w.isMinimized && w.zIndex > max.zIndex ? w : max
        , remaining[0]);
        
        if (highestZWindow && highestZWindow.isOpen && !highestZWindow.isMinimized) {
          setActiveWindowId(highestZWindow.id);
          return remaining.map(w => ({
            ...w,
            isFocused: w.id === highestZWindow.id,
          }));
        }
      }
      
      if (remaining.length === 0) {
        setActiveWindowId(null);
      }
      
      return remaining;
    });
  }, [activeWindowId]);

  // Minimize a window
  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => {
      const updated = prev.map(w => 
        w.id === id ? { ...w, isMinimized: true, isFocused: false } : w
      );
      
      // Find the next window to focus
      if (activeWindowId === id) {
        const visibleWindows = updated.filter(w => w.isOpen && !w.isMinimized);
        if (visibleWindows.length > 0) {
          const highestZWindow = visibleWindows.reduce((max, w) => 
            w.zIndex > max.zIndex ? w : max
          );
          setActiveWindowId(highestZWindow.id);
          return updated.map(w => ({
            ...w,
            isFocused: w.id === highestZWindow.id,
          }));
        } else {
          setActiveWindowId(null);
        }
      }
      
      return updated;
    });
  }, [activeWindowId]);

  // Toggle maximize state
  const maximizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  }, []);

  // Focus a window (bring to front)
  const focusWindow = useCallback((id: string) => {
    zIndexCounter.current++;
    const newZIndex = zIndexCounter.current;
    setActiveWindowId(id);
    
    setWindows(prev => prev.map(w => ({
      ...w,
      isFocused: w.id === id,
      isMinimized: w.id === id ? false : w.isMinimized, // Restore if minimized
      zIndex: w.id === id ? newZIndex : w.zIndex,
    })));
  }, []);

  // Unfocus all windows (when clicking on desktop)
  const unfocusAllWindows = useCallback(() => {
    setActiveWindowId(null);
    setWindows(prev => prev.map(w => ({ ...w, isFocused: false })));
  }, []);

  // Minimize all windows
  const minimizeAll = useCallback(() => {
    setWindows(prev => prev.map(w => ({ ...w, isMinimized: true, isFocused: false })));
    setActiveWindowId(null);
  }, []);

  // Cycle through windows (bring next window to front)
  const cycleWindows = useCallback(() => {
    const openWindows = windows.filter(w => w.isOpen && !w.isMinimized);
    if (openWindows.length <= 1) return;
    
    const currentIndex = openWindows.findIndex(w => w.isFocused);
    const nextIndex = (currentIndex + 1) % openWindows.length;
    const nextWindow = openWindows[nextIndex];
    
    if (nextWindow) {
      zIndexCounter.current++;
      const newZIndex = zIndexCounter.current;
      setActiveWindowId(nextWindow.id);
      setWindows(prev => prev.map(w => ({
        ...w,
        isFocused: w.id === nextWindow.id,
        zIndex: w.id === nextWindow.id ? newZIndex : w.zIndex,
      })));
    }
  }, [windows]);

  // Get a specific window
  const getWindow = useCallback((id: string) => {
    return windows.find(w => w.id === id);
  }, [windows]);

  // Get all open windows
  const getOpenWindows = useCallback(() => {
    return windows.filter(w => w.isOpen);
  }, [windows]);

  // Get visible (not minimized) windows
  const getVisibleWindows = useCallback(() => {
    return windows.filter(w => w.isOpen && !w.isMinimized);
  }, [windows]);

  // Get minimized windows
  const getMinimizedWindows = useCallback(() => {
    return windows.filter(w => w.isOpen && w.isMinimized);
  }, [windows]);

  // Check if a window is open
  const isWindowOpen = useCallback((id: string) => {
    return windows.some(w => w.id === id && w.isOpen);
  }, [windows]);

  // Check if a window is focused
  const isWindowFocused = useCallback((id: string) => {
    return activeWindowId === id;
  }, [activeWindowId]);

  const value: WindowManagerContextType = {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    unfocusAllWindows,
    minimizeAll,
    cycleWindows,
    getWindow,
    getOpenWindows,
    getVisibleWindows,
    getMinimizedWindows,
    isWindowOpen,
    isWindowFocused,
  };

  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/098c92ed-a44b-4fe3-bd76-b15f37e46396',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/desktop/WindowManagerContext.tsx:310',message:'WindowManagerProvider rendering context',data:{windowsCount:windows.length,hasOpenWindow:!!openWindow},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
  // #endregion

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  );
};

// Hook to use the window manager
export const useWindowManager = (): WindowManagerContextType => {
  const context = useContext(WindowManagerContext);
  if (context === undefined) {
    throw new Error('useWindowManager must be used within a WindowManagerProvider');
  }
  return context;
};

// Hook to check if a specific window is open
export const useIsWindowOpen = (windowId: string): boolean => {
  const { isWindowOpen } = useWindowManager();
  return isWindowOpen(windowId);
};

// Hook to get window state
export const useWindow = (windowId: string): WindowState | undefined => {
  const { getWindow } = useWindowManager();
  return getWindow(windowId);
};
