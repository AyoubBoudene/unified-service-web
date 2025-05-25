
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star, Send, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ServiceRating = () => {
  const [requestId, setRequestId] = useState("");
  const [foundRequest, setFoundRequest] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  // Mock completed request data
  const mockCompletedRequest = {
    id: "REQ-002",
    service: "Home Cleaning",
    completedDate: "2024-01-12",
    customerEmail: "jane@example.com",
    serviceProvider: "Sarah Johnson",
    alreadyRated: false
  };

  const handleSearch = () => {
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      if (requestId === "REQ-002") {
        setFoundRequest(mockCompletedRequest);
      } else {
        setFoundRequest(null);
        toast({
          title: "Request Not Found",
          description: "Please check your request ID. Only completed services can be rated.",
          variant: "destructive"
        });
      }
      setIsSearching(false);
    }, 1000);
  };

  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a star rating before submitting.",
        variant: "destructive"
      });
      return;
    }

    // Simulate rating submission
    console.log("Rating submitted:", {
      requestId: foundRequest.id,
      rating,
      review,
      serviceProvider: foundRequest.serviceProvider
    });

    toast({
      title: "Thank You!",
      description: "Your rating and review have been submitted successfully.",
    });

    // Reset form
    setRating(0);
    setReview("");
    setFoundRequest({ ...foundRequest, alreadyRated: true });
  };

  const StarRating = ({ rating, onRatingChange, onHover, onHoverLeave, size = "w-8 h-8" }: any) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`${size} transition-colors`}
            onClick={() => onRatingChange?.(star)}
            onMouseEnter={() => onHover?.(star)}
            onMouseLeave={() => onHoverLeave?.()}
          >
            <Star
              className={`w-full h-full ${
                star <= (hoverRating || rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Rate Our Services</h1>
          <p className="text-xl text-gray-600">
            Share your experience and help us improve our services for everyone.
          </p>
        </div>

        {/* Search for Request */}
        {!foundRequest && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="mr-2 w-5 h-5" />
                Find Your Completed Service
              </CardTitle>
              <CardDescription>
                Enter your request ID to rate a completed service. You should have received this ID via email.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="requestId">Request ID</Label>
                <Input
                  id="requestId"
                  placeholder="e.g., REQ-002"
                  value={requestId}
                  onChange={(e) => setRequestId(e.target.value)}
                />
                <p className="text-sm text-gray-600">
                  Try "REQ-002" for demo purposes
                </p>
              </div>
              <Button 
                onClick={handleSearch}
                disabled={isSearching || !requestId}
                className="bg-gradient-to-r from-blue-600 to-purple-600"
              >
                {isSearching ? "Searching..." : "Find Request"}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Rating Form */}
        {foundRequest && !foundRequest.alreadyRated && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Rate Your Service Experience</CardTitle>
              <CardDescription>
                Request ID: {foundRequest.id} - {foundRequest.service}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleRatingSubmit} className="space-y-6">
                {/* Service Details */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Service Details</h3>
                  <div className="text-sm space-y-1">
                    <p><strong>Service:</strong> {foundRequest.service}</p>
                    <p><strong>Completed:</strong> {new Date(foundRequest.completedDate).toLocaleDateString()}</p>
                    <p><strong>Service Provider:</strong> {foundRequest.serviceProvider}</p>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="space-y-2">
                  <Label className="text-lg">Overall Rating *</Label>
                  <div className="flex items-center space-x-4">
                    <StarRating
                      rating={rating}
                      onRatingChange={setRating}
                      onHover={setHoverRating}
                      onHoverLeave={() => setHoverRating(0)}
                    />
                    <span className="text-sm text-gray-600">
                      {hoverRating || rating ? 
                        `${hoverRating || rating} out of 5 stars` : 
                        "Click to rate"
                      }
                    </span>
                  </div>
                </div>

                {/* Written Review */}
                <div className="space-y-2">
                  <Label htmlFor="review">Your Review (Optional)</Label>
                  <Textarea
                    id="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Tell us about your experience. What went well? How could we improve?"
                    className="min-h-[120px]"
                  />
                </div>

                {/* Rating Categories */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Rate Specific Aspects (Optional)</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm">Quality of Work</Label>
                      <StarRating rating={0} size="w-5 h-5" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Professionalism</Label>
                      <StarRating rating={0} size="w-5 h-5" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Timeliness</Label>
                      <StarRating rating={0} size="w-5 h-5" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Communication</Label>
                      <StarRating rating={0} size="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Send className="mr-2 w-4 h-4" />
                  Submit Rating
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Already Rated */}
        {foundRequest && foundRequest.alreadyRated && (
          <Card>
            <CardContent className="py-12 text-center">
              <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4 fill-current" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Thank You!</h3>
              <p className="text-gray-600">
                You have already rated this service. Thank you for your feedback!
              </p>
            </CardContent>
          </Card>
        )}

        {/* Recent Reviews Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Customer Reviews</CardTitle>
            <CardDescription>
              See what other customers are saying about our services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Sample reviews */}
            <div className="border-b pb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="font-medium">Website Development</span>
                </div>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
              <p className="text-gray-700">
                "Excellent work! The team delivered exactly what we needed and the communication was outstanding throughout the project."
              </p>
              <p className="text-sm text-gray-500 mt-1">- John D.</p>
            </div>
            
            <div className="border-b pb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[1, 2, 3, 4].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <Star className="w-4 h-4 text-gray-300" />
                  </div>
                  <span className="font-medium">Home Cleaning</span>
                </div>
                <span className="text-sm text-gray-500">1 week ago</span>
              </div>
              <p className="text-gray-700">
                "Great service! Very thorough and professional. Will definitely book again."
              </p>
              <p className="text-sm text-gray-500 mt-1">- Sarah M.</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default ServiceRating;
