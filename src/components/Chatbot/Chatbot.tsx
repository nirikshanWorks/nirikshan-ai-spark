import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import { ChatbotParticles } from "./ChatbotParticles";
import nirikshanLogo from "@/assets/nirikshan-ai-logo.png";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/company-chatbot`;

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content: "👋 Hi! I'm **Niri**, your AI assistant from **Nirikshan AI**.\n\nHow can I help you today? You can ask me about our company, services, projects, careers, or how to contact us.",
  timestamp: new Date(),
};

const QUICK_OPTIONS = ["🧠 Our Expertise", "🚀 Projects", "👥 About Us", "📞 Contact"];

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
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
        setMessages([WELCOME_MESSAGE]);
      }, 300);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: text, timestamp: new Date() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue("");
    setIsLoading(true);
    setShowQuickReplies(false);

    // Build conversation history for the AI (exclude the welcome message)
    const chatHistory = updatedMessages
      .filter((_, i) => i > 0 || updatedMessages[0].role === "user")
      .map((m) => ({ role: m.role, content: m.content }));

    let assistantContent = "";

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: chatHistory }),
      });

      if (!resp.ok) {
        const errorData = await resp.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to get response");
      }

      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      const upsertAssistant = (content: string) => {
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant" && last === prev[prev.length - 1] && prev.length > updatedMessages.length) {
            return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content } : m));
          }
          return [...prev, { role: "assistant" as const, content, timestamp: new Date() }];
        });
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              assistantContent += delta;
              upsertAssistant(assistantContent);
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              assistantContent += delta;
              upsertAssistant(assistantContent);
            }
          } catch { /* ignore */ }
        }
      }

      setShowQuickReplies(true);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting right now. Please try again or reach us at **info@nirikshanai.com**.",
          timestamp: new Date(),
        },
      ]);
      setShowQuickReplies(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg gradient-primary hover:scale-110 transition-all duration-300 z-50 group"
          size="icon"
        >
          <img src={nirikshanLogo} alt="Niri" className="w-7 h-7" />
        </Button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[380px] h-[600px] bg-background border border-border rounded-2xl shadow-2xl flex flex-col z-50 fade-in scale-in overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <ChatbotParticles />
          </div>

          {/* Header */}
          <div className="gradient-primary text-white p-4 rounded-t-2xl flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <img src={nirikshanLogo} alt="Niri" className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">Niri</h3>
                <p className="text-xs text-white/80">AI Assistant • Online</p>
              </div>
            </div>
            <Button onClick={() => setIsOpen(false)} variant="ghost" size="icon" className="hover:bg-white/20 text-white">
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
              </div>
            ))}

            {isLoading && <TypingIndicator />}

            {/* Quick Replies after last assistant message */}
            {showQuickReplies && !isLoading && messages.length > 0 && messages[messages.length - 1]?.role === "assistant" && (
              <div className="flex flex-wrap gap-2 mt-2 mb-4 ml-12">
                {QUICK_OPTIONS.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(option)}
                    className="px-3 py-1.5 text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors border border-primary/20"
                  >
                    {option}
                  </button>
                ))}
              </div>
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
