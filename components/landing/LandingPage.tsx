"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  ArrowRight, 
  Phone, 
  Play, 
  Check, 
  FileText, 
  Zap, 
  Shield, 
  Clock,
  Users,
  Building2,
  Factory,
  ChevronDown,
  Quote,
  Star,
  ArrowUpRight
} from 'lucide-react';

interface LandingPageProps {
  onEnterPlatform: () => void;
}

// Customer logos data
const customerLogos = [
  { name: 'McKinstry', logo: 'M' },
  { name: 'Limbach', logo: 'L' },
  { name: 'EMCOR', logo: 'E' },
  { name: 'Comfort Systems', logo: 'CS' },
  { name: 'Southland Industries', logo: 'SI' },
  { name: 'TDIndustries', logo: 'TD' },
];

// Integration logos
const integrationLogos = [
  { name: 'Procore', color: '#F7931E' },
  { name: 'Bluebeam', color: '#0066CC' },
  { name: 'Autodesk', color: '#0696D7' },
  { name: 'Trane', color: '#E31937' },
  { name: 'Carrier', color: '#004990' },
  { name: 'Greenheck', color: '#6DB33F' },
  { name: 'Johnson Controls', color: '#00629B' },
  { name: 'Daikin', color: '#003D7C' },
];

// Stats data
const stats = [
  { value: '60%', label: 'Faster RFQ cycles', subtext: 'vs. manual takeoff' },
  { value: '94%', label: 'Extraction accuracy', subtext: 'verified by engineers' },
  { value: '$2.4M', label: 'Equipment savings', subtext: 'across customer base' },
  { value: '< 5 min', label: 'Drawings to quote', subtext: 'average processing' },
];

// Testimonials
const testimonials = [
  {
    quote: "We used to spend 4-6 hours decoding equipment schedules from a plan set. BuildVision does it in minutes with better accuracy than our junior estimators.",
    author: "Mike Sullivan",
    title: "VP Operations",
    company: "Sullivan Mechanical",
    image: "MS",
  },
  {
    quote: "Finally, software that understands the difference between what's specified and what's actually selected. The Five Authorities model matches how we actually work.",
    author: "Jennifer Chen",
    title: "Procurement Director",
    company: "Comfort Systems USA",
    image: "JC",
  },
  {
    quote: "As a rep, I get cleaner inputs from contractors using BuildVision. Less back-and-forth, faster quotes, happier customers.",
    author: "David Martinez",
    title: "Regional Sales Manager",
    company: "Trane Commercial",
    image: "DM",
  },
];

