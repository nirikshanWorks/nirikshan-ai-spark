import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface ProductItem {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  color: string;
}

interface ProductCarousel3DProps {
  items: ProductItem[];
}

export const ProductCarousel3D = ({ items }: ProductCarousel3DProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPos = useRef({ x: 0, y: 0 });

  // Auto rotation
  useEffect(() => {
    if (!autoRotate || isDragging) return;
    
    const interval = setInterval(() => {
      setRotation(prev => ({
        ...prev,
        y: prev.y + 0.3,
      }));
    }, 50);
    
    return () => clearInterval(interval);
  }, [autoRotate, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastPos.current.x;
    const deltaY = e.clientY - lastPos.current.y;
    
    setRotation(prev => ({
      x: Math.max(-30, Math.min(30, prev.x - deltaY * 0.5)),
      y: prev.y + deltaX * 0.5,
    }));
    
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const nextItem = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const prevItem = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const resetView = () => {
    setRotation({ x: 0, y: 0 });
    setZoom(1);
    setAutoRotate(true);
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 1.5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.6));

  const activeItem = items[activeIndex];
  const Icon = activeItem.icon;

  return (
    <div className="relative py-16">
      {/* Controls */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomOut}
          className="bg-background/80 backdrop-blur-sm"
        >
          <ZoomOut size={18} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomIn}
          className="bg-background/80 backdrop-blur-sm"
        >
          <ZoomIn size={18} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={resetView}
          className="bg-background/80 backdrop-blur-sm"
        >
          <RotateCcw size={18} />
        </Button>
      </div>

      {/* 3D Scene */}
      <div
        ref={containerRef}
        className="relative h-[500px] perspective-[1200px] cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Ambient lighting effect */}
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
        
        {/* Main 3D Card */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
          style={{
            transform: `scale(${zoom}) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Back face shadow */}
          <div
            className="absolute w-[400px] h-[450px] rounded-3xl bg-black/30 blur-2xl"
            style={{
              transform: 'translateZ(-50px) translateY(20px)',
            }}
          />
          
          {/* Main Card */}
          <Card
            className="relative w-[400px] h-[450px] p-8 border-2 transition-all duration-500"
            style={{
              transformStyle: 'preserve-3d',
              background: `linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--card)) 50%, ${activeItem.color}10 100%)`,
              borderColor: `${activeItem.color}40`,
              boxShadow: `0 25px 50px -12px ${activeItem.color}30, 0 0 80px ${activeItem.color}10`,
            }}
          >
            {/* Floating icon */}
            <div
              className="absolute -top-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl"
              style={{
                transform: 'translateZ(60px)',
                background: `linear-gradient(135deg, ${activeItem.color}, ${activeItem.color}CC)`,
              }}
            >
              <Icon className="text-white" size={36} />
            </div>
            
            {/* Content */}
            <div className="mt-12 text-center" style={{ transform: 'translateZ(30px)' }}>
              <h3 className="text-2xl font-bold mb-4">{activeItem.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {activeItem.description}
              </p>
              
              {/* Features */}
              <div className="space-y-3 text-left">
                {activeItem.features.slice(0, 4).map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50 transition-transform hover:translate-x-2"
                    style={{ transform: `translateZ(${40 + idx * 5}px)` }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: activeItem.color }}
                    />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Decorative elements */}
            <div
              className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-xl opacity-50"
              style={{ background: activeItem.color }}
            />
            <div
              className="absolute -top-4 -left-4 w-16 h-16 rounded-full blur-lg opacity-30"
              style={{ background: activeItem.color }}
            />
          </Card>
          
          {/* Side cards preview */}
          {items.map((item, idx) => {
            if (idx === activeIndex) return null;
            const offset = idx - activeIndex;
            const normalizedOffset = offset > items.length / 2 ? offset - items.length : offset < -items.length / 2 ? offset + items.length : offset;
            const ItemIcon = item.icon;
            
            return (
              <Card
                key={idx}
                className="absolute w-[300px] h-[350px] p-6 opacity-40 cursor-pointer transition-all duration-500 hover:opacity-60"
                style={{
                  transform: `translateX(${normalizedOffset * 250}px) translateZ(${-Math.abs(normalizedOffset) * 100}px) rotateY(${normalizedOffset * -15}deg) scale(${1 - Math.abs(normalizedOffset) * 0.2})`,
                  borderColor: `${item.color}20`,
                }}
                onClick={() => setActiveIndex(idx)}
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `linear-gradient(135deg, ${item.color}80, ${item.color}40)` }}
                  >
                    <ItemIcon className="text-white" size={24} />
                  </div>
                  <h4 className="font-semibold">{item.title}</h4>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <Button
          variant="outline"
          size="icon"
          onClick={prevItem}
          className="rounded-full w-12 h-12 bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-all"
        >
          <ChevronLeft size={24} />
        </Button>
        
        {/* Dots */}
        <div className="flex gap-2">
          {items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? 'w-8 bg-primary'
                  : 'bg-muted hover:bg-muted-foreground/50'
              }`}
              style={idx === activeIndex ? { background: item.color } : {}}
            />
          ))}
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={nextItem}
          className="rounded-full w-12 h-12 bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-all"
        >
          <ChevronRight size={24} />
        </Button>
      </div>

      {/* Instructions */}
      <p className="text-center text-sm text-muted-foreground mt-4">
        Drag to rotate • Scroll to navigate • Click cards to select
      </p>
    </div>
  );
};
