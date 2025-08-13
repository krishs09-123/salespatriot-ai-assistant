import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Database, 
  FileText, 
  MessageSquare, 
  Settings, 
  BarChart3,
  CheckCircle2
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "data-ingestion", label: "Data Ingestion", icon: Database },
  { id: "proposals", label: "Proposals", icon: FileText },
];

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  return (
    <div className="w-64 h-screen bg-card border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-foreground">SalesPatriot</h1>
        <p className="text-sm text-muted-foreground mt-1">Government Contracting Assistant</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-11",
                  activeTab === item.id 
                    ? "bg-primary text-primary-foreground shadow-blue" 
                    : "hover:bg-gray-100 text-muted-foreground hover:text-foreground"
                )}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Button variant="ghost" className="w-full justify-start gap-3 h-11">
          <Settings className="h-4 w-4" />
          Settings
        </Button>
      </div>
    </div>
  );
};