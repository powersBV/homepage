"use client";

import React from 'react';
import Image from 'next/image';
import { Monitor } from 'lucide-react';

export const MobileNotice: React.FC = () => {
  return (
    <div className="h-screen w-screen bg-neutral-50 flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <div className="mb-8">
        <Image
          src="/logo/full.png"
          alt="BuildVision"
          width={160}
          height={40}
          className="h-10 w-auto"
          priority
        />
      </div>
      
      {/* Icon */}
      <div className="mb-6">
        <Monitor size={64} className="text-neutral-300" strokeWidth={1} />
      </div>
      
      {/* Message */}
      <h1 className="text-body-medium font-bold text-neutral-900 text-center mb-2">
        BuildVision is optimized for desktop
      </h1>
      
      <p className="text-body-small text-neutral-600 text-center max-w-[300px]">
        Please use a larger screen for the best experience with our desktop environment.
      </p>
      
      {/* Minimum requirements */}
      <p className="text-micro text-neutral-500 text-center mt-6">
        Minimum screen width: 768px
      </p>
    </div>
  );
};
