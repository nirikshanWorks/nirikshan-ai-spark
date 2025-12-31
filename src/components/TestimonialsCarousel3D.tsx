import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  logo: string;
  rating: number;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Nirikshan AI transformed our manufacturing quality control with their computer vision solution. We've seen a 40% reduction in defects since implementation.",
    author: "Rajesh Kumar",
    role: "CTO",
    company: "Motherson Group",
    logo: "https://apn-portal.my.salesforce.com/servlet/servlet.ImageServer?id=0150h0000055wCcAAI&oid=00DE0000000c48tMAA",
    rating: 5,
  },
  {
    id: 2,
    quote: "Their generative AI chatbot has revolutionized our customer service. Response times dropped by 60% and customer satisfaction is at an all-time high.",
    author: "Priya Sharma",
    role: "Head of Digital",
    company: "Mangosorange Agritech",
    logo: "https://mangosorange.co.in/assets/img/MOLogo.png",
    rating: 5,
  },
  {
    id: 3,
    quote: "The team's expertise in SAP BTP integration saved us months of development time. Their solution seamlessly connected our legacy systems with modern analytics.",
    author: "Dr. Amit Verma",
    role: "Director of IT",
    company: "YMCA University",
    logo: "https://upload.wikimedia.org/wikipedia/en/a/ae/J.C._Bose_University_of_Science_and_Technology%2C_YMCA_logo.png",
    rating: 5,
  },
  {
    id: 4,
    quote: "Nirikshan AI delivered an exceptional predictive analytics platform that helps us forecast demand with 95% accuracy. A game-changer for our supply chain.",
    author: "Vikram Singh",
    role: "Operations Manager",
    company: "Ranayara Pvt Ltd",
    logo: "https://5.imimg.com/data5/NSDMERP/Board/2023/5/308937129/NE/QI/NP/155783236/155783236-board-1684400723760.jpg",
    rating: 5,
  },
  {
    id: 5,
    quote: "Their agentic AI solution automates our entire inventory management. What used to take days now happens in real-time with zero human intervention.",
    author: "Sanjay Patel",
    role: "CEO",
    company: "Madapet",
    logo: "https://res.cloudinary.com/dch0uyw8e/image/upload/v1760830199/LOGO_8_8_kkuti6.jpg",
    rating: 5,
  },
];

