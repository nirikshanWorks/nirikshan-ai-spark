import { Bot, User, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: Date;
  links?: { text: string; url: string }[];
}

export const ChatMessage = ({ message, isBot, timestamp, links }: ChatMessageProps) => {
  return (
    <div className={`flex gap-3 mb-4 fade-in ${isBot ? '' : 'flex-row-reverse'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isBot ? 'bg-primary/10' : 'bg-secondary/10'
      }`}>
        {isBot ? <Bot size={18} className="text-primary" /> : <User size={18} className="text-secondary" />}
      </div>
      <div className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} max-w-[75%]`}>
        <div className={`rounded-2xl px-4 py-2 ${
          isBot 
            ? 'bg-card border border-border' 
            : 'gradient-primary text-white'
        }`}>
          <p className={`text-sm whitespace-pre-wrap ${isBot ? 'text-foreground' : 'text-white'}`}>
            {message}
          </p>
          {links && links.length > 0 && (
            <div className="mt-3 flex flex-col gap-2">
              {links.map((link, index) => (
                <Link key={index} to={link.url}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-between text-xs group hover:gradient-primary hover:text-white hover:border-transparent"
                  >
                    {link.text}
                    <ExternalLink size={14} className="ml-2 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </Link>
              ))}
            </div>
          )}
        </div>
        <span className="text-xs text-muted-foreground mt-1">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};
