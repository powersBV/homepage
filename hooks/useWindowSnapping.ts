"use client";

import { useState, useCallback, useRef } from 'react';

export type SnapZone = 
  | 'left' 
  | 'right' 
  | 'maximize' 
  | 'top-left' 
  | 'top-right' 
  | 'bottom-left' 
  | 'bottom-right'
  | null;

export interface SnapBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface UseWindowSnappingOptions {
  menuBarHeight?: number;
  dockHeight?: number;
  snapThreshold?: number;
  inset?: number;
}

const DEFAULT_OPTIONS: Required<UseWindowSnappingOptions> = {
  menuBarHeight: 40,
  dockHeight: 64,
  snapThreshold: 20,
  inset: 8,
};

export function useWindowSnapping(options: UseWindowSnappingOptions = {}) {
  const config = { ...DEFAULT_OPTIONS, ...options };
  const [activeSnapZone, setActiveSnapZone] = useState<SnapZone>(null);
  const lastSnapZone = useRef<SnapZone>(null);

  // Get the snap zone based on mouse position
  const getSnapZone = useCallback((mouseX: number, mouseY: number): SnapZone => {
    if (typeof window === 'undefined') return null;

    const { innerWidth, innerHeight } = window;
    const { menuBarHeight, dockHeight, snapThreshold } = config;

    const isNearLeft = mouseX < snapThreshold;
    const isNearRight = mouseX > innerWidth - snapThreshold;
    const isNearTop = mouseY < menuBarHeight + snapThreshold;
    const isNearBottom = mouseY > innerHeight - dockHeight - snapThreshold;

    // Corner detection (corners take priority)
    if (isNearTop && isNearLeft) return 'top-left';
    if (isNearTop && isNearRight) return 'top-right';
    if (isNearBottom && isNearLeft) return 'bottom-left';
    if (isNearBottom && isNearRight) return 'bottom-right';

    // Edge detection
    if (isNearLeft) return 'left';
    if (isNearRight) return 'right';
    if (isNearTop) return 'maximize';

    return null;
  }, [config]);

  // Calculate the bounds for a given snap zone
  const getSnapBounds = useCallback((zone: SnapZone): SnapBounds | null => {
    if (!zone || typeof window === 'undefined') return null;

    const { innerWidth, innerHeight } = window;
    const { menuBarHeight, dockHeight, inset } = config;

    const availableHeight = innerHeight - menuBarHeight - dockHeight;
    const halfWidth = (innerWidth - inset * 2) / 2;
    const halfHeight = (availableHeight - inset) / 2;

    switch (zone) {
      case 'left':
        return {
          x: inset,
          y: menuBarHeight + inset,
          width: halfWidth - inset / 2,
          height: availableHeight - inset,
        };
      case 'right':
        return {
          x: inset + halfWidth + inset / 2,
          y: menuBarHeight + inset,
          width: halfWidth - inset / 2,
          height: availableHeight - inset,
        };
      case 'maximize':
        return {
          x: inset,
          y: menuBarHeight + inset,
          width: innerWidth - inset * 2,
          height: availableHeight - inset,
        };
      case 'top-left':
        return {
          x: inset,
          y: menuBarHeight + inset,
          width: halfWidth - inset / 2,
          height: halfHeight - inset / 2,
        };
      case 'top-right':
        return {
          x: inset + halfWidth + inset / 2,
          y: menuBarHeight + inset,
          width: halfWidth - inset / 2,
          height: halfHeight - inset / 2,
        };
      case 'bottom-left':
        return {
          x: inset,
          y: menuBarHeight + inset + halfHeight + inset / 2,
          width: halfWidth - inset / 2,
          height: halfHeight - inset / 2,
        };
      case 'bottom-right':
        return {
          x: inset + halfWidth + inset / 2,
          y: menuBarHeight + inset + halfHeight + inset / 2,
          width: halfWidth - inset / 2,
          height: halfHeight - inset / 2,
        };
      default:
        return null;
    }
  }, [config]);

  // Check snap zone during drag
  const checkSnapZone = useCallback((mouseX: number, mouseY: number) => {
    const zone = getSnapZone(mouseX, mouseY);
    if (zone !== lastSnapZone.current) {
      lastSnapZone.current = zone;
      setActiveSnapZone(zone);
    }
    return zone;
  }, [getSnapZone]);

  // Clear snap zone (call on drag end)
  const clearSnapZone = useCallback(() => {
    lastSnapZone.current = null;
    setActiveSnapZone(null);
  }, []);

  // Get preview bounds for the active zone
  const getPreviewBounds = useCallback((): SnapBounds | null => {
    return getSnapBounds(activeSnapZone);
  }, [activeSnapZone, getSnapBounds]);

  return {
    activeSnapZone,
    checkSnapZone,
    clearSnapZone,
    getSnapBounds,
    getPreviewBounds,
  };
}

export default useWindowSnapping;
