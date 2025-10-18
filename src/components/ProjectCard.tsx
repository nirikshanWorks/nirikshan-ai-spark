import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ArrowRight, Star, Zap, Award, Code2, TrendingUp } from "lucide-react";

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
    <Card className="overflow-hidden group h-full bg-white dark:bg-slate-800/50 border-2 border-transparent hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 backdrop-blur-sm relative">
      {/* Animated Background Gradient on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-purple-600/0 to-blue-600/0 group-hover:from-blue-600/5 group-hover:via-purple-600/5 group-hover:to-blue-600/5 transition-all duration-500 pointer-events-none" />

      {/* Image Container with Overlay */}
      <div className="relative h-80 overflow-hidden bg-gradient-to-br from-blue-500/10 to-purple-500/10">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        
        {/* Top Section - Category & Status */}
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
              <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-semibold px-2 py-1 flex items-center gap-1 shadow-lg animate-pulse">
                <Zap size={12} />
                {status}
              </Badge>
            )}
          </div>
        </div>

        {/* Hover Overlay with Stats */}
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/40">
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-lg transform group-hover:scale-110 transition-transform duration-300 mx-auto">
              <ArrowRight className="text-white" size={32} />
            </div>
            <p className="text-white text-sm font-semibold">Explore Project</p>
          </div>
        </div>

        {/* Floating Icons Animation */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur flex items-center justify-center border border-white/20 group-hover:bg-blue-500/20 transition-all duration-300">
              <Code2 size={16} className="text-white" />
            </div>
            <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur flex items-center justify-center border border-white/20 group-hover:bg-purple-500/20 transition-all duration-300">
              <TrendingUp size={16} className="text-white" />
            </div>
            <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur flex items-center justify-center border border-white/20 group-hover:bg-green-500/20 transition-all duration-300">
              <Award size={16} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 bg-gradient-to-b from-background to-secondary/10 space-y-4 relative z-10">
        {/* Title with Accent Line */}
        <div className="relative">
          <h3 className="text-2xl font-bold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
            {title}
          </h3>
          <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-12 transition-all duration-500 mt-2"></div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed line-clamp-2 text-sm pt-2">
          {description}
        </p>

        {/* Meta Information with Icons */}
        <div className="grid grid-cols-2 gap-3 py-4 border-y border-dashed border-border/50 group-hover:border-solid group-hover:border-blue-200/50 dark:group-hover:border-blue-900/50 transition-all duration-300">
          <div className="flex items-center gap-2 text-sm group/meta">
            <div className="w-6 h-6 rounded-md bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center group-hover/meta:bg-blue-200 dark:group-hover/meta:bg-blue-900/50 transition-colors duration-300">
              <Calendar size={14} className="text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-muted-foreground truncate text-xs">{date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm group/meta">
            <div className="w-6 h-6 rounded-md bg-purple-100 dark:bg-purple-950/30 flex items-center justify-center group-hover/meta:bg-purple-200 dark:group-hover/meta:bg-purple-900/50 transition-colors duration-300">
              <MapPin size={14} className="text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-muted-foreground truncate text-xs">{client}</span>
          </div>
        </div>

        {/* Tags with Hover Effects */}
        <div className="flex flex-wrap gap-2 pt-2">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary"
              className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-500/30 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/50 dark:hover:to-purple-900/50 transition-all duration-300 text-xs px-2 py-1 font-medium hover:shadow-md cursor-pointer"
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

        {/* CTA Button with Enhanced Effects */}
        <div className="pt-3 space-y-2">
          <button className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 via-blue-600 to-purple-600 text-white rounded-lg font-semibold text-sm opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-3 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:from-blue-700 hover:via-blue-700 hover:to-purple-700 flex items-center justify-center gap-2 group/btn">
            <span>View Project</span>
            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
          </button>
          
          {/* Additional Info Stats */}
          <div className="grid grid-cols-3 gap-2 text-xs opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
            <div className="text-center p-2 bg-blue-50/50 dark:bg-blue-950/20 rounded-md border border-blue-200/30 dark:border-blue-500/20">
              <p className="font-bold text-foreground">100%</p>
              <p className="text-muted-foreground text-xs">Satisfaction</p>
            </div>
            <div className="text-center p-2 bg-purple-50/50 dark:bg-purple-950/20 rounded-md border border-purple-200/30 dark:border-purple-500/20">
              <p className="font-bold text-foreground">On-Time</p>
              <p className="text-muted-foreground text-xs">Delivery</p>
            </div>
            <div className="text-center p-2 bg-green-50/50 dark:bg-green-950/20 rounded-md border border-green-200/30 dark:border-green-500/20">
              <p className="font-bold text-foreground">Live</p>
              <p className="text-muted-foreground text-xs">In Production</p>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Corner Accent */}
      <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-t-[40px] border-l-transparent border-t-blue-600/0 group-hover:border-t-blue-600/20 transition-all duration-500"></div>
    </Card>
  );
};
