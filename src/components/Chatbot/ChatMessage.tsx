import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: Date;
}

export const ChatMessage = ({ message, isBot, timestamp }: ChatMessageProps) => {
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
          <div className={`text-sm ${isBot ? 'text-foreground' : 'text-white'} prose prose-sm max-w-none [&_p]:m-0 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0 [&_h1]:text-sm [&_h2]:text-sm [&_h3]:text-sm [&_strong]:font-semibold`}>
            <ReactMarkdown>{message}</ReactMarkdown>
          </div>
        </div>
        <span className="text-xs text-muted-foreground mt-1">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};
