import React, { useState, useMemo } from "react";
import { LEARNING_DOMAINS, ADDITIONAL_TOPICS, LearningDomain } from "@/data/tenXProductivityData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Zap,
  Sparkles,
  Code2,
  BarChart3,
  GraduationCap,
  Cpu,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Layers,
  Search,
  Wrench,
  Laptop,
  Check,
  X,
} from "lucide-react";

export const LearningDomainsGrid: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<LearningDomain | null>(null);
  const [modalTab, setModalTab] = useState<"syllabus" | "tools" | "capstone">("syllabus");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const getDomainIcon = (iconName: string) => {
    switch (iconName) {
      case "Zap":
        return Zap;
      case "Sparkles":
        return Sparkles;
      case "Code2":
        return Code2;
      case "BarChart3":
        return BarChart3;
      case "GraduationCap":
        return GraduationCap;
      case "Cpu":
        return Cpu;
      default:
        return Zap;
    }
  };

  const domainExtras: Record<
    string,
    { tools: string[]; capstone: string; prerequisites: string }
  > = {
    "domain-productivity": {
      tools: ["ChatGPT Team", "Claude 3.5 Sonnet", "Perplexity Pro", "Gamma App", "Notion AI"],
      capstone: "Construct an executive-ready market research brief & automated 12-slide deck in under 30 minutes.",
      prerequisites: "No coding required. Ideal for general knowledge workers, managers, and educators.",
    },
    "domain-genai": {
      tools: ["OpenAI API", "Anthropic Claude", "LangChain / LlamaIndex", "ChromaDB", "Hugging Face"],
      capstone: "Develop a RAG-powered private knowledge assistant that answers domain questions over 50 enterprise PDFs.",
      prerequisites: "Basic Python or comfortable understanding of prompt engineering mechanics.",
    },
    "domain-developers": {
      tools: ["Cursor", "GitHub Copilot", "Supermaven", "Postman AI", "Docker", "FastAPI"],
      capstone: "Scaffold, test, and containerize a secure multi-endpoint API with 90%+ test coverage using AI pair-programming.",
      prerequisites: "Familiarity with at least one programming language (Python, JavaScript/TypeScript, Java).",
    },
    "domain-business": {
      tools: ["Advanced Data Analysis", "Julius AI", "PowerBI AI", "Tableau Copilot", "HubSpot AI"],
      capstone: "Build an automated quarterly performance scorecard with trend forecasts, customer sentiment, and anomaly flags.",
      prerequisites: "General business or operational background; basic spreadsheet familiarity.",
    },
    "domain-education": {
      tools: ["Khanmigo", "Claude Classroom Prompts", "Turnitin AI Review", "Canva Magic Studio"],
      capstone: "Design an entire 4-week personalized adaptive curriculum module with rubric, slides, and assessment bank.",
      prerequisites: "Teachers, professors, curriculum designers, and academic administrative staff.",
    },
    "domain-advanced": {
      tools: ["PyTorch", "TensorFlow", "YOLOv8 / YOLOv11", "OpenCV", "NVIDIA TensorRT", "Jetson Orin"],
      capstone: "Train and deploy a sub-second real-time edge computer vision model for PPE detection or visual defect inspection.",
      prerequisites: "Intermediate Python, linear algebra, and machine learning fundamentals.",
    },
  };

  const filteredDomains = useMemo(() => {
    return LEARNING_DOMAINS.filter((d) => {
      let matchesCat = true;
      if (categoryFilter === "productivity") matchesCat = d.id === "domain-productivity" || d.id === "domain-genai";
      if (categoryFilter === "engineering") matchesCat = d.id === "domain-developers" || d.id === "domain-advanced";
      if (categoryFilter === "business") matchesCat = d.id === "domain-business" || d.id === "domain-education";

      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        matchesSearch =
          d.title.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.topics.some((t) => t.toLowerCase().includes(q));
      }

      return matchesCat && matchesSearch;
    });
  }, [categoryFilter, searchQuery]);

  return (
    <section id="domains" className="py-20 lg:py-28 bg-background border-b border-border transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="outline" className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 bg-blue-50/60 dark:bg-blue-950/40 mb-3 px-3 py-1 text-xs">
            Comprehensive Curriculum Architecture
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
            Six Core AI Learning Domains
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Our modular training framework spans fundamental workplace productivity up to advanced neural architectures and computer vision implementations.
          </p>
        </div>

        {/* Interactive Search & Filter Toolbar */}
        <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 mb-12 max-w-4xl mx-auto shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                type="text"
                placeholder="Search topics (e.g. Prompt, RAG, Code, Vision)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-8 text-xs h-9 bg-background border-border text-foreground"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              {[
                { id: "all", label: "All Domains (6)" },
                { id: "productivity", label: "Productivity & GenAI" },
                { id: "engineering", label: "Code & Advanced" },
                { id: "business", label: "Business & Education" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                    categoryFilter === cat.id
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-muted/40 text-muted-foreground border-border hover:bg-muted"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 6 Domains Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-14">
          {filteredDomains.map((domain) => {
            const Icon = getDomainIcon(domain.icon);
            const extra = domainExtras[domain.id];

            return (
              <div
                key={domain.id}
                className="group relative rounded-2xl bg-card border border-border hover:border-blue-400 dark:hover:border-blue-500 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Number and Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-2xl font-black text-muted-foreground/40 group-hover:text-blue-500 transition-colors">
                      {domain.number}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/70 border border-blue-200/80 dark:border-blue-800/80 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {domain.title}
                  </h3>
                  <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-3">
                    {domain.tagline}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-muted-foreground mb-5 leading-relaxed">
                    {domain.description}
                  </p>

                  {/* Sample Topics Preview with highlighting */}
                  <div className="space-y-1.5 mb-6">
                    <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
                      Key Topics Covered
                    </div>
                    {domain.topics.slice(0, 4).map((topic, tIdx) => {
                      const isHighlighted =
                        searchQuery &&
                        topic.toLowerCase().includes(searchQuery.toLowerCase());

                      return (
                        <div
                          key={tIdx}
                          className={`flex items-center gap-2 text-xs transition-colors ${
                            isHighlighted
                              ? "text-blue-800 dark:text-blue-200 font-bold bg-blue-50 dark:bg-blue-950/60 p-1 rounded"
                              : "text-foreground/90"
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                          <span className="truncate">{topic}</span>
                        </div>
                      );
                    })}
                    {domain.topics.length > 4 && (
                      <div className="text-[11px] text-muted-foreground pl-5 italic">
                        +{domain.topics.length - 4} more specialized topics
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedDomain(domain);
                      setModalTab("syllabus");
                    }}
                    className="w-full justify-between text-foreground hover:text-blue-600 hover:border-blue-300 dark:hover:border-blue-600 text-xs font-semibold h-10 rounded-xl"
                  >
                    <span>Inspect Curriculum & Lab</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Cross-Cutting Topics Strip */}
        <div className="bg-card border border-border rounded-2xl p-6 text-center shadow-xs">
          <div className="flex items-center justify-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Cross-Cutting Competencies Embedded In Every Domain</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {ADDITIONAL_TOPICS.map((topic) => (
              <Badge
                key={topic}
                variant="secondary"
                onClick={() => setSearchQuery(topic)}
                className="bg-muted/60 text-foreground border border-border px-3 py-1 text-xs font-medium hover:border-blue-400 hover:text-blue-600 cursor-pointer transition-colors"
              >
                {topic}
              </Badge>
            ))}
          </div>
        </div>

        {/* Domain Interactive Detail Modal */}
        <Dialog open={!!selectedDomain} onOpenChange={(open) => !open && setSelectedDomain(null)}>
          <DialogContent className="max-w-2xl bg-card border-border text-foreground p-6 sm:p-8">
            {selectedDomain && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400 font-bold mb-1">
                    <span>DOMAIN {selectedDomain.number}</span>
                    <span>•</span>
                    <span>{selectedDomain.tagline}</span>
                  </div>
                  <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
                    {selectedDomain.title}
                  </DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground pt-1 leading-relaxed">
                    {selectedDomain.description}
                  </DialogDescription>
                </DialogHeader>

                {/* Modal Tab Switcher */}
                <div className="flex items-center gap-2 border-b border-border mt-5 pb-2 text-xs font-semibold">
                  <button
                    onClick={() => setModalTab("syllabus")}
                    className={`pb-2 px-1 border-b-2 transition-all ${
                      modalTab === "syllabus"
                        ? "border-blue-600 text-blue-600 dark:text-blue-400"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Complete Syllabus
                  </button>
                  <button
                    onClick={() => setModalTab("tools")}
                    className={`pb-2 px-1 border-b-2 transition-all ${
                      modalTab === "tools"
                        ? "border-blue-600 text-blue-600 dark:text-blue-400"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Tools & Prerequisites
                  </button>
                  <button
                    onClick={() => setModalTab("capstone")}
                    className={`pb-2 px-1 border-b-2 transition-all ${
                      modalTab === "capstone"
                        ? "border-blue-600 text-blue-600 dark:text-blue-400"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Hands-On Capstone
                  </button>
                </div>

                {/* Tab 1: Syllabus */}
                {modalTab === "syllabus" && (
                  <div className="mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-muted/30 p-4 rounded-xl border border-border max-h-72 overflow-y-auto">
                      {selectedDomain.topics.map((topic, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-foreground/90">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 2: Tools & Prerequisites */}
                {modalTab === "tools" && (
                  <div className="mt-4 space-y-4">
                    <div className="p-4 rounded-xl bg-muted/30 border border-border">
                      <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        Software & Platforms Mastered
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {domainExtras[selectedDomain.id]?.tools.map((tool) => (
                          <Badge key={tool} className="bg-card text-foreground border-border text-xs">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-muted/30 border border-border">
                      <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                        <Laptop className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        Learner Prerequisites
                      </span>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {domainExtras[selectedDomain.id]?.prerequisites}
                      </p>
                    </div>
                  </div>
                )}

                {/* Tab 3: Capstone */}
                {modalTab === "capstone" && (
                  <div className="mt-4">
                    <div className="p-5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-900 text-xs">
                      <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-2" />
                      <div className="font-bold text-sm text-foreground mb-1">
                        Featured Practical Capstone Project
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {domainExtras[selectedDomain.id]?.capstone}
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Customizable for School, College & Enterprise Cohorts
                  </span>
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedDomain(null);
                      const el = document.getElementById("contact-inquiry");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4"
                  >
                    Inquire for this Curriculum
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
