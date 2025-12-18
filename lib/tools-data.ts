export type ToolCategory = 'ai' | 'engineering' | 'workflow' | 'analytics';

export interface Tool {
  id: string;
  name: string;
  shortName: string;
  description: string;
  features: string[];
  category: ToolCategory;
  command: string;
}

export const categoryColors: Record<ToolCategory, { border: string; bg: string; text: string; glow: string }> = {
  ai: {
    border: 'border-purple-400/50',
    bg: 'bg-purple-400/10',
    text: 'text-purple-400',
    glow: 'rgba(167, 139, 250, 0.4)',
  },
  engineering: {
    border: 'border-cyan-400/50',
    bg: 'bg-cyan-400/10',
    text: 'text-cyan-400',
    glow: 'rgba(34, 211, 238, 0.4)',
  },
  workflow: {
    border: 'border-green-400/50',
    bg: 'bg-green-400/10',
    text: 'text-green-400',
    glow: 'rgba(74, 222, 128, 0.4)',
  },
  analytics: {
    border: 'border-blue-400/50',
    bg: 'bg-blue-400/10',
    text: 'text-blue-400',
    glow: 'rgba(96, 165, 250, 0.4)',
  },
};

export const categoryLabels: Record<ToolCategory, string> = {
  ai: 'AI-Powered',
  engineering: 'Engineering',
  workflow: 'Workflow',
  analytics: 'Analytics',
};

