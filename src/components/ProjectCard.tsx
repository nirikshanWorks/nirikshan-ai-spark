import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ArrowRight, Star, Zap, Code2, TrendingUp } from "lucide-react";

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
  const whatsappMessage = encodeURIComponent(
    `Hi Nirikshan AI team, I'm interested in discussing the project "${title}".`
  );
  const whatsappUrl = `https://wa.me/919410992204?text=${whatsappMessage}`;

  return (
    <Card className="overflow-hidden h-full bg-white dark:bg-slate-800/50 border border-border/60 backdrop-blur-sm relative shadow-md">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-blue-600/10 pointer-events-none" />

      {/* Image Container */}
      <div className="relative h-80 overflow-hidden bg-gradient-to-br from-blue-500/10 to-purple-500/10">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className="flex gap-2">
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg font-semibold px-3 py-1.5 text-xs uppercase tracking-wider">
              {category}
            </Badge>
          </div>
          <div className="flex gap-2">
            {status === "Completed" && (
              <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-semibold px-2 py-1 flex items-center gap-1 shadow-lg">
                <Star size={12} />
                {status}
              </Badge>
            )}
            {status === "In Progress" && (
              <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-semibold px-2 py-1 flex items-center gap-1 shadow-lg">
                <Zap size={12} />
                {status}
              </Badge>
            )}
            {status === "Ongoing" && (
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold px-2 py-1 flex items-center gap-1 shadow-lg">
                <Code2 size={12} />
                {status}
              </Badge>
            )}
            {status === "Planned" && (
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold px-2 py-1 flex items-center gap-1 shadow-lg">
                <TrendingUp size={12} />
                {status}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 bg-gradient-to-b from-background to-secondary/10 space-y-5 relative z-10">
        <div>
          <h3 className="text-2xl font-display font-bold text-foreground leading-snug line-clamp-2">
            {title}
          </h3>
          <div className="mt-2 h-1 w-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
        </div>

        <p className="text-muted-foreground leading-relaxed text-sm">
          {description}
        </p>

        <div className="grid grid-cols-2 gap-3 py-4 border-y border-dashed border-border/60">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-6 h-6 rounded-md bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center">
              <Calendar size={14} className="text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-muted-foreground truncate text-xs">{date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-6 h-6 rounded-md bg-purple-100 dark:bg-purple-950/30 flex items-center justify-center">
              <MapPin size={14} className="text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-muted-foreground truncate text-xs">{client}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary"
              className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-500/30 text-xs px-2 py-1 font-medium"
            >
              #{tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge 
              variant="secondary"
              className="bg-secondary text-muted-foreground border border-border/50 text-xs px-2 py-1 font-medium"
            >
              +{tags.length - 3}
            </Badge>
          )}
        </div>

        <div className="pt-3 space-y-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 via-blue-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white"
          >
            <span>Discuss on WhatsApp</span>
            <ArrowRight size={16} />
          </a>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center p-2 bg-blue-50/60 dark:bg-blue-950/20 rounded-md border border-blue-200/40 dark:border-blue-500/20">
              <p className="font-bold text-foreground">100%</p>
              <p className="text-muted-foreground text-xs">Satisfaction</p>
            </div>
            <div className="text-center p-2 bg-purple-50/60 dark:bg-purple-950/20 rounded-md border border-purple-200/40 dark:border-purple-500/20">
              <p className="font-bold text-foreground">On-Time</p>
              <p className="text-muted-foreground text-xs">Delivery</p>
            </div>
            <div className="text-center p-2 bg-green-50/60 dark:bg-green-950/20 rounded-md border border-green-200/40 dark:border-green-500/20">
              <p className="font-bold text-foreground">Live</p>
              <p className="text-muted-foreground text-xs">Status</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
