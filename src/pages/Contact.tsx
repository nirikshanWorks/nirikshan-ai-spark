import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlarmClock,
  ArrowUpRight,
  CalendarCheck,
  GraduationCap,
  Handshake,
  Mail,
  MapPin,
  Mic2,
  Phone,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";

const COUNTRIES = [
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Singapore",
  "United Arab Emirates",
  "Germany",
  "France",
  "Saudi Arabia",
  "Other",
];

const CONTACT_STATS = [
  {
    label: "Average response time",
    value: "Under 12 hours",
    icon: AlarmClock
  },
  {
    label: "AI initiatives launched",
    value: "45+ projects",
    icon: Rocket
  },
  {
    label: "Secure collaborations",
    value: "NDA ready",
    icon: ShieldCheck
  }
];

const ENGAGEMENT_OPTIONS = [
  {
    value: "project-consultation",
    title: "AI Project Consultation",
    description: "Validate your idea and scope an actionable delivery roadmap with our solution architects.",
    icon: Rocket
  },
  {
    value: "innovation-partnership",
    title: "Innovation Partnership",
    description: "Co-build long-term platforms and accelerators alongside our research and engineering squads.",
    icon: Handshake
  },
  {
    value: "team-enablement",
    title: "Team Enablement",
    description: "Upskill product, data, and leadership teams with bespoke learning sprints and playbooks.",
    icon: GraduationCap
  }
];

const BUDGET_OPTIONS = [
  "Exploring ideas",
  "Under $25K",
  "$25K - $75K",
  "$75K - $150K",
  "$150K+"
];

const TIMELINE_OPTIONS = [
  "Getting started immediately",
  "Within 1-3 months",
  "Within 6 months",
  "Researching for later"
];

const GOOGLE_SCRIPT_ENDPOINT = "https://script.google.com/macros/s/AKfycbz9aETn0lKNsIPSB4sMw7UYO4Zr2D-V8vykNHC6G-oSxm2ATB1Ba3pezaHdT09fYsg/exec";
const FALLBACK_RECAPTCHA_SITE_KEY = "6Lc1Ee8rAAAAAMDv9xtvK72UdB1JORiBAJXVyIek";

const CONNECT_OPTIONS = [
  {
    value: "discovery",
    label: "Discovery Call",
    description: "Share your challenge with our AI leads in a focused 30-minute session to outline the right next steps together.",
    bullets: ["Understand feasibility in plain language", "Map stakeholders and success metrics", "Receive a follow-up summary pack"],
    actionLabel: "Book a Call",
    actionHref: "https://cal.com/nirikshan-ai",
    icon: CalendarCheck
  },
  {
    value: "workshop",
    label: "Strategy Workshop",
    description: "Run a half-day immersion where we unpack use-cases, data readiness, and lighthouse opportunities with your team.",
    bullets: ["Interactive whiteboarding session", "Prioritized AI opportunity canvas", "Implementation recommendations"],
    actionLabel: "Plan a Workshop",
    actionHref: "https://cal.com/nirikshan-ai",
    icon: Sparkles
  },
  {
    value: "media",
    label: "Media & Speaking",
    description: "Invite our founders for keynotes, podcasts, or thought leadership collaborations around responsible AI innovation.",
    bullets: ["Insights on applied AI and ethics", "Stories from live deployments", "Tailored narrative for your audience"],
    actionLabel: "Request Availability",
    actionHref: "mailto:ai.nirikshan@gmail.com",
    icon: Mic2
  }
];

const FAQ_ITEMS = [
  {
    question: "How quickly can we engage after submitting the form?",
    answer:
      "We reply within 12 business hours. For high-priority engagements we can schedule a discovery call within two working days."
  },
  {
    question: "Do you sign NDAs before discussing project specifics?",
    answer:
      "Absolutely. Toggle the NDA switch in the form and our team will email a mutual NDA for review before any sensitive details are shared."
  },
  {
    question: "Which industries do you support?",
    answer:
      "We partner with teams building AI solutions in finance, healthcare, retail, logistics, climate, and public services, while remaining industry-agnostic for impact-driven work."
  }
];

