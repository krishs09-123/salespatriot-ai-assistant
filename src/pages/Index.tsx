import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { DataIngestion } from "@/components/data/DataIngestion";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { ReviewApprove } from "@/components/review/ReviewApprove";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "data-ingestion":
        return <DataIngestion />;
      case "ai-assistant":
        return <AIAssistant />;
      case "review":
        return <ReviewApprove />;
      case "proposals":
        return (
          <div className="flex items-center justify-center h-96">
            <p className="text-muted-foreground">Proposals management coming soon...</p>
          </div>
        );
      case "search":
        return (
          <div className="flex items-center justify-center h-96">
            <p className="text-muted-foreground">Advanced search coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
