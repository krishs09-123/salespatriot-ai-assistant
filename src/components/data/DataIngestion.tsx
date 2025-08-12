import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { 
  Download, 
  RefreshCw, 
  Database, 
  ExternalLink, 
  Calendar,
  DollarSign,
  MapPin,
  Clock
} from "lucide-react";

const mockBids = [
  {
    id: "SAM-2024-001",
    title: "IT Infrastructure Modernization Services",
    agency: "Department of Defense",
    description: "Comprehensive IT infrastructure upgrade and cloud migration services for military installations across the continental United States.",
    postedDate: "2024-01-15",
    dueDate: "2024-02-28",
    estimatedValue: "$2.5M - $5M",
    location: "Multiple States",
    status: "Open",
    category: "Information Technology"
  },
  {
    id: "SAM-2024-002", 
    title: "Cybersecurity Consulting and Implementation",
    agency: "Department of Homeland Security",
    description: "Zero-trust security architecture design and implementation for critical infrastructure protection systems.",
    postedDate: "2024-01-20",
    dueDate: "2024-03-15",
    estimatedValue: "$1M - $3M",
    location: "Washington, DC",
    status: "Open",
    category: "Cybersecurity"
  },
  {
    id: "SAM-2024-003",
    title: "Data Analytics Platform Development",
    agency: "Department of Health and Human Services",
    description: "Development of advanced analytics platform for healthcare data processing and visualization to support public health initiatives.",
    postedDate: "2024-01-22",
    dueDate: "2024-03-30",
    estimatedValue: "$500K - $1.5M",
    location: "Remote",
    status: "Open",
    category: "Data Analytics"
  }
];

export const DataIngestion = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

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
          toast({
            title: "Scan Complete",
            description: `Found ${mockBids.length} new opportunities`,
          });
          return 100;
        }
        return prev + 20;
      });
    }, 800);
  };

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
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Original
                </Button>
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
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button size="sm" className="bg-primary hover:bg-primary-600">
                    Generate Proposal
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};