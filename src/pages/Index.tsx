import { MutableRefObject, useEffect, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Brain,
  Eye,
  MessageSquare,
  Zap,
  Bot,
  Code2,
  Building2,
  Activity,
  TrendingUp,
  FileText,
  Wrench,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

/* ─── Data ─── */
const capabilities = [
  { icon: Brain, title: "Generative AI", desc: "Enterprise-ready content generation, summarization, and creative automation powered by fine-tuned LLMs." },
  { icon: Eye, title: "Computer Vision", desc: "Real-time object detection, OCR, and visual inspection systems built on OpenCV and deep learning." },
  { icon: MessageSquare, title: "LLM Integration", desc: "Seamless integration of large language models into your existing workflows and products." },
  { icon: Zap, title: "Data Automation", desc: "Intelligent pipelines that extract, transform, and act on data with minimal human oversight." },
  { icon: Bot, title: "Agentic AI", desc: "Autonomous agents that reason, plan, and execute multi-step tasks across your business systems." },
  { icon: Code2, title: "API & Developer Tools", desc: "Production-grade APIs, SDKs, and developer tooling for rapid AI integration." },
];

const useCases = [
  { icon: Building2, title: "Enterprise Insight", desc: "Unified dashboards powered by AI to surface actionable intelligence from disparate data sources." },
  { icon: Activity, title: "Automated Monitoring", desc: "Continuous visual and data monitoring with anomaly detection and instant alerting." },
  { icon: TrendingUp, title: "Predictive Analysis", desc: "Forecast demand, risk, and opportunity using production-grade ML models." },
  { icon: FileText, title: "Intelligent Reporting", desc: "Auto-generated reports with natural language summaries and visual analytics." },
  { icon: Wrench, title: "Custom AI Development", desc: "Bespoke AI solutions tailored to your unique domain, data, and business rules." },
];

const trustMetrics = [
  { value: "20+", label: "Projects Delivered" },
  { value: "5+", label: "Enterprise Clients" },
  { value: "3x", label: "Avg. ROI Improvement" },
  { value: "99.9%", label: "System Uptime" },
];

const partners = [
  { name: "Madapet", logo: "https://res.cloudinary.com/dch0uyw8e/image/upload/v1760830199/LOGO_8_8_kkuti6.jpg" },
  { name: "Mangosorange Agritech", logo: "https://mangosorange.co.in/assets/img/MOLogo.png" },
  { name: "Motherson", logo: "https://apn-portal.my.salesforce.com/servlet/servlet.ImageServer?id=0150h0000055wCcAAI&oid=00DE0000000c48tMAA" },
  { name: "Ranayara Pvt Ltd", logo: "https://5.imimg.com/data5/NSDMERP/Board/2023/5/308937129/NE/QI/NP/155783236/155783236-board-1684400723760.jpg" },
  { name: "YMCA University", logo: "https://upload.wikimedia.org/wikipedia/en/a/ae/J.C._Bose_University_of_Science_and_Technology%2C_YMCA_logo.png" },
];


const Index = () => {
  const heroRef = useScrollAnimation(0.1);
  const problemRef = useScrollAnimation(0.15);
  const capRef = useScrollAnimation(0.1);
  const useCaseRef = useScrollAnimation(0.1);
  const trustRef = useScrollAnimation(0.1);
  const ctaRef = useScrollAnimation(0.15);

  const partnersContainerRef = useRef<HTMLDivElement | null>(null);
  const isPartnersHoveringRef = useRef(false);

  useEffect(() => {
    document.title = "Nirikshan AI | AI & Machine Learning Solutions for Business Intelligence";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Nirikshan AI builds intelligent systems using Generative AI, Computer Vision, LLMs, and Agentic AI — turning complex data into actionable business insight.");
    }
  }, []);

  useEffect(() => {
    const container = partnersContainerRef.current;
    if (!container) return;
    let raf: number;
    const speed = 0.5;
    const loop = () => {
      if (!isPartnersHoveringRef.current) {
        container.scrollLeft += speed;
        if (container.scrollLeft >= container.scrollWidth / 2) container.scrollLeft = 0;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const duplicatedPartners = [...partners, ...partners];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* ── 1. Hero ── */}
        <section className="relative overflow-hidden pt-20 pb-28 md:pt-32 md:pb-36">
          {/* Background elements */}
          <div className="absolute inset-0 grid-pattern opacity-50" aria-hidden="true" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]" aria-hidden="true" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]" aria-hidden="true" />

          <div className="relative container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/60 backdrop-blur text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4 text-primary" />
                AI & Machine Learning Solutions
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                We Build AI Systems That Turn Data into{" "}
                <span className="text-gradient">Business Intelligence</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                From computer vision to autonomous agents — Nirikshan AI delivers intelligent solutions that help enterprises make smarter decisions, faster.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Link to="/contact">
                  <Button size="lg" className="gradient-primary text-primary-foreground px-8 h-12 text-base font-semibold">
                    Request Demo
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/expertise">
                  <Button size="lg" variant="outline" className="h-12 px-8 text-base border-border hover:bg-secondary">
                    Explore Solutions
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. Problem → Solution ── */}
        <section className="py-20 md:py-28 bg-secondary/30" ref={problemRef.ref}>
          <div className={`container mx-auto px-6 transition-all duration-1000 ${problemRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">What We Do</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Complex Problems. Intelligent Solutions.</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Enterprises drown in unstructured data. We transform it into intelligence that drives action.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Problem */}
              <div className="p-8 rounded-xl border border-border bg-card space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-medium">
                  The Challenge
                </div>
                <ul className="space-y-4">
                  {["Manual data interpretation across siloed systems", "Slow, error-prone decision-making processes", "Inability to scale expertise across the organization", "Missed patterns in complex, high-volume data"].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solution */}
              <div className="p-8 rounded-xl border border-primary/20 bg-card space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  Our AI Solution
                </div>
                <ul className="space-y-4">
                  {[
                    "Generative AI that synthesizes insights from any data source",
                    "Computer Vision that automates visual inspection at scale",
                    "LLM-powered automation for reports, queries, and decisions",
                    "Agentic workflows that execute multi-step tasks autonomously",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 w-4 h-4 text-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. Core Capabilities ── */}
        <section className="py-20 md:py-28" ref={capRef.ref}>
          <div className={`container mx-auto px-6 transition-all duration-1000 ${capRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Core Capabilities</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">End-to-End AI Capabilities</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Six pillars of intelligence that cover every stage of your AI journey.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {capabilities.map((cap, i) => (
                <div
                  key={cap.title}
                  className="group p-6 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <cap.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{cap.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cap.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. Use Cases ── */}
        <section className="py-20 md:py-28 bg-secondary/30" ref={useCaseRef.ref}>
          <div className={`container mx-auto px-6 transition-all duration-1000 ${useCaseRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Use Cases</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Who Benefits Most</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Real-world applications that deliver measurable outcomes.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {useCases.map((uc) => (
                <div
                  key={uc.title}
                  className="relative p-6 rounded-xl border border-border bg-card overflow-hidden group hover:border-accent/40 transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-500" aria-hidden="true" />
                  <div className="relative">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <uc.icon className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{uc.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{uc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. Why Nirikshan AI (Trust) ── */}
        <section className="py-20 md:py-28" ref={trustRef.ref}>
          <div className={`container mx-auto px-6 transition-all duration-1000 ${trustRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Why Us</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Forward-Thinking Organizations</h2>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
              {trustMetrics.map((m) => (
                <div key={m.label} className="text-center p-6 rounded-xl border border-border bg-card">
                  <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">{m.value}</div>
                  <div className="text-sm text-muted-foreground">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Client logos */}
            <div
              className="overflow-hidden"
              ref={partnersContainerRef}
              onMouseEnter={() => { isPartnersHoveringRef.current = true; }}
              onMouseLeave={() => { isPartnersHoveringRef.current = false; }}
            >
              <div className="flex gap-8 min-w-max items-center">
                {duplicatedPartners.map((p, i) => (
                  <div key={`${p.name}-${i}`} className="w-40 flex-shrink-0">
                    <div className="h-24 w-full bg-card border border-border rounded-xl flex items-center justify-center p-4 hover:border-primary/30 transition-colors">
                      <img src={p.logo} alt={p.name} className="max-h-full max-w-full object-contain" loading="lazy" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. CTA ── */}
        <section className="py-20 md:py-28" ref={ctaRef.ref}>
          <div className={`container mx-auto px-6 transition-all duration-1000 ${ctaRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="max-w-4xl mx-auto text-center space-y-8 p-12 md:p-16 rounded-2xl border border-border bg-card relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" aria-hidden="true" />
              <div className="relative">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  Build Smarter AI.{" "}
                  <span className="text-gradient">Drive Real Business Impact.</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
                  Let's explore how Nirikshan AI can accelerate your next intelligent solution — from proof of concept to production.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                  <Link to="/contact">
                    <Button size="lg" className="gradient-primary text-primary-foreground px-10 h-12 text-base font-semibold">
                      Get Started
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link to="/case-studies">
                    <Button size="lg" variant="outline" className="h-12 px-8 text-base border-border">
                      View Case Studies
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
