import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileText, Clock, CheckCircle, AlertCircle, Plus, Eye } from "lucide-react";
import { useAppState } from "@/pages/Index";
import { ProposalEditor } from "./ProposalEditor";

const getDentalFlossProposal = (status: 'all' | 'draft' | 'submitted') => {
  if (status === 'all') {
    return {
      id: "SPE2DH-25-T-5234",
      title: "Dental Floss, Unwaxed - Medical Supplies",
      status: "all-proposals",
      deadline: "2025-07-28",
      value: "$250 - $500",
      description: "Request for quotations for unwaxed dental floss, 200 yards, plastic polyamide (nylon)",
      progress: 0,
      rfqId: "SPE2DH-25-T-5234"
    };
  } else if (status === 'draft') {
    return {
      id: "SPE2DH-25-T-5234",
      title: "Dental Floss, Unwaxed - Medical Supplies",
      status: "draft",
      deadline: "2025-07-28",
      value: "$250 - $500",
      description: "AI-generated proposal for unwaxed dental floss procurement",
      progress: 60,
    };
  } else {
    return {
      id: "SPE2DH-25-T-5234",
      title: "Dental Floss, Unwaxed - Medical Supplies",
      status: "submitted",
      deadline: "2025-07-28",
      value: "$250 - $500",
      description: "Final proposal submitted for unwaxed dental floss procurement",
      progress: 100,
    };
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "draft":
      return "bg-yellow-100 text-yellow-700";
    case "submitted":
      return "bg-green-100 text-green-700";
    case "all-proposals":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "draft":
      return <FileText className="h-4 w-4" />;
    case "submitted":
      return <CheckCircle className="h-4 w-4" />;
    case "all-proposals":
      return <Eye className="h-4 w-4" />;
    default:
      return <AlertCircle className="h-4 w-4" />;
  }
};

export const Proposals = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [viewingProposal, setViewingProposal] = useState(false);
  const { scanned, proposalGenerated, proposalStatus, setProposalGenerated, setProposalStatus } = useAppState();

  const handleGenerateProposal = () => {
    setProposalGenerated(true);
    setProposalStatus('draft');
  };

  const getProposals = () => {
    if (!scanned) return [];
    
    if (activeTab === "all" && !proposalGenerated) {
      return [getDentalFlossProposal('all')];
    } else if (activeTab === "draft" && proposalGenerated && proposalStatus === 'draft') {
      return [getDentalFlossProposal('draft')];
    } else if (activeTab === "submitted" && proposalGenerated && proposalStatus === 'submitted') {
      return [getDentalFlossProposal('submitted')];
    }
    
    return [];
  };

  const proposals = getProposals();

  if (viewingProposal) {
    return <ProposalEditor onBack={() => setViewingProposal(false)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Proposals</h1>
          <p className="text-muted-foreground mt-2">
            Manage and track your government contract proposals
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Proposal
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Proposals</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="submitted">Submitted</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {proposals.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  {!scanned ? "No opportunities scanned yet. Go to Data Ingestion to scan SAM.gov for opportunities." : "No proposals available."}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {proposals.map((proposal) => (
                <Card key={proposal.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-xl">{proposal.title}</CardTitle>
                        <CardDescription>{proposal.description}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className={getStatusColor(proposal.status)}>
                          {getStatusIcon(proposal.status)}
                          <span className="ml-1 capitalize">{proposal.status.replace('-', ' ')}</span>
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-4">
                        <span>Value: <span className="font-medium text-foreground">{proposal.value}</span></span>
                        <span>Deadline: <span className="font-medium text-foreground">{proposal.deadline}</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>Progress: {proposal.progress}%</span>
                        <Progress value={proposal.progress} className="w-16 h-2" />
                      </div>
                    </div>
                    {proposal.status === 'all-proposals' && (
                      <div className="flex justify-end">
                        <Button onClick={handleGenerateProposal} size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Generate Proposal
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="draft" className="space-y-4">
          {proposals.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No draft proposals available.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {proposals.map((proposal) => (
                <Card key={proposal.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setViewingProposal(true)}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-xl">{proposal.title}</CardTitle>
                        <CardDescription>{proposal.description}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className={getStatusColor(proposal.status)}>
                          {getStatusIcon(proposal.status)}
                          <span className="ml-1 capitalize">{proposal.status.replace('-', ' ')}</span>
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-4">
                        <span>Value: <span className="font-medium text-foreground">{proposal.value}</span></span>
                        <span>Deadline: <span className="font-medium text-foreground">{proposal.deadline}</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>Progress: {proposal.progress}%</span>
                        <Progress value={proposal.progress} className="w-16 h-2" />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Review & Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="submitted" className="space-y-4">
          {proposals.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No submitted proposals yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {proposals.map((proposal) => (
                <Card key={proposal.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-xl">{proposal.title}</CardTitle>
                        <CardDescription>{proposal.description}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className={getStatusColor(proposal.status)}>
                          {getStatusIcon(proposal.status)}
                          <span className="ml-1 capitalize">{proposal.status.replace('-', ' ')}</span>
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span>Value: <span className="font-medium text-foreground">{proposal.value}</span></span>
                        <span>Deadline: <span className="font-medium text-foreground">{proposal.deadline}</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>Progress: {proposal.progress}%</span>
                        <Progress value={proposal.progress} className="w-16 h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};