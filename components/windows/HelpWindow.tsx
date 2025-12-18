"use client";

import React from 'react';
import { Keyboard } from 'lucide-react';

interface ShortcutRow {
  keys: string;
  description: string;
}

const shortcuts: ShortcutRow[] = [
  { keys: '⌘N', description: 'New Extraction' },
  { keys: '⌘O', description: 'Open Project Files' },
  { keys: '⌘S', description: 'Save' },
  { keys: '⌘D', description: 'Show Desktop (minimize all)' },
  { keys: '⌘W', description: 'Close focused window' },
  { keys: '⌘M', description: 'Minimize focused window' },
  { keys: '⌘`', description: 'Cycle through windows' },
  { keys: '⌘/', description: 'Show keyboard shortcuts' },
  { keys: '⌘Enter', description: 'Enter full screen' },
  { keys: 'Escape', description: 'Close dropdown or deselect' },
];

const ShortcutItem: React.FC<ShortcutRow> = ({ keys, description }) => (
  <div className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-b-0">
    <span className="text-neutral-700" style={{ fontSize: '14px', lineHeight: '18px' }}>
      {description}
    </span>
    <kbd 
      className="px-2 py-1 bg-neutral-100 rounded text-neutral-600 font-mono text-sm"
      style={{ fontSize: '13px' }}
    >
      {keys}
    </kbd>
  </div>
);

export const HelpWindowContent: React.FC = () => {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
          <Keyboard size={20} className="text-blue-500" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-neutral-900">Keyboard Shortcuts</h2>
          <p className="text-sm text-neutral-500">Use ⌘ on Mac or Ctrl on Windows</p>
        </div>
      </div>

      {/* Shortcuts list */}
      <div className="bg-neutral-50 rounded-lg p-4">
        {shortcuts.map((shortcut, index) => (
          <ShortcutItem key={index} {...shortcut} />
        ))}
      </div>

      {/* Footer note */}
      <p className="mt-4 text-sm text-neutral-500 text-center">
        Press <kbd className="px-1 bg-neutral-100 rounded">⌘/</kbd> anytime to see this list
      </p>
    </div>
  );
};
