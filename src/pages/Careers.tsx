import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BellRing, Trophy, Laptop2, Sparkles, CalendarHeart, PlaneTakeoff, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const benefits = [
  {
    title: "Competitive Salary",
    description: "Industry-aligned compensation with performance-linked rewards.",
    Icon: Trophy,
    accent: "from-amber-500/20 via-orange-500/10 to-yellow-500/20"
  },
  {
    title: "Flexible Work",
    description: "Design your schedule around impact, collaboration, and personal balance.",
    Icon: Users,
    accent: "from-sky-500/20 via-cyan-500/10 to-blue-500/20"
  },
  {
    title: "Learning Funds",
    description: "Annual budget for courses, certifications, and conference travel.",
    Icon: Sparkles,
    accent: "from-violet-500/20 via-purple-500/10 to-indigo-500/20"
  },
  {
    title: "Latest Gear",
    description: "High-performance devices and tooling so you can build without friction.",
    Icon: Laptop2,
    accent: "from-emerald-500/20 via-teal-500/10 to-green-500/20"
  },
  {
    title: "Team Retreats",
    description: "Annual IRL offsites to align on vision, celebrate wins, and reset together.",
    Icon: PlaneTakeoff,
    accent: "from-rose-500/20 via-pink-500/10 to-red-500/20"
  },
  {
    title: "Wellness Days",
    description: "Dedicated days to unplug, recharge, and sustain long-term creativity.",
    Icon: CalendarHeart,
    accent: "from-lime-500/20 via-green-500/10 to-emerald-500/20"
  }
];

const Careers = () => {
  const [interestForm, setInterestForm] = useState({
    fullName: "",
    email: "",
    roleInterest: "",
    experience: "",
    attachment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  const handleInterestChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInterestForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!siteKey) {
      toast.error("reCAPTCHA is not configured. Please contact the site administrator.");
      return;
    }
    if (!recaptchaToken) {
      toast.error("Please verify you are human before submitting.");
      return;
    }
    setIsSubmitting(true);

    // TODO: Replace this placeholder with an API call that sends interestForm and recaptchaToken to your server for verification.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Thanks for sharing your interest! We'll be in touch when a matching role opens.");
    setInterestForm({ fullName: "", email: "", roleInterest: "", experience: "", attachment: "" });
    recaptchaRef.current?.reset();
    setRecaptchaToken(null);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Join Our Team</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Build the future of AI-powered business solutions with passionate engineers, designers, 
              and innovators from around the world.
            </p>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="py-20 container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Nirikshan AI Pvt. Ltd.?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're building something special, and we want you to be part of it
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3">Impactful Work</h3>
              <p className="text-muted-foreground">
                Work on projects that make a real difference. Our solutions impact millions of 
                users and transform entire industries.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3">Growth & Learning</h3>
              <p className="text-muted-foreground">
                Continuous learning opportunities, mentorship from experts, and access to cutting-edge 
                technologies and training resources.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3">Great Culture</h3>
              <p className="text-muted-foreground">
                Collaborative, inclusive environment where your ideas matter. We celebrate diversity 
                and value every team member's perspective.
              </p>
            </Card>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Open Positions</h2>
              <p className="text-lg text-muted-foreground">
                We don&apos;t have open roles right now—stay tuned for future opportunities.
              </p>
            </div>
            <Card className="max-w-3xl mx-auto p-8 text-center bg-background/80 backdrop-blur border-dashed border-2 border-border">
              <div className="flex flex-col items-center gap-4">
                <BellRing className="text-indigo-500" size={40} />
                <h3 className="text-2xl font-semibold">No openings at the moment</h3>
                <p className="text-muted-foreground max-w-xl">
                  We&apos;re not hiring right now, but new opportunities are on the horizon. Keep an eye on this page for updates or share your interests below—our team will reach out when a role matches your profile.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Talent Pool Form */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto bg-background/90 backdrop-blur rounded-3xl border border-border shadow-sm p-8 md:p-12">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Share Your Interest</h2>
                <p className="text-muted-foreground">
                  Tell us about yourself and the work you&apos;re passionate about. We&apos;ll keep your profile handy for future openings.
                </p>
              </div>
              <form className="grid gap-6" onSubmit={handleInterestSubmit}>
                <div className="grid gap-2">
                  <label htmlFor="fullName" className="text-sm font-medium">Full Name</label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Jane Doe"
                    required
                    value={interestForm.fullName}
                    onChange={handleInterestChange}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={interestForm.email}
                    onChange={handleInterestChange}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="roleInterest" className="text-sm font-medium">Role of Interest</label>
                  <Input
                    id="roleInterest"
                    name="roleInterest"
                    placeholder="e.g., AI Researcher, Product Manager"
                    value={interestForm.roleInterest}
                    onChange={handleInterestChange}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="experience" className="text-sm font-medium">Brief Introduction</label>
                  <Textarea
                    id="experience"
                    name="experience"
                    rows={4}
                    placeholder="Share your experience, interests, or portfolio links"
                    value={interestForm.experience}
                    onChange={handleInterestChange}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="attachment" className="text-sm font-medium">Portfolio or Resume Link</label>
                  <Input
                    id="attachment"
                    name="attachment"
                    type="url"
                    placeholder="https://"
                    value={interestForm.attachment}
                    onChange={handleInterestChange}
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
                    <p className="text-sm text-destructive">reCAPTCHA key missing. Add VITE_RECAPTCHA_SITE_KEY to your environment.</p>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <p className="text-sm text-muted-foreground">
                    By submitting, you consent to us storing your information for future hiring updates.
                  </p>
                  <Button type="submit" className="gradient-primary" disabled={isSubmitting || !recaptchaToken}>
                    {isSubmitting ? "Submitting..." : "Notify Me"}
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Benefits & Perks</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We take care of our team
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <article
                key={benefit.title}
                className="group relative overflow-hidden rounded-3xl border border-border/70 bg-background/80 backdrop-blur p-6 transition-all duration-500 hover:-translate-y-1 hover:border-transparent hover:shadow-xl"
              >
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${benefit.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} aria-hidden="true" />
                <div className="relative flex flex-col gap-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-secondary/60 group-hover:bg-white/90 transition-colors">
                    <benefit.Icon className="text-primary" size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Don't See the Right Role?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals. Send us your resume and let's talk 
              about how you can contribute to our mission.
            </p>
            <Link to="/contact">
              <Button size="lg" className="gradient-primary">
                Get in Touch
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;
