"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { EquipmentItem } from '@/lib/types';
import { mockEquipmentData } from '@/lib/mock-data';
import { Button } from '@/components/ui/Button';
import { DropZone } from '@/components/extract/DropZone';
import { ProcessingView } from '@/components/extract/ProcessingView';
import { ResultsView } from '@/components/extract/ResultsView';
import { useAuth } from '@/contexts/AuthContext';

type ExtractState = 'idle' | 'processing' | 'results';

interface ExtractWindowContentProps {
  onTitleChange: (title: string) => void;
  onActionsChange: (actions: React.ReactNode) => void;
  onAuthRequired?: () => void;
}

export const ExtractWindowContent: React.FC<ExtractWindowContentProps> = ({
  onTitleChange,
  onActionsChange,
  onAuthRequired,
}) => {
  const { user, isAuthenticated, setPendingAction } = useAuth();
  const [state, setState] = useState<ExtractState>('idle');
  const [filename, setFilename] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentSheet, setCurrentSheet] = useState(0);
  const [totalSheets, setTotalSheets] = useState(12);
  const [extractedItems, setExtractedItems] = useState<EquipmentItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  // Update title based on state
  useEffect(() => {
    switch (state) {
      case 'idle':
        onTitleChange('New Extraction');
        onActionsChange(null);
        break;
      case 'processing':
        onTitleChange(`Processing: ${filename || 'file.pdf'}`);
        onActionsChange(null);
        break;
      case 'results':
        onTitleChange(`${filename || 'file.pdf'} – ${extractedItems.length} Items`);
        onActionsChange(
          <Button variant="outlined" size="sm" onClick={handleSaveProject}>
            Save Project
          </Button>
        );
        break;
    }
  }, [state, filename, extractedItems.length]);

  // Simulate extraction process
  const startExtraction = useCallback((file: File) => {
    setFilename(file.name);
    setState('processing');
    setProgress(0);
    setCurrentSheet(1);
    setExtractedItems([]);

    // Simulate progress
    let currentProgress = 0;
    let currentItem = 0;
    const totalItems = mockEquipmentData.length;
    
    const interval = setInterval(() => {
      currentProgress += 2 + Math.random() * 3;
      
      // Add items gradually
      const itemsToShow = Math.floor((currentProgress / 100) * totalItems);
      if (itemsToShow > currentItem) {
        setExtractedItems(mockEquipmentData.slice(0, itemsToShow));
        currentItem = itemsToShow;
      }
      
      // Update sheet progress
      setCurrentSheet(Math.min(Math.ceil((currentProgress / 100) * totalSheets), totalSheets));
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setProgress(100);
        setExtractedItems(mockEquipmentData);
        
        // Transition to results after a brief delay
        setTimeout(() => {
          setState('results');
        }, 500);
      } else {
        setProgress(currentProgress);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [totalSheets]);

  const handleFileDrop = (file: File) => {
    startExtraction(file);
  };

  const handleError = (_error: string) => {
    // TODO(BV-006): Show toast notification for errors
  };

  const handleSaveProject = useCallback(() => {
    if (!isAuthenticated) {
      // Store the project data as a pending action
      const projectData = {
        filename,
        items: extractedItems,
        selectedItems,
        savedAt: new Date().toISOString(),
      };
      setPendingAction({ type: 'save-project', data: projectData });
      
      // Trigger auth window opening
      if (onAuthRequired) {
        onAuthRequired();
      }
      return;
    }
    
    // TODO(BV-007): Implement actual save to backend
    setIsSaved(true);
    // Show success feedback (would use a toast in production)
    alert('Project saved successfully!');
  }, [isAuthenticated, filename, extractedItems, selectedItems, setPendingAction, onAuthRequired]);

  const handleGenerateRFQ = () => {
    // TODO(BV-008): Implement RFQ generation
  };

  const handleExportCSV = () => {
    // Generate CSV from selected items
    const selectedEquipment = extractedItems.filter(item => 
      selectedItems.includes(item.id)
    );
    
    const headers = ['Tag', 'Name', 'Model', 'Category', 'Specs', 'Spec Section', 'Quantity'];
    const rows = selectedEquipment.map(item => [
      item.tag,
      item.name,
      item.model,
      item.category,
      item.specs.join('; '),
      item.specSection,
      item.quantity.toString(),
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    const baseName = filename?.replace(/\.[^.]+$/, '') || 'equipment';
    link.href = url;
    link.download = `${baseName}-export.csv`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  switch (state) {
    case 'idle':
      return (
        <DropZone
          onFileDrop={handleFileDrop}
          onError={handleError}
        />
      );
    
    case 'processing':
      return (
        <ProcessingView
          filename={filename || 'file.pdf'}
          progress={progress}
          currentSheet={currentSheet}
          totalSheets={totalSheets}
          extractedItems={extractedItems}
        />
      );
    
    case 'results':
      return (
        <ResultsView
          filename={filename || 'file.pdf'}
          items={extractedItems}
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
          onSaveProject={handleSaveProject}
          onGenerateRFQ={handleGenerateRFQ}
          onExportCSV={handleExportCSV}
        />
      );
  }
};