const FORM_INITIAL_STATE = {
  name: "",
  email: "",
  company: "",
  phone: "",
  country: "",
  city: "",
  message: "",
  engagementType: "project-consultation",
  budgetRange: "",
  projectTimeline: "",
  successCriteria: "",
  ndaRequired: false
};

const Contact = () => {
  const [formData, setFormData] = useState(() => ({ ...FORM_INITIAL_STATE }));

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || FALLBACK_RECAPTCHA_SITE_KEY;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!siteKey) {
      toast.error("reCAPTCHA is not configured. Please contact the site administrator.");
      return;
    }
    if (!formData.country) {
      toast.error("Please select your country.");
      return;
    }
    if (!formData.city.trim()) {
      toast.error("Please share your city.");
      return;
    }
    if (!recaptchaToken) {
      toast.error("Please verify you are human before submitting.");
      return;
    }
    setIsSubmitting(true);

    const payload = {
      ...formData,
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
          submissionOk = true; // CORS prevented inspection, assume success when request resolves.
        } else {
          const rawText = await response.text();
          let result: { success?: boolean; error?: string } = {};
          try {
            result = rawText ? (JSON.parse(rawText) as typeof result) : {};
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

      console.info("Contact form submission payload", payload);
      toast.success("Thank you for your message! We'll get back to you soon.");
      setFormData({ ...FORM_INITIAL_STATE });
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    } catch (error) {
      console.error("Contact form submission failed", error);
      toast.error(
        error instanceof Error && error.message
          ? error.message
          : "Something went wrong. Please try again or reach us directly at ai.nirikshan@gmail.com."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950" aria-hidden="true" />
          <div className="absolute -top-40 right-[-10%] h-[420px] w-[420px] rounded-full bg-primary/20 blur-3xl opacity-70" aria-hidden="true" />
          <div className="absolute bottom-[-20%] left-[-10%] h-[360px] w-[360px] rounded-full bg-sky-500/20 blur-3xl opacity-70" aria-hidden="true" />
          <div className="relative container mx-auto px-6">
            <div className="mx-auto max-w-4xl text-center space-y-8">
              <Badge className="inline-flex items-center gap-2 bg-white/10 text-white">
                <Sparkles size={16} /> Partner with our research studio
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Let's design the next intelligent breakthrough together.
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Tell us about your vision and we will bring our applied AI experts, product strategists, and engineering teams to accelerate it safely.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="gradient-primary shadow-lg shadow-indigo-500/30" asChild>
                  <a href="#contact-form">
                    Start a project
                    <ArrowUpRight size={18} />
                  </a>
                </Button>
                <Button size="lg" variant="secondary" className="bg-white/10 text-white hover:bg-white/20" asChild>
                  <a href="https://wa.me/919410992204" target="_blank" rel="noopener noreferrer">
                    WhatsApp our team
                    <ArrowUpRight size={18} />
                  </a>
                </Button>
              </div>
            </div>
            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {CONTACT_STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-8 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-white/30"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-primary/10 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" aria-hidden="true" />
                    <div className="relative z-10 space-y-3">
                      <div className="flex items-center gap-3 text-white/80">
                        <Icon size={22} />
                        <span className="text-sm uppercase tracking-[0.2em]">{stat.label}</span>
                      </div>
                      <p className="text-2xl font-semibold text-white">{stat.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section id="contact-form" className="py-20 container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
            {/* Contact Form */}
            <Card className="relative z-20 overflow-hidden rounded-4xl border-2 border-border/60 bg-background/95 p-10 shadow-xl shadow-primary/5 transition-all duration-500 hover:border-primary/40">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/10 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100" aria-hidden="true" />
              <div className="relative z-10">
                <div className="flex flex-col gap-3 mb-10">
                  <span className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Tell us about your needs</span>
                  <h2 className="text-3xl md:text-4xl font-bold">Send us a Message</h2>
                  <p className="text-muted-foreground">
                    Share the essentials and our team will respond with next steps, resources, and a proposed collaboration approach.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-4">
                    <Label className="text-sm font-semibold text-muted-foreground">How would you like to collaborate?</Label>
                    <ToggleGroup
                      type="single"
                      value={formData.engagementType}
                      onValueChange={(value) => value && setFormData((prev) => ({ ...prev, engagementType: value }))}
                      className="grid gap-3 md:grid-cols-3"
                    >
                      {ENGAGEMENT_OPTIONS.map((option) => {
                        const Icon = option.icon;
                        return (
                          <ToggleGroupItem
                            key={option.value}
                            value={option.value}
                            className="flex h-full flex-col items-start gap-3 rounded-3xl border border-border bg-background/90 p-4 text-left transition-all duration-300 hover:border-primary/50 data-[state=on]:border-primary data-[state=on]:bg-primary/10 data-[state=on]:shadow-lg"
                            type="button"
                            aria-label={option.title}
                          >
                            <span className="flex items-center gap-3 text-sm font-semibold text-primary">
                              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <Icon size={20} />
                              </span>
                              {option.title}
                            </span>
                            <span className="text-xs text-muted-foreground leading-relaxed">{option.description}</span>
                          </ToggleGroupItem>
                        );
                      })}
                    </ToggleGroup>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className="transition-all focus:ring-2 focus:ring-primary hover:border-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@company.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your company name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 9410 992204"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Country *</Label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, country: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent>
                          {COUNTRIES.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Bengaluru"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Budget Range (optional)</Label>
                      <Select
                        value={formData.budgetRange}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, budgetRange: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a range" />
                        </SelectTrigger>
                        <SelectContent>
                          {BUDGET_OPTIONS.map((budget) => (
                            <SelectItem key={budget} value={budget}>
                              {budget}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Project Timeline (optional)</Label>
                      <Select
                        value={formData.projectTimeline}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, projectTimeline: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="When would you like to start?" />
                        </SelectTrigger>
                        <SelectContent>
                          {TIMELINE_OPTIONS.map((timeline) => (
                            <SelectItem key={timeline} value={timeline}>
                              {timeline}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us about your project, problem statement, or the opportunity you are exploring."
                      rows={5}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="successCriteria">What does success look like? (optional)</Label>
                    <Textarea
                      id="successCriteria"
                      name="successCriteria"
                      value={formData.successCriteria}
                      onChange={handleChange}
                      placeholder="Share KPIs, impact metrics, or experiences you want your stakeholders to have."
                      rows={4}
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-3xl border border-dashed border-primary/40 bg-primary/5 px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold">Need a mutual NDA?</p>
                      <p className="text-xs text-muted-foreground">We are happy to sign one before diving into sensitive details.</p>
                    </div>
                    <Switch
                      checked={formData.ndaRequired}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, ndaRequired: checked }))}
                      aria-label="Toggle NDA request"
                    />
                  </div>

                  <div className="flex justify-center">
                    {siteKey ? (
                      <ReCAPTCHA
                        ref={(instance) => {
                          recaptchaRef.current = instance;
                        }}
                        sitekey={siteKey}
                        onChange={(token) => setRecaptchaToken(token)}
                        onExpired={() => setRecaptchaToken(null)}
                      />
                    ) : (
                      <p className="text-sm text-destructive">
                        reCAPTCHA key missing. Add VITE_RECAPTCHA_SITE_KEY to your environment.
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full gradient-primary text-white text-lg font-semibold hover:shadow-2xl"
                    disabled={isSubmitting || !recaptchaToken}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className={`ml-2 ${isSubmitting ? "animate-pulse" : "transition-transform group-hover:translate-x-1"}`} size={18} />
                  </Button>
                </form>
              </div>
            </Card>

            {/* Contact Information */}
            <div className="relative z-10 space-y-8 lg:mt-0 mt-14">
              <div className="relative overflow-hidden rounded-4xl border border-border bg-secondary/20 p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-70" aria-hidden="true" />
                <div className="relative z-10 space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold">Contact Information</h2>
                    <p className="text-muted-foreground">
                      Reach out directly or choose the collaboration flow that fits you best. We respond faster than email threads.
                    </p>
                  </div>

                  <Tabs defaultValue="discovery" className="space-y-6">
                    <TabsList className="w-full !flex flex-col items-stretch justify-start gap-3 bg-background/40 p-1 text-foreground !h-auto md:flex-row md:flex-nowrap md:items-center md:justify-between">
                      {CONNECT_OPTIONS.map((option) => (
                        <TabsTrigger
                          key={option.value}
                          value={option.value}
                          className="flex w-full items-start justify-start gap-2 rounded-2xl !h-auto min-h-[3.25rem] whitespace-normal px-4 py-3 text-left text-sm font-semibold leading-snug md:flex-1 md:items-center md:justify-center"
                        >
                          {option.label}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {CONNECT_OPTIONS.map((option) => {
                      const Icon = option.icon;
                      return (
                        <TabsContent
                          key={option.value}
                          value={option.value}
                          className="rounded-3xl border border-border bg-background/80 p-6 shadow-sm"
                        >
                          <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3 text-primary">
                              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
                                <Icon size={20} />
                              </span>
                              <h3 className="text-lg font-semibold">{option.label}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">{option.description}</p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                              {option.bullets.map((bullet) => (
                                <li key={bullet} className="flex items-start gap-2">
                                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                            <Button variant="secondary" className="w-full md:w-auto" asChild>
                              <a href={option.actionHref} target={option.actionHref.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                                {option.actionLabel}
                                <ArrowUpRight size={16} />
                              </a>
                            </Button>
                          </div>
                        </TabsContent>
                      );
                    })}
                  </Tabs>

                  <div className="grid gap-4">
                    <div className="group flex items-start gap-4 rounded-2xl border border-border/60 bg-background/90 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary">
                      <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
                        <Mail size={20} />
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold">Email</h3>
                        <a
                          href="mailto:ai.nirikshan@gmail.com"
                          className="text-sm text-muted-foreground transition-colors hover:text-primary"
                        >
                          ai.nirikshan@gmail.com
                        </a>
                      </div>
                    </div>
                    <div className="group flex items-start gap-4 rounded-2xl border border-border/60 bg-background/90 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary">
                      <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
                        <Phone size={20} />
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold">Phone</h3>
                        <a
                          href="tel:+919410992204"
                          className="block text-sm text-muted-foreground transition-colors hover:text-primary"
                        >
                          +91 9410 992204
                        </a>
                        <p className="text-xs text-muted-foreground mt-1">Mon-Fri, 9AM-6PM IST</p>
                      </div>
                    </div>
                    <div className="group flex items-start gap-4 rounded-2xl border border-border/60 bg-background/90 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary">
                      <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
                        <MapPin size={20} />
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold">Office</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Nirikshan AI Pvt. Ltd.
                          <br /> Noida, Uttar Pradesh, India
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="rounded-3xl border-2 border-border/60 bg-background/90 p-8 transition-colors duration-300 hover:border-primary/40">
                <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span>10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </Card>

              <Card className="rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/20 p-8 text-sm leading-relaxed">
                <h3 className="text-lg font-semibold mb-3">Looking for Support?</h3>
                <p className="text-muted-foreground">
                  Existing clients can reach our support team at
                  {" "}
                  <a
                    href="mailto:ai.nirikshan@gmail.com"
                    className="font-semibold text-primary transition-colors hover:text-primary/80"
                  >
                    ai.nirikshan@gmail.com
                  </a>
                  {" "}
                  for technical assistance and urgent requests.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-secondary/20 py-20">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-5xl rounded-4xl border border-border bg-background/90 p-10 shadow-xl shadow-primary/5">
              <div className="grid gap-10 md:grid-cols-[1.1fr,0.9fr]">
                <div className="space-y-6">
                  <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Questions</span>
                  <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked</h2>
                  <p className="text-muted-foreground">
                    Here are a few things founders, innovation leads, and CTOs often ask before we kick off a collaboration.
                    If you need anything else, write to us and we will clarify right away.
                  </p>
                </div>
                <Accordion type="single" collapsible className="space-y-4">
                  {FAQ_ITEMS.map((item, index) => (
                    <AccordionItem key={item.question} value={`item-${index}`} className="overflow-hidden rounded-2xl border border-border bg-background/80 px-4">
                      <AccordionTrigger className="text-left text-sm font-semibold">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
