import { useEffect, useState } from "react";
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
  secondaryCta?: {
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
    // reduced mobile height and made responsive to avoid content overlapping the fixed header on small screens
    <section className="relative h-[520px] sm:h-[600px] md:h-[700px] overflow-hidden">
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
              preload={index === 0 ? "auto" : "none"}
            />
          ) : (
            <img
              src={slide.image}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
          )}
          <div className="absolute inset-0 hero-overlay bg-gradient-to-b from-black/40 via-black/20 to-transparent md:from-transparent md:via-transparent" aria-hidden="true" />
        </div>
      ))}

      {/* Content */}
  <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center pt-0">
          <div className="max-w-full sm:max-w-3xl">
          <p className="text-accent text-sm sm:text-base md:text-lg font-semibold mb-3 uppercase tracking-wider fade-in-up">
            {slides[activeSlide].eyebrow}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight fade-in-up delay-100">
            {slides[activeSlide].title}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/80 mb-3 sm:mb-4 font-semibold tracking-[0.2em] uppercase fade-in-up delay-150">
            Empowering Insight with Intelligence
          </p>
          <div className="text-base sm:text-lg md:text-xl text-white/90 mb-6 fade-in-up delay-200">
            <GenerativeTextEffect 
              texts={[
                "OpenCV & Computer Vision Engineering",
                "Generative AI Experience Platforms",
                "Agentic AI Systems with Real Autonomy",
                "End-to-End AI Innovation for Enterprises"
              ]}
              className="font-semibold text-accent"
            />
          </div>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 fade-in-up delay-300">
            {slides[activeSlide].description}
          </p>
          {/* primary CTA buttons removed for a cleaner mobile-first experience */}
        </div>

        {/* Slide Navigation */}
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-auto sm:bottom-12">
          <div className="flex flex-row gap-4 overflow-x-auto pb-3 border-b border-white/20">
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => handleManualSlide(index)}
                type="button"
                aria-label={`Show hero slide: ${slide.eyebrow}`}
                aria-pressed={index === activeSlide}
                className={`relative text-left text-sm sm:text-base md:text-lg transition-all whitespace-nowrap inline-block ${
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
