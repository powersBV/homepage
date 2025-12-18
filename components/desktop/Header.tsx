"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronDown, Grid3X3, Search, TrendingUp, Cpu, Wrench, BarChart3, Calculator, Zap, Phone, Star, LogOut, User, Settings, CreditCard, Plug } from 'lucide-react';
import { tools, Tool } from '@/lib/tools-data';
import { iconMap } from '../icons/ToolIcons';
import { useAuth, User as AuthUser } from '@/contexts/AuthContext';

interface HeaderProps {
  onNavClick: (section: string) => void;
  onToolSelect?: (tool: Tool) => void;
  onOpenAuth?: () => void;
}

// Category configuration with icons
const categoryConfig = {
  ai: { 
    label: 'AI-Powered Tools', 
    icon: Cpu, 
    color: 'text-purple-400',
    description: 'Extract equipment, generate specs, check submittals'
  },
  engineering: { 
    label: 'Engineering Calculators', 
    icon: Calculator, 
    color: 'text-cyan-400',
    description: 'Psych charts, sound, unit conversions'
  },
  workflow: { 
    label: 'Workflow & Procurement', 
    icon: Wrench, 
    color: 'text-green-400',
    description: 'Proposals, approvals, order tracking'
  },
  analytics: { 
    label: 'Analytics & Checks', 
    icon: BarChart3, 
    color: 'text-blue-400',
    description: 'Error detection, credit checks, insights'
  },
};

