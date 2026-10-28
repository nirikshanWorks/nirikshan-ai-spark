import React, { useState, useMemo } from "react";
import { AI_PROGRAMMES, AIProgramme } from "@/data/tenXProductivityData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgrammeDetailSheet } from "./ProgrammeDetailSheet";
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  Briefcase,
  Compass,
  Building2,
  BookOpen,
  Filter,
  Layers,
  ChevronDown,
} from "lucide-react";

interface ProgrammesSectionProps {
  onInquire: (programmeName: string, audienceType: string) => void;
}

export const ProgrammesSection: React.FC<ProgrammesSectionProps> = ({
  onInquire,
}) => {
  const [selectedProgramme, setSelectedProgramme] = useState<AIProgramme | null>(
    null
  );
  const [audienceFilter, setAudienceFilter] = useState<string>("all");
  const [expandedCurriculumCard, setExpandedCurriculumCard] = useState<string | null>(null);

  const getAudienceBadgeColor = (type: string) => {
    switch (type) {
      case "school":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800";
      case "university":
        return "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800";
      case "professional":
        return "bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800";
      case "leadership":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
      case "industry":
        return "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700";
    }
  };

  const filteredProgrammes = useMemo(() => {
    if (audienceFilter === "all") return AI_PROGRAMMES;
    return AI_PROGRAMMES.filter((p) => p.audienceType === audienceFilter);
  }, [audienceFilter]);

  const toggleCurriculum = (id: string) => {
    setExpandedCurriculumCard((prev) => (prev === id ? null : id));
  };

  return (
    <section id="programmes" className="py-20 lg:py-28 bg-muted/20 border-b border-border transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="outline" className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 bg-blue-50/60 dark:bg-blue-950/40 mb-3 px-3 py-1 text-xs">
            Targeted Learning Tracks
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
            Our AI Programmes
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Structured, outcome-driven curricula engineered for distinct learning journeys — from early student awareness to full enterprise workforce enablement.
          </p>
        </div>

        {/* Interactive Track Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: "all", label: "All Programmes (5)" },
            { id: "school", label: "School Students" },
            { id: "university", label: "University Students" },
            { id: "professional", label: "Working Professionals" },
            { id: "leadership", label: "Management & CXOs" },
            { id: "industry", label: "Enterprise Workforce" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setAudienceFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                audienceFilter === tab.id
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-card text-muted-foreground border-border hover:bg-muted"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 5 Programmes Grid with Visual Imagery Headers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProgrammes.map((prog, idx) => {
            const isWideCard = filteredProgrammes.length === 5 && idx === 4;
            const isCurriculumOpen = expandedCurriculumCard === prog.id;

            return (
              <div
                key={prog.id}
                className={`group rounded-2xl bg-card border border-border hover:border-blue-400 dark:hover:border-blue-500 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                  isWideCard ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                {/* Visual Imagery Header */}
                <div className="relative h-44 overflow-hidden bg-slate-900">
                  <img
                    src={prog.image}
                    alt={prog.name}
                    className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className={`text-xs font-semibold px-2.5 py-0.5 shadow-sm backdrop-blur-sm ${getAudienceBadgeColor(
                        prog.audienceType
                      )}`}
                    >
                      {prog.audienceLabel}
                    </Badge>
                    <span className="text-[11px] font-mono font-bold text-white/80 bg-slate-900/70 px-2 py-0.5 rounded backdrop-blur-xs">
                      TRACK 0{idx + 1}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-xs font-semibold text-cyan-300 drop-shadow-sm">
                      {prog.badge}
                    </span>
                    <h3 className="text-xl font-bold text-white drop-shadow-sm">
                      {prog.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-3">
                      {prog.tagline}
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-muted-foreground mb-6 leading-relaxed">
                      {prog.description}
                    </p>

                    {/* Learning Outcomes Checklist */}
                    <div className="space-y-2 mb-6">
                      <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
                        Key Outcomes
                      </div>
                      {prog.learningOutcomes.map((outcome, oIdx) => (
                        <div key={oIdx} className="flex items-start gap-2 text-xs text-foreground/90">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>

                    {/* Interactive In-Card Curriculum Accordion */}
                    <div className="mb-4">
                      <button
                        onClick={() => toggleCurriculum(prog.id)}
                        className="w-full py-2 px-3 rounded-lg bg-muted/40 hover:bg-muted border border-border text-xs font-semibold text-foreground flex items-center justify-between transition-colors"
                      >
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          {isCurriculumOpen ? "Hide Module Breakdown" : "View 4 Core Modules"}
                        </span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${
                            isCurriculumOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isCurriculumOpen && (
                        <div className="mt-2 space-y-1.5 p-3 rounded-lg bg-muted/30 border border-border text-xs animate-in fade-in slide-in-from-top-1">
                          {prog.curriculumHighlights.map((mod, mIdx) => (
                            <div key={mIdx} className="text-foreground/90 flex items-start gap-2">
                              <span className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                {mIdx + 1}
                              </span>
                              <span>{mod}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-border flex items-center gap-2">
                    <Button
                      onClick={() => setSelectedProgramme(prog)}
                      className="w-full bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-600 dark:hover:bg-blue-600 text-blue-700 dark:text-blue-300 hover:text-white border border-blue-200/80 dark:border-blue-800 hover:border-blue-600 text-xs font-semibold py-2.5 rounded-xl transition-all shadow-xs flex items-center justify-between"
                    >
                      <span>Full Syllabus & Deliverables</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Programme Detail Sheet Drawer */}
      <ProgrammeDetailSheet
        programme={selectedProgramme}
        isOpen={!!selectedProgramme}
        onClose={() => setSelectedProgramme(null)}
        onInquire={(progName, audType) => {
          setSelectedProgramme(null);
          onInquire(progName, audType);
        }}
      />
    </section>
  );
};
