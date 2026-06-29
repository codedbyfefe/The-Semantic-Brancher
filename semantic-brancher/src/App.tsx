import { useState } from 'react';
import type { BranchNode } from './SB.types';
import './SB.css';

// Spatial Positioning Matrix Rules
const NODE_WIDTH_GAP = 240;  // Horizontal length between generations
const NODE_HEIGHT_GAP = 110; // Vertical span between siblings

const INITIAL_NODES: BranchNode[] = [
  { id: 'root', parentId: null, label: 'ORIGIN SEED', prompt: 'Core World Rules', output: 'The environment is built inside a vertical subterranean cavern system.', timestamp: '12:00', depth: 0 },
  { id: 'node-1', parentId: 'root', label: 'FORK A', prompt: 'Incorporate solar tunnels.', output: 'Mirrors redirect light from the surface, creating farming clusters down the spine.', timestamp: '12:05', depth: 1 },
  { id: 'node-2', parentId: 'root', label: 'FORK B', prompt: 'Incorporate deep geothermals.', output: 'The bottom rings grow wealthy on power generation, isolating the frozen top tiers.', timestamp: '12:10', depth: 1 },
  { id: 'node-3', parentId: 'node-1', label: 'FORK A.1', prompt: 'The mirrors fracture.', output: 'Farming sectors plunge into localized famines, sparking migration riots.', timestamp: '12:15', depth: 2 }
];

export default function SemanticBrancher() {
  const [nodes, setNodes] = useState<BranchNode[]>(INITIAL_NODES);
  const [activeNodeId, setActiveNodeId] = useState<string>('node-3');
  const [promptInput, setPromptInput] = useState<string>('');

  // 1. CALCULATE COORDINATES ($X, Y$) DYNAMICALLY TO PREVENT CODE OVERLAPS
  const getNodeCoordinates = (node: BranchNode) => {
    const x = 120 + node.depth * NODE_WIDTH_GAP;
    
    // Find all nodes at the same generational depth
    const siblings = nodes.filter(n => n.depth === node.depth);
    const index = siblings.findIndex(n => n.id === node.id);
    
    // Position vertically around a central axis line
    const centerY = 300;
    const offset = (index - (siblings.length - 1) / 2) * NODE_HEIGHT_GAP;
    const y = centerY + offset;

    return { x, y };
  };

  // 2. TRACE ACTIVE HISTORY WINDOW
  const getTraceChain = (targetId: string): BranchNode[] => {
    const chain: BranchNode[] = [];
    let current = nodes.find(n => n.id === targetId);
    while (current) {
      chain.unshift(current);
      current = current.parentId ? nodes.find(n => n.id === current!.parentId) : undefined;
    }
    return chain;
  };

  const activeChain = getTraceChain(activeNodeId);
  const activeNode = nodes.find(n => n.id === activeNodeId) || nodes[0];

  const handleCreateFork = () => {
    if (!promptInput.trim()) return;

    const newId = `node-${Date.now()}`;
    const newNode: BranchNode = {
      id: newId,
      parentId: activeNode.id,
      label: `FORK DEPTH ${activeNode.depth + 1}`,
      prompt: promptInput,
      output: `[Divergence Complete]: Branching verified from base context ${activeNode.label}. Spore parameters stabilized.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      depth: activeNode.depth + 1
    };

    setNodes([...nodes, newNode]);
    setActiveNodeId(newId);
    setPromptInput('');
  };

  return (
    <div className="sb-app-wrapper">
      <header className="sb-topbar">
        <span className="sb-app-title">THE SEMANTIC BRANCHER</span>
        <span style={{ fontSize: '12px', opacity: 0.4 }}>Research Probe</span> 
      </header>

      <div className="sb-grid-workspace">
        
        {/* VISUAL ARTIFACT CANVAS */}
        <main className="sb-canvas-viewport">
          <svg className="sb-svg-tree-overlay">
            {nodes.map((node) => {
              if (!node.parentId) return null;
              const parent = nodes.find(n => n.id === node.parentId);
              if (!parent) return null;

              const start = getNodeCoordinates(parent);
              const end = getNodeCoordinates(node);
              const isActiveLine = activeChain.some(n => n.id === node.id);

              return (
                <path
                  key={`bezier-${node.id}`}
                  className="sb-svg-path"
                  d={`M ${start.x} ${start.y} C ${(start.x + end.x) / 2} ${start.y}, ${(start.x + end.x) / 2} ${end.y}, ${end.x} ${end.y}`}
                  stroke={isActiveLine ? 'var(--primary-teal)' : 'var(--branch-purple)'}
                  strokeWidth={isActiveLine ? '2.5' : '1'}
                  opacity={isActiveLine ? '0.8' : '0.15'}
                  filter={isActiveLine ? 'drop-shadow(0px 0px 4px var(--primary-teal))' : 'none'}
                />
              );
            })}
          </svg>

          {/* GENERATE FLOATING NODES */}
          {nodes.map((node) => {
            const { x, y } = getNodeCoordinates(node);
            const isActive = node.id === activeNodeId;

            return (
              <div
                key={node.id}
                onClick={() => setActiveNodeId(node.id)}
                className={`sb-spatial-node ${isActive ? 'active' : ''}`}
                style={{ left: `${x}px`, top: `${y}px` }}
              >
                <span className="sb-node-tag" style={{ color: isActive ? 'var(--primary-teal)' : 'var(--branch-purple)' }}>
                  {node.label}
                </span>
                <div className="sb-node-preview">{node.prompt}</div>
              </div>
            );
          })}
        </main>

        {/* RIGHT SYSTEM PANEL: ACTIVE INSPECTOR TEXT WINDOW */}
        <aside className="sb-right-inspector">
          <div className="sb-panel-header">Active Linear Thread Context</div>
          
          <div className="sb-inspector-content">
            {activeChain.map((node) => (
              <div key={`inspect-${node.id}`} className="sb-history-bubble">
                <div className="sb-bubble-label">{node.label} (Prompt)</div>
                <p style={{ margin: '0 0 12px 0', fontSize: '13px' }}>{node.prompt}</p>
                <div className="sb-bubble-label" style={{ color: 'var(--primary-teal)' }}>AI Manifestation</div>
                <p style={{ margin: 0, fontSize: '13px', opacity: 0.8, lineHeight: '1.5' }}>{node.output}</p>
              </div>
            ))}
          </div>

          <div className="sb-inspector-dock">
            <div className="sb-textarea-frame">
              <textarea
                className="sb-textarea"
                placeholder="Inject variant path concept here to grow a new branch branch..."
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
              />
            </div>
            <button className="sb-fork-btn" onClick={handleCreateFork}>
              Grow Alternative Branch State ↳
            </button>
          </div>
        </aside>

      </div>
    </div>
  );
}