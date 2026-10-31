import React, { useState } from "react";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Users2,
  GraduationCap,
  Sparkles,
  Globe2,
  Linkedin,
  Milestone,
  Target,
  Rocket,
  CheckCircle2,
  Quote,
  Eye,
  Cpu,
  Layers,
  Terminal,
  Activity
} from "lucide-react";

import anshulImage from "@/assets/team/anshul.png";
import vikramImage from "@/assets/team/vikram-biyani.jpg";
import wwaTeamVideo from "@/assets/wwa-team.mp4";
import { timeline, testimonials } from "./whoWeAreContent";

const values = [
  {
    num: "01",
    title: "Deterministic Integrity",
    description: "We communicate transparently, design deterministic systems, and eliminate probabilistic guesswork from mission-critical operations.",
    icon: ShieldCheck,
    tag: "ETHICS // ZERO_HALLUCINATION"
  },
  {
    num: "02",
    title: "Cross-Disciplinary R&D",
    description: "Machine learning researchers, embedded hardware engineers, and domain specialists co-architect production platforms.",
    icon: Users2,
    tag: "COLLABORATION // FULL_STACK"
  },
  {
    num: "03",
    title: "Continuous Mathematical Rigor",
    description: "We stay curious, experiment boldly on custom neural backbones, and translate academic papers into optimized TensorRT binaries.",
    icon: GraduationCap,
    tag: "RESEARCH // INT8_QUANT"
  },
  {
    num: "04",
    title: "Data Sovereignty & Privacy",
    description: "Every model we engineer guarantees 100% on-premise air-gap execution. Zero proprietary client telemetry leaves the local network.",
    icon: Sparkles,
    tag: "PRIVACY // AIR_GAPPED"
  },
  {
    num: "05",
    title: "Physical-World Impact",
    description: "We measure system success not by synthetic benchmarks, but by verified outcomes on assembly lines, farmlands, and clinical facilities.",
    icon: Globe2,
    tag: "REAL_WORLD // DEPLOYED"
  }
];

const leadership = [
  {
    id: "anshul",
    name: "Anshul",
    role: "Founder & Chief Executive Officer",
    badge: "EXE_DIR // 01 · SYSTEM ARCHITECTURE",
    specialization: "Edge Computer Vision, INT8 Quantization, Embedded CUDA Kernels",
    bio: "Anshul spearheads the overarching vision and deep-tech engineering roadmap at Nirikshan AI. Blending rigorous computer vision research with production hardware instincts, he leads the team in developing high-throughput RTSP decoders, custom YOLO inference engines, and autonomous multi-agent state machines.",
    extendedBio: "Under his leadership, Nirikshan AI has scaled from a university prototype incubator at Dev Bhoomi's IEC Lab into an enterprise-trusted technology company deploying air-gapped vision systems across India's industrial manufacturing and grassroots agritech sectors.",
    quote: "Real-world AI cannot rely on cloud streaming latencies or external socket dependencies. We engineer deterministic vision pipelines that process every high-resolution frame directly on the edge in under 15ms.",
    image: anshulImage,
    linkedin: "https://www.linkedin.com/in/anshultech1"
  },
  {
    id: "vikram",
    name: "CA Vikram Biyani",
    role: "Director – Finance & Corporate Strategy",
    badge: "EXE_DIR // 02 · FISCAL GOVERNANCE",
    specialization: "Capital Allocation, R&D Resource Optimization, Enterprise Governance",
    bio: "CA Vikram Biyani directs Nirikshan AI's fiscal infrastructure, capital efficiency, and strategic enterprise alliances. Combining numerical precision with corporate governance foresight, he ensures that the company's research-heavy engineering initiatives are supported by sustainable financial foundations.",
    extendedBio: "He advises on corporate risk management, strategic procurement of high-performance compute clusters, and maximizing tangible ROI for enterprise deployment partners.",
    quote: "Sustainable deep-tech innovation requires disciplined capital allocation and transparent governance. We build long-term enterprise trust through mathematical fiscal rigor and proven operational value.",
    image: vikramImage,
    linkedin: "https://www.linkedin.com/in/viekram-biyaani-44810817b"
  }
];

