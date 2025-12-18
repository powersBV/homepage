"use client";

import React from 'react';
import { DemandChart, EquipmentDemand } from '../maker/DemandChart';
import { OpportunityCard, Opportunity } from '../maker/OpportunityCard';
import { ChevronDown } from 'lucide-react';

// Mock demand data
const mockDemandData = {
  projectCount: 12,
  equipment: [
    { name: 'RTUs', count: 34, percentage: 85 },
    { name: 'VAV Boxes', count: 18, percentage: 45 },
    { name: 'AHUs', count: 8, percentage: 20 }
  ] as EquipmentDemand[],
  opportunities: [
    { id: '1', projectName: 'Harbor Tower', spec: 'Trane or equal', count: 12, type: 'RTUs' },
    { id: '2', projectName: 'Riverside Medical', spec: 'Carrier or equal', count: 4, type: 'AHUs' }
  ] as Opportunity[]
};

interface DemandSignalsContentProps {
  projectCount?: number;
  equipment?: EquipmentDemand[];
  opportunities?: Opportunity[];
}

export const DemandSignalsContent: React.FC<DemandSignalsContentProps> = ({
  projectCount = mockDemandData.projectCount,
  equipment = mockDemandData.equipment,
  opportunities = mockDemandData.opportunities
}) => {
  const handlePushToRep = (opportunity: Opportunity) => {
    // TODO(BV-002): Trigger the push selection flow
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {/* Summary Stat */}
        <p className="text-body-medium text-neutral-900 mb-4">
          Your equipment specified on <strong>{projectCount} projects</strong>
        </p>

        {/* Bar Chart */}
        <DemandChart equipment={equipment} />

        {/* Selection Opportunities Section */}
        <div className="mt-6">
          <h3 className="text-body-small font-bold text-neutral-900 mb-2">
            Selection Opportunities
          </h3>
          <div className="border-t border-neutral-200 pt-4">
            {opportunities.map(opportunity => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                onPushToRep={handlePushToRep}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for the title bar "This Week" dropdown
export const ThisWeekDropdown: React.FC = () => {
  return (
    <button className="flex items-center gap-1 text-detail text-neutral-600 hover:text-neutral-900 transition-colors">
      This Week
      <ChevronDown size={14} />
    </button>
  );
};
