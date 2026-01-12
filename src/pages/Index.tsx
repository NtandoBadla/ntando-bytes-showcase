import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SkillsDashboard from "@/components/SkillsDashboard";
import InteractiveProjects from "@/components/InteractiveProjects";
import GitHubActivityFeed from "@/components/GitHubActivityFeed";
import Services from "@/components/Services";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <SkillsDashboard />
      <InteractiveProjects />
      <GitHubActivityFeed />
      <Services />
      <Certificates />
      <Contact />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
