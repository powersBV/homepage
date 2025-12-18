"use client";

import { useEffect, useCallback } from 'react';
import { useWindowManager } from '@/components/desktop/WindowManagerContext';

interface KeyboardShortcutsOptions {
  onCloseDropdowns?: () => void;
}

export function useKeyboardShortcuts(options: KeyboardShortcutsOptions = {}) {
  const { 
    openWindow, 
    closeWindow, 
    minimizeWindow, 
    minimizeAll, 
    cycleWindows,
    unfocusAllWindows,
    activeWindowId 
  } = useWindowManager();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const isMod = e.metaKey || e.ctrlKey;
    
    // Escape doesn't need modifier
    if (e.key === 'Escape') {
      e.preventDefault();
      options.onCloseDropdowns?.();
      unfocusAllWindows();
      return;
    }
    
    if (!isMod) return;
    
    // Prevent default browser behavior for our shortcuts
    switch (e.key.toLowerCase()) {
      case 'n':
        e.preventDefault();
        openWindow('extract', 'extract', 'Extract', { width: 800, height: 600 });
        break;
        
      case 'o':
        e.preventDefault();
        openWindow('projects', 'projects', 'Projects', { width: 720, height: 520 });
        break;
        
      case 'd':
        e.preventDefault();
        minimizeAll();
        break;
        
      case 'w':
        e.preventDefault();
        if (activeWindowId) {
          closeWindow(activeWindowId);
        }
        break;
        
      case 'm':
        e.preventDefault();
        if (activeWindowId) {
          minimizeWindow(activeWindowId);
        }
        break;
        
      case '`':
        e.preventDefault();
        cycleWindows();
        break;
        
      case '/':
        e.preventDefault();
        openWindow('help', 'help', 'Keyboard Shortcuts', { width: 500, height: 600 });
        break;
        
      case 's':
        e.preventDefault();
        // TODO(BV-003): Implement save shortcut
        break;
        
      case 'Enter':
        if (e.metaKey || e.ctrlKey) {
          e.preventDefault();
          // TODO(BV-004): Implement full screen shortcut
        }
        break;
    }
  }, [
    openWindow, 
    closeWindow, 
    minimizeWindow, 
    minimizeAll, 
    cycleWindows, 
    unfocusAllWindows, 
    activeWindowId,
    options
  ]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
