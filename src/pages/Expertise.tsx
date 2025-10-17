import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Eye, 
  Code, 
  Globe, 
  Palette, 
  Database, 
  Users,
  ArrowRight,
  Zap,
  Target,
  Lightbulb
} from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import heroAI from "@/assets/hero-ai.jpg";

const services = [
  {
    icon: Brain,
    title: "AI & ML Solutions",
    description: "Custom machine learning models, predictive analytics, natural language processing, and intelligent automation systems tailored to your business needs.",
    link: "/services",
  },
  {
    icon: Eye,
    title: "Computer Vision",
    description: "Advanced image recognition, object detection, facial recognition, quality control systems, and visual inspection solutions powered by deep learning.",
    link: "/services",
  },
  {
    icon: Code,
    title: "Custom Software Development",
    description: "Enterprise-grade software solutions built with modern technologies. From concept to deployment, we deliver scalable, maintainable applications.",
    link: "/services",
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "Responsive, high-performance web applications using React, Next.js, and modern frameworks. Progressive web apps, e-commerce platforms, and more.",
    link: "/services",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "User-centered design that delights. We create intuitive interfaces through research, prototyping, and iterative testing for optimal user experience.",
    link: "/services",
  },
  {
    icon: Database,
    title: "Data Management",
    description: "Comprehensive data solutions including database design, ETL pipelines, data warehousing, analytics platforms, and business intelligence systems.",
    link: "/services",
  },
  {
    icon: Users,
    title: "CRM Software",
    description: "Custom CRM solutions that streamline customer relationships, automate sales processes, and provide actionable insights for business growth.",
    link: "/services",
  },
];

const Expertise = () => {
  const servicesRef = useScrollAnimation(0.2);
  const processRef = useScrollAnimation(0.2);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden group">
          <img src={heroAI} alt="Our Expertise" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 hero-overlay" />
          <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">Our Expertise</h1>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mb-6"></div>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl font-light">
                Comprehensive technology solutions powered by deep expertise and innovation
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 container mx-auto px-6" ref={servicesRef.ref}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Deliver</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-4"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              End-to-end solutions across the full spectrum of modern technology
            </p>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 ${
            servicesRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services">
              <Button size="lg" className="gradient-primary hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300">
                Explore All Services in Detail
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gradient-to-br from-secondary/50 to-secondary/30" ref={processRef.ref}>
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Approach</h2>
              <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-4"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A proven methodology that delivers results consistently
              </p>
            </div>
            <div className={`grid md:grid-cols-4 gap-8 transition-all duration-1000 ${
              processRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}>
              {[
                {
                  icon: Target,
                  step: "1",
                  title: "Discovery",
                  description: "We deep-dive into your business, challenges, and goals to understand the full context"
                },
                {
                  icon: Lightbulb,
                  step: "2",
                  title: "Strategy",
                  description: "We design a tailored solution architecture and implementation roadmap"
                },
                {
                  icon: Code,
                  step: "3",
                  title: "Development",
                  description: "Our expert team builds your solution using industry best practices"
                },
                {
                  icon: Zap,
                  step: "4",
                  title: "Delivery",
                  description: "We deploy, train, and provide ongoing support to ensure your success"
                }
              ].map((item, idx) => (
                <div key={idx} className="group text-center hover:-translate-y-2 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow text-white text-2xl font-bold">
                    {item.step}
                  </div>
                  <div className="flex justify-center mb-3">
                    <item.icon className="text-blue-600" size={28} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Nirikshan AI?</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-4"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Expert Team",
                description: "Skilled professionals with years of experience in AI, software development, and business solutions"
              },
              {
                title: "Proven Track Record",
                description: "Successfully delivered projects across multiple industries and geographies with measurable results"
              },
              {
                title: "Technology Excellence",
                description: "Always at the forefront of technology, using the latest tools and frameworks"
              },
              {
                title: "Client Focus",
                description: "Your success is our success. We work closely with you throughout the entire project lifecycle"
              },
              {
                title: "Scalable Solutions",
                description: "Built to grow with your business, our solutions are designed for scalability and flexibility"
              },
              {
                title: "Ongoing Support",
                description: "Continuous support and maintenance to ensure your systems run smoothly"
              }
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-xl border border-border bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-slate-800/30 dark:to-slate-800/20 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg">
                <h3 className="text-lg font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>
          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Let's discuss how our expertise can help you achieve your business goals and stay ahead of the competition.
              </p>
              <Link to="/contact">
                <Button size="lg" className="gradient-primary hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105">
                  Contact Us Today
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Expertise;
