"use client";

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Layer configuration
const layers = [
  {
    id: '1',
    name: 'Documents',
    color: '#E5E5E5',
    items: ['Drawings', 'CAD Sheets', 'Spec Documents', 'Product Cut Sheets', 'Emails'],
    description: 'Raw construction documents and specifications',
  },
  {
    id: '2',
    name: 'Structured Data',
    color: '#C4C4E5',
    items: ['Chillers', 'AHUs', 'Switchgear', 'Tags', 'Basis of Design', 'Metadata'],
    description: 'Equipment data extracted and structured',
  },
  {
    id: '3',
    name: 'Platform',
    color: '#7383FF',
    items: ['Buyer Modules', 'Seller Modules'],
    description: 'Collaboration and workflow management',
  },
  {
    id: '4',
    name: 'Intelligence',
    color: '#4A3AFF',
    items: ['Financing', 'Milestone Payments', 'Early Pay', 'Analytics'],
    description: 'Financial intelligence and analytics',
  },
];

// Isometric projection helper
const isoProject = (x: number, y: number, z: number) => {
  const sqrt3 = Math.sqrt(3);
  return {
    x: (x - y) * (sqrt3 / 2),
    y: (x + y) / 2 + z,
  };
};

// Item shape component
const ItemShape: React.FC<{ index: number; color: string; x: number; y: number; opacity?: number }> = ({ 
  index, 
  color, 
  x, 
  y,
  opacity = 0.8
}) => {
  const isCircle = index % 2 === 0;
  
      return (
        <g>
      {isCircle ? (
        <circle
          cx={x}
          cy={y}
          r={5}
          fill={color}
          fillOpacity={opacity}
          stroke={color}
          strokeWidth="1.5"
        />
      ) : (
        <rect
          x={x - 6}
          y={y - 4}
          width={12}
          height={8}
          rx={1.5}
          fill={color}
          fillOpacity={opacity}
          stroke={color}
          strokeWidth="1.5"
        />
      )}
        </g>
      );
};

// Individual Layer Component
interface LayerProps {
  layer: typeof layers[0];
  index: number;
  hoveredLayer: string | null;
  activeLayer: string | null;
  onHover: (layerId: string | null) => void;
  onClick: (layerId: string) => void;
}

