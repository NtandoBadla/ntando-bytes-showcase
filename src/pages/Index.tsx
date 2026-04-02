import { useEffect, useRef } from "react";
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
  const visitSent = useRef(false);

  useEffect(() => {
    if (visitSent.current) return;
    visitSent.current = true;

    const notifyVisit = async () => {
      try {
        const geo = await fetch('https://ipapi.co/json/').then(r => r.json());
        const device = /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_CHAT_TEMPLATE_ID,
          {
            visitor_city: geo.city || 'Unknown',
            visitor_country: geo.country_name || 'Unknown',
            visitor_ip: geo.ip || 'Unknown',
            visitor_time: new Date().toLocaleString(),
            visitor_device: `${device} — ${navigator.userAgent.split(')')[0].split('(')[1] || 'Unknown'}`,
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
      } catch {
        // silently fail
      }
    };
    notifyVisit();
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
