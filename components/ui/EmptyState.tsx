"use client";

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'filled' | 'outlined' | 'ghost';
  };
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center h-full p-8 ${className}`}>
      {/* Icon */}
      <div className="mb-4">
        <Icon size={48} className="text-neutral-300" strokeWidth={1.5} />
      </div>
      
      {/* Title */}
      <h3 className="text-body-medium font-bold text-neutral-700 text-center mb-2">
        {title}
      </h3>
      
      {/* Description */}
      {description && (
        <p className="text-detail text-neutral-500 text-center max-w-[280px] mb-6">
          {description}
        </p>
      )}
      
      {/* Action Button */}
      {action && (
        <Button
          variant={action.variant || 'ghost'}
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
    </div>
  );
};
