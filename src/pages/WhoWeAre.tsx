import anshulImage from "@/assets/team/anshul.png";
import rajeshImage from "@/assets/team/rajesh-dabral.jpg";
import vikramImage from "@/assets/team/vikram-biyani.jpg";
import wwaTeamVideo from "@/assets/wwa-team.mp4";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ScrollAnimations";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import {
  ArrowRight,
  ArrowUp,
  Focus,
  Globe2,
  GraduationCap,
  Linkedin,
  Milestone,
  Quote,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users2
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const values = [
  {
    title: "Integrity & Transparency",
    description: "We communicate clearly, act ethically, and honour every commitment.",
    icon: ShieldCheck
  },
  {
    title: "Innovation through Collaboration",
    description: "Cross-disciplinary teams co-create breakthrough AI experiences.",
    icon: Users2
  },
  {
    title: "Continuous Learning",
    description: "We stay curious, experiment boldly, and translate research into practice.",
    icon: GraduationCap
  },
  {
    title: "Data Ethics & Responsibility",
    description: "Every model we build respects privacy, fairness, and accountability.",
    icon: Sparkles
  },
  {
    title: "Impact-Driven Research",
    description: "We measure success by the real outcomes delivered to people and planet.",
    icon: Globe2
  }
];

const leadership = [
  {
    name: "Anshul",
    role: "Founder & CEO",
    bio: "Anshul spearheads technical strategy and system design, translating complex requirements into scalable, production-ready platforms.",
    extendedBio: "Anshul leads the core vision of Nirikshan AI, blending hands-on deep tech expertise with business acumen. With a passion for building AI systems that work in the real world, he guides the engineering teams in deploying robust LLM pipelines, RAG systems, and real-time computer vision models. Under his leadership, Nirikshan AI has grown from a student research project into a trusted technology partner for global clients.",
    message: "Operational excellence is more than executing playbooks — it is about designing environments where teams are empowered to experiment, iterate, and deliver. We invest deeply in research collaborations, mentorship, and tooling that help our people grow. When our teams thrive, the innovations they produce resonate far beyond our studio. I am proud of the ecosystem we continue to build — one where every project is handled with precision, and every partner sees us as an extension of their own mission.",
    image: anshulImage,
    linkedin: "https://www.linkedin.com/in/anshultech1"
  },
  {
    name: "Rajesh Dabral",
    role: "Director – Administration",
    bio: "Rajesh oversees administrative operations, ensuring seamless coordination across teams and efficient resource management to support our growth.",
    extendedBio: "Rajesh Dabral brings years of administrative excellence to Nirikshan AI, managing operational policies, team cohesion, and resource allocation. He facilitates a collaborative environment that bridges research ambitions with operational efficiency. His focus is on establishing a resilient corporate framework that supports rapid scaling while maintaining the company's core values of integrity and transparency.",
    message: "A company's strength lies in its foundation and its people. My goal is to cultivate an environment of absolute transparency, clear communication, and seamless coordination. By establishing robust administrative operations, we ensure that our engineering and research teams have the support they need to focus entirely on building breakthrough solutions. Building a company is a collaborative journey, and we are committed to doing it with integrity.",
    image: rajeshImage,
    linkedin: ""
  },
  {
    name: "CA Vikram Biyani",
    role: "Director – Finance",
    bio: "CA Vikram Biyani steers financial strategy and planning, enabling sustainable growth through disciplined fiscal management and strategic investments.",
    extendedBio: "CA Vikram Biyani is a seasoned financial strategist who directs Nirikshan AI's fiscal policies, capital efficiency, and strategic partnerships. Combining mathematical precision with financial foresight, he ensures that the company's research-driven initiatives are backed by solid economic foundations. He advises on risk management, investment strategies, and maximizing ROI for both the company and its enterprise partners.",
    message: "Sustainable growth requires a perfect balance of disciplined fiscal policy and bold investments in innovation. At Nirikshan AI, we approach finance not just as keeping books, but as a strategic tool to generate long-term value for our clients, team, and shareholders. By ensuring financial health and capital efficiency, we build a stable, trust-driven company that our partners can rely on for years to come.",
    image: vikramImage,
    linkedin: "https://www.linkedin.com/in/viekram-biyaani-44810817b"
  }
];

