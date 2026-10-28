import React, { useState } from "react";
import {
  BEYOND_TRAINING_STAGES,
  TRANSFORMATION_CAPABILITIES,
  BeyondTrainingStage,
  TransformationCapability,
} from "@/data/tenXProductivityData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  ArrowRight,
  Layers,
} from "lucide-react";

export const EnterpriseTransformation: React.FC = () => {
  const [activeStageStep, setActiveStageStep] = useState<string>("01");
  const [selectedCapability, setSelectedCapability] = useState<string | null>(null);

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

  const capabilityDetails: Record<
    string,
    { integrations: string[]; safeguards: string }
  > = {
    "AI Workflow Automation": {
      integrations: ["Make.com", "Zapier Enterprise", "REST Webhooks", "PostgreSQL"],
      safeguards: "Deterministic error fallback queues with human-in-the-loop exception approvals.",
    },
    "Generative AI Integration": {
      integrations: ["Private Azure OpenAI", "Claude Enterprise API", "LangGraph", "Chroma Vector DB"],
      safeguards: "Strict zero-data-retention agreements; models never train on proprietary customer data.",
    },
    "AI Assistants & Chatbots": {
      integrations: ["Slack Bot", "Microsoft Teams", "Zendesk", "Internal Intranet"],
      safeguards: "Vector grounding with deterministic citation requirements; refusal on unverified prompts.",
    },
    "AI-Powered Reporting & Analytics": {
      integrations: ["Snowflake", "BigQuery", "Salesforce", "ERP Systems"],
      safeguards: "Read-only database connections with role-based row-level data access control.",
    },
    "Workforce AI Upskilling": {
      integrations: ["LMS Portals", "Custom Prompt Vaults", "Role Playbooks"],
      safeguards: "Monthly policy updates covering copyright, intellectual property, and ethical AI usage.",
    },
    "Advanced AI & Computer Vision": {
      integrations: ["RTSP Camera Streams", "NVIDIA DeepStream", "Jetson Orin Edge Units"],
      safeguards: "Local on-premises processing without cloud streaming requirements for sensitive sites.",
    },
  };

  const activeStage =
    BEYOND_TRAINING_STAGES.find((s) => s.step === activeStageStep) ||
    BEYOND_TRAINING_STAGES[0];

  return (
    <section id="enterprise-transformation" className="py-20 lg:py-28 bg-background border-b border-border transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 bg-blue-50/60 dark:bg-blue-950/40 mb-3 px-3 py-1 text-xs">
            Beyond Training
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
            AI Solutions & Enterprise Transformation
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Nirikshan AI moves beyond standalone workshops to partner with enterprises through complete, institutional AI adoption and workflow implementation.
          </p>
        </div>

        {/* 6 Connected Stages Diagram with Interactive Click */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Click Any Stage To Inspect Detailed Execution Actions
            </span>
            <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold hidden sm:inline-block">
              Interactive 6-Stage Roadmap
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {BEYOND_TRAINING_STAGES.map((stage) => {
              const Icon = getStageIcon(stage.iconName);
              const isSelected = stage.step === activeStageStep;

              return (
                <button
                  key={stage.step}
                  onClick={() => setActiveStageStep(stage.step)}
                  className={`relative p-4 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? "bg-blue-50 dark:bg-blue-950/60 border-blue-500 dark:border-blue-400 ring-2 ring-blue-400/20 shadow-md"
                      : "bg-card hover:bg-muted/50 border-border text-foreground"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`w-6 h-6 rounded-md font-mono font-bold text-xs flex items-center justify-center ${
                        isSelected ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {stage.step}
                    </span>
                    <Icon
                      className={`w-4 h-4 ${
                        isSelected ? "text-blue-600 dark:text-blue-400" : "text-muted-foreground/60"
                      }`}
                    />
                  </div>

                  <h4
                    className={`text-sm font-bold mb-0.5 ${
                      isSelected ? "text-blue-600 dark:text-blue-400" : "text-foreground"
                    }`}
                  >
                    {stage.title}
                  </h4>
                  <div className="text-[11px] font-semibold text-muted-foreground line-clamp-1">
                    {stage.action}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Deep-Dive Card */}
          <div className="mt-4 p-6 rounded-2xl bg-card border border-border shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 animate-in fade-in slide-in-from-top-1">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">
                  ACTIVE PHASE {activeStage.step}:
                </span>
                <span className="text-sm font-bold text-foreground">{activeStage.title}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">{activeStage.action}</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3">
                {activeStage.description}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold text-muted-foreground uppercase">Deliverables:</span>
                {activeStage.deliverables.map((d, dIdx) => (
                  <Badge key={dIdx} variant="secondary" className="bg-muted text-foreground border-border text-xs">
                    {d}
                  </Badge>
                ))}
              </div>
            </div>

            <Button
              size="sm"
              onClick={() => {
                const el = document.getElementById("contact-inquiry");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 h-9 rounded-xl shrink-0"
            >
              <span>Consult On {activeStage.title}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>

        {/* Capability Cards with Interactive Inspection */}
        <div className="pt-6 border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-1">
              Implementation & Deployment
            </span>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Enterprise AI Capabilities
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Click any capability below to view architecture integrations and data safeguards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRANSFORMATION_CAPABILITIES.map((cap) => {
              const Icon = getCapabilityIcon(cap.iconName);
              const isSelected = selectedCapability === cap.title;
              const details = capabilityDetails[cap.title];

              return (
                <div
                  key={cap.title}
                  onClick={() =>
                    setSelectedCapability((prev) => (prev === cap.title ? null : cap.title))
                  }
                  className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-blue-50/70 dark:bg-blue-950/40 border-blue-400 dark:border-blue-600 shadow-md ring-2 ring-blue-300/30"
                      : "bg-card border-border hover:border-blue-400 dark:hover:border-blue-600 shadow-sm hover:shadow-md"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/70 border border-blue-200/80 dark:border-blue-800/80 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                        {isSelected ? "Hide Specs" : "View Specs"}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-foreground mb-2">
                      {cap.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed">
                      {cap.description}
                    </p>

                    {/* Expandable Specifications */}
                    {isSelected && details && (
                      <div className="mt-3 p-3 rounded-xl bg-background border border-blue-200 dark:border-blue-900 text-xs space-y-2 animate-in fade-in slide-in-from-top-1">
                        <div>
                          <span className="font-bold text-foreground block mb-1">
                            Common Integrations:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {details.integrations.map((item) => (
                              <span key={item} className="bg-muted text-foreground text-[10px] px-1.5 py-0.5 rounded">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="font-bold text-foreground block mb-0.5">
                            Data Governance & Safeguard:
                          </span>
                          <p className="text-muted-foreground text-[11px] leading-relaxed">
                            {details.safeguards}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 mt-4 border-t border-border flex flex-wrap gap-1.5">
                    {cap.highlights.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium bg-muted text-foreground px-2 py-0.5 rounded border border-border"
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
          <div className="mt-8 p-4 rounded-xl bg-muted/30 border border-border text-xs text-muted-foreground text-center max-w-3xl mx-auto flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>
              <strong>Note:</strong> These capability services represent Nirikshan AI's bespoke engineering and consulting practice designed to implement the 10X framework directly into client infrastructure.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
