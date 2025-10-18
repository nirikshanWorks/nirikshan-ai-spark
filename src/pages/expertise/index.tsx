import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { expertiseCategories } from "@/pages/expertise/expertiseData";

const ExpertisePage = () => {
  const heroRef = useScrollAnimation(0.1);

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
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Our Expertise</h1>
              <div className="h-1 w-24 bg-white rounded-full mb-6"></div>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl">
                Discover our comprehensive range of technology solutions and services
              </p>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {expertiseCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Link 
                    key={category.slug} 
                    to={`/expertise/${category.slug}`}
                    className="group"
                  >
                    <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-background to-secondary/30">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
                          <Icon className="text-white" size={24} />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                          <p className="text-muted-foreground">{category.description}</p>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        {category.services.slice(0, 3).map((service) => (
                          <div key={service.slug} className="flex items-center text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                            {service.title}
                          </div>
                        ))}
                        {category.services.length > 3 && (
                          <div className="text-sm text-blue-500">+ {category.services.length - 3} more services</div>
                        )}
                      </div>
                      <Button variant="ghost" className="w-full mt-4 group-hover:text-primary">
                        Learn More <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
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