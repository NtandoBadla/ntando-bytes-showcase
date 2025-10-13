import { Code2, Database, Laptop, Palette } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const skills = [
    { name: "Java", icon: Code2, color: "text-accent-orange" },
    { name: "React", icon: Code2, color: "text-accent" },
    { name: "PHP", icon: Code2, color: "text-primary" },
    { name: "Laravel", icon: Code2, color: "text-accent-orange" },
    { name: "MySQL", icon: Database, color: "text-primary" },
    { name: "Supabase", icon: Database, color: "text-accent" },
    { name: "Tailwind CSS", icon: Palette, color: "text-accent" },
    { name: "TypeScript", icon: Laptop, color: "text-primary" },
  ];

  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 animate-slide-up">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-12 rounded-full" />

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <Card className="gradient-card shadow-medium border-0 overflow-hidden">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-primary">
                    Who I Am
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    I'm a passionate Software Developer and recent graduate in ICT Application
                    Development from Walter Sisulu University. My journey in technology
                    began with a curiosity about how things work, which evolved into a
                    deep passion for creating innovative solutions.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    I specialize in building full-stack web applications, mobile apps, and
                    database-driven systems. I love tackling complex problems and turning
                    ideas into functional, user-friendly applications.
                  </p>
                  <div className="bg-primary/5 rounded-lg p-4 border-l-4 border-primary">
                    <p className="text-sm font-medium text-primary">Education</p>
                    <p className="text-muted-foreground">
                      Walter Sisulu University
                      <br />
                      ICT in Application Development
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="animate-slide-in-right">
              <h3 className="text-2xl font-semibold mb-6 text-primary">
                Skills & Technologies
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <Card
                    key={skill.name}
                    className="gradient-card shadow-soft border-0 hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-4 flex items-center gap-3">
                      <skill.icon className={`h-6 w-6 ${skill.color}`} />
                      <span className="font-medium">{skill.name}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
