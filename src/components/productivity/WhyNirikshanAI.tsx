import React, { useState } from "react";
import { DIFFERENTIATORS, Differentiator } from "@/data/tenXProductivityData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import teamMockup from "@/assets/mockup-team.jpg";
import {
  GraduationCap,
  Briefcase,
  Cpu,
  Building2,
  Lightbulb,
  CheckCircle2,
  Sparkles,
  Layers,
  Check,
  X,
  HelpCircle,
  Users,
  Compass,
} from "lucide-react";

export const WhyNirikshanAI: React.FC = () => {
  const [viewMode, setViewMode] = useState<"pillars" | "comparison">("pillars");
  const [expandedPillar, setExpandedPillar] = useState<string | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case "GraduationCap":
        return GraduationCap;
      case "Briefcase":
        return Briefcase;
      case "Cpu":
        return Cpu;
      case "Building2":
        return Building2;
      case "Lightbulb":
        return Lightbulb;
      default:
        return Sparkles;
    }
  };

  // Extra in-practice real-world scenario per differentiator
  const differentiatorExtra: Record<string, string> = {
    Training:
      "Unlike passive video recordings, learners participate in live guided sprints where every concept is immediately reinforced through real-world typing and prompt testing.",
    "Real Projects":
      "Students and teams leave with actual working GitHub code repositories, automated workflow pipelines, or verified operational deliverables.",
    "AI Technology":
      "Direct exposure to enterprise-tier LLMs, Claude, vector databases, and Nirikshan AI's proprietary computer vision engines.",
    "Industry Exposure":
      "Practitioner-led masterclasses, guest reviews from enterprise tech leads, and direct alignment with current hiring market requirements.",
    "Research & Innovation":
      "Opportunities for students and researchers to collaborate on cutting-edge applied AI prototypes and hackathon challenges.",
  };

  const comparisonRows = [
    {
      factor: "Curriculum Approach",
      generic: "Passive video lectures & multiple-choice quizzes",
      consulting: "Theoretical slide decks without team upskilling",
      nirikshan: "Hands-on role-specific workflows & live practice",
    },
    {
      factor: "Tool Mastery",
      generic: "Basic ChatGPT prompt queries only",
      consulting: "Proprietary locked software toolchains",
      nirikshan: "Cursor, Claude, RAG, APIs, Vision & No-Code Agents",
    },
    {
      factor: "Capstones & Deliverables",
      generic: "Fictional dummy homework with no review",
      consulting: "Deliverable written by external agency",
      nirikshan: "Production GitHub repos & institutional playbooks",
    },
    {
      factor: "Audience Breadth",
      generic: "One-size-fits-all generic content",
      consulting: "C-suite executive decks only",
      nirikshan: "Tailored for Schools, Universities, Pros & Enterprises",
    },
    {
      factor: "Post-Training Adoption",
      generic: "Zero support once videos complete",
      consulting: "Expensive recurring monthly retainers",
      nirikshan: "Turnkey workflow pipelines & internal champions",
    },
  ];

  return (
    <section id="why-nirikshan" className="py-20 lg:py-28 bg-background border-b border-border text-foreground transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="outline" className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 bg-blue-50/60 dark:bg-blue-950/40 mb-3 px-3 py-1 text-xs">
            The Nirikshan Advantage
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
            More Than Training. A Complete AI Ecosystem.
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Combining industry needs, education, and technology to help people learn, build, apply, and create real-world impact.
          </p>
        </div>

        {/* Visual Mentorship & Innovation Banner */}
        <div className="mb-12 rounded-3xl overflow-hidden border border-border bg-card shadow-xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400 text-xs font-semibold border border-blue-500/20">
                <Users className="w-3.5 h-3.5" />
                <span>Live Practitioner Mentorship</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Hands-On Engineering with Real AI Researchers
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Nirikshan AI bridges academic theory with industry-scale implementation. Whether through university capstone labs or enterprise enablement sprints, participants work directly alongside seasoned AI practitioners who build computer vision, generative intelligence, and automated pipelines every single day.
              </p>
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-muted/40 border border-border">
                  <div className="text-base sm:text-lg font-black text-blue-600 dark:text-cyan-400">100%</div>
                  <div className="text-[11px] text-muted-foreground">Practical Sprints</div>
                </div>
                <div className="p-3 rounded-xl bg-muted/40 border border-border">
                  <div className="text-base sm:text-lg font-black text-blue-600 dark:text-cyan-400">Live</div>
                  <div className="text-[11px] text-muted-foreground">Code & Repos</div>
                </div>
                <div className="p-3 rounded-xl bg-muted/40 border border-border">
                  <div className="text-base sm:text-lg font-black text-blue-600 dark:text-cyan-400">Zero</div>
                  <div className="text-[11px] text-muted-foreground">Fluff / Slides Only</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 h-64 lg:h-full relative min-h-[260px] overflow-hidden">
              <img
                src={teamMockup}
                alt="Nirikshan AI team collaborating with practitioners and students"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-card via-transparent to-transparent opacity-90 lg:opacity-75 pointer-events-none" />
              <div className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-[11px] px-3 py-1.5 rounded-xl flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                <span>Applied AI Engineering Lab</span>
              </div>
            </div>
          </div>
        </div>

        {/* View Switcher: 5 Pillars vs Comparison Matrix */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setViewMode("pillars")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
              viewMode === "pillars"
                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                : "bg-card text-muted-foreground border-border hover:bg-muted hover:text-foreground"
            }`}
          >
            Explore 5 Ecosystem Pillars
          </button>
          <button
            onClick={() => setViewMode("comparison")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
              viewMode === "comparison"
                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                : "bg-card text-muted-foreground border-border hover:bg-muted hover:text-foreground"
            }`}
          >
            Comparative Benchmark Matrix
          </button>
        </div>

        {/* Mode 1: 5 Differentiator Cards */}
        {viewMode === "pillars" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {DIFFERENTIATORS.map((diff, idx) => {
              const Icon = getIcon(diff.iconName);
              const isFullSpan = idx === 4;
              const isExpanded = expandedPillar === diff.title;

              return (
                <div
                  key={diff.title}
                  className={`group p-7 rounded-2xl bg-card hover:bg-card/90 border border-border hover:border-blue-400/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${
                    isFullSpan ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50/80 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-cyan-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-xs font-bold text-muted-foreground/60">
                        PILLAR 0{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                      {diff.title}
                    </h3>
                    <div className="text-xs font-semibold text-blue-600 dark:text-cyan-400 mb-3">
                      {diff.subtitle}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                      {diff.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      {diff.bulletPoints.map((point, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2 text-xs text-foreground/80">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>

                    {/* Interactive Click-to-Expand In-Practice Note */}
                    {isExpanded && (
                      <div className="p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-xs text-blue-950 dark:text-blue-200 mt-3 animate-in fade-in slide-in-from-top-1">
                        <span className="font-bold block mb-1 text-foreground">In Real-World Practice:</span>
                        <p className="text-muted-foreground leading-relaxed">
                          {differentiatorExtra[diff.title]}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-2 border-t border-border">
                    <button
                      onClick={() =>
                        setExpandedPillar((prev) => (prev === diff.title ? null : diff.title))
                      }
                      className="text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 flex items-center gap-1"
                    >
                      <span>{isExpanded ? "Hide Implementation Note" : "Read Implementation Note"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Mode 2: Interactive Comparative Benchmark Matrix */
          <div className="bg-card rounded-3xl border border-border p-6 sm:p-8 shadow-xl overflow-x-auto max-w-5xl mx-auto">
            <div className="text-center mb-6">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider block mb-1">
                Comparative Breakdown
              </span>
              <h3 className="text-xl font-bold text-foreground">
                How Nirikshan AI Differs From Alternative Approaches
              </h3>
            </div>

            <table className="w-full text-xs text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-border text-muted-foreground uppercase font-mono text-[11px]">
                  <th className="py-3 px-3">Evaluation Dimension</th>
                  <th className="py-3 px-3 text-muted-foreground">Generic Online Video Courses</th>
                  <th className="py-3 px-3 text-muted-foreground">Traditional IT Consulting</th>
                  <th className="py-3 px-3 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-300 rounded-t-xl font-bold">
                    Nirikshan AI 10X Initiative
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {comparisonRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-muted/40 transition-colors">
                    <td className="py-3.5 px-3 font-semibold text-foreground">
                      {row.factor}
                    </td>
                    <td className="py-3.5 px-3 text-muted-foreground">
                      <div className="flex items-start gap-1.5">
                        <X className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                        <span>{row.generic}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-muted-foreground">
                      <div className="flex items-start gap-1.5">
                        <X className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span>{row.consulting}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 bg-blue-50/70 dark:bg-blue-950/40 text-foreground font-medium">
                      <div className="flex items-start gap-1.5">
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{row.nirikshan}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};
