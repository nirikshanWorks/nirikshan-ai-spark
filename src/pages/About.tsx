import { SEO } from "@/components/SEO";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { WorldMap } from "@/components/ui/map";
import { HeroParticles } from "@/components/HeroParticles";
import { FloatingElements } from "@/components/FloatingElements";
import {
  ArrowRight,
  Award,
  BarChart3,
  Briefcase,
  Eye,
  Flag,
  Globe2,
  Layers,
  ShieldCheck,
  Smile,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────── */
/*  Animated counter                                        */
/* ─────────────────────────────────────────────────────── */
const AnimatedCounter = ({
  end,
  duration = 2000,
}: {
  end: number;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollAnimation(0.5);

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isVisible, end, duration]);

  return <span ref={ref as React.RefObject<HTMLSpanElement>}>{count}</span>;
};

/* ─────────────────────────────────────────────────────── */
/*  Data                                                    */
/* ─────────────────────────────────────────────────────── */
const differentiators = [
  {
    icon: Globe2,
    tag: "01 — Global",
    title: "Global Mindset, Local Delivery",
    description:
      "Hybrid squads blend global expertise with local cultural fluency so programs land smoothly in every market we serve.",
    highlight: "Markets across 5 continents",
    color: "from-blue-500 to-cyan-500",
    bg: "from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/40",
  },
  {
    icon: ShieldCheck,
    tag: "02 — Security",
    title: "Secure by Design",
    description:
      "Security architects embed governance, compliance, and data privacy accelerators into every solution from day zero.",
    highlight: "Zero-trust architecture by default",
    color: "from-violet-500 to-purple-500",
    bg: "from-violet-50 to-purple-50 dark:from-violet-950/40 dark:to-purple-950/40",
  },
  {
    icon: Layers,
    tag: "03 — Full-Stack",
    title: "Full-Stack Innovation",
    description:
      "From strategy to design, engineering, and AI operations, cross-functional pods accelerate outcomes end to end.",
    highlight: "Strategy → Design → Engineering → AI Ops",
    color: "from-orange-500 to-amber-500",
    bg: "from-orange-50 to-amber-50 dark:from-orange-950/40 dark:to-amber-950/40",
  },
  {
    icon: BarChart3,
    tag: "04 — Results",
    title: "Proof in Performance",
    description:
      "Transparent KPIs, ROI scorecards, and executive dashboards keep momentum measurable and decisions data-backed.",
    highlight: "95% client satisfaction rate",
    color: "from-emerald-500 to-teal-500",
    bg: "from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40",
  },
];

const milestones = [
  {
    year: "2024",
    title: "The Beginning",
    description:
      "Our journey started with the Sochilhive community — organising hackathons and teaching events that sparked creativity and collaboration among aspiring developers.",
    color: "bg-blue-500",
    ring: "ring-blue-500/30",
  },
  {
    year: "Late 2024",
    title: "Birth of Nirikshan AI",
    description:
      "As our vision expanded beyond events, we rebranded to Nirikshan AI and began crafting AI-powered solutions that put purposeful technology into people's hands.",
    color: "bg-violet-500",
    ring: "ring-violet-500/30",
  },
  {
    year: "2025",
    title: "Incorporation",
    description:
      "Nirikshan AI Private Limited was officially established, marking our evolution from a student-led initiative into a registered technology company with global ambitions.",
    color: "bg-orange-500",
    ring: "ring-orange-500/30",
  },
  {
    year: "2025 Onwards",
    title: "Expanding Horizons",
    description:
      "We started partnering with national and international clients, delivering impactful AI solutions that bridge research, innovation, and real-world applications.",
    color: "bg-emerald-500",
    ring: "ring-emerald-500/30",
  },
];

