"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export interface ContextMenuItem {
  id: string;
  label?: string; // Optional for dividers
  shortcut?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  divider?: boolean;
  submenu?: ContextMenuItem[];
  onClick?: () => void;
}

interface ContextMenuProps {
  items: ContextMenuItem[];
  position: { x: number; y: number };
  onClose: () => void;
  submenuPosition?: 'right' | 'left';
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  items,
  position,
  onClose,
  submenuPosition = 'right',
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [submenuPositionState, setSubmenuPositionState] = useState<{ x: number; y: number } | null>(null);

  // Close menu on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  // Calculate menu position to keep it within viewport
  useEffect(() => {
    if (menuRef.current && !activeSubmenu) {
      const rect = menuRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let adjustedX = position.x;
      let adjustedY = position.y;

      // Adjust if menu would overflow right
      if (adjustedX + rect.width > viewportWidth) {
        adjustedX = viewportWidth - rect.width - 10;
      }

      // Adjust if menu would overflow bottom
      if (adjustedY + rect.height > viewportHeight) {
        adjustedY = viewportHeight - rect.height - 10;
      }

      // Ensure menu doesn't go off-screen on left or top
      adjustedX = Math.max(10, adjustedX);
      adjustedY = Math.max(10, adjustedY);

      menuRef.current.style.left = `${adjustedX}px`;
      menuRef.current.style.top = `${adjustedY}px`;
    }
  }, [position, activeSubmenu]);

  const handleItemClick = (item: ContextMenuItem) => {
    if (item.disabled) return;
    
    if (item.submenu) {
      // Don't close if item has submenu
      return;
    }

    if (item.onClick) {
      item.onClick();
    }
    onClose();
  };

  const handleItemMouseEnter = (item: ContextMenuItem, event: React.MouseEvent) => {
    if (item.submenu && item.submenu.length > 0) {
      setActiveSubmenu(item.id);
      const rect = event.currentTarget.getBoundingClientRect();
      if (submenuPosition === 'right') {
        setSubmenuPositionState({ x: rect.right + 4, y: rect.top });
      } else {
        setSubmenuPositionState({ x: rect.left - 4, y: rect.top });
      }
    } else {
      setActiveSubmenu(null);
    }
  };

  const handleItemMouseLeave = () => {
    // Small delay to allow moving to submenu
    setTimeout(() => {
      if (!menuRef.current?.matches(':hover')) {
        setActiveSubmenu(null);
      }
    }, 100);
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={menuRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        className="fixed z-[1000] min-w-[200px] bg-gray-800/95 backdrop-blur-md border border-gray-700/50 rounded-lg shadow-2xl py-1.5"
        style={{
          left: position.x,
          top: position.y,
        }}
        onMouseLeave={() => setActiveSubmenu(null)}
      >
        {items.map((item, index) => {
          if (item.divider) {
            return (
              <div
                key={`divider-${index}`}
                className="h-px bg-gray-700/50 my-1 mx-2"
              />
            );
          }

          return (
            <div key={item.id}>
              <button
                onClick={() => handleItemClick(item)}
                onMouseEnter={(e) => handleItemMouseEnter(item, e)}
                onMouseLeave={handleItemMouseLeave}
                disabled={item.disabled}
                className={`
                  w-full px-3 py-2 text-left text-sm flex items-center justify-between gap-4
                  transition-colors relative
                  ${item.disabled 
                    ? 'text-gray-600 cursor-not-allowed' 
                    : 'text-gray-200 hover:bg-bv-primary/20 hover:text-white cursor-pointer'
                  }
                  ${activeSubmenu === item.id ? 'bg-bv-primary/20 text-white' : ''}
                `}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {item.icon && (
                    <span className="w-4 h-4 shrink-0 flex items-center justify-center">
                      {item.icon}
                    </span>
                  )}
                  {item.label && <span className="truncate">{item.label}</span>}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {item.shortcut && (
                    <span className="text-xs text-gray-500 font-mono">
                      {item.shortcut}
                    </span>
                  )}
                  {item.submenu && (
                    <ChevronRight size={14} className="text-gray-500" />
                  )}
                </div>
              </button>

              {/* Submenu */}
              {item.submenu && activeSubmenu === item.id && submenuPositionState && (
                <ContextMenu
                  items={item.submenu}
                  position={submenuPositionState}
                  onClose={() => setActiveSubmenu(null)}
                  submenuPosition={submenuPosition}
                />
              )}
            </div>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
};
