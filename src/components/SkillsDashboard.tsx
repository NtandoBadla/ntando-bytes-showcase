import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Code, Database, Globe, Server, Smartphone, Award } from "lucide-react";

const SkillsDashboard = () => {
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: Globe,
      color: "from-blue-500 to-cyan-500",
      skills: [
        { name: "React", level: 90, years: 2 },
        { name: "JavaScript", level: 85, years: 3 },
        { name: "HTML/CSS", level: 95, years: 4 },
        { name: "Tailwind CSS", level: 88, years: 1 },
        { name: "TypeScript", level: 75, years: 1 }
      ]
    },
    {
      title: "Backend Development", 
      icon: Server,
      color: "from-green-500 to-emerald-500",
      skills: [
        { name: "Python", level: 85, years: 3 },
        { name: "PHP", level: 80, years: 2 },
        { name: "Laravel", level: 82, years: 2 },
        { name: "Java", level: 78, years: 2 },
        { name: "Node.js", level: 70, years: 1 }
      ]
    },
    {
      title: "Database & Cloud",
      icon: Database,
      color: "from-purple-500 to-pink-500",
      skills: [
        { name: "MySQL", level: 88, years: 3 },
        { name: "Oracle Apex", level: 75, years: 1 },
        { name: "MS SQL Server", level: 70, years: 1 },
        { name: "Supabase", level: 65, years: 1 },
        { name: "Azure", level: 60, years: 1 }
      ]
    },
    {
      title: "Tools & Frameworks",
      icon: Code,
      color: "from-orange-500 to-red-500", 
      skills: [
        { name: "Git/GitHub", level: 85, years: 3 },
        { name: "Figma", level: 70, years: 2 },
        { name: "Vite", level: 75, years: 1 },
        { name: "CI/CD", level: 65, years: 1 },
        { name: "Docker", level: 55, years: 1 }
      ]
    }
  ];

  const certifications = [
    { name: "Data Management and Analytics", issuer: "Microsoft", year: "2025" },
    { name: "Azure Data Services", issuer: "Microsoft", year: "2025" },
    { name: "Microsoft 365 Copilot", issuer: "Microsoft", year: "2025" },
    { name: "ICT Application Development", issuer: "Walter Sisulu University", year: "2024" }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      const newValues: Record<string, number> = {};
      skillCategories.forEach(category => {
        category.skills.forEach(skill => {
          newValues[skill.name] = skill.level;
        });
      });
      setAnimatedValues(newValues);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const SkillBar = ({ skill }: { skill: { name: string; level: number; years: number } }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{skill.name}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{skill.years}y</span>
          <span className="text-sm font-bold text-primary">{skill.level}%</span>
        </div>
      </div>
      <Progress 
        value={animatedValues[skill.name] || 0} 
        className="h-2"
      />
    </div>
  );

  const RadarChart = () => {
    const categories = skillCategories.map(cat => ({
      name: cat.title.split(' ')[0],
      value: Math.round(cat.skills.reduce((acc, skill) => acc + skill.level, 0) / cat.skills.length)
    }));

    const size = 200;
    const center = size / 2;
    const radius = 70;
    const angleStep = (2 * Math.PI) / categories.length;

    const points = categories.map((cat, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const value = (animatedValues[cat.name] || 0) / 100;
      const x = center + Math.cos(angle) * radius * value;
      const y = center + Math.sin(angle) * radius * value;
      return { x, y, angle, value: cat.value };
    });

    const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

    return (
      <div className="flex items-center justify-center">
        <svg width={size} height={size} className="drop-shadow-lg">
          {/* Grid circles */}
          {[0.2, 0.4, 0.6, 0.8, 1].map(scale => (
            <circle
              key={scale}
              cx={center}
              cy={center}
              r={radius * scale}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.1"
            />
          ))}
          
          {/* Grid lines */}
          {categories.map((_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const x = center + Math.cos(angle) * radius;
            const y = center + Math.sin(angle) * radius;
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.1"
              />
            );
          })}

          {/* Data area */}
          <path
            d={pathData}
            fill="url(#radarGradient)"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            opacity="0.8"
          />

          {/* Data points */}
          {points.map((point, i) => (
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="hsl(var(--primary))"
              stroke="white"
              strokeWidth="2"
            />
          ))}

          {/* Labels */}
          {categories.map((cat, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const labelRadius = radius + 20;
            const x = center + Math.cos(angle) * labelRadius;
            const y = center + Math.sin(angle) * labelRadius;
            return (
              <text
                key={i}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-medium fill-current"
              >
                {cat.name}
              </text>
            );
          })}

          <defs>
            <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  };

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-up">
              Technical Expertise
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Interactive visualization of my technical skills and professional certifications
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Radar Chart */}
            <Card className="lg:col-span-1 border-0 shadow-xl bg-gradient-to-br from-card to-card/50">
              <CardHeader className="text-center">
                <CardTitle className="text-primary">Skills Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <RadarChart />
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Average proficiency across all categories
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Skills Categories */}
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
              {skillCategories.map((category, index) => (
                <Card key={category.title} className="border-0 shadow-xl bg-gradient-to-br from-card to-card/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color}`}>
                        <category.icon className="w-5 h-5 text-white" />
                      </div>
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {category.skills.map((skill) => (
                      <SkillBar key={skill.name} skill={skill} />
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-card to-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Award className="w-6 h-6" />
                Professional Certifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-primary/10">
                    <h4 className="font-semibold text-sm mb-1">{cert.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{cert.issuer}</p>
                    <Badge variant="secondary" className="text-xs">
                      {cert.year}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SkillsDashboard;