"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, ArrowRight } from 'lucide-react';

// Sample equipment detection data
const detectedEquipment = [
  { id: 1, label: 'Chiller', x: 15, y: 20, width: 25, height: 15, delay: 0.5 },
  { id: 2, label: 'AHU-1', x: 50, y: 25, width: 20, height: 12, delay: 1.0 },
  { id: 3, label: 'AHU-2', x: 50, y: 50, width: 20, height: 12, delay: 1.5 },
  { id: 4, label: 'Pump', x: 20, y: 65, width: 15, height: 10, delay: 2.0 },
  { id: 5, label: 'Cooling Tower', x: 75, y: 15, width: 20, height: 15, delay: 2.5 },
];

// Five Authorities data structure
interface AuthorityData {
  id: string;
  name: string;
  items: { key: string; value: string }[];
  expanded: boolean;
}

const initialAuthorities: AuthorityData[] = [
  {
    id: 'design',
    name: 'DESIGN INTENT',
    items: [
      { key: 'Basis of Design', value: 'Trane CGAM 100-ton Chiller' },
      { key: 'Performance', value: '100 tons @ 44°F LWT' },
      { key: 'Alternates', value: 'Carrier, York (equal or approved)' },
    ],
    expanded: true,
  },
  {
    id: 'technical',
    name: 'TECHNICAL SELECTION',
    items: [
      { key: 'Selected Model', value: 'Trane CGAM-101' },
      { key: 'Configuration', value: '460V/3ph/60Hz' },
      { key: 'Accessories', value: 'VFD, BACnet card' },
    ],
    expanded: false,
  },
  {
    id: 'commercial',
    name: 'COMMERCIAL TERMS',
    items: [
      { key: 'List Price', value: '$89,400' },
      { key: 'Freight', value: 'FOB Factory' },
      { key: 'Warranty', value: '1 year parts' },
    ],
    expanded: false,
  },
  {
    id: 'compliance',
    name: 'COMPLIANCE',
    items: [
      { key: 'ASHRAE 90.1', value: 'Compliant' },
      { key: 'Seismic', value: 'Zone 4 certified' },
    ],
    expanded: false,
  },
  {
    id: 'changelog',
    name: 'CHANGE LOG',
    items: [
      { key: 'Status', value: 'No changes recorded' },
    ],
    expanded: false,
  },
];

// Typing effect component
const TypingText: React.FC<{ text: string; delay: number }> = ({ text, delay }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isComplete) return;
    
    const timer = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsComplete(true);
          clearInterval(interval);
        }
      }, 40); // Typing speed

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [text, delay, isComplete]);

  return (
    <span className="inline-block">
      {displayedText}
      {!isComplete && <span className="animate-pulse text-bv-primary">|</span>}
    </span>
  );
};

