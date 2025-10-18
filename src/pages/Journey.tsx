import { Fragment, type CSSProperties } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Milestone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { timeline } from "./whoWeAreContent";

const Journey = () => {
  const CAR_RIDE_DURATION = 32;

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        src="https://res.cloudinary.com/dch0uyw8e/video/upload/v1760810261/progress_t5lviu.mp4"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background/95 backdrop-blur-sm" aria-hidden="true" />
      <div className="relative z-10">
        <Navigation />
      </div>
      <main className="relative z-10 pt-16 pb-20">
        <section className="container mx-auto px-6 py-16">
          <div className="mb-14 mx-auto max-w-4xl text-center">
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.3em] text-indigo-500 md:text-sm">
              Timeline
            </span>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Our Journey of Intelligent Innovation</h1>
            <p className="text-lg text-muted-foreground">
              Follow the milestones that transformed Nirikshan AI from a student-led initiative into a research-driven partner powering real-world intelligence.
            </p>
          </div>

          <div className="hidden md:block mb-36 lg:mb-44">
            <div className="relative mx-auto mt-16 h-[620px] max-w-5xl">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-28 rounded-full road-surface border border-white/20 shadow-2xl shadow-indigo-500/20" aria-hidden="true" />
              <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-2 road-centerline" aria-hidden="true" />
              <div className="absolute inset-x-0 top-1/2" style={{ transform: "translateY(-50%)" }} aria-hidden="true">
                <div className="relative h-16">
                  <div
                    className="timeline-car absolute left-0 top-1/2 -translate-y-1/2 w-20"
                    style={{ left: 0, animationDuration: `${CAR_RIDE_DURATION}s` }}
                  >
                    <div className="relative h-12 w-full">
                      <div className="absolute inset-x-2 -top-4 h-4 rounded-t-xl border border-white/50 bg-sky-200/90" />
                      <div className="absolute inset-x-3 bottom-5 h-3 rounded-sm bg-white/80" />
                      <div className="absolute inset-x-1 bottom-1 h-8 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 shadow-lg shadow-indigo-500/40" />
                      <div className="absolute bottom-0 left-1.5 h-5 w-5 rounded-full border-2 border-white/60 bg-slate-900 shadow-inner" />
                      <div className="absolute bottom-0 right-1.5 h-5 w-5 rounded-full border-2 border-white/60 bg-slate-900 shadow-inner" />
                      <div className="absolute -left-2 bottom-4 h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
                      <div className="absolute -right-2 bottom-4 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                    </div>
                  </div>
                </div>
              </div>

              {timeline.map((event, index) => {
                const totalStages = timeline.length;
                const progress = totalStages > 1 ? index / (totalStages - 1) : 0;
                const leftPercent = 5 + progress * 90;
                const isEven = index % 2 === 0;
                const stageStyle: CSSProperties = {
                  left: `${leftPercent}%`,
                  top: isEven ? "calc(50% - 230px)" : "calc(50% + 110px)",
                  transform: "translateX(-50%)",
                  animationDelay: `${progress * CAR_RIDE_DURATION}s`,
                };
                const markerStyle: CSSProperties = {
                  left: `${leftPercent}%`,
                  transform: "translate(-50%, -50%)",
                };

                return (
                  <Fragment key={event.year}>
                    <div className="absolute top-1/2" style={markerStyle} aria-hidden="true">
                      <div className="h-5 w-5 rounded-full border-2 border-white/80 bg-primary shadow-lg shadow-primary/40" />
                    </div>
                    <div
                      className="road-stage absolute flex w-72 lg:w-80 flex-col items-center text-center"
                      style={stageStyle}
                    >
                      {isEven ? (
                        <>
                          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold uppercase tracking-widest text-primary md:text-base">
                            {event.year}
                          </span>
                          <div className="mt-4 w-full rounded-2xl border border-primary/15 bg-background/95 p-6 shadow-xl shadow-indigo-500/10 backdrop-blur">
                            <h3 className="text-lg font-semibold text-foreground md:text-xl">{event.title}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{event.description}</p>
                          </div>
                          <div className="mt-4 h-28 w-[2px] bg-gradient-to-b from-primary/70 to-primary/0" />
                        </>
                      ) : (
                        <>
                          <div className="mb-4 h-28 w-[2px] bg-gradient-to-t from-primary/70 to-primary/0" />
                          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold uppercase tracking-widest text-primary md:text-base">
                            {event.year}
                          </span>
                          <div className="mt-4 w-full rounded-2xl border border-primary/15 bg-background/95 p-6 text-left shadow-xl shadow-indigo-500/10 backdrop-blur">
                            <h3 className="text-lg font-semibold text-foreground md:text-xl">{event.title}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{event.description}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </div>

          <div className="mt-12 space-y-8 md:hidden">
            {timeline.map((event) => (
              <article
                key={event.year}
                className="rounded-3xl border border-primary/10 bg-background/95 p-6 shadow-lg shadow-indigo-500/10 backdrop-blur"
              >
                <div className="flex items-center gap-3 text-primary font-semibold">
                  <Milestone size={20} />
                  <span className="text-base uppercase tracking-widest">{event.year}</span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold">{event.title}</h3>
                <p className="mt-3 text-base text-muted-foreground leading-relaxed">{event.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-32 flex flex-col justify-center gap-4 sm:flex-row lg:mt-48">
            <Link to="/projects">
              <Button variant="secondary" className="gap-2 text-base">
                View Projects
                <ArrowRight size={20} />
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="gradient-primary gap-2 text-base">
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
