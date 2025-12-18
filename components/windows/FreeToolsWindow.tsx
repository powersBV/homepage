"use client";

import React, { useCallback, memo } from 'react';
import { useWindowManager } from '@/components/desktop/WindowManagerContext';

interface ToolCardData {
  id: string;
  name: string;
  description: string;
  windowType: string;
}

const freeTools: ToolCardData[] = [
  { 
    id: 'tool-psychrometric', 
    name: 'Psychrometric Calculator', 
    description: 'Calculate air properties and processes',
    windowType: 'tool-psychrometric'
  },
  { 
    id: 'tool-sound', 
    name: 'Sound Calculator', 
    description: 'Calculate sound levels and attenuation',
    windowType: 'tool-sound'
  },
  { 
    id: 'tool-converter', 
    name: 'Unit Converter', 
    description: 'Convert between common HVAC units',
    windowType: 'tool-converter'
  },
];

interface ToolCardProps {
  tool: ToolCardData;
  onClick: () => void;
}

const ToolCard = memo(function ToolCard({ tool, onClick }: ToolCardProps) {
  return (
  <button
    onClick={onClick}
    className="w-full p-4 border border-neutral-200 rounded-lg text-left hover:bg-neutral-50 hover:border-neutral-300 transition-colors cursor-pointer"
  >
    <h3 
      className="font-bold text-neutral-900 mb-1"
      style={{ fontSize: '16px', lineHeight: '22px' }}
    >
      {tool.name}
    </h3>
    <p 
      className="text-neutral-600"
      style={{ fontSize: '14px', lineHeight: '18px' }}
    >
      {tool.description}
    </p>
  </button>
  );
});

ToolCard.displayName = 'ToolCard';

export const FreeToolsWindowContent: React.FC = () => {
  const { openWindow } = useWindowManager();

  const handleToolClick = useCallback((tool: ToolCardData) => {
    openWindow(tool.id, tool.windowType, tool.name, { width: 600, height: 500 });
  }, [openWindow]);

  return (
    <div className="p-4 space-y-3">
      {freeTools.map(tool => (
        <ToolCard 
          key={tool.id} 
          tool={tool} 
          onClick={() => handleToolClick(tool)}
        />
      ))}
    </div>
  );
};
