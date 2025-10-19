import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CaseStudyCardProps {
  title: string;
  description: string;
  category: string;
  image: string;
  metrics?: {
    label: string;
    value: string;
  }[];
}

export const CaseStudyCard = ({ title, description, category, image, metrics }: CaseStudyCardProps) => {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <Badge className="mb-3">{category}</Badge>
        <h3 className="text-2xl font-semibold mb-3">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        {metrics && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            {metrics.map((metric, index) => (
              <div key={index}>
                <p className="text-2xl font-bold text-primary">{metric.value}</p>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
