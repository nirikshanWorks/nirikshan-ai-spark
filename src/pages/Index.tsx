import { MutableRefObject, useEffect, useRef } from "react";
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

const heroSlides = [
  {
    video: "https://res.cloudinary.com/dch0uyw8e/video/upload/v1760826232/2_sxecvw.mp4",
    eyebrow: "From Ideas to Real Life Solutions",
    title: "Welcome to Nirikshan AI Pvt. Ltd.",
    description: "Where human potential meets artificial intelligence. Join our innovative platform and unlock new possibilities. 🤖✨",
    cta: {
      text: "Discover Nirikshan AI Pvt. Ltd.",
      link: "/who-we-are",
    },
  },
  {
    video: "https://res.cloudinary.com/dch0uyw8e/video/upload/v1760826230/1_tsiaq0.mp4",
    eyebrow: "Vision to Value",
    title: "Using AI to transform ideas into tangible outcomes",
    description: "Empowering businesses with an AI framework designed to meet their unique needs",
    cta: {
      text: "Explore AI Solutions",
      link: "/expertise/artificial-intelligence",
    },
  },
  {
    video: "https://res.cloudinary.com/dch0uyw8e/video/upload/v1760826234/3_lvxy1u.mp4",
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
  { title: "Healthcare", image: "https://res.cloudinary.com/dch0uyw8e/image/upload/v1760826868/7a2660b5-bbbe-469d-a485-6bf9049a5d16.png" },
  { title: "Retail & E-commerce", image: "https://res.cloudinary.com/dch0uyw8e/image/upload/v1760826876/5bc25593-911c-453f-be23-024e628d8414.png" },
  { title: "Manufacturing", image: "https://res.cloudinary.com/dch0uyw8e/image/upload/v1760826989/7e121981-e315-4970-ad0e-27f0cfa917ba.png" },
  { title: "Finance & Banking", image: "https://res.cloudinary.com/dch0uyw8e/image/upload/v1760827050/cb1da7ea-4d76-45f2-a32b-3cf65a14c9d1.png" },
  { title: "Agriculture", image: "https://asqi.in/wp-content/uploads/2024/11/Sustainable-Agriculture-In-India.jpg" },
  { title: "Education", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80" },
];

const partners = [
  {
    name: "Madapet",
    logo: "https://res.cloudinary.com/dch0uyw8e/image/upload/v1760830199/LOGO_8_8_kkuti6.jpg",  },
  {
    name: "Mangosorange Agritech India Pvt Ltd",
    logo: "https://mangosorange.co.in/assets/img/MOLogo.png",
  },
  {
    name: "Motherson",
    logo: "https://apn-portal.my.salesforce.com/servlet/servlet.ImageServer?id=0150h0000055wCcAAI&oid=00DE0000000c48tMAA",
  },
  {
    name: "Ranayara Private Limited",
    logo: "https://5.imimg.com/data5/NSDMERP/Board/2023/5/308937129/NE/QI/NP/155783236/155783236-board-1684400723760.jpg",
  },
  {
    name: "YMCA University",
    logo: "https://upload.wikimedia.org/wikipedia/en/a/ae/J.C._Bose_University_of_Science_and_Technology%2C_YMCA_logo.png",
  },
];
const stats = [
  { value: "5+", label: "Team Members" },
  { value: "5+", label: "Ongoing Projects" },
  { value: "20+", label: "Achievements" },
  { value: "1000+", label: "Network Connections" },
];

const Index = () => {
  const industriesContainerRef = useRef<HTMLDivElement | null>(null);
  const partnersContainerRef = useRef<HTMLDivElement | null>(null);
  const isHoveringRef = useRef(false);
  const isPartnersHoveringRef = useRef(false);

  useEffect(() => {
    const setupAutoScroll = (
      containerRef: MutableRefObject<HTMLDivElement | null>,
      hoverRef: MutableRefObject<boolean>
    ) => {
      const container = containerRef.current;
      if (!container) {
        return () => {};
      }

      let animationFrame: number;
      const scrollSpeed = 0.6;

      const loop = () => {
        if (!hoverRef.current) {
          container.scrollLeft += scrollSpeed;
          const maxScroll = container.scrollWidth / 2;
          if (container.scrollLeft >= maxScroll) {
            container.scrollLeft = 0;
          }
        }
        animationFrame = requestAnimationFrame(loop);
      };

      animationFrame = requestAnimationFrame(loop);

      return () => cancelAnimationFrame(animationFrame);
    };

    const cleanups = [
      setupAutoScroll(industriesContainerRef, isHoveringRef),
      setupAutoScroll(partnersContainerRef, isPartnersHoveringRef),
    ];

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  const duplicatedIndustries = [...industries, ...industries];
  const duplicatedPartners = [...partners, ...partners];

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

        {/* Our Partners */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-10">
              <p className="text-accent text-sm font-semibold mb-3 uppercase tracking-wider">Trusted By</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Patners</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Collaborating with forward-thinking organizations to drive innovation together
              </p>
            </div>
            <div
              className="overflow-hidden"
              ref={partnersContainerRef}
              onMouseEnter={() => {
                isPartnersHoveringRef.current = true;
              }}
              onMouseLeave={() => {
                isPartnersHoveringRef.current = false;
              }}
            >
              <div className="flex gap-8 min-w-max items-center">
                {duplicatedPartners.map((partner, index) => (
                  <div key={`${partner.name}-${index}`} className="w-48 flex-shrink-0">
                    <div className="h-32 w-full bg-secondary/40 border border-border rounded-xl flex items-center justify-center p-6">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-full max-w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <p className="mt-4 text-center font-medium text-sm text-muted-foreground">{partner.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

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
            <div
              className="overflow-hidden"
              ref={industriesContainerRef}
              onMouseEnter={() => {
                isHoveringRef.current = true;
              }}
              onMouseLeave={() => {
                isHoveringRef.current = false;
              }}
            >
              <div className="flex gap-6 min-w-max pb-2">
                {duplicatedIndustries.map((industry, index) => (
                  <div key={`${industry.title}-${index}`} className="w-64 flex-shrink-0">
                    <IndustryCard {...industry} />
                  </div>
                ))}
              </div>
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
