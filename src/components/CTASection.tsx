import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="relative overflow-hidden py-20">
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        src="https://res.cloudinary.com/dch0uyw8e/video/upload/v1760817368/Artificial_Intelligence_vm87tg.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/20 to-accent/85" aria-hidden="true" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQgOC4wNi0xOCAxOC0xOCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20" aria-hidden="true" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Let's discuss how our AI and technology solutions can drive growth and innovation in your organization. 
            Get started with a free consultation today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 shadow-2xl hover:scale-105 transition-all duration-300 font-semibold">
                Get Started
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Link to="/case-studies">
              <Button size="lg" variant="outline" className="border-2 border-white text-black hover:bg-white/10 text-lg px-8 py-6 backdrop-blur-sm">
                View Our Work
                <MessageCircle className="ml-2" size={20} />
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white" />
              <span>Free Consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white" />
              <span>No Obligation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white" />
              <span>Quick Response</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
