import { FloatingElements } from "@/components/FloatingElements";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/Footer";
import { HeroParticles } from "@/components/HeroParticles";
import { Navigation } from "@/components/Navigation";
import { AICircuitLines } from "@/components/AICircuitLines";
import { AIFloatingIcons } from "@/components/AIFloatingIcons";
import { FadeUp } from "@/components/ScrollAnimations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowUpRight,
  BookOpen,
  Calendar,
  Heart,
  Mail,
  Phone,
  Rocket,
  Send,
  Sparkles,
  Award,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { lazy, Suspense, useRef, useState } from "react";
import { toast } from "sonner";

// Lazy-loaded ReCAPTCHA
const LazyReCAPTCHA = lazy(() =>
  import("react-google-recaptcha").then((mod) => ({
    default: mod.default || mod,
  })).catch(() => ({
    default: (() => null) as any,
  }))
);

const TRACKS = [
  {
    id: "tech-for-good",
    title: "Tech for Good (AI & Software)",
    description: "Develop software solutions, mobile apps, and machine learning pipelines designed to solve grassroots rural challenges. Work on projects like Manorma Krishi Rakshak.",
    icon: Rocket,
    color: "text-primary bg-primary/10"
  },
  {
    id: "rural-operations",
    title: "Community & Rural Operations",
    description: "Work directly on the ground in Uttarakhand alongside MDJKS NGO. Assist in implementing natural farming initiatives, mountain water harvesting, and women self-help programs.",
    icon: Heart,
    color: "text-emerald-500 bg-emerald-500/10"
  },
  {
    id: "digital-literacy",
    title: "Digital Literacy & Education",
    description: "Empower rural youth and women by designing and delivering basic digital literacy workshops, computer training, and professional skill-building initiatives.",
    icon: BookOpen,
    color: "text-blue-500 bg-blue-500/10"
  }
];

const PROGRAM_HIGHLIGHTS = [
  { title: "Joint Certification", desc: "Receive a completion certificate co-signed by Nirikshan AI Pvt. Ltd. and MDJKS NGO.", icon: Award },
  { title: "Expert Mentorship", desc: "Be guided by seasoned AI practitioners, software architects, and social development leaders.", icon: Sparkles },
  { title: "Real-World Impact", desc: "Your code and efforts directly benefit rural communities, farmers, and women in Uttarakhand.", icon: ShieldCheck }
];

const GOOGLE_SCRIPT_ENDPOINT = "https://script.google.com/macros/s/AKfycbyTppieXQq9GDK_w39zitCC2E2GcxVVMwRVGe9hUWJx8qHP6aY25b4OW8U4P0bc_Cjj/exec";
const FALLBACK_RECAPTCHA_SITE_KEY = "6Lc1Ee8rAAAAAMDv9xtvK72UdB1JORiBAJXVyIek";

const FORM_INITIAL_STATE = {
  name: "",
  email: "",
  phone: "",
  college: "",
  track: "",
  resumeLink: "",
  statementOfPurpose: ""
};

