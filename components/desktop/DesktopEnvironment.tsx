"use client";

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { tools, Tool } from '@/lib/tools-data';
import { iconMap } from '../icons/ToolIcons';
import { Header } from './Header';
import { DesktopIcon, FolderIcon, DocumentIcon, VideoIcon, ChatIcon, CalculatorIcon, HomeIcon, StarIcon, ChangelogIcon, BuildingIcon, BriefcaseIcon, TrashIcon, IntegrationIcon, TourIcon, WhyIcon, ProductOSIcon, SignUpIcon, NetworkIcon } from './DesktopIcon';
import { Window } from './Window';
import { Dock, DockLogoIcon, DockProductOSIcon } from './Dock';
import { CenterIllustration } from './CenterIllustration';
import { ChatBotContent, ChatBotDockIcon } from './ChatBot';
import { useWindowManager, WindowManagerProvider, WindowState } from './WindowManagerContext';
import { ContextMenu, ContextMenuItem } from './ContextMenu';
import {
  ToolDetailContent,
  ProductOSContent,
  PricingContent,
  TourContent,
  AboutContent,
  CustomersContent,
  DocsContent,
  DemoContent,
  DemoWindowContent,
  ContactContent,
  IntegrationsContent,
  ChangelogContent,
  CareersContent,
  HomeContent,
  WhyBuildVisionContent,
  SignUpContent,
  NetworkContent,
} from './WindowContents';

interface DesktopEnvironmentProps {
  onShowWelcome?: () => void;
  onWindowManagerReady?: (openWindow: (id: string, type: string, title: string, options?: { width?: number; height?: number }) => void) => void;
}

