import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export const TestimonialCard = ({ quote, author, role, company }: TestimonialCardProps) => {
  return (
    <Card className="p-8 h-full">
      <Quote className="text-primary mb-4" size={32} />
      <p className="text-lg mb-6 italic">{quote}</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
        <p className="text-sm text-muted-foreground">{company}</p>
      </div>
    </Card>
  );
};
