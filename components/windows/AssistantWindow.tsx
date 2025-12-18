"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageBubble } from '@/components/assistant/MessageBubble';
import { ChatInput } from '@/components/assistant/ChatInput';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

// Canned responses for Phase 2
const cannedResponses: Record<string, string> = {
  'equipment': 'I can help you with equipment selection! Tell me about your project requirements - building type, square footage, and climate zone would be helpful.',
  'hvac': 'For HVAC equipment, I can assist with RTUs, chillers, boilers, and more. What specific equipment are you looking for?',
  'spec': 'I can help generate equipment specifications. What type of equipment do you need specs for?',
  'proposal': 'I can help you build a proposal. Would you like to start from a template or create a custom one?',
  'help': 'I can assist with:\n- Equipment selection and sizing\n- Specification writing\n- Proposal generation\n- Technical questions\n\nWhat would you like help with?',
  'default': 'I understand you\'re asking about that. Let me help you - could you provide more details about your project requirements?'
};

const getResponse = (message: string): string => {
  const lower = message.toLowerCase();
  
  if (lower.includes('equipment')) return cannedResponses.equipment;
  if (lower.includes('hvac') || lower.includes('heating') || lower.includes('cooling')) return cannedResponses.hvac;
  if (lower.includes('spec')) return cannedResponses.spec;
  if (lower.includes('proposal') || lower.includes('quote')) return cannedResponses.proposal;
  if (lower.includes('help') || lower.includes('what can you')) return cannedResponses.help;
  
  return cannedResponses.default;
};

// Typing indicator component
const TypingIndicator: React.FC = () => (
  <div className="flex justify-start">
    <div className="bg-neutral-100 px-4 py-3 rounded-xl flex items-center gap-1">
      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  </div>
);

export const AssistantWindowContent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi! I can help you with equipment selection, specs, and procurement. What are you working on?'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate response delay
    setTimeout(() => {
      setIsTyping(false);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getResponse(content)
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {messages.map(message => (
          <MessageBubble
            key={message.id}
            role={message.role}
            content={message.content}
          />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <ChatInput onSend={handleSend} disabled={isTyping} />
    </div>
  );
};
