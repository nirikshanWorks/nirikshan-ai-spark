import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import wwaTeamVideo from "@/assets/wwa-team.mp4";

const teamMembers = [
  {
    name: "Dinesh Yadav",
    role: "Founder & CEO",
    description: "Visionary leader with a passion for AI and innovative technology solutions.",
    quote: "At Nirikshan AI Pvt. Ltd., we don't just build software — we build ideas.",
    expertise: ["Leadership", "AI Strategy", "Business Development"]
  },
  {
    name: "Anshul",
    role: "Co-Founder & Operations Manager",
    description: "Strategic operations expert focused on optimizing workflows and delivering quality solutions to clients.",
    quote: "From local enterprise to worldwide, we're turning ideas into impactful digital solutions.",
    expertise: ["Operations", "Project Management", "Quality Assurance"]
  },
  {
    name: "Ashwin Hole",
    role: "Co Founder & HOP",
    description: "Visionary leader with a passion for AI and innovative technology solutions.",
    quote: "We love to innovate and create solutions that make a difference.",
    expertise: ["Innovation", "Technology", "Team Building"]
  },
];

const WhoWeAre = () => {
  const leadershipRef = useScrollAnimation(0.2);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden group">
          <video 
            src={wwaTeamVideo} 
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
          <div className="absolute inset-0 hero-overlay" />
          <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">Who We Are</h1>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mb-6"></div>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl font-light">
                Pioneering the future of AI-driven business transformation
              </p>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-20 bg-secondary/30" ref={leadershipRef.ref}>
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Leadership</h2>
              <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-4"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Meet the visionary leaders driving innovation and excellence at Nirikshan AI Pvt. Ltd.
              </p>
            </div>
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto transition-all duration-1000 ${
              leadershipRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}>
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="group relative bg-white dark:bg-slate-800/50 rounded-2xl overflow-hidden border border-border hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                >
                  {/* Top gradient accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="p-8">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Heart className="text-white" size={32} />
                    </div>

                    {/* Name and Role */}
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-accent font-semibold mb-3 text-sm">{member.role}</p>
                    
                    {/* Description */}
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {member.description}
                    </p>

                    {/* Quote */}
                    <div className="bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-slate-700/30 dark:to-slate-700/20 p-4 rounded-lg mb-4 border-l-4 border-blue-500">
                      <p className="text-muted-foreground italic text-sm">
                        "{member.quote}"
                      </p>
                    </div>

                    {/* Expertise Tags */}
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Expertise</p>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((exp, idx) => (
                          <span
                            key={idx}
                            className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 text-xs font-medium text-blue-600 dark:text-blue-400 rounded-full border border-blue-200/50 dark:border-blue-400/30 transition-all duration-300"
                          >
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>
          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Us on This Journey</h2>
              <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
              <p className="text-lg text-muted-foreground mb-10">
                Whether you're looking for a technology partner or want to be part of our team, 
                we'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="gradient-primary hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105">
                    Get in Touch
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Link to="/careers">
                  <Button size="lg" variant="outline" className="hover:bg-secondary transition-all duration-300 transform hover:scale-105">
                    View Open Positions
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

export default WhoWeAre;
