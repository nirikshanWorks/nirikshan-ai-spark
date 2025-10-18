import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
}

export const ServiceCard = ({ icon: Icon, title, description, link }: ServiceCardProps) => {
  return (
    <Link to={link}>
      <Card className="p-8 h-full card-hover border-2 border-border group cursor-pointer relative overflow-hidden bg-card">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
        <div className="relative z-10">
          <div className="mb-6 w-16 h-16 rounded-xl gradient-primary flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
            <Icon className="text-white" size={28} />
          </div>
          <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">{title}</h3>
          <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>
          <div className="flex items-center text-primary group-hover:text-accent transition-colors duration-300">
            <span className="text-sm font-semibold uppercase tracking-wider">Learn more</span>
            <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" size={18} />
          </div>
        </div>
      </Card>
    </Link>
  );
};
