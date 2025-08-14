import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppState } from "@/pages/Index";
import { 
  TrendingUp, 
  FileText, 
  Clock, 
  Database
} from "lucide-react";

export const DashboardStats = () => {
  const { scanned, proposalGenerated, proposalStatus } = useAppState();

  const getActiveOpportunities = () => {
    return scanned ? 3 : 0;
  };

  const getProposalsGenerated = () => {
    return proposalGenerated ? 1 : 0;
  };

  const getInReview = () => {
    return (proposalGenerated && proposalStatus === 'draft') ? 1 : 0;
  };

  const stats = [
    {
      title: "Active Opportunities",
      value: getActiveOpportunities().toString(),
      change: scanned ? "+3 from scan" : "Scan SAM.gov",
      icon: Database,
      color: "text-blue-600"
    },
    {
      title: "Proposals Generated",
      value: getProposalsGenerated().toString(),
      change: proposalGenerated ? "+1 dental floss" : "No proposals yet",
      icon: FileText,
      color: "text-green-600"
    },
    {
      title: "In Review",
      value: getInReview().toString(),
      change: (proposalGenerated && proposalStatus === 'draft') ? "1 in draft" : "No drafts",
      icon: Clock,
      color: "text-yellow-600"
    },
    {
      title: "Win Rate",
      value: "N/A%",
      change: "Historical average",
      icon: TrendingUp,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};