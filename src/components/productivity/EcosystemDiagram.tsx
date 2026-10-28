import React from "react";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";

export const EcosystemDiagram: React.FC = () => {
  const audienceNodes = [
    {
      title: "Schools",
      desc: "Curiosity, ethics & foundational creativity",
      icon: Compass,
      color: "from-amber-500/20 to-orange-500/10",
      border: "border-amber-300",
      badge: "Foundation",
    },
    {
      title: "Universities & Colleges",
      desc: "Industry-aligned skills, capstones & internships",
      icon: GraduationCap,
      color: "from-blue-500/20 to-cyan-500/10",
      border: "border-blue-300",
      badge: "Talent Pipeline",
    },
    {
      title: "Industries & Enterprises",
      desc: "Workforce upskilling, automation & AI solutions",
      icon: Building2,
      color: "from-purple-500/20 to-indigo-500/10",
      border: "border-purple-300",
      badge: "Economic Impact",
    },
  ];

  const bridgeNodes = [
    { title: "AI Upskilling", desc: "Hands-on tools & practice", icon: Zap },
    { title: "10X Productivity", desc: "Time compression & quality", icon: Sparkles },
    { title: "AI-Ready Workforce", desc: "Agile, empowered teams", icon: Cpu },
  ];

  const outcomeNodes = [
    {
      action: "LEARN",
      title: "Gain Skills & Knowledge",
      desc: "Master modern AI tools, prompt engineering, and machine intelligence with deep practical confidence.",
      icon: BookOpen,
      color: "text-blue-600 bg-blue-50 border-blue-200",
    },
    {
      action: "BUILD",
      title: "Develop Practical Projects",
      desc: "Construct live prototypes, generative workflows, computer vision models, and verifiable portfolio pieces.",
      icon: Hammer,
      color: "text-indigo-600 bg-indigo-50 border-indigo-200",
    },
    {
      action: "AUTOMATE",
      title: "Eliminate Repetitive Work",
      desc: "Streamline reporting, analysis, drafting, and data tasks to free human potential for strategic growth.",
      icon: Repeat,
      color: "text-violet-600 bg-violet-50 border-violet-200",
    },
  ];

  return (
    <section id="ecosystem" className="py-20 lg:py-28 bg-slate-50/70 border-b border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50/60 mb-3 px-3 py-1 text-xs">
            Integrated Model
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            The Nirikshan AI Ecosystem
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            How academic institutions, individual professionals, and industrial enterprises connect through continuous AI enablement to produce lasting capability.
          </p>
        </div>

        {/* Desktop Visual Diagram */}
        <div className="hidden lg:block bg-white rounded-3xl border border-slate-200/90 p-10 shadow-xl shadow-slate-200/40 relative overflow-hidden">
          {/* Subtle connecting watermark */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:20px_20px]" />

          {/* Top Tier: The 3 Core Institutions */}
          <div className="grid grid-cols-3 gap-6 mb-8 relative z-10">
            {audienceNodes.map((node) => {
              const Icon = node.icon;
              return (
                <div
                  key={node.title}
                  className={`p-6 rounded-2xl border-2 ${node.border} bg-white shadow-sm text-center relative hover:shadow-md transition-shadow`}
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="secondary" className="bg-slate-900 text-white text-[10px]">
                      {node.badge}
                    </Badge>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-3 text-blue-600">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-1">{node.title}</h4>
                  <p className="text-xs text-slate-500 leading-snug">{node.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Connected Flow Arrows */}
          <div className="flex justify-around items-center text-slate-300 my-2">
            <ArrowDown className="w-5 h-5 animate-bounce" />
            <ArrowDown className="w-5 h-5 animate-bounce delay-100" />
            <ArrowDown className="w-5 h-5 animate-bounce delay-200" />
          </div>

          {/* Central Nirikshan AI Core Node & Connecting Bridge */}
          <div className="relative my-6 p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white shadow-2xl text-center">
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
                return (
                  <div
                    key={b.title}
                    className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-left flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-lg bg-blue-500/20 flex items-center justify-center text-cyan-300 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{b.title}</div>
                      <div className="text-[10px] text-slate-300 leading-tight">{b.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Connected Flow Arrows Down */}
          <div className="flex justify-around items-center text-slate-300 my-2">
            <ArrowDown className="w-5 h-5" />
            <ArrowDown className="w-5 h-5" />
            <ArrowDown className="w-5 h-5" />
          </div>

          {/* Bottom Row: 3 Core Outcomes */}
          <div className="grid grid-cols-3 gap-6 mt-8 relative z-10">
            {outcomeNodes.map((outcome) => {
              const Icon = outcome.icon;
              return (
                <div
                  key={outcome.action}
                  className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-black font-mono px-2.5 py-0.5 rounded bg-blue-600 text-white">
                      {outcome.action}
                    </span>
                    <Icon className="w-4 h-4 text-blue-600 ml-auto" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-1">
                    {outcome.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {outcome.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile / Tablet Vertical Flow */}
        <div className="lg:hidden space-y-6">
          {/* Audiences */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
              1. The Groups We Empower
            </span>
            <div className="space-y-3">
              {audienceNodes.map((node) => (
                <div key={node.title} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div className="font-bold text-slate-900">{node.title}</div>
                  <div className="text-slate-500">{node.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center text-blue-600">
            <ArrowDown className="w-5 h-5" />
          </div>

          {/* Central Hub */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 text-center">
            <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase block mb-1">
              2. Central Catalyst
            </span>
            <h3 className="text-xl font-bold mb-2">Nirikshan AI</h3>
            <p className="text-xs text-slate-300 mb-4">
              AI Upskilling → 10X Productivity → AI-Ready Workforce
            </p>
            <div className="space-y-2 text-left">
              {bridgeNodes.map((b) => (
                <div key={b.title} className="p-2.5 rounded-lg bg-white/10 text-xs">
                  <span className="font-bold text-white">{b.title}: </span>
                  <span className="text-slate-300">{b.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center text-blue-600">
            <ArrowDown className="w-5 h-5" />
          </div>

          {/* Outcomes */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
              3. Measurable Outcomes
            </span>
            <div className="space-y-3">
              {outcomeNodes.map((outcome) => (
                <div key={outcome.action} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <span className="font-bold text-blue-700 block mb-0.5">
                    {outcome.action} — {outcome.title}
                  </span>
                  <span className="text-slate-600">{outcome.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
