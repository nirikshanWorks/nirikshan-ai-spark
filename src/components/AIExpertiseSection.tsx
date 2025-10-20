import { Eye, Sparkles, Bot, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const AIExpertiseSection = () => {
  const expertise = [
    {
      icon: Eye,
      title: "OpenCV & Computer Vision",
      description: "Building intelligent systems that see, understand, and act — from real-time object detection to visual automation.",
      features: ["Real-time Object Detection", "Visual Automation", "Image Processing", "Pattern Recognition"],
      gradient: "from-blue-600 to-cyan-500",
      link: "/expertise/artificial-intelligence/computer-vision",
    },
    {
      icon: Sparkles,
      title: "Generative AI",
      description: "Creating AI that imagines, writes, designs, and innovates beyond human limitations.",
      features: ["Content Generation", "Creative Automation", "LLM Integration", "AI-Powered Design"],
      gradient: "from-purple-600 to-pink-500",
      link: "/expertise/artificial-intelligence/generative-ai",
    },
    {
      icon: Bot,
      title: "Agentic AI / AI Agents",
      description: "Developing autonomous agents that collaborate, reason, and execute complex tasks intelligently.",
      features: ["Autonomous Systems", "Multi-Agent Collaboration", "Intelligent Reasoning", "Task Automation"],
      gradient: "from-emerald-600 to-teal-500",
      link: "/expertise/artificial-intelligence/ai-agent-development",
    },
  ];

  return (
    <section id="ai-expertise" className="py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-secondary/10 to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold mb-4 animate-pulse">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm uppercase tracking-wider">Our Core AI Expertise</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
            Pioneering the Future of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              Artificial Intelligence
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We specialize in three cutting-edge AI domains that are reshaping industries and unlocking unprecedented possibilities
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {expertise.map((item, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl bg-gradient-to-br from-background to-secondary/30"
            >
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-lg opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
              
              <div className="relative z-10 p-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold font-display mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent transition-all duration-300">
                  {item.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {item.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {item.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link to={item.link}>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};