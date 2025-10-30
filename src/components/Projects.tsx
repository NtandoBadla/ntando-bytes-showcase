import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import projectVote from "@/assets/project-vote.jpg";
import projectErrands from "@/assets/project-errands.jpg";


const Projects = () => {
  const projects = [
    {
      title: "Vote Sphere Trust",
      description: "A comprehensive voting system built with modern web technologies, featuring secure authentication and real-time vote tracking.",
      image: projectVote,
      tech: ["React", "Supabase", "PHP","NodeJS","Tailwind CSS", "MySQL"],
      github: "https://github.com/NtandoBadla/vote-sphere-trust.git",
      demo: "https://vote-phere.netlify.app",
    },
    {
      title: "Locker Booking system",
      description: "Full-stack web application for booking a locker at school for the next academic year, students will receive update about their application via email.",
      image: projectErrands,
      tech: ["React", "Laravel", "MySQL","Supabase","NodeJS", "Tailwind CSS"],
      github: "https://github.com/NtandoBadla/highschool-locker-buddy.git",
      demo: "https://amandlahighschool.netlify.app/",
    },
   
  ];

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 animate-slide-up">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-12 rounded-full" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={project.title}
                className="gradient-card shadow-medium border-0 hover:shadow-strong transition-all duration-300 hover:-translate-y-2 overflow-hidden group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-primary">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    asChild
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-accent hover:bg-accent/90"
                    asChild
                  >
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
