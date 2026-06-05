import { SEO } from "@/components/SEO";
import React from "react";

import partnerMadapet from "@/assets/partners/madapet.png";
import partnerVB from "@/assets/partners/vb.png";
import partnerMDJKS from "@/assets/partners/mdjks.png";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { AICircuitLines } from "@/components/AICircuitLines";
import { AIHexagonGrid } from "@/components/AIHexagonGrid";
import { AI3DCube } from "@/components/AI3DCube";
import { AIWaveField } from "@/components/AIWaveField";
import { AIParticleRing } from "@/components/AIParticleRing";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { AnimatedGridBg } from "@/components/AnimatedGridBg";
import { TypingText } from "@/components/TypingText";
import { RotatingKeywords } from "@/components/RotatingKeywords";
import { AIServicesStrip } from "@/components/AIServicesStrip";
import { FadeUp, SlideLeft, SlideRight, StaggerContainer, StaggerItem } from "@/components/ScrollAnimations";
import { motion } from "framer-motion";

import { InfiniteTextMarquee } from "@/components/ui/infinite-text-marquee";
import { InteractiveCVShowcase } from "@/components/InteractiveCVShowcase";
import {
  ArrowRight, Brain, Eye, Bot, Building2, Activity,
  TrendingUp, FileText, CheckCircle2,
  Lightbulb, Code2, Rocket, Quote, Cpu, Scan, Sparkles, Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ─── Data ─── */
const capabilities = [
  {
    icon: Eye,
    title: "Computer Vision",
    highlight: "OpenCV · YOLO · Deep Learning",
    desc: "Real-time object detection, visual inspection, and pattern recognition — from factory floors to surveillance systems.",
    accent: "from-violet-500/15 to-fuchsia-500/15",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-500",
  },
  {
    icon: Brain,
    title: "Generative AI",
    highlight: "LLMs · RAG · Content Synthesis",
    desc: "Custom AI models that generate insights, automate content creation, and power intelligent document understanding.",
    accent: "from-blue-500/15 to-cyan-500/15",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    icon: Bot,
    title: "AI Agent Development",
    highlight: "Multi-Step · Autonomous · Agentic",
    desc: "Autonomous workflows that reason, plan, and execute complex multi-step tasks across your business systems 24/7.",
    accent: "from-emerald-500/15 to-teal-500/15",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
  },
  {
    icon: Activity,
    title: "Machine Learning",
    highlight: "Predictive · Adaptive · Scalable",
    desc: "Advanced ML models that uncover hidden patterns, forecast outcomes, and continuously improve from new data.",
    accent: "from-amber-500/15 to-orange-500/15",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-500",
  },
  {
    icon: Cpu,
    title: "AI Automation",
    highlight: "Pipelines · Integration · MLOps",
    desc: "End-to-end automation of data pipelines, model deployment, and operational workflows with production-grade reliability.",
    accent: "from-rose-500/15 to-pink-500/15",
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-500",
  },
  {
    icon: Lightbulb,
    title: "AI Consulting",
    highlight: "Strategy · Roadmaps · Audits",
    desc: "Expert strategic guidance on AI readiness, implementation planning, and digital transformation tailored to your industry.",
    accent: "from-indigo-500/15 to-purple-500/15",
    iconBg: "bg-indigo-500/10",
    iconColor: "text-indigo-500",
  },
];

const useCases = [
  { icon: Eye, title: "Visual Inspection & Quality Monitoring", desc: "Automated defect detection and quality assurance using deep learning vision models." },
  { icon: Activity, title: "Automated Decision Support", desc: "AI-driven recommendations that accelerate decision cycles and reduce human error." },
  { icon: TrendingUp, title: "Predictive Outcomes & Alerts", desc: "Forecast demand, risk, and anomalies before they impact your operations." },
  { icon: FileText, title: "Insight Generation from Unstructured Data", desc: "Extract actionable intelligence from documents, images, and complex datasets." },
];

// Trust metrics are now embedded in the hero stats bar for immediate visibility

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

const processSteps = [
  { icon: Lightbulb, step: "01", title: "Define Problem", desc: "We analyze your business challenges and identify where AI creates the highest impact." },
  { icon: Building2, step: "02", title: "Prepare Data", desc: "Clean, structure, and enrich your data to fuel accurate, reliable AI models." },
  { icon: Code2, step: "03", title: "Build Solution", desc: "Develop, train, and validate custom AI systems tailored to your domain." },
  { icon: Rocket, step: "04", title: "Deliver & Support", desc: "Deploy to production with monitoring, optimization, and ongoing support." },
];

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
            {
              "@type": "WebSite",
              name: "Nirikshan AI",
              url: "https://nirikshanai.com"
            }
          ]
        }}
      />
      <Navigation />

      <main className="relative z-10">
        {/* ── HERO ── */}
        <section className="relative overflow-hidden pt-24 pb-6 md:pt-32 md:pb-10">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="relative w-full rounded-xl border border-border bg-card/80 backdrop-blur overflow-hidden">
              <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" size={300} />
              
              <div className="flex flex-col md:flex-row">
                {/* Left content */}
                <div className="flex-1 p-6 sm:p-8 md:p-12 relative z-10 flex flex-col justify-center">
                  {/* Domain Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 border border-primary/20 text-xs sm:text-sm font-medium text-primary w-fit mb-4 sm:mb-5"
                  >
                    <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Computer Vision · Generative AI · AI Automation
                  </motion.div>
                  
                  {/* Headline with Rotating Keywords */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight"
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
                  
                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-4 sm:mt-5 text-muted-foreground max-w-xl text-sm sm:text-base md:text-lg leading-relaxed"
                  >
                    From <strong className="text-foreground">computer vision</strong> that inspects at scale, to <strong className="text-foreground">generative AI</strong> that creates insights, and <strong className="text-foreground">autonomous agents</strong> that execute — we deliver end-to-end AI solutions for enterprises.
                  </motion.p>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.55 }}
                    className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 pt-5 sm:pt-6"
                  >
                    <Link to="/contact">
                      <Button size="lg" className="gradient-primary text-primary-foreground px-6 sm:px-8 h-10 sm:h-12 text-sm sm:text-base font-semibold border-0 w-full sm:w-auto">
                        Get AI Consultation
                        <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                      </Button>
                    </Link>
                    <Link to="/expertise">
                      <Button size="lg" variant="outline" className="h-10 sm:h-12 px-6 sm:px-8 text-sm sm:text-base border-border hover:bg-secondary w-full sm:w-auto">
                        Explore Our AI Expertise
                      </Button>
                    </Link>
                  </motion.div>

                  {/* Quick Domain Tags */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="flex flex-wrap gap-2 mt-5 sm:mt-6"
                  >
                    {[
                      { icon: Eye, label: "OpenCV & Vision" },
                      { icon: Brain, label: "LLMs & Gen AI" },
                      { icon: Bot, label: "AI Agents" },
                      { icon: Cpu, label: "ML Automation" },
                    ].map((tag) => (
                      <span
                        key={tag.label}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary/80 text-[11px] sm:text-xs font-medium text-muted-foreground border border-border/50"
                      >
                        <tag.icon className="w-3 h-3 text-primary/70" />
                        {tag.label}
                      </span>
                    ))}
                  </motion.div>
                </div>

                {/* Right – 3D Spline scene */}
                <div className="flex-1 relative h-[250px] sm:h-[300px] md:h-auto md:min-h-[480px]">
                  <SplineScene 
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full"
                  />
                  <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-primary/90 backdrop-blur-sm border border-primary-foreground/20 shadow-lg">
                    <p className="text-primary-foreground text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap">
                      <TypingText text="Building the Future with AI 🚀" />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
            >
              {[
                { value: "20+", label: "AI Projects Delivered", icon: Rocket },
                { value: "99.9%", label: "Model Uptime", icon: Activity },
                { value: "5+", label: "Enterprise Clients", icon: Building2 },
                { value: "3x", label: "Avg. ROI Improvement", icon: TrendingUp },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border bg-card/60 backdrop-blur-sm"
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-primary/10 flex-shrink-0">
                    <stat.icon className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div>
                    <div className="text-lg md:text-xl font-bold text-gradient leading-none">
                      {stat.value}
                    </div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── AI Services At-a-Glance Strip ── */}
        <AIServicesStrip />

        {/* ── Computer Vision Visual Showcase ── */}
        <section className="py-20 md:py-28 relative overflow-hidden bg-secondary/20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,119,198,0.15),transparent_70%)] pointer-events-none"></div>
          <div className="container mx-auto px-6 relative z-10">
            <FadeUp className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                <Eye className="w-4 h-4" />
                Computer Vision Expertise
              </div>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                See the Unseen with <span className="text-gradient">Intelligent Vision</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We build deep learning visual systems that instantly detect, track, and analyze objects in real-time. Experience how our AI processes raw camera feeds into actionable intelligence.
              </p>
            </FadeUp>
            
            <FadeUp delay={0.2} className="w-full max-w-6xl mx-auto">
              <InteractiveCVShowcase />
            </FadeUp>
          </div>
        </section>

        {/* ── 2. What We Do ── */}
        <section className="py-20 md:py-28 bg-secondary/30">
          <div className="container mx-auto px-6">
            <FadeUp className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">What We Do</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">From Raw Data to <span className="text-gradient">Real Impact</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                We solve the hardest enterprise challenges with purpose-built AI — here's how.
              </p>
            </FadeUp>

            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto" staggerDelay={0.1}>
              {[
                {
                  icon: Eye,
                  title: "Visual Intelligence",
                  problem: "Manual quality checks miss defects and slow production.",
                  solution: "Computer Vision detects, classifies, and inspects in real-time with 99%+ accuracy.",
                  accent: "from-violet-500/15 to-fuchsia-500/15",
                  iconBg: "bg-violet-500/10",
                  iconColor: "text-violet-500",
                },
                {
                  icon: Brain,
                  title: "Generative AI",
                  problem: "Teams waste hours extracting insights from unstructured data.",
                  solution: "LLMs synthesize reports, answer queries, and generate actionable intelligence instantly.",
                  accent: "from-blue-500/15 to-cyan-500/15",
                  iconBg: "bg-blue-500/10",
                  iconColor: "text-blue-500",
                },
                {
                  icon: Bot,
                  title: "AI Agents",
                  problem: "Repetitive multi-step workflows drain skilled human resources.",
                  solution: "Autonomous agents reason, plan, and execute complex tasks across your systems 24/7.",
                  accent: "from-emerald-500/15 to-teal-500/15",
                  iconBg: "bg-emerald-500/10",
                  iconColor: "text-emerald-500",
                },
                {
                  icon: TrendingUp,
                  title: "Predictive Analytics",
                  problem: "Decisions rely on lagging indicators and gut instinct.",
                  solution: "ML models forecast demand, detect anomalies, and surface risks before they escalate.",
                  accent: "from-amber-500/15 to-orange-500/15",
                  iconBg: "bg-amber-500/10",
                  iconColor: "text-amber-500",
                },
              ].map((item) => (
                <StaggerItem key={item.title}>
                  <div className={`h-full p-6 rounded-xl border border-border bg-gradient-to-br ${item.accent} backdrop-blur-sm flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ai-border-glow`}>
                    {/* Icon */}
                    <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${item.iconBg} mb-4`}>
                      <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-semibold mb-3">{item.title}</h3>

                    {/* Problem */}
                    <div className="mb-3">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-destructive/80 mb-1">Challenge</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.problem}</p>
                    </div>

                    {/* Solution */}
                    <div className="mt-auto pt-3 border-t border-border/50">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-primary mb-1">AI Solution</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.solution}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ── 3. Capabilities ── */}
        <section className="py-20 md:py-28 relative">
          <AIHexagonGrid className="opacity-30" />
          <AIWaveField className="opacity-20" />
          <div className="container mx-auto px-6 relative z-10">
            <FadeUp className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Core Capabilities</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Full-Stack <span className="text-gradient">AI Expertise</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Every capability you need to go from idea to production-grade AI — under one roof.</p>
            </FadeUp>

            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto" staggerDelay={0.1}>
              {capabilities.map((cap) => (
                <StaggerItem key={cap.title}>
                  <div className={`h-full p-6 rounded-xl border border-border bg-gradient-to-br ${cap.accent} backdrop-blur-sm flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ai-border-glow`}>
                    {/* Icon */}
                    <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${cap.iconBg} mb-4`}>
                      <cap.icon className={`w-5 h-5 ${cap.iconColor}`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-semibold mb-1.5">{cap.title}</h3>

                    {/* Tech highlight */}
                    <p className="text-[11px] font-mono font-medium text-primary/70 tracking-wide mb-3">{cap.highlight}</p>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mt-auto">{cap.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ── 4. Use Cases ── */}
        <section className="py-20 md:py-28 relative bg-secondary/20">
          <AICircuitLines className="opacity-20" />
          <AnimatedGridBg className="opacity-15" />
          <div className="absolute -right-20 top-10 opacity-15 hidden xl:block">
            <AIParticleRing size={200} particleCount={30} />
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <FadeUp>
              <div className="text-center mb-16">
                <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">Use Cases</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Real-World <span className="text-gradient">Applications</span></h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Measurable outcomes across industries and domains.</p>
              </div>
            </FadeUp>

            <StaggerContainer className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto" staggerDelay={0.12}>
              {useCases.map((uc) => (
                <StaggerItem key={uc.title}>
                  <div className="relative p-6 rounded-xl border border-border bg-card overflow-hidden group hover:-translate-y-1 transition-transform duration-300 ai-border-glow">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-primary/10">
                        <uc.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{uc.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{uc.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ── 5. Trust & Proof ── */}
        <section className="py-20 md:py-28 relative">
          <AIWaveField className="opacity-10" />
          <div className="container mx-auto px-6">
            <FadeUp className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Trust & Proof</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by <span className="text-gradient">Forward-Thinking</span> Organizations</h2>
            </FadeUp>

            {/* Testimonial */}
            <FadeUp className="max-w-3xl mx-auto mb-16">
              <div className="p-8 rounded-xl border border-border bg-card text-center ai-glow">
                <Quote className="w-8 h-8 mx-auto mb-4 text-primary/40" />
                <p className="text-lg text-muted-foreground italic leading-relaxed mb-6">
                  "Nirikshan AI transformed our quality inspection process — what used to take hours of manual review now happens in real-time with greater accuracy."
                </p>
                <div>
                  <p className="font-semibold">Operations Director</p>
                  <p className="text-sm text-muted-foreground">Enterprise Manufacturing Client</p>
                </div>
              </div>
            </FadeUp>

            {/* Client logos — static grid */}
            <FadeUp>
              <div className="max-w-5xl mx-auto">
                <p className="text-center text-sm text-muted-foreground mb-8 font-medium uppercase tracking-widest">Our Clients & Partners</p>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-4 md:gap-5 items-center">
                  {partners.map((partner) => {
                    const CardContent = (
                      <div
                        className="flex items-center justify-center p-4 md:p-5 rounded-xl border border-border bg-card/80 aspect-square hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-300 group cursor-pointer w-full h-full"
                      >
                        <img
                          src={partner.src}
                          alt={partner.name}
                          loading="lazy"
                          className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 dark:brightness-90 dark:group-hover:brightness-110"
                        />
                      </div>
                    );

                    return partner.url ? (
                      <a
                        key={partner.name}
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-full"
                        title={`Visit ${partner.name}`}
                      >
                        {CardContent}
                      </a>
                    ) : (
                      <div key={partner.name} className="block w-full h-full" title={partner.name}>
                        {CardContent}
                      </div>
                    );
                  })}
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── 6. How We Work ── */}
        <section className="py-20 md:py-28 relative bg-secondary/20">
          <AIHexagonGrid className="opacity-15" />
          <div className="absolute right-10 bottom-10 opacity-20 hidden lg:block">
            <AI3DCube size={80} />
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <FadeUp className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Our Process</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How We <span className="text-gradient">Work</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">A proven methodology from problem definition to production deployment.</p>
            </FadeUp>

            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto" staggerDelay={0.12}>
              {processSteps.map((step) => (
                <StaggerItem key={step.step}>
                  <div className="relative p-6 rounded-xl border border-border bg-card group hover:-translate-y-2 transition-transform duration-300 ai-border-glow">
                    <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg gradient-primary">
                      {step.step}
                    </div>
                    <div className="mt-4 mb-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary/10">
                        <step.icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ── 7. CTA ── */}
        <section className="py-20 md:py-28 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center space-y-8 p-12 md:p-16 rounded-2xl border border-primary/20 relative overflow-hidden ai-glow">
              {/* Background glow */}
              <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                <div className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full blur-[100px] animate-pulse bg-primary/8" />
                <div className="absolute bottom-0 right-1/4 w-[250px] h-[250px] rounded-full blur-[100px] animate-pulse bg-accent/8" style={{ animationDelay: "1.5s" }} />
              </div>

              <div className="relative">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  Ready to Transform Your Business with{" "}
                  <span className="text-gradient">Intelligent AI?</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
                  Nirikshan AI brings intelligence to every corner of your business. Let's build your future together.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                  <Link to="/contact">
                    <Button
                      size="lg"
                      className="gradient-primary text-primary-foreground px-10 h-12 text-base font-semibold w-full sm:w-auto border-0"
                    >
                      Request Demo
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors text-base font-medium">
                    Contact Sales →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <section className="py-8 overflow-hidden">
        <InfiniteTextMarquee text="Nirikshan AI" link="/contact" speed={25} tooltipText="Let's Build Together 🚀" fontSize="6rem" />
      </section>

      <Footer />
    </div>
  );
};

export default Index;
