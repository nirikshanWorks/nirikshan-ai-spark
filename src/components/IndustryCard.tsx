import { Card } from "@/components/ui/card";

interface IndustryCardProps {
  title: string;
  image: string;
}

export const IndustryCard = ({ title, image }: IndustryCardProps) => {
  return (
    <Card className="overflow-hidden group cursor-pointer card-hover border-2 border-border hover:border-primary/50 transition-all duration-500">
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700 group-hover:rotate-2"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-500" />
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
        <h3 className="absolute bottom-6 left-6 text-2xl font-bold text-white group-hover:text-accent transition-colors duration-300 drop-shadow-lg">{title}</h3>
        <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110">
          <span className="text-white text-xl">→</span>
        </div>
      </div>
    </Card>
  );
};
