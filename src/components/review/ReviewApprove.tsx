import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { 
  CheckCircle2, 
  AlertTriangle, 
  Edit3, 
  MessageSquare,
  FileText,
  Download,
  Send,
  Clock,
  User
} from "lucide-react";

interface ReviewItem {
  id: string;
  section: string;
  content: string;
  status: 'pending' | 'flagged' | 'approved';
  aiConfidence: number;
  issues?: string[];
  lastModified: Date;
}

const mockReviewItems: ReviewItem[] = [
  {
    id: "1",
    section: "Executive Summary",
    content: "Our comprehensive IT infrastructure modernization approach addresses the Department of Defense's critical need for secure, scalable cloud migration while maintaining operational continuity across military installations. With over 15 years of federal contracting experience and FedRAMP High authorization, we deliver proven solutions that exceed security requirements and optimize mission-critical operations.",
    status: "approved",
    aiConfidence: 95,
    lastModified: new Date("2024-01-22T10:30:00")
  },
  {
    id: "2", 
    section: "Technical Approach",
    content: "Our zero-downtime migration strategy leverages containerized microservices architecture to ensure seamless transitions. We employ advanced monitoring tools and implement comprehensive backup procedures to guarantee 99.99% uptime during the migration process.",
    status: "flagged",
    aiConfidence: 78,
    issues: [
      "Specific compliance standard not mentioned (NIST 800-53)",
      "Migration timeline needs more detail",
      "Risk mitigation strategies require elaboration"
    ],
    lastModified: new Date("2024-01-22T11:15:00")
  },
  {
    id: "3",
    section: "Security & Compliance",
    content: "All systems will be designed to meet FedRAMP High standards with continuous monitoring and automated threat detection. Our team includes certified security professionals with active clearances and deep understanding of federal compliance requirements.",
    status: "pending",
    aiConfidence: 88,
    lastModified: new Date("2024-01-22T11:45:00")
  }
];

export const ReviewApprove = () => {
  const [reviewItems, setReviewItems] = useState<ReviewItem[]>(mockReviewItems);
  const [selectedItem, setSelectedItem] = useState<ReviewItem | null>(reviewItems[0]);
  const [editMode, setEditMode] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [feedback, setFeedback] = useState("");
  const { toast } = useToast();

  const handleApprove = (itemId: string) => {
    setReviewItems(items => 
      items.map(item => 
        item.id === itemId ? { ...item, status: 'approved' as const } : item
      )
    );
    toast({
      title: "Section Approved",
      description: "Content has been marked as approved",
    });
  };

  const handleFlag = (itemId: string) => {
    setReviewItems(items => 
      items.map(item => 
        item.id === itemId ? { ...item, status: 'flagged' as const } : item
      )
    );
    toast({
      title: "Section Flagged",
      description: "Content has been flagged for revision",
      variant: "destructive",
    });
  };

  const handleEdit = () => {
    if (selectedItem) {
      setEditContent(selectedItem.content);
      setEditMode(true);
    }
  };

  const handleSaveEdit = () => {
    if (selectedItem) {
      setReviewItems(items =>
        items.map(item =>
          item.id === selectedItem.id 
            ? { ...item, content: editContent, status: 'pending' as const, lastModified: new Date() }
            : item
        )
      );
      setSelectedItem(prev => prev ? { ...prev, content: editContent, status: 'pending' } : null);
      setEditMode(false);
      toast({
        title: "Changes Saved",
        description: "Content has been updated and marked for review",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'flagged': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle2 className="h-4 w-4" />;
      case 'flagged': return <AlertTriangle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex gap-6">
      {/* Sections List */}
      <div className="w-1/3 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Review & Approve</h2>
            <p className="text-muted-foreground">Review AI-generated content</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Proposal Sections</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {reviewItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 cursor-pointer border-l-4 transition-colors ${
                    selectedItem?.id === item.id 
                      ? 'bg-primary-50 border-l-primary' 
                      : 'hover:bg-gray-50 border-l-transparent'
                  }`}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">{item.section}</h4>
                    <Badge className={getStatusColor(item.status)}>
                      {getStatusIcon(item.status)}
                      <span className="ml-1 capitalize">{item.status}</span>
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>AI Confidence: {item.aiConfidence}%</span>
                    <span>{item.lastModified.toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <Button className="w-full bg-primary hover:bg-primary-600">
                <Download className="h-4 w-4 mr-2" />
                Export Proposal
              </Button>
              <Button variant="outline" className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Submit for Final Review
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Review */}
      <div className="flex-1 space-y-4">
        {selectedItem ? (
          <>
            {/* Content Header */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{selectedItem.section}</CardTitle>
                    <p className="text-muted-foreground mt-1">
                      Last modified: {selectedItem.lastModified.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(selectedItem.status)}>
                      {getStatusIcon(selectedItem.status)}
                      <span className="ml-1 capitalize">{selectedItem.status}</span>
                    </Badge>
                    <Badge variant="outline">
                      {selectedItem.aiConfidence}% confidence
                    </Badge>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Issues (if flagged) */}
            {selectedItem.status === 'flagged' && selectedItem.issues && (
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-lg text-red-800 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Issues Found
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selectedItem.issues.map((issue, index) => (
                      <li key={index} className="flex items-start gap-2 text-red-700">
                        <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                        {issue}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Content Editor */}
            <Card className="flex-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Content</CardTitle>
                  <div className="flex gap-2">
                    {!editMode ? (
                      <>
                        <Button variant="outline" onClick={handleEdit}>
                          <Edit3 className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => handleFlag(selectedItem.id)}
                          disabled={selectedItem.status === 'flagged'}
                        >
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Flag Issues
                        </Button>
                        <Button 
                          onClick={() => handleApprove(selectedItem.id)}
                          disabled={selectedItem.status === 'approved'}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" onClick={() => setEditMode(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSaveEdit}>
                          Save Changes
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {editMode ? (
                  <Textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="min-h-[300px] font-mono text-sm"
                    placeholder="Edit content..."
                  />
                ) : (
                  <div className="prose max-w-none">
                    <p className="leading-relaxed text-foreground whitespace-pre-wrap">
                      {selectedItem.content}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Feedback Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Feedback & Comments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Add feedback for the AI assistant or team members..."
                  className="min-h-[100px]"
                />
                <Button className="mt-3">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Feedback
                </Button>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="flex-1 flex items-center justify-center">
            <CardContent className="text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground">Select a Section</h3>
              <p className="text-muted-foreground">Choose a proposal section to review and approve</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};