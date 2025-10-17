import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { ServiceCard } from "@/components/ServiceCard";
import { IndustryCard } from "@/components/IndustryCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { Button } from "@/components/ui/button";
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
    eyebrow: "Unlocking Potential",
    title: "Bridging AI & Enterprises",
    description: "Here human ingenuity and technological prowess combine to forge a brighter future",
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

const testimonials = [
  {
    quote: "Working with Nirikshan AI has been transformative. Their AI solutions reduced our operational costs by 40% while significantly improving customer satisfaction.",
    author: "Sarah Johnson",
    role: "VP of Operations",
    company: "TechCorp Industries",
  },
  {
    quote: "The computer vision system they developed has revolutionized our quality control process. We're catching defects earlier and saving millions annually.",
    author: "Michael Chen",
    role: "Director of Manufacturing",
    company: "Precision Parts Inc.",
  },
  {
    quote: "Their team's expertise in AI and custom software development is unmatched. They delivered beyond our expectations, on time and within budget.",
    author: "Emily Rodriguez",
    role: "CTO",
    company: "Healthcare Solutions Group",
  },
];

const caseStudies = [
  {
    title: "AI-Powered Quality Control",
    description: "Implemented computer vision system reducing defect rates by 85% for a leading manufacturer",
    category: "Manufacturing",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    metrics: [
      { label: "Defect Reduction", value: "85%" },
      { label: "Cost Savings", value: "$2M+" },
    ],
  },
  {
    title: "Healthcare Data Platform",
    description: "Built HIPAA-compliant data management system serving 50+ medical facilities",
    category: "Healthcare",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
    metrics: [
      { label: "Facilities Served", value: "50+" },
      { label: "Records Processed", value: "10M+" },
    ],
  },
  {
    title: "Retail Analytics Engine",
    description: "Developed ML-powered analytics platform increasing conversion rates by 32%",
    category: "Retail",
    image: "https://images.unsplash.com/photo-1556742393-d75f468bfcb0",
    metrics: [
      { label: "Conversion Increase", value: "32%" },
      { label: "Revenue Growth", value: "45%" },
    ],
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

        {/* Case Studies Section */}
        <section className="py-20 container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real results from real partnerships
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <CaseStudyCard key={index} {...study} />
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Testimonials</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Trusted by leading organizations worldwide
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's discuss how our AI and technology solutions can drive your success
            </p>
            <Link to="/contact">
              <Button size="lg" className="gradient-primary">
                Get in Touch
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
