import React from "react";
import {
  BEYOND_TRAINING_STAGES,
  TRANSFORMATION_CAPABILITIES,
  BeyondTrainingStage,
  TransformationCapability,
} from "@/data/tenXProductivityData";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  FileCheck,
  RefreshCw,
  Cpu,
  Lightbulb,
  TrendingUp,
  Workflow,
  Sparkles,
  Bot,
  BarChart3,
  Users,
  Eye,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

export const EnterpriseTransformation: React.FC = () => {
  const getStageIcon = (iconName: string) => {
    switch (iconName) {
      case "GraduationCap":
        return GraduationCap;
      case "FileCheck":
        return FileCheck;
      case "RefreshCw":
        return RefreshCw;
      case "Cpu":
        return Cpu;
      case "Lightbulb":
        return Lightbulb;
      case "TrendingUp":
        return TrendingUp;
      default:
        return Cpu;
    }
  };

  const getCapabilityIcon = (iconName: string) => {
    switch (iconName) {
      case "Workflow":
        return Workflow;
      case "Sparkles":
        return Sparkles;
      case "Bot":
        return Bot;
      case "BarChart3":
        return BarChart3;
      case "Users":
        return Users;
      case "Eye":
        return Eye;
      default:
        return Sparkles;
    }
  };

  return (
    <section id="enterprise-transformation" className="py-20 lg:py-28 bg-white border-b border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50/60 mb-3 px-3 py-1 text-xs">
            Beyond Training
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            AI Solutions & Enterprise Transformation
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Nirikshan AI moves beyond standalone workshops to partner with enterprises through complete, institutional AI adoption and workflow implementation.
          </p>
        </div>

        {/* 6 Connected Stages Diagram */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              The 6-Stage Transformation Lifecycle
            </span>
            <span className="text-xs text-blue-600 font-semibold hidden sm:inline-block">
              TRAIN → ASSESS → TRANSFORM → IMPLEMENT → INNOVATE → SCALE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {BEYOND_TRAINING_STAGES.map((stage, idx) => {
              const Icon = getStageIcon(stage.iconName);

              return (
                <div
                  key={stage.step}
                  className="relative group p-5 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200/90 hover:border-blue-300 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
                >
                  {/* Top Step indicator */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-mono font-bold text-xs flex items-center justify-center">
                        {stage.step}
                      </span>
                      <Icon className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>

                    <h4 className="text-base font-bold text-slate-900 mb-1">
                      {stage.title}
                    </h4>
                    <div className="text-xs font-semibold text-blue-600 mb-2">
                      {stage.action}
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed mb-4">
                      {stage.description}
                    </p>
                  </div>

                  {/* Deliverables */}
                  <div className="pt-3 border-t border-slate-200/70 space-y-1">
                    {stage.deliverables.map((deliv, dIdx) => (
                      <div key={dIdx} className="text-[10px] text-slate-500 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-blue-500 shrink-0" />
                        <span className="truncate">{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Separate Capability Cards */}
        <div className="pt-8 border-t border-slate-100">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
              Implementation & Deployment
            </span>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Enterprise AI Capabilities
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              These implementation competencies support our training programmes, allowing organizations to deploy custom automations and private AI tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRANSFORMATION_CAPABILITIES.map((cap) => {
              const Icon = getCapabilityIcon(cap.iconName);

              return (
                <div
                  key={cap.title}
                  className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600 mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">
                      {cap.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                      {cap.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {cap.highlights.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium bg-slate-50 text-slate-700 px-2 py-0.5 rounded border border-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scope Note */}
          <div className="mt-8 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-500 text-center max-w-3xl mx-auto flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              <strong>Note:</strong> These capability services represent Nirikshan AI's bespoke engineering and consulting practice designed to implement the 10X framework directly into client infrastructure.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