// Inner component that uses the window manager context
const DesktopEnvironmentInner: React.FC<DesktopEnvironmentProps> = ({ onShowWelcome, onWindowManagerReady }) => {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/098c92ed-a44b-4fe3-bd76-b15f37e46396',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/desktop/DesktopEnvironment.tsx:41',message:'DesktopEnvironmentInner mount',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
  // #endregion
  
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [desktopContextMenu, setDesktopContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [iconContextMenu, setIconContextMenu] = useState<{ x: number; y: number; iconId: string } | null>(null);
  
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/098c92ed-a44b-4fe3-bd76-b15f37e46396',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/desktop/DesktopEnvironment.tsx:48',message:'Before useWindowManager hook',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
  // #endregion
  
  const {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    unfocusAllWindows,
    getOpenWindows,
  } = useWindowManager();
  
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/098c92ed-a44b-4fe3-bd76-b15f37e46396',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/desktop/DesktopEnvironment.tsx:60',message:'After useWindowManager hook',data:{windowsCount:windows.length,hasOpenWindow:!!openWindow},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
  // #endregion

  // Expose openWindow to parent via callback
  React.useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/098c92ed-a44b-4fe3-bd76-b15f37e46396',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/desktop/DesktopEnvironment.tsx:75',message:'WindowManagerReady effect',data:{hasCallback:!!onWindowManagerReady,hasOpenWindow:!!openWindow},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    if (onWindowManagerReady) {
      try {
        onWindowManagerReady(openWindow);
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/098c92ed-a44b-4fe3-bd76-b15f37e46396',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/desktop/DesktopEnvironment.tsx:80',message:'WindowManagerReady callback executed',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
        // #endregion
      } catch (error) {
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/098c92ed-a44b-4fe3-bd76-b15f37e46396',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/desktop/DesktopEnvironment.tsx:84',message:'Error in WindowManagerReady callback',data:{error:error instanceof Error ? error.message : String(error)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
        // #endregion
        throw error;
      }
    }
  }, [openWindow, onWindowManagerReady]);

  const handleDesktopClick = () => {
    setSelectedIcon(null);
    unfocusAllWindows();
    setDesktopContextMenu(null);
    setIconContextMenu(null);
  };

  const handleDesktopContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setDesktopContextMenu({ x: e.clientX, y: e.clientY });
  };

  const desktopMenuItems: ContextMenuItem[] = [
    {
      id: 'refresh',
      label: 'Refresh',
      onClick: () => {
        // Refresh action - could reload icons or reset state
        console.log('Refresh desktop');
      },
    },
    {
      id: 'sort',
      label: 'Sort Icons By',
      submenu: [
        {
          id: 'sort-name',
          label: 'Name',
          onClick: () => console.log('Sort by name'),
        },
        {
          id: 'sort-type',
          label: 'Type',
          onClick: () => console.log('Sort by type'),
        },
        {
          id: 'sort-date',
          label: 'Date',
          onClick: () => console.log('Sort by date'),
        },
      ],
    },
    { id: 'divider-1', divider: true },
    {
      id: 'about',
      label: 'About BuildVision',
      onClick: () => {
        openWindow('about', 'about', 'About BuildVision', { width: 1200, height: 650 });
      },
    },
  ];

  const handleIconContextMenu = (iconId: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setIconContextMenu({ x: e.clientX, y: e.clientY, iconId });
  };

  const getIconMenuItems = (iconId: string): ContextMenuItem[] => {
    const icon = [...leftTopIcons, ...leftBottomIcons, ...featuredTools.map(t => ({
      id: t.id,
      label: t.name,
      action: () => handleToolSelect(t),
    }))].find(i => i.id === iconId);

    return [
      {
        id: 'open',
        label: 'Open',
        onClick: () => {
          if (icon) icon.action();
        },
      },
      {
        id: 'info',
        label: 'Get Info',
        onClick: () => {
          console.log(`Info for ${iconId}`);
        },
      },
      {
        id: 'dock',
        label: 'Add to Dock',
        onClick: () => {
          console.log(`Add ${iconId} to dock`);
        },
      },
    ];
  };

  const handleNavClick = (section: string) => {
    const navMap: Record<string, { id: string; type: string; title: string; width?: number; height?: number }> = {
      'product-os': { id: 'product-os', type: 'product-os', title: 'Product OS', width: 1400, height: 750 },
      pricing: { id: 'pricing', type: 'pricing', title: 'Pricing', width: 1300, height: 700 },
      docs: { id: 'docs', type: 'docs', title: 'Documentation', width: 1300, height: 700 },
      about: { id: 'about', type: 'about', title: 'About BuildVision', width: 1200, height: 650 },
    };
    const nav = navMap[section];
    if (nav) openWindow(nav.id, nav.type, nav.title, { width: nav.width, height: nav.height });
  };

  const handleToolSelect = (tool: Tool) => {
    openWindow(`tool-${tool.id}`, 'tool', tool.name, { tool, width: 1200, height: 700 });
  };
  
  const handleFileUpload = (files: FileList) => {
    // Open Product OS with the uploaded file context
    console.log('Files uploaded:', files);
    openWindow('product-os', 'product-os', 'Product OS', { width: 1400, height: 750 });
  };

  // Featured tools for quick access on desktop
  const featuredTools = tools.filter(t => 
    ['ai-takeoff', 'spec-writer', 'selection-copilot', 'analytics-dashboard'].includes(t.id)
  );

  // Left side icons (top section)
  const leftTopIcons = [
    { id: 'home', label: 'Welcome', icon: <HomeIcon />, action: () => onShowWelcome?.() },
    { id: 'product-os', label: 'Product OS', icon: <ProductOSIcon />, action: () => openWindow('product-os', 'product-os', 'Product OS', { width: 1400, height: 750 }) },
    { id: 'pricing', label: 'Pricing', icon: <CalculatorIcon />, action: () => openWindow('pricing', 'pricing', 'Pricing', { width: 1300, height: 700 }) },
    { id: 'customers', label: 'Case Studies', icon: <StarIcon />, action: () => openWindow('customers', 'customers', 'Customer Stories', { width: 1300, height: 700 }) },
  ];

  // Left side icons (bottom section)
  const leftBottomIcons = [
    { id: 'demo', label: 'Demo', icon: <VideoIcon />, action: () => openWindow('demo', 'demo', 'Demo Video', { width: 1400, height: 750 }) },
    { id: 'docs', label: 'Docs', icon: <DocumentIcon />, action: () => openWindow('docs', 'docs', 'Documentation', { width: 1300, height: 700 }) },
    { id: 'contact', label: 'Contact', icon: <ChatIcon />, action: () => openWindow('contact', 'contact', 'Contact Us', { width: 1200, height: 650 }) },
  ];

  // Right side icons - top group (main actions)
  const rightTopIcons = [
    { id: 'signup', label: 'Sign Up / Sign In', icon: <SignUpIcon />, action: () => openWindow('signup', 'signup', 'Get Started', { width: 1100, height: 750 }) },
    { id: 'why', label: 'Why BuildVision?', icon: <WhyIcon />, action: () => openWindow('why', 'why', 'Why BuildVision?', { width: 1400, height: 750 }) },
    { id: 'tour', label: 'Getting Started', icon: <TourIcon />, action: () => openWindow('tour', 'tour', 'How It Works', { width: 1300, height: 700 }) },
    { id: 'network', label: 'Network', icon: <NetworkIcon />, action: () => openWindow('network', 'network', 'Network', { width: 1200, height: 650 }) },
  ];
  
  // Right side icons - lower group (info/resources)
  const rightBottomIcons = [
    { id: 'integrations', label: 'Integrations', icon: <IntegrationIcon />, action: () => openWindow('integrations', 'integrations', 'Integrations', { width: 1300, height: 700 }) },
    { id: 'changelog', label: 'Changelog', icon: <ChangelogIcon />, action: () => openWindow('changelog', 'changelog', 'Changelog', { width: 1200, height: 700 }) },
    { id: 'about', label: 'About Us', icon: <BuildingIcon />, action: () => openWindow('about', 'about', 'About BuildVision', { width: 1200, height: 650 }) },
    { id: 'careers', label: 'Work Here', icon: <BriefcaseIcon />, action: () => openWindow('careers', 'careers', 'Careers', { width: 1200, height: 700 }) },
  ];

  // Dock items
  const dockItems = [
    { id: 'dock-home', label: 'Welcome', icon: <DockLogoIcon />, onClick: () => onShowWelcome?.() },
    { id: 'dock-product-os', label: 'Product OS', icon: <DockProductOSIcon />, isOpen: windows.some(w => w.id === 'product-os' && w.isOpen), onClick: () => openWindow('product-os', 'product-os', 'Product OS', { width: 1400, height: 750 }) },
    { id: 'dock-chat', label: 'AI Assistant', icon: <ChatBotDockIcon />, isOpen: windows.some(w => w.id === 'chatbot' && w.isOpen), onClick: () => openWindow('chatbot', 'chatbot', 'BuildVision AI', { width: 900, height: 700 }) },
  ];

  // Get windows from context
  const openWindowsList = getOpenWindows();

  const renderWindowContent = (win: WindowState) => {
    switch (win.type) {
      case 'tool':
        return win.tool ? <ToolDetailContent tool={win.tool} /> : null;
      case 'product-os':
        return <ProductOSContent onToolSelect={handleToolSelect} />;
      case 'chatbot':
        return <ChatBotContent onToolSelect={handleToolSelect} />;
      case 'pricing':
        return <PricingContent />;
      case 'tour':
        return <TourContent />;
      case 'about':
        return <AboutContent />;
      case 'customers':
        return <CustomersContent />;
      case 'docs':
        return <DocsContent />;
      case 'demo':
        return <DemoContent />;
      case 'demo-extraction':
        return <DemoWindowContent />;
      case 'contact':
        return <ContactContent />;
      case 'integrations':
        return <IntegrationsContent />;
      case 'changelog':
        return <ChangelogContent />;
      case 'careers':
        return <CareersContent />;
      case 'home':
        return <HomeContent />;
      case 'why':
        return <WhyBuildVisionContent />;
      case 'signup':
        return <SignUpContent />;
      case 'network':
        return <NetworkContent />;
      default:
        return <div className="p-6 text-gray-400">Content not found</div>;
    }
  };

  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/098c92ed-a44b-4fe3-bd76-b15f37e46396',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/desktop/DesktopEnvironment.tsx:177',message:'Before DesktopEnvironmentInner render',data:{windowsCount:windows.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
  // #endregion
  
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-bv-dark">
      {/* Header */}
      <Header onNavClick={handleNavClick} onToolSelect={handleToolSelect} />
      
      {/* Desktop Area */}
      <main 
        className="flex-1 relative blueprint-grid"
        onClick={handleDesktopClick}
        onContextMenu={handleDesktopContextMenu}
        role="main"
        aria-label="Desktop environment"
      >
        {/* Left side icons - top group */}
        <div className="absolute left-4 top-4 flex flex-col gap-1 z-10">
          {leftTopIcons.map(icon => (
            <DesktopIcon
              key={icon.id}
              id={icon.id}
              label={icon.label}
              icon={icon.icon}
              isSelected={selectedIcon === icon.id}
              onSelect={() => setSelectedIcon(icon.id)}
              onDoubleClick={icon.action}
              onContextMenu={handleIconContextMenu(icon.id)}
            />
          ))}
        </div>
        
        {/* Left side icons - bottom group */}
        <div className="absolute left-4 bottom-24 flex flex-col gap-1 z-10">
          {leftBottomIcons.map(icon => (
            <DesktopIcon
              key={icon.id}
              id={icon.id}
              label={icon.label}
              icon={icon.icon}
              isSelected={selectedIcon === icon.id}
              onSelect={() => setSelectedIcon(icon.id)}
              onDoubleClick={icon.action}
              onContextMenu={handleIconContextMenu(icon.id)}
            />
          ))}
        </div>
        
        {/* Featured tools - second column from left */}
        <div className="absolute left-[100px] top-4 flex flex-col gap-1 z-10">
          {featuredTools.map(tool => {
            const IconComponent = iconMap[tool.id];
            return (
              <DesktopIcon
                key={tool.id}
                id={tool.id}
                label={tool.name}
                icon={
                  <div className="w-10 h-10 text-purple-400">
                    {IconComponent && <IconComponent size={40} />}
                  </div>
                }
                isSelected={selectedIcon === tool.id}
                onSelect={() => setSelectedIcon(tool.id)}
                onDoubleClick={() => handleToolSelect(tool)}
              />
            );
          })}
        </div>
        
        {/* Right side icons - top group (main actions) */}
        <div className="absolute right-4 top-4 flex flex-col gap-1 z-10">
          {rightTopIcons.map(icon => (
            <DesktopIcon
              key={icon.id}
              id={icon.id}
              label={icon.label}
              icon={icon.icon}
              isSelected={selectedIcon === icon.id}
              onSelect={() => setSelectedIcon(icon.id)}
              onDoubleClick={icon.action}
              onContextMenu={handleIconContextMenu(icon.id)}
            />
          ))}
        </div>
        
        {/* Right side icons - second column (resources) */}
        <div className="absolute right-[100px] top-4 flex flex-col gap-1 z-10">
          {rightBottomIcons.map(icon => (
            <DesktopIcon
              key={icon.id}
              id={icon.id}
              label={icon.label}
              icon={icon.icon}
              isSelected={selectedIcon === icon.id}
              onSelect={() => setSelectedIcon(icon.id)}
              onDoubleClick={icon.action}
              onContextMenu={handleIconContextMenu(icon.id)}
            />
          ))}
        </div>
        
        {/* Trash (bottom right) */}
        <div className="absolute right-4 bottom-24 z-10">
          <DesktopIcon
            id="trash"
            label="Recycle Bin"
            icon={<TrashIcon isEmpty />}
            isSelected={selectedIcon === 'trash'}
            onSelect={() => setSelectedIcon('trash')}
            onDoubleClick={() => {}}
          />
        </div>
        
        {/* Center Illustration */}
        <CenterIllustration />
        
        {/* Windows */}
        <AnimatePresence>
          {openWindowsList.map(win => (
            <Window
              key={win.id}
              id={win.id}
              title={win.title}
              isOpen={win.isOpen}
              isMinimized={win.isMinimized}
              isMaximized={win.isMaximized}
              isFocused={win.isFocused}
              zIndex={win.zIndex}
              width={win.width}
              height={win.height}
              x={win.x}
              y={win.y}
              onClose={() => closeWindow(win.id)}
              onMinimize={() => minimizeWindow(win.id)}
              onMaximize={() => maximizeWindow(win.id)}
              onFocus={() => focusWindow(win.id)}
            >
              {renderWindowContent(win)}
            </Window>
          ))}
        </AnimatePresence>
        
        {/* Dock */}
        <Dock
          items={dockItems}
          openWindows={openWindowsList.map(w => ({ id: w.id, title: w.title, isMinimized: w.isMinimized }))}
          onWindowClick={focusWindow}
          onWindowClose={closeWindow}
          onFileUpload={handleFileUpload}
        />

        {/* Desktop Context Menu */}
        {desktopContextMenu && (
          <ContextMenu
            items={desktopMenuItems}
            position={desktopContextMenu}
            onClose={() => setDesktopContextMenu(null)}
          />
        )}

        {/* Icon Context Menu */}
        {iconContextMenu && (
          <ContextMenu
            items={getIconMenuItems(iconContextMenu.iconId)}
            position={{ x: iconContextMenu.x, y: iconContextMenu.y }}
            onClose={() => setIconContextMenu(null)}
          />
        )}
      </main>
    </div>
  );
};

// Main export that wraps with WindowManagerProvider
export const DesktopEnvironment: React.FC<DesktopEnvironmentProps> = (props) => {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/098c92ed-a44b-4fe3-bd76-b15f37e46396',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/desktop/DesktopEnvironment.tsx:436',message:'DesktopEnvironment wrapper render',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  
  return (
    <WindowManagerProvider>
      <DesktopEnvironmentInner {...props} />
    </WindowManagerProvider>
  );
};
