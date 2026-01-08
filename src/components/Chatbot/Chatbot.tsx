import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import { ChatbotParticles } from "./ChatbotParticles";
import { getResponse } from "./chatbotResponses";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  followUp?: string[];
  links?: { text: string; url: string }[];
}

const RobotIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <line x1="8" y1="16" x2="8" y2="16" />
    <line x1="16" y1="16" x2="16" y2="16" />
    <circle cx="8" cy="16" r="1" fill="currentColor" />
    <circle cx="16" cy="16" r="1" fill="currentColor" />
    <path d="M9 20h6" />
  </svg>
);

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([
          {
            role: "assistant",
            content: "👋 Hi! I'm Niri, your AI assistant from Nirikshan AI.\nHow can I help you today?\n\nYou can ask me about our company, services, projects, or how to contact us.",
            timestamp: new Date(),
            followUp: ["🧠 Our Expertise", "🚀 Projects", "👥 About Nirikshan AI", "📞 Contact Us"]
          },
        ]);
      }, 300);
    }
  }, [isOpen, messages.length]);

  // Freeze background scrolling when chatbot is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSendMessage = (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: text, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate a brief delay for natural feel
    setTimeout(() => {
      const response = getResponse(text);
      
      // Add contact email info at the end if not already a contact query
      let finalMessage = response.message;
      if (!text.toLowerCase().includes('contact') && !response.message.includes('info@nirikshanai.com')) {
        finalMessage += "\n\n📧 For more details, reach us at info@nirikshanai.com";
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: finalMessage,
        timestamp: new Date(),
        followUp: response.followUp,
        links: response.links
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 500);
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg gradient-primary hover:scale-110 transition-all duration-300 z-50 group"
          size="icon"
        >
          <RobotIcon className="w-7 h-7 group-hover:scale-110 transition-transform" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[380px] h-[600px] bg-background border border-border rounded-2xl shadow-2xl flex flex-col z-50 fade-in scale-in overflow-hidden">
          {/* Particle Background */}
          <div className="absolute inset-0 pointer-events-none">
            <ChatbotParticles />
          </div>

          {/* Header */}
          <div className="gradient-primary text-white p-4 rounded-t-2xl flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <RobotIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">Niri</h3>
                <p className="text-xs text-white/80">AI Assistant</p>
              </div>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="hover:bg-white/20 text-white"
            >
              <X size={20} />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-muted/30 relative z-10">
            {messages.map((msg, index) => (
              <div key={index}>
                <ChatMessage
                  message={msg.content}
                  isBot={msg.role === "assistant"}
                  timestamp={msg.timestamp}
                />
                {/* Quick Reply Buttons */}
                {msg.role === "assistant" && msg.followUp && index === messages.length - 1 && (
                  <div className="flex flex-wrap gap-2 mt-2 mb-4 ml-12">
                    {msg.followUp.map((option, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuickReply(option)}
                        className="px-3 py-1.5 text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors border border-primary/20"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
                {/* Links */}
                {msg.role === "assistant" && msg.links && index === messages.length - 1 && (
                  <div className="flex flex-wrap gap-2 mb-4 ml-12">
                    {msg.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        className="px-3 py-1.5 text-xs bg-accent hover:bg-accent/80 text-accent-foreground rounded-full transition-colors inline-flex items-center gap-1"
                      >
                        🔗 {link.text}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-background rounded-b-2xl relative z-10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="flex gap-2"
            >
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" className="gradient-primary" disabled={isLoading}>
                <Send size={18} />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
