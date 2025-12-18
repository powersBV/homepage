"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { tools, Tool, categoryColors, categoryLabels } from '@/lib/tools-data';
import { iconMap } from '../icons/ToolIcons';
import { Check, ArrowRight, Play, ExternalLink, Mail, MessageCircle } from 'lucide-react';

// Tool Detail Window Content
export const ToolDetailContent: React.FC<{ tool: Tool }> = ({ tool }) => {
  const colors = categoryColors[tool.category];
  const IconComponent = iconMap[tool.id];

  return (
    <div className="p-6">
      <div className="flex items-start gap-4 mb-6">
        <div className={`w-16 h-16 ${colors.text} shrink-0 p-2 border ${colors.border} bg-black/30 rounded-lg`}>
          {IconComponent && <IconComponent size={48} />}
        </div>
        <div>
          <span className={`inline-block px-2 py-0.5 text-xs font-mono ${colors.bg} ${colors.text} rounded border ${colors.border} mb-2`}>
            FREE TOOL
          </span>
          <h2 className="text-xl font-semibold text-white mb-1">{tool.name}</h2>
          <p className="font-mono text-xs text-gray-500">// {tool.command}</p>
        </div>
      </div>
      
      <p className="text-gray-300 text-sm leading-relaxed mb-6">{tool.description}</p>
      
      <div className="mb-6">
        <div className="font-mono text-xs text-gray-500 uppercase tracking-wider mb-3">Features</div>
        <div className="space-y-2">
          {tool.features.map((feature, i) => (
            <div key={i} className="flex items-start gap-3 p-2 rounded bg-black/30 border border-gray-800">
              <Check size={14} className={`${colors.text} mt-0.5 shrink-0`} />
              <span className="text-gray-300 text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      
      <button className="w-full py-3 px-4 bg-bv-primary hover:bg-bv-primary/90 text-white font-semibold rounded-lg flex items-center justify-center gap-2">
        Launch Tool <ArrowRight size={16} />
      </button>
    </div>
  );
};

// Category configuration for Product OS
const productOSCategories = {
  ai: { 
    label: 'AI-Powered Extraction', 
    description: 'Extract, analyze, and generate from drawings',
    color: 'purple',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="4" y="8" width="40" height="32" rx="2" fill="#A78BFA" fillOpacity="0.2" stroke="#A78BFA" strokeWidth="2"/>
        <path d="M4 16 L44 16" stroke="#A78BFA" strokeWidth="2"/>
        <circle cx="24" cy="28" r="8" fill="#A78BFA" fillOpacity="0.3"/>
        <path d="M20 28 L22 30 L28 24" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  engineering: { 
    label: 'Engineering Calculators', 
    description: 'HVAC calculations and conversions',
    color: 'cyan',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="4" y="8" width="40" height="32" rx="2" fill="#22D3EE" fillOpacity="0.2" stroke="#22D3EE" strokeWidth="2"/>
        <path d="M4 16 L44 16" stroke="#22D3EE" strokeWidth="2"/>
        <rect x="14" y="22" width="20" height="14" rx="1" fill="#22D3EE" fillOpacity="0.3"/>
        <path d="M18 26 L30 26 M18 30 L26 30" stroke="#22D3EE" strokeWidth="1.5"/>
      </svg>
    )
  },
  workflow: { 
    label: 'Workflow & Procurement', 
    description: 'Proposals, tracking, and approvals',
    color: 'green',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="4" y="8" width="40" height="32" rx="2" fill="#4ADE80" fillOpacity="0.2" stroke="#4ADE80" strokeWidth="2"/>
        <path d="M4 16 L44 16" stroke="#4ADE80" strokeWidth="2"/>
        <path d="M14 24 L20 24 L20 34 L14 34 Z" fill="#4ADE80" fillOpacity="0.4"/>
        <path d="M22 22 L28 22 L28 34 L22 34 Z" fill="#4ADE80" fillOpacity="0.5"/>
        <path d="M30 26 L36 26 L36 34 L30 34 Z" fill="#4ADE80" fillOpacity="0.6"/>
      </svg>
    )
  },
  analytics: { 
    label: 'Analytics & Risk', 
    description: 'Insights, detection, and verification',
    color: 'blue',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="4" y="8" width="40" height="32" rx="2" fill="#60A5FA" fillOpacity="0.2" stroke="#60A5FA" strokeWidth="2"/>
        <path d="M4 16 L44 16" stroke="#60A5FA" strokeWidth="2"/>
        <path d="M12 32 L18 26 L24 30 L32 22 L38 24" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="32" r="2" fill="#60A5FA"/>
        <circle cx="38" cy="24" r="2" fill="#60A5FA"/>
      </svg>
    )
  },
};

const colorClasses: Record<string, { bg: string; border: string; text: string; hoverBg: string }> = {
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', hoverBg: 'hover:bg-purple-500/20' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', hoverBg: 'hover:bg-cyan-500/20' },
  green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', hoverBg: 'hover:bg-green-500/20' },
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', hoverBg: 'hover:bg-blue-500/20' },
};

// Product OS Content (main folder view with category folders)
interface ProductOSContentProps {
  onToolSelect: (tool: Tool) => void;
  onCategorySelect?: (category: string) => void;
}

