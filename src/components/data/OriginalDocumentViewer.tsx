import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, FileText } from "lucide-react";

interface OriginalDocumentViewerProps {
  onBack: () => void;
}

export const OriginalDocumentViewer = ({ onBack }: OriginalDocumentViewerProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Opportunities
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-foreground">Original SAM.gov Posting</h2>
          <p className="text-muted-foreground">Request for Quotations - SPE2DH-25-T-5234</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <ExternalLink className="h-4 w-4" />
          Open in SAM.gov
        </Button>
      </div>

      {/* Original Document Display */}
      <div className="bg-background border border-border rounded-lg p-6">
        <div className="mb-6 flex items-center gap-3 text-muted-foreground">
          <FileText className="h-5 w-5" />
          <span className="text-sm">Source: SAM.gov Official Posting</span>
        </div>
        
        {/* Simulated SAM.gov content */}
        <div className="space-y-6 text-sm leading-relaxed">
          <div className="border-b pb-4">
            <h3 className="font-bold text-lg mb-2">DENTAL FLOSS, UNWAXED - MEDICAL SUPPLIES</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold">Solicitation Number:</span> SPE2DH-25-T-5234
              </div>
              <div>
                <span className="font-semibold">Agency:</span> Defense Logistics Agency
              </div>
              <div>
                <span className="font-semibold">Office:</span> DLA Troop Support
              </div>
              <div>
                <span className="font-semibold">Location:</span> Philadelphia, PA
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">DESCRIPTION:</h4>
            <p>The Defense Logistics Agency (DLA) Troop Support, Medical Supply Chain, is requesting quotations for unwaxed dental floss meeting specific medical device requirements.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">REQUIREMENTS:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Item: Floss, Unwaxed, Dental</li>
              <li>Specification: 200 yards, plastic polyamide (nylon)</li>
              <li>Quantity: 50 each</li>
              <li>NSN: 6520016772830</li>
              <li>FDA Class I medical device compliance required</li>
              <li>Medical Marking Standard No. 1 compliance</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">SUBMISSION REQUIREMENTS:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Quotes must be submitted electronically through SAM.gov</li>
              <li>Include all required certifications and documentation</li>
              <li>Berry Amendment compliance required</li>
              <li>Buy American Act provisions apply</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-yellow-800">IMPORTANT DATES:</h4>
            <div className="space-y-1 text-yellow-700">
              <div><span className="font-semibold">Posted:</span> July 22, 2025</div>
              <div><span className="font-semibold">Response Due:</span> July 28, 2025 at 3:00 PM EST</div>
              <div><span className="font-semibold">Delivery Required:</span> 81 days after date of order</div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">POINT OF CONTACT:</h4>
            <div className="ml-4">
              <p>Tina Vu, Contracting Officer</p>
              <p>Phone: 445-737-1120</p>
              <p>Email: Tina.Vu@dla.mil</p>
              <p>DLA Troop Support</p>
              <p>700 Robbins Avenue, Philadelphia, PA 19111</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};