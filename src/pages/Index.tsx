import { useEffect } from "react";
import emailjs from '@emailjs/browser';
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
  useEffect(() => {
    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_CHAT_TEMPLATE_ID,
      {
        user_name: 'Portfolio Visitor',
        user_email: 'N/A',
        chat_transcript: 'Someone visited your portfolio.',
        timestamp: new Date().toLocaleString(),
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ).catch(() => {});
  }, []);
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
