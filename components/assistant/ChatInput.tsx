"use client";

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="h-16 px-4 py-3 border-t border-neutral-100 flex items-center gap-3"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything..."
        disabled={disabled}
        className="flex-1 bg-transparent outline-none text-neutral-900 placeholder-neutral-400"
        style={{ fontSize: '14px', lineHeight: '18px' }}
      />
      <button
        type="submit"
        disabled={!message.trim() || disabled}
        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: '#4A3AFF' }}
        aria-label="Send message"
      >
        <ArrowRight size={18} className="text-white" />
      </button>
    </form>
  );
};
