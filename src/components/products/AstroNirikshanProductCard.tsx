import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Compass,
  Sparkles,
  ArrowRight,
  Orbit,
  Star,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import astrolabeHeroImg from "@/assets/astro/astrolabe-hero.jpg";
import {
  ASTRO_NIRIKSHAN_META,
  FEATURED_ASTROLOGERS,
} from "@/data/astroNirikshanData";

interface AstroNirikshanProductCardProps {
  onExploreClick?: () => void;
  className?: string;
  variant?: "spotlight" | "compact";
}

export const AstroNirikshanProductCard: React.FC<AstroNirikshanProductCardProps> = ({
  onExploreClick,
  className = "",
  variant = "spotlight",
}) => {
  const handleScrollToShowcase = (e: React.MouseEvent) => {
    if (onExploreClick) {
      e.preventDefault();
      onExploreClick();
      return;
    }
    const showcase = document.getElementById("astro-nirikshan");
    if (showcase) {
      e.preventDefault();
      showcase.scrollIntoView({ behavior: "smooth" });
    }
  };

  const featureLabels = [
    { name: "Vedic Astrology", icon: Orbit },
    { name: "Chaldean Numerology", icon: Sparkles },
    { name: "Vastu Shastra", icon: Compass },
    { name: "Janam Kundli", icon: Star },
    { name: "Interactive Tarot", icon: ShieldCheck },
  ];

  if (variant === "compact") {
    return (
      <Card
        className={`group relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-slate-950 via-[#0b1329] to-[#12102e] text-white shadow-xl hover:border-amber-400/60 transition-all duration-300 hover:-translate-y-1 ${className}`}
      >
        <div className="relative h-48 w-full overflow-hidden bg-slate-950">
          <img
            src={astrolabeHeroImg}
            alt="Astro Nirikshan"
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1329] via-[#0b1329]/40 to-transparent" />
          <div className="absolute top-3 left-3">
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-[10px] uppercase font-mono tracking-wider backdrop-blur-md">
              {ASTRO_NIRIKSHAN_META.category}
            </Badge>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-amber-300/90 font-semibold">
              {ASTRO_NIRIKSHAN_META.productName}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-2 leading-snug">
            {ASTRO_NIRIKSHAN_META.cardHeadline}
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-5">
            {ASTRO_NIRIKSHAN_META.cardDescription}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-6">
            {featureLabels.map((lbl) => (
              <span
                key={lbl.name}
                className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-200"
              >
                {lbl.name}
              </span>
            ))}
          </div>

          <a
            href="#astro-nirikshan"
            onClick={handleScrollToShowcase}
            className="w-full py-2.5 px-4 rounded-xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-400 transition-all text-xs font-semibold flex items-center justify-center gap-2 group/btn"
          >
            <span>Explore Astro Nirikshan</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
          </a>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={`group relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-[#070b19] via-[#0d1633] to-[#161233] text-white shadow-2xl transition-all duration-300 hover:border-amber-400/60 hover:shadow-amber-500/10 ${className}`}
    >
      {/* Background Astrolabe Texture & Golden Glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid lg:grid-cols-12 gap-8 p-6 sm:p-10 lg:p-12 items-center">
        {/* Left Editorial Section */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Category Label */}
            <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/30 text-xs font-mono tracking-widest uppercase px-3.5 py-1 backdrop-blur-md">
              <Compass className="w-3 h-3 mr-1.5 text-amber-400" />
              {ASTRO_NIRIKSHAN_META.category}
            </Badge>

            {/* Parent Company Endorsement */}
            <span className="text-[11px] font-mono text-slate-400">
              Developed by{" "}
              <strong className="text-slate-200">
                {ASTRO_NIRIKSHAN_META.parentCompany}
              </strong>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-2">
              {/* Product Logo Emblem */}
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-300 p-0.5 shadow-lg shadow-amber-500/20">
                <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center">
                  <Orbit className="w-5 h-5 text-amber-300 animate-[spin_12s_linear_infinite]" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
                  <span>{ASTRO_NIRIKSHAN_META.productName}</span>
                  <span className="text-xs font-normal text-amber-300/80 font-mono">
                    ({ASTRO_NIRIKSHAN_META.hindiName})
                  </span>
                </h3>
                <p className="text-xs font-mono text-amber-400/90 tracking-wide">
                  {ASTRO_NIRIKSHAN_META.brandTagline}
                </p>
              </div>
            </div>

            <h4 className="text-xl sm:text-2xl font-bold text-amber-100 mt-4 leading-snug">
              {ASTRO_NIRIKSHAN_META.cardHeadline}
            </h4>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
            {ASTRO_NIRIKSHAN_META.cardDescription}
          </p>

          {/* Five Feature Labels */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400/90 font-semibold block">
              Five Traditional Disciplines with AI Precision:
            </span>
            <div className="flex flex-wrap gap-2">
              {featureLabels.map((lbl) => {
                const IconComponent = lbl.icon;
                return (
                  <div
                    key={lbl.name}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-amber-500/15 border border-amber-500/20 text-xs font-medium text-slate-200 transition-colors"
                  >
                    <IconComponent className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>{lbl.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a href="#astro-nirikshan" onClick={handleScrollToShowcase}>
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-600 hover:to-amber-500 text-slate-950 font-bold px-7 py-6 rounded-2xl shadow-lg shadow-amber-500/25 transition-all group/btn"
              >
                <span>Explore Astro Nirikshan</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </a>

            <Link to="/products/astro-nirikshan">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-amber-500/30 hover:border-amber-400 hover:bg-amber-500/10 text-amber-200 bg-slate-950/60 px-6 py-6 rounded-2xl font-semibold text-xs tracking-wide"
              >
                <span>Dedicated Product Page</span>
              </Button>
            </Link>
          </div>

          {/* Lineage & Privacy Strip */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Client-Side Ephemeris Calculations</span>
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              <span>
                Guided by {FEATURED_ASTROLOGERS.map((a) => a.name.split(" ")[1]).join(" & ")}
              </span>
            </span>
          </div>
        </div>

        {/* Right Visual Composition */}
        <div className="lg:col-span-5">
          <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden border border-amber-500/40 bg-slate-950/80 shadow-2xl group/img">
            {/* Visual Header Image */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <img
                src={astrolabeHeroImg}
                alt="Astro Nirikshan Celestial Astrolabe"
                className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono">
                <span className="px-2.5 py-1 rounded-full bg-slate-950/80 border border-amber-500/30 text-amber-300 backdrop-blur-md">
                  Vedic Astrolabe Matrix
                </span>
                <span className="text-slate-300 text-[11px]">
                  Zero Data Storage
                </span>
              </div>
            </div>

            {/* Sub-card with Astrologers Teaser */}
            <div className="p-5 space-y-3 bg-gradient-to-b from-slate-950 to-[#0c142c]">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Featured Lineage Scholars</span>
                <span className="text-amber-400">Verified Masters</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {FEATURED_ASTROLOGERS.map((astrologer) => (
                  <div
                    key={astrologer.name}
                    className="p-2.5 rounded-xl bg-white/5 border border-slate-800 flex items-center gap-2.5 hover:border-amber-500/30 transition-colors"
                  >
                    <img
                      src={astrologer.image}
                      alt={astrologer.name}
                      className="w-10 h-10 rounded-lg object-cover border border-amber-500/30 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">
                        {astrologer.name}
                      </div>
                      <div className="text-[10px] font-mono text-amber-300 truncate">
                        {astrologer.experience}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AstroNirikshanProductCard;

