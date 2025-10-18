import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Milestone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { timeline } from "./whoWeAreContent";

const Journey = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <main className="pt-16 pb-20">
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-indigo-500 block mb-4">
            Timeline
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Journey of Intelligent Innovation</h1>
          <p className="text-lg text-muted-foreground">
            Follow the milestones that transformed Nirikshan AI from a student-led initiative into a research-driven partner powering real-world intelligence.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-400 via-purple-400 to-blue-400" aria-hidden="true" />
          <div className="space-y-12">
            {timeline.map((event, index) => (
              <article
                key={event.year}
                className={`relative grid gap-6 lg:grid-cols-2 lg:items-center ${
                  index % 2 === 0 ? "lg:text-right" : "lg:text-left lg:flex-row-reverse"
                }`}
              >
                <div className={`lg:col-span-1 ${index % 2 !== 0 ? "lg:order-2" : ""}`}>
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-secondary text-sm font-semibold">
                    <Milestone size={18} /> {event.year}
                  </div>
                </div>
                <div className={`lg:col-span-1 ${index % 2 !== 0 ? "lg:order-1" : ""}`}>
                  <div className="p-6 rounded-3xl border border-border bg-background shadow-sm hover:shadow-xl transition-all duration-300">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/projects">
            <Button variant="secondary" className="gap-2">
              View Projects
              <ArrowRight size={18} />
            </Button>
          </Link>
          <Link to="/contact">
            <Button className="gap-2 gradient-primary">
              Collaborate With Us
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Journey;