const IsometricLayer: React.FC<LayerProps> = ({
  layer,
  index,
  hoveredLayer, 
  activeLayer, 
  onHover,
  onClick
}) => {
  const isHovered = hoveredLayer === layer.id;
  const isActive = activeLayer === layer.id;
  const isOtherActive = activeLayer !== null && !isActive;
  
  // Layer dimensions in 3D space
  const width = 160;
  const depth = 30;
  const height = 20;
  
  // Base Z position - layers stack with 60px gap, expand when active
  const baseGap = 60;
  const expandedGap = 90;
  const gap = activeLayer !== null ? expandedGap : baseGap;
  const zPos = index * gap;
  
  // Center position in SVG - adjusted to better center all 4 layers
  const centerX = 200;
  const centerY = 160; // Increased from 120 to better center layers vertically
  
  // Animation values
  const liftAmount = isHovered ? -20 : 0;
  const scale = isActive ? 1.1 : 1;
  const opacity = isActive ? 1 : (isHovered ? 1 : (isOtherActive ? 0.5 : 0.85));
  const brightness = isHovered || isActive ? 1.2 : 1;
  
  // Calculate isometric coordinates
  const topLeft = isoProject(-width / 2, -depth / 2, zPos);
  const topRight = isoProject(width / 2, -depth / 2, zPos);
  const bottomRight = isoProject(width / 2, depth / 2, zPos);
  const bottomLeft = isoProject(-width / 2, depth / 2, zPos);
  
  const leftTopBack = isoProject(-width / 2, depth / 2, zPos + height);
  const leftBottomBack = isoProject(-width / 2, -depth / 2, zPos + height);
  const rightTopBack = isoProject(width / 2, depth / 2, zPos + height);
  const rightBottomBack = isoProject(width / 2, -depth / 2, zPos + height);
  
  const adjustX = (x: number) => x + centerX;
  const adjustY = (y: number) => y + centerY;
  
  // Calculate item positions
  const itemPositions = layer.items.map((_, itemIndex) => {
    const cols = Math.ceil(Math.sqrt(layer.items.length));
    const row = Math.floor(itemIndex / cols);
    const col = itemIndex % cols;
    
    const u = (col / (cols - 1 || 1)) * 2 - 1;
    const v = (row / (cols - 1 || 1)) * 2 - 1;
    
    const x3d = u * (width / 2);
    const y3d = v * (depth / 2);
    
    const projected = isoProject(x3d, y3d, zPos);
    return {
      x: adjustX(projected.x),
      y: adjustY(projected.y),
    };
  });
  
  // Calculate label position
  const labelX = adjustX(bottomRight.x) + 30;
  const labelY = adjustY((topRight.y + bottomRight.y) / 2);
  
  // Determine if we should float (only when no layer is active)
  const shouldFloat = activeLayer === null || activeLayer === '';

  return (
    <motion.g
      animate={{
        y: shouldFloat ? [0, -4, 0] : liftAmount,
        scale: scale,
        opacity: opacity,
      }}
      transition={
        shouldFloat
          ? {
              y: {
                duration: 4 + index * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.3,
              },
              scale: {
                type: 'spring',
                stiffness: 300,
                damping: 30,
                mass: 0.8,
              },
              opacity: {
                type: 'spring',
                stiffness: 300,
                damping: 30,
                mass: 0.8,
              },
            }
          : {
              type: 'spring',
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            }
      }
      style={{
        filter: `brightness(${brightness})`,
        cursor: 'pointer',
      }}
      onMouseEnter={() => onHover(layer.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(layer.id)}
    >
      {/* Left face */}
      <path
        d={`M ${adjustX(bottomLeft.x)} ${adjustY(bottomLeft.y)} 
            L ${adjustX(leftTopBack.x)} ${adjustY(leftTopBack.y)}
            L ${adjustX(leftBottomBack.x)} ${adjustY(leftBottomBack.y)}
            L ${adjustX(topLeft.x)} ${adjustY(topLeft.y)} Z`}
        fill={layer.color}
        fillOpacity={0.15 * opacity}
        stroke={layer.color}
        strokeWidth="1.5"
        strokeOpacity={0.5 * opacity}
        />

      {/* Right face */}
        <path
        d={`M ${adjustX(bottomRight.x)} ${adjustY(bottomRight.y)} 
            L ${adjustX(rightTopBack.x)} ${adjustY(rightTopBack.y)}
            L ${adjustX(rightBottomBack.x)} ${adjustY(rightBottomBack.y)}
            L ${adjustX(topRight.x)} ${adjustY(topRight.y)} Z`}
          fill={layer.color}
        fillOpacity={0.2 * opacity}
        stroke={layer.color}
        strokeWidth="1.5"
        strokeOpacity={0.5 * opacity}
      />
      
      {/* Top face (main surface) */}
      <motion.path
        d={`M ${adjustX(topLeft.x)} ${adjustY(topLeft.y)} 
            L ${adjustX(topRight.x)} ${adjustY(topRight.y)}
            L ${adjustX(bottomRight.x)} ${adjustY(bottomRight.y)}
            L ${adjustX(bottomLeft.x)} ${adjustY(bottomLeft.y)} Z`}
        fill={layer.color}
        fillOpacity={0.35 * opacity}
        stroke={layer.color}
        strokeWidth={isActive || isHovered ? 2.5 : 2}
        strokeOpacity={0.8 * opacity}
        animate={{
          fillOpacity: (isActive || isHovered ? 0.5 : 0.35) * opacity,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Item shapes on top face */}
      {itemPositions.map((pos, itemIndex) => (
        <ItemShape
          key={itemIndex}
          index={itemIndex}
          color={layer.color}
          x={pos.x}
          y={pos.y}
          opacity={opacity * 0.8}
        />
      ))}
      
      {/* Label to the right */}
      <g transform={`translate(${labelX}, ${labelY})`}>
        <motion.text
          x="0"
          y="0"
          fill={layer.color}
          fontSize={isActive || isHovered ? "18" : "16"}
          fontWeight="600"
          className="font-sans"
          dominantBaseline="middle"
          animate={{
            fontSize: isActive || isHovered ? 18 : 16,
          }}
          transition={{ duration: 0.2 }}
        >
          {layer.name}
        </motion.text>
        <motion.text
          x="0"
          y="18"
          fill="#888"
          fontSize="11"
          className="font-sans"
          dominantBaseline="middle"
          animate={{
            opacity: isActive || isHovered ? 1 : 0.7,
          }}
        >
          {layer.items.length} items
        </motion.text>
        
        {/* Expanded description on hover */}
        <AnimatePresence>
          {(isHovered || isActive) && (
            <motion.text
              x="0"
              y="35"
              fill="#aaa"
              fontSize="10"
              className="font-sans"
              dominantBaseline="middle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 35 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.2 }}
            >
              {layer.description}
            </motion.text>
          )}
        </AnimatePresence>
      </g>
    </motion.g>
  );
};

// Connection Lines Component
interface ConnectionLinesProps {
  activeLayer: string | null;
  hoveredLayer: string | null;
}

const ConnectionLines: React.FC<ConnectionLinesProps> = ({ activeLayer, hoveredLayer }) => {
  const centerX = 200;
  const centerY = 160; // Match IsometricLayer centerY
  const width = 160;
  const depth = 30;
  const baseGap = 60;
  const expandedGap = 90;
  const gap = activeLayer !== null ? expandedGap : baseGap;
  const horizontalOffset = 20; // Distance from layer edge to vertical line
  
  // Calculate connection points for each layer
  const connectionPoints = layers.map((layer, index) => {
    const zPos = index * gap;
    const isHovered = hoveredLayer === layer.id;
    const isActive = activeLayer === layer.id;
    
    // Get the right edge of the layer (topRight and bottomRight projected)
    const topRight = isoProject(width / 2, -depth / 2, zPos);
    const bottomRight = isoProject(width / 2, depth / 2, zPos);
    
    // Adjust to SVG coordinates
    const adjustX = (x: number) => x + centerX;
    const adjustY = (y: number) => y + centerY;
    
    // Account for hover lift and active scale
    const liftAmount = isHovered ? -20 : 0;
    const scale = isActive ? 1.1 : 1;
    
    // Connection point on layer (right edge, center vertically)
    // Scale is applied via CSS transform from center, so calculate visual position
    const baseLayerRightX = adjustX(topRight.x);
    const baseLayerRightY = adjustY((topRight.y + bottomRight.y) / 2);
    const layerCenterX = centerX;
    const layerCenterY = centerY;

    // Calculate visual position after scale transform (scales from center)
    const layerRightX = layerCenterX + (baseLayerRightX - layerCenterX) * scale;
    const layerRightY = baseLayerRightY + liftAmount;
    
    // Horizontal segment end point
    const horizontalEndX = layerRightX + horizontalOffset;
    
    // Label position (same calculation as in IsometricLayer)
    const labelX = adjustX(bottomRight.x) + 30;
    const labelY = baseLayerRightY + liftAmount;
    
    return {
      layerId: layer.id,
      color: layer.color,
      startX: layerRightX,
      startY: layerRightY,
      horizontalEndX,
      labelX,
      labelY,
    };
  });

  return (
    <g>
      {connectionPoints.map((point, index) => {
        const pathData = `M ${point.startX} ${point.startY} 
                          L ${point.horizontalEndX} ${point.startY} 
                          L ${point.horizontalEndX} ${point.labelY} 
                          L ${point.labelX} ${point.labelY}`;
        
        return (
          <g key={point.layerId}>
            {/* Connection line */}
            <motion.path
              d={pathData}
              fill="none"
              stroke={point.color}
              strokeWidth="1.5"
              strokeOpacity="0.6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                pathLength: {
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: 'easeOut',
                },
              }}
            />
            
            {/* Circle at layer connection point */}
            <motion.circle
              cx={point.startX}
              cy={point.startY}
              r="2"
              fill={point.color}
              fillOpacity="0.6"
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                cx: point.startX,
                cy: point.startY,
              }}
              transition={{
                scale: {
                  delay: index * 0.1 + 0.3,
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                },
                cx: {
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                },
                cy: {
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                },
              }}
            />
            
            {/* Circle at label connection point */}
            <motion.circle
              cx={point.labelX}
              cy={point.labelY}
              r="2"
              fill={point.color}
              fillOpacity="0.6"
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                cy: point.labelY,
              }}
              transition={{
                scale: {
                  delay: index * 0.1 + 0.5,
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                },
                cy: {
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                },
              }}
            />
          </g>
        );
      })}
    </g>
  );
};

