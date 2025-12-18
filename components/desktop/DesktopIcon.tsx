"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface DesktopIconProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onSelect: () => void;
  onDoubleClick: () => void;
  onContextMenu?: (e: React.MouseEvent) => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  label,
  icon,
  isSelected,
  onSelect,
  onDoubleClick,
  onContextMenu,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onDoubleClick();
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onDoubleClick();
      }}
      onContextMenu={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onContextMenu?.(e);
      }}
      onKeyDown={handleKeyDown}
      aria-label={`${label}. Double-click to open.`}
      aria-pressed={isSelected}
      className={`w-[88px] flex flex-col items-center p-1.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-bv-primary/70 ${
        isSelected 
          ? 'bg-bv-primary/30 ring-1 ring-bv-primary/50' 
          : 'hover:bg-white/5'
      }`}
    >
      <div className="w-11 h-11 mb-1.5 flex items-center justify-center" aria-hidden="true">
        {icon}
      </div>
      <span className={`text-xxs text-center leading-snug w-full min-h-[28px] line-clamp-2 ${
        isSelected ? 'text-white' : 'text-gray-300'
      }`} style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
        {label}
      </span>
    </motion.button>
  );
};

// Icon Components
export const FolderIcon: React.FC<{ color?: string }> = ({ color = '#FFC107' }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M4 14 L4 40 L44 40 L44 18 L24 18 L20 14 Z" fill={color} />
    <path d="M4 18 L44 18 L44 38 L4 38 Z" fill={color} fillOpacity="0.8" />
    <path d="M4 14 L20 14 L24 18 L4 18 Z" fill={color} fillOpacity="0.6" />
  </svg>
);

export const DocumentIcon: React.FC<{ color?: string }> = ({ color = '#64B5F6' }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M10 4 L30 4 L38 12 L38 44 L10 44 Z" fill={color} />
    <path d="M30 4 L30 12 L38 12 Z" fill={color} fillOpacity="0.6" />
    <path d="M14 20 L34 20" stroke="white" strokeWidth="2" strokeOpacity="0.5" />
    <path d="M14 26 L34 26" stroke="white" strokeWidth="2" strokeOpacity="0.5" />
    <path d="M14 32 L28 32" stroke="white" strokeWidth="2" strokeOpacity="0.5" />
  </svg>
);

export const VideoIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="6" y="10" width="36" height="28" rx="2" fill="#E57373" />
    <circle cx="24" cy="24" r="8" fill="white" fillOpacity="0.3" />
    <path d="M21 20 L21 28 L29 24 Z" fill="white" />
  </svg>
);

export const ChatIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M8 12 L40 12 L40 32 L26 32 L18 40 L18 32 L8 32 Z" fill="#81C784" />
    <circle cx="16" cy="22" r="2" fill="white" fillOpacity="0.7" />
    <circle cx="24" cy="22" r="2" fill="white" fillOpacity="0.7" />
    <circle cx="32" cy="22" r="2" fill="white" fillOpacity="0.7" />
  </svg>
);

export const HelpIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="18" fill="#9575CD" />
    <text x="24" y="30" textAnchor="middle" fontSize="20" fontWeight="bold" fill="white">?</text>
  </svg>
);

export const CalculatorIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="8" y="4" width="32" height="40" rx="2" fill="#78909C" />
    <rect x="12" y="8" width="24" height="10" fill="#263238" />
    <rect x="12" y="22" width="6" height="6" fill="#455A64" />
    <rect x="21" y="22" width="6" height="6" fill="#455A64" />
    <rect x="30" y="22" width="6" height="6" fill="#455A64" />
    <rect x="12" y="31" width="6" height="6" fill="#455A64" />
    <rect x="21" y="31" width="6" height="6" fill="#455A64" />
    <rect x="30" y="31" width="6" height="6" fill="#FF7043" />
  </svg>
);

export const HomeIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M24 6 L6 22 L12 22 L12 40 L20 40 L20 30 L28 30 L28 40 L36 40 L36 22 L42 22 Z" fill="#4A3AFF" />
    <rect x="20" y="30" width="8" height="10" fill="#2a1adf" />
  </svg>
);

export const StarIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M24 4 L28 18 L44 18 L32 28 L36 44 L24 34 L12 44 L16 28 L4 18 L20 18 Z" fill="#FFD54F" />
  </svg>
);

