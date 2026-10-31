import { SEO } from "@/components/SEO";
import React, { useState } from "react";

import partnerMadapet from "@/assets/partners/madapet.png";
import partnerVB from "@/assets/partners/vb.png";
import partnerMDJKS from "@/assets/partners/mdjks.png";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { TypingText } from "@/components/TypingText";
import { RotatingKeywords } from "@/components/RotatingKeywords";
import { AIServicesStrip } from "@/components/AIServicesStrip";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ScrollAnimations";
import { motion, AnimatePresence } from "framer-motion";
import { InfiniteTextMarquee } from "@/components/ui/infinite-text-marquee";
import { InteractiveCVShowcase } from "@/components/InteractiveCVShowcase";
import {
  ArrowRight, Brain, Eye, Bot, Building2, Activity,
  TrendingUp, FileText, Lightbulb, Code2, Rocket,
  Quote, Cpu, Sparkles, Zap, ChevronRight, Check,
  Factory, Stethoscope, ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ─── Data ─── */
const capabilities = [
  {
    icon: Eye,
    title: "Computer Vision",
    highlight: "OpenCV · YOLO · Deep Learning",
    desc: "Real-time object detection, visual inspection, and pattern recognition — from factory floors to surveillance systems.",
    accent: "from-violet-500 to-fuchsia-600",
    iconBg: "bg-violet-500",
    stat: "99.8%", statLabel: "Accuracy",
  },
  {
    icon: Brain,
    title: "Generative AI",
    highlight: "LLMs · RAG · Content Synthesis",
    desc: "Custom AI models that generate insights, automate content creation, and power intelligent document understanding.",
    accent: "from-blue-500 to-cyan-600",
    iconBg: "bg-blue-500",
    stat: "10×", statLabel: "Faster insights",
  },
  {
    icon: Bot,
    title: "AI Agents",
    highlight: "Multi-Step · Autonomous · Agentic",
    desc: "Autonomous workflows that reason, plan, and execute complex multi-step tasks across your business systems 24/7.",
    accent: "from-emerald-500 to-teal-600",
    iconBg: "bg-emerald-500",
    stat: "24/7", statLabel: "Autonomous ops",
  },
  {
    icon: Activity,
    title: "Machine Learning",
    highlight: "Predictive · Adaptive · Scalable",
    desc: "Advanced ML models that uncover hidden patterns, forecast outcomes, and continuously improve from new data.",
    accent: "from-amber-500 to-orange-600",
    iconBg: "bg-amber-500",
    stat: "3×", statLabel: "ROI avg.",
  },
  {
    icon: Cpu,
    title: "AI Automation",
    highlight: "Pipelines · Integration · MLOps",
    desc: "End-to-end automation of data pipelines, model deployment, and operational workflows with production-grade reliability.",
    accent: "from-rose-500 to-pink-600",
    iconBg: "bg-rose-500",
    stat: "60%", statLabel: "Cost reduction",
  },
  {
    icon: Lightbulb,
    title: "AI Consulting",
    highlight: "Strategy · Roadmaps · Audits",
    desc: "Expert strategic guidance on AI readiness, implementation planning, and digital transformation tailored to your industry.",
    accent: "from-indigo-500 to-purple-600",
    iconBg: "bg-indigo-500",
    stat: "∞", statLabel: "Possibilities",
  },
];

const problems = [
  {
    icon: Eye,
    title: "Visual Intelligence",
    problem: "Manual quality checks miss defects and slow production.",
    solution: "Computer Vision detects, classifies, and inspects in real-time with 99%+ accuracy.",
    color: "violet",
    link: "/expertise/artificial-intelligence/computer-vision",
  },
  {
    icon: Brain,
    title: "Generative AI",
    problem: "Teams waste hours extracting insights from unstructured data.",
    solution: "LLMs synthesize reports, answer queries, and generate actionable intelligence instantly.",
    color: "blue",
    link: "/expertise/artificial-intelligence/generative-ai",
  },
  {
    icon: Bot,
    title: "AI Agents",
    problem: "Repetitive multi-step workflows drain skilled human resources.",
    solution: "Autonomous agents reason, plan, and execute complex tasks across your systems 24/7.",
    color: "emerald",
    link: "/expertise/artificial-intelligence/ai-agent-development",
  },
  {
    icon: TrendingUp,
    title: "Predictive Analytics",
    problem: "Decisions rely on lagging indicators and gut instinct.",
    solution: "ML models forecast demand, detect anomalies, and surface risks before they escalate.",
    color: "amber",
    link: "/expertise/artificial-intelligence/machine-learning",
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; pill: string }> = {
  violet: { bg: "bg-violet-500/10", text: "text-violet-600 dark:text-violet-400", border: "border-violet-500/30", pill: "bg-violet-500" },
  blue:   { bg: "bg-blue-500/10",   text: "text-blue-600 dark:text-blue-400",     border: "border-blue-500/30",   pill: "bg-blue-500" },
  emerald:{ bg: "bg-emerald-500/10",text: "text-emerald-600 dark:text-emerald-400",border: "border-emerald-500/30",pill: "bg-emerald-500" },
  amber:  { bg: "bg-amber-500/10",  text: "text-amber-600 dark:text-amber-400",   border: "border-amber-500/30",  pill: "bg-amber-500" },
};

const processSteps = [
  { icon: Lightbulb, step: "01", title: "Define Problem", desc: "We analyze your business challenges and identify where AI creates the highest impact.", color: "text-violet-500" },
  { icon: Building2, step: "02", title: "Prepare Data",   desc: "Clean, structure, and enrich your data to fuel accurate, reliable AI models.", color: "text-blue-500" },
  { icon: Code2,     step: "03", title: "Build Solution", desc: "Develop, train, and validate custom AI systems tailored to your domain.", color: "text-emerald-500" },
  { icon: Rocket,    step: "04", title: "Deliver & Support", desc: "Deploy to production with monitoring, optimization, and ongoing support.", color: "text-amber-500" },
];

const partners = [
  { name: "Madapet", src: partnerMadapet },
  { name: "Mangosorange Agritech", src: "https://mangosorange.co.in/assets/img/MOLogo.png", url: "https://mangosorange.co.in/" },
  { name: "Motherson", src: "https://apn-portal.my.salesforce.com/servlet/servlet.ImageServer?id=0150h0000055wCcAAI&oid=00DE0000000c48tMAA" },
  { name: "Ranayara Pvt Ltd", src: "https://5.imimg.com/data5/NSDMERP/Board/2023/5/308937129/NE/QI/NP/155783236/155783236-board-1684400723760.jpg" },
  { name: "YMCA University", src: "https://upload.wikimedia.org/wikipedia/en/a/ae/J.C._Bose_University_of_Science_and_Technology%2C_YMCA_logo.png", url: "https://jcboseust.ac.in/" },
  { name: "VB Group", src: partnerVB },
  { name: "Manorama Dabral Jan Kalyan Samiti", src: partnerMDJKS, url: "https://mdjks.org/" },
  { name: "AVR AI Technologies", src: "https://avraitechnologies.com/favicon.png", url: "https://avraitechnologies.com/" },
];

/* ─── Interactive "Problem → Solution" tabs ─── */
const ProblemSolutionTabs = () => {
  const [active, setActive] = useState(0);
  const item = problems[active];
  const c = colorMap[item.color];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Tab buttons */}
      <div className="flex flex-wrap gap-2 justify-center mb-8 sm:mb-10">
        {problems.map((p, i) => (
          <button
            key={p.title}
            onClick={() => setActive(i)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
              active === i
                ? `${colorMap[p.color].pill} text-white border-transparent shadow-lg scale-105`
                : "bg-background border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
            }`}
          >
            <p.icon className="w-3.5 h-3.5" />
            {p.title}
          </button>
        ))}
      </div>

      {/* Content panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className={`rounded-2xl border ${c.border} bg-gradient-to-br from-background to-secondary/30 overflow-hidden`}
        >
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
            {/* Problem */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-destructive/70" />
                <span className="text-xs font-bold uppercase tracking-wider text-destructive/70">The Challenge</span>
              </div>
              <p className="text-lg sm:text-xl font-medium leading-relaxed text-foreground">
                {item.problem}
              </p>
            </div>
            {/* Solution */}
            <div className={`p-6 sm:p-8 ${c.bg}`}>
              <div className="flex items-center gap-2 mb-4">
                <span className={`w-2 h-2 rounded-full ${c.pill}`} />
                <span className={`text-xs font-bold uppercase tracking-wider ${c.text}`}>AI Solution</span>
              </div>
              <p className="text-lg sm:text-xl font-medium leading-relaxed text-foreground">
                {item.solution}
              </p>
              <Link
                to={item.link}
                className={`inline-flex items-center gap-1.5 mt-5 text-sm font-semibold ${c.text} hover:gap-3 transition-all duration-200`}
              >
                Learn more <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/* ─── Capabilities horizontal scroll on mobile ─── */
const CapabilitiesSection = () => (
  <div className="relative">
    {/* Horizontal scroll on mobile, grid on desktop */}
    <div className="flex gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-5 sm:overflow-visible sm:pb-0 snap-x snap-mandatory sm:snap-none scrollbar-none max-w-6xl mx-auto">
      {capabilities.map((cap, i) => (
        <motion.div
          key={cap.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07, duration: 0.4 }}
          className="min-w-[260px] sm:min-w-0 snap-start flex-shrink-0 sm:flex-shrink group relative rounded-2xl overflow-hidden border border-border bg-card cursor-pointer"
        >
          {/* Gradient top bar */}
          <div className={`h-1 w-full bg-gradient-to-r ${cap.accent}`} />
          <div className="p-5 sm:p-6">
            {/* Header row */}
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl ${cap.iconBg} flex items-center justify-center`}>
                <cap.icon className="w-5 h-5 text-white" />
              </div>
              {/* Stat pill */}
              <div className="text-right">
                <div className={`text-xl font-bold bg-gradient-to-r ${cap.accent} bg-clip-text text-transparent`}>{cap.stat}</div>
                <div className="text-[10px] text-muted-foreground">{cap.statLabel}</div>
              </div>
            </div>
            <h3 className="text-base font-bold mb-1">{cap.title}</h3>
            <p className="text-[11px] font-mono text-primary/60 mb-3">{cap.highlight}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{cap.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
    {/* Scroll hint on mobile */}
    <p className="text-center text-xs text-muted-foreground mt-3 sm:hidden">← Swipe to see all →</p>
  </div>
);

/* ─── Process — horizontal timeline ─── */
const ProcessSection = () => (
  <div className="max-w-5xl mx-auto">
    {/* Desktop: connected steps */}
    <div className="hidden md:grid grid-cols-4 gap-0 relative">
      {/* connecting line */}
      <div className="absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-violet-500 via-blue-500 via-emerald-500 to-amber-500 opacity-40" />
      {processSteps.map((step, i) => (
        <motion.div
          key={step.step}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12, duration: 0.4 }}
          className="flex flex-col items-center text-center px-4"
        >
          {/* Circle */}
          <div className="relative mb-5 z-10">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
              <step.icon className="w-7 h-7 text-white" />
            </div>
            <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border-2 border-border text-[10px] font-bold text-muted-foreground flex items-center justify-center">
              {i + 1}
            </span>
          </div>
          <h3 className="font-bold text-base mb-2">{step.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
        </motion.div>
      ))}
    </div>

    {/* Mobile: vertical list */}
    <div className="md:hidden space-y-4">
      {processSteps.map((step, i) => (
        <motion.div
          key={step.step}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.35 }}
          className="flex gap-4 items-start p-4 rounded-xl border border-border bg-card"
        >
          <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 shadow">
            <step.icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-muted-foreground">{step.step}</span>
              <h3 className="font-bold text-sm">{step.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <SEO
        title="Nirikshan AI | AI & Machine Learning Solutions for Business Innovation"
        description="Nirikshan AI delivers advanced Generative AI, Computer Vision, and Agentic AI solutions. Accelerate business innovation through intelligent automation and data-driven insights."
        canonical="https://nirikshanai.com/"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: "Nirikshan AI Private Limited",
              alternateName: "Nirikshan AI",
              url: "https://nirikshanai.com",
              logo: "https://nirikshanai.com/nirikshan-ai-logo.png",
              sameAs: [
                "https://www.linkedin.com/company/nirikshan-ai/",
                "https://www.instagram.com/nirikshan.ai/"
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-9410-992204",
                contactType: "sales",
                email: "info@nirikshanai.com"
              }
            },
            { "@type": "WebSite", name: "Nirikshan AI", url: "https://nirikshanai.com" }
          ]
        }}
      />
      <Navigation />

      <main className="relative z-10">

        {/* ══════════════════════════════════════════════════════
            1. HERO — full-bleed with spotlight
        ══════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden pt-24 pb-8 md:pt-32 md:pb-14">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="relative w-full rounded-2xl border border-border bg-card/80 backdrop-blur overflow-hidden shadow-xl">
              <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" size={300} />

              <div className="flex flex-col md:flex-row">
                {/* Left content */}
                <div className="flex-1 p-6 sm:p-10 md:p-14 relative z-10 flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs sm:text-sm font-medium text-primary w-fit mb-5"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    Computer Vision · Generative AI · AI Automation
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight"
                  >
                    We Build AI That
                    <br />
                    <RotatingKeywords
                      keywords={[
                        "Sees & Detects",
                        "Thinks & Creates",
                        "Automates & Scales",
                        "Predicts & Decides",
                      ]}
                      interval={3000}
                    />
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-5 text-muted-foreground max-w-xl text-sm sm:text-base md:text-lg leading-relaxed"
                  >
                    From <strong className="text-foreground">computer vision</strong> that inspects at scale, to{" "}
                    <strong className="text-foreground">generative AI</strong> that creates insights, and{" "}
                    <strong className="text-foreground">autonomous agents</strong> that execute — end-to-end AI for enterprises.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.55 }}
                    className="flex flex-col sm:flex-row gap-3 pt-6"
                  >
                    <Link to="/contact">
                      <Button size="lg" className="gradient-primary text-primary-foreground px-7 h-12 text-sm sm:text-base font-semibold border-0 w-full sm:w-auto">
                        Get AI Consultation
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                    <Link to="/expertise">
                      <Button size="lg" variant="outline" className="h-12 px-7 text-sm sm:text-base border-border hover:bg-secondary w-full sm:w-auto">
                        Explore Expertise
                      </Button>
                    </Link>
                  </motion.div>

                  {/* Trust row with authentic industry badges */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.75 }}
                    className="flex items-center gap-3 mt-6"
                  >
                    <div className="flex -space-x-1.5">
                      {[
                        { icon: Factory, label: "Manufacturing" },
                        { icon: Stethoscope, label: "Healthcare" },
                        { icon: Building2, label: "Infrastructure" },
                        { icon: ShieldCheck, label: "Security" },
                      ].map((item, i) => (
                        <span key={i} title={item.label} className="w-7 h-7 rounded-full bg-secondary border border-border flex items-center justify-center text-primary/80">
                          <item.icon size={13} />
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">Trusted by <strong className="text-foreground">5+ enterprises</strong> across industries</p>
                  </motion.div>
                </div>

                {/* Right — 3D scene */}
                <div className="flex-1 relative h-[220px] sm:h-[280px] md:h-auto md:min-h-[460px]">
                  <SplineScene
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full"
                  />
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-primary/90 backdrop-blur-sm border border-primary-foreground/20 shadow-lg">
                    <p className="text-primary-foreground text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap">
                      <TypingText text="Enterprise Intelligence Deployed in Production" />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats bar — 4 tiles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3"
            >
              {[
                { value: "20+", label: "AI Projects", icon: Rocket, color: "text-violet-500" },
                { value: "99.9%", label: "Model Uptime", icon: Activity, color: "text-blue-500" },
                { value: "5+", label: "Enterprises", icon: Building2, color: "text-emerald-500" },
                { value: "3×", label: "Avg. ROI", icon: TrendingUp, color: "text-amber-500" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-card/70 backdrop-blur-sm hover:border-primary/30 transition-colors">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-current/10 flex-shrink-0 ${stat.color}`}>
                    <stat.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gradient leading-none">{stat.value}</div>
                    <div className="text-[10px] text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Services marquee strip */}
        <AIServicesStrip />

        {/* ══════════════════════════════════════════════════════
            2. PROBLEM → SOLUTION (interactive tabs)
        ══════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-24 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6">
            <FadeUp className="text-center mb-10 sm:mb-12">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary mb-3">What We Solve</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Every Challenge Has an <span className="text-gradient">AI Answer</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
                Pick a challenge your team faces — see exactly how we solve it.
              </p>
            </FadeUp>
            <ProblemSolutionTabs />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            3. COMPUTER VISION SHOWCASE
        ══════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,119,198,0.12),transparent_70%)] pointer-events-none" />
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <FadeUp className="text-center mb-10 sm:mb-14 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 font-medium text-xs sm:text-sm mb-5 border border-violet-500/20">
                <Eye className="w-3.5 h-3.5" />
                Live Computer Vision Demo
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight mb-4">
                See AI <span className="text-gradient">See</span> in Real-Time
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Experience our deep learning systems detecting, tracking, and analyzing objects instantly.
              </p>
            </FadeUp>
            <FadeUp delay={0.2} className="w-full max-w-5xl mx-auto">
              <InteractiveCVShowcase />
            </FadeUp>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            4. CAPABILITIES — horizontal scroll mobile / grid desktop
        ══════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-24 bg-secondary/20">
          <div className="container mx-auto px-4 sm:px-6">
            <FadeUp className="text-center mb-10 sm:mb-12">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary mb-3">Core Capabilities</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Full-Stack <span className="text-gradient">AI Expertise</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
                Everything from idea to production-grade AI — under one roof.
              </p>
            </FadeUp>
            <CapabilitiesSection />
            <FadeUp className="text-center mt-8 sm:mt-10">
              <Link to="/expertise">
                <Button variant="outline" className="border-primary/30 hover:bg-primary/5">
                  View All AI Capabilities
                  <ChevronRight className="ml-1.5 w-4 h-4" />
                </Button>
              </Link>
            </FadeUp>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            5. HOW WE WORK — process timeline
        ══════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <FadeUp className="text-center mb-10 sm:mb-14">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary mb-3">Our Process</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                How We <span className="text-gradient">Work</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
                A proven 4-step methodology from problem definition to production deployment.
              </p>
            </FadeUp>
            <ProcessSection />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            5.5. AI TRAINING & EDUCATION SPOTLIGHT
        ══════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-24 relative overflow-hidden bg-gradient-to-b from-card via-background to-secondary/20 border-y border-border">
          <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 p-8 sm:p-12 shadow-2xl">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                {/* Left side: Context & Value */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-wider uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>AI TRAINING &amp; WORKFORCE ENABLEMENT</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
                    Making India AI-Ready,
                    <br />
                    <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                      One Skill at a Time.
                    </span>
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                    Practical AI training that empowers students, educators, professionals, and industries to understand, apply, and innovate with Artificial Intelligence.
                  </p>
                  
                  {/* Four Audience Labels */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {["Schools (K-12)", "Universities & Colleges", "Corporate Teams", "Industries"].map((aud) => (
                      <span key={aud} className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                        {aud}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <Link to="/10x-ai-productivity">
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl h-12 px-7 shadow-lg shadow-blue-500/20">
                        Explore Training Programmes
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                    <Link to="/contact">
                      <Button size="lg" variant="outline" className="rounded-2xl h-12 px-7 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800">
                        Partner With Us
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Right side: Real Workshop Photography Card */}
                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl group aspect-[4/3] bg-slate-900">
                    <img
                      src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80"
                      alt="Nirikshan AI Workshop Session"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300 block mb-1">
                        Interactive Training Sessions
                      </span>
                      <h4 className="text-sm sm:text-base font-bold leading-snug">
                        Hands-on Labs, Real Projects &amp; Live AI Tooling
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            6. SOCIAL PROOF — testimonial + clients
        ══════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-24 bg-secondary/20">
          <div className="container mx-auto px-4 sm:px-6">

            {/* Big testimonial pull quote */}
            <FadeUp className="max-w-3xl mx-auto text-center mb-14">
              <div className="relative p-8 sm:p-12 rounded-2xl border border-border bg-card overflow-hidden">
                {/* Decorative quotes */}
                <div className="absolute top-4 left-6 text-6xl text-primary/10 font-serif leading-none select-none">"</div>
                <div className="absolute bottom-4 right-6 text-6xl text-primary/10 font-serif leading-none select-none rotate-180">"</div>
                <p className="relative text-lg sm:text-xl md:text-2xl font-medium leading-relaxed text-foreground italic mb-6">
                  Nirikshan AI transformed our quality inspection process — what used to take hours of manual review now happens in real-time with greater accuracy.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm">OD</div>
                  <div className="text-left">
                    <p className="font-semibold text-sm">Operations Director</p>
                    <p className="text-xs text-muted-foreground">Enterprise Manufacturing Client</p>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Partner logos */}
            <FadeUp>
              <p className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Clients &amp; Partners</p>
              <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4 max-w-4xl mx-auto items-center">
                {partners.map((partner) => {
                  const card = (
                    <div className="flex items-center justify-center p-3 sm:p-4 rounded-xl border border-border bg-card/80 aspect-square hover:border-primary/30 hover:shadow-md transition-all duration-300 group">
                      <img
                        src={partner.src}
                        alt={partner.name}
                        loading="lazy"
                        className="w-full h-full object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300 dark:brightness-90"
                      />
                    </div>
                  );
                  return partner.url ? (
                    <a key={partner.name} href={partner.url} target="_blank" rel="noopener noreferrer" title={partner.name}>{card}</a>
                  ) : (
                    <div key={partner.name} title={partner.name}>{card}</div>
                  );
                })}
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            7. CTA — bold, minimal
        ══════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto rounded-2xl border border-primary/20 relative overflow-hidden"
            >
              {/* Background glows */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-primary/8 blur-[80px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-56 h-56 rounded-full bg-violet-500/8 blur-[80px] animate-pulse" style={{ animationDelay: "1.5s" }} />
              </div>
              <div className="relative p-8 sm:p-14 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-semibold mb-5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Start your AI journey today
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                  Ready to Transform Your<br className="hidden sm:block" /> Business with{" "}
                  <span className="text-gradient">Intelligent AI?</span>
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-8">
                  Join forward-thinking enterprises already using Nirikshan AI to build faster, smarter, and at scale.
                </p>
                {/* Checklist */}
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8">
                  {["Free AI Readiness Assessment", "No long-term contracts", "Results in 4–6 weeks"].map((item) => (
                    <span key={item} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      {item}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link to="/contact">
                    <Button size="lg" className="gradient-primary text-primary-foreground px-8 h-12 text-base font-semibold border-0 w-full sm:w-auto">
                      Request a Demo
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
                    Talk to our AI experts →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <section className="py-6 sm:py-8 overflow-hidden">
        <InfiniteTextMarquee text="Nirikshan AI" link="/contact" speed={25} tooltipText="Enterprise AI Solutions" fontSize="6rem" />
      </section>

      <Footer />
    </div>
  );
};

export default Index;
