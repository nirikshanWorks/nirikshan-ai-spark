import { useEffect, useRef, useState, useCallback } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { MouseColorSplatter } from "@/components/MouseColorSplatter";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Brain,
  Eye,
  Bot,
  Building2,
  Activity,
  TrendingUp,
  FileText,
  CheckCircle2,
  Sparkles,
  Lightbulb,
  Code2,
  Rocket,
  Quote,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ─── Holi Colors ─── */
const holiColors = [
  "#FF6B9D", // pink
  "#F97316", // orange
  "#FACC15", // yellow
  "#4ADE80", // green
  "#6366F1", // indigo
  "#22D3EE", // cyan
  "#A855F7", // purple
  "#F43F5E", // rose
  "#34D399", // emerald
  "#FB923C", // light orange
];

/* ─── Color Splash Component ─── */
const ColorSplash = ({
  color,
  style,
}: {
  color: string;
  style: React.CSSProperties;
}) => (
  <div
    className="absolute rounded-full pointer-events-none blur-3xl opacity-0 transition-opacity duration-1000"
    style={{
      background: `radial-gradient(circle, ${color}88 0%, ${color}22 60%, transparent 80%)`,
      width: "clamp(200px, 30vw, 500px)",
      height: "clamp(200px, 30vw, 500px)",
      ...style,
    }}
  />
);

/* ─── Data ─── */
const capabilities = [
  {
    icon: Brain,
    title: "Generative AI Solutions",
    desc: "Custom AI models that create insights, automate content, and drive intelligent decision-making across your enterprise.",
    holi: holiColors[0],
  },
  {
    icon: Eye,
    title: "Computer Vision Systems",
    desc: "Intelligent visual interpretation and pattern discovery — from real-time object detection to automated quality inspection.",
    holi: holiColors[4],
  },
  {
    icon: Bot,
    title: "Agentic AI Solutions",
    desc: "Autonomous workflows that reason, plan, and act on insights — executing multi-step tasks across your business systems.",
    holi: holiColors[6],
  },
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

/* ─── Hook: scroll-based color progress ─── */
const useColorProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = Math.min(scrollY / (docHeight * 0.6), 1); // fully colored at 60% scroll
      setProgress(p);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
};

/* ─── Floating Powder Burst (canvas) ─── */
const HoliCanvas = ({ progress }: { progress: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{
    x: number; y: number; vx: number; vy: number;
    r: number; color: string; alpha: number; life: number;
  }>>([]);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Spawn particles based on progress
    const maxParticles = 120;
    const targetCount = Math.floor(progress * maxParticles);

    while (particlesRef.current.length < targetCount) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 6 + 2,
        color: holiColors[Math.floor(Math.random() * holiColors.length)],
        alpha: Math.random() * 0.4 + 0.1,
        life: Math.random() * 200 + 100,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.alpha * progress * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [progress]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1, opacity: progress }}
    />
  );
};

