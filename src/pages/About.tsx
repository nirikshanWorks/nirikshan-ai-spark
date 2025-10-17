import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Eye, Users, Award, Zap, Rocket, Briefcase, Smile, TrendingUp, Flag, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import nirikshanaiVideo from "@/assets/Nirikshanai.mp4";
import { useEffect, useState } from "react";

const AnimatedCounter = ({ end, duration = 2000 }: { end: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollAnimation(0.5);

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count}</span>;
};

const About = () => {
  const missionRef = useScrollAnimation(0.2);
  const valuesRef = useScrollAnimation(0.2);
  const storyRef = useScrollAnimation(0.2);
  const statsRef = useScrollAnimation(0.3);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden group">
          <video 
            src={nirikshanaiVideo}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
          <div className="absolute inset-0 hero-overlay" />
          <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">About Nirikshan AI</h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl font-light">
                Transforming businesses through intelligent AI solutions and innovative technology partnerships
              </p>
              <div className="mt-8 h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 container mx-auto px-6" ref={missionRef.ref}>
          <div className={`grid md:grid-cols-2 gap-12 transition-all duration-1000 ${
            missionRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <div className="space-y-6 group hover:translate-x-2 transition-transform duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow">
                  <Target className="text-white" size={28} />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-3">
                    We're here to bring the power of AI to everyone, not just the big players. Think of us as your local AI partner – making smart technology simple, affordable, and actually useful for businesses like yours.
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-3">
                    Whether you're running a startup, a small business, or have a great idea you want to bring to life, we're here to help turn complex AI into practical solutions that make a real difference in our community.
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    Our commitment: No corporate jargon, no unnecessary complexity – just real solutions for real people, backed by cutting-edge technology and genuine partnership.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6 group hover:translate-x-2 transition-transform duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow">
                  <Eye className="text-white" size={28} />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Our Vision</h2>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-3">
                    To be the global leader in AI-powered business transformation, recognized for our ability to turn visionary ideas into tangible, measurable outcomes.
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-3">
                    We envision a future where every enterprise – from startups to established organizations – can harness the full potential of artificial intelligence without barriers of complexity or cost.
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    A world where AI is not a luxury but a practical tool that drives innovation, improves decision-making, and creates lasting competitive advantages for our partners.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-gradient-to-br from-secondary/50 to-secondary/30" ref={valuesRef.ref}>
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
              <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-4"></div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These principles guide everything we do and every decision we make
              </p>
            </div>
            <div className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 ${
              valuesRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}>
              {[
                {
                  icon: Users,
                  title: "Client-Centric",
                  desc: "Your success is our success. We prioritize understanding your unique challenges, business goals, and industry dynamics. Every solution is tailored to deliver measurable value and exceed expectations."
                },
                {
                  icon: Award,
                  title: "Excellence",
                  desc: "We maintain the highest standards in everything we do—from code quality to customer service to project delivery. Excellence isn't a destination; it's our continuous commitment to improvement and innovation."
                },
                {
                  icon: Zap,
                  title: "Innovation",
                  desc: "We stay at the forefront of technology trends and AI advancements. By continuously exploring new methodologies and tools, we create forward-thinking solutions that keep our partners ahead of the competition."
                }
              ].map((value, idx) => (
                <div
                  key={idx}
                  className="group relative p-8 bg-white dark:bg-slate-800/50 rounded-2xl border border-transparent hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 backdrop-blur"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="text-white" size={32} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{value.title}</h3>
                    <p className="text-muted-foreground text-center leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:w-12 transition-all duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-secondary/30" ref={statsRef.ref}>
          <div className="container mx-auto px-6">
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 text-center transition-all duration-1000 ${
              statsRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}>
              {[
                { icon: Briefcase, value: 50, label: "Projects Completed" },
                { icon: Smile, value: 30, label: "Happy Clients" },
                { icon: TrendingUp, value: 95, label: "Success Rate", suffix: "%" },
                { icon: Flag, value: 5, label: "Countries Served" },
              ].map((stat, idx) => (
                <div key={idx} className="group">
                  <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    <AnimatedCounter end={stat.value} />{stat.suffix}
                  </h3>
                  <p className="text-muted-foreground mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 container mx-auto px-6" ref={storyRef.ref}>
          <div className={`max-w-4xl mx-auto transition-all duration-1000 ${
            storyRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <div className="flex items-center gap-4 mb-8">
              <Rocket className="text-blue-600 flex-shrink-0" size={32} />
              <h2 className="text-3xl md:text-4xl font-bold">Our Story</h2>
            </div>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <div className="group p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800/50 dark:to-slate-800/30 rounded-xl border border-blue-200/30 dark:border-slate-700/50 hover:border-blue-400/50 transition-all duration-300 hover:shadow-md">
                <p className="text-base font-semibold text-foreground mb-2">The Beginning</p>
                <p className="text-base">
                  Founded with a clear vision to democratize AI technology, Nirikshan AI Pvt. Ltd. was born from a simple observation: powerful AI solutions existed, but they were complex, expensive, and inaccessible to most businesses. We set out to bridge that gap and become your trusted local AI partner.
                </p>
              </div>
              <div className="group p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-slate-800/50 dark:to-slate-800/30 rounded-xl border border-purple-200/30 dark:border-slate-700/50 hover:border-purple-400/50 transition-all duration-300 hover:shadow-md">
                <p className="text-base font-semibold text-foreground mb-2">Our Journey</p>
                <p className="text-base">
                  Our journey began when we recognized a critical pain point: businesses wanted to leverage AI but struggled with complexity, integration challenges, and prohibitive costs. We set out to change that narrative by building practical, scalable solutions that deliver real ROI without requiring a degree in machine learning to implement.
                </p>
              </div>
              <div className="group p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800/50 dark:to-slate-800/30 rounded-xl border border-blue-200/30 dark:border-slate-700/50 hover:border-blue-400/50 transition-all duration-300 hover:shadow-md">
                <p className="text-base font-semibold text-foreground mb-2">Global Impact, Local Touch</p>
                <p className="text-base">
                  Today, we work with clients across diverse industries—from veterinary and pet products in South Africa to automotive manufacturing in India and beyond. Our team combines deep expertise in AI, machine learning, computer vision, web technologies, and custom software development with a genuine commitment to understanding your business context and culture.
                </p>
              </div>
              <div className="group p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-slate-800/50 dark:to-slate-800/30 rounded-xl border border-purple-200/30 dark:border-slate-700/50 hover:border-purple-400/50 transition-all duration-300 hover:shadow-md">
                <p className="text-base font-semibold text-foreground mb-2">What Makes Us Different</p>
                <p className="text-base">
                  What truly sets us apart is our philosophy: no corporate jargon, no unnecessary complexity—just real solutions for real people. We don't just build software; we build partnerships. We listen, understand your challenges deeply, and collaborate with you to turn visionary ideas into impactful digital solutions that make a measurable difference in your business and community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>
          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Us on This Journey</h2>
              <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
              <p className="text-lg text-muted-foreground mb-10">
                Whether you're looking for a technology partner or want to be part of our team, 
                we'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="gradient-primary hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105">
                    Get in Touch
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Link to="/careers">
                  <Button size="lg" variant="outline" className="hover:bg-secondary transition-all duration-300 transform hover:scale-105">
                    View Open Positions
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
