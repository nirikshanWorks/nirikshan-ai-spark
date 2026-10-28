import React from "react";
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
} from "lucide-react";

interface TenXHeroProps {
  onExploreProgrammes: () => void;
  onPartnerWithUs: () => void;
}

export const TenXHero: React.FC<TenXHeroProps> = ({
  onExploreProgrammes,
  onPartnerWithUs,
}) => {
  const journeyStages = [
    { name: "DISCOVER", step: "01", desc: "Identify Opportunities" },
    { name: "LEARN", step: "02", desc: "Master AI Tools" },
    { name: "APPLY", step: "03", desc: "Real-World Output" },
    { name: "AUTOMATE", step: "04", desc: "Streamline Workflows" },
    { name: "SCALE", step: "05", desc: "Enterprise Impact" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50/30 pt-28 pb-20 lg:pt-36 lg:pb-28 border-b border-slate-100">
      {/* Decorative ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-blue-400/10 via-indigo-400/10 to-violet-400/10 blur-3xl rounded-full" />
        <div className="absolute top-1/3 -right-24 w-96 h-96 bg-cyan-400/10 blur-3xl rounded-full" />
        <div className="absolute bottom-10 -left-20 w-80 h-80 bg-violet-400/10 blur-3xl rounded-full" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#0f172a 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center max-w-4xl mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            <span>NIRIKSHAN AI PRESENTS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-blue-900 font-medium">10X AI Productivity Initiative</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
            Building an{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              AI-Ready
            </span>{" "}
            Tomorrow
          </h1>

          {/* Supporting copy */}
          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto mb-9">
            Empowering people, institutions, and industries to{" "}
            <span className="font-semibold text-slate-900">learn, apply, automate, and scale</span> AI for real-world impact.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Button
              size="lg"
              onClick={onExploreProgrammes}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-7 py-6 text-base rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-200 group"
            >
              <span>Explore Our Programmes</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onPartnerWithUs}
              className="w-full sm:w-auto border-slate-300 hover:border-slate-400 text-slate-800 font-medium px-7 py-6 text-base rounded-xl bg-white hover:bg-slate-50 transition-all shadow-sm"
            >
              Partner With Us
            </Button>
          </div>

          {/* 10X Journey Representation */}
          <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xl shadow-slate-200/50 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-3 px-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-blue-600" />
                The 10X Productivity Journey
              </span>
              <span className="text-xs text-blue-600 font-medium hidden sm:inline-block">
                Structured 5-Stage Progression
              </span>
            </div>

            {/* Desktop timeline flow */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
              {journeyStages.map((stage, idx) => (
                <div
                  key={stage.name}
                  className="relative group p-3 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200/60 hover:border-blue-300 transition-all text-left"
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono text-slate-400 group-hover:text-blue-600 font-semibold">
                      {stage.step}
                    </span>
                    {idx < journeyStages.length - 1 && (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-500 hidden sm:block" />
                    )}
                  </div>
                  <div className="font-bold text-sm text-slate-900 group-hover:text-blue-700 tracking-wide">
                    {stage.name}
                  </div>
                  <div className="text-[11px] text-slate-500 line-clamp-1">
                    {stage.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hero Visual Composition: AI-assisted workflows & intelligent collaboration */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="relative rounded-2xl p-2 bg-gradient-to-b from-slate-200/70 to-slate-100/40 border border-slate-200/80 shadow-2xl">
            <div className="bg-slate-900 rounded-xl overflow-hidden text-white relative">
              {/* Window Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="ml-2 font-mono text-slate-300">nirikshan-ai // 10x-workspace.console</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-emerald-400 border-emerald-500/30 bg-emerald-950/30 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1.5" />
                    Interactive Workflow Hub
                  </Badge>
                </div>
              </div>

              {/* Composition Grid */}
              <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Column 1: AI Prompt & Analysis Pipeline */}
                <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/60">
                  <div className="flex items-center justify-between text-xs mb-3 text-slate-400 pb-2 border-b border-slate-700">
                    <span className="flex items-center gap-1.5 font-semibold text-slate-200">
                      <Zap className="w-3.5 h-3.5 text-cyan-400" />
                      Smart Task Synthesizer
                    </span>
                    <span className="text-[10px] bg-cyan-950/60 text-cyan-300 px-2 py-0.5 rounded font-mono">
                      ACTIVE
                    </span>
                  </div>
                  <div className="space-y-2.5 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-700/50 text-slate-300 font-mono">
                      <span className="text-blue-400">&gt;</span> Analyzing quarterly operational reports across 14 departments...
                    </div>
                    <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-800/40 text-blue-200">
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-semibold">AI Synthesis Engine</span>
                        <span className="text-blue-400 font-mono">100% Complete</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-1.5 rounded-full w-full" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-emerald-400 bg-emerald-950/30 p-2 rounded border border-emerald-800/30">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Executive brief generated in 42 seconds</span>
                    </div>
                  </div>
                </div>

                {/* Column 2: Workflow Automation & Connected Systems */}
                <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/60">
                  <div className="flex items-center justify-between text-xs mb-3 text-slate-400 pb-2 border-b border-slate-700">
                    <span className="flex items-center gap-1.5 font-semibold text-slate-200">
                      <Workflow className="w-3.5 h-3.5 text-indigo-400" />
                      Connected Workflows
                    </span>
                    <span className="text-[10px] bg-indigo-950/60 text-indigo-300 px-2 py-0.5 rounded font-mono">
                      4 AGENTS
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-700/40">
                      <span className="text-slate-300">Data Extraction Agent</span>
                      <Badge className="bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/20 text-[10px] py-0">
                        Synchronized
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-700/40">
                      <span className="text-slate-300">LLM Reasoning Node</span>
                      <Badge className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/20 text-[10px] py-0">
                        Processing
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-700/40">
                      <span className="text-slate-300">Automated Dispatcher</span>
                      <Badge className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/20 text-[10px] py-0">
                        Ready
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Column 3: High Leverage Outcomes */}
                <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/60 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-3 text-slate-400 pb-2 border-b border-slate-700">
                      <span className="flex items-center gap-1.5 font-semibold text-slate-200">
                        <TrendingUp className="w-3.5 h-3.5 text-violet-400" />
                        Human Capability Multiplier
                      </span>
                      <span className="text-[10px] bg-violet-950/60 text-violet-300 px-2 py-0.5 rounded font-mono">
                        PHILOSOPHY
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 italic mb-3 leading-relaxed">
                      "The objective isn't to replace people. The objective is to make people more capable."
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center pt-2 border-t border-slate-700/60">
                    <div className="bg-slate-900/70 p-2 rounded-lg">
                      <div className="text-xs text-slate-400">Manual Burden</div>
                      <div className="text-rose-400 font-bold text-sm">Minimized</div>
                    </div>
                    <div className="bg-slate-900/70 p-2 rounded-lg">
                      <div className="text-xs text-slate-400">Creative Focus</div>
                      <div className="text-emerald-400 font-bold text-sm">Maximized</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
