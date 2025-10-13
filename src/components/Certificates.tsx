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
      title: "Introduction to ASP.NET",
      issuer: "Online Learning Platform",
      year: "2025",
      link: "https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI0MTgzIiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODg3MjQyMF85MDc4MjI4MTc1NjM5MTEyNDg5Ny5wbmciLCJ1c2VybmFtZSI6Ik5UQU5ETyBCQURMQSJ9&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F7117%2FIntroduction-to-ASP.Net%2Fcertificate%2Fdownload-skillup&%24web_only=true&_branch_match_id=1456925281727986859&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1k%2FV9w4pNPRPLHRJDk%2ByrytKTUstKsrMS49PKsovL04tsvUBqkpN8cwDAL77cQ9BAAAA",
    },

    {
      title: "Agile Scrum Master",
      issuer: "Online Learning Platform",
      year: "2025",
      link: "https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI0NDgzIiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODcwMTcxM185MDc4MjI4MTc1Mzc0MDc5OTYzOS5wbmciLCJ1c2VybmFtZSI6Ik5UQU5ETyBCQURMQSJ9&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F7411%2FAgile-Scrum-Master_SkillUp%2Fcertificate%2Fdownload-skillup&%24web_only=true&_branch_match_id=1456925281727986859&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1k%2FVz88xdQmKCvDMC0uyrytKTUstKsrMS49PKsovL04tsvUBqkpN8cwDADVM2h1BAAAA",
    },
    {
      title: "Understand concepts of data analytics",
      issuer: "Online Learning Platform",
      year: "2025",
      link: "https://learn.microsoft.com/api/achievements/share/en-us/NTANDOBADLA-5557/EDL9AF4P?sharingId=347C3E0E51DB1DE2",
    },
    {
      title: "Explore Data analytics at scale",
      issuer: "Online Learning platform",
      year: "2025",
      link: "https://learn.microsoft.com/api/achievements/share/en-us/NTANDOBADLA-5557/UWDE47R3?sharingId=347C3E0E51DB1DE2",
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
