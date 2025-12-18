"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { useWindowSnapping, SnapZone, SnapBounds } from '@/hooks/useWindowSnapping';

interface SnapContextType {
  activeSnapZone: SnapZone;
  checkSnapZone: (mouseX: number, mouseY: number) => SnapZone;
  clearSnapZone: () => void;
  getSnapBounds: (zone: SnapZone) => SnapBounds | null;
  getPreviewBounds: () => SnapBounds | null;
}

const SnapContext = createContext<SnapContextType | undefined>(undefined);

export const SnapProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const snapping = useWindowSnapping({
    menuBarHeight: 40,
    dockHeight: 64,
    snapThreshold: 20,
    inset: 8,
  });

  return (
    <SnapContext.Provider value={snapping}>
      {children}
    </SnapContext.Provider>
  );
};

export const useSnap = (): SnapContextType => {
  const context = useContext(SnapContext);
  if (context === undefined) {
    throw new Error('useSnap must be used within a SnapProvider');
  }
  return context;
};
