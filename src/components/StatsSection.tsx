
import { Card, CardContent } from "@/components/ui/card";
import { Users, Star, Clock, CheckCircle } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      value: "500+",
      label: "Happy Customers",
      color: "text-blue-600"
    },
    {
      icon: Star,
      value: "4.9",
      label: "Average Rating",
      color: "text-yellow-600"
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Support Available",
      color: "text-green-600"
    },
    {
      icon: CheckCircle,
      value: "98%",
      label: "Success Rate",
      color: "text-purple-600"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-8 pb-6">
                  <IconComponent className={`w-8 h-8 ${stat.color} mx-auto mb-4`} />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
