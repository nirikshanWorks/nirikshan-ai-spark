import React from "react";
import { AIProgramme } from "@/data/tenXProductivityData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  GraduationCap,
  CheckCircle2,
  BookOpen,
  Award,
  ArrowRight,
  Layers,
  Sparkles,
} from "lucide-react";

interface ProgrammeDetailSheetProps {
  programme: AIProgramme | null;
  isOpen: boolean;
  onClose: () => void;
  onInquire: (programmeName: string, audienceType: string) => void;
}

export const ProgrammeDetailSheet: React.FC<ProgrammeDetailSheetProps> = ({
  programme,
  isOpen,
  onClose,
  onInquire,
}) => {
  if (!programme) return null;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-xl md:max-w-2xl bg-white p-0 overflow-y-auto flex flex-col justify-between"
      >
        <div>
          {/* Header Image Cover */}
          <div className="relative h-48 bg-slate-900 overflow-hidden">
            <img
              src={programme.image}
              alt={programme.name}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6 text-white">
              <Badge className="bg-blue-600 text-white text-xs mb-2 shadow-sm">
                {programme.badge}
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {programme.name}
              </h2>
              <div className="text-xs text-blue-300 font-medium">
                {programme.audienceLabel}
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Tagline & Overview */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                Programme Objective
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {programme.description}
              </p>
            </div>

            {/* Key Learning Outcomes */}
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                Key Learning Outcomes
              </h3>
              <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                {programme.learningOutcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Highlights */}
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                Curriculum Structure & Modules
              </h3>
              <div className="space-y-2.5">
                {programme.curriculumHighlights.map((module, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-colors text-xs sm:text-sm font-medium text-slate-800 flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-700 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span>{module}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables & Verifiable Outcomes */}
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-600" />
                Tangible Deliverables
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {programme.deliverables.map((deliv, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-blue-50/60 border border-blue-200/60 text-xs font-medium text-blue-900 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            Institutional cohorts, corporate batches & academic partnerships available.
          </div>
          <Button
            onClick={() => onInquire(programme.name, programme.audienceType)}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 text-xs rounded-xl shadow-md"
          >
            <span>Inquire for {programme.name}</span>
            <ArrowRight className="w-3.5 h-3.5 ml-2" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
