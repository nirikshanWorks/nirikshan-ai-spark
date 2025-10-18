import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Quote, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { testimonials } from "./whoWeAreContent";

const Testimonials = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <main className="pt-16 pb-20">
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

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="p-8 rounded-3xl border border-border bg-background shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <Quote className="text-indigo-500 mb-4" size={28} />
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                “{testimonial.quote}”
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">{testimonial.role}</p>
                </div>
              </div>
            </article>
          ))}
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
    <Footer />
  </div>
);

export default Testimonials;