// Detailed item view component
interface ItemDetailViewProps {
  layer: typeof layers[0];
  onClose: () => void;
}

const ItemDetailView: React.FC<ItemDetailViewProps> = ({ layer, onClose }) => {
  return (
            <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 w-96 p-6 rounded-xl border backdrop-blur-xl"
              style={{
                backgroundColor: 'rgba(6, 4, 46, 0.95)',
        borderColor: `${layer.color}40`,
              }}
            >
      <div className="flex items-start justify-between mb-4">
                <div>
          <h3 className="text-xl font-bold text-white mb-1" style={{ color: layer.color }}>
            {layer.name}
          </h3>
          <p className="text-sm text-gray-400">{layer.description}</p>
                </div>
        <button
          onClick={onClose}
          className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          ×
        </button>
              </div>
      <div className="grid grid-cols-2 gap-2">
        {layer.items.map((item, index) => (
          <div
            key={index}
            className="px-3 py-2 rounded-lg text-sm"
                    style={{
              backgroundColor: `${layer.color}15`,
              color: layer.color,
              border: `1px solid ${layer.color}30`,
                    }}
                  >
                    {item}
          </div>
                ))}
              </div>
    </motion.div>
  );
};

// Main PlatformStack Component
interface PlatformStackProps {
  activeLayer?: string | null;
  onLayerHover?: (layerId: string | null) => void;
  onLayerClick?: (layerId: string) => void;
}

