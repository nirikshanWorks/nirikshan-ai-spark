import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { testimonials } from "./whoWeAreContent";
import { StaggerTestimonials, type StaggerTestimonial } from "@/components/ui/stagger-testimonials";

const staggerData: StaggerTestimonial[] = testimonials.map((t, i) => ({
  tempId: i,
  testimonial: t.quote,
  by: `${t.name}, ${t.role}`,
  imgSrc: t.image,
}));

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
        <div className="max-w-4xl mx-auto text-center mb-8">
          <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-primary block mb-4">
            Authentic Voices
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Real Stories. Real Impact.</h1>
          <p className="text-lg text-muted-foreground">
            Discover meaningful experiences that reflect our commitment to innovation, partnership, and excellence across the technology landscape.
          </p>
        </div>

        <StaggerTestimonials testimonials={staggerData} />

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
