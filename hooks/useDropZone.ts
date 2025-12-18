"use client";

import { useState, useCallback, useRef } from 'react';

interface UseDropZoneOptions {
  acceptedTypes: string[];
  onFileDrop: (file: File) => void;
  onError?: (error: string) => void;
}

interface UseDropZoneReturn {
  isDragging: boolean;
  isHovering: boolean;
  dropZoneProps: {
    onDragEnter: (e: React.DragEvent) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDragLeave: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent) => void;
  };
}

export function useDropZone({
  acceptedTypes,
  onFileDrop,
  onError,
}: UseDropZoneOptions): UseDropZoneReturn {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const dragCounter = useRef(0);

  const isValidFile = useCallback((file: File): boolean => {
    const fileName = file.name.toLowerCase();
    const fileType = file.type.toLowerCase();
    
    return acceptedTypes.some(type => {
      if (type.startsWith('.')) {
        return fileName.endsWith(type.toLowerCase());
      }
      return fileType === type.toLowerCase();
    });
  }, [acceptedTypes]);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsHovering(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    
    if (dragCounter.current === 0) {
      setIsDragging(false);
      setIsHovering(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsDragging(false);
    setIsHovering(false);
    dragCounter.current = 0;

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      if (isValidFile(file)) {
        onFileDrop(file);
      } else {
        onError?.(`Invalid file type. Please upload a PDF or DWG file.`);
      }
    }
  }, [isValidFile, onFileDrop, onError]);

  return {
    isDragging,
    isHovering,
    dropZoneProps: {
      onDragEnter: handleDragEnter,
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
    },
  };
}
