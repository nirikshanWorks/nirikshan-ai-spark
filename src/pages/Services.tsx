import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { AICircuitLines } from "@/components/AICircuitLines";
import { FadeUp } from "@/components/ScrollAnimations";
import {
  Brain, Eye, Code, Database, Users, ArrowRight, Check,
  Zap, TrendingUp, Cpu, Cloud, Smartphone, BarChart3,
  CheckCircle, GitBranch, Boxes, ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import heroAI from "@/assets/hero-ai.jpg";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const servicesData = [
  {
    icon: Brain,
    title: "AI & Machine Learning",
    shortDesc: "Advanced AI solutions and ML models",
    color: "from-violet-500 to-purple-600",
    iconBg: "bg-violet-500",
    tag: "Most Popular",
    fullDesc: "Transform your business with cutting-edge AI and machine learning solutions. From generative AI to predictive analytics, we develop intelligent systems that learn and adapt to your specific needs.",
    features: ["Generative AI & LLM implementations", "Custom machine learning models", "Predictive analytics & forecasting", "Natural language processing (NLP)", "AI consulting & strategy", "Intelligent automation systems"],
    benefits: ["Automate complex processes", "Gain actionable insights", "Reduce costs by 40%+", "Improve decision accuracy"],
    stat: "40%", statLabel: "avg. cost reduction",
  },
  {
    icon: Cpu,
    title: "Microsoft & .NET",
    shortDesc: "Enterprise Microsoft ecosystem",
    color: "from-blue-500 to-cyan-600",
    iconBg: "bg-blue-500",
    fullDesc: "Leverage Microsoft's enterprise ecosystem. From .NET development to Azure cloud solutions, MS Dynamics, and legacy application migration — enterprise-grade solutions built right.",
    features: [".NET framework development", "MS Dynamics CRM & ERP", "Legacy migration to .NET", "Azure cloud infrastructure", "Azure DevOps & CI/CD", "Microsoft 365 integration"],
    benefits: ["Seamless enterprise integration", "Enhanced compliance", "Scalable cloud infra", "Expert MS partnership"],
    stat: "99%", statLabel: "enterprise uptime",
  },
  {
    icon: Boxes,
    title: "SAP BTP Solutions",
    shortDesc: "Business Technology Platform",
    color: "from-emerald-500 to-teal-600",
    iconBg: "bg-emerald-500",
    fullDesc: "Unlock the full potential of SAP Business Technology Platform with comprehensive integration, application development, data management, and AI-powered insights.",
    features: ["SAP Integration Suite", "Low-code/No-code development", "SAP BTP data & analytics", "AI on SAP BTP", "SAP Analytics Cloud", "Custom API development"],
    benefits: ["Faster app development", "Reduced integration complexity", "Real-time data insights", "Future-ready platform"],
    stat: "3×", statLabel: "faster delivery",
  },
  {
    icon: Cloud,
    title: "AWS & Cloud",
    shortDesc: "Amazon Web Services infrastructure",
    color: "from-amber-500 to-orange-600",
    iconBg: "bg-amber-500",
    fullDesc: "Harness the power of AWS cloud with expert architecture and best practices. Migrate, optimize, and innovate on the AWS platform with end-to-end cloud services.",
    features: ["AWS infrastructure design", "Cloud migration", "AWS cost optimization", "Serverless development", "Cloud security", "Disaster recovery"],
    benefits: ["Global availability", "Pay-as-you-go model", "High scalability", "Reduced overhead"],
    stat: "60%", statLabel: "infra cost saved",
  },
  {
    icon: Code,
    title: "Web Development",
    shortDesc: "Modern responsive web apps",
    color: "from-rose-500 to-pink-600",
    iconBg: "bg-rose-500",
    fullDesc: "High-performance, responsive web applications that deliver exceptional user experiences. Using React, Next.js, and modern frameworks for any scale.",
    features: ["Responsive web design", "Progressive web apps (PWA)", "E-commerce platforms", "CMS development", "Real-time applications", "Performance optimization"],
    benefits: ["Works on all devices", "Fast loading", "SEO friendly", "Better conversions"],
    stat: "2×", statLabel: "faster load times",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    shortDesc: "Native & cross-platform mobile",
    color: "from-indigo-500 to-purple-600",
    iconBg: "bg-indigo-500",
    fullDesc: "Powerful mobile applications for iOS, Android, or both platforms with native and cross-platform solutions that provide exceptional user experiences.",
    features: ["Native Android & iOS", "React Native & Flutter", "Mobile UI/UX design", "App store optimization", "Push notifications", "Offline functionality"],
    benefits: ["Native performance", "Code reusability", "Faster to market", "Cost-effective"],
    stat: "4.8★", statLabel: "avg. app rating",
  },
  {
    icon: CheckCircle,
    title: "QA & Testing",
    shortDesc: "Quality assurance services",
    color: "from-teal-500 to-cyan-600",
    iconBg: "bg-teal-500",
    fullDesc: "Ensure software meets the highest quality standards with comprehensive testing from functional to automation across all platforms.",
    features: ["Manual & automation testing", "Performance testing", "Security testing", "Regression testing", "UAT", "Test management"],
    benefits: ["Fewer defects", "Faster releases", "Improved reliability", "Cost-effective QA"],
    stat: "90%", statLabel: "defect reduction",
  },
  {
    icon: GitBranch,
    title: "Legacy Modernization",
    shortDesc: "Transform legacy systems",
    color: "from-slate-500 to-gray-600",
    iconBg: "bg-slate-500",
    fullDesc: "Breathe new life into legacy applications with re-engineering, cloud migration, and UI/UX modernization that transform outdated systems.",
    features: ["App re-engineering", "Cloud migration", "UI/UX modernization", "API integration", "Database modernization", "Maintenance services"],
    benefits: ["Extended lifespan", "Better performance", "Lower maintenance", "Cloud-ready"],
    stat: "70%", statLabel: "lower maintenance",
  },
  {
    icon: BarChart3,
    title: "Digital Marketing",
    shortDesc: "Grow your online presence",
    color: "from-pink-500 to-rose-600",
    iconBg: "bg-pink-500",
    fullDesc: "Expand your digital footprint with comprehensive marketing services — from SEO to social media, reaching and engaging your target audience.",
    features: ["SEO optimization", "Social media marketing", "Content marketing", "Paid advertising", "Email marketing", "Marketing analytics"],
    benefits: ["More visibility", "Higher conversions", "Measurable ROI", "Brand awareness"],
    stat: "5×", statLabel: "traffic growth",
  },
  {
    icon: Database,
    title: "Data & Analytics",
    shortDesc: "Comprehensive data solutions",
    color: "from-cyan-500 to-blue-600",
    iconBg: "bg-cyan-500",
    fullDesc: "Turn data into actionable insights with database design, ETL pipelines, data warehousing, and advanced analytics platforms.",
    features: ["Database design & optimization", "ETL pipelines", "Data warehousing", "Business intelligence", "Big data solutions", "Real-time analytics"],
    benefits: ["Better insights", "Faster queries", "Scalable infra", "Data-driven decisions"],
    stat: "10×", statLabel: "faster queries",
  },
  {
    icon: Users,
    title: "CRM & Managed Services",
    shortDesc: "Customer solutions & support",
    color: "from-orange-500 to-amber-600",
    iconBg: "bg-orange-500",
    fullDesc: "Streamline customer relationships with custom CRM solutions and continuous application management services with 24/7 support.",
    features: ["Custom CRM development", "Sales pipeline automation", "Marketing automation", "24/7 monitoring", "Application managed services", "Performance optimization"],
    benefits: ["Better customer retention", "More sales efficiency", "Reduced IT overhead", "Always-on support"],
    stat: "24/7", statLabel: "monitoring",
  },
];

const Services = () => {
  const [activeTab, setActiveTab] = useState(0);
  const active = servicesData[activeTab];

  return (
    <div className="min-h-screen">
      <SEO
        title="Our Services — AI, Cloud & Digital Solutions"
        description="Explore Nirikshan AI's comprehensive services: Generative AI, Computer Vision, .NET, Azure, SAP BTP, QA, and digital transformation."
        canonical="https://nirikshanai.com/services"
      />
      <Navigation />

      <main className="pt-14 sm:pt-16">

        {/* ── Hero ── */}
        <section className="relative h-[280px] sm:h-[380px] md:h-[460px] overflow-hidden">
          <img src={heroAI} alt="Our Services" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/75 to-slate-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 h-full flex items-end pb-10 sm:pb-14">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                <Zap size={12} className="text-yellow-400" />
                Full-Stack Technology Solutions
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3">
                Our <span className="text-gradient">Services</span>
              </h1>
              <p className="text-sm sm:text-base text-white/75 max-w-lg">
                Comprehensive technology solutions across AI, Cloud, Web, and Enterprise domains.
              </p>
            </div>
          </div>
        </section>

        {/* ── Tabbed Service Explorer ── */}
        <section className="py-12 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <FadeUp className="text-center mb-8 sm:mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Choose a Service</p>
              <h2 className="text-2xl sm:text-3xl font-bold">Explore What We Offer</h2>
            </FadeUp>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-6xl mx-auto">

              {/* Left — service selector tabs */}
              <div className="lg:w-72 xl:w-80 flex-shrink-0">
                {/* Mobile: horizontal scroll tabs */}
                <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 snap-x snap-mandatory lg:snap-none scrollbar-none">
                  {servicesData.map((s, i) => (
                    <button
                      key={s.title}
                      onClick={() => setActiveTab(i)}
                      className={`flex-shrink-0 snap-start lg:flex-shrink flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 border group w-48 lg:w-full ${
                        activeTab === i
                          ? "bg-card border-primary/40 shadow-md"
                          : "border-transparent hover:bg-secondary/60 hover:border-border"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg ${s.iconBg} flex items-center justify-center flex-shrink-0`}>
                        <s.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="min-w-0">
                        <p className={`text-sm font-semibold truncate ${activeTab === i ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                          {s.title}
                        </p>
                        <p className="text-[10px] text-muted-foreground truncate hidden lg:block">{s.shortDesc}</p>
                      </div>
                      {activeTab === i && <ChevronRight className="w-4 h-4 text-primary ml-auto flex-shrink-0 hidden lg:block" />}
                    </button>
                  ))}
                </div>
                <p className="text-center text-xs text-muted-foreground mt-2 lg:hidden">← Swipe to see all →</p>
              </div>

              {/* Right — service detail panel */}
              <div className="flex-1 min-w-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.22 }}
                    className="h-full rounded-2xl border border-border bg-card overflow-hidden"
                  >
                    {/* Header bar */}
                    <div className={`h-2 w-full bg-gradient-to-r ${active.color}`} />

                    <div className="p-6 sm:p-8">
                      {/* Title row */}
                      <div className="flex items-start gap-4 mb-5">
                        <div className={`w-12 h-12 rounded-xl ${active.iconBg} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                          <active.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-xl sm:text-2xl font-bold">{active.title}</h2>
                            {active.tag && (
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                                {active.tag}
                              </span>
                            )}
                          </div>
                          <p className="text-muted-foreground text-sm">{active.shortDesc}</p>
                        </div>
                        {/* Stat */}
                        <div className="ml-auto text-right flex-shrink-0">
                          <div className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${active.color} bg-clip-text text-transparent`}>{active.stat}</div>
                          <div className="text-[10px] text-muted-foreground">{active.statLabel}</div>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6 border-l-2 border-primary/30 pl-4">
                        {active.fullDesc}
                      </p>

                      {/* Features + Benefits 2-col */}
                      <div className="grid sm:grid-cols-2 gap-6 mb-6">
                        {/* Features */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Zap className="w-4 h-4 text-primary" />
                            <h3 className="font-semibold text-sm">Key Features</h3>
                          </div>
                          <ul className="space-y-2">
                            {active.features.map((f, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {/* Benefits */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <TrendingUp className="w-4 h-4 text-primary" />
                            <h3 className="font-semibold text-sm">Business Benefits</h3>
                          </div>
                          <ul className="space-y-2">
                            {active.benefits.map((b, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <div className={`w-1.5 h-1.5 rounded-full ${active.iconBg} mt-1.5 flex-shrink-0`} />
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                        <Link to="/contact" className="flex-1 sm:flex-none">
                          <Button className={`gradient-primary w-full sm:w-auto`}>
                            Discuss This Service
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </Link>
                        <Link to="/projects" className="flex-1 sm:flex-none">
                          <Button variant="outline" className="w-full sm:w-auto">
                            View Case Studies
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* ── Quick-scan service cards grid ── */}
        <section className="py-12 sm:py-16 bg-secondary/20">
          <div className="container mx-auto px-4 sm:px-6">
            <FadeUp className="text-center mb-8 sm:mb-10">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">All Services at a Glance</h2>
              <p className="text-muted-foreground text-sm">Click any card to explore the full service detail above.</p>
            </FadeUp>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
              {servicesData.map((s, i) => (
                <button
                  key={s.title}
                  onClick={() => {
                    setActiveTab(i);
                    document.querySelector(".services-explorer")?.scrollIntoView({ behavior: "smooth" });
                    window.scrollTo({ top: 400, behavior: "smooth" });
                  }}
                  className={`group p-4 rounded-xl border text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                    activeTab === i
                      ? "border-primary/40 bg-primary/5"
                      : "border-border bg-card hover:border-primary/20"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg ${s.iconBg} flex items-center justify-center mb-3`}>
                    <s.icon className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm font-semibold leading-tight mb-1">{s.title}</p>
                  <p className="text-[11px] text-muted-foreground line-clamp-2">{s.shortDesc}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-14 sm:py-20 relative overflow-hidden">
          <AICircuitLines className="opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-violet-500/8" />
          <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
            <FadeUp className="max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-muted-foreground text-sm sm:text-base mb-8">
                Let's discuss which services align with your goals — free 30-min consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="gradient-primary w-full sm:w-auto">
                    Book Free Consultation
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/projects">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    See Our Work
                  </Button>
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
