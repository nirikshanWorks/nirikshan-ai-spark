import React from "react";
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
} from "lucide-react";

interface AudienceSectionProps {
  onSelectAudience: (audienceId: string) => void;
}

export const AudienceSection: React.FC<AudienceSectionProps> = ({
  onSelectAudience,
}) => {
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

  return (
    <section id="audiences" className="py-20 lg:py-28 bg-slate-50/70 border-b border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50/60 mb-3 px-3 py-1 text-xs">
            Target Audiences
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Who We Work With
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            From K-12 classrooms to university labs, individual professionals, executive boardrooms, and manufacturing shopfloors — our AI training and enablement meet learners and organizations at every maturity stage.
          </p>
        </div>

        {/* 5 Distinct Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {TARGET_AUDIENCES.map((audience, idx) => {
            const Icon = getAudienceIcon(audience.id);
            const isFullSpan = idx === 4; // 5th card spans nicely or centers

            return (
              <div
                key={audience.id}
                className={`group rounded-2xl bg-white border border-slate-200/90 hover:border-blue-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                  isFullSpan ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                {/* Visual Header with Image */}
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={audience.image}
                    alt={audience.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
                  
                  {/* Badge & Icon */}
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/95 text-slate-900 font-semibold shadow-sm text-xs backdrop-blur-sm">
                      {audience.badge}
                    </Badge>
                  </div>
                  
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-600/90 backdrop-blur-sm flex items-center justify-center text-white">
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
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {audience.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
                      {audience.description}
                    </p>

                    {/* Key Focus Points */}
                    <ul className="space-y-2 mb-6">
                      {audience.points.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card CTA */}
                  <div className="pt-4 border-t border-slate-100">
                    <Button
                      variant="ghost"
                      onClick={() => onSelectAudience(audience.id)}
                      className="w-full justify-between text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-semibold text-xs px-3 py-2 rounded-lg group-hover:translate-x-0.5 transition-all"
                    >
                      <span>{audience.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
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
