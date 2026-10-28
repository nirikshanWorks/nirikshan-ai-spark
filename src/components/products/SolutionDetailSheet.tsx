import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CVSolution,
  CV_SOLUTIONS,
} from "@/data/computerVisionProducts";
import {
  CheckCircle2,
  AlertCircle,
  Cpu,
  Layers,
  Building2,
  ArrowRight,
  Shield,
  Workflow,
  Sparkles,
} from "lucide-react";

interface SolutionDetailSheetProps {
  solution: CVSolution | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectRelated: (solutionId: string) => void;
  onDiscussSolution: (solutionName: string) => void;
}

export const SolutionDetailSheet: React.FC<SolutionDetailSheetProps> = ({
  solution,
  isOpen,
  onClose,
  onSelectRelated,
  onDiscussSolution,
}) => {
  if (!solution) return null;

  const relatedSolutions = CV_SOLUTIONS.filter((s) =>
    solution.relatedSolutionIds.includes(s.id)
  );

  const handleDiscuss = () => {
    onClose();
    onDiscussSolution(solution.name);
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl overflow-y-auto p-0 bg-background border-l border-border"
      >
        {/* Header Hero Image */}
        <div className="relative h-60 w-full bg-slate-950 overflow-hidden">
          <img
            src={solution.image}
            alt={solution.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

          {/* Badges on image */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <Badge className="bg-primary text-primary-foreground font-semibold">
              {solution.categoryName}
            </Badge>
            <Badge variant="outline" className="bg-black/60 text-white border-white/20 backdrop-blur-md">
              {solution.badge}
            </Badge>
          </div>

          <div className="absolute bottom-4 left-6 right-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground leading-tight">
              {solution.name}
            </h2>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Overview & Problem Addressed */}
          <div className="space-y-4">
            <p className="text-base text-muted-foreground leading-relaxed">
              {solution.detailedOverview}
            </p>

            {/* Problem Callout Box */}
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 flex gap-3.5 items-start">
              <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-1">
                  Challenge It Solves
                </h4>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {solution.problem}
                </p>
              </div>
            </div>
          </div>

          {/* Core Capabilities */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Core Capabilities
            </h3>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {solution.capabilities.map((cap, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-3 rounded-xl border border-border/70 bg-card/60 text-xs text-foreground"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works (Detection Pipeline) */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
              <Workflow className="w-4 h-4 text-cyan-500" />
              How It Works — Detection Pipeline
            </h3>
            <div className="relative border-l-2 border-primary/30 ml-3 space-y-4 py-1">
              {solution.howItWorks.map((step, idx) => (
                <div key={idx} className="relative pl-6">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <strong className="text-foreground font-semibold">
                      {step.split(":")[0]}:
                    </strong>
                    {step.includes(":") ? step.substring(step.indexOf(":") + 1) : step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Typical Deployment Environments & Use Cases */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-primary" />
                Deployment Environments
              </h3>
              <ul className="space-y-2">
                {solution.deploymentEnvironments.map((env, i) => (
                  <li
                    key={i}
                    className="text-xs text-muted-foreground flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/70 flex-shrink-0" />
                    <span>{env}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-500" />
                Common Use Cases
              </h3>
              <ul className="space-y-2">
                {solution.useCases.map((uc, i) => (
                  <li
                    key={i}
                    className="text-xs text-muted-foreground flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/70 flex-shrink-0" />
                    <span>{uc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Related Solutions */}
          {relatedSolutions.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Related Vision Solutions
              </h3>
              <div className="flex flex-wrap gap-2">
                {relatedSolutions.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => onSelectRelated(rel.id)}
                    className="px-3 py-1.5 rounded-xl border border-border bg-secondary/50 hover:bg-secondary hover:border-primary/40 text-xs font-medium text-foreground transition-all flex items-center gap-1.5"
                  >
                    <span>{rel.name}</span>
                    <ArrowRight className="w-3 h-3 text-primary" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Action Footer */}
          <div className="pt-4 border-t border-border flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleDiscuss}
              className="gradient-primary flex-1 shadow-md"
            >
              Discuss This Solution
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
