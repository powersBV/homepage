"use client";

import React from 'react';
import { getStrokeWidth, IconSize } from './Icon';

interface IconProps {
  className?: string;
  size?: number;
}

/**
 * Simplified Tool Icons
 * Following the BuildVision Icon Spec:
 * - 24x24 base grid, scalable
 * - 1.5px stroke (or scaled equivalent)
 * - Monochromatic (currentColor)
 * - No text, no decorative elements
 * - Simple geometric shapes
 */

// Helper to get stroke width based on size
const getStroke = (size: number): number => {
  if (size <= 16) return 1.25;
  if (size <= 24) return 1.5;
  if (size <= 28) return 1.5;
  return 2;
};

// AI Takeoff - Document with arrow pointing up (extraction)
export const AITakeoffIcon: React.FC<IconProps> = ({ className, size = 24 }) => {
  const stroke = getStroke(size);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M12 18v-6" />
      <path d="M9 15l3-3 3 3" />
    </svg>
  );
};

// Spec Writer - Document with lines
export const SpecWriterIcon: React.FC<IconProps> = ({ className, size = 24 }) => {
  const stroke = getStroke(size);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="14" y2="17" />
    </svg>
  );
};

// Scope Sheet - Clipboard with check
export const ScopeSheetIcon: React.FC<IconProps> = ({ className, size = 24 }) => {
  const stroke = getStroke(size);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M9 14l2 2 4-4" />
    </svg>
  );
};

// Submittal Review - Search/magnifying glass
export const SubmittalReviewIcon: React.FC<IconProps> = ({ className, size = 24 }) => {
  const stroke = getStroke(size);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
      <path d="M8 11h6" />
      <path d="M11 8v6" />
    </svg>
  );
};

// Selection Copilot - Two arrows comparing
export const SelectionCopilotIcon: React.FC<IconProps> = ({ className, size = 24 }) => {
  const stroke = getStroke(size);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 3h5v5" />
      <path d="M8 3H3v5" />
      <path d="M21 3l-7 7" />
      <path d="M3 3l7 7" />
      <path d="M16 21h5v-5" />
      <path d="M8 21H3v-5" />
      <path d="M21 21l-7-7" />
      <path d="M3 21l7-7" />
    </svg>
  );
};

// Psychrometric Calculator - Chart/graph
export const PsychrometricIcon: React.FC<IconProps> = ({ className, size = 24 }) => {
  const stroke = getStroke(size);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="3" y1="21" x2="21" y2="21" />
      <line x1="3" y1="21" x2="3" y2="3" />
      <path d="M3 18c4-2 6-6 9-9s6-3 9-6" />
    </svg>
  );
};

// Sound Analyzer - Audio waveform bars
export const SoundAnalyzerIcon: React.FC<IconProps> = ({ className, size = 24 }) => {
  const stroke = getStroke(size);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="4" y1="8" x2="4" y2="16" />
      <line x1="8" y1="6" x2="8" y2="18" />
      <line x1="12" y1="4" x2="12" y2="20" />
      <line x1="16" y1="6" x2="16" y2="18" />
      <line x1="20" y1="8" x2="20" y2="16" />
    </svg>
  );
};

// Unit Converter - Arrows exchange
export const UnitConverterIcon: React.FC<IconProps> = ({ className, size = 24 }) => {
  const stroke = getStroke(size);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M17 4v6h6" />
      <path d="M7 20v-6H1" />
      <path d="M23 4l-6 6" />
      <path d="M1 20l6-6" />
      <path d="M12 3v18" />
    </svg>
  );
};

// Proposal Maker - Document with dollar sign concept (simplified as file with badge)
export const ProposalMakerIcon: React.FC<IconProps> = ({ className, size = 24 }) => {
  const stroke = getStroke(size);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <circle cx="12" cy="15" r="3" />
      <line x1="12" y1="12" x2="12" y2="18" />
    </svg>
  );
};

// Procurement Report - Table/list
export const ProcurementReportIcon: React.FC<IconProps> = ({ className, size = 24 }) => {
  const stroke = getStroke(size);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
      <line x1="9" y1="3" x2="9" y2="21" />
    </svg>
  );
};

// Submittal Approval - Workflow/flow
export const SubmittalApprovalIcon: React.FC<IconProps> = ({ className, size = 24 }) => {
  const stroke = getStroke(size);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="6" width="6" height="6" rx="1" />
      <rect x="16" y="6" width="6" height="6" rx="1" />
      <rect x="9" y="14" width="6" height="6" rx="1" />
      <path d="M8 9h8" />
      <path d="M12 12v2" />
    </svg>
  );
};

// VE Alternate - Split/compare
export const VEAlternateIcon: React.FC<IconProps> = ({ className, size = 24 }) => {
  const stroke = getStroke(size);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="7" height="18" rx="1" />
      <rect x="14" y="3" width="7" height="18" rx="1" />
      <path d="M10 12h4" />
    </svg>
  );
};

// Credit Check - Shield
export const CreditCheckIcon: React.FC<IconProps> = ({ className, size = 24 }) => {
  const stroke = getStroke(size);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
};

// Anomaly Detection - Alert triangle
export const AnomalyDetectionIcon: React.FC<IconProps> = ({ className, size = 24 }) => {
  const stroke = getStroke(size);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
};

// Analytics Dashboard - Bar chart
export const AnalyticsDashboardIcon: React.FC<IconProps> = ({ className, size = 24 }) => {
  const stroke = getStroke(size);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="3" y1="20" x2="21" y2="20" />
    </svg>
  );
};

// Map icon name to component
export const iconMap: Record<string, React.FC<IconProps>> = {
  'ai-takeoff': AITakeoffIcon,
  'spec-writer': SpecWriterIcon,
  'ai-scope-sheet': ScopeSheetIcon,
  'submittal-review': SubmittalReviewIcon,
  'selection-copilot': SelectionCopilotIcon,
  'psychrometric': PsychrometricIcon,
  'sound-analyzer': SoundAnalyzerIcon,
  'unit-converter': UnitConverterIcon,
  'proposal-maker': ProposalMakerIcon,
  'procurement-report': ProcurementReportIcon,
  'submittal-approval': SubmittalApprovalIcon,
  've-alternate': VEAlternateIcon,
  'credit-check': CreditCheckIcon,
  'anomaly-detection': AnomalyDetectionIcon,
  'analytics-dashboard': AnalyticsDashboardIcon,
};
