import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import {
  ArrowRight,
  Award,
  BarChart3,
  Briefcase,
  Eye,
  Flag,
  Globe2,
  Layers,
  ShieldCheck,
  Smile,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AnimatedCounter = ({ end, duration = 2000 }: { end: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollAnimation(0.5);

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isVisible, end, duration]);

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>}>
      {count}
    </span>
  );
};

const About = () => {
  const missionRef = useScrollAnimation(0.2);
  const valuesRef = useScrollAnimation(0.2);
  const differentiatorsRef = useScrollAnimation(0.2);
  const statsRef = useScrollAnimation(0.3);
  const timelineRef = useScrollAnimation(0.2);
  const [revealedMilestones, setRevealedMilestones] = useState(0);

  const differentiators = [
    {
      icon: Globe2,
      title: "Global Mindset, Local Delivery",
      description:
        "Hybrid squads blend global expertise with local cultural fluency so programs land smoothly in every market we serve.",
    },
    {
      icon: ShieldCheck,
      title: "Secure by Design",
      description:
        "Security architects embed governance, compliance, and data privacy accelerators into every solution from day zero.",
    },
    {
      icon: Layers,
      title: "Full-Stack Innovation",
      description:
        "From strategy to design, engineering, and AI operations, cross-functional pods accelerate outcomes end to end.",
    },
    {
      icon: BarChart3,
      title: "Proof in Performance",
      description:
        "Transparent KPIs, ROI scorecards, and executive dashboards keep momentum measurable and decisions data-backed.",
    },
  ];

  const milestones = [
    {
      year: "2024",
      title: "The Beginning",
      description:
        "Our journey started with the Sochilhive community—organizing hackathons and teaching events that sparked creativity, collaboration, and innovation among aspiring developers.",
    },
    {
      year: "Late 2024",
      title: "Birth of Nirikshan AI",
      description:
        "As our vision expanded beyond events, we rebranded to Nirikshan AI and began crafting AI-powered solutions that put purposeful technology into people’s hands.",
    },
    {
      year: "2025",
      title: "Incorporation",
      description:
        "Nirikshan AI Private Limited was officially established, marking our evolution from a student-led initiative into a registered technology company with global ambitions.",
    },
    {
      year: "2025 Onwards",
      title: "Expanding Horizons",
      description:
        "We started partnering with national and international clients, delivering impactful AI solutions that bridge research, innovation, and real-world applications.",
    },
  ];

  useEffect(() => {
    if (!timelineRef.isVisible) {
      return;
    }

    if (revealedMilestones >= milestones.length) {
      return;
    }

    const timer = setTimeout(() => {
      setRevealedMilestones((prev) => Math.min(prev + 1, milestones.length));
    }, 600);

    return () => clearTimeout(timer);
  }, [timelineRef.isVisible, revealedMilestones, milestones.length]);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero with 3D depth */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden group perspective-container">
          <video 
            src="https://res.cloudinary.com/dch0uyw8e/video/upload/v1760826173/6_wrsepd.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
          {/* Gradient overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-900/30" />
          
          {/* Floating decorative elements */}
          <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 blur-3xl floating opacity-60" />
          <div className="absolute bottom-20 left-1/3 w-24 h-24 rounded-full bg-gradient-to-br from-accent/20 to-primary/30 blur-2xl floating-delayed opacity-50" />
          
          <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-6">
                <Sparkles size={16} className="text-accent" />
                <span>AI-First Innovation Company</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                About <span className="text-gradient">Nirikshan AI</span>
              </h1>
              <p className="text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed">
                We specialize in OpenCV, Generative AI, and Agentic AI — crafting intelligent systems that combine vision, reasoning, and autonomy for enterprises worldwide.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full" />
                <span className="text-white/60 text-sm">Transforming ideas into intelligence</span>
              </div>
            </div>
          </div>
        </section>

    {/* SEO meta update for About */}
    <script dangerouslySetInnerHTML={{__html: `document.title = "About — Nirikshan AI | OpenCV, Generative & Agentic AI"; const md=document.querySelector('meta[name=\"description\"]'); if(md){md.setAttribute('content','At Nirikshan AI we specialize in OpenCV, Generative AI, and Agentic AI — crafting intelligent systems that combine vision, reasoning, and autonomy.');}`}} />

        {/* Mission & Vision */}
        <section className="py-20 container mx-auto px-6" ref={missionRef.ref}>
          <div className={`grid md:grid-cols-2 gap-12 transition-all duration-1000 ${
            missionRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <div className="space-y-6 group hover:translate-x-2 transition-transform duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow">
                  <Target className="text-white" size={28} />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-3">
                    We're here to bring the power of AI to everyone, not just the big players. Think of us as your local AI partner – making smart technology simple, affordable, and actually useful for businesses like yours.
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-3">
                    Whether you're running a startup, a small business, or have a great idea you want to bring to life, we're here to help turn complex AI into practical solutions that make a real difference in our community.
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    Our commitment: No corporate jargon, no unnecessary complexity – just real solutions for real people, backed by cutting-edge technology and genuine partnership.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6 group hover:translate-x-2 transition-transform duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow">
                  <Eye className="text-white" size={28} />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Our Vision</h2>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-3">
                    To be the global leader in AI-powered business transformation, recognized for our ability to turn visionary ideas into tangible, measurable outcomes.
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-3">
                    We envision a future where every enterprise – from startups to established organizations – can harness the full potential of artificial intelligence without barriers of complexity or cost.
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    A world where AI is not a luxury but a practical tool that drives innovation, improves decision-making, and creates lasting competitive advantages for our partners.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-gradient-to-br from-secondary/50 to-secondary/30" ref={valuesRef.ref}>
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
              <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-4"></div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These principles guide everything we do and every decision we make
              </p>
            </div>
            <div className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 ${
              valuesRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}>
              {[
                {
                  icon: Users,
                  title: "Client-Centric",
                  desc: "Your success is our success. We prioritize understanding your unique challenges, business goals, and industry dynamics. Every solution is tailored to deliver measurable value and exceed expectations."
                },
                {
                  icon: Award,
                  title: "Excellence",
                  desc: "We maintain the highest standards in everything we do—from code quality to customer service to project delivery. Excellence isn't a destination; it's our continuous commitment to improvement and innovation."
                },
                {
                  icon: Zap,
                  title: "Innovation",
                  desc: "We stay at the forefront of technology trends and AI advancements. By continuously exploring new methodologies and tools, we create forward-thinking solutions that keep our partners ahead of the competition."
                }
              ].map((value, idx) => (
                <div
                  key={idx}
                  className="group relative p-8 bg-white dark:bg-slate-800/50 rounded-2xl border border-transparent hover:border-primary/30 transition-all duration-500 tilt-card glass-card"
                >
                  {/* 3D glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 icon-3d">
                      <value.icon className="text-white" size={32} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-center text-gradient">{value.title}</h3>
                    <p className="text-muted-foreground text-center leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                  
                  {/* Animated bottom border */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-primary to-accent rounded-full group-hover:w-16 transition-all duration-500" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Differentiators */}
        <section className="py-20 container mx-auto px-6" ref={differentiatorsRef.ref}>
          <div className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-1000 ${
            differentiatorsRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary mb-4">
              <Sparkles className="h-4 w-4" /> Why Partners Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience the Nirikshan Advantage</h2>
            <p className="text-muted-foreground">
              Every engagement blends strategic foresight, design thinking, and engineering excellence so transformation is fast, predictable, and inspiring.
            </p>
          </div>
          <div className={`grid md:grid-cols-2 gap-8 transition-all duration-1000 ${
            differentiatorsRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            {differentiators.map((point, idx) => (
              <div
                key={point.title}
                className="group relative overflow-hidden rounded-3xl border border-primary/10 bg-white/80 dark:bg-slate-900/60 shadow-lg backdrop-blur transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 p-8">
                  <point.icon className="h-10 w-10 text-primary" />
                  <h3 className="mt-6 text-xl font-semibold">{point.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{point.description}</p>
                  <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-widest text-primary/70">
                    <span>Capability {idx + 1}</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-secondary/30" ref={statsRef.ref}>
          <div className="container mx-auto px-6">
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 text-center transition-all duration-1000 ${
              statsRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}>
              {[
                { icon: Briefcase, value: 50, label: "Projects Completed" },
                { icon: Smile, value: 30, label: "Happy Clients" },
                { icon: TrendingUp, value: 95, label: "Success Rate", suffix: "%" },
                { icon: Flag, value: 5, label: "Countries Served" },
              ].map((stat, idx) => (
                <div key={idx} className="group">
                  <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    <AnimatedCounter end={stat.value} />{stat.suffix}
                  </h3>
                  <p className="text-muted-foreground mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/20 to-transparent" ref={timelineRef.ref}>
          <div className="container mx-auto px-6">
            <div className={`text-center mb-16 transition-all duration-1000 ${
              timelineRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Milestones on Our Journey</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A snapshot of how we evolved from a boutique AI studio to a transformation partner powering global enterprises.
              </p>
            </div>
            <div className={`relative transition-all duration-1000 ${
              timelineRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}>
              <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary hidden md:block" />
              <div className="space-y-10 md:space-y-12">
                {milestones.map((milestone, idx) => {
                  if (idx >= revealedMilestones) {
                    return null;
                  }

                  const isActive = idx === revealedMilestones - 1;

                  return (
                    <div
                      key={milestone.year}
                      className={`relative pl-12 md:pl-24 transition-all duration-700 ease-out ${
                        isActive ? "scale-[1.02]" : "scale-100"
                      }`}
                    >
                      <div
                        className={`hidden md:flex absolute left-0 top-4 h-12 w-12 items-center justify-center rounded-full text-white font-semibold shadow-lg transition-all duration-500 ${
                          isActive
                            ? "bg-gradient-to-br from-primary to-accent"
                            : "bg-primary/60"
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <div
                        className={`hidden md:block absolute left-5 top-8 h-3 w-3 rounded-full shadow-lg transition-colors duration-500 ${
                          isActive ? "bg-accent" : "bg-primary"
                        }`}
                      />
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary mb-4">
                        {milestone.year}
                      </span>
                      <div
                        className={`rounded-3xl border bg-white/80 dark:bg-slate-900/60 p-6 shadow-sm backdrop-blur transition-all duration-500 ${
                          isActive
                            ? "border-primary/40 shadow-lg shadow-primary/10"
                            : "border-primary/10"
                        }`}
                      >
                        <h3 className="text-xl font-semibold text-primary mb-2">{milestone.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{milestone.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>
          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Us on This Journey</h2>
              <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
              <p className="text-lg text-muted-foreground mb-10">
                Whether you're looking for a technology partner or want to be part of our team, 
                we'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="gradient-primary hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105">
                    Get in Touch
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Link to="/careers">
                  <Button size="lg" variant="outline" className="hover:bg-secondary transition-all duration-300 transform hover:scale-105">
                    View Open Positions
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