// Authority section component
const AuthoritySection: React.FC<{
  authority: AuthorityData;
  isVisible: boolean;
  onToggle: () => void;
  startDelay: number;
}> = ({ authority, isVisible, onToggle, startDelay }) => {
  const [itemsVisible, setItemsVisible] = useState<boolean[]>([]);

  useEffect(() => {
    if (isVisible && authority.expanded) {
      // Show items progressively
      authority.items.forEach((_, index) => {
        setTimeout(() => {
          setItemsVisible(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, startDelay * 1000 + (index * 200));
      });
    }
  }, [isVisible, authority.expanded, authority.items, startDelay]);

  return (
    <div className="border-b border-gray-800/50 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-800/30 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          {authority.expanded ? (
            <ChevronDown size={16} className="text-gray-500" />
          ) : (
            <ChevronRight size={16} className="text-gray-500" />
          )}
          <span className="font-mono text-xs text-gray-400 font-semibold tracking-wider">
            {authority.name}
          </span>
        </div>
      </button>
      
      <AnimatePresence>
        {authority.expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-2">
              {authority.items.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ 
                    opacity: itemsVisible[index] ? 1 : 0,
                    x: itemsVisible[index] ? 0 : -10,
                  }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-3 text-sm"
                >
                  <span className="text-gray-500 font-mono text-xs mt-0.5">├─</span>
                  <div className="flex-1">
                    <span className="text-gray-400">{item.key}: </span>
                    <span className="text-white">
                      {itemsVisible[index] ? (
                        <TypingText 
                          text={item.value} 
                          delay={startDelay + (index * 0.2)}
                        />
                      ) : (
                        item.value
                      )}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Bounding box component for detected equipment
const BoundingBox: React.FC<{
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  delay: number;
}> = ({ x, y, width, height, label, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
      className="absolute border-2 border-bv-primary rounded"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${width}%`,
        height: `${height}%`,
      }}
    >
      <motion.div
        animate={{
          boxShadow: [
            '0 0 0px rgba(74, 58, 255, 0)',
            '0 0 10px rgba(74, 58, 255, 0.5)',
            '0 0 0px rgba(74, 58, 255, 0)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -inset-0.5 border-2 border-bv-primary rounded opacity-50"
      />
      <div className="absolute -top-6 left-0 px-2 py-0.5 bg-bv-primary text-white text-xs font-medium rounded whitespace-nowrap">
        {label}
      </div>
    </motion.div>
  );
};

// Main DemoWindow component
export const DemoWindowContent: React.FC = () => {
  const [authorities, setAuthorities] = useState<AuthorityData[]>(initialAuthorities);
  const [extractionStarted, setExtractionStarted] = useState(false);

  useEffect(() => {
    // Start extraction animation
    const timer = setTimeout(() => {
      setExtractionStarted(true);
    }, 500);

    // Progressively expand sections
    const expandSections = () => {
      let sectionIndex = 0;
      const expandInterval = setInterval(() => {
        if (sectionIndex < authorities.length) {
          setAuthorities(prevAuths => 
            prevAuths.map((auth, idx) => ({
              ...auth,
              expanded: idx <= sectionIndex,
            }))
          );
          sectionIndex++;
        } else {
          clearInterval(expandInterval);
        }
      }, 2500); // Expand each section every 2.5 seconds

      return () => clearInterval(expandInterval);
    };

    const sectionTimer = setTimeout(expandSections, 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(sectionTimer);
    };
  }, []);

  const toggleSection = (id: string) => {
    setAuthorities(prev =>
      prev.map(auth => ({
        ...auth,
        expanded: auth.id === id ? !auth.expanded : auth.expanded,
      }))
    );
  };

  return (
    <div className="h-full flex flex-col bg-bv-dark">
      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Drawing Preview (40%) */}
        <div className="w-[40%] border-r border-gray-800/50 bg-gray-900/30 relative overflow-hidden">
          <div className="absolute inset-0 p-4">
            {/* Placeholder for MEP drawing - using a grid pattern to simulate a technical drawing */}
            <div className="w-full h-full bg-white/5 rounded border border-gray-700/50 relative overflow-hidden">
              {/* Grid pattern */}
              <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
              
              {/* Simulated equipment shapes */}
              <div className="absolute inset-0 p-4">
                {/* Chiller */}
                <div className="absolute left-[15%] top-[20%] w-[25%] h-[15%] bg-blue-500/20 border border-blue-500/40 rounded" />
                {/* AHU-1 */}
                <div className="absolute left-[50%] top-[25%] w-[20%] h-[12%] bg-green-500/20 border border-green-500/40 rounded" />
                {/* AHU-2 */}
                <div className="absolute left-[50%] top-[50%] w-[20%] h-[12%] bg-green-500/20 border border-green-500/40 rounded" />
                {/* Pump */}
                <div className="absolute left-[20%] top-[65%] w-[15%] h-[10%] bg-purple-500/20 border border-purple-500/40 rounded" />
                {/* Cooling Tower */}
                <div className="absolute left-[75%] top-[15%] w-[20%] h-[15%] bg-cyan-500/20 border border-cyan-500/40 rounded" />
              </div>

              {/* Animated bounding boxes */}
              {extractionStarted && detectedEquipment.map((eq) => (
                <BoundingBox
                  key={eq.id}
                  x={eq.x}
                  y={eq.y}
                  width={eq.width}
                  height={eq.height}
                  label={eq.label}
                  delay={eq.delay}
                />
              ))}
            </div>
          </div>
          
          {/* Panel label */}
          <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-xs text-gray-400 font-mono">
            Sample Drawing
          </div>
        </div>

        {/* Right Panel - Extraction Results (60%) */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-800/50 bg-gray-900/30">
            <h2 className="text-lg font-semibold text-white mb-1">Extraction Results</h2>
            <p className="text-sm text-gray-400">Equipment: Trane CGAM-101 Chiller</p>
          </div>

          {/* Five Authorities Sections */}
          <div className="flex-1 overflow-auto">
            <div className="p-4 space-y-1">
              {authorities.map((authority, index) => (
                <AuthoritySection
                  key={authority.id}
                  authority={authority}
                  isVisible={extractionStarted}
                  onToggle={() => toggleSection(authority.id)}
                  startDelay={1.5 + (index * 0.8)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="px-6 py-4 border-t border-gray-800/50 bg-gray-900/30 flex items-center justify-between">
        <div className="text-sm text-gray-400">
          <span className="text-white font-medium">This took 12 seconds.</span>{' '}
          Manual extraction takes 4-6 hours.
        </div>
        <button className="px-6 py-2.5 bg-bv-primary hover:bg-bv-primary/90 text-white font-semibold rounded-lg flex items-center gap-2 transition-colors">
          Sign Up to Upload Your Drawings
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
