import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
  aiPowered?: boolean;
}

export const ServiceCard = ({ icon: Icon, title, description, link, aiPowered }: ServiceCardProps) => {
  return (
    <Link to={link}>
      <Card className="p-8 h-full border-2 border-border group cursor-pointer relative overflow-hidden bg-card tilt-card">
        {/* 3D Depth layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-all duration-700 group-hover:scale-150" />
        <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-all duration-700" />
        
        {/* AI Badge with glow */}
        {aiPowered && (
          <div className="absolute top-4 right-4 z-20">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs font-semibold flex items-center gap-1 group-hover:bg-primary/20 transition-colors">
              <Sparkles size={12} className="group-hover:animate-pulse" />
              AI-Powered
            </Badge>
          </div>
        )}
        
        <div className="relative z-10">
          {/* 3D Icon Container */}
          <div className="mb-6 w-16 h-16 rounded-xl gradient-primary flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg icon-3d">
            <Icon className="text-white" size={28} />
          </div>
          
          <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">{title}</h3>
          <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>
          
          {/* Animated CTA */}
          <div className="flex items-center text-primary group-hover:text-accent transition-colors duration-300">
            <span className="text-sm font-semibold uppercase tracking-wider animated-underline">Learn more</span>
            <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" size={18} />
          </div>
        </div>
        
        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </Card>
    </Link>
  );
};
