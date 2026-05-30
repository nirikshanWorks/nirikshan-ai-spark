import projectsShowcaseMockup from "@/assets/projects-showcase-mockup.png";
import { AI3DOrb } from "@/components/AI3DOrb";
import { AICircuitLines } from "@/components/AICircuitLines";
import { AIDataStream } from "@/components/AIDataStream";
import { AIHexagonGrid } from "@/components/AIHexagonGrid";
import { AIWaveField } from "@/components/AIWaveField";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Counter, FadeUp, SlideLeft, StaggerContainer, StaggerItem } from "@/components/ScrollAnimations";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowRight,
    ArrowUpRight,
    BarChart3,
    Brain,
    Calendar,
    CheckCircle,
    ChevronRight,
    Cpu,
    Eye,
    FileText,
    Globe2,
    Layers,
    MapPin,
    Package,
    Rocket,
    Search,
    Shield,
    SlidersHorizontal,
    Sparkles,
    Star,
    TrendingUp,
    X,
    Zap
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Project {
  title: string;
  description: string;
  category: string;
  image: string;
  date: string;
  status: "Ongoing" | "Completed";
  client: string;
  tags: string[];
  impact: string;
  termsPath?: string;
  privacyPath?: string;
  storeReleaseSoon?: boolean;
  accountDeletionPath?: string;
  accentColor?: string;
}

/* ─── Projects Data ─── */
const projects: Project[] = [
  {
    title: "Manorama KrishiRakshak",
    description: "Multilingual farmer-focused mobile app offering mandi market updates, government scheme guidance, AI crop assistance, and community success stories for agriculture users across India.",
    category: "Mobile App Development",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80",
    date: "March 2026",
    status: "Completed",
    client: "Manorama Krishi Initiative, India",
    tags: ["Mobile App", "Agritech", "AI Assistant", "Localization"],
    impact: "15-language farmer support",
    termsPath: "/projects/manorma-krishi-rakshak/terms",
    privacyPath: "/projects/manorma-krishi-rakshak/privacy",
    storeReleaseSoon: true,
    accountDeletionPath: "/projects/manorma-krishi-rakshak/account-deletion-policy",
    accentColor: "from-emerald-500 to-teal-400",
  },
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
    accentColor: "from-blue-500 to-cyan-400",
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
    accentColor: "from-violet-500 to-purple-400",
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
    accentColor: "from-amber-500 to-orange-400",
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
    termsPath: "/projects/hostel-student-tracking-system/terms",
    privacyPath: "/projects/hostel-student-tracking-system/privacy",
    accountDeletionPath: "/projects/hostel-student-tracking-system/account-deletion-policy",
    accentColor: "from-rose-500 to-pink-400",
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
    accentColor: "from-indigo-500 to-blue-400",
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
    accentColor: "from-sky-500 to-cyan-400",
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
    accentColor: "from-fuchsia-500 to-pink-400",
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
    gradient: "from-violet-600 to-indigo-600",
    bgGlow: "bg-violet-500/20",
  },
  {
    icon: Brain,
    name: "AgentFlow",
    tagline: "Agentic AI Workflow Engine",
    description: "Build autonomous AI agents that reason, plan, and execute multi-step business tasks. Integrates with CRMs, ERPs, and custom APIs for end-to-end automation.",
    features: ["Multi-step reasoning", "Tool integration", "Human-in-the-loop", "Audit trails"],
    status: "Beta",
    gradient: "from-blue-600 to-cyan-600",
    bgGlow: "bg-blue-500/20",
  },
  {
    icon: Shield,
    name: "ProctorLens",
    tagline: "AI-Powered Exam Monitoring",
    description: "Scalable online proctoring platform with face recognition, gaze tracking, and anomaly detection. Supports thousands of concurrent test-takers.",
    features: ["Face recognition", "Gaze tracking", "Browser lockdown", "Instant reports"],
    status: "Live",
    gradient: "from-emerald-600 to-teal-600",
    bgGlow: "bg-emerald-500/20",
  },
  {
    icon: BarChart3,
    name: "InsightHub",
    tagline: "AI Analytics & Reporting",
    description: "Transform raw data into actionable business intelligence. Natural language querying, automated report generation, and predictive analytics in one platform.",
    features: ["Natural language queries", "Auto-generated reports", "Predictive models", "API access"],
    status: "Coming Soon",
    gradient: "from-amber-600 to-orange-600",
    bgGlow: "bg-amber-500/20",
  },
];

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

