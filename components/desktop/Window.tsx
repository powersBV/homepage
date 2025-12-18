"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Square, Copy } from 'lucide-react';
import { ContextMenu, ContextMenuItem } from './ContextMenu';

export interface WindowProps {
  id: string;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  isFocused: boolean;
  zIndex: number;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  actions?: React.ReactNode;
  notResizable?: boolean;
  notClosable?: boolean;
  notMinimizable?: boolean;
  titleBarExtra?: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
}

// Buffer around edges (header ~56px top, dock ~80px bottom, sides 24px)
const BUFFER = {
  top: 60,      // Header + padding
  bottom: 90,   // Dock + padding
  left: 0,      // No padding when maximized
  right: 0,     // No padding when maximized
};

// Normal window margins
const NORMAL_MARGIN = {
  top: 60,
  bottom: 100,
  left: 20,
  right: 20,
};

export const Window: React.FC<WindowProps> = ({
  title,
  icon,
  children,
  isOpen,
  isMinimized,
  isMaximized,
  isFocused,
  zIndex,
  actions,
  notResizable = false,
  notClosable = false,
  notMinimizable = false,
  titleBarExtra,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
}) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const titleBarRef = useRef<HTMLDivElement>(null);
  
  // Track window dimensions and position
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hasInitialized, setHasInitialized] = useState(false);
  
  // Resize state
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  const [resizeStart, setResizeStart] = useState({ 
    x: 0, 
    y: 0, 
    width: 0, 
    height: 0, 
    left: 0, 
    top: 0 
  });
  
  // Minimum window size
  const MIN_WIDTH = 320;
  const MIN_HEIGHT = 240;
  
  // Store previous state for restore after maximize
  const [preMaximizeState, setPreMaximizeState] = useState<{
    width: number;
    height: number;
    x: number;
    y: number;
  } | null>(null);

  // Context menu state
  const [titleBarContextMenu, setTitleBarContextMenu] = useState<{ x: number; y: number } | null>(null);

  // Calculate maximized dimensions
  const getMaximizedDimensions = useCallback(() => {
    if (typeof window === 'undefined') return { width: 800, height: 500, x: 0, y: BUFFER.top };
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    return {
      width: viewportWidth - BUFFER.left - BUFFER.right,
      height: viewportHeight - BUFFER.top - BUFFER.bottom,
      x: BUFFER.left,
      y: BUFFER.top,
    };
  }, []);

  // Calculate initial dimensions and center position
  useEffect(() => {
    const calculateDimensions = () => {
      if (typeof window !== 'undefined') {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Calculate available space with normal margins
        const availableWidth = viewportWidth - NORMAL_MARGIN.left - NORMAL_MARGIN.right;
        const availableHeight = viewportHeight - NORMAL_MARGIN.top - NORMAL_MARGIN.bottom;
        
        // Window takes up most of available space but with some margin
        const width = Math.min(Math.max(600, availableWidth - 100), 1400);
        const height = Math.min(Math.max(400, availableHeight - 50), 800);
        
        if (!isMaximized) {
          setDimensions({ width, height });
        }
        
        // Only set initial position if not already initialized
        if (!hasInitialized) {
          // Center in viewport
          const x = Math.max(NORMAL_MARGIN.left, (viewportWidth - width) / 2);
          const y = Math.max(NORMAL_MARGIN.top, (viewportHeight - height) / 2);
          setPosition({ x, y });
          setHasInitialized(true);
        }
      }
    };

    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);
    return () => window.removeEventListener('resize', calculateDimensions);
  }, [hasInitialized, isMaximized]);

  // Handle maximize state changes
  useEffect(() => {
    if (isMaximized) {
      // Store current state before maximizing
      if (!preMaximizeState) {
        setPreMaximizeState({
          width: dimensions.width,
          height: dimensions.height,
          x: position.x,
          y: position.y,
        });
      }
      // Set maximized dimensions
      const maxDims = getMaximizedDimensions();
      setDimensions({ width: maxDims.width, height: maxDims.height });
      setPosition({ x: maxDims.x, y: maxDims.y });
    } else if (preMaximizeState) {
      // Restore previous state
      setDimensions({ width: preMaximizeState.width, height: preMaximizeState.height });
      setPosition({ x: preMaximizeState.x, y: preMaximizeState.y });
      setPreMaximizeState(null);
    }
  }, [isMaximized, getMaximizedDimensions, preMaximizeState, dimensions.width, dimensions.height, position.x, position.y]);

  // Constrain position to viewport bounds
  const constrainPosition = useCallback((x: number, y: number) => {
    if (typeof window === 'undefined') return { x, y };
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Keep at least 100px of the window visible on each edge
    const minVisibleX = 100;
    const minVisibleY = 44; // Title bar height
    
    const constrainedX = Math.max(
      -dimensions.width + minVisibleX,
      Math.min(x, viewportWidth - minVisibleX)
    );
    
    const constrainedY = Math.max(
      NORMAL_MARGIN.top,
      Math.min(y, viewportHeight - minVisibleY)
    );
    
    return { x: constrainedX, y: constrainedY };
  }, [dimensions.width]);

  // Constrain dimensions to minimum size
  const constrainDimensions = useCallback((width: number, height: number) => {
    return {
      width: Math.max(MIN_WIDTH, width),
      height: Math.max(MIN_HEIGHT, height),
    };
  }, []);

  // Handle resize start
  const handleResizeStart = useCallback((e: React.MouseEvent, handle: string) => {
    if (isMaximized) return; // Don't allow resizing when maximized
    
    e.preventDefault();
    e.stopPropagation();
    
    setIsResizing(true);
    setResizeHandle(handle);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: dimensions.width,
      height: dimensions.height,
      left: position.x,
      top: position.y,
    });
    onFocus();
  }, [isMaximized, dimensions, position, onFocus]);

  // Mouse down handler for drag start
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Only start drag if clicking on title bar (not on buttons) and not maximized
    if ((e.target as HTMLElement).closest('button')) return;
    if ((e.target as HTMLElement).closest('[data-resize-handle]')) return; // Don't drag if clicking resize handle
    if (isMaximized) return; // Don't allow dragging when maximized
    if (isResizing) return; // Don't drag while resizing
    
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    onFocus();
  }, [position, onFocus, isMaximized, isResizing]);

  // Handle title bar context menu
  const handleTitleBarContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setTitleBarContextMenu({ x: e.clientX, y: e.clientY });
  }, []);

  // Window context menu items
  const windowMenuItems: ContextMenuItem[] = [
    {
      id: 'minimize',
      label: 'Minimize',
      shortcut: '⌘M',
      onClick: () => {
        onMinimize();
        setTitleBarContextMenu(null);
      },
    },
    {
      id: 'maximize',
      label: 'Maximize',
      onClick: () => {
        onMaximize();
        setTitleBarContextMenu(null);
      },
    },
    {
      id: 'close',
      label: 'Close',
      shortcut: '⌘W',
      onClick: () => {
        onClose();
        setTitleBarContextMenu(null);
      },
    },
    { id: 'divider-1', divider: true },
    {
      id: 'move-left',
      label: 'Move to Left Half',
      onClick: () => {
        if (typeof window !== 'undefined') {
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;
          setPosition({ x: 0, y: BUFFER.top });
          setDimensions({ width: viewportWidth / 2, height: viewportHeight - BUFFER.top - BUFFER.bottom });
        }
        setTitleBarContextMenu(null);
      },
    },
    {
      id: 'move-right',
      label: 'Move to Right Half',
      onClick: () => {
        if (typeof window !== 'undefined') {
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;
          setPosition({ x: viewportWidth / 2, y: BUFFER.top });
          setDimensions({ width: viewportWidth / 2, height: viewportHeight - BUFFER.top - BUFFER.bottom });
        }
        setTitleBarContextMenu(null);
      },
    },
    {
      id: 'center',
      label: 'Center',
      onClick: () => {
        if (typeof window !== 'undefined') {
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;
          setPosition({ 
            x: (viewportWidth - dimensions.width) / 2, 
            y: (viewportHeight - dimensions.height) / 2 
          });
        }
        setTitleBarContextMenu(null);
      },
    },
  ];

  // Double-click title bar to maximize/restore
  const handleTitleBarDoubleClick = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    e.preventDefault();
    e.stopPropagation();
    onMaximize();
  }, [onMaximize]);

  // Mouse move handler for resizing
  useEffect(() => {
    if (!isResizing || !resizeHandle) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;
      
      let newWidth = resizeStart.width;
      let newHeight = resizeStart.height;
      let newX = resizeStart.left;
      let newY = resizeStart.top;

      // Calculate new dimensions based on resize handle
      if (resizeHandle.includes('e')) {
        // Right edge: width increases as mouse moves right
        newWidth = resizeStart.width + deltaX;
      }
      if (resizeHandle.includes('w')) {
        // Left edge: width decreases as mouse moves left, position moves left
        newWidth = resizeStart.width - deltaX;
        newX = resizeStart.left + deltaX;
      }
      if (resizeHandle.includes('s')) {
        // Bottom edge: height increases as mouse moves down
        newHeight = resizeStart.height + deltaY;
      }
      if (resizeHandle.includes('n')) {
        // Top edge: height decreases as mouse moves up, position moves up
        newHeight = resizeStart.height - deltaY;
        newY = resizeStart.top + deltaY;
      }

      // Apply minimum size constraints
      const constrained = constrainDimensions(newWidth, newHeight);
      
      // Recalculate position for left/top edges after applying constraints
      if (resizeHandle.includes('w')) {
        // Left edge: position = original left + (original width - new width)
        newX = resizeStart.left + (resizeStart.width - constrained.width);
      }
      if (resizeHandle.includes('n')) {
        // Top edge: position = original top + (original height - new height)
        newY = resizeStart.top + (resizeStart.height - constrained.height);
      }

      setDimensions(constrained);
      
      // Update position for left/top edges or corners
      if (resizeHandle.includes('w') || resizeHandle.includes('n')) {
        const constrainedPos = constrainPosition(newX, newY);
        setPosition(constrainedPos);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizeHandle(null);
    };

    // Add listeners to document for smooth resizing even outside window
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, resizeHandle, resizeStart, constrainDimensions, constrainPosition]);

  // Mouse move handler for dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      const constrained = constrainPosition(newX, newY);
      setPosition(constrained);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    // Add listeners to document for smooth dragging even outside window
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, constrainPosition]);

  // Get animation variants based on state
  const getAnimationVariants = () => {
    if (isMinimized) {
      return {
        initial: { scale: 1, opacity: 1, y: 0 },
        animate: { 
          scale: 0.1, 
          opacity: 0, 
          y: 500, // Animate down toward dock
          transition: { duration: 0.3, ease: 'easeInOut' }
        },
        exit: { 
          scale: 0.1, 
          opacity: 0, 
          y: 500,
          transition: { duration: 0.2 }
        }
      };
    }
    
    return {
      initial: { scale: 0.95, opacity: 0, y: 10 },
      animate: { 
        scale: 1, 
        opacity: 1, 
        y: 0,
        boxShadow: isDragging 
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(74, 58, 255, 0.3)'
          : undefined,
        transition: { type: 'spring', damping: 30, stiffness: 400 }
      },
      exit: { 
        scale: 0.9, 
        opacity: 0, 
        transition: { duration: 0.15, ease: 'easeOut' }
      }
    };
  };

  if (!isOpen) return null;
  if (isMinimized) return null; // We handle minimize animation in exit

  const variants = getAnimationVariants();

  return (
    <motion.div
      ref={windowRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby={`window-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
      initial={variants.initial}
      animate={variants.animate}
      exit={variants.exit}
      className={`absolute overflow-hidden border-2 transition-all duration-200 ${
        isMaximized 
          ? 'rounded-none'
          : 'rounded-xl'
      } ${
        isDragging
          ? 'border-bv-primary shadow-2xl ring-2 ring-bv-primary/30'
          : isFocused 
            ? 'border-bv-primary/60 shadow-2xl shadow-bv-primary/30 ring-1 ring-bv-primary/20' 
            : 'border-gray-700/50 shadow-xl shadow-black/30 opacity-85 hover:opacity-95'
      }`}
      style={{
        width: dimensions.width,
        height: dimensions.height,
        left: position.x,
        top: position.y,
        zIndex: (isDragging || isResizing) ? zIndex + 100 : zIndex,
        cursor: isResizing ? (resizeHandle === 'n' || resizeHandle === 's' ? 'ns-resize' : 
                              resizeHandle === 'e' || resizeHandle === 'w' ? 'ew-resize' :
                              resizeHandle === 'ne' || resizeHandle === 'sw' ? 'nesw-resize' :
                              resizeHandle === 'nw' || resizeHandle === 'se' ? 'nwse-resize' : 'default') : 'default',
        userSelect: isResizing ? 'none' : 'auto',
      }}
      onClick={onFocus}
    >
      {/* Draggable Title Bar */}
      <div 
        ref={titleBarRef}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleTitleBarDoubleClick}
        onContextMenu={handleTitleBarContextMenu}
        className={`h-11 flex items-center justify-between px-4 select-none border-b transition-all duration-200 ${
          isDragging
            ? 'cursor-grabbing bg-bv-primary border-bv-primary/50'
            : isMaximized
              ? 'cursor-default bg-bv-primary border-bv-primary/30'
              : isFocused 
                ? 'cursor-grab bg-gradient-to-r from-bv-primary to-bv-primary/90 border-bv-primary/30'
                : 'cursor-grab bg-gray-800/90 border-gray-700/50'
        }`}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0 pointer-events-none">
          {icon && <div className="w-5 h-5 shrink-0 opacity-80" aria-hidden="true">{icon}</div>}
          <span 
            id={`window-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
            className="text-white text-sm font-semibold truncate"
          >
            {title}
          </span>
          {/* Maximized indicator */}
          {isMaximized && (
            <span className="ml-2 px-1.5 py-0.5 text-[10px] font-mono bg-white/20 rounded text-white/70">
              MAX
            </span>
          )}
          {/* Title bar extra content */}
          {titleBarExtra && (
            <div className="ml-auto pointer-events-auto">
              {titleBarExtra}
            </div>
          )}
        </div>
        
        {/* Window Controls - Flat Style with enhanced hover states */}
        <div className="flex gap-1.5 shrink-0" role="group" aria-label="Window controls">
          {/* Minimize Button */}
          {!notMinimizable && (
            <button
              onClick={(e) => { e.stopPropagation(); onMinimize(); }}
              aria-label="Minimize window"
              className="w-7 h-7 rounded-md flex items-center justify-center bg-white/10 hover:bg-yellow-500 hover:scale-110 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer group"
            >
              <Minus size={12} className="text-white/80 group-hover:text-white" aria-hidden="true" />
            </button>
          )}
          
          {/* Maximize/Restore Button */}
          <button
            onClick={(e) => { e.stopPropagation(); onMaximize(); }}
            aria-label={isMaximized ? "Restore window" : "Maximize window"}
            className="w-7 h-7 rounded-md flex items-center justify-center bg-white/10 hover:bg-green-500 hover:scale-110 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer group"
          >
            {isMaximized ? (
              // Restore icon (two overlapping squares)
              <Copy size={10} className="text-white/80 group-hover:text-white" aria-hidden="true" />
            ) : (
              // Maximize icon (single square)
              <Square size={10} className="text-white/80 group-hover:text-white" aria-hidden="true" />
            )}
          </button>
          
          {/* Close Button */}
          {!notClosable && (
            <button
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              aria-label="Close window"
              className="w-7 h-7 rounded-md flex items-center justify-center bg-white/10 hover:bg-red-500 hover:scale-110 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer group"
            >
              <X size={12} className="text-white/80 group-hover:text-white" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
      
      {/* Window Content */}
      <div className="h-[calc(100%-44px)] bg-bv-dark/95 backdrop-blur-sm overflow-auto">
        {children}
      </div>

      {/* Resize Handles - Only show when not maximized and resizable */}
      {!isMaximized && !notResizable && (
        <>
          {/* Edge handles - 8px hit area, invisible */}
          {/* Top */}
          <div
            data-resize-handle="n"
            onMouseDown={(e) => handleResizeStart(e, 'n')}
            className="absolute cursor-n-resize z-10"
            style={{ 
              touchAction: 'none', 
              top: '-4px',
              left: '0',
              right: '0',
              height: '8px'
            }}
            aria-hidden="true"
          />
          {/* Right */}
          <div
            data-resize-handle="e"
            onMouseDown={(e) => handleResizeStart(e, 'e')}
            className="absolute cursor-e-resize z-10"
            style={{ 
              touchAction: 'none', 
              top: '0',
              right: '-4px',
              bottom: '0',
              width: '8px'
            }}
            aria-hidden="true"
          />
          {/* Bottom */}
          <div
            data-resize-handle="s"
            onMouseDown={(e) => handleResizeStart(e, 's')}
            className="absolute cursor-s-resize z-10"
            style={{ 
              touchAction: 'none', 
              bottom: '-4px',
              left: '0',
              right: '0',
              height: '8px'
            }}
            aria-hidden="true"
          />
          {/* Left */}
          <div
            data-resize-handle="w"
            onMouseDown={(e) => handleResizeStart(e, 'w')}
            className="absolute cursor-w-resize z-10"
            style={{ 
              touchAction: 'none', 
              top: '0',
              left: '-4px',
              bottom: '0',
              width: '8px'
            }}
            aria-hidden="true"
          />
          
          {/* Corner handles - 8px x 8px hit area, extending 4px from corners */}
          {/* Top-left */}
          <div
            data-resize-handle="nw"
            onMouseDown={(e) => handleResizeStart(e, 'nw')}
            className="absolute cursor-nw-resize z-20"
            style={{ 
              touchAction: 'none', 
              top: '-4px',
              left: '-4px',
              width: '8px', 
              height: '8px' 
            }}
            aria-hidden="true"
          />
          {/* Top-right */}
          <div
            data-resize-handle="ne"
            onMouseDown={(e) => handleResizeStart(e, 'ne')}
            className="absolute cursor-ne-resize z-20"
            style={{ 
              touchAction: 'none', 
              top: '-4px',
              right: '-4px',
              width: '8px', 
              height: '8px' 
            }}
            aria-hidden="true"
          />
          {/* Bottom-right */}
          <div
            data-resize-handle="se"
            onMouseDown={(e) => handleResizeStart(e, 'se')}
            className="absolute cursor-se-resize z-20"
            style={{ 
              touchAction: 'none', 
              bottom: '-4px',
              right: '-4px',
              width: '8px', 
              height: '8px' 
            }}
            aria-hidden="true"
          />
          {/* Bottom-left */}
          <div
            data-resize-handle="sw"
            onMouseDown={(e) => handleResizeStart(e, 'sw')}
            className="absolute cursor-sw-resize z-20"
            style={{ 
              touchAction: 'none', 
              bottom: '-4px',
              left: '-4px',
              width: '8px', 
              height: '8px' 
            }}
            aria-hidden="true"
          />
        </>
      )}

      {/* Title Bar Context Menu */}
      {titleBarContextMenu && (
        <ContextMenu
          items={windowMenuItems}
          position={titleBarContextMenu}
          onClose={() => setTitleBarContextMenu(null)}
        />
      )}
    </motion.div>
  );
};

// Mini window icon for taskbar
export const WindowIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <rect x="1" y="1" width="14" height="14" rx="1" fill="#4A3AFF" fillOpacity="0.3" stroke="#4A3AFF" strokeWidth="1" />
    <rect x="1" y="1" width="14" height="3" fill="#4A3AFF" />
  </svg>
);
