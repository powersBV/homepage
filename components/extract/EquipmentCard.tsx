"use client";

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { EquipmentItem } from '@/lib/types';
import { cardAnimations } from '@/lib/animations';

interface EquipmentCardProps {
  item: EquipmentItem;
  index: number;
}

export const EquipmentCard = memo(function EquipmentCard({
  item,
  index,
}: EquipmentCardProps) {
  return (
    <motion.div
      initial={cardAnimations.appear.initial}
      animate={cardAnimations.appear.animate}
      transition={{ 
        ...cardAnimations.appear.transition,
        delay: index * 0.05, // 50ms stagger
      }}
      whileHover={{ 
        borderColor: 'var(--neutral-300)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      }}
      className="w-[100px] h-[60px] bg-white border border-neutral-200 rounded-md p-2 flex flex-col justify-center cursor-pointer transition-colors"
    >
      <p className="text-detail font-bold text-neutral-900 truncate">
        {item.tag}
      </p>
      <p className="text-micro text-neutral-600 truncate">
        {item.specs[0] || item.name}
      </p>
    </motion.div>
  );
});

EquipmentCard.displayName = 'EquipmentCard';
