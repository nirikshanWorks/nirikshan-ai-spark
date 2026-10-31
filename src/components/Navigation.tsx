import { Button } from "@/components/ui/button";
import SwitchToggleThemeDemo from "@/components/ui/toggle-theme";
import {
  Menu,
  X,
  Eye,
  Brain,
  Bot,
  Factory,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Layers,
  ShieldCheck,
  ChevronRight,
  ChevronDown
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  // Desktop active dropdown state: 'solutions' | 'products' | null
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const location = useLocation();

  // Clear dropdown & mobile on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileSection(null);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Hover handlers with grace period
  const handleMouseEnter = (menuName: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(menuName);
  };

  const handleMouseLeave = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b ${
          scrolled
            ? "bg-ivory/95 dark:bg-charcoal/95 backdrop-blur-md border-concrete/40 dark:border-charcoal-border shadow-sm"
            : "bg-ivory dark:bg-charcoal border-concrete/30 dark:border-charcoal-border"
        }`}
      >
        {/* Technical Sub-bar / Telemetry */}
        <div className="hidden md:flex items-center justify-between px-6 py-1 bg-techlight dark:bg-charcoal-surface border-b border-concrete/20 dark:border-charcoal-border text-[10px] font-mono tracking-widest text-concrete-dark dark:text-concrete">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-sage inline-block" />
              NIRIKSHAN AI PRIVATE LIMITED
            </span>
            <span className="text-concrete/60">|</span>
            <span>SYSTEM_NODE: IND-DELHI-01</span>
          </div>
          <div className="flex items-center gap-4">
            <span>CORE_LATENCY: 14MS</span>
            <span className="text-concrete/60">|</span>
            <span>ARCHITECTURE: EDGE_INFERENCE_v2.4</span>
          </div>
        </div>

        {/* Main Bar */}
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 h-16 relative">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group shrink-0"
            aria-label="Nirikshan AI Home"
            onClick={() => setActiveDropdown(null)}
          >
            <div className="w-9 h-9 border border-charcoal/30 dark:border-concrete/40 flex items-center justify-center bg-white dark:bg-charcoal-surface">
              <img
                src="/favicon.png"
                alt="Nirikshan AI"
                className="w-6 h-6 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold font-display tracking-tight text-charcoal dark:text-ivory leading-none">
                NIRIKSHAN <span className="text-sage dark:text-sage-light">AI</span>
              </span>
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-concrete-dark dark:text-concrete mt-0.5">
                ENGINEERING INTELLIGENCE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {/* 1. Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("solutions")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => setActiveDropdown(activeDropdown === "solutions" ? null : "solutions")}
                className={`inline-flex items-center gap-1.5 h-9 px-3.5 text-xs font-mono uppercase tracking-wider text-charcoal dark:text-ivory transition-all border-b-2 ${
                  activeDropdown === "solutions"
                    ? "border-sage-deep bg-sage/10 font-bold text-sage-deep dark:text-sage-light dark:border-sage"
                    : "border-transparent hover:border-b-burntamber hover:text-burntamber hover:bg-burntamber/5"
                }`}
                aria-expanded={activeDropdown === "solutions"}
              >
                <span>Solutions</span>
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${
                    activeDropdown === "solutions" ? "rotate-180 text-burntamber" : "text-concrete"
                  }`}
                />
              </button>

              {/* Solutions Dropdown Section Box */}
              {activeDropdown === "solutions" && (
                <div
                  className="absolute top-full left-0 pt-2 z-50 w-[580px] animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseEnter={() => handleMouseEnter("solutions")}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="border border-concrete/40 dark:border-charcoal-border bg-ivory dark:bg-charcoal p-5 shadow-2xl">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-concrete/30 dark:border-charcoal-border">
                      <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-concrete-dark dark:text-concrete uppercase">
                        <span className="w-1.5 h-1.5 bg-sage inline-block" />
                        <span>// CORE ENGINEERING SOLUTIONS</span>
                      </div>
                      <Link
                        to="/services"
                        onClick={() => setActiveDropdown(null)}
                        className="text-[11px] font-mono font-bold text-sage hover:underline flex items-center gap-1"
                      >
                        ALL CAPABILITIES <ArrowRight size={12} />
                      </Link>
                    </div>

                    {/* 2x2 Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* Computer Vision */}
                      <Link
                        to="/expertise/artificial-intelligence/computer-vision"
                        onClick={() => setActiveDropdown(null)}
                        className="p-3 border border-concrete/30 dark:border-charcoal-border bg-white dark:bg-charcoal-surface hover:border-sage hover:bg-sage/5 transition-all group"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Eye size={15} className="text-sage" />
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal dark:text-ivory group-hover:text-sage transition-colors">
                            01 Computer Vision
                          </span>
                        </div>
                        <p className="text-[11px] text-concrete-dark dark:text-concrete leading-snug">
                          Real-time edge inspection, PPE safety detection, ANPR, defect analysis.
                        </p>
                      </Link>

                      {/* Generative AI */}
                      <Link
                        to="/expertise/artificial-intelligence/generative-ai"
                        onClick={() => setActiveDropdown(null)}
                        className="p-3 border border-concrete/30 dark:border-charcoal-border bg-white dark:bg-charcoal-surface hover:border-sage hover:bg-sage/5 transition-all group"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Brain size={15} className="text-sage" />
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal dark:text-ivory group-hover:text-sage transition-colors">
                            02 Generative AI
                          </span>
                        </div>
                        <p className="text-[11px] text-concrete-dark dark:text-concrete leading-snug">
                          Enterprise LLMs, private RAG pipelines, intelligent document synthesis.
                        </p>
                      </Link>

                      {/* Agentic AI */}
                      <Link
                        to="/expertise/artificial-intelligence/ai-agent-development"
                        onClick={() => setActiveDropdown(null)}
                        className="p-3 border border-concrete/30 dark:border-charcoal-border bg-white dark:bg-charcoal-surface hover:border-sage hover:bg-sage/5 transition-all group"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Bot size={15} className="text-sage" />
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal dark:text-ivory group-hover:text-sage transition-colors">
                            03 Agentic AI
                          </span>
                        </div>
                        <p className="text-[11px] text-concrete-dark dark:text-concrete leading-snug">
                          Multi-step autonomous workflows, self-healing execution, tool synthesis.
                        </p>
                      </Link>

                      {/* Industrial Automation */}
                      <Link
                        to="/expertise/artificial-intelligence/ai-consulting"
                        onClick={() => setActiveDropdown(null)}
                        className="p-3 border border-concrete/30 dark:border-charcoal-border bg-white dark:bg-charcoal-surface hover:border-sage hover:bg-sage/5 transition-all group"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Factory size={15} className="text-sage" />
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal dark:text-ivory group-hover:text-sage transition-colors">
                            04 Industrial AI
                          </span>
                        </div>
                        <p className="text-[11px] text-concrete-dark dark:text-concrete leading-snug">
                          SCADA/PLC integration, predictive maintenance, edge camera streaming.
                        </p>
                      </Link>
                    </div>

                    {/* Bottom Status Strip */}
                    <div className="mt-4 pt-3 border-t border-concrete/20 dark:border-charcoal-border flex items-center justify-between text-[10px] font-mono text-concrete">
                      <span>DEPLOYMENT: AIR-GAPPED ON-PREMISE</span>
                      <span className="text-sage font-bold">4 PRODUCTION ENGINES ACTIVE</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("products")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => setActiveDropdown(activeDropdown === "products" ? null : "products")}
                className={`inline-flex items-center gap-1.5 h-9 px-3.5 text-xs font-mono uppercase tracking-wider text-charcoal dark:text-ivory transition-all border-b-2 ${
                  activeDropdown === "products"
                    ? "border-sage-deep bg-sage/10 font-bold text-sage-deep dark:text-sage-light dark:border-sage"
                    : "border-transparent hover:border-b-burntamber hover:text-burntamber hover:bg-burntamber/5"
                }`}
                aria-expanded={activeDropdown === "products"}
              >
                <span>Products</span>
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${
                    activeDropdown === "products" ? "rotate-180 text-burntamber" : "text-concrete"
                  }`}
                />
              </button>

              {/* Products Dropdown Section Box */}
              {activeDropdown === "products" && (
                <div
                  className="absolute top-full left-0 pt-2 z-50 w-[620px] animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseEnter={() => handleMouseEnter("products")}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="border border-concrete/40 dark:border-charcoal-border bg-ivory dark:bg-charcoal p-5 shadow-2xl">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-concrete/30 dark:border-charcoal-border">
                      <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-concrete-dark dark:text-concrete uppercase">
                        <span className="w-1.5 h-1.5 bg-sage inline-block" />
                        <span>// PRODUCTION SYSTEMS &amp; PLATFORMS</span>
                      </div>
                      <Link
                        to="/products"
                        onClick={() => setActiveDropdown(null)}
                        className="text-[11px] font-mono font-bold text-sage hover:underline flex items-center gap-1"
                      >
                        ALL PLATFORMS <ArrowRight size={12} />
                      </Link>
                    </div>

                    {/* 2x2 Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* Nirikshan Vision Systems */}
                      <Link
                        to="/products/vision-systems"
                        onClick={() => setActiveDropdown(null)}
                        className="p-3 border border-concrete/30 dark:border-charcoal-border bg-white dark:bg-charcoal-surface hover:border-sage hover:bg-sage/5 transition-all group"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <ShieldCheck size={15} className="text-sage" />
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal dark:text-ivory group-hover:text-sage transition-colors">
                            01 Vision Systems
                          </span>
                        </div>
                        <p className="text-[11px] text-concrete-dark dark:text-concrete leading-snug">
                          Industrial vision suite: PPE compliance, surface defect, ANPR, fire alerts.
                        </p>
                      </Link>

                      {/* Astro Nirikshan */}
                      <Link
                        to="/products/astro-nirikshan"
                        onClick={() => setActiveDropdown(null)}
                        className="p-3 border border-concrete/30 dark:border-charcoal-border bg-white dark:bg-charcoal-surface hover:border-burntamber hover:bg-burntamber/5 transition-all group"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Sparkles size={15} className="text-burntamber" />
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal dark:text-ivory group-hover:text-burntamber transition-colors">
                            02 Astro Nirikshan
                          </span>
                        </div>
                        <p className="text-[11px] text-concrete-dark dark:text-concrete leading-snug">
                          Vedic astrology, Chaldean numerology, Kundli with 100% client privacy.
                        </p>
                      </Link>

                      {/* 10X AI Productivity */}
                      <Link
                        to="/products/10x-ai-productivity"
                        onClick={() => setActiveDropdown(null)}
                        className="p-3 border border-concrete/30 dark:border-charcoal-border bg-white dark:bg-charcoal-surface hover:border-sage hover:bg-sage/5 transition-all group"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <GraduationCap size={15} className="text-sage" />
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal dark:text-ivory group-hover:text-sage transition-colors">
                            03 10X AI Training
                          </span>
                        </div>
                        <p className="text-[11px] text-concrete-dark dark:text-concrete leading-snug">
                          Practical AI training for schools, universities, and corporate workforces.
                        </p>
                      </Link>

                      {/* All Products Directory */}
                      <Link
                        to="/products"
                        onClick={() => setActiveDropdown(null)}
                        className="p-3 border border-concrete/30 dark:border-charcoal-border bg-white dark:bg-charcoal-surface hover:border-sage hover:bg-sage/5 transition-all group"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Layers size={15} className="text-sage" />
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal dark:text-ivory group-hover:text-sage transition-colors">
                            04 All Products
                          </span>
                        </div>
                        <p className="text-[11px] text-concrete-dark dark:text-concrete leading-snug">
                          Full portfolio directory, computer vision model registry &amp; benchmarks.
                        </p>
                      </Link>
                    </div>

                    {/* Bottom Status Strip */}
                    <div className="mt-4 pt-3 border-t border-concrete/20 dark:border-charcoal-border flex items-center justify-between text-[10px] font-mono text-concrete">
                      <span>DATA PRIVACY: ZERO RECURRING CLOUD TRANSMISSION</span>
                      <span className="text-sage font-bold">100% AUDIT READY</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Research Link */}
            <Link
              to="/case-studies"
              onClick={() => setActiveDropdown(null)}
              className={`inline-flex items-center h-9 px-3.5 text-xs font-mono uppercase tracking-wider text-charcoal dark:text-ivory transition-all border-b-2 ${
                location.pathname === "/case-studies"
                  ? "border-sage-deep text-sage-deep dark:border-sage dark:text-sage font-bold bg-sage/10"
                  : "border-transparent hover:border-b-burntamber hover:text-burntamber hover:bg-burntamber/5"
              }`}
            >
              Research
            </Link>

            {/* 4. Company Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("company")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => setActiveDropdown(activeDropdown === "company" ? null : "company")}
                className={`inline-flex items-center gap-1.5 h-9 px-3.5 text-xs font-mono uppercase tracking-wider text-charcoal dark:text-ivory transition-all border-b-2 ${
                  activeDropdown === "company" || location.pathname === "/about" || location.pathname === "/who-we-are"
                    ? "border-sage-deep bg-sage/10 font-bold text-sage-deep dark:text-sage-light dark:border-sage"
                    : "border-transparent hover:border-b-burntamber hover:text-burntamber hover:bg-burntamber/5"
                }`}
                aria-expanded={activeDropdown === "company"}
              >
                <span>Company</span>
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${
                    activeDropdown === "company" ? "rotate-180 text-burntamber" : "text-concrete"
                  }`}
                />
              </button>

              {/* Company Dropdown Section Box */}
              {activeDropdown === "company" && (
                <div
                  className="absolute top-full left-0 pt-2 z-50 w-[540px] animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseEnter={() => handleMouseEnter("company")}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="border border-concrete/40 dark:border-charcoal-border bg-ivory dark:bg-charcoal p-5 shadow-2xl">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-concrete/30 dark:border-charcoal-border">
                      <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-concrete-dark dark:text-concrete uppercase">
                        <span className="w-1.5 h-1.5 bg-sage inline-block" />
                        <span>// INSTITUTIONAL IDENTITY &amp; PEOPLE</span>
                      </div>
                      <Link
                        to="/about"
                        onClick={() => setActiveDropdown(null)}
                        className="text-[11px] font-mono font-bold text-sage hover:underline flex items-center gap-1"
                      >
                        OVERVIEW <ArrowRight size={12} />
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        to="/who-we-are"
                        onClick={() => setActiveDropdown(null)}
                        className="p-3 border border-concrete/30 dark:border-charcoal-border bg-white dark:bg-charcoal-surface hover:border-sage hover:bg-sage/5 transition-all group"
                      >
                        <div className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal dark:text-ivory group-hover:text-sage transition-colors mb-1">
                          01 Who We Are
                        </div>
                        <p className="text-[11px] text-concrete-dark dark:text-concrete leading-snug">
                          Executive leadership, Dev Bhoomi roots, values &amp; team culture.
                        </p>
                      </Link>

                      <Link
                        to="/about"
                        onClick={() => setActiveDropdown(null)}
                        className="p-3 border border-concrete/30 dark:border-charcoal-border bg-white dark:bg-charcoal-surface hover:border-sage hover:bg-sage/5 transition-all group"
                      >
                        <div className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal dark:text-ivory group-hover:text-sage transition-colors mb-1">
                          02 About Lab
                        </div>
                        <p className="text-[11px] text-concrete-dark dark:text-concrete leading-snug">
                          Organization, facility coordinates, and technological capabilities.
                        </p>
                      </Link>

                      <Link
                        to="/journey"
                        onClick={() => setActiveDropdown(null)}
                        className="p-3 border border-concrete/30 dark:border-charcoal-border bg-white dark:bg-charcoal-surface hover:border-sage hover:bg-sage/5 transition-all group"
                      >
                        <div className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal dark:text-ivory group-hover:text-sage transition-colors mb-1">
                          03 Timeline
                        </div>
                        <p className="text-[11px] text-concrete-dark dark:text-concrete leading-snug">
                          Milestones from student research to registered enterprise firm.
                        </p>
                      </Link>

                      <Link
                        to="/testimonials"
                        onClick={() => setActiveDropdown(null)}
                        className="p-3 border border-concrete/30 dark:border-charcoal-border bg-white dark:bg-charcoal-surface hover:border-sage hover:bg-sage/5 transition-all group"
                      >
                        <div className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal dark:text-ivory group-hover:text-sage transition-colors mb-1">
                          04 Endorsements
                        </div>
                        <p className="text-[11px] text-concrete-dark dark:text-concrete leading-snug">
                          Academic &amp; enterprise client feedback on our prototypes.
                        </p>
                      </Link>
                    </div>

                    <div className="mt-4 pt-3 border-t border-concrete/20 dark:border-charcoal-border flex items-center justify-between text-[10px] font-mono text-concrete">
                      <span>LOCATION: HARIDWAR &amp; DEHRADUN</span>
                      <span className="text-sage font-bold">MCA REGISTERED</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 5. Careers Link */}
            <Link
              to="/careers"
              onClick={() => setActiveDropdown(null)}
              className={`inline-flex items-center h-9 px-3.5 text-xs font-mono uppercase tracking-wider text-charcoal dark:text-ivory transition-all border-b-2 ${
                location.pathname === "/careers"
                  ? "border-sage-deep text-sage-deep dark:border-sage dark:text-sage font-bold bg-sage/10"
                  : "border-transparent hover:border-b-burntamber hover:text-burntamber hover:bg-burntamber/5"
              }`}
            >
              Careers
            </Link>
          </div>

          {/* Right Action & Theme Toggle */}
          <div className="flex items-center gap-3">
            <SwitchToggleThemeDemo />

            <Link to="/contact" className="hidden sm:inline-flex">
              <Button
                className="bg-charcoal text-ivory hover:bg-burntamber hover:border-burntamber hover:text-white text-xs font-mono uppercase tracking-wider px-5 h-9 rounded-none border border-charcoal transition-all font-semibold"
              >
                Let's Talk
              </Button>
            </Link>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-charcoal dark:text-ivory border border-concrete/40 dark:border-charcoal-border hover:border-burntamber hover:text-burntamber transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* ── Mobile Navigation Drawer ── */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-concrete/40 dark:border-charcoal-border bg-ivory dark:bg-charcoal p-5 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="space-y-4">
              <div className="text-[10px] font-mono tracking-widest text-concrete-dark dark:text-concrete uppercase">
                // NAVIGATION PROTOCOL
              </div>

              {/* Solutions Accordion */}
              <div>
                <button
                  onClick={() => setMobileSection(mobileSection === "solutions" ? null : "solutions")}
                  className="w-full flex items-center justify-between py-2 text-sm font-mono uppercase tracking-wider text-charcoal dark:text-ivory border-b border-concrete/20 dark:border-charcoal-border"
                >
                  <span>Solutions</span>
                  <ChevronRight
                    size={16}
                    className={`transition-transform ${mobileSection === "solutions" ? "rotate-90 text-sage" : ""}`}
                  />
                </button>
                {mobileSection === "solutions" && (
                  <div className="pl-4 py-2 space-y-2 border-l border-sage/40 mt-2 bg-techlight/50 dark:bg-charcoal-surface/50">
                    <Link
                      to="/expertise/artificial-intelligence/computer-vision"
                      className="block text-xs font-mono py-1 text-charcoal dark:text-ivory hover:text-sage"
                    >
                      01 Computer Vision
                    </Link>
                    <Link
                      to="/expertise/artificial-intelligence/generative-ai"
                      className="block text-xs font-mono py-1 text-charcoal dark:text-ivory hover:text-sage"
                    >
                      02 Generative AI
                    </Link>
                    <Link
                      to="/expertise/artificial-intelligence/ai-agent-development"
                      className="block text-xs font-mono py-1 text-charcoal dark:text-ivory hover:text-sage"
                    >
                      03 Agentic AI
                    </Link>
                    <Link
                      to="/expertise/artificial-intelligence/ai-consulting"
                      className="block text-xs font-mono py-1 text-charcoal dark:text-ivory hover:text-sage"
                    >
                      04 Industrial Automation
                    </Link>
                  </div>
                )}
              </div>

              {/* Products Accordion */}
              <div>
                <button
                  onClick={() => setMobileSection(mobileSection === "products" ? null : "products")}
                  className="w-full flex items-center justify-between py-2 text-sm font-mono uppercase tracking-wider text-charcoal dark:text-ivory border-b border-concrete/20 dark:border-charcoal-border"
                >
                  <span>Products</span>
                  <ChevronRight
                    size={16}
                    className={`transition-transform ${mobileSection === "products" ? "rotate-90 text-sage" : ""}`}
                  />
                </button>
                {mobileSection === "products" && (
                  <div className="pl-4 py-2 space-y-2 border-l border-sage/40 mt-2 bg-techlight/50 dark:bg-charcoal-surface/50">
                    <Link
                      to="/products/vision-systems"
                      className="block text-xs font-mono py-1 text-charcoal dark:text-ivory hover:text-sage"
                    >
                      01 Nirikshan Vision Systems
                    </Link>
                    <Link
                      to="/products/astro-nirikshan"
                      className="block text-xs font-mono py-1 text-burntamber hover:underline"
                    >
                      02 Astro Nirikshan
                    </Link>
                    <Link
                      to="/products/10x-ai-productivity"
                      className="block text-xs font-mono py-1 text-charcoal dark:text-ivory hover:text-sage"
                    >
                      03 10X AI Productivity Training
                    </Link>
                    <Link
                      to="/products"
                      className="block text-xs font-mono py-1 text-concrete hover:text-charcoal dark:hover:text-ivory"
                    >
                      04 All Products Directory
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/case-studies"
                className="block py-2 text-sm font-mono uppercase tracking-wider text-charcoal dark:text-ivory border-b border-concrete/20 dark:border-charcoal-border"
              >
                Research &amp; Case Studies
              </Link>

              {/* Company Accordion */}
              <div>
                <button
                  onClick={() => setMobileSection(mobileSection === "company" ? null : "company")}
                  className="w-full flex items-center justify-between py-2 text-sm font-mono uppercase tracking-wider text-charcoal dark:text-ivory border-b border-concrete/20 dark:border-charcoal-border"
                >
                  <span>Company</span>
                  <ChevronRight
                    size={16}
                    className={`transition-transform ${mobileSection === "company" ? "rotate-90 text-sage" : ""}`}
                  />
                </button>
                {mobileSection === "company" && (
                  <div className="pl-4 py-2 space-y-2 border-l border-sage/40 mt-2 bg-techlight/50 dark:bg-charcoal-surface/50">
                    <Link
                      to="/who-we-are"
                      className="block text-xs font-mono py-1 text-charcoal dark:text-ivory hover:text-sage font-bold"
                    >
                      01 Who We Are &amp; Leadership
                    </Link>
                    <Link
                      to="/about"
                      className="block text-xs font-mono py-1 text-charcoal dark:text-ivory hover:text-sage"
                    >
                      02 About Lab &amp; Facilities
                    </Link>
                    <Link
                      to="/journey"
                      className="block text-xs font-mono py-1 text-charcoal dark:text-ivory hover:text-sage"
                    >
                      03 Timeline &amp; Milestones
                    </Link>
                    <Link
                      to="/testimonials"
                      className="block text-xs font-mono py-1 text-charcoal dark:text-ivory hover:text-sage"
                    >
                      04 Testimonials &amp; Endorsements
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/careers"
                className="block py-2 text-sm font-mono uppercase tracking-wider text-charcoal dark:text-ivory border-b border-concrete/20 dark:border-charcoal-border"
              >
                Careers
              </Link>

              <div className="pt-4">
                <Link to="/contact" className="block w-full">
                  <Button className="w-full bg-charcoal text-ivory dark:bg-sage dark:text-charcoal text-xs font-mono uppercase tracking-wider h-11 rounded-none font-semibold">
                    Let's Talk →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
