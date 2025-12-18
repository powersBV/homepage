"use client";

import React from 'react';
import { Spinner } from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md';
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'filled',
  size = 'md',
  fullWidth = false,
  loading = false,
  children,
  disabled,
  className = '',
  ...props
}) => {
  const isDisabled = disabled || loading;
  
  const baseClasses = 'font-bold rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 active:scale-[0.98] inline-flex items-center justify-center gap-2';
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-detail min-h-[32px]',
    md: 'px-4 py-2 text-body-small min-h-[40px]',
  };
  
  const spinnerSizes = {
    sm: 14 as const,
    md: 16 as const,
  };
  
  const variantClasses = {
    filled: isDisabled
      ? 'bg-neutral-300 text-neutral-600 cursor-not-allowed active:scale-100'
      : 'bg-blue-400 text-white hover:bg-blue-500 active:bg-blue-600',
    outlined: isDisabled
      ? 'border-2 border-neutral-300 text-neutral-300 cursor-not-allowed active:scale-100'
      : 'border-2 border-blue-400 text-blue-400 hover:bg-blue-100 active:bg-blue-200',
    ghost: isDisabled
      ? 'text-neutral-300 cursor-not-allowed active:scale-100'
      : 'text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <>
          <Spinner size={spinnerSizes[size]} />
          <span className="sr-only">Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};
