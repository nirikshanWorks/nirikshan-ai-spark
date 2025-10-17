import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { ServiceCard } from "@/components/ServiceCard";
import { IndustryCard } from "@/components/IndustryCard";
import { ProjectCard } from "@/components/ProjectCard";
import { TeamMemberCard } from "@/components/TeamMemberCard";
import { StatsSection } from "@/components/StatsSection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Brain, 
  Eye, 
  Code, 
  Globe, 
  Palette, 
  Database, 
  Users,
  ArrowRight 
} from "lucide-react";
import { Link } from "react-router-dom";
import heroMain from "@/assets/hero-main.jpg";
import heroAI from "@/assets/hero-ai.jpg";
import heroTeam from "@/assets/hero-team.jpg";

const heroSlides = [
  {
    image: heroMain,
    eyebrow: "From Ideas to Real Life Solutions",
    title: "Welcome to Nirikshan AI",
    description: "Where human potential meets artificial intelligence. Join our innovative platform and unlock new possibilities. 🤖✨",
    cta: {
      text: "Discover Nirikshan AI",
      link: "/about",
    },
  },
  {
    image: heroAI,
    eyebrow: "Vision to Value",
    title: "Using AI to transform ideas into tangible outcomes",
    description: "Empowering businesses with an AI framework designed to meet their unique needs",
    cta: {
      text: "Explore AI Solutions",
      link: "/expertise/ai-ml",
    },
  },
  {
    image: heroTeam,
    eyebrow: "Real-world Impact",
    title: "Building solutions that drive measurable results",
    description: "Delivering innovative technology that transforms operations and enhances customer satisfaction",
    cta: {
      text: "View Success Stories",
      link: "/case-studies",
    },
  },
];

const services = [
  {
    icon: Brain,
    title: "AI & ML Solutions",
    description: "Harness the power of artificial intelligence to automate processes and gain insights",
    link: "/expertise/ai-ml",
  },
  {
    icon: Eye,
    title: "Computer Vision",
    description: "Advanced image recognition and analysis for intelligent visual applications",
    link: "/expertise/computer-vision",
  },
  {
    icon: Code,
    title: "Custom Software Development",
    description: "Tailored software solutions built to solve your unique business challenges",
    link: "/expertise/software-dev",
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "Modern, responsive web applications that deliver exceptional user experiences",
    link: "/expertise/web-dev",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces that users love to interact with",
    link: "/expertise/ui-ux",
  },
  {
    icon: Database,
    title: "Data Management",
    description: "Efficient data solutions for storage, processing, and analytics",
    link: "/expertise/data-management",
  },
  {
    icon: Users,
    title: "CRM Software",
    description: "Customer relationship management systems that drive growth",
    link: "/expertise/crm",
  },
];

const industries = [
  { title: "Healthcare", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d" },
  { title: "Retail & E-commerce", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8" },
  { title: "Manufacturing", image: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6" },
  { title: "Finance & Banking", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3" },
];

const teamMembers = [
  {
    name: "Dinesh Yadav",
    role: "Founder & CEO",
    description: "Visionary leader with a passion for AI and innovative technology solutions.",
    quote: "At Nirikshan AI, we don't just build software — we build ideas.",
  },
  {
    name: "Anshul",
    role: "Co-Founder & Operations Manager",
    description: "Strategic operations expert focused on optimizing workflows and delivering quality solutions to clients.",
    quote: "From local enterprise to worldwide, we're turning ideas into impactful digital solutions.",
  },
  {
    name: "Ashwin Hole",
    role: "Co Founder & HOP",
    description: "Visionary leader with a passion for AI and innovative technology solutions.",
    quote: "We love to innovate and create solutions that make a difference.",
  },
];

const stats = [
  { value: "5+", label: "Team Members" },
  { value: "5+", label: "Ongoing Projects" },
  { value: "20+", label: "Achievements" },
  { value: "1000+", label: "Network Connections" },
];

const projects = [
  {
    title: "AI Inventory Management System",
    description: "Developing a smart inventory management system for one of South Africa's leading veterinary and pet product companies.",
    category: "AI Solution",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c",
    date: "December 15, 2024",
    status: "Ongoing",
    client: "Madapet, South Africa",
    tags: ["AI", "Inventory", "Management"],
  },
  {
    title: "Quality Control Automation",
    description: "AI-driven quality control and automation solutions for one of the world's largest automotive component manufacturers.",
    category: "Computer Vision",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    date: "January 10, 2025",
    status: "Ongoing",
    client: "Motherson Group, India",
    tags: ["AI", "Quality Control", "Automation"],
  },
  {
    title: "Custom CRM Development",
    description: "Building customized Customer Relationship Management systems that streamline communication and enhance customer satisfaction.",
    category: "Software Development",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    date: "February 22, 2025",
    status: "Ongoing",
    client: "Multiple Clients",
    tags: ["CRM", "Software", "Development"],
  },
  {
    title: "Dorm Student Tracking System",
    description: "Building customized Dorm Student Tracking system that streamline Dorm management and enhance student and parent experience.",
    category: "Software Development",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
    date: "June 11, 2025",
    status: "Ongoing",
    client: "Multiple Clients",
    tags: ["CRM", "Software", "Development"],
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        <HeroSection slides={heroSlides} />

        {/* Services Section */}
        <section className="py-20 container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Offerings</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive technology solutions to transform your business
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/expertise/ai-ml">
              <Button size="lg" variant="outline">
                View All Services
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <p className="text-accent text-sm font-medium mb-2 uppercase tracking-wider">Our Mission</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              </div>
              <Card className="p-8 md:p-12">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  We're here to bring the power of AI to everyone, not just the big players. Think of us as your local AI partner – making smart technology simple, affordable, and actually useful for businesses like yours. Whether you're running a startup, a small business, or have a great idea you want to bring to life, we're here to help turn complex AI into practical solutions that make a real difference in our community. No corporate jargon, just real solutions for real people.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-20 container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">OUR PROJECTS</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our portfolio of innovative AI and software solutions for businesses worldwide
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <StatsSection stats={stats} />

        {/* Team Section */}
        <section className="py-20 container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the talented individuals who make Nirikshan AI possible, bringing expertise in AI, software development, and business solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={index} {...member} />
            ))}
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Industries We Serve</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Delivering tailored solutions across diverse sectors
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {industries.map((industry, index) => (
                <IndustryCard key={index} {...industry} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Work With Us
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Looking for custom AI solutions or software development for your business? Contact our team to discuss your project requirements.
            </p>
            <Link to="/contact">
              <Button size="lg" className="gradient-primary">
                Contact Our Team
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
