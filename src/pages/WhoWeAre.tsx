import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ArrowUp,
  Sparkles,
  Focus,
  Rocket,
  Users2,
  GraduationCap,
  ShieldCheck,
  Globe2,
  Quote,
  Milestone
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import wwaTeamVideo from "@/assets/wwa-team.mp4";
import dineshImage from "@/assets/team/dinesh-yadav.jpg";
import anshulImage from "@/assets/team/anshul.jpg";
import ashwinImage from "@/assets/team/ashwin-hole.jpg";

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
    name: "Dinesh Yadav",
    role: "Founder & CEO",
    bio: "Dinesh architects the strategic vision of Nirikshan AI, guiding research teams to convert ambitious ideas into deployable intelligence platforms.",
    image: dineshImage
  },
  {
    name: "Anshul",
    role: "Co-Founder & COO",
    bio: "Anshul leads operations and partnerships, ensuring our research pipelines align with industry impact and measurable outcomes.",
    image: anshulImage
  },
  {
    name: "Ashwin Hole",
    role: "Co-Founder & Head of Programs",
    bio: "Ashwin orchestrates delivery excellence, growing high-performing teams that push the boundaries of applied AI.",
    image: ashwinImage
  }
];

const WhoWeAre = () => {
  const storyRef = useScrollAnimation(0.15);
  const missionRef = useScrollAnimation(0.15);
  const valuesRef = useScrollAnimation(0.15);
  const leadershipRef = useScrollAnimation(0.2);
  const cardsRef = useScrollAnimation(0.2);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background scroll-smooth">
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
                  <Button size="lg" variant="outline" className="border-white/60 text-white hover:bg-white/10">
                    Explore Our Journey
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          id="our-story"
          className="py-20 bg-gradient-to-b from-background via-secondary/20 to-background"
          ref={storyRef.ref}
        >
          <div
            className={`container mx-auto px-6 grid gap-12 md:grid-cols-[1.2fr,0.8fr] items-center transition-all duration-1000 ${
              storyRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
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
          <div
            className={`container mx-auto px-6 grid gap-10 md:grid-cols-2 items-center transition-all duration-1000 ${
              missionRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
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
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Values that shape our culture</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These principles keep our teams aligned, our research ethical, and our collaborations purposeful.
              </p>
            </div>
            <div
              className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 transition-all duration-1000 ${
                valuesRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {values.map((value) => (
                <div
                  key={value.title}
                  className="group p-6 rounded-3xl border border-border bg-background/80 backdrop-blur hover:border-indigo-400/60 hover:-translate-y-1 transition-all duration-300"
                >
                  <value.icon className="text-indigo-500 mb-4" size={28} />
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20" ref={leadershipRef.ref}>
          <div className="container mx-auto px-6">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Leadership that inspires</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Meet the founders and leaders steering Nirikshan AI towards a future of responsible technological advancement.
              </p>
            </div>
            <div
              className={`grid gap-8 md:grid-cols-2 lg:grid-cols-4 transition-all duration-1000 ${
                leadershipRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {leadership.map((member) => (
                <div
                  key={member.name}
                  className="group relative overflow-hidden rounded-3xl border border-border bg-background shadow-sm hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/0 to-transparent" aria-hidden="true" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-semibold">{member.name}</h3>
                      <p className="text-sm text-white/80">{member.role}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary/30" ref={cardsRef.ref}>
          <div className="container mx-auto px-6">
            <div className={`text-center mb-14 transition-all duration-1000 ${
              cardsRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Our Impact</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Dive deeper into the stories, milestones, and opportunities that define Nirikshan AI.
              </p>
            </div>
            <div
              className={`grid gap-6 md:grid-cols-3 transition-all duration-1000 ${
                cardsRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
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

        <section className="py-20">
          <div className="container mx-auto px-6 grid gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Message from Our CEO</h2>
              <img
                src={dineshImage}
                alt="Dinesh Yadav"
                className="w-48 h-48 rounded-full object-cover shadow-xl border-4 border-indigo-100"
              />
              <p className="text-muted-foreground leading-relaxed">
                “We founded Nirikshan AI with the belief that innovation thrives when curiosity meets accountability. Our lab is
                a playground for new ideas, but every experiment is tied to the real-world impact it can create for communities and industries.”
              </p>
              <p className="text-muted-foreground leading-relaxed">
                “As we scale, we hold onto our startup ethos: move fast, learn continuously, and build with empathy. Every solution we
                ship is a testament to collaboration between visionary researchers and courageous partners.”
              </p>
              <p className="text-muted-foreground leading-relaxed">
                “The future demands intelligent systems that are ethical, explainable, and designed for people. At Nirikshan AI, we are
                committed to leading that future.”
              </p>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Message from Our COO</h2>
              <img
                src={anshulImage}
                alt="Anshul"
                className="w-48 h-48 rounded-full object-cover shadow-xl border-4 border-indigo-100"
              />
              <p className="text-muted-foreground leading-relaxed">
                “Operational excellence is more than executing playbooks — it is about designing environments where teams are empowered
                to experiment, iterate, and deliver.”
              </p>
              <p className="text-muted-foreground leading-relaxed">
                “We invest deeply in research collaborations, mentorship, and tooling that help our people grow. When our teams thrive,
                the innovations they produce resonate far beyond our studio.”
              </p>
              <p className="text-muted-foreground leading-relaxed">
                “I am proud of the ecosystem we continue to build — one where every project is handled with precision, and every partner
                sees us as an extension of their own mission.”
              </p>
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
