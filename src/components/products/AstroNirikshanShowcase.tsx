import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Compass,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
  Cpu,
  Lock,
  Award,
  Video,
  Phone,
  FileText
} from "lucide-react";
import {
  ASTRO_NIRIKSHAN_META,
  ASTRO_FEATURE_BLOCKS,
  FEATURED_ASTROLOGERS,
  TECH_INNOVATION_PILLARS,
  ASTRO_NIRIKSHAN_EXTERNAL_URL,
} from "@/data/astroNirikshanData";

export const AstroNirikshanShowcase: React.FC = () => {
  const handleLaunchAstro = () => {
    window.open(ASTRO_NIRIKSHAN_EXTERNAL_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-ivory dark:bg-charcoal text-charcoal dark:text-ivory selection:bg-burntamber selection:text-white font-sans">
      {/* ══════════════════════════════════════════════════════
          SECTION 01 — SHOWCASE HERO (Editorial Split-Screen)
      ══════════════════════════════════════════════════════ */}
      <section className="border-b border-concrete/40 dark:border-charcoal-border bg-charcoal text-ivory relative overflow-hidden">
        <div className="absolute inset-0 tech-grid-bg opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-20 relative z-10">
          <div className="flex items-center justify-between pb-4 mb-8 border-b border-charcoal-border text-[11px] font-mono tracking-widest text-concrete uppercase">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-burntamber inline-block animate-pulse" />
              <span>SEC_01 // COMPUTATIONAL JYOTISH &amp; COSMIC SCIENCES</span>
              <span className="hidden sm:inline">//</span>
              <span className="hidden sm:inline">ASTRO_NIRIKSHAN_CORE</span>
            </div>
            <div className="flex items-center gap-3">
              <span>CALCULATION: 100% CLIENT-SIDE</span>
              <span>//</span>
              <span className="text-sage font-bold">STATUS: PRODUCTION</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-block px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] bg-charcoal-surface border border-charcoal-border text-burntamber">
                ANCIENT SCRIPTURAL MATHEMATICS <span className="text-concrete">·</span> MODERN CLIENT PRIVACY
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-display tracking-tight leading-[1.02] text-ivory">
                Where Sacred Cosmic Sciences
                <br />
                <span className="font-serif italic font-normal text-concrete">
                  Meet <span className="text-burntamber">Mathematical Precision</span>.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-concrete max-w-2xl leading-relaxed font-sans">
                A specialized digital platform developed by <strong className="text-ivory">{ASTRO_NIRIKSHAN_META.parentCompany}</strong>. Uniting classical Vedic Jyotish, Chaldean numerological frequencies, Vastu spatial geometry, and Janam Kundli with 100% client-side ephemeris computation and revered lineage scholars.
              </p>

              {/* Five Core Discipline Tags */}
              <div className="pt-2 flex flex-wrap gap-2">
                {[
                  "Vedic Astrology",
                  "Chaldean Numerology",
                  "Vastu Shastra",
                  "Janam Kundli",
                  "Interactive Tarot",
                ].map((label) => (
                  <span
                    key={label}
                    className="px-3 py-1 text-xs font-mono bg-charcoal-surface border border-burntamber/30 text-burntamber"
                  >
                    // {label}
                  </span>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Button
                  onClick={handleLaunchAstro}
                  className="bg-burntamber hover:bg-burntamber/90 text-white font-mono uppercase tracking-wider text-xs px-8 h-12 rounded-none font-bold transition-all shadow-lg flex items-center gap-2"
                >
                  <span>Launch Astro Nirikshan Platform</span>
                  <ExternalLink size={14} />
                </Button>

                <a href="#disciplines">
                  <Button
                    variant="outline"
                    className="border-charcoal-border text-ivory hover:border-burntamber hover:text-burntamber hover:bg-burntamber/5 text-xs font-mono uppercase tracking-wider px-7 h-12 rounded-none transition-all"
                  >
                    Inspect 5 Core Disciplines
                  </Button>
                </a>
              </div>
            </div>

            {/* Right Column: Architectural Privacy Guarantee */}
            <div className="lg:col-span-4 border border-charcoal-border bg-charcoal-surface p-6 sm:p-8 space-y-6">
              <div className="text-[10px] font-mono tracking-widest text-burntamber uppercase pb-2 border-b border-charcoal-border">
                PRIVACY &amp; COMPUTATION BENCHMARKS
              </div>

              <div className="space-y-4 font-mono text-xs text-concrete">
                <div>
                  <div className="text-3xl font-bold font-display text-sage">100%</div>
                  <div className="text-[10px] uppercase text-concrete tracking-wider mt-0.5">
                    CLIENT-SIDE BROWSER PRIVACY
                  </div>
                  <p className="text-[10px] text-concrete/70 mt-0.5">
                    Birth date, time, and coordinates are never transmitted or stored on cloud servers.
                  </p>
                </div>

                <div className="border-t border-charcoal-border/70 pt-3">
                  <div className="text-3xl font-bold font-display text-ivory">&lt;0.2s</div>
                  <div className="text-[10px] uppercase text-concrete tracking-wider mt-0.5">
                    EPHEMERIS CALCULATION TIME
                  </div>
                  <p className="text-[10px] text-concrete/70 mt-0.5">
                    Sub-second planetary degrees, dasha periods, and nakshatra calculations.
                  </p>
                </div>

                <div className="border-t border-charcoal-border/70 pt-3">
                  <div className="text-3xl font-bold font-display text-burntamber">VERIFIED</div>
                  <div className="text-[10px] uppercase text-concrete tracking-wider mt-0.5">
                    LINEAGE SCHOLAR AUDITED
                  </div>
                  <p className="text-[10px] text-concrete/70 mt-0.5">
                    Traditional Parashari &amp; Jaimini mathematical algorithms verified by scholars.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 02 — THE FIVE CORE DISCIPLINES
      ══════════════════════════════════════════════════════ */}
      <section id="disciplines" className="py-16 md:py-24 border-b border-concrete/40 dark:border-charcoal-border bg-ivory dark:bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-concrete/30 dark:border-charcoal-border gap-4">
            <div>
              <span className="text-[11px] font-mono tracking-widest text-burntamber uppercase block mb-1">
                SEC_02 // SYSTEM DISCIPLINES &amp; MODULES
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-charcoal dark:text-ivory">
                Five Classical Disciplines.
                <br />
                Deterministic Algorithms.
              </h2>
            </div>
            <p className="text-xs font-mono text-concrete-dark dark:text-concrete max-w-md">
              EVERY CALCULATION RUNS ENTIRELY INSIDE YOUR LOCAL WEB BROWSER WITH ZERO INTERMEDIARY DATA EXFILTRATION.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ASTRO_FEATURE_BLOCKS.map((block, idx) => (
              <div
                key={block.id}
                className="p-6 border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal-surface flex flex-col justify-between space-y-4 hover:border-burntamber transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-concrete/20 dark:border-charcoal-border text-[10px] font-mono">
                    <span className="text-burntamber font-bold">0{idx + 1} //</span>
                    <span className="text-concrete uppercase">{block.discipline}</span>
                  </div>

                  {/* Artwork Screenshot */}
                  <div className="aspect-[16/10] overflow-hidden border border-concrete/30 dark:border-charcoal-border bg-charcoal mb-4 relative">
                    <img
                      src={block.image}
                      alt={block.discipline}
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute bottom-2 left-2 bg-charcoal/90 px-2 py-0.5 text-[9px] font-mono text-burntamber border border-charcoal-border">
                      LEAD: {block.expertLead.split("&")[0].trim()}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-display text-charcoal dark:text-ivory group-hover:text-burntamber transition-colors mb-2">
                    {block.title}
                  </h3>

                  <p className="text-xs font-sans text-concrete-dark dark:text-concrete leading-relaxed mb-4">
                    {block.shortDesc}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-concrete/15 dark:border-charcoal-border text-[11px] font-mono text-concrete-dark dark:text-concrete">
                    <div className="text-[10px] font-bold text-burntamber uppercase mb-1">CAPABILITIES:</div>
                    {block.capabilities.slice(0, 3).map((cap, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 bg-burntamber inline-block" />
                        <span className="truncate">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-concrete/20 dark:border-charcoal-border flex items-center justify-between">
                  <Button
                    onClick={handleLaunchAstro}
                    variant="outline"
                    className="border-concrete/40 dark:border-charcoal-border hover:border-burntamber hover:text-burntamber text-xs font-mono uppercase tracking-wider w-full rounded-none h-10"
                  >
                    <span>Launch {block.discipline}</span>
                    <ArrowRight size={13} className="ml-1.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 03 — SCHOLAR LINEAGE DOSSIERS
      ══════════════════════════════════════════════════════ */}
      <section id="scholars" className="py-16 md:py-24 border-b border-concrete/40 dark:border-charcoal-border bg-techlight/30 dark:bg-charcoal-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-concrete/30 dark:border-charcoal-border gap-4">
            <div>
              <span className="text-[11px] font-mono tracking-widest text-burntamber uppercase block mb-1">
                SEC_03 // VERIFIED LINEAGE SCHOLARS
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-charcoal dark:text-ivory">
                Scriptural Authenticity.
                <br />
                Eminent Practitioners.
              </h2>
            </div>
            <p className="text-xs font-mono text-concrete-dark dark:text-concrete max-w-md">
              ALGORITHMIC VERIFICATION AND PERSONAL CONSULTATIONS GUIDED BY RESPECTED LINEAGE MASTERS.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {FEATURED_ASTROLOGERS.map((astrologer) => (
              <div
                key={astrologer.name}
                className="p-6 sm:p-8 border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal flex flex-col justify-between space-y-6 hover:border-burntamber transition-all group"
              >
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-12 gap-6 items-start">
                    <div className="sm:col-span-5 aspect-[4/5] border border-charcoal/20 dark:border-charcoal-border overflow-hidden bg-charcoal relative">
                      <img
                        src={astrologer.image}
                        alt={astrologer.name}
                        className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                      />
                      <div className="absolute bottom-2 left-2 bg-charcoal/90 px-2 py-0.5 text-[8px] font-mono text-burntamber border border-charcoal-border">
                        VERIFIED MASTER · {astrologer.rating} ★
                      </div>
                    </div>

                    <div className="sm:col-span-7 space-y-2">
                      <div className="text-[10px] font-mono text-burntamber tracking-widest uppercase font-semibold">
                        {astrologer.experience} EXPERIENCE
                      </div>
                      <h3 className="text-2xl font-bold font-display text-charcoal dark:text-ivory group-hover:text-burntamber transition-colors">
                        {astrologer.name}
                      </h3>
                      {astrologer.hindiName && (
                        <div className="text-xs font-mono text-concrete">
                          {astrologer.hindiName}
                        </div>
                      )}
                      <div className="text-xs font-mono text-sage font-bold">
                        {astrologer.title}
                      </div>
                      <p className="text-xs font-sans text-concrete-dark dark:text-concrete leading-relaxed pt-1">
                        {astrologer.bio}
                      </p>
                    </div>
                  </div>

                  {/* Specialisations */}
                  <div className="pt-3 border-t border-concrete/15 dark:border-charcoal-border space-y-1.5">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-burntamber font-bold">
                      SPECIALISATIONS:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {astrologer.specialisations.map((spec) => (
                        <span
                          key={spec}
                          className="text-[10px] font-mono px-2 py-0.5 border border-concrete/30 dark:border-charcoal-border bg-techlight dark:bg-charcoal-surface text-charcoal dark:text-ivory"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-concrete/20 dark:border-charcoal-border flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-concrete">
                    <Video size={12} className="text-burntamber" /> Video
                    <span>·</span>
                    <Phone size={12} className="text-burntamber" /> Audio
                    <span>·</span>
                    <FileText size={12} className="text-burntamber" /> Dossier
                  </div>
                  <Button
                    onClick={handleLaunchAstro}
                    className="bg-charcoal text-ivory border border-charcoal hover:bg-burntamber hover:border-burntamber hover:text-white text-xs font-mono uppercase tracking-wider px-5 h-9 rounded-none font-bold transition-all shadow-sm"
                  >
                    Consult Master →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 04 — TECH ARCHITECTURE & ZERO-LEAKAGE PRIVACY
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 border-b border-concrete/40 dark:border-charcoal-border bg-ivory dark:bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-concrete/30 dark:border-charcoal-border gap-4">
            <div>
              <span className="text-[11px] font-mono tracking-widest text-sage uppercase block mb-1">
                SEC_04 // MATHEMATICAL RIGOR &amp; ZERO LEAKAGE
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-charcoal dark:text-ivory">
                Technology &amp; Innovation.
              </h2>
            </div>
            <p className="text-xs font-mono text-concrete-dark dark:text-concrete max-w-md">
              HOW MODERN BROWSER SANDBOXING AND HIGH-PRECISION MATHEMATICAL EPHEMERIS SECURE USER BIRTH METRICS.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TECH_INNOVATION_PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="p-6 border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal-surface flex flex-col justify-between space-y-4 hover:border-sage transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-concrete/20 dark:border-charcoal-border text-[10px] font-mono">
                    <span className="text-burntamber font-bold">{pillar.badge}</span>
                    <span className="text-sage font-bold">VERIFIED</span>
                  </div>
                  <h3 className="text-xl font-bold font-display text-charcoal dark:text-ivory group-hover:text-burntamber transition-colors mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-sans text-concrete-dark dark:text-concrete leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-concrete/15 dark:border-charcoal-border text-[10px] font-mono text-concrete">
                  ARCHITECTURE: DETERMINISTIC LOCAL KERNEL
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 05 — TECHNICAL CTA
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-charcoal text-ivory relative overflow-hidden border-b border-charcoal-border">
        <div className="absolute inset-0 tech-grid-bg opacity-15 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-block px-3 py-1 mb-6 text-[10px] font-mono uppercase tracking-[0.2em] bg-charcoal-surface border border-charcoal-border text-burntamber">
            SEC_05 // OFFICIAL PLATFORM ACCESS
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight text-ivory leading-tight max-w-3xl mx-auto mb-6">
            Begin Your Celestial Analysis
            <br />
            <span className="font-serif italic font-normal text-concrete">
              with Complete Computational Privacy.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-concrete max-w-xl mx-auto leading-relaxed mb-8 font-sans">
            Calculate your Janam Kundli, explore Chaldean name numbers, analyze Vastu floorplans, and consult verified lineage scholars in real time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={handleLaunchAstro}
              className="bg-burntamber hover:bg-burntamber/90 text-white border border-burntamber text-xs font-mono uppercase tracking-wider px-8 h-12 rounded-none font-bold transition-all shadow-lg flex items-center gap-2"
            >
              <span>Launch Astro Nirikshan Portal</span>
              <ExternalLink size={14} />
            </Button>
            <Link to="/products">
              <Button
                variant="outline"
                className="border-charcoal-border text-concrete hover:text-burntamber hover:border-burntamber text-xs font-mono uppercase tracking-wider px-8 h-12 rounded-none transition-all"
              >
                Return to Product Suite
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AstroNirikshanShowcase;
