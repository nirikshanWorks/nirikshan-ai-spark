import React, { useState } from "react";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SplineScene } from "@/components/ui/splite";
import {
  Eye,
  Brain,
  Bot,
  Factory,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
  ArrowUpRight,
  Activity,
  Server,
  Crosshair,
  Lock,
  Sparkles,
  Zap,
  Building2,
  Stethoscope,
  GraduationCap,
  Check,
  Terminal,
  Database,
  GitBranch,
  Sliders,
  Linkedin
} from "lucide-react";

// Asset imports
import anshulImage from "@/assets/team/anshul.png";
import vikramImage from "@/assets/team/vikram-biyani.jpg";
import cvPpeImg from "@/assets/cv-ppe.png";
import cvFireImg from "@/assets/cv-fire.png";
import cvPhoneImg from "@/assets/cv-phone.png";
import cvDemoImg from "@/assets/computer-vision-demo.png";
import mockupDashboardImg from "@/assets/mockup-ai-dashboard.jpg";
import partnerMadapet from "@/assets/partners/madapet.png";
import partnerMDJKS from "@/assets/partners/mdjks.png";
import partnerVB from "@/assets/partners/vb.png";

// Partner list
const partners = [
  { name: "Motherson Group", label: "Motherson", meta: "AUTOMOTIVE & COMPONENT MFG" },
  { name: "J.C. Bose University (YMCA)", label: "YMCA University", url: "https://jcboseust.ac.in/", meta: "ACADEMIC R&D PARTNER" },
  { name: "Madapet", src: partnerMadapet, meta: "INDUSTRIAL PACKAGING" },
  { name: "Mangosorange Agritech", label: "Mangosorange", url: "https://mangosorange.co.in/", meta: "AGRITECH & AUTOMATION" },
  { name: "Ranayara Pvt Ltd", label: "Ranayara", meta: "PRECISION ENGINEERING" },
  { name: "VB Group", src: partnerVB, meta: "ENTERPRISE INFRASTRUCTURE" },
  { name: "Manorama Dabral Trust", src: partnerMDJKS, url: "https://mdjks.org/", meta: "GRASSROOTS RURAL R&D" },
  { name: "AVR AI Technologies", label: "AVR AI", url: "https://avraitechnologies.com/", meta: "AI RESEARCH CONSORTIUM" },
];

