
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Star, Clock, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const services = [
    {
      id: 1,
      title: "Website Development",
      category: "Technology",
      description: "Custom websites built with modern technologies and responsive design",
      price: "$500 - $5000",
      duration: "2-8 weeks",
      rating: 4.9,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      title: "Business Consulting",
      category: "Business",
      description: "Strategic planning and business development consultation",
      price: "$150/hour",
      duration: "Flexible",
      rating: 4.8,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      title: "IT Support",
      category: "Technology",
      description: "Comprehensive technical support and system maintenance",
      price: "$100/hour",
      duration: "On-demand",
      rating: 4.7,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 4,
      title: "Home Cleaning",
      category: "Home Services",
      description: "Professional residential cleaning services",
      price: "$80 - $200",
      duration: "2-4 hours",
      rating: 4.9,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 5,
      title: "Graphic Design",
      category: "Creative",
      description: "Logo design, branding, and marketing materials",
      price: "$200 - $1500",
      duration: "1-3 weeks",
      rating: 4.8,
      reviews: 97,
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 6,
      title: "Financial Planning",
      category: "Finance",
      description: "Personal and business financial advisory services",
      price: "$200/hour",
      duration: "Ongoing",
      rating: 4.9,
      reviews: 78,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&q=80"
    }
  ];

  const categories = ["All", "Technology", "Business", "Home Services", "Creative", "Finance"];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of professional services designed to meet your every need.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-gradient-to-r from-blue-600 to-purple-600" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map(service => (
            <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-white text-gray-900">
                  {service.category}
                </Badge>
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium ml-1">{service.rating}</span>
                  </div>
                </div>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {service.price}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {service.duration}
                  </div>
                </div>
                
                <div className="text-sm text-gray-500">
                  {service.reviews} reviews
                </div>
                
                <div className="flex gap-2">
                  <Button asChild className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
                    <Link to={`/request?service=${service.id}`}>
                      Request Service
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No services found matching your criteria.</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Services;
