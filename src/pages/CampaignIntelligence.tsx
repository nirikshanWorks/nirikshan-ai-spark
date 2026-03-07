import { Navigation } from "@/components/Navigation";
import { SentimentAnalysisDemo } from "@/components/SentimentAnalysisDemo";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeroParticles } from "@/components/HeroParticles";
import { FloatingElements } from "@/components/FloatingElements";
import { AIDataStream } from "@/components/AIDataStream";
import { AIBrainOrb } from "@/components/AIBrainOrb";
import { AnimatedGridBg } from "@/components/AnimatedGridBg";
import {
  ArrowRight,
  Brain,
  BarChart3,
  Users,
  Share2,
  Monitor,
  CheckCircle2,
  Target,
  TrendingUp,
  Globe2,
  Zap,
  Layers,
  Eye,
  Cpu,
  Activity,
  Shield,
  Sparkles,
  Network,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { motion } from "framer-motion";

const services = [
  {
    id: 1,
    icon: Brain,
    color: "from-violet-500 to-purple-600",
    title: "AI Campaign Strategy Intelligence",
    description:
      "We help organizations design data-driven campaign strategies using artificial intelligence. Our AI systems analyze large datasets to identify the most effective messaging and campaign direction.",
    subtitle: "What we analyze:",
    features: [
      "Public sentiment and trending issues",
      "Region-wise political and social priorities",
      "Strong vs weak constituencies",
      "Candidate perception and reputation analytics",
    ],
    narrativeTitle: "Example narratives AI may detect:",
    narratives: [
      "Development and infrastructure",
      "Employment opportunities",
      "Farmer welfare and agriculture support",
      "Youth and entrepreneurship",
    ],
    footer:
      "This allows campaigns to focus on the issues that actually matter to the public.",
  },
  {
    id: 2,
    icon: BarChart3,
    color: "from-blue-500 to-cyan-500",
    title: "AI Data Analytics & Voter Insights",
    description:
      "Our platform works on real data, not assumptions. We combine multiple data sources and apply AI analytics to generate actionable insights.",
    subtitle: "Data sources include:",
    features: [
      "Voter demographics and census data",
      "Booth-level voting patterns",
      "Social media sentiment analysis",
      "Ground survey data collected from field teams",
    ],
    narrativeTitle: "Using AI, we identify:",
    narratives: [
      "Key communities and demographics influencing elections",
      "Geographic regions requiring stronger campaign focus",
      "Issue-based voter behavior patterns",
    ],
    footer:
      "This enables campaigns to make strategic decisions backed by data.",
  },
  {
    id: 3,
    icon: Users,
    color: "from-emerald-500 to-teal-500",
    title: "AI-Powered Ground Campaign Intelligence",
    description:
      "We build intelligent systems that help manage large volunteer networks and field operations.",
    subtitle: "Our AI-powered field intelligence platform supports:",
    features: [
      "Volunteer and booth-level workforce management",
      "Door-to-door campaign tracking",
      "Local event monitoring and reporting",
      "Field-level data collection and analysis",
    ],
    narrativeTitle: null,
    narratives: [],
    footer:
      "AI converts ground-level data into real-time dashboards and insights, helping campaign leaders understand what is happening at the grassroots level.",
  },
  {
    id: 4,
    icon: Share2,
    color: "from-orange-500 to-rose-500",
    title: "AI Social Media & Digital Influence Monitoring",
    description:
      "Nirikshan AI provides advanced tools to monitor and optimize digital campaign performance.",
    subtitle: "Our AI analyzes:",
    features: [
      "Instagram, Facebook, and Twitter engagement trends",
      "Public opinion and sentiment shifts",
      "Viral topics and emerging narratives",
      "Performance of digital campaigns and advertisements",
    ],
    narrativeTitle: "Capabilities include:",
    narratives: [
      "AI-driven content performance analysis",
      "Target audience segmentation",
      "Digital influence monitoring",
      "Real-time perception tracking",
    ],
    footer:
      "This helps campaigns build stronger digital presence and understand public reactions instantly.",
  },
  {
    id: 5,
    icon: Monitor,
    color: "from-indigo-500 to-blue-600",
    title: "AI Campaign Technology Platforms",
    description:
      "We develop custom AI-powered technology platforms to support large-scale campaigns.",
    subtitle: "Our technology solutions include:",
    features: [
      "Volunteer management applications",
      "Campaign performance dashboards",
      "Public survey and feedback systems",
      "Voter data intelligence platforms",
    ],
    narrativeTitle: null,
    narratives: [],
    footer:
      "These platforms integrate AI, data analytics, and real-time monitoring to provide decision-makers with clear and actionable insights.",
  },
];

const stats = [
  { value: "150+", label: "Campaigns Supported", icon: Target },
  { value: "10M+", label: "Data Points Analyzed", icon: BarChart3 },
  { value: "98%", label: "Prediction Accuracy", icon: TrendingUp },
  { value: "12+", label: "States Covered", icon: Globe2 },
];

const capabilities = [
  { icon: Eye, label: "Real-time Monitoring" },
  { icon: Cpu, label: "AI-Powered Analytics" },
  { icon: Layers, label: "Multi-source Data Fusion" },
  { icon: Zap, label: "Instant Insights" },
  { icon: Shield, label: "Secure Intelligence" },
  { icon: Network, label: "Neural Processing" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const CampaignIntelligence = () => {
  const heroRef = useScrollAnimation(0.1);
  const statsRef = useScrollAnimation(0.2);
  const servicesRef = useScrollAnimation(0.1);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-16">
        {/* ── Hero with layered AI visuals ── */}
        <section
          ref={heroRef.ref}
          className="relative overflow-hidden py-28 md:py-40"
        >
          {/* Deep dark gradient base */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-black" />

          {/* Data stream background */}
          <AIDataStream />

          {/* Particle network */}
          <HeroParticles className="opacity-40" />
          <FloatingElements count={10} />

          {/* Animated grid overlay */}
          <AnimatedGridBg />

          {/* Gradient orbs */}
          <motion.div
            className="absolute -top-40 right-[-10%] h-[500px] w-[500px] rounded-full bg-primary/25 blur-[120px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[-20%] left-[-10%] h-[400px] w-[400px] rounded-full bg-accent/20 blur-[100px]"
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-violet-500/10 blur-[150px]"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          <div
            className={`container mx-auto px-6 relative z-10 transition-all duration-1000 ${
              heroRef.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-12 items-center">
              <div>
                {/* Animated badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Badge className="mb-6 bg-white/10 text-white border-white/20 text-sm backdrop-blur-sm">
                    <Sparkles className="mr-1.5 h-3.5 w-3.5 text-cyan-400" />
                    Nirikshan AI — Campaign Intelligence Division
                  </Badge>
                </motion.div>

                <motion.h1
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  AI-Powered Campaign{" "}
                  <span className="relative">
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                      Intelligence Services
                    </span>
                    {/* Animated underline */}
                    <motion.span
                      className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-cyan-400 to-violet-400 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.2, delay: 1 }}
                    />
                  </span>
                </motion.h1>

                <motion.p
                  className="text-lg md:text-xl text-white/70 max-w-3xl mb-10 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Data-driven campaign strategy, voter analytics, ground
                  intelligence, and digital influence monitoring — powered by
                  advanced artificial intelligence.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Link to="/contact">
                    <Button
                      size="lg"
                      className="gradient-primary shadow-lg shadow-primary/30 text-lg px-8 relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center">
                        Get Started <ArrowRight className="ml-2" size={20} />
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-white/10"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                    </Button>
                  </Link>
                  <Link to="/expertise">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10 text-lg px-8 backdrop-blur-sm"
                    >
                      Explore All Expertise
                    </Button>
                  </Link>
                </motion.div>

                {/* Capability pills with stagger */}
                <motion.div
                  className="flex flex-wrap gap-3"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.8 } },
                  }}
                >
                  {capabilities.map((cap) => {
                    const Icon = cap.icon;
                    return (
                      <motion.div
                        key={cap.label}
                        variants={{
                          hidden: { opacity: 0, scale: 0.8 },
                          visible: { opacity: 1, scale: 1 },
                        }}
                        className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-md hover:bg-white/10 hover:border-white/25 transition-all cursor-default"
                      >
                        <Icon size={16} className="text-cyan-400" />
                        {cap.label}
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>

              {/* AI Brain Orb visualization */}
              <motion.div
                className="hidden lg:flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.5 }}
              >
                <div className="relative w-[320px] h-[320px]">
                  <AIBrainOrb className="w-full h-full" />
                  {/* Floating tech labels around the orb */}
                  {[
                    { label: "NLP", x: -30, y: 20 },
                    { label: "ML", x: 280, y: 60 },
                    { label: "CV", x: 30, y: 290 },
                    { label: "DL", x: 250, y: 260 },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      className="absolute text-xs font-mono font-bold text-primary/60 bg-background/10 backdrop-blur-sm border border-primary/20 rounded px-2 py-0.5"
                      style={{ left: item.x, top: item.y }}
                      animate={{
                        opacity: [0.4, 1, 0.4],
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Stats with animated counters ── */}
        <section ref={statsRef.ref} className="py-16 border-b border-border relative overflow-hidden">
          <AnimatedGridBg className="opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
          <motion.div
            className="container mx-auto px-6 relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate={statsRef.isVisible ? "visible" : "hidden"}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    className="text-center group"
                  >
                    <motion.div
                      className="mx-auto mb-3 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-500"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon className="text-primary" size={28} />
                    </motion.div>
                    <motion.div
                      className="text-3xl md:text-4xl font-bold text-foreground"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      {stat.value}
                    </motion.div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {stat.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* ── AI Processing Pipeline ── */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                <Activity className="mr-1.5 h-3 w-3" /> How It Works
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                AI Processing <span className="text-gradient">Pipeline</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                From raw data to actionable insights in real-time
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6 relative">
              {/* Connection line */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

              {[
                { icon: Globe2, title: "Data Collection", desc: "Multi-source data ingestion from social media, surveys, and field operations", step: "01" },
                { icon: Cpu, title: "AI Processing", desc: "Machine learning models analyze patterns, sentiment, and behavioral data", step: "02" },
                { icon: Brain, title: "Intelligence Generation", desc: "Neural networks generate predictive insights and strategic recommendations", step: "03" },
                { icon: Zap, title: "Real-time Delivery", desc: "Instant dashboards and alerts for campaign leadership teams", step: "04" },
              ].map((item, idx) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                >
                  <Card className="relative p-6 text-center border border-border hover:border-primary/40 transition-all duration-500 group hover:shadow-xl hover:shadow-primary/5 bg-card/80 backdrop-blur-sm overflow-hidden">
                    {/* Hover glow */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    <div className="relative z-10">
                      <div className="text-xs font-mono font-bold text-primary/50 mb-4">{item.step}</div>
                      <motion.div
                        className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20 flex items-center justify-center"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <item.icon className="text-primary" size={24} />
                      </motion.div>
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>

                    {/* Animated bottom border */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: idx * 0.2 + 0.5 }}
                    />
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services ── */}
        <section ref={servicesRef.ref} className="py-24 relative overflow-hidden">
          <AnimatedGridBg className="opacity-20" />
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              className="max-w-3xl mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={
                servicesRef.isVisible
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.7 }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                <Sparkles className="mr-1.5 h-3 w-3" /> Our Services
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Campaign Intelligence <span className="text-gradient">Services</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                End-to-end AI solutions for modern campaign management and
                strategic decision-making.
              </p>
            </motion.div>

            <div className="space-y-20">
              {services.map((service, idx) => {
                const Icon = service.icon;
                const isReversed = idx % 2 === 1;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                  >
                    <Card className="relative overflow-hidden border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 group bg-card/80 backdrop-blur-sm">
                      {/* Decorative gradient orb */}
                      <div
                        className={`absolute -top-24 ${
                          isReversed ? "-left-24" : "-right-24"
                        } w-48 h-48 bg-gradient-to-br ${service.color} rounded-full blur-3xl opacity-10 group-hover:opacity-25 transition-opacity duration-700`}
                      />

                      {/* Corner accent */}
                      <motion.div
                        className={`absolute top-0 ${isReversed ? 'left-0' : 'right-0'} w-20 h-20`}
                        style={{
                          background: `radial-gradient(circle at ${isReversed ? '0% 0%' : '100% 0%'}, hsl(var(--primary) / 0.1), transparent 70%)`,
                        }}
                      />

                      <div
                        className={`relative z-10 grid md:grid-cols-[1.1fr_0.9fr] gap-10 p-8 md:p-12 ${
                          isReversed ? "md:[direction:rtl]" : ""
                        }`}
                      >
                        {/* Content side */}
                        <div className="space-y-6" style={{ direction: "ltr" }}>
                          <div className="flex items-start gap-4">
                            <motion.div
                              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg shrink-0`}
                              whileHover={{ rotate: 10, scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <Icon className="text-white" size={30} />
                            </motion.div>
                            <div>
                              <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground">
                                Service {String(service.id).padStart(2, "0")}
                              </span>
                              <h3 className="text-2xl md:text-3xl font-bold mt-1 leading-tight">
                                {service.title}
                              </h3>
                            </div>
                          </div>
                          <p className="text-muted-foreground leading-relaxed text-base">
                            {service.description}
                          </p>
                          <div>
                            <p className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                              <span
                                className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`}
                              />
                              {service.subtitle}
                            </p>
                            <ul className="space-y-2.5">
                              {service.features.map((f, fIdx) => (
                                <motion.li
                                  key={f}
                                  className="flex items-start gap-3 text-sm text-muted-foreground"
                                  initial={{ opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: fIdx * 0.1 }}
                                >
                                  <CheckCircle2
                                    className="text-primary mt-0.5 shrink-0"
                                    size={16}
                                  />
                                  {f}
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Insights side */}
                        <div
                          className="space-y-5 flex flex-col justify-center"
                          style={{ direction: "ltr" }}
                        >
                          {service.narrativeTitle &&
                            service.narratives.length > 0 && (
                              <div className="rounded-2xl bg-secondary/60 border border-border/80 p-6 backdrop-blur">
                                <p className="font-semibold text-sm text-foreground mb-4 flex items-center gap-2">
                                  <Zap size={14} className="text-primary" />
                                  {service.narrativeTitle}
                                </p>
                                <ul className="space-y-2.5">
                                  {service.narratives.map((n) => (
                                    <li
                                      key={n}
                                      className="flex items-start gap-3 text-sm text-muted-foreground"
                                    >
                                      <div
                                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color} mt-1.5 shrink-0`}
                                      />
                                      {n}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          <div
                            className="rounded-2xl border p-6 border-primary/10"
                            style={{
                              background: `linear-gradient(135deg, hsl(var(--primary) / 0.05), hsl(var(--accent) / 0.08))`,
                            }}
                          >
                            <p className="text-sm text-foreground leading-relaxed font-medium">
                              💡 {service.footer}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Bottom accent line */}
                      <div
                        className={`h-1 bg-gradient-to-r ${service.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`}
                      />
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Why Nirikshan AI vs Traditional Consulting ── */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-secondary/20" />
          <AnimatedGridBg className="opacity-15" />

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              className="max-w-4xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                <Brain className="mr-1.5 h-3 w-3" /> Why Nirikshan AI
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                The AI-Powered Alternative to{" "}
                <span className="text-gradient">Traditional Political Consulting</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Traditional political consulting firms such as Indian Political Action Committee rely heavily on large teams, manual surveys, and human-driven strategy. Nirikshan AI brings a technology-first approach, using artificial intelligence, real-time analytics, and intelligent monitoring systems to make campaign decisions faster, smarter, and more scalable.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {[
                {
                  num: "01",
                  title: "AI Instead of Guesswork",
                  traditional: "Traditional consulting depends on manual surveys and strategist intuition.",
                  color: "from-violet-500 to-purple-600",
                  features: [
                    "AI-driven sentiment analysis",
                    "Real-time public opinion monitoring",
                    "Issue detection using machine learning",
                    "Predictive analytics for campaign trends",
                  ],
                  takeaway: "Decisions are based on data patterns, not assumptions.",
                },
                {
                  num: "02",
                  title: "Real-Time Campaign Intelligence",
                  traditional: "Traditional campaigns often rely on weekly reports or delayed field feedback.",
                  color: "from-blue-500 to-cyan-500",
                  features: [
                    "Live dashboards showing campaign performance",
                    "Real-time social media sentiment tracking",
                    "Field activity monitoring from multiple regions",
                    "Instant insights for leadership teams",
                  ],
                  takeaway: "Campaign leaders can adjust strategy instantly instead of waiting days or weeks.",
                },
                {
                  num: "03",
                  title: "AI-Powered Ground Intelligence",
                  traditional: "Traditional firms deploy large field teams to collect information manually.",
                  color: "from-emerald-500 to-teal-500",
                  features: [
                    "Mobile apps for volunteer data collection",
                    "AI analysis of ground-level feedback",
                    "Geo-tagged reporting from field workers",
                    "Automated campaign activity tracking",
                  ],
                  takeaway: "This creates accurate grassroots insights at scale.",
                },
                {
                  num: "04",
                  title: "Advanced Digital Influence Monitoring",
                  traditional: "Traditional consulting firms mainly manage social media marketing manually.",
                  color: "from-orange-500 to-rose-500",
                  features: [
                    "AI-based narrative tracking",
                    "Viral trend detection",
                    "Audience segmentation analysis",
                    "Campaign performance monitoring across platforms",
                  ],
                  takeaway: "Identify emerging narratives before they dominate public discourse.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <Card className="h-full p-8 border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-xl group relative overflow-hidden bg-card/80 backdrop-blur-sm">
                    <div className={`absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br ${item.color} rounded-full blur-3xl opacity-10 group-hover:opacity-25 transition-opacity duration-700`} />

                    {/* Animated corner decoration */}
                    <motion.div
                      className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/20 rounded-tr-lg"
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />

                    <div className="relative z-10 space-y-5">
                      <div className="flex items-center gap-3">
                        <span className={`text-3xl font-black font-mono bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                          {item.num}
                        </span>
                        <h3 className="text-xl font-bold">{item.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground italic border-l-2 border-muted-foreground/30 pl-4">
                        {item.traditional}
                      </p>
                      <div>
                        <p className="text-xs font-bold font-mono uppercase tracking-[0.2em] text-primary mb-3">Nirikshan AI approach:</p>
                        <ul className="space-y-2">
                          {item.features.map((f) => (
                            <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="text-primary mt-0.5 shrink-0" size={15} />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-xl bg-primary/5 border border-primary/10 p-4">
                        <p className="text-sm font-medium text-foreground">💡 {item.takeaway}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Integrated Platform Card */}
            <motion.div
              className="max-w-6xl mx-auto mt-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Card className="p-8 md:p-12 border border-border bg-card/80 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full blur-3xl opacity-10" />
                <AnimatedGridBg className="opacity-10" />
                <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <span className="text-3xl font-black font-mono bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent">05</span>
                    <h3 className="text-2xl font-bold">Integrated AI Technology Platform</h3>
                    <p className="text-sm text-muted-foreground italic border-l-2 border-muted-foreground/30 pl-4">
                      Most consulting firms operate through fragmented tools and manual coordination.
                    </p>
                    <p className="text-xs font-bold font-mono uppercase tracking-[0.2em] text-primary">Nirikshan AI provides a unified platform:</p>
                    <ul className="space-y-2">
                      {[
                        "Campaign analytics dashboards",
                        "Volunteer management systems",
                        "Survey and feedback platforms",
                        "AI-powered public sentiment monitoring",
                      ].map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="text-primary mt-0.5 shrink-0" size={15} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="rounded-xl bg-primary/5 border border-primary/10 p-4">
                      <p className="text-sm font-medium text-foreground">💡 Everything runs inside a single technology ecosystem designed for large-scale campaigns.</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center space-y-6">
                    <h3 className="text-2xl md:text-3xl font-bold">
                      The Future of <span className="text-gradient">Campaign Strategy</span>
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
                      Modern campaigns are no longer driven only by speeches and rallies. They are driven by data, intelligence, and real-time decision systems.
                    </p>
                    <motion.div
                      className="flex flex-wrap justify-center gap-3"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={{
                        visible: { transition: { staggerChildren: 0.1 } },
                      }}
                    >
                      {[
                        "Artificial Intelligence",
                        "Data Analytics",
                        "Ground Intelligence",
                        "Digital Monitoring",
                        "Technology Platforms",
                      ].map((tag) => (
                        <motion.div
                          key={tag}
                          variants={{
                            hidden: { opacity: 0, scale: 0.8 },
                            visible: { opacity: 1, scale: 1 },
                          }}
                        >
                          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5">
                            {tag}
                          </Badge>
                        </motion.div>
                      ))}
                    </motion.div>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                      Nirikshan AI represents the next generation of campaign intelligence — helping organizations understand people, predict trends, and execute smarter campaigns.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* ── Live AI Demo ── */}
        <SentimentAnalysisDemo />

        {/* ── CTA ── */}
        <section className="relative overflow-hidden py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-black" />
          <AIDataStream className="opacity-20" />
          <HeroParticles className="opacity-20" />
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-20 left-1/4 w-72 h-72 rounded-full bg-cyan-500/15 blur-[120px]"
              animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-10 right-1/4 w-64 h-64 rounded-full bg-violet-500/15 blur-[100px]"
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 7, repeat: Infinity }}
            />
          </div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-6 bg-white/10 text-white border-white/20">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Let's Get Started
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                Ready to Transform Your{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  Campaign Strategy
                </span>
                ?
              </h2>
              <p className="text-lg text-white/70 mb-10 leading-relaxed">
                Let Nirikshan AI power your next campaign with data-driven
                intelligence and real-time insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="gradient-primary shadow-lg shadow-primary/30 text-lg px-8"
                  >
                    Talk to an Expert{" "}
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Link to="/case-studies">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 text-lg px-8 backdrop-blur-sm"
                  >
                    View Case Studies
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CampaignIntelligence;
