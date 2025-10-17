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
      <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border group cursor-pointer relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10">
          <div className="mb-4 w-12 h-12 rounded-lg gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon className="text-white" size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-muted-foreground mb-4">{description}</p>
          <div className="flex items-center text-primary group-hover:text-accent transition-colors">
            <span className="text-sm font-medium">Learn more</span>
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
          </div>
        </div>
      </Card>
    </Link>
  );
};