export const BookIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M8 8 L8 40 L40 40 L40 8 Z" fill="#5C6BC0" />
    <path d="M12 8 L12 40" stroke="#3949AB" strokeWidth="2" />
    <path d="M16 16 L36 16" stroke="white" strokeWidth="2" strokeOpacity="0.5" />
    <path d="M16 22 L36 22" stroke="white" strokeWidth="2" strokeOpacity="0.5" />
    <path d="M16 28 L30 28" stroke="white" strokeWidth="2" strokeOpacity="0.5" />
  </svg>
);

export const ChangelogIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="8" y="6" width="32" height="36" rx="2" fill="#26A69A" />
    <path d="M14 14 L20 14" stroke="white" strokeWidth="2" />
    <path d="M14 22 L34 22" stroke="white" strokeWidth="2" strokeOpacity="0.7" />
    <path d="M14 28 L30 28" stroke="white" strokeWidth="2" strokeOpacity="0.5" />
    <path d="M14 34 L26 34" stroke="white" strokeWidth="2" strokeOpacity="0.3" />
    <circle cx="34" cy="14" r="4" fill="#FFD54F" />
  </svg>
);

export const BuildingIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="10" y="12" width="28" height="32" fill="#607D8B" />
    <rect x="14" y="16" width="6" height="6" fill="#90A4AE" />
    <rect x="22" y="16" width="6" height="6" fill="#90A4AE" />
    <rect x="14" y="26" width="6" height="6" fill="#90A4AE" />
    <rect x="22" y="26" width="6" height="6" fill="#90A4AE" />
    <rect x="18" y="36" width="8" height="8" fill="#455A64" />
    <path d="M10 12 L24 4 L38 12" fill="#78909C" />
  </svg>
);

export const BriefcaseIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="6" y="16" width="36" height="26" rx="2" fill="#8D6E63" />
    <path d="M16 16 L16 12 C16 10 18 8 20 8 L28 8 C30 8 32 10 32 12 L32 16" stroke="#5D4037" strokeWidth="2" fill="none" />
    <rect x="20" y="22" width="8" height="6" fill="#BCAAA4" />
  </svg>
);

export const TrashIcon: React.FC<{ isEmpty?: boolean }> = ({ isEmpty = true }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M14 16 L16 42 L32 42 L34 16 Z" fill={isEmpty ? '#9E9E9E' : '#64B5F6'} />
    <rect x="12" y="12" width="24" height="4" fill="#757575" />
    <rect x="18" y="8" width="12" height="4" fill="#616161" />
    {!isEmpty && (
      <>
        <path d="M18 22 L20 38" stroke="#42A5F5" strokeWidth="2" />
        <path d="M24 22 L24 38" stroke="#42A5F5" strokeWidth="2" />
        <path d="M30 22 L28 38" stroke="#42A5F5" strokeWidth="2" />
      </>
    )}
  </svg>
);

export const IntegrationIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="8" fill="#4A3AFF" />
    <circle cx="10" cy="14" r="5" fill="#64B5F6" />
    <circle cx="38" cy="14" r="5" fill="#81C784" />
    <circle cx="10" cy="34" r="5" fill="#FFB74D" />
    <circle cx="38" cy="34" r="5" fill="#E57373" />
    <line x1="24" y1="24" x2="10" y2="14" stroke="#4A3AFF" strokeWidth="2" />
    <line x1="24" y1="24" x2="38" y2="14" stroke="#4A3AFF" strokeWidth="2" />
    <line x1="24" y1="24" x2="10" y2="34" stroke="#4A3AFF" strokeWidth="2" />
    <line x1="24" y1="24" x2="38" y2="34" stroke="#4A3AFF" strokeWidth="2" />
  </svg>
);

export const TourIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="16" stroke="#4A3AFF" strokeWidth="3" fill="none" />
    <path d="M24 12 L24 24 L32 28" stroke="#4A3AFF" strokeWidth="3" strokeLinecap="round" />
    <circle cx="24" cy="8" r="3" fill="#FFD54F" />
  </svg>
);

