import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Compass,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Orbit,
  Star,
  Sun,
  Moon,
  Clock,
  Layers,
  Cpu,
  Lock,
  Calendar,
  Eye,
  Info,
  ChevronRight,
  Video,
  Phone,
  FileText,
  Flame,
  Award,
} from "lucide-react";
import {
  ASTRO_NIRIKSHAN_META,
  ASTRO_FEATURE_BLOCKS,
  FEATURED_ASTROLOGERS,
  TECH_INNOVATION_PILLARS,
  ASTRO_NIRIKSHAN_EXTERNAL_URL,
  heroMandalaImg,
  zodiacEngravingsImg,
} from "@/data/astroNirikshanData";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ScrollAnimations";

export const AstroNirikshanShowcase: React.FC = () => {
  const handleLaunchAstro = () => {
    // Open the official Astro Nirikshan platform in a new tab if configured
    window.open(ASTRO_NIRIKSHAN_EXTERNAL_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="astro-nirikshan"
      className="relative bg-slate-950 text-slate-100 overflow-hidden selection:bg-amber-500 selection:text-slate-950 border-t border-amber-500/20"
    >
      {/* ─────────────────────────────────────────────────────────────
          CELESTIAL BACKGROUND CANVAS & SACRED GEOMETRY OVERLAYS
      ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Astrolabe Watermark */}
        <div
          className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-no-repeat bg-contain opacity-[0.06] blur-[1px]"
          style={{ backgroundImage: `url(${heroMandalaImg})` }}
        />
        <div
          className="absolute bottom-10 -left-40 w-[700px] h-[700px] bg-no-repeat bg-contain opacity-[0.05]"
          style={{ backgroundImage: `url(${zodiacEngravingsImg})` }}
        />

        {/* Ambient Cosmic Lights (Deep navy, warm amber/gold, cosmic blue) */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-2/3 right-10 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10">
        {/* ─────────────────────────────────────────────────────────────
            1. SHOWCASE HERO: WHERE SACRED COSMIC SCIENCES MEET AI PRECISION
        ───────────────────────────────────────────────────────────── */}
        <div className="pt-24 pb-20 sm:pt-32 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <FadeUp className="text-center max-w-4xl mx-auto space-y-6">
            {/* Top Eyebrow Emblem */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-mono tracking-[0.2em] text-amber-300 shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
              <span className="font-bold">{ASTRO_NIRIKSHAN_META.productName}</span>
              <span className="text-slate-400">•</span>
              <span className="text-amber-200/90">{ASTRO_NIRIKSHAN_META.hindiName}</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
              Where Sacred Cosmic Sciences Meet{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
                AI Precision
              </span>
            </h2>

            {/* Supporting Subtitle */}
            <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
              A flagship digital platform by{" "}
              <strong className="text-white font-semibold">
                {ASTRO_NIRIKSHAN_META.parentCompany}
              </strong>
              . Uniting ancient Vedic Jyotish, Chaldean numerological frequencies,
              and spatial Vastu with client-side ephemeris calculations and revered
              lineage masters.
            </p>

            {/* Quick Five Discipline Pills */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {[
                "Vedic Astrology",
                "Chaldean Numerology",
                "Vastu Shastra",
                "Janam Kundli",
                "Interactive Tarot",
              ].map((label) => (
                <span
                  key={label}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-mono bg-white/5 border border-amber-500/20 text-amber-200/90 shadow-sm backdrop-blur-sm"
                >
                  ✦ {label}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={handleLaunchAstro}
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-600 hover:to-amber-500 text-slate-950 font-bold px-8 py-6 rounded-2xl shadow-xl shadow-amber-500/20 transition-all group"
              >
                <span>Launch Astro Nirikshan</span>
                <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>

              <a href="#overview">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-amber-500/30 hover:border-amber-400 hover:bg-amber-500/10 text-amber-200 bg-slate-900/60 px-8 py-6 rounded-2xl font-semibold backdrop-blur-sm"
                >
                  <span>Explore Product Overview</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </a>
            </div>

            {/* Verification & Privacy Bar */}
            <div className="pt-8 border-t border-slate-800/80 max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Client-Side Privacy</span>
              </span>
              <span className="text-slate-700">•</span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Sub-Second Ephemeris Computation</span>
              </span>
              <span className="text-slate-700">•</span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Award className="w-4 h-4 text-blue-400" />
                <span>Verified Lineage Masters</span>
              </span>
            </div>
          </FadeUp>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            2. PRODUCT OVERVIEW & FIVE CORE DISCIPLINES
        ───────────────────────────────────────────────────────────── */}
        <div id="overview" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-300 uppercase tracking-[0.2em] mb-2">
                <Layers className="w-3.5 h-3.5" />
                Platform Overview
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                {ASTRO_NIRIKSHAN_META.overviewHeading}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {ASTRO_NIRIKSHAN_META.overviewDescription}
              </p>
            </FadeUp>
          </div>

          {/* Five Visual Feature Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ASTRO_FEATURE_BLOCKS.map((block, idx) => (
              <FadeUp key={block.id} delay={idx * 0.08}>
                <Card
                  className={`h-full flex flex-col justify-between overflow-hidden rounded-3xl border border-amber-500/25 bg-gradient-to-b from-slate-900/90 to-slate-950/90 text-white shadow-xl hover:border-amber-400/50 hover:shadow-amber-500/10 transition-all duration-300 group ${
                    idx === 4 ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <div>
                    {/* Visual Artwork Banner */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                      <img
                        src={block.image}
                        alt={block.discipline}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                      <div className="absolute top-3 left-3">
                        <Badge className="bg-slate-950/80 text-amber-300 border-amber-500/30 text-[10px] font-mono tracking-wider uppercase backdrop-blur-md">
                          {block.discipline}
                        </Badge>
                      </div>

                      <div className="absolute bottom-3 right-3">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950/70 border border-slate-700 text-slate-300 backdrop-blur-md">
                          Lead: {block.expertLead.split("&")[0].trim()}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
                        {block.title}
                      </h4>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                        {block.shortDesc}
                      </p>

                      <p className="text-xs text-slate-400 leading-relaxed mb-5 line-clamp-2">
                        {block.detailedDesc}
                      </p>

                      {/* Capabilities checklist */}
                      <div className="space-y-2 mb-6">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400/90 font-bold">
                          Core Capabilities:
                        </div>
                        <ul className="space-y-1.5">
                          {block.capabilities.map((cap, i) => (
                            <li
                              key={i}
                              className="text-xs text-slate-300 flex items-start gap-2"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                              <span className="truncate">{cap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {block.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-slate-800 text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Button
                      onClick={handleLaunchAstro}
                      variant="outline"
                      className="w-full rounded-xl border-amber-500/30 bg-slate-950/60 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-400 text-amber-200 text-xs font-semibold py-2.5 transition-all flex items-center justify-center gap-1.5 group/subbtn"
                    >
                      <span>Explore {block.discipline}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/subbtn:translate-x-1" />
                    </Button>
                  </div>
                </Card>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            3. MEET THE ASTROLOGERS (GENUINE LINEAGE MASTERS)
        ───────────────────────────────────────────────────────────── */}
        <div id="astrologers" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80 bg-gradient-to-b from-slate-950 via-[#0a1024] to-slate-950">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-300 uppercase tracking-[0.2em] mb-2">
                <Award className="w-3.5 h-3.5" />
                Guiding Lineage
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Meet Our Astrologers
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Direct personal guidance and algorithmic verification by eminent
                lineage scholars dedicated to scriptural authenticity, mathematical
                rigor, and compassionate clarity.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {FEATURED_ASTROLOGERS.map((astrologer, idx) => (
              <FadeUp key={astrologer.name} delay={idx * 0.1}>
                <Card className="h-full rounded-3xl border border-amber-500/30 bg-slate-900/80 p-6 sm:p-8 backdrop-blur text-white flex flex-col justify-between hover:border-amber-400/60 transition-all duration-300 shadow-xl">
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row gap-5 items-start">
                      {/* Astrologer Portrait */}
                      <div className="relative shrink-0">
                        <img
                          src={astrologer.image}
                          alt={astrologer.name}
                          className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 border-amber-500/30 shadow-lg"
                        />
                        <span className="absolute -bottom-2 -right-1 flex items-center gap-1 bg-emerald-700 text-white text-[10px] font-mono px-2 py-0.5 rounded-full shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping" />
                          Verified Master
                        </span>
                      </div>

                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider">
                            {astrologer.experience}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400">
                            ★ {astrologer.rating}
                          </span>
                        </div>

                        <h4 className="text-2xl sm:text-3xl font-extrabold text-white">
                          {astrologer.name}
                        </h4>

                        {astrologer.hindiName && (
                          <div className="text-xs font-mono text-amber-200/80">
                            {astrologer.hindiName}
                          </div>
                        )}

                        <p className="text-xs font-mono text-amber-300 font-medium">
                          {astrologer.title}
                        </p>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-sm leading-relaxed text-slate-300">
                      {astrologer.bio}
                    </p>

                    {/* Specialisations */}
                    <div className="space-y-2">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-amber-400/90 font-semibold">
                        Specialisations:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {astrologer.specialisations.map((spec) => (
                          <span
                            key={spec}
                            className="text-xs font-mono px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Focus Areas */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-800">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                        Focus Areas:
                      </div>
                      <ul className="space-y-1">
                        {astrologer.focusAreas.map((fa, i) => (
                          <li
                            key={i}
                            className="text-xs text-slate-300 flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                            <span>{fa}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Consultation Action */}
                  <div className="pt-6 mt-6 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                      <span className="flex items-center gap-1 text-slate-300">
                        <Video className="w-3.5 h-3.5 text-amber-400" /> Video
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-300">
                        <Phone className="w-3.5 h-3.5 text-amber-400" /> Audio
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-300">
                        <FileText className="w-3.5 h-3.5 text-amber-400" /> PDF Dossier
                      </span>
                    </div>

                    <Button
                      onClick={handleLaunchAstro}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs px-5 py-2.5 shadow-md shadow-amber-500/20"
                    >
                      <span>Consult {astrologer.name.split(" ")[1]}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </div>
                </Card>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            4. TECHNOLOGY & INNOVATION (RIGOROUS & ETHICAL)
        ───────────────────────────────────────────────────────────── */}
        <div id="technology" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80 bg-slate-900/40">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-blue-300 uppercase tracking-[0.2em] mb-2">
                <Cpu className="w-3.5 h-3.5 text-blue-400" />
                Technical Architecture
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Technology &amp; Innovation
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                How Nirikshan AI Pvt. Ltd. applies modern software engineering,
                client-side mathematical computation, and privacy-first architecture
                to ancient cultural sciences.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {TECH_INNOVATION_PILLARS.map((pillar, idx) => (
              <FadeUp key={pillar.title} delay={idx * 0.06}>
                <div className="h-full rounded-3xl border border-slate-800 bg-slate-900/90 p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all shadow-md group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/5 border border-slate-700 text-amber-300">
                        {pillar.badge}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>

                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                      {pillar.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400">
                    <span className="text-amber-400 font-semibold">Engine: </span>
                    {pillar.highlight}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Ethical Charter Box */}
          <div className="mt-12 max-w-4xl mx-auto rounded-3xl border border-amber-500/20 bg-amber-500/5 p-6 sm:p-8 backdrop-blur">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-1">
                <Info className="w-5 h-5" />
              </div>
              <div className="space-y-1 text-xs text-slate-300 leading-relaxed">
                <h5 className="font-bold text-sm text-amber-200">
                  Ethical &amp; Transparent Technology Disclosure
                </h5>
                <p>
                  Astro Nirikshan uses algorithmic precision to compute ephemeris
                  angles, house cusps, Chaldean sound frequency values, and 36-point
                  Guna scores. We do not claim that artificial intelligence generates
                  supernatural or mystical prophecies. Instead, our technology brings
                  unmatched computational speed, intuitive user interaction, and
                  absolute client-side privacy to traditional cultural sciences.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            6. PRODUCT CALL TO ACTION (CTA)
        ───────────────────────────────────────────────────────────── */}
        <div className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center border-t border-slate-800/80">
          <FadeUp className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-xs font-semibold text-amber-300 uppercase tracking-[0.2em]">
              <Compass className="w-3.5 h-3.5" />
              Begin Your Cosmic Journey
            </div>

            <h3 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              {ASTRO_NIRIKSHAN_META.ctaHeading}
            </h3>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {ASTRO_NIRIKSHAN_META.ctaDescription}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={handleLaunchAstro}
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-600 hover:to-amber-500 text-slate-950 font-bold px-9 py-6 rounded-2xl shadow-2xl shadow-amber-500/25 transition-all group"
              >
                <span>Launch Astro Nirikshan</span>
                <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>

              <Link to="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-slate-700 hover:border-slate-500 text-slate-200 bg-slate-900/60 px-8 py-6 rounded-2xl font-semibold backdrop-blur-sm"
                >
                  <span>Discover Nirikshan AI</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>

            {/* Subtle Cultural Disclaimer */}
            <p className="pt-10 text-[11px] text-slate-400 max-w-3xl mx-auto leading-relaxed border-t border-slate-800/80 italic">
              {ASTRO_NIRIKSHAN_META.disclaimer}
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
};

export default AstroNirikshanShowcase;

