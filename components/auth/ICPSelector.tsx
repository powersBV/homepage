"use client";

import React, { useState } from 'react';

type ICPType = 'buyer' | 'seller' | 'maker';

interface ICPOption {
  id: ICPType;
  title: string;
  subtitle: string;
  description: string;
}

const icpOptions: ICPOption[] = [
  {
    id: 'buyer',
    title: 'I BUY',
    subtitle: 'equipment',
    description: 'Contractor, owner, GC, engineer',
  },
  {
    id: 'seller',
    title: 'I SELL',
    subtitle: 'equipment',
    description: 'Rep, agent, distributor',
  },
  {
    id: 'maker',
    title: 'I MAKE',
    subtitle: 'equipment',
    description: 'Manufacturer, OEM',
  },
];

interface ICPSelectorProps {
  onSelect: (icp: ICPType) => void;
  isLoading?: boolean;
}

export const ICPSelector: React.FC<ICPSelectorProps> = ({ onSelect, isLoading = false }) => {
  const [selectedICP, setSelectedICP] = useState<ICPType | null>(null);

  const handleContinue = () => {
    if (selectedICP) {
      onSelect(selectedICP);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <h2 className="text-header-5 font-bold text-neutral-900 text-center mb-8">
        What best describes you?
      </h2>

      {/* ICP Cards */}
      <div className="flex justify-center gap-4 mb-8">
        {icpOptions.map((option) => {
          const isSelected = selectedICP === option.id;
          
          return (
            <button
              key={option.id}
              onClick={() => setSelectedICP(option.id)}
              className={`w-[150px] h-[180px] p-4 rounded-lg text-center cursor-pointer transition-all ${
                isSelected
                  ? 'border-2 border-blue-400 bg-blue-100'
                  : 'border border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50'
              }`}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-body-medium font-bold text-neutral-900">
                  {option.title}
                </div>
                <div className="text-body-medium font-bold text-neutral-900 mb-4">
                  {option.subtitle}
                </div>
                <div className="text-detail text-neutral-600 leading-tight">
                  {option.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Continue Button */}
      <div className="flex justify-center">
        <button
          onClick={handleContinue}
          disabled={!selectedICP || isLoading}
          className={`px-8 h-[44px] text-body-small font-bold rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 ${
            selectedICP && !isLoading
              ? 'bg-blue-400 text-white hover:bg-blue-500'
              : 'bg-neutral-300 text-neutral-600 cursor-not-allowed'
          }`}
        >
          {isLoading ? 'Setting up...' : 'Continue'}
        </button>
      </div>
    </div>
  );
};
