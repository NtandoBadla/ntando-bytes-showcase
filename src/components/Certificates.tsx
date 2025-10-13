import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, ExternalLink } from "lucide-react";

const Certificates = () => {
  const certificates = [
    {
      title: "ICT in Application Development",
      issuer: "Walter Sisulu University",
      year: "2024",
      link: "#",
    },
    {
      title: "Web Development Fundamentals",
      issuer: "Online Learning Platform",
      year: "2023",
      link: "#",
    },
    {
      title: "Database Management Systems",
      issuer: "Professional Certification",
      year: "2023",
      link: "#",
    },
  ];

  return (
    <section id="certificates" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 animate-slide-up">
            Certificates & Achievements
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-12 rounded-full" />

          <div className="space-y-4">
            {certificates.map((cert, index) => (
              <Card
                key={cert.title}
                className="gradient-card shadow-medium border-0 hover:shadow-strong transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-primary mb-1">
                          {cert.title}
                        </CardTitle>
                        <p className="text-muted-foreground text-sm">
                          {cert.issuer} • {cert.year}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground flex-shrink-0"
                      asChild
                    >
                      <a href={cert.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
