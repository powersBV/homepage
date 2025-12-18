"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { Search, Filter, ChevronDown, ChevronRight } from 'lucide-react';
import { EquipmentItem, EquipmentCategory, categoryLabelsMap } from '@/lib/types';
import { groupEquipmentByCategory } from '@/lib/mock-data';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { EquipmentRow } from './EquipmentRow';

interface ResultsViewProps {
  filename: string;
  items: EquipmentItem[];
  selectedItems: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  onSaveProject: () => void;
  onGenerateRFQ: () => void;
  onExportCSV: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  filename,
  items,
  selectedItems,
  onSelectionChange,
  onSaveProject,
  onGenerateRFQ,
  onExportCSV,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());

  // Filter items by search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    
    const query = searchQuery.toLowerCase();
    return items.filter(item => 
      item.name.toLowerCase().includes(query) ||
      item.tag.toLowerCase().includes(query) ||
      item.model.toLowerCase().includes(query) ||
      item.specs.some(spec => spec.toLowerCase().includes(query))
    );
  }, [items, searchQuery]);

  // Group filtered items by category
  const groupedItems = useMemo(() => {
    return groupEquipmentByCategory(filteredItems);
  }, [filteredItems]);

  // Get selected items details
  const selectedItemDetails = useMemo(() => {
    return items.filter(item => selectedItems.includes(item.id));
  }, [items, selectedItems]);

  const toggleCategory = useCallback((category: string) => {
    setCollapsedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  }, []);

  const toggleItemSelection = useCallback((itemId: string) => {
    if (selectedItems.includes(itemId)) {
      onSelectionChange(selectedItems.filter(id => id !== itemId));
    } else {
      onSelectionChange([...selectedItems, itemId]);
    }
  }, [selectedItems, onSelectionChange]);

  const hasSelection = selectedItems.length > 0;

  return (
    <div className="flex h-full">
      {/* Left Panel - Equipment List (65%) */}
      <div className="w-[65%] flex flex-col border-r border-neutral-200">
        {/* Search Bar */}
        <div className="p-4 border-b border-neutral-100 flex gap-2">
          <div className="flex-1">
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={16} />}
            />
          </div>
          <Button variant="outlined" size="sm">
            <Filter size={16} className="mr-1" />
            Filter
          </Button>
        </div>
        
        {/* Equipment List */}
        <div className="flex-1 overflow-auto">
          {Object.entries(groupedItems).map(([category, categoryItems]) => {
            const isCollapsed = collapsedCategories.has(category);
            const categoryLabel = categoryLabelsMap[category as EquipmentCategory] || category;
            
            return (
              <div key={category}>
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center gap-2 px-4 py-3 bg-neutral-50 border-b border-neutral-100 hover:bg-neutral-100 transition-colors"
                >
                  {isCollapsed ? (
                    <ChevronRight size={16} className="text-neutral-600" />
                  ) : (
                    <ChevronDown size={16} className="text-neutral-600" />
                  )}
                  <span className="text-body-small font-bold text-neutral-900">
                    {categoryLabel}
                  </span>
                  <span className="text-body-small text-neutral-600">
                    ({categoryItems.length})
                  </span>
                </button>
                
                {/* Category Items */}
                {!isCollapsed && (
                  <div>
                    {categoryItems.map(item => (
                      <EquipmentRow
                        key={item.id}
                        item={item}
                        isSelected={selectedItems.includes(item.id)}
                        onToggle={toggleItemSelection}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Right Panel - Selection Summary (35%) */}
      <div className="w-[35%] bg-neutral-50 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-neutral-200">
          <p className="text-micro font-bold text-neutral-600 uppercase">
            Selected ({selectedItems.length})
          </p>
        </div>
        
        {/* Selection Content */}
        <div className="flex-1 overflow-auto p-4">
          {hasSelection ? (
            <div className="space-y-2">
              {selectedItemDetails.map(item => (
                <div key={item.id} className="text-detail text-neutral-700">
                  {item.name} (Qty: {item.quantity})
                </div>
              ))}
            </div>
          ) : (
            <p className="text-detail text-neutral-600 text-center">
              Select equipment to generate RFQ
            </p>
          )}
        </div>
        
        {/* Actions */}
        <div className="p-4 border-t border-neutral-200">
          <Button
            variant="filled"
            fullWidth
            disabled={!hasSelection}
            onClick={onGenerateRFQ}
          >
            Generate RFQ
          </Button>
          <div className="mt-2">
            <Button
              variant="outlined"
              fullWidth
              disabled={!hasSelection}
              onClick={onExportCSV}
            >
              Export CSV
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
