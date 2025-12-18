"use client";

import React, { useState } from 'react';
import { Folder, Plus, Upload } from 'lucide-react';
import { useWindowManager } from '@/components/desktop/WindowManagerContext';
import { EmptyState } from '@/components/ui/EmptyState';

interface Project {
  id: string;
  name: string;
  items: number;
  modified: string;
  status: 'active' | 'quoted' | 'archived';
}

// Mock data for demonstration
const mockProjects: Project[] = [
  { id: '1', name: 'Harbor Tower', items: 112, modified: '2 hours ago', status: 'active' },
  { id: '2', name: '123 Main Street', items: 47, modified: 'Dec 15, 2024', status: 'active' },
  { id: '3', name: 'Riverside Medical', items: 89, modified: 'Nov 28, 2024', status: 'quoted' },
  { id: '4', name: 'Downtown Office Complex', items: 156, modified: 'Nov 20, 2024', status: 'active' },
  { id: '5', name: 'Suburban Mall Renovation', items: 34, modified: 'Oct 15, 2024', status: 'quoted' },
];

type FilterType = 'all' | 'active' | 'quoted' | 'archived';

interface SidebarItemProps {
  label: string;
  count?: number;
  isSelected: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, count, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-3 py-2 text-base transition-colors ${
      isSelected
        ? 'text-blue-500 bg-blue-50 border-l-2 border-blue-500'
        : 'text-neutral-700 hover:bg-neutral-100 border-l-2 border-transparent'
    }`}
    style={{ fontSize: '16px', lineHeight: '22px' }}
  >
    <span>{label}</span>
    {count !== undefined && (
      <span className="ml-2 text-xs text-neutral-500" style={{ fontSize: '12px', lineHeight: '16px' }}>
        ({count})
      </span>
    )}
  </button>
);

interface ProjectRowProps {
  project: Project;
  onDoubleClick: () => void;
}

const ProjectRow: React.FC<ProjectRowProps> = ({ project, onDoubleClick }) => (
  <button
    onDoubleClick={onDoubleClick}
    className="w-full h-14 px-4 py-3 flex items-center border-b border-neutral-100 hover:bg-neutral-100 transition-colors text-left"
  >
    <div className="flex-1 min-w-0">
      <span 
        className="font-bold text-neutral-900 truncate block"
        style={{ fontSize: '16px', lineHeight: '22px' }}
      >
        {project.name}
      </span>
    </div>
    <div className="w-20 text-right">
      <span className="text-neutral-600" style={{ fontSize: '14px', lineHeight: '18px' }}>
        {project.items}
      </span>
    </div>
    <div className="w-32 text-right">
      <span className="text-neutral-500" style={{ fontSize: '14px', lineHeight: '18px' }}>
        {project.modified}
      </span>
    </div>
  </button>
);

export const ProjectsWindowContent: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [isDragOver, setIsDragOver] = useState(false);
  const { openWindow } = useWindowManager();

  // Count projects by status
  const activeCount = mockProjects.filter(p => p.status === 'active').length;
  const quotedCount = mockProjects.filter(p => p.status === 'quoted').length;
  const archivedCount = mockProjects.filter(p => p.status === 'archived').length;

  // Filter projects based on selection
  const filteredProjects = selectedFilter === 'all' 
    ? mockProjects 
    : mockProjects.filter(p => p.status === selectedFilter);

  const handleNewProject = () => {
    openWindow('extract', 'extract', 'Extract', { width: 800, height: 600 });
  };

  const handleProjectDoubleClick = (project: Project) => {
    // Placeholder - would open project detail
    openWindow(`project-${project.id}`, 'project-detail', project.name, { width: 1200, height: 700 });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    // Would create new project with dropped files
    handleNewProject();
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div 
        className="w-[180px] bg-neutral-50 border-r border-neutral-100 py-2 shrink-0"
      >
        <SidebarItem 
          label="All Projects" 
          isSelected={selectedFilter === 'all'} 
          onClick={() => setSelectedFilter('all')} 
        />
        <SidebarItem 
          label="Active" 
          count={activeCount}
          isSelected={selectedFilter === 'active'} 
          onClick={() => setSelectedFilter('active')} 
        />
        <SidebarItem 
          label="Quoted" 
          count={quotedCount}
          isSelected={selectedFilter === 'quoted'} 
          onClick={() => setSelectedFilter('quoted')} 
        />
        <SidebarItem 
          label="Archived" 
          count={archivedCount}
          isSelected={selectedFilter === 'archived'} 
          onClick={() => setSelectedFilter('archived')} 
        />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header with + New button */}
        <div className="h-10 px-4 flex items-center justify-between border-b border-neutral-100 bg-neutral-50">
          <div className="flex-1" />
          <button
            onClick={handleNewProject}
            className="flex items-center gap-1 px-2 py-1 text-blue-500 hover:bg-blue-50 rounded transition-colors"
            style={{ fontSize: '14px', lineHeight: '18px', color: '#4A3AFF' }}
          >
            <Plus size={16} />
            <span>New</span>
          </button>
        </div>

        {/* List header */}
        <div 
          className="h-9 px-4 flex items-center bg-neutral-50 border-b border-neutral-100"
          style={{ fontSize: '12px', lineHeight: '16px' }}
        >
          <div className="flex-1 font-bold text-neutral-500 uppercase tracking-wide">
            Name
          </div>
          <div className="w-20 text-right font-bold text-neutral-500 uppercase tracking-wide">
            Items
          </div>
          <div className="w-32 text-right font-bold text-neutral-500 uppercase tracking-wide">
            Modified
          </div>
        </div>

        {/* Project list */}
        <div className="flex-1 overflow-auto">
          {filteredProjects.length > 0 ? (
            filteredProjects.map(project => (
              <ProjectRow 
                key={project.id} 
                project={project} 
                onDoubleClick={() => handleProjectDoubleClick(project)}
              />
            ))
          ) : (
            <EmptyState
              icon={Folder}
              title="No projects yet"
              description="Drop drawings or click + New to get started"
              action={{
                label: '+ New Project',
                onClick: handleNewProject,
                variant: 'filled',
              }}
            />
          )}
        </div>

        {/* Drop zone */}
        <div 
          className={`h-20 mx-4 mb-4 border-2 border-dashed rounded-lg flex items-center justify-center transition-colors ${
            isDragOver 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-neutral-200 hover:border-neutral-300'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex items-center gap-2 text-neutral-500">
            <Upload size={20} />
            <span style={{ fontSize: '14px', lineHeight: '18px' }}>
              Drop drawings here to start a new project
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