const SocialInternship = () => {
  const [formData, setFormData] = useState(() => ({ ...FORM_INITIAL_STATE }));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<any>(null);
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || FALLBACK_RECAPTCHA_SITE_KEY;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.track) {
      toast.error("Please select an internship track.");
      return;
    }
    if (!recaptchaToken) {
      toast.error("Please verify you are human before submitting.");
      return;
    }
    setIsSubmitting(true);

    const payload = {
      ...formData,
      submissionType: "internship-application",
      recaptchaToken
    };

    try {
      let submissionOk = false;
      let failureReason: string | undefined;

      try {
        const response = await fetch(GOOGLE_SCRIPT_ENDPOINT, {
          method: "POST",
          body: JSON.stringify(payload)
        });

        if (response.type === "opaque") {
          submissionOk = true;
        } else {
          const rawText = await response.text();
          let result: { success?: boolean; error?: string } = {};
          try {
            result = rawText ? JSON.parse(rawText) : {};
          } catch {
            result = { success: response.ok };
          }
          submissionOk = response.ok && result?.success !== false;
          failureReason = result?.error || (!response.ok ? response.statusText : undefined);
        }
      } catch (networkError) {
        failureReason = networkError instanceof Error ? networkError.message : String(networkError);
        try {
          await fetch(GOOGLE_SCRIPT_ENDPOINT, {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify(payload)
          });
          submissionOk = true;
        } catch (fallbackError) {
          failureReason = fallbackError instanceof Error ? fallbackError.message : String(fallbackError);
        }
      }

      if (!submissionOk) {
        throw new Error(failureReason || "Submission failed");
      }

      toast.success("Application submitted successfully! Our committee will review it and get in touch.");
      setFormData({ ...FORM_INITIAL_STATE });
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    } catch (error) {
      console.error("Internship form submission failed", error);
      toast.error("Something went wrong. Please try again or email us directly at info@nirikshanai.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Social & Tech Internship Program — Nirikshan AI & MDJKS"
        description="Apply for the joint Social & Technology Internship Program by Nirikshan AI and MDJKS NGO. Bridge AI technology with community development in Uttarakhand."
        canonical="https://nirikshanai.com/social-internship"
      />
      <Navigation />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 md:py-32 bg-secondary/10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-emerald-500/5 animate-pulse-slow" aria-hidden="true" />
          <AICircuitLines className="opacity-25" />
          <HeroParticles />
          <FloatingElements count={8} />

          <div className="relative container mx-auto px-6 max-w-5xl text-center space-y-8">
            <Badge className="inline-flex items-center gap-2 bg-primary/10 text-primary border-primary/20 px-3 py-1 text-xs md:text-sm">
              <Sparkles size={14} /> Joint Initiative: Technology & Social Impact
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Social & Technology <br />
              <span className="text-gradient">Internship Program 2026</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Launched collaboratively by **Nirikshan AI** and **MDJKS NGO**, this program offers young innovators a unique pathway to build and deploy digital systems, conduct fieldwork, and empower rural communities in Uttarakhand.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button size="lg" className="gradient-primary shadow-lg shadow-primary/30" asChild>
                <a href="#apply-form">
                  Apply Now
                  <ArrowUpRight size={18} />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://mdjks.org" target="_blank" rel="noopener noreferrer">
                  Learn about MDJKS
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Tracks Section */}
        <section className="py-20 container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Choose Your Track</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select the area that matches your skills and passions. Bring your energy to make a measurable difference.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TRACKS.map((track) => {
              const Icon = track.icon;
              return (
                <div
                  key={track.id}
                  className="group relative p-8 rounded-3xl border border-border bg-card hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ai-border-glow shadow-md"
                >
                  <div className="space-y-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${track.color}`}>
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold">{track.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{track.description}</p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-border/60">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">Applications Open</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Program Highlights */}
        <section className="py-20 bg-secondary/20 relative">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Program Experience</h2>
              <p className="text-muted-foreground">What you will gain from this structured engagement</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {PROGRAM_HIGHLIGHTS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex gap-4 items-start bg-card/85 p-6 rounded-2xl border border-border">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <Icon size={20} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-foreground">{item.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Details Bar */}
            <div className="mt-12 p-6 rounded-3xl border border-dashed border-primary/40 bg-primary/5 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-1">
                <p className="text-xs uppercase text-muted-foreground tracking-widest font-semibold">Duration</p>
                <p className="font-bold text-foreground">6 - 8 Weeks</p>
              </div>
              <div className="space-y-1 border-t md:border-t-0 md:border-x border-border/80 py-4 md:py-0">
                <p className="text-xs uppercase text-muted-foreground tracking-widest font-semibold">Location</p>
                <p className="font-bold text-foreground">Remote / Field (Uttarakhand)</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase text-muted-foreground tracking-widest font-semibold">Eligibility</p>
                <p className="font-bold text-foreground">Students & Grads</p>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form & Contact Info */}
        <section id="apply-form" className="py-20 container mx-auto px-6">
          <AIFloatingIcons count={4} className="opacity-15" />
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start relative z-10">
            {/* Left side Form Card */}
            <Card className="relative overflow-hidden rounded-4xl border-2 border-border bg-background/95 p-8 md:p-10 shadow-2xl transition-all duration-500 hover:border-primary/30">
              <div className="relative z-10 space-y-8">
                <div className="space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Participation Form</span>
                  <h2 className="text-3xl font-bold">Apply for Internship</h2>
                  <p className="text-muted-foreground text-sm">
                    Fill out the form below. Our joint selection committee will review all applications and schedule interviews with shortlisted candidates.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="hover:border-primary/50 focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone / WhatsApp *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="college">College / Organization *</Label>
                      <Input
                        id="college"
                        name="college"
                        value={formData.college}
                        onChange={handleChange}
                        required
                        placeholder="e.g., YMCA University"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Preferred Track *</Label>
                      <Select
                        value={formData.track}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, track: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a track" />
                        </SelectTrigger>
                        <SelectContent>
                          {TRACKS.map((t) => (
                            <SelectItem key={t.id} value={t.id}>
                              {t.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="resumeLink">Resume Link (optional)</Label>
                    <Input
                      id="resumeLink"
                      name="resumeLink"
                      value={formData.resumeLink}
                      onChange={handleChange}
                      placeholder="Google Drive, Dropbox, or LinkedIn Profile URL"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="statementOfPurpose">Statement of Purpose *</Label>
                    <Textarea
                      id="statementOfPurpose"
                      name="statementOfPurpose"
                      value={formData.statementOfPurpose}
                      onChange={handleChange}
                      required
                      placeholder="Why do you want to join this program, and how does your background align with the track you selected?"
                      rows={5}
                    />
                  </div>

                  <div className="flex justify-center py-2">
                    {siteKey ? (
                      <Suspense fallback={<div className="h-[78px] w-[304px] rounded border border-border animate-pulse bg-muted" />}>
                        <LazyReCAPTCHA
                          ref={(instance: any) => {
                            recaptchaRef.current = instance;
                          }}
                          sitekey={siteKey}
                          onChange={(token: string | null) => setRecaptchaToken(token)}
                          onExpired={() => setRecaptchaToken(null)}
                        />
                      </Suspense>
                    ) : (
                      <p className="text-sm text-destructive">
                        reCAPTCHA sitekey missing.
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full gradient-primary text-white text-base font-semibold hover:shadow-xl"
                    disabled={isSubmitting || !recaptchaToken}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                    <Send className={`ml-2 ${isSubmitting ? "animate-pulse" : ""}`} size={16} />
                  </Button>
                </form>
              </div>
            </Card>

            {/* Right side Info Column */}
            <div className="space-y-8">
              <div className="relative overflow-hidden rounded-4xl border border-border bg-secondary/20 p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-emerald-500/10 opacity-70" aria-hidden="true" />
                <div className="relative z-10 space-y-6">
                  <h3 className="text-2xl font-bold">Frequently Asked Questions</h3>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-primary flex-shrink-0" /> Is this a paid internship?
                      </h4>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                        This is a voluntary social internship program. Funding/stipends may be provided for specific tracks that require field accommodation or extended operations in Uttarakhand.
                      </p>
                    </div>

                    <div className="space-y-2 border-t border-border/80 pt-4">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-primary flex-shrink-0" /> What is the selection process?
                      </h4>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                        shortlisted applicants will go through a brief technical review or discussion to match their skills and interest with current field projects of MDJKS and tech stack of Nirikshan AI.
                      </p>
                    </div>

                    <div className="space-y-2 border-t border-border/80 pt-4">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-primary flex-shrink-0" /> Who can apply?
                      </h4>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                        Any student currently enrolled in an undergraduate or postgraduate program, or recent graduates who are eager to work on real-world impact projects.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Contact Card */}
              <div className="rounded-3xl border border-border bg-card p-6 space-y-4">
                <h4 className="font-bold text-lg">Have Questions? Contact the Committee</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  For further inquiries regarding details, tracks, or requirements, get in touch directly:
                </p>
                <div className="space-y-2 text-xs md:text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-primary" />
                    <a href="mailto:info@nirikshanai.com" className="hover:text-primary transition-colors">info@nirikshanai.com</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-primary" />
                    <a href="tel:+919410992204" className="hover:text-primary transition-colors">+91 9410 992204</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SocialInternship;
