import { useEffect, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Globe2, Users, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { expertiseCategories } from "@/pages/expertise/expertiseData";

const pageHighlights = [
  {
    title: "Innovation at Scale",
    description: "150+ AI-led transformations engineered with measurable business impact",
    icon: Sparkles,
  },
  {
    title: "Global Delivery",
    description: "Serving customers across 12+ countries with 24/7 AI operations",
    icon: Globe2,
  },
  {
    title: "Dedicated Experts",
    description: "Full-stack team of AI architects, engineers, designers, and data scientists",
    icon: Users,
  },
  {
    title: "Enterprise Grade Security",
    description: "Robust governance, compliance, and responsible AI embedded in every engagement",
    icon: ShieldCheck,
  },
];

const ExpertisePage = () => {
  const heroRef = useScrollAnimation(0.1);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (heroRef.isVisible) {
      const playVideo = () => {
        const playPromise = video.play();
        if (playPromise) {
          playPromise.catch(() => {
            /* ignore autoplay restrictions */
          });
        }
      };
      playVideo();
    } else {
      video.pause();
    }
  }, [heroRef.isVisible]);

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-[420px] md:h-[520px] overflow-hidden" ref={heroRef.ref}>
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src="https://res.cloudinary.com/dch0uyw8e/video/upload/v1760817165/exptice_th6pn0.mp4" type="video/mp4" />
          </video>
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-500 via-violet-400 to-purple-500"
            style={{ opacity: 0.6 }}
          />
          <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
            <div className={`transition-all duration-1000 ${
              heroRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}>
              <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
                AI-First Delivery Partner
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                Engineering OpenCV, Generative, and Agentic AI Experiences
              </h1>
              <div className="h-1 w-24 bg-white rounded-full mb-6"></div>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl">
                Discover how our computer vision teams, generative experience architects, and autonomous agent engineers deliver AI-first products across Microsoft, SAP, cloud, and quality transformation portfolios.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                    Talk to an Expert
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Link to="/projects">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white bg-white text-violet-600 hover:bg-violet-100 hover:text-violet-700"
                  >
                    Explore AI Success Stories
                  </Button>
                </Link>
                <Link to="#ai-expertise">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="text-white hover:text-white hover:bg-white/20"
                  >
                    Learn About Our Core AI
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
  <section className="relative z-20 mt-12 md:mt-16 lg:mt-20 mb-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pageHighlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <Card
                    key={highlight.title}
                    className="p-6 bg-white/90 dark:bg-slate-900/70 border border-white/40 dark:border-slate-800/60 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    style={{ animationDelay: `${index * 75}ms` }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white mb-4">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{highlight.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {highlight.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Categories Grid */}
  <section className="py-20" id="ai-expertise">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Expertise Across the Digital Value Chain</h2>
              <p className="text-muted-foreground">
                From intelligent automation to experience engineering, our teams bring proven blueprints, accelerators, and frameworks that fast-track your transformation journey.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              {expertiseCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Link 
                    key={category.slug} 
                    to={`/expertise/${category.slug}`}
                    className="group"
                  >
                    <Card className="relative p-6 h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-start gap-4 mb-5">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                            <Icon className="text-white" size={24} />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold mb-2">
                              {category.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {category.description}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <p className="text-xs uppercase tracking-widest text-primary/80 font-semibold">Signature Services</p>
                          <div className="space-y-2">
                            {category.services.slice(0, 3).map((service) => (
                              <div key={service.slug} className="flex items-center text-sm text-muted-foreground">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                                {service.title}
                              </div>
                            ))}
                            {category.services.length > 3 && (
                              <div className="text-sm text-primary font-medium">+ {category.services.length - 3} more services</div>
                            )}
                          </div>
                        </div>
                        {category.highlights && (
                          <div className="mt-6 grid grid-cols-2 gap-3">
                            {category.highlights.slice(0, 2).map((highlight) => (
                              <div key={highlight.label} className="rounded-xl border border-border/60 bg-secondary/40 p-3">
                                <div className="text-lg font-semibold text-primary">{highlight.stat}</div>
                                <p className="text-xs text-muted-foreground leading-snug">{highlight.label}</p>
                              </div>
                            ))}
                          </div>
                        )}
                        <Button variant="ghost" className="w-full mt-6 justify-between text-primary">
                          Explore {category.title}
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
              <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
              <p className="text-lg text-muted-foreground mb-10">
                Let's discuss how our expertise can help you achieve your business goals
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="gradient-primary">
                    Get Started Today <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Link to="/case-studies">
                  <Button size="lg" variant="outline">View Case Studies</Button>
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

export default ExpertisePage;