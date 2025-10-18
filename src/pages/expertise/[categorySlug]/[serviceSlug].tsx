import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Lightbulb,
  Target,
  TrendingUp,
  Workflow,
  Sparkles,
  Code2,
  Brain,
  Database,
  Cloud,
  Smartphone,
  Globe,
  Shield,
  Zap
} from "lucide-react";
import { getCategoryBySlug, getServiceBySlug } from "@/pages/expertise/expertiseData";

const getTechnologyIcon = (tech: string) => {
  const techLower = tech.toLowerCase();
  if (techLower.includes('tensorflow') || techLower.includes('pytorch') || techLower.includes('ml')) return Brain;
  if (techLower.includes('azure') || techLower.includes('cloud') || techLower.includes('aws')) return Cloud;
  if (techLower.includes('database') || techLower.includes('sql') || techLower.includes('hana')) return Database;
  if (techLower.includes('mobile') || techLower.includes('app')) return Smartphone;
  if (techLower.includes('api') || techLower.includes('rest') || techLower.includes('web')) return Globe;
  if (techLower.includes('security') || techLower.includes('auth')) return Shield;
  if (techLower.includes('automation') || techLower.includes('devops')) return Zap;
  return Code2;
};

const ExpertiseServicePage = () => {
  const { categorySlug, serviceSlug } = useParams();
  const category = getCategoryBySlug(categorySlug || "");
  const service = categorySlug && serviceSlug ? getServiceBySlug(categorySlug, serviceSlug) : null;

  if (!category || !service) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-16">
          <div className="container mx-auto px-6 py-20">
            <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The requested service could not be found. Please check the URL and try again.
            </p>
            <Link
              to="/expertise"
              className="inline-flex items-center text-primary hover:underline"
            >
              <ArrowLeft className="mr-2" size={16} />
              Return to Expertise
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent" />
          <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
            <div className="fade-in-up">
              <Link
                to={`/expertise/${category.slug}`}
                className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="mr-2" size={20} />
                Back to {category.title}
              </Link>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{service.title}</h1>
              <div className="h-1 w-24 bg-white rounded-full mb-6"></div>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl">
                {service.description}
              </p>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12 fade-in-up">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="text-primary" size={32} />
                <h2 className="text-3xl md:text-4xl font-bold">Key Features</h2>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive capabilities designed to deliver exceptional results
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.features.map((feature, index) => (
                <Card
                  key={feature}
                  className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" size={20} />
                    <span className="text-foreground">{feature}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12 fade-in-up">
              <div className="flex items-center justify-center gap-2 mb-4">
                <TrendingUp className="text-accent" size={32} />
                <h2 className="text-3xl md:text-4xl font-bold">Benefits You Get</h2>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Real value delivered through our {service.title} solutions
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {service.benefits.map((benefit, index) => (
                <Card
                  key={benefit}
                  className="p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-card relative overflow-hidden group fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <CheckCircle className="text-white" size={24} />
                    </div>
                    <p className="font-medium">{benefit}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        {service.methodology && (
          <section className="py-20 bg-background">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12 fade-in-up">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Workflow className="text-primary" size={32} />
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Our Methodology for Delivering {service.title} Solutions
                  </h2>
                </div>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Proven process by Nirikshan AI to ensure successful implementation
                </p>
              </div>
              <div className="max-w-5xl mx-auto">
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary hidden md:block" />

                  <div className="space-y-8">
                    {service.methodology.map((step, index) => (
                      <div
                        key={step.phase}
                        className="relative fade-in-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <Card className="p-6 md:ml-20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                          <div className="absolute -left-12 top-6 hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg group-hover:scale-110 transition-transform">
                            <span className="text-white font-bold text-xl">{index + 1}</span>
                          </div>
                          <div className="md:hidden flex items-center gap-3 mb-3">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent">
                              <span className="text-white font-bold">{index + 1}</span>
                            </div>
                            <h3 className="text-xl font-bold">{step.phase}</h3>
                          </div>
                          <h3 className="text-xl font-bold mb-3 hidden md:block">{step.phase}</h3>
                          <p className="text-muted-foreground">{step.description}</p>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Technologies Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12 fade-in-up">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Code2 className="text-primary" size={32} />
                <h2 className="text-3xl md:text-4xl font-bold">Technologies We Use</h2>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Cutting-edge tools and platforms for optimal results
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {service.technologies.map((tech, index) => {
                const Icon = getTechnologyIcon(tech);
                return (
                  <Card
                    key={tech}
                    className="p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group relative overflow-hidden fade-in-up"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                      <Icon className="w-10 h-10 mx-auto mb-3 text-primary group-hover:text-accent transition-colors group-hover:scale-110 transform duration-300" />
                      <span className="font-medium text-sm">{tech}</span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-accent">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center fade-in-up">
              <Lightbulb className="w-16 h-16 text-white mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Let's discuss how our {service.title} solutions can help you achieve your goals and drive innovation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 group">
                    Get Started Today
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </Button>
                </Link>
                <Link to="/case-studies">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    View Success Stories
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

export default ExpertiseServicePage;
