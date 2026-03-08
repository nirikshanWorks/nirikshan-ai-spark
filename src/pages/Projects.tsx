import { Navigation } from "@/components/Navigation";
import mockupProjects from "@/assets/mockup-projects.jpg";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AICircuitLines } from "@/components/AICircuitLines";
import { AIHexagonGrid } from "@/components/AIHexagonGrid";
import { AIWaveField } from "@/components/AIWaveField";
import { AI3DOrb } from "@/components/AI3DOrb";
import { AIDataStream } from "@/components/AIDataStream";
import { FadeUp, SlideLeft, SlideRight, StaggerContainer, StaggerItem } from "@/components/ScrollAnimations";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import {
  ArrowRight, ExternalLink, Calendar, MapPin, Zap, CheckCircle,
  Brain, Eye, Code, Smartphone, BarChart3, Shield, Layers, Globe,
  Package, Cpu,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Projects Data ─── */
const projects = [
  {
    title: "AI Inventory Management System",
    description: "Developing a smart inventory management system for one of South Africa's leading pet Bottles product companies. Real-time stock tracking, demand forecasting, and automated reorder triggers powered by machine learning.",
    category: "AI Solution",
    image: "https://d3lkc3n5th01x7.cloudfront.net/wp-content/uploads/2023/09/05030019/AI-in-inventory-management.svg",
    date: "December 2024",
    status: "Ongoing",
    client: "Madapet, South Africa",
    tags: ["AI", "Inventory", "ML", "Forecasting"],
    impact: "40% reduction in stockouts",
  },
  {
    title: "Quality Control Automation",
    description: "AI-driven quality control and automation solutions for one of the world's largest automotive component manufacturers. Computer vision inspects parts in real-time on the production line.",
    category: "Computer Vision",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIRG1qRCwp_bsnMXyoYzljPWM1sMaTy56UIQ&s",
    date: "January 2025",
    status: "Ongoing",
    client: "Motherson Group, India",
    tags: ["OpenCV", "Deep Learning", "Automation"],
    impact: "95% defect detection accuracy",
  },
  {
    title: "Custom CRM Development",
    description: "Building customized Customer Relationship Management systems that streamline communication, automate follow-ups, and enhance customer satisfaction with AI-powered insights.",
    category: "Software Development",
    image: "https://res.cloudinary.com/dch0uyw8e/image/upload/v1760796015/941ffcc7-5bc0-4448-b651-df0720eb136f.png",
    date: "February 2025",
    status: "Ongoing",
    client: "Multiple Clients",
    tags: ["CRM", "React", "Node.js"],
    impact: "3x faster lead response",
  },
  {
    title: "Hostel Student Tracking System",
    description: "Smart hostel management platform with real-time student tracking, automated attendance, parent notifications, and comprehensive analytics dashboard.",
    category: "Software Development",
    image: "https://res.cloudinary.com/dch0uyw8e/image/upload/v1760831949/ecfed79c-bc46-4cc8-a0e1-c88a9b71d385.png",
    date: "June 2025",
    status: "Ongoing",
    client: "Multiple Clients",
    tags: ["IoT", "React", "Real-time"],
    impact: "60% less manual tracking",
  },
  {
    title: "Class Test Proctor",
    description: "AI-powered online exam monitoring tool using OpenCV and Python to detect cheating with 95% accuracy. Features real-time student tracking, automated grading, and scheduling.",
    category: "AI Solution",
    image: "https://cdn-media-assets.socratease.co/autoproctor/marketing/landing-page/hero-section/ap-hero.svg",
    date: "March 2025",
    status: "Ongoing",
    client: "Universities & Institutions",
    tags: ["AI", "OpenCV", "Proctoring"],
    impact: "40% less manual effort",
  },
  {
    title: "Hackathon Evaluation System",
    description: "Real-time hackathon management platform with multi-judge scoring, automated result calculation, and live leaderboards. Built for scale with Docker and Supabase.",
    category: "Software Development",
    image: "https://blog.learnyst.com/hubfs/Imported_Blog_Media/Digital-evaluation-1-1.jpg",
    date: "April 2025",
    status: "Completed",
    client: "Dev Bhoomi University",
    tags: ["React", "Supabase", "Docker"],
    impact: "50% faster evaluation",
  },
  {
    title: "PG-HOTEL Website",
    description: "Responsive web portal connecting PG operators with students, featuring availability search, bookings, and digital payments with a modern UI.",
    category: "Website Development",
    image: "https://res.cloudinary.com/dch0uyw8e/image/upload/v1760831341/b0a3ac2c-022b-41d7-8734-fe5e411bc0d8.png",
    date: "May 2025",
    status: "Completed",
    client: "Ashiyana PG",
    tags: ["Web", "Booking", "Payments"],
    impact: "2x booking conversion",
  },
];

/* ─── Products Data ─── */
const products = [
  {
    icon: Eye,
    name: "VisionGuard AI",
    tagline: "Intelligent Visual Inspection Platform",
    description: "End-to-end computer vision solution for manufacturing quality control. Deploys on-premise or cloud with real-time defect detection, classification, and reporting dashboards.",
    features: ["Real-time defect detection", "Custom model training", "Analytics dashboard", "Edge deployment"],
    status: "Live",
  },
  {
    icon: Brain,
    name: "AgentFlow",
    tagline: "Agentic AI Workflow Engine",
    description: "Build autonomous AI agents that reason, plan, and execute multi-step business tasks. Integrates with CRMs, ERPs, and custom APIs for end-to-end automation.",
    features: ["Multi-step reasoning", "Tool integration", "Human-in-the-loop", "Audit trails"],
    status: "Beta",
  },
  {
    icon: Shield,
    name: "ProctorLens",
    tagline: "AI-Powered Exam Monitoring",
    description: "Scalable online proctoring platform with face recognition, gaze tracking, and anomaly detection. Supports thousands of concurrent test-takers.",
    features: ["Face recognition", "Gaze tracking", "Browser lockdown", "Instant reports"],
    status: "Live",
  },
  {
    icon: BarChart3,
    name: "InsightHub",
    tagline: "AI Analytics & Reporting",
    description: "Transform raw data into actionable business intelligence. Natural language querying, automated report generation, and predictive analytics in one platform.",
    features: ["Natural language queries", "Auto-generated reports", "Predictive models", "API access"],
    status: "Coming Soon",
  },
];

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTab, setActiveTab] = useState<"projects" | "products">("projects");

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-16">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <AICircuitLines className="opacity-30" />
          <AIDataStream className="opacity-15" />
          <div className="absolute -right-16 top-16 opacity-20 hidden lg:block">
            <AI3DOrb size={280} />
          </div>
          {/* Gradient blobs */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] bg-primary/8" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] bg-accent/6" />
          </div>

          <div className="relative container mx-auto px-6 text-center">
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">
                <Layers className="w-4 h-4" />
                Projects & Products
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Building <span className="text-gradient">Intelligent Solutions</span> That Deliver
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                From custom AI implementations to scalable product platforms — explore how we turn complex challenges into measurable outcomes.
              </p>
            </FadeUp>

            {/* Tab switcher */}
            <FadeUp delay={0.2}>
              <div className="inline-flex items-center rounded-xl border border-border bg-card p-1.5 gap-1">
                <button
                  onClick={() => setActiveTab("projects")}
                  className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    activeTab === "projects"
                      ? "gradient-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Package className="w-4 h-4 inline mr-2" />
                  Client Projects
                </button>
                <button
                  onClick={() => setActiveTab("products")}
                  className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    activeTab === "products"
                      ? "gradient-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Cpu className="w-4 h-4 inline mr-2" />
                  Our Products
                </button>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Scroll Animation Showcase */}
        <section className="bg-secondary/10">
          <ContainerScroll
            titleComponent={
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Featured Work</p>
                <h2 className="text-3xl md:text-5xl font-bold">
                  AI-Powered <span className="text-gradient">Innovation</span> in Action
                </h2>
              </div>
            }
          >
            <img
              src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&q=80"
              alt="AI Innovation Projects"
              className="w-full h-full object-cover object-left-top rounded-2xl"
            />
          </ContainerScroll>
        </section>

        <AnimatePresence mode="wait">
          {activeTab === "projects" ? (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* ── Category Filter ── */}
              <section className="pb-4 pt-2">
                <div className="container mx-auto px-6">
                  <div className="flex flex-wrap justify-center gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border ${
                          activeCategory === cat
                            ? "gradient-primary text-primary-foreground border-transparent shadow-md"
                            : "border-border text-muted-foreground hover:text-foreground hover:border-primary/30 bg-card"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              {/* ── Featured Project (first one) ── */}
              {filtered.length > 0 && (
                <section className="py-12">
                  <div className="container mx-auto px-6">
                    <SlideLeft>
                      <div className="relative rounded-2xl border border-border bg-card overflow-hidden ai-glow">
                        <div className="grid lg:grid-cols-2">
                          <div className="relative h-64 lg:h-auto overflow-hidden">
                            <img
                              src={filtered[0].image}
                              alt={filtered[0].title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/80 lg:block hidden" />
                            <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent lg:hidden" />
                            <Badge className="absolute top-4 left-4 gradient-primary text-primary-foreground text-xs uppercase tracking-wider">
                              Featured
                            </Badge>
                          </div>
                          <div className="p-8 lg:p-12 flex flex-col justify-center">
                            <Badge variant="outline" className="w-fit mb-3 border-primary/30 text-primary text-xs">
                              {filtered[0].category}
                            </Badge>
                            <h2 className="text-2xl lg:text-3xl font-bold mb-3">{filtered[0].title}</h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">{filtered[0].description}</p>
                            <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" /> {filtered[0].date}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5" /> {filtered[0].client}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mb-6">
                              <Zap className="w-4 h-4 text-accent" />
                              <span className="text-sm font-semibold text-accent">{filtered[0].impact}</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {filtered[0].tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </SlideLeft>
                  </div>
                </section>
              )}

              {/* ── Projects Grid ── */}
              <section className="py-12 relative">
                <AIHexagonGrid className="opacity-15" />
                <div className="container mx-auto px-6 relative z-10">
                  <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
                    {filtered.slice(1).map((project, idx) => (
                      <StaggerItem key={project.title}>
                        <div className="group rounded-xl border border-border bg-card overflow-hidden hover:-translate-y-1 transition-all duration-300 ai-border-glow h-full flex flex-col">
                          {/* Image */}
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                            <div className="absolute top-3 right-3 flex gap-2">
                              <Badge
                                className={`text-xs font-semibold ${
                                  project.status === "Completed"
                                    ? "bg-accent/90 text-accent-foreground"
                                    : "bg-primary/90 text-primary-foreground"
                                }`}
                              >
                                {project.status === "Completed" && <CheckCircle className="w-3 h-3 mr-1" />}
                                {project.status === "Ongoing" && <Zap className="w-3 h-3 mr-1" />}
                                {project.status}
                              </Badge>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-5 flex flex-col flex-1">
                            <Badge variant="outline" className="w-fit mb-2 text-xs border-primary/20 text-primary">
                              {project.category}
                            </Badge>
                            <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                              {project.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3">
                              {project.description}
                            </p>

                            {/* Impact metric */}
                            <div className="flex items-center gap-2 mb-3 p-2 rounded-lg bg-accent/5 border border-accent/10">
                              <Zap className="w-3.5 h-3.5 text-accent" />
                              <span className="text-xs font-semibold text-accent">{project.impact}</span>
                            </div>

                            {/* Meta */}
                            <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> {project.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> {project.client}
                              </span>
                            </div>
                          </div>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </section>

              {/* ── Stats ── */}
              <section className="py-16 bg-secondary/30">
                <div className="container mx-auto px-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { value: "7+", label: "Projects Delivered" },
                      { value: "3", label: "Countries Served" },
                      { value: "5+", label: "Active Engagements" },
                      { value: "100%", label: "Client Satisfaction" },
                    ].map((stat) => (
                      <FadeUp key={stat.label}>
                        <div className="text-center p-6 rounded-xl border border-border bg-card ai-border-glow">
                          <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">{stat.value}</div>
                          <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </div>
                      </FadeUp>
                    ))}
                  </div>
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* ── Products Section ── */}
              <section className="py-16 relative">
                <AIWaveField className="opacity-10" />
                <div className="container mx-auto px-6 relative z-10">
                  <FadeUp className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      Our <span className="text-gradient">Product Suite</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                      Scalable AI-powered platforms built from real-world project experience, ready for enterprise deployment.
                    </p>
                  </FadeUp>

                  <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto" staggerDelay={0.15}>
                    {products.map((product) => (
                      <StaggerItem key={product.name}>
                        <div className="group relative rounded-2xl border border-border bg-card p-8 hover:-translate-y-1 transition-all duration-300 ai-border-glow h-full">
                          {/* Status badge */}
                          <Badge
                            className={`absolute top-6 right-6 text-xs font-semibold ${
                              product.status === "Live"
                                ? "bg-accent/10 text-accent border border-accent/20"
                                : product.status === "Beta"
                                ? "bg-primary/10 text-primary border border-primary/20"
                                : "bg-muted text-muted-foreground border border-border"
                            }`}
                          >
                            {product.status}
                          </Badge>

                          {/* Icon */}
                          <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                            <product.icon className="w-7 h-7 text-primary-foreground" />
                          </div>

                          {/* Content */}
                          <h3 className="text-xl font-bold mb-1">{product.name}</h3>
                          <p className="text-sm text-primary font-medium mb-3">{product.tagline}</p>
                          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                            {product.description}
                          </p>

                          {/* Features */}
                          <div className="space-y-2">
                            {product.features.map((feature) => (
                              <div key={feature} className="flex items-center gap-2 text-sm">
                                <CheckCircle className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                                <span className="text-muted-foreground">{feature}</span>
                              </div>
                            ))}
                          </div>

                          {/* Bottom glow on hover */}
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-primary to-accent rounded-full group-hover:w-20 transition-all duration-500" />
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </section>

              {/* Product CTA */}
              <section className="py-16 bg-secondary/30">
                <div className="container mx-auto px-6 text-center">
                  <FadeUp>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                      Interested in Our Products?
                    </h3>
                    <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                      Schedule a demo to see how our AI platforms can accelerate your business outcomes.
                    </p>
                    <Link to="/contact">
                      <Button size="lg" className="gradient-primary text-primary-foreground">
                        Request a Demo
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                  </FadeUp>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Final CTA ── */}
        <section className="py-20 relative">
          <AICircuitLines className="opacity-15" />
          <div className="container mx-auto px-6 relative z-10">
            <FadeUp>
              <div className="max-w-3xl mx-auto text-center p-12 rounded-2xl border border-primary/20 ai-glow relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                  <div className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full blur-[100px] bg-primary/6" />
                  <div className="absolute bottom-0 right-1/4 w-[250px] h-[250px] rounded-full blur-[100px] bg-accent/6" />
                </div>
                <div className="relative">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Have an Idea? <span className="text-gradient">Let's Build It.</span>
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Whether it's a custom project or adopting one of our products, we're ready to partner with you.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/contact">
                      <Button size="lg" className="gradient-primary text-primary-foreground">
                        Start a Conversation
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                    <Link to="/expertise">
                      <Button size="lg" variant="outline" className="border-border hover:bg-secondary">
                        Explore Services
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;
