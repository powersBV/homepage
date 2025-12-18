"use client";

import React, { memo } from 'react';

export interface RFQ {
  id: string;
  projectName: string;
  company: string;
  summary: string;
  isNew: boolean;
  timestamp: string;
}

interface RFQCardProps {
  rfq: RFQ;
  onViewQuote?: (rfq: RFQ) => void;
}

export const RFQCard = memo(function RFQCard({ rfq, onViewQuote }: RFQCardProps) {
  return (
    <div className="p-4 border border-neutral-200 rounded-lg mb-3 bg-white hover:border-neutral-300 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          {/* New indicator */}
          {rfq.isNew && (
            <div 
              className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"
              aria-label="New RFQ"
            />
          )}
          {!rfq.isNew && (
            <div className="w-1.5 h-1.5 shrink-0" aria-hidden="true" />
          )}
          
          <div className="flex-1 min-w-0">
            {/* Project Name */}
            <h3 className="text-body-small font-bold text-neutral-900 truncate">
              {rfq.projectName}
            </h3>
            
            {/* Company */}
            <p className="text-detail text-neutral-600 mt-0.5">
              {rfq.company}
            </p>
            
            {/* Summary */}
            <p className="text-detail text-neutral-700 mt-1">
              {rfq.summary}
            </p>
            
            {/* Action Button */}
            <button
              onClick={() => onViewQuote?.(rfq)}
              className="mt-3 text-detail text-blue-400 hover:text-blue-500 font-normal transition-colors"
            >
              View &amp; Quote
            </button>
          </div>
        </div>
        
        {/* Timestamp */}
        <span className="text-detail text-neutral-500 shrink-0 ml-4">
          {rfq.timestamp}
        </span>
      </div>
    </div>
  );
});

RFQCard.displayName = 'RFQCard';
