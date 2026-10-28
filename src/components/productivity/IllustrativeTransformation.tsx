import React, { useState } from "react";
import { TASK_COMPARISONS, TaskComparison } from "@/data/tenXProductivityData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Hourglass,
  Layers,
  Zap,
  TrendingDown,
} from "lucide-react";

export const IllustrativeTransformation: React.FC = () => {
  const [selectedTaskId, setSelectedTaskId] = useState(TASK_COMPARISONS[0].id);
  const activeTask =
    TASK_COMPARISONS.find((t) => t.id === selectedTaskId) || TASK_COMPARISONS[0];

  return (
    <section id="transformation-showcase" className="py-20 lg:py-28 bg-white border-b border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50/60 mb-3 px-3 py-1 text-xs">
            Workflow Transformation
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Illustrative Productivity Transformation
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            See how everyday professional tasks are compressed from multi-hour manual grinds into streamlined, human-guided workflows.
          </p>
        </div>

        {/* Task Selection Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 max-w-3xl mx-auto">
          {TASK_COMPARISONS.map((task) => (
            <button
              key={task.id}
              onClick={() => setSelectedTaskId(task.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                task.id === selectedTaskId
                  ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {task.name.split(" ")[0]} {task.name.split(" ")[1]}
            </button>
          ))}
        </div>

        {/* Split Screen Comparison Showcase */}
        <div className="bg-slate-50/80 rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xl shadow-slate-200/30 mb-8">
          <div className="text-center mb-8 pb-6 border-b border-slate-200/80">
            <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider block mb-1">
              {activeTask.category} Case Study
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {activeTask.name}
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Left Card: Traditional Workflow */}
            <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="border-rose-300 text-rose-700 bg-rose-50 text-xs">
                    Traditional Workflow
                  </Badge>
                  <span className="text-xs font-mono text-slate-400">Manual Approach</span>
                </div>

                {/* Duration Callout */}
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900 font-mono">
                    {activeTask.traditionalHours}
                  </span>
                  <span className="text-xl font-bold text-slate-500">Hours</span>
                  <span className="text-xs text-rose-600 font-medium ml-auto flex items-center gap-1">
                    <Hourglass className="w-3.5 h-3.5" /> High Time Drain
                  </span>
                </div>

                {/* Step Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Process Breakdown (Manual)
                  </div>
                  {activeTask.traditionalSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-mono font-bold text-[11px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Output Velocity: Linear</span>
                <span className="font-semibold text-slate-700">Total: {activeTask.traditionalHours} Hours</span>
              </div>
            </div>

            {/* Right Card: AI-Assisted Workflow */}
            <div className="rounded-2xl bg-gradient-to-b from-blue-50/70 via-white to-indigo-50/40 border-2 border-blue-400 p-6 sm:p-7 flex flex-col justify-between shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-300" />
                AI-Assisted Workflow
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-blue-600 text-white text-xs">
                    Nirikshan AI Augmented
                  </Badge>
                  <span className="text-xs font-semibold text-blue-700">Human + AI</span>
                </div>

                {/* Duration Callout */}
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl sm:text-5xl font-black text-blue-700 font-mono">
                    {activeTask.aiAssistedMinutes}
                  </span>
                  <span className="text-xl font-bold text-slate-700">Minutes</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full ml-auto flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
                    {activeTask.productivityMultiplier}
                  </span>
                </div>

                {/* Step Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
                    Streamlined AI Stages
                  </div>
                  {activeTask.aiAssistedSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white border border-blue-200/80 shadow-sm text-xs text-slate-800 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Tools Highlight */}
                <div className="pt-4 border-t border-blue-100 flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Typical Toolset:</span>
                  {activeTask.toolsUsed.map((tool, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="bg-blue-100/70 text-blue-800 text-[11px] font-medium"
                    >
                      {tool}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-blue-700 font-semibold">
                  <span>Output Velocity: Exponential</span>
                  <span>Total: ~{activeTask.aiAssistedMinutes} Minutes (30–60 min range)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mandatory Transparency & Disclaimers Banner */}
        <div className="rounded-2xl bg-amber-50/70 border border-amber-200/80 p-5 sm:p-6 text-xs text-slate-700 flex items-start gap-3.5 max-w-4xl mx-auto">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-amber-900 block">
              Illustrative Transformation Disclaimer
            </span>
            <p className="leading-relaxed text-slate-600">
              The figures presented above are illustrative scenarios derived from the initiative's process study (PDF Page 8) demonstrating potential time compression. They do not constitute guaranteed outcomes or measured client statistics. Actual productivity results vary based on task complexity, tools employed, team workflows, and the user's proficiency with AI systems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
