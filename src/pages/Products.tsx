import React, { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SOLUTION_CATEGORIES,
  CV_SOLUTIONS,
  PLATFORM_WORKFLOW_STEPS,
  DEPLOYMENT_MODELS,
  SUPPORTED_INFRASTRUCTURE,
  INDUSTRY_APPLICATIONS,
  COMPARISON_MATRIX,
  CVSolution,
  SolutionCategoryId,
} from "@/data/computerVisionProducts";
import { SolutionDetailSheet } from "@/components/products/SolutionDetailSheet";
import { CustomSolutionForm } from "@/components/products/CustomSolutionForm";
import { AstroNirikshanShowcase } from "@/components/products/AstroNirikshanShowcase";
import {
  Search,
  Filter,
  ArrowRight,
  CheckCircle2,
  X,
  Layers,
  Camera,
  Cpu,
  Scan,
  ShieldCheck,
  Server,
  Zap,
  Target,
  Sparkles,
  ExternalLink,
  GraduationCap,
  Eye,
  Sliders,
  Check
} from "lucide-react";

import cvPpeImg from "@/assets/cv-ppe.png";
import cvDemoImg from "@/assets/computer-vision-demo.png";
import cvFireImg from "@/assets/cv-fire.png";

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawSuite = searchParams.get("suite") || searchParams.get("tab");
  const activeSuite: "vision" | "astro" = rawSuite === "astro" ? "astro" : "vision";

  const handleSuiteChange = (suite: "vision" | "astro") => {
    if (suite === "astro") {
      setSearchParams({ suite: "astro" });
    } else {
      setSearchParams({});
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // State for Directory filtering and search
  const [selectedCategory, setSelectedCategory] = useState<"all" | SolutionCategoryId>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // State for Solution Detail Drawer
  const [activeSolutionId, setActiveSolutionId] = useState<string | null>(null);
  const [prefilledInquiry, setPrefilledInquiry] = useState("");

  const activeSolution = useMemo(() => {
    return CV_SOLUTIONS.find((s) => s.id === activeSolutionId) || null;
  }, [activeSolutionId]);

  const filteredSolutions = useMemo(() => {
    return CV_SOLUTIONS.filter((sol) => {
      const matchesCategory = selectedCategory === "all" || sol.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      return (
        matchesCategory &&
        (sol.name.toLowerCase().includes(query) ||
          sol.shortDescription.toLowerCase().includes(query) ||
          sol.detailedOverview.toLowerCase().includes(query) ||
          sol.capabilities.some((c) => c.toLowerCase().includes(query)) ||
          sol.useCases.some((u) => u.toLowerCase().includes(query)))
      );
    });
  }, [selectedCategory, searchQuery]);

  const handleOpenSolution = (solutionId: string) => {
    setActiveSolutionId(solutionId);
  };

  const handleDiscussSolution = (solutionName: string) => {
    setPrefilledInquiry(solutionName);
    const element = document.getElementById("custom-solutions");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-ivory dark:bg-charcoal text-charcoal dark:text-ivory selection:bg-sage selection:text-charcoal font-sans">
      <SEO
        title={
          activeSuite === "astro"
            ? "Astro Nirikshan — Ancient Cosmic Sciences with AI Precision | Nirikshan AI"
            : "Production AI Platforms & Edge Systems | Nirikshan AI"
        }
        description={
          activeSuite === "astro"
            ? "Explore Vedic astrology, Chaldean numerology, Vastu Shastra, Janam Kundli, and Tarot with 100% client-side privacy on Astro Nirikshan by Nirikshan AI Pvt. Ltd."
            : "Explore Nirikshan AI's industrial computer vision products, enterprise edge AI models, and applied intelligence systems."
        }
        canonical={
          activeSuite === "astro"
            ? "https://nirikshanai.com/products/astro-nirikshan"
            : "https://nirikshanai.com/products"
        }
      />
      <Navigation />

      <main className="relative pt-20">
        {/* ─── STICKY SUITE SELECTOR SUB-BAR ─── */}
        <div className="sticky top-16 z-40 bg-techlight dark:bg-charcoal-surface border-b border-concrete/30 dark:border-charcoal-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest text-concrete mr-1 hidden sm:inline">
                SELECT SUITE:
              </span>

              {/* Vision AI Suite */}
              <button
                onClick={() => handleSuiteChange("vision")}
                className={`px-3.5 py-1.5 uppercase tracking-wider text-xs border transition-all ${
                  activeSuite === "vision"
                    ? "bg-sage text-charcoal border-sage font-bold shadow-sm"
                    : "border-concrete/40 dark:border-charcoal-border text-charcoal dark:text-ivory hover:border-burntamber hover:text-burntamber"
                }`}
              >
                01 Computer Vision &amp; Edge AI
              </button>

              {/* Astro Nirikshan Suite */}
              <button
                onClick={() => handleSuiteChange("astro")}
                className={`px-3.5 py-1.5 uppercase tracking-wider text-xs border transition-all ${
                  activeSuite === "astro"
                    ? "bg-burntamber text-white border-burntamber font-bold shadow-sm"
                    : "border-concrete/40 dark:border-charcoal-border text-charcoal dark:text-ivory hover:border-burntamber hover:text-burntamber"
                }`}
              >
                02 Astro Nirikshan
              </button>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <Link
                to="/products/vision-systems"
                className="text-concrete-dark dark:text-concrete hover:text-burntamber transition-colors hidden md:inline"
              >
                Vision Systems Spec →
              </Link>
              <Link
                to="/10x-ai-productivity"
                className="text-concrete-dark dark:text-concrete hover:text-burntamber transition-colors"
              >
                10X AI Training →
              </Link>
            </div>
          </div>
        </div>

        {activeSuite === "astro" ? (
          /* ─── PURE ASTRO NIRIKSHAN PLATFORM (ISOLATED & DEDICATED) ─── */
          <AstroNirikshanShowcase />
        ) : (
          /* ─── PURE COMPUTER VISION & EDGE PLATFORM ─── */
          <>
            {/* ══════════════════════════════════════════════════════
                SECTION 01 — HERO (Editorial Split-Screen)
            ══════════════════════════════════════════════════════ */}
            <section className="border-b border-concrete/40 dark:border-charcoal-border bg-ivory dark:bg-charcoal relative overflow-hidden">
              <div className="absolute inset-0 tech-grid-bg opacity-40 pointer-events-none" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 md:py-24 relative z-10">
                <div className="flex items-center justify-between pb-4 mb-8 border-b border-concrete/30 dark:border-charcoal-border text-[11px] font-mono tracking-widest text-concrete-dark dark:text-concrete uppercase">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-sage inline-block animate-pulse" />
                    <span>SEC_01 // PRODUCTION SYSTEMS &amp; EDGE PLATFORMS</span>
                    <span className="hidden sm:inline">//</span>
                    <span className="hidden sm:inline">20+ MODELS COMPILED</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>INFERENCE: TENSORRT INT8</span>
                    <span>//</span>
                    <span className="text-sage font-bold">STATUS: DEPLOYED</span>
                  </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                    <div>
                      <div className="inline-block px-3 py-1 mb-6 text-[10px] font-mono uppercase tracking-[0.2em] bg-techlight dark:bg-charcoal-surface border border-concrete/40 dark:border-charcoal-border text-charcoal dark:text-ivory">
                        TURNKEY HARDWARE-INTEGRATED SOFTWARE <span className="text-burntamber font-bold">·</span> ON-PREMISE AIR-GAP
                      </div>

                      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-display tracking-tight leading-[1.02] text-charcoal dark:text-ivory">
                        Production AI Systems.
                        <br />
                        <span className="font-serif italic font-normal text-concrete-dark dark:text-concrete">
                          Engineered for the <span className="text-burntamber">Physical World</span>.
                        </span>
                      </h1>

                      <p className="mt-6 text-base sm:text-lg text-concrete-dark dark:text-concrete max-w-xl leading-relaxed font-sans">
                        From high-speed automated optical defect inspection on automotive conveyor lines to solar-powered wildlife intrusion stations in rural Uttarakhand — our platforms execute 100% on-premise with zero cloud latency.
                      </p>
                    </div>

                    <div className="pt-4 flex flex-wrap gap-4">
                      <Link to="/products/vision-systems">
                        <Button className="bg-charcoal text-ivory border border-charcoal hover:bg-burntamber hover:border-burntamber hover:text-white text-xs font-mono uppercase tracking-wider px-7 h-12 rounded-none font-bold transition-all shadow-sm">
                          Explore Vision Systems Platform <ArrowRight size={14} className="ml-2" />
                        </Button>
                      </Link>
                      <a href="#models-directory">
                        <Button variant="outline" className="border-concrete/60 dark:border-charcoal-border text-charcoal dark:text-ivory hover:border-burntamber hover:text-burntamber hover:bg-burntamber/5 text-xs font-mono uppercase tracking-wider px-7 h-12 rounded-none font-semibold transition-all">
                          Inspect 20+ Model Catalogue
                        </Button>
                      </a>
                    </div>
                  </div>

                  {/* Right Column: 4 Architecture Benchmarks */}
                  <div className="lg:col-span-5 border border-charcoal/30 dark:border-charcoal-border bg-charcoal text-ivory p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
                    <div>
                      <div className="flex items-center justify-between pb-3 mb-6 border-b border-charcoal-border text-[10px] font-mono text-concrete">
                        <span className="flex items-center gap-1.5 text-sage font-bold">
                          <span className="w-1.5 h-1.5 bg-sage inline-block animate-pulse" />
                          PLATFORM RUNTIME SPECIFICATIONS
                        </span>
                        <span>v4.2</span>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <div className="text-3xl sm:text-4xl font-bold font-display text-sage">
                            &lt;15ms
                          </div>
                          <div className="text-[11px] font-mono text-concrete uppercase tracking-wider mt-1">
                            FRAME INGESTION &amp; RELAY LATENCY
                          </div>
                          <p className="text-[11px] font-mono text-concrete/70 mt-0.5">
                            Sub-20ms cutover to industrial pneumatic reject arms.
                          </p>
                        </div>

                        <div className="border-t border-charcoal-border/70 pt-4">
                          <div className="text-3xl sm:text-4xl font-bold font-display text-ivory">
                            20+
                          </div>
                          <div className="text-[11px] font-mono text-concrete uppercase tracking-wider mt-1">
                            PRODUCTION COMPUTER VISION MODELS
                          </div>
                          <p className="text-[11px] font-mono text-concrete/70 mt-0.5">
                            Pre-quantized INT8 neural backbones optimized for edge GPUs.
                          </p>
                        </div>

                        <div className="border-t border-charcoal-border/70 pt-4">
                          <div className="text-3xl sm:text-4xl font-bold font-display text-burntamber">
                            100%
                          </div>
                          <div className="text-[11px] font-mono text-concrete uppercase tracking-wider mt-1">
                            AIR-GAPPED DATA SOVEREIGNTY
                          </div>
                          <p className="text-[11px] font-mono text-concrete/70 mt-0.5">
                            Zero cloud egress or recurring data storage dependencies.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-charcoal-border text-[10px] font-mono text-concrete flex items-center justify-between">
                      <span>RTSP PROTOCOL: H.264/H.265</span>
                      <span className="text-sage font-bold">CUDA ACCELERATED</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                SECTION 02 — THE FOUR PRODUCTION PLATFORMS
            ══════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-24 border-b border-concrete/40 dark:border-charcoal-border bg-techlight/30 dark:bg-charcoal-surface">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-concrete/30 dark:border-charcoal-border gap-4">
                  <div>
                    <span className="text-[11px] font-mono tracking-widest text-sage uppercase block mb-1">
                      SEC_02 // FLAGSHIP PRODUCTION PLATFORMS
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-charcoal dark:text-ivory">
                      Hardware-Integrated AI Systems.
                    </h2>
                  </div>
                  <p className="text-xs font-mono text-concrete-dark dark:text-concrete max-w-md">
                    PRODUCTION SUITES DESIGNED FOR ENTERPRISE INDUSTRIAL QUALITY, GRASSROOTS AGRICULTURE, AND WORKFORCE TRAINING.
                  </p>
                </div>

                <div className="space-y-8">
                  {/* Platform 01: Nirikshan Vision Systems */}
                  <div className="border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal p-6 sm:p-10">
                    <div className="grid lg:grid-cols-12 gap-8 items-center">
                      <div className="lg:col-span-7 space-y-4">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-sage tracking-widest uppercase">
                          <span>SYSTEM_01</span>
                          <span>//</span>
                          <span>INDUSTRIAL VISION SUITE</span>
                        </div>
                        <h3 className="text-3xl sm:text-4xl font-bold font-display text-charcoal dark:text-ivory">
                          Nirikshan Vision Systems
                        </h3>
                        <p className="text-sm font-sans text-concrete-dark dark:text-concrete leading-relaxed max-w-xl">
                          Turnkey computer vision suite integrating directly with industrial RTSP/IP cameras. Performs sub-20ms PPE compliance checks, high-speed optical defect detection, fire/smoke hazard alerting, and automated number plate recognition (ANPR).
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2 text-xs font-mono">
                          {["PPE Safety Compliance", "Micro-Defect AOI (±0.02mm)", "Early Fire/Thermal Alerts", "High-Speed ANPR"].map((f) => (
                            <span key={f} className="px-2.5 py-1 border border-concrete/30 dark:border-charcoal-border bg-techlight dark:bg-charcoal-surface">
                              {f}
                            </span>
                          ))}
                        </div>
                        <div className="pt-4 flex gap-4">
                          <Link to="/products/vision-systems">
                            <Button className="bg-charcoal text-ivory border border-charcoal hover:bg-burntamber hover:border-burntamber hover:text-white text-xs font-mono uppercase tracking-wider px-6 h-11 rounded-none font-bold transition-all shadow-sm">
                              Explore Vision Systems Platform →
                            </Button>
                          </Link>
                        </div>
                      </div>
                      <div className="lg:col-span-5 border border-charcoal/30 dark:border-charcoal-border bg-black aspect-[16/10] overflow-hidden relative">
                        <img src={cvPpeImg} alt="Nirikshan Vision Systems" className="w-full h-full object-cover opacity-90" />
                        <div className="absolute bottom-2 left-2 bg-charcoal/90 px-2 py-1 text-[9px] font-mono text-sage border border-charcoal-border">
                          FEED: LIVE_INFERENCE [99.8%]
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Platform 02: Astro Nirikshan */}
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
                          A specialized digital astrology and holistic guidance platform combining classical Vedic Jyotish, Chaldean numerology, Vastu Shastra, and Janam Kundli with 100% client-side calculation privacy.
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2 text-xs font-mono">
                          {["Vedic Astrology", "Chaldean Numerology", "Vastu Shastra", "100% Client Privacy"].map((f) => (
                            <span key={f} className="px-2.5 py-1 border border-burntamber/30 bg-burntamber/5 text-charcoal dark:text-ivory">
                              {f}
                            </span>
                          ))}
                        </div>
                        <div className="pt-4 flex gap-4">
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

                  {/* Platform 03: 10X AI Productivity */}
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
                          Practical, credit-aligned and corporate AI upskilling curriculum designed for K-12 schools, universities, and enterprise corporate teams to leverage contemporary machine learning tools.
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2 text-xs font-mono">
                          {["K-12 AI Explorers", "University Bootcamps", "Executive Upskilling", "Deployment Capstones"].map((f) => (
                            <span key={f} className="px-2.5 py-1 border border-concrete/30 dark:border-charcoal-border bg-techlight dark:bg-charcoal-surface">
                              {f}
                            </span>
                          ))}
                        </div>
                        <div className="pt-4 flex gap-4">
                          <Link to="/10x-ai-productivity">
                            <Button className="bg-charcoal text-ivory border border-charcoal hover:bg-burntamber hover:border-burntamber hover:text-white text-xs font-mono uppercase tracking-wider px-6 h-11 rounded-none font-bold transition-all shadow-sm">
                              Explore 10X Training Curriculum →
                            </Button>
                          </Link>
                        </div>
                      </div>
                      <div className="lg:col-span-5 border border-charcoal/30 dark:border-charcoal-border bg-charcoal p-6 text-ivory aspect-[16/10] flex flex-col justify-between">
                        <div className="text-[10px] font-mono text-sage tracking-widest uppercase">
                          INSTITUTIONAL METRICS // AI ENABLEMENT
                        </div>
                        <div>
                          <h4 className="text-xl font-bold font-display text-ivory mb-2">
                            10,000+ Students &amp; Professionals Upskilled.
                          </h4>
                          <p className="text-xs font-mono text-concrete leading-relaxed">
                            Practical hands-on workflows with real deployment portfolios.
                          </p>
                        </div>
                        <div className="text-[10px] font-mono text-concrete/70 border-t border-charcoal-border pt-2 flex justify-between">
                          <span>CURRICULUM: NEP ALIGNED</span>
                          <span className="text-sage">ACTIVE</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                SECTION 03 — 20+ COMPUTER VISION MODEL DIRECTORY
            ══════════════════════════════════════════════════════ */}
            <section id="models-directory" className="py-16 md:py-24 border-b border-concrete/40 dark:border-charcoal-border bg-ivory dark:bg-charcoal">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-concrete/30 dark:border-charcoal-border gap-4">
                  <div>
                    <span className="text-[11px] font-mono tracking-widest text-sage uppercase block mb-1">
                      SEC_03 // MODEL REPOSITORY
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-charcoal dark:text-ivory">
                      Computer Vision Directory.
                    </h2>
                  </div>
                  <div className="text-xs font-mono text-concrete-dark dark:text-concrete">
                    SHOWING {filteredSolutions.length} OF {CV_SOLUTIONS.length} PRE-QUANTIZED MODELS
                  </div>
                </div>

                {/* Search & Category Filter Toolbar */}
                <div className="mb-8 space-y-4">
                  <div className="grid md:grid-cols-12 gap-4">
                    <div className="md:col-span-8 relative">
                      <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-concrete" />
                      <Input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="SEARCH BY DEFECT TYPE, MODEL NAME, OR OPERATIONAL DOMAIN..."
                        className="pl-10 h-11 bg-white dark:bg-charcoal-surface border-concrete/40 dark:border-charcoal-border rounded-none text-xs font-mono tracking-wide text-charcoal dark:text-ivory"
                      />
                    </div>
                    <div className="md:col-span-4 flex items-center justify-end">
                      <span className="text-[11px] font-mono text-concrete mr-2">FILTER:</span>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value as any)}
                        className="h-11 px-3 bg-white dark:bg-charcoal-surface border border-concrete/40 dark:border-charcoal-border text-xs font-mono uppercase tracking-wider text-charcoal dark:text-ivory rounded-none w-full"
                      >
                        <option value="all">ALL DOMAINS (20 MODELS)</option>
                        {SOLUTION_CATEGORIES.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider border transition-all ${
                        selectedCategory === "all"
                          ? "bg-charcoal text-ivory dark:bg-sage dark:text-charcoal border-charcoal font-bold"
                          : "border-concrete/30 text-concrete-dark dark:text-concrete hover:border-burntamber hover:text-burntamber"
                      }`}
                    >
                      ALL ({CV_SOLUTIONS.length})
                    </button>
                    {SOLUTION_CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider border transition-all ${
                          selectedCategory === cat.id
                            ? "bg-charcoal text-ivory dark:bg-sage dark:text-charcoal border-charcoal font-bold"
                            : "border-concrete/30 text-concrete-dark dark:text-concrete hover:border-burntamber hover:text-burntamber"
                        }`}
                      >
                        {cat.shortTitle}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Model Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSolutions.map((sol) => (
                    <div
                      key={sol.id}
                      className="p-6 border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal-surface flex flex-col justify-between space-y-4 hover:border-sage transition-all group"
                    >
                      <div>
                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-concrete/20 dark:border-charcoal-border text-[10px] font-mono">
                          <span className="text-sage font-bold">{sol.badge}</span>
                          <span className="text-concrete uppercase">{sol.categoryName}</span>
                        </div>
                        <h3 className="text-xl font-bold font-display text-charcoal dark:text-ivory group-hover:text-burntamber transition-colors mb-2">
                          {sol.name}
                        </h3>
                        <p className="text-xs font-sans text-concrete-dark dark:text-concrete leading-relaxed mb-4">
                          {sol.shortDescription}
                        </p>

                        <div className="space-y-1.5 pt-3 border-t border-concrete/15 dark:border-charcoal-border text-[11px] font-mono text-concrete-dark dark:text-concrete">
                          {sol.capabilities.slice(0, 3).map((cap, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                              <span className="w-1 h-1 bg-sage inline-block" />
                              <span className="truncate">{cap}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-concrete/20 dark:border-charcoal-border flex items-center justify-between">
                        <button
                          onClick={() => handleOpenSolution(sol.id)}
                          className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal dark:text-ivory hover:text-burntamber flex items-center gap-1"
                        >
                          <span>Inspect Spec</span>
                          <ArrowRight size={13} />
                        </button>
                        <button
                          onClick={() => handleDiscussSolution(sol.name)}
                          className="text-[10px] font-mono text-concrete hover:text-sage uppercase"
                        >
                          Request Pilot
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                SECTION 04 — DEPLOYMENT ARCHITECTURE MATRIX
            ══════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-24 border-b border-concrete/40 dark:border-charcoal-border bg-techlight/30 dark:bg-charcoal-surface">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-concrete/30 dark:border-charcoal-border gap-4">
                  <div>
                    <span className="text-[11px] font-mono tracking-widest text-sage uppercase block mb-1">
                      SEC_04 // ARCHITECTURAL COMPARISON
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-charcoal dark:text-ivory">
                      Deployment Topologies.
                    </h2>
                  </div>
                  <p className="text-xs font-mono text-concrete-dark dark:text-concrete max-w-md">
                    RIGOROUS HARDWARE ISOLATION COMPARED ACROSS ON-PREMISE AIR-GAP, HYBRID EDGE, AND CLOUD MODELS.
                  </p>
                </div>

                <div className="overflow-x-auto border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-concrete/30 dark:border-charcoal-border bg-techlight dark:bg-charcoal-surface text-concrete uppercase tracking-wider">
                        <th className="p-4 font-bold">ARCHITECTURAL METRIC</th>
                        <th className="p-4 font-bold text-sage">ON-PREMISE AIR-GAPPED (RECOMMENDED)</th>
                        <th className="p-4 font-bold">HYBRID EDGE CLUSTER</th>
                        <th className="p-4 font-bold">GENERIC PUBLIC CLOUD</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-concrete/20 dark:divide-charcoal-border">
                      <tr>
                        <td className="p-4 font-bold text-charcoal dark:text-ivory">FRAME LATENCY</td>
                        <td className="p-4 text-sage font-bold">&lt;15ms (Deterministic CUDA)</td>
                        <td className="p-4 text-concrete-dark dark:text-concrete">30ms - 80ms</td>
                        <td className="p-4 text-concrete">250ms - 1,200ms (High Jitter)</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-bold text-charcoal dark:text-ivory">DATA SOVEREIGNTY</td>
                        <td className="p-4 text-sage font-bold">100% On-Premise Airgap</td>
                        <td className="p-4 text-concrete-dark dark:text-concrete">Metadata Synced to Cloud</td>
                        <td className="p-4 text-burntamber">Full Video Stream Uploaded</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-bold text-charcoal dark:text-ivory">INTERNET DEPENDENCY</td>
                        <td className="p-4 text-sage font-bold">Zero Internet Required</td>
                        <td className="p-4 text-concrete-dark dark:text-concrete">Periodic Cloud Sync</td>
                        <td className="p-4 text-burntamber">Fatal Failure on Disconnect</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-bold text-charcoal dark:text-ivory">SCADA / PLC INTEGRATION</td>
                        <td className="p-4 text-sage font-bold">Direct Hardware Relay (&lt;18ms)</td>
                        <td className="p-4 text-concrete-dark dark:text-concrete">Local MQTT Broker</td>
                        <td className="p-4 text-concrete">Not Viable for High-Speed Lines</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-bold text-charcoal dark:text-ivory">RECURRING CLOUD COST</td>
                        <td className="p-4 text-sage font-bold">₹0 Cloud Egress / Month</td>
                        <td className="p-4 text-concrete-dark dark:text-concrete">Low (Telemetry Only)</td>
                        <td className="p-4 text-burntamber">High Recurring Stream Ingestion</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                SECTION 05 — CUSTOM ARCHITECTURE CONSULTATION
            ══════════════════════════════════════════════════════ */}
            <section id="custom-solutions" className="py-16 md:py-24 border-b border-concrete/40 dark:border-charcoal-border bg-ivory dark:bg-charcoal">
              <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-10 pb-4 border-b border-concrete/30 dark:border-charcoal-border">
                  <span className="text-[11px] font-mono tracking-widest text-sage uppercase block mb-1">
                    SEC_05 // CUSTOM HARDWARE &amp; MODEL SIZING
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-charcoal dark:text-ivory">
                    Submit Technical Feasibility Inquiry.
                  </h2>
                  <p className="mt-2 text-xs font-mono text-concrete-dark dark:text-concrete">
                    PROVIDE CAMERA RESOLUTION, FPS, THROUGHPUT SPEEDS, AND DESIRED DEFECT DETECTION TOLERANCE.
                  </p>
                </div>

                <div className="p-6 sm:p-10 border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal-surface shadow-xl">
                  <CustomSolutionForm prefilledSolution={prefilledInquiry} />
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Solution Detail Drawer */}
      <SolutionDetailSheet
        solution={activeSolution}
        isOpen={Boolean(activeSolutionId)}
        onClose={() => setActiveSolutionId(null)}
        onSelectRelated={(relId) => setActiveSolutionId(relId)}
        onDiscussSolution={handleDiscussSolution}
      />

      <Footer />
    </div>
  );
};

export default Products;
