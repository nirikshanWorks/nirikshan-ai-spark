import { Card } from "@/components/ui/card";

interface IndustryCardProps {
  title: string;
  image: string;
}

export const IndustryCard = ({ title, image }: IndustryCardProps) => {
  return (
    <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <h3 className="absolute bottom-4 left-4 text-xl font-semibold text-white">{title}</h3>
      </div>
    </Card>
  );
};
