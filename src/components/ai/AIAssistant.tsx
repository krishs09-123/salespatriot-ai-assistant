import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Send, 
  Bot, 
  User, 
  FileText, 
  ExternalLink,
  Copy,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle
} from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: Array<{
    title: string;
    section: string;
    confidence: number;
  }>;
}

const mockSources = [
  { title: "SAM-2024-001: IT Infrastructure Modernization", section: "Technical Requirements", confidence: 95 },
  { title: "FAR 15.203 - Requests for Proposals", section: "Proposal Format", confidence: 87 },
  { title: "Defense Federal Acquisition Guidelines", section: "Security Requirements", confidence: 92 }
];

export const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Hello! I'm your AI proposal assistant. I can help you analyze bid requirements, generate proposal content, and ensure compliance with government contracting standards. What would you like to work on today?",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: "Based on the SAM-2024-001 opportunity for IT Infrastructure Modernization, I've analyzed the technical requirements and compliance standards. Here's a proposal outline tailored to the Department of Defense specifications:\n\n**Executive Summary**\nOur comprehensive IT infrastructure modernization approach addresses the DoD's critical need for secure, scalable cloud migration while maintaining operational continuity across military installations.\n\n**Technical Approach**\n1. Zero-downtime migration strategy\n2. Multi-cloud architecture design\n3. Enhanced cybersecurity protocols\n4. 24/7 monitoring and support\n\n**Compliance & Certifications**\n- FedRAMP High authorization\n- NIST 800-53 controls implementation\n- Section 508 accessibility compliance\n\nWould you like me to expand on any specific section or adjust the approach based on additional requirements?",
        timestamp: new Date(),
        sources: mockSources,
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">AI Assistant</h2>
          <p className="text-muted-foreground">Generate intelligent, source-grounded proposals</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            New Session
          </Button>
        </div>
      </div>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            Proposal Generation Assistant
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <ScrollArea className="flex-1 px-6">
            <div className="space-y-6 pb-4">
              {messages.map((message) => (
                <div key={message.id} className="space-y-3">
                  <div className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    
                    <div className={`flex-1 max-w-[80%] ${message.type === 'user' ? 'text-right' : ''}`}>
                      <div className={`rounded-lg p-4 ${
                        message.type === 'user' 
                          ? 'bg-primary text-primary-foreground ml-auto' 
                          : 'bg-gray-50 text-foreground'
                      }`}>
                        <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                      </div>
                      
                       {/* Source-Grounded Response Behavior */}
                       {message.sources && (
                         <div className="mt-4 space-y-3">
                           <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                             <FileText className="h-4 w-4" />
                             Sources Referenced:
                           </p>
                           {message.sources.map((source, index) => (
                             <Card key={index} className="bg-white border border-gray-200">
                               <CardContent className="p-4">
                                 <div className="space-y-3">
                                   {/* Source Header */}
                                   <div className="flex items-start justify-between gap-3">
                                     <div className="flex-1">
                                       <p className="font-medium text-sm text-foreground">{source.title}</p>
                                       <p className="text-xs text-muted-foreground mt-1">{source.section}</p>
                                     </div>
                                     <div className="flex items-center gap-2">
                                       <Badge variant="secondary" className="text-xs">
                                         {source.confidence}% match
                                       </Badge>
                                       <Button variant="ghost" size="sm">
                                         <ExternalLink className="h-3 w-3" />
                                       </Button>
                                     </div>
                                   </div>
                                   
                                   {/* Key Points Summary */}
                                   <div className="bg-gray-50 rounded-lg p-3 border-l-2 border-blue-500">
                                     <p className="text-xs font-medium text-foreground mb-2">Key Points Cited:</p>
                                     <ul className="text-xs text-muted-foreground space-y-1">
                                       <li>• Requirements alignment with federal standards (Section 3.2)</li>
                                       <li>• Compliance with accessibility guidelines per Section 508</li>
                                       <li>• Cost breakdown methodology following FAR 15.404-1</li>
                                     </ul>
                                   </div>
                                   
                                   {/* Section Explanation */}
                                   <div className="bg-blue-50 rounded-lg p-3 border-l-2 border-blue-600">
                                     <p className="text-xs font-medium text-blue-700 mb-2">Section Explanation:</p>
                                     <p className="text-xs text-blue-600 leading-relaxed">
                                       This section outlines mandatory technical requirements and evaluation criteria. 
                                       The contracting officer will assess proposals based on technical merit (40%), 
                                       past performance (30%), and cost realism (30%). Understanding these weightings 
                                       is crucial for proposal positioning.
                                     </p>
                                   </div>
                                 </div>
                               </CardContent>
                             </Card>
                           ))}
                         </div>
                       )}
                      
                      {/* Message Actions */}
                      {message.type === 'assistant' && (
                        <div className="flex items-center gap-2 mt-3">
                          <Button variant="ghost" size="sm">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ThumbsDown className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <AlertTriangle className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <Separator />
          
          {/* Input Area */}
          <div className="p-6">
            <div className="flex gap-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me to analyze requirements, generate content, or review compliance..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button 
                onClick={handleSend} 
                disabled={isLoading || !inputValue.trim()}
                className="bg-primary hover:bg-primary-600"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};