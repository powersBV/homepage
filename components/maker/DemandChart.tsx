"use client";

import React from 'react';

export interface EquipmentDemand {
  name: string;
  count: number;
  percentage: number;
}

interface DemandChartProps {
  equipment: EquipmentDemand[];
}

export const DemandChart: React.FC<DemandChartProps> = ({ equipment }) => {
  return (
    <div className="border border-neutral-200 rounded-lg p-4 bg-white">
      <div className="space-y-3">
        {equipment.map((item) => (
          <div key={item.name} className="flex items-center gap-4">
            {/* Label */}
            <span className="text-body-small text-neutral-700 w-24 shrink-0">
              {item.name}
            </span>
            
            {/* Bar */}
            <div className="flex-1 h-4 bg-neutral-100 rounded overflow-hidden">
              <div 
                className="h-full bg-blue-400 rounded transition-all duration-300"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
            
            {/* Value */}
            <span className="text-body-small text-neutral-600 w-20 text-right shrink-0">
              {item.count} units
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
