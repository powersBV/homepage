"use client";

import React from 'react';

interface ProgressBarProps {
  progress: number; // 0-100
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  className = '',
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  
  return (
    <div 
      className={`h-1 bg-neutral-200 rounded-sm overflow-hidden ${className}`}
      role="progressbar"
      aria-valuenow={clampedProgress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div 
        className="h-full bg-blue-400 rounded-sm transition-all duration-300 ease-out"
        style={{ width: `${clampedProgress}%` }}
      />
    </div>
  );
};
