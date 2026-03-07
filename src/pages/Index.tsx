import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { AICircuitLines } from "@/components/AICircuitLines";
import { AIFloatingIcons } from "@/components/AIFloatingIcons";
import { AIHexagonGrid } from "@/components/AIHexagonGrid";
import { FadeUp, SlideLeft, SlideRight, StaggerContainer, StaggerItem, ScaleUp, Counter } from "@/components/ScrollAnimations";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Brain, Eye, Bot, Building2, Activity,
  TrendingUp, FileText, CheckCircle2,
  Lightbulb, Code2, Rocket, Quote,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ─── Holi Colors ─── */
const holiColors = [
  "#FF6B9D", "#F97316", "#FACC15", "#4ADE80", "#6366F1",
  "#22D3EE", "#A855F7", "#F43F5E", "#34D399", "#FB923C",
];

/* ─── Floating Holi Powder Canvas ─── */
const HoliPowderCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Array<{
    x: number; y: number; r: number; color: string;
    vx: number; vy: number; alpha: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    for (let i = 0; i < 60; i++) {
      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 4 + 1,
        color: holiColors[Math.floor(Math.random() * holiColors.length)],
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.3 - 0.2,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

/* ─── Holi Card with color splash on hover ─── */
const HoliCard = ({
  children, holiColor, className = "",
}: {
  children: React.ReactNode; holiColor: string; className?: string;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`relative overflow-hidden transition-all duration-500 ${className}`}
      style={{
        borderColor: hovered ? holiColor + "88" : "hsl(var(--border))",
        boxShadow: hovered ? `0 0 40px -10px ${holiColor}55, inset 0 0 30px -15px ${holiColor}22` : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Color powder splash effect on hover */}
      <div
        className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${holiColor}15 0%, transparent 60%), radial-gradient(circle at 70% 70%, ${holiColors[(holiColors.indexOf(holiColor) + 3) % holiColors.length]}12 0%, transparent 60%)`,
          opacity: hovered ? 1 : 0,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

/* ─── Holi Section Divider ─── */
const HoliDivider = () => (
  <div className="flex items-center justify-center gap-3 py-4">
    {holiColors.slice(0, 7).map((c, i) => (
      <div
        key={i}
        className="w-2.5 h-2.5 rounded-full animate-bounce"
        style={{
          backgroundColor: c,
          animationDelay: `${i * 0.12}s`,
          animationDuration: "1.5s",
        }}
      />
    ))}
  </div>
);

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
    <div className="min-h-screen bg-background relative">
      <Navigation />
      <HoliPowderCanvas />

      <main className="relative z-10">
        {/* ── HOLI HERO BANNER ── */}
        <section className="relative overflow-hidden pt-24 pb-20 md:pt-36 md:pb-28">
          <AICircuitLines className="opacity-40" />
          <AIFloatingIcons count={8} />
          {/* Colorful background blobs */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute top-10 left-10 w-[400px] h-[400px] rounded-full blur-[100px] animate-pulse" style={{ background: `${holiColors[0]}20` }} />
            <div className="absolute top-40 right-10 w-[350px] h-[350px] rounded-full blur-[100px] animate-pulse" style={{ background: `${holiColors[4]}20`, animationDelay: "1s" }} />
            <div className="absolute bottom-10 left-1/3 w-[300px] h-[300px] rounded-full blur-[100px] animate-pulse" style={{ background: `${holiColors[3]}18`, animationDelay: "2s" }} />
            <div className="absolute bottom-20 right-1/4 w-[350px] h-[350px] rounded-full blur-[100px] animate-pulse" style={{ background: `${holiColors[6]}18`, animationDelay: "0.5s" }} />
          </div>

          <div className="relative container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              {/* Holi Greeting Banner */}
              <div className="inline-block">
                <div
                  className="px-8 py-3 rounded-full text-white font-bold text-lg md:text-xl shadow-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${holiColors[0]}, ${holiColors[1]}, ${holiColors[3]}, ${holiColors[4]}, ${holiColors[6]})`,
                    backgroundSize: "300% 300%",
                    animation: "holiShift 4s ease infinite",
                  }}
                >
                  🎨 Happy Holi from Nirikshan AI! 🎨
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight">
                AI That Sees, Understands, and Acts for{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${holiColors[0]}, ${holiColors[1]}, ${holiColors[4]}, ${holiColors[6]}, ${holiColors[5]})`,
                    backgroundSize: "200% 200%",
                    animation: "holiShift 5s ease infinite",
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
                    className="text-white px-8 h-12 text-base font-semibold w-full sm:w-auto border-0 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${holiColors[0]}, ${holiColors[1]}, ${holiColors[6]})`,
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

              <HoliDivider />
            </div>
          </div>
        </section>

        {/* ── 2. Problem → Solution ── */}
        <section className="py-20 md:py-28" style={{ background: `linear-gradient(180deg, transparent, ${holiColors[0]}06, ${holiColors[4]}06, transparent)` }}>
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
            <FadeUp>
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: holiColors[1] }}>What We Do</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Complex Problems. <span style={{ color: holiColors[4] }}>Intelligent</span> Solutions.</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Enterprises drown in unstructured data. We transform it into intelligence that drives action.
              </p>
            </FadeUp>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <SlideLeft delay={0.1}>
            <HoliCard holiColor={holiColors[7]} className="p-8 rounded-xl border border-border bg-card space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium" style={{ background: `${holiColors[7]}18`, color: holiColors[7] }}>
                  The Challenge
                </div>
                <ul className="space-y-4">
                  {["Manual data interpretation across siloed systems", "Slow, error-prone decision-making loops", "Inability to scale expertise across the organization", "Missed patterns in complex, high-volume data"].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: holiColors[(i + 7) % holiColors.length] }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </HoliCard>
              </SlideLeft>

              <SlideRight delay={0.2}>
              <HoliCard holiColor={holiColors[3]} className="p-8 rounded-xl border border-border bg-card space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium" style={{ background: `${holiColors[3]}18`, color: holiColors[3] }}>
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
                      <CheckCircle2 className="mt-0.5 w-4 h-4 flex-shrink-0" style={{ color: holiColors[i % holiColors.length] }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </HoliCard>
              </SlideRight>
            </div>
          </div>
        </section>

        {/* ── 3. Capabilities ── */}
        <section className="py-20 md:py-28 relative">
          <AIHexagonGrid className="opacity-30" />
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
            <FadeUp>
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: holiColors[6] }}>Core Capabilities</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Intelligence Across <span style={{ color: holiColors[5] }}>Every</span> Dimension</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Three pillars of AI that cover the full spectrum of enterprise automation.</p>
            </FadeUp>

            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto" staggerDelay={0.15}>
              {capabilities.map((cap) => (
                <StaggerItem key={cap.title}>
                <HoliCard holiColor={cap.holi} className="group p-8 rounded-xl border bg-card hover:-translate-y-2 transition-transform duration-300 ai-border-glow">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors" style={{ background: `${cap.holi}18` }}>
                    <cap.icon className="w-6 h-6" style={{ color: cap.holi }} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{cap.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{cap.desc}</p>
                </HoliCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <HoliDivider />

        {/* ── 4. Use Cases ── */}
        <section className="py-20 md:py-28 relative" style={{ background: `linear-gradient(180deg, transparent, ${holiColors[6]}05, ${holiColors[3]}05, transparent)` }}>
          <AICircuitLines className="opacity-20" />
          <div className="container mx-auto px-6 relative z-10">
            <FadeUp>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: holiColors[5] }}>Use Cases</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Real-World <span style={{ color: holiColors[1] }}>Applications</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Measurable outcomes across industries and domains.</p>
            </div>
            </FadeUp>

            <StaggerContainer className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto" staggerDelay={0.12}>
              {useCases.map((uc) => (
                <StaggerItem key={uc.title}>
                <HoliCard holiColor={uc.holi} className="relative p-6 rounded-xl border bg-card overflow-hidden group hover:-translate-y-1 transition-transform duration-300 ai-border-glow">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: `${uc.holi}18` }}>
                      <uc.icon className="w-5 h-5" style={{ color: uc.holi }} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{uc.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{uc.desc}</p>
                  </div>
                </HoliCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ── 5. Trust & Proof ── */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: holiColors[0] }}>Trust & Proof</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by <span style={{ color: holiColors[3] }}>Forward-Thinking</span> Organizations</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
              {trustMetrics.map((m) => (
                <HoliCard key={m.label} holiColor={m.holi} className="text-center p-6 rounded-xl border bg-card">
                  <div
                    className="text-3xl md:text-4xl font-bold mb-1 bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(135deg, ${m.holi}, ${holiColors[(holiColors.indexOf(m.holi) + 3) % holiColors.length]})` }}
                  >
                    {m.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{m.label}</div>
                </HoliCard>
              ))}
            </div>

            {/* Testimonial */}
            <div className="max-w-3xl mx-auto mb-16">
              <HoliCard holiColor={holiColors[4]} className="p-8 rounded-xl border bg-card text-center">
                <Quote className="w-8 h-8 mx-auto mb-4" style={{ color: `${holiColors[4]}66` }} />
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
                    <div
                      className="h-24 w-full bg-card border rounded-xl flex items-center justify-center p-4 transition-all duration-300 hover:scale-105"
                      style={{ borderColor: holiColors[i % holiColors.length] + "33" }}
                    >
                      <img src={p.logo} alt={p.name} className="max-h-full max-w-full object-contain" loading="lazy" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. How We Work ── */}
        <section className="py-20 md:py-28" style={{ background: `linear-gradient(180deg, transparent, ${holiColors[1]}06, ${holiColors[8]}06, transparent)` }}>
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: holiColors[8] }}>Our Process</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How We <span style={{ color: holiColors[6] }}>Work</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">A proven methodology from problem definition to production deployment.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {processSteps.map((step) => (
                <HoliCard key={step.step} holiColor={step.holi} className="relative p-6 rounded-xl border bg-card group hover:-translate-y-2 transition-transform duration-300">
                  <div
                    className="absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                    style={{ background: step.holi }}
                  >
                    {step.step}
                  </div>
                  <div className="mt-4 mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors" style={{ background: `${step.holi}18` }}>
                      <step.icon className="w-5 h-5" style={{ color: step.holi }} />
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
            <div
              className="max-w-4xl mx-auto text-center space-y-8 p-12 md:p-16 rounded-2xl border relative overflow-hidden"
              style={{
                borderColor: `${holiColors[0]}44`,
                background: `linear-gradient(135deg, ${holiColors[0]}08, ${holiColors[4]}08, ${holiColors[6]}08)`,
              }}
            >
              {/* Color powder clouds */}
              <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                {holiColors.slice(0, 5).map((c, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full blur-[80px] animate-pulse"
                    style={{
                      background: `${c}18`,
                      width: "250px", height: "250px",
                      top: `${(i * 25) % 100}%`,
                      left: `${(i * 20 + 10) % 100}%`,
                      animationDelay: `${i * 0.6}s`,
                      animationDuration: "3s",
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
                      backgroundSize: "200% 200%",
                      animation: "holiShift 4s ease infinite",
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
                      className="text-white px-10 h-12 text-base font-semibold w-full sm:w-auto border-0 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${holiColors[0]}, ${holiColors[1]}, ${holiColors[4]}, ${holiColors[6]})`,
                        backgroundSize: "200% 200%",
                        animation: "holiShift 5s ease infinite",
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