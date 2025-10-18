import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { ServiceCard } from "@/components/ServiceCard";
import { IndustryCard } from "@/components/IndustryCard";
import { StatsSection } from "@/components/StatsSection";
import { ProcessSection } from "@/components/ProcessSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { TechnologyStack } from "@/components/TechnologyStack";
import { CTASection } from "@/components/CTASection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Brain,
  Code,
  Cloud,
  Cpu,
  Database,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";
import heroMainVideo from "@/assets/hero-main.mp4";
import heroAIVideo from "@/assets/hero-ai.mp4";
import heroTeamVideo from "@/assets/hero-team.mp4";

const heroSlides = [
  {
    video: heroMainVideo,
    eyebrow: "From Ideas to Real Life Solutions",
    title: "Welcome to Nirikshan AI Pvt. Ltd.",
    description: "Where human potential meets artificial intelligence. Join our innovative platform and unlock new possibilities. 🤖✨",
    cta: {
      text: "Discover Nirikshan AI Pvt. Ltd.",
      link: "/who-we-are",
    },
  },
  {
    video: heroAIVideo,
    eyebrow: "Vision to Value",
    title: "Using AI to transform ideas into tangible outcomes",
    description: "Empowering businesses with an AI framework designed to meet their unique needs",
    cta: {
      text: "Explore AI Solutions",
      link: "/expertise/artificial-intelligence",
    },
  },
  {
    video: heroTeamVideo,
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
    title: "Generative AI Solutions",
    description: "Design conversational agents and creative automation built on enterprise-ready LLM pipelines",
    link: "/expertise/artificial-intelligence/generative-ai",
  },
  {
    icon: Database,
    title: "Predictive Analytics",
    description: "Forecast demand and surface insights with production-grade machine learning models",
    link: "/expertise/artificial-intelligence/machine-learning",
  },
  {
    icon: Code,
    title: ".NET Modernization",
    description: "Rebuild legacy workloads on the latest .NET stack with secure, scalable architectures",
    link: "/expertise/microsoft-services/dotnet-development",
  },
  {
    icon: Cloud,
    title: "Azure Cloud Transformation",
    description: "Migrate, optimize, and operate mission-critical workloads across the Azure ecosystem",
    link: "/expertise/microsoft-services/azure-cloud",
  },
  {
    icon: Cpu,
    title: "SAP BTP Innovation",
    description: "Extend SAP landscapes with low-code applications, automation, and AI-driven insights",
    link: "/expertise/sap-btp",
  },
  {
    icon: CheckCircle2,
    title: "Quality Engineering",
    description: "Automate functional, regression, and performance testing to release with confidence",
    link: "/expertise/quality-assurance/software-testing",
  },
];

const industries = [
  { title: "Healthcare", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d" },
  { title: "Retail & E-commerce", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8" },
  { title: "Manufacturing", image: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6" },
  { title: "Finance & Banking", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3" },
];

const stats = [
  { value: "5+", label: "Team Members" },
  { value: "5+", label: "Ongoing Projects" },
  { value: "20+", label: "Achievements" },
  { value: "1000+", label: "Network Connections" },
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
            <Link to="/expertise">
              <Button size="lg" variant="outline">
                View All Services
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-accent text-sm font-semibold mb-3 uppercase tracking-wider">Our Mission</p>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Empowering Businesses Through AI</h2>
                <p className="text-xl text-muted-foreground">
                  Making cutting-edge technology accessible and practical for everyone
                </p>
              </div>
              <Card className="p-10 md:p-14 card-hover border-2 border-border relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                      <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                        We're here to bring the power of AI to everyone, not just the big players. Think of us as your local AI partner – making smart technology simple, affordable, and actually useful for businesses like yours.
                      </p>
                      <p className="text-lg leading-relaxed text-muted-foreground">
                        Whether you're running a startup, a small business, or have a great idea you want to bring to life, we're here to help turn complex AI into practical solutions that make a real difference in our community. No corporate jargon, just real solutions for real people.
                      </p>
                    </div>
                    <div className="md:w-64 flex flex-col gap-4">
                      {[
                        "Simple & Accessible",
                        "Affordable Solutions",
                        "Real Results",
                        "Local Partnership"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 group-hover:bg-primary/10 transition-colors">
                          <CheckCircle2 className="text-primary flex-shrink-0" size={20} />
                          <span className="font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Process Section */}
        <ProcessSection />

        {/* Stats Section */}
        <StatsSection stats={stats} />

        {/* Technology Stack */}
        <TechnologyStack />

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
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
