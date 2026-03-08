import { useState, useRef, useEffect, useCallback } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Upload, Play, RotateCcw, Zap, Target, Cpu, ScanLine } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Detection {
  id: number;
  label: string;
  confidence: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

const DEMO_IMAGES = [
  {
    id: "street",
    name: "Urban Street Scene",
    url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=500&fit=crop",
    detections: [
      { id: 1, label: "Car", confidence: 0.96, x: 10, y: 55, width: 22, height: 30, color: "#3b82f6" },
      { id: 2, label: "Person", confidence: 0.94, x: 45, y: 35, width: 10, height: 35, color: "#10b981" },
      { id: 3, label: "Building", confidence: 0.91, x: 60, y: 5, width: 35, height: 70, color: "#f59e0b" },
      { id: 4, label: "Traffic Light", confidence: 0.89, x: 35, y: 10, width: 8, height: 15, color: "#ef4444" },
      { id: 5, label: "Person", confidence: 0.87, x: 52, y: 40, width: 8, height: 30, color: "#10b981" },
    ],
  },
  {
    id: "factory",
    name: "Manufacturing Floor",
    url: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&h=500&fit=crop",
    detections: [
      { id: 1, label: "Machine", confidence: 0.97, x: 15, y: 20, width: 30, height: 50, color: "#8b5cf6" },
      { id: 2, label: "Worker", confidence: 0.93, x: 55, y: 30, width: 12, height: 40, color: "#10b981" },
      { id: 3, label: "Safety Gear", confidence: 0.90, x: 56, y: 28, width: 10, height: 12, color: "#f59e0b" },
      { id: 4, label: "Conveyor", confidence: 0.88, x: 5, y: 70, width: 90, height: 15, color: "#3b82f6" },
    ],
  },
  {
    id: "retail",
    name: "Retail Store",
    url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop",
    detections: [
      { id: 1, label: "Customer", confidence: 0.95, x: 30, y: 25, width: 15, height: 45, color: "#10b981" },
      { id: 2, label: "Product Shelf", confidence: 0.93, x: 5, y: 10, width: 20, height: 80, color: "#3b82f6" },
      { id: 3, label: "Customer", confidence: 0.91, x: 60, y: 30, width: 12, height: 40, color: "#10b981" },
      { id: 4, label: "POS Terminal", confidence: 0.88, x: 75, y: 40, width: 15, height: 20, color: "#f59e0b" },
    ],
  },
];

const stats = [
  { icon: Target, label: "Detection Accuracy", value: "99.2%" },
  { icon: Zap, label: "Processing Speed", value: "<50ms" },
  { icon: Cpu, label: "Models Supported", value: "15+" },
  { icon: ScanLine, label: "Object Classes", value: "80+" },
];

export default function ObjectDetectionDemo() {
  const [selectedImage, setSelectedImage] = useState(DEMO_IMAGES[0]);
  const [isDetecting, setIsDetecting] = useState(false);
  const [showDetections, setShowDetections] = useState(false);
  const [visibleDetections, setVisibleDetections] = useState<Detection[]>([]);
  const [scanProgress, setScanProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const runDetection = useCallback(() => {
    setIsDetecting(true);
    setShowDetections(false);
    setVisibleDetections([]);
    setScanProgress(0);

    // Simulate scanning animation
    const scanInterval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(scanInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Reveal detections one by one
    setTimeout(() => {
      setIsDetecting(false);
      setShowDetections(true);
      selectedImage.detections.forEach((det, i) => {
        setTimeout(() => {
          setVisibleDetections((prev) => [...prev, det]);
        }, i * 300);
      });
    }, 1600);
  }, [selectedImage]);

  const resetDetection = () => {
    setShowDetections(false);
    setVisibleDetections([]);
    setScanProgress(0);
  };

  return (
    <>
      <SEO title="Live Object Detection Demo | Nirikshan AI" description="Experience real-time AI object detection powered by computer vision. See how our models detect and classify objects instantly." />
      <Navigation />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Eye className="w-3 h-3 mr-1" /> Live Demo
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
              AI Object Detection
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"> in Action</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Watch our computer vision models detect, classify, and locate objects in real-time with high accuracy.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="p-4 text-center border-border hover:border-primary/50 transition-colors">
                  <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Main Detection Area */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden border-2 border-border">
                <div className="relative bg-black aspect-video overflow-hidden">
                  <img
                    src={selectedImage.url}
                    alt={selectedImage.name}
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                  />
                  
                  {/* Scan line animation */}
                  {isDetecting && (
                    <motion.div
                      className="absolute left-0 right-0 h-0.5 bg-primary shadow-[0_0_15px_rgba(120,119,198,0.8)]"
                      initial={{ top: "0%" }}
                      animate={{ top: "100%" }}
                      transition={{ duration: 1.5, ease: "linear" }}
                    />
                  )}

                  {/* Detection boxes */}
                  <AnimatePresence>
                    {visibleDetections.map((det) => (
                      <motion.div
                        key={det.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute border-2 rounded"
                        style={{
                          left: `${det.x}%`,
                          top: `${det.y}%`,
                          width: `${det.width}%`,
                          height: `${det.height}%`,
                          borderColor: det.color,
                          boxShadow: `0 0 10px ${det.color}40`,
                        }}
                      >
                        {/* Corner brackets */}
                        <div className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 rounded-tl" style={{ borderColor: det.color }} />
                        <div className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 rounded-tr" style={{ borderColor: det.color }} />
                        <div className="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 rounded-bl" style={{ borderColor: det.color }} />
                        <div className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 rounded-br" style={{ borderColor: det.color }} />
                        
                        {/* Label */}
                        <div
                          className="absolute -top-6 left-0 px-2 py-0.5 rounded text-[10px] font-bold text-white whitespace-nowrap"
                          style={{ backgroundColor: det.color }}
                        >
                          {det.label} {(det.confidence * 100).toFixed(0)}%
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Progress overlay */}
                  {isDetecting && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="bg-background/90 backdrop-blur-sm rounded-lg px-6 py-3 flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm font-medium">Analyzing... {scanProgress}%</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="p-4 flex items-center justify-between bg-card">
                  <div className="flex gap-2">
                    <Button onClick={runDetection} disabled={isDetecting} className="gradient-primary">
                      <Play className="w-4 h-4 mr-2" /> Run Detection
                    </Button>
                    <Button variant="outline" onClick={resetDetection} disabled={isDetecting}>
                      <RotateCcw className="w-4 h-4 mr-2" /> Reset
                    </Button>
                  </div>
                  <Badge variant="secondary" className="hidden sm:flex">
                    {visibleDetections.length} objects detected
                  </Badge>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Image Selector */}
              <Card className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-primary" /> Sample Scenes
                </h3>
                <div className="space-y-2">
                  {DEMO_IMAGES.map((img) => (
                    <button
                      key={img.id}
                      onClick={() => { setSelectedImage(img); resetDetection(); }}
                      className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors text-left ${
                        selectedImage.id === img.id ? "bg-primary/10 border border-primary/30" : "hover:bg-muted"
                      }`}
                    >
                      <img src={img.url} alt={img.name} className="w-16 h-10 rounded object-cover" />
                      <div>
                        <p className="text-sm font-medium">{img.name}</p>
                        <p className="text-xs text-muted-foreground">{img.detections.length} objects</p>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Detection Results */}
              <Card className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" /> Detection Results
                </h3>
                {visibleDetections.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Run detection to see results...</p>
                ) : (
                  <div className="space-y-2">
                    {visibleDetections.map((det) => (
                      <motion.div
                        key={det.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: det.color }} />
                          <span className="text-sm font-medium">{det.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 rounded-full bg-muted">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${det.confidence * 100}%`, backgroundColor: det.color }}
                            />
                          </div>
                          <span className="text-xs font-mono text-muted-foreground">
                            {(det.confidence * 100).toFixed(1)}%
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </Card>

              {/* CTA */}
              <Card className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                <h3 className="font-semibold mb-2">Want this for your business?</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  We build custom object detection solutions tailored to your industry needs.
                </p>
                <Button asChild className="w-full gradient-primary">
                  <a href="/contact">Get a Free Consultation</a>
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
