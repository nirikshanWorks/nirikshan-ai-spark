import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  Shield,
  Eye,
  Scan,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Maximize2,
  Radio,
  Sparkles,
} from "lucide-react";
import cvPpeImg from "@/assets/cv-ppe.png";
import cvFireImg from "@/assets/cv-fire.png";
import cvPhoneImg from "@/assets/cv-phone.png";
import { FadeUp } from "@/components/ScrollAnimations";

interface HeroFeed {
  id: string;
  name: string;
  location: string;
  image: string;
  fps: number;
  detections: Array<{
    label: string;
    conf: string;
    type: "normal" | "warning" | "critical";
    top: string;
    left: string;
    width: string;
    height: string;
  }>;
  alerts: string[];
}

const HERO_FEEDS: HeroFeed[] = [
  {
    id: "residential",
    name: "CAM 01 — Residential Gated Perimeter",
    location: "Boundary Wall & Gate 02",
    image:
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=1400&q=80",
    fps: 30,
    detections: [
      {
        label: "Person Detected",
        conf: "99%",
        type: "normal",
        top: "42%",
        left: "24%",
        width: "16%",
        height: "48%",
      },
      {
        label: "Vehicle Detected [UK07AB1234]",
        conf: "98%",
        type: "normal",
        top: "46%",
        left: "58%",
        width: "32%",
        height: "40%",
      },
    ],
    alerts: ["Tripwire boundary secure", "Authorized visitor entry logged"],
  },
  {
    id: "industrial",
    name: "CAM 02 — Industrial Assembly Floor",
    location: "Fabrication Bay & Robotics Cell",
    image: cvPpeImg,
    fps: 60,
    detections: [
      {
        label: "Person [PPE Compliant]",
        conf: "99%",
        type: "normal",
        top: "22%",
        left: "34%",
        width: "22%",
        height: "66%",
      },
      {
        label: "Safety Violation: No Helmet",
        conf: "96%",
        type: "critical",
        top: "26%",
        left: "68%",
        width: "18%",
        height: "58%",
      },
    ],
    alerts: ["PPE compliance breach logged: Bay 04", "Supervisor notified"],
  },
  {
    id: "fire",
    name: "CAM 03 — Chemical Storage & Boiler Room",
    location: "North Wing Material Storage",
    image: cvFireImg,
    fps: 30,
    detections: [
      {
        label: "CRITICAL: Flame Signature",
        conf: "97%",
        type: "critical",
        top: "32%",
        left: "36%",
        width: "36%",
        height: "46%",
      },
    ],
    alerts: ["Optical flame flicker detected", "Deluge interlock standby"],
  },
  {
    id: "behavior",
    name: "CAM 04 — Machine Control Station",
    location: "Press Line Operator Console",
    image: cvPhoneImg,
    fps: 30,
    detections: [
      {
        label: "Distraction: Phone in Use",
        conf: "95%",
        type: "warning",
        top: "28%",
        left: "44%",
        width: "24%",
        height: "56%",
      },
    ],
    alerts: ["Operator phone usage during active cycle", "EHS record created"],
  },
];