const Index = () => {
  const progress = useColorProgress();
  const partnersContainerRef = useRef<HTMLDivElement | null>(null);
  const isPartnersHoveringRef = useRef(false);

  // grayscale → full color
  const grayscale = `grayscale(${Math.max(0, 1 - progress * 1.5) * 100}%)`;
  const saturation = `saturate(${0.2 + progress * 1.8})`;
  const mainFilter = `${grayscale} ${saturation}`;

  useEffect(() => {
    document.title = "Happy Holi 🎨 | Nirikshan AI — AI & Machine Learning Solutions";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Happy Holi from Nirikshan AI! Celebrating the festival of colors with AI innovation.");
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
    <div className="min-h-screen bg-background relative">
      <Navigation />
      <MouseColorSplatter />

      {/* Holi color canvas overlay */}
      <HoliCanvas progress={progress} />

      {/* Color splashes that appear on scroll */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {holiColors.map((color, i) => (
          <ColorSplash
            key={i}
            color={color}
            style={{
              top: `${10 + i * 9}%`,
              left: `${(i % 2 === 0 ? 5 : 55) + (i * 7) % 30}%`,
              opacity: Math.min(1, Math.max(0, (progress - i * 0.07) * 3)) * 0.35,
              transform: `scale(${0.5 + progress * 0.8})`,
              transition: "opacity 0.8s ease, transform 1.2s ease",
            }}
          />
        ))}
      </div>

      <main className="relative" style={{ filter: mainFilter, transition: "filter 0.5s ease", zIndex: 2 }}>
        {/* ── 1. Hero ── */}
        <section className="relative overflow-hidden pt-24 pb-32 md:pt-36 md:pb-40">
          <div className="absolute inset-0 grid-pattern opacity-40" aria-hidden="true" />
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-[140px]"
            style={{
              background: `radial-gradient(circle, ${holiColors[0]}22, ${holiColors[4]}15, transparent)`,
              opacity: 0.3 + progress * 0.5,
            }}
            aria-hidden="true"
          />

          <div className="relative container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              {/* Holi Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-border bg-card/60 backdrop-blur text-sm font-semibold">
                <span className="text-lg">🎨</span>
                <span
                  className="bg-clip-text text-transparent font-bold"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${holiColors[0]}, ${holiColors[1]}, ${holiColors[3]}, ${holiColors[4]}, ${holiColors[6]})`,
                    opacity: 0.4 + progress * 0.6,
                  }}
                >
                  Happy Holi from Nirikshan AI!
                </span>
                <span className="text-lg">🎨</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight">
                AI That Sees, Understands, and Acts for{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: progress > 0.1
                      ? `linear-gradient(135deg, ${holiColors[0]}, ${holiColors[4]}, ${holiColors[6]}, ${holiColors[5]})`
                      : "linear-gradient(135deg, #888, #aaa)",
                    transition: "background-image 1s ease",
                  }}
                >
                  Real-World Business Impact
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Generative AI, Computer Vision & Agentic Solutions that transform data into actionable insights.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="text-white px-8 h-12 text-base font-semibold w-full sm:w-auto border-0"
                    style={{
                      background: progress > 0.15
                        ? `linear-gradient(135deg, ${holiColors[0]}, ${holiColors[1]}, ${holiColors[6]})`
                        : "hsl(var(--muted))",
                      transition: "background 1s ease",
                    }}
                  >
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
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: progress > 0.1 ? holiColors[1] : "hsl(var(--muted-foreground))", transition: "color 1s" }}>What We Do</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Complex Problems. Intelligent Solutions.</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Enterprises drown in unstructured data. We transform it into intelligence that drives action.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="p-8 rounded-xl border border-border bg-card space-y-6">
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
              </div>

              <div
                className="p-8 rounded-xl border bg-card space-y-6 transition-all duration-1000"
                style={{ borderColor: progress > 0.15 ? holiColors[3] + "66" : "hsl(var(--border))" }}
              >
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-1000"
                  style={{
                    background: progress > 0.15 ? holiColors[3] + "22" : "hsl(var(--primary) / 0.1)",
                    color: progress > 0.15 ? holiColors[3] : "hsl(var(--primary))",
                  }}
                >
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
                      <CheckCircle2 className="mt-0.5 w-4 h-4 flex-shrink-0" style={{ color: progress > 0.2 ? holiColors[i % holiColors.length] : "hsl(var(--primary))", transition: "color 1s" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. Capabilities ── */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: progress > 0.2 ? holiColors[6] : "hsl(var(--muted-foreground))", transition: "color 1s" }}>Core Capabilities</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Intelligence Across Every Dimension</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Three pillars of AI that cover the full spectrum of enterprise automation.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {capabilities.map((cap) => (
                <div
                  key={cap.title}
                  className="group p-8 rounded-xl border bg-card hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
                  style={{ borderColor: progress > 0.25 ? cap.holi + "44" : "hsl(var(--border))" }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-700"
                    style={{ background: progress > 0.25 ? cap.holi + "22" : "hsl(var(--primary) / 0.1)" }}
                  >
                    <cap.icon className="w-6 h-6 transition-colors duration-700" style={{ color: progress > 0.25 ? cap.holi : "hsl(var(--primary))" }} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{cap.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{cap.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. Use Cases ── */}
        <section className="py-20 md:py-28 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: progress > 0.3 ? holiColors[5] : "hsl(var(--muted-foreground))", transition: "color 1s" }}>Use Cases</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Real-World Applications</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Measurable outcomes across industries and domains.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {useCases.map((uc) => (
                <div
                  key={uc.title}
                  className="relative p-6 rounded-xl border bg-card overflow-hidden group hover:-translate-y-1 transition-all duration-300"
                  style={{ borderColor: progress > 0.35 ? uc.holi + "44" : "hsl(var(--border))" }}
                >
                  <div
                    className="absolute top-0 right-0 w-24 h-24 rounded-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-500"
                    style={{ background: progress > 0.35 ? uc.holi + "15" : "hsl(var(--accent) / 0.05)" }}
                    aria-hidden="true"
                  />
                  <div className="relative">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-all duration-700"
                      style={{ background: progress > 0.35 ? uc.holi + "22" : "hsl(var(--accent) / 0.1)" }}
                    >
                      <uc.icon className="w-5 h-5 transition-colors duration-700" style={{ color: progress > 0.35 ? uc.holi : "hsl(var(--accent))" }} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{uc.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{uc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. Trust & Proof ── */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: progress > 0.4 ? holiColors[0] : "hsl(var(--muted-foreground))", transition: "color 1s" }}>Trust & Proof</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Forward-Thinking Organizations</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
              {trustMetrics.map((m) => (
                <div key={m.label} className="text-center p-6 rounded-xl border bg-card transition-all duration-700" style={{ borderColor: progress > 0.4 ? m.holi + "44" : "hsl(var(--border))" }}>
                  <div
                    className="text-3xl md:text-4xl font-bold mb-1 bg-clip-text text-transparent transition-all duration-700"
                    style={{
                      backgroundImage: progress > 0.4
                        ? `linear-gradient(135deg, ${m.holi}, ${holiColors[(holiColors.indexOf(m.holi) + 2) % holiColors.length]})`
                        : "linear-gradient(135deg, #888, #aaa)",
                    }}
                  >
                    {m.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="max-w-3xl mx-auto mb-16">
              <div
                className="p-8 rounded-xl border bg-card text-center transition-all duration-700"
                style={{ borderColor: progress > 0.45 ? holiColors[4] + "44" : "hsl(var(--border))" }}
              >
                <Quote className="w-8 h-8 mx-auto mb-4 transition-colors duration-700" style={{ color: progress > 0.45 ? holiColors[4] + "66" : "hsl(var(--primary) / 0.4)" }} />
                <p className="text-lg text-muted-foreground italic leading-relaxed mb-6">
                  "Nirikshan AI transformed our quality inspection process — what used to take hours of manual review now happens in real-time with greater accuracy."
                </p>
                <div>
                  <p className="font-semibold">Operations Director</p>
                  <p className="text-sm text-muted-foreground">Enterprise Manufacturing Client</p>
                </div>
              </div>
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

        {/* ── 6. How We Work ── */}
        <section className="py-20 md:py-28 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: progress > 0.5 ? holiColors[8] : "hsl(var(--muted-foreground))", transition: "color 1s" }}>Our Process</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Work</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">A proven methodology from problem definition to production deployment.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {processSteps.map((step) => (
                <div
                  key={step.step}
                  className="relative p-6 rounded-xl border bg-card group hover:-translate-y-1 transition-all duration-300"
                  style={{ borderColor: progress > 0.55 ? step.holi + "44" : "hsl(var(--border))" }}
                >
                  <div
                    className="absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-lg text-white transition-all duration-700"
                    style={{ background: progress > 0.55 ? step.holi : "hsl(var(--muted))" }}
                  >
                    {step.step}
                  </div>
                  <div className="mt-4 mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-700"
                      style={{ background: progress > 0.55 ? step.holi + "22" : "hsl(var(--primary) / 0.1)" }}
                    >
                      <step.icon className="w-5 h-5 transition-colors duration-700" style={{ color: progress > 0.55 ? step.holi : "hsl(var(--primary))" }} />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. Holi CTA ── */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6">
            <div
              className="max-w-4xl mx-auto text-center space-y-8 p-12 md:p-16 rounded-2xl border bg-card relative overflow-hidden transition-all duration-700"
              style={{
                borderColor: progress > 0.6 ? holiColors[0] + "44" : "hsl(var(--border))",
              }}
            >
              {/* Holi color splashes behind CTA */}
              <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                {[holiColors[0], holiColors[4], holiColors[3], holiColors[6]].map((c, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full blur-3xl transition-opacity duration-1000"
                    style={{
                      background: c + "20",
                      width: "300px",
                      height: "300px",
                      top: i < 2 ? "-100px" : "auto",
                      bottom: i >= 2 ? "-100px" : "auto",
                      left: i % 2 === 0 ? "-80px" : "auto",
                      right: i % 2 !== 0 ? "-80px" : "auto",
                      opacity: progress > 0.6 ? 0.7 : 0,
                    }}
                  />
                ))}
              </div>

              <div className="relative">
                <p className="text-5xl mb-4">🎨🌈✨</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  Wishing You a{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(90deg, ${holiColors[0]}, ${holiColors[1]}, ${holiColors[3]}, ${holiColors[4]}, ${holiColors[6]})`,
                      opacity: 0.5 + progress * 0.5,
                    }}
                  >
                    Colorful Holi!
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
                  Just like Holi fills the world with color, Nirikshan AI brings intelligence to every corner of your business. Let's paint your future together.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                  <Link to="/contact">
                    <Button
                      size="lg"
                      className="text-white px-10 h-12 text-base font-semibold w-full sm:w-auto border-0"
                      style={{
                        background: `linear-gradient(135deg, ${holiColors[0]}, ${holiColors[1]}, ${holiColors[4]}, ${holiColors[6]})`,
                      }}
                    >
                      Request Demo
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors text-base font-medium">
                    Contact Sales →
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
