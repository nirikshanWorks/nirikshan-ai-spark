import React from "react";
import { DIFFERENTIATORS, Differentiator } from "@/data/tenXProductivityData";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Briefcase,
  Cpu,
  Building2,
  Lightbulb,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export const WhyNirikshanAI: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case "GraduationCap":
        return GraduationCap;
      case "Briefcase":
        return Briefcase;
      case "Cpu":
        return Cpu;
      case "Building2":
        return Building2;
      case "Lightbulb":
        return Lightbulb;
      default:
        return Sparkles;
    }
  };

  return (
    <section id="why-nirikshan" className="py-20 lg:py-28 bg-white border-b border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50/60 mb-3 px-3 py-1 text-xs">
            The Nirikshan Advantage
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            More Than Training. A Complete AI Ecosystem.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Combining industry needs, education, and technology to help people learn, build, apply, and create real-world impact.
          </p>
        </div>

        {/* 5 Differentiator Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {DIFFERENTIATORS.map((diff, idx) => {
            const Icon = getIcon(diff.iconName);
            const isFullSpan = idx === 4;

            return (
              <div
                key={diff.title}
                className={`group p-7 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200/90 hover:border-blue-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${
                  isFullSpan ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {diff.title}
                  </h3>
                  <div className="text-xs font-semibold text-blue-600 mb-3">
                    {diff.subtitle}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {diff.description}
                  </p>

                  <div className="space-y-2">
                    {diff.bulletPoints.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
