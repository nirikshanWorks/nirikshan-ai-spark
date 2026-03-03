import { useEffect, useRef, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { HoliText } from "@/components/HoliText";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Brain, Eye, Bot, Building2, Activity,
  TrendingUp, FileText, CheckCircle2, Sparkles,
  Lightbulb, Code2, Rocket, Quote,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ─── Holi Colors ─── */
const holiColors = [
  "#FF6B9D", "#F97316", "#FACC15", "#4ADE80", "#6366F1",
  "#22D3EE", "#A855F7", "#F43F5E", "#34D399", "#FB923C",
];

/* ─── Data ─── */
const capabilities = [
  { icon: Brain, title: "Generative AI Solutions", desc: "Custom AI models that create insights, automate content, and drive intelligent decision-making across your enterprise.", holi: holiColors[0] },
  { icon: Eye, title: "Computer Vision Systems", desc: "Intelligent visual interpretation and pattern discovery — from real-time object detection to automated quality inspection.", holi: holiColors[4] },
  { icon: Bot, title: "Agentic AI Solutions", desc: "Autonomous workflows that reason, plan, and act on insights — executing multi-step tasks across your business systems.", holi: holiColors[6] },
];

const useCases = [
  { icon: Eye, title: "Visual Inspection & Quality Monitoring", desc: "Automated defect detection and quality assurance using deep learning vision models.", holi: holiColors[1] },
  { icon: Activity, title: "Automated Decision Support", desc: "AI-driven recommendations that accelerate decision cycles and reduce human error.", holi: holiColors[3] },
  { icon: TrendingUp, title: "Predictive Outcomes & Alerts", desc: "Forecast demand, risk, and anomalies before they impact your operations.", holi: holiColors[5] },
  { icon: FileText, title: "Insight Generation from Unstructured Data", desc: "Extract actionable intelligence from documents, images, and complex datasets.", holi: holiColors[8] },
];

const trustMetrics = [
  { value: "20+", label: "Projects Delivered", holi: holiColors[0] },
  { value: "5+", label: "Enterprise Clients", holi: holiColors[4] },
  { value: "3x", label: "Avg. ROI Improvement", holi: holiColors[6] },
  { value: "99.9%", label: "System Uptime", holi: holiColors[5] },
];

const partners = [
  { name: "Madapet", logo: "https://res.cloudinary.com/dch0uyw8e/image/upload/v1760830199/LOGO_8_8_kkuti6.jpg" },
  { name: "Mangosorange Agritech", logo: "https://mangosorange.co.in/assets/img/MOLogo.png" },
  { name: "Motherson", logo: "https://apn-portal.my.salesforce.com/servlet/servlet.ImageServer?id=0150h0000055wCcAAI&oid=00DE0000000c48tMAA" },
  { name: "Ranayara Pvt Ltd", logo: "https://5.imimg.com/data5/NSDMERP/Board/2023/5/308937129/NE/QI/NP/155783236/155783236-board-1684400723760.jpg" },
  { name: "YMCA University", logo: "https://upload.wikimedia.org/wikipedia/en/a/ae/J.C._Bose_University_of_Science_and_Technology%2C_YMCA_logo.png" },
];

const processSteps = [
  { icon: Lightbulb, step: "01", title: "Define Problem", desc: "We analyze your business challenges and identify where AI creates the highest impact.", holi: holiColors[1] },
  { icon: Building2, step: "02", title: "Prepare Data", desc: "Clean, structure, and enrich your data to fuel accurate, reliable AI models.", holi: holiColors[3] },
  { icon: Code2, step: "03", title: "Build Solution", desc: "Develop, train, and validate custom AI systems tailored to your domain.", holi: holiColors[6] },
  { icon: Rocket, step: "04", title: "Deliver & Support", desc: "Deploy to production with monitoring, optimization, and ongoing support.", holi: holiColors[0] },
];

/* ─── Holi Card: entire card colorizes on hover ─── */
const HoliCard = ({
  children,
  holiColor,
  className = "",
}: {
  children: React.ReactNode;
  holiColor: string;
  className?: string;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`transition-all duration-500 ${className}`}
      style={{
        borderColor: hovered ? holiColor + "66" : "hsl(var(--border))",
        filter: hovered ? "none" : "grayscale(100%)",
        boxShadow: hovered ? `0 8px 30px -8px ${holiColor}33` : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </div>
  );
};

const Index = () => {
  const partnersContainerRef = useRef<HTMLDivElement | null>(null);
  const isPartnersHoveringRef = useRef(false);

  useEffect(() => {
    document.title = "Happy Holi 🎨 | Nirikshan AI — AI & Machine Learning Solutions";
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
        {/* ── 1. Hero (starts grayscale, text colorizes on hover) ── */}
        <section className="relative overflow-hidden pt-24 pb-32 md:pt-36 md:pb-40">
          <div className="absolute inset-0 grid-pattern opacity-40" aria-hidden="true" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-primary/6 blur-[140px]" aria-hidden="true" />

          <div className="relative container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              {/* Holi Badge */}
              <HoliText className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-border bg-card/60 backdrop-blur text-sm font-bold">
                🎨 Happy Holi from Nirikshan AI! 🎨
              </HoliText>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight"
                  style={{ filter: "grayscale(100%)" }}>
                <HoliText tag="span" className="inline">AI That Sees, Understands, and Acts for </HoliText>
                <HoliText tag="span" className="inline font-extrabold">Real-World Business Impact</HoliText>
              </h1>

              <HoliText tag="p" className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Generative AI, Computer Vision & Agentic Solutions that transform data into actionable insights.
              </HoliText>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Link to="/contact">
                  <Button size="lg" className="gradient-primary text-primary-foreground px-8 h-12 text-base font-semibold w-full sm:w-auto" style={{ filter: "grayscale(100%)", transition: "filter 0.5s" }} onMouseEnter={e => e.currentTarget.style.filter = "none"} onMouseLeave={e => e.currentTarget.style.filter = "grayscale(100%)"}>
                    Request Demo
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/expertise">
                  <Button size="lg" variant="outline" className="h-12 px-8 text-base border-border hover:bg-secondary w-full sm:w-auto">
                    View Capabilities
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. Problem → Solution ── */}
        <section className="py-20 md:py-28 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <HoliText tag="p" className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3">What We Do</HoliText>
              <HoliText tag="h2" className="text-3xl md:text-4xl font-bold mb-4">Complex Problems. Intelligent Solutions.</HoliText>
              <HoliText tag="p" className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Enterprises drown in unstructured data. We transform it into intelligence that drives action.
              </HoliText>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <HoliCard holiColor={holiColors[7]} className="p-8 rounded-xl border border-border bg-card space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-medium">
                  The Challenge
                </div>
                <ul className="space-y-4">
                  {["Manual data interpretation across siloed systems", "Slow, error-prone decision-making loops", "Inability to scale expertise across the organization", "Missed patterns in complex, high-volume data"].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </HoliCard>

              <HoliCard holiColor={holiColors[3]} className="p-8 rounded-xl border border-border bg-card space-y-6">
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
              </HoliCard>
            </div>
          </div>
        </section>

        {/* ── 3. Capabilities ── */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <HoliText tag="p" className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3">Core Capabilities</HoliText>
              <HoliText tag="h2" className="text-3xl md:text-4xl font-bold mb-4">Intelligence Across Every Dimension</HoliText>
              <HoliText tag="p" className="text-muted-foreground max-w-2xl mx-auto text-lg">Three pillars of AI that cover the full spectrum of enterprise automation.</HoliText>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {capabilities.map((cap) => (
                <HoliCard key={cap.title} holiColor={cap.holi} className="group p-8 rounded-xl border bg-card hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <cap.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{cap.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{cap.desc}</p>
                </HoliCard>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. Use Cases ── */}
        <section className="py-20 md:py-28 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <HoliText tag="p" className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3">Use Cases</HoliText>
              <HoliText tag="h2" className="text-3xl md:text-4xl font-bold mb-4">Real-World Applications</HoliText>
              <HoliText tag="p" className="text-muted-foreground max-w-2xl mx-auto text-lg">Measurable outcomes across industries and domains.</HoliText>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {useCases.map((uc) => (
                <HoliCard key={uc.title} holiColor={uc.holi} className="relative p-6 rounded-xl border bg-card overflow-hidden group hover:-translate-y-1">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <uc.icon className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{uc.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{uc.desc}</p>
                  </div>
                </HoliCard>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. Trust & Proof ── */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <HoliText tag="p" className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3">Trust & Proof</HoliText>
              <HoliText tag="h2" className="text-3xl md:text-4xl font-bold mb-4">Trusted by Forward-Thinking Organizations</HoliText>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
              {trustMetrics.map((m) => (
                <HoliCard key={m.label} holiColor={m.holi} className="text-center p-6 rounded-xl border bg-card">
                  <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">{m.value}</div>
                  <div className="text-sm text-muted-foreground">{m.label}</div>
                </HoliCard>
              ))}
            </div>

            {/* Testimonial */}
            <div className="max-w-3xl mx-auto mb-16">
              <HoliCard holiColor={holiColors[4]} className="p-8 rounded-xl border bg-card text-center">
                <Quote className="w-8 h-8 text-primary/40 mx-auto mb-4" />
                <p className="text-lg text-muted-foreground italic leading-relaxed mb-6">
                  "Nirikshan AI transformed our quality inspection process — what used to take hours of manual review now happens in real-time with greater accuracy."
                </p>
                <div>
                  <p className="font-semibold">Operations Director</p>
                  <p className="text-sm text-muted-foreground">Enterprise Manufacturing Client</p>
                </div>
              </HoliCard>
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
                    <div className="h-24 w-full bg-card border border-border rounded-xl flex items-center justify-center p-4 hover:border-primary/30 transition-colors" style={{ filter: "grayscale(100%)", transition: "filter 0.5s" }} onMouseEnter={e => e.currentTarget.style.filter = "none"} onMouseLeave={e => e.currentTarget.style.filter = "grayscale(100%)"}>
                      <img src={p.logo} alt={p.name} className="max-h-full max-w-full object-contain" loading="lazy" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. How We Work ── */}
        <section className="py-20 md:py-28 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <HoliText tag="p" className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3">Our Process</HoliText>
              <HoliText tag="h2" className="text-3xl md:text-4xl font-bold mb-4">How We Work</HoliText>
              <HoliText tag="p" className="text-muted-foreground max-w-2xl mx-auto text-lg">A proven methodology from problem definition to production deployment.</HoliText>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {processSteps.map((step) => (
                <HoliCard key={step.step} holiColor={step.holi} className="relative p-6 rounded-xl border bg-card group hover:-translate-y-1">
                  <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg">
                    {step.step}
                  </div>
                  <div className="mt-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <step.icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </HoliCard>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. Holi CTA ── */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6">
            <HoliCard holiColor={holiColors[0]} className="max-w-4xl mx-auto text-center space-y-8 p-12 md:p-16 rounded-2xl border bg-card relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" aria-hidden="true" />
              <div className="relative">
                <p className="text-5xl mb-4">🎨🌈✨</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  <HoliText tag="span">Wishing You a Colorful Holi!</HoliText>
                </h2>
                <HoliText tag="p" className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
                  Just like Holi fills the world with color, Nirikshan AI brings intelligence to every corner of your business. Let's paint your future together.
                </HoliText>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                  <Link to="/contact">
                    <Button size="lg" className="gradient-primary text-primary-foreground px-10 h-12 text-base font-semibold w-full sm:w-auto" style={{ filter: "grayscale(100%)", transition: "filter 0.5s" }} onMouseEnter={e => e.currentTarget.style.filter = "none"} onMouseLeave={e => e.currentTarget.style.filter = "grayscale(100%)"}>
                      Request Demo
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors text-base font-medium">
                    Contact Sales →
                  </Link>
                </div>
              </div>
            </HoliCard>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