// Five Authorities
const authorities = [
  { 
    id: 'design', 
    name: 'Design Intent', 
    description: 'What engineers specify',
    examples: 'Equipment schedules, spec sections, sequences',
    color: 'purple'
  },
  { 
    id: 'technical', 
    name: 'Technical Selection', 
    description: 'What gets actually selected',
    examples: 'SKUs, configurations, accessories',
    color: 'cyan'
  },
  { 
    id: 'commercial', 
    name: 'Commercial Terms', 
    description: 'What procurement buys',
    examples: 'Pricing, freight, lead times',
    color: 'green'
  },
  { 
    id: 'compliance', 
    name: 'Compliance Rules', 
    description: 'What must be followed',
    examples: 'Codes, standards, certifications',
    color: 'yellow'
  },
  { 
    id: 'change', 
    name: 'Change Trace', 
    description: 'The audit trail',
    examples: 'RFIs, VE decisions, addenda',
    color: 'blue'
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string }> = {
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
  green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400' },
  yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400' },
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
};

// ICP Cards
const icpCards = [
  {
    id: 'contractors',
    title: 'Contractors & GCs',
    icon: Building2,
    description: 'Stop decoding drawings manually. Get accurate takeoffs and quotes in minutes.',
    benefits: ['60% faster RFQ cycles', 'Fewer costly errors', 'Auditable decisions'],
    cta: 'See how it works',
    color: 'purple',
  },
  {
    id: 'reps',
    title: 'Reps & Distributors',
    icon: Users,
    description: 'Get cleaner inputs from contractors. Less decoding, faster turnaround.',
    benefits: ['Structured equipment requests', 'Faster quote response', 'Better win rates'],
    cta: 'Learn more',
    color: 'cyan',
  },
  {
    id: 'oems',
    title: 'OEMs & Manufacturers',
    icon: Factory,
    description: 'See structured demand before it becomes an order. Better forecasting, faster conversion.',
    benefits: ['Early demand visibility', 'Structured product data', 'Channel insights'],
    cta: 'Partner with us',
    color: 'green',
  },
];

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterPlatform }) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <div className="min-h-screen bg-bv-dark">
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <Image src="/logo/icon.png" alt="BuildVision" width={32} height={32} />
            <span className="font-bold text-white text-lg">BuildVision</span>
          </a>
          
          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#how-it-works" className="text-sm text-neutral-500 hover:text-white transition-colors">How It Works</a>
            <a href="#for-you" className="text-sm text-neutral-500 hover:text-white transition-colors">Solutions</a>
            <a href="#pricing" className="text-sm text-neutral-500 hover:text-white transition-colors">Pricing</a>
            <a href="#demo" className="text-sm text-neutral-500 hover:text-white transition-colors">Demo</a>
          </nav>
          
          {/* Right side */}
          <div className="flex items-center gap-4">
            <a href="tel:+18885551234" className="hidden md:flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors">
              <Phone size={14} />
              <span>(888) 555-1234</span>
            </a>
            <button 
              type="button"
              onClick={onEnterPlatform}
              className="px-4 py-2 bg-bv-primary hover:bg-bv-primary/90 text-white text-sm font-normal rounded-lg flex items-center gap-2 transition-colors"
            >
              Try Free
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 mb-6"
            >
              <Check size={14} className="text-green-400" />
              <span className="text-sm text-green-400 font-normal">All 15 tools free • No credit card required</span>
            </motion.div>
            
            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Stop decoding equipment schedules{' '}
              <span className="text-bv-primary">manually</span>
            </motion.h1>
            
            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-neutral-500 mb-8 max-w-2xl mx-auto"
            >
              BuildVision extracts equipment from MEP drawings and structures every decision—from design intent to final quote. 
              <span className="text-white font-normal"> From drawings to procurement in minutes.</span>
            </motion.p>
            
            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <button 
                type="button"
                onClick={onEnterPlatform}
                className="px-8 py-4 bg-bv-primary hover:bg-bv-primary/90 text-white font-bold rounded-xl flex items-center gap-3 transition-all hover:scale-105 shadow-lg shadow-bv-primary/25"
              >
                <FileText size={20} />
                Upload a Drawing Free
                <ArrowRight size={18} />
              </button>
              <a 
                href="#demo"
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-normal rounded-xl flex items-center gap-3 transition-colors"
              >
                <Play size={18} />
                Watch 2-min Demo
              </a>
            </motion.div>
            
            {/* Trust logos */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-8 border-t border-neutral-800"
            >
              <p className="text-sm text-neutral-600 mb-4">Trusted by leading mechanical contractors</p>
              <div className="flex items-center justify-center gap-8 flex-wrap">
                {customerLogos.map((logo) => (
                  <div key={logo.name} className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors">
                    <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-sm font-bold">
                      {logo.logo}
                    </div>
                    <span className="text-sm font-normal">{logo.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 px-6 bg-gradient-to-r from-bv-primary/10 via-purple-600/10 to-bv-primary/10 border-y border-bv-primary/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-neutral-300 font-normal">{stat.label}</div>
                <div className="text-xs text-neutral-600">{stat.subtext}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Demo Section */}
      <section id="demo" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              See the transformation in action
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">
              Watch how BuildVision converts a 200-page plan set into structured, quotable equipment data in under 5 minutes.
            </p>
          </div>
          
          {/* Video placeholder with before/after */}
          <div className="relative max-w-5xl mx-auto">
            <div className="aspect-video bg-gradient-to-br from-neutral-900 to-black rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
              {/* Before/After overlay */}
              <div className="absolute inset-0 flex">
                {/* Before side */}
                <div className="w-1/2 p-8 border-r border-neutral-700/50">
                  <div className="text-xs font-mono text-red-400 mb-2">BEFORE</div>
                  <div className="text-sm text-neutral-500 mb-4">Scattered PDFs, manual extraction</div>
                  {/* Simulated messy documents */}
                  <div className="space-y-2 opacity-60">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-8 bg-neutral-800 rounded flex items-center px-3">
                        <div className="w-4 h-4 bg-neutral-600 rounded mr-2" />
                        <div className="flex-1 h-2 bg-neutral-700 rounded" />
                      </div>
                    ))}
                  </div>
                </div>
                {/* After side */}
                <div className="w-1/2 p-8">
                  <div className="text-xs font-mono text-green-400 mb-2">AFTER</div>
                  <div className="text-sm text-neutral-500 mb-4">Structured, quotable data</div>
                  {/* Simulated structured data */}
                  <div className="space-y-2">
                    {['Chiller (2x 400T)', 'AHU-1 through AHU-12', 'VAV Boxes (156 units)', 'Pumps & Accessories'].map((item, i) => (
                      <div key={i} className="h-8 bg-green-500/10 border border-green-500/30 rounded flex items-center px-3">
                        <Check size={14} className="text-green-400 mr-2" />
                        <span className="text-sm text-green-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <button type="button" className="w-20 h-20 rounded-full bg-bv-primary hover:bg-bv-primary/90 flex items-center justify-center transition-all hover:scale-110 shadow-lg shadow-bv-primary/40">
                  <Play size={32} className="text-white ml-1" />
                </button>
              </div>
            </div>
            
            {/* Caption */}
            <p className="text-center text-sm text-neutral-600 mt-4">
              2 minute demo • No signup required to watch
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              From raw drawings to structured decisions
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">
              Five steps. Five minutes. Complete visibility.
            </p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { num: '01', title: 'Upload', desc: 'Drop your PDF plans, specs, or schedules', icon: FileText },
              { num: '02', title: 'Extract', desc: 'AI identifies all MEP equipment automatically', icon: Zap },
              { num: '03', title: 'Structure', desc: 'Data organized by the Five Authorities', icon: Shield },
              { num: '04', title: 'Quote', desc: 'Generate RFQs and get vendor quotes', icon: Clock },
              { num: '05', title: 'Procure', desc: 'Track orders through delivery', icon: Check },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="p-6 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-bv-primary/50 transition-colors h-full">
                  <div className="w-10 h-10 rounded-lg bg-bv-primary/20 border border-bv-primary/40 flex items-center justify-center mb-4">
                    <span className="text-bv-primary font-mono font-bold text-sm">{step.num}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-neutral-500">{step.desc}</p>
                </div>
                {i < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                    <ArrowRight size={16} className="text-neutral-600" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Five Authorities - Moat Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bv-primary/20 border border-bv-primary/30 mb-6">
                <span className="text-xs font-mono text-bv-primary">WHY WE'RE DIFFERENT</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Generic AI extracts words.{' '}
                <span className="text-bv-primary">BuildVision extracts decisions.</span>
              </h2>
              <p className="text-neutral-500 mb-6 text-lg">
                Every equipment item flows through five authorities—Design Intent, Technical Selection, Commercial Terms, Compliance, and Change History. 
              </p>
              <p className="text-neutral-600 mb-8">
                This isn't a feature. It's the architecture that makes everything else possible. Generic AI tools can't do this because they lack authority-aware decision semantics.
              </p>
              <button 
                type="button"
                onClick={onEnterPlatform}
                className="px-6 py-3 bg-bv-primary hover:bg-bv-primary/90 text-white font-bold rounded-lg flex items-center gap-2 transition-colors"
              >
                See It In Action
                <ArrowRight size={16} />
              </button>
            </div>
            
            <div className="space-y-3">
              {authorities.map((auth, index) => {
                const colors = colorMap[auth.color];
                return (
                  <motion.div
                    key={auth.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`p-4 rounded-xl ${colors.bg} border ${colors.border} hover:scale-[1.02] transition-transform cursor-pointer`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-8 h-8 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center shrink-0`}>
                        <span className={`text-xs font-bold ${colors.text}`}>{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className={`font-bold ${colors.text} mb-1`}>{auth.name}</div>
                        <div className="text-sm text-neutral-500 mb-1">{auth.description}</div>
                        <div className="text-xs text-neutral-600">{auth.examples}</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ICP Sections */}
      <section id="for-you" className="py-20 px-6 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Built for how you actually work
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">
              Whether you're buying equipment, selling it, or manufacturing it—BuildVision fits your workflow.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {icpCards.map((icp, index) => {
              const colors = colorMap[icp.color];
              const IconComponent = icp.icon;
              return (
                <motion.div
                  key={icp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`p-6 rounded-2xl ${colors.bg} border ${colors.border} hover:scale-[1.02] transition-all cursor-pointer group`}
                >
                  <div className={`w-12 h-12 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center mb-4`}>
                    <IconComponent className={colors.text} size={24} />
                  </div>
                  <h3 className={`text-xl font-bold ${colors.text} mb-2`}>{icp.title}</h3>
                  <p className="text-neutral-500 mb-4">{icp.description}</p>
                  <ul className="space-y-2 mb-6">
                    {icp.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-2 text-sm text-neutral-300">
                        <Check size={14} className={colors.text} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <button type="button" className={`flex items-center gap-2 text-sm font-normal ${colors.text} group-hover:underline`}>
                    {icp.cta}
                    <ArrowUpRight size={14} />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What our customers say
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={false}
                  animate={{ 
                    opacity: activeTestimonial === index ? 1 : 0,
                    x: activeTestimonial === index ? 0 : 20,
                  }}
                  className={`${activeTestimonial === index ? 'block' : 'hidden'}`}
                >
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-neutral-900 to-black border border-neutral-800">
                    <Quote className="text-bv-primary/30 w-12 h-12 mb-4" />
                    <blockquote className="text-xl md:text-2xl text-white mb-6 leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-bv-primary/20 flex items-center justify-center text-bv-primary font-bold">
                        {testimonial.image}
                      </div>
                      <div>
                        <div className="font-bold text-white">{testimonial.author}</div>
                        <div className="text-sm text-neutral-500">{testimonial.title}, {testimonial.company}</div>
                      </div>
                      <div className="ml-auto flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} size={16} className="text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    activeTestimonial === index ? 'bg-bv-primary' : 'bg-neutral-600 hover:bg-neutral-600'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Start free. Scale when ready.
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">
              All 15 tools included in every plan. No feature gating.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Free */}
            <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800">
              <div className="text-sm font-mono text-neutral-500 mb-2">FREE</div>
              <div className="text-4xl font-bold text-white mb-1">$0</div>
              <div className="text-neutral-600 mb-6">Forever free</div>
              <ul className="space-y-3 mb-6">
                {['All 15 tools included', '10 projects/month', '100 pages/project', 'Email support'].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-neutral-300">
                    <Check size={14} className="text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                type="button"
                onClick={onEnterPlatform}
                className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-normal rounded-lg transition-colors"
              >
                Get Started Free
              </button>
            </div>
            
            {/* Pro */}
            <div className="p-6 rounded-2xl bg-bv-primary/10 border-2 border-bv-primary relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-bv-primary text-white text-xs font-bold rounded-full">
                MOST POPULAR
              </div>
              <div className="text-sm font-mono text-bv-primary mb-2">PRO</div>
              <div className="text-4xl font-bold text-white mb-1">$99<span className="text-lg text-neutral-500">/mo</span></div>
              <div className="text-neutral-600 mb-6">Per seat</div>
              <ul className="space-y-3 mb-6">
                {['Unlimited projects', 'Unlimited pages', 'Team collaboration', 'Priority support', 'All integrations'].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-neutral-300">
                    <Check size={14} className="text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button type="button" className="w-full py-3 px-4 bg-bv-primary hover:bg-bv-primary/90 text-white font-bold rounded-lg transition-colors">
                Start 14-Day Trial
              </button>
            </div>
            
            {/* Enterprise */}
            <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800">
              <div className="text-sm font-mono text-neutral-500 mb-2">ENTERPRISE</div>
              <div className="text-4xl font-bold text-white mb-1">Custom</div>
              <div className="text-neutral-600 mb-6">Volume pricing</div>
              <ul className="space-y-3 mb-6">
                {['Dedicated support', 'Custom integrations', 'SSO & SAML', 'Audit logs', 'SLA guarantee'].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-neutral-300">
                    <Check size={14} className="text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button type="button" className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-normal rounded-lg transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Works with your existing tools
            </h2>
            <p className="text-neutral-500">
              Connect to the software and manufacturers you already use.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6">
            {integrationLogos.map((logo) => (
              <div
                key={logo.name}
                className="px-6 py-4 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-colors flex items-center gap-3"
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-sm"
                  style={{ backgroundColor: logo.color + '40' }}
                >
                  {logo.name.slice(0, 2)}
                </div>
                <span className="text-neutral-300 font-normal">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-b from-bv-primary/10 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to stop decoding drawings manually?
          </h2>
          <p className="text-xl text-neutral-500 mb-8">
            Join 500+ mechanical contractors who've already made the switch.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              type="button"
              onClick={onEnterPlatform}
              className="px-8 py-4 bg-bv-primary hover:bg-bv-primary/90 text-white font-bold rounded-xl flex items-center gap-3 transition-all hover:scale-105 shadow-lg shadow-bv-primary/25"
            >
              Get Started Free
              <ArrowRight size={18} />
            </button>
            <a 
              href="tel:+18885551234"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-normal rounded-xl flex items-center gap-3 transition-colors"
            >
              <Phone size={18} />
              (888) 555-1234
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            {/* Company info */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Image src="/logo/icon.png" alt="BuildVision" width={32} height={32} />
                <span className="font-bold text-white text-lg">BuildVision</span>
              </div>
              <p className="text-neutral-500 text-sm mb-4 max-w-xs">
                The decision system for MEP equipment. From drawings to procurement in minutes.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-neutral-500">
                  <Phone size={14} />
                  <a href="tel:+18885551234" className="hover:text-white transition-colors">(888) 555-1234</a>
                </div>
                <div className="text-neutral-500">
                  123 Construction Way, Suite 400<br />
                  San Francisco, CA 94105
                </div>
              </div>
            </div>
            
            {/* Links */}
            <div>
              <div className="text-sm font-bold text-white mb-4">Product</div>
              <ul className="space-y-2 text-sm">
                {['AI Takeoff', 'Equipment Selector', 'Spec Writer', 'Procurement'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-neutral-500 hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <div className="text-sm font-bold text-white mb-4">Company</div>
              <ul className="space-y-2 text-sm">
                {['About', 'Careers', 'Blog', 'Contact'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-neutral-500 hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <div className="text-sm font-bold text-white mb-4">Resources</div>
              <ul className="space-y-2 text-sm">
                {['Documentation', 'API Reference', 'Changelog', 'Status'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-neutral-500 hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-neutral-600">
              © 2024 BuildVision, Inc. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm text-neutral-600">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll indicator */}
      <motion.button
        onClick={onEnterPlatform}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 right-8 px-4 py-3 bg-bv-primary/90 hover:bg-bv-primary text-white text-sm font-normal rounded-xl flex items-center gap-2 shadow-lg shadow-bv-primary/30 z-40"
      >
        Try the Platform
        <ChevronDown size={16} className="rotate-[-90deg]" />
      </motion.button>
    </div>
  );
};
