import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DEMO_CAMERA_FEEDS,
} from "@/data/computerVisionProducts";
import {
  Camera,
  Bell,
  Activity,
  ShieldAlert,
  Clock,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Flame,
  HardHat,
  Car,
  TrendingUp,
  BarChart2,
  Info,
} from "lucide-react";

export const CVDashboardDemo = () => {
  const [selectedCamId, setSelectedCamId] = useState("cam-02");
  const [activeTab, setActiveTab] = useState<"live" | "alerts" | "analytics">("live");

  const currentCam =
    DEMO_CAMERA_FEEDS.find((c) => c.id === selectedCamId) ||
    DEMO_CAMERA_FEEDS[0];

  return (
    <div className="w-full rounded-3xl border border-border/80 bg-slate-950/90 text-white overflow-hidden shadow-2xl backdrop-blur-xl">
      {/* Top Header of Platform Demo */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-white/10 bg-black/60">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <div>
            <h3 className="text-sm font-bold tracking-wide flex items-center gap-2">
              Nirikshan AI Vision Console — Centralized Monitoring
            </h3>
            <p className="text-[11px] text-white/50">
              Multi-Site Visual Intelligence & Real-Time Alert Dispatch
            </p>
          </div>
        </div>

        {/* Status Highlights */}
        <div className="flex items-center gap-3 text-xs">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-white/50">Active Alerts:</span>
            <span className="font-bold text-red-400">24</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-white/50">Cameras Online:</span>
            <span className="font-bold text-emerald-400">128</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-white/50">Events Today:</span>
            <span className="font-bold text-cyan-400">356</span>
          </div>
        </div>
      </div>

      {/* Demo Notice Banner */}
      <div className="px-6 py-2 bg-primary/10 border-b border-primary/20 text-[11px] text-primary flex items-center justify-between font-mono">
        <span className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5" />
          Interactive Demo — Illustrating multi-camera streaming, real-time bounding boxes, and event logging with sample data.
        </span>
        <span className="text-white/40 hidden md:inline">SYSTEM HEALTH: 99.98%</span>
      </div>

      {/* Main Console Workspace */}
      <div className="grid lg:grid-cols-12 gap-0">
        {/* Left Video Stream & Multi-Cam Matrix (8 cols) */}
        <div className="lg:col-span-8 p-4 md:p-6 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col gap-4">
          {/* Main Selected Feed */}
          <div className="relative aspect-[16/9] w-full rounded-2xl bg-black overflow-hidden border border-white/10 shadow-lg">
            <img
              src={currentCam.image}
              alt={currentCam.location}
              className="w-full h-full object-cover"
            />

            {/* Overlays */}
            {currentCam.detections.map((d, i) => (
              <div
                key={i}
                className={`absolute border-2 ${d.color} transition-all duration-300`}
                style={{
                  top: d.top,
                  left: d.left,
                  width: d.width,
                  height: d.height,
                }}
              >
                <div className="absolute -top-6 left-0 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black/80 border border-white/20 whitespace-nowrap shadow-md">
                  {d.label} <span className="opacity-75">[{d.score}%]</span>
                </div>
              </div>
            ))}

            {/* Camera Tag & Status HUD */}
            <div className="absolute top-3 left-3 flex items-center gap-2 font-mono text-[11px]">
              <span className="px-2.5 py-1 rounded-md bg-black/80 border border-white/20 text-emerald-400 flex items-center gap-1.5 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {currentCam.camCode}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-black/80 border border-white/20 text-white/80 backdrop-blur-md">
                {currentCam.location}
              </span>
            </div>

            <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/80 text-[10px] font-mono text-cyan-400 border border-cyan-500/30">
              FRAME ANALYZED: 22ms
            </div>
          </div>

          {/* Camera Grid Thumbnail Switcher */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-white/50 mb-2 flex items-center justify-between">
              <span>Switch Live Feed</span>
              <span>4 OF 128 CHANNELS</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {DEMO_CAMERA_FEEDS.map((feed) => {
                const isSelected = feed.id === selectedCamId;
                return (
                  <button
                    key={feed.id}
                    onClick={() => setSelectedCamId(feed.id)}
                    className={`relative rounded-xl overflow-hidden border p-2 text-left transition-all ${
                      isSelected
                        ? "border-primary bg-primary/20 shadow-md ring-2 ring-primary/40"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span className="font-bold text-white/90">{feed.camCode}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </div>
                    <p className="text-[11px] font-medium text-white/80 line-clamp-1">
                      {feed.location.split("—")[0]}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Event Stream, Alerts & Incident History (4 cols) */}
        <div className="lg:col-span-4 p-4 md:p-6 bg-slate-900/40 flex flex-col gap-4">
          {/* Sub Navigation */}
          <div className="flex rounded-xl bg-black/40 p-1 border border-white/10 text-xs">
            <button
              onClick={() => setActiveTab("live")}
              className={`flex-1 py-1.5 rounded-lg font-medium transition-colors ${
                activeTab === "live"
                  ? "bg-primary text-white shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Live Alerts
            </button>
            <button
              onClick={() => setActiveTab("alerts")}
              className={`flex-1 py-1.5 rounded-lg font-medium transition-colors ${
                activeTab === "alerts"
                  ? "bg-primary text-white shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Incident Log
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`flex-1 py-1.5 rounded-lg font-medium transition-colors ${
                activeTab === "analytics"
                  ? "bg-primary text-white shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Analytics
            </button>
          </div>

          {/* Tab 1: Live Alerts Feed */}
          {activeTab === "live" && (
            <div className="space-y-3 overflow-y-auto max-h-[460px] pr-1">
              <div className="text-xs font-mono uppercase text-white/50 tracking-wider">
                Real-Time Event Stream
              </div>

              <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-500/10 text-xs space-y-1.5">
                <div className="flex items-center justify-between font-mono">
                  <span className="font-bold text-red-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    CRITICAL: Safety Violation
                  </span>
                  <span className="text-[10px] text-white/60">10:24 AM</span>
                </div>
                <p className="text-white/90">
                  Worker entered Assembly Bay 04 without mandatory helmet.
                </p>
                <div className="text-[10px] text-white/50 font-mono">
                  CAM 02 • Zone: Production Line
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-xs space-y-1.5">
                <div className="flex items-center justify-between font-mono">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    Proximity Warning
                  </span>
                  <span className="text-[10px] text-white/60">10:18 AM</span>
                </div>
                <p className="text-white/90">
                  Pedestrian within 1.8m buffer of moving Forklift-02 in Aisle 12.
                </p>
                <div className="text-[10px] text-white/50 font-mono">
                  CAM 03 • Zone: Warehouse
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-xs space-y-1.5">
                <div className="flex items-center justify-between font-mono">
                  <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5" />
                    ANPR Gate Authorization
                  </span>
                  <span className="text-[10px] text-white/60">10:12 AM</span>
                </div>
                <p className="text-white/90">
                  Container truck UK-07-AB-1234 verified and barrier gate opened.
                </p>
                <div className="text-[10px] text-white/50 font-mono">
                  CAM 01 • Zone: Main Gate
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-white/10 bg-white/5 text-xs space-y-1.5">
                <div className="flex items-center justify-between font-mono">
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Automated Shift Audit
                  </span>
                  <span className="text-[10px] text-white/60">10:00 AM</span>
                </div>
                <p className="text-white/80">
                  Shift A compliance check completed: 98.4% PPE compliance rate.
                </p>
                <div className="text-[10px] text-white/50 font-mono">
                  All Cameras • Routine Verification
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Incident Log Table */}
          {activeTab === "alerts" && (
            <div className="space-y-3 overflow-y-auto max-h-[460px] text-xs">
              <div className="text-xs font-mono uppercase text-white/50 tracking-wider">
                Incident History & Evidence Vault
              </div>
              <div className="divide-y divide-white/10 border border-white/10 rounded-xl overflow-hidden bg-black/40">
                <div className="p-2.5 flex items-center justify-between font-mono text-[11px] bg-white/5 text-white/60">
                  <span>TIME</span>
                  <span>EVENT</span>
                  <span>CAMERA</span>
                </div>
                <div className="p-2.5 flex items-center justify-between">
                  <span className="text-white/60 font-mono">10:24 AM</span>
                  <span className="text-red-400 font-semibold">No Helmet</span>
                  <span className="text-white/70 font-mono">Cam 02</span>
                </div>
                <div className="p-2.5 flex items-center justify-between">
                  <span className="text-white/60 font-mono">10:18 AM</span>
                  <span className="text-amber-400 font-semibold">Forklift Proximity</span>
                  <span className="text-white/70 font-mono">Cam 03</span>
                </div>
                <div className="p-2.5 flex items-center justify-between">
                  <span className="text-white/60 font-mono">09:56 AM</span>
                  <span className="text-amber-400 font-semibold">Smoke Signature</span>
                  <span className="text-white/70 font-mono">Cam 01</span>
                </div>
                <div className="p-2.5 flex items-center justify-between">
                  <span className="text-white/60 font-mono">09:42 AM</span>
                  <span className="text-blue-400 font-semibold">Unusual Activity</span>
                  <span className="text-white/70 font-mono">Cam 05</span>
                </div>
                <div className="p-2.5 flex items-center justify-between">
                  <span className="text-white/60 font-mono">09:30 AM</span>
                  <span className="text-emerald-400 font-semibold">Object Count Alert</span>
                  <span className="text-white/70 font-mono">Cam 03</span>
                </div>
              </div>
              <p className="text-[11px] text-white/50 leading-relaxed">
                Every logged incident includes 15–30 second tamper-evident video evidence clips accessible to authorized EHS safety auditors.
              </p>
            </div>
          )}

          {/* Tab 3: Analytics Preview */}
          {activeTab === "analytics" && (
            <div className="space-y-3.5 text-xs">
              <div className="text-xs font-mono uppercase text-white/50 tracking-wider">
                7-Day Compliance & Incident Trends
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-white/50 text-[10px]">Total Events</div>
                  <div className="text-xl font-bold text-white mt-1">1,245</div>
                  <div className="text-[10px] text-emerald-400 mt-0.5 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +12% resolved
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-white/50 text-[10px]">Safety Violations</div>
                  <div className="text-xl font-bold text-amber-400 mt-1">356</div>
                  <div className="text-[10px] text-emerald-400 mt-0.5 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> -18% vs last wk
                  </div>
                </div>
              </div>

              {/* Simulated mini chart */}
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-2">
                <div className="flex justify-between text-[11px] text-white/70 font-mono">
                  <span>Weekly Incident Reduction</span>
                  <span className="text-emerald-400">98.4% compliance</span>
                </div>
                <div className="flex items-end gap-1.5 h-20 pt-2">
                  <div className="flex-1 bg-primary/40 hover:bg-primary rounded-t h-[80%]" title="Mon" />
                  <div className="flex-1 bg-primary/50 hover:bg-primary rounded-t h-[65%]" title="Tue" />
                  <div className="flex-1 bg-primary/60 hover:bg-primary rounded-t h-[50%]" title="Wed" />
                  <div className="flex-1 bg-primary/70 hover:bg-primary rounded-t h-[42%]" title="Thu" />
                  <div className="flex-1 bg-primary/80 hover:bg-primary rounded-t h-[35%]" title="Fri" />
                  <div className="flex-1 bg-primary/90 hover:bg-primary rounded-t h-[28%]" title="Sat" />
                  <div className="flex-1 bg-cyan-400 rounded-t h-[18%]" title="Sun" />
                </div>
                <div className="flex justify-between text-[9px] text-white/40 font-mono">
                  <span>19 SEP</span>
                  <span>21 SEP</span>
                  <span>23 SEP</span>
                  <span>TODAY</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