export const Index = () => {
  // Hero console interactive state - 3D Robot default
  const [heroMode, setHeroMode] = useState<"robot" | "vision" | "telemetry">("robot");
  const [heroVisionFeed, setHeroVisionFeed] = useState<number>(0);

  // Industry tab state
  const [activeIndustry, setActiveIndustry] = useState<number>(0);

  // Approach step state
  const [activeStep, setActiveStep] = useState<number>(0);

  const heroFeeds = [
    {
      id: "ppe",
      title: "FACTORY_CAM_01 // PPE COMPLIANCE",
      image: cvPpeImg,
      tags: ["[HELMET: 0.994]", "[VEST: 0.988]", "[STATUS: COMPLIANT]"],
      status: "NOMINAL",
      statusVariant: "sage" as const,
      fps: "60.0 FPS",
      latency: "14.2ms",
      scanLine: "sage" as const,
      boxes: [
        {
          id: "b1",
          label: "HELMET: 0.994",
          status: "PASS",
          top: "16%",
          left: "40%",
          width: "22%",
          height: "22%",
          variant: "sage" as const,
        },
        {
          id: "b2",
          label: "HI-VIS VEST: 0.988",
          status: "PASS",
          top: "39%",
          left: "34%",
          width: "34%",
          height: "36%",
          variant: "sage" as const,
        },
      ],
      streamDetails: "RTSP // 1920x1080@60Hz // TENSORRT_INT8",
      alertStatus: "ZONE_03: ALL WORKERS COMPLIANT",
    },
    {
      id: "defect",
      title: "CONVEYOR_CAM_04 // AOI SURFACE DEFECT",
      image: cvDemoImg,
      tags: ["[MICRO_DEFECT: 0.991]", "[TOLERANCE: ±0.02mm]", "[FLAGGED]"],
      status: "INSPECTING",
      statusVariant: "amber" as const,
      fps: "120.0 FPS",
      latency: "11.6ms",
      scanLine: "amber" as const,
      boxes: [
        {
          id: "b1",
          label: "ROI_SCAN_GRID // ±0.02mm",
          status: "MONITOR",
          top: "14%",
          left: "18%",
          width: "64%",
          height: "68%",
          variant: "concrete" as const,
        },
        {
          id: "b2",
          label: "MICRO_CRACK: 0.991",
          status: "DEFECT",
          top: "36%",
          left: "46%",
          width: "22%",
          height: "24%",
          variant: "amber" as const,
          pulse: true,
        },
      ],
      streamDetails: "GIGE_VISION // 2048x1536@120Hz // INT8_QUANT",
      alertStatus: "SURFACE BLEMISH EXCEEDS TOLERANCE // RELAY ARMED",
    },
    {
      id: "fire",
      title: "PERIMETER_CAM_09 // THERMAL / FIRE",
      image: cvFireImg,
      tags: ["[HAZARD: FLAME/SMOKE]", "[CONF: 0.982]", "[ALARM_RELAY]"],
      status: "CRITICAL",
      statusVariant: "amber" as const,
      fps: "30.0 FPS",
      latency: "9.4ms",
      scanLine: "amber" as const,
      boxes: [
        {
          id: "b1",
          label: "HOTSPOT: 84.6°C",
          status: "CRITICAL",
          top: "22%",
          left: "32%",
          width: "36%",
          height: "38%",
          variant: "amber" as const,
          pulse: true,
        },
        {
          id: "b2",
          label: "SMOKE_PLUME: 0.982",
          status: "HAZARD",
          top: "10%",
          left: "24%",
          width: "48%",
          height: "26%",
          variant: "amber" as const,
        },
      ],
      streamDetails: "FLIR_THERMAL // 640x512@30Hz // LOCAL_FIFO",
      alertStatus: "CRITICAL THERMAL DELTA DETECTED // RELAY TRIGGERED",
    },
  ];

  const currentHeroFeed = heroFeeds[heroVisionFeed];

  const industries = [
    {
      num: "01",
      name: "Manufacturing",
      tagline: "Automated Optical Inspection & Safety",
      desc: "Sub-15ms edge computer vision detecting micro-cracks, surface blemishes, assembly misalignments, and worker PPE compliance directly on high-speed conveyor lines.",
      specs: ["±0.02mm tolerance", "99.8% precision", "Zero cloud dependence"],
      code: "INSP_PIPELINE // AOI-v4.2",
    },
    {
      num: "02",
      name: "Infrastructure & Defense",
      tagline: "Perimeter Security & Automated ANPR",
      desc: "High-security vehicle classification, automatic number plate recognition at speed, and perimeter fence intrusion detection for high-compliance facilities.",
      specs: ["100% on-premise airgap", "<50ms gate trigger", "Night-vision IR support"],
      code: "SECURITY_GRID // PERIMETER-SYS",
    },
    {
      num: "03",
      name: "Healthcare & BioTech",
      tagline: "Clinical Image Analysis & Procedural Protocol",
      desc: "Computer vision and multimodal AI systems assisting laboratory sample verification, operating room protocol compliance, and patient movement safety.",
      specs: ["HIPAA-grade privacy", "Local GPU clustering", "Deterministic logs"],
      code: "BIO_INFERENCE // CLINICAL-01",
    },
    {
      num: "04",
      name: "Smart Environments",
      tagline: "Spatial Analytics & Flow Optimization",
      desc: "Real-time occupancy tracking, directional density heatmaps, and automated environmental HVAC triggers across large enterprise campuses.",
      specs: ["Multi-camera re-ID", "Zero PII stored", "RTSP stream mesh"],
      code: "SPATIAL_FLOW // URBAN-EDGE",
    },
    {
      num: "05",
      name: "Education & Academia",
      tagline: "AI Training & Autonomous Proctoring",
      desc: "Institutional AI infrastructure powering the 10X AI Productivity training curriculum, student research laboratories, and AI-enabled assessment tools.",
      specs: ["10,000+ students upskilled", "Curriculum aligned", "Lab deployment"],
      code: "ACAD_LAB // 10X-PRODUCTIVITY",
    },
    {
      num: "06",
      name: "Agriculture & Rural Tech",
      tagline: "Crop Health & Wildlife Intrusion AI",
      desc: "Edge-based solar-powered vision stations detecting nocturnal wildlife crop intrusion and multi-spectral disease detection in rural agricultural clusters.",
      specs: ["Solar & 4G/Edge", "Bio-acoustic deterrence", "Grassroots tested"],
      code: "AGRI_SHIELD // CROP-INTELLIGENCE",
    },
  ];

  const approachSteps = [
    {
      num: "01",
      title: "Discover",
      label: "SYSTEM ANALYSIS & CONSTRAINTS",
      desc: "Deep inspection of operational environment, camera topologies, lighting variances, throughput rates, and security boundaries.",
      deliverable: "Technical Feasibility Spec & Hardware Topology",
    },
    {
      num: "02",
      title: "Research",
      label: "MODEL ARCHITECTURE & BENCHMARK",
      desc: "Selection of neural backbones (quantized YOLO, Vision Transformers, custom embeddings) and domain-specific dataset curation.",
      deliverable: "Baseline Model Weights & Inference Metrics",
    },
    {
      num: "03",
      title: "Architect",
      label: "EDGE INFRASTRUCTURE DESIGN",
      desc: "Designing zero-leakage RTSP ingestion pipelines, local IPC message buses, and deterministic PLC/SCADA relay interfaces.",
      deliverable: "Low-Level System Architecture Diagram",
    },
    {
      num: "04",
      title: "Engineer",
      label: "TENSORRT OPTIMIZATION & INT8 QUANTIZATION",
      desc: "Hardware-level model quantization, CUDA kernel acceleration, frame batching, and local operator dashboard buildout.",
      deliverable: "Production Binary & Dashboard Interface",
    },
    {
      num: "05",
      title: "Deploy",
      label: "SHADOW STAGING & ON-SITE RELAY",
      desc: "Air-gapped deployment onto industrial edge servers (Jetson / RTX). Parallel shadow execution against manual inspection baseline.",
      deliverable: "Validation Report & Live Cutover",
    },
    {
      num: "06",
      title: "Evolve",
      label: "ACTIVE LEARNING & DRIFT DETECTION",
      desc: "Automated edge anomaly harvesting to continuously fine-tune models against rare edge cases without human intervention.",
      deliverable: "Continuous Telemetry & OTA Model Updates",
    },
  ];

  return (
    <div className="min-h-screen bg-ivory dark:bg-charcoal text-charcoal dark:text-ivory selection:bg-sage selection:text-charcoal font-sans">
      <SEO
        title="Nirikshan AI | Advanced AI Technology & Product Engineering"
        description="Nirikshan AI develops intelligent systems through computer vision, generative AI and autonomous technologies — transforming complex challenges into scalable real-world solutions."
        canonical="https://nirikshanai.com/"
      />
      <Navigation />

      <main className="relative pt-20">
        {/* ══════════════════════════════════════════════════════
            SECTION 02 — HERO (Editorial Split-Screen)
        ══════════════════════════════════════════════════════ */}
        <section className="border-b border-concrete/40 dark:border-charcoal-border relative overflow-hidden bg-ivory dark:bg-charcoal">
          {/* Subtle Technical Grid Background */}
          <div className="absolute inset-0 tech-grid-bg opacity-40 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 md:py-24 relative z-10">
            {/* Top Monospace Section Label */}
            <div className="flex items-center justify-between pb-4 mb-8 border-b border-concrete/30 dark:border-charcoal-border text-[11px] font-mono tracking-widest text-concrete-dark dark:text-concrete uppercase">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-sage inline-block animate-pulse" />
                <span>SEC_01 // SYSTEM INITIALIZATION</span>
                <span className="hidden sm:inline">//</span>
                <span className="hidden sm:inline">AUTONOMOUS_VISION_CORE</span>
              </div>
              <div className="flex items-center gap-3">
                <span>COORD: 28.6139°N 77.2090°E</span>
                <span>//</span>
                <span className="text-sage font-bold">STATUS: DEPLOYED</span>
              </div>
            </div>

            {/* Split Screen Layout */}
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              {/* Left Column: Editorial Headline & Narrative (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div>
                  <div className="inline-block px-2.5 py-1 mb-6 text-[10px] font-mono uppercase tracking-[0.2em] bg-techlight dark:bg-charcoal-surface border border-concrete/40 dark:border-charcoal-border text-charcoal dark:text-ivory">
                    NIRIKSHAN AI PRIVATE LIMITED <span className="text-burntamber font-bold">·</span> ADVANCED RESEARCH &amp; PRODUCT LAB
                  </div>

                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-display tracking-tight leading-[1.02] text-charcoal dark:text-ivory">
                    Engineering
                    <br />
                    Intelligence.
                    <br />
                    <span className="font-serif italic font-normal text-concrete-dark dark:text-concrete">
                      Building <span className="text-burntamber">What's Next</span>.
                    </span>
                  </h1>

                  <p className="mt-6 text-base sm:text-lg text-concrete-dark dark:text-concrete max-w-xl leading-relaxed font-sans">
                    Nirikshan AI develops intelligent systems through computer vision, generative AI and autonomous technologies — transforming complex industrial and operational challenges into scalable, real-world solutions.
                  </p>
                </div>

                {/* CTAs & Architecture Specs */}
                <div className="pt-4 space-y-6">
                  <div className="flex flex-wrap gap-4">
                    <Link to="/services">
                      <Button className="bg-charcoal text-ivory border border-charcoal hover:bg-burntamber hover:border-burntamber hover:text-white text-xs font-mono uppercase tracking-wider px-7 h-12 rounded-none font-bold transition-all">
                        Explore Our Solutions <ArrowRight size={14} className="ml-2" />
                      </Button>
                    </Link>
                    <Link to="/products">
                      <Button variant="outline" className="border-concrete/60 dark:border-charcoal-border text-charcoal dark:text-ivory hover:border-burntamber hover:text-burntamber hover:bg-burntamber/5 text-xs font-mono uppercase tracking-wider px-7 h-12 rounded-none font-semibold transition-all">
                        Discover Our Products
                      </Button>
                    </Link>
                  </div>

                  {/* 3 Modular Architectural Hero Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-concrete/30 dark:border-charcoal-border">
                    <div className="p-3.5 border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal-surface hover:border-sage transition-all group">
                      <div className="flex items-center justify-between text-[10px] font-mono text-concrete uppercase tracking-wider mb-1.5">
                        <span>LATENCY // [EDGE]</span>
                        <span className="w-1.5 h-1.5 bg-sage inline-block animate-pulse" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold font-display text-charcoal dark:text-ivory">
                        &lt;15ms
                      </div>
                      <p className="mt-1 text-[11px] font-mono text-concrete-dark dark:text-concrete leading-snug">
                        Sub-20ms edge inference without cloud round-trip delay.
                      </p>
                    </div>

                    <div className="p-3.5 border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal-surface hover:border-sage transition-all group">
                      <div className="flex items-center justify-between text-[10px] font-mono text-concrete uppercase tracking-wider mb-1.5">
                        <span>PRECISION // [AOI]</span>
                        <span className="text-[9px] font-bold text-sage px-1 border border-sage/40">VERIFIED</span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold font-display text-sage">
                        99.8%
                      </div>
                      <p className="mt-1 text-[11px] font-mono text-concrete-dark dark:text-concrete leading-snug">
                        Optical surface defect &amp; safety compliance rate.
                      </p>
                    </div>

                    <div className="p-3.5 border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal-surface hover:border-sage transition-all group">
                      <div className="flex items-center justify-between text-[10px] font-mono text-concrete uppercase tracking-wider mb-1.5">
                        <span>PRIVACY // [AIR-GAP]</span>
                        <span className="text-[9px] font-bold text-burntamber px-1 border border-burntamber/40">AIR-GAPPED</span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold font-display text-charcoal dark:text-ivory">
                        100%
                      </div>
                      <p className="mt-1 text-[11px] font-mono text-concrete-dark dark:text-concrete leading-snug">
                        Zero cloud data exfiltration. On-premise execution.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Large Technical Composition & Live Detection Overlay (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between border border-charcoal/30 dark:border-charcoal-border bg-charcoal text-ivory p-4 sm:p-5 shadow-2xl">
                {/* Console Bar */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-charcoal-border text-[10px] font-mono text-concrete">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-sage inline-block animate-pulse" />
                    <span className="tracking-wider">
                      {heroMode === "robot"
                        ? "3D_SPATIAL_AGENT // INTERACTIVE_CORE"
                        : heroMode === "vision"
                        ? `INFERENCE_STREAM // 0${heroVisionFeed + 1}`
                        : "SYSTEM_DIAGNOSTICS // EDGE_NODE"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[
                      { id: "robot", label: "3D ROBOT" },
                      { id: "vision", label: "VISION FEED" },
                      { id: "telemetry", label: "TELEMETRY" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setHeroMode(tab.id as any)}
                        className={`px-2.5 py-1 text-[9px] uppercase tracking-wider border transition-all ${
                          heroMode === tab.id
                            ? "bg-sage text-charcoal border-sage font-bold shadow-sm"
                            : "border-charcoal-border text-concrete hover:text-burntamber hover:border-burntamber/50"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Display Area */}
                {heroMode === "robot" ? (
                  <div className="relative aspect-[4/3] sm:h-[400px] md:h-[460px] w-full bg-black/95 overflow-hidden border border-charcoal-border">
                    <SplineScene
                      scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                      className="w-full h-full"
                    />

                    {/* Technical HUD Overlay (pointer-events-none so mouse passes through to 3D canvas) */}
                    <div className="absolute inset-0 pointer-events-none p-3 flex flex-col justify-between">
                      {/* Top HUD Readouts */}
                      <div className="flex justify-between items-start text-[9px] font-mono">
                        <div className="bg-charcoal/90 border border-charcoal-border px-2 py-1 space-y-0.5">
                          <div className="text-sage font-bold flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-sage inline-block animate-pulse" />
                            TARGET_LOCK: NEURAL_AGENT_v2.4
                          </div>
                          <div className="text-concrete text-[8px]">
                            COORDS: X: 0.00 | Y: +1.42 | Z: -0.85
                          </div>
                        </div>
                        <div className="bg-charcoal/90 border border-charcoal-border px-2 py-1 text-right space-y-0.5">
                          <div className="text-ivory font-bold">60.0 FPS · GL_ES3</div>
                          <div className="text-sage text-[8px]">SUB-PIXEL MESH TRACKING</div>
                        </div>
                      </div>

                      {/* Center Reticle Corner Accents */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                        <div className="w-32 h-32 border border-dashed border-concrete/30 relative flex items-center justify-center">
                          <div className="w-2 h-2 border border-sage" />
                          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-sage" />
                          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-sage" />
                          <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-sage" />
                          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-sage" />
                        </div>
                      </div>

                      {/* Bottom HUD Bar */}
                      <div className="flex items-center justify-between text-[10px] font-mono bg-charcoal/90 px-3 py-1.5 border border-charcoal-border text-concrete">
                        <span className="flex items-center gap-1.5 text-sage font-bold">
                          <span className="w-1.5 h-1.5 bg-sage inline-block animate-pulse" />
                          SPATIAL_CORE // ONLINE
                        </span>
                        <span className="text-[9px] text-concrete">
                          [CLICK &amp; DRAG TO ROTATE · WHEEL TO ZOOM]
                        </span>
                      </div>
                    </div>
                  </div>
                ) : heroMode === "vision" ? (
                  <div className="relative aspect-[4/3] sm:h-[400px] md:h-[460px] bg-black overflow-hidden border border-charcoal-border group">
                    <img
                      src={currentHeroFeed.image}
                      alt={currentHeroFeed.title}
                      className="w-full h-full object-cover opacity-90 transition-opacity"
                    />

                    {/* Animated Scanning Laser Beam */}
                    <motion.div
                      className={`absolute left-0 right-0 h-0.5 z-20 pointer-events-none ${
                        currentHeroFeed.scanLine === "amber"
                          ? "bg-gradient-to-r from-transparent via-burntamber to-transparent shadow-[0_0_10px_#CC5500]"
                          : "bg-gradient-to-r from-transparent via-sage to-transparent shadow-[0_0_10px_#9CAF88]"
                      }`}
                      animate={{ top: ["2%", "96%", "2%"] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Technical Bounding Box Overlays */}
                    <div className="absolute inset-0 p-3 flex flex-col justify-between pointer-events-none z-10">
                      {/* Top Stream Telemetry */}
                      <div className="flex justify-between items-start">
                        <div className="bg-charcoal/95 border border-charcoal-border p-2 space-y-1 text-[9px] font-mono">
                          <div className="text-sage font-bold flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-sage inline-block animate-pulse" />
                            {currentHeroFeed.title}
                          </div>
                          <div className="text-concrete text-[8px]">
                            {currentHeroFeed.streamDetails}
                          </div>
                        </div>
                        <div className="bg-charcoal/90 border border-charcoal-border px-2 py-1 text-[9px] font-mono text-concrete text-right">
                          <div className="text-ivory font-bold">{currentHeroFeed.fps}</div>
                          <div className="text-sage text-[8px]">{currentHeroFeed.latency} INFERENCE</div>
                        </div>
                      </div>

                      {/* Precise Corner-Bracket Bounding Boxes */}
                      {currentHeroFeed.boxes.map((box) => (
                        <div
                          key={box.id}
                          style={{
                            top: box.top,
                            left: box.left,
                            width: box.width,
                            height: box.height,
                          }}
                          className={`absolute pointer-events-none transition-all ${
                            box.variant === "amber"
                              ? `border border-burntamber bg-burntamber/15 ${box.pulse ? "animate-pulse" : ""}`
                              : box.variant === "sage"
                              ? "border border-sage bg-sage/10"
                              : "border border-concrete/50 bg-charcoal/20"
                          }`}
                        >
                          {/* Corner brackets */}
                          <span className={`absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 ${box.variant === "amber" ? "border-burntamber" : box.variant === "sage" ? "border-sage" : "border-concrete"}`} />
                          <span className={`absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 ${box.variant === "amber" ? "border-burntamber" : box.variant === "sage" ? "border-sage" : "border-concrete"}`} />
                          <span className={`absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 ${box.variant === "amber" ? "border-burntamber" : box.variant === "sage" ? "border-sage" : "border-concrete"}`} />
                          <span className={`absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 ${box.variant === "amber" ? "border-burntamber" : box.variant === "sage" ? "border-sage" : "border-concrete"}`} />

                          {/* Label badge */}
                          <div className={`absolute -top-4 left-0 text-[8px] font-mono px-1 py-0.5 border font-bold uppercase tracking-wider flex items-center gap-1 shadow-md whitespace-nowrap ${
                            box.variant === "amber"
                              ? "bg-charcoal text-burntamber border-burntamber"
                              : box.variant === "sage"
                              ? "bg-charcoal text-sage border-sage"
                              : "bg-charcoal text-concrete border-concrete/60"
                          }`}>
                            <span className={`w-1 h-1 inline-block ${box.variant === "amber" ? "bg-burntamber" : box.variant === "sage" ? "bg-sage" : "bg-concrete"}`} />
                            <span>{box.label}</span>
                            <span className="opacity-80">[{box.status}]</span>
                          </div>
                        </div>
                      ))}

                      {/* Bottom Status & Alert Readout */}
                      <div className="flex justify-between items-end text-[9px] font-mono">
                        <div className="bg-charcoal/90 border border-charcoal-border px-2 py-1 text-concrete">
                          <span>FEED_STATUS: </span>
                          <span className={currentHeroFeed.statusVariant === "amber" ? "text-burntamber font-bold" : "text-sage font-bold"}>
                            {currentHeroFeed.alertStatus}
                          </span>
                        </div>
                        <span
                          className={`px-2 py-1 font-bold border ${
                            currentHeroFeed.statusVariant === "amber"
                              ? "bg-burntamber/90 border-burntamber text-ivory animate-pulse"
                              : "bg-sage/90 border-sage text-charcoal"
                          }`}
                        >
                          STATUS: {currentHeroFeed.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Telemetry Mode: Industrial Edge Diagnostics */
                  <div className="aspect-[4/3] sm:h-[400px] md:h-[460px] bg-black p-4 font-mono text-xs border border-charcoal-border overflow-y-auto space-y-3 text-concrete">
                    <div className="flex items-center justify-between pb-2 border-b border-charcoal-border">
                      <div className="text-sage font-bold">
                        // EDGE_NODE_DIAGNOSTICS // NVIDIA_JETSON_ORIN_64GB
                      </div>
                      <div className="text-[10px] text-concrete">
                        TEMP: <span className="text-sage">43.8°C</span> · FAN: <span className="text-ivory">AUTO</span>
                      </div>
                    </div>

                    {/* CUDA Memory Allocation Bar */}
                    <div className="p-2.5 bg-charcoal/60 border border-charcoal-border space-y-1.5">
                      <div className="flex justify-between text-[10px]">
                        <span>CUDA VRAM ALLOCATION:</span>
                        <span className="text-ivory font-bold">2,140 MB / 8,192 MB (26.1%)</span>
                      </div>
                      <div className="w-full bg-charcoal-border h-2 border border-concrete/30 overflow-hidden">
                        <div className="bg-sage h-full w-[26.1%] transition-all duration-500" />
                      </div>
                      <div className="flex justify-between text-[9px] text-concrete/70">
                        <span>UNIFIED MEMORY ARCHITECTURE</span>
                        <span className="text-sage">6,052 MB AVAILABLE</span>
                      </div>
                    </div>

                    {/* Subsystem Matrix */}
                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex justify-between py-1 border-b border-charcoal-border/60">
                        <span>01 // RTSP INGESTION PIPELINE:</span>
                        <span className="text-sage font-bold">ONLINE [0.00% DROP]</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-charcoal-border/60">
                        <span>02 // TENSORRT INT8 KERNEL:</span>
                        <span className="text-sage font-bold">COMPILED [14.2ms MEAN]</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-charcoal-border/60">
                        <span>03 // PLC RELAY / SCADA GATE:</span>
                        <span className="text-sage font-bold">ARMED [&lt;18ms CUTOVER]</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-charcoal-border/60">
                        <span>04 // AIR-GAP SECURITY ISOLATION:</span>
                        <span className="text-burntamber font-bold">100% AIR-GAPPED [0 EXT SOCKETS]</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-charcoal-border/60">
                        <span>05 // ON-PREMISE FIFO BUFFER:</span>
                        <span className="text-sage font-bold">ACTIVE [500 FRAME RING]</span>
                      </div>
                    </div>

                    {/* Diagnostic Event Log */}
                    <div className="pt-2 text-[10px] text-concrete/70 border-t border-charcoal-border space-y-1">
                      <div className="text-sage font-bold">// RECENT SYSTEM EVENTS:</div>
                      <div>[12:04:19.482] INT8 Batch tensor inferred in 14.18ms.</div>
                      <div>[12:04:19.496] SCADA digital I/O heartbeat ack verified.</div>
                      <div>[12:04:19.510] Zero network packets transmitted outside local area network.</div>
                    </div>
                  </div>
                )}

                {/* Bottom Switcher Controls */}
                <div className="mt-3 pt-3 border-t border-charcoal-border flex items-center justify-between text-[10px] font-mono">
                  {heroMode === "vision" ? (
                    <>
                      <div className="text-concrete">SWITCH CAMERA STREAM:</div>
                      <div className="flex gap-1.5">
                        {heroFeeds.map((feed, idx) => (
                          <button
                            key={feed.id}
                            onClick={() => setHeroVisionFeed(idx)}
                            className={`px-2.5 py-1 border transition-all ${
                              heroVisionFeed === idx
                                ? "bg-sage text-charcoal border-sage font-bold"
                                : "border-charcoal-border text-concrete hover:text-burntamber hover:border-burntamber/50"
                            }`}
                          >
                            0{idx + 1}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : heroMode === "robot" ? (
                    <div className="w-full flex justify-between text-concrete">
                      <span>CORE: THREE.JS / SPLINE 3D AGENT</span>
                      <span className="text-sage font-bold">ONLINE · REAL-TIME 3D</span>
                    </div>
                  ) : (
                    <div className="w-full flex justify-between text-concrete">
                      <span>DIAGNOSTICS: LOCAL FIFO STACK</span>
                      <span className="text-sage font-bold">ALL PARAMETERS NOMINAL</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            ENTERPRISE REPUTATION & PARTNER LOGOS
        ══════════════════════════════════════════════════════ */}
        <section className="border-b border-concrete/30 dark:border-charcoal-border bg-techlight dark:bg-charcoal-surface py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-concrete/20 dark:border-charcoal-border text-[10px] font-mono tracking-widest text-concrete-dark dark:text-concrete uppercase">
              <span>// DEPLOYED WITH INDUSTRY LEADERS &amp; RESEARCH INSTITUTIONS</span>
              <span className="text-sage font-bold">VERIFIED PRODUCTION ENGAGEMENTS</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 items-center">
              {partners.map((p) => {
                const content = (
                  <div className="p-3 border border-concrete/30 dark:border-charcoal-border bg-white dark:bg-charcoal flex flex-col items-center justify-center text-center h-20 hover:border-sage transition-all group">
                    {p.src ? (
                      <img
                        src={p.src}
                        alt={p.name}
                        className="max-h-8 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity dark:invert"
                      />
                    ) : (
                      <span className="text-xs font-mono font-bold tracking-tight text-charcoal dark:text-ivory group-hover:text-sage transition-colors">
                        {p.label}
                      </span>
                    )}
                    <span className="text-[8px] font-mono text-concrete mt-1 tracking-tighter truncate max-w-full">
                      {p.meta}
                    </span>
                  </div>
                );

                return p.url ? (
                  <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" title={p.name}>
                    {content}
                  </a>
                ) : (
                  <div key={p.name}>{content}</div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SECTION 03 — TECHNOLOGY (Across Three Dimensions)
        ══════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 border-b border-concrete/40 dark:border-charcoal-border bg-ivory dark:bg-charcoal">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-concrete/30 dark:border-charcoal-border gap-4">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-sage uppercase block mb-1">
                  SEC_02 // CORE TECHNOLOGY STACK
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-charcoal dark:text-ivory">
                  Intelligence Across
                  <br />
                  Three Dimensions.
                </h2>
              </div>
              <p className="text-xs font-mono text-concrete-dark dark:text-concrete max-w-md">
                MODULAR, PRODUCTION-GRADE ARTIFICIAL INTELLIGENCE ENGINEERED FOR DETERMINISTIC INDUSTRIAL DEPLOYMENT.
              </p>
            </div>

            {/* 3 Technology Pillars */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Pillar 01: Computer Vision */}
              <div className="p-6 sm:p-8 border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal-surface flex flex-col justify-between space-y-6 hover:border-sage transition-all group">
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-concrete/20 dark:border-charcoal-border">
                    <span className="text-xl font-mono font-bold text-sage">01 //</span>
                    <Eye size={20} className="text-charcoal dark:text-ivory group-hover:text-sage transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold font-display mb-3 text-charcoal dark:text-ivory">
                    Computer Vision
                  </h3>
                  <p className="text-xs font-mono text-concrete-dark dark:text-concrete leading-relaxed mb-6">
                    Edge-quantized neural networks performing real-time object tracking, spatial geometry calculation, surface defect inspection, and safety compliance at sub-20ms frame latencies.
                  </p>
                  <ul className="space-y-2 text-xs font-mono border-t border-concrete/15 dark:border-charcoal-border pt-4">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-sage inline-block" />
                      <span>YOLOv8/v10 &amp; Vision Transformers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-sage inline-block" />
                      <span>On-Premise RTSP Stream Decoders</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-sage inline-block" />
                      <span>TensorRT / OpenVINO INT8 Pipeline</span>
                    </li>
                  </ul>
                </div>
                <Link
                  to="/expertise/artificial-intelligence/computer-vision"
                  className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal dark:text-ivory group-hover:text-burntamber flex items-center gap-1.5 pt-4 border-t border-concrete/20 dark:border-charcoal-border transition-colors"
                >
                  <span>Explore Vision Research</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Pillar 02: Generative AI */}
              <div className="p-6 sm:p-8 border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal-surface flex flex-col justify-between space-y-6 hover:border-sage transition-all group">
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-concrete/20 dark:border-charcoal-border">
                    <span className="text-xl font-mono font-bold text-sage">02 //</span>
                    <Brain size={20} className="text-charcoal dark:text-ivory group-hover:text-sage transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold font-display mb-3 text-charcoal dark:text-ivory">
                    Generative AI
                  </h3>
                  <p className="text-xs font-mono text-concrete-dark dark:text-concrete leading-relaxed mb-6">
                    Private, domain-adapted language models and multimodal synthesis engines. Eliminates data leakage while extracting structured intelligence from massive unstructured enterprise documents.
                  </p>
                  <ul className="space-y-2 text-xs font-mono border-t border-concrete/15 dark:border-charcoal-border pt-4">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-sage inline-block" />
                      <span>Private RAG &amp; Vector Embeddings</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-sage inline-block" />
                      <span>Synthetic Industrial Dataset Gen</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-sage inline-block" />
                      <span>Zero Public Cloud Data Transmission</span>
                    </li>
                  </ul>
                </div>
                <Link
                  to="/expertise/artificial-intelligence/generative-ai"
                  className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal dark:text-ivory group-hover:text-burntamber flex items-center gap-1.5 pt-4 border-t border-concrete/20 dark:border-charcoal-border transition-colors"
                >
                  <span>Explore Generative Systems</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Pillar 03: Agentic AI */}
              <div className="p-6 sm:p-8 border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal-surface flex flex-col justify-between space-y-6 hover:border-sage transition-all group">
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-concrete/20 dark:border-charcoal-border">
                    <span className="text-xl font-mono font-bold text-sage">03 //</span>
                    <Bot size={20} className="text-charcoal dark:text-ivory group-hover:text-sage transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold font-display mb-3 text-charcoal dark:text-ivory">
                    Agentic AI
                  </h3>
                  <p className="text-xs font-mono text-concrete-dark dark:text-concrete leading-relaxed mb-6">
                    Autonomous multi-step execution agents that reason, validate, and execute complex workflows across enterprise databases, SCADA controllers, and external APIs with deterministic guardrails.
                  </p>
                  <ul className="space-y-2 text-xs font-mono border-t border-concrete/15 dark:border-charcoal-border pt-4">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-sage inline-block" />
                      <span>Deterministic State Machine Guardrails</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-sage inline-block" />
                      <span>Autonomous Tool Synthesis &amp; API Relays</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-sage inline-block" />
                      <span>24/7 Self-Healing Execution Loops</span>
                    </li>
                  </ul>
                </div>
                <Link
                  to="/expertise/artificial-intelligence/ai-agent-development"
                  className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal dark:text-ivory group-hover:text-burntamber flex items-center gap-1.5 pt-4 border-t border-concrete/20 dark:border-charcoal-border transition-colors"
                >
                  <span>Explore Autonomous Agents</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SECTION 04 — PRODUCTS (Real-World Applications)
        ══════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 border-b border-concrete/40 dark:border-charcoal-border bg-techlight/40 dark:bg-charcoal-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-concrete/30 dark:border-charcoal-border gap-4">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-sage uppercase block mb-1">
                  SEC_03 // PRODUCTION SYSTEMS
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-charcoal dark:text-ivory">
                  AI Products.
                  <br />
                  Real-World Applications.
                </h2>
              </div>
              <p className="text-xs font-mono text-concrete-dark dark:text-concrete max-w-md">
                BREADTH OF DEPLOYED HARDWARE-INTEGRATED SOFTWARE SYSTEMS SERVING INDUSTRIAL, HOLISTIC AND EDUCATIONAL SECTORS.
              </p>
            </div>

            {/* 3 Products Showcase */}
            <div className="space-y-8">
              {/* Product 01: Nirikshan Vision Systems */}
              <div className="border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal p-6 sm:p-10">
                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-sage tracking-widest uppercase">
                      <span>SYSTEM_01</span>
                      <span>//</span>
                      <span>ENTERPRISE INDUSTRIAL VISION</span>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-bold font-display text-charcoal dark:text-ivory">
                      Nirikshan Vision Systems
                    </h3>
                    <p className="text-sm font-sans text-concrete-dark dark:text-concrete leading-relaxed max-w-xl">
                      Turnkey computer vision suite integrating directly with industrial RTSP/IP cameras. Performs sub-20ms PPE compliance checks, high-speed optical defect detection, fire/smoke hazard alerting, and automated number plate recognition (ANPR).
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2 text-xs font-mono">
                      {["PPE Safety", "Micro-Defect AOI", "Early Fire Alerts", "ANPR Gates"].map((feat) => (
                        <span key={feat} className="px-2.5 py-1 border border-concrete/30 dark:border-charcoal-border bg-techlight dark:bg-charcoal-surface">
                          {feat}
                        </span>
                      ))}
                    </div>
                    <div className="pt-4">
                      <Link to="/products/vision-systems">
                        <Button className="bg-charcoal text-ivory border border-charcoal hover:bg-burntamber hover:border-burntamber hover:text-white text-xs font-mono uppercase tracking-wider px-6 h-11 rounded-none font-bold transition-all shadow-sm">
                          Explore Vision Systems Platform →
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="lg:col-span-5 border border-charcoal/30 dark:border-charcoal-border bg-black aspect-[16/10] overflow-hidden relative">
                    <img
                      src={cvPpeImg}
                      alt="Nirikshan Vision Systems"
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute bottom-2 left-2 bg-charcoal/90 px-2 py-1 text-[9px] font-mono text-sage border border-charcoal-border">
                      FEED: INFERENCE_ENGAGED [99.8%]
                    </div>
                  </div>
                </div>
              </div>

              {/* Product 02: Astro Nirikshan */}
              <div className="border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal p-6 sm:p-10">
                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-burntamber tracking-widest uppercase">
                      <span>SYSTEM_02</span>
                      <span>//</span>
                      <span>COSMIC SCIENCES &amp; COMPUTATIONAL JYOTISH</span>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-bold font-display text-charcoal dark:text-ivory">
                      Astro Nirikshan
                    </h3>
                    <p className="text-sm font-sans text-concrete-dark dark:text-concrete leading-relaxed max-w-xl">
                      A specialized digital astrology and holistic guidance platform combining traditional Vedic Jyotish, Chaldean numerology, Vastu Shastra, and Janam Kundli with 100% client-side calculation privacy.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2 text-xs font-mono">
                      {["Vedic Astrology", "Chaldean Numerology", "Vastu Shastra", "100% Client Privacy"].map((feat) => (
                        <span key={feat} className="px-2.5 py-1 border border-burntamber/30 bg-burntamber/5 text-charcoal dark:text-ivory">
                          {feat}
                        </span>
                      ))}
                    </div>
                    <div className="pt-4">
                      <Link to="/products/astro-nirikshan">
                        <Button className="bg-charcoal text-ivory border border-charcoal hover:bg-burntamber hover:border-burntamber hover:text-white text-xs font-mono uppercase tracking-wider px-6 h-11 rounded-none font-bold transition-all shadow-sm">
                          Explore Astro Nirikshan →
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="lg:col-span-5 border border-concrete/30 dark:border-charcoal-border bg-charcoal p-6 text-ivory aspect-[16/10] flex flex-col justify-between">
                    <div className="text-[10px] font-mono text-burntamber tracking-widest uppercase">
                      ARCHIVE // VEDIC &amp; NUMERICAL ALGORITHMS
                    </div>
                    <div>
                      <h4 className="text-xl font-bold font-display text-ivory mb-2">
                        Ancient Wisdom. Modern Precision.
                      </h4>
                      <p className="text-xs font-mono text-concrete leading-relaxed">
                        Deterministic mathematical ephemeris calculations without cloud storage of birth data.
                      </p>
                    </div>
                    <div className="text-[10px] font-mono text-concrete/70 border-t border-charcoal-border pt-2 flex justify-between">
                      <span>PRIVACY: LOCAL_BROWSER</span>
                      <span className="text-burntamber">VERIFIED</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product 03: 10X AI Productivity */}
              <div className="border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal p-6 sm:p-10">
                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-sage tracking-widest uppercase">
                      <span>SYSTEM_03</span>
                      <span>//</span>
                      <span>WORKFORCE &amp; ACADEMIC ENABLEMENT</span>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-bold font-display text-charcoal dark:text-ivory">
                      10X AI Productivity Training
                    </h3>
                    <p className="text-sm font-sans text-concrete-dark dark:text-concrete leading-relaxed max-w-xl">
                      Practical hands-on AI training ecosystems for schools, engineering colleges, and enterprise teams. Covers foundation models, prompt architecture, edge computer vision, and workflow automation.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2 text-xs font-mono">
                      {["10,000+ Learners Trained", "NEP 2020 Aligned", "Hands-On Capstones", "Zero PII Leakage"].map((feat) => (
                        <span key={feat} className="px-2.5 py-1 border border-concrete/30 dark:border-charcoal-border bg-techlight dark:bg-charcoal-surface">
                          {feat}
                        </span>
                      ))}
                    </div>
                    <div className="pt-4 flex gap-3">
                      <Link to="/products/10x-ai-productivity">
                        <Button className="bg-charcoal text-ivory border border-charcoal hover:bg-burntamber hover:border-burntamber hover:text-white text-xs font-mono uppercase tracking-wider px-6 h-11 rounded-none font-bold transition-all shadow-sm">
                          Explore 10X Programmes →
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="lg:col-span-5 border border-concrete/30 dark:border-charcoal-border bg-charcoal p-6 text-ivory aspect-[16/10] flex flex-col justify-between">
                    <div className="text-[10px] font-mono text-sage tracking-widest uppercase">
                      TELEMETRY // PAN-INDIA ENABLEMENT
                    </div>
                    <div>
                      <h4 className="text-xl font-bold font-display text-ivory mb-2">
                        Making India AI-Ready.
                      </h4>
                      <p className="text-xs font-mono text-concrete leading-relaxed">
                        Accredited bootcamps and enterprise transformation cohorts across universities and industries.
                      </p>
                    </div>
                    <div className="text-[10px] font-mono text-concrete/70 border-t border-charcoal-border pt-2 flex justify-between">
                      <span>PORTFOLIO: CODE-FIRST</span>
                      <span className="text-sage font-bold">100% PRACTICAL</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SECTION 05 — INDUSTRIES (Sector Deployments)
        ══════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 border-b border-concrete/40 dark:border-charcoal-border bg-ivory dark:bg-charcoal">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-concrete/30 dark:border-charcoal-border gap-4">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-sage uppercase block mb-1">
                  SEC_04 // SECTOR DEPLOYMENTS
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-charcoal dark:text-ivory">
                  Engineered for High-Stakes
                  <br />
                  Operational Environments.
                </h2>
              </div>
              <p className="text-xs font-mono text-concrete-dark dark:text-concrete max-w-md">
                TECHNICAL CAPABILITIES ADAPTED FOR COMPLIANCE, SAFETY AND PRECISION ACROSS CORE INFRASTRUCTURE.
              </p>
            </div>

            {/* 6 Industry Panels Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industries.map((ind, idx) => (
                <div
                  key={ind.name}
                  className="p-6 border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal-surface flex flex-col justify-between space-y-4 hover:border-sage transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-concrete/20 dark:border-charcoal-border text-xs font-mono text-concrete">
                      <span>{ind.num} //</span>
                      <span className="text-[10px] font-bold text-sage">{ind.code}</span>
                    </div>
                    <h3 className="text-xl font-bold font-display mb-1 text-charcoal dark:text-ivory group-hover:text-burntamber transition-colors">
                      {ind.name}
                    </h3>
                    <div className="text-[11px] font-mono text-sage mb-3">
                      {ind.tagline}
                    </div>
                    <p className="text-xs font-sans text-concrete-dark dark:text-concrete leading-relaxed mb-4">
                      {ind.desc}
                    </p>
                  </div>

                  <div className="border-t border-concrete/20 dark:border-charcoal-border pt-3 space-y-1 text-[11px] font-mono text-concrete-dark dark:text-concrete">
                    {ind.specs.map((sp, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-sage inline-block" />
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
            SECTION 06 — RESEARCH & ENGINEERING
        ══════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 border-b border-concrete/40 dark:border-charcoal-border bg-techlight/30 dark:bg-charcoal">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-concrete/30 dark:border-charcoal-border gap-4">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-sage uppercase block mb-1">
                  SEC_05 // APPLIED RESEARCH &amp; LABS
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-charcoal dark:text-ivory">
                  Beyond Algorithms.
                  <br />
                  Into Engineering.
                </h2>
              </div>
              <p className="text-xs font-mono text-concrete-dark dark:text-concrete max-w-md">
                CONTINUOUS INVESTMENTS IN APPLIED RESEARCH, QUANTIZATION KERNELS, AND SYSTEM ARCHITECTURES.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  code: "RES_CV_01",
                  title: "Computer Vision Research",
                  focus: "Edge-Quantized YOLO & ViT Models",
                  detail: "Optimizing neural weights for sub-byte memory layouts. Reducing model footprint by 68% while maintaining 99.8% precision on industrial defects."
                },
                {
                  code: "RES_ML_02",
                  title: "Machine Learning",
                  focus: "Adaptive Reinforcement & Transfer Policies",
                  detail: "Training robust perception models on small-sample industrial datasets where defect samples are extremely rare in production."
                },
                {
                  code: "RES_GEN_03",
                  title: "Generative AI",
                  focus: "Domain-Adapted SLMs & Private RAG",
                  detail: "Engineering small language models (SLMs) fine-tuned for high-speed deterministic extraction from technical engineering drawings and manuals."
                },
                {
                  code: "RES_AGT_04",
                  title: "Agentic Systems",
                  focus: "Deterministic Guardrails & State Machines",
                  detail: "Creating multi-step agent orchestration architectures where probabilistic outputs are bounded by deterministic verification gates."
                },
                {
                  code: "RES_AUT_05",
                  title: "Intelligent Automation",
                  focus: "Air-Gapped Edge Inference Servers",
                  detail: "Hardware-level integration connecting RTSP camera decoders with legacy PLC/SCADA industrial controllers in under 15ms."
                },
                {
                  code: "RES_SOC_06",
                  title: "Applied AI Research",
                  focus: "Grassroots AgriTech & Ecological Vision",
                  detail: "Developing ultra-low-power edge vision algorithms optimized for solar-powered microcontrollers deployed in rural terrains."
                }
              ].map((res) => (
                <div
                  key={res.code}
                  className="p-6 border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal-surface space-y-3 hover:border-sage transition-all"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-sage pb-2 border-b border-concrete/20 dark:border-charcoal-border">
                    <span>{res.code}</span>
                    <span className="text-concrete">ACTIVE LAB</span>
                  </div>
                  <h3 className="text-lg font-bold font-display text-charcoal dark:text-ivory group-hover:text-burntamber transition-colors">
                    {res.title}
                  </h3>
                  <div className="text-xs font-mono text-concrete-dark dark:text-concrete font-semibold">
                    {res.focus}
                  </div>
                  <p className="text-xs font-sans text-concrete-dark dark:text-concrete leading-relaxed">
                    {res.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SECTION 07 — DEVELOPMENT APPROACH (Timeline)
        ══════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 border-b border-concrete/40 dark:border-charcoal-border bg-ivory dark:bg-charcoal">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-concrete/30 dark:border-charcoal-border gap-4">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-sage uppercase block mb-1">
                  SEC_06 // METHODOLOGY &amp; EXECUTION
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-charcoal dark:text-ivory">
                  From Problem Definition
                  <br />
                  to Production Deployment.
                </h2>
              </div>
              <p className="text-xs font-mono text-concrete-dark dark:text-concrete max-w-md">
                SIX-STAGE RIGOROUS ENGINEERING CYCLE ENSURING DETERMINISTIC RELIABILITY IN MISSION-CRITICAL SYSTEMS.
              </p>
            </div>

            {/* 6 Steps Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {approachSteps.map((st) => (
                <div
                  key={st.num}
                  className="p-6 border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal-surface flex flex-col justify-between space-y-4 hover:border-sage transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-concrete/20 dark:border-charcoal-border">
                      <span className="text-xl font-mono font-bold text-sage">{st.num} //</span>
                      <span className="text-[10px] font-mono text-concrete uppercase tracking-widest">
                        PHASE_{st.num}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold font-display mb-1 text-charcoal dark:text-ivory group-hover:text-burntamber transition-colors">
                      {st.title}
                    </h3>
                    <div className="text-[10px] font-mono text-sage uppercase tracking-wider mb-3">
                      {st.label}
                    </div>
                    <p className="text-xs font-sans text-concrete-dark dark:text-concrete leading-relaxed">
                      {st.desc}
                    </p>
                  </div>

                  <div className="border-t border-concrete/20 dark:border-charcoal-border pt-3 text-[10px] font-mono text-concrete">
                    <span className="text-sage font-bold">DELIVERABLE: </span>
                    <span>{st.deliverable}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SECTION 08 — CASE STUDIES (Verified Outcomes)
        ══════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 border-b border-concrete/40 dark:border-charcoal-border bg-techlight/30 dark:bg-charcoal-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-concrete/30 dark:border-charcoal-border gap-4">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-sage uppercase block mb-1">
                  SEC_07 // DEPLOYMENT VERIFICATION
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-charcoal dark:text-ivory">
                  Engineered Outcomes.
                </h2>
              </div>
              <p className="text-xs font-mono text-concrete-dark dark:text-concrete max-w-md">
                QUANTIFIABLE SYSTEM IMPROVEMENTS MEASURED ACROSS ACTIVE ENTERPRISE PARTNER ENVIRONMENTS.
              </p>
            </div>

            {/* Case Study Feature Card */}
            <div className="border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal p-6 sm:p-10 space-y-8">
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-4">
                  <div className="text-[10px] font-mono text-sage tracking-widest uppercase">
                    DEPLOYMENT CASE // AUTOMOTIVE COMPONENT QUALITY AOI
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-bold font-display text-charcoal dark:text-ivory">
                    Automating Visual Inspection at Assembly Speeds
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-concrete/20 dark:border-charcoal-border text-xs font-mono">
                    <div className="p-3 bg-techlight dark:bg-charcoal-surface border border-concrete/20 dark:border-charcoal-border">
                      <div className="text-concrete text-[10px] uppercase mb-1">THE CHALLENGE</div>
                      <p className="text-charcoal dark:text-ivory leading-relaxed">
                        Manual optical inspection missed micro-cracks on precision stamped components during rapid assembly line cycles.
                      </p>
                    </div>
                    <div className="p-3 bg-techlight dark:bg-charcoal-surface border border-concrete/20 dark:border-charcoal-border">
                      <div className="text-sage text-[10px] uppercase mb-1">THE ENGINEERING SOLUTION</div>
                      <p className="text-charcoal dark:text-ivory leading-relaxed">
                        Deployed dual-camera Jetson edge station with customized INT8 classification model relaying to pneumatic reject arm in &lt;18ms.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quantitative Results */}
                <div className="lg:col-span-4 p-6 border border-charcoal/30 dark:border-charcoal-border bg-charcoal text-ivory space-y-4">
                  <div className="text-[10px] font-mono text-sage uppercase tracking-widest">
                    VERIFIED METRICS
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-3xl font-bold font-display text-sage">94%</div>
                      <div className="text-[11px] font-mono text-concrete">REDUCTION IN DEFECT ESCAPES</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold font-display text-ivory">14.8ms</div>
                      <div className="text-[11px] font-mono text-concrete">EDGE INFERENCE TIME</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold font-display text-sage">100%</div>
                      <div className="text-[11px] font-mono text-concrete">AUDIT TRAIL LOGGING</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Case Study Quote */}
              <div className="p-6 border-t border-concrete/30 dark:border-charcoal-border font-serif italic text-base sm:text-lg text-charcoal dark:text-ivory">
                "Nirikshan AI's edge vision system transformed our quality inspection process. Defect detection that previously created assembly bottlenecks now happens at full line conveyor speeds with zero cloud latency."
                <div className="mt-3 font-sans not-italic text-xs font-mono text-concrete">
                  — Operations Director, Enterprise Manufacturing Client
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SECTION 09 — WHO WE ARE & COMPANY LEADERSHIP
        ══════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 border-b border-concrete/40 dark:border-charcoal-border bg-ivory dark:bg-charcoal">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-concrete/30 dark:border-charcoal-border gap-4">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-sage uppercase block mb-1">
                  SEC_08 // WHO WE ARE &amp; EXECUTIVE LEADERSHIP
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-charcoal dark:text-ivory">
                  Architects of Edge Intelligence.
                  <br />
                  <span className="font-serif italic font-normal text-concrete-dark dark:text-concrete">
                    Built for Industrial Reality.
                  </span>
                </h2>
              </div>
              <div className="text-xs font-mono text-concrete-dark dark:text-concrete max-w-md">
                FOUNDED AT DEV BHOOMI'S IEC INNOVATION LAB · EVOLVED INTO A REGISTERED DEEP-TECH RESEARCH &amp; PRODUCT ENGINEERING COMPANY.
              </div>
            </div>

            {/* Narrative & Institutional Lineage */}
            <div className="grid lg:grid-cols-12 gap-8 mb-12">
              <div className="lg:col-span-7 space-y-4 text-sm font-sans text-concrete-dark dark:text-concrete leading-relaxed">
                <p>
                  Nirikshan AI was conceived at <span className="font-semibold text-charcoal dark:text-ivory">Dev Bhoomi</span> through the student research collective in the IEC Innovation Lab. What began as experimental late-night work on neural backbones, CUDA kernels, and real-time computer vision rapidly matured into an enterprise-grade technology company.
                </p>
                <p>
                  Today, <span className="font-semibold text-charcoal dark:text-ivory">Nirikshan AI Private Limited</span> engineers end-to-end autonomous perception systems for high-stakes operational environments — from automated optical inspection on high-speed industrial assembly lines to solar-powered wildlife deterrence stations in rural Uttarakhand.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link to="/who-we-are">
                    <Button className="bg-charcoal text-ivory border border-charcoal hover:bg-burntamber hover:border-burntamber hover:text-white text-xs font-mono uppercase tracking-wider px-6 h-11 rounded-none font-bold transition-all shadow-sm">
                      Explore Who We Are &amp; Culture →
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button variant="outline" className="border-concrete/60 dark:border-charcoal-border text-charcoal dark:text-ivory text-xs font-mono uppercase tracking-wider px-6 h-11 rounded-none font-bold hover:border-burntamber hover:text-burntamber hover:bg-burntamber/5 transition-all">
                      Read Company Profile
                    </Button>
                  </Link>
                </div>
              </div>

              {/* R&D Coordinates Card */}
              <div className="lg:col-span-5 p-6 border border-charcoal/30 dark:border-charcoal-border bg-charcoal text-ivory space-y-4">
                <div className="text-[10px] font-mono tracking-widest text-sage uppercase pb-2 border-b border-charcoal-border flex justify-between">
                  <span>FACILITY TOPOLOGY</span>
                  <span className="text-sage">MCA CIN: U72900UR2023PTC015792</span>
                </div>
                <div className="space-y-3 font-mono text-xs text-concrete">
                  <div>
                    <span className="text-ivory font-bold block mb-0.5">R&amp;D HARDWARE LAB — HARIDWAR</span>
                    <span>Uttarakhand 249401, India</span>
                    <span className="block text-[10px] text-sage mt-0.5">SENSOR PROTOTYPING &amp; EDGE EMBEDDED KERNELS</span>
                  </div>
                  <div>
                    <span className="text-ivory font-bold block mb-0.5">SOFTWARE ENGINEERING — DEHRADUN</span>
                    <span>Dehradun IT Corridor, Uttarakhand, India</span>
                    <span className="block text-[10px] text-sage mt-0.5">VISION MODEL TRAINING, RTSP &amp; WEB PLATFORMS</span>
                  </div>
                  <div className="pt-2 border-t border-charcoal-border flex justify-between text-[10px]">
                    <span>INCORPORATION: MCA INDIA</span>
                    <span className="text-sage font-bold">ACTIVE &amp; AUDITED</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Leadership Spotlight (Anshul & CA Vikram Biyani) */}
            <div className="border-t border-concrete/30 dark:border-charcoal-border pt-10">
              <div className="flex items-center justify-between mb-8 pb-3 border-b border-concrete/20 dark:border-charcoal-border">
                <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-sage uppercase">
                  <span className="w-1.5 h-1.5 bg-sage inline-block animate-pulse" />
                  <span>// EXECUTIVE LEADERSHIP DOSSIER</span>
                </div>
                <span className="text-[10px] font-mono text-concrete">
                  STEERING APPLIED AI &amp; FISCAL RESILIENCE
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Leader 01: Anshul */}
                <div className="p-6 sm:p-8 border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal-surface space-y-6 hover:border-sage transition-all group">
                  <div className="grid sm:grid-cols-12 gap-6 items-start">
                    <div className="sm:col-span-5 aspect-[4/5] border border-charcoal/20 dark:border-charcoal-border overflow-hidden bg-charcoal relative">
                      <img
                        src={anshulImage}
                        alt="Anshul — Founder & CEO"
                        className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                      />
                      <div className="absolute bottom-1 left-1 bg-charcoal/90 px-1.5 py-0.5 text-[8px] font-mono text-sage border border-charcoal-border">
                        EXE_01 // CEO
                      </div>
                    </div>
                    <div className="sm:col-span-7 space-y-2">
                      <div className="text-[10px] font-mono text-sage tracking-widest uppercase">
                        FOUNDER &amp; CHIEF EXECUTIVE OFFICER
                      </div>
                      <h3 className="text-2xl font-bold font-display text-charcoal dark:text-ivory group-hover:text-burntamber transition-colors">
                        Anshul
                      </h3>
                      <div className="text-xs font-mono text-concrete-dark dark:text-concrete">
                        SYSTEM ARCHITECTURE &amp; DEEP-TECH R&amp;D
                      </div>
                      <p className="text-xs font-sans text-concrete-dark dark:text-concrete leading-relaxed pt-1">
                        Spearheads technical strategy, neural network quantization, and embedded CUDA kernel optimization. Translates complex computer vision breakthroughs into dependable industrial systems.
                      </p>
                      <div className="pt-2">
                        <a
                          href="https://www.linkedin.com/in/anshultech1"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-charcoal dark:text-ivory hover:text-burntamber font-semibold transition-colors"
                        >
                          <Linkedin size={13} />
                          <span>LinkedIn Dossier →</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-techlight dark:bg-charcoal border-l-2 border-sage text-xs font-mono text-concrete-dark dark:text-concrete italic leading-relaxed">
                    "Operational excellence is about designing environments where AI models operate deterministically on the edge in under 15ms without cloud dependencies."
                  </div>
                </div>

                {/* Leader 02: CA Vikram Biyani */}
                <div className="p-6 sm:p-8 border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal-surface space-y-6 hover:border-sage transition-all group">
                  <div className="grid sm:grid-cols-12 gap-6 items-start">
                    <div className="sm:col-span-5 aspect-[4/5] border border-charcoal/20 dark:border-charcoal-border overflow-hidden bg-charcoal relative">
                      <img
                        src={vikramImage}
                        alt="CA Vikram Biyani — Director – Finance"
                        className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                      />
                      <div className="absolute bottom-1 left-1 bg-charcoal/90 px-1.5 py-0.5 text-[8px] font-mono text-sage border border-charcoal-border">
                        EXE_02 // FINANCE
                      </div>
                    </div>
                    <div className="sm:col-span-7 space-y-2">
                      <div className="text-[10px] font-mono text-sage tracking-widest uppercase">
                        DIRECTOR – FINANCE &amp; STRATEGY
                      </div>
                      <h3 className="text-2xl font-bold font-display text-charcoal dark:text-ivory group-hover:text-burntamber transition-colors">
                        CA Vikram Biyani
                      </h3>
                      <div className="text-xs font-mono text-concrete-dark dark:text-concrete">
                        CAPITAL EFFICIENCY &amp; GOVERNANCE
                      </div>
                      <p className="text-xs font-sans text-concrete-dark dark:text-concrete leading-relaxed pt-1">
                        Directs fiscal policy, capital efficiency, and strategic enterprise alliances. Ensures deep-tech research initiatives are backed by solid, transparent economic structures.
                      </p>
                      <div className="pt-2">
                        <a
                          href="https://www.linkedin.com/in/viekram-biyaani-44810817b"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-charcoal dark:text-ivory hover:text-burntamber font-semibold transition-colors"
                        >
                          <Linkedin size={13} />
                          <span>LinkedIn Dossier →</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-techlight dark:bg-charcoal border-l-2 border-sage text-xs font-mono text-concrete-dark dark:text-concrete italic leading-relaxed">
                    "Sustainable deep-tech innovation requires disciplined capital allocation and transparent governance that build lasting institutional trust."
                  </div>
                </div>
              </div>
            </div>

            {/* Core Values 4-Grid */}
            <div className="mt-10 pt-8 border-t border-concrete/30 dark:border-charcoal-border grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-4 border border-concrete/30 dark:border-charcoal-border bg-white dark:bg-charcoal-surface hover:border-sage transition-all">
                <div className="text-sage font-bold uppercase mb-1">01 // RIGOROUS ACCURACY</div>
                <p className="text-concrete-dark dark:text-concrete leading-snug">
                  Zero probabilistic guesswork. Tested against real industrial tolerances of ±0.02mm.
                </p>
              </div>
              <div className="p-4 border border-concrete/30 dark:border-charcoal-border bg-white dark:bg-charcoal-surface hover:border-sage transition-all">
                <div className="text-sage font-bold uppercase mb-1">02 // DATA SOVEREIGNTY</div>
                <p className="text-concrete-dark dark:text-concrete leading-snug">
                  100% on-premise execution with zero streaming or recurrent storage on public cloud servers.
                </p>
              </div>
              <div className="p-4 border border-concrete/30 dark:border-charcoal-border bg-white dark:bg-charcoal-surface hover:border-sage transition-all">
                <div className="text-sage font-bold uppercase mb-1">03 // FIELD INTEGRATION</div>
                <p className="text-concrete-dark dark:text-concrete leading-snug">
                  Full embedded stack: camera selection, mounting, SCADA/PLC relay, and edge processing.
                </p>
              </div>
              <div className="p-4 border border-concrete/30 dark:border-charcoal-border bg-white dark:bg-charcoal-surface hover:border-sage transition-all">
                <div className="text-sage font-bold uppercase mb-1">04 // OPEN TELEMETRY</div>
                <p className="text-concrete-dark dark:text-concrete leading-snug">
                  Complete audit trails, determinism logs, and transparent real-time inference diagnostics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SECTION 10 — TECHNICAL CTA (Dark Charcoal Section)
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-28 bg-charcoal text-ivory relative overflow-hidden border-b border-charcoal-border">
          {/* Technical Grid Overlay */}
          <div className="absolute inset-0 tech-grid-bg opacity-15 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
            <div className="inline-block px-3 py-1 mb-6 text-[10px] font-mono uppercase tracking-[0.2em] bg-charcoal-surface border border-charcoal-border text-sage">
              SEC_09 // COLLABORATION PROTOCOL
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight text-ivory leading-tight max-w-3xl mx-auto mb-6">
              Have a Complex Problem?
              <br />
              <span className="font-serif italic font-normal text-concrete">
                Let's Engineer the Solution.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-concrete max-w-xl mx-auto leading-relaxed mb-8 font-sans">
              From on-premise industrial computer vision pipelines to custom autonomous agent architectures — our engineering team is ready to analyze your technical requirements.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact">
                <Button className="bg-charcoal text-ivory border border-charcoal-border hover:bg-burntamber hover:border-burntamber hover:text-white text-xs font-mono uppercase tracking-wider px-8 h-12 rounded-none font-bold transition-all shadow-lg">
                  Start a Conversation <ArrowRight size={14} className="ml-2" />
                </Button>
              </Link>
              <a
                href="mailto:info@nirikshanai.com"
                className="text-xs font-mono uppercase tracking-wider text-concrete hover:text-burntamber hover:border-burntamber px-6 py-3 border border-charcoal-border transition-all"
              >
                Direct: info@nirikshanai.com
              </a>
            </div>

            {/* Direct Phone Telemetry */}
            <div className="mt-10 pt-6 border-t border-charcoal-border/50 max-w-md mx-auto flex items-center justify-between text-[11px] font-mono text-concrete">
              <span>TELEPHONE: +91 9410 992204</span>
              <span>//</span>
              <span className="text-sage">RESPONSE SLA: &lt; 24H</span>
            </div>
          </div>
        </section>
      </main>

      {/* SECTION 11 — FOOTER */}
      <Footer />
    </div>
  );
};

export default Index;
