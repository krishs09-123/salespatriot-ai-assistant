import { useState, createContext, useContext } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { DataIngestion } from "@/components/data/DataIngestion";
import { Proposals } from "@/components/proposals/Proposals";

// Global state for the dental floss opportunity
interface AppState {
  scanned: boolean;
  proposalGenerated: boolean;
  proposalStatus: 'all' | 'draft' | 'submitted';
  setScanned: (scanned: boolean) => void;
  setProposalGenerated: (generated: boolean) => void;
  setProposalStatus: (status: 'all' | 'draft' | 'submitted') => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const useAppState = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used within AppProvider');
  }
  return context;
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [scanned, setScanned] = useState(false);
  const [proposalGenerated, setProposalGenerated] = useState(false);
  const [proposalStatus, setProposalStatus] = useState<'all' | 'draft' | 'submitted'>('all');

  const appState: AppState = {
    scanned,
    proposalGenerated,
    proposalStatus,
    setScanned,
    setProposalGenerated,
    setProposalStatus,
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "data-ingestion":
        return <DataIngestion />;
      case "proposals":
        return <Proposals />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppContext.Provider value={appState}>
      <div className="flex h-screen bg-background">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </AppContext.Provider>
  );
};

export default Index;
