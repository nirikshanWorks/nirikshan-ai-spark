import { useState, useEffect } from "react";
import cvPpeImg from "@/assets/cv-ppe.png";
import cvFireImg from "@/assets/cv-fire.png";
import cvPhoneImg from "@/assets/cv-phone.png";
import { Flame, Smartphone, HardHat, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const feeds = [
  {
    id: "ppe",
    title: "PPE Compliance",
    description: "Detects hard hats, safety vests, and protective gear in real-time.",
    image: cvPpeImg,
    icon: HardHat,
    status: "Active",
    labels: ["[Hard Hat: 99%]", "[Safety Vest: 98%]"],
    alertLevel: "normal"
  },
  {
    id: "fire",
    title: "Early Fire Detection",
    description: "Identifies smoke and early fire signatures before traditional sensors.",
    image: cvFireImg,
    icon: Flame,
    status: "Warning",
    labels: ["WARNING: FIRE DETECTED [97%]"],
    alertLevel: "critical"
  },
  {
    id: "distraction",
    title: "Distraction Monitoring",
    description: "Detects unauthorized phone usage or distractions during operations.",
    image: cvPhoneImg,
    icon: Smartphone,
    status: "Alert",
    labels: ["DISTRACTION: PHONE DETECTED [95%]"],
    alertLevel: "warning"
  }
];

export const InteractiveCVShowcase = () => {
  const [activeFeed, setActiveFeed] = useState(0);
  const [scanPosition, setScanPosition] = useState(0);

  // Simple scanline animation
  useEffect(() => {
    const interval = setInterval(() => {
      setScanPosition((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const feed = feeds[activeFeed];

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      {/* Feed Selector (Sidebar) */}
      <div className="flex flex-col gap-3 lg:w-72 flex-shrink-0">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground px-2 mb-2">Camera Feeds</h3>
        {feeds.map((f, idx) => {
          const isActive = activeFeed === idx;
          return (
            <button
              key={f.id}
              onClick={() => setActiveFeed(idx)}
              className={cn(
                "text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group",
                isActive 
                  ? "bg-primary/10 border-primary/30 shadow-[0_0_15px_rgba(120,119,198,0.2)]" 
                  : "bg-card border-border hover:border-primary/30 hover:bg-muted"
              )}
            >
              {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>}
              <div className="flex items-center gap-3 mb-2">
                <div className={cn("p-2 rounded-lg", isActive ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground group-hover:text-primary")}>
                  <f.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm">{f.title}</div>
                  <div className={cn(
                    "text-[10px] uppercase font-mono mt-0.5 font-semibold flex items-center gap-1",
                    f.alertLevel === 'critical' ? "text-red-500" :
                    f.alertLevel === 'warning' ? "text-yellow-500" : "text-emerald-500"
                  )}>
                    <span className={cn(
                      "w-1.5 h-1.5 rounded-full animate-pulse",
                      f.alertLevel === 'critical' ? "bg-red-500" :
                      f.alertLevel === 'warning' ? "bg-yellow-500" : "bg-emerald-500"
                    )}></span>
                    {f.status}
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{f.description}</p>
            </button>
          );
        })}
      </div>

      {/* Main Viewport */}
      <div className="flex-1 relative rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 border border-white/10 shadow-2xl overflow-hidden min-h-[350px] md:min-h-[500px]">
        {/* Background Darkener */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-0"></div>
        
        {/* The Image */}
        <img 
          key={feed.id} // force re-render/animation on change
          src={feed.image} 
          alt={feed.title} 
          className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-screen animate-in fade-in zoom-in-95 duration-500 z-10"
        />

        {/* Scan Line Overlay */}
        <div 
          className="absolute left-0 right-0 h-[2px] bg-primary/60 shadow-[0_0_15px_rgba(120,119,198,1)] z-20"
          style={{ top: `${scanPosition}%` }}
        />

        {/* Dynamic Overlays */}
        <div className="absolute inset-0 z-30 pointer-events-none p-4 md:p-6 flex flex-col justify-between">
          
          <div className="flex justify-between items-start">
            <div className="flex gap-2">
              <div className="px-3 py-1.5 rounded bg-black/60 text-emerald-400 text-xs font-mono border border-emerald-500/30 flex items-center gap-1.5 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                CAM-0{activeFeed + 1} LIVE
              </div>
              <div className="px-3 py-1.5 rounded bg-black/60 text-white/80 text-xs font-mono border border-white/10 backdrop-blur-md">
                60 FPS
              </div>
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-2">
              {feed.labels.map((label, i) => (
                <div key={i} className={cn(
                  "px-3 py-1.5 rounded text-sm font-mono border backdrop-blur-md animate-in slide-in-from-left-4 fade-in duration-500 font-bold",
                  feed.alertLevel === 'critical' ? "bg-red-500/20 text-red-400 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.4)]" :
                  feed.alertLevel === 'warning' ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.4)]" :
                  "bg-primary/20 text-primary border-primary/50 shadow-[0_0_15px_rgba(120,119,198,0.4)]"
                )} style={{ animationDelay: `${i * 100}ms` }}>
                  {label}
                </div>
              ))}
            </div>

            <div className="px-4 py-2.5 rounded bg-black/60 border border-white/10 backdrop-blur-md flex flex-col items-end">
              <div className="text-[10px] text-white/50 uppercase tracking-widest mb-1">System Status</div>
              <div className="text-sm font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                ONLINE
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
