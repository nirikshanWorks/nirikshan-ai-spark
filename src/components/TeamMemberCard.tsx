import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface TeamMemberCardProps {
  name: string;
  role: string;
  description: string;
  quote: string;
  image?: string;
}

export const TeamMemberCard = ({ name, role, description, quote, image }: TeamMemberCardProps) => {
  return (
    <Card className="p-8 text-center card-hover group cursor-pointer border-2 border-border hover:border-primary/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="mb-6">
          <div className="w-28 h-28 rounded-full gradient-primary mx-auto flex items-center justify-center text-white text-4xl font-bold shadow-2xl group-hover:scale-110 transition-transform duration-500">
            {name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">{name}</h3>
        <p className="text-primary font-semibold mb-4 uppercase text-sm tracking-wider">{role}</p>
        <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>
        <div className="pt-6 border-t border-border">
          <Quote className="text-primary/40 mx-auto mb-3 group-hover:text-primary/60 transition-colors duration-300" size={24} />
          <p className="text-sm italic text-muted-foreground group-hover:text-foreground transition-colors duration-300">"{quote}"</p>
        </div>
      </div>
    </Card>
  );
};