/* ─── Project Card Component ─── */
const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-2xl border border-border/60 bg-card overflow-hidden h-full flex flex-col"
      style={{
        transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s ease",
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: isHovered
          ? "0 25px 50px -12px rgba(0,0,0,0.25), 0 0 30px -5px hsl(var(--primary) / 0.15)"
          : "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      {/* Image with overlay */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out"
          style={{ transform: isHovered ? "scale(1.08)" : "scale(1)" }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

        {/* Accent line at top */}
        <div
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.accentColor || "from-primary to-accent"}`}
          style={{
            transform: isHovered ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition: "transform 0.5s ease",
          }}
        />

        {/* Status badge */}
        <div className="absolute top-4 right-4">
          <Badge
            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 backdrop-blur-md ${
              project.status === "Completed"
                ? "bg-emerald-500/90 text-white border-emerald-400/30"
                : "bg-primary/90 text-primary-foreground border-primary/30"
            }`}
          >
            {project.status === "Completed" && <CheckCircle className="w-3 h-3 mr-1" />}
            {project.status === "Ongoing" && <Zap className="w-3 h-3 mr-1 animate-pulse" />}
            {project.status}
          </Badge>
        </div>

        {/* Category floating tag */}
        <div className="absolute bottom-3 left-4">
          <Badge variant="outline" className="text-[10px] font-semibold border-white/20 text-white bg-black/40 backdrop-blur-md">
            {project.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold mb-2 leading-snug group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3">
          {project.description}
        </p>

        {/* Impact metric with visual bar */}
        <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <div>
              <span className="text-xs font-bold text-primary block">{project.impact}</span>
              <span className="text-[10px] text-muted-foreground">Key Impact</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md bg-secondary/80 text-[10px] font-medium text-muted-foreground border border-border/50"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-3 border-t border-border/50">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3" /> {project.date}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3" /> {project.client.split(",")[0]}
          </span>
        </div>

        {/* Legal links */}
        {(project.termsPath || project.privacyPath || project.accountDeletionPath) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.termsPath && (
              <Link to={project.termsPath}>
                <Button variant="outline" size="sm" className="h-7 text-[10px] border-border/50 hover:bg-primary/5 hover:border-primary/30">
                  <FileText className="w-3 h-3 mr-1" />
                  Terms
                </Button>
              </Link>
            )}
            {project.privacyPath && (
              <Link to={project.privacyPath}>
                <Button variant="outline" size="sm" className="h-7 text-[10px] border-border/50 hover:bg-primary/5 hover:border-primary/30">
                  <FileText className="w-3 h-3 mr-1" />
                  Privacy
                </Button>
              </Link>
            )}
            {project.accountDeletionPath && (
              <Link to={project.accountDeletionPath}>
                <Button variant="outline" size="sm" className="h-7 text-[10px] border-border/50 hover:bg-primary/5 hover:border-primary/30">
                  <FileText className="w-3 h-3 mr-1" />
                  Account Deletion
                </Button>
              </Link>
            )}
          </div>
        )}

        {/* Store badges */}
        {project.storeReleaseSoon && (
          <div className="mt-3 rounded-lg border border-border/50 bg-secondary/20 p-2.5">
            <p className="text-[10px] font-semibold text-foreground mb-1.5">
              Available on Play Store and App Store soon
            </p>
            <div className="flex flex-wrap items-center gap-1.5">
              <img
                src="https://img.shields.io/badge/Google%20Play-Coming%20Soon-34A853?style=flat-square&logo=google-play&logoColor=white"
                alt="Coming soon on Google Play"
                className="h-5 w-auto"
                loading="lazy"
              />
              <img
                src="https://img.shields.io/badge/App%20Store-Coming%20Soon-0D96F6?style=flat-square&logo=app-store-ios&logoColor=white"
                alt="Coming soon on App Store"
                className="h-5 w-auto"
                loading="lazy"
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* ─── Product Card Component ─── */
const ProductCard = ({ product, index }: { product: typeof products[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-2xl border border-border/50 bg-card overflow-hidden h-full"
      style={{
        transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s ease",
        transform: isHovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: isHovered
          ? "0 25px 60px -12px rgba(0,0,0,0.25), 0 0 40px -10px hsl(var(--primary) / 0.2)"
          : "0 1px 3px rgba(0,0,0,0.08)",
      }}
    >
      {/* Top accent gradient */}
      <div className={`h-1.5 bg-gradient-to-r ${product.gradient}`} />

      {/* Background glow */}
      <div
        className={`absolute -top-20 -right-20 w-40 h-40 rounded-full ${product.bgGlow} blur-3xl transition-opacity duration-500`}
        style={{ opacity: isHovered ? 0.6 : 0.2 }}
      />

      <div className="relative p-7">
        {/* Status badge */}
        <Badge
          className={`absolute top-6 right-6 text-[10px] font-bold uppercase tracking-wider ${
            product.status === "Live"
              ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
              : product.status === "Beta"
              ? "bg-primary/10 text-primary border border-primary/20"
              : "bg-muted text-muted-foreground border border-border"
          }`}
        >
          {product.status === "Live" && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />}
          {product.status}
        </Badge>

        {/* Icon */}
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${product.gradient} flex items-center justify-center mb-5 shadow-lg`}
          style={{
            transition: "transform 0.4s ease",
            transform: isHovered ? "scale(1.1) rotate(-3deg)" : "scale(1) rotate(0deg)",
          }}
        >
          <product.icon className="w-7 h-7 text-white" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold mb-1">{product.name}</h3>
        <p className="text-sm text-primary font-medium mb-3">{product.tagline}</p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          {product.description}
        </p>

        {/* Features */}
        <div className="space-y-2.5">
          {product.features.map((feature) => (
            <div key={feature} className="flex items-center gap-2.5 text-sm">
              <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${product.gradient} flex items-center justify-center flex-shrink-0`}>
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
              <span className="text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>

        {/* Learn more link */}
        <div
          className="mt-6 pt-4 border-t border-border/50 flex items-center gap-1 text-sm font-medium text-primary cursor-pointer"
          style={{
            opacity: isHovered ? 1 : 0.7,
            transition: "opacity 0.3s ease",
          }}
        >
          Learn more
          <ArrowUpRight
            className="w-4 h-4"
            style={{
              transform: isHovered ? "translate(2px, -2px)" : "translate(0, 0)",
              transition: "transform 0.3s ease",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTab, setActiveTab] = useState<"projects" | "products">("projects");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | Project["status"]>("All");
  const [sortBy, setSortBy] = useState<"featured" | "az" | "za">("featured");

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const matchesQuery = (project: Project) => {
    if (!normalizedQuery) return true;
    const haystack = [
      project.title,
      project.description,
      project.client,
      project.category,
      project.tags.join(" "),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalizedQuery);
  };

  const filtered = projects.filter((project) => {
    const categoryMatch = activeCategory === "All" || project.category === activeCategory;
    const statusMatch = statusFilter === "All" || project.status === statusFilter;
    return categoryMatch && statusMatch && matchesQuery(project);
  });

  const sorted = sortBy === "featured"
    ? filtered
    : [...filtered].sort((a, b) => {
        if (sortBy === "az") return a.title.localeCompare(b.title);
        return b.title.localeCompare(a.title);
      });

  const visibleProjects = sorted;

  const completedCount = projects.filter(p => p.status === "Completed").length;
  const ongoingCount = projects.filter(p => p.status === "Ongoing").length;
  const hasActiveFilters =
    activeCategory !== "All" ||
    statusFilter !== "All" ||
    sortBy !== "featured" ||
    searchQuery.trim().length > 0;

  const clearFilters = () => {
    setActiveCategory("All");
    setStatusFilter("All");
    setSortBy("featured");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Our Projects & Products — AI Solutions Portfolio"
        description="Explore Nirikshan AI's portfolio of AI-powered projects and products across computer vision, generative AI, and enterprise automation."
        canonical="https://nirikshanai.com/projects"
      />
      <Navigation />

      <main className="pt-16">
        {/* ── Hero Section ── */}
        <section className="relative overflow-hidden py-24 md:py-36">
          {/* Background layers */}
          <AICircuitLines className="opacity-20" />
          <AIDataStream className="opacity-10" />

          {/* Animated gradient blobs */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] bg-primary/8 animate-pulse-slow" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] bg-accent/6 animate-pulse-slow" style={{ animationDelay: "2s" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[120px] bg-primary/4" />
          </div>

          {/* Decorative orb */}
          <div className="absolute -right-16 top-16 opacity-15 hidden lg:block">
            <AI3DOrb size={320} />
          </div>

          <div className="relative container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-8">
                  <Sparkles className="w-4 h-4" />
                  Portfolio & Innovation
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] mb-6"
              >
                Crafting{" "}
                <span className="text-gradient">Intelligent</span>
                <br />
                <span className="text-gradient">Solutions</span>{" "}
                That Deliver
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
              >
                From custom AI implementations to scalable product platforms —
                explore how we turn complex challenges into{" "}
                <strong className="text-foreground">measurable outcomes</strong>.
              </motion.p>

              {/* Tab switcher — premium pill design */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="inline-flex items-center rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md p-1.5 gap-1 shadow-lg shadow-black/5"
              >
                <button
                  id="tab-projects"
                  onClick={() => setActiveTab("projects")}
                  className={`relative px-7 py-3 rounded-xl text-sm font-semibold transition-all duration-400 overflow-hidden ${
                    activeTab === "projects"
                      ? "text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {activeTab === "projects" && (
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 gradient-primary rounded-xl"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Client Projects
                  </span>
                </button>
                <button
                  id="tab-products"
                  onClick={() => setActiveTab("products")}
                  className={`relative px-7 py-3 rounded-xl text-sm font-semibold transition-all duration-400 overflow-hidden ${
                    activeTab === "products"
                      ? "text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {activeTab === "products" && (
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 gradient-primary rounded-xl"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Cpu className="w-4 h-4" />
                    Our Products
                  </span>
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Showcase Visual ── */}
        <section className="relative -mt-8 mb-8 px-4 sm:px-6 md:px-12 lg:px-24">
          <FadeUp>
            <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-2xl shadow-primary/5">
              <img
                src={projectsShowcaseMockup}
                alt="AI Projects Portfolio Showcase"
                className="w-full h-auto object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: "Computer Vision", icon: Eye },
                    { label: "Generative AI", icon: Brain },
                    { label: "AI Automation", icon: Cpu },
                    { label: "ML Systems", icon: TrendingUp },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-md border border-border/40 text-sm font-medium"
                    >
                      <item.icon className="w-4 h-4 text-primary" />
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
        </section>

        {/* ── Quick Stats Bar ── */}
        <section className="py-6">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: 8, suffix: "+", label: "Projects Delivered", icon: Rocket, color: "text-violet-500", bg: "bg-violet-500/10" },
                { value: 3, suffix: "", label: "Countries Served", icon: Globe2, color: "text-blue-500", bg: "bg-blue-500/10" },
                { value: 5, suffix: "+", label: "Active Engagements", icon: Zap, color: "text-amber-500", bg: "bg-amber-500/10" },
                { value: 100, suffix: "%", label: "Client Satisfaction", icon: Star, color: "text-emerald-500", bg: "bg-emerald-500/10" },
              ].map((stat) => (
                <FadeUp key={stat.label}>
                  <div className="flex items-center gap-3 p-4 rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm hover:border-primary/20 transition-all duration-300 group">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg} flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <div>
                      <div className="text-xl md:text-2xl font-bold text-gradient leading-none">
                        <Counter to={stat.value} duration={2} suffix={stat.suffix} />
                      </div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{stat.label}</div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        <AnimatePresence mode="wait">
          {activeTab === "projects" ? (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* ── Category Filter ── */}
              <section className="py-6">
                <div className="container mx-auto px-6">
                  <div className="mb-6 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm p-5 shadow-sm">
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <SlidersHorizontal className="w-4 h-4 text-primary" />
                        Refine your results
                      </div>
                      {hasActiveFilters && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearFilters}
                          className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                        >
                          <X className="w-3.5 h-3.5 mr-1" />
                          Clear filters
                        </Button>
                      )}
                    </div>

                    <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr_1fr]">
                      <div>
                        <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Search
                        </label>
                        <div className="mt-2 relative">
                          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            placeholder="Search by project, client, or capability"
                            className="w-full h-11 rounded-xl border border-border/60 bg-background/60 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Status
                        </label>
                        <div className="mt-2 grid grid-cols-3 gap-2">
                          {[
                            { label: `All (${projects.length})`, value: "All" as const },
                            { label: `Ongoing (${ongoingCount})`, value: "Ongoing" as const },
                            { label: `Completed (${completedCount})`, value: "Completed" as const },
                          ].map((item) => (
                            <button
                              key={item.value}
                              onClick={() => setStatusFilter(item.value)}
                              className={`h-11 rounded-xl border text-xs font-semibold transition-all duration-300 ${
                                statusFilter === item.value
                                  ? "border-transparent gradient-primary text-primary-foreground"
                                  : "border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/30"
                              }`}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Sort
                        </label>
                        <div className="mt-2">
                          <select
                            value={sortBy}
                            onChange={(event) => setSortBy(event.target.value as "featured" | "az" | "za")}
                            className="w-full h-11 rounded-xl border border-border/60 bg-background/60 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                          >
                            <option value="featured">Featured order</option>
                            <option value="az">Alphabetical (A-Z)</option>
                            <option value="za">Alphabetical (Z-A)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        id={`filter-${cat.replace(/\s+/g, "-").toLowerCase()}`}
                        onClick={() => setActiveCategory(cat)}
                        className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border overflow-hidden ${
                          activeCategory === cat
                            ? "text-primary-foreground border-transparent shadow-lg"
                            : "border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/30 bg-card/80"
                        }`}
                      >
                        {activeCategory === cat && (
                          <motion.div
                            layoutId="activeCategoryBg"
                            className="absolute inset-0 gradient-primary"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10">{cat}</span>
                      </button>
                    ))}
                  </div>

                  {/* Results count */}
                  <motion.p
                    key={visibleProjects.length}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-sm text-muted-foreground mt-4"
                  >
                    Showing <strong className="text-foreground">{visibleProjects.length}</strong>{" "}
                    {visibleProjects.length === 1 ? "project" : "projects"}
                    {activeCategory !== "All" && (
                      <> in <strong className="text-primary">{activeCategory}</strong></>
                    )}
                    {normalizedQuery && (
                      <> matching <strong className="text-primary">"{searchQuery.trim()}"</strong></>
                    )}
                  </motion.p>
                </div>
              </section>

              {/* ── Featured Project (first one) ── */}
              {visibleProjects.length > 0 && (
                <section className="py-8">
                  <div className="container mx-auto px-6">
                    <SlideLeft>
                      <div className="relative rounded-3xl border border-border/50 bg-card overflow-hidden shadow-xl shadow-black/5">
                        {/* Top accent line */}
                        <div className={`h-1 bg-gradient-to-r ${visibleProjects[0].accentColor || "from-primary to-accent"}`} />

                        <div className="grid lg:grid-cols-2">
                          {/* Image side */}
                          <div className="relative h-72 lg:h-auto overflow-hidden">
                            <img
                              src={visibleProjects[0].image}
                              alt={visibleProjects[0].title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/90 lg:block hidden" />
                            <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent lg:hidden" />

                            {/* Featured badge — premium glass style */}
                            <div className="absolute top-5 left-5">
                              <Badge className="gradient-primary text-primary-foreground text-[10px] uppercase tracking-widest font-bold px-4 py-1.5 shadow-lg">
                                <Star className="w-3 h-3 mr-1.5" />
                                Featured
                              </Badge>
                            </div>
                          </div>

                          {/* Content side */}
                          <div className="p-8 lg:p-12 flex flex-col justify-center">
                            <Badge variant="outline" className="w-fit mb-4 border-primary/30 text-primary text-xs font-semibold">
                              {visibleProjects[0].category}
                            </Badge>
                            <h2 className="text-2xl lg:text-4xl font-bold mb-4 leading-tight">{visibleProjects[0].title}</h2>
                            <p className="text-muted-foreground leading-relaxed mb-6 text-base">{visibleProjects[0].description}</p>

                            {/* Meta row */}
                            <div className="flex items-center gap-5 mb-6 text-sm text-muted-foreground">
                              <span className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                                  <Calendar className="w-3.5 h-3.5 text-primary" />
                                </div>
                                {visibleProjects[0].date}
                              </span>
                              <span className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                                  <MapPin className="w-3.5 h-3.5 text-primary" />
                                </div>
                                {visibleProjects[0].client}
                              </span>
                            </div>

                            {/* Impact metric — prominent */}
                            <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-primary/8 to-accent/5 border border-primary/15">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                                  <TrendingUp className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                  <span className="text-base font-bold text-primary">{visibleProjects[0].impact}</span>
                                  <span className="text-xs text-muted-foreground block">Key Impact Metric</span>
                                </div>
                              </div>
                            </div>

                            {/* Store release */}
                            {visibleProjects[0].storeReleaseSoon && (
                              <div className="mb-6 rounded-xl border border-border/60 bg-secondary/20 p-4">
                                <p className="text-xs font-bold text-foreground mb-2">
                                  📱 Available on Play Store and App Store soon
                                </p>
                                <div className="flex flex-wrap items-center gap-2">
                                  <img
                                    src="https://img.shields.io/badge/Google%20Play-Coming%20Soon-34A853?style=flat-square&logo=google-play&logoColor=white"
                                    alt="Coming soon on Google Play"
                                    className="h-6 w-auto"
                                    loading="lazy"
                                  />
                                  <img
                                    src="https://img.shields.io/badge/App%20Store-Coming%20Soon-0D96F6?style=flat-square&logo=app-store-ios&logoColor=white"
                                    alt="Coming soon on App Store"
                                    className="h-6 w-auto"
                                    loading="lazy"
                                  />
                                </div>
                              </div>
                            )}

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                              {visibleProjects[0].tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs font-medium">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            {/* Legal links */}
                            {(visibleProjects[0].termsPath || visibleProjects[0].privacyPath || visibleProjects[0].accountDeletionPath) && (
                              <div className="flex flex-wrap gap-3">
                                {visibleProjects[0].termsPath && (
                                  <Link to={visibleProjects[0].termsPath}>
                                    <Button variant="outline" className="border-border/60 hover:bg-primary/5 hover:border-primary/30">
                                      <FileText className="w-4 h-4 mr-2" />
                                      View Terms & Conditions
                                    </Button>
                                  </Link>
                                )}
                                {visibleProjects[0].privacyPath && (
                                  <Link to={visibleProjects[0].privacyPath}>
                                    <Button variant="outline" className="border-border/60 hover:bg-primary/5 hover:border-primary/30">
                                      <FileText className="w-4 h-4 mr-2" />
                                      Privacy Notice
                                    </Button>
                                  </Link>
                                )}
                                {visibleProjects[0].accountDeletionPath && (
                                  <Link to={visibleProjects[0].accountDeletionPath}>
                                    <Button variant="outline" className="border-border/60 hover:bg-primary/5 hover:border-primary/30">
                                      <FileText className="w-4 h-4 mr-2" />
                                      Account Deletion Policy
                                    </Button>
                                  </Link>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </SlideLeft>
                  </div>
                </section>
              )}

              {/* ── Projects Grid ── */}
              <section className="py-12 relative">
                <AIHexagonGrid className="opacity-10" />
                <div className="container mx-auto px-6 relative z-10">
                  {/* Section heading */}
                  <FadeUp className="text-center mb-10">
                    <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">Full Portfolio</p>
                    <h2 className="text-2xl md:text-3xl font-bold">
                      All <span className="text-gradient">Projects</span>
                    </h2>
                  </FadeUp>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCategory}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                      {visibleProjects.slice(1).map((project, idx) => (
                        <ProjectCard key={project.title} project={project} index={idx} />
                      ))}
                    </motion.div>
                  </AnimatePresence>

                  {visibleProjects.length === 0 && (
                    <div className="text-center py-20">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Layers className="w-8 h-8 text-primary" />
                      </div>
                      <p className="text-muted-foreground mb-4">No projects match your filters yet.</p>
                      {hasActiveFilters && (
                        <Button variant="outline" onClick={clearFilters} className="border-border/60 hover:bg-primary/5 hover:border-primary/30">
                          Reset filters
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </section>

              {/* ── Process Snapshot ── */}
              <section className="py-16 bg-secondary/20 relative overflow-hidden">
                <AIWaveField className="opacity-10" />
                <div className="container mx-auto px-6 relative z-10">
                  <FadeUp className="text-center mb-12">
                    <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">How We Deliver</p>
                    <h2 className="text-2xl md:text-4xl font-bold mb-4">
                      Our <span className="text-gradient">Proven Process</span>
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                      Every project follows a structured approach for consistent, exceptional results.
                    </p>
                  </FadeUp>

                  <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto" staggerDelay={0.12}>
                    {[
                      { step: "01", title: "Discovery", desc: "Deep-dive into your business challenge, data landscape, and success metrics.", icon: Eye, color: "from-violet-500 to-purple-500" },
                      { step: "02", title: "Architecture", desc: "Design the AI system architecture, select models, and plan integration points.", icon: Brain, color: "from-blue-500 to-cyan-500" },
                      { step: "03", title: "Build & Train", desc: "Develop, train, and rigorously validate custom AI models and pipelines.", icon: Cpu, color: "from-emerald-500 to-teal-500" },
                      { step: "04", title: "Deploy & Scale", desc: "Production deployment with monitoring, optimization, and ongoing support.", icon: Rocket, color: "from-amber-500 to-orange-500" },
                    ].map((step) => (
                      <StaggerItem key={step.step}>
                        <div className="relative p-6 rounded-2xl border border-border/50 bg-card group hover:-translate-y-2 transition-all duration-300 ai-border-glow h-full">
                          {/* Step number */}
                          <div className={`absolute -top-3 -left-3 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg bg-gradient-to-br ${step.color}`}>
                            {step.step}
                          </div>
                          <div className="mt-4">
                            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${step.color} bg-opacity-10 flex items-center justify-center mb-4`} style={{ background: `linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--accent) / 0.1))` }}>
                              <step.icon className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* ── Products Section ── */}
              <section className="py-16 relative">
                <AIWaveField className="opacity-10" />
                <div className="container mx-auto px-6 relative z-10">
                  <FadeUp className="text-center mb-14">
                    <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Products</p>
                    <h2 className="text-3xl md:text-5xl font-bold mb-5">
                      Our <span className="text-gradient">Product Suite</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                      Scalable AI-powered platforms built from real-world project experience,
                      ready for enterprise deployment.
                    </p>
                  </FadeUp>

                  <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {products.map((product, idx) => (
                      <ProductCard key={product.name} product={product} index={idx} />
                    ))}
                  </div>
                </div>
              </section>

              {/* Product CTA */}
              <section className="py-16 bg-secondary/20">
                <div className="container mx-auto px-6 text-center">
                  <FadeUp>
                    <div className="max-w-2xl mx-auto">
                      <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Sparkles className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <h3 className="text-2xl md:text-4xl font-bold mb-4">
                        Interested in Our Products?
                      </h3>
                      <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-lg leading-relaxed">
                        Schedule a demo to see how our AI platforms can accelerate your business outcomes.
                      </p>
                      <Link to="/contact">
                        <Button size="lg" className="gradient-primary text-primary-foreground px-10 h-12 text-base font-semibold">
                          Request a Demo
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                      </Link>
                    </div>
                  </FadeUp>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Final CTA ── */}
        <section className="py-24 relative">
          <AICircuitLines className="opacity-10" />
          <div className="container mx-auto px-6 relative z-10">
            <FadeUp>
              <div className="max-w-3xl mx-auto text-center p-12 md:p-16 rounded-3xl border border-primary/15 relative overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                  <div className="absolute top-0 left-1/4 w-[350px] h-[350px] rounded-full blur-[120px] bg-primary/8 animate-pulse-slow" />
                  <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full blur-[120px] bg-accent/6 animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
                </div>

                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Rocket className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">
                    Have an Idea?{" "}
                    <span className="text-gradient">Let's Build It.</span>
                  </h2>
                  <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
                    Whether it's a custom project or adopting one of our products,
                    we're ready to partner with you.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/contact">
                      <Button size="lg" className="gradient-primary text-primary-foreground px-10 h-12 text-base font-semibold w-full sm:w-auto">
                        Start a Conversation
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                    <Link to="/expertise">
                      <Button size="lg" variant="outline" className="border-border/60 hover:bg-secondary px-8 h-12 text-base w-full sm:w-auto">
                        Explore Services
                        <ChevronRight className="ml-1 w-4 h-4" />
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
