"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnap } from '@/contexts/SnapContext';

export const SnapPreview: React.FC = () => {
  const { activeSnapZone, getPreviewBounds } = useSnap();
  const bounds = getPreviewBounds();

  return (
    <AnimatePresence>
      {activeSnapZone && bounds && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="fixed pointer-events-none z-[50] bg-blue-100/50 border-2 border-blue-400 rounded-lg"
          style={{
            left: bounds.x,
            top: bounds.y,
            width: bounds.width,
            height: bounds.height,
          }}
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
  );
};
