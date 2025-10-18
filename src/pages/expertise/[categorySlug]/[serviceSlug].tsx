import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, CheckCircle, Cpu, Lightbulb, Target } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { getCategoryBySlug, getServiceBySlug } from "@/pages/expertise/expertiseData";

const ExpertiseServicePage = () => {
  const { categorySlug, serviceSlug } = useParams();
  const category = getCategoryBySlug(categorySlug || "");
  const service = categorySlug && serviceSlug ? getServiceBySlug(categorySlug, serviceSlug) : null;
  const heroRef = useScrollAnimation(0.1);

  console.log('Route Params:', { categorySlug, serviceSlug });
  console.log('Found Category:', category?.title);
  console.log('Found Service:', service?.title);

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
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Requested Path: {categorySlug}/{serviceSlug}
              </p>
              {category && (
                <p className="text-sm text-muted-foreground">
                  Category '{category.title}' exists, but service '{serviceSlug}' was not found.
                </p>
              )}
              <Link
                to="/expertise"
                className="inline-flex items-center text-primary hover:underline"
              >
                <ArrowLeft className="mr-2" size={16} />
                Return to Expertise
              </Link>
            </div>
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
        <section className="relative h-[400px] md:h-[500px] overflow-hidden" ref={heroRef.ref}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600" />
          <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
            <div className={`transition-all duration-1000 ${
              heroRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}>
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

        {/* Content Sections */}
        <div className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Key Features */}
                <section>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={24} />
                    Key Features
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.features.map((feature) => (
                      <Card key={feature} className="p-4 bg-secondary/30">
                        <div className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></div>
                          <span>{feature}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </section>

                {/* Technologies */}
                <section>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Cpu className="text-blue-500" size={24} />
                    Technologies We Use
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {service.technologies.map((tech) => (
                      <Card key={tech} className="p-4 text-center bg-secondary/30">
                        <span className="font-medium">{tech}</span>
                      </Card>
                    ))}
                  </div>
                </section>

                {/* Use Cases */}
                <section>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Target className="text-purple-500" size={24} />
                    Use Cases
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.useCases.map((useCase) => (
                      <Card key={useCase} className="p-4 bg-secondary/30">
                        <div className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2"></div>
                          <span>{useCase}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </section>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Why Choose Us */}
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Lightbulb className="text-yellow-500" size={20} />
                    Why Choose Us
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Expert team with proven track record</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Custom solutions tailored to your needs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Cutting-edge technology stack</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Comprehensive support and maintenance</span>
                    </li>
                  </ul>
                </Card>

                {/* CTA Card */}
                <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/50 dark:to-blue-950/50">
                  <h3 className="text-xl font-semibold mb-4">Ready to Get Started?</h3>
                  <p className="text-muted-foreground mb-6">
                    Let's discuss how our {service.title.toLowerCase()} solutions can help your business grow.
                  </p>
                  <div className="space-y-3">
                    <Link to="/contact">
                      <Button className="w-full gradient-primary">
                        Contact Us <ArrowRight className="ml-2" size={20} />
                      </Button>
                    </Link>
                    <Link to="/case-studies">
                      <Button variant="outline" className="w-full">
                        View Case Studies
                      </Button>
                    </Link>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ExpertiseServicePage;