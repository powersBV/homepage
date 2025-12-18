"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { checkboxAnimations } from '@/lib/animations';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  'aria-label'?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  disabled = false,
  id,
  'aria-label': ariaLabel,
}) => {
  return (
    <motion.button
      id={id}
      role="checkbox"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      animate={checked ? checkboxAnimations.pop.animate : {}}
      transition={checkboxAnimations.pop.transition}
      className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-1 ${
        checked
          ? 'bg-blue-400 border-blue-400'
          : 'bg-white border-neutral-300 hover:border-neutral-400'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <AnimatePresence>
        {checked && (
          <motion.span
            initial={checkboxAnimations.check.initial}
            animate={checkboxAnimations.check.animate}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={checkboxAnimations.check.transition}
          >
            <Check size={12} className="text-white" strokeWidth={3} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
