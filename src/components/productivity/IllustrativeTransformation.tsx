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
  Calculator,
  Sliders,
  Calendar,
  RotateCcw,
} from "lucide-react";

export const IllustrativeTransformation: React.FC = () => {
  const [selectedTaskId, setSelectedTaskId] = useState(TASK_COMPARISONS[0].id);
  const [showCalculator, setShowCalculator] = useState(false);

  // Custom User Calculator State (hours per week)
  const [researchHours, setResearchHours] = useState(6);
  const [writingHours, setWritingHours] = useState(6);
  const [dataHours, setDataHours] = useState(5);
  const [presentationHours, setPresentationHours] = useState(4);

  const activeTask =
    TASK_COMPARISONS.find((t) => t.id === selectedTaskId) || TASK_COMPARISONS[0];

  const totalWeeklyHours = researchHours + writingHours + dataHours + presentationHours;
  const totalMonthlyHours = totalWeeklyHours * 4;
  const monthlyHoursReclaimed = Math.round(totalMonthlyHours * 0.8);
  const annualHoursReclaimed = monthlyHoursReclaimed * 12;
  const annualWeeksReclaimed = (annualHoursReclaimed / 40).toFixed(1);

  return (
    <section id="transformation-showcase" className="py-20 lg:py-28 bg-background border-b border-border transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="outline" className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 bg-blue-50/60 dark:bg-blue-950/40 mb-3 px-3 py-1 text-xs">
            Workflow Transformation
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
            Illustrative Productivity Transformation
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            See how everyday professional tasks are compressed from multi-hour manual grinds into streamlined, human-guided workflows.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <Button
            size="sm"
            onClick={() => setShowCalculator(false)}
            variant={!showCalculator ? "default" : "outline"}
            className={`text-xs font-semibold h-10 px-5 rounded-xl ${
              !showCalculator
                ? "bg-blue-600 text-white shadow-sm"
                : "border-border text-foreground hover:bg-muted"
            }`}
          >
            Explore 4 Standard Task Transformations
          </Button>
          <Button
            size="sm"
            onClick={() => setShowCalculator(true)}
            variant={showCalculator ? "default" : "outline"}
            className={`text-xs font-semibold h-10 px-5 rounded-xl flex items-center gap-2 ${
              showCalculator
                ? "bg-blue-600 text-white shadow-sm"
                : "border-border text-foreground hover:bg-muted"
            }`}
          >
            <Calculator className="w-3.5 h-3.5 text-blue-500" />
            <span>Interactive Team Savings Calculator</span>
          </Button>
        </div>

        {/* View 1: Standard Split Screen Showcase */}
        {!showCalculator ? (
          <>
            {/* Task Selection Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-3xl mx-auto">
              {TASK_COMPARISONS.map((task) => (
                <button
                  key={task.id}
                  onClick={() => setSelectedTaskId(task.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                    task.id === selectedTaskId
                      ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                      : "bg-card text-muted-foreground border-border hover:bg-muted"
                  }`}
                >
                  {task.name.split(" ")[0]} {task.name.split(" ")[1]}
                </button>
              ))}
            </div>

            {/* Split Screen Comparison Showcase */}
            <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-xl mb-8">
              <div className="text-center mb-8 pb-6 border-b border-border">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-1">
                  {activeTask.category} Process Study
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                  {activeTask.name}
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                {/* Left Card: Traditional Workflow */}
                <div className="rounded-2xl bg-muted/20 border border-border p-6 sm:p-7 flex flex-col justify-between shadow-xs">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 text-xs">
                        Traditional Workflow
                      </Badge>
                      <span className="text-xs font-mono text-muted-foreground">Manual Approach</span>
                    </div>

                    {/* Duration Callout */}
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-4xl sm:text-5xl font-black text-foreground font-mono">
                        {activeTask.traditionalHours}
                      </span>
                      <span className="text-xl font-bold text-muted-foreground">Hours</span>
                      <span className="text-xs text-rose-600 dark:text-rose-400 font-medium ml-auto flex items-center gap-1">
                        <Hourglass className="w-3.5 h-3.5" /> High Time Drain
                      </span>
                    </div>

                    {/* Step Breakdown */}
                    <div className="space-y-3 mb-6">
                      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Process Breakdown (Manual)
                      </div>
                      {activeTask.traditionalSteps.map((step, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-card border border-border text-xs text-foreground flex items-start gap-2.5"
                        >
                          <span className="w-5 h-5 rounded-full bg-muted text-foreground font-mono font-bold text-[11px] flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                    <span>Output Velocity: Linear</span>
                    <span className="font-semibold text-foreground">Total: {activeTask.traditionalHours} Hours</span>
                  </div>
                </div>

                {/* Right Card: AI-Assisted Workflow */}
                <div className="rounded-2xl bg-gradient-to-b from-blue-50/70 via-card to-indigo-50/40 dark:from-blue-950/40 dark:via-card dark:to-indigo-950/30 border-2 border-blue-400 dark:border-blue-700 p-6 sm:p-7 flex flex-col justify-between shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-cyan-300" />
                    AI-Assisted Workflow
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-blue-600 text-white text-xs">
                        Nirikshan AI Augmented
                      </Badge>
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">Human + AI</span>
                    </div>

                    {/* Duration Callout */}
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-4xl sm:text-5xl font-black text-blue-600 dark:text-blue-400 font-mono">
                        {activeTask.aiAssistedMinutes}
                      </span>
                      <span className="text-xl font-bold text-foreground">Minutes</span>
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full ml-auto flex items-center gap-1 border border-emerald-300 dark:border-emerald-800">
                        <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
                        {activeTask.productivityMultiplier}
                      </span>
                    </div>

                    {/* Step Breakdown */}
                    <div className="space-y-3 mb-6">
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        Streamlined AI Stages
                      </div>
                      {activeTask.aiAssistedSteps.map((step, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-card border border-blue-200/80 dark:border-blue-900 shadow-sm text-xs text-foreground flex items-start gap-2.5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    {/* Tools Highlight */}
                    <div className="pt-4 border-t border-border flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-[11px] font-bold text-muted-foreground uppercase">Typical Toolset:</span>
                      {activeTask.toolsUsed.map((tool, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="bg-blue-100/70 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 text-[11px] font-medium border-transparent"
                        >
                          {tool}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-blue-600 dark:text-blue-400 font-semibold">
                      <span>Output Velocity: Exponential</span>
                      <span>Total: ~{activeTask.aiAssistedMinutes} Minutes (30–60 min range)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* View 2: Interactive Custom Team Savings Calculator */
          <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-xl mb-8 max-w-5xl mx-auto">
            <div className="text-center mb-8 pb-4 border-b border-border">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-1">
                Custom Impact Estimator
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                Estimate Your Team's Monthly Time Savings
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Adjust the sliders below to match your typical weekly manual workload per person
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Sliders Column */}
              <div className="lg:col-span-7 space-y-6">
                {/* Slider 1: Research */}
                <div className="bg-muted/30 p-4 rounded-2xl border border-border shadow-xs">
                  <div className="flex justify-between text-xs font-semibold text-foreground mb-2">
                    <span>Research & Market Reading</span>
                    <span className="text-blue-600 dark:text-blue-400 font-mono font-bold">{researchHours} hrs/week</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={researchHours}
                    onChange={(e) => setResearchHours(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>0h</span>
                    <span>10h</span>
                    <span>20h</span>
                  </div>
                </div>

                {/* Slider 2: Writing */}
                <div className="bg-muted/30 p-4 rounded-2xl border border-border shadow-xs">
                  <div className="flex justify-between text-xs font-semibold text-foreground mb-2">
                    <span>Drafting Emails, Reports & Proposals</span>
                    <span className="text-blue-600 dark:text-blue-400 font-mono font-bold">{writingHours} hrs/week</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={writingHours}
                    onChange={(e) => setWritingHours(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>0h</span>
                    <span>10h</span>
                    <span>20h</span>
                  </div>
                </div>

                {/* Slider 3: Data */}
                <div className="bg-muted/30 p-4 rounded-2xl border border-border shadow-xs">
                  <div className="flex justify-between text-xs font-semibold text-foreground mb-2">
                    <span>Data Cleaning & Spreadsheet Calculations</span>
                    <span className="text-blue-600 dark:text-blue-400 font-mono font-bold">{dataHours} hrs/week</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={dataHours}
                    onChange={(e) => setDataHours(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>0h</span>
                    <span>10h</span>
                    <span>20h</span>
                  </div>
                </div>

                {/* Slider 4: Presentations */}
                <div className="bg-muted/30 p-4 rounded-2xl border border-border shadow-xs">
                  <div className="flex justify-between text-xs font-semibold text-foreground mb-2">
                    <span>Presentation Decks & Meeting Formatting</span>
                    <span className="text-blue-600 dark:text-blue-400 font-mono font-bold">{presentationHours} hrs/week</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={presentationHours}
                    onChange={(e) => setPresentationHours(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>0h</span>
                    <span>10h</span>
                    <span>20h</span>
                  </div>
                </div>
              </div>

              {/* Real-Time Calculation Output Card */}
              <div className="lg:col-span-5">
                <div className="bg-gradient-to-b from-blue-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-6">
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 text-xs py-1">
                    Projected Reclaimed Potential
                  </Badge>

                  <div>
                    <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 font-mono mb-1">
                      {monthlyHoursReclaimed} Hrs
                    </div>
                    <div className="text-xs text-blue-200 font-medium">
                      Reclaimed per person every month
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800 text-left">
                    <div className="bg-white/10 p-3 rounded-xl">
                      <span className="text-[10px] text-slate-400 block">Total Manual Time</span>
                      <span className="text-sm font-bold text-white font-mono">{totalMonthlyHours}h / month</span>
                    </div>
                    <div className="bg-white/10 p-3 rounded-xl">
                      <span className="text-[10px] text-slate-400 block">Annual Creative Gain</span>
                      <span className="text-sm font-bold text-emerald-300 font-mono">~{annualWeeksReclaimed} Weeks</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      const el = document.getElementById("contact-inquiry");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-3 rounded-xl shadow-md"
                  >
                    <span>Discuss Custom Cohort Roadmap</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mandatory Transparency & Disclaimers Banner */}
        <div className="rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 p-5 sm:p-6 text-xs text-foreground flex items-start gap-3.5 max-w-4xl mx-auto">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-amber-900 dark:text-amber-200 block">
              Illustrative Transformation Disclaimer
            </span>
            <p className="leading-relaxed text-muted-foreground">
              The figures presented above are illustrative scenarios derived from the initiative's process study (PDF Page 8) demonstrating potential time compression. They do not constitute guaranteed outcomes or measured client statistics. Actual productivity results vary based on task complexity, tools employed, team workflows, and the user's proficiency with AI systems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
