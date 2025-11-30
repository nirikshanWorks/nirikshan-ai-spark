import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BellRing,
  Trophy,
  Laptop2,
  Sparkles,
  CalendarHeart,
  PlaneTakeoff,
  Users,
  Globe2,
  Brain,
  Target,
  Rocket,
  Handshake,
  ClipboardCheck,
  MessageCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const statsHighlights = [
  { label: "Team Members", value: "20+" },
  { label: "Countries Represented", value: "4" },
  { label: "Avg. Tenure", value: "3.1 yrs" }
];

const cultureHighlights = [
  {
    title: "Build Boldly",
    description: "Autonomy to experiment, paired with clear ownership and measurable outcomes.",
    Icon: Target,
  },
  {
    title: "Learn Relentlessly",
    description: "Weekly labs, pair sessions, and sponsored certifications keep us on the cutting edge.",
    Icon: Brain,
  },
  {
    title: "Stay Human",
    description: "Async-first collaboration, mindful meetings, and wellness breaks that respect your time.",
    Icon: Handshake,
  }
];

const whyReasons = [
  {
    title: "Impactful Work",
    description:
      "Ship AI products that millions touch—from predictive systems for manufacturing to intelligent assistants for telecoms.",
    Icon: Globe2,
    accent: "from-blue-500/15 via-indigo-500/10 to-purple-500/15",
  },
  {
    title: "Growth & Learning",
    description:
      "Pair with mentors, rotate across pods, and claim your personal development budget every quarter.",
    Icon: Sparkles,
    accent: "from-violet-500/15 via-purple-500/10 to-indigo-500/15",
  },
  {
    title: "Great Culture",
    description:
      "We’re people-first: inclusive ceremonies, transparent planning, and rituals that celebrate every win.",
    Icon: Users,
    accent: "from-emerald-500/15 via-teal-500/10 to-green-500/15",
  }
];

const hiringSteps = [
  {
    title: "Intro Conversation",
    description: "Share your story and learn how we work.",
    Icon: MessageCircle,
  },
  {
    title: "Deep-Dive Challenge",
    description: "Solve a real problem with guidance from our mentors.",
    Icon: ClipboardCheck,
  },
  {
    title: "Culture Connect",
    description: "Meet your future teammates and see if our values align.",
    Icon: Users,
  },
  {
    title: "Offer & Onboarding",
    description: "Collaborate on your growth plan and hit the ground running.",
    Icon: Rocket,
  }
];

const jobOpenings = [
  {
    code: "NAI-AI-INT-01",
    title: "AI Engineer",
    type: "Internship",
    location: "Remote / Work from Home",
    duration: "3–6 Months",
    stipend: "Performance-based",
    overview: "You'll work on real AI/ML projects — not dummy assignments. Expect hands-on tasks in Computer Vision, Generative AI, Agentic Systems, and Image/Video Recognition. If your fundamentals are weak or you can't learn fast, this role will expose that.",
    responsibilities: [
      "Build and optimize AI/ML models for production use",
      "Work with OpenCV for image/video processing",
      "Implement Generative AI pipelines (LLMs, diffusion models, transformers)",
      "Experiment with Agentic AI workflows",
      "Prepare datasets, train models, and test accuracy",
      "Assist senior engineers with deployments & documentation"
    ],
    required: [
      "Basic understanding of Python",
      "Familiarity with ML concepts (train/test, CNNs, embeddings)",
      "Curiosity to explore OpenCV, LLMs, and Computer Vision",
      "Ability to research and implement without spoon-feeding"
    ],
    goodToHave: [
      "Knowledge of TensorFlow / PyTorch",
      "Experience with GPU workflows",
      "Personal AI/ML projects"
    ]
  },
  {
    code: "NAI-SALES-INT-02",
    title: "Sales Executive",
    type: "Internship",
    location: "Remote / Work from Home",
    duration: "3–6 Months",
    stipend: "Incentive + Commission",
    overview: "You'll handle lead generation, client communication, and product pitching. If your English is weak or you hesitate in conversations, this role will expose that immediately. We need confident, proactive communicators.",
    responsibilities: [
      "Generate leads using online/offline channels",
      "Talk to prospects, understand needs, and pitch our solutions",
      "Maintain CRM records",
      "Assist in meetings, demos, and follow-ups",
      "Support sales campaigns with proper coordination"
    ],
    required: [
      "Strong English communication (spoken + written)",
      "Confidence in client handling",
      "Ability to learn product details quickly",
      "Team coordination mindset"
    ],
    goodToHave: [
      "Prior experience in sales calls or telemarketing",
      "Basic understanding of B2B/tech sales"
    ]
  },
  {
    code: "NAI-DM-INT-03",
    title: "Digital Marketing",
    type: "Internship",
    location: "Remote / Work from Home",
    duration: "3–6 Months",
    stipend: "Performance-based",
    overview: "This role demands creativity and execution. You'll manage social media, content creation, and branding activities. If you can't produce consistent outputs, the role won't suit you.",
    responsibilities: [
      "Manage Instagram, LinkedIn, and other platforms",
      "Create content (posts, reels, captions, scripts)",
      "Assist with branding, campaigns, and analytics",
      "Research competitors and trends",
      "Help grow the digital presence of Nirikshan AI"
    ],
    required: [
      "Basic content writing",
      "Understanding of how social media algorithms work",
      "Creativity + consistency",
      "Ability to execute independently"
    ],
    goodToHave: [
      "Experience with Canva / Photoshop",
      "Video editing basic skills",
      "Knowledge of SEO"
    ]
  }
];

