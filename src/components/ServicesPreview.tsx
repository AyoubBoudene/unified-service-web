
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Briefcase, Wrench, Heart, Home, Camera } from "lucide-react";
import { Link } from "react-router-dom";

const ServicesPreview = () => {
  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Custom websites and applications built with modern technologies",
      color: "text-blue-600"
    },
    {
      icon: Briefcase,
      title: "Business Consulting",
      description: "Strategic guidance to help your business grow and succeed",
      color: "text-green-600"
    },
    {
      icon: Wrench,
      title: "Technical Support",
      description: "Reliable IT support and maintenance for your systems",
      color: "text-orange-600"
    },
    {
      icon: Heart,
      title: "Healthcare Services",
      description: "Professional healthcare and wellness consultations",
      color: "text-red-600"
    },
    {
      icon: Home,
      title: "Home Services",
      description: "Maintenance, cleaning, and improvement services for your home",
      color: "text-purple-600"
    },
    {
      icon: Camera,
      title: "Creative Services",
      description: "Photography, design, and multimedia production services",
      color: "text-pink-600"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of professional services designed to meet your every need.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <IconComponent className={`w-8 h-8 ${service.color} mb-4`} />
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center">
          <Button asChild size="lg" variant="outline" className="group">
            <Link to="/services">
              View All Services 
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
