import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { Brain, Eye, Code, Globe, Palette, Database, Users } from "lucide-react";
import heroAI from "@/assets/hero-ai.jpg";

const services = [
  {
    icon: Brain,
    title: "AI & ML Solutions",
    description: "Custom machine learning models, predictive analytics, natural language processing, and intelligent automation systems tailored to your business needs.",
    link: "/expertise/ai-ml",
  },
  {
    icon: Eye,
    title: "Computer Vision",
    description: "Advanced image recognition, object detection, facial recognition, quality control systems, and visual inspection solutions powered by deep learning.",
    link: "/expertise/computer-vision",
  },
  {
    icon: Code,
    title: "Custom Software Development",
    description: "Enterprise-grade software solutions built with modern technologies. From concept to deployment, we deliver scalable, maintainable applications.",
    link: "/expertise/software-dev",
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "Responsive, high-performance web applications using React, Next.js, and modern frameworks. Progressive web apps, e-commerce platforms, and more.",
    link: "/expertise/web-dev",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "User-centered design that delights. We create intuitive interfaces through research, prototyping, and iterative testing for optimal user experience.",
    link: "/expertise/ui-ux",
  },
  {
    icon: Database,
    title: "Data Management",
    description: "Comprehensive data solutions including database design, ETL pipelines, data warehousing, analytics platforms, and business intelligence systems.",
    link: "/expertise/data-management",
  },
  {
    icon: Users,
    title: "CRM Software",
    description: "Custom CRM solutions that streamline customer relationships, automate sales processes, and provide actionable insights for business growth.",
    link: "/expertise/crm",
  },
];

const Expertise = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero */}
        <section className="relative h-[400px] overflow-hidden">
          <img src={heroAI} alt="Our Expertise" className="w-full h-full object-cover" />
          <div className="absolute inset-0 hero-overlay" />
          <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Our Expertise</h1>
              <p className="text-xl text-white/90 max-w-2xl">
                Comprehensive technology solutions powered by deep expertise and innovation
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Deliver</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              End-to-end solutions across the full spectrum of modern technology
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Approach</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A proven methodology that delivers results
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Discovery</h3>
                <p className="text-muted-foreground">
                  We deep-dive into your business, challenges, and goals to understand the full context
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Strategy</h3>
                <p className="text-muted-foreground">
                  We design a tailored solution architecture and implementation roadmap
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Development</h3>
                <p className="text-muted-foreground">
                  Our expert team builds your solution using industry best practices
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  4
                </div>
                <h3 className="text-xl font-semibold mb-2">Delivery</h3>
                <p className="text-muted-foreground">
                  We deploy, train, and provide ongoing support to ensure your success
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Expertise;
