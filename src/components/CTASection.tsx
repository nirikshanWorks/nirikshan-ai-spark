import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Video background */}
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        src="https://res.cloudinary.com/dch0uyw8e/video/upload/v1760817368/Artificial_Intelligence_vm87tg.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      
      {/* Multi-layer gradients for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-950/80 via-primary/30 to-accent/60" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" aria-hidden="true" />
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQgOC4wNi0xOCAxOC0xOCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20" aria-hidden="true" />
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 blur-3xl floating opacity-60" />
      <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-gradient-to-tr from-accent/20 to-primary/30 blur-2xl floating-delayed opacity-50" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-8">
            <Sparkles size={16} className="text-accent" />
            <span>Start Your AI Journey Today</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to <span className="text-gradient">Transform</span> Your Business?
          </h2>
          <p className="text-xl text-white/85 mb-12 leading-relaxed max-w-2xl mx-auto">
            Let's discuss how our AI and technology solutions can drive growth and innovation in your organization. 
            Get started with a free consultation today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 shadow-2xl hover:scale-105 transition-all duration-300 font-semibold btn-3d">
                Get Started
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Link to="/case-studies">
              <Button size="lg" variant="outline" className="border-2 border-white/80 text-white hover:bg-white/10 text-lg px-8 py-6 backdrop-blur-sm hover:scale-105 transition-all duration-300">
                View Our Work
                <MessageCircle className="ml-2" size={20} />
              </Button>
            </Link>
          </div>

          <div className="mt-14 flex flex-wrap justify-center gap-8 text-white/80 text-sm">
            {["Free Consultation", "No Obligation", "Quick Response"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 group">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent group-hover:scale-150 transition-transform" />
                <span className="group-hover:text-white transition-colors">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
