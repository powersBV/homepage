"use client";

import React from 'react';
import { AlertCircle } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  icon,
  error,
  className = '',
  ...props
}) => {
  const hasError = !!error;
  
  const borderClasses = hasError
    ? 'border-red-400 focus:ring-red-400 focus:border-red-400'
    : 'border-neutral-200 hover:border-neutral-300 focus:ring-blue-200 focus:border-blue-400';
  
  return (
    <div className="relative">
      {icon && (
        <div className={`absolute left-3 top-1/2 -translate-y-1/2 ${hasError ? 'text-red-400' : 'text-neutral-600'}`}>
          {icon}
        </div>
      )}
      <input
        className={`w-full px-3 py-2 text-detail text-neutral-900 bg-neutral-50 border rounded-lg placeholder:text-neutral-600 focus:outline-none focus:ring-2 transition-all duration-150 ${borderClasses} ${
          icon ? 'pl-10' : ''
        } ${className}`}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${props.id}-error` : undefined}
        {...props}
      />
      {error && (
        <div 
          id={`${props.id}-error`}
          className="flex items-center gap-1 mt-1 text-micro text-red-400"
          role="alert"
        >
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
