import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Send,
  Brain,
  TrendingUp,
  AlertCircle,
  BarChart3,
  Loader2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SentimentResult {
  overall_sentiment: string;
  confidence: number;
  emotions: {
    joy: number;
    anger: number;
    fear: number;
    sadness: number;
    surprise: number;
    trust: number;
  };
  key_phrases: string[];
  summary: string;
  campaign_relevance: string;
}

const sampleTexts = [
  "The new infrastructure project has brought jobs and hope to our community. We are optimistic about the future.",
  "People are frustrated with the rising cost of living. The government has not done enough to address this issue.",
  "The youth rally was a massive success with thousands of enthusiastic supporters. The energy was incredible.",
  "Voters are concerned about water scarcity and agricultural reforms. Farmers need immediate support.",
];

const sentimentColors: Record<string, string> = {
  very_positive: "text-emerald-500",
  positive: "text-green-500",
  neutral: "text-yellow-500",
  negative: "text-orange-500",
  very_negative: "text-red-500",
};

const sentimentLabels: Record<string, string> = {
  very_positive: "Very Positive",
  positive: "Positive",
  neutral: "Neutral",
  negative: "Negative",
  very_negative: "Very Negative",
};

const emotionEmojis: Record<string, string> = {
  joy: "😊",
  anger: "😠",
  fear: "😨",
  sadness: "😢",
  surprise: "😮",
  trust: "🤝",
};

export const SentimentAnalysisDemo = () => {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyze = async (text: string) => {
    if (!text.trim()) {
      toast.error("Please enter some text to analyze.");
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke(
        "sentiment-analysis",
        { body: { text: text.trim() } }
      );

      if (error) {
        throw new Error(error.message || "Analysis failed");
      }

      if (data?.error) {
        toast.error(data.error);
        return;
      }

      setResult(data);
    } catch (err: any) {
      console.error("Sentiment analysis error:", err);
      toast.error(err.message || "Failed to analyze. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSample = (text: string) => {
    setInputText(text);
    analyze(text);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="mr-1.5 h-3 w-3" /> Live AI Demo
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Try Our <span className="text-gradient">Sentiment Analysis</span> AI
          </h2>
          <p className="text-muted-foreground text-lg">
            Enter any campaign-related text and see our AI analyze sentiment,
            emotions, and strategic relevance in real-time.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Input panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6 border border-border bg-card/80 backdrop-blur-sm h-full flex flex-col">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Brain className="text-primary" size={20} />
                Input Text
              </h3>

              <textarea
                className="w-full flex-1 min-h-[160px] rounded-xl bg-secondary/50 border border-border p-4 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                placeholder="Enter campaign text, speech excerpt, social media post, or public opinion statement..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />

              <Button
                className="mt-4 gradient-primary w-full"
                onClick={() => analyze(inputText)}
                disabled={isAnalyzing || !inputText.trim()}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Analyze Sentiment
                  </>
                )}
              </Button>

              <div className="mt-5">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                  Or try a sample:
                </p>
                <div className="flex flex-wrap gap-2">
                  {sampleTexts.map((t, i) => (
                    <button
                      key={i}
                      onClick={() => handleSample(t)}
                      disabled={isAnalyzing}
                      className="text-xs text-left px-3 py-2 rounded-lg border border-border bg-secondary/40 hover:bg-primary/10 hover:border-primary/30 transition-all text-muted-foreground hover:text-foreground disabled:opacity-50"
                    >
                      {t.slice(0, 50)}…
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Results panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="p-6 border border-border bg-card/80 backdrop-blur-sm h-full relative overflow-hidden">
              {/* Corner decoration */}
              <motion.div
                className="absolute top-0 right-0 w-32 h-32"
                style={{
                  background:
                    "radial-gradient(circle at 100% 0%, hsl(var(--primary) / 0.08), transparent 70%)",
                }}
              />

              <h3 className="font-bold text-lg mb-4 flex items-center gap-2 relative z-10">
                <BarChart3 className="text-primary" size={20} />
                Analysis Results
              </h3>

              <AnimatePresence mode="wait">
                {isAnalyzing ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 gap-4"
                  >
                    <motion.div
                      className="w-16 h-16 rounded-full border-2 border-primary/30 border-t-primary"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <p className="text-sm text-muted-foreground">
                      AI is processing your text...
                    </p>
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-primary"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                ) : result ? (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5 relative z-10"
                  >
                    {/* Overall sentiment */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">
                          Overall Sentiment
                        </p>
                        <p
                          className={`text-2xl font-bold ${
                            sentimentColors[result.overall_sentiment] ||
                            "text-foreground"
                          }`}
                        >
                          {sentimentLabels[result.overall_sentiment] ||
                            result.overall_sentiment}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">
                          Confidence
                        </p>
                        <p className="text-2xl font-bold text-foreground">
                          {result.confidence}%
                        </p>
                      </div>
                    </div>

                    {/* Emotion bars */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                        Emotion Breakdown
                      </p>
                      <div className="space-y-2.5">
                        {Object.entries(result.emotions).map(
                          ([emotion, value], idx) => (
                            <div key={emotion} className="flex items-center gap-3">
                              <span className="text-base w-6">
                                {emotionEmojis[emotion] || "•"}
                              </span>
                              <span className="text-xs capitalize text-muted-foreground w-16">
                                {emotion}
                              </span>
                              <div className="flex-1 h-2.5 bg-secondary rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${value}%` }}
                                  transition={{
                                    duration: 0.8,
                                    delay: idx * 0.1,
                                    ease: "easeOut",
                                  }}
                                />
                              </div>
                              <span className="text-xs font-mono text-muted-foreground w-8 text-right">
                                {value}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Key phrases */}
                    {result.key_phrases?.length > 0 && (
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                          Key Phrases
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {result.key_phrases.map((phrase, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                            >
                              <Badge
                                variant="secondary"
                                className="bg-primary/10 text-primary border-primary/20"
                              >
                                {phrase}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Summary */}
                    <div className="rounded-xl bg-primary/5 border border-primary/10 p-4">
                      <p className="text-sm text-foreground leading-relaxed">
                        📊 {result.summary}
                      </p>
                    </div>

                    {/* Campaign relevance */}
                    <div className="rounded-xl bg-accent/5 border border-accent/10 p-4">
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1 flex items-center gap-1.5">
                        <TrendingUp size={12} />
                        Campaign Insight
                      </p>
                      <p className="text-sm text-foreground leading-relaxed">
                        {result.campaign_relevance}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center gap-3"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <AlertCircle className="text-primary/50" size={28} />
                    </div>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      Enter text or click a sample to see AI-powered sentiment
                      analysis in action.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
