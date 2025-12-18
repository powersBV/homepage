"use client";

import React from 'react';

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ role, content }) => {
  const isUser = role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] px-4 py-3 rounded-xl ${
          isUser
            ? 'bg-blue-500 text-white'
            : 'bg-neutral-100 text-neutral-900'
        }`}
        style={{ 
          fontSize: '16px', 
          lineHeight: '22px',
          backgroundColor: isUser ? '#4A3AFF' : undefined
        }}
      >
        {content}
      </div>
    </div>
  );
};
