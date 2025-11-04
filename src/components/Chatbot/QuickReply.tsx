import { Button } from "@/components/ui/button";

interface QuickReplyProps {
  options: string[];
  onSelect: (option: string) => void;
}

export const QuickReply = ({ options, onSelect }: QuickReplyProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4 fade-in">
      {options.map((option, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          onClick={() => onSelect(option)}
          className="text-xs hover:gradient-primary hover:text-white hover:border-transparent transition-all"
        >
          {option}
        </Button>
      ))}
    </div>
  );
};
