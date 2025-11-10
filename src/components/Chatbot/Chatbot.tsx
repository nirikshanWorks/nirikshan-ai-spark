import { useState, useRef, useEffect } from "react";
import { X, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "./ChatMessage";
import { QuickReply } from "./QuickReply";
import { TypingIndicator } from "./TypingIndicator";
import { ChatbotParticles } from "./ChatbotParticles";
import { chatbotResponses, getResponse } from "./chatbotResponses";

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
  links?: { text: string; url: string }[];
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [quickReplies, setQuickReplies] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Send initial greeting
      setTimeout(() => {
        const greeting = chatbotResponses.greeting;
        setMessages([{ text: greeting.message, isBot: true, timestamp: new Date(), links: greeting.links }]);
        setQuickReplies(greeting.followUp || []);
      }, 500);
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
    if (!text.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text, isBot: false, timestamp: new Date() }]);
    setInputValue("");
    setQuickReplies([]);
    setIsTyping(true);

    // Simulate bot typing and response
    setTimeout(() => {
      const response = getResponse(text);
      setIsTyping(false);
      setMessages(prev => [...prev, { text: response.message, isBot: true, timestamp: new Date(), links: response.links }]);
      setQuickReplies(response.followUp || []);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickReply = (option: string) => {
    handleSendMessage(option);
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
          <MessageCircle className="group-hover:scale-110 transition-transform" size={24} />
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
                <MessageCircle size={20} />
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
              <ChatMessage
                key={index}
                message={msg.text}
                isBot={msg.isBot}
                timestamp={msg.timestamp}
                links={msg.links}
              />
            ))}
            {isTyping && <TypingIndicator />}
            {quickReplies.length > 0 && (
              <QuickReply options={quickReplies} onSelect={handleQuickReply} />
            )}
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
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit" size="icon" className="gradient-primary">
                <Send size={18} />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
