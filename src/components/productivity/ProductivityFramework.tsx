import React, { useState } from "react";
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
} from "lucide-react";

export const ProductivityFramework: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const activeStage = FRAMEWORK_STAGES[activeStageIndex];

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

  return (
    <section id="framework" className="py-20 lg:py-28 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50/60 mb-3 px-3 py-1 text-xs">
            Signature Methodology
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            The 10X Productivity Framework
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            A battle-tested five-stage roadmap engineered to take individuals and institutions from initial AI curiosity to scalable, measurable operational impact.
          </p>
        </div>

        {/* Desktop Interactive Horizontal Timeline */}
        <div className="hidden lg:block mb-12">
          {/* Progress Tracker Bar */}
          <div className="relative mb-8">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0" />
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
                    onClick={() => setActiveStageIndex(idx)}
                    className="flex flex-col items-center group text-center focus:outline-none"
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center font-mono font-bold text-base transition-all duration-300 shadow-md ${
                        isActive
                          ? "bg-blue-600 text-white ring-4 ring-blue-100 scale-110 shadow-blue-500/30"
                          : isPassed
                          ? "bg-indigo-900 text-white"
                          : "bg-white text-slate-400 border border-slate-200 group-hover:border-blue-300 group-hover:text-blue-600"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="mt-3">
                      <div className="text-xs font-mono font-semibold text-slate-400 mb-0.5">
                        STAGE {stage.number}
                      </div>
                      <div
                        className={`text-sm font-bold tracking-wide transition-colors ${
                          isActive ? "text-blue-600" : "text-slate-700 group-hover:text-slate-900"
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

          {/* Active Stage Detailed Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-xl shadow-slate-200/40 relative overflow-hidden transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />

            <div className="grid grid-cols-12 gap-8 items-center">
              {/* Left Column: Number, Title, Description */}
              <div className="col-span-5 border-r border-slate-100 pr-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-mono font-bold mb-4">
                  <span>STAGE {activeStage.number} OF 05</span>
                </div>
                <h3 className="text-3xl font-extrabold text-slate-900 mb-2">
                  {activeStage.title}
                </h3>
                <div className="text-sm font-semibold text-blue-600 mb-4">
                  {activeStage.tagline}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {activeStage.description}
                </p>

                {/* Key Deliverable Box */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-blue-600" />
                    Stage Deliverable
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    {activeStage.deliverable}
                  </div>
                </div>
              </div>

              {/* Right Column: Key Actions Checklist */}
              <div className="col-span-7">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-600" />
                  Key Execution Steps In This Stage
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {activeStage.keyActions.map((action, aIdx) => (
                    <div
                      key={aIdx}
                      className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/70 hover:bg-blue-50/40 hover:border-blue-200 transition-all flex items-start gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {aIdx + 1}
                      </div>
                      <span className="text-xs sm:text-sm text-slate-700 font-medium">
                        {action}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={activeStageIndex === 0}
                    onClick={() => setActiveStageIndex((prev) => Math.max(0, prev - 1))}
                    className="text-xs font-semibold text-slate-600 disabled:opacity-30"
                  >
                    Previous Stage
                  </Button>
                  <div className="flex gap-1.5">
                    {FRAMEWORK_STAGES.map((_, idx) => (
                      <span
                        key={idx}
                        onClick={() => setActiveStageIndex(idx)}
                        className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${
                          idx === activeStageIndex
                            ? "bg-blue-600 w-6"
                            : "bg-slate-300 hover:bg-slate-400"
                        }`}
                      />
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={activeStageIndex === FRAMEWORK_STAGES.length - 1}
                    onClick={() =>
                      setActiveStageIndex((prev) =>
                        Math.min(FRAMEWORK_STAGES.length - 1, prev + 1)
                      )
                    }
                    className="text-xs font-semibold text-blue-600 disabled:opacity-30 flex items-center gap-1"
                  >
                    <span>Next Stage</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Vertical Timeline Flow */}
        <div className="lg:hidden space-y-6 mb-12">
          {FRAMEWORK_STAGES.map((stage, idx) => {
            const Icon = getStageIcon(stage.number);
            return (
              <div
                key={stage.number}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm relative overflow-hidden"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-bold text-blue-600 uppercase">
                      Stage {stage.number} of 05
                    </span>
                    <h3 className="text-xl font-bold text-slate-900">{stage.title}</h3>
                  </div>
                </div>

                <div className="text-xs font-semibold text-blue-700 mb-2">
                  {stage.tagline}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                  {stage.description}
                </p>

                <div className="space-y-2 mb-4">
                  {stage.keyActions.map((action, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{action}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block mb-0.5">
                    Key Deliverable
                  </span>
                  <span className="font-semibold text-slate-900">{stage.deliverable}</span>
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
