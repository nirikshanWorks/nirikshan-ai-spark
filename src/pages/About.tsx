import React from "react";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  Globe2,
  Terminal,
  Activity,
  Building2,
  Lock,
  Target,
  Rocket,
  CheckCircle2,
  BarChart3,
  Award,
  Users2,
  Zap,
  Server
} from "lucide-react";

import anshulImage from "@/assets/team/anshul.png";
import vikramImage from "@/assets/team/vikram-biyani.jpg";

export const About = () => {
  const differentiators = [
    {
      num: "01",
      tag: "AIR_GAP // SECURITY",
      title: "Air-Gapped by Design",
      desc: "Every perception model executes 100% on-premise on edge GPU hardware. Zero recurring cloud streaming, zero external socket leakage, and zero recurring egress costs.",
      spec: "100% LOCAL LAN ISOLATION"
    },
    {
      num: "02",
      tag: "DETERMINISM // PERFORMANCE",
      title: "Sub-15ms Determinism",
      desc: "Hardware-level TensorRT INT8 quantization delivering sub-15ms frame-to-relay latency. Ideal for high-speed industrial conveyor sorting and perimeter security gates.",
      spec: "<15ms CUDA KERNEL INFERENCE"
    },
    {
      num: "03",
      tag: "HARDWARE // CO_DESIGN",
      title: "Full-Stack Embedded Engineering",
      desc: "We engineer the physical topology — from industrial camera mounting and focal-length optics to Jetson Orin edge stations and SCADA/PLC digital relays.",
      spec: "TURNKEY FIELD INTEGRATION"
    },
    {
      num: "04",
      tag: "AUDITABILITY // RELIABILITY",
      title: "Deterministic State Machines",
      desc: "Probabilistic AI inferences are bounded by deterministic verification gates, producing mathematically verified audit logs for regulatory compliance.",
      spec: "FULL AUDIT TRAIL LOGGING"
    }
  ];

  const facilities = [
    {
      code: "FACILITY_01",
      city: "Haridwar, Uttarakhand",
      name: "Hardware & Sensor Prototyping Testbed",
      role: "EDGE SENSORS & EMBEDDED CUDA INTEGRATION",
      desc: "Specialized in testing ruggedized IP camera topologies, thermal dissipation housings, solar-powered edge microcontrollers, and real-time SCADA/PLC pneumatic relay interfaces.",
      specs: ["Industrial Camera Test Rig", "Solar + Battery Edge Station", "Jetson Orin Clustering"]
    },
    {
      code: "FACILITY_02",
      city: "Dehradun, Uttarakhand",
      name: "Vision Model Training & Web Platforms",
      role: "MODEL QUANTIZATION & DISTRIBUTED SYSTEMS",
      desc: "Focuses on neural backbone training, custom synthetic dataset generation, INT8 TensorRT kernel compilation, and enterprise multi-camera RTSP ingestion management consoles.",
      specs: ["High-Throughput RTSP Mesh", "CUDA Kernel Quantization Lab", "Zero-PII Data Pipelines"]
    }
  ];

  const milestones = [
    {
      phase: "01",
      year: "2024",
      title: "Genesis at Dev Bhoomi",
      desc: "Initiated as a deep-tech research collective at Dev Bhoomi's IEC Innovation Lab, experimenting with neural backbones and edge vision prototyping."
    },
    {
      phase: "02",
      year: "2024",
      title: "MSME Formalization",
      desc: "Registered as an MSME entity, establishing structured R&D sprints, academic partnerships, and hands-on developer training workshops."
    },
    {
      phase: "03",
      year: "Late 2024",
      title: "Evolution into Nirikshan AI",
      desc: "Pivoted entirely to building commercial AI products and air-gapped industrial vision systems, testing prototypes in Uttarakhand industrial clusters."
    },
    {
      phase: "04",
      year: "2025",
      title: "Private Limited Incorporation",
      desc: "Incorporated as Nirikshan AI Private Limited (MCA India CIN: U72900UR2023PTC015792) to support enterprise contracts and industrial deployments."
    },
    {
      phase: "05",
      year: "2025+",
      title: "National & Global Deployments",
      desc: "Active production deployments across automotive component manufacturing, perimeter defense, grassroots agritech, and institutional education."
    }
  ];

  return (
    <div className="min-h-screen bg-ivory dark:bg-charcoal text-charcoal dark:text-ivory selection:bg-sage selection:text-charcoal font-sans">
      <SEO
        title="About Us // Corporate Profile & Facilities | Nirikshan AI"
        description="Nirikshan AI Private Limited is a research-driven AI and product engineering company. Discover our mission, facility locations in Haridwar & Dehradun, and technical capabilities."
        canonical="https://nirikshanai.com/about"
      />
      <Navigation />

      <main className="relative pt-20">
        {/* ══════════════════════════════════════════════════════
            SECTION 01 — HERO (Editorial Split-Screen)
        ══════════════════════════════════════════════════════ */}
        <section className="border-b border-concrete/40 dark:border-charcoal-border bg-ivory dark:bg-charcoal relative overflow-hidden">
          <div className="absolute inset-0 tech-grid-bg opacity-40 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-16 md:py-24 relative z-10">
            {/* Top Monospace Section Label */}
            <div className="flex items-center justify-between pb-4 mb-8 border-b border-concrete/30 dark:border-charcoal-border text-[11px] font-mono tracking-widest text-concrete-dark dark:text-concrete uppercase">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-sage inline-block animate-pulse" />
                <span>SEC_01 // CORPORATE PROFILE &amp; INFRASTRUCTURE</span>
                <span className="hidden sm:inline">//</span>
                <span className="hidden sm:inline">NIRIKSHAN AI PRIVATE LIMITED</span>
              </div>
              <div className="flex items-center gap-3">
                <span>CIN: U72900UR2023PTC015792</span>
                <span>//</span>
                <span className="text-sage font-bold">STATUS: ACTIVE &amp; AUDITED</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              {/* Left Column: Narrative (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div>
                  <div className="inline-block px-3 py-1 mb-6 text-[10px] font-mono uppercase tracking-[0.2em] bg-techlight dark:bg-charcoal-surface border border-concrete/40 dark:border-charcoal-border text-charcoal dark:text-ivory">
                    DEEP TECH PRODUCT ENGINEERING <span className="text-burntamber font-bold">·</span> UTTARAKHAND, INDIA
                  </div>

                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-display tracking-tight leading-[1.02] text-charcoal dark:text-ivory">
                    Engineering
                    <br />
                    Intelligence.
                    <br />
                    <span className="font-serif italic font-normal text-concrete-dark dark:text-concrete">
                      From Research Lab to <span className="text-burntamber">Industrial Reality</span>.
                    </span>
                  </h1>

                  <p className="mt-6 text-base sm:text-lg text-concrete-dark dark:text-concrete max-w-xl leading-relaxed font-sans">
                    Nirikshan AI Private Limited is an advanced artificial intelligence technology and product engineering company. We build ruggedized, air-gapped perception systems that combine high-speed computer vision, private generative intelligence, and deterministic autonomous agents for critical real-world applications.
                  </p>
                </div>

                <div className="pt-4 flex flex-wrap gap-4">
                  <Link to="/who-we-are">
                    <Button className="bg-charcoal text-ivory border border-charcoal hover:bg-burntamber hover:border-burntamber hover:text-white text-xs font-mono uppercase tracking-wider px-7 h-12 rounded-none font-bold transition-all shadow-sm">
                      Meet Leadership &amp; Team <ArrowRight size={14} className="ml-2" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" className="border-concrete/60 dark:border-charcoal-border text-charcoal dark:text-ivory hover:border-burntamber hover:text-burntamber hover:bg-burntamber/5 text-xs font-mono uppercase tracking-wider px-7 h-12 rounded-none font-semibold transition-all">
                      Consult Engineering Team
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Column: Key Corporate Metrics (5 cols) */}
              <div className="lg:col-span-5 border border-charcoal/30 dark:border-charcoal-border bg-charcoal text-ivory p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-6 border-b border-charcoal-border text-[10px] font-mono text-concrete">
                    <span className="flex items-center gap-1.5 text-sage font-bold">
                      <span className="w-1.5 h-1.5 bg-sage inline-block animate-pulse" />
                      SYSTEM ARCHITECTURE BENCHMARKS
                    </span>
                    <span>Q4_2026</span>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="text-3xl sm:text-4xl font-bold font-display text-sage">
                        &lt;15ms
                      </div>
                      <div className="text-[11px] font-mono text-concrete uppercase tracking-wider mt-1">
                        DETERMINISTIC EDGE INFERENCE
                      </div>
                      <p className="text-[11px] font-mono text-concrete/70 mt-0.5">
                        Sub-frame processing with zero public cloud transmission latency.
                      </p>
                    </div>

                    <div className="border-t border-charcoal-border/70 pt-4">
                      <div className="text-3xl sm:text-4xl font-bold font-display text-ivory">
                        99.8%
                      </div>
                      <div className="text-[11px] font-mono text-concrete uppercase tracking-wider mt-1">
                        OPTICAL DEFECT PRECISION
                      </div>
                      <p className="text-[11px] font-mono text-concrete/70 mt-0.5">
                        Verified micro-blemish and crack classification on active conveyor lines.
                      </p>
                    </div>

                    <div className="border-t border-charcoal-border/70 pt-4">
                      <div className="text-3xl sm:text-4xl font-bold font-display text-burntamber">
                        100%
                      </div>
                      <div className="text-[11px] font-mono text-concrete uppercase tracking-wider mt-1">
                        ON-PREMISE AIR-GAP PRIVACY
                      </div>
                      <p className="text-[11px] font-mono text-concrete/70 mt-0.5">
                        Zero telemetry or frames transmitted outside client local area networks.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-charcoal-border text-[10px] font-mono text-concrete flex items-center justify-between">
                  <span>INCORPORATION: MCA INDIA</span>
                  <span className="text-sage font-bold">CIN VERIFIED</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SECTION 02 — FACILITY TOPOLOGY (Haridwar & Dehradun)
        ══════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 border-b border-concrete/40 dark:border-charcoal-border bg-techlight/30 dark:bg-charcoal-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-concrete/30 dark:border-charcoal-border gap-4">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-sage uppercase block mb-1">
                  SEC_02 // R&amp;D FACILITY TOPOLOGY
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-charcoal dark:text-ivory">
                  Two Dedicated Labs.
                  <br />
                  One Unified Architecture.
                </h2>
              </div>
              <p className="text-xs font-mono text-concrete-dark dark:text-concrete max-w-md">
                ENGINEERING FACILITIES OPTIMIZED FOR EMBEDDED HARDWARE PROTOTYPING AND QUANTIZED VISION MODEL TRAINING.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {facilities.map((fac) => (
                <div
                  key={fac.code}
                  className="p-8 border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal flex flex-col justify-between space-y-6 hover:border-sage transition-all group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-concrete/20 dark:border-charcoal-border text-xs font-mono text-concrete">
                      <span className="text-sage font-bold">{fac.code} //</span>
                      <span>{fac.city.toUpperCase()}</span>
                    </div>

                    <h3 className="text-2xl font-bold font-display text-charcoal dark:text-ivory group-hover:text-burntamber transition-colors">
                      {fac.name}
                    </h3>
                    <div className="text-[11px] font-mono text-sage tracking-wider uppercase font-semibold">
                      {fac.role}
                    </div>
                    <p className="text-xs font-sans text-concrete-dark dark:text-concrete leading-relaxed">
                      {fac.desc}
                    </p>
                  </div>

                  <div className="border-t border-concrete/20 dark:border-charcoal-border pt-4 space-y-1.5 text-xs font-mono">
                    <div className="text-[10px] text-concrete uppercase mb-1">FACILITY SPECIFICATIONS:</div>
                    {fac.specs.map((sp) => (
                      <div key={sp} className="flex items-center gap-2 text-concrete-dark dark:text-concrete">
                        <span className="w-1.5 h-1.5 bg-sage inline-block" />
                        <span>{sp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SECTION 03 — TECHNICAL DIFFERENTIATORS
        ══════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 border-b border-concrete/40 dark:border-charcoal-border bg-ivory dark:bg-charcoal">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-concrete/30 dark:border-charcoal-border gap-4">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-sage uppercase block mb-1">
                  SEC_03 // CORE DIFFERENTIATORS
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-charcoal dark:text-ivory">
                  Engineered Beyond
                  <br />
                  Conventional SaaS.
                </h2>
              </div>
              <p className="text-xs font-mono text-concrete-dark dark:text-concrete max-w-md">
                HOW NIRIKSHAN AI DELIVERS DETERMINISTIC PERFORMANCE WHERE GENERIC CLOUD-BASED APIS CANNOT COMPETE.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {differentiators.map((diff) => (
                <div
                  key={diff.num}
                  className="p-6 border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal-surface flex flex-col justify-between space-y-4 hover:border-sage transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-concrete/20 dark:border-charcoal-border text-xs font-mono">
                      <span className="text-sage font-bold">{diff.num} //</span>
                      <span className="text-[10px] text-concrete">{diff.tag}</span>
                    </div>
                    <h3 className="text-xl font-bold font-display text-charcoal dark:text-ivory group-hover:text-burntamber transition-colors mb-2">
                      {diff.title}
                    </h3>
                    <p className="text-xs font-sans text-concrete-dark dark:text-concrete leading-relaxed">
                      {diff.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-concrete/15 dark:border-charcoal-border text-[10px] font-mono text-sage font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-sage inline-block" />
                    <span>{diff.spec}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SECTION 04 — PURPOSE & OPERATIONAL CHARTER
        ══════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 border-b border-concrete/40 dark:border-charcoal-border bg-techlight/30 dark:bg-charcoal">
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
                    To deliver reliable, air-gapped computer vision, private generative AI, and autonomous agent systems that eliminate cloud latency, guarantee data sovereignty, and operate dependably in mission-critical industrial environments.
                  </p>
                </div>
                <div className="pt-4 border-t border-concrete/15 dark:border-charcoal-border text-xs font-mono text-concrete-dark dark:text-concrete space-y-1.5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-sage" />
                    <span>Zero cloud lock-in or recurring cloud costs</span>
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
                    To build a future where enterprises, universities, and rural communities can deploy resilient artificial intelligence to solve concrete physical and economic challenges — from factory floors to Himalayan farmlands.
                  </p>
                </div>
                <div className="pt-4 border-t border-concrete/15 dark:border-charcoal-border text-xs font-mono text-concrete-dark dark:text-concrete space-y-1.5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-burntamber" />
                    <span>Academic rigor blended with industrial hardware</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-burntamber" />
                    <span>Grassroots technologies scaled to enterprise scale</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SECTION 05 — CHRONOLOGICAL MILESTONES (Timeline)
        ══════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 border-b border-concrete/40 dark:border-charcoal-border bg-ivory dark:bg-charcoal">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-concrete/30 dark:border-charcoal-border gap-4">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-sage uppercase block mb-1">
                  SEC_05 // INSTITUTIONAL TRAJECTORY
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-charcoal dark:text-ivory">
                  From Campus Prototype
                  <br />
                  to Licensed Company.
                </h2>
              </div>
              <p className="text-xs font-mono text-concrete-dark dark:text-concrete max-w-md">
                KEY MOMENTS IN NIRIKSHAN AI'S EVOLUTION FROM A STUDENT COLLECTIVE TO A REGISTERED ENTERPRISE FIRM.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {milestones.map((m) => (
                <div
                  key={m.phase}
                  className="p-5 border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal-surface flex flex-col justify-between space-y-4 hover:border-sage transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-concrete/20 dark:border-charcoal-border text-[10px] font-mono">
                      <span className="text-sage font-bold">PHASE_{m.phase}</span>
                      <span className="text-concrete uppercase">{m.year}</span>
                    </div>
                    <h3 className="text-base font-bold font-display text-charcoal dark:text-ivory group-hover:text-burntamber transition-colors mb-2">
                      {m.title}
                    </h3>
                    <p className="text-xs font-sans text-concrete-dark dark:text-concrete leading-relaxed">
                      {m.desc}
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
            SECTION 06 — TECHNICAL CTA
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-28 bg-charcoal text-ivory relative overflow-hidden border-b border-charcoal-border">
          <div className="absolute inset-0 tech-grid-bg opacity-15 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
            <div className="inline-block px-3 py-1 mb-6 text-[10px] font-mono uppercase tracking-[0.2em] bg-charcoal-surface border border-charcoal-border text-sage">
              SEC_06 // TECHNICAL FEASIBILITY
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-ivory leading-tight max-w-3xl mx-auto mb-6">
              Have an Operational Challenge?
              <br />
              <span className="font-serif italic font-normal text-concrete">
                Let's Engineer the Solution.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-concrete max-w-xl mx-auto leading-relaxed mb-8 font-sans">
              Connect directly with our system architects in Haridwar or Dehradun to analyze your camera topologies, model constraints, and edge hardware requirements.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact">
                <Button className="bg-charcoal text-ivory border border-charcoal-border hover:bg-burntamber hover:border-burntamber hover:text-white text-xs font-mono uppercase tracking-wider px-8 h-12 rounded-none font-bold transition-all shadow-lg">
                  Initiate Technical Consultation <ArrowRight size={14} className="ml-2" />
                </Button>
              </Link>
              <Link to="/who-we-are">
                <Button variant="outline" className="border-charcoal-border text-concrete hover:text-burntamber hover:border-burntamber text-xs font-mono uppercase tracking-wider px-8 h-12 rounded-none transition-all">
                  Examine Leadership Dossiers
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

export default About;
