import { useEffect, useRef } from "react";
import mockupDashboard from "@/assets/mockup-ai-dashboard.jpg";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { AICircuitLines } from "@/components/AICircuitLines";
import { AIHexagonGrid } from "@/components/AIHexagonGrid";
import { AI3DCube } from "@/components/AI3DCube";
import { AIWaveField } from "@/components/AIWaveField";
import { AIParticleRing } from "@/components/AIParticleRing";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { AnimatedGridBg } from "@/components/AnimatedGridBg";
import { TypingText } from "@/components/TypingText";
import { FadeUp, SlideLeft, SlideRight, StaggerContainer, StaggerItem } from "@/components/ScrollAnimations";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import {
  ArrowRight, Brain, Eye, Bot, Building2, Activity,
  TrendingUp, FileText, CheckCircle2,
  Lightbulb, Code2, Rocket, Quote,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ─── Data ─── */
const capabilities = [
  { icon: Brain, title: "Generative AI Solutions", desc: "Custom AI models that create insights, automate content, and drive intelligent decision-making across your enterprise." },
  { icon: Eye, title: "Computer Vision Systems", desc: "Intelligent visual interpretation and pattern discovery — from real-time object detection to automated quality inspection." },
  { icon: Bot, title: "Agentic AI Solutions", desc: "Autonomous workflows that reason, plan, and act on insights — executing multi-step tasks across your business systems." },
];

const useCases = [
  { icon: Eye, title: "Visual Inspection & Quality Monitoring", desc: "Automated defect detection and quality assurance using deep learning vision models." },
  { icon: Activity, title: "Automated Decision Support", desc: "AI-driven recommendations that accelerate decision cycles and reduce human error." },
  { icon: TrendingUp, title: "Predictive Outcomes & Alerts", desc: "Forecast demand, risk, and anomalies before they impact your operations." },
  { icon: FileText, title: "Insight Generation from Unstructured Data", desc: "Extract actionable intelligence from documents, images, and complex datasets." },
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

const processSteps = [
  { icon: Lightbulb, step: "01", title: "Define Problem", desc: "We analyze your business challenges and identify where AI creates the highest impact." },
  { icon: Building2, step: "02", title: "Prepare Data", desc: "Clean, structure, and enrich your data to fuel accurate, reliable AI models." },
  { icon: Code2, step: "03", title: "Build Solution", desc: "Develop, train, and validate custom AI systems tailored to your domain." },
  { icon: Rocket, step: "04", title: "Deliver & Support", desc: "Deploy to production with monitoring, optimization, and ongoing support." },
];

const Index = () => {
  const partnersContainerRef = useRef<HTMLDivElement | null>(null);
  const isPartnersHoveringRef = useRef(false);

  useEffect(() => {
    document.title = "Nirikshan AI — AI & Machine Learning Solutions";
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

      <main className="relative z-10">
        {/* ── HERO ── */}
        <section className="relative overflow-hidden pt-24 pb-8 md:pt-32 md:pb-12">
          <div className="container mx-auto px-6">
            <div className="relative w-full rounded-xl border border-border bg-card/80 backdrop-blur overflow-hidden min-h-[500px] md:min-h-[550px]">
              <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" size={300} />
              
              <div className="flex flex-col md:flex-row h-full min-h-[500px] md:min-h-[550px]">
                {/* Left content */}
                <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary w-fit mb-6">
                    <Brain className="w-4 h-4" />
                    AI-Powered Enterprise Solutions
                  </div>
                  
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight">
                    AI That Sees, Understands &{" "}
                    <span className="text-gradient">Acts for Impact</span>
                  </h1>
                  
                  <p className="mt-4 text-muted-foreground max-w-lg text-base md:text-lg leading-relaxed">
                    Generative AI, Computer Vision & Agentic Solutions that transform data into actionable insights.
                  </p>

                  <div className="flex flex-col sm:flex-row items-start gap-4 pt-6">
                    <Link to="/contact">
                      <Button size="lg" className="gradient-primary text-primary-foreground px-8 h-12 text-base font-semibold border-0">
                        Request Demo
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                    <Link to="/expertise">
                      <Button size="lg" variant="outline" className="h-12 px-8 text-base border-border hover:bg-secondary">
                        View Capabilities
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Right – 3D Spline scene */}
                <div className="flex-1 relative min-h-[300px] md:min-h-0">
                  <SplineScene 
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full"
                  />
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full bg-primary/90 backdrop-blur-sm border border-primary-foreground/20 shadow-lg">
                    <p className="text-primary-foreground text-sm font-semibold tracking-wide whitespace-nowrap">
                      <TypingText text="👋 Hello From Nirikshan AI" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Scroll Animation Showcase ── */}
        <section className="bg-secondary/20">
          <ContainerScroll
            titleComponent={
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">AI Dashboard</p>
                <h2 className="text-3xl md:text-5xl font-bold">
                  Experience <span className="text-gradient">Intelligent</span> Analytics
                </h2>
              </div>
            }
          >
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
              alt="AI Analytics Dashboard"
              className="w-full h-full object-cover object-left-top rounded-2xl"
            />
          </ContainerScroll>
        </section>

        {/* ── 2. Problem → Solution ── */}
        <section className="py-20 md:py-28 bg-secondary/30">
          <div className="container mx-auto px-6">
            <FadeUp className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">What We Do</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Complex Problems. <span className="text-gradient">Intelligent</span> Solutions.</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Enterprises drown in unstructured data. We transform it into intelligence that drives action.
              </p>
            </FadeUp>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <SlideLeft delay={0.1}>
                <div className="p-8 rounded-xl border border-border bg-card space-y-6 ai-border-glow">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-destructive/10 text-destructive">
                    The Challenge
                  </div>
                  <ul className="space-y-4">
                    {["Manual data interpretation across siloed systems", "Slow, error-prone decision-making loops", "Inability to scale expertise across the organization", "Missed patterns in complex, high-volume data"].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0 bg-destructive/50" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </SlideLeft>

              <SlideRight delay={0.2}>
                <div className="p-8 rounded-xl border border-border bg-card space-y-6 ai-border-glow">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent-foreground">
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
                        <CheckCircle2 className="mt-0.5 w-4 h-4 flex-shrink-0 text-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </SlideRight>
            </div>
          </div>
        </section>

        {/* ── 3. Capabilities ── */}
        <section className="py-20 md:py-28 relative">
          <AIHexagonGrid className="opacity-30" />
          <AIWaveField className="opacity-20" />
          <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20 hidden xl:block">
            <AI3DCube size={100} />
          </div>
          <div className="container mx-auto px-6">
            <FadeUp className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Core Capabilities</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Intelligence Across <span className="text-gradient">Every</span> Dimension</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Three pillars of AI that cover the full spectrum of enterprise automation.</p>
            </FadeUp>

            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto" staggerDelay={0.15}>
              {capabilities.map((cap) => (
                <StaggerItem key={cap.title}>
                  <div className="group p-8 rounded-xl border border-border bg-card hover:-translate-y-2 transition-transform duration-300 ai-border-glow">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-primary/10">
                      <cap.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{cap.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{cap.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ── 4. Use Cases ── */}
        <section className="py-20 md:py-28 relative bg-secondary/20">
          <AICircuitLines className="opacity-20" />
          <AnimatedGridBg className="opacity-15" />
          <div className="absolute -right-20 top-10 opacity-15 hidden xl:block">
            <AIParticleRing size={200} particleCount={30} />
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <FadeUp>
              <div className="text-center mb-16">
                <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">Use Cases</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Real-World <span className="text-gradient">Applications</span></h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Measurable outcomes across industries and domains.</p>
              </div>
            </FadeUp>

            <StaggerContainer className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto" staggerDelay={0.12}>
              {useCases.map((uc) => (
                <StaggerItem key={uc.title}>
                  <div className="relative p-6 rounded-xl border border-border bg-card overflow-hidden group hover:-translate-y-1 transition-transform duration-300 ai-border-glow">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-primary/10">
                        <uc.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{uc.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{uc.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ── 5. Trust & Proof ── */}
        <section className="py-20 md:py-28 relative">
          <AIWaveField className="opacity-10" />
          <div className="container mx-auto px-6">
            <FadeUp className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Trust & Proof</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by <span className="text-gradient">Forward-Thinking</span> Organizations</h2>
            </FadeUp>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
              {trustMetrics.map((m) => (
                <div key={m.label} className="text-center p-6 rounded-xl border border-border bg-card ai-border-glow">
                  <div className="text-3xl md:text-4xl font-bold mb-1 text-gradient">
                    {m.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <FadeUp className="max-w-3xl mx-auto mb-16">
              <div className="p-8 rounded-xl border border-border bg-card text-center ai-glow">
                <Quote className="w-8 h-8 mx-auto mb-4 text-primary/40" />
                <p className="text-lg text-muted-foreground italic leading-relaxed mb-6">
                  "Nirikshan AI transformed our quality inspection process — what used to take hours of manual review now happens in real-time with greater accuracy."
                </p>
                <div>
                  <p className="font-semibold">Operations Director</p>
                  <p className="text-sm text-muted-foreground">Enterprise Manufacturing Client</p>
                </div>
              </div>
            </FadeUp>

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
                    <div className="h-24 w-full bg-card border border-border rounded-xl flex items-center justify-center p-4 transition-all duration-300 hover:scale-105 ai-border-glow">
                      <img src={p.logo} alt={p.name} className="max-h-full max-w-full object-contain" loading="lazy" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. How We Work ── */}
        <section className="py-20 md:py-28 relative bg-secondary/20">
          <AIHexagonGrid className="opacity-15" />
          <div className="absolute right-10 bottom-10 opacity-20 hidden lg:block">
            <AI3DCube size={80} />
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <FadeUp className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Our Process</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How We <span className="text-gradient">Work</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">A proven methodology from problem definition to production deployment.</p>
            </FadeUp>

            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto" staggerDelay={0.12}>
              {processSteps.map((step) => (
                <StaggerItem key={step.step}>
                  <div className="relative p-6 rounded-xl border border-border bg-card group hover:-translate-y-2 transition-transform duration-300 ai-border-glow">
                    <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg gradient-primary">
                      {step.step}
                    </div>
                    <div className="mt-4 mb-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary/10">
                        <step.icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ── 7. CTA ── */}
        <section className="py-20 md:py-28 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center space-y-8 p-12 md:p-16 rounded-2xl border border-primary/20 relative overflow-hidden ai-glow">
              {/* Background glow */}
              <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                <div className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full blur-[100px] animate-pulse bg-primary/8" />
                <div className="absolute bottom-0 right-1/4 w-[250px] h-[250px] rounded-full blur-[100px] animate-pulse bg-accent/8" style={{ animationDelay: "1.5s" }} />
              </div>

              <div className="relative">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  Ready to Transform Your Business with{" "}
                  <span className="text-gradient">Intelligent AI?</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
                  Nirikshan AI brings intelligence to every corner of your business. Let's build your future together.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                  <Link to="/contact">
                    <Button
                      size="lg"
                      className="gradient-primary text-primary-foreground px-10 h-12 text-base font-semibold w-full sm:w-auto border-0"
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
