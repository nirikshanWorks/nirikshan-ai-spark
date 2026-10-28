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
} from "lucide-react";

export const WorkflowComparison: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"both" | "traditional" | "aiAssisted">("both");

  const supportAreas = [
    { icon: Search, label: "In-Depth Research", desc: "Cross-referencing papers, reports & market data" },
    { icon: FileText, label: "Content Creation", desc: "Drafting proposals, executive summaries & briefs" },
    { icon: PieChart, label: "Data Analysis", desc: "Extracting patterns, numbers & visual summaries" },
    { icon: Code, label: "Assisted Coding", desc: "Fast scaffolding, unit testing & debugging" },
    { icon: BrainCircuit, label: "Decision Support", desc: "Scenario modeling & multi-angle evaluations" },
    { icon: Layers, label: "Repetitive Tasks", desc: "Formatting, data transfers & system syncing" },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-100 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50/50 mb-3 px-3 py-1 text-xs">
            The Paradigm Shift
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            AI Is Changing How Work Gets Done.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            AI is no longer an experimental curiosity. Today, it accelerates research, content drafting, deep data analysis, software coding, and executive decision-making.
          </p>
        </div>

        {/* Areas AI Supports Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-16">
          {supportAreas.map((area) => {
            const Icon = area.icon;
            return (
              <div
                key={area.label}
                className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/60 hover:bg-blue-50/40 hover:border-blue-200 transition-all text-center group"
              >
                <div className="w-10 h-10 rounded-lg bg-white shadow-sm border border-slate-200 flex items-center justify-center mx-auto mb-2.5 text-blue-600 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="font-semibold text-xs text-slate-900 mb-1">{area.label}</div>
                <div className="text-[11px] text-slate-500 leading-snug">{area.desc}</div>
              </div>
            );
          })}
        </div>

        {/* Workflow Comparison Split Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-stretch">
          {/* Traditional Workflow Card */}
          <div className="rounded-2xl border-2 border-slate-200 bg-slate-50/70 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-slate-200 text-slate-600 text-[11px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
              Traditional Workflow
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Manual Linear Effort</h3>
                  <p className="text-xs text-slate-500">Repetitive, time-consuming & siloed</p>
                </div>
              </div>

              {/* 4-Step Diagram */}
              <div className="space-y-3 my-6">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 text-sm">
                  <span className="w-6 h-6 rounded-full bg-slate-100 font-mono text-xs font-bold flex items-center justify-center text-slate-600">
                    1
                  </span>
                  <span className="font-semibold text-slate-800">Human</span>
                  <span className="text-slate-400 text-xs">— Faces a blank canvas or queue</span>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="w-4 h-4 text-slate-300 rotate-90" />
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 text-sm">
                  <span className="w-6 h-6 rounded-full bg-slate-100 font-mono text-xs font-bold flex items-center justify-center text-slate-600">
                    2
                  </span>
                  <span className="font-semibold text-slate-800">Task Definition</span>
                  <span className="text-slate-400 text-xs">— Scoping goals manually</span>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="w-4 h-4 text-slate-300 rotate-90" />
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-rose-50/80 border border-rose-200 text-sm">
                  <span className="w-6 h-6 rounded-full bg-rose-100 font-mono text-xs font-bold flex items-center justify-center text-rose-600">
                    3
                  </span>
                  <span className="font-semibold text-rose-900">Manual Work</span>
                  <span className="text-rose-700 text-xs">— Hours spent on repetitive typing & searching</span>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="w-4 h-4 text-slate-300 rotate-90" />
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 text-sm">
                  <span className="w-6 h-6 rounded-full bg-slate-100 font-mono text-xs font-bold flex items-center justify-center text-slate-600">
                    4
                  </span>
                  <span className="font-semibold text-slate-800">Result</span>
                  <span className="text-slate-400 text-xs">— Delayed turnaround, worker fatigue</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-rose-600 font-medium">
                <AlertTriangle className="w-3.5 h-3.5" /> High friction & cognitive drain
              </span>
              <span className="font-mono text-slate-600">Hours to Days</span>
            </div>
          </div>

          {/* AI-Assisted Workflow Card */}
          <div className="rounded-2xl border-2 border-blue-300 bg-gradient-to-b from-blue-50/50 via-white to-indigo-50/30 p-6 sm:p-8 flex flex-col justify-between relative shadow-xl shadow-blue-500/5 overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-[11px] font-bold px-3.5 py-1 rounded-bl-lg uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-300" />
              AI-Assisted Workflow
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Intelligent Human + AI Collaboration</h3>
                  <p className="text-xs text-blue-600 font-medium">Amplified capability, strategic focus & speed</p>
                </div>
              </div>

              {/* 4-Step Diagram */}
              <div className="space-y-3 my-6">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-blue-200 shadow-sm text-sm">
                  <span className="w-6 h-6 rounded-full bg-blue-100 font-mono text-xs font-bold flex items-center justify-center text-blue-700">
                    1
                  </span>
                  <span className="font-semibold text-slate-900">Human + AI</span>
                  <span className="text-blue-700 text-xs">— Prompting, directing & strategic intent</span>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="w-4 h-4 text-blue-400 rotate-90" />
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-blue-200 shadow-sm text-sm">
                  <span className="w-6 h-6 rounded-full bg-blue-100 font-mono text-xs font-bold flex items-center justify-center text-blue-700">
                    2
                  </span>
                  <span className="font-semibold text-slate-900">Automation</span>
                  <span className="text-blue-700 text-xs">— Repetitive grunt work handled instantly</span>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="w-4 h-4 text-blue-400 rotate-90" />
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-indigo-50 border border-indigo-200 shadow-sm text-sm">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 font-mono text-xs font-bold flex items-center justify-center text-indigo-700">
                    3
                  </span>
                  <span className="font-semibold text-indigo-950">Intelligence</span>
                  <span className="text-indigo-800 text-xs">— Multi-source synthesis & structured drafting</span>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="w-4 h-4 text-blue-400 rotate-90" />
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 shadow-sm text-sm">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 font-mono text-xs font-bold flex items-center justify-center text-emerald-700">
                    4
                  </span>
                  <span className="font-semibold text-emerald-950">Faster Result</span>
                  <span className="text-emerald-800 text-xs">— Human review & verified high-impact output</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-blue-200 text-xs flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> High leverage & creative flow
              </span>
              <span className="font-mono text-blue-700 font-bold">Minutes to Hours</span>
            </div>
          </div>
        </div>

        {/* Core Philosophy Callout Box */}
        <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-8 sm:p-10 text-center overflow-hidden shadow-xl max-w-4xl mx-auto">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />

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
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto">
            At Nirikshan AI, we believe technological progress is measured by human empowerment. When routine tasks are handled by intelligent systems, people can focus on creativity, strategy, empathy, and higher-order reasoning.
          </p>
        </div>
      </div>
    </section>
  );
};