export const WhyIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    {/* Lightbulb base */}
    <path d="M24 4 C16 4 10 10 10 18 C10 24 14 28 16 32 L32 32 C34 28 38 24 38 18 C38 10 32 4 24 4" fill="#4A3AFF" />
    {/* Lightbulb filament glow */}
    <ellipse cx="24" cy="18" rx="6" ry="8" fill="#A78BFA" opacity="0.6" />
    {/* Lightbulb base screw */}
    <rect x="18" y="32" width="12" height="4" fill="#64B5F6" />
    <rect x="19" y="36" width="10" height="3" fill="#4A3AFF" />
    <rect x="20" y="39" width="8" height="3" fill="#64B5F6" />
    {/* Light rays */}
    <line x1="24" y1="0" x2="24" y2="2" stroke="#FFD54F" strokeWidth="2" strokeLinecap="round" />
    <line x1="6" y1="18" x2="8" y2="18" stroke="#FFD54F" strokeWidth="2" strokeLinecap="round" />
    <line x1="40" y1="18" x2="42" y2="18" stroke="#FFD54F" strokeWidth="2" strokeLinecap="round" />
    <line x1="10" y1="6" x2="12" y2="8" stroke="#FFD54F" strokeWidth="2" strokeLinecap="round" />
    <line x1="38" y1="6" x2="36" y2="8" stroke="#FFD54F" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ProductOSIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    {/* Main container with gradient */}
    <rect x="4" y="4" width="40" height="40" rx="6" fill="url(#productOsGradient)" />
    {/* Grid of 4 squares representing categories */}
    <rect x="10" y="10" width="12" height="12" rx="2" fill="white" fillOpacity="0.9" />
    <rect x="26" y="10" width="12" height="12" rx="2" fill="white" fillOpacity="0.7" />
    <rect x="10" y="26" width="12" height="12" rx="2" fill="white" fillOpacity="0.7" />
    <rect x="26" y="26" width="12" height="12" rx="2" fill="white" fillOpacity="0.5" />
    {/* Gradient definition */}
    <defs>
      <linearGradient id="productOsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4A3AFF" />
        <stop offset="100%" stopColor="#A78BFA" />
      </linearGradient>
    </defs>
  </svg>
);

export const SignUpIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    {/* User circle */}
    <circle cx="24" cy="18" r="8" fill="#4ADE80" fillOpacity="0.3" stroke="#4ADE80" strokeWidth="2" />
    {/* Body arc */}
    <path d="M10 42 C10 32 18 26 24 26 C30 26 38 32 38 42" fill="#4ADE80" fillOpacity="0.2" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" />
    {/* Plus sign */}
    <circle cx="36" cy="12" r="8" fill="#4ADE80" />
    <path d="M36 8 L36 16 M32 12 L40 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const NetworkIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    {/* Central node */}
    <circle cx="24" cy="24" r="6" fill="#60A5FA" />
    {/* Outer nodes */}
    <circle cx="12" cy="12" r="4" fill="#60A5FA" fillOpacity="0.7" />
    <circle cx="36" cy="12" r="4" fill="#60A5FA" fillOpacity="0.7" />
    <circle cx="12" cy="36" r="4" fill="#60A5FA" fillOpacity="0.7" />
    <circle cx="36" cy="36" r="4" fill="#60A5FA" fillOpacity="0.7" />
    <circle cx="6" cy="24" r="3" fill="#60A5FA" fillOpacity="0.5" />
    <circle cx="42" cy="24" r="3" fill="#60A5FA" fillOpacity="0.5" />
    {/* Connection lines */}
    <line x1="24" y1="24" x2="12" y2="12" stroke="#60A5FA" strokeWidth="1.5" strokeOpacity="0.6" />
    <line x1="24" y1="24" x2="36" y2="12" stroke="#60A5FA" strokeWidth="1.5" strokeOpacity="0.6" />
    <line x1="24" y1="24" x2="12" y2="36" stroke="#60A5FA" strokeWidth="1.5" strokeOpacity="0.6" />
    <line x1="24" y1="24" x2="36" y2="36" stroke="#60A5FA" strokeWidth="1.5" strokeOpacity="0.6" />
    <line x1="24" y1="24" x2="6" y2="24" stroke="#60A5FA" strokeWidth="1.5" strokeOpacity="0.6" />
    <line x1="24" y1="24" x2="42" y2="24" stroke="#60A5FA" strokeWidth="1.5" strokeOpacity="0.6" />
  </svg>
);
