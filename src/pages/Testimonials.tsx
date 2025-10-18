import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Quote, ArrowRight, Sparkles, Lightbulb, Bot, Rocket, HeartHandshake, CircuitBoard, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { testimonials } from "./whoWeAreContent";

const accentStyles = [
  {
    Icon: Sparkles,
    gradient: "from-indigo-500/20 via-purple-500/10 to-blue-500/20",
    accent: "text-indigo-500"
  },
  {
    Icon: Lightbulb,
    gradient: "from-amber-500/20 via-orange-400/10 to-pink-500/20",
    accent: "text-amber-500"
  },
  {
    Icon: Bot,
    gradient: "from-emerald-500/20 via-teal-400/10 to-cyan-500/20",
    accent: "text-emerald-500"
  },
  {
    Icon: Rocket,
    gradient: "from-purple-500/20 via-violet-500/10 to-indigo-500/20",
    accent: "text-purple-500"
  },
  {
    Icon: HeartHandshake,
    gradient: "from-rose-500/20 via-red-400/10 to-orange-500/20",
    accent: "text-rose-500"
  },
  {
    Icon: CircuitBoard,
    gradient: "from-blue-500/20 via-cyan-400/10 to-sky-500/20",
    accent: "text-blue-500"
  }
];

const Testimonials = () => (
  <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
    <video
      className="pointer-events-none absolute left-1/2 top-1/2 min-h-full min-w-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
      autoPlay
      muted
      loop
      playsInline
      src="https://res.cloudinary.com/dch0uyw8e/video/upload/v1760812022/Testimonials_zthao0.mp4"
    />
    <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-background/95 via-background/80 to-background/95 backdrop-blur-sm" aria-hidden="true" />
    <div className="relative z-50 pointer-events-auto">
      <Navigation />
    </div>
    <main className="relative z-20 pt-16 pb-20">
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-indigo-500 block mb-4">
            Authentic Voices
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Real Stories. Real Impact.</h1>
          <p className="text-lg text-muted-foreground">
            Discover meaningful experiences that reflect our commitment to innovation, partnership, and excellence across the technology landscape.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial, index) => {
            const accent = accentStyles[index % accentStyles.length];
            const AccentIcon = accent.Icon;

            return (
              <article
                key={testimonial.name}
                className="group relative rounded-3xl p-[1px] bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 transition-all duration-500 hover:shadow-2xl hover:scale-[1.01]"
              >
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${accent.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} aria-hidden="true" />
                <div className="relative h-full rounded-[calc(1.5rem-2px)] bg-background/95 backdrop-blur py-8 px-8 border border-violet-400/40 group-hover:border-violet-400/70 transition-all duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <AccentIcon size={26} className={`${accent.accent}`} />
                    <Quote className="w-10 h-10 text-muted-foreground/20 group-hover:text-muted-foreground/40 transition-colors" />
                  </div>
                  <div className="mb-5 flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={starIndex} size={16} className="fill-current" fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-7 text-sm leading-relaxed">
                    “{testimonial.quote}”
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-border/70 group-hover:ring-transparent group-hover:shadow-[0_0_0_4px_rgba(99,102,241,0.15)] transition-all"
                    />
                    <div className="text-left">
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/case-studies">
            <Button variant="outline" className="gap-2">
              Explore Case Studies
              <ArrowRight size={18} />
            </Button>
          </Link>
          <Link to="/contact">
            <Button className="gap-2 gradient-primary">
              Partner With Us
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>
    </main>
    <div className="relative z-10">
      <Footer />
    </div>
  </div>
);

export default Testimonials;
