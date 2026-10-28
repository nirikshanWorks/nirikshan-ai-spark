import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Clock,
  Zap,
  Sparkles,
  Bot,
  User,
  CheckCircle2,
  AlertTriangle,
  BrainCircuit,
  FileText,
  Search,
  Code,
  PieChart,
  Layers,
  Play,
  RotateCcw,
  Check,
  Timer,
  ChevronDown,
} from "lucide-react";

export const WorkflowComparison: React.FC = () => {
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [traditionalProgress, setTraditionalProgress] = useState(0);
  const [aiProgress, setAiProgress] = useState(0);
  const [activeAreaDetail, setActiveAreaDetail] = useState<string | null>(null);

  const workflowScenarios = [
    {
      title: "Executive Market Analysis",
      traditionalDuration: "8 Hours",
      aiDuration: "45 Minutes",
      traditionalSteps: [
        "Human manually browses dozens of browser tabs & articles",
        "Scoping and organizing notes on a blank notepad",
        "Manual Excel data cleaning & pivot table calculations",
        "Drafting 15 slide summaries and formatting by hand",
      ],
      aiSteps: [
        "Human directs AI research assistant to synthesize 20+ market reports",
        "AI generates structured outline & extracts numerical trends",
        "AI drafts executive briefing with cross-verified source citations",
        "Human verifies strategic nuances & delivers final high-impact deck",
      ],
      tools: ["Claude 3.5", "Perplexity Pro", "ChatGPT Data Analysis"],
    },
    {
      title: "Full-Stack Feature & API Development",
      traditionalDuration: "12 Hours",
      aiDuration: "1.5 Hours",
      traditionalSteps: [
        "Manual boilerplate coding & schema configuration",
        "Writing route handlers and manual SQL query joins",
        "Writing 25 unit tests from scratch & debugging edge cases",
        "Manual documentation creation & swagger config",
      ],
      aiSteps: [
        "AI agent generates typed schemas & route scaffolding from specs",
        "Developer prompts Cursor/Copilot for optimized logic & error traps",
        "AI generates comprehensive test suites covering edge cases in seconds",
        "Automated API docs generated; human conducts code review",
      ],
      tools: ["Cursor", "GitHub Copilot", "Supermaven", "Postman AI"],
    },
    {
      title: "Quarterly Financial Trend Audit",
      traditionalDuration: "6 Hours",
      aiDuration: "30 Minutes",
      traditionalSteps: [
        "Downloading disparate CSV files and manual format unification",
        "Writing complex VLOOKUPs and calculating variance lines",
        "Manually hunting down discrepancy outliers",
        "Drafting quarterly CFO narrative commentary",
      ],
      aiSteps: [
        "AI data engine ingests raw CSVs and normalizes headers instantly",
        "Automated statistical anomaly detection highlights variances",
        "Natural language CFO summary drafted highlighting margin changes",
        "Finance director reviews assumptions and signs off",
      ],
      tools: ["Advanced Data Analysis", "Julius AI", "PowerBI Copilot"],
    },
  ];

  const currentScenario = workflowScenarios[selectedTaskIndex];

  const supportAreas = [
    {
      id: "research",
      icon: Search,
      label: "In-Depth Research",
      desc: "Cross-referencing papers, reports & market data",
      example: "Synthesize 50-page industry whitepapers into a 2-page SWOT breakdown in 90 seconds.",
    },
    {
      id: "content",
      icon: FileText,
      label: "Content Creation",
      desc: "Drafting proposals, executive summaries & briefs",
      example: "Transform raw meeting bullet points into a formal client proposal with tailored pricing tiers.",
    },
    {
      id: "data",
      icon: PieChart,
      label: "Data Analysis",
      desc: "Extracting patterns, numbers & visual summaries",
      example: "Instant correlation discovery, automated charts, and natural language narrative from messy CSVs.",
    },
    {
      id: "code",
      icon: Code,
      label: "Assisted Coding",
      desc: "Fast scaffolding, unit testing & debugging",
      example: "10X faster full-stack boilerplate, automated unit tests, and instant legacy codebase explanation.",
    },
    {
      id: "decision",
      icon: BrainCircuit,
      label: "Decision Support",
      desc: "Scenario modeling & multi-angle evaluations",
      example: "Pressure-test operational strategies by simulating edge cases and competitor reactions.",
    },
    {
      id: "repetitive",
      icon: Layers,
      label: "Repetitive Tasks",
      desc: "Formatting, data transfers & system syncing",
      example: "Eliminate manual copy-pasting between emails, spreadsheets, CRMs, and project trackers.",
    },
  ];

  const runSimulation = () => {
    setIsSimulating(true);
    setTraditionalProgress(0);
    setAiProgress(0);

    let aiP = 0;
    const aiInterval = setInterval(() => {
      aiP += 25;
      setAiProgress(aiP);
      if (aiP >= 100) {
        clearInterval(aiInterval);
      }
    }, 120);

    let tradP = 0;
    const tradInterval = setInterval(() => {
      tradP += 10;
      setTraditionalProgress(tradP);
      if (tradP >= 100) {
        clearInterval(tradInterval);
        setIsSimulating(false);
      }
    }, 300);
  };

  return (
    <section className="py-20 lg:py-28 bg-background border-b border-border transition-colors duration-200 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 bg-blue-50/60 dark:bg-blue-950/40 mb-3 px-3 py-1 text-xs">
            The Paradigm Shift
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
            AI Is Changing How Work Gets Done.
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            AI is no longer an experimental curiosity. Today, it accelerates research, content drafting, deep data analysis, software coding, and executive decision-making.
          </p>
        </div>

        {/* Interactive Scenario Switcher & Simulation Controller */}
        <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 mb-10 max-w-4xl mx-auto shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider shrink-0 mr-1">
                Select Task:
              </span>
              {workflowScenarios.map((scen, idx) => (
                <button
                  key={scen.title}
                  onClick={() => {
                    setSelectedTaskIndex(idx);
                    setTraditionalProgress(0);
                    setAiProgress(0);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                    selectedTaskIndex === idx
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-muted/40 text-foreground border-border hover:bg-muted/70"
                  }`}
                >
                  {scen.title}
                </button>
              ))}
            </div>

            <Button
              size="sm"
              onClick={runSimulation}
              disabled={isSimulating}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 h-9 rounded-xl shadow-md shrink-0 w-full sm:w-auto"
            >
              {isSimulating ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  <span>Simulating Workflows...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 mr-1.5" />
                  <span>Run Live Comparison Simulation</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Workflow Comparison Split Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-stretch">
          {/* Traditional Workflow Card */}
          <div className="rounded-2xl border border-border bg-card/60 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all shadow-sm">
            <div className="absolute top-0 right-0 bg-muted text-muted-foreground text-[11px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Traditional: {currentScenario.traditionalDuration}
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">Manual Linear Effort</h3>
                  <p className="text-xs text-muted-foreground">Repetitive, high friction & unassisted</p>
                </div>
              </div>

              {/* Simulation Progress indicator */}
              {traditionalProgress > 0 && (
                <div className="mb-4 p-2.5 rounded-lg bg-background border border-border text-xs">
                  <div className="flex justify-between text-muted-foreground mb-1">
                    <span>Manual Task Progress:</span>
                    <span className="font-mono font-bold text-foreground">{traditionalProgress}%</span>
                  </div>
                  <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-rose-500 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${traditionalProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* 4-Step Diagram */}
              <div className="space-y-3 my-4">
                {currentScenario.traditionalSteps.map((stepText, sIdx) => {
                  const isCurrentActive =
                    isSimulating &&
                    traditionalProgress >= sIdx * 25 &&
                    traditionalProgress < (sIdx + 1) * 25;
                  const isDone = traditionalProgress >= (sIdx + 1) * 25;

                  return (
                    <div
                      key={sIdx}
                      className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-3 transition-all ${
                        isCurrentActive
                          ? "bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 shadow-sm"
                          : isDone
                          ? "bg-card border-border"
                          : "bg-muted/30 border-border/60 text-muted-foreground"
                      }`}
                    >
                      <span className="w-6 h-6 rounded-full bg-muted font-mono text-xs font-bold flex items-center justify-center text-muted-foreground shrink-0">
                        {sIdx + 1}
                      </span>
                      <span className="font-medium text-foreground leading-snug">{stepText}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-border text-xs text-muted-foreground flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-medium">
                <AlertTriangle className="w-3.5 h-3.5" /> High friction & worker fatigue
              </span>
              <span className="font-mono text-foreground font-bold">~{currentScenario.traditionalDuration}</span>
            </div>
          </div>

          {/* AI-Assisted Workflow Card */}
          <div className="rounded-2xl border-2 border-blue-400 dark:border-blue-700 bg-gradient-to-b from-blue-50/50 via-card to-indigo-50/30 dark:from-blue-950/30 dark:via-card dark:to-indigo-950/20 p-6 sm:p-8 flex flex-col justify-between relative shadow-xl shadow-blue-500/5 overflow-hidden transition-all">
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-[11px] font-bold px-3.5 py-1 rounded-bl-lg uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-300" />
              AI-Assisted: {currentScenario.aiDuration}
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">Intelligent Human + AI Collaboration</h3>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Amplified capability, strategic focus & speed</p>
                </div>
              </div>

              {/* Simulation Progress indicator */}
              {aiProgress > 0 && (
                <div className="mb-4 p-2.5 rounded-lg bg-card border border-blue-200 dark:border-blue-800 text-xs shadow-sm">
                  <div className="flex justify-between text-blue-700 dark:text-blue-300 mb-1">
                    <span className="font-semibold">AI Multiplier Acceleration:</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {aiProgress === 100 ? "Completed in seconds!" : `${aiProgress}%`}
                    </span>
                  </div>
                  <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-emerald-500 h-1.5 rounded-full transition-all duration-150"
                      style={{ width: `${aiProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* 4-Step Diagram */}
              <div className="space-y-3 my-4">
                {currentScenario.aiSteps.map((stepText, sIdx) => {
                  const isDone = aiProgress >= (sIdx + 1) * 25;

                  return (
                    <div
                      key={sIdx}
                      className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-3 transition-all ${
                        isDone
                          ? "bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-foreground font-medium shadow-sm"
                          : "bg-card border-blue-200/80 dark:border-blue-900 text-foreground"
                      }`}
                    >
                      <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950 font-mono text-xs font-bold flex items-center justify-center text-blue-700 dark:text-blue-300 shrink-0">
                        {sIdx + 1}
                      </span>
                      <span className="leading-snug">{stepText}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="pt-3 border-t border-border flex flex-wrap items-center gap-1.5 mb-3">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Tools Used:</span>
                {currentScenario.tools.map((t) => (
                  <Badge key={t} variant="secondary" className="bg-blue-100/70 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 text-[10px] py-0 border-transparent">
                    {t}
                  </Badge>
                ))}
              </div>

              <div className="pt-2 border-t border-border text-xs flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> High leverage & creative flow
                </span>
                <span className="font-mono text-blue-700 dark:text-blue-400 font-bold">~{currentScenario.aiDuration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Showcase: Collaborative Human + AI Workspace */}
        <div className="mb-16 rounded-2xl overflow-hidden border border-border bg-card p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3">
              <Badge className="bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-400/30 text-xs">
                Empowered Teams
              </Badge>
              <h3 className="text-2xl font-bold text-foreground">
                Human Creativity Amplified by Machine Intelligence
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Nirikshan AI trains knowledge workers and institutions to harness intelligent agents, automated data synthesizers, and real-time assistants — converting hours of manual copy-paste burden into high-order strategic creativity.
              </p>
              <div className="flex flex-wrap gap-2 pt-2 text-xs">
                <span className="px-2.5 py-1 rounded bg-muted text-foreground font-medium">85% Repetitive Overhead Reduced</span>
                <span className="px-2.5 py-1 rounded bg-muted text-foreground font-medium">Zero Hallucination Safeguards</span>
                <span className="px-2.5 py-1 rounded bg-muted text-foreground font-medium">Enterprise Data Isolation</span>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="relative rounded-xl overflow-hidden shadow-lg border border-border">
                <img
                  src="/src/assets/mockup-services-platform.jpg"
                  alt="Nirikshan AI Collaborative Workflow"
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-xs text-white font-medium">
                  Intelligent Collaborative Workspaces
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive 6 Support Areas with Click-to-Inspect Details */}
        <div className="mb-14">
          <div className="text-center mb-6">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1">
              Interactive Domain Inspector
            </span>
            <p className="text-xs text-muted-foreground">
              Click any area below to inspect concrete enterprise prompt examples
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {supportAreas.map((area) => {
              const Icon = area.icon;
              const isSelected = activeAreaDetail === area.id;

              return (
                <button
                  key={area.id}
                  onClick={() =>
                    setActiveAreaDetail((prev) => (prev === area.id ? null : area.id))
                  }
                  className={`p-4 rounded-xl border text-center transition-all text-left ${
                    isSelected
                      ? "bg-blue-50 dark:bg-blue-950/60 border-blue-400 dark:border-blue-600 shadow-md ring-2 ring-blue-300/40"
                      : "bg-card hover:bg-muted/50 border-border text-foreground"
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mx-auto mb-2 text-blue-600 dark:text-blue-400 shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="font-semibold text-xs text-foreground mb-0.5">{area.label}</div>
                  <div className="text-[11px] text-muted-foreground line-clamp-2">{area.desc}</div>
                </button>
              );
            })}
          </div>

          {/* Active Area Detail Expansion */}
          {activeAreaDetail && (
            <div className="mt-4 p-4 rounded-xl bg-blue-50/80 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-0.5">
                  Real-World 10X Application:{" "}
                  {supportAreas.find((a) => a.id === activeAreaDetail)?.label}
                </span>
                <p className="text-blue-800 dark:text-blue-300">
                  {supportAreas.find((a) => a.id === activeAreaDetail)?.example}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Core Philosophy Callout Box */}
        <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-8 sm:p-10 text-center overflow-hidden shadow-xl max-w-4xl mx-auto">
          <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 mb-4 px-3 py-1 text-xs">
            Core Philosophy
          </Badge>
          <blockquote className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-white mb-4 leading-snug">
            “The objective isn't to replace people.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 font-semibold">
              The objective is to make people more capable.
            </span>”
          </blockquote>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto">
            At Nirikshan AI, we believe technological progress is measured by human empowerment. When routine tasks are handled by intelligent systems, people can focus on creativity, strategy, empathy, and higher-order reasoning.
          </p>
        </div>
      </div>
    </section>
  );
};
