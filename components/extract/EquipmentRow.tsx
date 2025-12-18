"use client";

import React, { memo } from 'react';
import { EquipmentItem } from '@/lib/types';
import { Checkbox } from '@/components/ui/Checkbox';

interface EquipmentRowProps {
  item: EquipmentItem;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export const EquipmentRow = memo(function EquipmentRow({
  item,
  isSelected,
  onToggle,
}: EquipmentRowProps) {
  return (
    <div
      onClick={() => onToggle(item.id)}
      className={`flex items-start gap-3 p-3 cursor-pointer transition-colors duration-150 ${
        isSelected 
          ? 'bg-blue-100 border-l-2 border-l-blue-400' 
          : 'hover:bg-neutral-100 border-l-2 border-l-transparent'
      }`}
    >
      {/* Checkbox */}
      <div className="pt-0.5">
        <Checkbox
          checked={isSelected}
          onChange={() => onToggle(item.id)}
          aria-label={`Select ${item.name}`}
        />
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Name and Quantity Row */}
        <div className="flex items-center justify-between gap-2">
          <p className="text-body-small font-bold text-neutral-900 truncate">
            {item.name}
          </p>
          <p className="text-body-small text-neutral-600 shrink-0">
            Qty: {item.quantity}
          </p>
        </div>
        
        {/* Details */}
        <p className="text-detail text-neutral-600 truncate mt-0.5">
          {item.model} · {item.specs.join(' · ')}
        </p>
        
        {/* Spec Section */}
        <p className="text-micro text-neutral-600 mt-0.5">
          Spec: {item.specSection}
        </p>
      </div>
    </div>
  );
});

EquipmentRow.displayName = 'EquipmentRow';