const WhoWeAre = () => {
  const storyRef = useScrollAnimation(0.15);
  const missionRef = useScrollAnimation(0.15);
  const valuesRef = useScrollAnimation(0.15);
  const leadershipRef = useScrollAnimation(0.2);
  const cardsRef = useScrollAnimation(0.2);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeLeaderIndex, setActiveLeaderIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <SEO
        title="Who We Are — Meet the Nirikshan AI Team"
        description="Meet the leadership team and culture behind Nirikshan AI. Discover our story, mission, and the people driving AI innovation."
        canonical="https://nirikshanai.com/who-we-are"
      />
      <Navigation />

      <main className="pt-16">
        <section
          id="who-we-are"
          className="relative h-[420px] md:h-[520px] overflow-hidden flex items-center"
        >
          <video
            src={wwaTeamVideo}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/40 to-indigo-900/70" aria-hidden="true" />
          <div className="relative z-10 container mx-auto px-6">
            <div className="max-w-3xl space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs md:text-sm uppercase tracking-[0.2em]">
                <Sparkles size={16} /> Next-Gen AI Research Studio
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                We are Nirikshan AI — the innovation-driven research startup shaping intelligent futures.
              </h1>
              <p className="text-lg md:text-xl text-white/85">
                We turn ideas into intelligent solutions that redefine industries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button size="lg" className="gradient-primary shadow-lg shadow-indigo-500/30">
                    Partner With Us
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Link to="#our-story">
                  <Button size="lg" variant="outline" className="border-white/60 text-black hover:bg-white/10">
                    Explore Our Journey
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          id="our-story"
          className="py-20 bg-gradient-to-b from-background via-secondary/20 to-background relative"
          ref={storyRef.ref}
        >
          <div className="container mx-auto px-6 grid gap-12 md:grid-cols-[1.2fr,0.8fr] items-center relative z-10">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500">
                Born from curiosity, built for impact
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nirikshan AI was conceived at Dev Bhoomi through the IEC Club, where passionate students experimented with
                neural networks, computer vision, and automation. What began as late-night prototyping quickly evolved into
                a research collective committed to turning experimental breakthroughs into usable, responsible AI products.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, we bridge innovation and implementation by bringing researchers, designers, and engineers together
                under one roof. Our mission is simple: take the spark of an idea and transform it into an intelligent system
                that can scale in the real world.
              </p>
              <div>
                <Link to="/case-studies">
                  <Button variant="secondary" className="group">
                    Read More
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-blue-500/30 blur-3xl rounded-full" aria-hidden="true" />
              <div className="relative p-[1px] rounded-3xl bg-gradient-to-br from-indigo-400 via-purple-400 to-blue-400">
                <div className="rounded-3xl bg-background/95 p-8 space-y-4">
                  <div className="flex items-center gap-3 text-indigo-500">
                    <Milestone size={24} />
                    <span className="font-semibold uppercase tracking-widest text-xs">Edge of Innovation</span>
                  </div>
                  <p className="text-muted-foreground">
                    Every initiative at Nirikshan AI is powered by research-backed experimentation, rapid prototyping, and
                    relentless iteration. We blend academic rigor with product instinct to deliver measurable outcomes for our partners.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="py-16"
          ref={missionRef.ref}
        >
          <div className="container mx-auto px-6 grid gap-10 md:grid-cols-2 items-center">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-600/10 via-purple-500/10 to-blue-500/10 border border-border">
              <div className="flex items-center gap-4 mb-6">
                <Focus className="text-indigo-500" size={32} />
                <span className="text-xl font-semibold">Mission</span>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To empower innovation through AI-driven research and real-world implementation.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600/10 via-indigo-500/10 to-purple-500/10 border border-border">
              <div className="flex items-center gap-4 mb-6">
                <Rocket className="text-purple-500" size={32} />
                <span className="text-xl font-semibold">Vision</span>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To build a future where every idea, researcher, and organization can harness the power of Artificial Intelligence
                for meaningful impact.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary/20" ref={valuesRef.ref}>
          <div className="container mx-auto px-6">
            <FadeUp className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Values that shape our culture</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These principles keep our teams aligned, our research ethical, and our collaborations purposeful.
              </p>
            </FadeUp>
            <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.12}>
              {values.map((value) => (
                <StaggerItem key={value.title}>
                <div
                  className="group p-6 rounded-3xl border border-border bg-card backdrop-blur hover:border-primary/60 hover:-translate-y-1 transition-all duration-300 ai-glow-hover"
                >
                  <value.icon className="text-indigo-500 mb-4" size={28} />
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <section className="py-20" ref={leadershipRef.ref}>
          <div className="container mx-auto px-6">
            <FadeUp className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Leadership that inspires</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Meet the founders and leaders steering Nirikshan AI towards a future of responsible technological advancement.
              </p>
            </FadeUp>

            {/* Interactive Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12 max-w-4xl mx-auto">
              {leadership.map((member, idx) => {
                const isActive = activeLeaderIndex === idx;
                return (
                  <button
                    key={member.name}
                    onClick={() => setActiveLeaderIndex(idx)}
                    className={`flex items-center gap-3 px-6 py-3 rounded-2xl border text-left transition-all duration-300 group cursor-pointer ${
                      isActive
                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-[1.02]"
                        : "bg-card border-border hover:bg-secondary hover:border-primary/30"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-border flex-shrink-0">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold truncate">{member.name}</div>
                      <div className={`text-[10px] font-mono uppercase tracking-wider mt-0.5 ${isActive ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{member.role}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Leader Spotlight Panel */}
            <div className="max-w-5xl mx-auto relative min-h-[400px]">
              <motion.div
                key={activeLeaderIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid gap-10 lg:grid-cols-[0.8fr,1.2fr] items-center bg-card border border-border p-8 md:p-12 rounded-3xl ai-border-glow shadow-xl"
              >
                {/* Image side */}
                <div className="relative flex justify-center order-last lg:order-first">
                  <div className="relative w-full max-w-xs md:max-w-sm rounded-2xl overflow-hidden shadow-2xl border border-primary/20 aspect-[4/5]">
                    <img
                      src={leadership[activeLeaderIndex].image}
                      alt={leadership[activeLeaderIndex].name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                  <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 blur-3xl" aria-hidden="true" />
                </div>

                {/* Content side */}
                <div className="space-y-6 order-first lg:order-last">
                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold text-gradient">{leadership[activeLeaderIndex].name}</h3>
                    <p className="text-indigo-500 font-medium tracking-wide text-sm md:text-base font-mono uppercase">{leadership[activeLeaderIndex].role}</p>
                  </div>

                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      {leadership[activeLeaderIndex].extendedBio}
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-secondary/50 border border-border/80 relative">
                    <Quote className="absolute top-4 right-4 w-10 h-10 text-primary/10 pointer-events-none" />
                    <p className="text-muted-foreground italic leading-relaxed text-xs md:text-sm font-medium">
                      “{leadership[activeLeaderIndex].message}”
                    </p>
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                    {leadership[activeLeaderIndex].linkedin && (
                      <a
                        href={leadership[activeLeaderIndex].linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 font-semibold"
                      >
                        <Linkedin size={18} /> Connect on LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary/30" ref={cardsRef.ref}>
          <div className="container mx-auto px-6">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Our Impact</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Dive deeper into the stories, milestones, and opportunities that define Nirikshan AI.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <Link
                to="/testimonials"
                className="group p-8 rounded-3xl border border-border bg-background/80 backdrop-blur hover:-translate-y-2 hover:border-indigo-500/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-6">
                  <Quote size={22} />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Authentic Voices</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Hear from partners, mentors, and innovators whose experiences reflect our commitment to excellence.
                </p>
                <Button variant="ghost" className="group-hover:text-indigo-500 p-0">
                  View Testimonials
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Button>
              </Link>
              <Link
                to="/journey"
                className="group p-8 rounded-3xl border border-border bg-background/80 backdrop-blur hover:-translate-y-2 hover:border-indigo-500/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center mb-6">
                  <Milestone size={22} />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Innovation Journey</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Explore the milestones that shaped us — from Dev Bhoomi origins to global research collaborations.
                </p>
                <Button variant="ghost" className="group-hover:text-purple-500 p-0">
                  View Timeline
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Button>
              </Link>
              <Link
                to="/careers"
                className="group p-8 rounded-3xl border border-border bg-background/80 backdrop-blur hover:-translate-y-2 hover:border-indigo-500/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6">
                  <Users2 size={22} />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Join Our Team</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Discover roles, culture, and growth pathways for builders who want to shape intelligent futures with us.
                </p>
                <Button variant="ghost" className="group-hover:text-blue-500 p-0">
                  Explore Careers
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </section>


      </main>

      <Footer />

      {showBackToTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-1"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default WhoWeAre;
