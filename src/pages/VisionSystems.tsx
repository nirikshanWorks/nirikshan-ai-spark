import React, { useState } from "react";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Eye,
  ShieldCheck,
  Cpu,
  Flame,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Server,
  Activity,
  Layers,
  Crosshair,
  Lock,
  Zap,
  HardHat
} from "lucide-react";
import cvPpeImg from "@/assets/cv-ppe.png";
import cvFireImg from "@/assets/cv-fire.png";
import cvPhoneImg from "@/assets/cv-phone.png";
import cvDemoImg from "@/assets/computer-vision-demo.png";

const modules = [
  {
    id: "ppe",
    num: "01",
    title: "PPE Safety & Compliance",
    desc: "Real-time edge neural inference detecting hard hats, high-vis reflective vests, safety goggles, and boots across manufacturing floors and construction zones.",
    image: cvPpeImg,
    stat: "99.8%",
    statLabel: "DETECTION ACCURACY",
    latency: "14.2ms",
    detections: ["[HELMET: 0.994]", "[SAFETY_VEST: 0.988]", "[STATUS: COMPLIANT]"],
    alertLevel: "NOMINAL"
  },
  {
    id: "defect",
    num: "02",
    title: "High-Speed Surface Defect Inspection",
    desc: "Automated optical inspection (AOI) on high-speed assembly conveyors. Detects micro-cracks, surface blemishes, misalignments, and dimensional anomalies at conveyor line rates.",
    image: cvDemoImg,
    stat: "±0.02mm",
    statLabel: "DIMENSIONAL TOLERANCE",
    latency: "11.8ms",
    detections: ["[SURFACE_ANOMALY: 0.991]", "[TOLERANCE: PASS]", "[INSPECT_TIME: 12ms]"],
    alertLevel: "NOMINAL"
  },
  {
    id: "fire",
    num: "03",
    title: "Fire & Thermal Hazard Signatures",
    desc: "Early optical detection of nascent smoke plumes, open flames, and critical thermal signatures before traditional ionization or photoelectric smoke sensors trigger.",
    image: cvFireImg,
    stat: "<1.2s",
    statLabel: "TIME-TO-ALERT",
    latency: "9.6ms",
    detections: ["[HAZARD_CLASS: FLAME/SMOKE]", "[CONF: 0.978]", "[ACTION: RELAY_ENGAGED]"],
    alertLevel: "CRITICAL"
  },
  {
    id: "distraction",
    num: "04",
    title: "Operator Focus & Safety Exclusion Zones",
    desc: "Detects unauthorized mobile device operation in hazardous machinery zones, crane loading areas, and automated guided vehicle (AGV) transit pathways.",
    image: cvPhoneImg,
    stat: "100%",
    statLabel: "EXCLUSION COVERAGE",
    latency: "15.0ms",
    detections: ["[DEVICE_DETECTED: PHONE]", "[CONF: 0.952]", "[ZONE: MACHINE_PERIMETER]"],
    alertLevel: "ALERT"
  }
];

