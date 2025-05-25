
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const RequestStatus = () => {
  const [searchId, setSearchId] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [requests, setRequests] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock data for demonstration
  const mockRequests = [
    {
      id: "REQ-001",
      service: "Website Development",
      status: "in-progress",
      submittedDate: "2024-01-15",
      estimatedCompletion: "2024-02-15",
      customerEmail: "john@example.com",
      notes: "Working on wireframes and design mockups"
    },
    {
      id: "REQ-002", 
      service: "Home Cleaning",
      status: "completed",
      submittedDate: "2024-01-10",
      completedDate: "2024-01-12",
      customerEmail: "jane@example.com",
      notes: "Service completed successfully"
    },
    {
      id: "REQ-003",
      service: "IT Support",
      status: "pending",
      submittedDate: "2024-01-18",
      customerEmail: "mike@example.com",
      notes: "Waiting for initial assessment"
    },
    {
      id: "REQ-004",
      service: "Graphic Design",
      status: "rejected",
      submittedDate: "2024-01-16",
      customerEmail: "sarah@example.com",
      notes: "Requirements were outside our service scope"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "in-progress":
        return <AlertCircle className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSearch = () => {
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const filteredRequests = mockRequests.filter(request => {
        const matchesId = !searchId || request.id.toLowerCase().includes(searchId.toLowerCase());
        const matchesEmail = !searchEmail || request.customerEmail.toLowerCase().includes(searchEmail.toLowerCase());
        return matchesId && matchesEmail;
      });
      
      setRequests(filteredRequests);
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Request Status</h1>
          <p className="text-xl text-gray-600">
            Track the status of your service requests and get real-time updates.
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 w-5 h-5" />
              Search Your Requests
            </CardTitle>
            <CardDescription>
              Enter your request ID or email address to find your service requests.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="requestId">Request ID</Label>
                <Input
                  id="requestId"
                  placeholder="e.g., REQ-001"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                />
              </div>
            </div>
            <Button 
              onClick={handleSearch}
              disabled={isSearching || (!searchId && !searchEmail)}
              className="bg-gradient-to-r from-blue-600 to-purple-600"
            >
              {isSearching ? "Searching..." : "Search Requests"}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {requests.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Requests</h2>
            
            {requests.map(request => (
              <Card key={request.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {request.service}
                        <Badge variant="outline">{request.id}</Badge>
                      </CardTitle>
                      <CardDescription>
                        Submitted on {new Date(request.submittedDate).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge className={`${getStatusColor(request.status)} flex items-center gap-1`}>
                      {getStatusIcon(request.status)}
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1).replace('-', ' ')}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Customer Email:</strong> {request.customerEmail}
                    </div>
                    <div>
                      <strong>Submitted:</strong> {new Date(request.submittedDate).toLocaleDateString()}
                    </div>
                    {request.estimatedCompletion && (
                      <div>
                        <strong>Estimated Completion:</strong> {new Date(request.estimatedCompletion).toLocaleDateString()}
                      </div>
                    )}
                    {request.completedDate && (
                      <div>
                        <strong>Completed:</strong> {new Date(request.completedDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  
                  {request.notes && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <strong className="block mb-2">Notes:</strong>
                      <p className="text-gray-700">{request.notes}</p>
                    </div>
                  )}
                  
                  {request.status === "completed" && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Download Invoice
                      </Button>
                      <Button variant="outline" size="sm">
                        Rate Service
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {requests.length === 0 && (searchId || searchEmail) && !isSearching && (
          <Card>
            <CardContent className="py-12 text-center">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Requests Found</h3>
              <p className="text-gray-600">
                We couldn't find any requests matching your search criteria. 
                Please check your request ID or email address and try again.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              If you can't find your request or have questions about your service status, 
              please contact our support team.
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Email:</strong> support@servicepro.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default RequestStatus;
