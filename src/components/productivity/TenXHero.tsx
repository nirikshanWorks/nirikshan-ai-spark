import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  ChevronRight,
  TrendingUp,
  Workflow,
  Cpu,
  Layers,
  CheckCircle2,
  Play,
  RotateCcw,
  Terminal,
  BookOpen,
  Compass,
  FileCheck,
  BarChart3,
  Bot,
  Sliders,
  Maximize2,
  ExternalLink,
} from "lucide-react";

interface TenXHeroProps {
  onExploreProgrammes: () => void;
  onPartnerWithUs: () => void;
}

export const TenXHero: React.FC<TenXHeroProps> = ({
  onExploreProgrammes,
  onPartnerWithUs,
}) => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simProgress, setSimProgress] = useState(100);
  const [viewTab, setViewTab] = useState<"console" | "visual">("console");

  const journeyStages = [
    { name: "DISCOVER", step: "01", desc: "Identify Opportunities", icon: Compass },
    { name: "LEARN", step: "02", desc: "Master AI Tools", icon: BookOpen },
    { name: "APPLY", step: "03", desc: "Real-World Output", icon: Zap },
    { name: "AUTOMATE", step: "04", desc: "Streamline Workflows", icon: Workflow },
    { name: "SCALE", step: "05", desc: "Enterprise Impact", icon: TrendingUp },
  ];

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += 20;
      setSimProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 180);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-background dark:to-blue-950/20 pt-28 pb-20 lg:pt-36 lg:pb-28 border-b border-border transition-colors duration-200">
      {/* Decorative ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-blue-400/15 via-indigo-400/10 to-violet-400/15 dark:from-blue-600/10 dark:via-indigo-600/10 dark:to-violet-600/10 blur-3xl rounded-full" />
        <div className="absolute top-1/3 -right-24 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-10 -left-20 w-80 h-80 bg-violet-400/10 dark:bg-violet-600/10 blur-3xl rounded-full" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center max-w-4xl mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 animate-pulse" />
            <span>NIRIKSHAN AI PRESENTS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-blue-900 dark:text-blue-200 font-medium">10X AI Productivity Initiative</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-[1.15] mb-6">
            Building an{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
              AI-Ready
            </span>{" "}
            Tomorrow
          </h1>

          {/* Supporting copy */}
          <p className="text-lg sm:text-xl text-muted-foreground font-normal leading-relaxed max-w-3xl mx-auto mb-9">
            Empowering people, institutions, and industries to{" "}
            <span className="font-semibold text-foreground">learn, apply, automate, and scale</span> AI for real-world impact.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Button
              size="lg"
              onClick={onExploreProgrammes}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-medium px-7 py-6 text-base rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-200 group"
            >
              <span>Explore Our Programmes</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onPartnerWithUs}
              className="w-full sm:w-auto border-border hover:bg-muted text-foreground font-medium px-7 py-6 text-base rounded-xl transition-all shadow-sm"
            >
              Partner With Us
            </Button>
          </div>

          {/* 10X Journey Representation - Interactive Tabs */}
          <div className="bg-card/95 backdrop-blur-md border border-border rounded-2xl p-4 sm:p-5 shadow-xl max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-3 px-2">
              <span className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                The 10X Productivity Journey
              </span>
              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium hidden sm:inline-flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5" />
                Click any stage to simulate in console below
              </span>
            </div>

            {/* Interactive stage buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
              {journeyStages.map((stage, idx) => {
                const isSelected = activeStage === idx;
                return (
                  <button
                    key={stage.name}
                    onClick={() => {
                      setActiveStage(idx);
                      setViewTab("console");
                    }}
                    className={`relative p-3 rounded-xl border text-left transition-all duration-200 ${
                      isSelected
                        ? "bg-blue-50/90 dark:bg-blue-950/60 border-blue-500 dark:border-blue-400 ring-2 ring-blue-400/20 shadow-md"
                        : "bg-muted/40 hover:bg-muted/70 border-border text-foreground"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span
                        className={`font-mono font-bold ${
                          isSelected ? "text-blue-600 dark:text-blue-400" : "text-muted-foreground"
                        }`}
                      >
                        {stage.step}
                      </span>
                      {idx < journeyStages.length - 1 && (
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 hidden sm:block" />
                      )}
                    </div>
                    <div
                      className={`font-bold text-sm tracking-wide ${
                        isSelected ? "text-blue-700 dark:text-blue-300" : "text-foreground"
                      }`}
                    >
                      {stage.name}
                    </div>
                    <div className="text-[11px] text-muted-foreground line-clamp-1">
                      {stage.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Hero Interactive Console + Visual Architecture Preview */}
        <div className="mt-10 max-w-5xl mx-auto">
          <div className="relative rounded-2xl p-2 bg-gradient-to-b from-slate-200/80 via-slate-100 to-slate-200/50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 border border-border shadow-2xl">
            <div className="bg-slate-950 rounded-xl overflow-hidden text-white relative">
              {/* Window Bar with View Switcher */}
              <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="ml-2 font-mono text-slate-300">
                    nirikshan-ai // 10x-workspace [STAGE_{journeyStages[activeStage].step}:_{journeyStages[activeStage].name}]
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* View Switcher: Console vs Visual Image */}
                  <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-[11px]">
                    <button
                      onClick={() => setViewTab("console")}
                      className={`px-2.5 py-1 rounded transition-colors ${
                        viewTab === "console" ? "bg-blue-600 text-white font-semibold" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Console View
                    </button>
                    <button
                      onClick={() => setViewTab("visual")}
                      className={`px-2.5 py-1 rounded transition-colors ${
                        viewTab === "visual" ? "bg-blue-600 text-white font-semibold" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      AI Platform Visual
                    </button>
                  </div>

                  {viewTab === "console" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleRunSimulation}
                      disabled={isSimulating}
                      className="h-7 text-xs bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 px-2.5"
                    >
                      {isSimulating ? (
                        <RotateCcw className="w-3.5 h-3.5 animate-spin mr-1.5" />
                      ) : (
                        <Play className="w-3.5 h-3.5 mr-1.5" />
                      )}
                      <span>Simulate</span>
                    </Button>
                  )}

                  <Badge variant="outline" className="text-emerald-400 border-emerald-500/30 bg-emerald-950/40 text-[11px]">
                    Live Engine
                  </Badge>
                </div>
              </div>

              {/* View 1: Console Content */}
              {viewTab === "console" ? (
                <div className="p-6 sm:p-8">
                  {activeStage === 0 && (
                    /* STAGE 01: DISCOVER */
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800">
                        <div className="flex items-center justify-between text-xs mb-3 text-slate-400 pb-2 border-b border-slate-800">
                          <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                            <Compass className="w-3.5 h-3.5 text-blue-400" />
                            Workflow Audit Scanner
                          </span>
                          <Badge className="bg-blue-900/40 text-blue-300 text-[10px]">DIAGNOSTIC</Badge>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-300">
                            <span className="text-rose-400 font-bold block mb-0.5">Identified Friction 1</span>
                            Manual data compilation across 4 fragmented ERP reports (2.5 hrs/day)
                          </div>
                          <div className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-300">
                            <span className="text-amber-400 font-bold block mb-0.5">Identified Friction 2</span>
                            Repetitive customer email triage and quotation drafting (3 hrs/day)
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800">
                        <div className="flex items-center justify-between text-xs mb-3 text-slate-400 pb-2 border-b border-slate-800">
                          <span className="font-semibold text-slate-200">AI Readiness Score</span>
                          <span className="text-emerald-400 font-mono font-bold">88 / 100</span>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="text-slate-400">Structured Data Availability: <span className="text-white font-semibold">High</span></div>
                          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-blue-500 h-1.5 w-4/5" />
                          </div>
                          <div className="text-slate-400 mt-2">Team Prompt Proficiency: <span className="text-amber-400 font-semibold">Developing</span></div>
                          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-amber-500 h-1.5 w-1/2" />
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
                        <div>
                          <div className="text-xs font-semibold text-slate-200 mb-2 flex items-center gap-1.5">
                            <Target className="w-3.5 h-3.5 text-cyan-400" />
                            Recommended Opportunity
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            Prioritize automated briefing pipeline + customer support agent. Estimated departmental time recovery: <strong>~14 hours/week</strong>.
                          </p>
                        </div>
                        <Badge className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs py-1 mt-4">
                          ✓ Opportunity Canvas Ready
                        </Badge>
                      </div>
                    </div>
                  )}

                  {activeStage === 1 && (
                    /* STAGE 02: LEARN */
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800">
                        <div className="text-xs font-semibold text-slate-200 mb-3 flex items-center gap-1.5 pb-2 border-b border-slate-800">
                          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                          Prompt Architecture Studio
                        </div>
                        <div className="p-2.5 rounded bg-slate-950 text-xs font-mono text-cyan-300 space-y-1">
                          <div><span className="text-slate-500">ROLE:</span> Enterprise Intelligence Analyst</div>
                          <div><span className="text-slate-500">TASK:</span> Extract risks & metrics from Q3 P&L</div>
                          <div><span className="text-slate-500">FORMAT:</span> Executive Markdown Table</div>
                        </div>
                      </div>

                      <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800">
                        <div className="text-xs font-semibold text-slate-200 mb-3 pb-2 border-b border-slate-800">
                          Targeted Tool Stack
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {["Claude 3.5 Sonnet", "ChatGPT Team", "Perplexity Pro", "Cursor AI", "Make.com"].map((tool) => (
                            <span key={tool} className="text-[11px] bg-slate-800 text-blue-300 px-2 py-1 rounded border border-slate-700">
                              {tool}
                            </span>
                          ))}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-4">
                          Structured exercises using real enterprise data rather than toy examples.
                        </div>
                      </div>

                      <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
                        <div>
                          <div className="text-xs font-semibold text-slate-200 mb-2">Confidence Metric</div>
                          <div className="text-3xl font-extrabold text-blue-400 font-mono">100%</div>
                          <p className="text-xs text-slate-400 mt-1">
                            Hands-on labs ensure zero fear of hallucination or data leakage.
                          </p>
                        </div>
                        <Badge className="bg-blue-950 text-blue-300 border border-blue-800 text-xs py-1">
                          Prompt Vault Mastered
                        </Badge>
                      </div>
                    </div>
                  )}

                  {activeStage === 2 && (
                    /* STAGE 03: APPLY */
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800">
                        <div className="text-xs font-semibold text-slate-200 mb-2 flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-cyan-400" />
                          Live Task Execution
                        </div>
                        <div className="p-2.5 rounded bg-slate-950 font-mono text-xs text-slate-300 mb-3">
                          <span className="text-blue-400">&gt;</span> Generating 12-page market competitor report...
                        </div>
                        <div className="space-y-1 text-[11px]">
                          <div className="flex justify-between text-slate-400">
                            <span>AI Synthesis:</span>
                            <span className="text-cyan-400 font-bold">{simProgress}%</span>
                          </div>
                          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-cyan-400 h-1.5 rounded-full transition-all duration-200"
                              style={{ width: `${simProgress}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800">
                        <div className="text-xs font-semibold text-slate-200 mb-2">Quality & Verification</div>
                        <div className="space-y-1.5 text-xs text-slate-300">
                          <div className="flex items-center gap-1.5 text-emerald-400">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Citations & sources validated
                          </div>
                          <div className="flex items-center gap-1.5 text-emerald-400">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Financial calculations cross-checked
                          </div>
                          <div className="flex items-center gap-1.5 text-emerald-400">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Human reviewer sign-off ready
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
                        <div>
                          <div className="text-xs font-semibold text-slate-200 mb-1">Time To First Complete Draft</div>
                          <div className="text-3xl font-extrabold text-emerald-400 font-mono">18 Mins</div>
                          <div className="text-[11px] text-slate-400">Down from 6.5 manual hours</div>
                        </div>
                        <Badge className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs py-1">
                          High Quality Deliverable
                        </Badge>
                      </div>
                    </div>
                  )}

                  {activeStage === 3 && (
                    /* STAGE 04: AUTOMATE */
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800">
                        <div className="text-xs font-semibold text-slate-200 mb-3 flex items-center gap-1.5 pb-2 border-b border-slate-800">
                          <Workflow className="w-3.5 h-3.5 text-indigo-400" />
                          Multi-Step Agent Pipeline
                        </div>
                        <div className="space-y-1.5 text-xs">
                          <div className="p-2 rounded bg-slate-950 flex justify-between items-center text-slate-300">
                            <span>1. Email Ingestion Trigger</span>
                            <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 rounded">AUTO</span>
                          </div>
                          <div className="p-2 rounded bg-slate-950 flex justify-between items-center text-slate-300">
                            <span>2. Claude Parser & Classifier</span>
                            <span className="text-[10px] bg-blue-950 text-blue-300 px-1.5 rounded">LLM</span>
                          </div>
                          <div className="p-2 rounded bg-slate-950 flex justify-between items-center text-slate-300">
                            <span>3. CRM Record Sync</span>
                            <span className="text-[10px] bg-purple-950 text-purple-300 px-1.5 rounded">API</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800">
                        <div className="text-xs font-semibold text-slate-200 mb-3 pb-2 border-b border-slate-800">
                          Manual Friction Reduced
                        </div>
                        <div className="text-3xl font-extrabold text-indigo-400 font-mono mb-1">92%</div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Copy-paste between databases and email threads eliminated with autonomous error alerting.
                        </p>
                      </div>

                      <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
                        <div>
                          <div className="text-xs font-semibold text-slate-200 mb-2">Consistency Benchmark</div>
                          <p className="text-xs text-slate-300">
                            Zero missed follow-ups, 24/7 turnaround speed, standard tone and brand adherence.
                          </p>
                        </div>
                        <Badge className="bg-indigo-950 text-indigo-300 border border-indigo-800 text-xs py-1">
                          Turnkey Automated Flow
                        </Badge>
                      </div>
                    </div>
                  )}

                  {activeStage === 4 && (
                    /* STAGE 05: SCALE */
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800">
                        <div className="text-xs font-semibold text-slate-200 mb-3 flex items-center gap-1.5 pb-2 border-b border-slate-800">
                          <TrendingUp className="w-3.5 h-3.5 text-violet-400" />
                          Enterprise Adoption Matrix
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between text-slate-300">
                            <span>Departments Active:</span>
                            <span className="font-bold text-white">8 Business Units</span>
                          </div>
                          <div className="flex justify-between text-slate-300">
                            <span>AI Champions Certified:</span>
                            <span className="font-bold text-cyan-300">24 Leads</span>
                          </div>
                          <div className="flex justify-between text-slate-300">
                            <span>Standard SOPs Deployed:</span>
                            <span className="font-bold text-emerald-400">100% Complete</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800">
                        <div className="text-xs font-semibold text-slate-200 mb-3 pb-2 border-b border-slate-800">
                          Cumulative Organizational Velocity
                        </div>
                        <div className="text-3xl font-extrabold text-violet-400 font-mono mb-1">10X Output</div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Teams execute multi-week campaigns in days without requiring proportional hiring spikes.
                        </p>
                      </div>

                      <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
                        <div>
                          <div className="text-xs font-semibold text-slate-200 mb-2">Sustainable Transformation</div>
                          <p className="text-xs text-slate-300">
                            Continuous monthly tool updates, risk audits, and practitioner coaching ensure long-term competitive advantage.
                          </p>
                        </div>
                        <Badge className="bg-violet-950 text-violet-300 border border-violet-800 text-xs py-1">
                          Enterprise AI Playbook
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* View 2: High-Resolution AI Platform Visual */
                <div className="p-6 relative">
                  <div className="relative rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
                    <img
                      src="/src/assets/mockup-ai-dashboard.jpg"
                      alt="Nirikshan AI 10X Productivity Dashboard"
                      className="w-full h-auto object-cover max-h-[420px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                      <div>
                        <span className="font-bold text-white block text-sm">
                          Enterprise AI Transformation Platform
                        </span>
                        <span className="text-slate-300">
                          Integrated multi-agent workflows, prompt vaults, and continuous team tracking.
                        </span>
                      </div>
                      <Badge className="bg-blue-600 text-white shrink-0">
                        Production Ready
                      </Badge>
                    </div>
                  </div>
                </div>
              )}

              {/* Console Footer */}
              <div className="px-6 py-3 bg-slate-900/90 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span>Interactive 10X Framework console: Click stages above (01-05) to simulate in real time</span>
                </div>
                <div className="text-slate-400 font-mono text-[11px]">
                  Nirikshan AI Framework Engine v2.4
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
