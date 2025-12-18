"use client";

import React from 'react';
import { RFQCard, RFQ } from '../seller/RFQCard';

// Mock RFQ data
const mockRFQs: RFQ[] = [
  { 
    id: '1', 
    projectName: 'Harbor Tower', 
    company: 'ACME Mechanical', 
    summary: '12 RTUs, 8 VAV boxes, 6 exhaust fans', 
    isNew: true, 
    timestamp: '2 hours ago' 
  },
  { 
    id: '2', 
    projectName: '123 Main Street', 
    company: 'Smith Contractors',
    summary: '24 VAV boxes, 4 AHUs', 
    isNew: true, 
    timestamp: 'Yesterday' 
  },
  { 
    id: '3', 
    projectName: 'Riverside Medical', 
    company: 'BuildRight Inc',
    summary: '89 items across 4 categories', 
    isNew: false, 
    timestamp: 'Dec 10' 
  }
];

interface IncomingRFQsContentProps {
  rfqs?: RFQ[];
}

export const IncomingRFQsContent: React.FC<IncomingRFQsContentProps> = ({ 
  rfqs = mockRFQs 
}) => {
  const newCount = rfqs.filter(rfq => rfq.isNew).length;

  const handleViewQuote = (rfq: RFQ) => {
    // TODO(BV-001): Open the RFQ detail view
  };

  // Empty state
  if (rfqs.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 bg-white">
        <div className="w-16 h-16 mb-4 text-neutral-300">
          <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="8" y="12" width="48" height="40" rx="4" />
            <path d="M8 24h48" />
            <path d="M24 36h16" />
            <path d="M24 44h8" />
          </svg>
        </div>
        <h3 className="text-body-medium font-bold text-neutral-600 mb-2">
          No incoming RFQs
        </h3>
        <p className="text-detail text-neutral-500 text-center max-w-xs">
          When contractors request quotes, they&apos;ll appear here
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {rfqs.map(rfq => (
          <RFQCard 
            key={rfq.id} 
            rfq={rfq} 
            onViewQuote={handleViewQuote}
          />
        ))}
      </div>
    </div>
  );
};

// Helper component for the title bar badge
export const RFQBadge: React.FC<{ count: number }> = ({ count }) => {
  if (count === 0) return null;
  
  return (
    <span className="text-detail text-neutral-600">
      {count} new
    </span>
  );
};

// Get the badge for the title bar
export const getIncomingRFQsBadge = (rfqs: RFQ[] = mockRFQs) => {
  const newCount = rfqs.filter(rfq => rfq.isNew).length;
  return <RFQBadge count={newCount} />;
};
