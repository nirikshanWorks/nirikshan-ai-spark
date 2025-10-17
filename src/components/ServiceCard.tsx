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
      <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 hover:scale-105 border-border group">
        <div className="mb-4 w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
          <Icon className="text-white" size={24} />
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center text-primary group-hover:text-accent transition-colors">
          <span className="text-sm font-medium">Learn more</span>
          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
        </div>
      </Card>
    </Link>
  );
};
