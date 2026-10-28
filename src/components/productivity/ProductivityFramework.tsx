import React, { useState, useEffect } from "react";
import { FRAMEWORK_STAGES, FrameworkStage } from "@/data/tenXProductivityData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Compass,
  GraduationCap,
  Sparkles,
  Workflow,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Target,
  FileCheck,
  Play,
  Pause,
  RotateCcw,
  Check,
} from "lucide-react";

export const ProductivityFramework: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isPlayingTour, setIsPlayingTour] = useState(false);
  const [completedActions, setCompletedActions] = useState<Record<string, boolean>>({});

  const activeStage = FRAMEWORK_STAGES[activeStageIndex];

  // Auto-play guided tour
  useEffect(() => {
    let timer: any;
    if (isPlayingTour) {
      timer = setInterval(() => {
        setActiveStageIndex((prev) => (prev + 1) % FRAMEWORK_STAGES.length);
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [isPlayingTour]);

  const toggleActionDone = (actionText: string) => {
    setCompletedActions((prev) => ({
      ...prev,
      [actionText]: !prev[actionText],
    }));
  };

  const getStageIcon = (step: string) => {
    switch (step) {
      case "01":
        return Compass;
      case "02":
        return GraduationCap;
      case "03":
        return Sparkles;
      case "04":
        return Workflow;
      case "05":
        return TrendingUp;
      default:
        return Compass;
    }
  };

  const stageCheckedCount = activeStage.keyActions.filter(
    (act) => completedActions[act]
  ).length;
  const stageReadinessPercent = Math.round(
    (stageCheckedCount / activeStage.keyActions.length) * 100
  );

  return (
    <section id="framework" className="py-20 lg:py-28 bg-gradient-to-b from-slate-50 via-background to-slate-50 dark:from-slate-950 dark:via-background dark:to-slate-950 border-b border-border transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="outline" className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 bg-blue-50/60 dark:bg-blue-950/40 mb-3 px-3 py-1 text-xs">
            Signature Methodology
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
            The 10X Productivity Framework
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            A battle-tested five-stage roadmap engineered to take individuals and institutions from initial AI curiosity to scalable, measurable operational impact.
          </p>
        </div>

        {/* Tour Controller Toolbar */}
        <div className="flex items-center justify-between max-w-4xl mx-auto mb-8 px-2">
          <div className="text-xs font-semibold text-muted-foreground">
            Interactive Roadmap Explorer
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsPlayingTour(!isPlayingTour)}
              className="text-xs h-8 border-border hover:bg-muted text-foreground font-semibold"
            >
              {isPlayingTour ? (
                <>
                  <Pause className="w-3.5 h-3.5 mr-1 text-amber-500" />
                  <span>Pause Guided Tour</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 mr-1 text-blue-600 dark:text-blue-400" />
                  <span>Auto-Play Guided Tour</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Desktop Interactive Horizontal Timeline */}
        <div className="hidden lg:block mb-12">
          {/* Progress Tracker Bar */}
          <div className="relative mb-8">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-border -translate-y-1/2 z-0" />
            <div
              className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 -translate-y-1/2 z-0 transition-all duration-500"
              style={{ width: `${(activeStageIndex / (FRAMEWORK_STAGES.length - 1)) * 100}%` }}
            />

            <div className="relative z-10 grid grid-cols-5 gap-4">
              {FRAMEWORK_STAGES.map((stage, idx) => {
                const Icon = getStageIcon(stage.number);
                const isActive = idx === activeStageIndex;
                const isPassed = idx < activeStageIndex;

                return (
                  <button
                    key={stage.number}
                    onClick={() => {
                      setActiveStageIndex(idx);
                      setIsPlayingTour(false);
                    }}
                    className="flex flex-col items-center group text-center focus:outline-none"
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center font-mono font-bold text-base transition-all duration-300 shadow-md ${
                        isActive
                          ? "bg-blue-600 text-white ring-4 ring-blue-400/20 scale-110 shadow-blue-500/30"
                          : isPassed
                          ? "bg-slate-800 text-white dark:bg-slate-700"
                          : "bg-card text-muted-foreground border border-border group-hover:border-blue-400 group-hover:text-blue-600"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="mt-3">
                      <div className="text-xs font-mono font-semibold text-muted-foreground mb-0.5">
                        STAGE {stage.number}
                      </div>
                      <div
                        className={`text-sm font-bold tracking-wide transition-colors ${
                          isActive ? "text-blue-600 dark:text-blue-400 font-extrabold" : "text-foreground group-hover:text-blue-600"
                        }`}
                      >
                        {stage.title}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Stage Detailed Card with Interactive Checklist */}
          <div className="bg-card rounded-3xl border border-border p-8 shadow-xl relative overflow-hidden transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />

            <div className="grid grid-cols-12 gap-8 items-start">
              {/* Left Column: Number, Title, Description */}
              <div className="col-span-5 border-r border-border pr-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-mono font-bold mb-4">
                  <span>STAGE {activeStage.number} OF 05</span>
                </div>
                <h3 className="text-3xl font-extrabold text-foreground mb-2">
                  {activeStage.title}
                </h3>
                <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-4">
                  {activeStage.tagline}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {activeStage.description}
                </p>

                {/* Key Deliverable Box */}
                <div className="p-4 rounded-xl bg-muted/40 border border-border mb-6">
                  <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    Stage Deliverable
                  </div>
                  <div className="text-sm font-bold text-foreground">
                    {activeStage.deliverable}
                  </div>
                </div>

                {/* Live Self-Assessment Widget */}
                <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-bold text-blue-900 dark:text-blue-200">Your Team Maturity Check:</span>
                    <span className="font-mono font-bold text-blue-700 dark:text-blue-300">{stageReadinessPercent}%</span>
                  </div>
                  <div className="w-full bg-blue-200/70 dark:bg-blue-900/60 h-2 rounded-full overflow-hidden mb-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${stageReadinessPercent}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-blue-800 dark:text-blue-300">
                    Click actions on the right to benchmark your organization.
                  </p>
                </div>
              </div>

              {/* Right Column: Key Actions Checklist (Interactive!) */}
              <div className="col-span-7">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    Stage Execution Checklist (Click to benchmark)
                  </h4>
                  <span className="text-[11px] text-muted-foreground">
                    {stageCheckedCount} of {activeStage.keyActions.length} completed
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {activeStage.keyActions.map((action, aIdx) => {
                    const isChecked = !!completedActions[action];

                    return (
                      <div
                        key={aIdx}
                        onClick={() => toggleActionDone(action)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                          isChecked
                            ? "bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 shadow-xs"
                            : "bg-muted/30 border-border hover:bg-muted/60"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isChecked
                              ? "bg-emerald-600 text-white"
                              : "border border-muted-foreground/30 bg-card text-transparent"
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span
                          className={`text-xs sm:text-sm font-medium ${
                            isChecked ? "text-emerald-950 dark:text-emerald-200 font-semibold" : "text-foreground"
                          }`}
                        >
                          {action}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={activeStageIndex === 0}
                    onClick={() => {
                      setIsPlayingTour(false);
                      setActiveStageIndex((prev) => Math.max(0, prev - 1));
                    }}
                    className="text-xs font-semibold text-muted-foreground disabled:opacity-30"
                  >
                    Previous Stage
                  </Button>
                  <div className="flex gap-1.5">
                    {FRAMEWORK_STAGES.map((_, idx) => (
                      <span
                        key={idx}
                        onClick={() => {
                          setIsPlayingTour(false);
                          setActiveStageIndex(idx);
                        }}
                        className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${
                          idx === activeStageIndex
                            ? "bg-blue-600 w-6"
                            : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                        }`}
                      />
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={activeStageIndex === FRAMEWORK_STAGES.length - 1}
                    onClick={() => {
                      setIsPlayingTour(false);
                      setActiveStageIndex((prev) =>
                        Math.min(FRAMEWORK_STAGES.length - 1, prev + 1)
                      )
                    }}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 disabled:opacity-30 flex items-center gap-1"
                  >
                    <span>Next Stage</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Vertical Timeline Flow with checkable steps */}
        <div className="lg:hidden space-y-6 mb-12">
          {FRAMEWORK_STAGES.map((stage) => {
            const Icon = getStageIcon(stage.number);
            return (
              <div
                key={stage.number}
                className="bg-card rounded-2xl border border-border p-6 shadow-sm relative overflow-hidden"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">
                      Stage {stage.number} of 05
                    </span>
                    <h3 className="text-xl font-bold text-foreground">{stage.title}</h3>
                  </div>
                </div>

                <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  {stage.tagline}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed">
                  {stage.description}
                </p>

                <div className="space-y-2 mb-4">
                  {stage.keyActions.map((action, aIdx) => {
                    const isChecked = !!completedActions[action];
                    return (
                      <div
                        key={aIdx}
                        onClick={() => toggleActionDone(action)}
                        className={`p-2.5 rounded-lg border text-xs flex items-center gap-2 cursor-pointer ${
                          isChecked
                            ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 font-semibold"
                            : "bg-muted/40 border-border text-foreground"
                        }`}
                      >
                        <CheckCircle2
                          className={`w-3.5 h-3.5 shrink-0 ${
                            isChecked ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground/40"
                          }`}
                        />
                        <span>{action}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="p-3 rounded-xl bg-muted/40 border border-border text-xs">
                  <span className="font-bold text-muted-foreground uppercase tracking-wider text-[10px] block mb-0.5">
                    Key Deliverable
                  </span>
                  <span className="font-semibold text-foreground">{stage.deliverable}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing Statement Callout: “From insight to impact.” */}
        <div className="text-center py-6 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-2xl text-white shadow-xl shadow-blue-500/10">
          <div className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-1">
            Closing Philosophy
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            “From insight to impact.”
          </div>
        </div>
      </div>
    </section>
  );
};