export const ProductsHero = () => {
  const [activeFeedIdx, setActiveFeedIdx] = useState(0);
  const [showOverlays, setShowOverlays] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const [scanline, setScanline] = useState(0);

  const activeFeed = HERO_FEEDS[activeFeedIdx];

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toISOString().replace("T", " ").substring(0, 19) + " IST"
      );
    };
    updateClock();
    const clockTimer = setInterval(updateClock, 1000);
    const scanTimer = setInterval(() => {
      setScanline((prev) => (prev >= 100 ? 0 : prev + 1.2));
    }, 40);

    return () => {
      clearInterval(clockTimer);
      clearInterval(scanTimer);
    };
  }, []);

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-gradient-to-b from-background via-card/40 to-background border-b border-border/50">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-6">
              <Eye className="w-3.5 h-3.5 text-primary animate-pulse" />
              Nirikshan AI Vision Intelligence
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.12]">
              Computer Vision Solutions for{" "}
              <span className="text-gradient">Safer Homes</span> &{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Smarter Industries
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
              Nirikshan AI transforms camera feeds and visual data into
              actionable intelligence, helping organizations detect risks,
              monitor operations, identify anomalies, and make informed
              decisions in real time.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#solutions-directory">
                <Button size="lg" className="gradient-primary w-full sm:w-auto shadow-lg shadow-blue-500/25">
                  Explore Our Solutions
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
              <a href="#custom-solutions">
                <Button size="lg" variant="outline" className="w-full sm:w-auto hover:bg-secondary">
                  Discuss Your Requirements
                </Button>
              </a>
            </div>
          </FadeUp>
        </div>

        {/* ─── CCTV & Computer Vision Interface Mockup ─── */}
        <FadeUp delay={0.15}>
          <div className="max-w-5xl mx-auto rounded-3xl border border-border/80 bg-slate-950/90 shadow-2xl overflow-hidden backdrop-blur-xl">
            {/* Top Bar of CCTV Control Room */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-white/10 bg-black/60 text-xs font-mono">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                  </span>
                  <span className="font-bold text-red-400 tracking-wider">LIVE SURVEILLANCE</span>
                </div>
                <span className="text-white/40">|</span>
                <span className="text-white/80 hidden sm:inline">{activeFeed.name}</span>
              </div>

              <div className="flex items-center gap-4 text-white/70">
                <span className="hidden md:inline font-mono text-[11px] text-emerald-400">
                  {currentTime || "2026-10-28 17:30:00 IST"}
                </span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white/90 text-[10px]">
                  {activeFeed.fps} FPS
                </span>
                <button
                  onClick={() => setShowOverlays((v) => !v)}
                  className="px-2.5 py-1 rounded border border-white/20 hover:bg-white/10 transition-colors text-[11px] flex items-center gap-1.5"
                  title="Toggle Detection Bounding Boxes"
                >
                  <Scan className="w-3 h-3 text-cyan-400" />
                  {showOverlays ? "Hide Overlays" : "Show Overlays"}
                </button>
              </div>
            </div>

            {/* Main Video Viewport */}
            <div className="relative aspect-[16/9] max-h-[500px] w-full bg-black overflow-hidden select-none">
              <img
                src={activeFeed.image}
                alt={activeFeed.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />

              {/* Dynamic Scanline */}
              {showOverlays && (
                <div
                  className="absolute left-0 right-0 h-[2px] bg-cyan-400/70 shadow-[0_0_12px_rgba(34,211,238,0.8)] pointer-events-none transition-all duration-75"
                  style={{ top: `${scanline}%` }}
                />
              )}

              {/* Corner Targeting Reticles */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

              {/* Detection Bounding Boxes Overlay */}
              {showOverlays &&
                activeFeed.detections.map((det, idx) => (
                  <div
                    key={idx}
                    className={`absolute border-2 transition-all duration-300 animate-in fade-in zoom-in-95 ${
                      det.type === "critical"
                        ? "border-red-500 bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                        : det.type === "warning"
                        ? "border-amber-400 bg-amber-400/10 shadow-[0_0_20px_rgba(251,191,36,0.3)]"
                        : "border-cyan-400 bg-cyan-400/10 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                    }`}
                    style={{
                      top: det.top,
                      left: det.left,
                      width: det.width,
                      height: det.height,
                    }}
                  >
                    {/* Corner accents */}
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-white" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-white" />
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white" />
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white" />

                    {/* Tag label */}
                    <div
                      className={`absolute -top-6 left-0 px-2 py-0.5 rounded text-[11px] font-mono font-bold tracking-tight whitespace-nowrap shadow-md flex items-center gap-1 ${
                        det.type === "critical"
                          ? "bg-red-600 text-white"
                          : det.type === "warning"
                          ? "bg-amber-500 text-black"
                          : "bg-cyan-500 text-black"
                      }`}
                    >
                      <span>{det.label}</span>
                      <span className="opacity-80">[{det.conf}]</span>
                    </div>
                  </div>
                ))}

              {/* On-Screen Watermark & Camera Metadata */}
              <div className="absolute bottom-4 left-5 pointer-events-none text-white/80 font-mono text-xs flex flex-col gap-1 drop-shadow-md">
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold">NIRIKSHAN-AI // INFERENCE ENGINE</span>
                  <span className="text-white/40">•</span>
                  <span className="text-emerald-400">MODEL: YOLOV10-OPT</span>
                </div>
                <div className="text-[11px] text-white/60">
                  LOC: {activeFeed.location} | LATENCY: 24ms
                </div>
              </div>

              {/* Live Alerts HUD Pill (Top Right) */}
              <div className="absolute top-4 right-5 pointer-events-none flex flex-col gap-2 max-w-xs items-end">
                {activeFeed.alerts.map((alert, i) => (
                  <div
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-black/75 border border-white/20 text-white text-[11px] font-mono backdrop-blur-md flex items-center gap-2 shadow-lg"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span className="line-clamp-1">{alert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Camera Selector Tabs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-3 bg-black/80 border-t border-white/10">
              {HERO_FEEDS.map((f, idx) => {
                const isActive = activeFeedIdx === idx;
                return (
                  <button
                    key={f.id}
                    onClick={() => setActiveFeedIdx(idx)}
                    className={`flex items-center gap-3 p-2.5 rounded-xl text-left transition-all text-xs font-mono border ${
                      isActive
                        ? "bg-primary/20 border-primary text-white shadow-md shadow-primary/20"
                        : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isActive ? "bg-primary text-white" : "bg-white/10 text-white/60"
                      }`}
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold truncate">CAM 0{idx + 1}</div>
                      <div className="text-[10px] text-white/50 truncate">{f.name.split("—")[1] || f.name}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </FadeUp>

        {/* Trust Badges Bar */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
          <div className="p-4 rounded-2xl border border-border/60 bg-card/40 backdrop-blur">
            <div className="text-xl sm:text-2xl font-bold text-foreground">6 Categories</div>
            <div className="text-xs text-muted-foreground mt-0.5">35+ Vision Solutions</div>
          </div>
          <div className="p-4 rounded-2xl border border-border/60 bg-card/40 backdrop-blur">
            <div className="text-xl sm:text-2xl font-bold text-emerald-500">&lt; 100ms</div>
            <div className="text-xs text-muted-foreground mt-0.5">Real-Time Edge Inference</div>
          </div>
          <div className="p-4 rounded-2xl border border-border/60 bg-card/40 backdrop-blur">
            <div className="text-xl sm:text-2xl font-bold text-foreground">Legacy & IP</div>
            <div className="text-xs text-muted-foreground mt-0.5">Existing Camera Ready</div>
          </div>
          <div className="p-4 rounded-2xl border border-border/60 bg-card/40 backdrop-blur">
            <div className="text-xl sm:text-2xl font-bold text-foreground">Cloud / On-Prem</div>
            <div className="text-xs text-muted-foreground mt-0.5">Hybrid Architecture</div>
          </div>
        </div>
      </div>
    </section>
  );
};
