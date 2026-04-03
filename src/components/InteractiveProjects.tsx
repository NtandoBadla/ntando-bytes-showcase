import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Github, Play, Code, BarChart3, Users, Shield, Database, RefreshCw } from "lucide-react";
import projectVote from "@/assets/project-vote.jpg";
import projectErrands from "@/assets/project-errands.jpg";
import { metricsService, ProjectMetrics } from "@/services/metricsService";

const InteractiveProjects = () => {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<{
    votesphere: ProjectMetrics | null;
    lockerSystem: ProjectMetrics | null;
  }>({ votesphere: null, lockerSystem: null });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMetrics();
    const interval = setInterval(loadMetrics, 60000); 
    return () => clearInterval(interval);
  }, []);

  const loadMetrics = async () => {
    try {
      const data = await metricsService.getAllMetrics();
      setMetrics(data);
    } catch (error) {
      console.error('Failed to load metrics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const projects = [
    {
      id: "votesphere",
      title: "VoteSphere - Online Voting Platform",
      description: "Secure, scalable voting platform with real-time results and advanced authentication",
      image: projectVote,
      tech: ["React", "Python", "MySQL", "Tailwind CSS", "JWT"],
      github: "https://github.com/NtandoBadla/vote-sphere-trust.git",
      demo: "https://vote-phere.netlify.app",
      getMetrics: () => metrics.votesphere,
      features: [
        { icon: Shield, title: "Secure Authentication", desc: "JWT-based auth with role management" },
        { icon: BarChart3, title: "Real-time Analytics", desc: "Live vote tracking and results" },
        { icon: Users, title: "Multi-role System", desc: "Admin, voter, and observer roles" },
        { icon: Database, title: "Scalable Database", desc: "Optimized MySQL with 40% faster queries" }
      ],
      caseStudy: {
        problem: "Traditional voting systems lack transparency and accessibility for South African communities",
        solution: "Built a secure, web-based platform that enables transparent democratic participation",
        results: ["40% increase in voter participation", "99.8% system uptime", "Zero security breaches"]
      },
      techHighlights: [
        "Implemented JWT authentication reducing login time by 60%",
        "Optimized database queries improving performance by 40%",
        "Built responsive UI supporting 10+ languages",
        "Deployed with CI/CD pipeline ensuring 99.8% uptime"
      ]
    },
    {
      id: "locker-system",
      title: "Smart Locker Booking System",
      description: "Full-stack application for automated school locker management with email notifications",
      image: projectErrands,
      tech: ["React", "Laravel", "MySQL", "Supabase", "NodeJS"],
      github: "https://github.com/NtandoBadla/highschool-locker-buddy.git",
      demo: "https://amandlahighschool.netlify.app/",
      getMetrics: () => metrics.lockerSystem,
      features: [
        { icon: Users, title: "Student Management", desc: "Automated registration and verification" },
        { icon: Database, title: "Smart Allocation", desc: "AI-powered locker assignment algorithm" },
        { icon: BarChart3, title: "Usage Analytics", desc: "Real-time occupancy and usage stats" },
        { icon: Shield, title: "Email Integration", desc: "Automated notifications and confirmations" }
      ],
      caseStudy: {
        problem: "Manual locker assignment process was time-consuming and error-prone",
        solution: "Automated system with smart allocation and real-time notifications",
        results: ["85% reduction in admin time", "100% accurate assignments", "Zero booking conflicts"]
      },
      techHighlights: [
        "Laravel backend with RESTful API architecture",
        "React frontend with real-time updates via WebSockets",
        "Automated email system reducing manual work by 85%",
        "Smart allocation algorithm preventing booking conflicts"
      ]
    }
  ];

  const LiveDemo = ({ project }: { project: typeof projects[0] }) => (
    <div className="bg-gray-900 rounded-lg p-4 h-64 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
      <div className="text-center z-10">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Play className="w-8 h-8 text-primary" />
        </div>
        <p className="text-white mb-4">Interactive Demo Available</p>
        <Button 
          onClick={() => window.open(project.demo, '_blank')}
          className="bg-primary hover:bg-primary/90"
        >
          Launch Live Demo
        </Button>
      </div>
    </div>
  );

  const MetricsCard = ({ label, value, icon: Icon, isLoading: loading }: { 
    label: string; 
    value: string | number; 
    icon: any; 
    isLoading?: boolean;
  }) => (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-4 rounded-lg border border-primary/10">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-primary" />
        <span className="text-sm text-muted-foreground">{label}</span>
        {loading && <RefreshCw className="w-3 h-3 animate-spin text-primary" />}
      </div>
      <div className="text-2xl font-bold text-primary">
        {loading ? "..." : value}
      </div>
    </div>
  );

  return (
    <section id="interactive-projects" className="py-20 bg-gradient-to-br from-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <h2 className="text-4xl md:text-5xl font-bold animate-slide-up">
                Interactive Project Showcase
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={loadMetrics}
                disabled={isLoading}
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore my projects through live demos, real-time metrics, and detailed case studies
            </p>
            {metrics.votesphere && (
              <p className="text-sm text-muted-foreground mt-2">
                Last updated: {metrics.votesphere.lastUpdated.toLocaleTimeString()}
              </p>
            )}
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-6 rounded-full" />
          </div>

          <div className="space-y-16">
            {projects.map((project, index) => (
              <Card key={project.id} className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-card to-card/50">
                <div className="grid lg:grid-cols-2 gap-8 p-8">
                
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl font-bold text-primary mb-2">{project.title}</h3>
                      <p className="text-lg text-muted-foreground">{project.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {(() => {
                        const projectMetrics = project.getMetrics();
                        return (
                          <>
                            <MetricsCard 
                              label="Active Users" 
                              value={projectMetrics?.users || "..."} 
                              icon={Users} 
                              isLoading={isLoading}
                            />
                            <MetricsCard 
                              label="Uptime" 
                              value={projectMetrics ? `${projectMetrics.uptime}%` : "..."} 
                              icon={BarChart3} 
                              isLoading={isLoading}
                            />
                            <MetricsCard 
                              label="Performance" 
                              value={projectMetrics ? `${projectMetrics.performance}%` : "..."} 
                              icon={Code} 
                              isLoading={isLoading}
                            />
                            <MetricsCard 
                              label="Security" 
                              value={projectMetrics?.security || "..."} 
                              icon={Shield} 
                              isLoading={isLoading}
                            />
                          </>
                        );
                      })()} 
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Technology Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" asChild className="border-primary text-primary hover:bg-primary hover:text-white">
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          View Code
                        </a>
                      </Button>
                      <Button asChild className="bg-accent hover:bg-accent/90">
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </a>
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Tabs defaultValue="demo" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="demo">Live Demo</TabsTrigger>
                        <TabsTrigger value="features">Features</TabsTrigger>
                        <TabsTrigger value="case-study">Case Study</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="demo" className="mt-4">
                        <LiveDemo project={project} />
                      </TabsContent>
                      
                      <TabsContent value="features" className="mt-4">
                        <div className="grid grid-cols-2 gap-4">
                          {project.features.map((feature, idx) => (
                            <div key={idx} className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-primary/10">
                              <div className="flex items-center gap-2 mb-2">
                                <feature.icon className="w-5 h-5 text-primary" />
                                <h5 className="font-semibold">{feature.title}</h5>
                              </div>
                              <p className="text-sm text-muted-foreground">{feature.desc}</p>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="case-study" className="mt-4">
                        <div className="space-y-4">
                          <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-2">Problem</h5>
                            <p className="text-red-700 dark:text-red-300 text-sm">{project.caseStudy.problem}</p>
                          </div>
                          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <h5 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Solution</h5>
                            <p className="text-blue-700 dark:text-blue-300 text-sm">{project.caseStudy.solution}</p>
                          </div>
                          <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                            <h5 className="font-semibold text-green-800 dark:text-green-200 mb-2">Results</h5>
                            <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
                              {project.caseStudy.results.map((result, idx) => (
                                <li key={idx}>• {result}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>

                <div className="px-8 pb-8">
                  <h4 className="font-semibold mb-4 text-primary">Technical Highlights</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {project.techHighlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <p className="text-sm">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveProjects;