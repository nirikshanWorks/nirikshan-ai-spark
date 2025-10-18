import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowUpRight, CheckCircle, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { getCategoryBySlug } from "@/pages/expertise/expertiseData";

const ExpertiseCategoryPage = () => {
  const { categorySlug } = useParams();
  const category = getCategoryBySlug(categorySlug || "");
  const heroRef = useScrollAnimation(0.1);

  const heroVideoPool = useMemo(
    () => [
      "https://res.cloudinary.com/dch0uyw8e/video/upload/v1760818146/Generative_AI_kcnnvm.mp4",
      "https://res.cloudinary.com/dch0uyw8e/video/upload/v1760818131/Machine_Learning_gaw6th.mp4",
      "https://res.cloudinary.com/dch0uyw8e/video/upload/v1760818138/AI_Consulting_agr0li.mp4",
      "https://res.cloudinary.com/dch0uyw8e/video/upload/v1760818127/NET_Development_dmu07t.mp4",
      "https://res.cloudinary.com/dch0uyw8e/video/upload/v1760818123/MS_Dynamics_qeap6i.mp4",
    ],
    [],
  );

  const heroVideoSrc = useMemo(() => {
    if (category?.slug !== "artificial-intelligence") {
      return undefined;
    }
    const hash = category.slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return heroVideoPool[hash % heroVideoPool.length];
  }, [category?.slug, heroVideoPool]);

  if (!category) {
    return <div>Category not found</div>;
  }

  const Icon = category.icon;

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-[420px] md:h-[520px] overflow-hidden" ref={heroRef.ref}>
          {heroVideoSrc ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              aria-hidden="true"
            >
              <source src={heroVideoSrc} type="video/mp4" />
            </video>
          ) : null}
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-500 via-violet-400 to-purple-500"
            style={heroVideoSrc ? { opacity: 0.6 } : undefined}
          />
          <div className="absolute -top-24 -left-16 w-64 h-64 bg-white/10 blur-3xl rounded-full" />
          <div className="absolute bottom-[-140px] right-[-40px] w-96 h-96 bg-purple-500/30 blur-3xl rounded-full" />
          <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
            <div className={`transition-all duration-1000 ${
              heroRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center">
                  <Icon className="text-white" size={32} />
                </div>
                <div>
                  <Badge className="bg-white/20 text-white border-white/30 mb-3 hover:bg-white/30">
                    {category.title}
                  </Badge>
                  <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                    {category.title}
                  </h1>
                </div>
              </div>
              <div className="h-1 w-24 bg-white rounded-full mb-6"></div>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl">
                {category.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="#services" className="inline-flex items-center text-white/90 hover:text-white transition-colors">
                  View services overview
                  <ArrowUpRight className="ml-2" size={18} />
                </Link>
                <Link to="/contact" className="inline-flex items-center text-white/90 hover:text-white transition-colors">
                  Engage our specialists
                  <ArrowUpRight className="ml-2" size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {category.highlights && (
          <section className="relative -mt-16 pb-8">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {category.highlights.map((highlight, index) => (
                  <Card
                    key={highlight.label}
                    className="p-6 bg-white/80 dark:bg-slate-900/70 backdrop-blur border border-white/40 dark:border-slate-800/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    style={{ animationDelay: `${index * 75}ms` }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white">
                        <Sparkles size={18} />
                      </div>
                      <span className="text-xs uppercase tracking-widest text-muted-foreground">
                        {highlight.label}
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">{highlight.stat}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{highlight.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Services Grid */}
        <section id="services" className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Service Suites Tailored for {category.title}</h2>
              <p className="text-muted-foreground">
                Choose from modular offerings that align to your transformation goals. Each service bundle is engineered with accelerators, templates, and best practices proven across industries.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {category.services.map((service) => (
                <Link 
                  key={service.slug} 
                  to={`/expertise/${category.slug}/${service.slug}`}
                  className="group"
                >
                  <Card className="relative p-6 h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-start gap-3 mb-5">
                        <Badge variant="outline" className="rounded-full border-primary/40 text-primary/80">
                          {category.title}
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-semibold mb-3 leading-tight">{service.title}</h3>
                      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="space-y-2">
                        {service.features.slice(0, 3).map((feature) => (
                          <div key={feature} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-auto pt-6">
                        <Button variant="ghost" className="w-full justify-between text-primary">
                          Dive deeper
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
              <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
              <p className="text-lg text-muted-foreground mb-10">
                Let's discuss how our {category.title.toLowerCase()} solutions can transform your business
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="gradient-primary">
                    Contact Us <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Link to="/case-studies">
                  <Button size="lg" variant="outline">View Related Case Studies</Button>
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

export default ExpertiseCategoryPage;