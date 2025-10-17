import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";

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
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 left-4">
          <Badge className="bg-primary text-primary-foreground shadow-lg">{category}</Badge>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-3">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        
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
