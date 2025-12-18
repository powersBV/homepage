"use client";

import React from 'react';
import { Volume2 } from 'lucide-react';

export const SoundToolContent: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
        <Volume2 size={32} className="text-purple-500" />
      </div>
      <h2 className="text-xl font-bold text-neutral-900 mb-2">
        Sound Calculator
      </h2>
      <p className="text-neutral-600 mb-6 max-w-sm">
        Calculate sound levels, attenuation, and NC/RC ratings for HVAC systems.
      </p>
      <div className="px-4 py-2 bg-neutral-100 rounded-lg text-neutral-500 text-sm">
        Coming soon
      </div>
    </div>
  );
};
