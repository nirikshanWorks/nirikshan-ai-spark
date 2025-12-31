import { Card } from "@/components/ui/card";

interface IndustryCardProps {
  title: string;
  image: string;
}

export const IndustryCard = ({ title, image }: IndustryCardProps) => {
  return (
    <Card className="overflow-hidden group cursor-pointer border-2 border-border hover:border-primary/50 transition-all duration-500 card-3d">
      <div className="relative h-56 overflow-hidden">
        {/* Image with 3D transform */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
        
        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
        
        {/* Title with 3D depth */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-white group-hover:text-accent transition-colors duration-300 drop-shadow-lg group-hover:translate-y-[-4px] transition-transform">{title}</h3>
          <div className="h-0.5 w-0 bg-gradient-to-r from-primary to-accent group-hover:w-16 transition-all duration-500 mt-2 rounded-full" />
        </div>
        
        {/* Floating arrow indicator */}
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 border border-white/20">
          <span className="text-white text-lg group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">→</span>
        </div>
      </div>
    </Card>
  );
};
