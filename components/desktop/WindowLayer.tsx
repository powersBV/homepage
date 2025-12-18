"use client";

import React, { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useWindowManager, WindowState } from './WindowManagerContext';
import { Window } from './Window';
import { ExtractWindowContent } from '@/components/windows/ExtractWindow';
import { ProjectsWindowContent } from '@/components/windows/ProjectsWindow';
import { AssistantWindowContent } from '@/components/windows/AssistantWindow';
import { FreeToolsWindowContent } from '@/components/windows/FreeToolsWindow';
import { HelpWindowContent } from '@/components/windows/HelpWindow';
import { AuthWindowContent } from '@/components/windows/AuthWindow';
import { IncomingRFQsContent, getIncomingRFQsBadge } from '@/components/windows/IncomingRFQsWindow';
import { DemandSignalsContent, ThisWeekDropdown } from '@/components/windows/DemandSignalsWindow';
import { WelcomeWindowContent } from '@/components/windows/WelcomeWindow';
import { markWelcomeSeen } from '@/lib/welcome';
import { PsychrometricToolContent } from '@/components/tools/PsychrometricTool';
import { SoundToolContent } from '@/components/tools/SoundTool';
import { ConverterToolContent } from '@/components/tools/ConverterTool';
import { useAuth, User } from '@/contexts/AuthContext';

export const WindowLayer: React.FC = () => {
  const {
    getOpenWindows,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    openWindow,
  } = useWindowManager();

  const openWindows = getOpenWindows();

  // Track dynamic titles and actions for each window
  const [windowTitles, setWindowTitles] = useState<Record<string, string>>({});
  const [windowActions, setWindowActions] = useState<Record<string, React.ReactNode>>({});

  const handleTitleChange = useCallback((windowId: string, title: string) => {
    setWindowTitles(prev => ({ ...prev, [windowId]: title }));
  }, []);

  const handleActionsChange = useCallback((windowId: string, actions: React.ReactNode) => {
    setWindowActions(prev => ({ ...prev, [windowId]: actions }));
  }, []);

  // Handle successful auth login - open persona-specific window
  const handleAuthSuccess = useCallback((user: User) => {
    closeWindow('auth');
    
    // Open persona-specific default window
    switch (user.icp) {
      case 'buyer':
        openWindow('extract', 'extract', 'New Extraction', { width: 560, height: 480 });
        break;
      case 'seller':
        openWindow('incoming-rfqs', 'incoming-rfqs', 'Incoming RFQs', { width: 600, height: 500 });
        break;
      case 'maker':
        openWindow('demand-signals', 'demand-signals', 'Demand Signals', { width: 600, height: 520 });
        break;
    }
  }, [closeWindow, openWindow]);

  // Handle auth required from Extract window
  const handleAuthRequired = useCallback(() => {
    openWindow('auth', 'auth', 'Sign In', { 
      width: 420, 
      height: 480, 
      notResizable: true,
      centered: true 
    });
  }, [openWindow]);

  const renderWindowContent = (win: WindowState) => {
    switch (win.type) {
      case 'extract':
        return (
          <ExtractWindowContent
            onTitleChange={(title) => handleTitleChange(win.id, title)}
            onActionsChange={(actions) => handleActionsChange(win.id, actions)}
            onAuthRequired={handleAuthRequired}
          />
        );
      case 'projects':
        return <ProjectsWindowContent />;
      case 'assistant':
        return <AssistantWindowContent />;
      case 'free-tools':
        return <FreeToolsWindowContent />;
      case 'help':
        return <HelpWindowContent />;
      case 'auth':
        return <AuthWindowContent onLoginSuccess={handleAuthSuccess} />;
      case 'incoming-rfqs':
        return <IncomingRFQsContent />;
      case 'demand-signals':
        return <DemandSignalsContent />;
      case 'welcome':
        return <WelcomeWindowContent />;
      case 'tool-psychrometric':
        return <PsychrometricToolContent />;
      case 'tool-sound':
        return <SoundToolContent />;
      case 'tool-converter':
        return <ConverterToolContent />;
      default:
        return (
          <div className="p-6 text-neutral-600">
            Window content not found for type: {win.type}
          </div>
        );
    }
  };

  const getWindowTitle = (win: WindowState) => {
    // Use dynamic title if available, otherwise use the default
    return windowTitles[win.id] || win.title;
  };

  // Get title bar extra content for specific window types
  const getTitleBarExtra = (win: WindowState) => {
    if (win.titleBarExtra) return win.titleBarExtra;
    
    switch (win.type) {
      case 'incoming-rfqs':
        return getIncomingRFQsBadge();
      case 'demand-signals':
        return <ThisWeekDropdown />;
      default:
        return undefined;
    }
  };

  return (
    <AnimatePresence>
      {openWindows.map(win => (
        <Window
          key={win.id}
          id={win.id}
          title={getWindowTitle(win)}
          isOpen={win.isOpen}
          isMinimized={win.isMinimized}
          isMaximized={win.isMaximized}
          isFocused={win.isFocused}
          zIndex={win.zIndex}
          width={win.width}
          height={win.height}
          x={win.x}
          y={win.y}
          actions={windowActions[win.id]}
          notResizable={win.notResizable}
          notClosable={win.notClosable}
          notMinimizable={win.notMinimizable}
          titleBarExtra={getTitleBarExtra(win)}
          onClose={() => {
            // Mark welcome as seen when closing the welcome window
            if (win.type === 'welcome') {
              markWelcomeSeen();
            }
            closeWindow(win.id);
          }}
          onMinimize={() => minimizeWindow(win.id)}
          onMaximize={() => maximizeWindow(win.id)}
          onFocus={() => focusWindow(win.id)}
        >
          {renderWindowContent(win)}
        </Window>
      ))}
    </AnimatePresence>
  );
};
