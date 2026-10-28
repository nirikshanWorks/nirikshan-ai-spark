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
        className="w-full sm:max-w-xl md:max-w-2xl bg-card border-border text-foreground p-0 overflow-y-auto flex flex-col justify-between"
      >
        <div>
          {/* Header Image Cover */}
          <div className="relative h-48 bg-slate-900 overflow-hidden">
            <img
              src={programme.image}
              alt={programme.name}
              className="w-full h-full object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
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
              <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                Programme Objective
              </div>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {programme.description}
              </p>
            </div>

            {/* Key Learning Outcomes */}
            <div>
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Key Learning Outcomes
              </h3>
              <div className="space-y-2 bg-muted/40 p-4 rounded-xl border border-border">
                {programme.learningOutcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Highlights */}
            <div>
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Curriculum Structure & Modules
              </h3>
              <div className="space-y-2.5">
                {programme.curriculumHighlights.map((module, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-border bg-card hover:border-blue-300 dark:hover:border-blue-600 transition-colors text-xs sm:text-sm font-medium text-foreground flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span>{module}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables & Verifiable Outcomes */}
            <div>
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Tangible Deliverables
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {programme.deliverables.map((deliv, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/60 text-xs font-medium text-foreground flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:text-blue-400 shrink-0" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-muted/40 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-muted-foreground text-center sm:text-left">
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