export const VisionSystems = () => {
  const [activeTab, setActiveTab] = useState(0);
  const current = modules[activeTab];

  return (
    <div className="min-h-screen bg-ivory dark:bg-charcoal text-charcoal dark:text-ivory selection:bg-sage selection:text-charcoal">
      <SEO
        title="Nirikshan Vision Systems | Industrial Computer Vision & Edge AI"
        description="Nirikshan Vision Systems deploys real-time computer vision for industrial workplace safety, PPE compliance, surface defect detection, ANPR and hazard monitoring."
        canonical="https://nirikshanai.com/products/vision-systems"
      />
      <Navigation />

      <main className="pt-24 pb-20">
        {/* SEC 01 — HERO */}
        <section className="border-b border-concrete/30 dark:border-charcoal-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
            {/* Top Monospace Label */}
            <div className="flex items-center gap-3 mb-6 text-[11px] font-mono tracking-widest text-concrete-dark dark:text-concrete uppercase">
              <span className="w-2 h-2 bg-sage inline-block" />
              <span>PRODUCT_ID: NVS-EDGE-02</span>
              <span>//</span>
              <span>ENTERPRISE INDUSTRIAL VISION</span>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-display tracking-tight leading-[1.05] mb-6">
                  Nirikshan Vision Systems.
                  <br />
                  <span className="font-serif italic font-normal text-concrete-dark dark:text-concrete">
                    Zero-Latency Edge Vision.
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-concrete-dark dark:text-concrete max-w-2xl leading-relaxed mb-8">
                  Autonomous computer vision engineered for demanding industrial environments. Connects directly to existing RTSP cameras to detect safety violations, surface defects, and hazards in real time without recurring cloud streaming costs.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link to="/contact">
                    <Button className="bg-charcoal text-ivory border border-charcoal hover:bg-burntamber hover:border-burntamber hover:text-white text-xs font-mono uppercase tracking-wider px-7 h-12 rounded-none font-semibold transition-all">
                      Deploy Technical Pilot <ArrowRight size={14} className="ml-2" />
                    </Button>
                  </Link>
                  <a href="#live-console">
                    <Button variant="outline" className="border-concrete/50 text-charcoal dark:text-ivory hover:border-burntamber hover:text-burntamber hover:bg-burntamber/5 text-xs font-mono uppercase tracking-wider px-7 h-12 rounded-none transition-all">
                      Explore Live Console
                    </Button>
                  </a>
                </div>
              </div>

              {/* Hardware Telemetry Card */}
              <div className="lg:col-span-4 p-5 border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal-surface">
                <div className="text-[10px] font-mono tracking-widest text-concrete-dark dark:text-concrete uppercase mb-3 pb-2 border-b border-concrete/20 dark:border-charcoal-border flex justify-between">
                  <span>EDGE_TELEMETRY</span>
                  <span className="text-sage">ACTIVE</span>
                </div>
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between py-1 border-b border-concrete/10 dark:border-charcoal-border">
                    <span className="text-concrete">INFERENCE TIME:</span>
                    <span className="font-bold text-sage">11.8ms – 15.2ms</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-concrete/10 dark:border-charcoal-border">
                    <span className="text-concrete">STREAM INGEST:</span>
                    <span>H.264 / H.265 RTSP</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-concrete/10 dark:border-charcoal-border">
                    <span className="text-concrete">DEPLOYMENT:</span>
                    <span>100% AIR-GAPPED ON-PREM</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-concrete/10 dark:border-charcoal-border">
                    <span className="text-concrete">HARDWARE SUPPORT:</span>
                    <span>NVIDIA Jetson / RTX / Intel</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-concrete">MODEL ARCH:</span>
                    <span>Custom Quantized YOLO / ViT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEC 02 — INTERACTIVE CONSOLE */}
        <section id="live-console" className="py-16 md:py-24 border-b border-concrete/30 dark:border-charcoal-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-concrete/20 dark:border-charcoal-border gap-4">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-sage uppercase block mb-1">
                  // DEMONSTRATION CONSOLE
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold font-display tracking-tight">
                  Real-Time Edge Detection Modes
                </h2>
              </div>
              <p className="text-xs font-mono text-concrete-dark dark:text-concrete">
                SELECT A MODULE TO VIEW ACTIVE INFERENCE PIPELINE
              </p>
            </div>

            {/* Mode Selector Tabs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
              {modules.map((m, idx) => (
                <button
                  key={m.id}
                  onClick={() => setActiveTab(idx)}
                  className={`p-3 text-left border transition-all font-mono text-xs ${
                    activeTab === idx
                      ? "border-charcoal bg-charcoal text-ivory dark:border-sage dark:bg-sage dark:text-charcoal font-bold"
                      : "border-concrete/30 bg-white dark:bg-charcoal-surface text-charcoal dark:text-ivory hover:border-concrete"
                  }`}
                >
                  <div className="text-[10px] opacity-70 mb-1">{m.num} //</div>
                  <div className="truncate">{m.title}</div>
                </button>
              ))}
            </div>

            {/* Console Screen */}
            <div className="border border-charcoal/40 dark:border-charcoal-border bg-charcoal text-ivory p-4 sm:p-6 shadow-2xl">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-charcoal-border text-[11px] font-mono text-concrete">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 bg-sage inline-block" />
                  <span>FEED: CAM_CONVEYOR_0{current.num}</span>
                  <span>//</span>
                  <span className="text-sage">LATENCY: {current.latency}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>STATUS:</span>
                  <span className={current.alertLevel === "CRITICAL" ? "text-burntamber font-bold" : "text-sage"}>
                    {current.alertLevel}
                  </span>
                </div>
              </div>

              {/* Main Visual Display */}
              <div className="grid lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 relative aspect-[16/10] bg-black overflow-hidden border border-charcoal-border">
                  <img
                    src={current.image}
                    alt={current.title}
                    className="w-full h-full object-cover opacity-90"
                  />
                  {/* Technical Overlays */}
                  <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="bg-charcoal/90 border border-charcoal-border p-2 text-[10px] font-mono space-y-1">
                        {current.detections.map((det, i) => (
                          <div key={i} className="text-sage flex items-center gap-1.5">
                            <span className="w-1 h-1 bg-sage inline-block" />
                            {det}
                          </div>
                        ))}
                      </div>
                      <div className="bg-charcoal/90 border border-charcoal-border px-2 py-1 text-[10px] font-mono text-concrete">
                        60 FPS · 1080P RTSP
                      </div>
                    </div>

                    <div className="flex justify-between items-end">
                      <div className="text-[10px] font-mono text-concrete bg-charcoal/90 px-2 py-0.5 border border-charcoal-border">
                        GEO: 28.6139° N, 77.2090° E
                      </div>
                      <div className="text-[11px] font-mono font-bold text-sage bg-charcoal/90 px-2.5 py-1 border border-sage/50">
                        {current.statLabel}: {current.stat}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Module Details */}
                <div className="lg:col-span-4 space-y-4">
                  <span className="text-xs font-mono text-sage uppercase tracking-widest block">
                    MODULE_{current.num} SPECIFICATION
                  </span>
                  <h3 className="text-2xl font-bold font-display tracking-tight text-ivory">
                    {current.title}
                  </h3>
                  <p className="text-xs font-mono text-concrete leading-relaxed">
                    {current.desc}
                  </p>

                  <div className="pt-4 border-t border-charcoal-border space-y-2 font-mono text-xs">
                    <div className="flex justify-between text-concrete">
                      <span>INTEGRATION TIME:</span>
                      <span className="text-ivory">&lt; 48 HOURS</span>
                    </div>
                    <div className="flex justify-between text-concrete">
                      <span>ALERT DISPATCH:</span>
                      <span className="text-ivory">WEBHOOK / SCADA / SMS</span>
                    </div>
                    <div className="flex justify-between text-concrete">
                      <span>CAMERA COMPATIBILITY:</span>
                      <span className="text-ivory">ANY ONVIF / RTSP IP</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link to="/contact">
                      <Button className="w-full bg-charcoal text-ivory border border-charcoal-border hover:bg-burntamber hover:border-burntamber hover:text-white text-xs font-mono uppercase tracking-wider h-11 rounded-none font-bold transition-all">
                        Request Site Audit →
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEC 03 — ARCHITECTURAL BLUEPRINT */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="mb-12">
              <span className="text-[11px] font-mono tracking-widest text-concrete-dark dark:text-concrete uppercase block mb-1">
                // SYSTEM ARCHITECTURE
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight">
                Edge Pipeline Flow
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              {[
                {
                  step: "01",
                  title: "RTSP Video Ingestion",
                  desc: "Connects to your local NVR or existing IP cameras over ONVIF protocols. Zero camera replacement needed."
                },
                {
                  step: "02",
                  title: "Hardware Accelerated Decode",
                  desc: "Zero-copy NVDEC / VA-API decoding strips network latency and batches frames directly into GPU memory."
                },
                {
                  step: "03",
                  title: "TensorRT Inference",
                  desc: "Quantized FP16/INT8 models run bounding box, classification, and segmentation inference in under 15ms."
                },
                {
                  step: "04",
                  title: "Local Alert & SCADA Relay",
                  desc: "Instant PLC relay trigger, audio siren actuation, and webhook notifications without reliance on public cloud."
                }
              ].map((p) => (
                <div
                  key={p.step}
                  className="p-6 border border-concrete/30 dark:border-charcoal-border bg-white dark:bg-charcoal-surface"
                >
                  <div className="text-xl font-mono font-bold text-sage mb-3">{p.step} //</div>
                  <h3 className="text-base font-bold font-display mb-2">{p.title}</h3>
                  <p className="text-xs font-mono text-concrete-dark dark:text-concrete leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Callout */}
            <div className="mt-12 p-8 border border-charcoal bg-charcoal text-ivory flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-xl font-bold font-display mb-1">
                  Ready to test Nirikshan Vision on your factory cameras?
                </h4>
                <p className="text-xs font-mono text-concrete">
                  We conduct remote or on-prem RTSP stream feasibility audits within 48 hours.
                </p>
              </div>
              <Link to="/contact">
                <Button className="bg-charcoal text-ivory border border-charcoal-border hover:bg-burntamber hover:border-burntamber hover:text-white text-xs font-mono uppercase tracking-wider px-6 h-11 rounded-none font-bold shrink-0 transition-all">
                  Contact Vision Engineers →
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default VisionSystems;

