import React, { useState } from "react";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TenXEnquiryForm } from "@/components/productivity/TenXEnquiryForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  GraduationCap,
  Building2,
  Briefcase,
  Users,
  Compass,
  Laptop,
  CheckCircle2,
  Calendar,
  Layers,
  Award,
  ChevronRight,
  TrendingUp,
  Brain,
  Zap,
  Code2,
  BarChart3,
  Cpu,
  BookOpen,
  ArrowUpRight,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────
   1. MAJOR TRAINING VERTICALS DATA
────────────────────────────────────────────────────────────── */
const verticals = [
  {
    number: "01",
    id: "schools",
    audienceLabel: "Schools & K-12",
    badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    heading: "Inspiring the Next Generation of AI Innovators.",
    shortDesc:
      "Introducing young minds to Artificial Intelligence through creative, interactive, and responsible AI learning.",
    tags: ["AI Awareness", "Creative AI Learning", "Student Workshops"],
    cta: "Explore School Programmes",
    programmeName: "AI Explorer (Schools)",
    audienceType: "Schools",
    mainImage:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85",
    accentImage:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80",
    stats: "Hands-on projects & ethics-first curriculum",
    bulletPoints: [
      "Age-tailored interactive storytelling & prompt art workshops",
      "Demystifying AI, algorithms & safety guidelines for youth",
      "Teacher enablement & classroom AI integration kits",
    ],
  },
  {
    number: "02",
    id: "universities",
    audienceLabel: "Universities & Colleges",
    badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    heading: "Bridging Education with AI Industry Skills.",
    shortDesc:
      "Preparing students and faculty for an AI-powered future through hands-on training, projects, and practical applications.",
    tags: ["Student Bootcamps", "Faculty Development", "AI Projects & Workshops"],
    cta: "Explore University Training",
    programmeName: "AI Career Accelerator (Universities)",
    audienceType: "Universities & Colleges",
    mainImage:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85",
    accentImage:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80",
    stats: "Accredited modules & live hackathon bootcamps",
    bulletPoints: [
      "Credit-aligned AI modules in Computer Vision, LLMs & RAG",
      "Faculty Development Programmes (FDP) on contemporary toolstacks",
      "Real industry capstones with deployment-ready GitHub portfolios",
    ],
  },
  {
    number: "03",
    id: "corporates",
    audienceLabel: "Corporate & Enterprises",
    badgeColor: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
    heading: "Transforming Workforces with AI Skills.",
    shortDesc:
      "Helping professionals and leadership teams use AI to improve productivity, automate workflows, and make smarter decisions.",
    tags: ["Corporate AI Workshops", "Executive AI Training", "Workforce Upskilling"],
    cta: "Explore Corporate Training",
    programmeName: "10X Professional (Professionals)",
    audienceType: "Management & Leadership",
    mainImage:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=85",
    accentImage:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80",
    stats: "Measurable work hour savings & executive alignment",
    bulletPoints: [
      "Cross-departmental productivity automation sprints",
      "Executive governance, build-vs-buy models & zero data leakage",
      "Custom internal prompt vaults & safe multi-agent pipelines",
    ],
  },
  {
    number: "04",
    id: "industries",
    audienceLabel: "Industries & Manufacturing",
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    heading: "Building AI-Ready Industrial Workforces.",
    shortDesc:
      "Equipping industrial teams with practical AI knowledge, automation skills, and emerging technology capabilities.",
    tags: ["Industrial AI Training", "Technical Upskilling", "AI & Automation Workshops"],
    cta: "Explore Industrial Training",
    programmeName: "AI Workforce Transformation (Industries)",
    audienceType: "Industries & Enterprises",
    mainImage:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85",
    accentImage:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    stats: "On-site factory floor & edge vision enablement",
    bulletPoints: [
      "Shopfloor defect inspection & computer vision operator workshops",
      "Predictive maintenance & sensor telemetry automation training",
      "Empowering plant engineers with low-code AI diagnostic tools",
    ],
  },
];

