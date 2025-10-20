import { Fragment, useEffect, useRef, useState, type CSSProperties } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Milestone, ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { timeline } from "./whoWeAreContent";

const TRAVEL_DURATION = 4500;
const PAUSE_DURATION = 2000;
const STOP_POSITIONS = timeline.length > 1
  ? timeline.map((_, idx) => idx / (timeline.length - 1))
  : [0];

const Journey = () => {
  const [carProgress, setCarProgress] = useState(STOP_POSITIONS[0] ?? 0);
  const [activeStop, setActiveStop] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [visitedStops, setVisitedStops] = useState(() => new Set<number>([0]));

  const directionRef = useRef<1 | -1>(1);
  const phaseRef = useRef<"pause" | "travel">("pause");
  const currentStopRef = useRef(0);
  const phaseStartRef = useRef<number | null>(null);
  const travelStartRef = useRef(STOP_POSITIONS[0] ?? 0);
  const travelEndRef = useRef(STOP_POSITIONS[1] ?? STOP_POSITIONS[0] ?? 0);
  const rafRef = useRef<number>();

  useEffect(() => {
    if (STOP_POSITIONS.length <= 1) {
      setCarProgress(STOP_POSITIONS[0] ?? 0);
      setActiveStop(0);
      setIsPaused(true);
      return;
    }

    const step = (timestamp: number) => {
      if (phaseStartRef.current == null) {
        phaseStartRef.current = timestamp;
        setCarProgress(STOP_POSITIONS[currentStopRef.current]);
        setActiveStop(currentStopRef.current);
        setIsPaused(true);
      }

      const elapsed = timestamp - (phaseStartRef.current ?? timestamp);

      if (phaseRef.current === "pause") {
        const currentPos = STOP_POSITIONS[currentStopRef.current];
        setCarProgress((prev) => (prev === currentPos ? prev : currentPos));
        setActiveStop((prev) => (prev === currentStopRef.current ? prev : currentStopRef.current));
        if (elapsed >= PAUSE_DURATION) {
          let nextIndex = currentStopRef.current + directionRef.current;
          if (nextIndex < 0 || nextIndex >= STOP_POSITIONS.length) {
            directionRef.current = (directionRef.current * -1) as 1 | -1;
            nextIndex = currentStopRef.current + directionRef.current;
          }

          travelStartRef.current = STOP_POSITIONS[currentStopRef.current];
          travelEndRef.current = STOP_POSITIONS[nextIndex];
          phaseRef.current = "travel";
          phaseStartRef.current = timestamp;
          setIsPaused(false);
        }
      } else {
        const ratio = Math.min(elapsed / TRAVEL_DURATION, 1);
        const start = travelStartRef.current;
        const end = travelEndRef.current;
        setCarProgress(start + (end - start) * ratio);

        if (ratio >= 1) {
          currentStopRef.current = currentStopRef.current + directionRef.current;
          phaseRef.current = "pause";
          phaseStartRef.current = timestamp;
          setIsPaused(true);
          setCarProgress(travelEndRef.current);
          setActiveStop(currentStopRef.current);
          setVisitedStops((prev) => {
            const next = new Set(prev);
            next.add(currentStopRef.current);
            return next;
          });
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      phaseStartRef.current = null;
    };
  }, []);

  const carLeftPercent = 5 + carProgress * 90;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-foreground">
      <video
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-30"
        autoPlay
        muted
        loop
        playsInline
        src="https://res.cloudinary.com/dch0uyw8e/video/upload/v1760810261/progress_t5lviu.mp4"
      />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-background/95 via-background/85 to-background/95 backdrop-blur-sm" aria-hidden="true" />
      
      {/* Animated stars/particles */}
      <div className="absolute inset-0 z-5" aria-hidden="true">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.5 + 0.2
            }}
          />
        ))}
      </div>

      <div className="relative z-50 pointer-events-auto">
        <Navigation />
      </div>
      <main className="relative z-20 pt-16 pb-20">
        <section className="container mx-auto px-6 py-16">
          <div className="mb-14 mx-auto max-w-4xl text-center">
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.3em] text-primary md:text-sm">
              Timeline
            </span>
            <h1 className="mb-6 text-4xl font-display font-bold md:text-5xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Our Journey of Intelligent Innovation
            </h1>
            <p className="text-lg text-muted-foreground">
              Follow the milestones that transformed Nirikshan AI from a student-led initiative into a research-driven partner powering real-world intelligence.
            </p>
          </div>

          <div className="hidden md:block mb-36 lg:mb-44">
            <div className="relative mx-auto mt-16 h-[650px] max-w-6xl">
              {/* Road Base with realistic texture */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-32" aria-hidden="true">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800 rounded-3xl shadow-2xl">
                  {/* Asphalt texture overlay */}
                  <div className="absolute inset-0 opacity-30 rounded-3xl" style={{
                    backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)`
                  }} />
                  {/* Road edges */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500/60 to-transparent" />
                </div>
              </div>
              
              {/* Center lane dashed line */}
              <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-1" aria-hidden="true">
                <div className="h-full" style={{
                  backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 20px, #fbbf24 20px, #fbbf24 40px, transparent 40px, transparent 50px)`,
                  backgroundSize: '50px 100%'
                }} />
              </div>

              {/* Side lane markers */}
              <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2">
                <div className="absolute -top-12 left-0 right-0 h-0.5 bg-white/40" />
                <div className="absolute -bottom-12 left-0 right-0 h-0.5 bg-white/40" />
              </div>

              {/* Animated Car */}
              <div className="absolute inset-x-0 top-1/2" style={{ transform: "translateY(-50%)" }} aria-hidden="true">
                <div className="relative h-20">
                  <div
                    className={`timeline-car absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${!isPaused ? 'scale-105' : 'scale-100'}`}
                    style={{ 
                      left: `${carLeftPercent}%`,
                      filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
                    }}
                  >
                    <div className="relative h-16 w-28">
                      {/* Car windshield */}
                      <div className="absolute inset-x-6 -top-6 h-6 rounded-t-2xl border-2 border-blue-300/50 bg-gradient-to-b from-blue-100/90 to-blue-200/70 backdrop-blur-sm" />
                      
                      {/* Car windows */}
                      <div className="absolute inset-x-8 top-0 h-4 rounded-sm bg-blue-900/40" />
                      
                      {/* Car body */}
                      <div className="absolute inset-x-2 top-4 h-10 rounded-2xl bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 shadow-2xl border-2 border-blue-400/30">
                        {/* Car body shine */}
                        <div className="absolute inset-x-4 top-1 h-2 bg-gradient-to-r from-transparent via-blue-300/40 to-transparent rounded-full" />
                        {/* Door line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-900/30" />
                      </div>

                      {/* Wheels */}
                      <div className="absolute bottom-0 left-4 h-7 w-7 rounded-full border-3 border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg">
                        <div className="absolute inset-1 rounded-full border-2 border-gray-600 bg-gray-800" />
                        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-gray-600 to-gray-700" />
                        {!isPaused && (
                          <div className="absolute inset-0 rounded-full animate-spin border-2 border-transparent border-t-gray-500" />
                        )}
                      </div>
                      <div className="absolute bottom-0 right-4 h-7 w-7 rounded-full border-3 border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg">
                        <div className="absolute inset-1 rounded-full border-2 border-gray-600 bg-gray-800" />
                        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-gray-600 to-gray-700" />
                        {!isPaused && (
                          <div className="absolute inset-0 rounded-full animate-spin border-2 border-transparent border-t-gray-500" />
                        )}
                      </div>

                      {/* Headlights */}
                      <div className="absolute -left-1 top-7 h-3 w-3 rounded-full bg-yellow-400 shadow-[0_0_15px_rgba(251,191,36,0.9)]">
                        <div className="absolute inset-0.5 rounded-full bg-yellow-200" />
                      </div>
                      <div className="absolute -right-1 top-7 h-3 w-3 rounded-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.9)]">
                        <div className="absolute inset-0.5 rounded-full bg-red-300" />
                      </div>

                      {/* Exhaust smoke when moving */}
                      {!isPaused && directionRef.current === 1 && (
                        <>
                          <div className="absolute -right-4 bottom-2 w-2 h-2 rounded-full bg-gray-400/40 animate-ping" />
                          <div className="absolute -right-6 bottom-3 w-3 h-3 rounded-full bg-gray-400/20 animate-pulse" />
                        </>
                      )}
                      {!isPaused && directionRef.current === -1 && (
                        <>
                          <div className="absolute -left-4 bottom-2 w-2 h-2 rounded-full bg-gray-400/40 animate-ping" />
                          <div className="absolute -left-6 bottom-3 w-3 h-3 rounded-full bg-gray-400/20 animate-pulse" />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Milestones */}
              {timeline.map((event, index) => {
                const totalStages = timeline.length;
                const progress = totalStages > 1 ? index / (totalStages - 1) : 0;
                const leftPercent = 5 + progress * 90;
                const isEven = index % 2 === 0;
                const hasVisited = visitedStops.has(index);
                const isStageActive = hasVisited || (isPaused && activeStop === index);
                const translateY = isStageActive ? 0 : isEven ? -32 : 32;
                const verticalOffset = isEven ? 360 : 90;
                const connectorHeight = isEven
                  ? Math.max(verticalOffset - 40, 10)
                  : Math.max(10, verticalOffset - 40);
                const stageStyle: CSSProperties = {
                  left: `${leftPercent}%`,
                  top: isEven
                    ? `calc(50% - ${verticalOffset}px)`
                    : `calc(50% + ${verticalOffset}px)`,
                  transform: `translate(-50%, ${translateY}px)`,
                  opacity: isStageActive ? 1 : 0,
                  pointerEvents: isStageActive ? "auto" : "none",
                  zIndex: isStageActive ? 10 : 1,
                };
                const markerStyle: CSSProperties = {
                  left: `${leftPercent}%`,
                  transform: "translate(-50%, -50%)",
                };
                const isReached = activeStop > index;

                return (
                  <Fragment key={event.year}>
                    {/* Road Marker/Sign Post */}
                    <div className="absolute top-1/2" style={markerStyle} aria-hidden="true">
                      <div className="relative flex flex-col items-center">
                        {/* Sign post */}
                        <div className="absolute -bottom-16 w-1 h-32 bg-gradient-to-b from-gray-600 to-gray-700 rounded-full shadow-lg" />
                        
                        {/* Location marker */}
                        <div className="relative">
                          <MapPin 
                            className={`transition-all duration-500 ${
                              activeStop === index
                                ? "w-10 h-10 text-primary drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                                : isReached
                                  ? "w-8 h-8 text-primary/70"
                                  : "w-6 h-6 text-primary/30"
                            }`}
                            fill={activeStop === index ? "currentColor" : "none"}
                          />
                          {activeStop === index && (
                            <div className="absolute inset-0 animate-ping">
                              <MapPin className="w-10 h-10 text-primary opacity-75" />
                            </div>
                          )}
                        </div>
                        
                        <span className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] text-primary bg-background/80 px-2 py-0.5 rounded-full">
                          {event.year}
                        </span>
                      </div>
                    </div>

                    {/* Timeline Event Card */}
                    <div
                      className="road-stage absolute flex w-80 lg:w-96 flex-col items-center text-center"
                      style={stageStyle}
                    >
                      {isEven ? (
                        <>
                          <div className="w-full rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-background via-background/95 to-secondary/30 p-6 shadow-2xl backdrop-blur-xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105">
                            <div className="flex items-center justify-center gap-2 mb-3">
                              <Milestone className="text-primary w-5 h-5" />
                              <span className="text-lg font-bold text-primary">{event.year}</span>
                            </div>
                            <h3 className="text-xl font-display font-bold text-foreground mb-3">{event.title}</h3>
                            <p className="text-sm leading-relaxed text-muted-foreground">{event.description}</p>
                          </div>
                          <div
                            className="mt-4 w-1 bg-gradient-to-b from-primary/70 via-primary/40 to-transparent rounded-full"
                            style={{ height: connectorHeight }}
                          />
                        </>
                      ) : (
                        <>
                          <div
                            className="mb-4 w-1 bg-gradient-to-t from-primary/70 via-primary/40 to-transparent rounded-full"
                            style={{ height: connectorHeight }}
                          />
                          <div className="w-full rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-background via-background/95 to-secondary/30 p-6 shadow-2xl backdrop-blur-xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105">
                            <div className="flex items-center justify-center gap-2 mb-3">
                              <Milestone className="text-primary w-5 h-5" />
                              <span className="text-lg font-bold text-primary">{event.year}</span>
                            </div>
                            <h3 className="text-xl font-display font-bold text-foreground mb-3">{event.title}</h3>
                            <p className="text-sm leading-relaxed text-muted-foreground">{event.description}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="mt-12 space-y-8 md:hidden">
            {timeline.map((event) => (
              <article
                key={event.year}
                className="rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-background to-secondary/20 p-6 shadow-xl backdrop-blur hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300"
              >
                <div className="flex items-center gap-3 text-primary font-semibold">
                  <Milestone size={24} />
                  <span className="text-lg uppercase tracking-widest">{event.year}</span>
                </div>
                <h3 className="mt-4 text-2xl font-display font-bold">{event.title}</h3>
                <p className="mt-3 text-base text-muted-foreground leading-relaxed">{event.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-32 flex flex-col justify-center gap-4 sm:flex-row lg:mt-48">
            <Link to="/projects">
              <Button variant="secondary" className="gap-2 text-base hover:scale-105 transition-transform">
                View Projects
                <ArrowRight size={20} />
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="gradient-primary gap-2 text-base hover:scale-105 transition-transform">
                Collaborate With Us
                <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default Journey;
