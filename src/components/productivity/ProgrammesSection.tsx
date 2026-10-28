import React, { useState } from "react";
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

  const getAudienceBadgeColor = (type: string) => {
    switch (type) {
      case "school":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "university":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "professional":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "leadership":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "industry":
        return "bg-rose-100 text-rose-800 border-rose-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const handleExplore = (programme: AIProgramme) => {
    setSelectedProgramme(programme);
  };

  const handleInquireFromSheet = (progName: string, audType: string) => {
    setSelectedProgramme(null);
    onInquire(progName, audType);
  };

  return (
    <section id="programmes" className="py-20 lg:py-28 bg-slate-50/70 border-b border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50/60 mb-3 px-3 py-1 text-xs">
            Targeted Learning Tracks
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Our AI Programmes
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Structured, outcome-driven curricula engineered for distinct learning journeys — from early student awareness to full enterprise workforce enablement.
          </p>
        </div>

        {/* 5 Programmes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {AI_PROGRAMMES.map((prog, idx) => {
            const isWideCard = idx === 4; // 5th programme card can span cleanly

            return (
              <div
                key={prog.id}
                className={`group rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${
                  isWideCard ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div>
                  {/* Top Bar: Audience Badge & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <Badge
                      variant="outline"
                      className={`text-xs font-semibold px-2.5 py-0.5 ${getAudienceBadgeColor(
                        prog.audienceType
                      )}`}
                    >
                      {prog.audienceLabel}
                    </Badge>
                    <span className="text-[11px] font-mono font-bold text-slate-400">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {prog.name}
                  </h3>
                  <div className="text-xs font-semibold text-blue-600 mb-4">
                    {prog.tagline}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                    {prog.description}
                  </p>

                  {/* Learning Outcomes */}
                  <div className="space-y-2 mb-6">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Key Outcomes
                    </div>
                    {prog.learningOutcomes.map((outcome, oIdx) => (
                      <div key={oIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <Button
                    onClick={() => handleExplore(prog)}
                    className="flex-1 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-200/80 hover:border-blue-600 text-xs font-semibold py-2.5 rounded-xl transition-all group-hover:shadow-md"
                  >
                    <span>Explore Programme</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
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
        onInquire={handleInquireFromSheet}
      />
    </section>
  );
};
