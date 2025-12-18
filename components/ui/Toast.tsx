"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { Toast as ToastType, ToastType as ToastVariant } from '@/contexts/ToastContext';
import { toastAnimations } from '@/lib/animations';

interface ToastProps {
  toast: ToastType;
  onDismiss: (id: string) => void;
}

const TOAST_ICONS: Record<ToastVariant, React.FC<{ size?: number; className?: string }>> = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const TOAST_COLORS: Record<ToastVariant, { border: string; icon: string }> = {
  success: { border: 'border-l-green-400', icon: 'text-green-700' },
  error: { border: 'border-l-red-400', icon: 'text-red-700' },
  warning: { border: 'border-l-yellow-400', icon: 'text-yellow-700' },
  info: { border: 'border-l-blue-400', icon: 'text-blue-700' },
};

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  const Icon = TOAST_ICONS[toast.type];
  const colors = TOAST_COLORS[toast.type];

  return (
    <motion.div
      layout
      initial={toastAnimations.enter.initial}
      animate={toastAnimations.enter.animate}
      exit={toastAnimations.exit.exit}
      transition={toastAnimations.enter.transition}
      className={`
        w-full max-w-[360px] p-4 bg-white rounded-lg border-l-4 ${colors.border}
        shadow-elevated flex items-start gap-3
      `}
      role="alert"
      aria-live={toast.type === 'error' ? 'assertive' : 'polite'}
    >
      {/* Icon */}
      <Icon size={20} className={`${colors.icon} shrink-0 mt-0.5`} />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-body-small font-normal text-neutral-900">
          {toast.message}
        </p>
        {toast.description && (
          <p className="text-detail text-neutral-600 mt-1">
            {toast.description}
          </p>
        )}
      </div>

      {/* Dismiss button */}
      <button
        onClick={() => onDismiss(toast.id)}
        className="shrink-0 p-1 text-neutral-600 hover:text-neutral-800 rounded transition-colors"
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
};