const faqs = [
  {
    question: "Can I work remotely?",
    answer:
      "Yes. We operate hybrid pods across India, South Africa, and the Middle East. Choose remote, in-office, or a mix that fits your life.",
  },
  {
    question: "Do you sponsor learning?",
    answer:
      "Every teammate gets an annual learning wallet for conferences, courses, and tech subscriptions—no approvals needed for purchases under ₹25k.",
  },
  {
    question: "How often do you hire interns?",
    answer:
      "We host two internship cohorts each year. Share your interest via the form and we will notify you ahead of the next opening.",
  },
  {
    question: "What tools power collaboration?",
    answer:
      "We pair daily in Linear and Notion, prototype in Figma, and run discussions on Slack with async-friendly rituals.",
  }
];

const Careers = () => {
  const [applicationForm, setApplicationForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    linkedinProfile: "",
    githubProfile: "",
    portfolioLink: "",
    jobAppliedFor: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setApplicationForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setApplicationForm((prev) => ({ ...prev, jobAppliedFor: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Validate file type (PDF only)
      if (file.type !== 'application/pdf') {
        toast.error('Please upload a PDF file');
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      setResumeFile(file);
    }
  };

  const handleApplicationSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!applicationForm.name || !applicationForm.email || !applicationForm.phoneNumber || 
          !applicationForm.linkedinProfile || !applicationForm.githubProfile || 
          !applicationForm.jobAppliedFor || !resumeFile) {
        toast.error('Please fill in all required fields');
        setIsSubmitting(false);
        return;
      }

      // Upload resume to storage
      const fileExt = resumeFile.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, resumeFile);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        toast.error('Failed to upload resume. Please try again.');
        setIsSubmitting(false);
        return;
      }

      // Get the public URL for the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from('resumes')
        .getPublicUrl(filePath);

      // Save application to database
      const { error: dbError } = await supabase
        .from('job_applications')
        .insert({
          name: applicationForm.name,
          email: applicationForm.email,
          phone_number: applicationForm.phoneNumber,
          linkedin_profile: applicationForm.linkedinProfile,
          github_profile: applicationForm.githubProfile,
          portfolio_link: applicationForm.portfolioLink || null,
          job_applied_for: applicationForm.jobAppliedFor,
          resume_url: publicUrl,
        });

      if (dbError) {
        console.error('Database error:', dbError);
        toast.error('Failed to submit application. Please try again.');
        setIsSubmitting(false);
        return;
      }

      toast.success("Application submitted successfully! We'll be in touch soon.");
      setApplicationForm({
        name: "",
        email: "",
        phoneNumber: "",
        linkedinProfile: "",
        githubProfile: "",
        portfolioLink: "",
        jobAppliedFor: "",
      });
      setResumeFile(null);
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (err) {
      console.error('Submit error:', err);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <video
              src="https://res.cloudinary.com/dch0uyw8e/video/upload/v1760826230/1_tsiaq0.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-900/70 to-slate-900/80" />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 h-24 w-24 rounded-2xl border border-white/15 rotate-12" />
            <div className="absolute bottom-12 right-16 h-28 w-28 rounded-full border border-white/10" />
            <div className="absolute top-1/2 left-1/3 h-12 w-12 -translate-y-1/2 rounded-full bg-white/10 blur-2xl" />
          </div>
          <div className="relative z-10">
            <div className="container mx-auto px-6 py-20 md:py-28 flex flex-col items-center text-center gap-10">
              <div className="max-w-3xl mx-auto">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 mb-5">
                  Careers at Nirikshan AI
                </span>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  Build AI Experiences that Transform Industries
                </h1>
                <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
                  Join product thinkers, researchers, and engineers crafting human-centered AI. We ship fast, learn constantly, and care deeply about the people we build for.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/projects">
                    <Button size="lg" variant="outline" className="bg-white/5 text-white border-white/20 hover:bg-white/15">
                      Browse Our Work
                      <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </Link>
                  <a href="#talent-form">
                    <Button size="lg" className="gradient-primary hover:shadow-lg hover:shadow-blue-500/40">
                      Join the Talent Network
                      <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-3xl">
                {statsHighlights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white text-center backdrop-blur-md"
                  >
                    <p className="text-sm text-white/70 mb-1">{item.label}</p>
                    <p className="text-2xl font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
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
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join our team and work on cutting-edge AI projects. We're looking for passionate individuals ready to make an impact.
              </p>
            </div>
            
            {jobOpenings.length > 0 ? (
              <div className="max-w-5xl mx-auto space-y-6">
                {jobOpenings.map((job) => (
                  <Card key={job.code} className="p-6 md:p-8 bg-background/90 backdrop-blur border-border hover:border-primary/50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold">{job.title}</h3>
                          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                            {job.type}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">Job Code: {job.code}</p>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Globe2 size={16} />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <CalendarHeart size={16} />
                          <span>{job.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Trophy size={16} />
                          <span>{job.stipend}</span>
                        </div>
                      </div>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="details" className="border-none">
                        <AccordionTrigger className="text-left hover:no-underline py-3">
                          <span className="text-base font-medium">View Full Details</span>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-6 pt-4">
                          <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <Target size={18} className="text-primary" />
                              Role Overview
                            </h4>
                            <p className="text-muted-foreground leading-relaxed">{job.overview}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <ClipboardCheck size={18} className="text-primary" />
                              Key Responsibilities
                            </h4>
                            <ul className="space-y-2">
                              {job.responsibilities.map((resp, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3 flex items-center gap-2">
                                <Rocket size={18} className="text-primary" />
                                Required Skills
                              </h4>
                              <ul className="space-y-2">
                                {job.required.map((skill, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-muted-foreground text-sm">
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                    <span>{skill}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-3 flex items-center gap-2">
                                <Sparkles size={18} className="text-primary" />
                                Good to Have
                              </h4>
                              <ul className="space-y-2">
                                {job.goodToHave.map((skill, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-muted-foreground text-sm">
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted flex-shrink-0" />
                                    <span>{skill}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-border">
                            <a href="#talent-form">
                              <Button className="gradient-primary w-full md:w-auto">
                                Apply Now
                                <ArrowRight className="ml-2" size={18} />
                              </Button>
                            </a>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="max-w-3xl mx-auto p-8 text-center bg-background/80 backdrop-blur border-dashed border-2 border-border">
                <div className="flex flex-col items-center gap-4">
                  <BellRing className="text-indigo-500" size={40} />
                  <h3 className="text-2xl font-semibold">No openings at the moment</h3>
                  <p className="text-muted-foreground max-w-xl">
                    We&apos;re not hiring right now, but new opportunities are on the horizon. Keep an eye on this page for updates or share your interests below—our team will reach out when a role matches your profile.
                  </p>
                </div>
              </Card>
            )}
          </div>
        </section>

        {/* Application Form */}
        <section id="talent-form" className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto bg-background/90 backdrop-blur rounded-3xl border border-border shadow-sm p-8 md:p-12">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Apply Now</h2>
                <p className="text-muted-foreground">
                  Tell us about yourself and the role you&apos;re interested in. We&apos;ll review your application and get back to you soon.
                </p>
              </div>
              <form className="grid gap-6" onSubmit={handleApplicationSubmit}>
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Jane Doe"
                    required
                    value={applicationForm.name}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={applicationForm.email}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="phoneNumber" className="text-sm font-medium">
                    Phone Number <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    placeholder="+91 98765 43210"
                    required
                    value={applicationForm.phoneNumber}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="linkedinProfile" className="text-sm font-medium">
                    LinkedIn Profile <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="linkedinProfile"
                    name="linkedinProfile"
                    type="url"
                    placeholder="https://linkedin.com/in/yourprofile"
                    required
                    value={applicationForm.linkedinProfile}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="githubProfile" className="text-sm font-medium">
                    GitHub Profile <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="githubProfile"
                    name="githubProfile"
                    type="url"
                    placeholder="https://github.com/yourprofile"
                    required
                    value={applicationForm.githubProfile}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="portfolioLink" className="text-sm font-medium">
                    Portfolio Link
                  </label>
                  <Input
                    id="portfolioLink"
                    name="portfolioLink"
                    type="url"
                    placeholder="https://yourportfolio.com (optional)"
                    value={applicationForm.portfolioLink}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="jobAppliedFor" className="text-sm font-medium">
                    Job Applied For <span className="text-destructive">*</span>
                  </label>
                  <Select 
                    value={applicationForm.jobAppliedFor} 
                    onValueChange={handleSelectChange}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a position" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobOpenings.map((job) => (
                        <SelectItem key={job.code} value={job.code}>
                          {job.title} ({job.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="resume" className="text-sm font-medium">
                    Upload Resume (PDF only, max 5MB) <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="resume"
                    name="resume"
                    type="file"
                    accept=".pdf"
                    required
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                  {resumeFile && (
                    <p className="text-xs text-muted-foreground">
                      Selected: {resumeFile.name} ({(resumeFile.size / 1024).toFixed(2)} KB)
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4">
                  <p className="text-sm text-muted-foreground">
                    By submitting, you consent to us storing your information for hiring purposes.
                  </p>
                  <Button type="submit" className="gradient-primary" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Application"}
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