/* ──────────────────────────────────────────────────────────────
   2. WHAT WE TEACH (6 COMPACT VISUAL TILES)
────────────────────────────────────────────────────────────── */
const teachingDomains = [
  {
    title: "AI Productivity",
    tagline: "Work Smarter.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
    icon: Zap,
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    title: "Generative AI",
    tagline: "Create with Intelligence.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    icon: Brain,
    gradient: "from-violet-600 to-purple-500",
  },
  {
    title: "AI for Developers",
    tagline: "Build Faster.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    icon: Code2,
    gradient: "from-indigo-600 to-blue-500",
  },
  {
    title: "AI for Business",
    tagline: "Make Better Decisions.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    icon: BarChart3,
    gradient: "from-emerald-600 to-teal-500",
  },
  {
    title: "AI for Education",
    tagline: "Teach and Learn Better.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
    icon: BookOpen,
    gradient: "from-amber-600 to-orange-500",
  },
  {
    title: "Advanced AI",
    tagline: "Explore What's Next.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    icon: Cpu,
    gradient: "from-rose-600 to-pink-500",
  },
];

/* ──────────────────────────────────────────────────────────────
   3. OUR TRAINING EXPERIENCE (8 REAL TRAINING ENVIRONMENTS)
────────────────────────────────────────────────────────────── */
const experienceGallery = [
  {
    title: "Expert-Led Classroom Sessions",
    caption: "Deep conceptual clarity paired with live interactive walkthroughs.",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
    category: "Classroom",
  },
  {
    title: "Hands-On Computer Lab Training",
    caption: "Every learner writes, tests, and validates AI tools at their own machine.",
    image:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
    category: "Labs",
  },
  {
    title: "Live AI Tool Demonstrations",
    caption: "Real-time demonstration of prompt techniques, model inference, and RAG.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    category: "Workshops",
  },
  {
    title: "Group Projects & Collaboration",
    caption: "Cross-functional student and professional squads co-creating solutions.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    category: "Collaboration",
  },
  {
    title: "Student Presentations",
    caption: "Learners present their AI prototypes and receive constructive practitioner feedback.",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
    category: "Showcase",
  },
  {
    title: "Corporate AI Workshops",
    caption: "Empowering business analysts, managers, and operational teams to automate daily routines.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    category: "Enterprise",
  },
  {
    title: "Faculty Development Sessions",
    caption: "Upskilling educators and professors to deliver modern AI curriculums.",
    image:
      "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&w=800&q=80",
    category: "Academic",
  },
  {
    title: "Industry Technical Demos",
    caption: "Demonstrating edge hardware, smart vision, and plant floor intelligence.",
    image:
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    category: "Industry",
  },
];

/* ──────────────────────────────────────────────────────────────
   4. SIGNATURE 10X 5-STAGE PROCESS
────────────────────────────────────────────────────────────── */
const fiveStages = [
  {
    step: "01",
    name: "DISCOVER",
    headline: "Discover AI opportunities.",
    desc: "Identify operational bottlenecks and pinpoint where AI tools will save significant effort.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
  },
  {
    step: "02",
    name: "LEARN",
    headline: "Learn practical AI skills.",
    desc: "Master modern foundation models, prompt architecture, and hands-on tooling through guided labs.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
  },
  {
    step: "03",
    name: "APPLY",
    headline: "Apply AI in real tasks.",
    desc: "Work on active assignments, reports, and code to test skills on authentic organizational tasks.",
    image:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80",
  },
  {
    step: "04",
    name: "AUTOMATE",
    headline: "Automate repetitive workflows.",
    desc: "Build autonomous multi-step pipelines that connect AI directly to documents, databases, and emails.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
  },
  {
    step: "05",
    name: "SCALE",
    headline: "Scale successful solutions.",
    desc: "Institutionalize best practices, share prompt libraries, and empower certified AI champions.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
  },
];

