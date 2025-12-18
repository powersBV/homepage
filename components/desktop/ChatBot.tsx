"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageSquare, Wrench, ChevronRight } from 'lucide-react';
import { tools, Tool } from '@/lib/tools-data';
import { iconMap } from '../icons/ToolIcons';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  toolSuggestion?: Tool;
}

interface ChatBotContentProps {
  onToolSelect?: (tool: Tool) => void;
}

export const ChatBotContent: React.FC<ChatBotContentProps> = ({ onToolSelect }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm the BuildVision AI assistant. I can help you find the right tool for your MEP equipment workflow. What are you trying to accomplish?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findRelevantTool = (query: string): Tool | null => {
    const lowerQuery = query.toLowerCase();
    
    // Keyword matching for tools
    const toolKeywords: Record<string, string[]> = {
      'ai-takeoff': ['takeoff', 'extract', 'equipment', 'drawings', 'pdf', 'plans', 'identify', 'detect'],
      'spec-writer': ['spec', 'specification', 'write', 'generate', 'document'],
      'ai-scope-sheet': ['scope', 'rfq', 'quote', 'request'],
      'submittal-review': ['submittal', 'review', 'check', 'deviation'],
      'selection-copilot': ['select', 'alternative', 'compare', 'manufacturer', 'options'],
      'psychrometric-calculator': ['psychrometric', 'air', 'humidity', 'temperature', 'hvac'],
      'sound-analyzer': ['sound', 'noise', 'db', 'decibel', 'nc', 'acoustic'],
      'unit-converter': ['convert', 'unit', 'cfm', 'btu', 'kw', 'ton'],
      'proposal-maker': ['proposal', 'client', 'present'],
      'procurement-report': ['procurement', 'order', 'track', 'lead time', 'delivery'],
      'submittal-approval-flow': ['approval', 'workflow', 'engineer', 'contractor'],
      've-alternate-tool': ['value engineering', 've', 'alternate', 'substitute', 'cost'],
      'credit-check-flow': ['credit', 'vendor', 'verify'],
      'anomaly-detection': ['anomaly', 'error', 'mistake', 'catch', 'wrong'],
      'analytics-dashboard': ['analytics', 'dashboard', 'insights', 'report', 'performance'],
    };

    for (const [toolId, keywords] of Object.entries(toolKeywords)) {
      if (keywords.some(keyword => lowerQuery.includes(keyword))) {
        return tools.find(t => t.id === toolId) || null;
      }
    }

    return null;
  };

  const generateResponse = (userMessage: string): { content: string; tool: Tool | null } => {
    const tool = findRelevantTool(userMessage);
    
    if (tool) {
      return {
        content: `Based on what you're describing, I'd recommend using **${tool.name}**. ${tool.description}\n\nWould you like me to open this tool for you?`,
        tool,
      };
    }

    // General responses
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return {
        content: "Hello! I'm here to help you navigate BuildVision's tools. Are you working on equipment extraction, specifications, procurement, or something else?",
        tool: null,
      };
    }

    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      return {
        content: "I can help you find the right BuildVision tool for your needs. We have:\n\n• **AI-Powered Tools** - Extract equipment, write specs, review submittals\n• **Engineering Calculators** - Psychrometric, sound analysis, unit conversion\n• **Workflow Tools** - Proposals, procurement, approvals\n• **Analytics** - Dashboards, anomaly detection\n\nWhat are you working on today?",
        tool: null,
      };
    }

    if (lowerMessage.includes('all tools') || lowerMessage.includes('show tools') || lowerMessage.includes('list')) {
      return {
        content: "Here are our main tool categories:\n\n**AI-Powered Extraction:**\n• AI Takeoff - Extract equipment from drawings\n• Spec Writer - Generate specifications\n• Selection Copilot - Compare alternatives\n\n**Engineering:**\n• Psychrometric Calculator\n• Sound Analyzer\n• Unit Converter\n\n**Workflow:**\n• Proposal Maker\n• Procurement Report\n• Submittal Approval Flow\n\nWhich area interests you?",
        tool: null,
      };
    }

    return {
      content: "I'd be happy to help! Could you tell me more about what you're trying to accomplish? For example:\n\n• Extracting equipment from drawings?\n• Writing specifications?\n• Comparing equipment options?\n• Tracking procurement?",
      tool: null,
    };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const { content, tool } = generateResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content,
        toolSuggestion: tool || undefined,
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleToolClick = (tool: Tool) => {
    onToolSelect?.(tool);
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'assistant',
      content: `Great! I've opened ${tool.name} for you. Let me know if you need help with anything else!`,
    }]);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="p-4 border-b border-neutral-800 bg-gradient-to-r from-bv-primary/10 to-purple-600/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bv-primary to-purple-600 flex items-center justify-center">
            <MessageSquare size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white">BuildVision AI</h3>
            <p className="text-xs text-neutral-500">Ask me about any tool</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] ${message.role === 'user' ? 'order-2' : ''}`}>
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 rounded-full bg-bv-primary/30 flex items-center justify-center">
                      <MessageSquare size={10} className="text-bv-primary" />
                    </div>
                    <span className="text-xs text-neutral-600">BuildVision AI</span>
                  </div>
                )}
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-bv-primary text-white rounded-br-md'
                      : 'bg-neutral-800 text-neutral-200 rounded-bl-md'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                
                {/* Tool suggestion card */}
                {message.toolSuggestion && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => handleToolClick(message.toolSuggestion!)}
                    className="mt-2 w-full p-3 bg-gradient-to-r from-bv-primary/20 to-purple-600/20 border border-bv-primary/30 rounded-xl hover:border-bv-primary/50 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-black/30 border border-bv-primary/30 flex items-center justify-center text-bv-primary">
                        {iconMap[message.toolSuggestion.id] && 
                          React.createElement(iconMap[message.toolSuggestion.id], { size: 24 })}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Wrench size={12} className="text-bv-primary" />
                          <span className="text-xs text-bv-primary font-mono">SUGGESTED TOOL</span>
                        </div>
                        <div className="font-normal text-white group-hover:text-bv-primary transition-colors">
                          {message.toolSuggestion.name}
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-neutral-600 group-hover:text-bv-primary transition-colors" />
                    </div>
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="w-5 h-5 rounded-full bg-bv-primary/30 flex items-center justify-center">
              <MessageSquare size={10} className="text-bv-primary" />
            </div>
            <div className="flex gap-1 px-4 py-3 bg-neutral-800 rounded-2xl">
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                className="w-2 h-2 bg-neutral-600 rounded-full"
              />
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                className="w-2 h-2 bg-neutral-600 rounded-full"
              />
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                className="w-2 h-2 bg-neutral-600 rounded-full"
              />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick actions */}
      <div className="px-4 py-2 border-t border-neutral-800">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['Show all tools', 'Extract equipment', 'Compare options', 'Get help'].map((action) => (
            <button
              key={action}
              onClick={() => {
                setInput(action);
                setTimeout(handleSend, 100);
              }}
              className="shrink-0 px-3 py-1.5 text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-500 hover:text-white rounded-full border border-neutral-700 transition-colors"
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-neutral-800">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about any tool..."
            className="flex-1 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-bv-primary/50 transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-11 h-11 rounded-xl bg-bv-primary hover:bg-bv-primary/90 disabled:bg-neutral-700 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            <Send size={18} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Dock icon for the chatbot - outlined speech bubble per spec
export const ChatBotDockIcon: React.FC = () => (
  <div className="w-10 h-10 flex items-center justify-center text-icon hover:text-icon-hover transition-colors">
    <svg
      width={28}
      height={28}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  </div>
);
