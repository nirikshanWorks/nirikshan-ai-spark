import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Compass,
  GraduationCap,
  Building2,
  Sparkles,
  Zap,
  Cpu,
  BookOpen,
  Hammer,
  Repeat,
  ArrowDown,
  ArrowRight,
  ShieldCheck,
  Play,
  Check,
} from "lucide-react";

export const EcosystemDiagram: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string>("universities");
  const [isPulsing, setIsPulsing] = useState<boolean>(false);

  const audienceNodes = [
    {
      id: "schools",
      title: "Schools",
      desc: "Curiosity, ethics & foundational creativity",
      icon: Compass,
      color: "from-amber-500/20 to-orange-500/10",
      border: "border-amber-300",
      badge: "Foundation",
      connection: "Feeds early digital citizenship and ethical AI curiosity directly into higher education.",
    },
    {
      id: "universities",
      title: "Universities & Colleges",
      desc: "Industry-aligned skills, capstones & internships",
      icon: GraduationCap,
      color: "from-blue-500/20 to-cyan-500/10",
      border: "border-blue-300",
      badge: "Talent Pipeline",
      connection: "Transforms academic students into industry-ready builders through hands-on capstone engineering.",
    },
    {
      id: "industries",
      title: "Industries & Enterprises",
      desc: "Workforce upskilling, automation & AI solutions",
      icon: Building2,
      color: "from-purple-500/20 to-indigo-500/10",
      border: "border-purple-300",
      badge: "Economic Impact",
      connection: "Absorbs top talent and transforms operational departments with custom automated pipelines.",
    },
  ];

  const bridgeNodes = [
    {
      id: "upskilling",
      title: "AI Upskilling",
      desc: "Hands-on tools & practice",
      icon: Zap,
      connection: "Role-specific practice with state-of-the-art LLMs, APIs, and low-code agents.",
    },
    {
      id: "productivity",
      title: "10X Productivity",
      desc: "Time compression & quality",
      icon: Sparkles,
      connection: "Compressing 8-hour repetitive workloads into 45-minute high-leverage workflows.",
    },
    {
      id: "workforce",
      title: "AI-Ready Workforce",
      desc: "Agile, empowered teams",
      icon: Cpu,
      connection: "Establishing sustainable, self-sufficient team champions and standardized enterprise SOPs.",
    },
  ];

  const outcomeNodes = [
    {
      id: "learn",
      action: "LEARN",
      title: "Gain Skills & Knowledge",
      desc: "Master modern AI tools, prompt engineering, and machine intelligence with deep practical confidence.",
      icon: BookOpen,
      connection: "Move from passive tech observers to confident everyday AI operators.",
    },
    {
      id: "build",
      action: "BUILD",
      title: "Develop Practical Projects",
      desc: "Construct live prototypes, generative workflows, computer vision models, and verifiable portfolio pieces.",
      icon: Hammer,
      connection: "Produce tangible GitHub repositories, proof-of-concept MVPs, and automated agents.",
    },
    {
      id: "automate",
      action: "AUTOMATE",
      title: "Eliminate Repetitive Work",
      desc: "Streamline reporting, analysis, drafting, and data tasks to free human potential for strategic growth.",
      icon: Repeat,
      connection: "Systematically remove copy-paste overhead across all operational functions.",
    },
  ];

  const handlePulse = () => {
    setIsPulsing(true);
    setTimeout(() => {
      setIsPulsing(false);
    }, 2500);
  };

  const getActiveNodeDetail = () => {
    const allNodes = [...audienceNodes, ...bridgeNodes, ...outcomeNodes];
    return allNodes.find((n) => n.id === activeNode);
  };

  const activeDetail = getActiveNodeDetail();

  return (
    <section id="ecosystem" className="py-20 lg:py-28 bg-muted/20 border-b border-border text-foreground transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="outline" className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 bg-blue-50/60 dark:bg-blue-950/40 mb-3 px-3 py-1 text-xs">
            Integrated Model
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
            The Nirikshan AI Ecosystem
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            How academic institutions, individual professionals, and industrial enterprises connect through continuous AI enablement to produce lasting capability.
          </p>
        </div>

        {/* Interactive Pulse Action Bar */}
        <div className="flex items-center justify-between max-w-4xl mx-auto mb-6 px-2">
          <div className="text-xs font-semibold text-muted-foreground">
            Click any node below to trace its pathway through the ecosystem
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={handlePulse}
            disabled={isPulsing}
            className="text-xs h-8 border-border bg-card hover:bg-muted text-foreground font-semibold"
          >
            <Play className={`w-3.5 h-3.5 mr-1.5 text-blue-600 dark:text-blue-400 ${isPulsing ? "animate-spin" : ""}`} />
            <span>{isPulsing ? "Simulating Ecosystem Flow..." : "Simulate Ecosystem Flow"}</span>
          </Button>
        </div>

        {/* Desktop Visual Diagram */}
        <div className="hidden lg:block bg-card rounded-3xl border border-border p-8 lg:p-10 shadow-xl relative overflow-hidden">
          {/* Top Tier: The 3 Core Institutions */}
          <div className="grid grid-cols-3 gap-6 mb-6 relative z-10">
            {audienceNodes.map((node) => {
              const Icon = node.icon;
              const isSelected = activeNode === node.id;

              return (
                <button
                  key={node.id}
                  onClick={() => setActiveNode(node.id)}
                  className={`p-6 rounded-2xl border-2 text-center relative transition-all duration-300 ${
                    isSelected
                      ? `${node.border} bg-blue-50/40 dark:bg-blue-950/40 shadow-lg scale-[1.02] ring-2 ring-blue-500/40`
                      : "border-border bg-card hover:border-blue-400/50 hover:shadow-sm"
                  } ${isPulsing ? "animate-pulse" : ""}`}
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="secondary" className="bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-[10px]">
                      {node.badge}
                    </Badge>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors ${
                      isSelected ? "bg-blue-600 text-white" : "bg-muted border border-border text-blue-600 dark:text-blue-400"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-foreground mb-1">{node.title}</h4>
                  <p className="text-xs text-muted-foreground leading-snug">{node.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Connected Flow Arrows */}
          <div className="flex justify-around items-center text-muted-foreground/40 my-2">
            <ArrowDown className={`w-5 h-5 ${isPulsing ? "text-blue-600 dark:text-blue-400 animate-bounce" : ""}`} />
            <ArrowDown className={`w-5 h-5 ${isPulsing ? "text-blue-600 dark:text-blue-400 animate-bounce delay-100" : ""}`} />
            <ArrowDown className={`w-5 h-5 ${isPulsing ? "text-blue-600 dark:text-blue-400 animate-bounce delay-200" : ""}`} />
          </div>

          {/* Central Nirikshan AI Core Node & Connecting Bridge */}
          <div className="relative my-4 p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white shadow-2xl text-center border border-blue-800/40">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono font-bold mb-3 border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              CENTRAL CATALYST
            </div>
            <h3 className="text-2xl font-black tracking-tight text-white mb-2">
              Nirikshan AI Enablement Engine
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto mb-6">
              Synchronizing foundational training, workflow audits, custom AI pipelines, and continuous practitioner coaching.
            </p>

            {/* Bridge Nodes */}
            <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
              {bridgeNodes.map((b) => {
                const Icon = b.icon;
                const isSelected = activeNode === b.id;

                return (
                  <button
                    key={b.id}
                    onClick={() => setActiveNode(b.id)}
                    className={`p-3.5 rounded-xl text-left flex items-center gap-3 transition-all ${
                      isSelected
                        ? "bg-blue-600/40 border-2 border-cyan-400 shadow-md ring-2 ring-cyan-400/30 scale-105"
                        : "bg-white/10 hover:bg-white/15 border border-white/15"
                    }`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-blue-500/20 flex items-center justify-center text-cyan-300 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{b.title}</div>
                      <div className="text-[10px] text-slate-300 leading-tight">{b.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Connected Flow Arrows Down */}
          <div className="flex justify-around items-center text-muted-foreground/40 my-2">
            <ArrowDown className={`w-5 h-5 ${isPulsing ? "text-blue-600 dark:text-blue-400 animate-bounce delay-300" : ""}`} />
            <ArrowDown className={`w-5 h-5 ${isPulsing ? "text-blue-600 dark:text-blue-400 animate-bounce delay-300" : ""}`} />
            <ArrowDown className={`w-5 h-5 ${isPulsing ? "text-blue-600 dark:text-blue-400 animate-bounce delay-300" : ""}`} />
          </div>

          {/* Bottom Row: 3 Core Outcomes */}
          <div className="grid grid-cols-3 gap-6 mt-6 relative z-10">
            {outcomeNodes.map((outcome) => {
              const Icon = outcome.icon;
              const isSelected = activeNode === outcome.id;

              return (
                <button
                  key={outcome.id}
                  onClick={() => setActiveNode(outcome.id)}
                  className={`p-6 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 shadow-md ring-2 ring-blue-400/30 scale-[1.02]"
                      : "border-border bg-card hover:border-blue-400/50 shadow-sm hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-black font-mono px-2.5 py-0.5 rounded bg-blue-600 text-white">
                      {outcome.action}
                    </span>
                    <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400 ml-auto" />
                  </div>
                  <h4 className="text-base font-bold text-foreground mb-1">
                    {outcome.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {outcome.desc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Node Dynamic Inspection Drawer/Callout */}
          {activeDetail && (
            <div className="mt-8 p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-xs text-blue-950 dark:text-blue-100 flex items-start gap-3 animate-in fade-in slide-in-from-top-1">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-sm block mb-0.5 text-foreground">
                  Ecosystem Role: {activeDetail.title}
                </span>
                <p className="text-muted-foreground leading-relaxed">
                  {activeDetail.connection}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile / Tablet Vertical Flow with Click-to-Inspect */}
        <div className="lg:hidden space-y-6">
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-3">
              1. The Groups We Empower (Tap to inspect)
            </span>
            <div className="space-y-3">
              {audienceNodes.map((node) => (
                <div
                  key={node.id}
                  onClick={() => setActiveNode(node.id)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                    activeNode === node.id ? "bg-blue-50/80 dark:bg-blue-950/50 border-blue-400" : "bg-muted/40 border-border"
                  }`}
                >
                  <div className="font-bold text-foreground">{node.title}</div>
                  <div className="text-muted-foreground">{node.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center text-blue-600 dark:text-blue-400">
            <ArrowDown className="w-5 h-5" />
          </div>

          <div className="bg-slate-900 dark:bg-slate-950 text-white rounded-2xl p-6 text-center border border-slate-800">
            <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase block mb-1">
              2. Central Catalyst
            </span>
            <h3 className="text-xl font-bold mb-2">Nirikshan AI</h3>
            <p className="text-xs text-slate-300 mb-4">
              AI Upskilling → 10X Productivity → AI-Ready Workforce
            </p>
            <div className="space-y-2 text-left">
              {bridgeNodes.map((b) => (
                <div
                  key={b.id}
                  onClick={() => setActiveNode(b.id)}
                  className={`p-2.5 rounded-lg text-xs cursor-pointer transition-colors ${
                    activeNode === b.id ? "bg-blue-600 text-white" : "bg-white/10 text-slate-300 hover:bg-white/15"
                  }`}
                >
                  <span className="font-bold">{b.title}: </span>
                  <span>{b.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center text-blue-600 dark:text-blue-400">
            <ArrowDown className="w-5 h-5" />
          </div>

          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-3">
              3. Measurable Outcomes (Tap to inspect)
            </span>
            <div className="space-y-3">
              {outcomeNodes.map((outcome) => (
                <div
                  key={outcome.id}
                  onClick={() => setActiveNode(outcome.id)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                    activeNode === outcome.id ? "bg-blue-50/80 dark:bg-blue-950/50 border-blue-400" : "bg-muted/40 border-border"
                  }`}
                >
                  <span className="font-bold text-blue-600 dark:text-blue-400 block mb-0.5">
                    {outcome.action} — {outcome.title}
                  </span>
                  <span className="text-muted-foreground">{outcome.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
