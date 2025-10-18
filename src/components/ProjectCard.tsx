import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  category: string;
  image: string;
  date: string;
  status: string;
  client: string;
  tags: string[];
}

export const ProjectCard = ({ 
  title, 
  description, 
  category, 
  image, 
  date, 
  status, 
  client, 
  tags 
}: ProjectCardProps) => {
  return (
    <Card className="overflow-hidden group card-hover cursor-pointer border-2 border-border hover:border-primary/50 transition-all duration-500">
      <div className="relative h-72 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
        <div className="absolute top-4 left-4">
          <Badge className="bg-primary text-primary-foreground shadow-xl font-semibold px-3 py-1">{category}</Badge>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <ArrowRight className="text-white" size={28} />
          </div>
        </div>
      </div>
      <div className="p-6 bg-gradient-to-b from-card to-secondary/20">
        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">{title}</h3>
        <p className="text-muted-foreground mb-4 leading-relaxed">{description}</p>
        
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Calendar size={16} className="mr-2" />
            {date}
          </div>
          <div className="flex items-center text-muted-foreground">
            <MapPin size={16} className="mr-2" />
            {client}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary">#{tag}</Badge>
            ))}
          </div>
          <Badge className="bg-accent text-accent-foreground">{status}</Badge>
        </div>
      </div>
    </Card>
  );
};
