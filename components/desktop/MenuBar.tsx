"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Search, ChevronRight, User, LogOut } from 'lucide-react';
import { useWindowManager } from './WindowManagerContext';
import { useAuth } from '@/contexts/AuthContext';

interface MenuItem {
  id: string;
  label: string;
  shortcut?: string;
  action?: () => void;
  submenu?: MenuItem[];
  divider?: boolean;
}

interface MenuBarProps {
  onCloseDropdowns?: () => void;
}

export const MenuBar: React.FC<MenuBarProps> = ({ onCloseDropdowns }) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuBarRef = useRef<HTMLDivElement>(null);
  const { openWindow, minimizeAll } = useWindowManager();
  const { user, isAuthenticated, signOut } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuBarRef.current && !menuBarRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
        setActiveSubmenu(null);
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Expose close function for keyboard shortcuts
  useEffect(() => {
    if (onCloseDropdowns) {
      // This is a bit of a hack - we're checking if we should close
      // A better approach would be to use a context or ref
    }
  }, [onCloseDropdowns]);

  const closeMenus = () => {
    setOpenMenuId(null);
    setActiveSubmenu(null);
    setUserMenuOpen(false);
  };

  const handleSignInClick = () => {
    openWindow('auth', 'auth', 'Sign In', { 
      width: 420, 
      height: 480, 
      notResizable: true,
      centered: true 
    });
    closeMenus();
  };

  const handleSignOut = () => {
    signOut();
    setUserMenuOpen(false);
  };

  // Menu definitions
  const fileMenu: MenuItem[] = [
    { 
      id: 'new-extraction', 
      label: 'New Extraction', 
      shortcut: '⌘N',
      action: () => { openWindow('extract', 'extract', 'New Extraction', { width: 560, height: 480 }); closeMenus(); }
    },
    { id: 'divider-1', label: '', divider: true },
    { 
      id: 'open-project', 
      label: 'Open Project...', 
      shortcut: '⌘O',
      action: () => { openWindow('projects', 'projects', 'Projects', { width: 720, height: 520 }); closeMenus(); }
    },
    { 
      id: 'open-recent', 
      label: 'Open Recent',
      submenu: [
        { id: 'recent-1', label: 'Harbor Tower', action: closeMenus },
        { id: 'recent-2', label: '123 Main Street', action: closeMenus },
        { id: 'recent-3', label: 'Riverside Medical', action: closeMenus },
      ]
    },
    { id: 'divider-2', label: '', divider: true },
    { id: 'save', label: 'Save', shortcut: '⌘S', action: closeMenus },
    { 
      id: 'export', 
      label: 'Export',
      submenu: [
        { id: 'export-csv', label: 'CSV', action: closeMenus },
        { id: 'export-pdf', label: 'PDF', action: closeMenus },
        { id: 'export-json', label: 'JSON', action: closeMenus },
      ]
    },
  ];

  const viewMenu: MenuItem[] = [
    { 
      id: 'show-desktop', 
      label: 'Show Desktop', 
      shortcut: '⌘D',
      action: () => { minimizeAll(); closeMenus(); }
    },
    { id: 'divider-1', label: '', divider: true },
    { 
      id: 'project-files', 
      label: 'Project Files',
      action: () => { openWindow('projects', 'projects', 'Projects', { width: 720, height: 520 }); closeMenus(); }
    },
    { 
      id: 'ai-assistant', 
      label: 'AI Assistant',
      action: () => { openWindow('assistant', 'assistant', 'Assistant', { width: 400, height: 600 }); closeMenus(); }
    },
    { id: 'divider-2', label: '', divider: true },
    { id: 'fullscreen', label: 'Enter Full Screen', shortcut: '⌘⏎', action: closeMenus },
  ];

  const toolsMenu: MenuItem[] = [
    { 
      id: 'ai-takeoff', 
      label: 'AI Takeoff',
      action: () => { openWindow('tool-ai-takeoff', 'tool', 'AI Takeoff', { width: 1200, height: 700 }); closeMenus(); }
    },
    { 
      id: 'equipment-selector', 
      label: 'Equipment Selector',
      action: () => { openWindow('tool-equipment', 'tool', 'Equipment Selector', { width: 1200, height: 700 }); closeMenus(); }
    },
    { 
      id: 'proposal-builder', 
      label: 'Proposal Builder',
      action: () => { openWindow('tool-proposal', 'tool', 'Proposal Builder', { width: 1200, height: 700 }); closeMenus(); }
    },
    { id: 'divider-1', label: '', divider: true },
    { 
      id: 'free-tools', 
      label: 'Free Tools',
      submenu: [
        { 
          id: 'psychrometric', 
          label: 'Psychrometric Calculator',
          action: () => { openWindow('tool-psychrometric', 'tool-psychrometric', 'Psychrometric Calculator', { width: 600, height: 500 }); closeMenus(); }
        },
        { 
          id: 'sound', 
          label: 'Sound Calculator',
          action: () => { openWindow('tool-sound', 'tool-sound', 'Sound Calculator', { width: 600, height: 500 }); closeMenus(); }
        },
        { 
          id: 'converter', 
          label: 'Unit Converter',
          action: () => { openWindow('tool-converter', 'tool-converter', 'Unit Converter', { width: 600, height: 500 }); closeMenus(); }
        },
      ]
    },
  ];

  const helpMenu: MenuItem[] = [
    { 
      id: 'documentation', 
      label: 'Documentation',
      action: () => { openWindow('docs', 'docs', 'Documentation', { width: 1300, height: 700 }); closeMenus(); }
    },
    { 
      id: 'keyboard-shortcuts', 
      label: 'Keyboard Shortcuts', 
      shortcut: '⌘/',
      action: () => { openWindow('help', 'help', 'Keyboard Shortcuts', { width: 500, height: 600 }); closeMenus(); }
    },
    { id: 'divider-1', label: '', divider: true },
    { 
      id: 'contact-support', 
      label: 'Contact Support',
      action: () => { openWindow('contact', 'contact', 'Contact Us', { width: 1200, height: 650 }); closeMenus(); }
    },
    { id: 'divider-2', label: '', divider: true },
    { 
      id: 'about', 
      label: 'About BuildVision',
      action: () => { openWindow('about', 'about', 'About BuildVision', { width: 1200, height: 650 }); closeMenus(); }
    },
    { 
      id: 'changelog', 
      label: 'Changelog',
      action: () => { openWindow('changelog', 'changelog', 'Changelog', { width: 1200, height: 700 }); closeMenus(); }
    },
    { 
      id: 'careers', 
      label: 'Careers',
      action: () => { openWindow('careers', 'careers', 'Careers', { width: 1200, height: 700 }); closeMenus(); }
    },
  ];

  const menus = [
    { id: 'file', label: 'File', items: fileMenu },
    { id: 'view', label: 'View', items: viewMenu },
    { id: 'tools', label: 'Tools', items: toolsMenu },
    { id: 'help', label: 'Help', items: helpMenu },
  ];

  const handleMenuClick = (menuId: string) => {
    setOpenMenuId(openMenuId === menuId ? null : menuId);
    setActiveSubmenu(null);
  };

  const handleMenuHover = (menuId: string) => {
    if (openMenuId !== null) {
      setOpenMenuId(menuId);
      setActiveSubmenu(null);
    }
  };

  const renderMenuItem = (item: MenuItem, parentMenu: string) => {
    if (item.divider) {
      return (
        <div 
          key={item.id} 
          className="h-px bg-neutral-100 my-1 mx-0"
        />
      );
    }

    const hasSubmenu = item.submenu && item.submenu.length > 0;

    return (
      <div key={item.id} className="relative">
        <button
          onClick={() => {
            if (!hasSubmenu && item.action) {
              item.action();
            }
          }}
          onMouseEnter={() => {
            if (hasSubmenu) {
              setActiveSubmenu(item.id);
            } else {
              setActiveSubmenu(null);
            }
          }}
          className={`
            w-full px-4 py-2 text-left text-sm flex items-center justify-between gap-8
            transition-colors text-neutral-700 hover:bg-neutral-100
            ${activeSubmenu === item.id ? 'bg-neutral-100' : ''}
          `}
        >
          <span>{item.label}</span>
          <div className="flex items-center gap-2">
            {item.shortcut && (
              <span className="text-xs text-neutral-500">{item.shortcut}</span>
            )}
            {hasSubmenu && (
              <ChevronRight size={14} className="text-neutral-400" />
            )}
          </div>
        </button>

        {/* Submenu */}
        {hasSubmenu && activeSubmenu === item.id && (
          <div 
            className="absolute left-full top-0 ml-1 min-w-[200px] bg-white border border-neutral-200 rounded-lg shadow-lg py-1 z-[60]"
            style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
          >
            {item.submenu!.map(subItem => (
              <button
                key={subItem.id}
                onClick={() => {
                  if (subItem.action) subItem.action();
                }}
                className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                {subItem.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <header 
      ref={menuBarRef}
      className="h-8 bg-white border-b border-neutral-100 flex items-center px-4 shrink-0 z-50 relative"
      role="banner"
    >
      {/* Logo */}
      <div className="flex items-center gap-2 mr-6">
        <Image 
          src="/logo/icon.png" 
          alt="BuildVision" 
          width={20} 
          height={20}
          className="w-5 h-5"
        />
        <span className="font-bold text-neutral-900 text-sm">
          BuildVision
        </span>
      </div>
      
      {/* Menu Items */}
      <nav className="flex items-center gap-6">
        {menus.map(menu => (
          <div key={menu.id} className="relative">
            <button
              onClick={() => handleMenuClick(menu.id)}
              onMouseEnter={() => handleMenuHover(menu.id)}
              className={`
                text-sm transition-colors px-1 py-0.5
                ${openMenuId === menu.id 
                  ? 'text-neutral-900 font-bold' 
                  : 'text-neutral-700 hover:text-neutral-900'
                }
              `}
            >
              {menu.label}
            </button>

            {/* Dropdown */}
            {openMenuId === menu.id && (
              <div 
                className="absolute top-full left-0 mt-1 min-w-[200px] bg-white border border-neutral-200 rounded-lg py-1 z-[60]"
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
              >
                {menu.items.map(item => renderMenuItem(item, menu.id))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Right Side - Search and User */}
      <div className="ml-auto flex items-center gap-4">
        {/* Search Icon (placeholder) */}
        <button 
          className="p-1 text-neutral-500 hover:text-neutral-700 transition-colors"
          aria-label="Search"
        >
          <Search size={16} />
        </button>

        {/* User Section */}
        {isAuthenticated && user ? (
          <div className="relative">
            {/* Avatar Button */}
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-bold text-neutral-700 hover:bg-neutral-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2"
              aria-label="User menu"
            >
              {user.avatarUrl ? (
                <Image 
                  src={user.avatarUrl} 
                  alt={user.name} 
                  width={24} 
                  height={24} 
                  className="w-6 h-6 rounded-full"
                />
              ) : (
                user.name.charAt(0).toUpperCase()
              )}
            </button>

            {/* User Dropdown */}
            {userMenuOpen && (
              <div 
                className="absolute right-0 top-full mt-1 w-[220px] bg-white border border-neutral-200 rounded-lg py-2 z-[60]"
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
              >
                {/* User Info */}
                <div className="px-4 py-2 border-b border-neutral-100">
                  <p className="text-body-small font-bold text-neutral-900 truncate">{user.name}</p>
                  <p className="text-detail text-neutral-600 truncate">{user.email}</p>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <button className="w-full px-4 py-2 text-left text-detail text-neutral-700 hover:bg-neutral-100 transition-colors">
                    Profile
                  </button>
                  <button className="w-full px-4 py-2 text-left text-detail text-neutral-700 hover:bg-neutral-100 transition-colors">
                    Settings
                  </button>
                </div>

                <div className="h-px bg-neutral-100 my-1" />

                <div className="py-1">
                  <button className="w-full px-4 py-2 text-left text-detail text-neutral-700 hover:bg-neutral-100 transition-colors">
                    Pricing
                  </button>
                  <button className="w-full px-4 py-2 text-left text-detail text-neutral-700 hover:bg-neutral-100 transition-colors">
                    Integrations
                  </button>
                </div>

                <div className="h-px bg-neutral-100 my-1" />

                {/* Sign Out */}
                <div className="py-1">
                  <button 
                    onClick={handleSignOut}
                    className="w-full px-4 py-2 text-left text-detail text-red-400 hover:bg-neutral-100 transition-colors flex items-center gap-2"
                  >
                    <LogOut size={14} />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button 
            onClick={handleSignInClick}
            className="text-sm text-blue-400 hover:text-blue-500 transition-colors font-normal"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};

// Export a close function that can be called externally
export const useMenuBarControls = () => {
  const closeDropdownsRef = useRef<(() => void) | null>(null);
  
  return {
    closeDropdowns: () => closeDropdownsRef.current?.(),
    setCloseDropdowns: (fn: () => void) => { closeDropdownsRef.current = fn; }
  };
};
