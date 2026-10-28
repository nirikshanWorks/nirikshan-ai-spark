import React, { useState } from "react";
import { TARGET_AUDIENCES, TargetAudience } from "@/data/tenXProductivityData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  GraduationCap,
  Building2,
  Briefcase,
  Users,
  Compass,
  CheckCircle2,
  Filter,
  Sparkles,
  BookOpen,
  Calendar,
  Layers,
} from "lucide-react";

interface AudienceSectionProps {
  onSelectAudience: (audienceId: string) => void;
}

export const AudienceSection: React.FC<AudienceSectionProps> = ({
  onSelectAudience,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [cardTabState, setCardTabState] = useState<Record<string, "points" | "projects" | "format">>({
    schools: "points",
    universities: "points",
    professionals: "points",
    leadership: "points",
    industries: "points",
  });

  const getAudienceIcon = (id: string) => {
    switch (id) {
      case "schools":
        return Compass;
      case "universities":
        return GraduationCap;
      case "professionals":
        return Briefcase;
      case "leadership":
        return Users;
      case "industries":
        return Building2;
      default:
        return Compass;
    }
  };

  const audienceExtras: Record<
    string,
    { projects: string[]; format: string }
  > = {
    schools: {
      projects: [
        "AI-Generated Interactive Children's Storybook",
        "Safe Digital AI Research Assistant for Science Fair",
        "Prompt Art & Creativity Showcase Portfolio",
      ],
      format: "Weekend Workshops, Summer AI Camps & School Curriculum Add-ons",
    },
    universities: {
      projects: [
        "Full-Stack RAG Knowledge Assistant on Campus Library",
        "Computer Vision Edge Safety Detector with Jetson",
        "AI Agent Autonomous Code Reviewer on GitHub",
      ],
      format: "Semester Credit Modules, 4-Week Bootcamps & Hackathons",
    },
    professionals: {
      projects: [
        "Automated Executive Briefing & Slide Deck Generator",
        "No-Code Email & CRM Triage Pipeline",
        "Custom Business Data Insight Dashboard",
      ],
      format: "Self-Paced Evening Cohorts & Weekend Intensive Sprints",
    },
    leadership: {
      projects: [
        "Enterprise AI Adoption Canvas & Policy Matrix",
        "Vendor Build vs Buy Valuation Spreadsheet",
        "Quarterly Workforce Productivity Assessment Framework",
      ],
      format: "1-Day CXO Briefing Masterclass & Strategic Advisory Retreats",
    },
    industries: {
      projects: [
        "Departmental SOP Automation Pipelines across 5 Pods",
        "Private Internal Knowledge Retrieval Engine",
        "Computer Vision Inline Quality & PPE Inspector",
      ],
      format: "Turnkey Enterprise Cohorts, Workflow Audits & Pilot Deployments",
    },
  };

  const filteredAudiences =
    activeFilter === "all"
      ? TARGET_AUDIENCES
      : TARGET_AUDIENCES.filter((a) => a.id === activeFilter);

  const setCardTab = (id: string, tab: "points" | "projects" | "format") => {
    setCardTabState((prev) => ({ ...prev, [id]: tab }));
  };

  return (
    <section id="audiences" className="py-20 lg:py-28 bg-muted/20 border-b border-border transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="outline" className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 bg-blue-50/60 dark:bg-blue-950/40 mb-3 px-3 py-1 text-xs">
            Target Audiences
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
            Who We Work With
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            From K-12 classrooms to university labs, individual professionals, executive boardrooms, and manufacturing shopfloors — our AI training and enablement meet learners and organizations at every maturity stage.
          </p>
        </div>

        {/* Interactive Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
              activeFilter === "all"
                ? "bg-foreground text-background border-foreground shadow-sm"
                : "bg-card text-muted-foreground border-border hover:bg-muted"
            }`}
          >
            All Audiences (5)
          </button>
          {TARGET_AUDIENCES.map((aud) => (
            <button
              key={aud.id}
              onClick={() => setActiveFilter(aud.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                activeFilter === aud.id
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-card text-muted-foreground border-border hover:bg-muted"
              }`}
            >
              {aud.title}
            </button>
          ))}
        </div>

        {/* Audience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredAudiences.map((audience, idx) => {
            const Icon = getAudienceIcon(audience.id);
            const isFullSpan = filteredAudiences.length === 5 && idx === 4;
            const currentTab = cardTabState[audience.id] || "points";
            const extra = audienceExtras[audience.id] || { projects: [], format: "" };

            return (
              <div
                key={audience.id}
                className={`group rounded-2xl bg-card border border-border hover:border-blue-400 dark:hover:border-blue-500 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                  isFullSpan ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                {/* Visual Header with Image */}
                <div className="relative h-44 overflow-hidden bg-slate-900">
                  <img
                    src={audience.image}
                    alt={audience.title}
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

                  <div className="absolute top-3 left-3">
                    <Badge className="bg-slate-900/90 text-white border-white/20 font-semibold shadow-sm text-xs backdrop-blur-sm">
                      {audience.badge}
                    </Badge>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-600/90 backdrop-blur-sm flex items-center justify-center text-white shadow-sm">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-medium text-slate-200">
                        {audience.subtitle}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {audience.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed">
                      {audience.description}
                    </p>

                    {/* Interactive Tab Switcher in Card */}
                    <div className="flex items-center gap-1.5 p-1 bg-muted rounded-lg mb-4 text-[11px] font-semibold">
                      <button
                        onClick={() => setCardTab(audience.id, "points")}
                        className={`flex-1 py-1 rounded text-center transition-all ${
                          currentTab === "points"
                            ? "bg-card text-blue-600 dark:text-blue-400 shadow-xs font-bold"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Core Focus
                      </button>
                      <button
                        onClick={() => setCardTab(audience.id, "projects")}
                        className={`flex-1 py-1 rounded text-center transition-all ${
                          currentTab === "projects"
                            ? "bg-card text-blue-600 dark:text-blue-400 shadow-xs font-bold"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Capstones
                      </button>
                      <button
                        onClick={() => setCardTab(audience.id, "format")}
                        className={`flex-1 py-1 rounded text-center transition-all ${
                          currentTab === "format"
                            ? "bg-card text-blue-600 dark:text-blue-400 shadow-xs font-bold"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Format
                      </button>
                    </div>

                    {/* Tab 1: Points */}
                    {currentTab === "points" && (
                      <ul className="space-y-2 mb-6 min-h-[120px]">
                        {audience.points.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2 text-xs text-foreground/90">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Tab 2: Sample Projects */}
                    {currentTab === "projects" && (
                      <div className="space-y-2 mb-6 min-h-[120px]">
                        <span className="text-[10px] font-bold uppercase text-muted-foreground block mb-1">
                          Verifiable Practical Capstones
                        </span>
                        {extra.projects.map((proj, pIdx) => (
                          <div
                            key={pIdx}
                            className="p-2 rounded bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/60 text-xs text-foreground flex items-start gap-2 font-medium"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                            <span>{proj}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tab 3: Format */}
                    {currentTab === "format" && (
                      <div className="space-y-3 mb-6 min-h-[120px]">
                        <span className="text-[10px] font-bold uppercase text-muted-foreground block">
                          Delivery & Engagement Structure
                        </span>
                        <div className="p-3 rounded-xl bg-muted/40 border border-border text-xs text-foreground">
                          <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400 mb-1.5" />
                          <div className="font-semibold text-foreground mb-0.5">Customized Cohort Modes:</div>
                          <div className="text-muted-foreground">{extra.format}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card CTA */}
                  <div className="pt-4 border-t border-border flex items-center gap-2">
                    <Button
                      onClick={() => onSelectAudience(audience.id)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2.5 rounded-xl shadow-md transition-all flex items-center justify-between"
                    >
                      <span>{audience.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
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
