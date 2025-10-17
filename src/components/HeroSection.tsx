import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
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
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 hero-overlay" />
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
          <p className="text-lg md:text-xl text-white/90 mb-8 fade-in-up delay-200">
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
                onClick={() => setActiveSlide(index)}
                className={`pb-4 text-sm md:text-base transition-all ${
                  index === activeSlide
                    ? "text-white border-b-2 border-accent"
                    : "text-white/60 hover:text-white/90"
                }`}
              >
                {slide.eyebrow}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
