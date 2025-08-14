import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ArrowLeft,
  Download,
  FileText,
  Building,
  Calendar,
  DollarSign,
  MapPin,
  Package,
  Clock
} from "lucide-react";

interface RFQDocumentViewerProps {
  onBack: () => void;
}

export const RFQDocumentViewer = ({ onBack }: RFQDocumentViewerProps) => {
  const rfqData = {
    requestNumber: "SPE2DH-25-T-5234",
    dateIssued: "2025 JUL 22",
    dueDate: "2025 JUL 28",
    deliveryDays: "81 DAYS ADO",
    agency: "DLA TROOP SUPPORT",
    department: "MEDICAL SUPPLY CHAIN FSH",
    address: "700 ROBBINS AVENUE, PHILADELPHIA PA 19111",
    buyer: {
      name: "Tina Vu",
      code: "PDPSHB7",
      phone: "445-737-1120",
      fax: "215-737-5752",
      email: "Tina.Vu@dla.mil"
    },
    item: {
      nsn: "6520016772830",
      description: "FLOSS, UNWAXED, DENTAL",
      fullDescription: "FLOSS, UNWAXED, DENTAL, 200 YARDS PLASTIC POLYAMIDE (NYLON)",
      quantity: "50.000",
      unit: "EACH",
      clin: "0001"
    },
    procurement: {
      requisition: "7013057673",
      naicsCode: "339114",
      category: "Medical Supplies",
      fobDestination: true,
      inspection: "DESTINATION",
      acceptance: "DESTINATION"
    }
  };

  const procurementHistory = [
    { cage: "0AG09", contract: "SPE2DH25V3635", quantity: "6.000", unitCost: "6.99000", awardDate: "20250716" },
    { cage: "0ZSM5", contract: "SPE2DH25V3408", quantity: "10.000", unitCost: "5.00000", awardDate: "20250701" },
    { cage: "0ZSM5", contract: "SPE2DH25P1097", quantity: "3.000", unitCost: "5.00000", awardDate: "20250625" },
    { cage: "0AG09", contract: "SPE2DH25P1071", quantity: "48.000", unitCost: "5.59000", awardDate: "20250613" },
    { cage: "0AG09", contract: "SPE2DH25V3081", quantity: "15.000", unitCost: "5.99000", awardDate: "20250606" }
  ];

  const technicalRequirements = [
    "RA001: Incorporates technical and quality requirements from DLA Master List",
    "RD003: Covered Defense Information may apply",
    "RP001: DLA packaging requirements for procurement",
    "RQ011: Removal of government identification from non-accepted supplies",
    "FDA Regulated: This device is regulated by the FDA (Regulation 872.6390 Class I)",
    "Medical Marking: Shall be marked IAW Medical Marking Standard No. 1"
  ];

  const approvedSources = [
    { company: "HENRY SCHEIN, INC.", cage: "0NUS8", partNumber: "1552880" },
    { company: "DARBY DENTAL SUPPLY, LLC", cage: "5GKH5", partNumber: "951-3343" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Opportunities
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-foreground">RFQ Document Viewer</h2>
          <p className="text-muted-foreground">Request for Quotations - {rfqData.requestNumber}</p>
        </div>
        <Button className="bg-primary hover:bg-primary-600">
          <FileText className="h-4 w-4 mr-2" />
          View Original
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Document */}
        <div className="lg:col-span-2 space-y-6">
          {/* Document Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  REQUEST FOR QUOTATIONS
                </CardTitle>
                <Badge variant="destructive">NOT A SMALL BUSINESS SET-ASIDE</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Request Number</p>
                  <p className="font-mono font-medium">{rfqData.requestNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date Issued</p>
                  <p className="font-medium">{rfqData.dateIssued}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quote Due</p>
                  <p className="font-medium text-destructive">{rfqData.dueDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Delivery</p>
                  <p className="font-medium">{rfqData.deliveryDays}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Item Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Item Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold text-lg">{rfqData.item.description}</p>
                <p className="text-muted-foreground">{rfqData.item.fullDescription}</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">NSN</p>
                  <p className="font-mono">{rfqData.item.nsn}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quantity</p>
                  <p className="font-medium">{rfqData.item.quantity} {rfqData.item.unit}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">CLIN</p>
                  <p className="font-mono">{rfqData.item.clin}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Technical & Quality Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-48">
                <div className="space-y-2">
                  {technicalRequirements.map((req, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg">
                      <p className="text-sm">{req}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Approved Sources */}
          <Card>
            <CardHeader>
              <CardTitle>Approved Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {approvedSources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{source.company}</p>
                      <p className="text-sm text-muted-foreground">CAGE: {source.cage}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Part Number</p>
                      <p className="font-mono">{source.partNumber}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Agency Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Issuing Agency
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-medium">{rfqData.agency}</p>
                <p className="text-sm text-muted-foreground">{rfqData.department}</p>
                <p className="text-sm text-muted-foreground">{rfqData.address}</p>
              </div>
              
              <Separator />
              
              <div>
                <p className="text-sm font-medium mb-2">Point of Contact</p>
                <div className="space-y-1 text-sm">
                  <p><span className="text-muted-foreground">Name:</span> {rfqData.buyer.name}</p>
                  <p><span className="text-muted-foreground">Code:</span> {rfqData.buyer.code}</p>
                  <p><span className="text-muted-foreground">Phone:</span> {rfqData.buyer.phone}</p>
                  <p><span className="text-muted-foreground">Email:</span> {rfqData.buyer.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Procurement History */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Procurement History</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {procurementHistory.map((entry, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-mono text-sm">{entry.contract}</p>
                        <p className="text-xs text-muted-foreground">{entry.awardDate}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Qty</p>
                          <p>{entry.quantity}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Unit Cost</p>
                          <p>${entry.unitCost}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};