export const PlatformStack: React.FC<PlatformStackProps> = ({
  activeLayer: externalActiveLayer,
  onLayerHover: externalOnLayerHover,
  onLayerClick: externalOnLayerClick,
}) => {
  const [internalHoveredLayer, setInternalHoveredLayer] = useState<string | null>(null);
  const [internalActiveLayer, setInternalActiveLayer] = useState<string | null>(null);
  
  // Determine if we're using external or internal state
  const isControlled = externalActiveLayer !== undefined || externalOnLayerClick !== undefined;
  const activeLayer = isControlled ? (externalActiveLayer || null) : internalActiveLayer;
  
  // Always track hover internally for visual feedback, but also call external handler
  const hoveredLayer = internalHoveredLayer;
  
  const handleHover = useCallback((layerId: string | null) => {
    setInternalHoveredLayer(layerId);
    if (externalOnLayerHover) {
      externalOnLayerHover(layerId);
    }
  }, [externalOnLayerHover]);
  
  const handleClick = useCallback((layerId: string) => {
    if (externalOnLayerClick) {
      // Toggle: if clicking the same layer, reset
      externalOnLayerClick(activeLayer === layerId ? '' : layerId);
    } else {
      setInternalActiveLayer(prev => prev === layerId ? null : layerId);
    }
  }, [externalOnLayerClick, activeLayer]);
  
  const handleCloseDetail = useCallback(() => {
    if (externalOnLayerClick) {
      externalOnLayerClick('');
    } else {
      setInternalActiveLayer(null);
    }
  }, [externalOnLayerClick]);
  
  const activeLayerData = activeLayer ? layers.find(l => l.id === activeLayer) : null;
  
  // Ensure viewBox is tall enough to show all layers, including when expanded
  // Base: 4 layers with 60px gap, expanded: 90px gap
  // Account for isometric projection which adds vertical space
  const baseViewBoxHeight = 380; // Increased from 320 to show all layers
  const expandedViewBoxHeight = 420; // Extra space when layers expand
  
  const viewBoxHeight = activeLayer ? expandedViewBoxHeight : baseViewBoxHeight;
  const svgHeight = viewBoxHeight;
  
  return (
    <div 
      className="flex items-center justify-center w-full h-full relative"
      onClick={(e) => {
        // Click outside to reset
        if (e.target === e.currentTarget && activeLayer) {
          handleCloseDetail();
        }
      }}
    >
      <svg
        width="550"
        height={svgHeight}
        viewBox={`0 0 550 ${viewBoxHeight}`}
        className="relative"
        style={{ 
          width: '100%',
          height: 'auto',
          maxWidth: '550px',
          maxHeight: '100%',
        }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Connection lines - rendered behind layers */}
        <ConnectionLines 
          activeLayer={activeLayer || ''} 
          hoveredLayer={hoveredLayer} 
        />
        
        {/* Render layers from bottom to top */}
        {layers.map((layer, index) => (
          <IsometricLayer
            key={layer.id}
            layer={layer}
            index={index}
            hoveredLayer={hoveredLayer}
            activeLayer={activeLayer || ''}
            onHover={handleHover}
            onClick={handleClick}
          />
        ))}
      </svg>
      
      {/* Detailed item view when layer is active */}
      <AnimatePresence>
        {activeLayerData && (
          <ItemDetailView
            layer={activeLayerData}
            onClose={handleCloseDetail}
          />
          )}
        </AnimatePresence>
    </div>
  );
};