export const Header: React.FC<HeaderProps> = ({ onNavClick, onToolSelect, onOpenAuth }) => {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/098c92ed-a44b-4fe3-bd76-b15f37e46396',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/desktop/Header.tsx:44',message:'Header component render',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'E'})}).catch(()=>{});
  // #endregion
  
  const [isProductOSOpen, setIsProductOSOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/098c92ed-a44b-4fe3-bd76-b15f37e46396',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/desktop/Header.tsx:52',message:'Before useAuth hook',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'E'})}).catch(()=>{});
  // #endregion
  
  const { user, isAuthenticated, signOut } = useAuth();
  
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/098c92ed-a44b-4fe3-bd76-b15f37e46396',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/desktop/Header.tsx:56',message:'After useAuth hook',data:{isAuthenticated},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'E'})}).catch(()=>{});
  // #endregion

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProductOSOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get user initials for avatar
  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSignOut = () => {
    setIsUserMenuOpen(false);
    signOut();
  };

  // Group tools by category
  const toolsByCategory = tools.reduce((acc, tool) => {
    if (!acc[tool.category]) acc[tool.category] = [];
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, Tool[]>);

  const handleToolClick = (tool: Tool) => {
    setIsProductOSOpen(false);
    onToolSelect?.(tool);
  };

  const handleBrowseAll = () => {
    setIsProductOSOpen(false);
    onNavClick('product-os');
  };

  return (
    <header className="h-14 bg-black/90 backdrop-blur-md border-b border-neutral-800 flex items-center px-6 z-50 relative" role="banner">
      {/* Logo */}
      <a href="/" className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-bv-primary rounded-lg" aria-label="BuildVision Home">
        <Image 
          src="/logo/icon.png" 
          alt="" 
          width={28} 
          height={28}
          className="w-7 h-7"
          aria-hidden="true"
        />
        <span className="font-bold text-white text-lg">BuildVision</span>
      </a>
      
      {/* Nav Links */}
      <nav className="flex-1 flex items-center justify-center gap-6" role="navigation" aria-label="Main navigation">
        {/* Product OS Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsProductOSOpen(!isProductOSOpen)}
            className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-bv-primary ${
              isProductOSOpen ? 'bg-bv-primary/20 text-white' : 'text-neutral-500 hover:text-white hover:bg-white/5'
            }`}
            aria-expanded={isProductOSOpen}
            aria-haspopup="true"
          >
            Product OS
            <ChevronDown size={14} className={`transition-transform ${isProductOSOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu - Dark Theme */}
          {isProductOSOpen && (
            <div className="absolute top-full left-0 mt-2 w-[700px] bg-bv-dark/95 backdrop-blur-xl rounded-xl shadow-2xl border border-neutral-700/50 overflow-hidden z-[100]">
              {/* Top Section */}
              <div className="p-4 border-b border-neutral-700/50">
                <div className="flex gap-2">
                  <button 
                    onClick={handleBrowseAll}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-bv-primary/10 hover:bg-bv-primary/20 border border-bv-primary/30 transition-colors flex-1"
                  >
                    <Grid3X3 size={18} className="text-bv-primary" />
                    <span className="text-sm font-normal text-white">Browse all tools ({tools.length})</span>
                    <ChevronDown size={14} className="text-neutral-500 -rotate-90 ml-auto" />
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                    <Search size={18} className="text-neutral-500" />
                    <span className="text-sm text-neutral-500">Search tools</span>
                  </button>
                </div>
                <div className="flex gap-2 mt-2">
                  <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                    <TrendingUp size={16} className="text-orange-400" />
                    <span className="text-sm text-neutral-300">Popular tools</span>
                    <ChevronDown size={14} className="text-neutral-600 -rotate-90" />
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                    <Star size={16} className="text-yellow-400" />
                    <span className="text-sm text-neutral-300">New tools</span>
                    <ChevronDown size={14} className="text-neutral-600 -rotate-90" />
                  </button>
                </div>
              </div>

              {/* Categories Section */}
              <div className="p-4">
                <div className="text-xs font-normal text-neutral-600 uppercase tracking-wider mb-3">Categories</div>
                <div className="grid grid-cols-2 gap-1">
                  {Object.entries(categoryConfig).map(([key, config]) => {
                    const categoryTools = toolsByCategory[key] || [];
                    const IconComponent = config.icon;
                    return (
                      <div key={key} className="group">
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-left">
                          <IconComponent size={18} className={config.color} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-normal text-white">{config.label}</span>
                              <span className="text-xs text-neutral-600">({categoryTools.length})</span>
                            </div>
                            <div className="text-xs text-neutral-600 truncate">{config.description}</div>
                          </div>
                          <ChevronDown size={14} className="text-neutral-600 -rotate-90 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                        
                        {/* Tool items within category */}
                        <div className="ml-9 mt-1 space-y-0.5">
                          {categoryTools.slice(0, 3).map((tool) => {
                            const ToolIcon = iconMap[tool.id];
                            return (
                              <button
                                key={tool.id}
                                onClick={() => handleToolClick(tool)}
                                className="w-full flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-white/5 transition-colors text-left"
                              >
                                {ToolIcon && (
                                  <div className={`w-5 h-5 ${config.color}`}>
                                    <ToolIcon size={20} />
                                  </div>
                                )}
                                <span className="text-sm text-neutral-300">{tool.name}</span>
                              </button>
                            );
                          })}
                          {categoryTools.length > 3 && (
                            <button 
                              onClick={handleBrowseAll}
                              className="text-xs text-bv-primary hover:text-bv-primary/80 px-3 py-1"
                            >
                              +{categoryTools.length - 3} more
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Section */}
              <div className="px-4 py-3 bg-neutral-900/50 border-t border-neutral-700/50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <Zap size={14} className="text-yellow-400" />
                  <span>All tools are free to use</span>
                </div>
                <button 
                  onClick={handleBrowseAll}
                  className="text-sm text-bv-primary font-normal hover:text-bv-primary/80 flex items-center gap-1"
                >
                  View all tools
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>

        <button 
          onClick={() => onNavClick('pricing')}
          className="text-sm text-neutral-500 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-bv-primary rounded px-2 py-1"
        >
          Pricing
        </button>
        <button 
          onClick={() => onNavClick('docs')}
          className="text-sm text-neutral-500 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-bv-primary rounded px-2 py-1"
        >
          Docs
        </button>
        <button 
          onClick={() => onNavClick('about')}
          className="text-sm text-neutral-500 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-bv-primary rounded px-2 py-1"
        >
          Company
        </button>
      </nav>
      
      {/* Right side with phone and auth */}
      <div className="flex items-center gap-4">
        <a href="tel:+18885551234" className="hidden lg:flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors">
          <Phone size={14} />
          <span>(888) 555-1234</span>
        </a>
        
        {isAuthenticated && user ? (
          /* User Avatar Dropdown */
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-700 text-xs font-bold hover:bg-neutral-300 transition-colors focus:outline-none focus:ring-2 focus:ring-bv-primary"
              aria-label="User menu"
              aria-expanded={isUserMenuOpen}
              aria-haspopup="true"
            >
              {user.avatarUrl ? (
                <Image
                  src={user.avatarUrl}
                  alt={user.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              ) : (
                getUserInitials(user.name)
              )}
            </button>

            {/* User Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-[220px] bg-white rounded-lg shadow-lg border border-neutral-200 overflow-hidden z-[100]">
                {/* User Info */}
                <div className="p-3 border-b border-neutral-200">
                  <p className="text-body-small font-bold text-neutral-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-detail text-neutral-600 truncate">
                    {user.email}
                  </p>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <button 
                    onClick={() => { setIsUserMenuOpen(false); onNavClick('profile'); }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-detail text-neutral-700 hover:bg-neutral-50 transition-colors text-left"
                  >
                    <User size={16} className="text-neutral-500" />
                    Profile
                  </button>
                  <button 
                    onClick={() => { setIsUserMenuOpen(false); onNavClick('settings'); }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-detail text-neutral-700 hover:bg-neutral-50 transition-colors text-left"
                  >
                    <Settings size={16} className="text-neutral-500" />
                    Settings
                  </button>
                </div>

                <div className="border-t border-neutral-200 py-1">
                  <button 
                    onClick={() => { setIsUserMenuOpen(false); onNavClick('pricing'); }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-detail text-neutral-700 hover:bg-neutral-50 transition-colors text-left"
                  >
                    <CreditCard size={16} className="text-neutral-500" />
                    Pricing
                  </button>
                  <button 
                    onClick={() => { setIsUserMenuOpen(false); onNavClick('integrations'); }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-detail text-neutral-700 hover:bg-neutral-50 transition-colors text-left"
                  >
                    <Plug size={16} className="text-neutral-500" />
                    Integrations
                  </button>
                </div>

                <div className="border-t border-neutral-200 py-1">
                  <button 
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-3 py-2 text-detail text-cad-red hover:bg-neutral-50 transition-colors text-left"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Sign In Button */
          <button 
            onClick={onOpenAuth}
            className="px-4 py-2 bg-bv-primary hover:bg-bv-primary/90 text-white text-sm font-normal rounded-lg flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-bv-dark"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};
