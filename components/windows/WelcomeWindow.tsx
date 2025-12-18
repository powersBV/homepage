'use client';

import { memo, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { markWelcomeSeen } from '@/lib/welcome';
import { useWindowManager } from '@/components/desktop/WindowManagerContext';

export const WelcomeWindowContent = memo(function WelcomeWindowContent() {
  const { closeWindow, focusWindow } = useWindowManager();

  const handleGetStarted = useCallback(() => {
    markWelcomeSeen();
    closeWindow('welcome');
    focusWindow('extract');
  }, [closeWindow, focusWindow]);

  return (
    <div className="flex flex-col items-center px-12 py-10 h-full">
      {/* Headline */}
      <div className="text-center mb-10">
        <h1 className="text-[36px] leading-[48px] text-neutral-900">
          Construction buys $200B in MEP equipment
          <br />
          through chaos.
        </h1>
        <p className="text-[36px] leading-[48px] font-bold text-[#4A3AFF] mt-2">
          We make it flow.
        </p>
      </div>

      {/* Transformation Graphic */}
      <div className="bg-[#F8F8F8] rounded-lg p-6 mb-10">
        <TransformationGraphic />
      </div>

      {/* CTA */}
      <p className="text-[18px] leading-[28px] text-[#535257] mb-4">
        Drop any MEP drawing to try it free
      </p>
      <button
        type="button"
        onClick={handleGetStarted}
        className="px-8 py-3 bg-[#4A3AFF] hover:bg-[#3F31DE] text-white text-[16px] font-bold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#ABBBFF]"
      >
        Get Started
      </button>
    </div>
  );
});

WelcomeWindowContent.displayName = 'WelcomeWindowContent';

function TransformationGraphic() {
  return (
    <div className="flex items-center gap-8">
      {/* PDF representation */}
      <div className="w-20 h-24 border-2 border-[#AEB0B7] rounded-lg flex flex-col items-center justify-center gap-1.5 p-3">
        <div className="w-full h-1 bg-[#AEB0B7] rounded" />
        <div className="w-full h-1 bg-[#AEB0B7] rounded" />
        <div className="w-full h-1 bg-[#AEB0B7] rounded" />
        <div className="w-3/4 h-1 bg-[#AEB0B7] rounded" />
      </div>

      {/* Arrow with label */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-[12px] text-[#8C8C92]">60 sec</span>
        <ArrowRight className="w-8 h-8 text-[#4A3AFF]" />
      </div>

      {/* Equipment cards */}
      <div className="flex gap-2">
        <EquipmentCardMini tag="RTU-1" spec="10 Ton" />
        <EquipmentCardMini tag="VAV-12" spec="600 CFM" />
        <div className="w-16 h-14 bg-white border border-[#C9CBCF] rounded-md flex items-center justify-center">
          <span className="text-[14px] text-[#AEB0B7]">...</span>
        </div>
      </div>
    </div>
  );
}

function EquipmentCardMini({ tag, spec }: { tag: string; spec: string }) {
  return (
    <div className="w-16 h-14 bg-white border border-[#C9CBCF] rounded-md p-2">
      <div className="text-[12px] font-bold text-[#18191B] truncate">{tag}</div>
      <div className="text-[10px] text-[#6C6C71] truncate">{spec}</div>
    </div>
  );
}
