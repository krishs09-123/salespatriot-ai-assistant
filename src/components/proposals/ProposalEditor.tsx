import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useAppState } from "@/pages/Index";
import { 
  ArrowLeft, 
  FileText, 
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Edit,
  Flag,
  Save,
  Send
} from "lucide-react";

interface ProposalEditorProps {
  onBack: () => void;
}

const mockProposal = {
  id: "SPE2DH-25-T-5234",
  title: "Dental Floss, Unwaxed - Medical Supplies",
  agency: "DLA Troop Support",
  value: "$250 - $500",
  deadline: "2025-07-28",
  sections: [
    {
      id: "executive-summary",
      title: "Executive Summary",
      content: "Our company is pleased to submit this proposal for the procurement of unwaxed dental floss meeting all FDA Class I medical device requirements. With over 15 years of experience in medical supply distribution, we are uniquely positioned to fulfill this requirement while ensuring full compliance with Berry Amendment restrictions and Buy American Act provisions.",
      status: "approved",
      aiGenerated: true,
      issues: [],
      sources: [
        "RFQ Document Section A - Solicitation Requirements",
        "FDA Regulation 872.6390 Class I Device Standards",
        "Berry Amendment Compliance Guidelines",
        "Buy American Act Provisions (DFARS 252.225-7001)"
      ]
    },
    {
      id: "technical-approach",
      title: "Technical Approach",
      content: "We will supply premium quality unwaxed dental floss manufactured from plastic polyamide (nylon) material, precisely meeting the 200-yard specification. Our product exceeds FDA Class I device standards and includes comprehensive labeling per Medical Marking Standard No. 1. Each unit will be individually packaged in sealed containers to prevent contamination and ensure product integrity during international shipping to Germany.",
      status: "flagged",
      aiGenerated: true,
      issues: ["Need to specify exact manufacturer details", "Include quality control procedures"],
      sources: [
        "RFQ Section B - Item Description (NSN 6520016772830)",
        "Technical Requirements RA001, RD003, RP001",
        "Medical Marking Standard No. 1",
        "FDA Class I Device Requirements (872.6390)",
        "International Shipping Requirements (Germany)",
        "MIL-STD-2073-1E Packaging Standards"
      ]
    },
    {
      id: "compliance",
      title: "Compliance & Certifications",
      content: "Our dental floss products are fully compliant with all applicable regulations including FDA 872.6390 Class I requirements, domestic sourcing under the Berry Amendment, and Buy American Act provisions. We maintain current FDA registration and listing, implement strict GMP protocols, and ensure all marking requirements per MMS No. 1 are met.",
      status: "draft",
      aiGenerated: true,
      issues: [],
      sources: [
        "FDA 21 CFR 872.6390 Class I Medical Device Regulations",
        "Berry Amendment (DFARS 252.225-7012)",
        "Buy American Act (DFARS 252.225-7001)",
        "Good Manufacturing Practice (GMP) Requirements",
        "Medical Marking Standard No. 1 Compliance",
        "FDA Registration and Listing Requirements"
      ]
    },
    {
      id: "pricing",
      title: "Pricing & Delivery",
      content: "Unit Price: $4.95 per each\nTotal Price: $247.50 for 50 units\nDelivery: 75 days ARO (within required 81-day timeframe)\nShipping: FOB Destination to Kaiserslautern, Germany\nPayment Terms: Net 30 days",
      status: "draft",
      aiGenerated: true,
      issues: [],
      sources: [
        "Historical Procurement Data (Contract Awards 2024-2025)",
        "Market Analysis ($5.00-$6.99 price range)",
        "RFQ Delivery Requirements (81 Days ADO)",
        "Shipping Address: Kaiserslautern, Germany",
        "FOB Destination Terms",
        "Standard Government Payment Terms"
      ]
    }
  ]
};

