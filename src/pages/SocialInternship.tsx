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
import { supabase } from "@/integrations/supabase/client";

import impact1 from "@/assets/images/WhatsApp Image 2026-04-09 at 9.27.36 PM (3).jpeg";
import impact2 from "@/assets/images/WhatsApp Image 2026-04-09 at 9.27.42 PM (2).jpeg";
import impact3 from "@/assets/images/WhatsApp Image 2026-04-09 at 9.27.50 PM.jpeg";
import impact4 from "@/assets/images/WhatsApp Image 2026-04-09 at 9.28.30 PM (1).jpeg";
import impact5 from "@/assets/images/WhatsApp Image 2026-04-09 at 9.28.30 PM.jpeg";
import impact6 from "@/assets/images/WhatsApp Image 2026-04-09 at 9.28.50 PM (1).jpeg";
import impact7 from "@/assets/images/WhatsApp Image 2026-04-09 at 9.28.50 PM (2).jpeg";
import impact8 from "@/assets/images/WhatsApp Image 2026-04-09 at 9.28.51 PM.jpeg";

const GALLERY_IMAGES = [
  { src: impact1, title: "Rural Field Engagement", category: "Field Operations", alt: "Nirikshan AI and MDJKS community outreach in Uttarakhand" },
  { src: impact2, title: "Water Conservation Operations", category: "Groundwork", alt: "Water harvesting initiatives in mountain villages" },
  { src: impact3, title: "Natural Farming Workshops", category: "Agriculture", alt: "Training local farmers on sustainable organic farming" },
  { src: impact4, title: "Self-Help Groups Training", category: "Empowerment", alt: "Women self-help group skill building session" },
  { src: impact5, title: "Digital Literacy Drive", category: "Education", alt: "Teaching basic computer skills to children and youth" },
  { src: impact6, title: "Sustainable Livelihoods", category: "Social Impact", alt: "Deploying local community building projects" },
  { src: impact7, title: "Technology Deployment", category: "Tech For Good", alt: "Demonstrating agricultural AI tools on the field" },
  { src: impact8, title: "Community Interactive Forums", category: "Collaborations", alt: "Village meetings discussing local water challenges" }
];


// Lazy-loaded ReCAPTCHA
const LazyReCAPTCHA = lazy(() =>
  import("react-google-recaptcha").then((mod) => ({
    default: mod.default || mod,
  })).catch(() => ({
    default: (() => null) as any,
  }))
) as any;

const TRACKS = [
  {
    id: "tech-for-good",
    title: "Tech for Good (AI & Software)",
    description: "Develop software solutions, mobile apps, and machine learning pipelines designed to solve grassroots rural challenges. Work on projects like Manorma Krishi Rakshak.",
    icon: Rocket,
    color: "text-emerald-600 bg-emerald-500/10 dark:text-emerald-400 dark:bg-emerald-500/20"
  },
  {
    id: "rural-operations",
    title: "Community & Rural Operations",
    description: "Work directly on the ground in Uttarakhand alongside MDJKS NGO. Assist in implementing natural farming initiatives, mountain water harvesting, and women self-help programs.",
    icon: Heart,
    color: "text-green-600 bg-green-500/10 dark:text-green-400 dark:bg-green-500/20"
  },
  {
    id: "digital-literacy",
    title: "Digital Literacy & Education",
    description: "Empower rural youth and women by designing and delivering basic digital literacy workshops, computer training, and professional skill-building initiatives.",
    icon: BookOpen,
    color: "text-teal-600 bg-teal-500/10 dark:text-teal-400 dark:bg-teal-500/20"
  }
];

