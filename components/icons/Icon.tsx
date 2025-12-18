"use client";

import React from 'react';
import { LucideIcon } from 'lucide-react';

/**
 * Icon sizing specification:
 * - 16px: 1.25px stroke (inline with text)
 * - 18px: 1.5px stroke (buttons)
 * - 24px: 1.5px stroke (default/base)
 * - 28px: 1.5px stroke (dock)
 * - 48px: 2px stroke (empty states)
 */
export type IconSize = 12 | 16 | 18 | 24 | 28 | 48;

export interface IconProps {
  size?: IconSize;
  className?: string;
  "aria-hidden"?: boolean;
}

/**
 * Get stroke width based on icon size
 */
export function getStrokeWidth(size: IconSize): number {
  switch (size) {
    case 12:
      return 1;
    case 16:
      return 1.25;
    case 18:
    case 24:
    case 28:
      return 1.5;
    case 48:
      return 2;
    default:
      return 1.5;
  }
}

/**
 * Base Icon wrapper component for Lucide icons
 * Applies consistent sizing and stroke weights per spec
 */
interface IconWrapperProps extends IconProps {
  icon: LucideIcon;
}

export const Icon: React.FC<IconWrapperProps> = ({
  icon: LucideIconComponent,
  size = 24,
  className = "",
  "aria-hidden": ariaHidden = true,
}) => {
  const strokeWidth = getStrokeWidth(size);
  
  return (
    <LucideIconComponent
      size={size}
      strokeWidth={strokeWidth}
      className={`icon ${className}`}
      aria-hidden={ariaHidden}
    />
  );
};

/**
 * Custom SVG Icon base component
 * For icons not available in Lucide
 */
interface CustomIconProps extends IconProps {
  children: React.ReactNode;
  viewBox?: string;
}

export const CustomIcon: React.FC<CustomIconProps> = ({
  size = 24,
  className = "",
  children,
  viewBox = "0 0 24 24",
  "aria-hidden": ariaHidden = true,
}) => {
  const strokeWidth = getStrokeWidth(size);
  
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`icon ${className}`}
      aria-hidden={ariaHidden}
    >
      {children}
    </svg>
  );
};

/**
 * Document with arrow pointing up - for Extract/Upload
 */
export const DocumentArrowUpIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => {
  const strokeWidth = getStrokeWidth(size);
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`icon ${className}`}
      aria-hidden="true"
    >
      {/* Document body */}
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      {/* Folded corner */}
      <path d="M14 2v6h6" />
      {/* Arrow pointing up */}
      <path d="M12 18v-6" />
      <path d="M9 15l3-3 3 3" />
    </svg>
  );
};

/**
 * Two overlapping squares - for Windows/Product OS
 */
export const WindowsIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => {
  const strokeWidth = getStrokeWidth(size);
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`icon ${className}`}
      aria-hidden="true"
    >
      {/* Back square */}
      <rect x="3" y="3" width="12" height="12" rx="2" />
      {/* Front square (offset) */}
      <rect x="9" y="9" width="12" height="12" rx="2" />
    </svg>
  );
};

/**
 * Simple speech bubble - for Assistant/Chat
 */
export const SpeechBubbleIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => {
  const strokeWidth = getStrokeWidth(size);
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`icon ${className}`}
      aria-hidden="true"
    >
      {/* Rounded rectangle bubble */}
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
};

/**
 * Slider controls - for Tools
 */
export const SlidersIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => {
  const strokeWidth = getStrokeWidth(size);
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`icon ${className}`}
      aria-hidden="true"
    >
      {/* Three horizontal lines with circles */}
      <line x1="4" y1="6" x2="20" y2="6" />
      <circle cx="8" cy="6" r="2" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <circle cx="16" cy="12" r="2" />
      <line x1="4" y1="18" x2="20" y2="18" />
      <circle cx="10" cy="18" r="2" />
    </svg>
  );
};

export default Icon;