export const ProductOSContent: React.FC<ProductOSContentProps> = ({ onToolSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toolsByCategory = tools.reduce((acc, tool) => {
    if (!acc[tool.category]) acc[tool.category] = [];
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, Tool[]>);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleBack = () => {
    setSelectedCategory(null);
  };

  // Show category contents
  if (selectedCategory) {
    const category = productOSCategories[selectedCategory as keyof typeof productOSCategories];
    const categoryTools = toolsByCategory[selectedCategory] || [];
    const colors = colorClasses[category.color];

    return (
      <div className="h-full flex flex-col">
        {/* Toolbar with back button */}
        <div className="h-10 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 flex items-center px-4 shrink-0">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowRight size={14} className="rotate-180" />
            <span>Back</span>
          </button>
          <span className="mx-3 text-gray-600">|</span>
          <span className={`text-sm font-medium ${colors.text}`}>{category.label}</span>
          <span className="text-xs text-gray-500 ml-2">({categoryTools.length} tools)</span>
        </div>
        
        {/* Category header */}
        <div className={`p-5 ${colors.bg} border-b ${colors.border}`}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 shrink-0">{category.icon}</div>
            <div>
              <h3 className={`text-xl font-bold ${colors.text}`}>{category.label}</h3>
              <p className="text-sm text-gray-400">{category.description}</p>
            </div>
          </div>
        </div>

        {/* Tools grid */}
        <div className="flex-1 overflow-auto p-5">
          <div className="grid grid-cols-2 gap-3">
            {categoryTools.map((tool) => {
              const IconComponent = iconMap[tool.id];
              return (
                <motion.button
                  key={tool.id}
                  onClick={() => onToolSelect(tool)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`flex items-start gap-4 p-4 rounded-xl ${colors.bg} border ${colors.border} ${colors.hoverBg} transition-colors text-left group`}
                >
                  <div className={`w-12 h-12 shrink-0 ${colors.text} p-1.5 rounded-lg bg-black/20`}>
                    {IconComponent && <IconComponent size={36} />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-white group-hover:text-white/90">{tool.name}</div>
                    <div className="text-xs text-gray-400 line-clamp-2 mt-1 leading-relaxed">{tool.description}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs px-2 py-0.5 rounded bg-black/30 text-gray-500 font-mono">
                        {tool.command}
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-gray-600 group-hover:text-gray-400 mt-1 shrink-0" />
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Main Product OS view with category folders
  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="h-10 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 flex items-center px-4 shrink-0">
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="1" width="6" height="6" rx="1" fill="#4A3AFF"/>
            <rect x="9" y="1" width="6" height="6" rx="1" fill="#A78BFA"/>
            <rect x="1" y="9" width="6" height="6" rx="1" fill="#22D3EE"/>
            <rect x="9" y="9" width="6" height="6" rx="1" fill="#4ADE80"/>
          </svg>
          <span className="text-sm text-white font-medium">Product OS</span>
        </div>
        <span className="text-xs text-gray-500 ml-3">4 categories • {tools.length} free tools</span>
      </div>

      {/* Hero section - matches design language of other windows */}
      <div className="p-6 border-b border-gray-800/50">
        <div className="flex items-start gap-5 mb-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-bv-primary to-purple-600 flex items-center justify-center shadow-lg shadow-bv-primary/20">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="2" y="2" width="12" height="12" rx="2" fill="white" fillOpacity="0.9"/>
              <rect x="18" y="2" width="12" height="12" rx="2" fill="white" fillOpacity="0.7"/>
              <rect x="2" y="18" width="12" height="12" rx="2" fill="white" fillOpacity="0.7"/>
              <rect x="18" y="18" width="12" height="12" rx="2" fill="white" fillOpacity="0.5"/>
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-1">Product OS</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              All BuildVision tools organized by category. From AI-powered extraction to analytics and procurement.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-medium flex items-center gap-1.5">
            <Check size={12} /> All tools free
          </div>
          <div className="px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-medium">
            {tools.length} tools available
          </div>
          <div className="px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-medium">
            No credit card required
          </div>
        </div>
      </div>

      {/* Category folders grid */}
      <div className="flex-1 overflow-auto p-5">
        <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-3 px-1">Categories</div>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(productOSCategories).map(([key, category]) => {
            const categoryTools = toolsByCategory[key] || [];
            const colors = colorClasses[category.color];
            
            return (
              <motion.button
                key={key}
                onClick={() => handleCategoryClick(key)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.99 }}
                className={`flex items-start gap-4 p-5 rounded-xl ${colors.bg} border ${colors.border} transition-all text-left group`}
              >
                <div className="w-12 h-12 shrink-0">
                  {category.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-semibold ${colors.text}`}>{category.label}</span>
                    <span className="text-xs text-gray-500 font-mono">({categoryTools.length})</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3 leading-relaxed">{category.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {categoryTools.slice(0, 2).map((tool) => (
                      <span key={tool.id} className="text-xs px-2 py-0.5 rounded bg-black/30 text-gray-400">
                        {tool.name}
                      </span>
                    ))}
                    {categoryTools.length > 2 && (
                      <span className="text-xs px-2 py-0.5 rounded bg-black/30 text-gray-500">
                        +{categoryTools.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
                <ArrowRight size={16} className="text-gray-600 group-hover:text-gray-400 mt-1 shrink-0 transition-colors" />
              </motion.button>
            );
          })}
        </div>
        
        {/* Quick access section */}
        <div className="mt-6 pt-5 border-t border-gray-800/50">
          <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-3 px-1">Quick Access</div>
          <div className="flex gap-3">
            <button className="flex-1 py-3 px-4 bg-bv-primary/10 hover:bg-bv-primary/20 border border-bv-primary/30 text-bv-primary text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-colors">
              <Play size={14} />
              Watch Demo
            </button>
            <button className="flex-1 py-3 px-4 bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700 text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-colors">
              <ExternalLink size={14} />
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Legacy Tools Folder Content (kept for backwards compatibility)
export const ToolsFolderContent: React.FC<{ onToolSelect: (tool: Tool) => void }> = ({ onToolSelect }) => {
  return <ProductOSContent onToolSelect={onToolSelect} />;
};

// Pricing Content
export const PricingContent: React.FC = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-white mb-2">Simple, Transparent Pricing</h2>
    <p className="text-gray-400 mb-8">Start free. Scale as you grow.</p>
    
    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 rounded-lg border border-gray-700 bg-black/30">
        <div className="text-bv-primary font-mono text-xs mb-2">FREE</div>
        <div className="text-3xl font-bold text-white mb-1">$0</div>
        <div className="text-gray-500 text-sm mb-4">Forever free</div>
        <ul className="space-y-2 text-sm text-gray-400">
          <li className="flex items-center gap-2"><Check size={14} className="text-green-400" /> All 15 tools</li>
          <li className="flex items-center gap-2"><Check size={14} className="text-green-400" /> 10 projects/month</li>
          <li className="flex items-center gap-2"><Check size={14} className="text-green-400" /> Basic support</li>
        </ul>
      </div>
      <div className="p-4 rounded-lg border border-bv-primary/50 bg-bv-primary/10">
        <div className="text-bv-primary font-mono text-xs mb-2">PRO</div>
        <div className="text-3xl font-bold text-white mb-1">$99<span className="text-lg text-gray-400">/mo</span></div>
        <div className="text-gray-500 text-sm mb-4">Per seat</div>
        <ul className="space-y-2 text-sm text-gray-400">
          <li className="flex items-center gap-2"><Check size={14} className="text-green-400" /> Unlimited projects</li>
          <li className="flex items-center gap-2"><Check size={14} className="text-green-400" /> Team collaboration</li>
          <li className="flex items-center gap-2"><Check size={14} className="text-green-400" /> Priority support</li>
          <li className="flex items-center gap-2"><Check size={14} className="text-green-400" /> Integrations</li>
        </ul>
      </div>
    </div>
    
    <button className="w-full mt-6 py-3 bg-bv-primary text-white font-semibold rounded-lg">
      Get Started Free
    </button>
  </div>
);

// Tour/How It Works Content
export const TourContent: React.FC = () => {
  const steps = [
    { num: '01', title: 'Upload Drawings', desc: 'Drop your PDF plans, specs, or schedules' },
    { num: '02', title: 'AI Extracts', desc: 'Equipment identified and structured automatically' },
    { num: '03', title: 'Structure & Govern', desc: 'Decisions tracked across all five authorities' },
    { num: '04', title: 'Quote & Procure', desc: 'Generate RFQs, proposals, and orders' },
    { num: '05', title: 'Analyze', desc: 'Cross-project insights and performance' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-2">How It Works</h2>
      <p className="text-gray-400 mb-6">From raw construction drawings to structured procurement in five steps.</p>
      
      <div className="space-y-3">
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-4 p-3 rounded-lg bg-black/30 border border-gray-800"
          >
            <div className="w-10 h-10 rounded-lg bg-bv-primary/20 border border-bv-primary/40 flex items-center justify-center font-mono text-bv-primary font-bold">
              {step.num}
            </div>
            <div>
              <div className="font-medium text-white">{step.title}</div>
              <div className="text-sm text-gray-500">{step.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// About Content
export const AboutContent: React.FC = () => (
  <div className="p-6 overflow-auto max-h-[550px]">
    <div className="flex items-center gap-4 mb-6">
      <Image src="/logo/icon.png" alt="BuildVision" width={48} height={48} />
      <div>
        <h2 className="text-2xl font-bold text-white">BuildVision</h2>
        <p className="text-gray-400 text-sm">The decision system for MEP equipment</p>
      </div>
    </div>
    
    <div className="prose prose-invert prose-sm mb-6">
      <p className="text-gray-300 mb-4">
        BuildVision started when we got tired of manually reconciling equipment schedules across 800-page plan sets. 
        Now we automate the entire process—extraction, selection, quoting, and procurement—for mechanical contractors who don&apos;t have time to waste.
      </p>
      <p className="text-gray-400 mb-4">
        We structure the invisible decision layer that exists between what engineers specify, what reps select, 
        and what contractors actually buy. Five authorities. One source of truth.
      </p>
    </div>
    
    {/* Contact info */}
    <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 mb-6">
      <div className="text-sm font-medium text-white mb-3">Contact Us</div>
      <div className="space-y-2 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <span className="text-gray-500">Phone:</span>
          <a href="tel:+18885551234" className="text-bv-primary hover:underline">(888) 555-1234</a>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-500">Email:</span>
          <a href="mailto:hello@buildvision.io" className="text-bv-primary hover:underline">hello@buildvision.io</a>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-gray-500">Address:</span>
          <span>123 Construction Way, Suite 400<br />San Francisco, CA 94105</span>
        </div>
      </div>
    </div>
    
    <p className="text-gray-500 font-mono text-xs">
      Built for builders. • Version 2.1.0 • © 2024 BuildVision, Inc.
    </p>
  </div>
);

// Customers/Testimonials Content
export const CustomersContent: React.FC = () => (
  <div className="p-6 overflow-auto max-h-[600px]">
    <h2 className="text-2xl font-bold text-white mb-2">Customer Stories</h2>
    <p className="text-gray-400 text-sm mb-6">See how contractors, reps, and OEMs use BuildVision.</p>
    
    {/* Stats */}
    <div className="grid grid-cols-4 gap-3 mb-8">
      {[
        { value: '500+', label: 'Contractors' },
        { value: '60%', label: 'Faster quotes' },
        { value: '$2.4M', label: 'Savings tracked' },
        { value: '94%', label: 'Accuracy' },
      ].map((stat) => (
        <div key={stat.label} className="p-3 rounded-lg bg-bv-primary/10 border border-bv-primary/30 text-center">
          <div className="text-xl font-bold text-bv-primary font-mono">{stat.value}</div>
          <div className="text-xs text-gray-400">{stat.label}</div>
        </div>
      ))}
    </div>
    
    {/* Customer logos */}
    <div className="mb-8">
      <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Trusted by</div>
      <div className="flex flex-wrap gap-3">
        {['McKinstry', 'Limbach', 'EMCOR', 'Comfort Systems', 'Southland', 'TDIndustries'].map((name) => (
          <div key={name} className="px-3 py-2 rounded-lg bg-white/5 border border-gray-800 text-sm text-gray-300">
            {name}
          </div>
        ))}
      </div>
    </div>
    
    {/* Testimonials */}
    <div className="space-y-4">
      <div className="p-4 rounded-lg border border-gray-700 bg-black/30">
        <blockquote className="text-gray-300 mb-4">
          &ldquo;We used to spend 4-6 hours decoding equipment schedules from a plan set. BuildVision does it in minutes with better accuracy than our junior estimators.&rdquo;
        </blockquote>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-bv-primary/30 flex items-center justify-center text-bv-primary font-bold">MS</div>
          <div>
            <div className="text-white text-sm font-medium">Mike Sullivan</div>
            <div className="text-gray-500 text-xs">VP Operations, Sullivan Mechanical</div>
          </div>
        </div>
      </div>
      
      <div className="p-4 rounded-lg border border-gray-700 bg-black/30">
        <blockquote className="text-gray-300 mb-4">
          &ldquo;Finally, software that understands the difference between what&apos;s specified and what&apos;s actually selected. The Five Authorities model matches how we actually work.&rdquo;
        </blockquote>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">JC</div>
          <div>
            <div className="text-white text-sm font-medium">Jennifer Chen</div>
            <div className="text-gray-500 text-xs">Procurement Director, Comfort Systems USA</div>
          </div>
        </div>
      </div>
      
      <div className="p-4 rounded-lg border border-gray-700 bg-black/30">
        <blockquote className="text-gray-300 mb-4">
          &ldquo;As a rep, I get cleaner inputs from contractors using BuildVision. Less back-and-forth, faster quotes, happier customers.&rdquo;
        </blockquote>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-500/30 flex items-center justify-center text-green-400 font-bold">DM</div>
          <div>
            <div className="text-white text-sm font-medium">David Martinez</div>
            <div className="text-gray-500 text-xs">Regional Sales Manager, Trane Commercial</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Docs Content
export const DocsContent: React.FC = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-white mb-2">Documentation</h2>
    <p className="text-gray-400 mb-6">Everything you need to get started.</p>
    
    <div className="space-y-2">
      {[
        { title: 'Getting Started', desc: 'Quick start guide' },
        { title: 'API Reference', desc: 'Full API documentation' },
        { title: 'Five Authorities', desc: 'Understanding the data model' },
        { title: 'Integrations', desc: 'Connect your tools' },
        { title: 'Best Practices', desc: 'Tips for power users' },
      ].map((doc) => (
        <button key={doc.title} className="w-full flex items-center justify-between p-3 rounded-lg bg-black/30 border border-gray-800 hover:border-gray-700 text-left group">
          <div>
            <div className="text-white group-hover:text-bv-primary transition-colors">{doc.title}</div>
            <div className="text-xs text-gray-500">{doc.desc}</div>
          </div>
          <ExternalLink size={14} className="text-gray-600 group-hover:text-bv-primary" />
        </button>
      ))}
    </div>
  </div>
);

// Demo Video Content
export const DemoContent: React.FC = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-white mb-4">See BuildVision in Action</h2>
    
    <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-4">
      <div className="absolute inset-0 flex items-center justify-center">
        <button className="w-16 h-16 rounded-full bg-bv-primary hover:bg-bv-primary/90 flex items-center justify-center transition-colors">
          <Play size={28} className="text-white ml-1" />
        </button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
        <div className="w-0 h-full bg-bv-primary" />
      </div>
    </div>
    
    <p className="text-gray-400 text-sm">
      Watch how BuildVision extracts equipment from drawings and structures decisions across your entire workflow.
    </p>
  </div>
);

// Contact/Talk to Human Content
export const ContactContent: React.FC = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-white mb-2">Talk to a Human</h2>
    <p className="text-gray-400 mb-6">Real people. Real answers. No chatbots.</p>
    
    <div className="space-y-3 mb-6">
      {/* Phone - Primary CTA */}
      <a 
        href="tel:+18885551234"
        className="w-full flex items-center gap-4 p-4 rounded-lg bg-bv-primary/10 border border-bv-primary/30 hover:bg-bv-primary/20 text-left group transition-colors"
      >
        <div className="w-12 h-12 rounded-lg bg-bv-primary/30 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bv-primary">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </div>
        <div>
          <div className="text-white font-semibold text-lg group-hover:text-bv-primary">(888) 555-1234</div>
          <div className="text-sm text-gray-400">Mon-Fri 8am-6pm EST • Talk to our team</div>
        </div>
      </a>
      
      <button className="w-full flex items-center gap-4 p-4 rounded-lg bg-black/30 border border-gray-800 hover:border-bv-primary/50 text-left group">
        <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
          <MessageCircle size={20} className="text-green-400" />
        </div>
        <div>
          <div className="text-white font-medium group-hover:text-bv-primary">Live Chat</div>
          <div className="text-xs text-gray-500">Chat with our team now • Usually responds in &lt; 5 min</div>
        </div>
      </button>
      
      <a 
        href="mailto:hello@buildvision.io"
        className="w-full flex items-center gap-4 p-4 rounded-lg bg-black/30 border border-gray-800 hover:border-bv-primary/50 text-left group"
      >
        <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
          <Mail size={20} className="text-cyan-400" />
        </div>
        <div>
          <div className="text-white font-medium group-hover:text-bv-primary">Email Us</div>
          <div className="text-xs text-gray-500">hello@buildvision.io</div>
        </div>
      </a>
    </div>
    
    {/* Office location */}
    <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700">
      <div className="text-sm font-medium text-white mb-2">Office</div>
      <div className="text-sm text-gray-400">
        123 Construction Way, Suite 400<br />
        San Francisco, CA 94105
      </div>
    </div>
  </div>
);

// Integrations Content
export const IntegrationsContent: React.FC = () => (
  <div className="p-6 overflow-auto max-h-[600px]">
    <h2 className="text-2xl font-bold text-white mb-2">Integrations</h2>
    <p className="text-gray-400 mb-6">Connect BuildVision to the software and manufacturers you already use.</p>
    
    {/* Software Integrations */}
    <div className="mb-6">
      <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Construction Software</div>
      <div className="grid grid-cols-3 gap-3">
        {[
          { name: 'Procore', color: '#F7931E', desc: 'Project management' },
          { name: 'Bluebeam', color: '#0066CC', desc: 'PDF markup' },
          { name: 'Autodesk', color: '#0696D7', desc: 'BIM & CAD' },
          { name: 'PlanGrid', color: '#0EA5E9', desc: 'Field collaboration' },
          { name: 'Viewpoint', color: '#374151', desc: 'ERP' },
          { name: 'Sage', color: '#00A651', desc: 'Accounting' },
        ].map((int) => (
          <div key={int.name} className="p-3 rounded-lg bg-black/30 border border-gray-800 hover:border-gray-700 transition-colors">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-sm shrink-0"
                style={{ backgroundColor: int.color + '40' }}
              >
                {int.name.slice(0, 2)}
              </div>
              <div>
                <div className="text-white text-sm font-medium">{int.name}</div>
                <div className="text-xs text-gray-500">{int.desc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* Manufacturer Integrations */}
    <div className="mb-6">
      <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Manufacturer Catalogs</div>
      <div className="grid grid-cols-4 gap-3">
        {[
          { name: 'Trane', color: '#E31937' },
          { name: 'Carrier', color: '#004990' },
          { name: 'Greenheck', color: '#6DB33F' },
          { name: 'Daikin', color: '#003D7C' },
          { name: 'Johnson Controls', color: '#00629B' },
          { name: 'Lennox', color: '#0066CC' },
          { name: 'McQuay', color: '#E31937' },
          { name: 'Aaon', color: '#374151' },
        ].map((mfr) => (
          <div key={mfr.name} className="p-2 rounded-lg bg-black/30 border border-gray-800 flex flex-col items-center hover:border-gray-700 transition-colors">
            <div 
              className="w-8 h-8 rounded mb-1 flex items-center justify-center font-bold text-white text-xs"
              style={{ backgroundColor: mfr.color + '40' }}
            >
              {mfr.name.slice(0, 2)}
            </div>
            <span className="text-xs text-gray-400 text-center">{mfr.name}</span>
          </div>
        ))}
      </div>
    </div>
    
    {/* API */}
    <div className="p-4 bg-gradient-to-r from-bv-primary/10 to-purple-600/10 border border-bv-primary/30 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-white font-medium mb-1">BuildVision API</div>
          <div className="text-sm text-gray-400">Integrate equipment data into your own systems</div>
        </div>
        <button className="px-4 py-2 bg-bv-primary/20 hover:bg-bv-primary/30 text-bv-primary text-sm font-medium rounded-lg transition-colors">
          View Docs
        </button>
      </div>
    </div>
  </div>
);

// Changelog Content
export const ChangelogContent: React.FC = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-white mb-6">Changelog</h2>
    
    <div className="space-y-4">
      {[
        { version: 'v2.1.0', date: 'Dec 15, 2024', changes: ['New AI Takeoff improvements', 'Faster extraction speed', 'Bug fixes'] },
        { version: 'v2.0.0', date: 'Dec 1, 2024', changes: ['Complete redesign', 'Five Authorities model', 'New integrations'] },
        { version: 'v1.5.0', date: 'Nov 15, 2024', changes: ['Psychrometric calculator', 'Sound analyzer updates'] },
      ].map((release) => (
        <div key={release.version} className="p-4 rounded-lg bg-black/30 border border-gray-800">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-bv-primary font-bold">{release.version}</span>
            <span className="text-xs text-gray-500">{release.date}</span>
          </div>
          <ul className="space-y-1">
            {release.changes.map((change, i) => (
              <li key={i} className="text-sm text-gray-400 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-gray-600" />
                {change}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

// Careers Content
export const CareersContent: React.FC = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-white mb-2">Work at BuildVision</h2>
    <p className="text-gray-400 mb-6">Help us build the future of construction procurement.</p>
    
    <div className="space-y-2">
      {[
        { role: 'Senior Full Stack Engineer', team: 'Engineering', location: 'Remote' },
        { role: 'Product Designer', team: 'Design', location: 'Remote' },
        { role: 'Account Executive', team: 'Sales', location: 'NYC' },
      ].map((job) => (
        <button key={job.role} className="w-full flex items-center justify-between p-4 rounded-lg bg-black/30 border border-gray-800 hover:border-bv-primary/50 text-left group">
          <div>
            <div className="text-white font-medium group-hover:text-bv-primary">{job.role}</div>
            <div className="text-xs text-gray-500">{job.team} · {job.location}</div>
          </div>
          <ArrowRight size={14} className="text-gray-600 group-hover:text-bv-primary" />
        </button>
      ))}
    </div>
  </div>
);

// Home/Welcome Content
export const HomeContent: React.FC = () => (
  <div className="p-6">
    <div className="text-center mb-6">
      <Image src="/logo/icon.png" alt="BuildVision" width={64} height={64} className="mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-white mb-2">Stop decoding drawings manually</h2>
      <p className="text-gray-400">From drawings to procurement in minutes. All 15 tools free.</p>
    </div>
    
    {/* Quick stats */}
    <div className="grid grid-cols-4 gap-2 mb-6">
      {[
        { value: '60%', label: 'Faster quotes', color: 'purple' },
        { value: '94%', label: 'Accuracy', color: 'cyan' },
        { value: '500+', label: 'Contractors', color: 'green' },
        { value: '< 5min', label: 'Per project', color: 'blue' },
      ].map((stat) => (
        <div key={stat.label} className={`p-2 rounded-lg bg-${stat.color}-500/10 border border-${stat.color}-500/30 text-center`}>
          <div className={`text-lg font-bold text-${stat.color}-400 font-mono`}>{stat.value}</div>
          <div className="text-xs text-gray-400">{stat.label}</div>
        </div>
      ))}
    </div>
    
    {/* Quick actions */}
    <div className="space-y-2 mb-6">
      <div className="text-xs text-gray-500 uppercase tracking-wider">Quick Start</div>
      <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-bv-primary/10 border border-bv-primary/30 hover:bg-bv-primary/20 transition-colors text-left">
        <div className="w-10 h-10 rounded-lg bg-bv-primary/20 flex items-center justify-center">
          <ArrowRight size={18} className="text-bv-primary" />
        </div>
        <div>
          <div className="text-white font-medium">Upload a Drawing</div>
          <div className="text-xs text-gray-500">Get equipment list in minutes</div>
        </div>
      </button>
      <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 border border-gray-700 hover:bg-gray-800 transition-colors text-left">
        <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center">
          <Play size={18} className="text-gray-300" />
        </div>
        <div>
          <div className="text-white font-medium">Watch Demo</div>
          <div className="text-xs text-gray-500">See BuildVision in action</div>
        </div>
      </button>
    </div>
    
    <p className="text-xs text-gray-500 text-center">
      Explore the desktop icons or use the dock below to get started.
    </p>
  </div>
);

// Why BuildVision Content - Pillars of Truth & Ontology
export const WhyBuildVisionContent: React.FC = () => {
  const authorities = [
    { 
      id: 'design', 
      name: 'Design Intent', 
      color: 'purple',
      description: 'What engineers specify—models, capacities, performance requirements, and approved alternates.',
      examples: ['Equipment schedules', 'Spec sections', 'Sequence of operations']
    },
    { 
      id: 'technical', 
      name: 'Technical Selection', 
      color: 'cyan',
      description: 'What OEMs and reps actually select—SKUs, configurations, accessories, and options.',
      examples: ['Selection software outputs', 'Submittal data', 'Cut sheets']
    },
    { 
      id: 'commercial', 
      name: 'Commercial Terms', 
      color: 'green',
      description: 'What procurement buys—pricing, freight, delivery schedules, and warranty terms.',
      examples: ['Quotes', 'POs', 'Lead times', 'Payment terms']
    },
    { 
      id: 'compliance', 
      name: 'Compliance Rules', 
      color: 'yellow',
      description: 'What must be followed—codes, standards, AHJ requirements, and certifications.',
      examples: ['ASHRAE standards', 'Local codes', 'LEED requirements']
    },
    { 
      id: 'change', 
      name: 'Change Trace Log', 
      color: 'blue',
      description: 'The audit trail—RFIs, VE decisions, addenda, and substitution approvals.',
      examples: ['RFI responses', 'Substitution requests', 'Addenda']
    },
  ];

  const colorMap: Record<string, { bg: string; border: string; text: string }> = {
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' },
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400' },
    yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bv-primary/20 border border-bv-primary/30 mb-4">
          <span className="text-xs font-mono text-bv-primary">THE PROBLEM</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">
          Equipment decisions are <span className="text-bv-primary">invisible</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Real equipment decisions live scattered across PDFs, emails, spreadsheets, and tribal knowledge. 
          Engineers specify, reps decode, contractors reconcile, OEMs guess. 
          There&apos;s no single source of truth.
        </p>
      </div>

      {/* The Solution */}
      <div className="mb-8 p-6 rounded-xl bg-gradient-to-br from-bv-primary/10 to-purple-600/5 border border-bv-primary/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-bv-primary/20 flex items-center justify-center shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-bv-primary">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">BuildVision is the Ontology Layer</h3>
            <p className="text-gray-400">
              We make the invisible decision layer visible and governed. Every equipment decision flows through 
              five authorities—creating a structured, auditable system that replaces chaos with clarity.
            </p>
          </div>
        </div>
      </div>

      {/* Five Authorities Diagram */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-bv-primary/20 flex items-center justify-center text-xs text-bv-primary font-bold">5</span>
          The Five Authorities
        </h3>
        
        {/* Visual Ontology Diagram */}
        <div className="relative mb-6 p-6 rounded-xl bg-black/30 border border-gray-800">
          {/* Center Hub */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-bv-primary/20 border-2 border-bv-primary flex items-center justify-center">
              <span className="text-xs font-mono text-bv-primary text-center leading-tight">EQUIPMENT<br/>DECISION</span>
            </div>
          </div>
          
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
            <defs>
              <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(74, 58, 255, 0.1)" />
                <stop offset="50%" stopColor="rgba(74, 58, 255, 0.4)" />
                <stop offset="100%" stopColor="rgba(74, 58, 255, 0.1)" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Authority Cards */}
          <div className="grid grid-cols-5 gap-3">
            {authorities.map((auth) => {
              const colors = colorMap[auth.color];
              return (
                <div key={auth.id} className={`p-3 rounded-lg ${colors.bg} border ${colors.border}`}>
                  <div className={`text-xs font-mono ${colors.text} mb-1`}>{auth.id.toUpperCase()}</div>
                  <div className="text-sm font-medium text-white mb-2">{auth.name}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{auth.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* The Flow */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="text-center p-4 rounded-lg bg-gray-800/50 border border-gray-700">
          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-2">
            <span className="text-purple-400 text-lg">1</span>
          </div>
          <div className="text-sm font-medium text-white mb-1">Buyers Upload</div>
          <div className="text-xs text-gray-500">Drawings, specs, schedules</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-gray-800/50 border border-gray-700">
          <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-2">
            <span className="text-cyan-400 text-lg">2</span>
          </div>
          <div className="text-sm font-medium text-white mb-1">BuildVision Structures</div>
          <div className="text-xs text-gray-500">AI extracts &amp; governs</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-gray-800/50 border border-gray-700">
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-2">
            <span className="text-green-400 text-lg">3</span>
          </div>
          <div className="text-sm font-medium text-white mb-1">Everyone Operates</div>
          <div className="text-xs text-gray-500">From one governed system</div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <button className="px-6 py-3 bg-bv-primary hover:bg-bv-primary/90 text-white font-semibold rounded-lg inline-flex items-center gap-2 transition-colors">
          Start Free
          <ArrowRight size={16} />
        </button>
        <p className="text-xs text-gray-500 mt-2">No credit card required. All 15 tools included.</p>
      </div>
    </div>
  );
};

// Network / Contacts Content
export const NetworkContent: React.FC = () => {
  const contacts = [
    { name: 'Sales Team', role: 'Enterprise inquiries', email: 'sales@buildvision.io', color: 'purple' },
    { name: 'Support', role: 'Technical assistance', email: 'support@buildvision.io', color: 'cyan' },
    { name: 'Partnerships', role: 'Integration partners', email: 'partners@buildvision.io', color: 'green' },
  ];

  const colorMap: Record<string, string> = {
    purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    cyan: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    green: 'bg-green-500/20 text-green-400 border-green-500/30',
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-800/50">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="4" fill="white"/>
              <circle cx="6" cy="6" r="2.5" fill="white" fillOpacity="0.7"/>
              <circle cx="22" cy="6" r="2.5" fill="white" fillOpacity="0.7"/>
              <circle cx="6" cy="22" r="2.5" fill="white" fillOpacity="0.7"/>
              <circle cx="22" cy="22" r="2.5" fill="white" fillOpacity="0.7"/>
              <line x1="14" y1="14" x2="6" y2="6" stroke="white" strokeWidth="1" strokeOpacity="0.5"/>
              <line x1="14" y1="14" x2="22" y2="6" stroke="white" strokeWidth="1" strokeOpacity="0.5"/>
              <line x1="14" y1="14" x2="6" y2="22" stroke="white" strokeWidth="1" strokeOpacity="0.5"/>
              <line x1="14" y1="14" x2="22" y2="22" stroke="white" strokeWidth="1" strokeOpacity="0.5"/>
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Network</h2>
            <p className="text-gray-400 text-sm">Connect with the BuildVision team and community</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-4">Contacts</div>
        <div className="space-y-3 mb-8">
          {contacts.map((contact) => (
            <div key={contact.email} className={`p-4 rounded-xl border ${colorMap[contact.color]} bg-opacity-10`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${colorMap[contact.color]}`}>
                    {contact.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{contact.name}</div>
                    <div className="text-xs text-gray-500">{contact.role}</div>
                  </div>
                </div>
                <a href={`mailto:${contact.email}`} className="text-sm text-gray-400 hover:text-white transition-colors">
                  {contact.email}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-4">Community</div>
        <div className="grid grid-cols-2 gap-3">
          <button className="p-4 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-gray-600 text-left transition-colors">
            <div className="text-white font-medium mb-1">Discord Community</div>
            <div className="text-xs text-gray-500">Join 2,500+ builders</div>
          </button>
          <button className="p-4 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-gray-600 text-left transition-colors">
            <div className="text-white font-medium mb-1">LinkedIn</div>
            <div className="text-xs text-gray-500">Follow for updates</div>
          </button>
        </div>
      </div>
    </div>
  );
};

// Demo Window Content - Extraction Demo
export { DemoWindowContent } from './DemoWindow';

// Sign Up / Sign In Content
export const SignUpContent: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <div className="h-full flex flex-col">
      {/* Header with toggle */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="10" r="5" stroke="white" strokeWidth="2" fill="none"/>
              <path d="M6 26 C6 20 10 16 14 16 C18 16 22 20 22 26" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </h2>
            <p className="text-gray-400 text-sm">
              {isSignUp ? 'Get started with BuildVision for free' : 'Sign in to your BuildVision account'}
            </p>
          </div>
        </div>
        
        {/* Toggle tabs */}
        <div className="flex gap-1 p-1 bg-gray-800/50 rounded-lg w-fit">
          <button
            onClick={() => setIsSignUp(true)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isSignUp ? 'bg-bv-primary text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setIsSignUp(false)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              !isSignUp ? 'bg-bv-primary text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-sm mx-auto space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Full name</label>
              <input
                type="text"
                placeholder="John Smith"
                className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-bv-primary focus:ring-1 focus:ring-bv-primary"
              />
            </div>
          )}
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Email address</label>
            <input
              type="email"
              placeholder="you@company.com"
              className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-bv-primary focus:ring-1 focus:ring-bv-primary"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-bv-primary focus:ring-1 focus:ring-bv-primary"
            />
          </div>
          
          {isSignUp && (
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Company</label>
              <input
                type="text"
                placeholder="ACME Mechanical"
                className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-bv-primary focus:ring-1 focus:ring-bv-primary"
              />
            </div>
          )}

          <button className="w-full py-3 px-4 bg-bv-primary hover:bg-bv-primary/90 text-white font-semibold rounded-lg flex items-center justify-center gap-2 mt-6">
            {isSignUp ? 'Create account' : 'Sign in'}
            <ArrowRight size={16} />
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-bv-dark text-gray-500">or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-gray-700 bg-gray-800/30 hover:bg-gray-800/50 text-white transition-colors">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.49h4.84a4.14 4.14 0 01-1.8 2.72v2.26h2.92a8.78 8.78 0 002.68-6.63z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26c-.81.54-1.85.86-3.05.86-2.34 0-4.32-1.58-5.03-3.71H.96v2.33A9 9 0 009 18z" fill="#34A853"/>
                <path d="M3.97 10.71A5.41 5.41 0 013.68 9c0-.6.1-1.17.28-1.71V4.96H.96A9 9 0 000 9c0 1.45.35 2.82.96 4.04l3.01-2.33z" fill="#FBBC05"/>
                <path d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58A9 9 0 009 0 9 9 0 00.96 4.96l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              <span className="text-sm">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-gray-700 bg-gray-800/30 hover:bg-gray-800/50 text-white transition-colors">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                <path d="M9 0a9 9 0 00-2.84 17.53c.45.08.62-.2.62-.43v-1.52c-2.51.55-3.04-1.21-3.04-1.21-.41-1.04-1-1.32-1-1.32-.82-.56.06-.55.06-.55.9.06 1.38.93 1.38.93.8 1.38 2.1.98 2.62.75.08-.58.31-.98.57-1.2-2-.23-4.1-1-4.1-4.45 0-.98.35-1.78.92-2.41-.09-.23-.4-1.14.09-2.38 0 0 .75-.24 2.46.92a8.57 8.57 0 014.5 0c1.71-1.16 2.46-.92 2.46-.92.49 1.24.18 2.15.09 2.38.57.63.92 1.43.92 2.41 0 3.46-2.1 4.22-4.11 4.44.32.28.61.83.61 1.67v2.48c0 .24.16.52.62.43A9 9 0 009 0z"/>
              </svg>
              <span className="text-sm">GitHub</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-xs text-gray-500">
            {isSignUp ? (
              <>By signing up, you agree to our Terms of Service and Privacy Policy</>
            ) : (
              <>Forgot your password? <button className="text-bv-primary hover:underline">Reset it here</button></>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
