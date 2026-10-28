import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  SOLUTION_CATEGORIES,
  CV_SOLUTIONS,
  PLATFORM_WORKFLOW_STEPS,
  DEPLOYMENT_MODELS,
  SUPPORTED_INFRASTRUCTURE,
  INDUSTRY_APPLICATIONS,
  WHY_NIRIKSHAN_PILLARS,
  COMPARISON_MATRIX,
  CVSolution,
  SolutionCategoryId,
} from "@/data/computerVisionProducts";
import { ProductsHero } from "@/components/products/ProductsHero";
import { SolutionDetailSheet } from "@/components/products/SolutionDetailSheet";
import { CVDashboardDemo } from "@/components/products/CVDashboardDemo";
import { CustomSolutionForm } from "@/components/products/CustomSolutionForm";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/ScrollAnimations";
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
  Bell,
  LayoutDashboard,
  ShieldCheck,
  Server,
  Cloud,
  Network,
  Building2,
  Zap,
  Target,
  Sparkles,
  HelpCircle,
  ExternalLink,
  Workflow,
} from "lucide-react";

export const Products = () => {
  // State for Directory filtering and search
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | SolutionCategoryId
  >("all");
  const [searchQuery, setSearchQuery] = useState("");

  // State for Solution Detail Drawer
  const [activeSolutionId, setActiveSolutionId] = useState<string | null>(null);
  const [prefilledInquiry, setPrefilledInquiry] = useState("");

  const activeSolution = useMemo(() => {
    return CV_SOLUTIONS.find((s) => s.id === activeSolutionId) || null;
  }, [activeSolutionId]);

  // Filtered solutions
  const filteredSolutions = useMemo(() => {
    return CV_SOLUTIONS.filter((sol) => {
      const matchesCategory =
        selectedCategory === "all" || sol.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch =
        sol.name.toLowerCase().includes(query) ||
        sol.shortDescription.toLowerCase().includes(query) ||
        sol.detailedOverview.toLowerCase().includes(query) ||
        sol.capabilities.some((c) => c.toLowerCase().includes(query)) ||
        sol.useCases.some((u) => u.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
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

  const workflowIcons: Record<string, React.ReactNode> = {
    Camera: <Camera className="w-5 h-5" />,
    Cpu: <Cpu className="w-5 h-5" />,
    Scan: <Scan className="w-5 h-5" />,
    Bell: <Bell className="w-5 h-5" />,
    LayoutDashboard: <LayoutDashboard className="w-5 h-5" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SEO
        title="Computer Vision Solutions & Products — Nirikshan AI"
        description="Explore Nirikshan AI's enterprise computer vision products for residential security, industrial safety, workplace PPE compliance, manufacturing quality control, and vehicle intelligence."
        canonical="https://nirikshanai.com/products"
      />

      <Navigation />

      <main className="flex-1">
        {/* ─── SECTION A: PRODUCTS HERO ─── */}
        <ProductsHero />

        {/* ─── SECTION B: PRODUCT CATEGORIES (6 PRIMARY PILLARS) ─── */}
        <section id="categories" className="py-20 md:py-28 container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-4">
                <Layers className="w-3.5 h-3.5" />
                Solution Architecture
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-5">
                Six Domains of{" "}
                <span className="text-gradient">Visual Intelligence</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Nirikshan AI groups its computer vision capabilities into six
                comprehensive solution areas designed for enterprise safety,
                precision, and operational resilience.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SOLUTION_CATEGORIES.map((cat, idx) => (
              <FadeUp key={cat.id} delay={idx * 0.08}>
                <Card className={`h-full flex flex-col justify-between overflow-hidden rounded-3xl border bg-card/60 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${cat.borderAccent}`}>
                  <div>
                    {/* Category Image Header */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <Badge variant="outline" className="bg-black/70 text-white border-white/20 text-[10px] uppercase font-mono tracking-wider backdrop-blur-md">
                          {cat.source}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-foreground leading-snug">
                        {cat.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                        {cat.description}
                      </p>

                      <div className="space-y-2 mb-6">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                          Key Capabilities:
                        </div>
                        <ul className="space-y-1.5">
                          {cat.capabilities.slice(0, 4).map((cap, i) => (
                            <li
                              key={i}
                              className="text-xs text-foreground/80 flex items-center gap-2"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                              <span className="truncate">{cap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        const el = document.getElementById("solutions-directory");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="w-full py-2.5 px-4 rounded-xl border border-border bg-secondary/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all text-xs font-semibold flex items-center justify-center gap-2 group"
                    >
                      <span>Explore {cat.shortTitle} Solutions</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </Card>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ─── SECTION C: EXPLORE INDIVIDUAL SOLUTIONS DIRECTORY ─── */}
        <section
          id="solutions-directory"
          className="py-20 md:py-28 bg-card/40 border-y border-border/60"
        >
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <FadeUp>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-4">
                  <Filter className="w-3.5 h-3.5" />
                  Solutions Catalogue
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-5">
                  Explore Individual{" "}
                  <span className="text-gradient">Computer Vision Solutions</span>
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Search, filter, and inspect detailed capabilities, detection
                  pipelines, and deployment environments for our specialized vision models.
                </p>
              </FadeUp>
            </div>

            {/* Search and Category Filter Bar */}
            <div className="max-w-5xl mx-auto mb-10 space-y-4">
              {/* Search input */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search solutions by keyword, class name (e.g. Helmet, ANPR, Fire, Defect, Fall)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 pr-10 py-6 rounded-2xl bg-background border-border/80 shadow-sm text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    title="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                    selectedCategory === "all"
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-background/80 border border-border hover:bg-secondary text-muted-foreground"
                  }`}
                >
                  All Solutions ({CV_SOLUTIONS.length})
                </button>
                {SOLUTION_CATEGORIES.map((cat) => {
                  const count = CV_SOLUTIONS.filter(
                    (s) => s.category === cat.id
                  ).length;
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "bg-background/80 border border-border hover:bg-secondary text-muted-foreground"
                      }`}
                    >
                      <span>{cat.shortTitle}</span>
                      <span className="opacity-70 text-[10px]">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Results Counter */}
            <div className="max-w-5xl mx-auto flex items-center justify-between text-xs text-muted-foreground mb-6 px-1">
              <span>
                Showing <strong>{filteredSolutions.length}</strong> of{" "}
                <strong>{CV_SOLUTIONS.length}</strong> solutions
              </span>
              {(selectedCategory !== "all" || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                  }}
                  className="text-primary hover:underline font-medium"
                >
                  Reset all filters
                </button>
              )}
            </div>

            {/* Solutions Grid */}
            {filteredSolutions.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {filteredSolutions.map((sol) => (
                  <Card
                    key={sol.id}
                    className="flex flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg group"
                  >
                    <div>
                      {/* Image Preview */}
                      <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
                        <img
                          src={sol.image}
                          alt={sol.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-primary/90 text-primary-foreground text-[10px] backdrop-blur-md">
                            {sol.categoryName.split("&")[0]}
                          </Badge>
                        </div>
                        <div className="absolute top-3 right-3">
                          <Badge variant="outline" className="bg-black/60 text-white border-white/20 text-[10px] backdrop-blur-md">
                            {sol.badge}
                          </Badge>
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="font-bold text-base sm:text-lg mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {sol.name}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                          {sol.shortDescription}
                        </p>

                        <div className="space-y-1.5 mb-2">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            Key Capabilities:
                          </div>
                          {sol.capabilities.slice(0, 3).map((cap, i) => (
                            <div
                              key={i}
                              className="text-[11px] text-foreground/80 flex items-center gap-1.5"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                              <span className="truncate">{cap}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      <Button
                        onClick={() => handleOpenSolution(sol.id)}
                        variant="outline"
                        className="w-full rounded-xl border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all text-xs font-semibold py-2 flex items-center justify-center gap-1.5"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              /* Empty Search State */
              <div className="max-w-md mx-auto text-center py-16 p-8 rounded-3xl border border-dashed border-border bg-card/60">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-bold mb-2">No Matching Solutions Found</h3>
                <p className="text-xs text-muted-foreground mb-6">
                  We couldn't find any vision solutions matching "{searchQuery}". Try a broader term or reset filters.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  variant="outline"
                  className="rounded-xl"
                >
                  Reset Search & Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* ─── SECTION E: HOW NIRIKSHAN AI VISION PLATFORM WORKS ─── */}
        <section className="py-20 md:py-28 container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-4">
                <Workflow className="w-3.5 h-3.5" />
                System Pipeline (Source: PDF Page 19)
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-5">
                From Video Input to{" "}
                <span className="text-gradient">Real-World Action</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                A six-stage end-to-end computer vision architecture converting raw
                camera streams into verified operational responses.
              </p>
            </FadeUp>
          </div>

          {/* Stepper on Desktop, Timeline on Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 relative">
            {PLATFORM_WORKFLOW_STEPS.map((step) => (
              <FadeUp key={step.number} delay={step.number * 0.08}>
                <div className="relative h-full rounded-2xl border border-border/80 bg-card/60 p-5 backdrop-blur flex flex-col justify-between hover:border-primary/40 transition-all group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-primary/10 text-primary">
                        STEP {step.step}
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {workflowIcons[step.iconName] || <Cpu className="w-4 h-4" />}
                      </div>
                    </div>

                    <h3 className="font-bold text-base text-foreground mb-1">
                      {step.title}
                    </h3>
                    <div className="text-[11px] font-mono text-cyan-500 mb-2.5">
                      {step.subhead}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border/50 text-[10px] text-muted-foreground font-mono">
                    <span className="text-foreground/70 font-semibold">Output: </span>
                    {step.outputs}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ─── SECTION F: INTELLIGENT ALERTING & MONITORING DEMO ─── */}
        <section className="py-20 md:py-28 bg-card/40 border-y border-border/60">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <FadeUp>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-4">
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Live Operations Center (Source: PDF Page 20)
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-5">
                  Intelligent Alerting &{" "}
                  <span className="text-gradient">Multi-Camera Monitoring</span>
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Real-time insights for a safer, smarter environment. Manage
                  multiple camera feeds, receive instant multi-channel alerts,
                  and review timestamped event history.
                </p>
              </FadeUp>
            </div>

            <CVDashboardDemo />
          </div>
        </section>

        {/* ─── SECTION G: FLEXIBLE DEPLOYMENT OPTIONS ─── */}
        <section className="py-20 md:py-28 container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-4">
                <Server className="w-3.5 h-3.5" />
                Infrastructure Flexibility (Source: PDF Page 21)
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-5">
                Deployment Tailored to Your{" "}
                <span className="text-gradient">Infrastructure</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Deploy Nirikshan AI on-premises, in the cloud, or in a high-efficiency
                hybrid configuration based on your security policies, data sovereignty
                requirements, and bandwidth availability.
              </p>
            </FadeUp>
          </div>

          {/* 3 Deployment Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {DEPLOYMENT_MODELS.map((model, idx) => (
              <FadeUp key={model.title} delay={idx * 0.1}>
                <Card className="h-full flex flex-col justify-between rounded-3xl border border-border/80 bg-card/60 p-6 sm:p-8 backdrop-blur hover:border-primary/40 transition-all hover:-translate-y-1">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-primary/10 text-primary border-primary/30">
                        {model.badge}
                      </Badge>
                      {idx === 0 ? (
                        <Server className="w-6 h-6 text-primary" />
                      ) : idx === 1 ? (
                        <Cloud className="w-6 h-6 text-cyan-500" />
                      ) : (
                        <Network className="w-6 h-6 text-emerald-500" />
                      )}
                    </div>

                    <h3 className="text-2xl font-bold mb-1 text-foreground">
                      {model.title}
                    </h3>
                    <div className="text-xs font-mono text-cyan-500 mb-4">
                      {model.tagline}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                      {model.description}
                    </p>

                    <div className="space-y-2.5 mb-6">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        Architecture Benefits:
                      </div>
                      <ul className="space-y-2">
                        {model.points.map((pt, i) => (
                          <li
                            key={i}
                            className="text-xs text-foreground/80 flex items-start gap-2"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/60 text-[11px] text-muted-foreground">
                    <strong className="text-foreground">Ideal For: </strong>
                    {model.bestFor}
                  </div>
                </Card>
              </FadeUp>
            ))}
          </div>

          {/* Supported Camera & Hardware Infrastructure */}
          <div className="rounded-3xl border border-border/80 bg-card/30 p-6 sm:p-10">
            <h3 className="text-lg font-bold mb-2 text-center text-foreground">
              Compatible Input Sources & Edge Hardware
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground text-center max-w-2xl mx-auto mb-8">
              We leverage your existing camera investments. Hardware compatibility depends on video encoding protocols and local site network topology.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SUPPORTED_INFRASTRUCTURE.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-border/60 bg-background/60"
                >
                  <h4 className="font-semibold text-sm mb-1.5 text-foreground">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-center text-muted-foreground/80 mt-6 italic">
              Note: Compatibility depends on your existing infrastructure and implementation requirements. We verify protocol connectivity during the discovery phase.
            </p>
          </div>
        </section>

        {/* ─── SECTION H: INDUSTRY APPLICATIONS (13 INDUSTRIES) ─── */}
        <section className="py-20 md:py-28 bg-card/40 border-y border-border/60">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <FadeUp>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-4">
                  <Building2 className="w-3.5 h-3.5" />
                  Cross-Industry Impact (Source: PDF Page 22)
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-5">
                  AI Vision Solutions Across{" "}
                  <span className="text-gradient">Every Industry</span>
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Tailored visual intelligence deployments delivering measurable safety,
                  compliance, and operational efficiency across 13 core enterprise sectors.
                </p>
              </FadeUp>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {INDUSTRY_APPLICATIONS.map((ind, idx) => (
                <FadeUp key={ind.id} delay={idx * 0.04}>
                  <div className="h-full rounded-2xl border border-border/80 bg-background/80 overflow-hidden flex flex-col justify-between hover:border-primary/50 transition-all hover:-translate-y-1 group">
                    <div>
                      <div className="relative h-32 w-full bg-slate-950 overflow-hidden">
                        <img
                          src={ind.image}
                          alt={ind.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                        <div className="absolute top-2.5 right-2.5">
                          <Badge variant="outline" className="bg-black/60 text-white border-white/20 text-[10px]">
                            {ind.badge}
                          </Badge>
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="font-bold text-sm text-foreground mb-1 group-hover:text-primary transition-colors">
                          {ind.name}
                        </h3>
                        <p className="text-[11px] text-muted-foreground mb-3 line-clamp-2">
                          {ind.description}
                        </p>

                        <div className="space-y-1">
                          {ind.useCases.map((uc, i) => (
                            <div
                              key={i}
                              className="text-[10px] text-foreground/80 flex items-center gap-1.5"
                            >
                              <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                              <span className="truncate">{uc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 pt-0">
                      <button
                        onClick={() => {
                          setSelectedCategory(ind.categoryTag);
                          const el = document.getElementById("solutions-directory");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-1 mt-2"
                      >
                        <span>View applicable solutions</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION I: WHY NIRIKSHAN AI (10 PILLARS) ─── */}
        <section className="py-20 md:py-28 container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                The Nirikshan AI Advantage (Source: PDF Page 23)
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-5">
                Why Organizations Choose{" "}
                <span className="text-gradient">Nirikshan AI</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Advanced vision intelligence built for real-world operations,
                leveraging existing camera investments without lock-in.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {WHY_NIRIKSHAN_PILLARS.map((pillar, idx) => (
              <FadeUp key={pillar.title} delay={idx * 0.05}>
                <div className="h-full rounded-2xl border border-border/80 bg-card/60 p-5 backdrop-blur hover:border-primary/40 transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-sm text-foreground mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ─── SECTION J: CUSTOM SOLUTIONS & ENQUIRY FORM ─── */}
        <CustomSolutionForm prefilledSolution={prefilledInquiry} />

        {/* ─── SECTION K: SOLUTION COMPARISON MATRIX (PDF PAGE 25) ─── */}
        <section className="py-20 md:py-28 container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Capability Matrix (Source: PDF Page 25)
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-5">
                Solution Comparison &{" "}
                <span className="text-gradient">Environment Support</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                One platform, multiple solutions across residential, industrial,
                and commercial operational environments.
              </p>
            </FadeUp>
          </div>

          {/* Responsive Comparison Table */}
          <div className="max-w-4xl mx-auto rounded-3xl border border-border/80 bg-card/60 shadow-xl overflow-hidden backdrop-blur">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="py-4 px-6 font-semibold">Solution / Feature</th>
                    <th className="py-4 px-4 text-center font-semibold">Residential</th>
                    <th className="py-4 px-4 text-center font-semibold">Industrial</th>
                    <th className="py-4 px-4 text-center font-semibold">Commercial</th>
                    <th className="py-4 px-4 text-center font-semibold text-cyan-500">
                      Real-Time Alerts
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {COMPARISON_MATRIX.map((row) => (
                    <tr
                      key={row.feature}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-3.5 px-6 font-medium text-foreground">
                        <div>{row.feature}</div>
                        {row.notes && (
                          <div className="text-[10px] text-muted-foreground font-mono">
                            {row.notes}
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {row.residential ? (
                          <span className="inline-flex w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-500 items-center justify-center font-bold text-xs">
                            ✓
                          </span>
                        ) : (
                          <span className="text-muted-foreground/60 font-mono">—</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {row.industrial ? (
                          <span className="inline-flex w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-500 items-center justify-center font-bold text-xs">
                            ✓
                          </span>
                        ) : (
                          <span className="text-muted-foreground/60 font-mono">—</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {row.commercial ? (
                          <span className="inline-flex w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-500 items-center justify-center font-bold text-xs">
                            ✓
                          </span>
                        ) : (
                          <span className="text-muted-foreground/60 font-mono">—</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {row.realTimeAlerts ? (
                          <span className="inline-flex w-5 h-5 rounded-full bg-cyan-500/15 text-cyan-500 items-center justify-center font-bold text-xs">
                            ✓
                          </span>
                        ) : (
                          <span className="text-muted-foreground/60 font-mono">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-muted/20 border-t border-border/50 text-center text-[11px] text-muted-foreground">
              ✓ Indicates native model support and rule configuration available. Applicability verified as per Nirikshan AI Capability Matrix (PDF Page 25).
            </div>
          </div>
        </section>

        {/* ─── INTEGRATION: 10X AI PRODUCTIVITY INITIATIVE ─── */}
        <section className="py-20 md:py-24 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden border-t border-border/60">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <FadeUp>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs font-semibold text-blue-300 uppercase tracking-[0.2em] mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                  Nirikshan AI Initiative
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-5 text-white">
                  Beyond Computer Vision:{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400">
                    The 10X AI Productivity Initiative
                  </span>
                </h2>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-3xl mx-auto">
                  Preparing schools, universities, professionals, management teams, and enterprise workforces for an AI-enabled future through structured learning, prompt engineering, workflow automation, and custom model implementations.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/10x-ai-productivity">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-6 rounded-xl shadow-lg shadow-blue-500/25 transition-all group">
                      <span>Explore 10X AI Initiative</span>
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button size="lg" variant="outline" className="border-slate-700 hover:border-slate-500 text-slate-200 bg-slate-900/60 px-8 py-6 rounded-xl">
                      Institutional Partnership
                    </Button>
                  </Link>
                </div>

                <div className="mt-10 grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-3xl mx-auto text-xs text-slate-300 pt-6 border-t border-slate-800">
                  <div className="p-2 rounded bg-slate-900/60 border border-slate-800 font-mono">01 DISCOVER</div>
                  <div className="p-2 rounded bg-slate-900/60 border border-slate-800 font-mono">02 LEARN</div>
                  <div className="p-2 rounded bg-slate-900/60 border border-slate-800 font-mono">03 APPLY</div>
                  <div className="p-2 rounded bg-slate-900/60 border border-slate-800 font-mono">04 AUTOMATE</div>
                  <div className="p-2 rounded bg-slate-900/60 border border-slate-800 font-mono col-span-2 sm:col-span-1">05 SCALE</div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ─── SECTION L: FINAL CTA ─── */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-card/30 to-background border-t border-border/60 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-4">
                Vision Intelligence Redefined
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                From Cameras to{" "}
                <span className="text-gradient">Intelligence</span>
              </h2>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
                Traditional cameras only record what happened. Nirikshan AI
                detects what is happening, understands the event, and responds
                faster.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#custom-solutions">
                  <Button size="lg" className="gradient-primary w-full sm:w-auto shadow-lg shadow-blue-500/25 px-8">
                    Discuss Your Requirements
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </a>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto hover:bg-secondary px-8">
                    Contact Our Vision Team
                  </Button>
                </Link>
              </div>

              <div className="mt-14 pt-8 border-t border-border/50 flex flex-wrap items-center justify-center gap-8 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Existing CCTV Camera Compatible</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>On-Premises, Cloud & Hybrid</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Sub-Second Edge Alerts</span>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>
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
