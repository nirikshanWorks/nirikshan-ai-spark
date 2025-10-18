import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { getCategoryBySlug } from "@/pages/expertise/expertiseData";

const ExpertiseCategoryPage = () => {
  const { categorySlug } = useParams();
  const category = getCategoryBySlug(categorySlug || "");
  const heroRef = useScrollAnimation(0.1);

  if (!category) {
    return <div>Category not found</div>;
  }

  const Icon = category.icon;

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
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center">
                  <Icon className="text-white" size={32} />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white">{category.title}</h1>
              </div>
              <div className="h-1 w-24 bg-white rounded-full mb-6"></div>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl">
                {category.description}
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.services.map((service) => (
                <Link 
                  key={service.slug} 
                  to={`/expertise/${category.slug}/${service.slug}`}
                  className="group"
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-background to-secondary/30">
                    <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                    <p className="text-muted-foreground mb-6">{service.description}</p>
                    <div className="space-y-2">
                      {service.features.slice(0, 3).map((feature) => (
                        <div key={feature} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button variant="ghost" className="w-full mt-6 group-hover:text-primary">
                      Learn More <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
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