/* ──────────────────────────────────────────────────────────────
   5. FIVE TRAINING PROGRAMMES TILES
────────────────────────────────────────────────────────────── */
const programmes = [
  {
    id: "prog-schools",
    name: "AI Explorer",
    target: "School Students",
    badge: "K-12 & High School",
    badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    description:
      "Foundational workshops introducing school students to AI concepts, creative storytelling, digital safety, and future technology habits through hands-on fun.",
    highlights: ["Interactive AI storytelling", "Prompt art & creativity", "Digital ethics & safety"],
    formInterest: "AI Explorer (Schools)",
    formAudience: "Schools",
  },
  {
    id: "prog-university",
    name: "AI Career Accelerator",
    target: "University Students",
    badge: "Higher Education",
    badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    description:
      "Intensive student bootcamps bridging academia and industry with real-world computer vision, generative AI apps, RAG pipelines, and verified GitHub project portfolios.",
    highlights: ["RAG & vector assistants", "Computer vision with OpenCV", "Verified capstone portfolio"],
    formInterest: "AI Career Accelerator (Universities)",
    formAudience: "Universities & Colleges",
  },
  {
    id: "prog-pro",
    name: "10X Professional",
    target: "Working Professionals",
    badge: "Corporate Upskilling",
    badgeColor: "bg-violet-100 text-violet-800 dark:bg-violet-950/60 dark:text-violet-300",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    description:
      "Accelerated training for working knowledge workers to automate document drafting, data extraction, presentation synthesis, and day-to-day workflow friction.",
    highlights: ["Advanced prompt frameworks", "Spreadsheet & data intelligence", "Automated document triage"],
    formInterest: "10X Professional (Professionals)",
    formAudience: "Working Professionals",
  },
  {
    id: "prog-leadership",
    name: "AI Leadership",
    target: "Management Teams",
    badge: "CXO & Directors",
    badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    description:
      "Strategic masterclasses designed for business leaders to evaluate AI adoption roadmaps, govern organizational data security, and make smart build-vs-buy decisions.",
    highlights: ["AI adoption canvas", "Data governance & privacy", "ROI valuation models"],
    formInterest: "AI Leadership (Management)",
    formAudience: "Management & Leadership",
  },
  {
    id: "prog-industry",
    name: "AI Workforce Transformation",
    target: "Industries",
    badge: "Technical & Manufacturing",
    badgeColor: "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    description:
      "End-to-end industrial upskilling tailored for manufacturing, logistics, and plant operations to adopt computer vision quality inspection and operational automation.",
    highlights: ["Vision inspection systems", "Telemetry & anomaly diagnostics", "Custom departmental pods"],
    formInterest: "AI Workforce Transformation (Industries)",
    formAudience: "Industries & Enterprises",
  },
];

