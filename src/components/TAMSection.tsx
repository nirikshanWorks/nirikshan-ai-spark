import { useEffect, useState } from "react";
import { TrendingUp, DollarSign, Zap, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";

const AnimatedCounter = ({ end, duration = 2000, prefix = "", suffix = "" }: { 
  end: number; 
  duration?: number; 
  prefix?: string; 
  suffix?: string; 
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
          let start = 0;
          const increment = end / (duration / 16);

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.ceil(start));
            }
          }, 16);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById("tam-counter");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [hasAnimated, end, duration]);

  return <span id="tam-counter">{prefix}{count}{suffix}</span>;
};

export const TAMSection = () => {
  const stats = [
    {
      icon: DollarSign,
      value: 200,
      suffix: "B+",
      label: "AI & Computer Vision Market",
      description: "Global TAM in 2025",
      gradient: "from-blue-600 to-cyan-500",
    },
    {
      icon: TrendingUp,
      value: 38,
      suffix: "%",
      label: "Annual Growth Rate",
      description: "CAGR through 2030",
      gradient: "from-purple-600 to-pink-500",
    },
    {
      icon: Zap,
      value: 97,
      suffix: "%",
      label: "Enterprise Adoption",
      description: "Planning AI integration",
      gradient: "from-emerald-600 to-teal-500",
    },
    {
      icon: Globe,
      value: 15,
      suffix: "T+",
      label: "Global AI Economy",
      description: "By 2030",
      gradient: "from-orange-600 to-red-500",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-background via-secondary/20 to-primary/5">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(120,119,198,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(120,119,198,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold mb-4">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm uppercase tracking-wider">Market Opportunity</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
            The AI Opportunity
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            AI and Computer Vision together represent a <span className="font-bold text-primary">$200B+ global opportunity</span> — and Nirikshan AI stands at the forefront of this revolution
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl bg-gradient-to-br from-background to-secondary/30"
            >
              {/* Animated gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* Glow effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${stat.gradient} rounded-lg opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`}></div>
              
              <div className="relative z-10 p-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                
                <div className="text-4xl font-bold font-display mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} prefix="$" />
                </div>
                
                <h3 className="text-lg font-semibold mb-1">{stat.label}</h3>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </div>
              
              {/* Animated border */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            <span className="font-semibold text-foreground">Join the revolution.</span> As enterprises worldwide race to adopt AI, computer vision, and autonomous systems, the opportunity has never been greater. Partner with us to capture your share of this exponential growth.
          </p>
        </div>
      </div>
    </section>
  );
};