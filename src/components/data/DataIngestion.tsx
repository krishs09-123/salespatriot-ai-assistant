import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { RFQDocumentViewer } from "./RFQDocumentViewer";
import { OriginalDocumentViewer } from "./OriginalDocumentViewer";
import { useAppState } from "@/pages/Index";
import { 
  Download, 
  RefreshCw, 
  Database, 
  ExternalLink, 
  Calendar,
  DollarSign,
  MapPin,
  Clock,
  Eye
} from "lucide-react";

const mockBids = [
  {
    id: "SPE2DH-25-T-5234",
    title: "Dental Floss, Unwaxed - Medical Supplies",
    agency: "DLA Troop Support",
    description: "Request for quotations for unwaxed dental floss, 200 yards, plastic polyamide (nylon). Quantity: 50 each. FDA regulated Class I device requiring specific marking and packaging requirements.",
    postedDate: "2025-01-22",
    dueDate: "2025-01-28",
    estimatedValue: "$250 - $500",
    location: "Philadelphia, PA",
    status: "Open",
    category: "Medical Supplies",
    hasDocument: true
  },
  {
    id: "SAM-2024-002", 
    title: "N/A",
    agency: "N/A",
    description: "N/A",
    postedDate: "N/A",
    dueDate: "N/A",
    estimatedValue: "N/A",
    location: "N/A",
    status: "N/A",
    category: "N/A"
  },
  {
    id: "SAM-2024-003",
    title: "N/A",
    agency: "N/A",
    description: "N/A",
    postedDate: "N/A",
    dueDate: "N/A",
    estimatedValue: "N/A",
    location: "N/A",
    status: "N/A",
    category: "N/A"
  }
];

export const DataIngestion = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRFQ, setSelectedRFQ] = useState<string | null>(null);
  const [viewOriginal, setViewOriginal] = useState(false);
  const { toast } = useToast();
  const { scanned, setScanned } = useAppState();

  const filteredBids = mockBids.filter(bid => 
    bid.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bid.agency.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bid.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleScan = async () => {
    setIsScanning(true);
    setProgress(0);
    
    // Simulate scanning progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setScanned(true);
          toast({
            title: "Scan Complete",
            description: `Found 3 new opportunities`,
          });
          return 100;
        }
        return prev + 20;
      });
    }, 800);
  };

  if (selectedRFQ && viewOriginal) {
    return <OriginalDocumentViewer onBack={() => { setSelectedRFQ(null); setViewOriginal(false); }} />;
  }

  if (selectedRFQ) {
    return <RFQDocumentViewer onBack={() => setSelectedRFQ(null)} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Data Ingestion</h2>
          <p className="text-muted-foreground">Monitor and import government contracting opportunities</p>
        </div>
        <Button 
          onClick={handleScan} 
          disabled={isScanning}
          className="bg-primary hover:bg-primary-600 text-primary-foreground shadow-blue"
        >
          {isScanning ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Database className="h-4 w-4 mr-2" />
              Scan SAM.gov
            </>
          )}
        </Button>
      </div>

      {/* Scanning Progress */}
      {isScanning && (
        <Card className="border-primary-100 bg-primary-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <RefreshCw className="h-5 w-5 text-primary animate-spin" />
              <span className="font-medium text-primary">Scanning SAM.gov for new opportunities...</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-primary mt-2">{progress}% complete</p>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <Input
            placeholder="Search opportunities by title, agency, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </CardContent>
      </Card>

      {/* Opportunities List */}
      {scanned ? (
        <div className="grid gap-6">
          {filteredBids.map((bid) => (
          <Card key={bid.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{bid.title}</CardTitle>
                    <Badge variant="secondary">{bid.status}</Badge>
                  </div>
                  <CardDescription className="text-sm text-muted-foreground">
                    {bid.agency} • {bid.id}
                  </CardDescription>
                </div>
                {bid.id === "SPE2DH-25-T-5234" ? (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => { setSelectedRFQ(bid.id); setViewOriginal(true); }}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Original
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" disabled>
                    N/A
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground mb-4 leading-relaxed">{bid.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Posted</p>
                    <p className="font-medium">{new Date(bid.postedDate).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Due Date</p>
                    <p className="font-medium text-destructive">{new Date(bid.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Est. Value</p>
                    <p className="font-medium">{bid.estimatedValue}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Location</p>
                    <p className="font-medium">{bid.location}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <Badge variant="outline">{bid.category}</Badge>
                {bid.id === "SPE2DH-25-T-5234" ? (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => { setSelectedRFQ(bid.id); setViewOriginal(true); }}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Original
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" disabled>
                    N/A
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No opportunities found. Click "Scan SAM.gov" to search for new opportunities.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};