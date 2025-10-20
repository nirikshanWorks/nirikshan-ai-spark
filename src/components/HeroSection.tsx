import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ComputerVisionGrid } from "./ComputerVisionGrid";
import { GenerativeTextEffect } from "./GenerativeTextEffect";

interface HeroSlide {
  image?: string;
  video?: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: {
    text: string;
    link: string;
  };
}

interface HeroSectionProps {
  slides: HeroSlide[];
}

export const HeroSection = ({ slides }: HeroSectionProps) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);

  const SLIDE_DURATION = 8000;

  useEffect(() => {
    if (slides.length <= 1) {
      setProgress(100);
      return undefined;
    }

    let frameId: number;
    const start = performance.now();
    setProgress(0);

    const animate = (timestamp: number) => {
      const elapsed = timestamp - start;
      const nextProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(nextProgress);

      if (elapsed >= SLIDE_DURATION) {
        setActiveSlide((prev) => (prev + 1) % slides.length);
        return;
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [activeSlide, slides.length, cycleKey]);

  const handleManualSlide = (index: number) => {
    if (index === activeSlide) {
      setCycleKey((key) => key + 1);
    } else {
      setActiveSlide(index);
    }
    setProgress(0);
  };

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Computer Vision Grid Overlay */}
      <div className="absolute inset-0 z-[5] pointer-events-none opacity-20">
        <ComputerVisionGrid />
      </div>

      {/* Background Images/Videos */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === activeSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {slide.video ? (
            <video
              src={slide.video}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={slide.image}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 hero-overlay" aria-hidden="true" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
        <div className="max-w-3xl">
          <p className="text-accent text-sm md:text-base font-medium mb-4 uppercase tracking-wider fade-in-up">
            {slides[activeSlide].eyebrow}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight fade-in-up delay-100">
            {slides[activeSlide].title}
          </h1>
          <div className="text-lg md:text-xl text-white/90 mb-8 fade-in-up delay-200">
            <GenerativeTextEffect 
              texts={[
                "Building Intelligent Vision Systems",
                "Creating Autonomous AI Agents",
                "Powering Generative AI Solutions",
                "Transforming Industries with AI"
              ]}
              className="font-semibold text-accent"
            />
          </div>
          <p className="text-lg md:text-xl text-white/90 mb-8 fade-in-up delay-300">
            {slides[activeSlide].description}
          </p>
          <div className="fade-in-up delay-300">
            <Link to={slides[activeSlide].cta.link}>
              <Button size="lg" className="gradient-primary group">
                {slides[activeSlide].cta.text}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </Link>
          </div>
        </div>

        {/* Slide Navigation */}
        <div className="absolute bottom-8 left-6 right-6 md:left-auto md:right-auto md:bottom-12">
          <div className="flex space-x-6 border-b border-white/20">
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => handleManualSlide(index)}
                type="button"
                aria-label={`Show hero slide: ${slide.eyebrow}`}
                aria-pressed={index === activeSlide}
                className={`relative pb-6 text-left text-sm md:text-base transition-all ${
                  index === activeSlide
                    ? "text-white"
                    : "text-white/60 hover:text-white/90"
                }`}
              >
                {slide.eyebrow}
                <span className="absolute left-0 bottom-0 h-[2px] w-full overflow-hidden rounded-full bg-white/15">
                  <span
                    className={`block h-full origin-left ${index === activeSlide ? "bg-accent" : "bg-white/30"}`}
                    style={{ width: `${index === activeSlide ? progress : index < activeSlide ? 100 : 0}%` }}
                  />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