export const TestimonialsCarousel3D = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [autoPlay]);

  const nextTestimonial = () => {
    setAutoPlay(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setAutoPlay(false);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section className="py-20 bg-gradient-to-b from-background via-secondary/20 to-background overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold mb-4">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm uppercase tracking-wider">Client Success Stories</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by innovative companies across industries to deliver transformative AI solutions
          </p>
        </div>

        {/* 3D Carousel */}
        <div className="relative max-w-5xl mx-auto">
          {/* Background cards */}
          <div className="absolute inset-0 flex items-center justify-center">
            {testimonials.map((_, idx) => {
              const offset = idx - activeIndex;
              const normalizedOffset = offset > testimonials.length / 2 
                ? offset - testimonials.length 
                : offset < -testimonials.length / 2 
                  ? offset + testimonials.length 
                  : offset;
              
              if (normalizedOffset === 0) return null;
              
              return (
                <div
                  key={idx}
                  className="absolute w-[300px] md:w-[400px] h-[300px] rounded-2xl bg-card border border-border/50 transition-all duration-700"
                  style={{
                    transform: `translateX(${normalizedOffset * 120}px) translateZ(${-Math.abs(normalizedOffset) * 150}px) rotateY(${normalizedOffset * -8}deg) scale(${1 - Math.abs(normalizedOffset) * 0.15})`,
                    opacity: 1 - Math.abs(normalizedOffset) * 0.4,
                    zIndex: -Math.abs(normalizedOffset),
                  }}
                />
              );
            })}
          </div>

          {/* Main flip card */}
          <div
            className="relative w-full max-w-2xl mx-auto h-[400px] md:h-[350px] cursor-pointer perspective-[1500px]"
            onClick={handleCardClick}
          >
            <div
              className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* Front of card */}
              <Card
                className="absolute inset-0 p-8 md:p-10 border-2 border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 shadow-2xl shadow-primary/10 backface-hidden"
                style={{ backfaceVisibility: 'hidden' }}
              >
                {/* Quote icon */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full gradient-primary flex items-center justify-center shadow-lg">
                  <Quote className="text-white" size={20} />
                </div>

                {/* Rating stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: activeTestimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg md:text-xl leading-relaxed text-foreground/90 mb-8 italic">
                  "{activeTestimonial.quote}"
                </blockquote>

                {/* Author info */}
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center overflow-hidden border-2 border-primary/20">
                    <img
                      src={activeTestimonial.logo}
                      alt={activeTestimonial.company}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-lg">{activeTestimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{activeTestimonial.role}</p>
                    <p className="text-sm text-primary font-medium">{activeTestimonial.company}</p>
                  </div>
                </div>

                {/* Flip hint */}
                <div className="absolute bottom-4 right-4 text-xs text-muted-foreground flex items-center gap-1">
                  <span>Click to see company</span>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12a9 9 0 0 1 9-9m0 18a9 9 0 0 0 0-18m0 18a9 9 0 0 1 0-18" />
                    <path d="M17 12H7m5-5l5 5-5 5" />
                  </svg>
                </div>
              </Card>

              {/* Back of card */}
              <Card
                className="absolute inset-0 p-8 md:p-10 border-2 border-accent/20 bg-gradient-to-br from-card via-card to-accent/5 shadow-2xl shadow-accent/10 flex flex-col items-center justify-center backface-hidden"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                {/* Company logo large */}
                <div className="w-32 h-32 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-lg p-4">
                  <img
                    src={activeTestimonial.logo}
                    alt={activeTestimonial.company}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <h3 className="text-2xl font-bold mb-2">{activeTestimonial.company}</h3>
                <p className="text-muted-foreground mb-4">Trusted Partner</p>

                {/* Stats */}
                <div className="flex gap-8 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">40%</p>
                    <p className="text-xs text-muted-foreground">Efficiency Gain</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-accent">95%</p>
                    <p className="text-xs text-muted-foreground">Satisfaction</p>
                  </div>
                </div>

                {/* Flip hint */}
                <div className="absolute bottom-4 right-4 text-xs text-muted-foreground flex items-center gap-1">
                  <span>Click to see testimonial</span>
                  <svg className="w-4 h-4 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12a9 9 0 0 1 9-9m0 18a9 9 0 0 0 0-18m0 18a9 9 0 0 1 0-18" />
                    <path d="M17 12H7m5-5l5 5-5 5" />
                  </svg>
                </div>
              </Card>
            </div>
          </div>

          {/* Navigation arrows */}
          <Button
            variant="outline"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              prevTestimonial();
            }}
            className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 rounded-full w-12 h-12 bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-all z-10"
          >
            <ChevronLeft size={24} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              nextTestimonial();
            }}
            className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 rounded-full w-12 h-12 bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-all z-10"
          >
            <ChevronRight size={24} />
          </Button>
        </div>

        {/* Dots navigation */}
        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((testimonial, idx) => (
            <button
              key={testimonial.id}
              onClick={() => {
                setAutoPlay(false);
                setActiveIndex(idx);
                setIsFlipped(false);
              }}
              className={`relative w-12 h-12 rounded-full border-2 transition-all duration-300 overflow-hidden ${
                idx === activeIndex
                  ? 'border-primary scale-110 shadow-lg shadow-primary/30'
                  : 'border-border/50 opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={testimonial.logo}
                alt={testimonial.company}
                className="w-full h-full object-cover p-2"
              />
              {idx === activeIndex && (
                <div className="absolute inset-0 bg-primary/10 animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Auto-play indicator */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className={`text-sm flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
              autoPlay
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${autoPlay ? 'bg-primary animate-pulse' : 'bg-muted-foreground'}`} />
            {autoPlay ? 'Auto-playing' : 'Paused'}
          </button>
        </div>
      </div>
    </section>
  );
};