export const ProposalEditor = ({ onBack }: ProposalEditorProps) => {
  const [selectedSection, setSelectedSection] = useState(mockProposal.sections[0]);
  const [editMode, setEditMode] = useState(false);
  const [editContent, setEditContent] = useState(selectedSection.content);
  const [sections, setSections] = useState(mockProposal.sections);
  const { toast } = useToast();
  const { setProposalStatus } = useAppState();

  const handleSectionSelect = (section: typeof mockProposal.sections[0]) => {
    if (editMode) {
      setEditMode(false);
    }
    setSelectedSection(section);
    setEditContent(section.content);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    const updatedSections = sections.map(section => 
      section.id === selectedSection.id 
        ? { ...section, content: editContent, status: 'draft' as const }
        : section
    );
    setSections(updatedSections);
    setSelectedSection({ ...selectedSection, content: editContent, status: 'draft' });
    setEditMode(false);
    toast({
      title: "Section Saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleFlag = () => {
    const newIssue = prompt("What issue would you like to flag?");
    if (newIssue) {
      const updatedSections = sections.map(section => 
        section.id === selectedSection.id 
          ? { ...section, status: 'flagged' as const, issues: [...section.issues, newIssue] }
          : section
      );
      setSections(updatedSections);
      setSelectedSection({ ...selectedSection, status: 'flagged', issues: [...selectedSection.issues, newIssue] });
      toast({
        title: "Issue Flagged",
        description: "The issue has been added to this section.",
      });
    }
  };

  const handleApprove = () => {
    const updatedSections = sections.map(section => 
      section.id === selectedSection.id 
        ? { ...section, status: 'approved' as const, issues: [] }
        : section
    );
    setSections(updatedSections);
    setSelectedSection({ ...selectedSection, status: 'approved', issues: [] });
    toast({
      title: "Section Approved",
      description: "This section has been approved.",
    });
  };

  const handleSubmit = () => {
    const allApproved = sections.every(section => section.status === 'approved');
    if (allApproved) {
      setProposalStatus('submitted');
      toast({
        title: "Proposal Submitted",
        description: "Your proposal has been successfully submitted.",
      });
      onBack();
    } else {
      toast({
        title: "Cannot Submit",
        description: "All sections must be approved before submission.",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "flagged":
        return "bg-red-100 text-red-700";
      case "draft":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />;
      case "flagged":
        return <AlertTriangle className="h-4 w-4" />;
      case "draft":
        return <Edit className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Proposal Editor</h2>
            <p className="text-muted-foreground">{mockProposal.title}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={handleSubmit}
            disabled={!sections.every(section => section.status === 'approved')}
          >
            <Send className="h-4 w-4 mr-2" />
            Submit Proposal
          </Button>
        </div>
      </div>

      {/* Proposal Info */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Value</p>
                <p className="font-medium">{mockProposal.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Deadline</p>
                <p className="font-medium">{mockProposal.deadline}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Agency</p>
                <p className="font-medium">{mockProposal.agency}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sections List */}
        <Card>
          <CardHeader>
            <CardTitle>Proposal Sections</CardTitle>
            <CardDescription>Review and edit each section</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedSection.id === section.id ? 'bg-primary/10 border-primary' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleSectionSelect(section)}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{section.title}</h4>
                    <Badge variant="outline" className={getStatusColor(section.status)}>
                      {getStatusIcon(section.status)}
                      <span className="ml-1 capitalize">{section.status}</span>
                    </Badge>
                  </div>
                  {section.issues.length > 0 && (
                    <p className="text-xs text-red-600 mt-1">{section.issues.length} issue(s)</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Editor */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{selectedSection.title}</CardTitle>
                  <CardDescription>
                    {selectedSection.aiGenerated && (
                      <span className="inline-flex items-center gap-1 text-blue-600">
                        <FileText className="h-3 w-3" />
                        AI Generated
                      </span>
                    )}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {!editMode ? (
                    <>
                      <Button variant="outline" size="sm" onClick={handleEdit}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleFlag}>
                        <Flag className="h-4 w-4 mr-2" />
                        Flag
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={handleApprove}
                        disabled={selectedSection.status === 'approved'}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Issues */}
              {selectedSection.issues.length > 0 && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-red-800 text-sm mb-2">Issues to Address:</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    {selectedSection.issues.map((issue, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <span className="text-red-500">•</span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Content */}
              {editMode ? (
                <Textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="min-h-[400px] font-mono text-sm"
                  placeholder="Edit section content..."
                />
              ) : (
                <ScrollArea className="h-[400px]">
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                      {selectedSection.content}
                    </pre>
                  </div>
                </ScrollArea>
              )}

              {/* AI Sources Section */}
              {selectedSection.aiGenerated && selectedSection.sources && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-800 text-sm mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    AI Source Citations
                  </h4>
                  <div className="space-y-2">
                    {selectedSection.sources.map((source, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-blue-600 font-mono">[{index + 1}]</span>
                        <span className="text-blue-700">{source}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-blue-600 mt-3 italic">
                    These sources were analyzed by AI to generate the above content. Review for accuracy and completeness.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};