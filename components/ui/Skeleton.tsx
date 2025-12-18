"use client";

import React, { memo } from 'react';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
  className?: string;
}

export const Skeleton = memo(function Skeleton({
  width,
  height = 16,
  rounded = 'md',
  className = '',
}: SkeletonProps) {
  const roundedClasses = {
    sm: 'rounded-sm',
    md: 'rounded',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  return (
    <div
      className={`bg-neutral-200 animate-skeleton ${roundedClasses[rounded]} ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: `${height}px`,
      }}
      aria-hidden="true"
    />
  );
});

Skeleton.displayName = 'Skeleton';

// Skeleton variants for common use cases
export const SkeletonText = memo(function SkeletonText({
  lines = 3,
  className = '',
}: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          width={i === lines - 1 ? '75%' : '100%'}
          height={14}
        />
      ))}
    </div>
  );
});

SkeletonText.displayName = 'SkeletonText';

export const SkeletonRow = memo(function SkeletonRow({
  className = '',
}: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 p-3 ${className}`}>
      <Skeleton width={16} height={16} rounded="sm" />
      <div className="flex-1 space-y-2">
        <Skeleton width="60%" height={16} />
        <Skeleton width="40%" height={12} />
      </div>
    </div>
  );
});

SkeletonRow.displayName = 'SkeletonRow';
