import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DashboardStats } from "./DashboardStats";
import { useAppState } from "@/pages/Index";
import { 
  TrendingUp, 
  FileText, 
  Clock, 
  CheckCircle2,
  AlertTriangle,
  Database,
  BarChart3,
  Calendar,
  DollarSign
} from "lucide-react";


const recentActivity = [
  {
    id: 1,
    action: "New opportunity discovered",
    title: "Cybersecurity Consulting Services",
    agency: "Department of Homeland Security",
    timestamp: "2 hours ago",
    status: "new"
  },
  {
    id: 2,
    action: "Proposal submitted",
    title: "IT Infrastructure Modernization",
    agency: "Department of Defense",
    timestamp: "1 day ago",
    status: "submitted"
  },
  {
    id: 3,
    action: "Review completed",
    title: "Data Analytics Platform",
    agency: "Department of Health",
    timestamp: "2 days ago",
    status: "approved"
  }
];

const upcomingDeadlines = [
  {
    title: "Cloud Migration Services",
    agency: "GSA",
    dueDate: "2024-02-15",
    daysLeft: 8,
    status: "in-progress"
  },
  {
    title: "Security Assessment",
    agency: "DHS", 
    dueDate: "2024-02-20",
    daysLeft: 13,
    status: "draft"
  },
  {
    title: "System Integration",
    agency: "DoD",
    dueDate: "2024-02-28",
    daysLeft: 21,
    status: "planning"
  }
];

export const Dashboard = () => {
  const { scanned, proposalGenerated } = useAppState();

  const getRecentActivity = () => {
    const activities = [];
    
    if (scanned) {
      activities.push({
        id: 1,
        action: "New opportunities discovered",
        title: "Dental Floss (Active) + 2 N/A",
        agency: "DLA Troop Support",
        timestamp: "Recently scanned",
        status: "new"
      });
    }

    if (proposalGenerated) {
      activities.push({
        id: 2,
        action: "Proposal generated",
        title: "Dental Floss, Unwaxed - Medical Supplies",
        agency: "DLA Troop Support",
        timestamp: "AI generated",
        status: "draft"
      });
    }

    return activities;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground">Monitor your proposal pipeline and performance</p>
      </div>

      {/* Stats Grid */}
      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates across your proposals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getRecentActivity().length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No recent activity. Start by scanning SAM.gov for opportunities.</p>
              ) : (
                getRecentActivity().map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === 'new' ? 'bg-blue-500' :
                      activity.status === 'draft' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{activity.action}</p>
                      <p className="text-sm text-muted-foreground truncate">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.agency} • {activity.timestamp}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {activity.status}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Deadlines
            </CardTitle>
            <CardDescription>Proposal submissions due soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{deadline.title}</p>
                      <p className="text-xs text-muted-foreground">{deadline.agency}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{deadline.daysLeft} days</p>
                      <p className="text-xs text-muted-foreground">{new Date(deadline.dueDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={deadline.status === 'planning' ? 20 : deadline.status === 'draft' ? 60 : 85} 
                      className="flex-1 h-2" 
                    />
                    <Badge variant="outline" className="text-xs">
                      {deadline.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Performance Overview
          </CardTitle>
          <CardDescription>Your proposal success metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Value Pursued</span>
                <span className="text-lg font-bold text-foreground">$12.5M</span>
              </div>
              <Progress value={75} className="h-2" />
              <p className="text-xs text-muted-foreground">75% of quarterly target</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Proposals Won</span>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-lg font-bold text-foreground">5/8</span>
                </div>
              </div>
              <Progress value={62.5} className="h-2" />
              <p className="text-xs text-muted-foreground">62.5% win rate this quarter</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Average Score</span>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span className="text-lg font-bold text-foreground">8.6/10</span>
                </div>
              </div>
              <Progress value={86} className="h-2" />
              <p className="text-xs text-muted-foreground">+0.4 from last quarter</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};