/* ──────────────────────────────────────────────────────────────
   MAIN COMPONENT
────────────────────────────────────────────────────────────── */
export const TenXProductivity: React.FC = () => {
  const [prefilledProgramme, setPrefilledProgramme] = useState("");
  const [prefilledAudience, setPrefilledAudience] = useState("");
  const [activeModalProgramme, setActiveModalProgramme] = useState<typeof programmes[0] | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectVertical = (progName: string, audName: string) => {
    setPrefilledProgramme(progName);
    setPrefilledAudience(audName);
    scrollTo("contact-inquiry");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white">
      <SEO
        title="AI Training & Education — Schools, Universities, Corporates & Industries | Nirikshan AI"
        description="Practical Artificial Intelligence training programs, workshops, and bootcamps for Schools, Universities, Corporate Professionals, and Industrial Workforces with Nirikshan AI."
        keywords="AI Training, AI Education, Corporate AI Workshops, University AI Bootcamps, School AI Workshops, Nirikshan AI, Faculty Development"
        canonicalUrl="https://nirikshanai.com/10x-ai-productivity"
      />
      <Navigation />

      <main className="relative">
        {/* ══════════════════════════════════════════════════════
            1. HERO SECTION — AI TRAINING FOR EVERYONE
        ══════════════════════════════════════════════════════ */}
        <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-slate-200 dark:border-slate-800">
          {/* Subtle architectural background accents */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-violet-500/10 blur-3xl rounded-full" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            {/* Top eyebrow pill */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>NIRIKSHAN AI</span>
                <span className="w-1 h-1 rounded-full bg-blue-400" />
                <span>LEARN • BUILD • INNOVATE</span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.12] mb-6">
                Making India AI-Ready,
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  One Skill at a Time.
                </span>
              </h1>

              {/* Supporting text */}
              <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto mb-8">
                Practical AI training that empowers students, educators, professionals, and industries to understand, apply, and innovate with Artificial Intelligence.
              </p>

              {/* Four visual audience labels */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
                {["SCHOOLS", "UNIVERSITIES", "CORPORATES", "INDUSTRIES"].map((aud, idx) => (
                  <div
                    key={aud}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs tracking-wider"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                    <span>{aud}</span>
                  </div>
                ))}
              </div>

              {/* Hero CTA buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14">
                <Button
                  size="lg"
                  onClick={() => scrollTo("training-verticals")}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-6 text-base rounded-2xl shadow-xl shadow-blue-500/20 group"
                >
                  <span>Explore Training Programmes</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollTo("contact-inquiry")}
                  className="w-full sm:w-auto border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold px-8 py-6 text-base rounded-2xl"
                >
                  Partner With Us
                </Button>
              </div>
            </div>

            {/* Asymmetrical High-Impact Hero Photo Collage */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 max-w-6xl mx-auto items-stretch">
              {/* Large Main Feature Photo */}
              <div className="md:col-span-7 relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl group min-h-[300px] sm:min-h-[400px]">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85"
                  alt="Nirikshan AI Training Workshop"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/90 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-sm mb-2">
                    <Laptop className="w-3.5 h-3.5" /> Hands-On AI Workshops
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold leading-tight">
                    Real students, actual code, practical problem solving.
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 mt-1 line-clamp-2">
                    Classrooms transformed into applied AI innovation labs across institutions and enterprise teams.
                  </p>
                </div>
              </div>

              {/* Right Stack of 2 Real Environment Photos */}
              <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
                {/* Photo 1: University Lab / Lecture */}
                <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg group min-h-[190px]">
                  <img
                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
                    alt="University Campus AI Lecture"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300">
                      Higher Education
                    </span>
                    <h4 className="text-sm sm:text-base font-bold">
                      University Computer Labs &amp; Faculty Enablement
                    </h4>
                  </div>
                </div>

                {/* Photo 2: Corporate Workforce Training */}
                <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg group min-h-[190px]">
                  <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
                    alt="Corporate AI Workforce Training"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
                      Workforce Transformation
                    </span>
                    <h4 className="text-sm sm:text-base font-bold">
                      Corporate Teams Automating Daily Workflows
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            2. FOUR MAJOR TRAINING VERTICALS (THE CORE SECTION)
        ══════════════════════════════════════════════════════ */}
        <section id="training-verticals" className="py-20 lg:py-28 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
                Targeted Training Ecosystem
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-4">
                Four Major Training Verticals
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
                We craft tailored, immersive learning environments designed specifically for the unique goals of schools, universities, corporate teams, and manufacturing facilities.
              </p>
            </div>

            {/* Verticals List with Staggered Editorial Layout */}
            <div className="space-y-20 lg:space-y-32">
              {/* ── VERTICAL 01: SCHOOLS (Image Left, Text Right) ── */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-7 relative group">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 aspect-[16/10]">
                    <img
                      src={verticals[0].mainImage}
                      alt="AI Training for Schools"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="font-mono text-4xl sm:text-5xl font-black text-white/30">
                        01
                      </span>
                    </div>
                  </div>
                  {/* Floating badge */}
                  <div className="absolute -bottom-5 right-6 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">Ages 10–18</div>
                      <div className="text-[11px] text-slate-500">Curiosity, Ethics &amp; Projects</div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">
                    <Compass className="w-3.5 h-3.5" />
                    <span>{verticals[0].audienceLabel}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 dark:text-white leading-tight">
                    {verticals[0].heading}
                  </h3>
                  <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {verticals[0].shortDesc}
                  </p>

                  {/* Bullet points */}
                  <ul className="space-y-2.5 pt-2">
                    {verticals[0].bulletPoints.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-3">
                    {verticals[0].tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="pt-4">
                    <Button
                      onClick={() => handleSelectVertical(verticals[0].programmeName, verticals[0].audienceType)}
                      className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-5 rounded-xl shadow-lg shadow-amber-500/20 group"
                    >
                      <span>{verticals[0].cta}</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* ── VERTICAL 02: UNIVERSITIES & COLLEGES (Text Left, Image Right) ── */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-5 space-y-5 order-2 lg:order-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>{verticals[1].audienceLabel}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 dark:text-white leading-tight">
                    {verticals[1].heading}
                  </h3>
                  <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {verticals[1].shortDesc}
                  </p>

                  {/* Bullet points */}
                  <ul className="space-y-2.5 pt-2">
                    {verticals[1].bulletPoints.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-3">
                    {verticals[1].tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="pt-4">
                    <Button
                      onClick={() => handleSelectVertical(verticals[1].programmeName, verticals[1].audienceType)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-5 rounded-xl shadow-lg shadow-blue-500/20 group"
                    >
                      <span>{verticals[1].cta}</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-7 relative group order-1 lg:order-2">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 aspect-[16/10]">
                    <img
                      src={verticals[1].mainImage}
                      alt="AI Training for Universities"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute top-4 right-4">
                      <span className="font-mono text-4xl sm:text-5xl font-black text-white/30">
                        02
                      </span>
                    </div>
                  </div>
                  {/* Floating badge */}
                  <div className="absolute -bottom-5 left-6 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">Engineering &amp; Science</div>
                      <div className="text-[11px] text-slate-500">Student &amp; Faculty Enablement</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── VERTICAL 03: CORPORATES (Full-Width High-Impact Card) ── */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl group">
                <div className="relative h-[480px] lg:h-[540px]">
                  <img
                    src={verticals[2].mainImage}
                    alt="Corporate AI Training"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                  {/* Card Content Overlay */}
                  <div className="absolute inset-0 p-6 sm:p-10 lg:p-14 flex flex-col justify-between text-white z-10">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-violet-600/90 text-white shadow-sm backdrop-blur-sm">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>{verticals[2].audienceLabel}</span>
                      </div>
                      <span className="font-mono text-4xl sm:text-5xl font-black text-white/30">
                        03
                      </span>
                    </div>

                    <div className="max-w-2xl space-y-4">
                      <h3 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                        {verticals[2].heading}
                      </h3>
                      <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                        {verticals[2].shortDesc}
                      </p>

                      <div className="grid sm:grid-cols-2 gap-2.5 pt-2">
                        {verticals[2].bulletPoints.map((pt) => (
                          <div key={pt} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200">
                            <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {verticals[2].tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-semibold px-3 py-1 rounded-xl bg-white/10 backdrop-blur-sm text-white border border-white/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="pt-3">
                        <Button
                          onClick={() => handleSelectVertical(verticals[2].programmeName, verticals[2].audienceType)}
                          className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-7 py-5 rounded-xl shadow-xl shadow-violet-500/30 group"
                        >
                          <span>{verticals[2].cta}</span>
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── VERTICAL 04: INDUSTRIES (Split Industrial Photography & Content) ── */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-7 relative group">
                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 bg-slate-900 aspect-[4/5]">
                      <img
                        src={verticals[3].mainImage}
                        alt="Industrial AI Technical Training"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 text-xs text-white font-semibold">
                        Technical Plant Floor
                      </div>
                    </div>
                    <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 bg-slate-900 aspect-[4/5] mt-6">
                      <img
                        src={verticals[3].accentImage}
                        alt="Factory Automation Training"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 text-xs text-white font-semibold">
                        Automated Vision Quality
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className="font-mono text-4xl sm:text-5xl font-black text-slate-400/20">
                      04
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{verticals[3].audienceLabel}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 dark:text-white leading-tight">
                    {verticals[3].heading}
                  </h3>
                  <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {verticals[3].shortDesc}
                  </p>

                  {/* Bullet points */}
                  <ul className="space-y-2.5 pt-2">
                    {verticals[3].bulletPoints.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-3">
                    {verticals[3].tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="pt-4">
                    <Button
                      onClick={() => handleSelectVertical(verticals[3].programmeName, verticals[3].audienceType)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-5 rounded-xl shadow-lg shadow-emerald-500/20 group"
                    >
                      <span>{verticals[3].cta}</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            3. WHAT WE TEACH (COMPACT VISUAL GALLERY)
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
                Curriculum Focus
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-3">
                What We Teach
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-base">
                Core AI skill domains taught with hands-on practice, real tools, and zero filler.
              </p>
            </div>

            {/* 6 Visual Tiles with Photographic Thumbnails */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
              {teachingDomains.map((domain, idx) => {
                const Icon = domain.icon;
                return (
                  <div
                    key={domain.title}
                    className="group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                  >
                    <div className="relative h-28 sm:h-32 overflow-hidden bg-slate-900">
                      <img
                        src={domain.image}
                        alt={domain.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                      <div className="absolute top-2.5 left-2.5 w-7 h-7 rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-xs">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="absolute bottom-2 right-2.5 font-mono text-xs text-white/40 font-bold">
                        0{idx + 1}
                      </span>
                    </div>

                    <div className="p-3.5">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                        {domain.title}
                      </h4>
                      <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                        {domain.tagline}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            4. OUR TRAINING EXPERIENCE (IMAGE-LED GALLERY)
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 lg:py-28 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
                Learning Environments
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-4">
                More Than Learning. It's Hands-On Experience.
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
                Learn AI by exploring tools, solving problems, building projects, and applying knowledge to real-world challenges.
              </p>
            </div>

            {/* Masonry / Responsive Asymmetric Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {experienceGallery.map((exp, idx) => (
                <div
                  key={exp.title}
                  className={`group relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${
                    idx === 0 || idx === 7 ? "sm:col-span-2 aspect-[16/9]" : "aspect-[4/3] sm:aspect-square"
                  }`}
                >
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                  
                  <div className="absolute top-3.5 left-3.5">
                    <Badge className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border-white/20 text-[10px] font-semibold">
                      {exp.category}
                    </Badge>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h4 className="font-bold text-sm sm:text-base leading-snug">
                      {exp.title}
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                      {exp.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            5. SIGNATURE 10X INITIATIVE (5 STAGES)
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
                Signature Framework
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-4">
                From AI Awareness to AI Productivity.
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-base">
                Our proven five-stage learning progression takes participants from basic discovery to scalable real-world output.
              </p>
            </div>

            {/* 5 Connected Stages Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {fiveStages.map((stg, idx) => (
                <div
                  key={stg.step}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs font-extrabold px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                        STAGE {stg.step}
                      </span>
                      {idx < 4 && (
                        <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-700 hidden lg:block" />
                      )}
                    </div>

                    <div className="relative h-28 rounded-xl overflow-hidden mb-4 border border-slate-200 dark:border-slate-800">
                      <img
                        src={stg.image}
                        alt={stg.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>

                    <h4 className="font-bold text-base text-slate-900 dark:text-white mb-1">
                      {stg.name}
                    </h4>
                    <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2">
                      {stg.headline}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {stg.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            6. OUR TRAINING PROGRAMMES (5 TILES)
        ══════════════════════════════════════════════════════ */}
        <section id="programmes" className="py-20 lg:py-28 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
                Curated Tracks
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-4">
                Our Training Programmes
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-base">
                Explore structured curricula designed for every stage of your educational or professional journey.
              </p>
            </div>

            {/* 5 Attractive Programme Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {programmes.map((prog, idx) => (
                <div
                  key={prog.id}
                  className={`group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1 ${
                    idx === 4 ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <div>
                    {/* Visual Photo Header */}
                    <div className="relative h-48 overflow-hidden bg-slate-900">
                      <img
                        src={prog.image}
                        alt={prog.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                      
                      <div className="absolute top-3.5 left-3.5">
                        <Badge className={`${prog.badgeColor} border font-bold text-xs shadow-xs backdrop-blur-sm`}>
                          {prog.badge}
                        </Badge>
                      </div>

                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <div className="text-xs uppercase tracking-wider text-slate-300 font-medium">
                          {prog.target}
                        </div>
                        <h3 className="text-xl font-bold leading-tight">
                          {prog.name}
                        </h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                        {prog.description}
                      </p>

                      <div className="space-y-2 mb-6">
                        {prog.highlights.map((h) => (
                          <div key={h} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Tile CTA */}
                  <div className="p-6 pt-0">
                    <Button
                      onClick={() => {
                        setActiveModalProgramme(prog);
                      }}
                      className="w-full bg-slate-100 hover:bg-blue-600 dark:bg-slate-800 dark:hover:bg-blue-600 text-slate-900 hover:text-white dark:text-slate-100 dark:hover:text-white font-semibold text-xs py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-between"
                    >
                      <span>Explore Programme</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            7. FINAL CTA — BRING AI TRAINING TO YOUR ORGANISATION
        ══════════════════════════════════════════════════════ */}
        <section className="relative py-24 lg:py-32 overflow-hidden bg-slate-950 text-white">
          {/* Real Training Environment Background Photo */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1800&q=85"
              alt="Collaborative AI Training Environment"
              className="w-full h-full object-cover opacity-20"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60" />
          </div>

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-widest border border-blue-400/30 mb-4">
              Get Started
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Let's Make Your People AI-Ready.
            </h2>
            <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
              Whether you're a school, university, corporate organisation, or industry, let's build an AI learning experience that creates real impact.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => {
                  setPrefilledProgramme("AI Workshop & Training Enquiry");
                  scrollTo("contact-inquiry");
                }}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-6 text-base rounded-2xl shadow-xl shadow-blue-500/30 group"
              >
                <span>Organise an AI Workshop</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  setPrefilledProgramme("Institutional Academic / Corporate Partnership");
                  scrollTo("contact-inquiry");
                }}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/20 font-semibold px-8 py-6 text-base rounded-2xl backdrop-blur-sm"
              >
                Partner With Nirikshan AI
              </Button>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            8. WORKING ENQUIRY FORM SECTION
        ══════════════════════════════════════════════════════ */}
        <TenXEnquiryForm
          prefilledProgramme={prefilledProgramme}
          prefilledAudience={prefilledAudience}
        />

        {/* Programme Detail Dialog Modal */}
        <Dialog open={!!activeModalProgramme} onOpenChange={(open) => !open && setActiveModalProgramme(null)}>
          <DialogContent className="max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 p-6 sm:p-8 rounded-3xl">
            {activeModalProgramme && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={activeModalProgramme.badgeColor}>
                      {activeModalProgramme.badge}
                    </Badge>
                    <span className="text-xs font-semibold text-slate-500">
                      Target: {activeModalProgramme.target}
                    </span>
                  </div>
                  <DialogTitle className="text-2xl font-bold">
                    {activeModalProgramme.name}
                  </DialogTitle>
                  <DialogDescription className="text-sm text-slate-600 dark:text-slate-300 pt-1 leading-relaxed">
                    {activeModalProgramme.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-4 space-y-4">
                  <div className="rounded-2xl overflow-hidden h-44 bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <img
                      src={activeModalProgramme.image}
                      alt={activeModalProgramme.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Key Highlights &amp; Practice Focus:
                    </h5>
                    <div className="grid grid-cols-1 gap-2">
                      {activeModalProgramme.highlights.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <Button
                    variant="ghost"
                    onClick={() => setActiveModalProgramme(null)}
                    className="text-xs"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      setPrefilledProgramme(activeModalProgramme.formInterest);
                      setPrefilledAudience(activeModalProgramme.formAudience);
                      setActiveModalProgramme(null);
                      scrollTo("contact-inquiry");
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl px-5"
                  >
                    Enquire for this Programme
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>

      <Footer />
    </div>
  );
};

export default TenXProductivity;
