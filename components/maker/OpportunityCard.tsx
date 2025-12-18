"use client";

import React, { memo } from 'react';

export interface Opportunity {
  id: string;
  projectName: string;
  spec: string;
  count: number;
  type: string;
}

interface OpportunityCardProps {
  opportunity: Opportunity;
  onPushToRep?: (opportunity: Opportunity) => void;
}

export const OpportunityCard = memo(function OpportunityCard({ 
  opportunity, 
  onPushToRep 
}: OpportunityCardProps) {
  return (
    <div className="p-4 border border-neutral-200 rounded-lg mb-3 bg-white hover:border-neutral-300 transition-colors">
      {/* Project Name */}
      <h3 className="text-body-small font-bold text-neutral-900">
        {opportunity.projectName}
      </h3>
      
      {/* Spec Info */}
      <p className="text-detail text-neutral-700 mt-1">
        Spec says &ldquo;{opportunity.spec}&rdquo; — {opportunity.count} {opportunity.type}
      </p>
      
      {/* Action Button */}
      <button
        onClick={() => onPushToRep?.(opportunity)}
        className="mt-3 text-detail text-blue-400 hover:text-blue-500 font-normal transition-colors"
      >
      Push Selection to Rep
    </button>
    </div>
  );
});

OpportunityCard.displayName = 'OpportunityCard';
