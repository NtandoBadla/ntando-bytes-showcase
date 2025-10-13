import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Database, Layout, Smartphone } from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "Website Development",
      description: "Custom, responsive websites built with modern technologies and best practices.",
      icon: Layout,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "App Development",
      description: "Full-stack web applications with robust backends and intuitive interfaces.",
      icon: Smartphone,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "System Design",
      description: "Scalable system architecture and software design solutions for complex projects.",
      icon: Code,
      color: "text-accent-orange",
      bgColor: "bg-accent-orange/10",
    },
    {
      title: "Database Management",
      description: "Efficient database design, optimization, and management for your applications.",
      icon: Database,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  return (
    <section id="services" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 animate-slide-up">
            Services I Offer
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-12 rounded-full" />

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <Card
                key={service.title}
                className="gradient-card shadow-medium border-0 hover:shadow-strong transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className={`w-16 h-16 ${service.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                    <service.icon className={`h-8 w-8 ${service.color}`} />
                  </div>
                  <CardTitle className="text-2xl text-primary">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
