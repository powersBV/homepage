"use client";

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Upload } from 'lucide-react';
import { ContextMenu, ContextMenuItem } from './ContextMenu';

interface DockItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  isOpen?: boolean;
  onClick: () => void;
}

interface DockProps {
  items: DockItem[];
  openWindows: { id: string; title: string; isMinimized: boolean }[];
  onWindowClick: (id: string) => void;
  onFileUpload?: (files: FileList) => void;
  onWindowClose?: (id: string) => void;
}

export const Dock: React.FC<DockProps> = ({ items, openWindows, onWindowClick, onFileUpload, onWindowClose }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dockContextMenu, setDockContextMenu] = useState<{ x: number; y: number; itemId: string; isWindow: boolean } | null>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload?.(e.target.files);
    }
  };

  const handleDockItemContextMenu = (itemId: string, isWindow: boolean) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDockContextMenu({ x: e.clientX, y: e.clientY, itemId, isWindow });
  };

  const getDockMenuItems = (itemId: string, isWindow: boolean): ContextMenuItem[] => {
    if (isWindow) {
      const window = openWindows.find(w => w.id === itemId);
      return [
        {
          id: 'open',
          label: 'Open',
          onClick: () => {
            onWindowClick(itemId);
            setDockContextMenu(null);
          },
        },
        {
          id: 'keep-dock',
          label: 'Keep in Dock',
          onClick: () => {
            console.log(`Keep ${itemId} in dock`);
            setDockContextMenu(null);
          },
        },
        { id: 'divider-1', divider: true },
        ...(window ? [{
          id: 'close',
          label: 'Close',
          onClick: () => {
            onWindowClose?.(itemId);
            setDockContextMenu(null);
          },
        }] : []),
      ];
    } else {
      const item = items.find(i => i.id === itemId);
      return [
        {
          id: 'open',
          label: 'Open',
          onClick: () => {
            item?.onClick();
            setDockContextMenu(null);
          },
        },
        {
          id: 'remove-dock',
          label: 'Remove from Dock',
          onClick: () => {
            console.log(`Remove ${itemId} from dock`);
            setDockContextMenu(null);
          },
        },
      ];
    }
  };

  return (
    <nav className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40" role="navigation" aria-label="Application dock">
      <div className="flex items-end gap-1 px-3 py-2 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
        {/* Quick Launch Items */}
        {items.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.15, y: -8 }}
            whileTap={{ scale: 0.95 }}
            onClick={item.onClick}
            onContextMenu={handleDockItemContextMenu(item.id, false)}
            className="relative w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors group focus:outline-none focus:ring-2 focus:ring-bv-primary"
            aria-label={item.label}
            aria-pressed={item.isOpen}
          >
            <div className="w-10 h-10" aria-hidden="true">
              {item.icon}
            </div>
            {item.isOpen && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white" aria-hidden="true" />
            )}
            {/* Tooltip */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none" role="tooltip">
              {item.label}
            </div>
          </motion.button>
        ))}
        
        {/* Separator before upload */}
        <div className="w-px h-10 bg-white/20 mx-2" aria-hidden="true" />
        
        {/* File Upload Button */}
        <motion.button
          whileHover={{ scale: 1.15, y: -8 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleFileClick}
          className="relative w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors group focus:outline-none focus:ring-2 focus:ring-bv-primary"
          aria-label="Upload file"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30" aria-hidden="true">
            <Upload size={20} className="text-white" />
          </div>
          {/* Tooltip */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none" role="tooltip">
            Upload File
          </div>
        </motion.button>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.dwg,.dxf,.png,.jpg,.jpeg"
          onChange={handleFileChange}
          aria-hidden="true"
        />
        
        {/* Separator */}
        {openWindows.length > 0 && (
          <div className="w-px h-10 bg-white/20 mx-2" aria-hidden="true" />
        )}
        
        {/* Open Windows */}
        {openWindows.map((win) => (
          <motion.button
            key={win.id}
            whileHover={{ scale: 1.15, y: -8 }}
            onContextMenu={handleDockItemContextMenu(win.id, true)}
            whileTap={{ scale: 0.95 }}
            onClick={() => onWindowClick(win.id)}
            className={`relative w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-bv-primary group ${
              win.isMinimized 
                ? 'bg-bv-primary/20 ring-1 ring-bv-primary/40' 
                : 'bg-white/10 hover:bg-white/15'
            }`}
            aria-label={`${win.title}${win.isMinimized ? ' (minimized) - click to restore' : ''}`}
          >
            <div className={`w-8 h-8 rounded flex items-center justify-center transition-all ${
              win.isMinimized 
                ? 'bg-gradient-to-br from-bv-primary/60 to-purple-600/60 border border-bv-primary/70 scale-90' 
                : 'bg-gradient-to-br from-bv-primary/40 to-purple-600/40 border border-bv-primary/50'
            }`} aria-hidden="true">
              <span className={`text-xs font-bold transition-all ${
                win.isMinimized ? 'text-white' : 'text-white/80'
              }`}>
                {win.title.charAt(0)}
              </span>
            </div>
            {/* Active indicator dot */}
            <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full transition-all ${
              win.isMinimized 
                ? 'w-1.5 h-1.5 bg-yellow-400 animate-pulse' 
                : 'w-1 h-1 bg-bv-primary'
            }`} aria-hidden="true" />
            {/* Tooltip */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none" role="tooltip">
              {win.title}{win.isMinimized ? ' (click to restore)' : ''}
            </div>
          </motion.button>
        ))}

        {/* Dock Context Menu */}
        {dockContextMenu && (
          <ContextMenu
            items={getDockMenuItems(dockContextMenu.itemId, dockContextMenu.isWindow)}
            position={{ x: dockContextMenu.x, y: dockContextMenu.y }}
            onClose={() => setDockContextMenu(null)}
          />
        )}
      </div>
    </nav>
  );
};

// Dock icon components
export const DockFolderIcon: React.FC = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M4 12 L4 34 L36 34 L36 16 L20 16 L16 12 Z" fill="#FFC107" />
    <path d="M4 16 L36 16 L36 32 L4 32 Z" fill="#FFEB3B" />
  </svg>
);

export const DockHomeIcon: React.FC = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M20 6 L4 18 L8 18 L8 34 L16 34 L16 24 L24 24 L24 34 L32 34 L32 18 L36 18 Z" fill="#4A3AFF" />
  </svg>
);

export const DockToolIcon: React.FC<{ color?: string }> = ({ color = '#4A3AFF' }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <rect x="6" y="6" width="28" height="28" rx="4" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2" />
    <path d="M14 20 L26 20 M20 14 L20 26" stroke={color} strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const DockLogoIcon: React.FC = () => (
  <div className="w-10 h-10 flex items-center justify-center">
    <Image src="/logo/icon.png" alt="BuildVision" width={32} height={32} />
  </div>
);

export const DockProductOSIcon: React.FC = () => (
  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-bv-primary to-purple-600 flex items-center justify-center shadow-lg shadow-bv-primary/30">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="8" height="8" rx="1.5" fill="white" fillOpacity="0.95" />
      <rect x="14" y="2" width="8" height="8" rx="1.5" fill="white" fillOpacity="0.75" />
      <rect x="2" y="14" width="8" height="8" rx="1.5" fill="white" fillOpacity="0.75" />
      <rect x="14" y="14" width="8" height="8" rx="1.5" fill="white" fillOpacity="0.55" />
    </svg>
  </div>
);
