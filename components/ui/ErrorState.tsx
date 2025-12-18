"use client";

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from './Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center h-full p-8 ${className}`}>
      {/* Icon */}
      <div className="mb-4">
        <AlertTriangle size={48} className="text-red-400" strokeWidth={1.5} />
      </div>
      
      {/* Title */}
      <h3 className="text-body-medium font-bold text-neutral-700 text-center mb-2">
        {title}
      </h3>
      
      {/* Message */}
      {message && (
        <p className="text-detail text-neutral-500 text-center max-w-[280px] mb-6">
          {message}
        </p>
      )}
      
      {/* Retry Button */}
      {onRetry && (
        <Button variant="outlined" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};
