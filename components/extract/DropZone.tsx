"use client";

import React, { useRef } from 'react';
import { FileUp } from 'lucide-react';
import { useDropZone } from '@/hooks/useDropZone';

interface DropZoneProps {
  onFileDrop: (file: File) => void;
  onError?: (error: string) => void;
}

export const DropZone: React.FC<DropZoneProps> = ({
  onFileDrop,
  onError,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { isDragging, isHovering, dropZoneProps } = useDropZone({
    acceptedTypes: ['application/pdf', '.pdf', '.dwg', '.dxf'],
    onFileDrop,
    onError,
  });

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileName = file.name.toLowerCase();
      
      if (fileName.endsWith('.pdf') || fileName.endsWith('.dwg') || fileName.endsWith('.dxf')) {
        onFileDrop(file);
      } else {
        onError?.('Invalid file type. Please upload a PDF or DWG file.');
      }
    }
  };

  // Determine state for styling
  const getStateStyles = () => {
    if (isDragging || isHovering) {
      if (isDragging) {
        return {
          border: 'border-solid border-blue-400',
          bg: 'bg-blue-100',
          iconColor: 'text-blue-400',
          scale: 'scale-[1.02]',
        };
      }
      return {
        border: 'border-dashed border-blue-300',
        bg: 'bg-neutral-50',
        iconColor: 'text-blue-400',
        scale: '',
      };
    }
    return {
      border: 'border-dashed border-neutral-300',
      bg: 'bg-neutral-50',
      iconColor: 'text-neutral-300',
      scale: '',
    };
  };

  const styles = getStateStyles();

  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      {/* Drop Zone Container */}
      <div
        {...dropZoneProps}
        className={`w-full max-w-[400px] h-[260px] flex flex-col items-center justify-center p-12 rounded-xl border-2 transition-all duration-200 ${styles.border} ${styles.bg} ${styles.scale}`}
      >
        {/* Animated Icon */}
        <div className={`mb-4 ${styles.iconColor} animate-float`}>
          <FileUp size={48} strokeWidth={1.5} />
        </div>
        
        {/* Main Text */}
        <p className="text-body-medium font-bold text-neutral-900 text-center">
          Drop your drawings here
        </p>
        
        {/* Or Separator */}
        <p className="text-detail text-neutral-500 my-4">
          or
        </p>
        
        {/* Browse Files Link */}
        <button
          onClick={handleBrowseClick}
          className="text-detail text-blue-400 hover:underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 rounded"
        >
          Browse files
        </button>
        
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.dwg,.dxf"
          onChange={handleFileChange}
          className="hidden"
          aria-hidden="true"
        />
      </div>
      
      {/* Tagline */}
      <p className="text-body-small text-neutral-600 text-center mt-6 max-w-[400px]">
        Extract equipment from any MEP drawing in under 60 seconds
      </p>
      
      {/* No Account Required */}
      <p className="text-micro text-neutral-500 text-center mt-2">
        No account required
      </p>
    </div>
  );
};