const PROGRAM_HIGHLIGHTS = [
  { title: "Academic Internship Credits", desc: "Receive a formal internship completion certificate co-signed by Nirikshan AI and MDJKS NGO to satisfy college curriculum requirements.", icon: Award },
  { title: "Expert Student Mentorship", desc: "Get hands-on guidance from industry mentors, software engineers, and community leaders who understand student project goals.", icon: Sparkles },
  { title: "Real-World Student Portfolio", desc: "Develop and deploy live software or manage real social programs that you can showcase in your professional portfolio and resume.", icon: ShieldCheck }
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

    try {
      // 1. Save social internship application to database
      const { error: dbError } = await supabase
        .from("social_internship_applications")
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          college: formData.college,
          track: formData.track,
          resume_link: formData.resumeLink || null,
          statement_of_purpose: formData.statementOfPurpose
        });

      if (dbError) {
        console.error("Database submission failed:", dbError);
        throw new Error(dbError.message || "Failed to save application to database");
      }

      // 2. Fire-and-forget submission to Google Script endpoint (existing integration)
      const payload = {
        ...formData,
        submissionType: "internship-application",
        recaptchaToken
      };

      try {
        fetch(GOOGLE_SCRIPT_ENDPOINT, {
          method: "POST",
          body: JSON.stringify(payload)
        }).catch((err) => console.warn("Google Script background post warning:", err));
      } catch (scriptErr) {
        console.warn("Google Script fetch warning:", scriptErr);
      }

      toast.success("Application submitted successfully! Our committee will review it and get in touch.");
      setFormData({ ...FORM_INITIAL_STATE });
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    } catch (error) {
      console.error("Internship form submission failed", error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : "Something went wrong. Please try again or email us directly at info@nirikshanai.com."
      );
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
        title="Social & Tech Student Internship Program — Nirikshan AI & MDJKS"
        description="Apply for the joint Social & Technology Student Internship Program by Nirikshan AI and MDJKS NGO. Bridge AI technology with community development in Uttarakhand."
        canonical="https://nirikshanai.com/social-internship"
      />
      <Navigation />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 md:py-32 bg-secondary/10">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/15 via-background to-green-500/5 animate-pulse-slow" aria-hidden="true" />
          <AICircuitLines className="opacity-25" />
          <HeroParticles />
          <FloatingElements count={8} />

          <div className="relative container mx-auto px-6 max-w-5xl text-center space-y-8">
            <Badge className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 px-3 py-1 text-xs md:text-sm">
              <Sparkles size={14} /> Joint Initiative: Technology & Social Impact
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Social & Technology <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-500 dark:from-emerald-400 dark:to-green-400 font-bold">Student Internship 2026</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Launched collaboratively by **Nirikshan AI** and **MDJKS NGO**, this program offers college and university students a unique pathway to build and deploy digital systems, conduct ground-level social fieldwork, and empower rural communities in Uttarakhand. Perfect for students looking for real-world projects, academic internship credits, and community impact.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white border-none shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all duration-300" asChild>
                <a href="#apply-form">
                  Apply Now
                  <ArrowUpRight size={18} />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/10" asChild>
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
              Select the area that matches your academic goals and interests. Bring your energy to make a measurable difference.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TRACKS.map((track) => {
              const Icon = track.icon;
              return (
                <div
                  key={track.id}
                  className="group relative p-8 rounded-3xl border border-emerald-500/20 bg-card hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 flex flex-col justify-between shadow-md"
                >
                  <div className="space-y-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${track.color}`}>
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold">{track.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{track.description}</p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-border/60">
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Applications Open</span>
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
                  <div key={idx} className="flex gap-4 items-start bg-card/85 p-6 rounded-2xl border border-emerald-500/10 hover:border-emerald-500/20 transition-colors duration-300">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
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
            <div className="mt-12 p-6 rounded-3xl border border-dashed border-emerald-500/40 bg-emerald-500/5 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-1">
                <p className="text-xs uppercase text-emerald-600 dark:text-emerald-400 tracking-widest font-semibold">Duration</p>
                <p className="font-bold text-foreground">6 - 8 Weeks (Flexible for Students)</p>
              </div>
              <div className="space-y-1 border-t md:border-t-0 md:border-x border-emerald-500/20 py-4 md:py-0">
                <p className="text-xs uppercase text-emerald-600 dark:text-emerald-400 tracking-widest font-semibold">Location</p>
                <p className="font-bold text-foreground">Remote / Field (Uttarakhand)</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase text-emerald-600 dark:text-emerald-400 tracking-widest font-semibold">Eligibility</p>
                <p className="font-bold text-foreground">College Students & Fresh Graduates</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Work / Social Impact Gallery Section */}
        <section className="py-20 bg-secondary/5 border-y border-emerald-500/10">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16 space-y-4">
              <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 px-3 py-1 text-xs md:text-sm">
                Impact on the Ground
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">Our Social Work & Impact in Action</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A glimpse into our ground fieldwork, organic farming initiatives, mountain water conservation projects, and digital literacy camps across rural Uttarakhand.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {GALLERY_IMAGES.map((img, idx) => (
                <div 
                  key={idx} 
                  className="group relative overflow-hidden rounded-3xl border border-emerald-500/10 bg-card hover:border-emerald-500/30 transition-all duration-500 shadow-md aspect-[4/3]"
                >
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-xs uppercase text-emerald-300 tracking-wider font-semibold">{img.category}</span>
                    <h4 className="text-white font-bold text-base mt-1 leading-tight">{img.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form & Contact Info */}
        <section id="apply-form" className="py-20 container mx-auto px-6">
          <AIFloatingIcons count={4} className="opacity-15" />
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start relative z-10">
            {/* Left side Form Card */}
            <Card className="relative overflow-hidden rounded-4xl border-2 border-emerald-500/20 bg-background/95 p-8 md:p-10 shadow-2xl transition-all duration-500 hover:border-emerald-500/40">
              <div className="relative z-10 space-y-8">
                <div className="space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400">Student Application Form</span>
                  <h2 className="text-3xl font-bold">Apply for Student Internship</h2>
                  <p className="text-muted-foreground text-sm">
                    Fill out the student-friendly form below. Our selection committee will review all applications and contact candidates for online interviews.
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
                      className="hover:border-emerald-500/50 focus-visible:ring-emerald-500"
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
                        placeholder="you@college.edu"
                        className="hover:border-emerald-500/50 focus-visible:ring-emerald-500"
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
                        className="hover:border-emerald-500/50 focus-visible:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="college">College / University / School *</Label>
                      <Input
                        id="college"
                        name="college"
                        value={formData.college}
                        onChange={handleChange}
                        required
                        placeholder="e.g., DBUU"
                        className="hover:border-emerald-500/50 focus-visible:ring-emerald-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Preferred Internship Track *</Label>
                      <Select
                        value={formData.track}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, track: value }))}
                      >
                        <SelectTrigger className="hover:border-emerald-500/50 focus:ring-emerald-500">
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
                    <Label htmlFor="resumeLink">Resume / LinkedIn Profile / Portfolio Link (optional)</Label>
                    <Input
                      id="resumeLink"
                      name="resumeLink"
                      value={formData.resumeLink}
                      onChange={handleChange}
                      placeholder="Google Drive, Dropbox, or GitHub / LinkedIn URL"
                      className="hover:border-emerald-500/50 focus-visible:ring-emerald-500"
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
                      placeholder="Why do you want to join this student program, and how does your studies/skills align with the track you selected?"
                      rows={5}
                      className="hover:border-emerald-500/50 focus-visible:ring-emerald-500"
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
                    className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white text-base font-semibold hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-300"
                    disabled={isSubmitting || !recaptchaToken}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Student Application"}
                    <Send className={`ml-2 ${isSubmitting ? "animate-pulse" : ""}`} size={16} />
                  </Button>
                </form>
              </div>
            </Card>

            {/* Right side Info Column */}
            <div className="space-y-8">
              <div className="relative overflow-hidden rounded-4xl border border-emerald-500/10 bg-emerald-500/5 p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-green-500/10 opacity-70" aria-hidden="true" />
                <div className="relative z-10 space-y-6">
                  <h3 className="text-2xl font-bold">Frequently Asked Questions</h3>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" /> Is this internship open to students?
                      </h4>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                        Yes! This program is specifically designed to be student-centric. We provide remote work options and flexible timelines to help you balance the internship with your university exams and lectures.
                      </p>
                    </div>

                    <div className="space-y-2 border-t border-emerald-500/10 pt-4">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" /> Can I get college credits for this?
                      </h4>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                        Yes. We provide completion certificates, letter of recommendation (for outstanding performers), and will coordinate with your college or university department to complete any required evaluation paperwork.
                      </p>
                    </div>

                    <div className="space-y-2 border-t border-emerald-500/10 pt-4">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" /> What is the selection process?
                      </h4>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                        Shortlisted students will participate in a brief interview to match their academic skills, interests, and availability with current rural projects.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Contact Card */}
              <div className="rounded-3xl border border-emerald-500/10 bg-card p-6 space-y-4">
                <h4 className="font-bold text-lg">Have Questions? Contact the Committee</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  For student inquiries regarding project details, university credits, or internship tracks:
                </p>
                <div className="space-y-2 text-xs md:text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-emerald-600 dark:text-emerald-400" />
                    <a href="mailto:info@nirikshanai.com" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">info@nirikshanai.com</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-emerald-600 dark:text-emerald-400" />
                    <a href="tel:+919410992204" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">+91 9410 992204</a>
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
