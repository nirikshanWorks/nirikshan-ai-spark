import React, { useState } from "react";
import { LEARNING_DOMAINS, ADDITIONAL_TOPICS, LearningDomain } from "@/data/tenXProductivityData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Zap,
  Sparkles,
  Code2,
  BarChart3,
  GraduationCap,
  Cpu,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Layers,
  ChevronRight,
} from "lucide-react";

export const LearningDomainsGrid: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<LearningDomain | null>(null);

  const getDomainIcon = (iconName: string) => {
    switch (iconName) {
      case "Zap":
        return Zap;
      case "Sparkles":
        return Sparkles;
      case "Code2":
        return Code2;
      case "BarChart3":
        return BarChart3;
      case "GraduationCap":
        return GraduationCap;
      case "Cpu":
        return Cpu;
      default:
        return Zap;
    }
  };

  return (
    <section id="domains" className="py-20 lg:py-28 bg-white border-b border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50/60 mb-3 px-3 py-1 text-xs">
            Comprehensive Curriculum Architecture
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Six Core AI Learning Domains
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Our modular training framework spans fundamental workplace productivity up to advanced neural architectures and computer vision implementations.
          </p>
        </div>

        {/* 6 Domains Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-14">
          {LEARNING_DOMAINS.map((domain) => {
            const Icon = getDomainIcon(domain.icon);

            return (
              <div
                key={domain.id}
                className="group relative rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Number and Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-2xl font-black text-slate-300 group-hover:text-blue-500 transition-colors">
                      {domain.number}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {domain.title}
                  </h3>
                  <div className="text-xs font-semibold text-blue-600 mb-3">
                    {domain.tagline}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
                    {domain.description}
                  </p>

                  {/* Sample Topics Preview */}
                  <div className="space-y-1.5 mb-6">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Key Topics Covered
                    </div>
                    {domain.topics.slice(0, 4).map((topic, tIdx) => (
                      <div key={tIdx} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span className="truncate">{topic}</span>
                      </div>
                    ))}
                    {domain.topics.length > 4 && (
                      <div className="text-[11px] text-slate-400 pl-5 italic">
                        +{domain.topics.length - 4} more specialized topics
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-4 border-t border-slate-100">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedDomain(domain)}
                    className="w-full justify-between text-slate-700 hover:text-blue-600 hover:border-blue-300 text-xs font-medium"
                  >
                    <span>View Curriculum Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Cross-Cutting Topics Strip */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Cross-Cutting Competencies Embedded In Every Domain</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {ADDITIONAL_TOPICS.map((topic) => (
              <Badge
                key={topic}
                variant="secondary"
                className="bg-white border border-slate-200 text-slate-700 px-3 py-1 text-xs font-medium hover:border-blue-300 hover:text-blue-700 transition-colors"
              >
                {topic}
              </Badge>
            ))}
          </div>
        </div>

        {/* Domain Detail Modal */}
        <Dialog open={!!selectedDomain} onOpenChange={(open) => !open && setSelectedDomain(null)}>
          <DialogContent className="max-w-2xl bg-white p-6 sm:p-8">
            {selectedDomain && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-2 text-xs font-mono text-blue-600 font-bold mb-1">
                    <span>DOMAIN {selectedDomain.number}</span>
                    <span>•</span>
                    <span>{selectedDomain.tagline}</span>
                  </div>
                  <DialogTitle className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                    {selectedDomain.title}
                  </DialogTitle>
                  <DialogDescription className="text-sm text-slate-600 pt-2 leading-relaxed">
                    {selectedDomain.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-6">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    Complete Module Topics & Focus Areas
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    {selectedDomain.topics.map((topic, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Integrated across school, university, and corporate cohorts
                  </span>
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedDomain(null);
                      const el = document.getElementById("contact-inquiry");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                  >
                    Inquire for Cohort
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
