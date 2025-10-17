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
    <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
      <div className="mb-4">
        <div className="w-24 h-24 rounded-full gradient-primary mx-auto flex items-center justify-center text-white text-3xl font-bold">
          {name.split(' ').map(n => n[0]).join('')}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-1">{name}</h3>
      <p className="text-primary font-medium mb-3">{role}</p>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="pt-4 border-t border-border">
        <Quote className="text-primary/30 mx-auto mb-2" size={20} />
        <p className="text-sm italic text-muted-foreground">{quote}</p>
      </div>
    </Card>
  );
};
