"use client";

import { useEffect, useCallback, useRef } from 'react';

interface UseKeyboardNavigationOptions {
  enabled?: boolean;
  onEscape?: () => void;
  containerRef?: React.RefObject<HTMLElement>;
}

/**
 * Hook for managing keyboard navigation within a container.
 * Handles Tab cycling and Escape key behavior.
 */
export function useKeyboardNavigation(options: UseKeyboardNavigationOptions = {}) {
  const { enabled = true, onEscape, containerRef } = options;
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  // Get all focusable elements within a container
  const getFocusableElements = useCallback((container: HTMLElement): HTMLElement[] => {
    const focusableSelectors = [
      'button:not([disabled])',
      'a[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ].join(', ');

    return Array.from(container.querySelectorAll(focusableSelectors)) as HTMLElement[];
  }, []);

  // Focus the first focusable element
  const focusFirst = useCallback(() => {
    if (!containerRef?.current) return;
    const elements = getFocusableElements(containerRef.current);
    if (elements.length > 0) {
      lastFocusedElement.current = document.activeElement as HTMLElement;
      elements[0].focus();
    }
  }, [containerRef, getFocusableElements]);

  // Focus the last focusable element
  const focusLast = useCallback(() => {
    if (!containerRef?.current) return;
    const elements = getFocusableElements(containerRef.current);
    if (elements.length > 0) {
      lastFocusedElement.current = document.activeElement as HTMLElement;
      elements[elements.length - 1].focus();
    }
  }, [containerRef, getFocusableElements]);

  // Restore focus to the previously focused element
  const restoreFocus = useCallback(() => {
    if (lastFocusedElement.current) {
      lastFocusedElement.current.focus();
      lastFocusedElement.current = null;
    }
  }, []);

  // Handle keyboard events
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle Escape
      if (e.key === 'Escape') {
        onEscape?.();
        return;
      }

      // Handle Tab within container
      if (e.key === 'Tab' && containerRef?.current) {
        const focusableElements = getFocusableElements(containerRef.current);
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        // If we're at the last element and pressing Tab, wrap to first
        if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }

        // If we're at the first element and pressing Shift+Tab, wrap to last
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, onEscape, containerRef, getFocusableElements]);

  return {
    focusFirst,
    focusLast,
    restoreFocus,
    getFocusableElements,
  };
}

export default useKeyboardNavigation;
