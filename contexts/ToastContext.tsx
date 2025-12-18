"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  description?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => string;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Default durations by type (in ms)
const DEFAULT_DURATIONS: Record<ToastType, number> = {
  success: 5000,
  info: 5000,
  warning: 8000,
  error: 0, // Error toasts don't auto-dismiss
};

let toastIdCounter = 0;

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = `toast-${++toastIdCounter}`;
    const duration = toast.duration ?? DEFAULT_DURATIONS[toast.type];
    
    const newToast: Toast = {
      ...toast,
      id,
      duration,
    };

    setToasts(prev => [newToast, ...prev]); // Newest on top

    // Auto-dismiss if duration > 0
    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearAllToasts }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Convenience hooks for specific toast types
export const useSuccessToast = () => {
  const { addToast } = useToast();
  return useCallback((message: string, description?: string) => {
    return addToast({ type: 'success', message, description });
  }, [addToast]);
};

export const useErrorToast = () => {
  const { addToast } = useToast();
  return useCallback((message: string, description?: string) => {
    return addToast({ type: 'error', message, description });
  }, [addToast]);
};

export const useWarningToast = () => {
  const { addToast } = useToast();
  return useCallback((message: string, description?: string) => {
    return addToast({ type: 'warning', message, description });
  }, [addToast]);
};

export const useInfoToast = () => {
  const { addToast } = useToast();
  return useCallback((message: string, description?: string) => {
    return addToast({ type: 'info', message, description });
  }, [addToast]);
};