export const WhoWeAre = () => {
  const [activeLeader, setActiveLeader] = useState<string>("anshul");
  const currentLeader = leadership.find((l) => l.id === activeLeader) || leadership[0];

  return (
    <div className="min-h-screen bg-ivory dark:bg-charcoal text-charcoal dark:text-ivory selection:bg-sage selection:text-charcoal font-sans">
      <SEO
        title="Who We Are // Leadership, Genesis & Culture | Nirikshan AI"
        description="Discover the team, academic origins, and engineering culture behind Nirikshan AI. From Dev Bhoomi IEC Innovation Lab to production edge AI systems."
        canonical="https://nirikshanai.com/who-we-are"
      />
      <Navigation />

      <main className="relative pt-20">
        {/* ══════════════════════════════════════════════════════
            SECTION 01 — HERO (Technical Editorial Dossier)
        ══════════════════════════════════════════════════════ */}
        <section className="relative border-b border-concrete/40 dark:border-charcoal-border bg-charcoal text-ivory overflow-hidden">
          {/* Subtle Video Background with Dark Technical Filter */}
          <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-luminosity overflow-hidden">
            <video
              src={wwaTeamVideo}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover scale-105"
            />
          </div>
          <div className="absolute inset-0 tech-grid-bg opacity-20 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-20 relative z-10">
            {/* Top Monospace Telemetry Strip */}
            <div className="flex items-center justify-between pb-4 mb-8 border-b border-charcoal-border text-[11px] font-mono tracking-widest text-concrete uppercase">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-sage inline-block animate-pulse" />
                <span>SEC_01 // INSTITUTIONAL IDENTITY &amp; PEOPLE</span>
                <span className="hidden sm:inline">//</span>
                <span className="hidden sm:inline">NIRIKSHAN_AI_PVT_LTD</span>
              </div>
              <div className="flex items-center gap-3">
                <span>EST: 2024 · DEV BHOOMI</span>
                <span>//</span>
                <span className="text-sage font-bold">CIN: U72900UR2023PTC015792</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-6">
                <div className="inline-block px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] bg-charcoal-surface border border-charcoal-border text-sage">
                  ORIGIN STORY <span className="text-burntamber">·</span> APPLIED DEEP TECH R&amp;D
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-display tracking-tight leading-[1.02] text-ivory">
                  Engineered by Curiosity.
                  <br />
                  <span className="font-serif italic font-normal text-concrete">
                    Bound by <span className="text-burntamber">Technical Rigor</span>.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-concrete max-w-2xl leading-relaxed font-sans">
                  Nirikshan AI was founded to turn breakthrough neural network research into dependable, air-gapped software and hardware systems. We bring together researchers, system architects, and industrial engineers to solve high-stakes challenges across manufacturing, defense, and grassroots infrastructure.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <a href="#leadership">
                    <Button className="bg-charcoal text-ivory border border-charcoal-border hover:bg-burntamber hover:border-burntamber hover:text-white text-xs font-mono uppercase tracking-wider px-7 h-12 rounded-none font-bold transition-all shadow-md">
                      Executive Leadership <ArrowRight size={14} className="ml-2" />
                    </Button>
                  </a>
                  <a href="#timeline">
                    <Button variant="outline" className="border-charcoal-border text-ivory hover:border-burntamber hover:text-burntamber hover:bg-burntamber/5 text-xs font-mono uppercase tracking-wider px-7 h-12 rounded-none font-semibold transition-all">
                      Institutional Timeline
                    </Button>
                  </a>
                </div>
              </div>

              {/* Quick Telemetry Summary Tiles */}
              <div className="lg:col-span-4 grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-4 border border-charcoal-border bg-charcoal-surface/90">
                  <div className="text-2xl font-bold font-display text-sage mb-0.5">2024</div>
                  <div className="text-[10px] text-concrete uppercase tracking-wider">GENESIS</div>
                  <p className="mt-1 text-[10px] text-concrete/80 leading-tight">
                    Dev Bhoomi IEC Innovation Lab roots.
                  </p>
                </div>
                <div className="p-4 border border-charcoal-border bg-charcoal-surface/90">
                  <div className="text-2xl font-bold font-display text-ivory mb-0.5">2 LABS</div>
                  <div className="text-[10px] text-concrete uppercase tracking-wider">FACILITIES</div>
                  <p className="mt-1 text-[10px] text-concrete/80 leading-tight">
                    Haridwar Sensor Lab &amp; Dehradun Hub.
                  </p>
                </div>
                <div className="p-4 border border-charcoal-border bg-charcoal-surface/90">
                  <div className="text-2xl font-bold font-display text-burntamber mb-0.5">&lt;15ms</div>
                  <div className="text-[10px] text-concrete uppercase tracking-wider">EDGE LATENCY</div>
                  <p className="mt-1 text-[10px] text-concrete/80 leading-tight">
                    Sub-20ms frame inference guarantee.
                  </p>
                </div>
                <div className="p-4 border border-charcoal-border bg-charcoal-surface/90">
                  <div className="text-2xl font-bold font-display text-sage mb-0.5">100%</div>
                  <div className="text-[10px] text-concrete uppercase tracking-wider">AIR-GAPPED</div>
                  <p className="mt-1 text-[10px] text-concrete/80 leading-tight">
                    Zero public cloud dependency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SECTION 02 — THE INSTITUTIONAL TIMELINE
        ══════════════════════════════════════════════════════ */}
        <section id="timeline" className="py-16 md:py-24 border-b border-concrete/40 dark:border-charcoal-border bg-ivory dark:bg-charcoal">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-concrete/30 dark:border-charcoal-border gap-4">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-sage uppercase block mb-1">
                  SEC_02 // SYSTEM GENESIS &amp; TIMELINE
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-charcoal dark:text-ivory">
                  From Academic Lab
                  <br />
                  to Production Deployments.
                </h2>
              </div>
              <p className="text-xs font-mono text-concrete-dark dark:text-concrete max-w-md">
                CHRONOLOGICAL EVOLUTION OF OUR RESEARCH LAB INTO A LICENSED PRODUCT ENGINEERING FIRM.
              </p>
            </div>

            {/* 5-Stage Brutalist Timeline */}
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {timeline.map((item, idx) => (
                <div
                  key={item.year}
                  className="p-5 border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal-surface flex flex-col justify-between space-y-4 hover:border-sage transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-concrete/20 dark:border-charcoal-border text-[10px] font-mono">
                      <span className="text-sage font-bold">0{idx + 1} //</span>
                      <span className="text-concrete uppercase">{item.year.split("—")[0]}</span>
                    </div>
                    <div className="text-[11px] font-mono text-sage uppercase tracking-wider mb-1">
                      {item.year.split("—")[1] || item.year}
                    </div>
                    <h3 className="text-lg font-bold font-display text-charcoal dark:text-ivory group-hover:text-burntamber transition-colors mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs font-sans text-concrete-dark dark:text-concrete leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-concrete/15 dark:border-charcoal-border text-[9px] font-mono text-concrete flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-sage inline-block" />
                    <span>MILESTONE VERIFIED</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SECTION 03 — EXECUTIVE LEADERSHIP DOSSIER
        ══════════════════════════════════════════════════════ */}
        <section id="leadership" className="py-16 md:py-24 border-b border-concrete/40 dark:border-charcoal-border bg-techlight/30 dark:bg-charcoal-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-concrete/30 dark:border-charcoal-border gap-4">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-sage uppercase block mb-1">
                  SEC_03 // EXECUTIVE LEADERSHIP DOSSIER
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-charcoal dark:text-ivory">
                  Leadership Anchored in
                  <br />
                  Engineering &amp; Governance.
                </h2>
              </div>
              <p className="text-xs font-mono text-concrete-dark dark:text-concrete max-w-md">
                DIRECTORS STEERING DEEP-TECH ALGORITHMIC ARCHITECTURE AND RESPONSIBLE FISCAL EXPANSION.
              </p>
            </div>

            {/* Dossier Selector Switcher */}
            <div className="flex gap-2 mb-8 border-b border-concrete/30 dark:border-charcoal-border pb-3">
              {leadership.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setActiveLeader(l.id)}
                  className={`px-4 py-2 text-xs font-mono uppercase tracking-wider border transition-all ${
                    activeLeader === l.id
                      ? "bg-sage text-charcoal border-sage font-bold shadow-sm"
                      : "border-concrete/40 dark:border-charcoal-border text-concrete-dark dark:text-concrete hover:border-burntamber hover:text-burntamber"
                  }`}
                >
                  {l.name} · {l.role.split("–")[0].split("&")[0].trim()}
                </button>
              ))}
            </div>

            {/* Active Leader Full Technical Dossier Card */}
            <div className="border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal p-6 sm:p-10 shadow-xl">
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Photo Side */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="aspect-[4/5] border border-charcoal/20 dark:border-charcoal-border overflow-hidden bg-charcoal relative">
                    <img
                      src={currentLeader.image}
                      alt={currentLeader.name}
                      className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute bottom-2 left-2 bg-charcoal/90 px-2 py-1 text-[9px] font-mono text-sage border border-charcoal-border">
                      {currentLeader.badge}
                    </div>
                  </div>

                  <div className="p-3 border border-concrete/30 dark:border-charcoal-border bg-techlight dark:bg-charcoal-surface text-xs font-mono">
                    <div className="text-[10px] text-concrete uppercase mb-1">CORE SPECIALIZATION:</div>
                    <div className="text-charcoal dark:text-ivory font-semibold">
                      {currentLeader.specialization}
                    </div>
                  </div>

                  {currentLeader.linkedin && (
                    <a
                      href={currentLeader.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-charcoal dark:text-ivory hover:text-burntamber font-bold transition-colors pt-1"
                    >
                      <Linkedin size={14} />
                      <span>Connect on LinkedIn →</span>
                    </a>
                  )}
                </div>

                {/* Content Side */}
                <div className="lg:col-span-8 space-y-6">
                  <div>
                    <div className="text-xs font-mono text-sage tracking-widest uppercase mb-1">
                      {currentLeader.role}
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-bold font-display text-charcoal dark:text-ivory">
                      {currentLeader.name}
                    </h3>
                  </div>

                  <div className="space-y-4 text-sm font-sans text-concrete-dark dark:text-concrete leading-relaxed">
                    <p>{currentLeader.bio}</p>
                    <p>{currentLeader.extendedBio}</p>
                  </div>

                  {/* Executive Directive Quote */}
                  <div className="p-5 border-l-4 border-sage bg-techlight dark:bg-charcoal-surface border border-concrete/20 dark:border-charcoal-border">
                    <div className="text-[10px] font-mono uppercase text-sage font-bold tracking-widest mb-1.5 flex items-center gap-2">
                      <Quote size={12} />
                      <span>EXECUTIVE DIRECTIVE</span>
                    </div>
                    <p className="font-serif italic text-base sm:text-lg text-charcoal dark:text-ivory leading-relaxed">
                      "{currentLeader.quote}"
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-4 text-xs font-mono text-concrete">
                    <span>SECURITY CLEARANCE: VERIFIED</span>
                    <span>//</span>
                    <span className="text-sage">MCA GOVERNANCE ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SECTION 04 — PURPOSE & OPERATIONAL CHARTER
        ══════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 border-b border-concrete/40 dark:border-charcoal-border bg-ivory dark:bg-charcoal">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Mission */}
              <div className="p-8 border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal-surface flex flex-col justify-between space-y-6 hover:border-sage transition-all">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-concrete/20 dark:border-charcoal-border text-xs font-mono">
                    <span className="text-sage font-bold">CHARTER_01 // OUR MISSION</span>
                    <Target size={18} className="text-sage" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-display text-charcoal dark:text-ivory">
                    Empowering Physical Operations Through Deterministic AI.
                  </h3>
                  <p className="text-sm font-sans text-concrete-dark dark:text-concrete leading-relaxed">
                    To engineer high-precision, air-gapped computer vision and agentic systems that eliminate latency, guarantee complete data sovereignty, and empower critical industries to operate with continuous intelligence.
                  </p>
                </div>
                <div className="pt-4 border-t border-concrete/15 dark:border-charcoal-border text-xs font-mono text-concrete-dark dark:text-concrete space-y-1.5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-sage" />
                    <span>Zero cloud lock-in or recurring egress fees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-sage" />
                    <span>Sub-20ms edge hardware execution</span>
                  </div>
                </div>
              </div>

              {/* Vision */}
              <div className="p-8 border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal-surface flex flex-col justify-between space-y-6 hover:border-sage transition-all">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-concrete/20 dark:border-charcoal-border text-xs font-mono">
                    <span className="text-burntamber font-bold">CHARTER_02 // OUR VISION</span>
                    <Rocket size={18} className="text-burntamber" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-display text-charcoal dark:text-ivory">
                    Making India a Global Benchmark in Real-World AI Engineering.
                  </h3>
                  <p className="text-sm font-sans text-concrete-dark dark:text-concrete leading-relaxed">
                    To establish a future where every researcher, enterprise, and frontline worker can deploy resilient, air-gapped artificial intelligence to solve concrete physical and economic challenges.
                  </p>
                </div>
                <div className="pt-4 border-t border-concrete/15 dark:border-charcoal-border text-xs font-mono text-concrete-dark dark:text-concrete space-y-1.5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-burntamber" />
                    <span>Academic rigor blended with industrial pragmatism</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-burntamber" />
                    <span>Grassroots technologies scaled to national infrastructure</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SECTION 05 — CORE OPERATING PRINCIPLES
        ══════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 border-b border-concrete/40 dark:border-charcoal-border bg-techlight/30 dark:bg-charcoal">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-concrete/30 dark:border-charcoal-border gap-4">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-sage uppercase block mb-1">
                  SEC_05 // CORE OPERATING PRINCIPLES
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-charcoal dark:text-ivory">
                  Values That Shape Our Culture.
                </h2>
              </div>
              <p className="text-xs font-mono text-concrete-dark dark:text-concrete max-w-md">
                NON-NEGOTIABLE ENGINEERING STANDARDS ANCHORING EVERY LINE OF CODE AND HARDWARE HARNESS.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((val) => (
                <div
                  key={val.num}
                  className="p-6 border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal-surface flex flex-col justify-between space-y-4 hover:border-sage transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-concrete/20 dark:border-charcoal-border text-xs font-mono">
                      <span className="text-sage font-bold">{val.num} //</span>
                      <span className="text-[10px] text-concrete">{val.tag}</span>
                    </div>
                    <h3 className="text-xl font-bold font-display text-charcoal dark:text-ivory group-hover:text-burntamber transition-colors mb-2">
                      {val.title}
                    </h3>
                    <p className="text-xs font-sans text-concrete-dark dark:text-concrete leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-concrete/15 dark:border-charcoal-border text-[10px] font-mono text-sage flex items-center gap-1.5 font-bold">
                    <span className="w-1.5 h-1.5 bg-sage inline-block" />
                    <span>STANDARD VERIFIED</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SECTION 06 — INSTITUTIONAL ENDORSEMENTS (Testimonials)
        ══════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 border-b border-concrete/40 dark:border-charcoal-border bg-ivory dark:bg-charcoal">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-concrete/30 dark:border-charcoal-border gap-4">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-sage uppercase block mb-1">
                  SEC_06 // INSTITUTIONAL ENDORSEMENTS
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-charcoal dark:text-ivory">
                  Verified by Research &amp;
                  <br />
                  Enterprise Partners.
                </h2>
              </div>
              <p className="text-xs font-mono text-concrete-dark dark:text-concrete max-w-md">
                FEEDBACK FROM LAB DIRECTORS, ENTERPRISE CTS, AND RESEARCH COLLABORATORS.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="p-6 border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal-surface flex flex-col justify-between space-y-4 hover:border-sage transition-all group"
                >
                  <div className="space-y-3">
                    <Quote size={20} className="text-sage" />
                    <p className="font-serif italic text-sm text-charcoal dark:text-ivory leading-relaxed">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-concrete/20 dark:border-charcoal-border flex items-center gap-3">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-10 h-10 object-cover grayscale group-hover:grayscale-0 transition-all border border-concrete/40"
                    />
                    <div>
                      <div className="text-xs font-mono font-bold text-charcoal dark:text-ivory group-hover:text-burntamber transition-colors">
                        {t.name}
                      </div>
                      <div className="text-[10px] font-mono text-concrete">
                        {t.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SECTION 07 — TECHNICAL CTA
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-28 bg-charcoal text-ivory relative overflow-hidden border-b border-charcoal-border">
          <div className="absolute inset-0 tech-grid-bg opacity-15 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
            <div className="inline-block px-3 py-1 mb-6 text-[10px] font-mono uppercase tracking-[0.2em] bg-charcoal-surface border border-charcoal-border text-sage">
              SEC_07 // RESEARCH PARTNERSHIP PROTOCOL
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-ivory leading-tight max-w-3xl mx-auto mb-6">
              Partner With Our
              <br />
              <span className="font-serif italic font-normal text-concrete">
                Research &amp; Engineering Lab.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-concrete max-w-xl mx-auto leading-relaxed mb-8 font-sans">
              Whether you are an industrial manufacturer seeking automated inspection or an institution looking for research collaborations — our technical team is ready to analyze your requirements.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact">
                <Button className="bg-charcoal text-ivory border border-charcoal-border hover:bg-burntamber hover:border-burntamber hover:text-white text-xs font-mono uppercase tracking-wider px-8 h-12 rounded-none font-bold transition-all shadow-lg">
                  Start Technical Conversation <ArrowRight size={14} className="ml-2" />
                </Button>
              </Link>
              <Link to="/case-studies">
                <Button variant="outline" className="border-charcoal-border text-concrete hover:text-burntamber hover:border-burntamber text-xs font-mono uppercase tracking-wider px-8 h-12 rounded-none transition-all">
                  Inspect Verified Case Studies
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

export default WhoWeAre;