export const tools: Tool[] = [
  // AI-Powered Extraction & Automation
  {
    id: 'ai-takeoff',
    name: 'AI Takeoff',
    shortName: 'AI_TAKEOFF',
    description: 'Drop a PDF plan set, get a complete equipment list. Identifies chillers, AHUs, VRF, switchgear, VAVs, pumps—everything in your mechanical and electrical schedules.',
    features: [
      'Reads equipment schedules from any PDF drawing',
      'Handles mechanical, electrical, and plumbing',
      'Processes 200+ page plan sets in minutes',
      'Exports to Excel, CSV, or structured JSON',
    ],
    category: 'ai',
    command: 'Upload drawings → Get equipment list',
  },
  {
    id: 'spec-writer',
    name: 'Spec Writer',
    shortName: 'SPEC_WRITER',
    description: 'Generate spec sections automatically from your equipment schedules. CSI-formatted, ready for submittal packages.',
    features: [
      'Auto-generate Division 23/26 specifications',
      'Pulls directly from your takeoff data',
      'Templates for common equipment types',
      'Track changes between versions',
    ],
    category: 'ai',
    command: 'Equipment list → Spec sections',
  },
  {
    id: 'ai-scope-sheet',
    name: 'Scope Sheet Generator',
    shortName: 'SCOPE_SHEET',
    description: 'Create bid-ready scope documents from your takeoff. Equipment, quantities, and specs formatted for your subs and vendors.',
    features: [
      'Auto-generates scope of work from takeoff',
      'Includes all equipment with specs and counts',
      'Your company branding and templates',
      'Export to PDF or Excel for distribution',
    ],
    category: 'ai',
    command: 'Takeoff → RFQ-ready scope sheet',
  },
  {
    id: 'submittal-review',
    name: 'Submittal Checker',
    shortName: 'SUBMITTAL_REV',
    description: 'Compares submittals against project specs automatically. Flags deviations before they become change orders.',
    features: [
      'Side-by-side spec vs. submittal comparison',
      'Automatic red-flag on non-compliant items',
      'Works with multiple reviewers',
      'Generates compliance reports',
    ],
    category: 'ai',
    command: 'Submittal → Compliance check',
  },
  {
    id: 'selection-copilot',
    name: 'Equipment Selector',
    shortName: 'EQUIP_SELECT',
    description: 'Find the right equipment across manufacturers. Compare Trane vs. Carrier vs. Daikin with real performance data.',
    features: [
      'Cross-manufacturer equipment comparison',
      'Performance-matched alternatives',
      'Generates selection data sheets',
      'Connected to manufacturer catalogs',
    ],
    category: 'ai',
    command: 'Spec requirements → Equipment options',
  },
  // Engineering Calculators
  {
    id: 'psychrometric',
    name: 'Psychrometric Calculator',
    shortName: 'PSYCHRO_CALC',
    description: 'Full psychrometric chart with interactive state points. Calculate air properties, processes, and coil loads.',
    features: [
      'Interactive psych chart visualization',
      'State point calculations',
      'Process line analysis',
      'Export calculations to reports',
    ],
    category: 'engineering',
    command: 'Air properties and coil calculations',
  },
  {
    id: 'sound-analyzer',
    name: 'Sound Calculator',
    shortName: 'SOUND_CALC',
    description: 'Convert octave band data to dBA or NC ratings. Check if equipment meets spec sound requirements.',
    features: [
      'Octave band to dBA conversion',
      'NC and RC rating calculations',
      'Sound power vs. pressure analysis',
      'Import manufacturer sound data',
    ],
    category: 'engineering',
    command: 'Octave bands → NC/dBA ratings',
  },
  {
    id: 'unit-converter',
    name: 'HVAC Unit Converter',
    shortName: 'UNIT_CONV',
    description: 'Quick conversions for CFM, tons, BTU/hr, kW, GPM, and all the units you deal with daily.',
    features: [
      'All common HVAC units included',
      'Batch conversion for lists',
      'Formula references shown',
      'One-click copy to clipboard',
    ],
    category: 'engineering',
    command: 'CFM ↔ L/s, tons ↔ kW, etc.',
  },
  // Workflow & Procurement
  {
    id: 'proposal-maker',
    name: 'Proposal Builder',
    shortName: 'PROPOSAL_BLD',
    description: 'Turn your takeoff into a client-ready proposal. Your branding, your pricing, professional output.',
    features: [
      'Generates proposals from takeoff data',
      'Your logo and company branding',
      'Integrates with your pricing',
      'PDF export with e-signature',
    ],
    category: 'workflow',
    command: 'Takeoff → Client proposal',
  },
  {
    id: 'procurement-report',
    name: 'Order Tracker',
    shortName: 'ORDER_TRACK',
    description: 'See all your equipment orders in one place. Lead times, delivery dates, and vendor status across every project.',
    features: [
      'All projects, one dashboard',
      'Lead time alerts and monitoring',
      'Delivery schedule visibility',
      'Vendor performance tracking',
    ],
    category: 'workflow',
    command: 'Track orders across all projects',
  },
  {
    id: 'submittal-approval',
    name: 'Approval Workflow',
    shortName: 'APPROVAL_FLOW',
    description: 'Track submittals from engineer to contractor to rep. See who needs to approve what, and when.',
    features: [
      'Multi-party approval routing',
      'Automatic reminders',
      'Status dashboard',
      'Full audit trail',
    ],
    category: 'workflow',
    command: 'Route submittals → Track approvals',
  },
  {
    id: 've-alternate',
    name: 'Value Engineering Tool',
    shortName: 'VE_TOOL',
    description: 'Compare substitution options with spec impact analysis. Know what you\'re giving up before you switch.',
    features: [
      'Side-by-side equipment comparison',
      'Spec compliance impact scoring',
      'Cost savings analysis',
      'Generates approval documentation',
    ],
    category: 'workflow',
    command: 'Compare alternates → Document savings',
  },
  // Analytics & Risk
  {
    id: 'credit-check',
    name: 'Vendor Credit Check',
    shortName: 'CREDIT_CHK',
    description: 'Verify vendor credit before large equipment orders. Know the risk before you commit.',
    features: [
      'Automated credit verification',
      'Risk scoring and flags',
      'Credit bureau integration',
      'Approval workflow built-in',
    ],
    category: 'analytics',
    command: 'Check vendor credit → Get risk score',
  },
  {
    id: 'anomaly-detection',
    name: 'Spec Sanity Check',
    shortName: 'SPEC_CHECK',
    description: 'Catches engineering errors before they become expensive change orders. AI flags things that don\'t add up.',
    features: [
      'Detects specification anomalies',
      'Compares against historical projects',
      'Validates engineering rules',
      'Early warning on issues',
    ],
    category: 'analytics',
    command: 'Find errors before they cost you',
  },
  {
    id: 'analytics-dashboard',
    name: 'Project Analytics',
    shortName: 'ANALYTICS',
    description: 'See trends across all your projects. Costs, lead times, vendor performance—the data you need to negotiate better.',
    features: [
      'Cross-project analytics',
      'Cost trend analysis',
      'Vendor scorecards',
      'Custom report builder',
    ],
    category: 'analytics',
    command: 'All projects → Insights dashboard',
  },
];

export const toolsByCategory = tools.reduce((acc, tool) => {
  if (!acc[tool.category]) {
    acc[tool.category] = [];
  }
  acc[tool.category].push(tool);
  return acc;
}, {} as Record<ToolCategory, Tool[]>);
