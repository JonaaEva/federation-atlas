import { useState } from 'react';
import Sidebar from './components/Sidebar';
import GraphViewer from './components/GraphViewer';
import TabularView from './components/TabularView';
import { FrameworkTag, OntologyNode } from './data/ontology';
import { ReactFlowProvider } from '@xyflow/react';

function App() {
  const [perspective, setPerspective] = useState<'public' | 'tech' | 'researcher' | 'gov'>('public');
  const [activeFilter, setActiveFilter] = useState<FrameworkTag | null>(null);
  const [selectedNode, setSelectedNode] = useState<OntologyNode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState<'graph' | 'table'>('graph');

  return (
    <div className="flex flex-col h-screen w-full bg-white text-slate-800 overflow-hidden font-sans selection:bg-primary/30">
      {/* Top Placeholder Notice */}
      <div className="bg-yellow-50 text-yellow-800 px-4 py-2 text-center text-sm font-semibold shadow-sm border-b border-yellow-200 z-50 shrink-0">
        Placeholder Notice: The current definitions are placeholders and for illustration only.
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar
          perspective={perspective}
          setPerspective={setPerspective}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          selectedNode={selectedNode}
          setSelectedNode={setSelectedNode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
        <main className="flex-1 relative flex flex-col overflow-hidden">
          {/* Drafting Watermark */}
          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden opacity-[0.03]">
            <span className="text-slate-900 text-[10rem] md:text-[20rem] font-black tracking-widest -rotate-45 select-none uppercase">
              Drafting
            </span>
          </div>

          <div className="flex-1 relative z-10 w-full h-full">
            {currentView === 'graph' ? (
              <ReactFlowProvider>
                <GraphViewer
                  activeFilter={activeFilter}
                  onNodeSelect={setSelectedNode}
                  searchQuery={searchQuery}
                  onFilterChange={setActiveFilter}
                  selectedNode={selectedNode}
                />
              </ReactFlowProvider>
            ) : (
              <TabularView
                perspective={perspective}
                activeFilter={activeFilter}
                searchQuery={searchQuery}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
