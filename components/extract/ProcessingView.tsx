"use client";

import React from 'react';
import { FileText } from 'lucide-react';
import { EquipmentItem } from '@/lib/types';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { EquipmentCard } from './EquipmentCard';

interface ProcessingViewProps {
  filename: string;
  progress: number;
  currentSheet: number;
  totalSheets: number;
  extractedItems: EquipmentItem[];
}

export const ProcessingView: React.FC<ProcessingViewProps> = ({
  filename,
  progress,
  currentSheet,
  totalSheets,
  extractedItems,
}) => {
  return (
    <div className="flex flex-col h-full p-6">
      {/* Top Section - File Info and Status */}
      <div className="flex items-start gap-6 mb-6">
        {/* PDF Thumbnail Placeholder */}
        <div className="w-24 h-32 bg-neutral-100 border border-neutral-200 rounded-lg flex items-center justify-center shrink-0">
          <FileText size={32} className="text-neutral-300" strokeWidth={1.5} />
        </div>
        
        {/* Status Text */}
        <div className="flex-1">
          <p className="text-body-medium font-bold text-neutral-900">
            Analyzing drawings...
          </p>
          <p className="text-micro text-neutral-600 mt-1">
            Sheet {currentSheet} of {totalSheets}
          </p>
        </div>
      </div>
      
      {/* Equipment Cards Grid */}
      <div className="flex-1 overflow-hidden">
        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 h-full overflow-auto">
          <div className="flex flex-wrap gap-2">
            {extractedItems.map((item, index) => (
              <EquipmentCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom Section - Progress */}
      <div className="mt-6">
        {/* Counter */}
        <p className="text-detail text-neutral-700 mb-2">
          {extractedItems.length} items extracted
        </p>
        
        {/* Progress Bar */}
        <div className="flex items-center gap-3">
          <ProgressBar progress={progress} className="flex-1" />
          <span className="text-micro text-neutral-600 w-10 text-right">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
};