/* ─────────────────────────────────────────────────────── */
/*  Component                                               */
/* ─────────────────────────────────────────────────────── */
const About = () => {
  const statsRef = useScrollAnimation(0.3);
  const timelineRef = useScrollAnimation(0.2);
  const [revealedMilestones, setRevealedMilestones] = useState(0);

  useEffect(() => {
    if (!timelineRef.isVisible) return;
    if (revealedMilestones >= milestones.length) return;
    const timer = setTimeout(() => {
      setRevealedMilestones((prev) => Math.min(prev + 1, milestones.length));
    }, 500);
    return () => clearTimeout(timer);
  }, [timelineRef.isVisible, revealedMilestones, milestones.length]);

  return (
    <div className="min-h-screen">
      <SEO
        title="About Us — Nirikshan AI"
        description="Learn about Nirikshan AI's mission, values, and the team driving AI innovation across industries worldwide."
        canonical="https://nirikshanai.com/about"
      />
      <Navigation />

      <main className="pt-16">

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="relative h-[420px] md:h-[520px] overflow-hidden">
          <video
            src="https://res.cloudinary.com/dch0uyw8e/video/upload/v1760826173/6_wrsepd.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-900/70 to-slate-900/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
          <HeroParticles />
          <FloatingElements count={6} />

          <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white/90 text-sm font-medium mb-6">
                <Sparkles size={14} className="text-accent animate-pulse" />
                <span>AI-First Innovation Company</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 leading-tight">
                About{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                  Nirikshan AI
                </span>
              </h1>
              <p className="text-base md:text-lg text-white/80 max-w-xl leading-relaxed">
                Specialists in OpenCV, Generative AI, and Agentic AI —
                crafting intelligent systems that combine vision, reasoning,
                and autonomy for enterprises worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* ── STATS BAR ────────────────────────────────────── */}
        <section
          className="py-14 bg-gradient-to-br from-slate-900 to-slate-800"
          ref={statsRef.ref}
        >
          <div className="container mx-auto px-6">
            <div
              className={`grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-white/10 transition-all duration-1000 ${
                statsRef.isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {[
                { value: 50, suffix: "+", label: "Projects Completed", icon: Briefcase },
                { value: 30, suffix: "+", label: "Happy Clients", icon: Smile },
                { value: 95, suffix: "%", label: "Success Rate", icon: TrendingUp },
                { value: 5, suffix: "", label: "Countries Served", icon: Flag },
              ].map((stat, idx) => (
                <div key={idx} className="text-center md:px-8">
                  <div className="text-5xl sm:text-6xl font-black text-white mb-1 tabular-nums">
                    <AnimatedCounter end={stat.value} />
                    <span className="text-accent">{stat.suffix}</span>
                  </div>
                  <p className="text-white/50 text-sm font-medium uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MISSION / VISION ─────────────────────────────── */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-6">
            {/* Section label */}
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide mb-3">
                Who We Are
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">
                Purpose & Direction
              </h2>
            </div>

            {/* Two panels */}
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Mission */}
              <div className="relative rounded-3xl overflow-hidden border border-blue-200/40 dark:border-blue-900/40 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-8 lg:p-10">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-violet-500 rounded-l-3xl" />
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <Target className="text-white" size={20} />
                  </div>
                  <span className="text-xs uppercase tracking-widest font-semibold text-blue-600 dark:text-blue-400">
                    Our Mission
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4 leading-snug">
                  Making AI simple,{" "}
                  <span className="text-blue-600 dark:text-blue-400">
                    affordable & useful
                  </span>{" "}
                  for every business
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm md:text-base">
                  We're here to bring the power of AI to everyone — not just
                  the big players. Think of us as your local AI partner, making
                  smart technology practical for businesses of any size.
                </p>
                <ul className="space-y-2.5">
                  {[
                    "No corporate jargon, just real solutions",
                    "Tailored to your industry & goals",
                    "Genuine partnership, not vendor lock-in",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle2 size={16} className="text-blue-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Vision */}
              <div className="relative rounded-3xl overflow-hidden border border-violet-200/40 dark:border-violet-900/40 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 p-8 lg:p-10">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-violet-500 to-pink-500 rounded-l-3xl" />
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-violet-500 flex items-center justify-center flex-shrink-0">
                    <Eye className="text-white" size={20} />
                  </div>
                  <span className="text-xs uppercase tracking-widest font-semibold text-violet-600 dark:text-violet-400">
                    Our Vision
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4 leading-snug">
                  AI as a{" "}
                  <span className="text-violet-600 dark:text-violet-400">
                    practical tool
                  </span>{" "}
                  for every enterprise
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm md:text-base">
                  To be the global leader in AI-powered business transformation,
                  recognised for turning visionary ideas into tangible,
                  measurable outcomes — across startups and established enterprises.
                </p>
                <ul className="space-y-2.5">
                  {[
                    "Global leader in AI transformation",
                    "Barriers of complexity removed",
                    "Data-backed decisions at every level",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle2 size={16} className="text-violet-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── CORE VALUES ──────────────────────────────────── */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide mb-3">
                What Guides Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">Core Values</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Users,
                  title: "Client-Centric",
                  desc: "Your success is our success. Every solution is tailored to deliver measurable value and exceed expectations.",
                  color: "text-blue-500",
                  bg: "bg-blue-500/10",
                },
                {
                  icon: Award,
                  title: "Excellence",
                  desc: "We maintain the highest standards — from code quality to delivery. Excellence is a continuous commitment, not a destination.",
                  color: "text-violet-500",
                  bg: "bg-violet-500/10",
                },
                {
                  icon: Zap,
                  title: "Innovation",
                  desc: "We stay at the forefront of AI advancements, creating forward-thinking solutions that keep our partners ahead of the curve.",
                  color: "text-amber-500",
                  bg: "bg-amber-500/10",
                },
              ].map((value) => (
                <div
                  key={value.title}
                  className="group p-8 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl ${value.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <value.icon className={`${value.color}`} size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MID-PAGE CTA STRIP ───────────────────────────── */}
        <section className="py-14 bg-gradient-to-r from-primary/90 to-accent/90">
          <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">
                Ready to transform with AI?
              </h3>
              <p className="text-white/75 text-sm">
                Book a free 30-minute AI readiness call — no strings attached.
              </p>
            </div>
            <Link to="/contact" className="flex-shrink-0">
              <Button
                size="lg"
                variant="secondary"
                className="font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Book Free Call
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
          </div>
        </section>

        {/* ── DIFFERENTIATORS ──────────────────────────────── */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-6">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-3">
                <Sparkles size={14} />
                Why Partners Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">
                The Nirikshan Advantage
              </h2>
            </div>

            <div className="space-y-5">
              {differentiators.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`group flex flex-col sm:flex-row gap-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-br ${item.bg} border border-transparent hover:border-primary/20 transition-all duration-300`}
                >
                  {/* Icon + tag */}
                  <div className="flex-shrink-0 flex sm:flex-col items-center sm:items-start gap-4 sm:gap-2 sm:w-36">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}
                    >
                      <item.icon className="text-white" size={22} />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      {item.tag}
                    </span>
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      {item.description}
                    </p>
                    <span
                      className={`inline-block text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${item.color} text-white`}
                    >
                      {item.highlight}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TIMELINE ─────────────────────────────────────── */}
        <section
          className="py-20 bg-secondary/20"
          ref={timelineRef.ref}
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide mb-3">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Milestones on Our Journey
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
                From a student-led community to a global AI company — in
                under two years.
              </p>
            </div>

            {/* Timeline */}
            <div className="relative max-w-2xl mx-auto">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary opacity-30" />

              <div className="space-y-8">
                <AnimatePresence>
                  {milestones.map((milestone, idx) => {
                    if (idx >= revealedMilestones) return null;
                    return (
                      <motion.div
                        key={milestone.year}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        className="relative pl-16"
                      >
                        {/* Dot */}
                        <div
                          className={`absolute left-3.5 top-4 w-5 h-5 rounded-full ${milestone.color} ring-4 ${milestone.ring} bg-white flex items-center justify-center shadow-sm`}
                        >
                          <div className="w-2 h-2 rounded-full bg-white" />
                        </div>

                        {/* Card */}
                        <div className="rounded-2xl bg-card border border-border p-5 shadow-sm hover:shadow-md transition-shadow">
                          <span
                            className={`inline-block text-xs font-bold px-3 py-1 rounded-full text-white ${milestone.color} mb-3`}
                          >
                            {milestone.year}
                          </span>
                          <h3 className="text-lg font-bold mb-1.5">
                            {milestone.title}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {milestone.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* ── WORLD MAP ────────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary mb-2">
                Global Presence
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
                Our{" "}
                <span className="text-gradient">Worldwide</span> Network
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
                Connecting with clients and partners across continents to
                deliver AI-powered solutions globally.
              </p>
            </div>
            <div className="max-w-5xl mx-auto rounded-2xl border border-border bg-secondary/20 overflow-hidden p-2 sm:p-4">
              <WorldMap
                dots={[
                  {
                    start: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
                    end: { lat: -26.2041, lng: 28.0473, label: "South Africa" },
                  },
                  {
                    start: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
                    end: { lat: 1.3521, lng: 103.8198, label: "Singapore" },
                  },
                  {
                    start: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
                    end: { lat: 40.7128, lng: -74.006, label: "New York" },
                  },
                  {
                    start: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
                    end: { lat: 51.5074, lng: -0.1278, label: "London" },
                  },
                  {
                    start: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
                    end: { lat: 25.2048, lng: 55.2708, label: "Dubai" },
                  },
                ]}
                lineColor="hsl(var(--primary))"
                showLabels={
                  typeof window !== "undefined" && window.innerWidth > 640
                }
              />
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ───────────────────────────────────── */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/8 via-transparent to-violet-500/8" />
          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Join Us on This Journey
              </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto rounded-full mb-6" />
              <p className="text-muted-foreground mb-10 text-sm md:text-base max-w-lg mx-auto">
                Whether you're looking for a technology partner or want to be
                part of our team, we'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="gradient-primary hover:shadow-lg hover:shadow-primary/30 transition-all w-full sm:w-auto"
                  >
                    Get in Touch
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                </Link>
                <Link to="/careers">
                  <Button
                    size="lg"
                    variant="outline"
                    className="hover:bg-secondary transition-all w-full sm:w-auto"
                  >
                    Explore Careers
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
